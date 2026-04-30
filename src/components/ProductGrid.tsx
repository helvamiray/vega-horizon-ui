import { useState } from "react";
import { Product, CATEGORY_LABEL } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ProductCard = ({
  p, active, onSelect,
}: { p: Product; active: boolean; onSelect: (id: string) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const { add, openCart } = useCart();

  return (
    <div
      className="group relative h-72 [perspective:1200px]"
      onClick={() => onSelect(p.id)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* === FRONT === */}
        <div
          className={`absolute inset-0 rounded-xl overflow-hidden glass [backface-visibility:hidden] transition-all duration-300 ${
            active
              ? "border-amber/70 [box-shadow:0_0_30px_hsl(var(--amber)/0.45)]"
              : "group-hover:[box-shadow:0_0_30px_hsl(var(--cyan)/0.4)] group-hover:border-cyan/60"
          }`}
        >
          {/* Background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-opacity"
            autoPlay muted loop playsInline
            poster={p.image}
          >
            <source src={p.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

          {/* Content */}
          <div className="relative h-full flex flex-col p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-foreground/60">
                {p.brand}
              </span>
              <span
                className={`text-[10px] font-display tracking-[0.2em] uppercase px-2 py-0.5 rounded border backdrop-blur-sm ${
                  active ? "border-amber/60 amber-text" : "border-cyan/40 text-cyan"
                }`}
              >
                {CATEGORY_LABEL[p.category]}
              </span>
            </div>
            <h3
              className={`font-display text-base leading-tight mb-1 ${
                active ? "amber-text" : "text-foreground"
              }`}
            >
              {p.name}
            </h3>
            <p className="text-xs text-foreground/70 line-clamp-2 mb-3">
              {p.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(true);
                }}
                className="border-cyan/50 text-cyan hover:bg-cyan/10 hover:text-cyan font-display tracking-[0.2em] uppercase text-[10px] h-8"
              >
                Özellikler
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  add(p);
                  toast.success(`${p.name} sepete eklendi`, {
                    action: { label: "Sepeti Aç", onClick: () => openCart() },
                  });
                }}
                className="bg-gradient-to-r from-cyan to-cyan-glow text-primary-foreground hover:opacity-90 font-display tracking-[0.2em] uppercase text-[10px] h-8 [box-shadow:0_0_18px_hsl(var(--cyan)/0.5)]"
              >
                Sepete Ekle
              </Button>
            </div>
          </div>

          {/* corner ticks */}
          <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-cyan/60" />
          <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-cyan/60" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-cyan/60" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-cyan/60" />
        </div>

        {/* === BACK === */}
        <div className="absolute inset-0 rounded-xl overflow-hidden glass-strong border-cyan/50 [backface-visibility:hidden] [transform:rotateY(180deg)] p-5 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="font-display text-[10px] tracking-[0.3em] uppercase text-cyan">
                Teknik Özellikler
              </div>
              <h4 className="font-display text-sm mt-1 neon-text">{p.name}</h4>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              className="text-[10px] font-display tracking-[0.25em] uppercase text-foreground/60 hover:text-cyan border border-border/60 rounded px-2 py-1"
            >
              ← Geri
            </button>
          </div>

          <ul className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
            {p.specs.map((s) => (
              <li
                key={s}
                className="text-xs font-mono px-3 py-1.5 rounded bg-secondary/60 border border-cyan/30 text-foreground/85"
              >
                ▸ {s}
              </li>
            ))}
          </ul>

          <Button
            type="button"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              add(p);
              toast.success(`${p.name} sepete eklendi`, {
                action: { label: "Sepeti Aç", onClick: () => openCart() },
              });
            }}
            className="mt-3 w-full bg-gradient-to-r from-amber to-amber/80 text-background hover:opacity-90 font-display tracking-[0.2em] uppercase text-[10px] h-9 [box-shadow:0_0_18px_hsl(var(--amber)/0.5)]"
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, selectedId, onSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} active={p.id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ProductGrid;
