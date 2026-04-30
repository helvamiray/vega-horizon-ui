import { useState } from "react";
import { Product, CATEGORY_LABEL } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ProductGrid = ({ products, selectedId, onSelect }: ProductGridProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProduct = products.find((p) => p.id === openId) ?? null;

  const handleClick = (id: string) => {
    onSelect(id); // triggers amber highlight in 3D villa
    setOpenId(id); // opens detail modal
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => {
          const active = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleClick(p.id)}
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
                  {CATEGORY_LABEL[p.category]}
                </span>
              </div>
              <h3 className={`font-display text-lg leading-tight mb-2 ${active ? "amber-text" : "text-foreground group-hover:neon-text"}`}>
                {p.name}
              </h3>
              <p className="text-sm text-foreground/70 mb-3">{p.description}</p>
              <ul className="flex flex-wrap gap-2 mb-3">
                {p.specs.map((s) => (
                  <li
                    key={s}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/60 border border-border/50 text-foreground/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <span className="inline-block text-[10px] font-display tracking-[0.3em] uppercase text-cyan group-hover:amber-text transition-colors">
                Detayları Gör →
              </span>

              {/* corner ticks */}
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-cyan/60" />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-cyan/60" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-cyan/60" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-cyan/60" />
            </button>
          );
        })}
      </div>

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="glass-strong max-w-2xl border-cyan/40">
          {openProduct && (
            <>
              <DialogHeader>
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-cyan">
                  {openProduct.brand} · {CATEGORY_LABEL[openProduct.category]}
                </span>
                <DialogTitle className="font-display text-2xl md:text-3xl neon-text">
                  {openProduct.name}
                </DialogTitle>
                <DialogDescription className="text-foreground/70 text-base">
                  {openProduct.description}
                </DialogDescription>
              </DialogHeader>

              <div className="relative rounded-xl overflow-hidden border border-cyan/30 bg-secondary/40 aspect-video">
                <img
                  src={openProduct.image}
                  alt={openProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute bottom-2 right-2 font-mono text-[10px] text-foreground/60 bg-background/70 px-2 py-0.5 rounded">
                  {openProduct.image}
                </div>
              </div>

              <div>
                <h4 className="font-display text-xs tracking-[0.3em] uppercase text-cyan mb-2">
                  Teknik Özellikler
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {openProduct.specs.map((s) => (
                    <li
                      key={s}
                      className="text-xs font-mono px-3 py-1 rounded bg-secondary/60 border border-cyan/30 text-foreground/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    toast.success(`${openProduct.name} sepete eklendi`);
                  }}
                  className="border-cyan/50 text-cyan hover:bg-cyan/10 hover:text-cyan font-display tracking-[0.2em] uppercase text-xs"
                >
                  Sepete Ekle
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setOpenId(null);
                    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-gradient-to-r from-amber to-amber/80 text-background hover:opacity-90 font-display tracking-[0.2em] uppercase text-xs [box-shadow:0_0_24px_hsl(var(--amber)/0.5)]"
                >
                  Teklif Al
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductGrid;
