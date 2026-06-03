import { markdownToPreviewHtml } from "@/lib/markdown/preview";

export default function MarkdownArticleBody({ content }: { content: string }) {
  const html = markdownToPreviewHtml(content);
  if (!html) {
    return (
      <p className="text-sm text-gray-500 leading-relaxed">
        Bu rehber için henüz ayrıntılı içerik eklenmemiş.
      </p>
    );
  }

  return (
    <div
      className="rehber-article max-w-none space-y-1 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-dark [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-dark [&_h3]:mt-6 [&_p]:text-gray-600 [&_p]:text-sm [&_p]:md:text-[15px] [&_p]:leading-relaxed [&_ul]:text-gray-600 [&_ul]:text-sm [&_ul]:md:text-[15px] [&_a]:text-brand-red [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
