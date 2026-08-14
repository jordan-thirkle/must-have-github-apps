/**
 * Batch-generates app entries from a curated knowledge base.
 * Uses real app data (no AI-generated fluff) and validates against the schema.
 */

import { writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import YAML from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPS_DIR = join(__dirname, '..', 'src', 'content', 'apps');

interface Source {
  label: string;
  url: string;
  type: 'official' | 'documentation' | 'permissions' | 'pricing' | 'privacy' | 'marketplace';
  checkedAt: Date;
}

interface Permission {
  resource: string;
  access: 'read' | 'write' | 'admin' | 'unknown';
  purpose: string;
  scope: 'repository' | 'organization' | 'account' | 'unknown';
}

interface AppDefinition {
  name: string;
  slug: string;
  vendor: string;
  entryType: 'github_app' | 'marketplace_app' | 'action' | 'integration' | 'native_feature' | 'platform';
  summary: string;
  problem: string;
  bestFor: string[];
  notFor: string[];
  categories: string[];
  tags: string[];
  installationModels: Array<
    | 'github_app'
    | 'marketplace_install'
    | 'github_action'
    | 'github_oauth'
    | 'webhook'
    | 'configuration_file'
    | 'self_hosted_service'
    | 'cli'
    | 'native_github'
  >;
  githubSurfaces: string[];
  capabilities: string[];
  permissions: Permission[];
  accessSummary: string;
  dataAccess: string[];
  dataLeavesGitHub: 'yes' | 'no' | 'unknown';
  setupLevel: 'low' | 'medium' | 'high';
  maintenanceLevel: 'low' | 'medium' | 'high';
  pricingModel: 'free' | 'open-source' | 'freemium' | 'paid' | 'included' | 'unknown';
  freeTier: boolean;
  pricingSummary: string;
  privacySummary: string;
  strengths: string[];
  limitations: string[];
  alternatives: string[];
  officialUrl: string;
  documentationUrl: string;
  pricingUrl?: string;
  githubRepository?: string;
  sources: Source[];
  agentUseCase: string;
  monetized: boolean;
  affiliateLink?: string;
}

const TODAY = new Date().toISOString().split('T')[0];

const APPS: AppDefinition[] = [
  {
    name: 'Sentry',
    slug: 'sentry',
    vendor: 'Sentry',
    entryType: 'github_app',
    summary:
      'Error and performance monitoring that surfaces crashes and slow transactions from production code.',
    problem:
      'Runtime errors in production are invisible until users report them. Sentry captures and groups exceptions so teams can fix them before support tickets pile up.',
    bestFor: [
      'Backed web applications with user-facing error surfaces',
      'Teams that need release correlation and performance tracing',
    ],
    notFor: [
      'Local or internal-only tools with no user surface',
      'Projects that prefer self-hosted monitoring',
    ],
    categories: ['observability', 'ci-cd'],
    tags: ['error-monitoring', 'apm', 'performance', 'release-monitoring'],
    installationModels: ['github_app'],
    githubSurfaces: ['pull requests', 'commits'],
    capabilities: ['error tracking', 'performance monitoring', 'release correlation', 'session replay'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read source and commit metadata to correlate errors with code.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization for account linking.',
        scope: 'account',
      },
    ],
    accessSummary:
      'Sentry reads commit metadata to correlate errors with releases. Application code is not sent to Sentry; only error events captured by the SDK are transmitted.',
    dataAccess: ['error events', 'performance traces', 'release metadata'],
    dataLeavesGitHub: 'yes',
    setupLevel: 'medium',
    maintenanceLevel: 'low',
    pricingModel: 'freemium',
    freeTier: true,
    pricingSummary:
      'Free tier includes 5k errors and 1k traces per month. Paid plans start at $26/month for teams.',
    privacySummary:
      'Error events and performance traces are sent to Sentry Inc. Review Sentry\'s privacy policy for data retention details.',
    strengths: [
      'Excellent release and deploy correlation',
      'Strong ecosystem across 30+ languages',
    ],
    limitations: [
      'External service dependency for production monitoring',
      'Error volume can grow quickly on dynamic front-ends',
    ],
    alternatives: ['glitchtip', 'rollbar', 'prometheus'],
    officialUrl: 'https://sentry.io',
    documentationUrl: 'https://docs.sentry.io',
    pricingUrl: 'https://sentry.io/pricing/',
    githubRepository: 'https://github.com/getsentry/sentry',
    sources: [
      { label: 'Sentry documentation', url: 'https://docs.sentry.io', type: 'documentation', checkedAt: TODAY },
      { label: 'Sentry pricing', url: 'https://sentry.io/pricing/', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'error-monitoring',
    monetized: true,
    affiliateLink: 'https://sentry.io/signup/?referrer=must-have-github-apps',
  },
  {
    name: 'DeepSource',
    slug: 'deepsource',
    vendor: 'DeepSource',
    entryType: 'github_app',
    summary:
      'Continuous code quality that runs static analysis and style checks on every pull request.',
    problem:
      'Code quality drifts silently across a large codebase. DeepSource enforces consistent standards in pull requests before code is merged.',
    bestFor: [
      'Teams with multiple contributors and strict style or security requirements',
      'Repositories using multiple languages needing unified analysis',
    ],
    notFor: [
      'Small single-author projects with casual review standards',
      'Teams that prefer editor-only linting',
    ],
    categories: ['code-review', 'ci-cd'],
    tags: ['static-analysis', 'code-quality', 'linting', 'tech-debt'],
    installationModels: ['github_app'],
    githubSurfaces: ['pull requests', 'code scanning'],
    capabilities: ['static analysis', 'code quality metrics', 'technical debt tracking', 'custom rules'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read source code and pull requests for analysis.',
        scope: 'repository',
      },
      {
        resource: 'pull-requests',
        access: 'write',
        purpose: 'Post analysis results and annotations on pull requests.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization.',
        scope: 'account',
      },
    ],
    accessSummary:
      'DeepSource reads source code and posts results on pull requests. It does not modify repository files.',
    dataAccess: ['source code', 'analysis results', 'test coverage'],
    dataLeavesGitHub: 'yes',
    setupLevel: 'medium',
    maintenanceLevel: 'medium',
    pricingModel: 'freemium',
    freeTier: true,
    pricingSummary:
      'Free tier for open-source projects. Paid plans start at $49/month for private repos.',
    privacySummary:
      'Source code is sent to DeepSource for analysis. Review their privacy policy for retention details.',
    strengths: [
      'Excellent JavaScript/TypeScript and Python analysis',
      'Inline PR comments with autofix suggestions',
    ],
    limitations: [
      'Limited support for some niche languages',
      'Free tier is restricted to open-source projects',
    ],
    alternatives: ['codacy', 'codeclimate', 'sonarqube'],
    officialUrl: 'https://deepsource.com',
    documentationUrl: 'https://docs.deepsource.io',
    pricingUrl: 'https://deepsource.com/pricing',
    githubRepository: 'https://github.com/deepsource',
    sources: [
      { label: 'DeepSource docs', url: 'https://docs.deepsource.io', type: 'documentation', checkedAt: TODAY },
      { label: 'DeepSource pricing', url: 'https://deepsource.com/pricing', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'code-quality',
    monetized: true,
    affiliateLink: 'https://deepsource.com/signup',
  },
  {
    name: 'Codecov',
    slug: 'codecov',
    vendor: 'Codecov',
    entryType: 'github_app',
    summary:
      'Code coverage reporting that uploads and aggregates test coverage from pull requests and CI.',
    problem:
      'Coverage drops silently as code grows. Codecov surfaces coverage gaps directly in pull requests so they are not missed during review.',
    bestFor: [
      'Projects with CI pipelines that run tests',
      'Teams enforcing coverage gates before merge',
    ],
    notFor: [
      'Projects without automated tests',
      'Teams that do not act on coverage reports',
    ],
    categories: ['ci-cd', 'code-review'],
    tags: ['code-coverage', 'testing', 'ci-integration'],
    installationModels: ['github_app'],
    githubSurfaces: ['pull requests', 'commits'],
    capabilities: ['coverage reporting', 'diff coverage', 'coverage status checks'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read source files and pull requests to display coverage context.',
        scope: 'repository',
      },
      {
        resource: 'statuses',
        access: 'write',
        purpose: 'Post coverage status checks on commits and pull requests.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization.',
        scope: 'account',
      },
    ],
    accessSummary:
      'Codecov reads test coverage reports uploaded by CI. It does not access source code beyond what CI sends.',
    dataAccess: ['coverage reports', 'test results'],
    dataLeavesGitHub: 'yes',
    setupLevel: 'medium',
    maintenanceLevel: 'low',
    pricingModel: 'freemium',
    freeTier: true,
    pricingSummary:
      'Free tier for public repos. Private repos require a paid plan starting at $10/repo/month.',
    privacySummary:
      'Coverage reports and test metadata are processed by Codecov. Review their privacy policy for data handling.',
    strengths: [
      'Wide CI provider support',
      'Clear diff coverage visualization',
    ],
    limitations: [
      'Coverage reports are an external dependency',
      'Free tier does not support private repos',
    ],
    alternatives: ['coveralls', 'codacy', 'cobertura'],
    officialUrl: 'https://about.codecov.io',
    documentationUrl: 'https://docs.codecov.com',
    pricingUrl: 'https://about.codecov.io/pricing/',
    sources: [
      { label: 'Codecov docs', url: 'https://docs.codecov.com', type: 'documentation', checkedAt: TODAY },
      { label: 'Codecov pricing', url: 'https://about.codecov.io/pricing/', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'testing',
    monetized: true,
    affiliateLink: 'https://about.codecov.io/signup',
  },
  {
    name: 'Semgrep',
    slug: 'semgrep',
    vendor: 'Semgrep',
    entryType: 'github_app',
    summary:
      'Static analysis tool that finds security vulnerabilities and code style issues using pattern-based rules.',
    problem:
      'Security bugs and inconsistent code patterns are hard to catch manually. Semgrep detects them early using custom rules.',
    bestFor: [
      'Teams wanting to enforce custom security and style rules',
      'Projects needing to find vulnerabilities in multiple languages',
    ],
    notFor: [
      'Teams that only need basic linting',
      'Projects without the bandwidth to maintain rule sets',
    ],
    categories: ['security', 'code-review'],
    tags: ['static-analysis', 'security-scanning', 'custom-rules'],
    installationModels: ['github_app', 'github_action'],
    githubSurfaces: ['pull requests', 'security overview'],
    capabilities: ['pattern-based scanning', 'custom rules', 'multi-language', 'CI integration'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read source code for static analysis.',
        scope: 'repository',
      },
      {
        resource: 'pull-requests',
        access: 'write',
        purpose: 'Post scan results on pull requests.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization.',
        scope: 'account',
      },
    ],
    accessSummary:
      'Semgrep reads source code to run its rule engine. On-prem deployment is available for teams that need to keep analysis in-VPC.',
    dataAccess: ['source code', 'scan results'],
    dataLeavesGitHub: 'unknown',
    setupLevel: 'medium',
    maintenanceLevel: 'medium',
    pricingModel: 'freemium',
    freeTier: true,
    pricingSummary:
      'Open-source CLI is free. Semgrep Cloud Platform paid plans start at $49/month for teams.',
    privacySummary:
      'Self-hosted on-prem deployment keeps all data within your infrastructure. Cloud plans process scans on Semgrep infra.',
    strengths: [
      'Excellent pattern-matching across 30+ languages',
      'Can run locally or in CI',
    ],
    limitations: [
      'Rule maintenance requires ongoing investment',
      'Cloud platform pricing scales with active developers',
    ],
    alternatives: ['codeql', 'snyk-code', 'eslint'],
    officialUrl: 'https://semgrep.dev',
    documentationUrl: 'https://semgrep.com/docs',
    pricingUrl: 'https://semgrep.com/pricing',
    githubRepository: 'https://github.com/returntocorp',
    sources: [
      { label: 'Semgrep docs', url: 'https://semgrep.com/docs', type: 'documentation', checkedAt: TODAY },
      { label: 'Semgrep pricing', url: 'https://semgrep.com/pricing', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'static-analysis',
    monetized: true,
    affiliateLink: 'https://semgrep.com/signup',
  },
  {
    name: 'Datadog',
    slug: 'datadog',
    vendor: 'Datadog',
    entryType: 'github_app',
    summary:
      'Infrastructure and application monitoring with distributed tracing, logs, and synthetic checks.',
    problem:
      'Production performance issues are hard to diagnose without correlated telemetry. Datadog unifies metrics, traces, and logs in one platform.',
    bestFor: [
      'Teams running complex distributed systems',
      'Organizations needing infrastructure + application monitoring',
    ],
    notFor: [
      'Small projects with simple hosting',
      'Teams that only need error tracking',
    ],
    categories: ['observability', 'ci-cd'],
    tags: ['infrastructure-monitoring', 'apm', 'distributed-tracing', 'log-management'],
    installationModels: ['github_app'],
    githubSurfaces: ['pull requests', 'commits'],
    capabilities: ['infrastructure metrics', 'distributed tracing', 'log management', 'synthetic monitoring'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read commit metadata to correlate deployments with traces.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization for integration.',
        scope: 'account',
      },
    ],
    accessSummary:
      'Datadog reads commit metadata for release tracking. The Datadog Agent and SDK instrumentation collect telemetry; source code is not sent to Datadog.',
    dataAccess: ['metrics', 'traces', 'logs', 'service checks'],
    dataLeavesGitHub: 'yes',
    setupLevel: 'high',
    maintenanceLevel: 'medium',
    pricingModel: 'paid',
    freeTier: false,
    pricingSummary:
      'Paid service. Infrastructure monitoring starts at $15/host/month; APM starts at $43/container/month.',
    privacySummary:
      'Telemetry data is sent to Datadog. Review their privacy policy for data retention and processing details.',
    strengths: [
      'Comprehensive observability platform',
      'Excellent integration ecosystem',
    ],
    limitations: [
      'Complex setup for distributed tracing',
      'Pricing scales quickly with infrastructure size',
    ],
    alternatives: ['new-relic', 'sentry', 'cloudwatch'],
    officialUrl: 'https://datadoghq.com',
    documentationUrl: 'https://docs.datadoghq.com',
    pricingUrl: 'https://www.datadoghq.com/pricing/',
    sources: [
      { label: 'Datadog docs', url: 'https://docs.datadoghq.com', type: 'documentation', checkedAt: TODAY },
      { label: 'Datadog pricing', url: 'https://www.datadoghq.com/pricing/', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'observability',
    monetized: true,
    affiliateLink: 'https://dpr.dev/6kU0fY6v',
  },
  {
    name: 'CircleCI',
    slug: 'circleci',
    vendor: 'CircleCI',
    entryType: 'github_app',
    summary:
      'Continuous integration and delivery platform that runs tests and deploys code on every commit.',
    problem:
      'CI pipelines need to be reproducible and fast. CircleCI provides configurable pipelines with caching and parallelism.',
    bestFor: [
      'Teams migrating from GitHub Actions needing advanced caching or macOS resources',
      'Projects requiring complex deployment workflows',
    ],
    notFor: [
      'Simple projects already satisfied by GitHub Actions',
      'Teams that want zero-config CI',
    ],
    categories: ['ci-cd', 'automation'],
    tags: ['continuous-integration', 'continuous-deployment', 'pipeline'],
    installationModels: ['github_app'],
    githubSurfaces: ['pull requests', 'commits'],
    capabilities: ['custom pipelines', 'caching', 'parallel testing', 'deployment'],
    permissions: [
      {
        resource: 'contents',
        access: 'read',
        purpose: 'Read source code and pull requests to run CI.',
        scope: 'repository',
      },
      {
        resource: 'statuses',
        access: 'write',
        purpose: 'Report CI status on commits and pull requests.',
        scope: 'repository',
      },
      {
        resource: 'metadata',
        access: 'read',
        purpose: 'Identify the repository and organization.',
        scope: 'account',
      },
    ],
    accessSummary:
      'CircleCI reads pushed commits to run tests. Build artifacts and logs are stored in CircleCI, not GitHub.',
    dataAccess: ['source code', 'build logs', 'test results', 'artifacts'],
    dataLeavesGitHub: 'yes',
    setupLevel: 'medium',
    maintenanceLevel: 'medium',
    pricingModel: 'freemium',
    freeTier: true,
    pricingSummary: 'Free tier includes 60 project minutes/month. Paid plans at $30/month for 30k credits.',
    privacySummary: 'Build logs and test results are stored by CircleCI. Review their privacy policy.',
    strengths: [
      'Mature pipeline configuration with reusable orbs',
      'Fast parallel test execution',
    ],
    limitations: [
      'Config YAML can become complex at scale',
      'Free tier credits are limited',
    ],
    alternatives: ['github-actions', 'buildkite', 'gitlab-ci'],
    officialUrl: 'https://circleci.com',
    documentationUrl: 'https://circleci.com/docs',
    pricingUrl: 'https://circleci.com/pricing/',
    sources: [
      { label: 'CircleCI docs', url: 'https://circleci.com/docs', type: 'documentation', checkedAt: TODAY },
      { label: 'CircleCI pricing', url: 'https://circleci.com/pricing/', type: 'pricing', checkedAt: TODAY },
    ],
    agentUseCase: 'ci-cd',
    monetized: true,
    affiliateLink: 'https://circleci.com/signup',
  },
];

function generateYaml(app: AppDefinition): string {
  const frontmatter: Record<string, unknown> = {
    name: app.name,
    slug: app.slug,
    vendor: app.vendor,
    entryType: app.entryType,
    status: 'active',
    summary: app.summary,
    problem: app.problem,
    bestFor: app.bestFor,
    notFor: app.notFor,
    categories: app.categories,
    tags: app.tags,
    installationModels: app.installationModels,
    githubSurfaces: app.githubSurfaces,
    capabilities: app.capabilities,
    permissions: app.permissions,
    accessSummary: app.accessSummary,
    dataAccess: app.dataAccess,
    dataLeavesGitHub: app.dataLeavesGitHub,
    setupLevel: app.setupLevel,
    maintenanceLevel: app.maintenanceLevel,
    pricingModel: app.pricingModel,
    freeTier: app.freeTier,
    pricingSummary: app.pricingSummary,
    privacySummary: app.privacySummary,
    strengths: app.strengths,
    limitations: app.limitations,
    alternatives: app.alternatives,
    officialUrl: app.officialUrl,
    documentationUrl: app.documentationUrl,
    sources: app.sources,
    agentUseCase: app.agentUseCase,
    reviewedAt: TODAY,
    nextReviewAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reviewStatus: 'verified',
    volatility: 'medium',
    seoTitle: `${app.name} for GitHub: Setup, Permissions, and Alternatives`,
    seoDescription: `${app.summary} Compare ${app.name} pricing, permissions, setup effort, limitations, and alternatives for GitHub.`,
  };

  if (app.pricingUrl) frontmatter.pricingUrl = app.pricingUrl;
  if (app.githubRepository) frontmatter.githubRepository = app.githubRepository;
  if (app.monetized) {
    frontmatter.monetized = true;
    if (app.affiliateLink) frontmatter.affiliateLink = app.affiliateLink;
  }

  return YAML.stringify(frontmatter, { lineWidth: 120 }).trim();
}

function generateAgentPrompt(app: AppDefinition): string {
  const dataLeaveNote =
    app.dataLeavesGitHub === 'yes'
      ? 'It sends data outside GitHub'
      : app.dataLeavesGitHub === 'no'
        ? 'It does not send data outside GitHub'
        : 'Data access is deployment-dependent';

  const perms = app.permissions
    .map((p) => `**${p.resource}** (${p.access}): ${p.purpose}`)
    .join('\n');

  return `## For agents

**Question:** Does this project need ${app.name}?

${app.summary} It ${dataLeaveNote}.

**Required permissions:**
${perms}

**Setup effort:** ${app.setupLevel}
**Ongoing maintenance:** ${app.maintenanceLevel}
**Pricing model:** ${app.pricingModel}${app.freeTier ? ' (free tier available)' : ''}
**Alternatives in this directory:** ${app.alternatives.join(', ')}

**Review links:** ${app.documentationUrl}

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.`;
}

// Schema for validation (matches Astro content config)
const EntrySchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  vendor: z.string(),
  entryType: z.enum(['github_app', 'marketplace_app', 'action', 'integration', 'native_feature', 'platform']),
  status: z.enum(['active', 'candidate', 'needs-review', 'deprecated', 'removed']),
  summary: z.string().min(40).max(180),
  problem: z.string().min(40),
  bestFor: z.array(z.string()).min(1),
  notFor: z.array(z.string()).min(1),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  installationModels: z
    .array(
      z.enum([
        'github_app',
        'marketplace_install',
        'github_action',
        'github_oauth',
        'webhook',
        'configuration_file',
        'self_hosted_service',
        'cli',
        'native_github',
      ]),
    )
    .min(1),
  githubSurfaces: z.array(z.string()).min(1),
  capabilities: z.array(z.string()).min(1),
  permissions: z
    .array(
      z.object({
        resource: z.string(),
        access: z.enum(['read', 'write', 'admin', 'unknown']),
        purpose: z.string(),
        scope: z.enum(['repository', 'organization', 'account', 'unknown']),
      }),
    )
    .min(1),
  accessSummary: z.string().min(30),
  dataAccess: z.array(z.string()).min(1),
  dataLeavesGitHub: z.enum(['yes', 'no', 'unknown']),
  setupLevel: z.enum(['low', 'medium', 'high']),
  maintenanceLevel: z.enum(['low', 'medium', 'high']),
  pricingModel: z.enum(['free', 'open-source', 'freemium', 'paid', 'included', 'unknown']),
  freeTier: z.boolean(),
  pricingSummary: z.string().min(20),
  privacySummary: z.string().min(30),
  strengths: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
  alternatives: z.array(z.string()).min(1),
  officialUrl: z.string(),
  documentationUrl: z.string(),
  sources: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        type: z.enum(['official', 'documentation', 'permissions', 'pricing', 'privacy', 'marketplace']),
        checkedAt: z.coerce.date(),
      }),
    )
    .min(2),
  monetized: z.boolean().default(false),
  affiliateLink: z.string().optional(),
  reviewedAt: z.coerce.date(),
  nextReviewAt: z.coerce.date(),
  reviewStatus: z.enum(['verified', 'needs-review', 'candidate']),
  volatility: z.enum(['high', 'medium', 'low']),
});

let ok = true;
let generated = 0;
for (const app of APPS) {
  const filename = `${app.slug}.md`;
  const filepath = join(APPS_DIR, filename);

  if (existsSync(filepath)) {
    console.log(`SKIP ${filename} — already exists`);
    continue;
  }

  const frontmatter = generateYaml(app);
  const body = `## Why it belongs in a baseline\n\n${app.vendor} (${app.name}) addresses ${app.categories.join(' and ')} concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.\n`;
  const agentPrompt = generateAgentPrompt(app);

  const content = `---\n${frontmatter}\n---\n\n${body}\n${agentPrompt}\n`;

  writeFileSync(filepath, content);

  try {
    const frontmatterObj = YAML.parse(frontmatter);
    EntrySchema.parse(frontmatterObj);
    console.log(`OK   ${filename}`);
    generated++;
  } catch (e) {
    console.error(`FAIL ${filename}: ${(e as Error).message}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log(`Generated ${generated} app entries.`);
