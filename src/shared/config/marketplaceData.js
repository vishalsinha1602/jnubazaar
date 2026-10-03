export const APP_NAME = "JNUBazaar";
export const TAGLINE = "Buy. Sell. Connect. — Inside JNU.";

export const CAMPUS_CLUSTERS = [
  {
    name: "Dakshinapuram",
    hostels: [
      "Ganga Hostel",
      "Yamuna Hostel",
      "Kaveri Hostel",
      "Periyar Hostel",
      "Godavari Hostel",
    ],
  },
  {
    name: "Uttarakhand",
    hostels: [
      "Brahmaputra Hostel",
      "Damodar Hostel",
      "Tapti Hostel",
      "Koyna Hostel",
    ],
  },
  {
    name: "Poorvanchal",
    hostels: [
      "Mahi-Mandavi Hostel",
      "Chandrabhaga Hostel",
      "Lohit Hostel",
      "Shipra Hostel",
    ],
  },
  {
    name: "Paschimabad",
    hostels: ["Sabarmati Hostel", "Jhelum Hostel", "Sutlej Hostel"],
  },
];

export const ALL_HOSTELS = CAMPUS_CLUSTERS.flatMap((c) => c.hostels);

export const SAFE_HUBS = [
  {
    id: "kc-market",
    name: "KC Market Open Chowk",
    badge: "Most Popular",
    timing: "Daytime 9:00 AM – 9:00 PM",
    description:
      "Central commercial market, bustling with students and tea stalls.",
  },
  {
    id: "central-library",
    name: "Central Library Main Porch",
    badge: "24/7 Monitored",
    timing: "Open 24 Hours (CCTV Covered)",
    description: "Near the 9-story library building entrance steps.",
  },
  {
    id: "ganga-dhaba",
    name: "Ganga Dhaba Patio",
    badge: "Evening Spot",
    timing: "4:00 PM – 11:30 PM",
    description: "Iconic open courtyard near Ganga Hostel, high visibility.",
  },
  {
    id: "brahmaputra-gate",
    name: "Brahmaputra Foyer",
    badge: "Uttarakhand Cluster",
    timing: "8:00 AM – 8:00 PM",
    description: "Near Uttarakhand cluster security desk.",
  },
];

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "Monitor" },
  { id: "books", name: "Books", icon: "BookOpen" },
  { id: "furniture", name: "Furniture", icon: "Armchair" },
  { id: "clothing", name: "Clothing", icon: "Shirt" },
  { id: "sports", name: "Sports", icon: "Dumbbell" },
  { id: "vehicles", name: "Vehicles", icon: "Bike" },
  { id: "mobile", name: "Mobile", icon: "Smartphone" },
  { id: "laptop", name: "Laptop", icon: "Laptop" },
  { id: "accessories", name: "Accessories", icon: "Headphones" },
  { id: "other", name: "Other", icon: "Package" },
];

export const CONDITIONS = [
  {
    id: "like_new",
    label: "Like New (Mint)",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "good",
    label: "Good Condition",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    id: "fair",
    label: "Fair / Functional",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "new",
    label: "Brand New / Sealed",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
];
