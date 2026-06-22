import './style/tokens.css';
import './style/base.css';
import './style/layout.css';
import './style/components.css';
import './style/sections.css';
import { initMultiScenes } from './three-scenes.js';

// ─── i18n ───
const translations = {
  vi: {
    navFeatures: 'Tính năng',
    navModels: 'Mô hình AI',
    navPricing: 'Bảng giá',
    navDemo: 'Demo',
    navCta: 'Dùng thử',
    heroEyebrow: 'Trợ lý AI thế hệ mới',
    heroTitle1: 'Sức mạnh AI,',
    heroTitleEm: 'trí tuệ Việt Nam',
    heroSubtitle: 'Nền tảng AI đa mô hình thông minh nhất — kết hợp Gemini, Llama và GPT để mang đến câu trả lời chính xác, nhanh chóng.',
    heroBtnPrimary: 'Bắt đầu miễn phí',
    heroBtnSecondary: 'Xem demo',
    stat1Value: '10+',
    stat1Label: 'Mô hình AI',
    stat2Value: '3',
    stat2Label: 'Chế độ thông minh',
    stat3Value: '24/7',
    stat3Label: 'Luôn sẵn sàng',
    stat4Value: '∞',
    stat4Label: 'Khả năng',
    featuresLabel: 'Tính năng',
    featuresTitle: 'Mọi thứ bạn cần, trong một nền tảng',
    featuresDesc: 'Neo AI không chỉ là chatbot — đó là hệ sinh thái AI hoàn chỉnh cho mọi nhu cầu.',
    feat1Title: 'Đa mô hình AI',
    feat1Desc: 'Chuyển đổi linh hoạt giữa Gemini, Llama, GPT và nhiều mô hình khác. Mỗi câu hỏi được xử lý bởi mô hình phù hợp nhất.',
    feat2Title: '3 chế độ thông minh',
    feat2Desc: 'Basic cho câu hỏi nhanh, Pro cho phân tích chuyên sâu, Expert với 3-Tier Engine mạnh nhất cho kết quả tối ưu.',
    feat3Title: 'Tìm kiếm thời gian thực',
    feat3Desc: 'Kết hợp dữ liệu web mới nhất với tri thức AI, mang đến câu trả lời luôn cập nhật và chính xác.',
    feat4Title: 'Nhận diện hình ảnh',
    feat4Desc: 'Upload ảnh và nhận phân tích chi tiết. Hỗ trợ mô hình Vision AI tiên tiến nhất.',
    feat5Title: 'Giao diện Việt hóa',
    feat5Desc: 'Thiết kế hoàn toàn bằng tiếng Việt, tối ưu cho người dùng Việt Nam với trải nghiệm mượt mà.',
    feat6Title: 'Bảo mật & Riêng tư',
    feat6Desc: 'Dữ liệu được mã hóa, lịch sử chat an toàn, không chia sẻ với bên thứ ba.',
    modelsLabel: 'Mô hình AI',
    modelsTitle: 'Hệ sinh thái đa mô hình',
    modelsDesc: 'Truy cập các mô hình AI hàng đầu thế giới trong một nền tảng duy nhất.',
    demoLabel: 'Trải nghiệm',
    demoTitle: 'Xem Neo AI hoạt động',
    demoDesc: 'Giao diện trực quan, phản hồi tức thì, hỗ trợ đa ngôn ngữ.',
    pricingLabel: 'Bảng giá',
    pricingTitle: 'Chọn gói phù hợp',
    pricingDesc: 'Bắt đầu miễn phí, nâng cấp khi cần.',
    priceFree: 'Miễn phí',
    priceFreeName: 'Basic',
    priceFreeDesc: 'Hoàn hảo để bắt đầu khám phá AI',
    priceFreeBtn: 'Bắt đầu ngay',
    priceProName: 'Pro',
    priceProPrice: '99K',
    priceProUnit: '/tháng',
    priceProDesc: 'Cho người dùng chuyên nghiệp',
    priceProBtn: 'Nâng cấp Pro',
    priceExpertName: 'Expert',
    priceExpertPrice: '199K',
    priceExpertUnit: '/tháng',
    priceExpertDesc: 'Sức mạnh AI tối đa, không giới hạn',
    priceExpertBtn: 'Nâng cấp Expert',
    priceExpertBadge: 'Phổ biến nhất',
    priceFeat1: 'Gemini Flash & Llama 8B',
    priceFeat2: 'Giới hạn 50 tin/ngày',
    priceFeat3: 'Lịch sử chat cơ bản',
    proFeat1: 'Tất cả mô hình Pro',
    proFeat2: '500 tin nhắn/ngày',
    proFeat3: 'Tìm kiếm thời gian thực',
    proFeat4: 'Vision AI',
    expertFeat1: 'Tất cả mô hình + Expert',
    expertFeat2: 'Không giới hạn tin nhắn',
    expertFeat3: '3-Tier Engine',
    expertFeat4: 'API access',
    expertFeat5: 'Hỗ trợ ưu tiên',
    aboutLabel: 'Về chúng tôi',
    aboutTitle: 'CÔNG TY TNHH ĐẦU TƯ & KINH DOANH TRUNG VIỆT',
    aboutCeoLabel: 'Giám đốc (CEO)',
    aboutCeoName: 'Đỗ Văn Trung',
    aboutAddressLabel: 'Trụ sở chính',
    aboutAddress: 'Số nhà 9 - Tổ 8 - Khu 1, Phường Trần Hưng Đạo, Thành Phố Hạ Long, Tỉnh Quảng Ninh, Việt Nam.',
    aboutMissionLabel: 'Sứ mệnh',
    aboutMission: 'Mang trí tuệ nhân tạo tiên tiến nhất đến với mọi cá nhân và doanh nghiệp Việt Nam.',
    demoClickToPlay: 'Bấm để tương tác trực tiếp',
    ctaTitle: 'Sẵn sàng trải nghiệm AI?',
    ctaDesc: 'Tham gia cùng hàng nghìn người dùng Việt Nam đang sử dụng Neo AI mỗi ngày.',
    ctaBtn: 'Dùng thử Neo AI miễn phí',
    footerDesc: 'Nền tảng AI đa mô hình, thiết kế cho người Việt.',
    footerProduct: 'Sản phẩm',
    footerCompany: 'Về chúng tôi',
    footerSupport: 'Hỗ trợ',
    footerCopy: '© 2025 Neo AI. Mọi quyền được bảo lưu.',
    footerMadeWith: 'Được tạo với ❤️ tại Việt Nam'
  },
  en: {
    navFeatures: 'Features',
    navModels: 'AI Models',
    navPricing: 'Pricing',
    navDemo: 'Demo',
    navCta: 'Try Now',
    heroEyebrow: 'Next-gen AI Assistant',
    heroTitle1: 'AI Power,',
    heroTitleEm: 'Vietnamese Intelligence',
    heroSubtitle: 'The smartest multi-model AI platform — combining Gemini, Llama and GPT for precise, fast answers.',
    heroBtnPrimary: 'Get Started Free',
    heroBtnSecondary: 'Watch Demo',
    stat1Value: '10+',
    stat1Label: 'AI Models',
    stat2Value: '3',
    stat2Label: 'Smart Modes',
    stat3Value: '24/7',
    stat3Label: 'Always Ready',
    stat4Value: '∞',
    stat4Label: 'Possibilities',
    featuresLabel: 'Features',
    featuresTitle: 'Everything you need, one platform',
    featuresDesc: 'Neo AI is more than a chatbot — it\'s a complete AI ecosystem for every need.',
    feat1Title: 'Multi-Model AI',
    feat1Desc: 'Switch seamlessly between Gemini, Llama, GPT and more. Each query is handled by the best-fit model.',
    feat2Title: '3 Smart Modes',
    feat2Desc: 'Basic for quick answers, Pro for deep analysis, Expert with 3-Tier Engine for optimal results.',
    feat3Title: 'Real-time Search',
    feat3Desc: 'Combines the latest web data with AI knowledge for always up-to-date, accurate answers.',
    feat4Title: 'Image Recognition',
    feat4Desc: 'Upload images for detailed analysis. Powered by the most advanced Vision AI models.',
    feat5Title: 'Vietnamese-first UI',
    feat5Desc: 'Designed entirely in Vietnamese, optimized for Vietnamese users with a smooth experience.',
    feat6Title: 'Security & Privacy',
    feat6Desc: 'Encrypted data, secure chat history, no sharing with third parties.',
    modelsLabel: 'AI Models',
    modelsTitle: 'Multi-Model Ecosystem',
    modelsDesc: 'Access the world\'s top AI models in a single platform.',
    demoLabel: 'Experience',
    demoTitle: 'See Neo AI in Action',
    demoDesc: 'Intuitive interface, instant responses, multi-language support.',
    pricingLabel: 'Pricing',
    pricingTitle: 'Choose Your Plan',
    pricingDesc: 'Start free, upgrade when you need.',
    priceFree: 'Free',
    priceFreeName: 'Basic',
    priceFreeDesc: 'Perfect to start exploring AI',
    priceFreeBtn: 'Get Started',
    priceProName: 'Pro',
    priceProPrice: '99K',
    priceProUnit: '/month',
    priceProDesc: 'For professional users',
    priceProBtn: 'Upgrade to Pro',
    priceExpertName: 'Expert',
    priceExpertPrice: '199K',
    priceExpertUnit: '/month',
    priceExpertDesc: 'Maximum AI power, unlimited',
    priceExpertBtn: 'Upgrade to Expert',
    priceExpertBadge: 'Most Popular',
    priceFeat1: 'Gemini Flash & Llama 8B',
    priceFeat2: 'Limited 50 msgs/day',
    priceFeat3: 'Basic chat history',
    proFeat1: 'All Pro models',
    proFeat2: '500 messages/day',
    proFeat3: 'Real-time search',
    proFeat4: 'Vision AI',
    expertFeat1: 'All models + Expert',
    expertFeat2: 'Unlimited messages',
    expertFeat3: '3-Tier Engine',
    expertFeat4: 'API access',
    expertFeat5: 'Priority support',
    aboutLabel: 'About Us',
    aboutTitle: 'TRUNG VIET INVESTMENT & BUSINESS CO., LTD',
    aboutCeoLabel: 'CEO',
    aboutCeoName: 'Do Van Trung',
    aboutAddressLabel: 'Headquarters',
    aboutAddress: 'No. 9 - Group 8 - Zone 1, Tran Hung Dao Ward, Ha Long City, Quang Ninh Province, Vietnam.',
    aboutMissionLabel: 'Mission',
    aboutMission: 'Bringing the most advanced artificial intelligence to every individual and business in Vietnam.',
    demoClickToPlay: 'Click to interact live',
    ctaTitle: 'Ready to experience AI?',
    ctaDesc: 'Join thousands of Vietnamese users using Neo AI every day.',
    ctaBtn: 'Try Neo AI for Free',
    footerDesc: 'Multi-model AI platform, designed for Vietnam.',
    footerProduct: 'Product',
    footerCompany: 'Company',
    footerSupport: 'Support',
    footerCopy: '© 2025 Neo AI. All rights reserved.',
    footerMadeWith: 'Made with ❤️ in Vietnam'
  }
};

let currentLang = localStorage.getItem('neo-lang') || 'vi';

function t(key) {
  return translations[currentLang]?.[key] || translations.vi[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('neo-lang', lang);
  document.documentElement.lang = lang;
  
  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  
  // Update lang toggle
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ─── Scroll Reveal ───
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Nav Scroll Effect ───
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─── Interactive Demo ───
function initInteractiveDemo() {
  const windowEl = document.getElementById('demo-window');
  const overlay = document.getElementById('demo-overlay');
  
  if (!windowEl || !overlay) return;

  overlay.addEventListener('click', () => {
    windowEl.classList.add('active');
  });
}

// ─── Smooth Scroll for Anchor Links ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        document.querySelector('.mobile-menu')?.classList.remove('open');
        document.querySelector('.nav__burger')?.classList.remove('open');
      }
    });
  });
}

// ─── Mobile Menu ───
function initMobileMenu() {
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// ─── Counter Animation ───
function initCounterAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalStr = el.dataset.value;
        const finalNum = parseInt(finalStr.replace(/[^0-9]/g, ''), 10);
        const suffix = finalStr.replace(/[0-9]/g, '');
        
        if (!isNaN(finalNum)) {
          let currentNum = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = Math.ceil(finalNum / steps);
          
          const interval = setInterval(() => {
            currentNum += increment;
            if (currentNum >= finalNum) {
              currentNum = finalNum;
              clearInterval(interval);
            }
            el.textContent = currentNum + suffix;
          }, stepTime);
        } else {
          el.textContent = finalStr;
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-value]').forEach(el => {
    const finalStr = el.dataset.value;
    const finalNum = parseInt(finalStr.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(finalNum)) {
      const suffix = finalStr.replace(/[0-9]/g, '');
      el.textContent = '0' + suffix;
    }
    observer.observe(el);
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  initNavScroll();
  initSmoothScroll();
  initInteractiveDemo();
  initMobileMenu();
  initMultiScenes();
  initScrollReveal();
  initCounterAnimation();

  // Language toggle
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
