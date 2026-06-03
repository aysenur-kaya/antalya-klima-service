import { prisma } from "@/lib/prisma";
import {
  blogPostSearchWhere,
  customerRequestSearchWhere,
  districtSearchWhere,
  serviceSearchWhere,
} from "@/lib/api/admin-search";

export type GlobalSearchHit = {
  id: string;
  title: string;
  subtitle: string;
  sectionId: "requests" | "services" | "blog" | "districts";
};

export type GlobalSearchResult = {
  q: string;
  total: number;
  customerRequests: GlobalSearchHit[];
  services: GlobalSearchHit[];
  blogPosts: GlobalSearchHit[];
  districts: GlobalSearchHit[];
};

const PREVIEW_LIMIT = 8;

export async function runAdminGlobalSearch(q: string): Promise<GlobalSearchResult> {
  const trimmed = q.trim();
  const empty: GlobalSearchResult = {
    q: trimmed,
    total: 0,
    customerRequests: [],
    services: [],
    blogPosts: [],
    districts: [],
  };

  if (!trimmed) return empty;

  const requestWhere = customerRequestSearchWhere(trimmed);
  const serviceWhere = serviceSearchWhere(trimmed);
  const blogWhere = blogPostSearchWhere(trimmed);
  const districtWhere = districtSearchWhere(trimmed);

  const [requests, services, blogs, districts, reqTotal, svcTotal, blogTotal, distTotal] =
    await Promise.all([
      prisma.customerRequest.findMany({
        where: requestWhere,
        orderBy: { createdAt: "desc" },
        take: PREVIEW_LIMIT,
        select: {
          id: true,
          name: true,
          district: true,
          service: true,
          reference: true,
        },
      }),
      prisma.service.findMany({
        where: serviceWhere,
        orderBy: { title: "asc" },
        take: PREVIEW_LIMIT,
        select: { id: true, title: true, slug: true, type: true },
      }),
      prisma.blogPost.findMany({
        where: blogWhere,
        orderBy: { updatedAt: "desc" },
        take: PREVIEW_LIMIT,
        select: { id: true, title: true, slug: true, status: true },
      }),
      prisma.district.findMany({
        where: districtWhere,
        orderBy: { name: "asc" },
        take: PREVIEW_LIMIT,
        select: { id: true, name: true, slug: true },
      }),
      prisma.customerRequest.count({ where: requestWhere }),
      prisma.service.count({ where: serviceWhere }),
      prisma.blogPost.count({ where: blogWhere }),
      prisma.district.count({ where: districtWhere }),
    ]);

  const customerRequests: GlobalSearchHit[] = requests.map((r) => ({
    id: r.id,
    title: r.name,
    subtitle: [r.district, r.service, r.reference].filter(Boolean).join(" · "),
    sectionId: "requests",
  }));

  const serviceHits: GlobalSearchHit[] = services.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.slug,
    sectionId: "services",
  }));

  const blogPosts: GlobalSearchHit[] = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    subtitle: `${b.slug} · ${b.status === "PUBLISHED" ? "Yayında" : "Taslak"}`,
    sectionId: "blog",
  }));

  const districtHits: GlobalSearchHit[] = districts.map((d) => ({
    id: d.id,
    title: d.name,
    subtitle: d.slug,
    sectionId: "districts",
  }));

  return {
    q: trimmed,
    total: reqTotal + svcTotal + blogTotal + distTotal,
    customerRequests,
    services: serviceHits,
    blogPosts,
    districts: districtHits,
  };
}
