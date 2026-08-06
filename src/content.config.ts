import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sourceSchema = z.object({
  label: z.string(),
  url: z.url(),
  type: z.enum(['official', 'documentation', 'permissions', 'pricing', 'privacy', 'marketplace']),
  checkedAt: z.coerce.date(),
});

const permissionSchema = z.object({
  resource: z.string(),
  access: z.enum(['read', 'write', 'admin', 'unknown']),
  purpose: z.string(),
  scope: z.enum(['repository', 'organization', 'account', 'unknown']),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    vendor: z.string(),
    entryType: z.enum([
      'github_app',
      'marketplace_app',
      'action',
      'integration',
      'native_feature',
      'platform',
    ]),
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
    permissions: z.array(permissionSchema).min(1),
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
    officialUrl: z.url(),
    documentationUrl: z.url(),
    marketplaceUrl: z.url().optional(),
    pricingUrl: z.url().optional(),
    privacyUrl: z.url().optional(),
    reviewedAt: z.coerce.date(),
    nextReviewAt: z.coerce.date(),
    reviewStatus: z.enum(['verified', 'needs-review', 'candidate']),
    volatility: z.enum(['high', 'medium', 'low']),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().min(80).max(170).optional(),
    sources: z.array(sourceSchema).min(2),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().min(60),
    intro: z.string().min(80),
    order: z.number().int().nonnegative(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().min(80).max(170).optional(),
  }),
});

export const collections = { apps, categories };

export const categoryDefinitions = [
  {
    slug: 'security',
    name: 'Security',
    description:
      'Find leaked secrets, vulnerable code, unsafe configuration, and supply-chain risk before they become incidents.',
    order: 1,
  },
  {
    slug: 'dependencies',
    name: 'Dependencies and supply chain',
    description:
      'Keep packages, licenses, manifests, and dependency updates under control with less manual work.',
    order: 2,
  },
  {
    slug: 'code-review',
    name: 'Code review and analysis',
    description:
      'Improve pull-request feedback with static analysis, review assistance, and maintainability checks.',
    order: 3,
  },
  {
    slug: 'ci-cd',
    name: 'Testing and CI/CD',
    description:
      'Run consistent checks, builds, previews, releases, and deployments for every meaningful change.',
    order: 4,
  },
  {
    slug: 'automation',
    name: 'Repository automation',
    description:
      'Automate issue triage, pull requests, labels, releases, documentation, and recurring maintenance.',
    order: 5,
  },
  {
    slug: 'observability',
    name: 'Observability and reliability',
    description: 'Connect code changes to errors, releases, incidents, performance, and uptime.',
    order: 6,
  },
  {
    slug: 'productivity',
    name: 'Developer productivity',
    description:
      'Reduce friction around documentation, discovery, planning, onboarding, and everyday repository work.',
    order: 7,
  },
] as const;

export type AppEntry = Awaited<
  ReturnType<typeof import('astro:content').getCollection<'apps'>>
>[number];
