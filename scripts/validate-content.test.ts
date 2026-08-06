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
