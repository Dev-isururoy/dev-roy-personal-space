export function AdPlaceholder() {
  return (
    <div className="w-full my-12 p-6 bg-muted/30 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center">
      <span className="text-xs font-semibold text-muted tracking-widest uppercase mb-2">
        Advertisement
      </span>
      <div className="w-full max-w-[728px] h-[90px] bg-card border border-border/50 rounded flex items-center justify-center text-sm text-muted">
        AdSense Ad Slot (728x90)
      </div>
      <p className="text-xs text-muted/60 mt-3 max-w-sm">
        This space is reserved for a Google AdSense banner to help support the blog.
      </p>
    </div>
  );
}
