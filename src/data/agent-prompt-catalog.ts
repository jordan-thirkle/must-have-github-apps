export const jobs = [
  {
    id: 'bug-fix',
    label: 'Fix a bug',
    description: 'Find the cause, make the smallest safe fix, and verify it.',
    instruction:
      'Investigate the reported problem, identify the root cause, make the smallest safe fix, and verify the behaviour with focused tests.',
  },
  {
    id: 'new-feature',
    label: 'Add a feature',
    description: 'Plan the change, implement it, and keep existing behaviour intact.',
    instruction:
      'Understand the existing design, plan the smallest maintainable implementation, build the feature, and verify its acceptance criteria.',
  },
  {
    id: 'review',
    label: 'Review a change',
    description: 'Look for correctness, security, accessibility, and maintenance risks.',
    instruction:
      'Review the proposed change for correctness, security, accessibility, performance, and long-term maintenance risks. Do not change files unless asked.',
  },
  {
    id: 'security',
    label: 'Improve repository security',
    description: 'Find missing protections and recommend a practical baseline.',
    instruction:
      'Audit the repository security baseline, explain the highest-value gaps, and recommend changes in priority order before making them.',
  },
  {
    id: 'maintenance',
    label: 'Maintain dependencies and checks',
    description: 'Update safely and leave repeatable verification behind.',
    instruction:
      'Review dependency and automation health, make safe focused updates, and run the checks that prove the repository still works.',
  },
] as const;

export const tools = [
  {
    id: 'secret-scanning',
    label: 'Secret scanning',
    note: 'Look for leaked credentials and define a response path.',
  },
  {
    id: 'dependabot',
    label: 'Dependabot',
    note: 'Review dependency alerts and update automation.',
  },
  { id: 'codeql', label: 'CodeQL', note: 'Review semantic security analysis and workflow setup.' },
  { id: 'renovate', label: 'Renovate', note: 'Compare configurable dependency update automation.' },
  {
    id: 'github-actions',
    label: 'GitHub Actions',
    note: 'Check repeatable tests, builds, and deployments.',
  },
] as const;

export type JobId = (typeof jobs)[number]['id'];
export type ToolId = (typeof tools)[number]['id'];
export type PromptState = {
  jobId: JobId | '';
  toolIds: ToolId[];
  project: string;
  branch: string;
  context: string;
};
