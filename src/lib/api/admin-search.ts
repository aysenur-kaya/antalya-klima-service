import type { Prisma } from "@prisma/client";

/** PostgreSQL case-insensitive contains */
export function textContains(q: string): { contains: string; mode: "insensitive" } {
  return { contains: q, mode: "insensitive" };
}

export function customerRequestSearchWhere(q: string): Prisma.CustomerRequestWhereInput {
  if (!q) return {};
  return {
    OR: [
      { name: textContains(q) },
      { phone: textContains(q) },
      { district: textContains(q) },
      { service: textContains(q) },
      { message: textContains(q) },
      { reference: textContains(q) },
    ],
  };
}

export function serviceSearchWhere(q: string): Prisma.ServiceWhereInput {
  if (!q) return {};
  return {
    OR: [
      { title: textContains(q) },
      { slug: textContains(q) },
      { summary: textContains(q) },
    ],
  };
}

export function blogPostSearchWhere(q: string): Prisma.BlogPostWhereInput {
  if (!q) return {};
  return {
    OR: [
      { title: textContains(q) },
      { slug: textContains(q) },
      { excerpt: textContains(q) },
      { content: textContains(q) },
    ],
  };
}

export function testimonialSearchWhere(q: string): Prisma.TestimonialWhereInput {
  if (!q) return {};
  return {
    OR: [
      { author: textContains(q) },
      { district: textContains(q) },
      { excerpt: textContains(q) },
    ],
  };
}

export function districtSearchWhere(q: string): Prisma.DistrictWhereInput {
  if (!q) return {};
  return {
    OR: [
      { name: textContains(q) },
      { slug: textContains(q) },
      {
        neighborhoods: {
          some: {
            OR: [{ name: textContains(q) }, { slug: textContains(q) }],
          },
        },
      },
    ],
  };
}

export function neighborhoodFilterWhere(q: string): Prisma.NeighborhoodWhereInput | undefined {
  if (!q) return undefined;
  return {
    OR: [{ name: textContains(q) }, { slug: textContains(q) }],
  };
}
