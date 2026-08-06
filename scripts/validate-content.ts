import { readAppFiles } from './content-utils';

const files = await readAppFiles();
const slugs = new Set<string>();
const urls = new Set<string>();
const errors: string[] = [];

for (const file of files) {
  const data = file.frontmatter;
  const slug = String(data.slug || '');
  if (slugs.has(slug)) errors.push(`${file.name}: duplicate slug ${slug}`);
  slugs.add(slug);

  for (const field of ['officialUrl', 'documentationUrl']) {
    const value = data[field];
    if (typeof value !== 'string' || !/^https?:\/\//.test(value))
      errors.push(`${file.name}: ${field} must be an HTTP(S) URL`);
    if (typeof value === 'string' && urls.has(value))
      errors.push(`${file.name}: duplicate canonical source URL ${value}`);
    if (typeof value === 'string') urls.add(value);
  }

  const reviewedAt = new Date(String(data.reviewedAt));
  const nextReviewAt = new Date(String(data.nextReviewAt));
  if (Number.isNaN(reviewedAt.valueOf()) || Number.isNaN(nextReviewAt.valueOf()))
    errors.push(`${file.name}: review dates must be valid dates`);
  if (nextReviewAt <= reviewedAt)
    errors.push(`${file.name}: nextReviewAt must be after reviewedAt`);
  if (!Array.isArray(data.sources) || data.sources.length < 2)
    errors.push(`${file.name}: at least two dated sources are required`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} app records.`);
