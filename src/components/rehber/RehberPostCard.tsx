import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { RehberListItem } from "@/lib/blog/public";
import { rehberCategoryBadge } from "@/lib/blog/public";
import { formatRehberDate } from "@/lib/blog/format";

export default function RehberPostCard({ post }: { post: RehberListItem }) {
  const displayTitle = post.title.split("|")[0].trim();

  return (
    <Link
      href={`/rehber/${post.slug}`}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:border-brand-red/35 hover:shadow-md transition-all"
    >
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-snug mb-2">
          {displayTitle}
        </h3>
        {post.summary ? (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.summary}</p>
        ) : null}
        <code className="mt-2 block break-all text-xs text-gray-400">/rehber/{post.slug}</code>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
          <span>{rehberCategoryBadge(post.category)}</span>
          <time dateTime={post.createdAt}>{formatRehberDate(post.createdAt)}</time>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-red shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
