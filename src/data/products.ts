export type ProductCategory = "heat-pump" | "boiler" | "ac" | "radiator" | "pipe" | "tank";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  /** key of the highlightable component inside the 3D villa */
  componentKey: string;
  description: string;
  specs: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "p-heatpump-daikin",
    name: "Altherma 3 Air-to-Water Heat Pump",
    brand: "Daikin",
    category: "heat-pump",
    componentKey: "heatpump",
    description: "High-efficiency inverter heat pump for heating, cooling and DHW.",
    specs: ["COP up to 5.1", "R-32 refrigerant", "8–16 kW range"],
  },
  {
    id: "p-boiler-buderus",
    name: "Logamax Plus Condensing Boiler",
    brand: "Buderus",
    category: "boiler",
    componentKey: "boiler",
    description: "Wall-mounted condensing gas boiler with smart modulation.",
    specs: ["Up to 109% efficiency", "24–34 kW", "Modbus ready"],
  },
  {
    id: "p-radiator-eca",
    name: "Panel Radiator Series 600",
    brand: "E.C.A",
    category: "radiator",
    componentKey: "radiators",
    description: "Premium steel panel radiators engineered for low-temp systems.",
    specs: ["EN 442 certified", "10 year warranty", "Multiple sizes"],
  },
  {
    id: "p-ac-daikin",
    name: "VRV 5 Multi-Split System",
    brand: "Daikin",
    category: "ac",
    componentKey: "ac-units",
    description: "Variable refrigerant volume system for whole-home climate control.",
    specs: ["Zoned cooling", "Wi-Fi control", "Ultra-quiet"],
  },
  {
    id: "p-tank-kodsan",
    name: "Stainless Buffer Tank 500L",
    brand: "KODSAN",
    category: "tank",
    componentKey: "tank",
    description: "Insulated buffer & DHW tank for hybrid heating systems.",
    specs: ["AISI 316 inner", "PU foam 80mm", "Solar coil"],
  },
  {
    id: "p-pipe-frankische",
    name: "PEX-A Underfloor Pipe System",
    brand: "FRANKISCHE",
    category: "pipe",
    componentKey: "underfloor",
    description: "Oxygen-barrier PEX-A pipework for underfloor heating loops.",
    specs: ["DIN 4726", "Ø16–20 mm", "50 yr lifespan"],
  },
  {
    id: "p-pump-lowara",
    name: "Ecocirc Smart Circulator Pump",
    brand: "LOWARA",
    category: "pipe",
    componentKey: "pump",
    description: "ErP-A circulator with auto-adapt for hydronic systems.",
    specs: ["EEI ≤ 0.20", "PWM control", "Cast iron body"],
  },
  {
    id: "p-valve-caleffi",
    name: "Hydraulic Separator + Manifold",
    brand: "CALEFFI",
    category: "pipe",
    componentKey: "manifold",
    description: "Brass manifold with flowmeters for balanced distribution.",
    specs: ["2–12 ports", "Air & dirt separator", "Insulation kit"],
  },
];

export const BRANDS = [
  "Daikin", "Ecodense", "E.C.A", "Buderus", "LOWARA", "ETNA", "DUCA",
  "KODSAN", "Tanpera", "CALEFFI", "DUYAR", "Honeywell", "Kayse",
  "FRANKISCHE", "Danfoss", "Wates", "Tyco", "ARMAS",
];
