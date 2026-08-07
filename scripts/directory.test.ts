import test from 'node:test';
import assert from 'node:assert/strict';
import { formatStars } from '../src/lib/format';

test('formats GitHub star counts for readable display', () => {
  assert.equal(formatStars(0), '0');
  assert.equal(formatStars(999), '999');
  assert.equal(formatStars(1200), '1.2k');
  assert.equal(formatStars(22194), '22.2k');
  assert.equal(formatStars(1_200_000), '1.2m');
  assert.equal(formatStars(undefined), undefined);
});

test('does not treat missing star metadata as zero', () => {
  assert.equal(formatStars(undefined), undefined);
});
