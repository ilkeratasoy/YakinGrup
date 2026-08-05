/* ==========================================================================
   YAKIN GRUP â SINGLE PAGE APP JS
   ========================================================================== */

// ââ Language ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
let currentLang = localStorage.getItem('yakin_lang') ||
  (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en');

const TRANSLATIONS = {
  tr: {
    nav_about: 'Kurumsal', nav_construction: 'Ä°nÅaat', nav_energy: 'Enerji',
    nav_capital: 'Capital', nav_technology: 'Teknoloji', nav_contact: 'Ä°letiÅim',
    nav_construction_short: 'Ä°nÅaat', nav_energy_short: 'Enerji',
    nav_capital_short: 'Capital', nav_technology_short: 'Teknoloji',
    tag_construction: 'Ä°NÅAAT & TAAHHÃT', tag_energy: 'ENERJÄ° & ALTYAPI',
    tag_capital: 'FÄ°NANS & YATIRIM', tag_technology: 'DÄ°JÄ°TAL DÃNÃÅÃM & YAPAY ZEKA',
    tag_group: 'KURUMSAL', tag_about: 'KURUMSAL GÃVEN',
    brand_logo: 'YAKIN <span class="logo-bold">GRUP</span>',
    tag_portfolio: 'PROJELERÄ°MÄ°Z', tag_partners: 'MÃHENDÄ°SLÄ°K PAYDAÅLARI',
    tag_store: 'ONLINE SATIÅ & PORTAL', tag_digital: 'DÄ°JÄ°TAL DÃNÃÅÃM & YAPAY ZEKA',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'Yenilenebilir Enerji Sistemleri', cluster_em_label: 'ELEKTRÄ°K & MEKANÄ°K TAAHHÃT', cluster_b_label: 'Veri Merkezi Sistemleri', cluster_telecom_label: 'TelekomÃ¼nikasyon', cluster_cyber_label: 'Siber GÃ¼venlik ÃÃ¶zÃ¼mleri',
    hero_badge1: 'Ä°NÅAAT & TAAHHÃT', hero_badge2: 'ENERJÄ° & ALTYAPI',
    hero_badge3: 'FÄ°NANS & YATIRIM', hero_badge4: 'DÄ°JÄ°TAL DÃNÃÅÃM & YAPAY ZEKA',
    hero_title1: 'YakÄ±n Ä°nÅaat',
    hero_title2: 'YakÄ±n Enerji',
    hero_title3: 'YakÄ±n Capital', hero_title4: 'YakÄ±n Teknoloji',
    hero_desc1: 'Veri merkezleri, endÃ¼striyel tesisler ve aÄÄ±r mÃ¼hendislik taahhÃ¼t projelerinde kÃ¼resel standartlar.',
    hero_desc2: 'Yenilenebilir Enerji Sistemleri, Veri Merkezi Sistemleri, TelekomÃ¼nikasyon, Siber GÃ¼venlik ÃÃ¶zÃ¼mleri.',
    hero_desc3: 'Proje finansmanÄ± danÄ±ÅmanlÄ±ÄÄ±, yapÄ±landÄ±rma ve yatÄ±rÄ±m Ã§Ã¶zÃ¼mleri platformu.',
    hero_desc4: 'Dijital hakediÅ, yapay zekÃ¢, BIM entegrasyonu ve ileri seviye proje yÃ¶netim platformu.',
    btn_explore: 'KeÅfet', btn_view_details: 'DetaylÄ± Ä°ncele',
    btn_vcard_download: 'Kartviziti Ä°ndir (.vcf)', btn_vcard_share: 'PaylaÅ',
    btn_market_register: 'Bekleme Listesine KatÄ±l', btn_market_browse: 'KataloÄu Ä°ncele',
    btn_market_join: 'Beni Listeye Ekle', btn_send: 'MesajÄ± GÃ¶nder',
    btn_presentation_tr: 'YatÄ±rÄ±mcÄ± Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'YakÄ±n Grup Holding',
    group_lead: 'Proje mÃ¼ÅavirliÄi ve proje geliÅtirme grubu olarak inÅaat, enerji, finansman ve teknoloji sektÃ¶rlerinde uÃ§tan uca Ã§Ã¶zÃ¼mler sunuyoruz.',
    group_body: 'EndÃ¼striyel vizyonumuz ve mÃ¼hendislik alanlarÄ±ndaki tecrÃ¼bemiz ile yapÄ± ve enerjiye baÄlÄ± sektÃ¶rlerde teknik sÄ±nÄ±rlarÄ± Ã§iziyoruz.',
    stat_years: 'YILLIK TECRÃBE', stat_area: 'mÂ² Ä°nÅaat AlanÄ±',
    stat_mw: 'MW Kurulu GÃ¼Ã§', stat_companies: 'Grup Åirketi',
    stat_mw_full: 'MW Toplam Kurulu GÃ¼Ã§', stat_co2: 'Ton COâ AzaltÄ±mÄ±',
    stat_scada: 'AkÄ±llÄ± SCADA Ä°zleme', stat_services: 'MÃ¼hendislik BranÅÄ±',
    iso_heading: 'ULUSLARARASI ISO SERTÄ°FÄ°KALARI', iso_sub: 'Entegre Kalite & GÃ¼venlik YÃ¶netim Sistemleri',
    c_title: 'YakÄ±n Ä°nÅaat',
    c_desc: 'Veri merkezlerinden konut ve sanayi yapÄ±larÄ±na kadar her projede Ã¼stÃ¼n kalite, dayanÄ±klÄ±lÄ±k ve sÃ¼rdÃ¼rÃ¼lebilir yÃ¶ntemler.',
    c_services_title: 'EndÃ¼striyel Ä°nÅaat ÃÃ¶zÃ¼mlerimiz',
    c_s1_title: 'Veri Merkezi Ä°nÅaatÄ±', c_s1_desc: 'Tier III ve Tier IV sertifikalÄ±, yÃ¼ksek gÃ¼venilirlikli mission-critical veri merkezleri.',
    c_s2_title: 'AÄÄ±r Sanayi Tesisleri', c_s2_desc: 'Fabrikalar, dÃ¶kÃ¼mhaneler ve enerji Ã¼retim santrallerinde anahtar teslim taahhÃ¼t.',
    c_s3_title: 'Konut & YaÅam Projeleri', c_s3_desc: 'Modern mimari ve ileri mÃ¼hendislikle tasarlanan lÃ¼ks yaÅam kompleksleri.',
    c_s4_title: 'YapÄ± MÃ¼hendisliÄi & BIM', c_s4_desc: 'Ä°leri seviye deprem mÃ¼hendisliÄi, BIM entegrasyonu ve teknik projelendirme.',
    c_s5_title: 'HavalimanÄ± & UlaÅÄ±m', c_s5_desc: 'UluslararasÄ± standartlarda havalimanÄ± terminalleri ve ulaÅÄ±m altyapÄ±sÄ±.',
    c_s6_title: 'Kentsel DÃ¶nÃ¼ÅÃ¼m', c_s6_desc: 'Riskli yapÄ±larÄ±n tespiti, gÃ¼Ã§lendirilmesi ve dÃ¶nÃ¼ÅÃ¼m projelerinde uÃ§tan uca yÃ¶netim.',
    btn_service_details: 'Detaylar & vCard Ä°rtibat âº',
    portfolio_title: 'Tamamlanan Referans Projelerimiz',
    c_gal1_title: 'T-3 Veri Merkezi YapÄ±mÄ±', c_gal2_title: 'UluslararasÄ± HavalimanÄ± Terminali',
    c_gal3_title: 'Vadi KonaklarÄ± YaÅam Kompleksi', c_gal4_title: 'YapÄ± GÃ¼Ã§lendirme & BIM TasarÄ±mÄ±',
    e_title: 'YakÄ±n Enerji',
    e_services_title: 'EndÃ¼striyel ÃÃ¶zÃ¼m ve Hizmetler',
    e_desc: 'Yenilenebilir Enerji Sistemleri, Veri Merkezi Sistemleri, TelekomÃ¼nikasyon, Siber GÃ¼venlik ÃÃ¶zÃ¼mleri.',
    cap_desc: 'YakÄ±n Capital, grubumuzun projelerini uÃ§tan uca geliÅtiren, finansman Ã§Ã¶zÃ¼mleri Ã¼reten bir danÄ±ÅmanlÄ±k ve yatÄ±rÄ±m platformudur.',
    cap_heading: 'Ãok Disiplinli Finansman YapÄ±landÄ±rmasÄ±',
    cap_body: 'Projelerin finansmanÄ±nÄ± organize etmek, riskleri yÃ¶netmek ve sÃ¼rdÃ¼rÃ¼lebilir nakit akÄ±Å modelleri oluÅturmak temel vizyonumuzdur.',
    cap_legal: '* YakÄ±n Capital, lisans gerektiren portfÃ¶y yÃ¶netimi veya finansal aracÄ±lÄ±k faaliyetleri yÃ¼rÃ¼tmez.',
    tech_desc: 'AÄÄ±r sanayi, enerji ve altyapÄ± projelerini ileri teknoloji ile uÃ§tan uca dijitalleÅtiriyoruz.',
    tech_heading: 'GeleceÄin Proje YÃ¶netimi',
    tech_sub: 'YakÄ±n Platform ile tÃ¼m mÃ¼hendislik, satÄ±nalma ve saha koordinasyonunu tek ekrana taÅÄ±yoruz.',
    partners_title: 'Teknoloji Ä°Å OrtaklarÄ±mÄ±z',
    partners_subtitle: 'DÃ¼nya devleri ile uluslararasÄ± standartlarda sistem entegrasyonu saÄlÄ±yoruz.',
    market_heading: 'YakÄ±n Grup Online Marketplace',
    market_sub: 'EndÃ¼striyel ekipman tedariki ve enerji & bilgi teknolojileri Ã¼rÃ¼nlerine eriÅimde hÄ±zlÄ± dijital altyapÄ±.',
    badge_soon: 'ÃOK YAKINDA',
    contact_title: 'Bizimle Ä°letiÅime GeÃ§in',
    contact_desc: 'Projeleriniz veya danÄ±ÅmanlÄ±k ihtiyaÃ§larÄ±nÄ±z iÃ§in ekibimiz 7/24 hazÄ±rdÄ±r.',
    contact_lbl_loc: 'Merkez Ofis', contact_lbl_phone: 'Telefon', contact_lbl_mail: 'E-posta',
    vcard_list_title: 'Kurumsal Ä°rtibat NoktalarÄ±',
    contact_form_title: 'HaberleÅme Formu',
    lbl_form_name: 'AdÄ±nÄ±z SoyadÄ±nÄ±z / Firma', lbl_form_email: 'E-posta Adresiniz',
    lbl_form_phone: 'Telefon NumaranÄ±z', lbl_form_sector: 'Ä°lgili Birim / SektÃ¶r',
    lbl_form_msg: 'MesajÄ±nÄ±z', lbl_form_type: 'MÃ¼Återi TÃ¼rÃ¼',
    btn_presentation_tr: 'YatÄ±rÄ±mcÄ± Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    vc_ilker_title: 'YÃ¶netim Kurulu BaÅkanÄ± / CxO (MÃ¼hendis)',
    vc_eylul_title: 'YÃ¶netim Kurulu BaÅkanÄ± / CEO (Mimar)',
    field_phone: 'Telefon', field_email: 'E-posta', field_office: 'Ofis Adresi',
    market_dialog_title: 'YakÄ±n Grup Marketplace EriÅimi',
    market_dialog_desc: 'Hizmet vermeye baÅlayacaÄÄ±mÄ±z maÄaza altyapÄ±mÄ±z iÃ§in erken eriÅim baÅvurusu.',
    market_b2b_opt: 'Kurumsal / B2B Bayi AlÄ±cÄ±sÄ±', market_b2c_opt: 'Bireysel / B2C SatÄ±Å Talebi',
    market_kvkk_note: 'KVKK Ä°letiÅim izni ÅartlarÄ±nÄ± okudum ve kabul ediyorum.',
    footer_tagline: 'MÃ¼hendislik temelli yaklaÅÄ±mlarla altyapÄ± ve enerjinin birleÅimi.',
    footer_col_services: 'SektÃ¶r ÃÃ¶zÃ¼mleri', footer_col_corporate: 'Kurumsal Bilgiler', footer_col_legal: 'Yasal Mevzuat',
    footer_kvkk: 'KVKK AydÄ±nlatma Metni', footer_cookies: 'Ãerez PolitikasÄ±', footer_terms: 'KullanÄ±m ÅartlarÄ±',
    footer_presentation: 'YatÄ±rÄ±mcÄ± Sunumu',
    tag_construction_short: 'YakÄ±n Ä°nÅaat', tag_energy_short: 'YakÄ±n Enerji',
    footer_lic_note: 'Marka logolarÄ± tanÄ±tÄ±m amaÃ§lÄ± olup mÃ¼lkiyet haklarÄ± yetkili tescil sahiplerine aittir.',
    nav_partners: 'Ä°Å OrtaklarÄ±mÄ±z', nav_marketplace: 'Marketplace',
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
    cluster_a_label: 'Renewable Energy Systems', cluster_em_label: 'ELECTRICAL & MECHANICAL CONTRACTING', cluster_b_label: 'Data Center Systems', cluster_telecom_label: 'Telecommunications', cluster_cyber_label: 'Cybersecurity Solutions',
    hero_badge1: 'CONSTRUCTION & EPC', hero_badge2: 'ENERGY & INFRASTRUCTURE',
    hero_badge3: 'FINANCE & INVESTMENT', hero_badge4: 'DIGITAL TRANSFORMATION & AI',
    hero_title1: 'YakÄ±n Construction',
    hero_title2: 'YakÄ±n Energy',
    hero_title3: 'YakÄ±n Capital', hero_title4: 'YakÄ±n Technology',
    hero_desc1: 'Global standards in data center construction, industrial facilities and heavy engineering projects.',
    hero_desc2: 'Renewable Energy Systems, Data Center Systems, Telecommunications, Cybersecurity Solutions.',
    hero_desc3: 'Project financing advisory, structuring and investment solutions platform.',
    hero_desc4: 'Digital progress payments, AI, BIM integration and advanced project management platform.',
    btn_explore: 'Explore', btn_view_details: 'View Details',
    btn_vcard_download: 'Download Business Card (.vcf)', btn_vcard_share: 'Share',
    btn_market_register: 'Join Waitlist', btn_market_browse: 'Browse Catalogue',
    btn_market_join: 'Add Me to the List', btn_send: 'Send Message',
    btn_presentation_tr: 'Investor Presentation (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'YakÄ±n Group Holding',
    group_lead: 'As a project consultancy and development group, we offer end-to-end solutions in construction, energy, finance and technology sectors.',
    group_body: 'With our industrial vision and experience in engineering fields, we set the technical boundaries in sectors related to construction and energy.',
    stat_years: 'YEARS OF EXPERIENCE', stat_area: 'mÂ² Construction Area',
    stat_mw: 'MW Installed Capacity', stat_companies: 'Group Companies',
    stat_mw_full: 'MW Total Installed Capacity', stat_co2: 'Tons COâ Reduction',
    stat_scada: 'Smart SCADA Monitoring', stat_services: 'Engineering Branches',
    iso_heading: 'INTERNATIONAL ISO CERTIFICATIONS', iso_sub: 'Integrated Quality & Security Management Systems',
    c_title: 'YakÄ±n Construction',
    c_desc: 'Superior quality, durability and sustainable methods in every project from data centers to residential and industrial buildings.',
    c_services_title: 'Industrial Construction Solutions',
    c_s1_title: 'Data Center Construction', c_s1_desc: 'Tier III and IV certified, high-reliability mission-critical data centers.',
    c_s2_title: 'Heavy Industry Facilities', c_s2_desc: 'Turnkey EPC for factories, foundries and energy generation plants.',
    c_s3_title: 'Residential & Living Projects', c_s3_desc: 'Luxury living complexes designed with modern architecture and advanced engineering.',
    c_s4_title: 'Structural Engineering & BIM', c_s4_desc: 'Advanced seismic engineering, BIM integration and comprehensive technical design.',
    c_s5_title: 'Airport & Transportation', c_s5_desc: 'International standard airport terminals and transportation infrastructure projects.',
    c_s6_title: 'Urban Renewal', c_s6_desc: 'End-to-end management of identifying, strengthening and transforming at-risk buildings.',
    btn_service_details: 'Details & vCard Contact âº',
    portfolio_title: 'Our Completed Reference Projects',
    c_gal1_title: 'T-3 Data Center Construction', c_gal2_title: 'International Airport Terminal',
    c_gal3_title: 'Vadi Mansions Living Complex', c_gal4_title: 'Structural Retrofitting & BIM Design',
    e_title: 'YakÄ±n Energy',
    e_services_title: 'Industrial Solutions & Services',
    e_desc: 'Renewable Energy Systems, Data Center Systems, Telecommunication, Cybersecurity Solutions.',
    cap_desc: 'YakÄ±n Capital is an advisory and investment platform that develops group projects end-to-end and creates financing solutions.',
    cap_heading: 'Multi-Disciplinary Finance Structuring',
    cap_body: 'Our vision is not only to develop construction and energy projects, but also to organize their financing, manage risks and create sustainable cash flow models.',
    cap_legal: '* YakÄ±n Capital does not conduct portfolio management or financial brokerage activities requiring licenses.',
    tech_desc: 'We digitize heavy industry, energy and infrastructure projects end-to-end with advanced technology.',
    tech_heading: 'Next-Gen Project Management',
    tech_sub: 'With YakÄ±n Platform, all engineering, procurement and field coordination in one screen.',
    partners_title: 'Technology Partners',
    partners_subtitle: 'System integration at international standards with global industry leaders.',
    market_heading: 'YakÄ±n Group Online Marketplace',
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
    market_dialog_title: 'YakÄ±n Group Marketplace Access',
    market_dialog_desc: 'Early access application for our upcoming marketplace infrastructure.',
    market_b2b_opt: 'Corporate / B2B Dealer Buyer', market_b2c_opt: 'Individual / B2C Sales Request',
    market_kvkk_note: 'I have read and accept the GDPR contact permission terms and information form.',
    footer_tagline: 'The intersection of infrastructure and energy through an engineering-led approach.',
    footer_col_services: 'Sector Solutions', footer_col_corporate: 'Corporate Info', footer_col_legal: 'Legal',
    footer_kvkk: 'GDPR Privacy Notice', footer_cookies: 'Cookie Policy', footer_terms: 'Terms of Use',
    footer_presentation: 'Investor Presentation',
    tag_construction_short: 'YakÄ±n Construction', tag_energy_short: 'YakÄ±n Energy',
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

// ââ Hero Slider ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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

// ââ Header scroll ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function initHeader() {
  const header = document.getElementById('main-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ââ Mobile Menu ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function toggleMobileMenu() {
  document.getElementById('nav-links').classList.toggle('active');
}
function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('active');
}
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// ââ Smooth scroll ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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

// ââ Reveal on scroll âââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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

// ââ Service Details Modal ââââââââââââââââââââââââââââââââââââââââââââââââââ
const SERVICES_DATA = {
  c_s1: {
    badge: 'MISSION CRITICAL',
    title: 'Veri Merkezi Ä°nÅaatÄ± (Tier III & Tier IV)',
    cover: 'assets/images/data_center_construction_1785092614608.png',
    desc: 'YÃ¼ksek kullanÄ±labilirlik ve yedeklilik gerektiren veri merkezi inÅaatlarÄ±nda uÃ§tan uca EPC taahhÃ¼t hizmeti sunuyoruz. Sismik izolatÃ¶rlÃ¼ yapÄ± tasarÄ±mlarÄ±, yangÄ±n dayanÄ±mlÄ± kompozit cepheler, N+2 iklimlendirme altyapÄ±sÄ± ve kesintisiz gÃ¼Ã§ sistemleri entegrasyonu.',
    specs: [
      'Tier III / Tier IV Uptime Institute Sertifikasyon HizamasÄ±',
      'Faraday Kafesi ve Elektromanyetik Kalkanlama (EMP Protection)',
      'Hassas Ä°klimlendirme (CRAC/CRAH) & YÃ¼kseltilmiÅ Taban Sistemleri',
      'BMS & SCADA Entegre Fiziksel GÃ¼venlik AltyapÄ±sÄ±'
    ]
  },
  c_s2: {
    badge: 'INDUSTRIAL EPC',
    title: 'AÄÄ±r Sanayi Tesisleri ve Fabrikalar',
    cover: 'assets/images/heavy_industry_clean_1785012805596.png',
    desc: 'AÄÄ±r sanayi dÃ¶kÃ¼mhaneleri, imalat fabrikalarÄ± ve enerji santrallerinde Ã§elik konstrÃ¼ksiyon, aÄÄ±r vinÃ§ yollarÄ±, yÃ¼ksek mukavemetli zemin betonlarÄ± ve altyapÄ± mÃ¼hendisliÄi.',
    specs: [
      'BÃ¼yÃ¼k AÃ§Ä±klÄ±klÄ± EndÃ¼striyel Ãelik ÃatÄ± ve Kolon TasarÄ±mÄ±',
      'AÄÄ±r Ekipman Temelleri ve TitreÅim SÃ¶nÃ¼mleme Sistemleri',
      'EndÃ¼striyel AtÄ±k Su ArÄ±tma & Gaz Tahliye Boru HatlarÄ±',
      'UluslararasÄ± Ä°Å GÃ¼venliÄi & ISO 9001 / 14001 StandartlarÄ±'
    ]
  },
  c_s3: {
    badge: 'LUXURY RESIDENTIAL',
    title: 'Konut & YaÅam Projeleri',
    cover: 'assets/images/residential_luxury_project_1785010053703.png',
    desc: 'Estetik mimari, yÃ¼ksek enerji verimliliÄi ve akÄ±llÄ± ev teknolojileri ile donatÄ±lmÄ±Å lÃ¼ks konut kompleksleri ve karma yaÅam merkezleri.',
    specs: [
      'A+ Enerji Kimlik SertifikalÄ± Ãevreci Binalar',
      'AkÄ±llÄ± Bina Otomasyonu (BMS) ve Merkezi Ä°klimlendirme',
      'Ses & IsÄ± Ä°zolasyonunda Ãst Seviye Konfor DetaylarÄ±',
      'Sosyal Tesisler, KapalÄ± Otopark ve YeÅil Alan Mimarisi'
    ]
  },
  c_s4: {
    badge: '5D BIM & SEISMIC',
    title: 'YapÄ± MÃ¼hendisliÄi, Deprem & BIM TasarÄ±mÄ±',
    cover: 'assets/images/civil_engineering_bim_1785010076530.png',
    desc: 'Ä°leri dÃ¼zey performans bazlÄ± deprem mÃ¼hendisliÄi, sismik gÃ¼Ã§lendirme ve 5D BIM (Building Information Modeling) sÃ¼reÃ§ yÃ¶netimi.',
    specs: [
      '5D BIM Modeli ile ÃakÄ±Åma Analizi ve Maliyet YÃ¶netimi',
      'Sismik Ä°zolatÃ¶r ve Damperli YapÄ± TasarÄ±mlarÄ±',
      'Non-Linear Zaman TanÄ±m AlanÄ±nda Deprem Analizleri',
      'Mevzuat Uyumlu Statik Raporlama ve Proje Onay SÃ¼reÃ§leri'
    ]
  },
  c_s5: {
    badge: 'INFRASTRUCTURE',
    title: 'HavalimanÄ± & UlaÅÄ±m AltyapÄ±sÄ±',
    cover: 'assets/images/construction_hero_1784577666966.png',
    desc: 'UluslararasÄ± standartlarda havalimanÄ± terminal binalarÄ±, pist aÄÄ±r altyapÄ±larÄ±, taksi yollarÄ± ve hÄ±zlÄ± ulaÅÄ±m entegrasyon projeleri.',
    specs: [
      'ICAO & FAA StandartlarÄ±nda Terminal ve Apron Ä°nÅaatÄ±',
      'Ãzel YÃ¼ksek DayanÄ±mlÄ± Asfalt ve Beton Pist KaplamalarÄ±',
      'Yolcu Bagaj Entegrasyon (BHS) ve GÃ¼venlik AltyapÄ±larÄ±',
      'Kesintisiz Hava Trafik Kontrol Kule YapÄ±larÄ±'
    ]
  },
  c_s6: {
    badge: 'RETROFITTING',
    title: 'Kentsel DÃ¶nÃ¼ÅÃ¼m & YapÄ± GÃ¼Ã§lendirme',
    cover: 'assets/images/gallery_seismic_retrofitting_1785092947617.png',
    desc: 'Mevcut riskli yapÄ±larÄ±n sismik incelemesi, karbon elyaf (FRP), Ã§elik manto ve betonarme gÃ¼Ã§lendirme projeleri ile kentsel dÃ¶nÃ¼ÅÃ¼m danÄ±ÅmanlÄ±ÄÄ±.',
    specs: [
      'Karbon Fiber (CFRP) ve Ãelik Manto ile Deprem GÃ¼Ã§lendirme',
      'Karot ve Sismik Testler ile Binasal Risk Analizi Raporlama',
      'Hukuki ve Teknik Kentsel DÃ¶nÃ¼ÅÃ¼m DanÄ±ÅmanlÄ±ÄÄ±',
      'SÄ±fÄ±r Hata ile Bina Yenileme ve Projelendirme'
    ]
  },
  // Enerji KÃ¼me A
  e_s1: {
    badge: 'SOLAR & BIPV',
    title: 'GÃ¼neÅ Enerjisi Sistemleri (GES) & BIPV',
    cover: 'assets/images/solar_rooftop_epc_user2.jpg',
    desc: 'Arazi ve Ã§atÄ± tipi GES EPC projeleri ile dÄ±Å cephe fotovoltaik cephe kaplama ve akÄ±llÄ± fotovoltaik cam sistemleri (BIPV) entegrasyonu.',
    specs: [
      'BIPV (Building Integrated Photovoltaics) Cephe ve Cam Entegrasyonu',
      'EndÃ¼striyel ÃatÄ± ve Arazi Tipi GES Anahtar Teslim EPC',
      'YÃ¼ksek Verimli Monokristal & Bifacial Panel Teknolojileri',
      'Åebeke BaÄlantÄ±lÄ± (On-Grid) & Hibrit Ä°nvertÃ¶r Sistemleri'
    ],
    slides: [
      {
        title: 'BIPV (Building Integrated Photovoltaics) Cephe ve Cam Entegrasyonu',
        desc: 'BinalarÄ±n dÄ±Å cephelerine, giydirme cam sistemlerine ve Ã§atÄ± pencerelerine estetik fotovoltaik panel entegrasyonu. YapÄ± kabuÄunu aktif elektrik Ã¼reten Ã§evreci bir enerji kaynaÄÄ±na dÃ¶nÃ¼ÅtÃ¼rÃ¼r.',
        image: 'assets/images/solar_bipv_facade_user.jpg'
      },
      {
        title: 'EndÃ¼striyel ÃatÄ± ve Arazi Tipi GES Anahtar Teslim EPC',
        desc: 'EndÃ¼striyel tesisler, fabrikalar ve yÃ¼ksek kapasiteli arazi GES projeleri iÃ§in mÃ¼hendislik (Engineering), tedarik (Procurement) ve inÅaat (Construction) sÃ¼reÃ§lerinin anahtar teslim yÃ¼rÃ¼tÃ¼lmesi.',
        image: 'assets/images/solar_rooftop_epc_user2.jpg'
      },
      {
        title: 'YÃ¼ksek Verimli Monokristal & Bifacial Panel Teknolojileri',
        desc: 'Ãn ve arka yÃ¼zeyden Ã§ift taraflÄ± Ä±ÅÄ±k yakalama kabiliyetine sahip N-Type TOPCon / HJT Bifacial monokristal paneller ile alan baÅÄ±na maksimum kWh enerji Ã¼retimi.',
        image: 'assets/images/solar_bifacial_panels_user.jpg'
      },
      {
        title: 'Åebeke BaÄlantÄ±lÄ± (On-Grid) & Hibrit Ä°nvertÃ¶r Sistemleri',
        desc: 'Merkezi ve dizi tipi yÃ¼ksek verimli invertÃ¶r sistemleri, enerji depolama uyumlu hibrit invertÃ¶r Ã§Ã¶zÃ¼mleri, akÄ±llÄ± ev otomasyonu, EV Åarj ve SCADA uzaktan izleme entegrasyonu.',
        image: 'assets/images/solar_inverter_system_user.jpg'
      }
    ]
  },
  e_s2: {
    badge: 'WIND POWER',
    title: 'RÃ¼zgar Enerjisi Santrali (RES / WPP) & RÃ¼zgar ÃiftliÄi',
    cover: 'assets/images/wind_farm_cover_user.jpg',
    desc: 'RÃ¼zgar santralleri (WPP) ve rÃ¼zgar Ã§iftliÄi (WF) kurulum, tÃ¼rbin montajÄ±, yÃ¼ksek gerilim Åebeke baÄlantÄ±larÄ± ve saha mÃ¼hendisliÄi.',
    specs: [
      'TÃ¼rbin AltyapÄ±, Temel ve Montaj MÃ¼hendisliÄi',
      'RÃ¼zgar SahasÄ± ÃlÃ§Ã¼m, Verim ve Fizibilite RaporlamasÄ±',
      'Orta / YÃ¼ksek Gerilim Åebeke BaÄlantÄ± AltyapÄ±sÄ±',
      'Periyodik BakÄ±m, OnarÄ±m ve SCADA Entegrasyonu'
    ],
    slides: [
      {
        title: 'TÃ¼rbin AltyapÄ±, Temel ve Montaj MÃ¼hendisliÄi',
        desc: 'AÄÄ±r betonarme dairesel radye tÃ¼rbin temeli dÃ¶kÃ¼mÃ¼, ankraj sepeti montajÄ±, zemin iyileÅtirme ve dev vinÃ§ler ile kule/kanat montaj mÃ¼hendisliÄi.',
        image: 'assets/images/wind_foundation_user.jpg'
      },
      {
        title: 'RÃ¼zgar SahasÄ± ÃlÃ§Ã¼m, Verim ve Fizibilite RaporlamasÄ±',
        desc: 'Mikro-lokasyon rÃ¼zgar haritasÄ± analizi, anemometre Ã¶lÃ§Ã¼m direÄi verileri, WAsP / WindPRO simÃ¼lasyonlarÄ± ve yÄ±llÄ±k P50/P90 Ã¼retim fizibilite raporlarÄ±.',
        image: 'assets/images/wind_measurement_user.jpg'
      },
      {
        title: 'Orta / YÃ¼ksek Gerilim Åebeke BaÄlantÄ± AltyapÄ±sÄ±',
        desc: 'TÃ¼rbin iÃ§i trafo merkezleri, 34.5 kV / 154 kV / 400 kV Åalt sahasÄ± inÅasÄ±, gÃ¼Ã§ transformatÃ¶rleri, yeraltÄ± OG kablolama ve TEÄ°AÅ Åebeke entegrasyonu.',
        image: 'assets/images/wind_substation_user.jpg'
      },
      {
        title: 'Periyodik BakÄ±m, OnarÄ±m ve SCADA Entegrasyonu',
        desc: '7/24 merkezi SCADA izleme ve haberleÅme odasÄ±, kestirimci bakÄ±m, diÅli kutusu/kanat kontrolleri ve canlÄ± tÃ¼rbin verimlilik analizi.',
        image: 'assets/images/wind_scada_user.jpg'
      }
    ]
  },
  e_s3: {
    badge: 'BESS & HYBRID',
    title: 'Batarya Enerji Depolama (BESS) & Hibrit Sistemler',
    cover: 'assets/images/bess_main_cover_user.jpg',
    desc: 'BESS (Battery Energy Storage System), HES/HRES hibrit sistemler, LFP batarya hÃ¼creleri, BMS ve Ã§ift yÃ¶nlÃ¼ PCS gÃ¼Ã§ dÃ¶nÃ¼ÅtÃ¼rÃ¼cÃ¼ler.',
    specs: [
      'BESS Konteyner Tipi Depolama ÃÃ¶zÃ¼mleri (LFP / LiFePO4)',
      'BMS (Battery Management System) ve HÃ¼cre Dengeleme',
      'PCS (Power Conversion System) AC/DC Ãift YÃ¶nlÃ¼ Ãevirici Entegrasyonu',
      'Åebeke YÃ¼k Dengeleme ve Peak Shaving YazÄ±lÄ±m Otomasyonu'
    ],
    slides: [
      {
        title: 'BESS Konteyner Tipi Depolama ÃÃ¶zÃ¼mleri (LFP / LiFePO4)',
        desc: 'Arazi GES sahalarÄ±na entegre edilmiÅ bÃ¼yÃ¼k Ã¶lÃ§ekli hibrit BESS konteyner depolama sistemi. YÃ¼ksek gerilim Åalt sahasÄ± ve rÃ¼zgar tribÃ¼nleri ile tam entegre hibrit enerji Ã§iftliÄi.',
        image: 'assets/images/bess_main_cover_user.jpg'
      },
      {
        title: 'BESS Mimari: Rack, LFP HÃ¼cre, ModÃ¼l & BMS Sistemi',
        desc: 'BESS konteyner iÃ§i sistem mimarisi: Rack, LFP Cell, ModÃ¼l, DC Panel, YangÄ±n SÃ¶ndÃ¼rme Sistemi, ModÃ¼l BMS (BMU), Rack BMS (BCMU), Sistem BMS (BAMS) ve Battery Protection Unit (BPU) bileÅenleri.',
        image: 'assets/images/bess_container_architecture_user.jpg'
      },
      {
        title: 'BMS (Battery Management System) ve HÃ¼cre Dengeleme',
        desc: 'YÃ¼ksek gerilim RBMS kartÄ±; T-CAN/T-485 haberleÅme arayÃ¼zÃ¼, LAN portu, AC giriÅ, kesici koruma, P+/P- UPS/invertÃ¶r baÄlantÄ±sÄ±, BMU-OUT, DC Start ve COM-IN/COM-OUT iletiÅim portlarÄ± ile kapsamlÄ± hÃ¼cre yÃ¶netim ve dengeleme sistemi.',
        image: 'assets/images/bess_bms_interface_user.jpg'
      },
      {
        title: 'PCS (Power Conversion System) AC/DC Ãift YÃ¶nlÃ¼ Ãevirici Entegrasyonu',
        desc: 'GÃ¼neÅ paneli ve rÃ¼zgar tÃ¼rbini ile bÃ¼tÃ¼nleÅik aÃ§Ä±k alanlara kurulu PCS konteyner sistemi; Åarj/deÅarj dÃ¶ngÃ¼sÃ¼nÃ¼ yÃ¶neten Ã§ift yÃ¶nlÃ¼ AC/DC Ã§evirici ve BESS entegrasyonu.',
        image: 'assets/images/bess_pcs_container_user.jpg'
      },
      {
        title: 'Åebeke YÃ¼k Dengeleme ve Peak Shaving YazÄ±lÄ±m Otomasyonu',
        desc: 'PowerON BESS kontrol panosu; Peak Shaving grafiksel gÃ¶sterimi, yÃ¼k dengeleme eÄrileri, akÄ±llÄ± Åebeke otomasyon yazÄ±lÄ±mÄ± ve endÃ¼striyel pano entegrasyonu ile anlÄ±k talep yÃ¶netimi.',
        image: 'assets/images/bess_peak_shaving_user.jpg'
      }
    ]
  },
  e_em1: {
    badge: 'MEP & CONTRACTING',
    title: 'Elektrik & Mekanik TaahhÃ¼t Hizmetleri',
    cover: 'assets/images/energy_em_contracting.jpg',
    desc: 'EndÃ¼striyel Ã¼retim tesisleri, ticari binalar, hastaneler ve veri merkezleri iÃ§in anahtar teslim MEP (Mekanik, Elektrik, Tesisat) taahhÃ¼t ve uygulama Ã§Ã¶zÃ¼mleri.',
    specs: [
      'Anahtar Teslim Elektrik & Mekanik Tesisat TaahhÃ¼dÃ¼',
      'HVAC VRF / VAV Ä°klimlendirme ve Ä°leri HavalandÄ±rma',
      'SÄ±hhi Tesisat, YangÄ±n Koruma ve Borulama AltyapÄ±sÄ±',
      'Projelendirme, SÃ¼reÃ§ YÃ¶netimi ve Devreye Alma (Commissioning)'
    ]
  },
  e_em2: {
    badge: 'LOW VOLTAGE / ELV',
    title: 'ZayÄ±f AkÄ±m ÃÃ¶zÃ¼mleri & AkÄ±llÄ± Bina Otomasyonu',
    cover: 'assets/images/energy_em_elv.jpg',
    desc: 'Bina ve tesis emniyetini Ã¼st dÃ¼zeye Ã§Ä±karan CCTV siber gÃ¼venlik kameralarÄ±, yangÄ±n algÄ±lama, geÃ§iÅ kontrol (Access Control), IP anons ve yapÄ±sal fiber altyapÄ±.',
    specs: [
      'IP CCTV GÃ¼venlik Kamera ve Video Analiz Sistemleri',
      'Adresli YangÄ±n AlgÄ±lama ve Erken UyarÄ± TesisatÄ±',
      'GeÃ§iÅ Kontrol (Access Control), KartlÄ± & Biyometrik GeÃ§iÅ',
      'YapÄ±sal Fiber Kablolama ve Veri Merkezi Network AltyapÄ±sÄ±'
    ]
  },
  e_em3: {
    badge: 'LV SYSTEMS / AG',
    title: 'AlÃ§ak Gerilim Sistemleri (AG) & GÃ¼Ã§ DaÄÄ±tÄ±mÄ±',
    cover: 'assets/images/energy_em_ag.jpg',
    desc: 'AG ana daÄÄ±tÄ±m panolarÄ± (ADP), tali daÄÄ±tÄ±m panolarÄ±, MCC kumanda merkezleri, Otomatik Reaktif GÃ¼Ã§ Kompanzasyonu ve Kesintisiz GÃ¼Ã§ KaynaÄÄ± (UPS) kurulumlarÄ±.',
    specs: [
      'AG Ana DaÄÄ±tÄ±m ve Tali DaÄÄ±tÄ±m PanolarÄ± (Form 4b StandardÄ±)',
      'Motor Kontrol Merkezleri (MCC) ve SÃ¼rÃ¼cÃ¼ PanolarÄ±',
      'Busbar Enerji DaÄÄ±tÄ±m HatlarÄ± ve Kablo TaÅÄ±ma Sistemleri',
      'Aktif / Pasif Harmonik Filtreli Kompanzasyon PanolarÄ±'
    ]
  },
  e_em4: {
    badge: 'MV SYSTEMS / OG',
    title: 'Orta Gerilim Sistemleri (OG) & Åalt Tesisleri',
    cover: 'assets/images/energy_em_og.jpg',
    desc: '36 kV Orta Gerilim hÃ¼cresel Åalt merkezleri, SF6 gazlÄ± / hava yalÄ±tÄ±mlÄ± modÃ¼ler hÃ¼creler, kuru ve yaÄlÄ± tip trafo kurulumlarÄ± ve OG Åebeke entegrasyonu.',
    specs: [
      '36 kV OG HÃ¼cresel Åalt Tesisleri & Metal-Clad HÃ¼creler',
      'YaÄlÄ± ve Kuru Tipi DaÄÄ±tÄ±m TrafolarÄ± (100 kVA - 10 MVA)',
      'MikroiÅlemcili Dijital Koruma RÃ¶leleri ve Testleri',
      'OG YeraltÄ± Kablo TesisatÄ± ve YÃ¼ksek Gerilim Ä°letim HatlarÄ±'
    ]
  },
  e_em5: {
    badge: 'ENGINEERING & APPROVAL',
    title: 'Proje MÃ¼hendislik & Onay Hizmetleri',
    cover: 'assets/images/energy_em_engineering.jpg',
    desc: 'Elektrik DaÄÄ±tÄ±m Åirketleri (TEDAÅ, EDAÅ) resmi proje onaylarÄ±, rÃ¶le koordinasyon hesaplamalarÄ±, kÄ±sa devre analizleri ve kabul/ruhsat sÃ¼reÃ§ danÄ±ÅmanlÄ±ÄÄ±.',
    specs: [
      'TEDAÅ / EDAÅ Elektrik Proje Ãizimi ve Resmi Onay SÃ¼reÃ§leri',
      'KÄ±sa Devre, YÃ¼k AkÄ±ÅÄ± ve Gerilim DÃ¼ÅÃ¼mÃ¼ HesaplamalarÄ±',
      'Dijital Koruma RÃ¶lesi Selektivite ve Koordinasyon Analizleri',
      'GeÃ§ici Kabul, Tesis RuhsatÄ± ve MÃ¼Åavirlik DanÄ±ÅmanlÄ±k Hizmetleri'
    ]
  },
  e_em6: {
    badge: 'HV SYSTEMS / YG',
    title: 'YÃ¼ksek Gerilim Sistemleri (YG) & Åalt SahalarÄ±',
    cover: 'assets/images/energy_em_yg.jpg',
    desc: '154 kV / 380 kV YÃ¼ksek Gerilim (YG) indirici ve Åalt trafo merkezleri, yÃ¼ksek gerilim enerji iletim hatlarÄ±, kesiciler, ayÄ±rÄ±cÄ±lar ve rÃ¶le otomasyon altyapÄ±larÄ±.',
    specs: [
      '154 kV & 380 kV YÃ¼ksek Gerilim (YG) Trafo Merkezleri & Åalt SahasÄ±',
      'YÃ¼ksek Gerilim Enerji Ä°letim HatlarÄ± ve Direk TesisatÄ±',
      'SF6 GazlÄ± YG Kesiciler, DÃ¶ner / DÃ¼Åey AyÄ±rÄ±cÄ±lar ve AkÄ±m-Gerilim TrafolarÄ±',
      'TEÄ°AÅ BaÄlantÄ± ve Ä°letim AnlaÅmasÄ± Uyumlu Koruma & SCADA Otomasyonu'
    ]
  },
  e_t1: {
    badge: 'TELECOM / MAINTENANCE',
    title: 'BakÄ±m ÃÃ¶zÃ¼m Hizmetleri',
    cover: 'assets/images/telecom_maintenance.jpg',
    desc: 'Sabit ve mobil aÄlarÄ±n 7/24 Ã¶nleyici ve dÃ¼zeltici bakÄ±mÄ±, saha mÃ¼dahale ekipleri ve servis dÃ¼zeyi anlaÅmalarÄ± (SLA) yÃ¶netimi.',
    specs: [
      '7/24 Saha MÃ¼dahale ve ArÄ±za Giderme Ekipleri',
      'Ãnleyici BakÄ±m PlanlarÄ± ve Periyodik Kontrol ProgramlarÄ±',
      'Servis DÃ¼zeyi AnlaÅmasÄ± (SLA) YÃ¶netimi ve Raporlama',
      'Yedek ParÃ§a Depo YÃ¶netimi ve Lojistik Destek'
    ]
  },
  e_t2: {
    badge: 'TELECOM / 5G',
    title: '5G AltyapÄ± & Kurulum',
    cover: 'assets/images/telecom_5g.jpg',
    desc: '5G NR (New Radio) aktif donanÄ±m kurulumu, anten entegrasyonu, kÃ¼Ã§Ã¼k hÃ¼cre (Small Cell) ve 5G aÄ optimizasyon hizmetleri.',
    specs: [
      '5G NR Aktif DonanÄ±m (gNodeB) Mekanik MontajÄ± ve Kurulumu',
      'Massive MIMO Anten & RU Entegrasyonu ve HizalamasÄ±',
      'KÃ¼Ã§Ã¼k HÃ¼cre (Small Cell) ve O-RAN Mimarisi KurulumlarÄ±',
      '5G SA/NSA Åebeke Optimizasyonu ve KPI Analizi'
    ]
  },
  e_t3: {
    badge: 'TELECOM / IBS',
    title: 'IBS / Bina Ä°Ã§i Kapsama',
    cover: 'assets/images/telecom_ibs.jpg',
    desc: 'AVM, hastane, havalimanÄ± ve rezidanslarda In-Building Solution (IBS) tasarÄ±m ve kurulum; pasif/aktif DAS sistemleri.',
    specs: [
      'Pasif DAS (Distributed Antenna System) TasarÄ±m ve Kurulumu',
      'Aktif DAS & Small Cell Ä°le YÃ¼ksek Kapasiteli KapalÄ± Alan Kapsama',
      'HavalimanÄ±, TÃ¼nel ve Metro Bina Ä°Ã§i Kapsama Projeleri',
      'RF Kapsama ÃlÃ§Ã¼mleri, Drive Test ve Optimizasyon RaporlarÄ±'
    ]
  },
  e_t4: {
    badge: 'TELECOM / COW',
    title: 'Mobil Baz Ä°stasyonu (COW)',
    cover: 'assets/images/telecom_cow.jpg',
    desc: 'GeÃ§ici kapsama gerektiren etkinlik, afet ve acil alanlar iÃ§in Cell on Wheels (COW) mobil baz istasyonu Ã§Ã¶zÃ¼mleri.',
    specs: [
      'COW (Cell on Wheels) AraÃ§ ÃstÃ¼ Mobil Baz Ä°stasyonu Kurulumu',
      'BÃ¼yÃ¼k Organizasyon & Etkinlikler iÃ§in GeÃ§ici Kapsama ÃÃ¶zÃ¼mleri',
      'DoÄal Afet ve Acil Durum SahalarÄ± iÃ§in HÄ±zlÄ± Devreye Alma',
      'GÃ¼neÅ Enerjisi ve JeneratÃ¶r Destekli Off-Grid COW Sistemleri'
    ]
  },
  e_t5: {
    badge: 'TELECOM / TETRA',
    title: 'TETRA Dijital Trunking HaberleÅme',
    cover: 'assets/images/telecom_tetra.jpg',
    desc: 'Polis, jandarma, itfaiye ve kamu gÃ¼venliÄi birimleri iÃ§in TETRA (Terrestrial Trunked Radio) dijital trunking telsiz sistemi kurulum ve entegrasyonu.',
    specs: [
      'TETRA AltyapÄ± (Base Station, BSC, Dispatcher) Kurulumu',
      'El Telsizi, AraÃ§ Telsizi ve AÄ YÃ¶netim Sistemi Entegrasyonu',
      'Åifreli HaberleÅme ve Ãncelikli Kanal YÃ¶netimi',
      'Kamu GÃ¼venliÄi ve Kritik AltyapÄ± TETRA AÄ TasarÄ±mÄ±'
    ]
  },
  e_t6: {
    badge: 'TELECOM / DPO',
    title: 'DPO â Dizayn, Planlama, Optimizasyon',
    cover: 'assets/images/telecom_dpo.jpg',
    desc: 'AÄ altyapÄ±sÄ± dizayn, RF planlama, frekans koordinasyonu, kapsama analizleri ve Åebeke optimizasyon hizmetleri.',
    specs: [
      'RF Kapsama & Kapasite Planlama ve Frekans Koordinasyonu',
      'AÄ AltyapÄ±sÄ± Mimari Dizayn ve Teknik Åartname HazÄ±rlama',
      'Drive Test, Walk Test ve Sinyal ÃlÃ§Ã¼m KampanyalarÄ±',
      'KPI Analizi ve Åebeke Performans Optimizasyonu RaporlarÄ±'
    ]
  },
  e_t7: {
    badge: 'TELECOM / WDM',
    title: 'WDM â Dalga Boyu Ãoklama Sistemleri',
    cover: 'assets/images/telecom_wdm.jpg',
    desc: 'DWDM ve CWDM optik iletim sistemleri kurulumu, kapasite artÄ±rÄ±mÄ± ve metro/uzun mesafe fiber optik aÄ altyapÄ± Ã§Ã¶zÃ¼mleri.',
    specs: [
      'DWDM/CWDM Optik Multiplexer & OADM Kurulumu',
      'Fiber Optik Omurga Kapasite ArtÄ±rÄ±mÄ± ve GeniÅletme',
      'Metro Ethernet ve Uzun Mesafe WDM AÄ TasarÄ±mÄ±',
      'OTDR & Optik GÃ¼Ã§ ÃlÃ§Ã¼mÃ¼ ile BaÄlantÄ± Testi & Sertifikasyon'
    ]
  },
  e_t8: {
    badge: 'TELECOM / FTTX',
    title: 'FTTX â Fiber to the X AltyapÄ±sÄ±',
    cover: 'assets/images/telecom_fttx.jpg',
    desc: 'FTTH, FTTB ve FTTC fiber abone baÄlantÄ±sÄ± altyapÄ± tasarÄ±mÄ±, dÃ¶Åeme, fiber daÄÄ±tÄ±m kutusu ve ONU/ONT kurulumlarÄ±.',
    specs: [
      'FTTH (Fiber to the Home) Abone Hat TasarÄ±mÄ± ve DÃ¶Åemesi',
      'Fiber DaÄÄ±tÄ±m KutularÄ± (FDP/FDB) ve Splitter Kurulumu',
      'ONU / ONT / OLT DonanÄ±m Entegrasyonu ve Aktivasyonu',
      'Servis Aktivasyon, Test ve MÃ¼Återi Kabul RaporlamasÄ±'
    ]
  },
  e_t9: {
    badge: 'TELECOM / CONSTRUCTION',
    title: 'Telekom Ä°nÅaat Ä°Åleri',
    cover: 'assets/images/telecom_construction.jpg',
    desc: 'Baz istasyonu kule ve direk imalatÄ±, montajÄ±, YASS/ÅehiriÃ§i kanallar, boru dÃ¶Åeme ve zemin sondajlÄ± yeraltÄ± kablo hatlarÄ±.',
    specs: [
      'Telekom Kule & Direk Ä°malat, Zemin EtÃ¼dÃ¼ ve MontajÄ±',
      'YeraltÄ± Boru ve Kablo KanalÄ± (Trench) DÃ¶Åeme Ä°Åleri',
      'Beton Kablo KanalÄ± ve Menhol YapÄ±m ve Tamamlama Ä°Åleri',
      'YASS (Yol AltÄ± AltyapÄ±) & Belediye Ä°zin SÃ¼reÃ§ YÃ¶netimi'
    ]
  },
  e_t10: {
    badge: 'TELECOM / AUDIT',
    title: 'Denetim Hizmetleri',
    cover: 'assets/images/telecom_audit.jpg',
    desc: 'Telekom altyapÄ±sÄ± saha denetimi, teknik uyumluluk raporlamasÄ±, kalite gÃ¼vence (QA) testleri ve baÄÄ±msÄ±z proje yÃ¶netimi.',
    specs: [
      'Saha Denetimi ve Teknik Uyumluluk Kontrol RaporlarÄ±',
      'Kalite GÃ¼vence (QA) Testleri ve Kabul Protokolleri',
      'BaÄÄ±msÄ±z Proje YÃ¶netimi (PMO) ve Milestone Takibi',
      'OperatÃ¶r ve YÃ¼klenici Performans DeÄerlendirme RaporlarÄ±'
    ]
  },
  e_t11: {
    badge: 'TELECOM / LV',
    title: 'LV â AlÃ§ak Gerilim GÃ¼Ã§ Beslemeleri',
    cover: 'assets/images/telecom_lv.jpg',
    desc: 'Telekom tesisleri ve baz istasyonlarÄ±na yÃ¶nelik AG gÃ¼Ã§ panosu, acil jeneratÃ¶r baÄlantÄ±sÄ± ve kesintisiz gÃ¼Ã§ besleme (UPS) sistemleri.',
    specs: [
      'Baz Ä°stasyonu AC/DC GÃ¼Ã§ AltyapÄ±sÄ± ve Pano Kurulumu',
      'UPS Kesintisiz GÃ¼Ã§ KaynaÄÄ± Kurulumu ve AkÃ¼ GruplarÄ±',
      'JeneratÃ¶r BaÄlantÄ±sÄ± ve Otomatik Transfer Åalter (ATS)',
      'Enerji VerimliliÄi Analizi ve GÃ¼Ã§ YÃ¶netim Sistemleri'
    ]
  },
  e_c1: {
    badge: 'CYBERSECURITY / SOC',
    title: 'IT / OT Siber GÃ¼venlik & SOC Hizmetleri',
    cover: 'assets/images/energy_cybersecurity_soc.jpg',
    desc: '7/24 kesintisiz tehdit izleme, siber olaylara mÃ¼dahale, log analizi, SIEM entegrasyonu ve IT/OT endÃ¼striyel kontrol sistemleri aÄ gÃ¼venliÄi Ã§Ã¶zÃ¼mleri.',
    specs: [
      '7/24 SIEM / SOC GÃ¼venlik Tehdit Ä°zleme ve Analizi',
      'EndÃ¼striyel Kontrol Sistemleri (ICS / OT) Siber GÃ¼venlik DuvarÄ±',
      'Log YÃ¶netimi, Korelasyon ve KVKK 5651 SayÄ±lÄ± Kanun Uyumu',
      'Tehdit Ä°stihbaratÄ± ve Siber Olaylara MÃ¼dahale (Incident Response)'
    ]
  },
  e_c2: {
    badge: 'CYBERSECURITY / PENTEST',
    title: 'SÄ±zma Testleri & GÃ¼venlik Denetimi',
    cover: 'assets/images/energy_ref_soc_cyber.jpg',
    desc: 'Sistem odasÄ±, aÄ altyapÄ±sÄ±, web uygulamalarÄ± ve kablosuz aÄlar iÃ§in sÄ±zma testleri (Pentest), zafiyet tarama analizleri ve sosyal mÃ¼hendislik testleri.',
    specs: [
      'AÄ (Network) ve Sunucu AltyapÄ±sÄ± SÄ±zma Testleri',
      'Web ve Mobil Uygulama Zafiyet Tarama ve GÃ¼venlik Testi',
      'Sosyal MÃ¼hendislik, Oltalama (Phishing) SimÃ¼lasyon Testleri',
      'Zafiyet Analiz Raporlama ve GÃ¼venlik SÄ±kÄ±laÅtÄ±rma (Hardening)'
    ]
  },
  e_c3: {
    badge: 'COMPLIANCE / KVKK',
    title: 'Uyum & Siber GÃ¼venlik StandartlarÄ± DanÄ±ÅmanlÄ±ÄÄ±',
    cover: 'assets/images/energy_regulation_advisory.jpg',
    desc: 'ISO 27001 Bilgi GÃ¼venliÄi YÃ¶netim Sistemi, IEC 62443 endÃ¼striyel siber gÃ¼venlik standart uyumu ve KVKK/GDPR kiÅisel veri koruma danÄ±ÅmanlÄ±ÄÄ±.',
    specs: [
      'ISO 27001 Bilgi GÃ¼venliÄi YÃ¶netim Sistemi (BGYS) Uyum SÃ¼reci',
      'IEC 62443 EndÃ¼striyel Kontrol Sistemleri Siber GÃ¼venlik StandardÄ±',
      'KVKK & GDPR KiÅisel Verilerin KorunmasÄ± Hukuki ve Teknik Uyum',
      'Kurumsal Risk Analizi ve Bilgi GÃ¼venliÄi PolitikalarÄ± OluÅturma'
    ]
  },
  e_s4: {
    badge: 'MEP & HVAC',
    title: 'Mekanik Tesisat & HVAC (VRF / VAV) / MEP',
    cover: 'a    slides: [
      {
        title: 'BESS & Solar Entegre E-Mobility Åarj Hub AltyapÄ±sÄ±',
        desc: 'GÃ¼neÅ enerjisi panelleri (GES), BESS depolama konteyneri ve akÄ±llÄ± Åebeke izleme ekranÄ± (Solar Power Generation & Battery Storage) entegrasyonlu sÄ±fÄ±r emisyonlu EV Åarj istasyonu hub altyapÄ±sÄ±.',
        image: 'assets/images/ev_bess_solar_hub_user.jpg'
      },
      {
        title: 'AC Åarj Ä°stasyonlarÄ± (3.7 kW - 22 kW)',
        desc: 'Alternatif akÄ±mÄ± araÃ§ iÃ§i dÃ¶nÃ¼ÅtÃ¼rÃ¼cÃ¼ (on-board charger) ile DC'ye Ã§eviren 3-8 saatlik emniyetli dolum Ã§Ã¶zÃ¼mleri. Konut, site, iÅ yeri ve aÃ§Ä±k/kapalÄ± park alanlarÄ± iÃ§in akÄ±llÄ± koruma ve yÃ¼ksek verimlilik.',
        image: 'assets/images/ev_ac_chargers_user.jpg'
      },
      {
        title: 'Apartman & Site Daire SayacÄ± Entegrasyonu',
        desc: 'Apartman ve sitelerde daire sakinlerinin doÄrudan kendi baÄÄ±msÄ±z hane elektrik sayacÄ±ndan Åarj besleme, adil kullanÄ±m takibi, otomatik faturalandÄ±rma ve site yÃ¶netimi entegrasyon imkanÄ±.',
        image: 'assets/images/ev_meter_integration_user.jpg'
      },
      {
        title: 'DC HÄ±zlÄ± Åarj Ä°stasyonlarÄ± (50 kW - 350+ kW)',
        desc: 'Ä°stasyon iÃ§i doÄrudan AC/DC dÃ¶nÃ¼ÅtÃ¼rme ile %20-%80 batarya dolumunu 20-40 dakikada saÄlayan ultra hÄ±zlÄ± Åarj altyapÄ±sÄ±. Otoyollar, akaryakÄ±t dinlenme tesisleri ve acil dolum alanlarÄ± iÃ§in.',
        image: 'assets/images/ev_dc_fast_chargers_user.jpg'
      },
      {
        title: 'Soket ve BaÄlantÄ± TÃ¼rleri (Tip 2 / CCS / CHAdeMO)',
        desc: 'EV Åarj istasyonlarÄ±nda kullanÄ±lan baÅlÄ±ca uluslararasÄ± soket standartlarÄ±: Tip 2 Mennekes (AC Standart 3.7-22 kW), CCS Combo 2 (AC/DC HÄ±zlÄ± 50-350+ kW) ve CHAdeMO (DC HÄ±zlÄ± 50-100+ kW).',
        image: 'assets/images/ev_socket_types_user.jpg'
      }
    ]± (EV Charge)',
    cover: 'assets/images/ev_bess_solar_hub_user.jpg',
    desc: 'AC yavaÅ/normal (3.7 - 22 kW) ve DC hÄ±zlÄ± (50 - 350+ kW) Åarj istasyonu kurulumlarÄ±, Tip 2 / CCS / CHAdeMO soket Ã§Ã¶zÃ¼mleri ve apartman baÄÄ±msÄ±z daire sayacÄ± entegrasyonlarÄ±.',
    specs: [
      'BESS & Solar Entegre E-Mobility Åarj Hub AltyapÄ±sÄ±',
      'AC Åarj Ä°stasyonlarÄ± (3.7 kW - 22 kW)',
      'Apartman & Site Daire SayacÄ± Entegrasyonu',
      'DC HÄ±zlÄ± Åarj Ä°stasyonlarÄ± (50 kW - 350+ kW)',
      'Soket ve BaÄlantÄ± TÃ¼rleri (Tip 2 / CCS / CHAdeMO)'
    ],
    slides: [
      {
        title: 'BESS & Solar Entegre E-Mobility Åarj Hub AltyapÄ±sÄ±',
        desc: 'GÃ¼neÅ enerjisi panelleri (GES), BESS depolama konteyneri ve akÄ±llÄ± Åebeke izleme ekranÄ± (Solar Power Generation & Battery Storage) entegrasyonlu sÄ±fÄ±r emisyonlu EV Åarj istasyonu hub altyapÄ±sÄ±.',
        image: 'assets/images/ev_bess_solar_hub_user.jpg'
      },
      {
        title: 'AC Åarj Ä°stasyonlarÄ± (3.7 kW - 22 kW)',
        desc: 'Alternatif akÄ±mÄ± araÃ§ iÃ§i dÃ¶nÃ¼ÅtÃ¼rÃ¼cÃ¼ (on-board charger) ile DC'ye Ã§eviren 3-8 saatlik emniyetli dolum Ã§Ã¶zÃ¼mleri. Konut, site, iÅ yeri ve aÃ§Ä±k/kapalÄ± park alanlarÄ± iÃ§in akÄ±llÄ± koruma ve yÃ¼ksek verimlilik.',
        image: 'assets/images/ev_ac_chargers_user.jpg'
      },
      {
        title: 'Apartman & Site Daire SayacÄ± Entegrasyonu',
        desc: 'Apartman ve sitelerde daire sakinlerinin doÄrudan kendi baÄÄ±msÄ±z hane elektrik sayacÄ±ndan Åarj besleme, adil kullanÄ±m takibi, otomatik faturalandÄ±rma ve site yÃ¶netimi entegrasyon imkanÄ±.',
        image: 'assets/images/ev_meter_integration_user.jpg'
      },
      {
        title: 'DC HÄ±zlÄ± Åarj Ä°stasyonlarÄ± (50 kW - 350+ kW)',
        desc: 'Ä°stasyon iÃ§i doÄrudan AC/DC dÃ¶nÃ¼ÅtÃ¼rme ile %20-%80 batarya dolumunu 20-40 dakikada saÄlayan ultra hÄ±zlÄ± Åarj altyapÄ±sÄ±. Otoyollar, akaryakÄ±t dinlenme tesisleri ve acil dolum alanlarÄ± iÃ§in.',
        image: 'assets/images/ev_dc_fast_chargers_user.jpg'
      },
      {
        title: 'Soket ve BaÄlantÄ± TÃ¼rleri (Tip 2 / CCS / CHAdeMO)',
        desc: 'EV Åarj istasyonlarÄ±nda kullanÄ±lan baÅlÄ±ca uluslararasÄ± soket standartlarÄ±: Tip 2 Mennekes (AC Standart 3.7-22 kW), CCS Combo 2 (AC/DC HÄ±zlÄ± 50-350+ kW) ve CHAdeMO (DC HÄ±zlÄ± 50-100+ kW).',
        image: 'assets/images/ev_socket_types_user.jpg'
      }
    ]
  },
  // Enerji KÃ¼me B â Veri Merkezi Sistemleri & EntegrasyonlarÄ±
  e_b1: {
    badge: 'HARDWARE & INFRASTRUCTURE',
    title: 'AltyapÄ± ve DonanÄ±m BileÅenleri',
    cover: 'assets/images/data_center_construction_1785092614608.png',
    desc: 'Veri merkezi fiziksel altyapÄ±sÄ±, rack kabinetler, ToR SW Ã§Ã¶zÃ¼mleri, hassas sÄ±vÄ± soÄutma, modÃ¼ler konteyner sistemleri ve yÃ¼kseltilmiÅ zemin mÃ¼hendisliÄi.',
    specs: [
      'Kabin ve Muhafaza: Rack kabinetler, busbar sistemleri ve Top of Rack (ToR) SW Data Center Ã§Ã¶zÃ¼mleri',
      'Enerji ve Ä°klimlendirme: Kesintisiz gÃ¼Ã§ kaynaklarÄ± (UPS) ve hassas sÄ±vÄ± soÄutma Ã¼niteleri',
      'KapsayÄ±cÄ± Sistemler: ModÃ¼ler & konteyner tipi taÅÄ±nabilir veri merkezleri, Shell and Core kabinet odalarÄ±',
      'Fiziksel AltyapÄ±: YÃ¼kseltilmiÅ zemin, tavan ve taban kablolama taÅÄ±yÄ±cÄ± sistemleri'
    ]
  },
  e_b2: {
    badge: 'CLOUD & VIRTUALIZATION',
    title: 'Operasyonel, Bulut & SanallaÅtÄ±rma Hizmetleri',
    cover: 'assets/images/energy_fiber_network.jpg',
    desc: 'Colocation barÄ±ndÄ±rma, Ä°Å SÃ¼rekliliÄi & Felaket Kurtarma (BCP/DR), sanallaÅtÄ±rma mimarileri (VDI, Sanal Sunucu, Storage, Network) ve uÃ§tan uca IT donanÄ±m Ã§Ã¶zÃ¼mleri.',
    specs: [
      'Sunucu BarÄ±ndÄ±rma (Colocation): 7/24 korunan gÃ¼venli tesislerde cihaz barÄ±ndÄ±rma ve alan kiralama',
      'Ä°Å SÃ¼rekliliÄi & Felaket Kurtarma: Disaster Recovery (DR) planlamasÄ±, felaket erteleme ve veri yedekleme',
      'SanallaÅtÄ±rma ÃÃ¶zÃ¼mleri: Sanal MasaÃ¼stÃ¼ (VDI), Sanal Sunucu, Sanal Depolama, Sanal Ä°Å YÃ¼kleri & Network',
      'UÃ§tan Uca IT AltyapÄ±: Sunucu, Depolama (SAN&NAS), Network, Firewall, UTM, SW, WLAN, WiFi, VPN, VOIP ve Public/Private Cloud'
    ]
  },
  e_b3: {
    badge: 'REGULATION & ADVISORY',
    title: 'RegÃ¼lasyon, Ä°hale DanÄ±ÅmanlÄ±ÄÄ± & Asset Sizing',
    cover: 'assets/images/tender_contract_management_1785010026255.png',
    desc: 'KVKK, GDPR, ISO 27001/9001 hukuki ve teknik uyum sÃ¼reÃ§leri, Volume/Asset Sizing hesaplamalarÄ± ve RFP/RFQ ihale Åartname danÄ±ÅmanlÄ±ÄÄ±.',
    specs: [
      'RegÃ¼lasyon Uyum: KVKK, GDPR, ISO 27001 & ISO 9001 teknik-idari tablolarÄ±n adreslenmesi ve prosedÃ¼r yazÄ±mÄ±',
      'Volume / Asset Sizing: Ä°Å bÃ¼yÃ¼klÃ¼ÄÃ¼ne gÃ¶re kaynak, donanÄ±m, alan ve kapasite boyutlandÄ±rma hesabÄ±',
      'DoÄru Maliyet YÃ¶netimi: Fazla veya eksik yatÄ±rÄ±mÄ± Ã¶nleyen bÃ¼tÃ§e planlamasÄ± ve optimizasyon',
      'Ä°hale & Åartname YÃ¶netimi: RFP, RFI, RFQ, RFx Åartname hazÄ±rlÄ±ÄÄ±, tedarikÃ§i ve Ã¼retici yÃ¶netimi'
    ]
  },
  e_b4: {
    badge: 'WHITE SPACE & DCIM',
    title: 'Veri Merkezi Beyaz Alan (White Space) YÃ¶netimi & DCIM',
    cover: 'assets/images/gallery_datacenter_v2.jpg',
    desc: 'SÄ±cak/soÄuk koridor tasarÄ±mÄ±, PUE enerji ve soÄutma verimliliÄi optimizasyonu, DCIM altyapÄ± yazÄ±lÄ±mlarÄ± ve beyaz alan fiziksel gÃ¼venlik yÃ¶netimi.',
    specs: [
      'Kapasite ve YerleÅim: Kabin (rack) yerleÅimi, aÄÄ±rlÄ±k sÄ±nÄ±rlarÄ± ve zemin altÄ± kablolama dÃ¼zeni',
      'Ä°klimlendirme & PUE Optimizasyonu: SÄ±cak/soÄuk koridor tasarÄ±mÄ±, sÄ±caklÄ±k/nem kontrolÃ¼ ve enerji verimliliÄi',
      'Enerji Ä°zleme & GÃ¼Ã§: GÃ¼Ã§ tÃ¼ketimi, PUE (GÃ¼Ã§ KullanÄ±mÄ± EtkinliÄi) canlÄ± takibi ve yedekli enerji mimarisi',
      'DCIM & GÃ¼venlik: Veri Merkezi AltyapÄ± YÃ¶netimi (DCIM) yazÄ±lÄ±mlarÄ±, geÃ§iÅ kontrolÃ¼, CCTV ve erken uyarÄ± yangÄ±n algÄ±lama'
    ]
  },
  e_b5: {
    badge: 'CYBERSECURITY & BMS',
    title: 'Siber GÃ¼venlik, SOC & AkÄ±llÄ± Bina Otomasyonu (BMS)',
    cover: 'assets/images/energy_cybersecurity.jpg',
    desc: 'IT/OT siber gÃ¼venlik danÄ±ÅmanlÄ±ÄÄ±, 7/24 GÃ¼venlik Operasyon Merkezi (SOC) kurulumu, ZayÄ±f/GÃ¼Ã§lÃ¼ AkÄ±m tesisatÄ± ve BMS bina otomasyonu.',
    specs: [
      'IT / OT Siber GÃ¼venlik Mimarisi ve ISO 27001 / IEC 62443 Uyum Denetimleri',
      'SOC (GÃ¼venlik Operasyon Merkezi) 7/24 Kurulumu, CanlÄ± Ä°zleme & Penetrasyon Testleri',
      'ZayÄ±f AkÄ±m (ELV) & GÃ¼Ã§lÃ¼ / Kuvvetli AkÄ±m Tesisat ve DaÄÄ±tÄ±m Panosu EntegrasyonlarÄ±',
      'BMS (Building Management System) AkÄ±llÄ± Bina Otomasyonu & Merkezi Kontrol YazÄ±lÄ±mlarÄ±'
    ]
  }
};

// ââ Service Slide Modal â One-Page Horizontal Slide Design ââââââââââââââââ
let currentSvcSlideIndex = 0;
let totalSvcSlides = 0;

function openServiceModal(id) {
  const data = SERVICES_DATA[id];
  if (!data) return;

  const track = document.getElementById('svc-slider-track');
  const indicators = document.getElementById('svc-slide-indicators');
  track.innerHTML = '';
  indicators.innerHTML = '';

  // Build spec slides array (explicit slides or auto-generate from specs list)
  const specSlides = data.slides || (data.specs ? data.specs.map(spec => ({
    title: spec,
    desc: 'UluslararasÄ± mÃ¼hendislik standartlarÄ± ve kalite kontrol parametrelerine tam uyumlu uygulama.',
    image: data.cover
  })) : []);

  totalSvcSlides = 1 + specSlides.length;
  currentSvcSlideIndex = 0;

  // ââ Slide 0: Overview ââââââââââââââââââââââââââââââââââââââââââââââ
  const overviewSlide = document.createElement('div');
  overviewSlide.className = 'svc-slide svc-slide--overview';
  overviewSlide.innerHTML = `
    <div class="svc-slide-bg" style="background-image:url('${data.cover}')"></div>
    <div class="svc-slide-overlay"></div>
    <div class="svc-slide-overview-body">
      <span class="svc-overview-badge">${data.badge}</span>
      <h3 class="svc-overview-title">${data.title}</h3>
      <p class="svc-overview-desc">${data.desc}</p>
      <div class="svc-overview-divider"></div>
      <div class="svc-vcard-row">
        <button class="svc-vcard-btn primary" onclick="showVCard('ilker')">ð Direct Lead vCard â Ä°lker ATASOY</button>
        <button class="svc-vcard-btn secondary" onclick="showVCard('eylul')">ð Architecture vCard â EylÃ¼l YILMAZ</button>
      </div>
    </div>
    ${specSlides.length > 0 ? '<div class="svc-swipe-hint">Teknik Ãzellikler â¯</div>' : ''}
  `;
  track.appendChild(overviewSlide);

  // ââ Slides 1-N: Spec Slides ââââââââââââââââââââââââââââââââââââââââ
  specSlides.forEach((slide, idx) => {
    const specSlide = document.createElement('div');
    specSlide.className = 'svc-slide svc-slide--spec';
    specSlide.innerHTML = `
      <div class="svc-slide-bg" style="background-image:url('${slide.image}')"></div>
      <div class="svc-slide-overlay"></div>
      <div class="svc-slide-spec-body">
        <div class="svc-spec-counter">TEKNÄ°K ÃZELLÄ°K ${idx + 1} / ${specSlides.length}</div>
        <h4 class="svc-spec-title">${slide.title}</h4>
        <p class="svc-spec-desc">${slide.desc || ''}</p>
      </div>
    `;
    track.appendChild(specSlide);
  });

  // ââ Indicators âââââââââââââââââââââââââââââââââââââââââââââââââââââ
  for (let i = 0; i < totalSvcSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'svc-indicator-dot' + (i === 0 ? ' home-dot active' : '');
    dot.setAttribute('aria-label', i === 0 ? 'Ana Sayfa' : `Teknik Ãzellik ${i}`);
    dot.onclick = () => goToSvcSlide(i);
    indicators.appendChild(dot);
  }

  updateSvcSliderPosition();
  document.getElementById('service-dialog').showModal();
}

function closeServiceModal() {
  document.getElementById('service-dialog').close();
}

function moveSvcSlide(dir) {
  if (totalSvcSlides <= 0) return;
  currentSvcSlideIndex = (currentSvcSlideIndex + dir + totalSvcSlides) % totalSvcSlides;
  updateSvcSliderPosition();
}

function goToSvcSlide(idx) {
  if (idx < 0 || idx >= totalSvcSlides) return;
  currentSvcSlideIndex = idx;
  updateSvcSliderPosition();
}

function updateSvcSliderPosition() {
  const track = document.getElementById('svc-slider-track');
  if (!track) return;
  track.style.transform = `translateX(-${currentSvcSlideIndex * 100}%)`;
  document.querySelectorAll('#svc-slide-indicators .svc-indicator-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSvcSlideIndex);
  });
}

// ââ Gallery / Lightbox âââââââââââââââââââââââââââââââââââââââââââââââââââââ
// ââ Gallery / Lightbox âââââââââââââââââââââââââââââââââââââââââââââââââââââ
const galleryImages = [
  {
    src: 'assets/images/gallery_datacenter_v2.jpg',
    tag: 'ANKARA / TÃRKÄ°YE â VERÄ° MERKEZÄ°',
    title: 'T-3 Veri Merkezi YapÄ±mÄ±',
    caption: 'Tier III sertifikasyonuna uygun mission-critical veri merkezi inÅasÄ±, N+2 yedekli gÃ¼Ã§ ve hassas iklimlendirme altyapÄ±sÄ±.',
    specs: [
      { label: 'Lokasyon', val: 'Ankara, TÃ¼rkiye' },
      { label: 'Kapasite', val: '12 MW BT YÃ¼kÃ¼ / Tier III' },
      { label: 'Kapsam', val: 'EPC Anahtar Teslim' },
      { label: 'YÄ±l', val: '2024-2025' }
    ]
  },
  {
    src: 'assets/images/gallery_factory_v2.jpg',
    tag: 'Ä°ZMÄ°R / TÃRKÄ°YE â AÄIR SANAYÄ°',
    title: 'AÄÄ±r Sanayi & Ãretim Tesisleri',
    caption: '120.000 mÂ² kapalÄ± alana sahip yÃ¼ksek teknolojili aÄÄ±r sanayi Ã¼retim tesisi, otomasyon altyapÄ±sÄ± ve imalat hatlarÄ±.',
    specs: [
      { label: 'Lokasyon', val: 'Ä°zmir, TÃ¼rkiye' },
      { label: 'KapalÄ± Alan', val: '120.000 mÂ²' },
      { label: 'Kapsam', val: 'AÄÄ±r Sanayi & Fabrika Ä°nÅaatÄ±' },
      { label: 'YÄ±l', val: '2023-2025' }
    ]
  },
  {
    src: 'assets/images/gallery_residential_v2.jpg',
    tag: 'Ä°STANBUL / TÃRKÄ°YE â LÃKS KONUT',
    title: 'Vadi KonaklarÄ± YaÅam Kompleksi',
    caption: 'AkÄ±llÄ± ev otomasyonu, yenilenebilir enerji entegrasyonlu 450 baÄÄ±msÄ±z konut Ã¼nitesi ve sosyal yaÅam alanlarÄ± projelendirmesi.',
    specs: [
      { label: 'Lokasyon', val: 'Ä°stanbul, TÃ¼rkiye' },
      { label: 'BaÄÄ±msÄ±z BÃ¶lÃ¼m', val: '450 Konut & Ticari' },
      { label: 'Sertifika', val: 'LEED Gold AdayÄ±' },
      { label: 'YÄ±l', val: '2023-2024' }
    ]
  },
  {
    src: 'assets/images/gallery_skytower_v2.jpg',
    tag: 'Ä°STANBUL / TÃRKÄ°YE â Ä°Å KULESÄ°',
    title: 'Sky Tower Ä°Å Kulesi & Sismik TasarÄ±m',
    caption: 'Taban izolatÃ¶rlÃ¼ ve yÃ¼ksek mukavemetli sismik kolon yapÄ±sÄ±yla depreme tam dayanÄ±klÄ± 42 katlÄ± iÅ kulesi inÅasÄ±.',
    specs: [
      { label: 'Lokasyon', val: 'Ä°stanbul (AtaÅehir)' },
      { label: 'Kat SayÄ±sÄ±', val: '42 Kat / 185m YÃ¼kseklik' },
      { label: 'Teknoloji', val: 'Sismik Taban Ä°zolatÃ¶rÃ¼' },
      { label: 'YÄ±l', val: '2024' }
    ]
  },
  {
    src: 'assets/images/gallery_petrochemical_v2.jpg',
    tag: 'KOCAELÄ° / TÃRKÄ°YE â PETROKÄ°MYA',
    title: 'Petrokimya & Enerji Santral Kompleksi',
    caption: 'AÄÄ±r endÃ¼striyel proses borulamalarÄ±, yÃ¼ksek basÄ±nÃ§lÄ± depolama tanklarÄ± ve tÃ¼rbin binasÄ± aÄÄ±r mÃ¼hendislik taahhÃ¼dÃ¼.',
    specs: [
      { label: 'Lokasyon', val: 'Kocaeli (DilovasÄ±)' },
      { label: 'Kapasite', val: '250.000 Ton/YÄ±l Ä°Åleme' },
      { label: 'YapÄ± Tipi', val: 'AÄÄ±r Ãelik & Tank ÃiftliÄi' },
      { label: 'YÄ±l', val: '2024' }
    ]
  },
  {
    src: 'assets/images/gallery_mixeduse_v2.jpg',
    tag: 'Ä°STANBUL / TÃRKÄ°YE â KARMA PROJE',
    title: 'Park Terrace Karma YaÅam & Ofis Projesi',
    caption: 'AlÄ±ÅveriÅ bulvarÄ±, lÃ¼ks rezidans bloklarÄ± ve A+ ofis katlarÄ±nÄ± bir araya getiren prestijli karma kullanÄ±m projesi.',
    specs: [
      { label: 'Lokasyon', val: 'Ä°stanbul (Maslak)' },
      { label: 'Ä°nÅaat AlanÄ±', val: '180.000 mÂ²' },
      { label: 'Karma Konsept', val: 'Rezidans + A+ Ofis + Retail' },
      { label: 'YÄ±l', val: '2024-2025' }
    ]
  },
  {
    src: 'assets/images/gallery_foundry_1785092866525.png',
    tag: 'BURSA / TÃRKÄ°YE â AÄIR SANAYÄ°',
    title: 'AÄÄ±r Sanayi DÃ¶kÃ¼mhane Kompleksi',
    caption: 'YÃ¼ksek sÄ±caklÄ±k fÄ±rÄ±nlarÄ±, Ã¶zel havalandÄ±rma-baca arÄ±tma sistemleri ve aÄÄ±r yÃ¼k zeminleri iÃ§eren endÃ¼striyel dÃ¶kÃ¼m tesisi.',
    specs: [
      { label: 'Lokasyon', val: 'Bursa, TÃ¼rkiye' },
      { label: 'Kapasite', val: '45.000 Ton/YÄ±l DÃ¶kÃ¼m' },
      { label: 'AltyapÄ±', val: 'Ãzel Deprem & IsÄ± Ä°zolasyonu' },
      { label: 'YÄ±l', val: '2023' }
    ]
  },
  {
    src: 'assets/images/civil_engineering_bim_1785010076530.png',
    tag: 'Ä°STANBUL / TÃRKÄ°YE â DÄ°JÄ°TAL Ä°KÄ°Z & BIM',
    title: '5D BIM Projelendirme & Ä°hale YÃ¶netimi',
    caption: 'TÃ¼m disiplinlerin (Mimari, Statik, Mekanik, Elektrik) Ã§akÄ±Åma analizi, 5D maliyet simÃ¼lasyonu ve Åartname yÃ¶netimi.',
    specs: [
      { label: 'YazÄ±lÄ±m', val: 'Revit, Navisworks, BIM 360' },
      { label: 'Kapsam', val: '5D Cost & Clash Detection' },
      { label: 'LOD StandardÄ±', val: 'LOD 400 Uygulama DetayÄ±' },
      { label: 'Standart', val: 'ISO 19650 BIM StandardÄ±' }
    ]
  }
];
let lightboxIdx = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  const item = galleryImages[lightboxIdx];
  if (!item) return;

  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-tag').textContent = item.tag || 'PROJE GALERÄ°SÄ°';
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

// ââ Energy Product References Modal ââââââââââââââââââââââââââââââââââââââ
const energyProducts = [
  {
    src: 'assets/images/energy_ref_smart_bess.jpg',
    tag: 'BIPV SOLAR & BESS MOBILE APP',
    title: 'AkÄ±llÄ± Ev BESS & Åarj Ä°stasyonu Entegrasyonu',
    caption: 'CanlÄ± Mobil Durum EkranÄ± ile 7.2 kW Solar Ãretim, %68 ÅarjlÄ± Ev Tipi LFP Batarya, 1.3 kW EV AraÃ§ Åarj YÃ¶netimi ve Åebeke AkÄ±llÄ± Otomasyonu.',
    specs: [
      { label: 'GÃ¼neÅ Ãretimi', val: '7.2 kW BIPV ÃatÄ± PV' },
      { label: 'Batarya Depolama', val: 'LFP (LiFePO4) AkÄ±llÄ± Depolama' },
      { label: 'EV Åarj Ä°stasyonu', val: '1.3 kW Smart EV Charger' },
      { label: 'YazÄ±lÄ±m', val: 'CanlÄ± Mobil Takip & Otonom Åarj' }
    ]
  },
  {
    src: 'assets/images/energy_ref_luxury_solar.jpg',
    tag: 'LUXURY RESIDENTIAL BIPV',
    title: 'LÃ¼ks Konut & Otel BIPV Solar & Konteyner Depolama Tesisi',
    caption: 'Deniz manzaralÄ± lÃ¼ks kompleks projesinde Ã§atÄ± entegre PV solar cam kaplamasÄ± ve ahÅap mimari giydirmeli gizli BESS batarya konteyner odasÄ±.',
    specs: [
      { label: 'Lokasyon', val: 'Ege KÄ±yÄ±sÄ± LÃ¼ks Kompleks' },
      { label: 'Solar AltyapÄ±', val: 'BIPV Fotovoltaik Cam ÃatÄ±' },
      { label: 'Depolama', val: 'Ãzel Mimari Konteyner BESS' },
      { label: 'SÃ¼rdÃ¼rÃ¼lebilirlik', val: 'Net Zero Carbon HizamasÄ±' }
    ]
  },
  {
    src: 'assets/images/energy_ref_bess_container.jpg',
    tag: 'INDUSTRIAL BESS',
    title: 'Konteyner Tipi EndÃ¼striyel BESS Batarya Santrali',
    caption: 'MW Ã¶lÃ§eÄinde outdoor iklimlendirmeli LFP batarya konteynerleri, Ã§ift yÃ¶nlÃ¼ PCS invertÃ¶rler ve AkÄ±llÄ± Peak Shaving Åebeke entegrasyonu.',
    specs: [
      { label: 'Depolama Kapasitesi', val: '10 MWh LFP Batarya' },
      { label: 'GÃ¼Ã§ DÃ¶nÃ¼ÅtÃ¼rme', val: 'PCS Ãift YÃ¶nlÃ¼ Ãevirici' },
      { label: 'KullanÄ±m', val: 'Peak Shaving & Åebeke Dengeleme' },
      { label: 'Emniyet', val: 'FM200 GazlÄ± SÃ¶ndÃ¼rme & BMS' }
    ]
  },
  {
    src: 'assets/images/energy_ref_solar_ges_50mw.jpg',
    tag: 'UTILITY SOLAR',
    title: '50 MWp EndÃ¼striyel ÃatÄ± & Arazi GES EPC Projesi',
    caption: 'Arazi ve endÃ¼striyel tesis Ã§atÄ±larÄ±nda yÃ¼ksek verimli monokristal Bifacial PV paneller ve On-Grid santral entegrasyonu.',
    specs: [
      { label: 'Kurulu GÃ¼Ã§', val: '50 MWp Toplam GÃ¼Ã§' },
      { label: 'Panel Tipi', val: 'Bifacial Monokristal PERC' },
      { label: 'Kapsam', val: 'Anahtar Teslim EPC' },
      { label: 'KatkÄ±', val: '35.000 Ton COâ Tasarrufu' }
    ]
  },
  {
    src: 'assets/images/energy_ref_wind_res_100mw.jpg',
    tag: 'WIND POWER',
    title: '100 MW RES & WPP RÃ¼zgar Santrali TÃ¼rbin Entegrasyonu',
    caption: 'YÃ¼ksek irtifa tÃ¼rbin altyapÄ± mÃ¼hendisliÄi, tÃ¼rbin montajÄ±, Åebeke baÄlantÄ±sÄ± ve periyodik SCADA izleme hizmetleri.',
    specs: [
      { label: 'Kapasite', val: '100 MW RÃ¼zgar Santrali' },
      { label: 'AltyapÄ±', val: 'AÄÄ±r MÃ¼hendislik & Temeller' },
      { label: 'Åebeke Entegrasyonu', val: '154 kV YÃ¼ksek Gerilim' },
      { label: 'Ä°zleme', val: '7/24 SCADA Uzaktan Kontrol' }
    ]
  },
  {
    src: 'assets/images/energy_ref_scada_room.jpg',
    tag: 'AUTOMATION & SCADA',
    title: 'Merkezi SCADA Otomasyon & Åebeke Ä°zleme Kontrol',
    caption: 'Elektrik santralleri, su arÄ±tma ve sanayi tesisleri iÃ§in canlÄ± sensÃ¶r verisi toplama, alarm yÃ¶netimi ve uzaktan otomasyon.',
    specs: [
      { label: 'YazÄ±lÄ±m AltyapÄ±sÄ±', val: 'SCADA & CanlÄ± Telemetri' },
      { label: 'Protokol', val: 'Modbus, IEC 60870, DNP3' },
      { label: 'Ekran Mimarisi', val: 'Merkezi Video Wall' },
      { label: 'GÃ¼venlik', val: 'Yedekli Redundant Server' }
    ]
  },
  {
    src: 'assets/images/energy_ref_soc_cyber.jpg',
    tag: 'CYBERSECURITY SOC',
    title: 'OT / IT Siber GÃ¼venlik Operations Center (SOC) Merkezi',
    caption: 'Kritik altyapÄ±lar iÃ§in IT ve OT siber gÃ¼venlik danÄ±ÅmanlÄ±ÄÄ±, 7/24 SOC izleme, penetrasyon testleri ve ISO 27001 denetimleri.',
    specs: [
      { label: 'MÃ¼hendislik', val: 'ICS / OT Siber GÃ¼venlik Mimarisi' },
      { label: 'Ä°zleme', val: '7/24 CanlÄ± SOC Tehdit AvcÄ±lÄ±ÄÄ±' },
      { label: 'Test', val: 'Penetrasyon ve SÄ±zma Testleri' },
      { label: 'Uyum', val: 'ISO 27001 & IEC 62443 StandardÄ±' }
    ]
  },
  {
    src: 'assets/images/energy_ref_dc_cooling.jpg',
    tag: 'DC MEP & COOLING',
    title: 'Veri Merkezi Hassas SÄ±vÄ± SoÄutma & MEP TesisatÄ±',
    caption: 'Tier IV standartlarÄ±nda veri merkezleri ve hassas iklimlendirme odalarÄ± iÃ§in sÄ±vÄ± soÄutma, CRAH/CRAC ve MEP tesisat projelendirmesi.',
    specs: [
      { label: 'SoÄutma Teknolojisi', val: 'Hassas SÄ±vÄ± & In-Row SoÄutma' },
      { label: 'Yedeklilik', val: 'N+2 Redundant Chiller' },
      { label: 'PUE OranÄ±', val: '< 1.15 PUE Verimlilik' },
      { label: 'Tesisat', val: 'MEP Paslanmaz Borulama' }
    ]
  }
];

function openEnergyProductModal(idx) {
  const item = energyProducts[idx];
  if (!item) return;

  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-tag').textContent = item.tag || 'ÃRÃN REFERANSI';
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

// ââ vCard ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const VCARDS = {
  ilker: {
    avatar: 'Ä°A', name: 'Ä°lker ATASOY',
    titleTr: 'YÃ¶netim Kurulu BaÅkanÄ± / CxO (MÃ¼hendis)',
    titleEn: 'Chairman / CxO (Engineer)',
    phone: '+90 542 897 34 46', phoneHref: 'tel:+905428973446',
    email: 'ilker.atasoy@yakingrup.net',
    office: 'Maslak Sun Plaza Kat: 12, ÅiÅli / Ä°stanbul',
    linkedin: 'tr.linkedin.com/company/yakingrupnet',
    linkedinHref: 'https://tr.linkedin.com/company/yakingrupnet',
    vcf: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ä°lker Atasoy\nORG:YakÄ±n Grup\nTITLE:Chairman / CxO\nTEL:+905428973446\nEMAIL:ilker.atasoy@yakingrup.net\nADR:;;Maslak Sun Plaza Kat:12;Ä°stanbul;;;\nURL:https://www.yakingrup.net\nEND:VCARD'
  },
  eylul: {
    avatar: 'EY', name: 'EylÃ¼l YILMAZ',
    titleTr: 'YÃ¶netim Kurulu BaÅkanÄ± / CEO (Mimar)',
    titleEn: 'Chairman / CEO (Architect)',
    phone: '+90 (212) 555 0101', phoneHref: 'tel:+902125550101',
    email: 'eylul.yilmaz@yakingrup.net',
    office: 'Maslak Sun Plaza Kat: 12, ÅiÅli / Ä°stanbul',
    linkedin: 'tr.linkedin.com/company/yakingrupnet',
    linkedinHref: 'https://tr.linkedin.com/company/yakingrupnet',
    vcf: 'BEGIN:VCARD\nVERSION:3.0\nFN:EylÃ¼l YÄ±lmaz\nORG:YakÄ±n Grup\nTITLE:Chairman / CEO\nTEL:+902125550101\nEMAIL:eylul.yilmaz@yakingrup.net\nADR:;;Maslak Sun Plaza Kat:12;Ä°stanbul;;;\nURL:https://www.yakingrup.net\nEND:VCARD'
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
    navigator.share({ title: c.name, text: `${c.name} â ${c.email}`, url: window.location.href });
  } else {
    navigator.clipboard.writeText(`${c.name}\n${c.email}\n${c.phone}`);
    alert('Kart bilgileri panoya kopyalandÄ±.');
  }
}

// ââ Marketplace Modal ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function openMarketplaceModal() { document.getElementById('market-dialog').showModal(); }
function closeMarketplaceModal() { document.getElementById('market-dialog').close(); }

function handleMarketplaceSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = currentLang === 'tr' ? 'â Kaydedildi!' : 'â Saved!';
  btn.style.background = '#1E8F5E';
  setTimeout(() => closeMarketplaceModal(), 1800);
}

// ââ Contact Form âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  btn.textContent = currentLang === 'tr' ? 'â MesajÄ±nÄ±z Ä°letildi!' : 'â Message Sent!';
  btn.style.background = '#1E8F5E';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = TRANSLATIONS[currentLang].btn_send;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}

// ââ Legal Modals âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const LEGAL = {
  kvkk: {
    tr: { title: 'KVKK AydÄ±nlatma Metni', body: '<p>YakÄ±n Grup Sanayi Ä°nÅaat Enerji Teknoloji Ltd. Åti., kiÅisel verilerinizi 6698 sayÄ±lÄ± KVKK kapsamÄ±nda toplamakta ve iÅlemektedir. Toplanan veriler; ad-soyad, e-posta, telefon ve mesaj iÃ§eriÄi olup yalnÄ±zca sizinle iletiÅim kurmak amacÄ±yla kullanÄ±lmaktadÄ±r. Verileriniz Ã¼Ã§Ã¼ncÃ¼ taraflarla paylaÅÄ±lmamakta, yasal saklama sÃ¼releri dolduktan sonra silinmektedir. HaklarÄ±nÄ±z iÃ§in: info@yakingrup.net</p>' },
    en: { title: 'GDPR Privacy Notice', body: '<p>YakÄ±n Group processes your personal data (name, email, phone, message) solely to respond to your inquiry. Data is not shared with third parties and is deleted after legal retention periods. For your rights: info@yakingrup.net</p>' }
  },
  cerez: {
    tr: { title: 'Ãerez PolitikasÄ±', body: '<p>Sitemiz, temel iÅlevler iÃ§in zorunlu Ã§erezler kullanmaktadÄ±r. Analitik Ã§erezler Google Analytics aracÄ±lÄ±ÄÄ±yla anonim ziyaret verisi toplar. TarayÄ±cÄ± ayarlarÄ±nÄ±zdan Ã§erezleri yÃ¶netebilirsiniz.</p>' },
    en: { title: 'Cookie Policy', body: '<p>Our site uses necessary cookies for basic functions. Analytical cookies collect anonymous visit data via Google Analytics. You can manage cookies through your browser settings.</p>' }
  },
  kullanim: {
    tr: { title: 'KullanÄ±m ÅartlarÄ±', body: '<p>Bu web sitesi YakÄ±n Grup tarafÄ±ndan iÅletilmektedir. Ä°Ã§erikler bilgi amaÃ§lÄ±dÄ±r; ticari teklif niteliÄi taÅÄ±maz. Sitedeki gÃ¶rseller ve metinler telif hakkÄ± ile korunmaktadÄ±r.</p>' },
    en: { title: 'Terms of Use', body: '<p>This website is operated by YakÄ±n Group. Content is for informational purposes only and does not constitute a commercial offer. Images and text are protected by copyright.</p>' }
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

// ââ INIT âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  initSlider();
  initHeader();
  initReveal();

  slideTimer = setInterval(() => goToSlide(slideIndex + 1), SLIDE_INTERVAL);
});
