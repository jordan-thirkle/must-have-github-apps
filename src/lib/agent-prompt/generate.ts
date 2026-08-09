import { jobs, tools, type PromptState } from '@/data/agent-prompt-catalog';

const clean = (value: string, max: number) =>
  value
    .trim()
    .replace(/\n{3,}/g, '\n\n')
    .slice(0, max);

export function generatePrompt(state: PromptState) {
  const job = jobs.find((item) => item.id === state.jobId) || jobs[0];
  const selectedTools = [...new Set(state.toolIds)]
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool))
    .sort((a, b) => tools.indexOf(a) - tools.indexOf(b));
  const project = clean(state.project, 120);
  const branch = clean(state.branch, 120);
  const context = clean(state.context, 4000);
  const sections = [
    '# Coding task',
    '',
    '## Objective',
    '',
    job.instruction,
    '',
    project || branch || context
      ? '## Repository context\n\n' +
        [
          project && `- Project: ${project}`,
          branch && `- Branch: ${branch}`,
          context && `- Context:\n\n  ${context.replace(/\n/g, '\n  ')}`,
        ]
          .filter(Boolean)
          .join('\n')
      : '',
    selectedTools.length
      ? `## Relevant tools and apps\n\n${selectedTools.map((tool) => `- **${tool.label}:** ${tool.note}`).join('\n')}`
      : '',
    '## Instructions',
    '',
    '1. Inspect the existing implementation before changing anything.',
    '2. Identify the smallest safe change that solves the task.',
    '3. Preserve existing behaviour unless the task requires a change.',
    '4. Add or update focused tests where behaviour changes.',
    '5. Run the relevant format, typecheck, build, and test commands.',
    '6. Do not modify unrelated files.',
    '',
    '## Acceptance criteria',
    '',
    '- The requested outcome works as described.',
    '- Existing behaviour remains intact.',
    '- Verification commands pass, or failures are explained.',
    '- The final response names the files changed and remaining risks.',
    '',
    '## Constraints',
    '',
    '- Do not expose, create, or request secrets.',
    '- Do not access external services unless explicitly required.',
    '- Ask before destructive, broad, or irreversible changes.',
    '',
    '## Requested final response',
    '',
    'Summarize the root cause or approach, files changed, checks run, assumptions, and remaining risks.',
  ];
  return sections.filter(Boolean).join('\n');
}

export function hasSecretLikeText(value: string) {
  return /(ghp_|github_pat_|sk-[A-Za-z0-9]|AKIA[A-Z0-9]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/.test(
    value,
  );
}
