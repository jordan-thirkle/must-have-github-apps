import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const directory = path.resolve('src/content/apps');
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is required to refresh repository metadata.');
  process.exit(1);
}

for (const name of (await fs.readdir(directory)).filter((file) => file.endsWith('.md'))) {
  const filePath = path.join(directory, name);
  const source = await fs.readFile(filePath, 'utf8');
  const parsed = matter(source);
  const repository = parsed.data.githubRepository as
    { owner: string; name: string; stars?: number; starsCheckedAt?: string } | undefined;
  if (!repository) continue;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository.owner}/${repository.name}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) {
      console.error(`${name}: GitHub returned ${response.status}; preserving existing snapshot.`);
      continue;
    }
    const data = (await response.json()) as { stargazers_count: number };
    const next = {
      ...repository,
      stars: data.stargazers_count,
      starsCheckedAt: new Date().toISOString().slice(0, 10),
    };
    parsed.data.githubRepository = next;
    await fs.writeFile(filePath, matter.stringify(parsed.content, parsed.data));
    console.log(`${name}: updated to ${next.stars} stars.`);
  } catch (error) {
    console.error(`${name}: metadata refresh failed; preserving existing snapshot.`, error);
  }
}
