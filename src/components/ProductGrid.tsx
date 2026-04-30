import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ProductGrid = ({ products, selectedId, onSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((p) => {
        const active = p.id === selectedId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`group relative text-left rounded-xl p-5 transition-all duration-300 glass hover:-translate-y-1 ${
              active
                ? "border-amber/70 [box-shadow:0_0_30px_hsl(var(--amber)/0.4)]"
                : "hover:border-cyan/60 hover:[box-shadow:0_0_24px_hsl(var(--cyan)/0.35)]"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                {p.brand}
              </span>
              <span
                className={`text-[10px] font-display tracking-[0.2em] uppercase px-2 py-0.5 rounded border ${
                  active ? "border-amber/60 amber-text" : "border-cyan/40 text-cyan"
                }`}
              >
                {p.category}
              </span>
            </div>
            <h3 className={`font-display text-lg leading-tight mb-2 ${active ? "amber-text" : "text-foreground group-hover:neon-text"}`}>
              {p.name}
            </h3>
            <p className="text-sm text-foreground/70 mb-3">{p.description}</p>
            <ul className="flex flex-wrap gap-2">
              {p.specs.map((s) => (
                <li
                  key={s}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/60 border border-border/50 text-foreground/70"
                >
                  {s}
                </li>
              ))}
            </ul>

            {/* corner ticks */}
            <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-cyan/60" />
            <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-cyan/60" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-cyan/60" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-cyan/60" />
          </button>
        );
      })}
    </div>
  );
};

export default ProductGrid;
