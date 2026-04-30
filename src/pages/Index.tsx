import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandSlider from "@/components/BrandSlider";
import Villa3D from "@/components/Villa3D";
import ProductGrid from "@/components/ProductGrid";
import QuoteForm from "@/components/QuoteForm";
import SocialIcons from "@/components/SocialIcons";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(PRODUCTS[0].id);
  const rootRef = useRef<HTMLDivElement>(null);

  const highlightedKey = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId)?.componentKey ?? null,
    [selectedId]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-reveal", {
        y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.15,
      });

      // Staggered scroll reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });

      // Stagger children inside [data-reveal-children]
      gsap.utils.toArray<HTMLElement>("[data-reveal-children]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* === Background video === */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <video
          className="w-full h-full object-cover opacity-60"
          autoPlay muted loop playsInline
          poster="/placeholder.svg"
        >
          <source src="/videos/isi_pompasi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* === Brand slider (top) === */}
      <BrandSlider />

      {/* === Top nav === */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/40 border-b border-cyan/15">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded border border-cyan/60 font-display text-cyan neon-text group-hover:[box-shadow:0_0_20px_hsl(var(--cyan)/0.7)] transition-all">
              V
            </span>
            <div className="leading-none">
              <div className="font-display text-lg tracking-[0.25em] neon-text">VEGA</div>
              <div className="text-[9px] tracking-[0.4em] uppercase text-foreground/50 mt-1">
                Engineering
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-display text-xs tracking-[0.25em] uppercase text-foreground/70">
            <a href="#twin" className="hover:text-cyan transition-colors">Digital Twin</a>
            <a href="#systems" className="hover:text-cyan transition-colors">Systems</a>
            <a href="#quote" className="hover:text-cyan transition-colors">Quote</a>
          </nav>

          <SocialIcons />
        </div>
      </header>

      {/* === HERO === */}
      <section className="relative container pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          <div className="hero-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-cyan/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-cyan">
              Smart HVAC · Energy Systems · Digital Twin
            </span>
          </div>
          <h1 className="hero-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            Engineering the <span className="text-gradient-cyan">future</span><br />
            of indoor <span className="amber-text">climate</span>.
          </h1>
          <p className="hero-reveal text-base md:text-lg text-foreground/70 max-w-2xl mb-8">
            VEGA designs and integrates premium HVAC, heat-pump and energy systems.
            Explore an interactive 3D twin of a smart villa — select any system on the
            right and watch its component come alive inside the building.
          </p>
          <div className="hero-reveal flex flex-wrap gap-4">
            <a
              href="#twin"
              className="px-6 h-12 grid place-items-center rounded-md bg-gradient-to-r from-cyan to-cyan-glow text-primary-foreground font-display tracking-[0.25em] uppercase text-xs [box-shadow:0_0_24px_hsl(var(--cyan)/0.5)] hover:[box-shadow:0_0_40px_hsl(var(--cyan)/0.85)] transition-all"
            >
              Launch Digital Twin
            </a>
            <a
              href="#quote"
              className="px-6 h-12 grid place-items-center rounded-md glass border border-amber/60 amber-text font-display tracking-[0.25em] uppercase text-xs hover:[box-shadow:0_0_28px_hsl(var(--amber)/0.6)] transition-all"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* Stats */}
        <div data-reveal-children className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "18+", v: "Premium Brands" },
            { k: "25 yr", v: "Engineering Heritage" },
            { k: "1.2k", v: "Projects Delivered" },
            { k: "A+++", v: "Energy Class" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-xl p-5">
              <div className="font-display text-3xl neon-text">{s.k}</div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-foreground/60 mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === DIGITAL TWIN + PRODUCTS === */}
      <section id="twin" className="container py-20 md:py-28">
        <div data-reveal className="mb-12 max-w-3xl">
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-cyan">
            ◉ Section 01 — Interactive Digital Twin
          </span>
          <h2 className="font-display text-3xl md:text-5xl mt-3 mb-4">
            Click a system. Watch it <span className="amber-text">glow</span> inside the villa.
          </h2>
          <p className="text-foreground/70">
            Every product in our catalogue is mapped to a real component inside the
            building — boiler, heat pump, underfloor loops, manifolds, radiators, AC
            cassettes and more. Drag to rotate, scroll to zoom.
          </p>
        </div>

        <div id="systems" className="grid lg:grid-cols-5 gap-6">
          <div data-reveal className="lg:col-span-3">
            <Villa3D highlightedKey={highlightedKey} />
          </div>
          <div data-reveal className="lg:col-span-2 max-h-[600px] overflow-y-auto pr-1 [scrollbar-width:thin]">
            <ProductGrid
              products={PRODUCTS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </section>

      {/* === CAPABILITIES === */}
      <section className="container py-20 md:py-28">
        <div data-reveal className="mb-12 max-w-3xl">
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-cyan">
            ◉ Section 02 — Capabilities
          </span>
          <h2 className="font-display text-3xl md:text-5xl mt-3">
            Full-stack mechanical engineering.
          </h2>
        </div>

        <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { t: "Heat Pump Systems", d: "Air-to-water, ground-source and hybrid systems with smart controls." },
            { t: "Hydronic Heating", d: "Underfloor, radiator and fan-coil hydronics balanced to perfection." },
            { t: "VRF & VRV Climate", d: "Multi-zone refrigerant systems for offices, hotels and villas." },
            { t: "Solar & Hybrid DHW", d: "Solar-thermal coupled storage tanks and circulation control." },
            { t: "Building Automation", d: "BMS, BACnet & Modbus integration with cloud telemetry." },
            { t: "Energy Audits", d: "Thermal modelling and ROI-driven retrofit engineering." },
          ].map((c) => (
            <div key={c.t} className="glass rounded-xl p-6 hover:border-cyan/60 transition-colors">
              <div className="w-10 h-10 mb-4 rounded grid place-items-center border border-cyan/50 text-cyan font-display">
                ◆
              </div>
              <h3 className="font-display text-lg mb-2">{c.t}</h3>
              <p className="text-sm text-foreground/70">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === QUOTE === */}
      <section id="quote" className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div data-reveal>
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-cyan">
              ◉ Section 03 — Engage
            </span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 mb-5">
              Ready to engineer your <span className="amber-text">project</span>?
            </h2>
            <p className="text-foreground/70 mb-8">
              Tell us about your building and we'll come back with a tailored
              system design and quote — typically within 48 hours.
            </p>

            <div className="space-y-4">
              {[
                ["Response time", "≤ 48 hours"],
                ["Coverage", "Türkiye & EU"],
                ["Email", "mirayhelva15@icloud.com"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between glass rounded-lg px-4 py-3">
                  <span className="text-[11px] font-display tracking-[0.25em] uppercase text-foreground/60">{k}</span>
                  <span className="font-mono text-sm text-cyan">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-display tracking-[0.3em] uppercase text-foreground/50 mb-3">
                Follow VEGA
              </p>
              <SocialIcons />
            </div>
          </div>

          <div data-reveal>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-cyan/15 mt-10">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-foreground/50">
          <div>© {new Date().getFullYear()} VEGA Engineering. All systems operational.</div>
          <div className="tracking-[0.25em] uppercase">Built with precision · Cyan · Amber · Navy</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
