import { readAppFiles } from './content-utils';

const files = await readAppFiles();
const slugs = new Set<string>();
const urls = new Set<string>();
const errors: string[] = [];
const sourceTypes = new Set([
  'official',
  'documentation',
  'permissions',
  'pricing',
  'privacy',
  'marketplace',
]);

for (const file of files) {
  const data = file.frontmatter;
  const slug = typeof data.slug === 'string' ? data.slug.trim() : '';
  if (!slug) {
    errors.push(`${file.name}: slug is required`);
  } else if (slugs.has(slug)) {
    errors.push(`${file.name}: duplicate slug ${slug}`);
  } else {
    slugs.add(slug);
  }

  for (const field of ['officialUrl', 'documentationUrl']) {
    const value = data[field];
    if (typeof value !== 'string' || !/^https?:\/\//.test(value)) {
      errors.push(`${file.name}: ${field} must be an HTTP(S) URL`);
    }
    if (typeof value === 'string' && urls.has(value)) {
      errors.push(`${file.name}: duplicate canonical source URL ${value}`);
    }
    if (typeof value === 'string') urls.add(value);
  }

  const reviewedAt = new Date(String(data.reviewedAt));
  const nextReviewAt = new Date(String(data.nextReviewAt));
  if (Number.isNaN(reviewedAt.valueOf()) || Number.isNaN(nextReviewAt.valueOf())) {
    errors.push(`${file.name}: review dates must be valid dates`);
  }
  if (nextReviewAt <= reviewedAt)
    errors.push(`${file.name}: nextReviewAt must be after reviewedAt`);

  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length < 2) errors.push(`${file.name}: at least two dated sources are required`);
  sources.forEach((source, index) => {
    if (!source || typeof source !== 'object') {
      errors.push(`${file.name}: source ${index + 1} must be an object`);
      return;
    }
    const item = source as Record<string, unknown>;
    if (typeof item.label !== 'string' || !item.label.trim())
      errors.push(`${file.name}: source ${index + 1} needs a label`);
    if (typeof item.url !== 'string' || !/^https?:\/\//.test(item.url))
      errors.push(`${file.name}: source ${index + 1} needs an HTTP(S) URL`);
    if (typeof item.type !== 'string' || !sourceTypes.has(item.type))
      errors.push(`${file.name}: source ${index + 1} has an invalid type`);
    if (Number.isNaN(new Date(String(item.checkedAt)).valueOf()))
      errors.push(`${file.name}: source ${index + 1} needs a valid checkedAt date`);
  });

  const repository = data.githubRepository as
    | { url?: unknown; owner?: unknown; name?: unknown; stars?: unknown; starsCheckedAt?: unknown }
    | undefined;
  if (repository) {
    if (typeof repository.url !== 'string') {
      errors.push(`${file.name}: githubRepository.url is required`);
    } else {
      try {
        const parsed = new URL(repository.url);
        const [owner, name] = parsed.pathname.split('/').filter(Boolean);
        if (
          parsed.hostname !== 'github.com' ||
          owner !== repository.owner ||
          name !== repository.name
        ) {
          errors.push(`${file.name}: repository URL must match owner and name`);
        }
      } catch {
        errors.push(`${file.name}: githubRepository.url must be valid`);
      }
    }
    if (typeof repository.owner !== 'string' || typeof repository.name !== 'string')
      errors.push(`${file.name}: repository owner and name are required`);
    if (repository.stars !== undefined && repository.starsCheckedAt === undefined)
      errors.push(`${file.name}: stars require starsCheckedAt`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} app records.`);
