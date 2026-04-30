import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { z } from "zod";

const RECIPIENT = "mirayhelva15@icloud.com";

const schema = z.object({
  name: z.string().trim().min(2, "İsim çok kısa").max(80),
  email: z.string().trim().email("Geçersiz e-posta").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  area: z.string().trim().max(40).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const ProjectQuoteDialog = ({ open, onOpenChange }: Props) => {
  const { items, clear, closeCart } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    projectType: "", location: "", area: "", timeline: "", notes: "",
  });

  const update = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Lütfen formu kontrol edin");
      return;
    }
    const d = parsed.data;
    const cartLines = items.length
      ? items.map((i) => `• ${i.qty} × ${i.product.brand} — ${i.product.name}`).join("\n")
      : "—";
    const subject = `VEGA Proje Teklif Talebi — ${d.name}`;
    const body = [
      "=== İLETİŞİM ===",
      `İsim: ${d.name}`,
      `E-posta: ${d.email}`,
      `Şirket: ${d.company || "—"}`,
      `Telefon: ${d.phone || "—"}`,
      "",
      "=== PROJE DETAYLARI ===",
      `Proje türü: ${d.projectType || "—"}`,
      `Lokasyon: ${d.location || "—"}`,
      `Alan (m²): ${d.area || "—"}`,
      `Zaman planı: ${d.timeline || "—"}`,
      "",
      "=== SEPET ===",
      cartLines,
      "",
      "=== NOTLAR ===",
      d.notes || "—",
    ].join("\n");

    const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    toast.success("E-posta uygulamanız açılıyor…");
    setTimeout(() => {
      onOpenChange(false);
      closeCart();
      clear();
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-w-2xl border-cyan/40 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-cyan">
            ◉ Görev Brifingi
          </span>
          <DialogTitle className="font-display text-2xl md:text-3xl neon-text">
            Profesyonel Teklif Talebi
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Proje detaylarınızı paylaşın — mühendislik ekibimiz 48 saat içinde
            sepetinizdeki ürünlere göre teklifinizi hazırlasın.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-cyan mb-2">
              İletişim
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Ad Soyad *" value={form.name} onChange={update("name")} className="bg-input/60 border-cyan/30 h-11" required />
              <Input type="email" placeholder="E-posta *" value={form.email} onChange={update("email")} className="bg-input/60 border-cyan/30 h-11" required />
              <Input placeholder="Şirket" value={form.company} onChange={update("company")} className="bg-input/60 border-cyan/30 h-11" />
              <Input placeholder="Telefon" value={form.phone} onChange={update("phone")} className="bg-input/60 border-cyan/30 h-11" />
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-cyan mb-2">
              Proje Detayları
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Proje türü (villa, ofis…)" value={form.projectType} onChange={update("projectType")} className="bg-input/60 border-cyan/30 h-11" />
              <Input placeholder="Lokasyon (şehir / ilçe)" value={form.location} onChange={update("location")} className="bg-input/60 border-cyan/30 h-11" />
              <Input placeholder="Alan (m²)" value={form.area} onChange={update("area")} className="bg-input/60 border-cyan/30 h-11" />
              <Input placeholder="Zaman planı (ör. 3 ay)" value={form.timeline} onChange={update("timeline")} className="bg-input/60 border-cyan/30 h-11" />
            </div>
          </div>

          {items.length > 0 && (
            <div>
              <h4 className="font-display text-xs tracking-[0.3em] uppercase text-cyan mb-2">
                Sepetinizdeki Ürünler ({items.length})
              </h4>
              <ul className="glass rounded-lg p-3 space-y-1 max-h-40 overflow-y-auto">
                {items.map((i) => (
                  <li key={i.product.id} className="text-xs font-mono text-foreground/80 flex justify-between">
                    <span>{i.product.brand} — {i.product.name}</span>
                    <span className="text-cyan">×{i.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Textarea
            placeholder="Ek notlar — özel gereksinimler, mevcut altyapı, teslim koşulları…"
            value={form.notes}
            onChange={update("notes")}
            rows={4}
            className="bg-input/60 border-cyan/30 resize-none"
          />

          <Button
            type="submit"
            className="w-full h-12 font-display tracking-[0.25em] uppercase text-sm bg-gradient-to-r from-amber to-amber/80 text-background hover:opacity-90 [box-shadow:0_0_24px_hsl(var(--amber)/0.5)]"
          >
            Teklifi Gönder
          </Button>
          <p className="text-[10px] text-foreground/50 text-center font-mono">
            Güvenli iletim: {RECIPIENT}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectQuoteDialog;
