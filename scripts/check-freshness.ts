import { readAppFiles } from './content-utils';

const now = new Date(process.env.REVIEW_AS_OF || new Date().toISOString());
const files = await readAppFiles();
const stale = files.filter(({ frontmatter }) => new Date(String(frontmatter.nextReviewAt)) < now);

const report = {
  generatedAt: now.toISOString(),
  total: files.length,
  stale: stale.map(({ name, frontmatter }) => ({
    file: name,
    slug: frontmatter.slug,
    name: frontmatter.name,
    nextReviewAt: frontmatter.nextReviewAt,
  })),
};

console.log(JSON.stringify(report, null, 2));
if (process.env.FAIL_ON_STALE === 'true' && stale.length) process.exit(1);
