import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

const RECIPIENT = "mirayhelva15@icloud.com";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit about the project").max(1500),
});

const QuoteForm = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const subject = `VEGA Quote Request — ${parsed.data.name}`;
    const body = [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Company: ${parsed.data.company || "—"}`,
      `Phone: ${parsed.data.phone || "—"}`,
      "",
      "Project details:",
      parsed.data.message,
    ].join("\n");
    const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Opening your email client…");
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 md:p-8 space-y-4 relative">
      <div className="absolute -top-3 left-6 px-3 py-0.5 bg-background border border-cyan/40 rounded">
        <span className="font-display text-[10px] tracking-[0.3em] uppercase text-cyan">Mission Brief</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          placeholder="Full name"
          value={form.name}
          onChange={update("name")}
          className="bg-input/60 border-cyan/30 focus-visible:ring-cyan h-11"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={update("email")}
          className="bg-input/60 border-cyan/30 focus-visible:ring-cyan h-11"
          required
        />
        <Input
          placeholder="Company (optional)"
          value={form.company}
          onChange={update("company")}
          className="bg-input/60 border-cyan/30 focus-visible:ring-cyan h-11"
        />
        <Input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={update("phone")}
          className="bg-input/60 border-cyan/30 focus-visible:ring-cyan h-11"
        />
      </div>

      <Textarea
        placeholder="Describe your project — building type, systems of interest, timeline…"
        value={form.message}
        onChange={update("message")}
        rows={5}
        className="bg-input/60 border-cyan/30 focus-visible:ring-cyan resize-none"
        required
      />

      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-12 font-display tracking-[0.25em] uppercase text-sm bg-gradient-to-r from-cyan to-cyan-glow text-primary-foreground hover:opacity-90 transition-all [box-shadow:0_0_24px_hsl(var(--cyan)/0.5)] hover:[box-shadow:0_0_40px_hsl(var(--cyan)/0.8)]"
      >
        {submitting ? "Transmitting…" : "Request a Quote"}
      </Button>

      <p className="text-[11px] text-foreground/50 text-center font-mono">
        Secure transmission to {RECIPIENT}
      </p>
    </form>
  );
};

export default QuoteForm;
