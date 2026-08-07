import { getCollection } from 'astro:content';
import { categoryDefinitions } from '@/content.config';
export { formatStars } from './format';

export const siteName = 'Must-Have GitHub Apps';
export const siteDescription =
  'A security-first directory of GitHub Apps, integrations, Actions, and developer tools.';

export function appPath(slug: string) {
  return `/apps/${slug}/`;
}

export function categoryPath(slug: string) {
  return `/categories/${slug}/`;
}

export async function getApps() {
  const apps = await getCollection('apps', ({ data }) => data.status === 'active');
  return apps.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.name.localeCompare(b.data.name);
  });
}

export async function getCategories() {
  const categories = await getCollection('categories');
  return categories.sort((a, b) => a.data.order - b.data.order);
}

export function getCategoryDefinition(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function reviewState(reviewedAt: Date, nextReviewAt: Date) {
  return {
    overdue: nextReviewAt < new Date(),
    lastChecked: formatDate(reviewedAt),
    nextCheck: formatDate(nextReviewAt),
  };
}

export function entryTypeLabel(entryType: string) {
  return (
    {
      github_app: 'GitHub App',
      marketplace_app: 'Marketplace app',
      action: 'GitHub Action',
      integration: 'Integration',
      native_feature: 'GitHub feature',
      platform: 'Platform',
    }[entryType] ?? entryType
  );
}
