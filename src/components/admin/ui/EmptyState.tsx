export default function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-dashed border-brand-border bg-brand-light/50 py-10 text-center text-sm text-slate-500">
      {message}
    </p>
  );
}
