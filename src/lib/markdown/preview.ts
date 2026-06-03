function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code class=\"rounded bg-brand-gray px-1 py-0.5 text-xs\">$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-brand-red underline underline-offset-2" target="_blank" rel="noreferrer noopener">$1</a>'
  );
  return out;
}

/** Basit Markdown → HTML (admin önizleme; güvenlik için HTML kaçırılır). */
export function markdownToPreviewHtml(markdown: string): string {
  const trimmed = markdown.trim();
  if (!trimmed) return "";

  const blocks = trimmed.split(/\n{2,}/);
  const htmlParts: string[] = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const first = lines[0] ?? "";

    if (/^###\s+/.test(first)) {
      htmlParts.push(
        `<h3 class="mb-2 mt-4 text-base font-semibold text-brand-dark">${inlineMarkdown(first.replace(/^###\s+/, ""))}</h3>`
      );
      const rest = lines.slice(1).join("\n").trim();
      if (rest) htmlParts.push(`<p class="mb-3 text-sm leading-relaxed text-slate-600">${inlineMarkdown(rest)}</p>`);
      continue;
    }

    if (/^##\s+/.test(first)) {
      htmlParts.push(
        `<h2 class="mb-2 mt-4 text-lg font-semibold text-brand-dark">${inlineMarkdown(first.replace(/^##\s+/, ""))}</h2>`
      );
      const rest = lines.slice(1).join("\n").trim();
      if (rest) htmlParts.push(`<p class="mb-3 text-sm leading-relaxed text-slate-600">${inlineMarkdown(rest)}</p>`);
      continue;
    }

    if (lines.every((l) => /^[-*]\s+/.test(l.trim()))) {
      const items = lines
        .map((l) => l.trim().replace(/^[-*]\s+/, ""))
        .filter(Boolean)
        .map((l) => `<li class="text-sm leading-relaxed text-slate-600">${inlineMarkdown(l)}</li>`)
        .join("");
      htmlParts.push(`<ul class="mb-3 list-disc space-y-1 pl-5">${items}</ul>`);
      continue;
    }

    htmlParts.push(
      `<p class="mb-3 text-sm leading-relaxed text-slate-600">${inlineMarkdown(block.replace(/\n/g, " "))}</p>`
    );
  }

  return htmlParts.join("");
}
