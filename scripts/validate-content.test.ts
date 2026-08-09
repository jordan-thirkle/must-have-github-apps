import test from 'node:test';
import assert from 'node:assert/strict';
import { readAppFiles } from './content-utils';

test('canonical app records have evidence and review metadata', async () => {
  const files = await readAppFiles();
  assert.equal(files.length, 4);
  for (const { frontmatter } of files) {
    assert.ok(frontmatter.slug);
    assert.ok(frontmatter.officialUrl);
    assert.ok(frontmatter.documentationUrl);
    assert.ok(frontmatter.reviewedAt);
    assert.ok(frontmatter.nextReviewAt);
    assert.ok(Array.isArray(frontmatter.sources));
  }
});

test('app records preserve every category for directory filtering', async () => {
  const files = await readAppFiles();
  for (const { name, frontmatter } of files) {
    const categories = frontmatter.categories;
    assert.ok(Array.isArray(categories), `${name}: categories must be an array`);
    assert.ok(categories.length > 0, `${name}: categories must not be empty`);
    assert.ok(
      categories.every((category) => typeof category === 'string' && category.trim().length > 0),
      `${name}: categories must contain only non-blank strings`,
    );
  }
});
