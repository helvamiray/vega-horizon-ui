import { useMemo, useState } from "react";
import { PRODUCTS, BRANDS, Product } from "@/data/products";
import ProductGrid from "./ProductGrid";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const FEATURED_BRANDS = ["Daikin", "Buderus", "E.C.A", "LOWARA", "KODSAN", "CALEFFI", "FRANKISCHE"];

const ProductExplorer = ({ selectedId, onSelect }: Props) => {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);

  const filtered = useMemo<Product[]>(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return PRODUCTS.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (!q) return true;
      const hay = `${p.name} ${p.brand} ${p.description} ${p.category} ${p.specs.join(" ")}`.toLocaleLowerCase("tr");
      return hay.includes(q);
    });
  }, [query, brand]);

  return (
    <div className="flex flex-col gap-4">
      {/* Glass search bar */}
      <div className="glass rounded-xl p-3 flex items-center gap-2">
        <Search className="w-4 h-4 text-cyan shrink-0 ml-1" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün ara: kombi, klima, ısı pompası…"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-foreground/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-1 rounded text-foreground/60 hover:text-cyan transition-colors"
            aria-label="Aramayı temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Brand chips */}
      <div className="glass rounded-xl p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBrand(null)}
          className={`text-[10px] font-display tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all ${
            brand === null
              ? "border-cyan bg-cyan/15 text-cyan [box-shadow:0_0_14px_hsl(var(--cyan)/0.5)]"
              : "border-border/60 text-foreground/60 hover:border-cyan/60 hover:text-cyan"
          }`}
        >
          Tümü
        </button>
        {FEATURED_BRANDS.map((b) => {
          const active = brand === b;
          return (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(active ? null : b)}
              className={`text-[10px] font-display tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all ${
                active
                  ? "border-amber bg-amber/15 amber-text [box-shadow:0_0_14px_hsl(var(--amber)/0.5)]"
                  : "border-border/60 text-foreground/60 hover:border-cyan/60 hover:text-cyan"
              }`}
            >
              {b}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/50">
          {filtered.length} / {PRODUCTS.length} ürün
        </span>
        {(query || brand) && (
          <button
            type="button"
            onClick={() => { setQuery(""); setBrand(null); }}
            className="font-display text-[10px] tracking-[0.25em] uppercase text-cyan hover:amber-text transition-colors"
          >
            Filtreleri sıfırla
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <div className="font-display text-cyan text-lg mb-2">⌬</div>
          <p className="text-sm text-foreground/70">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </p>
        </div>
      ) : (
        <ProductGrid products={filtered} selectedId={selectedId} onSelect={onSelect} />
      )}
    </div>
  );
};

export default ProductExplorer;
