// Mock data for development

export const mockVenues = [
  {
    id: 1,
    name: "Grand Ballroom",
    type: "ballroom",
    capacity: 500,
    price: 1500,
    hotel: "Intercity Muscat",
    description:
      "Elegant ballroom with crystal chandeliers and state-of-the-art facilities",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=800",
    ],
    amenities: [
      "WiFi",
      "Audio System",
      "Stage",
      "Projector",
      "Catering Available",
    ],
    status: "available",
  },
  {
    id: 2,
    name: "Executive Meeting Room",
    type: "meeting_room",
    capacity: 20,
    price: 300,
    hotel: "Intercity Muscat",
    description: "Professional meeting space with modern amenities",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    ],
    amenities: ["WiFi", "Whiteboard", "Video Conference", "Projector"],
    status: "available",
  },
  {
    id: 3,
    name: "Rooftop Garden",
    type: "outdoor",
    capacity: 100,
    price: 800,
    hotel: "Intercity Salalah",
    description: "Beautiful outdoor space with panoramic city views",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    ],
    amenities: ["WiFi", "Lighting", "Catering Available", "Parking"],
    status: "booked",
  },
  {
    id: 4,
    name: "Conference Hall A",
    type: "conference",
    capacity: 200,
    price: 1000,
    hotel: "Intercity Nizwa",
    description: "Spacious conference hall for large corporate events",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    ],
    amenities: ["WiFi", "Audio System", "Projector", "Stage", "Recording"],
    status: "pending",
  },
];

export const mockBookings = [
  {
    id: 1,
    venueId: 1,
    venueName: "Grand Ballroom",
    hotel: "Intercity Muscat",
    date: "2025-11-15",
    startTime: "18:00",
    endTime: "23:00",
    status: "confirmed",
    totalCost: 2000,
    guests: 250,
    addons: ["Catering", "AV Equipment"],
  },
  {
    id: 2,
    venueId: 2,
    venueName: "Executive Meeting Room",
    hotel: "Intercity Muscat",
    date: "2025-11-10",
    startTime: "09:00",
    endTime: "12:00",
    status: "pending",
    totalCost: 350,
    guests: 15,
    addons: ["AV Equipment"],
  },
  {
    id: 3,
    venueId: 3,
    venueName: "Rooftop Garden",
    hotel: "Intercity Salalah",
    date: "2025-10-28",
    startTime: "16:00",
    endTime: "21:00",
    status: "completed",
    totalCost: 1200,
    guests: 80,
    addons: ["Catering", "Decor"],
  },
];

export const mockAddons = [
  {
    id: 1,
    name: "Premium Catering Package",
    type: "catering",
    price: 500,
    description: "Full buffet with international cuisine",
    icon: "utensils",
  },
  {
    id: 2,
    name: "AV Equipment Bundle",
    type: "av_equipment",
    price: 200,
    description: "Projector, sound system, and microphones",
    icon: "speaker",
  },
  {
    id: 3,
    name: "Premium Decor",
    type: "decor",
    price: 400,
    description: "Professional decoration with flowers and lighting",
    icon: "palette",
  },
  {
    id: 4,
    name: "Basic Catering",
    type: "catering",
    price: 250,
    description: "Light refreshments and snacks",
    icon: "coffee",
  },
];

export const mockAmenities = [
  {
    id: 1,
    name: "Projector",
    description: "HD Projector with screen",
    price: 50,
    icon: "monitor",
    category: "AV Equipment",
  },
  {
    id: 2,
    name: "Sound System",
    description: "Professional sound system",
    price: 75,
    icon: "speaker",
    category: "AV Equipment",
  },
  {
    id: 3,
    name: "Microphone",
    description: "Wireless microphone set",
    price: 25,
    icon: "mic",
    category: "AV Equipment",
  },
  {
    id: 4,
    name: "Lighting",
    description: "Professional lighting setup",
    price: 100,
    icon: "lightbulb",
    category: "Lighting",
  },
  {
    id: 5,
    name: "WiFi",
    description: "High-speed internet access",
    price: 0,
    icon: "wifi",
    category: "Internet",
  },
  {
    id: 6,
    name: "Air Conditioning",
    description: "Climate control system",
    price: 0,
    icon: "thermometer",
    category: "Comfort",
  },
  {
    id: 7,
    name: "Parking",
    description: "Valet parking service",
    price: 30,
    icon: "car",
    category: "Services",
  },
  {
    id: 8,
    name: "Security",
    description: "Event security personnel",
    price: 150,
    icon: "shield",
    category: "Services",
  },
];

// Calendar availability data
export const mockAvailability = {
  1: {
    // Grand Ballroom
    "2025-11-01": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-02": { status: "partial", slots: ["14:00", "18:00"] },
    "2025-11-03": { status: "booked", slots: [] },
    "2025-11-04": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-05": { status: "partial", slots: ["18:00"] },
    "2025-11-06": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-07": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-08": { status: "booked", slots: [] },
    "2025-11-09": { status: "partial", slots: ["14:00"] },
    "2025-11-10": { status: "available", slots: ["09:00", "14:00", "18:00"] },
  },
  2: {
    // Executive Meeting Room
    "2025-11-01": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
    "2025-11-02": { status: "partial", slots: ["14:00", "16:00"] },
    "2025-11-03": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
    "2025-11-04": { status: "booked", slots: [] },
    "2025-11-05": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
    "2025-11-06": { status: "partial", slots: ["16:00"] },
    "2025-11-07": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
    "2025-11-08": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
    "2025-11-09": { status: "booked", slots: [] },
    "2025-11-10": {
      status: "available",
      slots: ["09:00", "11:00", "14:00", "16:00"],
    },
  },
  3: {
    // Rooftop Garden
    "2025-11-01": { status: "booked", slots: [] },
    "2025-11-02": { status: "available", slots: ["16:00", "18:00"] },
    "2025-11-03": { status: "partial", slots: ["18:00"] },
    "2025-11-04": { status: "available", slots: ["16:00", "18:00"] },
    "2025-11-05": { status: "booked", slots: [] },
    "2025-11-06": { status: "available", slots: ["16:00", "18:00"] },
    "2025-11-07": { status: "partial", slots: ["18:00"] },
    "2025-11-08": { status: "available", slots: ["16:00", "18:00"] },
    "2025-11-09": { status: "booked", slots: [] },
    "2025-11-10": { status: "available", slots: ["16:00", "18:00"] },
  },
  4: {
    // Conference Hall A
    "2025-11-01": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-02": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-03": { status: "partial", slots: ["18:00"] },
    "2025-11-04": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-05": { status: "booked", slots: [] },
    "2025-11-06": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-07": { status: "partial", slots: ["14:00", "18:00"] },
    "2025-11-08": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-09": { status: "available", slots: ["09:00", "14:00", "18:00"] },
    "2025-11-10": { status: "partial", slots: ["14:00"] },
  },
};

export const mockWalletData = {
  balance: 1250,
  streak: 5,
  transactions: [
    {
      id: 1,
      type: "earn",
      points: 100,
      description: "Booking completed",
      date: "2025-10-20T10:00:00Z",
    },
    {
      id: 2,
      type: "redeem",
      points: 50,
      description: "Redeemed at Breakery Café",
      date: "2025-10-18T15:30:00Z",
    },
    {
      id: 3,
      type: "earn",
      points: 200,
      description: "5-day streak bonus",
      date: "2025-10-17T09:00:00Z",
    },
  ],
  rewards: [
    {
      id: 1,
      title: "5-Day Streak Reward",
      description: "Log in for 5 consecutive days",
      points: 200,
      completed: true,
    },
    {
      id: 2,
      title: "First Booking",
      description: "Complete your first venue booking",
      points: 150,
      completed: true,
    },
    {
      id: 3,
      title: "Bring a Friend",
      description: "Refer a friend to earn bonus points",
      points: 300,
      completed: false,
    },
  ],
};

export const mockUsers = [
  {
    id: 1,
    email: "admin@intercity.com",
    password: "admin123",
    role: "super_admin",
    name: "Super Admin",
    phone: "+968 9123 4567",
  },
  {
    id: 2,
    email: "hotel@intercity.com",
    password: "hotel123",
    role: "hotel_admin",
    name: "Hotel Admin",
    hotel: "Intercity Muscat",
    phone: "+968 9123 4568",
  },
  {
    id: 3,
    email: "manager@intercity.com",
    password: "manager123",
    role: "event_manager",
    name: "Event Manager",
    hotel: "Intercity Muscat",
    phone: "+968 9123 4569",
  },
  {
    id: 4,
    email: "client@example.com",
    password: "client123",
    role: "client",
    name: "John Doe",
    phone: "+968 9123 4570",
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Your booking for Grand Ballroom has been confirmed",
    date: "2025-10-22T08:00:00Z",
    read: false,
    type: "booking",
  },
  {
    id: 2,
    title: "Special Offer",
    message: "Get 20% off on weekend bookings this month!",
    date: "2025-10-21T10:00:00Z",
    read: false,
    type: "promotion",
  },
  {
    id: 3,
    title: "Loyalty Points Earned",
    message: "You earned 100 points from your recent booking",
    date: "2025-10-20T14:30:00Z",
    read: true,
    type: "wallet",
  },
];

export const mockAnalytics = {
  occupancy: [
    { month: "Jan", rate: 65 },
    { month: "Feb", rate: 72 },
    { month: "Mar", rate: 68 },
    { month: "Apr", rate: 75 },
    { month: "May", rate: 80 },
    { month: "Jun", rate: 85 },
  ],
  revenue: {
    total: 125000,
    thisMonth: 25000,
    growth: 15,
  },
  popularVenues: [
    { name: "Grand Ballroom", bookings: 45 },
    { name: "Conference Hall A", bookings: 38 },
    { name: "Executive Meeting Room", bookings: 32 },
    { name: "Rooftop Garden", bookings: 28 },
  ],
};

export const mockResources = [
  {
    id: 1,
    bookingId: 1,
    type: "AV Equipment",
    items: ["Projector", "Sound System", "Microphones (x4)"],
    status: "ready",
  },
  {
    id: 2,
    bookingId: 1,
    type: "Catering",
    items: ["Buffet Setup", "Tables & Chairs", "Cutlery"],
    status: "preparing",
  },
  {
    id: 3,
    bookingId: 1,
    type: "Decor",
    items: ["Flowers", "Lighting", "Stage Setup"],
    status: "requested",
  },
];
