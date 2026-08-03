/* ==========================================================================
   YAKIN GRUP — SINGLE PAGE APP JS
   ========================================================================== */

// ── Language ──────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('yakin_lang') ||
  (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en');

const TRANSLATIONS = {
  tr: {
    nav_about: 'Kurumsal', nav_construction: 'İnşaat', nav_energy: 'Enerji',
    nav_capital: 'Capital', nav_technology: 'Teknoloji', nav_contact: 'İletişim',
    nav_construction_short: 'İnşaat', nav_energy_short: 'Enerji',
    nav_capital_short: 'Capital', nav_technology_short: 'Teknoloji',
    tag_construction: 'İNŞAAT & TAAHHÜT', tag_energy: 'ENERJİ & ALTYAPI SİSTEMLERİ',
    tag_capital: 'FİNANS & YATIRIM', tag_technology: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    tag_group: 'YAKIN GRUP HOLDİNG', tag_about: 'KURUMSAL GÜVEN',
    tag_portfolio: 'PROJELERİMİZ', tag_partners: 'MÜHENDİSLİK PAYDAŞLARI',
    tag_store: 'ONLINE SATIŞ & PORTAL', tag_digital: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'KÜME A', cluster_b_label: 'KÜME B',
    cluster_a_title: 'Yenilenebilir Enerji, Depolama & Mekanik Altyapı Sistemleri',
    cluster_b_title: 'Bilgi Sistemleri, Network, Elektrik & Siber Güvenlik',
    hero_badge1: 'İNŞAAT & TAAHHÜT', hero_badge2: 'YENİLENEBİLİR ENERJİ',
    hero_badge3: 'FİNANS & YATIRIM', hero_badge4: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    hero_title1: 'Geleceğin Güçlü Altyapıları',
    hero_title2: 'Sürdürülebilir Enerji Çözümleri',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Teknoloji',
    hero_desc1: 'Veri merkezleri, endüstriyel tesisler ve ağır mühendislik taahhüt projelerinde küresel standartlar.',
    hero_desc2: 'Güneş, rüzgar, akıllı bina otomasyonu ve ileri düzey siber güvenlik altyapı mühendisliği.',
    hero_desc3: 'Proje finansmanı danışmanlığı, yapılandırma ve yatırım çözümleri platformu.',
    hero_desc4: 'Dijital hakediş, yapay zekâ, BIM entegrasyonu ve ileri seviye proje yönetim platformu.',
    btn_explore: 'Keşfet', btn_view_details: 'Detaylı İncele',
    btn_vcard_download: 'Kartviziti İndir (.vcf)', btn_vcard_share: 'Paylaş',
    btn_market_register: 'Bekleme Listesine Katıl', btn_market_browse: 'Kataloğu İncele',
    btn_market_join: 'Beni Listeye Ekle', btn_send: 'Mesajı Gönder',
    btn_presentation_tr: 'Yatırımcı Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Mühendislik ve Enerjide Güç Birliği',
    group_lead: 'Çok disiplinli bir proje geliştirme grubu olarak inşaattan finansmana uçtan uca çözümler sunuyoruz.',
    group_body: 'Yakın Grup; inşaat taahhüt, yenilenebilir enerji, proje finansmanı ve dijital teknoloji alanlarında faaliyet gösteren multidisipliner mühendislik şirketleridir. Endüstriyel vizyonumuz ve teknik tecrübemiz ile yapı ve enerji sektöründe sınırları çiziyoruz.',
    stat_years: 'Yıllık Tecrübe', stat_area: 'm² İnşaat Alanı',
    stat_mw: 'MW Kurulu Güç', stat_companies: 'Grup Şirketi',
    stat_mw_full: 'MW Toplam Kurulu Güç', stat_co2: 'Ton CO₂ Azaltımı',
    stat_scada: 'Akıllı SCADA İzleme', stat_services: 'Mühendislik Branşı',
    fb_title: 'ISO Sertifikalı', fb_sub: 'Uluslararası Standartlar',
    c_title: 'Yakın İnşaat',
    c_desc: 'Veri merkezlerinden konut ve sanayi yapılarına kadar her projede üstün kalite, dayanıklılık ve sürdürülebilir yöntemler.',
    c_services_title: 'Endüstriyel İnşaat Çözümlerimiz',
    c_s1_title: 'Veri Merkezi İnşaatı', c_s1_desc: 'Tier III ve Tier IV sertifikalı, yüksek güvenilirlikli mission-critical veri merkezleri.',
    c_s2_title: 'Ağır Sanayi Tesisleri', c_s2_desc: 'Fabrikalar, dökümhaneler ve enerji üretim santrallerinde anahtar teslim taahhüt.',
    c_s3_title: 'Konut & Yaşam Projeleri', c_s3_desc: 'Modern mimari ve ileri mühendislikle tasarlanan lüks yaşam kompleksleri.',
    c_s4_title: 'Yapı Mühendisliği & BIM', c_s4_desc: 'İleri seviye deprem mühendisliği, BIM entegrasyonu ve teknik projelendirme.',
    c_s5_title: 'Havalimanı & Ulaşım', c_s5_desc: 'Uluslararası standartlarda havalimanı terminalleri ve ulaşım altyapısı.',
    c_s6_title: 'Kentsel Dönüşüm', c_s6_desc: 'Riskli yapıların tespiti, güçlendirilmesi ve dönüşüm projelerinde uçtan uca yönetim.',
    btn_service_details: 'Detaylar & vCard İrtibat ›',
    portfolio_title: 'Seçkin Proje Galerisi',
    c_gal1_title: 'T-3 Veri Merkezi Yapımı', c_gal2_title: 'Uluslararası Havalimanı Terminali',
    c_gal3_title: 'Vadi Konakları Yaşam Kompleksi', c_gal4_title: 'Yapı Güçlendirme & BIM Tasarımı',
    e_title: 'Yakın Enerji — Enerji & Altyapı Sistemleri',
    e_desc: 'Huawei, ABB, Vertiv, Siemens gibi küresel markalar ile iş birliği içinde yüksek verimliliğe odaklanıyoruz.',
    cap_desc: 'Yakın Capital, grubumuzun projelerini uçtan uca geliştiren, finansman çözümleri üreten bir danışmanlık ve yatırım platformudur.',
    cap_heading: 'Çok Disiplinli Finansman Yapılandırması',
    cap_body: 'Projelerin finansmanını organize etmek, riskleri yönetmek ve sürdürülebilir nakit akış modelleri oluşturmak temel vizyonumuzdur.',
    cap_legal: '* Yakın Capital, lisans gerektiren portföy yönetimi veya finansal aracılık faaliyetleri yürütmez.',
    tech_desc: 'Ağır sanayi, enerji ve altyapı projelerini ileri teknoloji ile uçtan uca dijitalleştiriyoruz.',
    tech_heading: 'Geleceğin Proje Yönetimi',
    tech_sub: 'Yakın Platform ile tüm mühendislik, satınalma ve saha koordinasyonunu tek ekrana taşıyoruz.',
    partners_title: 'Teknoloji İş Ortaklarımız',
    partners_subtitle: 'Dünya devleri ile uluslararası standartlarda sistem entegrasyonu sağlıyoruz.',
    market_heading: 'Yakın Grup Online Marketplace',
    market_sub: 'Endüstriyel ekipman tedariki ve enerji & bilgi teknolojileri ürünlerine erişimde hızlı dijital altyapı.',
    badge_soon: 'ÇOK YAKINDA',
    contact_title: 'Bizimle İletişime Geçin',
    contact_desc: 'Projeleriniz veya danışmanlık ihtiyaçlarınız için ekibimiz 7/24 hazırdır.',
    contact_lbl_loc: 'Merkez Ofis', contact_lbl_phone: 'Telefon', contact_lbl_mail: 'E-posta',
    vcard_list_title: 'Kurumsal İrtibat Noktaları',
    contact_form_title: 'Haberleşme Formu',
    lbl_form_name: 'Adınız Soyadınız / Firma', lbl_form_email: 'E-posta Adresiniz',
    lbl_form_phone: 'Telefon Numaranız', lbl_form_sector: 'İlgili Birim / Sektör',
    lbl_form_msg: 'Mesajınız', lbl_form_type: 'Müşteri Türü',
    btn_presentation_tr: 'Yatırımcı Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    vc_ilker_title: 'Yönetim Kurulu Başkanı / CxO (Mühendis)',
    vc_eylul_title: 'Yönetim Kurulu Başkanı / CEO (Mimar)',
    field_phone: 'Telefon', field_email: 'E-posta', field_office: 'Ofis Adresi',
    market_dialog_title: 'Yakın Grup Marketplace Erişimi',
    market_dialog_desc: 'Hizmet vermeye başlayacağımız mağaza altyapımız için erken erişim başvurusu.',
    market_b2b_opt: 'Kurumsal / B2B Bayi Alıcısı', market_b2c_opt: 'Bireysel / B2C Satış Talebi',
    market_kvkk_note: 'KVKK İletişim izni şartlarını okudum ve kabul ediyorum.',
    footer_tagline: 'Mühendislik temelli yaklaşımlarla altyapı ve enerjinin birleşimi.',
    footer_col_services: 'Sektör Çözümleri', footer_col_corporate: 'Kurumsal Bilgiler', footer_col_legal: 'Yasal Mevzuat',
    footer_kvkk: 'KVKK Aydınlatma Metni', footer_cookies: 'Çerez Politikası', footer_terms: 'Kullanım Şartları',
    footer_presentation: 'Yatırımcı Sunumu',
    tag_construction_short: 'Yakın İnşaat', tag_energy_short: 'Yakın Enerji',
    footer_lic_note: 'Marka logoları tanıtım amaçlı olup mülkiyet hakları yetkili tescil sahiplerine aittir.',
    nav_partners: 'İş Ortaklarımız', nav_marketplace: 'Marketplace',
  },
  en: {
    nav_about: 'Corporate', nav_construction: 'Construction', nav_energy: 'Energy',
    nav_capital: 'Capital', nav_technology: 'Technology', nav_contact: 'Contact',
    nav_construction_short: 'Construction', nav_energy_short: 'Energy',
    nav_capital_short: 'Capital', nav_technology_short: 'Technology',
    tag_construction: 'CONSTRUCTION & EPC', tag_energy: 'ENERGY & INFRASTRUCTURE SYSTEMS',
    tag_capital: 'FINANCE & INVESTMENT', tag_technology: 'DIGITAL TRANSFORMATION & AI',
    tag_group: 'YAKIN GROUP HOLDING', tag_about: 'CORPORATE TRUST',
    tag_portfolio: 'OUR PROJECTS', tag_partners: 'ENGINEERING PARTNERS',
    tag_store: 'ONLINE STORE & PORTAL', tag_digital: 'DIGITAL TRANSFORMATION & AI',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'CLUSTER A', cluster_b_label: 'CLUSTER B',
    cluster_a_title: 'Renewable Energy, Storage & Mechanical Infrastructure',
    cluster_b_title: 'Information Systems, Network, Electrical & Cybersecurity',
    hero_badge1: 'CONSTRUCTION & EPC', hero_badge2: 'RENEWABLE ENERGY',
    hero_badge3: 'FINANCE & INVESTMENT', hero_badge4: 'DIGITAL TRANSFORMATION & AI',
    hero_title1: "Building Tomorrow's Infrastructure",
    hero_title2: 'Sustainable Energy Solutions',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Technology',
    hero_desc1: 'Global standards in data center construction, industrial facilities and heavy engineering projects.',
    hero_desc2: 'Solar, wind, smart building automation and advanced cybersecurity infrastructure engineering.',
    hero_desc3: 'Project financing advisory, structuring and investment solutions platform.',
    hero_desc4: 'Digital progress payments, AI, BIM integration and advanced project management platform.',
    btn_explore: 'Explore', btn_view_details: 'View Details',
    btn_vcard_download: 'Download Business Card (.vcf)', btn_vcard_share: 'Share',
    btn_market_register: 'Join Waitlist', btn_market_browse: 'Browse Catalogue',
    btn_market_join: 'Add Me to the List', btn_send: 'Send Message',
    btn_presentation_tr: 'Investor Presentation (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Power in Engineering & Energy',
    group_lead: 'As a multi-disciplinary project development group, we offer end-to-end solutions from construction to financing.',
    group_body: 'Yakın Group is a multidisciplinary engineering holding operating in construction EPC, renewable energy, project finance, and digital technology. With our industrial vision and technical expertise, we set the standards in structure and energy sectors.',
    stat_years: 'Years Experience', stat_area: 'm² Construction Area',
    stat_mw: 'MW Installed Capacity', stat_companies: 'Group Companies',
    stat_mw_full: 'MW Total Installed Capacity', stat_co2: 'Tons CO₂ Reduction',
    stat_scada: 'Smart SCADA Monitoring', stat_services: 'Engineering Branches',
    fb_title: 'ISO Certified', fb_sub: 'International Standards',
    c_title: 'Yakın Construction',
    c_desc: 'Superior quality, durability and sustainable methods in every project from data centers to residential and industrial buildings.',
    c_services_title: 'Industrial Construction Solutions',
    c_s1_title: 'Data Center Construction', c_s1_desc: 'Tier III and IV certified, high-reliability mission-critical data centers.',
    c_s2_title: 'Heavy Industry Facilities', c_s2_desc: 'Turnkey EPC for factories, foundries and energy generation plants.',
    c_s3_title: 'Residential & Living Projects', c_s3_desc: 'Luxury living complexes designed with modern architecture and advanced engineering.',
    c_s4_title: 'Structural Engineering & BIM', c_s4_desc: 'Advanced seismic engineering, BIM integration and comprehensive technical design.',
    c_s5_title: 'Airport & Transportation', c_s5_desc: 'International standard airport terminals and transportation infrastructure projects.',
    c_s6_title: 'Urban Renewal', c_s6_desc: 'End-to-end management of identifying, strengthening and transforming at-risk buildings.',
    btn_service_details: 'Details & vCard Contact ›',
    portfolio_title: 'Featured Project Gallery',
    c_gal1_title: 'T-3 Data Center Construction', c_gal2_title: 'International Airport Terminal',
    c_gal3_title: 'Vadi Mansions Living Complex', c_gal4_title: 'Structural Retrofitting & BIM Design',
    e_title: 'Yakın Energy — Energy & Infrastructure Systems',
    e_desc: 'Focused on high efficiency in collaboration with global brands like Huawei, ABB, Vertiv, Siemens.',
    cap_desc: 'Yakın Capital is an advisory and investment platform that develops group projects end-to-end and creates financing solutions.',
    cap_heading: 'Multi-Disciplinary Finance Structuring',
    cap_body: 'Our vision is not only to develop construction and energy projects, but also to organize their financing, manage risks and create sustainable cash flow models.',
    cap_legal: '* Yakın Capital does not conduct portfolio management or financial brokerage activities requiring licenses.',
    tech_desc: 'We digitize heavy industry, energy and infrastructure projects end-to-end with advanced technology.',
    tech_heading: 'Next-Gen Project Management',
    tech_sub: 'With Yakın Platform, all engineering, procurement and field coordination in one screen.',
    partners_title: 'Technology Partners',
    partners_subtitle: 'System integration at international standards with global industry leaders.',
    market_heading: 'Yakın Group Online Marketplace',
    market_sub: 'Fast digital infrastructure for industrial equipment supply and energy & IT products.',
    badge_soon: 'COMING SOON',
    contact_title: 'Get in Touch With Us',
    contact_desc: 'Our team is available 24/7 for your project or advisory needs.',
    contact_lbl_loc: 'Headquarters', contact_lbl_phone: 'Phone', contact_lbl_mail: 'Email',
    vcard_list_title: 'Corporate Contact Points',
    contact_form_title: 'Contact Form',
    lbl_form_name: 'Full Name / Company', lbl_form_email: 'Email Address',
    lbl_form_phone: 'Phone Number', lbl_form_sector: 'Related Division / Sector',
    lbl_form_msg: 'Your Message', lbl_form_type: 'Customer Type',
    vc_ilker_title: 'Chairman / CxO (Engineer)',
    vc_eylul_title: 'Chairman / CEO (Architect)',
    field_phone: 'Phone', field_email: 'Email', field_office: 'Office Address',
    market_dialog_title: 'Yakın Group Marketplace Access',
    market_dialog_desc: 'Early access application for our upcoming marketplace infrastructure.',
    market_b2b_opt: 'Corporate / B2B Dealer Buyer', market_b2c_opt: 'Individual / B2C Sales Request',
    market_kvkk_note: 'I have read and accept the GDPR contact permission terms and information form.',
    footer_tagline: 'The intersection of infrastructure and energy through an engineering-led approach.',
    footer_col_services: 'Sector Solutions', footer_col_corporate: 'Corporate Info', footer_col_legal: 'Legal',
    footer_kvkk: 'GDPR Privacy Notice', footer_cookies: 'Cookie Policy', footer_terms: 'Terms of Use',
    footer_presentation: 'Investor Presentation',
    tag_construction_short: 'Yakın Construction', tag_energy_short: 'Yakın Energy',
    footer_lic_note: 'Brand logos are used for promotional purposes only; ownership rights belong to registered trademark holders.',
    nav_partners: 'Partners', nav_marketplace: 'Marketplace',
  }
};

function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.documentElement.lang = currentLang;
  const btn = document.getElementById('header-lang-btn');
  if (btn) btn.textContent = currentLang === 'tr' ? 'EN' : 'TR';
}

function toggleLanguage() {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  localStorage.setItem('yakin_lang', currentLang);
  applyTranslations();
}

// ── Hero Slider ────────────────────────────────────────────────────────────
let slideIndex = 0;
let slideTimer;
const SLIDE_INTERVAL = 6000;

function initSlider() {
  const slider = document.getElementById('main-hero-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('main-hero-dots');

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  goToSlide(0);
}

function goToSlide(n) {
  const slider = document.getElementById('main-hero-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#main-hero-dots .dot');
  slides[slideIndex].classList.remove('active');
  if (dots[slideIndex]) dots[slideIndex].classList.remove('active');
  slideIndex = (n + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(slideIndex + 1), SLIDE_INTERVAL);
}

function changeSlide(dir) { goToSlide(slideIndex + dir); }

// ── Header scroll ──────────────────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('main-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Mobile Menu ────────────────────────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('nav-links').classList.toggle('active');
}
function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('active');
}
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// ── Smooth scroll ──────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Reveal on scroll ───────────────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Service Details Modal ──────────────────────────────────────────────────
const SERVICES_DATA = {
  c_s1: {
    badge: 'MISSION CRITICAL',
    title: 'Veri Merkezi İnşaatı (Tier III & Tier IV)',
    cover: 'assets/images/data_center_construction_1785092614608.png',
    desc: 'Yüksek kullanılabilirlik ve yedeklilik gerektiren veri merkezi inşaatlarında uçtan uca EPC taahhüt hizmeti sunuyoruz. Sismik izolatörlü yapı tasarımları, yangın dayanımlı kompozit cepheler, N+2 iklimlendirme altyapısı ve kesintisiz güç sistemleri entegrasyonu.',
    specs: [
      'Tier III / Tier IV Uptime Institute Sertifikasyon Hizaması',
      'Faraday Kafesi ve Elektromanyetik Kalkanlama (EMP Protection)',
      'Hassas İklimlendirme (CRAC/CRAH) & Yükseltilmiş Taban Sistemleri',
      'BMS & SCADA Entegre Fiziksel Güvenlik Altyapısı'
    ]
  },
  c_s2: {
    badge: 'INDUSTRIAL EPC',
    title: 'Ağır Sanayi Tesisleri ve Fabrikalar',
    cover: 'assets/images/heavy_industry_clean_1785012805596.png',
    desc: 'Ağır sanayi dökümhaneleri, imalat fabrikaları ve enerji santrallerinde çelik konstrüksiyon, ağır vinç yolları, yüksek mukavemetli zemin betonları ve altyapı mühendisliği.',
    specs: [
      'Büyük Açıklıklı Endüstriyel Çelik Çatı ve Kolon Tasarımı',
      'Ağır Ekipman Temelleri ve Titreşim Sönümleme Sistemleri',
      'Endüstriyel Atık Su Arıtma & Gaz Tahliye Boru Hatları',
      'Uluslararası İş Güvenliği & ISO 9001 / 14001 Standartları'
    ]
  },
  c_s3: {
    badge: 'LUXURY RESIDENTIAL',
    title: 'Konut & Yaşam Projeleri',
    cover: 'assets/images/residential_luxury_project_1785010053703.png',
    desc: 'Estetik mimari, yüksek enerji verimliliği ve akıllı ev teknolojileri ile donatılmış lüks konut kompleksleri ve karma yaşam merkezleri.',
    specs: [
      'A+ Enerji Kimlik Sertifikalı Çevreci Binalar',
      'Akıllı Bina Otomasyonu (BMS) ve Merkezi İklimlendirme',
      'Ses & Isı İzolasyonunda Üst Seviye Konfor Detayları',
      'Sosyal Tesisler, Kapalı Otopark ve Yeşil Alan Mimarisi'
    ]
  },
  c_s4: {
    badge: '5D BIM & SEISMIC',
    title: 'Yapı Mühendisliği, Deprem & BIM Tasarımı',
    cover: 'assets/images/civil_engineering_bim_1785010076530.png',
    desc: 'İleri düzey performans bazlı deprem mühendisliği, sismik güçlendirme ve 5D BIM (Building Information Modeling) süreç yönetimi.',
    specs: [
      '5D BIM Modeli ile Çakışma Analizi ve Maliyet Yönetimi',
      'Sismik İzolatör ve Damperli Yapı Tasarımları',
      'Non-Linear Zaman Tanım Alanında Deprem Analizleri',
      'Mevzuat Uyumlu Statik Raporlama ve Proje Onay Süreçleri'
    ]
  },
  c_s5: {
    badge: 'INFRASTRUCTURE',
    title: 'Havalimanı & Ulaşım Altyapısı',
    cover: 'assets/images/construction_hero_1784577666966.png',
    desc: 'Uluslararası standartlarda havalimanı terminal binaları, pist ağır altyapıları, taksi yolları ve hızlı ulaşım entegrasyon projeleri.',
    specs: [
      'ICAO & FAA Standartlarında Terminal ve Apron İnşaatı',
      'Özel Yüksek Dayanımlı Asfalt ve Beton Pist Kaplamaları',
      'Yolcu Bagaj Entegrasyon (BHS) ve Güvenlik Altyapıları',
      'Kesintisiz Hava Trafik Kontrol Kule Yapıları'
    ]
  },
  c_s6: {
    badge: 'RETROFITTING',
    title: 'Kentsel Dönüşüm & Yapı Güçlendirme',
    cover: 'assets/images/gallery_seismic_retrofitting_1785092947617.png',
    desc: 'Mevcut riskli yapıların sismik incelemesi, karbon elyaf (FRP), çelik manto ve betonarme güçlendirme projeleri ile kentsel dönüşüm danışmanlığı.',
    specs: [
      'Karbon Fiber (CFRP) ve Çelik Manto ile Deprem Güçlendirme',
      'Karot ve Sismik Testler ile Binasal Risk Analizi Raporlama',
      'Hukuki ve Teknik Kentsel Dönüşüm Danışmanlığı',
      'Sıfır Hata ile Bina Yenileme ve Projelendirme'
    ]
  }
};

function openServiceModal(id) {
  const data = SERVICES_DATA[id];
  if (!data) return;
  document.getElementById('service-modal-img').src = data.cover;
  document.getElementById('service-modal-badge').textContent = data.badge;
  document.getElementById('service-modal-title').textContent = data.title;
  document.getElementById('service-modal-desc').textContent = data.desc;
  
  const listEl = document.getElementById('service-modal-list');
  listEl.innerHTML = '';
  data.specs.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    listEl.appendChild(li);
  });

  document.getElementById('service-dialog').showModal();
}
function closeServiceModal() {
  document.getElementById('service-dialog').close();
}

// ── Gallery / Lightbox ─────────────────────────────────────────────────────
// ── Gallery / Lightbox ─────────────────────────────────────────────────────
const galleryImages = [
  {
    src: 'assets/images/gallery_datacenter_1785092833568.png',
    tag: 'ANKARA / TÜRKİYE — VERİ MERKEZİ',
    title: 'T-3 Veri Merkezi Yapımı',
    caption: 'Tier III sertifikasyonuna uygun mission-critical veri merkezi inşası, N+2 yedekli güç ve hassas iklimlendirme altyapısı.',
    specs: [
      { label: 'Lokasyon', val: 'Ankara, Türkiye' },
      { label: 'Kapasite', val: '12 MW BT Yükü / Tier III' },
      { label: 'Kapsam', val: 'EPC Anahtar Teslim' },
      { label: 'Yıl', val: '2024-2025' }
    ]
  },
  {
    src: 'assets/images/construction_hero_1784577666966.png',
    tag: 'İZMİR / TÜRKİYE — HAVALİMANI & ULAŞIM',
    title: 'Uluslararası Havalimanı Terminali',
    caption: '120.000 m² kapalı alana sahip yolcu terminal binası, apron kaplamaları, körük altyapısı ve akıllı bagaj yönlendirme sistemleri.',
    specs: [
      { label: 'Lokasyon', val: 'İzmir, Türkiye' },
      { label: 'Kapalı Alan', val: '120.000 m²' },
      { label: 'Kapsam', val: 'Altyapı & Üstyapı Mühendisliği' },
      { label: 'Yıl', val: '2023-2025' }
    ]
  },
  {
    src: 'assets/images/gallery_vadi_mansion_1785092899049.png',
    tag: 'İSTANBUL / TÜRKİYE — LÜKS KONUT',
    title: 'Vadi Konakları Yaşam Kompleksi',
    caption: 'Akıllı ev otomasyonu, yenilenebilir enerji entegrasyonlu 450 bağımsız konut ünitesi ve sosyal yaşam alanları projelendirmesi.',
    specs: [
      { label: 'Lokasyon', val: 'İstanbul, Türkiye' },
      { label: 'Bağımsız Bölüm', val: '450 Konut & Ticari' },
      { label: 'Sertifika', val: 'LEED Gold Adayı' },
      { label: 'Yıl', val: '2023-2024' }
    ]
  },
  {
    src: 'assets/images/gallery_seismic_retrofitting_1785092947617.png',
    tag: 'DEPREM MÜHENDİSLİĞİ — BİNA GÜÇLENDİRME',
    title: 'Yapı Güçlendirme & BIM Tasarımı',
    caption: 'Karbon elyaf (CFRP) ve çelik manto uygulamaları ile bina sismik performansı artırımı ve 5D BIM dijital ikiz modellemesi.',
    specs: [
      { label: 'Kapsam', val: 'Sismik Analiz & FRP Güçlendirme' },
      { label: 'Yöntem', val: '5D BIM Entegrasyonu' },
      { label: 'Alan', val: 'Endüstriyel & Kamusal Yapılar' },
      { label: 'Güvenlik', val: 'AFAD & Eurocode Standardı' }
    ]
  },
  {
    src: 'assets/images/heavy_industry_clean_1785012805596.png',
    tag: 'İZMİR / TÜRKİYE — ENDÜSTRİYEL İNŞAAT',
    title: 'Endüstriyel Fabrika & Üretim Tesisi',
    caption: 'Ağır sanayi üretimi için yüksek mukavemetli çelik konstrüksiyon fabrika binası, vinç yolları ve özel zemin güçlendirme çözümleri.',
    specs: [
      { label: 'Lokasyon', val: 'İzmir ALOSBİ' },
      { label: 'Kapalı Alan', val: '35.000 m²' },
      { label: 'Yapı Tipi', val: 'Ağır Çelik Konstrüksiyon' },
      { label: 'Yıl', val: '2024' }
    ]
  },
  {
    src: 'assets/images/residential_luxury_project_1785010053703.png',
    tag: 'İSTANBUL / TÜRKİYE — REZİDANS',
    title: 'Park Terrace Lüks Rezidans',
    caption: 'Bosphorus manzaralı, sismik izolatörlü yüksek yapı mimarisi ve çevre dostu malzeme teknolojisi ile inşa edilen prestij projesi.',
    specs: [
      { label: 'Lokasyon', val: 'İstanbul (Beşiktaş)' },
      { label: 'Yükseklik', val: '32 Kat / Sismik İzolatörlü' },
      { label: 'Mimari', val: 'İleri Mühendislik & Cam Cephe' },
      { label: 'Yıl', val: '2024' }
    ]
  },
  {
    src: 'assets/images/gallery_foundry_1785092866525.png',
    tag: 'BURSA / TÜRKİYE — AĞIR SANAYİ',
    title: 'Ağır Sanayi Dökümhane Kompleksi',
    caption: 'Yüksek sıcaklık fırınları, özel havalandırma-baca arıtma sistemleri ve ağır yük zeminleri içeren endüstriyel döküm tesisi.',
    specs: [
      { label: 'Lokasyon', val: 'Bursa, Türkiye' },
      { label: 'Kapasite', val: '45.000 Ton/Yıl Döküm' },
      { label: 'Altyapı', val: 'Özel Deprem & Isı İzolasyonu' },
      { label: 'Yıl', val: '2023' }
    ]
  },
  {
    src: 'assets/images/civil_engineering_bim_1785010076530.png',
    tag: 'İSTANBUL / TÜRKİYE — DİJİTAL İKİZ',
    title: 'BIM 5D Dijital İkiz Projesi',
    caption: 'Tüm disiplinlerin (Mimari, Statik, Mekanik, Elektrik) çakışma analizi (Clash Detection), 5D maliyet simülasyonu ve dijital ikiz yönetimi.',
    specs: [
      { label: 'Yazılım', val: 'Revit, Navisworks, BIM 360' },
      { label: 'Kapsam', val: 'Clash Detection & 5D Cost' },
      { label: 'LOD', val: 'LOD 400 Uygulama Detayı' },
      { label: 'Standart', val: 'ISO 19650 BIM Standardı' }
    ]
  }
];
let lightboxIdx = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  const item = galleryImages[lightboxIdx];
  if (!item) return;

  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-tag').textContent = item.tag || 'PROJE GALERİSİ';
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-caption').textContent = item.caption;

  const specsGrid = document.getElementById('lightbox-specs-grid');
  if (specsGrid) {
    specsGrid.innerHTML = '';
    if (item.specs && item.specs.length > 0) {
      item.specs.forEach(s => {
        const div = document.createElement('div');
        div.className = 'lb-detail-item';
        div.innerHTML = `
          <span class="lb-detail-label">${s.label}</span>
          <span class="lb-detail-value">${s.val}</span>
        `;
        specsGrid.appendChild(div);
      });
    }
  }

  document.getElementById('lightbox-dialog').showModal();
}
function closeLightboxDialog() { document.getElementById('lightbox-dialog').close(); }
function navigateLightbox(dir) {
  lightboxIdx = (lightboxIdx + dir + galleryImages.length) % galleryImages.length;
  openLightbox(lightboxIdx);
}
function openFullImage() {
  const item = galleryImages[lightboxIdx];
  if (!item) return;
  document.getElementById('fullimage-img').src = item.src;
  document.getElementById('fullimage-title').textContent = item.title + ' — ' + (item.tag || '');
  document.getElementById('fullimage-dialog').showModal();
}
function closeFullImage() {
  document.getElementById('fullimage-dialog').close();
}

// ── vCard ──────────────────────────────────────────────────────────────────
const VCARDS = {
  ilker: {
    avatar: 'İA', name: 'İlker ATASOY',
    titleTr: 'Yönetim Kurulu Başkanı / CxO (Mühendis)',
    titleEn: 'Chairman / CxO (Engineer)',
    phone: '+90 542 897 34 46', phoneHref: 'tel:+905428973446',
    email: 'ilker.atasoy@yakingrup.net',
    office: 'Maslak Sun Plaza Kat: 12, Şişli / İstanbul',
    linkedin: 'tr.linkedin.com/company/yakingrupnet',
    linkedinHref: 'https://tr.linkedin.com/company/yakingrupnet',
    vcf: 'BEGIN:VCARD\nVERSION:3.0\nFN:İlker Atasoy\nORG:Yakın Grup\nTITLE:Chairman / CxO\nTEL:+905428973446\nEMAIL:ilker.atasoy@yakingrup.net\nADR:;;Maslak Sun Plaza Kat:12;İstanbul;;;\nURL:https://www.yakingrup.net\nEND:VCARD'
  },
  eylul: {
    avatar: 'EY', name: 'Eylül YILMAZ',
    titleTr: 'Yönetim Kurulu Başkanı / CEO (Mimar)',
    titleEn: 'Chairman / CEO (Architect)',
    phone: '+90 (212) 555 0101', phoneHref: 'tel:+902125550101',
    email: 'eylul.yilmaz@yakingrup.net',
    office: 'Maslak Sun Plaza Kat: 12, Şişli / İstanbul',
    linkedin: 'tr.linkedin.com/company/yakingrupnet',
    linkedinHref: 'https://tr.linkedin.com/company/yakingrupnet',
    vcf: 'BEGIN:VCARD\nVERSION:3.0\nFN:Eylül Yılmaz\nORG:Yakın Grup\nTITLE:Chairman / CEO\nTEL:+902125550101\nEMAIL:eylul.yilmaz@yakingrup.net\nADR:;;Maslak Sun Plaza Kat:12;İstanbul;;;\nURL:https://www.yakingrup.net\nEND:VCARD'
  }
};
let activeVCard = null;

function showVCard(id) {
  activeVCard = id;
  const c = VCARDS[id];
  document.getElementById('modal-card-avatar').textContent = c.avatar;
  document.getElementById('modal-card-name').textContent = c.name;
  document.getElementById('modal-card-title').textContent = currentLang === 'tr' ? c.titleTr : c.titleEn;
  const phoneEl = document.getElementById('modal-card-phone');
  phoneEl.textContent = c.phone; phoneEl.href = c.phoneHref;
  const emailEl = document.getElementById('modal-card-email');
  emailEl.textContent = c.email; emailEl.href = 'mailto:' + c.email;
  document.getElementById('modal-card-office').textContent = c.office;
  const liEl = document.getElementById('modal-card-linkedin');
  liEl.textContent = c.linkedin; liEl.href = c.linkedinHref;
  document.getElementById('vcard-dialog').showModal();
}
function closeVCardDialog() { document.getElementById('vcard-dialog').close(); }

function downloadVCF() {
  if (!activeVCard) return;
  const c = VCARDS[activeVCard];
  const blob = new Blob([c.vcf], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = c.name.replace(/ /g, '_') + '.vcf';
  a.click(); URL.revokeObjectURL(url);
}

function shareCard() {
  if (!activeVCard) return;
  const c = VCARDS[activeVCard];
  if (navigator.share) {
    navigator.share({ title: c.name, text: `${c.name} — ${c.email}`, url: window.location.href });
  } else {
    navigator.clipboard.writeText(`${c.name}\n${c.email}\n${c.phone}`);
    alert('Kart bilgileri panoya kopyalandı.');
  }
}

// ── Marketplace Modal ──────────────────────────────────────────────────────
function openMarketplaceModal() { document.getElementById('market-dialog').showModal(); }
function closeMarketplaceModal() { document.getElementById('market-dialog').close(); }

function handleMarketplaceSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = currentLang === 'tr' ? '✓ Kaydedildi!' : '✓ Saved!';
  btn.style.background = '#1E8F5E';
  setTimeout(() => closeMarketplaceModal(), 1800);
}

// ── Contact Form ───────────────────────────────────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  btn.textContent = currentLang === 'tr' ? '✓ Mesajınız İletildi!' : '✓ Message Sent!';
  btn.style.background = '#1E8F5E';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = TRANSLATIONS[currentLang].btn_send;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}

// ── Legal Modals ───────────────────────────────────────────────────────────
const LEGAL = {
  kvkk: {
    tr: { title: 'KVKK Aydınlatma Metni', body: '<p>Yakın Grup Sanayi İnşaat Enerji Teknoloji Ltd. Şti., kişisel verilerinizi 6698 sayılı KVKK kapsamında toplamakta ve işlemektedir. Toplanan veriler; ad-soyad, e-posta, telefon ve mesaj içeriği olup yalnızca sizinle iletişim kurmak amacıyla kullanılmaktadır. Verileriniz üçüncü taraflarla paylaşılmamakta, yasal saklama süreleri dolduktan sonra silinmektedir. Haklarınız için: info@yakingrup.net</p>' },
    en: { title: 'GDPR Privacy Notice', body: '<p>Yakın Group processes your personal data (name, email, phone, message) solely to respond to your inquiry. Data is not shared with third parties and is deleted after legal retention periods. For your rights: info@yakingrup.net</p>' }
  },
  cerez: {
    tr: { title: 'Çerez Politikası', body: '<p>Sitemiz, temel işlevler için zorunlu çerezler kullanmaktadır. Analitik çerezler Google Analytics aracılığıyla anonim ziyaret verisi toplar. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.</p>' },
    en: { title: 'Cookie Policy', body: '<p>Our site uses necessary cookies for basic functions. Analytical cookies collect anonymous visit data via Google Analytics. You can manage cookies through your browser settings.</p>' }
  },
  kullanim: {
    tr: { title: 'Kullanım Şartları', body: '<p>Bu web sitesi Yakın Grup tarafından işletilmektedir. İçerikler bilgi amaçlıdır; ticari teklif niteliği taşımaz. Sitedeki görseller ve metinler telif hakkı ile korunmaktadır.</p>' },
    en: { title: 'Terms of Use', body: '<p>This website is operated by Yakın Group. Content is for informational purposes only and does not constitute a commercial offer. Images and text are protected by copyright.</p>' }
  }
};

function openLegalModal(type) {
  const data = LEGAL[type][currentLang];
  document.getElementById('legal-modal-title').textContent = data.title;
  document.getElementById('legal-modal-body').innerHTML = data.body;
  document.getElementById('legal-dialog').showModal();
}

// Close dialogs on backdrop click
document.querySelectorAll('dialog').forEach(d => {
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
});

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  initSlider();
  initHeader();
  initReveal();

  slideTimer = setInterval(() => goToSlide(slideIndex + 1), SLIDE_INTERVAL);
});
