// Predefined initial data for the Buffalo Dairy Farm & Milk Shop Management System
// This data will be loaded into localStorage on first load to allow dynamic editing.

export const initialUsers = [
  {
    id: "owner-1",
    name: "Shaik Muzammil",
    role: "Owner",
    username: "owner",
    avatar: "👑",
    permissions: {
      view: true,
      add: true,
      edit: true,
      delete: true,
      export: true,
      viewFinancials: true,
      viewSellingPrices: true,
      viewPurchasePrices: true,
      viewInventoryValue: true
    }
  },
  {
    id: "manager-1",
    name: "Ramesh Kumar",
    role: "Farm Manager",
    username: "manager",
    avatar: "🚜",
    permissions: {
      view: true,
      add: true,
      edit: true,
      delete: false,
      export: true,
      viewFinancials: false, // Hidden by default
      viewSellingPrices: false,
      viewPurchasePrices: true,
      viewInventoryValue: false
    }
  },
  {
    id: "shopkeeper-1",
    name: "Anil Sharma",
    role: "Shop Keeper",
    username: "shopkeeper",
    avatar: "🏪",
    permissions: {
      view: true,
      add: true,
      edit: true,
      delete: false,
      export: true,
      viewFinancials: false,
      viewSellingPrices: true,
      viewPurchasePrices: true,
      viewInventoryValue: true
    }
  },
  {
    id: "driver-1",
    name: "Suresh Singh",
    role: "Driver",
    username: "driver",
    avatar: "🚚",
    permissions: {
      view: true,
      add: true,
      edit: false,
      delete: false,
      export: false,
      viewFinancials: false,
      viewSellingPrices: true, // Needed to show due amount
      viewPurchasePrices: false,
      viewInventoryValue: false
    }
  },
  {
    id: "worker-1",
    name: "Mahesh Yadav",
    role: "Worker",
    username: "worker",
    avatar: "🧑‍🌾",
    permissions: {
      view: true,
      add: false,
      edit: false,
      delete: false,
      export: false,
      viewFinancials: false,
      viewSellingPrices: false,
      viewPurchasePrices: false,
      viewInventoryValue: false
    }
  }
];

export const initialBuffalos = [
  {
    id: "BUF-001",
    tagNumber: "BUF-001",
    breed: "Murrah",
    dob: "2021-04-12",
    purchaseDate: "2023-05-20",
    purchaseCost: 85000,
    status: "Milking", // Milking, Dry, Pregnant, Sick
    image: "🐄",
    milkHistory: [
      { date: "2026-07-24", morning: 8.5, evening: 7.2 },
      { date: "2026-07-23", morning: 8.2, evening: 7.5 },
      { date: "2026-07-22", morning: 8.9, evening: 7.0 }
    ],
    pregnancies: [
      { expectedCalving: "2026-11-15", actualCalving: null, status: "Confirmed" }
    ],
    healthRecords: [
      { date: "2026-06-10", type: "Vaccination", notes: "FMD Vaccine administered", cost: 250 },
      { date: "2026-07-01", type: "Deworming", notes: "Regular Albendazole dose", cost: 150 }
    ]
  },
  {
    id: "BUF-002",
    tagNumber: "BUF-002",
    breed: "Nili-Ravi",
    dob: "2022-01-15",
    purchaseDate: "2024-02-10",
    purchaseCost: 92000,
    status: "Milking",
    image: "🐃",
    milkHistory: [
      { date: "2026-07-24", morning: 9.0, evening: 8.0 },
      { date: "2026-07-23", morning: 8.8, evening: 8.2 },
      { date: "2026-07-22", morning: 9.2, evening: 7.8 }
    ],
    pregnancies: [],
    healthRecords: [
      { date: "2026-06-10", type: "Vaccination", notes: "FMD Vaccine administered", cost: 250 }
    ]
  },
  {
    id: "BUF-003",
    tagNumber: "BUF-003",
    breed: "Jafarabadi",
    dob: "2020-08-22",
    purchaseDate: "2023-11-05",
    purchaseCost: 98000,
    status: "Pregnant",
    image: "🐄",
    milkHistory: [
      { date: "2026-06-15", morning: 5.5, evening: 4.2 } // Dry now
    ],
    pregnancies: [
      { expectedCalving: "2026-08-30", actualCalving: null, status: "Confirmed" }
    ],
    healthRecords: [
      { date: "2026-05-12", type: "Deworming", notes: "Pregnancy safe dewormer", cost: 200 }
    ]
  },
  {
    id: "BUF-004",
    tagNumber: "BUF-004",
    breed: "Surti",
    dob: "2022-06-05",
    purchaseDate: "2025-01-20",
    purchaseCost: 75000,
    status: "Dry",
    image: "🐃",
    milkHistory: [],
    pregnancies: [],
    healthRecords: [
      { date: "2026-07-15", type: "Treatment", notes: "Treated for hoof infection", cost: 1200 }
    ]
  },
  {
    id: "BUF-005",
    tagNumber: "BUF-005",
    breed: "Murrah",
    dob: "2023-02-10",
    purchaseDate: "2025-05-18",
    purchaseCost: 88000,
    status: "Sick",
    image: "🐄",
    milkHistory: [
      { date: "2026-07-20", morning: 4.0, evening: 3.5 }
    ],
    pregnancies: [],
    healthRecords: [
      { date: "2026-07-23", type: "Vet Visit", notes: "High fever. Prescribed antibiotics", cost: 800 }
    ]
  }
];

export const initialOutlets = [
  {
    id: "out-1",
    name: "Green Valley Dairy Shop",
    contactPerson: "Rajesh Patel",
    mobile: "9876543210",
    address: "Shop 12, Market Square, Sector 4",
    sellingPrice: 75, // per Litre
    creditLimit: 25000,
    status: "Active",
    balance: 8500
  },
  {
    id: "out-2",
    name: "Royal Plaza Hotel",
    contactPerson: "Chef Vikram",
    mobile: "9898989898",
    address: "Grand Trunk Road, City Center",
    sellingPrice: 78,
    creditLimit: 50000,
    status: "Active",
    balance: 18600
  },
  {
    id: "out-3",
    name: "Komal Sweets & Restaurant",
    contactPerson: "Amit Gupta",
    mobile: "9765432109",
    address: "Gandhi Chowk Main Bazaar",
    sellingPrice: 74,
    creditLimit: 30000,
    status: "Active",
    balance: 5400
  },
  {
    id: "out-4",
    name: "Local Milk Depot B",
    contactPerson: "Surender Pal",
    mobile: "9123456789",
    address: "Street No. 4, Adarsh Nagar",
    sellingPrice: 72,
    creditLimit: 15000,
    status: "Active",
    balance: 0
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    name: "Fresh Buffalo Milk",
    category: "Dairy",
    unit: "Litre",
    purchasePrice: 65, // simulated value or internal cost
    sellingPrice: 80,
    openingStock: 200,
    currentStock: 180,
    minimumStock: 50,
    expiryDays: 2
  },
  {
    id: "prod-2",
    name: "Premium Buffalo Ghee",
    category: "Ghee",
    unit: "kg",
    purchasePrice: 550,
    sellingPrice: 680,
    openingStock: 50,
    currentStock: 35,
    minimumStock: 10,
    expiryDays: 180
  },
  {
    id: "prod-3",
    name: "Fresh Paneer (Cottage Cheese)",
    category: "Paneer",
    unit: "kg",
    purchasePrice: 280,
    sellingPrice: 380,
    openingStock: 30,
    currentStock: 8, // Triggers Low Stock Alert
    minimumStock: 15,
    expiryDays: 5
  },
  {
    id: "prod-4",
    name: "Fresh Thick Curd",
    category: "Curd",
    unit: "kg",
    purchasePrice: 60,
    sellingPrice: 90,
    openingStock: 100,
    currentStock: 75,
    minimumStock: 20,
    expiryDays: 7
  },
  {
    id: "prod-5",
    name: "Creamy Kova",
    category: "Sweets",
    unit: "kg",
    purchasePrice: 320,
    sellingPrice: 420,
    openingStock: 15,
    currentStock: 12,
    minimumStock: 5,
    expiryDays: 10
  },
  {
    id: "prod-6",
    name: "Spiced Butter Milk",
    category: "Dairy",
    unit: "Pack (500ml)",
    purchasePrice: 12,
    sellingPrice: 20,
    openingStock: 150,
    currentStock: 110,
    minimumStock: 30,
    expiryDays: 4
  }
];

export const initialMilkProduction = [
  { id: "log-1", date: "2026-07-24", session: "Morning", quantity: 245.5, note: "All animals healthy" },
  { id: "log-2", date: "2026-07-24", session: "Evening", quantity: 210.0, note: "Temperature was warm" },
  { id: "log-3", date: "2026-07-23", session: "Morning", quantity: 240.2, note: "" },
  { id: "log-4", date: "2026-07-23", session: "Evening", quantity: 212.5, note: "" },
  { id: "log-5", date: "2026-07-22", session: "Morning", quantity: 248.0, note: "" },
  { id: "log-6", date: "2026-07-22", session: "Evening", quantity: 205.8, note: "" }
];

export const initialMilkDistribution = [
  {
    id: "dist-1",
    date: "2026-07-24",
    session: "Morning",
    collected: 245.5,
    distributed: [
      { destination: "Own Milk Shop", qty: 100 },
      { destination: "Green Valley Dairy Shop", qty: 60 },
      { destination: "Royal Plaza Hotel", qty: 50 },
      { destination: "Komal Sweets & Restaurant", qty: 35.5 }
    ],
    driverName: "Suresh Singh",
    vehicle: "Bolero Pickup (MH-12-XX-1234)",
    isSettled: false
  },
  {
    id: "dist-2",
    date: "2026-07-24",
    session: "Evening",
    collected: 210.0,
    distributed: [
      { destination: "Own Milk Shop", qty: 80 },
      { destination: "Green Valley Dairy Shop", qty: 40 },
      { destination: "Royal Plaza Hotel", qty: 50 },
      { destination: "Komal Sweets & Restaurant", qty: 40 }
    ],
    driverName: "Suresh Singh",
    vehicle: "Bolero Pickup (MH-12-XX-1234)",
    isSettled: false
  }
];

export const initialDriverPayments = [
  {
    id: "pay-1",
    date: "2026-07-24",
    outletId: "out-1",
    outletName: "Green Valley Dairy Shop",
    amountDue: 4500, // 60 Litres * 75
    amountCollected: 4000,
    paymentMethod: "UPI",
    remarks: "Partial payment, balance in next cycle",
    driverName: "Suresh Singh"
  },
  {
    id: "pay-2",
    date: "2026-07-24",
    outletId: "out-2",
    outletName: "Royal Plaza Hotel",
    amountDue: 3900, // 50 Litres * 78
    amountCollected: 3900,
    paymentMethod: "Cash",
    remarks: "Full settlement",
    driverName: "Suresh Singh"
  }
];

export const initialDriverSettlements = [
  {
    id: "settle-1",
    date: "2026-07-23",
    driverName: "Suresh Singh",
    totalCollected: 452.7,
    totalDelivered: 452.7,
    expectedCollection: 16500,
    amountCollected: 15000,
    cashAmount: 6000,
    upiAmount: 9000,
    creditAmount: 1500,
    status: "Approved"
  }
];

export const initialShopSales = [
  { id: "sale-1", date: "2026-07-24", product: "Fresh Buffalo Milk", qty: 45, price: 80, total: 3600, paymentMethod: "Cash", customer: "Walk-in" },
  { id: "sale-2", date: "2026-07-24", product: "Premium Buffalo Ghee", qty: 2, price: 680, total: 1360, paymentMethod: "UPI", customer: "Mr. Ramesh Verma" },
  { id: "sale-3", date: "2026-07-24", product: "Fresh Paneer (Cottage Cheese)", qty: 3, price: 380, total: 1140, paymentMethod: "UPI", customer: "Anjali Bakery" },
  { id: "sale-4", date: "2026-07-23", product: "Fresh Buffalo Milk", qty: 90, price: 80, total: 7200, paymentMethod: "UPI", customer: "Bulk Milk Depot" }
];

export const initialShopPurchases = [
  { id: "pur-1", date: "2026-07-24", supplier: "Local Packaging Ltd", invoiceNo: "INV-1092", product: "Spiced Butter Milk", qty: 100, price: 12, total: 1200 },
  { id: "pur-2", date: "2026-07-23", supplier: "Shyam Ghee Depot", invoiceNo: "INV-0988", product: "Premium Buffalo Ghee", qty: 20, price: 550, total: 11000 }
];

export const initialWorkers = [
  { id: "wk-1", name: "Mahesh Yadav", role: "Milker", monthlySalary: 15000, advanceGiven: 2000, duties: "Morning & Evening milking sessions", attendance: "Present" },
  { id: "wk-2", name: "Sunil Dutt", role: "Cleaner", monthlySalary: 12000, advanceGiven: 0, duties: "Barn washing and feed mixing", attendance: "Present" },
  { id: "wk-3", name: "Karan Johar", role: "Feeder", monthlySalary: 13000, advanceGiven: 1000, duties: "Feed distribution and water refilling", attendance: "Absent" }
];

export const initialFarmExpenses = [
  { id: "exp-1", date: "2026-07-24", category: "Feed", details: "Sudan grass and concentrate feed purchase", amount: 18500, supplier: "Kisan Cattle Feed Store", billAttached: true },
  { id: "exp-2", date: "2026-07-23", category: "Medicine", details: "Antibiotics & Dewormers", amount: 2200, supplier: "Vet Pharma Ltd", billAttached: false },
  { id: "exp-3", date: "2026-07-22", category: "Labor", details: "Monthly advance payments", amount: 3000, supplier: "Workers Advance", billAttached: false }
];
