import { readAppFiles } from './content-utils';

const files = await readAppFiles();
const urls = files.flatMap(({ name, frontmatter }) => {
  const sources = Array.isArray(frontmatter.sources)
    ? (frontmatter.sources as Array<{ url?: string }>)
    : [];
  return [
    frontmatter.officialUrl,
    frontmatter.documentationUrl,
    frontmatter.pricingUrl,
    frontmatter.privacyUrl,
    ...sources.map((source) => source.url),
  ]
    .filter((url): url is string => typeof url === 'string')
    .map((url) => ({ file: name, url }));
});
const seen = new Set<string>();
const uniqueUrls = urls.filter(({ url }) => !seen.has(url) && seen.add(url));
const failures: Array<{ file: string; url: string; status: string }> = [];

for (const { file, url } of uniqueUrls) {
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(10000) });
    }
    if (!response.ok) failures.push({ file, url, status: String(response.status) });
  } catch (error) {
    failures.push({ file, url, status: error instanceof Error ? error.message : 'request failed' });
  }
}

console.log(JSON.stringify({ checked: uniqueUrls.length, failures }, null, 2));
if (process.env.FAIL_ON_BROKEN_LINKS === 'true' && failures.length) process.exit(1);
