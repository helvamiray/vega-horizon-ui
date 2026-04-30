export type ProductCategory = "isi-pompasi" | "kombi" | "klima" | "radyator" | "boru" | "tank";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  /** key of the highlightable component inside the 3D villa */
  componentKey: string;
  description: string;
  specs: string[];
  /** Filename inside /public/products/ — upload manually */
  image: string;
  /** Background video URL for the product card (auto-playing, muted, looped) */
  video: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p-heatpump-daikin",
    name: "Altherma 3 Havadan Suya Isı Pompası",
    brand: "Daikin",
    category: "isi-pompasi",
    componentKey: "heatpump",
    description: "Isıtma, soğutma ve sıcak kullanım suyu için yüksek verimli inverter ısı pompası.",
    specs: ["COP 5.1'e kadar", "R-32 soğutucu akışkan", "8–16 kW aralığı"],
    image: "/products/product1.jpg",
  },
  {
    id: "p-boiler-buderus",
    name: "Logamax Plus Yoğuşmalı Kombi",
    brand: "Buderus",
    category: "kombi",
    componentKey: "boiler",
    description: "Akıllı modülasyonlu duvar tipi yoğuşmalı doğalgaz kombisi.",
    specs: ["%109'a kadar verim", "24–34 kW", "Modbus uyumlu"],
    image: "/products/product2.jpg",
  },
  {
    id: "p-radiator-eca",
    name: "Panel Radyatör Seri 600",
    brand: "E.C.A",
    category: "radyator",
    componentKey: "radiators",
    description: "Düşük sıcaklık sistemleri için tasarlanmış premium çelik panel radyatörler.",
    specs: ["EN 442 sertifikalı", "10 yıl garanti", "Çoklu boyut seçeneği"],
    image: "/products/product3.jpg",
  },
  {
    id: "p-ac-daikin",
    name: "VRV 5 Multi-Split Klima Sistemi",
    brand: "Daikin",
    category: "klima",
    componentKey: "ac-units",
    description: "Tüm bina iklim kontrolü için değişken soğutucu hacimli sistem.",
    specs: ["Bölgesel soğutma", "Wi-Fi kontrol", "Ultra sessiz"],
    image: "/products/product4.jpg",
  },
  {
    id: "p-tank-kodsan",
    name: "Paslanmaz Tampon Tank 500L",
    brand: "KODSAN",
    category: "tank",
    componentKey: "tank",
    description: "Hibrit ısıtma sistemleri için izoleli tampon ve sıcak kullanım suyu tankı.",
    specs: ["AISI 316 iç yüzey", "PU köpük 80mm", "Solar serpantin"],
    image: "/products/product5.jpg",
  },
  {
    id: "p-pipe-frankische",
    name: "PEX-A Yerden Isıtma Boru Sistemi",
    brand: "FRANKISCHE",
    category: "boru",
    componentKey: "underfloor",
    description: "Yerden ısıtma devreleri için oksijen bariyerli PEX-A boru sistemi.",
    specs: ["DIN 4726", "Ø16–20 mm", "50 yıl ömür"],
    image: "/products/product6.jpg",
  },
  {
    id: "p-pump-lowara",
    name: "Ecocirc Akıllı Sirkülasyon Pompası",
    brand: "LOWARA",
    category: "boru",
    componentKey: "pump",
    description: "Hidronik sistemler için otomatik adapte özellikli ErP-A sirkülasyon pompası.",
    specs: ["EEI ≤ 0.20", "PWM kontrol", "Döküm gövde"],
    image: "/products/product7.jpg",
  },
  {
    id: "p-valve-caleffi",
    name: "Hidrolik Denge Kabı + Kollektör",
    brand: "CALEFFI",
    category: "boru",
    componentKey: "manifold",
    description: "Dengeli dağıtım için debimetreli pirinç kollektör.",
    specs: ["2–12 çıkışlı", "Hava ve tortu ayırıcı", "İzolasyon kiti"],
    image: "/products/product8.jpg",
  },
];

export const BRANDS = [
  "Daikin", "Ecodense", "E.C.A", "Buderus", "LOWARA", "ETNA", "DUCA",
  "KODSAN", "Tanpera", "CALEFFI", "DUYAR", "Honeywell", "Kayse",
  "FRANKISCHE", "Danfoss", "Wates", "Tyco", "ARMAS",
];

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "isi-pompasi": "Isı Pompası",
  "kombi": "Kombi",
  "klima": "Klima",
  "radyator": "Radyatör",
  "boru": "Boru / Pompa",
  "tank": "Tank",
};
