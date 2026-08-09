import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePrompt, hasSecretLikeText } from '../src/lib/agent-prompt/generate';

test('generates a portable bug-fix prompt without optional sections', () => {
  const prompt = generatePrompt({
    jobId: 'bug-fix',
    toolIds: [],
    project: '',
    branch: '',
    context: '',
  });
  assert.match(prompt, /^# Coding task/);
  assert.match(prompt, /## Objective/);
  assert.match(prompt, /## Instructions/);
  assert.doesNotMatch(prompt, /## Repository context/);
  assert.doesNotMatch(prompt, /## Relevant tools and apps/);
});

test('includes deterministic tools and repository context', () => {
  const prompt = generatePrompt({
    jobId: 'security',
    toolIds: ['codeql', 'secret-scanning', 'codeql'],
    project: 'demo',
    branch: 'main',
    context: 'Review the existing workflows.',
  });
  assert.match(prompt, /Project: demo/);
  assert.match(prompt, /Branch: main/);
  assert.match(prompt, /Secret scanning/);
  assert.match(prompt, /CodeQL/);
  assert.equal(prompt.indexOf('Secret scanning') < prompt.indexOf('CodeQL'), true);
});

test('normalizes long context and repeated blank lines', () => {
  const prompt = generatePrompt({
    jobId: 'bug-fix',
    toolIds: [],
    project: 'x'.repeat(200),
    branch: 'main',
    context: 'first\n\n\nsecond',
  });
  assert.ok(prompt.includes(`- Project: ${'x'.repeat(120)}`));
  assert.ok(prompt.includes('  first\n  \n  second'));
});

test('limits long context to 4,000 characters', () => {
  const prompt = generatePrompt({
    jobId: 'bug-fix',
    toolIds: [],
    project: '',
    branch: '',
    context: 'x'.repeat(5000),
  });
  assert.ok(prompt.length < 12000);
  assert.ok(prompt.includes('x'.repeat(4000)));
});

test('warns about common secret-like values', () => {
  assert.equal(hasSecretLikeText('token ghp_abc123'), true);
  assert.equal(hasSecretLikeText('ordinary repository notes'), false);
});
