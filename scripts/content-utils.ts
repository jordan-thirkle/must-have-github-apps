import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export const appsDirectory = path.resolve('src/content/apps');

export async function readAppFiles() {
  const names = (await fs.readdir(appsDirectory)).filter((name) => name.endsWith('.md')).sort();
  return Promise.all(
    names.map(async (name) => {
      const filePath = path.join(appsDirectory, name);
      const source = await fs.readFile(filePath, 'utf8');
      return {
        name,
        filePath,
        frontmatter: matter(source).data as Record<string, unknown>,
        source,
      };
    }),
  );
}
