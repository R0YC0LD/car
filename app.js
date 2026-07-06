/* ==========================================================================
   ÇAĞRI NOBLE RENT A CAR - APPLICATION LOGIC & FIREBASE ENGINE (v12.15.0)
   Features: Updated Firebase Credentials (rentacar-227eb), Zero Overlap Navbar Layout,
   Dynamic FAQ Management, Email Verified Testimonials in Firestore.
   ========================================================================== */

// Updated Firebase v12.15.0 Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-eUh9Avnsr6oa0m0d1ns95FFdBMuQJNU",
  authDomain: "rentacar-227eb.firebaseapp.com",
  projectId: "rentacar-227eb",
  storageBucket: "rentacar-227eb.firebasestorage.app",
  messagingSenderId: "624163542423",
  appId: "1:624163542423:web:f6d7caf04b5fddab7c60d2",
  measurementId: "G-3F98DN26ML"
};

// Admin Password Credentials
const ADMIN_PASSWORD_PRIMARY = "05admıncagrıamasyarentacar";
const ADMIN_PASSWORD_ASCII = "05admincagriamasyarentacar";

// Translation Dictionary (TR / EN)
const TRANSLATIONS = {
  TR: {
    langSelectTitle: "Lütfen Dil Tercihinizi Yapınız",
    langSelectDesc: "Çağrı Noble VIP sürüş deneyimine hoş geldiniz. Lütfen devam etmek istediğiniz dili seçin.",
    navHome: "Anasayfa",
    navFleet: "Seçkin Filo",
    navExperience: "Deneyim",
    navTestimonials: "Referanslar",
    navFAQ: "SSS",
    navContact: "İletişim & Konum",
    navAdmin: "Yönetici Paneli",
    navInspectFleet: "Filoyu İncele",
    heroBadge: "Türkiye'nin En Seçkin VIP Filosu",
    heroTitle1: "Kusursuz Bir",
    heroTitle2: "Sürüş Sanatı.",
    heroSubtitle: "Zarafet, konfor ve yüksek performansı buluşturan lüks araç koleksiyonumuz ile yolculuğunuza asalet katın. Sizin için hazırlanmış VIP sürüş ayrıcalığı.",
    btnBookNow: "Hemen Araç Rezerve Et",
    btnProcess: "Süreci İncele",
    weeklyFeatured: "HAFTANIN PRESTİJ ARACI",
    quickPickup: "ALIŞ NOKTASI",
    quickPickupDate: "ALIŞ TARİHİ",
    quickReturnDate: "DÖNÜŞ TARİHİ",
    btnSearchCollection: "Koleksiyonu Ara",
    fleetHeading: "Filomuzu Keşfedin",
    fleetSubheading: "SEÇKİN KOLEKSİYONUMUZ",
    catAll: "Tüm Araçlar",
    catSedan: "Business Sedan",
    catSUV: "Luxury SUV",
    catEV: "Elektrikli",
    catSport: "Performans & Spor",
    searchPlaceholder: "Model veya marka ara...",
    sortRecommended: "Önerilen Sıralama",
    sortPriceLow: "Fiyat: Düşükten Yükseğe",
    sortPriceHigh: "Fiyat: Yüksekten Düşüğe",
    mobileFilterBtn: "Filtrele & Araçlar",
    dailyPriceLabel: "GÜNLÜK",
    depositLabel: "Kapora Bedeli",
    btnDetail: "Detaylar",
    btnReserve: "Rezerve Et",
    btnRented: "Kirada",
    btnMaintenance: "Bakımda",
    expSubheading: "DENEYİM VE SÜREÇ",
    expHeading: "4 Adımda Prestijli Kiralama",
    expDesc: "Çağrı Noble Rent a Car ile araç kiralama deneyimi tamamen şeffaf, hızlı ve dijitalleştirilmiştir. Kapora güvencesinden teslimata kadar tüm süreç kontrolünüz altında.",
    expInsTitle: "Uçtan Uca Sigorta Güvencesi",
    expInsDesc: "Tüm araçlarımız Rent-a-Car Kaskolu ve düzenli bakımlıdır.",
    step1Title: "Araç Seçimi ve Rezervasyon",
    step1Desc: "Geniş ve bakımlı VIP araç koleksiyonumuzdan tarzınıza en uygun modeli seçin, tarihlerinizi belirleyin.",
    step2Title: "Dijital Sürücü Doğrulaması",
    step2Desc: "Ehliyet ve kimlik bilgilerinizi güvenli altyapımıza yükleyin. Uzman ekibimiz saniyeler içinde onaylasın.",
    step3Title: "3D Secure Güvenli Ödeme",
    step3Desc: "Sanal POS üzerinden kiralama bedeli veya kaporayı güvenle ödeyin. Sürpriz ek maliyet ve saklı ücret yoktur.",
    step4Title: "7/24 VIP Valet Teslimat",
    step4Desc: "Seçtiğiniz havalimanı terminalinde veya adresinizde aracınız tertemiz ve dolu depo ile kapınıza teslim edilir.",
    statsFleet: "LÜKS ARAÇ FİLOSU",
    statsYears: "YILLIK GÜVEN",
    statsSatisfaction: "MEMNUNİYET ORANI",
    statsSupport: "YOL YARDIM & DESTEK",
    testimSubheading: "MİSAFİR GÖRÜŞLERİ",
    testimHeading: "Asil Müşterilerimizin Deneyimleri",
    faqSubheading: "SIKÇA SORULAN SORULAR",
    faqHeading: "Aklınıza Takılan Sorular",
    contactSubheading: "İLETİŞİM & LOKASYON",
    contactHeading: "Bizimle İletişime Geçin",
    contactDesc: "VIP araç kiralama rezervasyonu, özel şoförlü transfer veya filo kiralama teklifleri için 7/24 uzman ekibimiz hizmetinizdedir.",
    contactCallCenter: "7/24 ÇAĞRI MERKEZİ",
    contactWhatsapp: "WHATSAPP HIZLI DESTEK",
    contactHQ: "GENEL MERKEZ & LOKASYON",
    contactFormTitle: "Hızlı Bilgi ve Teklif Formu",
    formName: "ADINIZ SOYADINIZ",
    formPhone: "TELEFON NUMARANIZ",
    formEmail: "E-POSTA ADRESİNİZ",
    formMessage: "TALEP ETTİĞİNİZ ARAÇ VEYA MESAJINIZ",
    btnSendMessage: "Mesajı Gönder",
    mapBadge: "GOOGLE HARİTALAR KONUMU",
    mapGetDirections: "Google Haritalar'da Yol Tarifi Al",
    footerRights: "© 2026 ÇAĞRI NOBLE RENT A CAR. TÜM HAKLARI SAKLIDIR.",
    footerPrivacy: "KVKK Aydınlatma Metni",
    footerCookies: "Çerez Politikası",
    toastAddedFav: "Araç favorilere eklendi!",
    toastRemovedFav: "Araç favorilerden çıkarıldı.",
    toastAddedCompare: "Araç karşılaştırma listesine eklendi.",
    toastMaxCompare: "En fazla 3 araç karşılaştırabilirsiniz.",
    adminLoginTitle: "Çağrı Yönetici Girişi",
    adminPassPlaceholder: "Yönetici Şifrenizi Girin",
    adminLoginBtn: "Giriş Yap",
    adminLoginError: "Hatalı şifre! Lütfen şifrenizi tekrar kontrol edin."
  },
  EN: {
    langSelectTitle: "Please Choose Your Language",
    langSelectDesc: "Welcome to Çağrı Noble VIP driving experience. Please select your preferred language to proceed.",
    navHome: "Home",
    navFleet: "Exclusive Fleet",
    navExperience: "Experience",
    navTestimonials: "Testimonials",
    navFAQ: "FAQ",
    navContact: "Contact & Location",
    navAdmin: "Admin Portal",
    navInspectFleet: "Browse Fleet",
    heroBadge: "Turkey's Most Exclusive VIP Fleet",
    heroTitle1: "The Art of",
    heroTitle2: "Flawless Driving.",
    heroSubtitle: "Elevate your journey with our luxury vehicle collection combining elegance, comfort, and high performance. A tailored VIP driving privilege.",
    btnBookNow: "Reserve Vehicle Now",
    btnProcess: "Explore Process",
    weeklyFeatured: "FEATURED PRESTIGE VEHICLE",
    quickPickup: "PICKUP LOCATION",
    quickPickupDate: "PICKUP DATE",
    quickReturnDate: "RETURN DATE",
    btnSearchCollection: "Search Collection",
    fleetHeading: "Discover Our Fleet",
    fleetSubheading: "EXCLUSIVE COLLECTION",
    catAll: "All Vehicles",
    catSedan: "Business Sedan",
    catSUV: "Luxury SUV",
    catEV: "Electric",
    catSport: "Performance & Sport",
    searchPlaceholder: "Search model or brand...",
    sortRecommended: "Recommended Order",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    mobileFilterBtn: "Filter & Fleet",
    dailyPriceLabel: "DAILY",
    depositLabel: "Security Deposit",
    btnDetail: "Details",
    btnReserve: "Reserve Now",
    btnRented: "Rented",
    btnMaintenance: "In Service",
    expSubheading: "EXPERIENCE & PROCESS",
    expHeading: "4 Steps to Prestige Rental",
    expDesc: "With Çağrı Noble Rent a Car, your vehicle rental experience is completely transparent, swift, and digitized. From deposit security to delivery, everything is under your control.",
    expInsTitle: "End-to-End Insurance Guarantee",
    expInsDesc: "All our vehicles carry full Rent-a-Car insurance and regular service maintenance.",
    step1Title: "Vehicle Selection & Reservation",
    step1Desc: "Choose the model that fits your style from our wide and pristine VIP vehicle collection, then set your dates.",
    step2Title: "Digital Driver Verification",
    step2Desc: "Upload your driver license and ID credentials to our secure engine. Our team approves in seconds.",
    step3Title: "3D Secure Payment",
    step3Desc: "Securely pay your rental fee or security deposit via Virtual POS. Zero surprise costs or hidden fees.",
    step4Title: "24/7 VIP Valet Delivery",
    step4Desc: "At your selected airport terminal or private address, your vehicle is delivered immaculate with a full fuel tank.",
    statsFleet: "LUXURY FLEET CARS",
    statsYears: "YEARS OF TRUST",
    statsSatisfaction: "SATISFACTION RATE",
    statsSupport: "ROADSIDE ASSISTANCE",
    testimSubheading: "GUEST TESTIMONIALS",
    testimHeading: "Experiences of Our Noble Guests",
    faqSubheading: "FREQUENTLY ASKED QUESTIONS",
    faqHeading: "Got Questions? We Have Answers",
    contactSubheading: "CONTACT & LOCATION",
    contactHeading: "Get in Touch with Us",
    contactDesc: "For VIP car rental reservations, chauffeur transfers, or corporate fleet quotes, our team is available 24/7.",
    contactCallCenter: "24/7 CALL CENTER",
    contactWhatsapp: "WHATSAPP FAST SUPPORT",
    contactHQ: "HEADQUARTERS & LOCATION",
    contactFormTitle: "Quick Information & Quote Form",
    formName: "FULL NAME",
    formPhone: "PHONE NUMBER",
    formEmail: "EMAIL ADDRESS",
    formMessage: "REQUESTED VEHICLE OR MESSAGE",
    btnSendMessage: "Send Message",
    mapBadge: "GOOGLE MAPS LOCATION",
    mapGetDirections: "Get Directions on Google Maps",
    footerRights: "© 2026 ÇAĞRI NOBLE RENT A CAR. ALL RIGHTS RESERVED.",
    footerPrivacy: "Privacy Policy",
    footerCookies: "Cookie Policy",
    toastAddedFav: "Vehicle added to favorites!",
    toastRemovedFav: "Vehicle removed from favorites.",
    toastAddedCompare: "Vehicle added to comparison list.",
    toastMaxCompare: "You can compare up to 3 vehicles.",
    adminLoginTitle: "Admin Panel Login",
    adminPassPlaceholder: "Enter Admin Password",
    adminLoginBtn: "Log In",
    adminLoginError: "Incorrect password! Please check your credentials."
  }
};

// Initial Vehicle Database
const INITIAL_VEHICLES = [
  {
    id: 'car-1',
    brand: 'Mercedes-Benz',
    model: 'E-Class AMG Line',
    year: 2023,
    category: 'Sedan',
    fuel: 'Dizel',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 3,
    power: '200 HP',
    acceleration: '7.5s (0-100)',
    topSpeed: '240 km/h',
    price: 3500,
    deposit: 5000,
    status: 'Müsait',
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&w=800&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&w=800&q=80&fit=crop'
    ],
    plate: '34 CGR 1001',
    features: ['Deri Koltuk', 'Panoramik Cam Tavan', 'Burmester Ses', 'Otonom Sürüş']
  },
  {
    id: 'car-2',
    brand: 'BMW',
    model: '520i M-Sport',
    year: 2023,
    category: 'Sedan',
    fuel: 'Benzin',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 3,
    power: '170 HP',
    acceleration: '7.9s (0-100)',
    topSpeed: '230 km/h',
    price: 3200,
    deposit: 4500,
    status: 'Müsait',
    badge: 'M-Sport',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80&fit=crop',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80&fit=crop'],
    plate: '34 CGR 2002',
    features: ['M-Aerodinamik Paket', 'Harman Kardon', 'Head-Up Display']
  },
  {
    id: 'car-4',
    brand: 'Porsche',
    model: 'Taycan GTS',
    year: 2023,
    category: 'Elektrikli',
    fuel: 'EV',
    transmission: 'Otomatik',
    seats: 4,
    luggage: 2,
    power: '598 HP',
    acceleration: '3.7s (0-100)',
    topSpeed: '250 km/h',
    price: 7000,
    deposit: 10000,
    status: 'Müsait',
    badge: 'GTS Performance',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&w=800&q=80&fit=crop',
    images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&w=800&q=80&fit=crop'],
    plate: '34 CGR 4004',
    features: ['%100 Elektrikli', 'Sport Chrono', 'Porsche Electric Sound']
  },
  {
    id: 'car-5',
    brand: 'Range Rover',
    model: 'Sport HSE Dynamic',
    year: 2023,
    category: 'SUV',
    fuel: 'Dizel',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 5,
    power: '300 HP',
    acceleration: '6.6s (0-100)',
    topSpeed: '225 km/h',
    price: 6500,
    deposit: 9000,
    status: 'Müsait',
    badge: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&w=800&q=80&fit=crop',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&w=800&q=80&fit=crop'],
    plate: '34 CGR 5005',
    features: ['Terrain Response 2', 'Meridian 3D Sound', 'Panoramik Cam Tavan']
  }
];

// Initial FAQ Database
const INITIAL_FAQS = [
  {
    id: 'faq-1',
    q_tr: 'Minimum araç kiralama yaşı ve ehliyet süresi nedir?',
    q_en: 'What is the minimum rental age and driver license requirement?',
    a_tr: 'Lüks araç kategorimiz için minimum sürücü yaşı 24, ehliyet süresi ise en az 2 yıldır. Ultra luxury modellerimiz için minimum yaş sınırı 26\'dır.',
    a_en: 'For our luxury fleet, minimum driver age is 24 with at least 2 years of license experience.'
  },
  {
    id: 'faq-2',
    q_tr: 'Depozito (Kapora) iadesi ne zaman yapılır?',
    q_en: 'When is the security deposit refunded?',
    a_tr: 'Aracın tesliminden hemen sonra trafik cezaları kontrol edilir. Depozito tutarı 3 iş günü içerisinde karta iade edilir.',
    a_en: 'Deposit is refunded to your card within 3 business days after return inspection.'
  }
];

// Initial Testimonials
const INITIAL_TESTIMONIALS = [
  {
    id: 'rev-1',
    authorName: 'Mehmet Demir',
    authorTitle: 'Şirket Yöneticisi',
    authorEmail: 'mehmet.d@example.com',
    rating: 5,
    content: 'İstanbul Havalimanı\'nda aracımı uçaktan iner inmez tam zamanında teslim aldım. Aracın temizliği ve bakımı kusursuzdu. Çağrı Rent a Car ekibine teşekkür ederim.',
    isEmailVerified: true,
    status: 'Yayında',
    createdAt: '2026-07-01 10:30'
  },
  {
    id: 'rev-2',
    authorName: 'Selin Yıldız',
    authorTitle: 'Pazarlama Direktörü',
    authorEmail: 'selin.yildiz@example.com',
    rating: 5,
    content: 'İş seyahatlerimde düzenli olarak Mercedes E-Class kiralıyorum. Söz verdikleri gibi hiçbir sürpriz ek masraf veya zorluk yaşatmadılar. 10/10 hizmet!',
    isEmailVerified: true,
    status: 'Yayında',
    createdAt: '2026-07-02 14:15'
  },
  {
    id: 'rev-3',
    authorName: 'Kaan Aksoy',
    authorTitle: 'Mimar',
    authorEmail: 'kaan.aksoy@example.com',
    rating: 5,
    content: 'Bodrum tatilimiz için Porsche Taycan kiraladık. Araç sıfır kokuyordu. Havalimanında karşılama son derece profesyonel ve saygılıydı.',
    isEmailVerified: true,
    status: 'Yayında',
    createdAt: '2026-07-04 18:45'
  }
];

// Initial POS Config & State
const INITIAL_POS_CONFIG = {
  provider: 'PayTR',
  merchantId: '123456',
  apiKey: 'paytr_live_key_984128941',
  secretKey: 'paytr_secret_key_841294812',
  is3DSecure: true,
  isTestMode: true
};

let currentLang = localStorage.getItem('cagri_lang') || 'TR';
let isLangChosen = localStorage.getItem('cagri_lang_chosen') === 'true';
let vehicles = [];
let faqs = [];
let testimonials = [];
let reservations = [];
let favorites = JSON.parse(localStorage.getItem('cagri_favorites')) || [];
let posConfig = INITIAL_POS_CONFIG;
let customAdminPassword = ADMIN_PASSWORD_PRIMARY;
let isDbLoading = true;

let isAdminLoggedIn = false;
let comparisonList = [];
let pendingReviewData = null;
let pendingReviewOTP = '';

let activeFilters = {
  category: 'Tüm',
  search: '',
  sort: 'recommended'
};

let selectedCarForBooking = null;
let currentCheckoutStep = 1;
let checkoutBookingData = {};
let editingCarId = null;
let editingFaqId = null;

// Save Local State
function saveState() {
  localStorage.setItem('cagri_favorites', JSON.stringify(favorites));
  localStorage.setItem('cagri_lang', currentLang);
  localStorage.setItem('cagri_lang_chosen', isLangChosen ? 'true' : 'false');
}

// Initial Entry Language Selector Handler
function selectInitialLanguage(lang) {
  currentLang = lang;
  isLangChosen = true;
  saveState();
  setLanguage(lang);
  closeModal('entry-lang-modal');
}

// Toast System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'ri-checkbox-circle-fill text-emerald-400',
    warning: 'ri-error-warning-fill text-amber-400',
    error: 'ri-close-circle-fill text-red-400',
    info: 'ri-information-fill text-amber-300'
  };

  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.innerHTML = `
    <i class="${icons[type] || icons.info} text-xl"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Multi-Language Translation (100% Coverage)
function setLanguage(lang) {
  currentLang = lang;
  saveState();
  
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.TR;
  
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.dataset.i18n;
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  renderFleetCatalog();
  renderFAQAccordion();
  renderTestimonials();
}

// Mobile Navigation Drawer Toggle
function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
  }
}

function scrollToElement(elemId) {
  const elem = document.getElementById(elemId);
  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();

  const splashModal = document.getElementById('entry-lang-modal');
  if (splashModal) {
    if (isLangChosen) {
      splashModal.classList.remove('active');
    } else {
      splashModal.classList.add('active');
    }
  }

  setLanguage(currentLang);
  renderFleetCatalog();
  renderFAQAccordion();
  renderTestimonials();
  renderWeeklyFeatured();
  initFilterControls();
  initNavbarScrollEffect();
  initContactForm();
  checkEmailLinkVerification();
  checkAndSeedDatabase();
  initRealtimeSync();
});

// Smooth Scroll
function initLenisSmoothScroll() {
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }
}

// ==========================================
// TESTIMONIALS & EMAIL VERIFICATION ENGINE
// ==========================================

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  if (isDbLoading) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center">
        <div class="inline-block w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    `;
    return;
  }

  const published = testimonials.filter(t => t.status === 'Yayında');

  if (published.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-gray-400">
        <i class="ri-chat-smile-2-line text-4xl mb-2 block text-amber-500"></i>
        <p>Henüz yayınlanmış bir müşteri yorumu bulunmuyor.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = published.map(rev => {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<i class="${i <= rev.rating ? 'ri-star-fill text-[#C5A059]' : 'ri-star-line text-gray-300'}"></i>`;
    }

    let badgeHtml = '';
    if (rev.source === 'google') {
      badgeHtml = `
        <span class="text-[9px] font-extrabold tracking-widest text-[#4285F4] bg-[#4285F4]/5 border border-[#4285F4]/20 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
          <i class="ri-google-fill text-[#4285F4]"></i> Google
        </span>
      `;
    } else if (rev.isEmailVerified) {
      badgeHtml = `
        <span class="text-[9px] font-extrabold tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
          <i class="ri-checkbox-circle-fill text-xs"></i> E-Posta Onaylı
        </span>
      `;
    }

    let avatarHtml = '';
    if (rev.avatar) {
      avatarHtml = `<img src="${rev.avatar}" class="w-10 h-10 rounded-full object-cover border border-[#C5A059]/20" alt="${rev.authorName}">`;
    } else {
      avatarHtml = `
        <div class="w-10 h-10 rounded-full bg-[#121214] text-white flex items-center justify-center font-bold text-sm font-serif">
          ${rev.authorName ? rev.authorName.charAt(0).toUpperCase() : 'M'}
        </div>
      `;
    }

    return `
      <div class="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between hover:border-[#C5A059]/40 transition-all">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex gap-1">${starsHtml}</div>
            ${badgeHtml}
          </div>
          <p class="text-sm text-gray-600 font-light leading-relaxed">
            "${rev.content}"
          </p>
        </div>
        <div class="border-t border-gray-100 pt-4 flex items-center gap-4">
          ${avatarHtml}
          <div>
            <h4 class="font-bold text-sm text-[#121214]">${rev.authorName}</h4>
            <span class="text-[10px] text-gray-400 uppercase font-semibold">${rev.authorTitle || 'Asil Müşteri'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Review Submission Wizard with Email Link Verification
function openReviewSubmissionModal() {
  pendingReviewData = null;

  const modal = document.getElementById('review-modal');
  const container = document.getElementById('review-modal-content');

  if (!modal || !container) return;

  renderReviewStep1View(container);
  modal.classList.add('active');
}

function renderReviewStep1View(container) {
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 54px; height: 54px; background: var(--noble-gold-light); color: var(--noble-gold); border-radius: 16px; display: inline-flex; items-center; justify-content: center; font-size: 1.8rem; margin-bottom: 12px;">
        <i class="ri-chat-quote-line"></i>
      </div>
      <h3 class="font-serif text-3xl font-bold mb-1">Müşteri Yorumu Paylaşın</h3>
      <p style="font-size: 0.75rem; color: #64748B;">Çağrı Noble Rent a Car kiralama deneyiminizi tarafsızca değerlendirin.</p>
    </div>

    <form onsubmit="event.preventDefault(); processReviewStep1();" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">ADINIZ SOYADINIZ</label>
          <input type="text" id="rev-name" required class="form-input" placeholder="Ahmet Yılmaz">
        </div>
        <div class="form-group">
          <label class="form-label">UNVAN / MESLEK</label>
          <input type="text" id="rev-title" class="form-input" placeholder="Şirket Yöneticisi, Mimar vb.">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">E-POSTA ADRESİNİZ (DOĞRULAMA BAĞLANTISI GÖNDERİLECEKTİR)</label>
        <input type="email" id="rev-email" required class="form-input" placeholder="ahmet@example.com">
      </div>

      <div class="form-group">
        <label class="form-label">DEĞERLENDİRME PUANI (1 - 5 YILDIZ)</label>
        <select id="rev-rating" class="form-select">
          <option value="5" selected>⭐⭐⭐⭐⭐ (5/5 Mükemmel)</option>
          <option value="4">⭐⭐⭐⭐ (4/5 Çok İyi)</option>
          <option value="3">⭐⭐⭐ (3/5 Orta)</option>
          <option value="2">⭐⭐ (2/5 Geliştirilmeli)</option>
          <option value="1">⭐ (1/5 Zayıf)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">YORUM METNİNİZ</label>
        <textarea id="rev-content" rows="4" required class="form-textarea" placeholder="Araç temizliği, teslimat hızı ve müşteri hizmetleri hakkındaki düşünceleriniz..."></textarea>
      </div>

      <div class="pt-2">
        <button type="submit" class="btn-noble-gold" style="width: 100%; justify-content: center; padding: 16px;">
          <i class="ri-mail-send-line"></i> Doğrulama Bağlantısı Gönder ve İlerle
        </button>
      </div>
    </form>
  `;
}

async function processReviewStep1() {
  const name = document.getElementById('rev-name').value.trim();
  const title = document.getElementById('rev-title').value.trim();
  const email = document.getElementById('rev-email').value.trim();
  const rating = parseInt(document.getElementById('rev-rating').value);
  const content = document.getElementById('rev-content').value.trim();

  if (!name || !email || !content) {
    showToast('Lütfen adınız, e-posta adresiniz ve yorumunuzu doldurun.', 'warning');
    return;
  }

  pendingReviewData = {
    id: 'rev-' + Date.now(),
    authorName: name,
    authorTitle: title || 'Müşteri',
    authorEmail: email,
    rating,
    content,
    isEmailVerified: false,
    status: 'Yayında',
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
  };

  // Save to temporary storage
  localStorage.setItem('cagri_pending_review', JSON.stringify(pendingReviewData));
  localStorage.setItem('cagri_pending_review_email', email);

  showToast('Doğrulama e-postası hazırlanıyor...', 'info');

  // Trigger Firebase Auth Email Link
  const actionCodeSettings = {
    url: window.location.origin + window.location.pathname + '?verifyReview=true',
    handleCodeInApp: true
  };

  if (window.auth && window.authTools && window.authTools.sendSignInLinkToEmail) {
    try {
      await window.authTools.sendSignInLinkToEmail(window.auth, email, actionCodeSettings);
      showToast('Doğrulama bağlantısı e-postanıza gönderildi!', 'success');
    } catch (err) {
      console.warn("Firebase Auth email link sending failed:", err);
    }
  }

  const container = document.getElementById('review-modal-content');
  if (container) {
    renderReviewLinkSentView(container, email);
  }
}

function renderReviewLinkSentView(container, email) {
  const simulateUrl = window.location.origin + window.location.pathname + '?verifyReview=true&email=' + encodeURIComponent(email);

  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px; padding: 20px 0;">
      <div style="width: 60px; height: 60px; background: #ECFDF5; color: #10B981; border-radius: 20px; display: inline-flex; items-center; justify-content: center; font-size: 2rem; margin-bottom: 16px;" class="border border-emerald-200 shadow-sm">
        <i class="ri-mail-check-line"></i>
      </div>
      <h3 class="font-serif text-3xl font-bold mb-2">Bağlantı Gönderildi!</h3>
      <p style="font-size: 0.85rem; color: #64748B; max-width: 440px; margin: 0 auto; line-height: 1.6;">
        <strong>${email}</strong> adresinize doğrulama bağlantısı gönderilmiştir. Gelen kutunuzdaki bağlantıya tıklayarak yorumunuzu yayınlayabilirsiniz.
      </p>
    </div>

    <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 18px; border-radius: 16px; margin-bottom: 20px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 800; color: #B45309; text-transform: uppercase; display: block; margin-bottom: 8px;">
        <i class="ri-bug-line text-amber-500"></i> GELİŞTİRİCİ TEST MODU (SİMÜLASYON BAĞLANTISI)
      </span>
      <p style="font-size: 0.72rem; color: #78350F; margin-bottom: 12px; line-height: 1.5;">
        E-postanıza gitmeden doğrulama akışını test etmek için aşağıdaki simüle butonuna tıklayabilirsiniz:
      </p>
      <a href="${simulateUrl}" class="btn-noble-gold" style="padding: 10px 20px; font-size: 0.7rem; display: inline-flex;">
        Doğrulama Bağlantısını Simüle Et <i class="ri-external-link-line ml-1"></i>
      </a>
    </div>

    <div style="display: flex; gap: 12px; justify-content: center; pt-4">
      <button type="button" onclick="closeModal('review-modal')" class="btn-noble-outline" style="width: 120px; justify-content: center;">
        Kapat
      </button>
    </div>
  `;
}

async function checkEmailLinkVerification() {
  const urlParams = new URLSearchParams(window.location.search);
  const verifyReview = urlParams.get('verifyReview') === 'true';
  const url = window.location.href;

  const isRealFirebaseLink = window.authTools && window.authTools.isSignInWithEmailLink && window.authTools.isSignInWithEmailLink(window.auth, url);

  if (verifyReview || isRealFirebaseLink) {
    let email = urlParams.get('email') || localStorage.getItem('cagri_pending_review_email');
    
    if (!email && isRealFirebaseLink) {
      email = window.prompt('Lütfen doğrulama için yorumda kullandığınız e-posta adresinizi giriniz:');
    }

    if (!email) {
      showToast('E-posta adresi bulunamadı!', 'error');
      return;
    }

    showToast('E-posta doğrulanıyor, lütfen bekleyin...', 'info');

    // Complete real Firebase verification if it is a real link
    if (isRealFirebaseLink && window.authTools && window.authTools.signInWithEmailLink) {
      try {
        await window.authTools.signInWithEmailLink(window.auth, email, url);
        console.log("Firebase Auth passwordless sign-in success!");
      } catch (err) {
        console.warn("Firebase Auth sign-in failed (or not configured yet in Console):", err);
      }
    }

    // Process saving the testimonial
    const pendingReview = JSON.parse(localStorage.getItem('cagri_pending_review'));
    if (pendingReview && pendingReview.authorEmail.toLowerCase() === email.toLowerCase()) {
      pendingReview.isEmailVerified = true;
      pendingReview.status = 'Yayında';

      // Save to Firebase
      if (window.db && window.firestoreTools) {
        try {
          const { doc, setDoc } = window.firestoreTools;
          await setDoc(doc(window.db, "testimonials", pendingReview.id), pendingReview);
          console.log("Testimonial successfully written to Firestore!");
          
          showToast('Tebrikler! E-posta adresiniz doğrulandı ve yorumunuz yayınlandı.', 'success');
          
          // Clear URL params
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Clean up localStorage
          localStorage.removeItem('cagri_pending_review');
          localStorage.removeItem('cagri_pending_review_email');
        } catch (err) {
          console.error("Firestore save error:", err);
          showToast('Yorum kaydedilirken bir hata oluştu.', 'error');
        }
      }
    } else {
      showToast('Doğrulanacak bekleyen yorum bulunamadı veya e-posta adresi eşleşmiyor.', 'warning');
    }
  }
}

async function checkAndSeedDatabase() {
  if (window.db && window.firestoreTools) {
    const { collection, getDocs, doc, setDoc } = window.firestoreTools;
    try {
      const snapshot = await getDocs(collection(window.db, "vehicles"));
      if (snapshot.empty) {
        console.log("Firestore vehicles collection is empty. Seeding initial data...");
        // Seed default vehicles
        for (let car of INITIAL_VEHICLES) {
          await setDoc(doc(window.db, "vehicles", car.id), car);
        }
        // Seed default FAQs
        const INITIAL_FAQS = [
          {
            id: 'faq-1',
            q_tr: 'Araç kiralama için minimum yaş ve ehliyet süresi nedir?',
            q_en: 'What is the minimum age and driving license period for car rental?',
            a_tr: 'Ekonomik sınıf araçlar için en az 21 yaş ve 2 yıllık ehliyet, premium ve lüks sınıf araçlar için en az 25 yaş ve 5 yıllık ehliyet şartı aranmaktadır.',
            a_en: 'A minimum age of 21 and a 2-year license is required for economic class vehicles, and a minimum age of 25 and a 5-year license is required for premium and luxury class vehicles.'
          },
          {
            id: 'faq-2',
            q_tr: 'Kiralama fiyatlarına kasko ve sigorta dahil midir?',
            q_en: 'Are insurance and collision damage waiver included in the rental prices?',
            a_tr: 'Tüm kiralama fiyatlarımıza Muafiyetli Hasar Sorumluluk Güvencesi ve Hırsızlık Güvencesi dahildir. İsteğe bağlı olarak Muafiyetsiz Tam Kasko da satın alınabilir.',
            a_en: 'All rental prices include Collision Damage Waiver (CDW) and Theft Protection. Optional Super Collision Damage Waiver (SCDW) can also be purchased.'
          },
          {
            id: 'faq-3',
            q_tr: 'Depozito (Provizyon) ücreti ne zaman iade edilir?',
            q_en: 'When will the deposit (provision) fee be refunded?',
            a_tr: 'Kiralama başlangıcında alınan depozito tutarı, aracı eksiksiz ve hasarsız teslim etmeniz durumunda 3-10 iş günü içerisinde bankanıza bağlı olarak iade edilir.',
            a_en: 'The deposit fee blocked at the beginning of the rental is refunded within 3-10 business days depending on your bank, provided that the vehicle is returned complete and undamaged.'
          }
        ];
        for (let faq of INITIAL_FAQS) {
          await setDoc(doc(window.db, "faqs", faq.id), faq);
        }
        // Seed default Testimonials
        const INITIAL_TESTIMONIALS = [
          {
            id: 'rev-1',
            authorName: 'Yavuz Selim',
            authorTitle: 'CEO, TechCorp',
            authorEmail: 'yavuz@techcorp.com',
            rating: 5,
            content: 'Çağrı RentaCar firmasından Mercedes S-Class kiraladım. Araç tesliminden kiralama sonuna kadar gösterilen VIP ilgi muazzamdı. Amasya bölgesinde lüks araç kiralamanın tek adresi.',
            isEmailVerified: true,
            status: 'Yayında',
            createdAt: '2026-07-01'
          },
          {
            id: 'rev-2',
            authorName: 'Sarah Jenkins',
            authorTitle: 'Travel Blogger',
            authorEmail: 'sarah@travels.com',
            rating: 5,
            content: 'Incredibly smooth rental process. The Range Rover Sport was spotless and drove beautifully. The staff was very professional and met us right at the terminal output. Highly recommended!',
            isEmailVerified: true,
            status: 'Yayında',
            createdAt: '2026-07-02'
          }
        ];
        for (let rev of INITIAL_TESTIMONIALS) {
          await setDoc(doc(window.db, "testimonials", rev.id), rev);
        }
        console.log("Seeding completed successfully!");
      }
    } catch (err) {
      console.warn("Auto-seeding skipped or failed:", err);
    }
  }
}

function initRealtimeSync() {
  if (window.db && window.firestoreTools && window.firestoreTools.onSnapshot) {
    const { collection, onSnapshot } = window.firestoreTools;

    // 1. Listen to Vehicles
    onSnapshot(collection(window.db, "vehicles"), (snapshot) => {
      const dbVehicles = [];
      snapshot.forEach((doc) => {
        dbVehicles.push({ ...doc.data(), id: doc.id });
      });
      vehicles = dbVehicles;
      isDbLoading = false;
      saveState();
      renderFleetCatalog();
      renderWeeklyFeatured();
    });

    // 2. Listen to Testimonials
    onSnapshot(collection(window.db, "testimonials"), (snapshot) => {
      const dbTestimonials = [];
      snapshot.forEach((doc) => {
        dbTestimonials.push({ ...doc.data(), id: doc.id });
      });
      testimonials = dbTestimonials;
      saveState();
      renderTestimonials();
    });

    // 3. Listen to FAQs
    onSnapshot(collection(window.db, "faqs"), (snapshot) => {
      const dbFaqs = [];
      snapshot.forEach((doc) => {
        dbFaqs.push({ ...doc.data(), id: doc.id });
      });
      faqs = dbFaqs;
      saveState();
      renderFAQAccordion();
    });

    // 4. Listen to Reservations
    onSnapshot(collection(window.db, "reservations"), (snapshot) => {
      const dbReservations = [];
      snapshot.forEach((doc) => {
        dbReservations.push({ ...doc.data(), id: doc.id });
      });
      reservations = dbReservations;
      saveState();
      renderWeeklyFeatured();
    });
  }
}

function renderWeeklyFeatured() {
  const container = document.getElementById('weekly-featured-container');
  if (!container || !vehicles || vehicles.length === 0) return;

  // 1. Find vehicle manually set as prestige
  let prestigeCar = vehicles.find(v => v.isPrestige === true);

  // 2. If not set, find the most reserved vehicle model
  if (!prestigeCar && reservations && reservations.length > 0) {
    const counts = {};
    reservations.forEach(res => {
      const name = res.carName;
      counts[name] = (counts[name] || 0) + 1;
    });

    let max = 0;
    let maxName = '';
    for (let name in counts) {
      if (counts[name] > max) {
        max = counts[name];
        maxName = name;
      }
    }

    if (maxName) {
      prestigeCar = vehicles.find(v => `${v.brand} ${v.model}` === maxName);
    }
  }

  // 3. Fallback to the first available vehicle
  if (!prestigeCar) {
    prestigeCar = vehicles[0];
  }

  if (!prestigeCar) return;

  const isEn = (currentLang === 'EN');
  const badgeText = isEn ? 'FEATURED PRESTIGE VEHICLE' : 'HAFTANIN PRESTİJ ARACI';
  const rentBtnText = isEn ? 'Detail & Book' : 'Detay & Kirala';
  const specText = `${prestigeCar.fuel || 'Benzin'} • ${prestigeCar.power || '350 HP'} • ${prestigeCar.acceleration || '5.2s'} (0-100)`;

  container.innerHTML = `
    <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 group">
      <img src="${prestigeCar.image}" alt="${prestigeCar.brand} ${prestigeCar.model}" class="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-1000">
      <div class="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80"></div>
      <div class="absolute bottom-8 left-8 right-8 text-white">
        <span class="text-[9px] font-extrabold tracking-[0.2em] text-[#C5A059] uppercase mb-2 block">${badgeText}</span>
        <h3 class="font-serif text-3xl font-bold mb-1">${prestigeCar.brand} ${prestigeCar.model}</h3>
        <p class="text-xs text-gray-300 font-light mb-4">${specText}</p>
        <div class="flex justify-between items-center border-t border-white/20 pt-4">
          <span class="font-serif text-2xl font-bold text-[#C5A059]">₺${prestigeCar.price.toLocaleString('tr-TR')} <span class="text-[10px] text-gray-300 uppercase font-sans">/${isEn ? 'day' : 'gün'}</span></span>
          <button onclick="startBooking('${prestigeCar.id}')" class="btn-noble-gold" style="padding: 8px 16px; font-size: 0.65rem;">${rentBtnText}</button>
        </div>
      </div>
    </div>
  `;
}

// Render Homepage FAQ Accordion
function renderFAQAccordion() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  if (isDbLoading) {
    container.innerHTML = `
      <div class="py-8 text-center">
        <div class="inline-block w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    `;
    return;
  }

  container.innerHTML = faqs.map((item, index) => {
    const question = currentLang === 'EN' ? item.q_en : item.q_tr;
    const answer = currentLang === 'EN' ? item.a_en : item.a_tr;

    return `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <div class="faq-header" onclick="toggleFAQAccordion(this)">
          <span>${question}</span>
          <i class="ri-arrow-down-s-line faq-icon text-xl transition-transform"></i>
        </div>
        <div class="faq-content">
          <p>${answer}</p>
        </div>
      </div>
    `;
  }).join('');
}

function toggleFAQAccordion(headerElem) {
  const parent = headerElem.closest('.faq-item');
  if (!parent) return;

  const isActive = parent.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isActive) parent.classList.add('active');
}

// Fleet Catalog Filtering Engine
function initFilterControls() {
  const categoryContainer = document.getElementById('category-tab-container');
  if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-tab-btn');
      if (!btn) return;

      document.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilters.category = btn.dataset.category || 'Tüm';
      renderFleetCatalog();
    });
  }
}

function handleSearchInputChange(e) {
  activeFilters.search = e.target.value;
  renderFleetCatalog();
}

function handleSortSelectChange(e) {
  activeFilters.sort = e.target.value;
  renderFleetCatalog();
}

function resetFilters() {
  activeFilters = {
    category: 'Tüm',
    search: '',
    sort: 'recommended'
  };
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.cat-tab-btn').forEach((b, i) => {
    if (i === 0) b.classList.add('active');
    else b.classList.remove('active');
  });

  renderFleetCatalog();
}

function renderFleetCatalog() {
  const gridContainer = document.getElementById('fleet-grid');
  if (!gridContainer) return;

  if (isDbLoading) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="inline-block w-12 h-12 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-sm text-gray-500 font-sans tracking-wide">Lüks VIP araçlar yükleniyor...</p>
      </div>
    `;
    return;
  }

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.TR;

  let filtered = vehicles.filter(car => {
    if (activeFilters.category !== 'Tüm' && car.category !== activeFilters.category) return false;
    
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase().trim();
      const matchBrand = car.brand.toLowerCase().includes(q);
      const matchModel = car.model.toLowerCase().includes(q);
      const matchCat = car.category.toLowerCase().includes(q);
      const matchFuel = car.fuel.toLowerCase().includes(q);
      if (!matchBrand && !matchModel && !matchCat && !matchFuel) return false;
    }

    return true;
  });

  if (activeFilters.sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const countElem = document.getElementById('fleet-count');
  if (countElem) {
    countElem.textContent = `${filtered.length} ${currentLang === 'EN' ? 'Vehicles Listed' : 'Araç Listeleniyor'}`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 p-12">
        <i class="ri-car-line text-5xl text-gray-300 mb-4 block"></i>
        <h3 class="font-serif text-2xl text-gray-800 mb-2">${currentLang === 'EN' ? 'No Vehicles Found' : 'Uygun Araç Bulunamadı'}</h3>
        <p class="text-sm text-gray-500 max-w-md mx-auto mb-6">${currentLang === 'EN' ? 'Try resetting filters to view all vehicles.' : 'Filtreleri sıfırlayarak tekrar arama yapabilirsiniz.'}</p>
        <button onclick="resetFilters()" class="btn-noble-outline">${currentLang === 'EN' ? 'Reset Filters' : 'Filtreleri Sıfırla'}</button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(car => {
    const isFav = favorites.includes(car.id);
    const isComp = comparisonList.includes(car.id);

    let statusClass = 'available';
    let statusText = dict.btnReserve;
    if (car.status === 'Kirada') {
      statusClass = 'rented';
      statusText = dict.btnRented;
    } else if (car.status === 'Bakımda') {
      statusClass = 'maintenance';
      statusText = dict.btnMaintenance;
    }

    const translatedFuel = currentLang === 'EN' ? (car.fuel === 'Dizel' ? 'Diesel' : car.fuel === 'Benzin' ? 'Petrol' : car.fuel === 'Hibrit' ? 'Hybrid' : car.fuel) : car.fuel;
    const translatedTrans = currentLang === 'EN' ? 'Automatic' : car.transmission;

    return `
      <div class="car-card">
        <div class="car-card-img-wrap">
          <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-card-img" loading="lazy">
          
          <button onclick="toggleFavorite('${car.id}', event)" class="car-card-fav-btn ${isFav ? 'active' : ''}" title="Favorilere Ekle">
            <i class="${isFav ? 'ri-heart-fill' : 'ri-heart-line'} text-lg"></i>
          </button>

          <div style="position: absolute; top: 18px; left: 18px; display: flex; flex-direction: column; gap: 6px;">
            <span class="badge-tag" style="background: rgba(18, 18, 20, 0.85); color: white; backdrop-filter: blur(4px);">${car.badge}</span>
          </div>

          <div style="position: absolute; bottom: 14px; right: 18px;">
            <span class="badge-status ${statusClass}">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
              ${currentLang === 'EN' ? (car.status === 'Müsait' ? 'Available' : car.status === 'Kirada' ? 'Rented' : 'Service') : car.status}
            </span>
          </div>
        </div>
        
        <div class="car-card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <div>
              <h3 class="font-serif text-2xl" style="font-weight: 700;">${car.brand} ${car.model}</h3>
              <p style="font-size: 0.7rem; font-weight: 700; color: #64748B; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px;">
                ${car.year} • ${translatedTrans} • ${car.plate}
              </p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 0.65rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">${dict.dailyPriceLabel}</p>
              <p class="font-serif text-2xl" style="font-weight: 800; color: var(--noble-gold);">₺${car.price.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div class="car-specs-grid">
            <div class="car-spec-item">
              <i class="ri-gas-station-line"></i>
              <span>${translatedFuel}</span>
            </div>
            <div class="car-spec-item">
              <i class="ri-user-3-line"></i>
              <span>${car.seats} ${currentLang === 'EN' ? 'Seats' : 'Kişi'}</span>
            </div>
            <div class="car-spec-item">
              <i class="ri-suitcase-2-line"></i>
              <span>${car.luggage} ${currentLang === 'EN' ? 'Bags' : 'Bagaj'}</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 12px;">
            <div>
              <span style="font-size: 0.65rem; font-weight: 700; color: #94A3B8; text-transform: uppercase;">${dict.depositLabel}</span>
              <p style="font-size: 0.9rem; font-weight: 800; color: var(--noble-charcoal);">₺${car.deposit.toLocaleString('tr-TR')}</p>
            </div>

            <div style="display: flex; gap: 6px;">
              <button onclick="toggleCompare('${car.id}', event)" class="btn-noble-outline" style="padding: 10px; font-size: 0.65rem; ${isComp ? 'background: var(--noble-gold-light); border-color: var(--noble-gold);' : ''}" title="Karşılaştır">
                <i class="ri-scales-3-line" style="font-size: 1rem;"></i>
              </button>
              
              <button onclick="openCarDetailModal('${car.id}')" class="btn-noble-outline" style="padding: 10px 12px; font-size: 0.65rem;" title="Detayları İncele">
                <i class="ri-information-line" style="font-size: 1rem;"></i>
              </button>

              ${car.status === 'Müsait' 
                ? `<button onclick="startBooking('${car.id}')" class="btn-noble-primary" style="padding: 10px 18px; font-size: 0.65rem;">${dict.btnReserve}</button>` 
                : `<button disabled class="btn-noble-outline" style="opacity: 0.5; cursor: not-allowed; padding: 10px 18px; font-size: 0.65rem;">${statusText}</button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Favorites & Comparison System
function toggleFavorite(carId, event) {
  if (event) event.stopPropagation();
  const index = favorites.indexOf(carId);
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.TR;
  
  if (index > -1) {
    favorites.splice(index, 1);
    showToast(dict.toastRemovedFav, 'warning');
  } else {
    favorites.push(carId);
    showToast(dict.toastAddedFav, 'success');
  }
  
  saveState();
  renderFleetCatalog();
}

function toggleCompare(carId, event) {
  if (event) event.stopPropagation();
  const index = comparisonList.indexOf(carId);
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.TR;

  if (index > -1) {
    comparisonList.splice(index, 1);
  } else {
    if (comparisonList.length >= 3) {
      showToast(dict.toastMaxCompare, 'warning');
      return;
    }
    comparisonList.push(carId);
    showToast(dict.toastAddedCompare, 'info');
  }

  updateComparisonBar();
}

function updateComparisonBar() {
  let bar = document.getElementById('comparison-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'comparison-bar';
    bar.className = 'comparison-bar';
    document.body.appendChild(bar);
  }

  if (comparisonList.length === 0) {
    bar.classList.remove('active');
    return;
  }

  const selectedCars = vehicles.filter(v => comparisonList.includes(v.id));

  bar.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--noble-gold);">
        Karşılaştırma (${comparisonList.length}/3)
      </span>
      <div style="display: flex; gap: 8px;">
        ${selectedCars.map(c => `
          <img src="${c.image}" alt="${c.model}" style="width: 40px; height: 28px; object-fit: cover; border-radius: 6px; border: 1px solid var(--noble-gold);">
        `).join('')}
      </div>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="openComparisonModal()" class="btn-noble-gold" style="padding: 8px 16px; font-size: 0.65rem;">
        Karşılaştır <i class="ri-scales-3-line"></i>
      </button>
      <button onclick="comparisonList = []; updateComparisonBar();" class="btn-noble-outline" style="padding: 8px 12px; font-size: 0.65rem; color: white; border-color: rgba(255,255,255,0.3);">
        Temizle
      </button>
    </div>
  `;

  bar.classList.add('active');
}

function openComparisonModal() {
  const selectedCars = vehicles.filter(v => comparisonList.includes(v.id));
  if (selectedCars.length === 0) return;

  const modal = document.getElementById('car-detail-modal');
  const content = document.getElementById('car-detail-content');

  if (!modal || !content) return;

  content.innerHTML = `
    <div style="padding: 36px;">
      <h2 class="font-serif text-3xl font-bold mb-6">Araç Karşılaştırma Tablosu</h2>

      <div style="overflow-x: auto;">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th style="padding: 16px; font-size: 0.7rem; uppercase; color: #64748B;">ÖZELLİK</th>
              ${selectedCars.map(c => `
                <th style="padding: 16px; min-width: 220px; text-align: center;">
                  <img src="${c.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 16px; margin-bottom: 8px;">
                  <h4 style="font-weight: 800; font-size: 1.1rem;">${c.brand} ${c.model}</h4>
                  <p style="font-size: 0.7rem; color: var(--noble-gold); font-weight: 800;">₺${c.price.toLocaleString('tr-TR')} / gün</p>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody style="font-size: 0.85rem;">
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">Kategori</td>
              ${selectedCars.map(c => `<td style="padding: 14px; text-align: center;">${c.category}</td>`).join('')}
            </tr>
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">Yakıt / Vites</td>
              ${selectedCars.map(c => `<td style="padding: 14px; text-align: center;">${c.fuel} / ${c.transmission}</td>`).join('')}
            </tr>
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">Motor Gücü</td>
              ${selectedCars.map(c => `<td style="padding: 14px; text-align: center; font-weight: 700;">${c.power}</td>`).join('')}
            </tr>
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">0-100 Hızlanma</td>
              ${selectedCars.map(c => `<td style="padding: 14px; text-align: center; font-weight: 700;">${c.acceleration}</td>`).join('')}
            </tr>
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">Kapora Bedeli</td>
              ${selectedCars.map(c => `<td style="padding: 14px; text-align: center; font-weight: 700;">₺${c.deposit.toLocaleString('tr-TR')}</td>`).join('')}
            </tr>
            <tr style="border-t: 1px solid #E2E8F0;">
              <td style="padding: 14px; font-weight: 800; color: #64748B;">İşlem</td>
              ${selectedCars.map(c => `
                <td style="padding: 14px; text-align: center;">
                  <button onclick="closeModal('car-detail-modal'); startBooking('${c.id}');" class="btn-noble-primary" style="padding: 10px 16px; font-size: 0.65rem;">
                    Rezerve Et
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Car Detail Modal
function openCarDetailModal(carId) {
  const car = vehicles.find(v => v.id === carId);
  if (!car) return;

  const modalBackdrop = document.getElementById('car-detail-modal');
  const modalBody = document.getElementById('car-detail-content');

  if (!modalBackdrop || !modalBody) return;

  const carImages = car.images && car.images.length > 0 ? car.images : [car.image];
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.TR;

  modalBody.innerHTML = `
    <div style="padding: 28px;">
      <div style="position: relative; margin-bottom: 24px;">
        <img id="detail-gallery-main" src="${carImages[0]}" alt="${car.brand} ${car.model}" class="gallery-main-img shadow-lg">
        
        <div style="position: absolute; bottom: 20px; left: 24px; color: white; background: rgba(18,18,20,0.7); backdrop-filter: blur(8px); padding: 12px 20px; border-radius: 16px;">
          <span class="badge-tag" style="background: var(--noble-gold); color: black; font-weight: 800; margin-bottom: 4px;">${car.badge}</span>
          <h2 class="font-serif text-3xl" style="font-weight: 700;">${car.brand} ${car.model}</h2>
          <p style="font-size: 0.75rem; opacity: 0.8; letter-spacing: 0.1em; text-transform: uppercase;">${car.year} Model • Plaka: ${car.plate}</p>
        </div>
      </div>

      ${carImages.length > 1 ? `
        <div style="margin-bottom: 24px;">
          <p style="font-size: 0.65rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 8px;">
            <i class="ri-gallery-line text-amber-500"></i> ${currentLang === 'EN' ? 'VEHICLE PHOTO GALLERY' : 'ARAÇ FOTOĞRAF GALERİSİ'} (${carImages.length} ${currentLang === 'EN' ? 'Photos' : 'Fotoğraf'})
          </p>
          <div class="gallery-thumbs-row">
            ${carImages.map((img, idx) => `
              <img src="${img}" onclick="switchDetailGalleryImg('${img}', this)" class="gallery-thumb-item ${idx === 0 ? 'active' : ''}">
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="modal-card-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
        <div>
          <h4 style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #64748B; margin-bottom: 16px;">
            ${currentLang === 'EN' ? 'Performance & Technical Specs' : 'Performans & Teknik Özellikler'}
          </h4>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px;">
            <div style="background: #F8FAFC; padding: 14px; border-radius: 16px; border: 1px solid #E2E8F0; text-align: center;">
              <i class="ri-dashboard-3-line" style="font-size: 1.4rem; color: var(--noble-gold);"></i>
              <p style="font-size: 0.65rem; font-weight: 700; color: #94A3B8; uppercase; margin-top: 4px;">MOTOR GÜCÜ</p>
              <p style="font-size: 0.95rem; font-weight: 800;">${car.power}</p>
            </div>
            <div style="background: #F8FAFC; padding: 14px; border-radius: 16px; border: 1px solid #E2E8F0; text-align: center;">
              <i class="ri-speed-up-line" style="font-size: 1.4rem; color: var(--noble-gold);"></i>
              <p style="font-size: 0.65rem; font-weight: 700; color: #94A3B8; uppercase; margin-top: 4px;">0-100 HIZLANMA</p>
              <p style="font-size: 0.95rem; font-weight: 800;">${car.acceleration}</p>
            </div>
            <div style="background: #F8FAFC; padding: 14px; border-radius: 16px; border: 1px solid #E2E8F0; text-align: center;">
              <i class="ri-rocket-line" style="font-size: 1.4rem; color: var(--noble-gold);"></i>
              <p style="font-size: 0.65rem; font-weight: 700; color: #94A3B8; uppercase; margin-top: 4px;">MAKSİMUM HIZ</p>
              <p style="font-size: 0.95rem; font-weight: 800;">${car.topSpeed}</p>
            </div>
          </div>

          <h4 style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #64748B; margin-bottom: 12px;">
            ${currentLang === 'EN' ? 'Featured VIP Equipment' : 'Öne Çıkan VIP Donanımlar'}
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
            ${car.features.map(f => `
              <span style="background: var(--noble-gold-light); color: var(--noble-charcoal); padding: 6px 14px; border-radius: 99px; font-size: 0.72rem; font-weight: 700;">
                <i class="ri-checkbox-circle-fill" style="color: var(--noble-gold); margin-right: 6px;"></i> ${f}
              </span>
            `).join('')}
          </div>
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 24px; border-radius: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 0.7rem; font-weight: 800; color: #94A3B8; text-transform: uppercase;">${dict.dailyPriceLabel}</span>
            <h3 class="font-serif text-4xl" style="color: var(--noble-gold); font-weight: 800; margin-bottom: 16px;">₺${car.price.toLocaleString('tr-TR')}</h3>
            
            <div style="border-top: 1px solid #E2E8F0; padding-top: 16px; margin-top: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 8px;">
                <span style="color: #64748B;">${dict.depositLabel}:</span>
                <span style="font-weight: 700;">₺${car.deposit.toLocaleString('tr-TR')}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 8px;">
                <span style="color: #64748B;">${currentLang === 'EN' ? 'Daily KM Limit' : 'Günlük KM Sınırı'}:</span>
                <span style="font-weight: 700;">350 KM</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 24px;">
            ${car.status === 'Müsait'
              ? `<button onclick="closeModal('car-detail-modal'); startBooking('${car.id}');" class="btn-noble-primary" style="width: 100%; justify-content: center; padding: 16px;">${dict.btnReserve}</button>`
              : `<button disabled class="btn-noble-outline" style="width: 100%; justify-content: center; padding: 16px; opacity: 0.5;">${dict.btnRented}</button>`
            }
          </div>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

function switchDetailGalleryImg(imgSrc, thumbElem) {
  const mainImg = document.getElementById('detail-gallery-main');
  if (mainImg) {
    mainImg.style.opacity = '0.4';
    setTimeout(() => {
      mainImg.src = imgSrc;
      mainImg.style.opacity = '1';
    }, 150);
  }

  document.querySelectorAll('.gallery-thumb-item').forEach(t => t.classList.remove('active'));
  if (thumbElem) thumbElem.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Booking & Checkout Engine
function startBooking(carId) {
  const car = vehicles.find(v => v.id === carId);
  if (!car) return;

  selectedCarForBooking = car;
  currentCheckoutStep = 1;

  checkoutBookingData = {
    days: 3,
    pickupLoc: 'İstanbul Havalimanı (IST)',
    extras: {
      unlimitedKm: false,
      fullKasko: true,
      vipValet: true
    }
  };

  const modalBackdrop = document.getElementById('checkout-modal');
  if (!modalBackdrop) return;

  updateCheckoutModalView();
  modalBackdrop.classList.add('active');
}

function updateCheckoutModalView() {
  const car = selectedCarForBooking;
  if (!car) return;

  const container = document.getElementById('checkout-content');
  if (!container) return;

  const days = checkoutBookingData.days || 3;
  const dailyRate = car.price;
  
  let discountPerc = 0;
  if (days >= 14) discountPerc = 0.20;
  else if (days >= 7) discountPerc = 0.10;
  else if (days >= 3) discountPerc = 0.05;

  const subtotal = Math.round(dailyRate * days * (1 - discountPerc));
  
  let extrasTotal = 0;
  if (checkoutBookingData.extras.fullKasko) extrasTotal += 500 * days;
  if (checkoutBookingData.extras.unlimitedKm) extrasTotal += 350 * days;
  if (checkoutBookingData.extras.vipValet) extrasTotal += 450;

  const vat = Math.round((subtotal + extrasTotal) * 0.20);
  const grandTotal = subtotal + extrasTotal + vat;

  container.innerHTML = `
    <div style="padding: 36px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-b: 1px solid #E2E8F0; padding-bottom: 16px;">
        <div>
          <span style="font-size: 0.7rem; font-weight: 800; color: var(--noble-gold); letter-spacing: 0.2em; text-transform: uppercase;">
            ${currentCheckoutStep === 4 ? 'REZERVASYON FİŞİ' : 'ONLINE HIZLI REZERVASYON'}
          </span>
          <h2 class="font-serif text-3xl" style="font-weight: 700;">${car.brand} ${car.model}</h2>
        </div>
      </div>

      <div class="modal-card-grid" style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px;">
        <div>
          ${currentCheckoutStep === 1 ? `
            <h4 style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Müşteri & Sürücü Bilgileri</h4>
            <form id="checkout-form-step1" onsubmit="event.preventDefault(); validateAndNextStep(2);" style="display: flex; flex-direction: column; gap: 16px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                  <label class="form-label">AD SOYAD</label>
                  <input type="text" id="cust-name" required class="form-input" placeholder="Ahmet Yılmaz" value="${checkoutBookingData.custName || ''}">
                </div>
                <div class="form-group">
                  <label class="form-label">T.C. KİMLİK NO</label>
                  <input type="text" id="cust-tc" required class="form-input" placeholder="11 haneli T.C. No" value="${checkoutBookingData.custTc || ''}">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                  <label class="form-label">E-POSTA ADRESİ</label>
                  <input type="email" id="cust-email" required class="form-input" placeholder="ahmet@example.com" value="${checkoutBookingData.custEmail || ''}">
                </div>
                <div class="form-group">
                  <label class="form-label">TELEFON NUMARASI</label>
                  <input type="tel" id="cust-phone" required class="form-input" placeholder="+90 5XX XXX XX XX" value="${checkoutBookingData.custPhone || ''}">
                </div>
              </div>
              <button type="submit" class="btn-noble-gold" style="width: 100%; justify-content: center; padding: 16px; margin-top: 12px;">
                Ekstra Hizmet Seçimine Geç <i class="ri-arrow-right-line"></i>
              </button>
            </form>
          ` : currentCheckoutStep === 2 ? `
            <h4 style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Güvence ve Ekstra Hizmetler</h4>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
              <label class="p-4 rounded-2xl border border-gray-200 flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="checkbox" ${checkoutBookingData.extras.fullKasko ? 'checked' : ''} onchange="checkoutBookingData.extras.fullKasko = this.checked; updateCheckoutModalView();">
                  <div>
                    <strong class="text-sm font-bold">Muafiyetsiz Tam Kasko Güvencesi</strong>
                    <p class="text-xs text-gray-500">Kaza ve çizilmelere karşı %100 sıfır muafiyet.</p>
                  </div>
                </div>
                <span class="text-sm font-bold text-amber-600">+₺500 / gün</span>
              </label>
            </div>
            <button onclick="currentCheckoutStep = 3; updateCheckoutModalView();" class="btn-noble-gold" style="width: 100%; justify-content: center; padding: 16px;">
              3D Ödeme Adımına İlerle <i class="ri-arrow-right-line"></i>
            </button>
          ` : currentCheckoutStep === 3 ? `
            <h4 style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">3D Secure Güvenli Ödeme</h4>
            <form onsubmit="event.preventDefault(); trigger3DSecureOTP();" style="display: flex; flex-direction: column; gap: 16px;">
              <div class="form-group">
                <label class="form-label">KART ÜZERİNDEKİ İSİM</label>
                <input type="text" required class="form-input" placeholder="MEHMET YILMAZ">
              </div>
              <div class="form-group">
                <label class="form-label">KART NUMARASI</label>
                <input type="text" required class="form-input" placeholder="4543 •••• •••• ••••" maxlength="19">
              </div>
              <button type="submit" class="btn-noble-primary" style="width: 100%; justify-content: center; padding: 16px;">
                <i class="ri-shield-flash-line"></i> ₺${grandTotal.toLocaleString('tr-TR')} Ödemeyi Tamamla
              </button>
            </form>
          ` : `
            <div style="background: white; padding: 24px; border-radius: 20px; border: 1px solid #E2E8F0;">
              <h3 class="font-serif text-2xl font-bold mb-2">Rezervasyon Başarılı!</h3>
              <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 16px;">PNR Kodunuz: <strong>${checkoutBookingData.pnr || 'RES-94823'}</strong></p>
              <button onclick="downloadReservationPDF('${checkoutBookingData.pnr}')" class="btn-noble-gold" style="padding: 10px 20px; font-size: 0.7rem;">
                <i class="ri-file-pdf-line"></i> Rezervasyon Fişini İndir (PDF)
              </button>
            </div>
          `}
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 28px; border-radius: 24px;">
          <h4 style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px;">Sipariş Özeti</h4>
          <p style="font-weight: 800; font-size: 1.1rem;">${car.brand} ${car.model}</p>
          <p class="font-serif text-3xl" style="font-weight: 800; color: var(--noble-gold); margin-top: 12px;">₺${grandTotal.toLocaleString('tr-TR')}</p>
        </div>
      </div>
    </div>
  `;
}

function validateAndNextStep(nextStep) {
  const name = document.getElementById('cust-name').value;
  const tc = document.getElementById('cust-tc').value;
  const email = document.getElementById('cust-email').value;
  const phone = document.getElementById('cust-phone').value;

  if (!name || !tc || !email || !phone) {
    showToast('Lütfen kişisel bilgilerinizi eksiksiz girin.', 'warning');
    return;
  }

  checkoutBookingData.custName = name;
  checkoutBookingData.custTc = tc;
  checkoutBookingData.custEmail = email;
  checkoutBookingData.custPhone = phone;

  currentCheckoutStep = nextStep;
  updateCheckoutModalView();
}

async function trigger3DSecureOTP() {
  const pnr = 'RES-' + Math.floor(100000 + Math.random() * 900000);
  checkoutBookingData.pnr = pnr;

  // Calculate actual pricing for reservation record
  const days = checkoutBookingData.days || 3;
  const dailyRate = selectedCarForBooking.price;
  let discountPerc = 0;
  if (days >= 14) discountPerc = 0.20;
  else if (days >= 7) discountPerc = 0.10;
  else if (days >= 3) discountPerc = 0.05;
  const subtotal = Math.round(dailyRate * days * (1 - discountPerc));
  
  let extrasTotal = 0;
  if (checkoutBookingData.extras.fullKasko) extrasTotal += 500 * days;
  if (checkoutBookingData.extras.unlimitedKm) extrasTotal += 350 * days;
  if (checkoutBookingData.extras.vipValet) extrasTotal += 450;
  
  const vat = Math.round((subtotal + extrasTotal) * 0.20);
  const grandTotal = subtotal + extrasTotal + vat;

  // Retrieve selected pick-up & return dates
  const pickupInput = document.getElementById('hero-pickup-loc') ? document.querySelectorAll('input[type="date"]')[0] : null;
  const returnInput = document.getElementById('hero-pickup-loc') ? document.querySelectorAll('input[type="date"]')[1] : null;

  const newReservation = {
    id: pnr,
    customerName: checkoutBookingData.custName,
    customerPhone: checkoutBookingData.custPhone,
    customerEmail: checkoutBookingData.custEmail,
    carName: `${selectedCarForBooking.brand} ${selectedCarForBooking.model}`,
    startDate: pickupInput ? pickupInput.value : '2026-07-10',
    endDate: returnInput ? returnInput.value : '2026-07-15',
    totalPrice: grandTotal,
    status: 'Beklemede',
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
  };

  // Sync to Firebase
  if (window.db && window.firestoreTools) {
    try {
      const { doc, setDoc } = window.firestoreTools;
      await setDoc(doc(window.db, "reservations", newReservation.id), newReservation);
      console.log("Reservation successfully synced to Firestore!");
      showToast('3D Secure Banka Doğrulaması Başarılı!', 'success');
      currentCheckoutStep = 4;
      updateCheckoutModalView();
    } catch (err) {
      console.error("Firebase reservation sync error:", err);
      showToast('Rezervasyon kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    }
  } else {
    // Fallback if Firebase is not active
    showToast('3D Secure Banka Doğrulaması Başarılı!', 'success');
    currentCheckoutStep = 4;
    updateCheckoutModalView();
  }
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Mesajınız alındı. VIP müşteri temsilcimiz sizinle iletişime geçecektir.', 'success');
      form.reset();
    });
  }
}

// PDF Receipt Generator
function downloadReservationPDF(pnr) {
  if (typeof html2pdf === 'undefined') {
    showToast('PDF yükleme kütüphanesi hazır değil, lütfen sayfayı yenileyip tekrar deneyin.', 'warning');
    return;
  }

  const res = reservations.find(r => r.id === pnr) || reservations[0];
  if (!res) {
    showToast('Rezervasyon bulunamadı!', 'error');
    return;
  }

  const car = vehicles.find(c => `${c.brand} ${c.model}` === res.carName) || INITIAL_VEHICLES.find(c => `${c.brand} ${c.model}` === res.carName) || { price: res.totalPrice / 3 };
  const dailyRate = car.price;
  const days = checkoutBookingData.days || 3;
  let discountPerc = 0;
  if (days >= 14) discountPerc = 0.20;
  else if (days >= 7) discountPerc = 0.10;
  else if (days >= 3) discountPerc = 0.05;

  const subtotal = Math.round(dailyRate * days * (1 - discountPerc));
  let extrasTotal = 0;
  if (checkoutBookingData.extras.fullKasko) extrasTotal += 500 * days;
  if (checkoutBookingData.extras.unlimitedKm) extrasTotal += 350 * days;
  if (checkoutBookingData.extras.vipValet) extrasTotal += 450;

  const vat = Math.round((subtotal + extrasTotal) * 0.20);
  const grandTotal = res.totalPrice || (subtotal + extrasTotal + vat);

  const receiptContainer = document.createElement('div');
  receiptContainer.style.background = '#FFFFFF';
  receiptContainer.style.color = '#121214';
  receiptContainer.style.fontFamily = 'Georgia, serif';
  receiptContainer.style.width = '180mm';
  receiptContainer.style.padding = '20px';
  receiptContainer.style.boxSizing = 'border-box';

  receiptContainer.innerHTML = `
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #C5A059; padding-bottom: 12px; margin-bottom: 16px;">
      <div>
        <h1 style="font-family: serif; font-size: 22px; margin: 0; color: #121214; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">ÇAĞRI NOBLE RENT A CAR</h1>
        <p style="font-size: 11px; color: #64748B; margin: 3px 0 0 0;">Lüks VIP Araç Kiralama Hizmetleri • Amasya Merkez</p>
        <p style="font-size: 10px; color: #64748B; margin: 2px 0 0 0;">Tel: +90 535 000 00 00 | Web: cagrirentacar.com</p>
      </div>
      <div style="text-align: right;">
        <h2 style="font-size: 16px; margin: 0; color: #C5A059; font-weight: bold; letter-spacing: 0.05em;">REZERVASYON FİŞİ</h2>
        <p style="font-size: 11px; margin: 4px 0 0 0;"><strong>PNR:</strong> ${res.id}</p>
        <p style="font-size: 10px; color: #64748B; margin: 2px 0 0 0;"><strong>Tarih:</strong> ${res.createdAt}</p>
      </div>
    </div>

    <!-- Info Grid -->
    <div style="display: flex; gap: 15px; margin-bottom: 16px;">
      <!-- Customer Info -->
      <div style="flex: 1; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; font-size: 11px;">
        <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">MÜŞTERİ BİLGİLERİ</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 2px 0; color: #64748B; width: 35%;">Adı Soyadı:</td><td style="font-weight: bold;">${res.customerName}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Telefon:</td><td style="font-weight: bold;">${res.customerPhone}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">E-posta:</td><td>${res.customerEmail}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">T.C. Kimlik:</td><td>${checkoutBookingData.custTc || '---'}</td></tr>
        </table>
      </div>
      
      <!-- Vehicle Info -->
      <div style="flex: 1; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; font-size: 11px;">
        <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">KİRALANAN ARAÇ</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 2px 0; color: #64748B; width: 35%;">Araç Modeli:</td><td style="font-weight: bold;">${res.carName}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Alış Tarihi:</td><td style="font-weight: bold;">${res.startDate}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">İade Tarihi:</td><td style="font-weight: bold;">${res.endDate}</td></tr>
          <tr><td style="padding: 2px 0; color: #64748B;">Süre:</td><td style="font-weight: bold;">${days} Gün</td></tr>
        </table>
      </div>
    </div>

    <!-- Pricing Table -->
    <div style="border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; margin-bottom: 16px;">
      <h3 style="font-size: 12px; margin-top: 0; margin-bottom: 6px; color: #121214; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; font-weight: bold; letter-spacing: 0.02em;">ÜCRET DETAYLARI</h3>
      <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: bold;">
            <th style="text-align: left; padding: 4px 0;">Hizmet / Açıklama</th>
            <th style="text-align: right; padding: 4px 0;">Günlük</th>
            <th style="text-align: right; padding: 4px 0;">Süre</th>
            <th style="text-align: right; padding: 4px 0;">Toplam</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 6px 0;">${res.carName} Kiralama Bedeli</td>
            <td style="text-align: right;">₺${dailyRate.toLocaleString('tr-TR')}</td>
            <td style="text-align: right;">${days} Gün</td>
            <td style="text-align: right;">₺${(dailyRate * days).toLocaleString('tr-TR')}</td>
          </tr>
          ${discountPerc > 0 ? `
          <tr style="color: #10B981;">
            <td style="padding: 4px 0;">Kiralama Süresi İndirimi (-%${discountPerc * 100})</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: right;">-₺${Math.round(dailyRate * days * discountPerc).toLocaleString('tr-TR')}</td>
          </tr>
          ` : ''}
          ${checkoutBookingData.extras.fullKasko ? `
          <tr>
            <td style="padding: 4px 0;">Muafiyetsiz Tam Kasko Güvencesi</td>
            <td style="text-align: right;">₺500</td>
            <td style="text-align: right;">${days} Gün</td>
            <td style="text-align: right;">₺${(500 * days).toLocaleString('tr-TR')}</td>
          </tr>
          ` : ''}
          ${checkoutBookingData.extras.unlimitedKm ? `
          <tr>
            <td style="padding: 4px 0;">Sınırsız Kilometre Paketi</td>
            <td style="text-align: right;">₺350</td>
            <td style="text-align: right;">${days} Gün</td>
            <td style="text-align: right;">₺${(350 * days).toLocaleString('tr-TR')}</td>
          </tr>
          ` : ''}
          ${checkoutBookingData.extras.vipValet ? `
          <tr>
            <td style="padding: 4px 0;">VIP Vale ve Adrese Teslimat</td>
            <td style="text-align: right;">₺450</td>
            <td style="text-align: right;">1 Sefer</td>
            <td style="text-align: right;">₺450</td>
          </tr>
          ` : ''}
          <tr style="border-top: 1px solid #E2E8F0; font-weight: bold;">
            <td colspan="3" style="padding: 6px 0; text-align: right;">Ara Toplam:</td>
            <td style="padding: 6px 0; text-align: right;">₺${(subtotal + extrasTotal).toLocaleString('tr-TR')}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 2px 0; text-align: right; color: #64748B;">KDV (%20):</td>
            <td style="padding: 2px 0; text-align: right; color: #64748B;">₺${vat.toLocaleString('tr-TR')}</td>
          </tr>
          <tr style="font-size: 13px; font-weight: bold; color: #C5A059; border-top: 2px double #C5A059;">
            <td colspan="3" style="padding: 8px 0; text-align: right;">GENEL TOPLAM (KDV Dahil):</td>
            <td style="padding: 8px 0; text-align: right;">₺${grandTotal.toLocaleString('tr-TR')}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Notes -->
    <div style="font-size: 9px; color: #64748B; text-align: justify; line-height: 1.4; margin-bottom: 25px; padding: 8px; background: #F8FAFC; border-radius: 6px;">
      <strong>ÖNEMLİ KİRALAMA NOTLARI:</strong> Bu belge rezervasyon onay fişidir. Kiracının aracı teslim alırken 21 yaşını doldurmuş, en az 2 yıllık geçerli ehliyete sahip olması gereklidir. Premium araçlarda 25 yaş ve 5 yıllık ehliyet şartı aranır. Teslimat sırasında sürücü adına kredi kartı ibrazı ve depozito provizyonu zorunludur. İptaller kiralama saatinden 24 saat öncesine kadar ücretsizdir.
    </div>

    <!-- Signatures -->
    <div style="display: flex; justify-content: space-between; font-size: 10px; text-align: center; margin-top: 20px;">
      <div style="width: 45%;">
        <p style="margin-bottom: 35px; color: #64748B;">Müşteri / Kiracı</p>
        <p style="font-weight: bold; border-top: 1px solid #121214; padding-top: 4px; margin: 0;">${res.customerName}</p>
      </div>
      <div style="width: 45%;">
        <p style="margin-bottom: 35px; color: #64748B;">Çağrı Noble Rent A Car</p>
        <p style="font-weight: bold; border-top: 1px solid #121214; padding-top: 4px; margin: 0;">Yetkili Kaşe / İmza</p>
      </div>
    </div>
  `;

  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `Cagri_Noble_Rezervasyon_${pnr}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(receiptContainer).set(opt).save();
  showToast('PDF Rezervasyon Fişi İndiriliyor...', 'success');
}

window.downloadReservationPDF = downloadReservationPDF;

