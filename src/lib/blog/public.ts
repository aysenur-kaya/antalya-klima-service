import { BlogPostStatus, type ServiceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const publishedWhere = { status: BlogPostStatus.PUBLISHED } as const;

export type RehberListItem = {
  slug: string;
  title: string;
  summary: string | null;
  category: ServiceType;
  createdAt: string;
};

export type RehberDetail = {
  slug: string;
  title: string;
  summary: string | null;
  content: string | null;
  category: ServiceType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

function toListItem(row: {
  slug: string;
  title: string;
  excerpt: string | null;
  category: ServiceType;
  createdAt: Date;
}): RehberListItem {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.excerpt,
    category: row.category,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getPublishedRehberList(): Promise<RehberListItem[]> {
  const rows = await prisma.blogPost.findMany({
    where: publishedWhere,
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      createdAt: true,
    },
  });
  return rows.map(toListItem);
}

export async function getPublishedRehberSlugs(): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: publishedWhere,
    select: { slug: true },
    orderBy: { slug: "asc" },
  });
  return rows.map((r) => r.slug);
}

export async function getPublishedRehberBySlug(slug: string): Promise<RehberDetail | null> {
  const row = await prisma.blogPost.findFirst({
    where: { slug, ...publishedWhere },
  });
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    summary: row.excerpt,
    content: row.content,
    category: row.category,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt?.toISOString() ?? null,
  };
}

export async function getRelatedRehberPosts(
  slug: string,
  category: ServiceType,
  limit = 4
): Promise<RehberListItem[]> {
  const rows = await prisma.blogPost.findMany({
    where: { ...publishedWhere, category, slug: { not: slug } },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      createdAt: true,
    },
  });
  return rows.map(toListItem);
}

export function rehberCategoryLabel(category: ServiceType): string {
  return category === "KLIMA" ? "Klima (split / multi)" : "Beyaz eşya";
}

export function rehberCategoryBadge(category: ServiceType): string {
  return category === "KLIMA" ? "Klima" : "Beyaz eşya";
}
