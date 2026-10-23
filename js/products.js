// VOLTURA Marketplace — Product Catalogue
// Prices in ZAR — Update with real prices before launch

const BUSINESS = {
  name: "VOLTURA",
  tagline: "Premium Portable Power & Cooling",
  description: "We specialise in high-quality portable power banks and car refrigerators for everyday South African life. Reliable power and cooling solutions for home, travel and outdoor use.",
  address: "255 Nightingale Street, Mofolo South, Soweto, 1801, South Africa",
  whatsapp: "2787412314",
  whatsappDisplay: "078 741 2314",
  email: "hello@voltura.co.za",
  hours: "Mon–Fri 09:00–17:00 · Sat 09:00–13:00 · Sun Closed",
  coverImage: "images/Hb944b547ff244ca780a92e4ad22566c6y.jpg"
};

const products = [
  {
    id: "pb-10000-mini",
    name: "VOLTURA Mini Power Bank 10000mAh",
    price: 499,
    comparePrice: 699,
    category: "Power Banks",
    condition: "New",
    available: true,
    featured: true,
    shortDesc: "Compact 10000mAh with built-in cable and LED display.",
    description: "Ultra-portable 10000mAh power bank with built-in Type-C cable, LED battery indicator, 22.5W fast charging and multi-protection safety. Ideal for daily carry.",
    images: ["images/A48cad26550c246199f69a16d63c8ea28W.jpg"],
    colors: ["Black"]
  },
  {
    id: "pb-wireless-pro",
    name: "VOLTURA Magnetic Wireless Power Bank",
    price: 699,
    comparePrice: 899,
    category: "Power Banks",
    condition: "New",
    available: true,
    featured: true,
    shortDesc: "Magnetic wireless charging with digital display.",
    description: "Premium magnetic wireless power bank with strong hold, digital LED display, 20W PD fast charging. Airline-approved and travel-friendly.",
    images: ["images/A83601899e2e24ea8a53f0932dfdcdb59I.jpg"],
    colors: ["Black", "White"]
  },
  {
    id: "pb-slim-20w",
    name: "VOLTURA Slim 20W PD Power Bank",
    price: 549,
    comparePrice: 749,
    category: "Power Banks",
    condition: "New",
    available: true,
    featured: false,
    shortDesc: "Slim design with 20W Power Delivery fast charging.",
    description: "Elegant slim power bank with high-speed charging for phones and tablets. Multiple protection systems for safe everyday use.",
    images: ["images/H21bffd29e18e4a82bd4f362ce1480cd7W.jpg"],
    colors: ["Black"]
  },
  {
    id: "fr-car-compact",
    name: "VOLTURA Compact Car Refrigerator",
    price: 3499,
    comparePrice: 4299,
    category: "Car Refrigerators",
    condition: "New",
    available: true,
    featured: true,
    shortDesc: "Compact portable car fridge for day trips.",
    description: "Reliable portable car refrigerator with stable cooling, low noise and efficient power use. Perfect for road trips and outdoor adventures.",
    images: ["images/H2ba10d022722412fa8cba1d1b99d998a0.jpg"],
    colors: ["Black", "Grey"]
  },
  {
    id: "fr-car-family",
    name: "VOLTURA Family Car Refrigerator",
    price: 4999,
    comparePrice: 5999,
    category: "Car Refrigerators",
    condition: "New",
    available: true,
    featured: true,
    shortDesc: "Larger capacity for families and longer journeys.",
    description: "Spacious portable refrigerator for family road trips. Stable cooling, low noise and large capacity to keep food and drinks fresh.",
    images: ["images/Hb944b547ff244ca780a92e4ad22566c6y.jpg"],
    colors: ["Black", "Beige", "Green"]
  },
  {
    id: "fr-portable-wheel",
    name: "VOLTURA Wheeled Portable Cooler",
    price: 4299,
    comparePrice: 5199,
    category: "Car Refrigerators",
    condition: "New",
    available: true,
    featured: false,
    shortDesc: "Wheeled design for easy transport outdoors.",
    description: "Convenient wheeled portable cooler ideal for camping, beach trips and long drives. Reliable cooling with practical mobility features.",
    images: ["images/H03f6a752737b4938b137bd375d7072e8H.jpg"],
    colors: ["Black", "Beige"]
  }
];

function formatPrice(p) { return "R " + Number(p).toLocaleString("en-ZA"); }

function getProduct(id) { return products.find(p => p.id === id); }

function whatsappLink(product, qty = 1) {
  const msg = `Hello VOLTURA, I am interested in purchasing:\n\n*${product.name}*\nPrice: ${formatPrice(product.price)}\nQuantity: ${qty}\n\nPlease confirm availability and provide delivery or collection information.\n\nThank you!`;
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function whatsappCartLink(items) {
  let msg = `Hello VOLTURA, I would like to order the following:\n\n`;
  let total = 0;
  items.forEach(i => {
    const p = getProduct(i.id);
    if (p) {
      msg += `• ${p.name} × ${i.qty} — ${formatPrice(p.price * i.qty)}\n`;
      total += p.price * i.qty;
    }
  });
  msg += `\n*Subtotal: ${formatPrice(total)}*\n\nPlease confirm availability, delivery fees and payment options.\nThank you!`;
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
}
