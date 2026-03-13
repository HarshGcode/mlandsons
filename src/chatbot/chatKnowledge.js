// ─── Chat Knowledge Base ────────────────────────────────────────────────────
// Static FAQ responses, greetings, and templates for the ML & SONS chatbot

export const FAQ = {
  shipping: {
    text: "🚚 We offer FREE shipping across India within 3–5 business days. All items are carefully packaged in protective sleeves within premium boxes to ensure safe delivery. International shipping is also available on request.",
    quickActions: ['Browse Collection', 'Contact Us'],
  },
  authenticity: {
    text: "✅ Every item in our collection is 100% authentic and verified. We provide a Certificate of Authenticity with each purchase. Our grading follows international numismatic standards. With 25+ years in the business, we guarantee genuine pieces only.",
    quickActions: ['View Featured Items', 'Learn About Grading'],
  },
  contact: {
    text: "📞 You can reach us anytime:\n\n• Phone: +91 7453957724\n• WhatsApp: +91 7453957724\n• Email: contact@mlandsons.com\n• Visit: Rawatpara, Near Mankameshwar Mandir, Agra\n\nBusiness hours: Mon–Sat, 10 AM – 7 PM IST",
    quickActions: ['Chat on WhatsApp', 'Browse Collection'],
  },
  returns: {
    text: "↩️ We accept returns within 7 days of delivery if the item doesn't match the description. The item must be in the same condition as received. Refunds are processed within 3–5 business days after we receive the returned item.",
    quickActions: ['Contact Us', 'Browse Collection'],
  },
  payment: {
    text: "💳 We accept multiple payment methods:\n\n• UPI (Google Pay, PhonePe, Paytm)\n• Bank Transfer (NEFT/IMPS)\n• All major Credit & Debit Cards\n• Cash on Delivery (within India)\n\nEMI options available for orders above ₹10,000.",
    quickActions: ['Browse Collection', 'Contact Us'],
  },
  location: {
    text: "📍 Visit our store at:\n\nRawatpara, Near Mankameshwar Mandir\nAgra, UP – 282003\n\nOpen Monday to Saturday, 10:00 AM – 7:00 PM\nSunday: Closed",
    quickActions: ['Contact Us', 'Browse Collection'],
  },
};

export const GREETINGS = [
  "Namaste! 🙏 Welcome to ML & SONS. I can help you find rare notes, antique coins, and unique serial number currency. What are you looking for today?",
  "Hello! Welcome to ML & SONS — your trusted source for antique Indian currency since 1999. Ask me about our collection, pricing, or gift ideas!",
  "Hi there! 🪙 I'm here to help you explore our rare Indian currency collection. Looking for notes, coins, or a special gift?",
];

export const FAREWELLS = [
  "Thank you for visiting ML & SONS! Feel free to come back anytime. Happy collecting! 🙏",
  "Goodbye! If you need any help later, I'm always here. Have a wonderful day!",
  "Thanks for chatting! Don't forget to check out our featured items. See you soon! ✨",
];

export const FALLBACKS = [
  "I'm not sure I understood that. Could you try rephrasing? You can ask me about our notes, coins, pricing, or gift options.",
  "Hmm, I didn't quite catch that. Try asking about specific items like 'show me rare coins' or 'what notes do you have under 10000'.",
  "I'm still learning! You can ask me about:\n• Product details (notes, coins)\n• Pricing & budget\n• Gift recommendations\n• Shipping & authenticity\n• Grading conditions",
];

export function getWelcomeMessage() {
  return {
    id: Date.now(),
    role: 'bot',
    content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
    products: null,
    quickActions: ['Browse Categories', 'Featured Items', 'Gift Ideas', 'Search by Budget', 'Help'],
    timestamp: new Date(),
  };
}

export function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
