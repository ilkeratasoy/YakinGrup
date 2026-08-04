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
    tag_construction: 'İNŞAAT & TAAHHÜT', tag_energy: 'ENERJİ & ALTYAPI',
    tag_capital: 'FİNANS & YATIRIM', tag_technology: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    tag_group: 'KURUMSAL', tag_about: 'KURUMSAL GÜVEN',
    brand_logo: 'YAKIN <span class="logo-bold">GRUP</span>',
    tag_portfolio: 'PROJELERİMİZ', tag_partners: 'MÜHENDİSLİK PAYDAŞLARI',
    tag_store: 'ONLINE SATIŞ & PORTAL', tag_digital: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'Yenilenebilir Enerji Sistemleri', cluster_em_label: 'ELEKTRİK & MEKANİK TAAHHÜT', cluster_b_label: 'KÜME B',
    cluster_b_title: 'Veri Merkezi Sistemleri & Entegrasyon Çözümler',
    hero_badge1: 'İNŞAAT & TAAHHÜT', hero_badge2: 'ENERJİ & ALTYAPI',
    hero_badge3: 'FİNANS & YATIRIM', hero_badge4: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    hero_title1: 'Yakın İnşaat',
    hero_title2: 'Yakın Enerji',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Teknoloji',
    hero_desc1: 'Veri merkezleri, endüstriyel tesisler ve ağır mühendislik taahhüt projelerinde küresel standartlar.',
    hero_desc2: 'Yenilenebilir enerji sistemleri, Veri merkezi sistemleri ve Siber güvenlik çözümleri.',
    hero_desc3: 'Proje finansmanı danışmanlığı, yapılandırma ve yatırım çözümleri platformu.',
    hero_desc4: 'Dijital hakediş, yapay zekâ, BIM entegrasyonu ve ileri seviye proje yönetim platformu.',
    btn_explore: 'Keşfet', btn_view_details: 'Detaylı İncele',
    btn_vcard_download: 'Kartviziti İndir (.vcf)', btn_vcard_share: 'Paylaş',
    btn_market_register: 'Bekleme Listesine Katıl', btn_market_browse: 'Kataloğu İncele',
    btn_market_join: 'Beni Listeye Ekle', btn_send: 'Mesajı Gönder',
    btn_presentation_tr: 'Yatırımcı Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Yakın Grup Holding',
    group_lead: 'Proje müşavirliği ve proje geliştirme grubu olarak inşaat, enerji, finansman ve teknoloji sektörlerinde uçtan uca çözümler sunuyoruz.',
    group_body: 'Endüstriyel vizyonumuz ve mühendislik alanlarındaki tecrübemiz ile yapı ve enerjiye bağlı sektörlerde teknik sınırları çiziyoruz.',
    stat_years: 'YILLIK TECRÜBE', stat_area: 'm² İnşaat Alanı',
    stat_mw: 'MW Kurulu Güç', stat_companies: 'Grup Şirketi',
    stat_mw_full: 'MW Toplam Kurulu Güç', stat_co2: 'Ton CO₂ Azaltımı',
    stat_scada: 'Akıllı SCADA İzleme', stat_services: 'Mühendislik Branşı',
    iso_heading: 'ULUSLARARASI ISO SERTİFİKALARI', iso_sub: 'Entegre Kalite & Güvenlik Yönetim Sistemleri',
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
    portfolio_title: 'Tamamlanan Referans Projelerimiz',
    c_gal1_title: 'T-3 Veri Merkezi Yapımı', c_gal2_title: 'Uluslararası Havalimanı Terminali',
    c_gal3_title: 'Vadi Konakları Yaşam Kompleksi', c_gal4_title: 'Yapı Güçlendirme & BIM Tasarımı',
    e_title: 'Yakın Enerji',
    e_services_title: 'Çözüm ve Hizmetler',
    e_desc: 'Yenilenebilir Enerji Sistemleri, Veri Merkezi Sistemleri, Telekomünikasyon & Siber Güvenlik Çözümleri.',
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
    tag_construction: 'CONSTRUCTION & EPC', tag_energy: 'ENERGY & INFRASTRUCTURE',
    tag_capital: 'FINANCE & INVESTMENT', tag_technology: 'DIGITAL TRANSFORMATION & AI',
    tag_group: 'CORPORATE', tag_about: 'CORPORATE TRUST',
    brand_logo: 'YAKIN <span class="logo-bold">GROUP</span>',
    tag_portfolio: 'OUR PROJECTS', tag_partners: 'ENGINEERING PARTNERS',
    tag_store: 'ONLINE STORE & PORTAL', tag_digital: 'DIGITAL TRANSFORMATION & AI',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'Renewable Energy Systems', cluster_em_label: 'ELECTRICAL & MECHANICAL CONTRACTING', cluster_b_label: 'CLUSTER B',
    cluster_b_title: 'Data Center Systems & Integration Solutions',
    hero_badge1: 'CONSTRUCTION & EPC', hero_badge2: 'ENERGY & INFRASTRUCTURE',
    hero_badge3: 'FINANCE & INVESTMENT', hero_badge4: 'DIGITAL TRANSFORMATION & AI',
    hero_title1: 'Yakın Construction',
    hero_title2: 'Yakın Energy',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Technology',
    hero_desc1: 'Global standards in data center construction, industrial facilities and heavy engineering projects.',
    hero_desc2: 'Solar, wind, hybrid, smart building automation and advanced infrastructure systems engineering & cybersecurity.',
    hero_desc3: 'Project financing advisory, structuring and investment solutions platform.',
    hero_desc4: 'Digital progress payments, AI, BIM integration and advanced project management platform.',
    btn_explore: 'Explore', btn_view_details: 'View Details',
    btn_vcard_download: 'Download Business Card (.vcf)', btn_vcard_share: 'Share',
    btn_market_register: 'Join Waitlist', btn_market_browse: 'Browse Catalogue',
    btn_market_join: 'Add Me to the List', btn_send: 'Send Message',
    btn_presentation_tr: 'Investor Presentation (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Yakın Group Holding',
    group_lead: 'As a project consultancy and development group, we offer end-to-end solutions in construction, energy, finance and technology sectors.',
    group_body: 'With our industrial vision and experience in engineering fields, we set the technical boundaries in sectors related to construction and energy.',
    stat_years: 'YEARS OF EXPERIENCE', stat_area: 'm² Construction Area',
    stat_mw: 'MW Installed Capacity', stat_companies: 'Group Companies',
    stat_mw_full: 'MW Total Installed Capacity', stat_co2: 'Tons CO₂ Reduction',
    stat_scada: 'Smart SCADA Monitoring', stat_services: 'Engineering Branches',
    iso_heading: 'INTERNATIONAL ISO CERTIFICATIONS', iso_sub: 'Integrated Quality & Security Management Systems',
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
    portfolio_title: 'Our Completed Reference Projects',
    c_gal1_title: 'T-3 Data Center Construction', c_gal2_title: 'International Airport Terminal',
    c_gal3_title: 'Vadi Mansions Living Complex', c_gal4_title: 'Structural Retrofitting & BIM Design',
    e_title: 'Yakın Energy',
    e_services_title: 'Solutions & Services',
    e_desc: 'Renewable Energy Systems, Data Center Systems, Telecommunication & Cybersecurity Solutions.',
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
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
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
  },
  // Enerji Küme A
  e_s1: {
    badge: 'SOLAR & BIPV',
    title: 'Güneş Enerjisi Sistemleri (GES) & BIPV',
    cover: 'assets/images/energy_solar_ges.jpg',
    desc: 'Arazi ve çatı tipi GES EPC projeleri ile dış cephe fotovoltaik cephe kaplama ve akıllı fotovoltaik cam sistemleri (BIPV) entegrasyonu.',
    specs: [
      'BIPV (Building Integrated Photovoltaics) Cephe ve Cam Entegrasyonu',
      'Endüstriyel Çatı ve Arazi Tipi GES Anahtar Teslim EPC',
      'Yüksek Verimli Monokristal & Bifacial Panel Teknolojileri',
      'Şebeke Bağlantılı (On-Grid) & Hibrit İnvertör Sistemleri'
    ]
  },
  e_s2: {
    badge: 'WIND POWER',
    title: 'Rüzgar Enerjisi Santrali (RES / WPP) & Rüzgar Çiftliği',
    cover: 'assets/images/energy_wind_res.jpg',
    desc: 'Rüzgar santralleri (WPP) ve rüzgar çiftliği (WF) kurulum, türbin montajı, yüksek gerilim şebeke bağlantıları ve saha mühendisliği.',
    specs: [
      'Türbin Altyapı, Temel ve Montaj Mühendisliği',
      'Rüzgar Sahası Ölçüm, Verim ve Fizibilite Raporlaması',
      'Orta / Yüksek Gerilim Şebeke Bağlantı Altyapısı',
      'Periyodik Bakım, Onarım ve SCADA Entegrasyonu'
    ]
  },
  e_s3: {
    badge: 'BESS & HYBRID',
    title: 'Batarya Enerji Depolama (BESS) & Hibrit Sistemler',
    cover: 'assets/images/energy_bess_battery.jpg',
    desc: 'BESS (Battery Energy Storage System), HES/HRES hibrit sistemler, LFP batarya hücreleri, BMS ve çift yönlü PCS güç dönüştürücüler.',
    specs: [
      'BESS Konteyner Tipi Depolama Çözümleri (LFP / LiFePO4)',
      'BMS (Battery Management System) ve Hücre Dengeleme',
      'PCS (Power Conversion System) AC/DC Çift Yönlü Çevirici Entegrasyonu',
      'Şebeke Yük Dengeleme ve Peak Shaving Yazılım Otomasyonu'
    ]
  },
  e_em1: {
    badge: 'MEP & CONTRACTING',
    title: 'Elektrik & Mekanik Taahhüt Hizmetleri',
    cover: 'assets/images/energy_em_contracting.jpg',
    desc: 'Endüstriyel üretim tesisleri, ticari binalar, hastaneler ve veri merkezleri için anahtar teslim MEP (Mekanik, Elektrik, Tesisat) taahhüt ve uygulama çözümleri.',
    specs: [
      'Anahtar Teslim Elektrik & Mekanik Tesisat Taahhüdü',
      'HVAC VRF / VAV İklimlendirme ve İleri Havalandırma',
      'Sıhhi Tesisat, Yangın Koruma ve Borulama Altyapısı',
      'Projelendirme, Süreç Yönetimi ve Devreye Alma (Commissioning)'
    ]
  },
  e_em2: {
    badge: 'LOW VOLTAGE / ELV',
    title: 'Zayıf Akım Çözümleri & Akıllı Bina Otomasyonu',
    cover: 'assets/images/energy_em_elv.jpg',
    desc: 'Bina ve tesis emniyetini üst düzeye çıkaran CCTV siber güvenlik kameraları, yangın algılama, geçiş kontrol (Access Control), IP anons ve yapısal fiber altyapı.',
    specs: [
      'IP CCTV Güvenlik Kamera ve Video Analiz Sistemleri',
      'Adresli Yangın Algılama ve Erken Uyarı Tesisatı',
      'Geçiş Kontrol (Access Control), Kartlı & Biyometrik Geçiş',
      'Yapısal Fiber Kablolama ve Veri Merkezi Network Altyapısı'
    ]
  },
  e_em3: {
    badge: 'LV SYSTEMS / AG',
    title: 'Alçak Gerilim Sistemleri (AG) & Güç Dağıtımı',
    cover: 'assets/images/energy_em_ag.jpg',
    desc: 'AG ana dağıtım panoları (ADP), tali dağıtım panoları, MCC kumanda merkezleri, Otomatik Reaktif Güç Kompanzasyonu ve Kesintisiz Güç Kaynağı (UPS) kurulumları.',
    specs: [
      'AG Ana Dağıtım ve Tali Dağıtım Panoları (Form 4b Standardı)',
      'Motor Kontrol Merkezleri (MCC) ve Sürücü Panoları',
      'Busbar Enerji Dağıtım Hatları ve Kablo Taşıma Sistemleri',
      'Aktif / Pasif Harmonik Filtreli Kompanzasyon Panoları'
    ]
  },
  e_em4: {
    badge: 'MV SYSTEMS / OG',
    title: 'Orta Gerilim Sistemleri (OG) & Şalt Tesisleri',
    cover: 'assets/images/energy_em_og.jpg',
    desc: '36 kV Orta Gerilim hücresel şalt merkezleri, SF6 gazlı / hava yalıtımlı modüler hücreler, kuru ve yağlı tip trafo kurulumları ve OG şebeke entegrasyonu.',
    specs: [
      '36 kV OG Hücresel Şalt Tesisleri & Metal-Clad Hücreler',
      'Yağlı ve Kuru Tipi Dağıtım Trafoları (100 kVA - 10 MVA)',
      'Mikroişlemcili Dijital Koruma Röleleri ve Testleri',
      'OG Yeraltı Kablo Tesisatı ve Yüksek Gerilim İletim Hatları'
    ]
  },
  e_em5: {
    badge: 'ENGINEERING & APPROVAL',
    title: 'Proje Mühendislik & Onay Hizmetleri',
    cover: 'assets/images/energy_em_engineering.jpg',
    desc: 'Elektrik Dağıtım Şirketleri (TEDAŞ, EDAŞ) resmi proje onayları, röle koordinasyon hesaplamaları, kısa devre analizleri ve kabul/ruhsat süreç danışmanlığı.',
    specs: [
      'TEDAŞ / EDAŞ Elektrik Proje Çizimi ve Resmi Onay Süreçleri',
      'Kısa Devre, Yük Akışı ve Gerilim Düşümü Hesaplamaları',
      'Dijital Koruma Rölesi Selektivite ve Koordinasyon Analizleri',
      'Geçici Kabul, Tesis Ruhsatı ve Müşavirlik Danışmanlık Hizmetleri'
    ]
  },
  e_s4: {
    badge: 'MEP & HVAC',
    title: 'Mekanik Tesisat & HVAC (VRF / VAV) / MEP',
    cover: 'assets/images/energy_hvac_mep.jpg',
    desc: 'MEP (Mechanical, Electrical, Plumbing) mühendisliği, HVAC VRF VAV hassas iklimlendirme ve havalandırma sistem tasarımları.',
    specs: [
      'Bina ve Sanayi Tesisleri İklimlendirme (HVAC VRF / VAV / AHU)',
      'MEP Mekanik & Elektrik Tesisat Projelendirmesi',
      'Hassas Kontrollü Veri Merkezi Soğutma Altyapıları',
      'Enerji Geri Kazanımlı Havalandırma Sistemleri'
    ]
  },
  e_s5: {
    badge: 'SCADA',
    title: 'SCADA — Merkezi Denetim, Kontrol ve Veri Toplama',
    cover: 'assets/images/energy_scada_control.jpg',
    desc: 'Elektrik üretimi, su dağıtımı, doğalgaz hatları ve endüstriyel tesisler için gerçek zamanlı canlı izleme, alarm yönetimi ve uzaktan kontrol.',
    specs: [
      'Canlı Veri Toplama, Sensör Entegrasyonu ve Trend Analizleri',
      'Merkezi İzleme Ekranları ve Uzaktan Otomasyon Komutları',
      'PLC / RTU Haberleşme Protokolleri (Modbus, IEC 60870-5, DNP3)',
      'Veri Güvenliği ve Yedekli Mimari Tasarımı'
    ]
  },
  e_s6: {
    badge: 'FIRE SUPPRESSION',
    title: 'Yangın Söndürme ve Erken Uyarı Sistemleri',
    cover: 'assets/images/energy_fire_suppression.jpg',
    desc: 'Sprinkler sulu söndürme, gazlı söndürme (FM200 / Novec 1230), davlumbaz söndürme ve mobil yangın emniyet altyapıları.',
    specs: [
      'FM200 / Novec 1230 Gazlı Söndürme Sistemleri (Data Center & Sistem Odası)',
      'Otomatik Sprinkler (Yağmurlama) Sulu Söndürme Tesisatı',
      'Erken Uyarı Hassas Duman Algılama (VESDA) Entegrasyonu',
      'NFPA Standartlarına Uygun Mühendislik ve Test Raporlama'
    ]
  },
  e_s7: {
    badge: 'EV CHARGE & E-MOBILITY',
    title: 'Elektrikli Araç Şarj İstasyonları (EV Charge)',
    cover: 'assets/images/energy_ev_charge.jpg',
    desc: 'AC yavaş/normal (3.7 - 22 kW) ve DC hızlı (50 - 350+ kW) şarj istasyonu kurulumları, Tip 2 / CCS / CHAdeMO soket çözümleri ve apartman bağımsız daire sayacı entegrasyonları.',
    specs: [
      'AC Şarj İstasyonları (3.7 kW - 22 kW): Alternatif akımı araç içi dönüştürücü (on-board charger) ile DC\'ye çevirir (3-8 saat dolum). Konut, site, iş yeri ve park alanları.',
      'Apartman & Site Daire Sayacı Entegrasyonu: Apartman ve sitelerde daire sakinlerinin doğrudan kendi bağımsız hane elektrik sayacından şarj besleme ve faturalandırma imkanı.',
      'DC Hızlı Şarj İstasyonları (50 kW - 350+ kW): İstasyon içi doğrudan dönüştürme ile %20-%80 batarya dolumunu 20-40 dakikada sağlar (Otoyol, akaryakıt ve acil dolum alanları).',
      'Soket ve Bağlantı Türleri: Tip 2 (Mennekes AC standart), CCS (Kombine AC/DC hızlı şarj) ve CHAdeMO (Asya DC hızlı şarj) soket standartları.'
    ]
  },
  // Enerji Küme B — Veri Merkezi Sistemleri & Entegrasyonları
  e_b1: {
    badge: 'HARDWARE & INFRASTRUCTURE',
    title: 'Altyapı ve Donanım Bileşenleri',
    cover: 'assets/images/data_center_construction_1785092614608.png',
    desc: 'Veri merkezi fiziksel altyapısı, rack kabinetler, ToR SW çözümleri, hassas sıvı soğutma, modüler konteyner sistemleri ve yükseltilmiş zemin mühendisliği.',
    specs: [
      'Kabin ve Muhafaza: Rack kabinetler, busbar sistemleri ve Top of Rack (ToR) SW Data Center çözümleri',
      'Enerji ve İklimlendirme: Kesintisiz güç kaynakları (UPS) ve hassas sıvı soğutma üniteleri',
      'Kapsayıcı Sistemler: Modüler & konteyner tipi taşınabilir veri merkezleri, Shell and Core kabinet odaları',
      'Fiziksel Altyapı: Yükseltilmiş zemin, tavan ve taban kablolama taşıyıcı sistemleri'
    ]
  },
  e_b2: {
    badge: 'CLOUD & VIRTUALIZATION',
    title: 'Operasyonel, Bulut & Sanallaştırma Hizmetleri',
    cover: 'assets/images/energy_fiber_network.jpg',
    desc: 'Colocation barındırma, İş Sürekliliği & Felaket Kurtarma (BCP/DR), sanallaştırma mimarileri (VDI, Sanal Sunucu, Storage, Network) ve uçtan uca IT donanım çözümleri.',
    specs: [
      'Sunucu Barındırma (Colocation): 7/24 korunan güvenli tesislerde cihaz barındırma ve alan kiralama',
      'İş Sürekliliği & Felaket Kurtarma: Disaster Recovery (DR) planlaması, felaket erteleme ve veri yedekleme',
      'Sanallaştırma Çözümleri: Sanal Masaüstü (VDI), Sanal Sunucu, Sanal Depolama, Sanal İş Yükleri & Network',
      'Uçtan Uca IT Altyapı: Sunucu, Depolama (SAN&NAS), Network, Firewall, UTM, SW, WLAN, WiFi, VPN, VOIP ve Public/Private Cloud'
    ]
  },
  e_b3: {
    badge: 'REGULATION & ADVISORY',
    title: 'Regülasyon, İhale Danışmanlığı & Asset Sizing',
    cover: 'assets/images/tender_contract_management_1785010026255.png',
    desc: 'KVKK, GDPR, ISO 27001/9001 hukuki ve teknik uyum süreçleri, Volume/Asset Sizing hesaplamaları ve RFP/RFQ ihale şartname danışmanlığı.',
    specs: [
      'Regülasyon Uyum: KVKK, GDPR, ISO 27001 & ISO 9001 teknik-idari tabloların adreslenmesi ve prosedür yazımı',
      'Volume / Asset Sizing: İş büyüklüğüne göre kaynak, donanım, alan ve kapasite boyutlandırma hesabı',
      'Doğru Maliyet Yönetimi: Fazla veya eksik yatırımı önleyen bütçe planlaması ve optimizasyon',
      'İhale & Şartname Yönetimi: RFP, RFI, RFQ, RFx şartname hazırlığı, tedarikçi ve üretici yönetimi'
    ]
  },
  e_b4: {
    badge: 'WHITE SPACE & DCIM',
    title: 'Veri Merkezi Beyaz Alan (White Space) Yönetimi & DCIM',
    cover: 'assets/images/gallery_datacenter_v2.jpg',
    desc: 'Sıcak/soğuk koridor tasarımı, PUE enerji ve soğutma verimliliği optimizasyonu, DCIM altyapı yazılımları ve beyaz alan fiziksel güvenlik yönetimi.',
    specs: [
      'Kapasite ve Yerleşim: Kabin (rack) yerleşimi, ağırlık sınırları ve zemin altı kablolama düzeni',
      'İklimlendirme & PUE Optimizasyonu: Sıcak/soğuk koridor tasarımı, sıcaklık/nem kontrolü ve enerji verimliliği',
      'Enerji İzleme & Güç: Güç tüketimi, PUE (Güç Kullanımı Etkinliği) canlı takibi ve yedekli enerji mimarisi',
      'DCIM & Güvenlik: Veri Merkezi Altyapı Yönetimi (DCIM) yazılımları, geçiş kontrolü, CCTV ve erken uyarı yangın algılama'
    ]
  },
  e_b5: {
    badge: 'CYBERSECURITY & BMS',
    title: 'Siber Güvenlik, SOC & Akıllı Bina Otomasyonu (BMS)',
    cover: 'assets/images/energy_cybersecurity.jpg',
    desc: 'IT/OT siber güvenlik danışmanlığı, 7/24 Güvenlik Operasyon Merkezi (SOC) kurulumu, Zayıf/Güçlü Akım tesisatı ve BMS bina otomasyonu.',
    specs: [
      'IT / OT Siber Güvenlik Mimarisi ve ISO 27001 / IEC 62443 Uyum Denetimleri',
      'SOC (Güvenlik Operasyon Merkezi) 7/24 Kurulumu, Canlı İzleme & Penetrasyon Testleri',
      'Zayıf Akım (ELV) & Güçlü / Kuvvetli Akım Tesisat ve Dağıtım Panosu Entegrasyonları',
      'BMS (Building Management System) Akıllı Bina Otomasyonu & Merkezi Kontrol Yazılımları'
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
    src: 'assets/images/gallery_datacenter_v2.jpg',
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
    src: 'assets/images/gallery_factory_v2.jpg',
    tag: 'İZMİR / TÜRKİYE — AĞIR SANAYİ',
    title: 'Ağır Sanayi & Üretim Tesisleri',
    caption: '120.000 m² kapalı alana sahip yüksek teknolojili ağır sanayi üretim tesisi, otomasyon altyapısı ve imalat hatları.',
    specs: [
      { label: 'Lokasyon', val: 'İzmir, Türkiye' },
      { label: 'Kapalı Alan', val: '120.000 m²' },
      { label: 'Kapsam', val: 'Ağır Sanayi & Fabrika İnşaatı' },
      { label: 'Yıl', val: '2023-2025' }
    ]
  },
  {
    src: 'assets/images/gallery_residential_v2.jpg',
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
    src: 'assets/images/gallery_skytower_v2.jpg',
    tag: 'İSTANBUL / TÜRKİYE — İŞ KULESİ',
    title: 'Sky Tower İş Kulesi & Sismik Tasarım',
    caption: 'Taban izolatörlü ve yüksek mukavemetli sismik kolon yapısıyla depreme tam dayanıklı 42 katlı iş kulesi inşası.',
    specs: [
      { label: 'Lokasyon', val: 'İstanbul (Ataşehir)' },
      { label: 'Kat Sayısı', val: '42 Kat / 185m Yükseklik' },
      { label: 'Teknoloji', val: 'Sismik Taban İzolatörü' },
      { label: 'Yıl', val: '2024' }
    ]
  },
  {
    src: 'assets/images/gallery_petrochemical_v2.jpg',
    tag: 'KOCAELİ / TÜRKİYE — PETROKİMYA',
    title: 'Petrokimya & Enerji Santral Kompleksi',
    caption: 'Ağır endüstriyel proses borulamaları, yüksek basınçlı depolama tankları ve türbin binası ağır mühendislik taahhüdü.',
    specs: [
      { label: 'Lokasyon', val: 'Kocaeli (Dilovası)' },
      { label: 'Kapasite', val: '250.000 Ton/Yıl İşleme' },
      { label: 'Yapı Tipi', val: 'Ağır Çelik & Tank Çiftliği' },
      { label: 'Yıl', val: '2024' }
    ]
  },
  {
    src: 'assets/images/gallery_mixeduse_v2.jpg',
    tag: 'İSTANBUL / TÜRKİYE — KARMA PROJE',
    title: 'Park Terrace Karma Yaşam & Ofis Projesi',
    caption: 'Alışveriş bulvarı, lüks rezidans blokları ve A+ ofis katlarını bir araya getiren prestijli karma kullanım projesi.',
    specs: [
      { label: 'Lokasyon', val: 'İstanbul (Maslak)' },
      { label: 'İnşaat Alanı', val: '180.000 m²' },
      { label: 'Karma Konsept', val: 'Rezidans + A+ Ofis + Retail' },
      { label: 'Yıl', val: '2024-2025' }
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
    tag: 'İSTANBUL / TÜRKİYE — DİJİTAL İKİZ & BIM',
    title: '5D BIM Projelendirme & İhale Yönetimi',
    caption: 'Tüm disiplinlerin (Mimari, Statik, Mekanik, Elektrik) çakışma analizi, 5D maliyet simülasyonu ve şartname yönetimi.',
    specs: [
      { label: 'Yazılım', val: 'Revit, Navisworks, BIM 360' },
      { label: 'Kapsam', val: '5D Cost & Clash Detection' },
      { label: 'LOD Standardı', val: 'LOD 400 Uygulama Detayı' },
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

// ── Energy Product References Modal ──────────────────────────────────────
const energyProducts = [
  {
    src: 'assets/images/energy_ref_smart_bess.jpg',
    tag: 'BIPV SOLAR & BESS MOBILE APP',
    title: 'Akıllı Ev BESS & Şarj İstasyonu Entegrasyonu',
    caption: 'Canlı Mobil Durum Ekranı ile 7.2 kW Solar Üretim, %68 Şarjlı Ev Tipi LFP Batarya, 1.3 kW EV Araç Şarj Yönetimi ve Şebeke Akıllı Otomasyonu.',
    specs: [
      { label: 'Güneş Üretimi', val: '7.2 kW BIPV Çatı PV' },
      { label: 'Batarya Depolama', val: 'LFP (LiFePO4) Akıllı Depolama' },
      { label: 'EV Şarj İstasyonu', val: '1.3 kW Smart EV Charger' },
      { label: 'Yazılım', val: 'Canlı Mobil Takip & Otonom Şarj' }
    ]
  },
  {
    src: 'assets/images/energy_ref_luxury_solar.jpg',
    tag: 'LUXURY RESIDENTIAL BIPV',
    title: 'Lüks Konut & Otel BIPV Solar & Konteyner Depolama Tesisi',
    caption: 'Deniz manzaralı lüks kompleks projesinde çatı entegre PV solar cam kaplaması ve ahşap mimari giydirmeli gizli BESS batarya konteyner odası.',
    specs: [
      { label: 'Lokasyon', val: 'Ege Kıyısı Lüks Kompleks' },
      { label: 'Solar Altyapı', val: 'BIPV Fotovoltaik Cam Çatı' },
      { label: 'Depolama', val: 'Özel Mimari Konteyner BESS' },
      { label: 'Sürdürülebilirlik', val: 'Net Zero Carbon Hizaması' }
    ]
  },
  {
    src: 'assets/images/energy_ref_bess_container.jpg',
    tag: 'INDUSTRIAL BESS',
    title: 'Konteyner Tipi Endüstriyel BESS Batarya Santrali',
    caption: 'MW ölçeğinde outdoor iklimlendirmeli LFP batarya konteynerleri, çift yönlü PCS invertörler ve Akıllı Peak Shaving şebeke entegrasyonu.',
    specs: [
      { label: 'Depolama Kapasitesi', val: '10 MWh LFP Batarya' },
      { label: 'Güç Dönüştürme', val: 'PCS Çift Yönlü Çevirici' },
      { label: 'Kullanım', val: 'Peak Shaving & Şebeke Dengeleme' },
      { label: 'Emniyet', val: 'FM200 Gazlı Söndürme & BMS' }
    ]
  },
  {
    src: 'assets/images/energy_ref_solar_ges_50mw.jpg',
    tag: 'UTILITY SOLAR',
    title: '50 MWp Endüstriyel Çatı & Arazi GES EPC Projesi',
    caption: 'Arazi ve endüstriyel tesis çatılarında yüksek verimli monokristal Bifacial PV paneller ve On-Grid santral entegrasyonu.',
    specs: [
      { label: 'Kurulu Güç', val: '50 MWp Toplam Güç' },
      { label: 'Panel Tipi', val: 'Bifacial Monokristal PERC' },
      { label: 'Kapsam', val: 'Anahtar Teslim EPC' },
      { label: 'Katkı', val: '35.000 Ton CO₂ Tasarrufu' }
    ]
  },
  {
    src: 'assets/images/energy_ref_wind_res_100mw.jpg',
    tag: 'WIND POWER',
    title: '100 MW RES & WPP Rüzgar Santrali Türbin Entegrasyonu',
    caption: 'Yüksek irtifa türbin altyapı mühendisliği, türbin montajı, şebeke bağlantısı ve periyodik SCADA izleme hizmetleri.',
    specs: [
      { label: 'Kapasite', val: '100 MW Rüzgar Santrali' },
      { label: 'Altyapı', val: 'Ağır Mühendislik & Temeller' },
      { label: 'Şebeke Entegrasyonu', val: '154 kV Yüksek Gerilim' },
      { label: 'İzleme', val: '7/24 SCADA Uzaktan Kontrol' }
    ]
  },
  {
    src: 'assets/images/energy_ref_scada_room.jpg',
    tag: 'AUTOMATION & SCADA',
    title: 'Merkezi SCADA Otomasyon & Şebeke İzleme Kontrol',
    caption: 'Elektrik santralleri, su arıtma ve sanayi tesisleri için canlı sensör verisi toplama, alarm yönetimi ve uzaktan otomasyon.',
    specs: [
      { label: 'Yazılım Altyapısı', val: 'SCADA & Canlı Telemetri' },
      { label: 'Protokol', val: 'Modbus, IEC 60870, DNP3' },
      { label: 'Ekran Mimarisi', val: 'Merkezi Video Wall' },
      { label: 'Güvenlik', val: 'Yedekli Redundant Server' }
    ]
  },
  {
    src: 'assets/images/energy_ref_soc_cyber.jpg',
    tag: 'CYBERSECURITY SOC',
    title: 'OT / IT Siber Güvenlik Operations Center (SOC) Merkezi',
    caption: 'Kritik altyapılar için IT ve OT siber güvenlik danışmanlığı, 7/24 SOC izleme, penetrasyon testleri ve ISO 27001 denetimleri.',
    specs: [
      { label: 'Mühendislik', val: 'ICS / OT Siber Güvenlik Mimarisi' },
      { label: 'İzleme', val: '7/24 Canlı SOC Tehdit Avcılığı' },
      { label: 'Test', val: 'Penetrasyon ve Sızma Testleri' },
      { label: 'Uyum', val: 'ISO 27001 & IEC 62443 Standardı' }
    ]
  },
  {
    src: 'assets/images/energy_ref_dc_cooling.jpg',
    tag: 'DC MEP & COOLING',
    title: 'Veri Merkezi Hassas Sıvı Soğutma & MEP Tesisatı',
    caption: 'Tier IV standartlarında veri merkezleri ve hassas iklimlendirme odaları için sıvı soğutma, CRAH/CRAC ve MEP tesisat projelendirmesi.',
    specs: [
      { label: 'Soğutma Teknolojisi', val: 'Hassas Sıvı & In-Row Soğutma' },
      { label: 'Yedeklilik', val: 'N+2 Redundant Chiller' },
      { label: 'PUE Oranı', val: '< 1.15 PUE Verimlilik' },
      { label: 'Tesisat', val: 'MEP Paslanmaz Borulama' }
    ]
  }
];

function openEnergyProductModal(idx) {
  const item = energyProducts[idx];
  if (!item) return;

  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-tag').textContent = item.tag || 'ÜRÜN REFERANSI';
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

// Close dialogs when clicking outside content (on backdrop)
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'DIALOG' && e.target.hasAttribute('open')) {
    const rect = e.target.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      e.target.close();
    }
  }
});

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
