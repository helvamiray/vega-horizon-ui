import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import ProjectQuoteDialog from "./ProjectQuoteDialog";

const CartSidebar = () => {
  const { items, isOpen, closeCart, remove, setQty, count, clear } = useCart();
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md glass-strong border-l border-cyan/40 text-foreground p-0 flex flex-col"
        >
          <SheetHeader className="p-6 border-b border-cyan/20">
            <SheetTitle className="font-display text-xl tracking-[0.2em] uppercase neon-text flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              Sepetim
              <span className="text-[10px] font-mono text-foreground/60 ml-auto">
                {count} ürün
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 && (
              <div className="text-center py-16">
                <div className="font-display text-cyan text-3xl mb-2">⌬</div>
                <p className="text-sm text-foreground/60">Sepetiniz boş.</p>
                <p className="text-[11px] text-foreground/40 mt-1">
                  Ürün kartlarından "Sepete Ekle" ile başlayın.
                </p>
              </div>
            )}

            {items.map(({ product, qty }) => (
              <div
                key={product.id}
                className="glass rounded-lg p-3 flex gap-3 items-center"
              >
                <div className="w-14 h-14 rounded bg-secondary/60 border border-cyan/30 grid place-items-center shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[10px] tracking-[0.25em] uppercase text-cyan">
                    {product.brand}
                  </div>
                  <div className="text-sm font-medium truncate">{product.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty - 1)}
                      className="w-6 h-6 grid place-items-center rounded border border-cyan/40 text-cyan hover:bg-cyan/10"
                      aria-label="Azalt"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs w-6 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="w-6 h-6 grid place-items-center rounded border border-cyan/40 text-cyan hover:bg-cyan/10"
                      aria-label="Arttır"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  className="text-foreground/50 hover:text-destructive p-1"
                  aria-label="Kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-cyan/20 p-4 space-y-2">
            <Button
              type="button"
              disabled={items.length === 0}
              onClick={() => setQuoteOpen(true)}
              className="w-full h-12 font-display tracking-[0.25em] uppercase text-xs bg-gradient-to-r from-amber to-amber/80 text-background hover:opacity-90 [box-shadow:0_0_24px_hsl(var(--amber)/0.5)]"
            >
              Teklif Al
            </Button>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="w-full text-[10px] font-display tracking-[0.25em] uppercase text-foreground/50 hover:text-destructive transition-colors"
              >
                Sepeti Temizle
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <ProjectQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
};

export default CartSidebar;
