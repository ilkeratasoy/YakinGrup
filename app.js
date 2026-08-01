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
    tag_construction: 'İNŞAAT & TAAHHÜT', tag_energy: 'ENERJİ & TEKNOLOJİ',
    tag_capital: 'FİNANS & YATIRIM', tag_technology: 'DİJİTAL & YZ',
    tag_group: 'YAKIN GRUP HOLDİNG', tag_about: 'KURUMSAL GÜVEN',
    tag_portfolio: 'PROJELERİMİZ', tag_partners: 'MÜHENDİSLİK PAYDAŞLARI',
    tag_store: 'ONLINE SATIŞ & PORTAL', tag_digital: 'DİJİTAL DÖNÜŞÜM',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'KÜME A', cluster_b_label: 'KÜME B',
    cluster_a_title: 'Yenilenebilir Enerji & Mekanik Sistemler',
    cluster_b_title: 'Zayıf Akım, Network & Siber Güvenlik',
    hero_badge1: 'İNŞAAT & TAAHHÜT', hero_badge2: 'YENİLENEBİLİR ENERJİ',
    hero_badge3: 'FİNANS & YATIRIM', hero_badge4: 'DİJİTAL & YZ',
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
    group_body: 'Yakın Grup; inşaat taahhüt, yenilenebilir enerji, proje finansmanı ve dijital teknoloji alanlarında faaliyet gösteren bir mühendislik holdingidir.',
    stat_years: 'Yıllık Tecrübe', stat_area: 'm² İnşaat Alanı',
    stat_mw: 'MW Kurulu Güç', stat_companies: 'Grup Şirketi',
    stat_mw_full: 'MW Toplam Kurulu Güç', stat_co2: 'Ton CO₂ Azaltımı',
    stat_scada: 'Akıllı SCADA İzleme', stat_services: 'Hizmet Kategorisi',
    fb_title: 'ISO Sertifikalı', fb_sub: 'Uluslararası Standartlar',
    c_title: 'Yakın İnşaat',
    c_desc: 'Veri merkezlerinden konut ve sanayi yapılarına kadar her projede üstün kalite, dayanıklılık ve sürdürülebilir yöntemler.',
    c_services_title: 'Endüstriyel İnşaat Çözümlerimiz',
    c_s1_title: 'Veri Merkezi İnşaatı', c_s1_desc: 'Tier III ve IV sertifikalı, yüksek güvenilirlikli mission-critical veri merkezleri.',
    c_s2_title: 'Ağır Sanayi Tesisleri', c_s2_desc: 'Fabrikalar, dökümhaneler ve enerji üretim santrallerinde anahtar teslim taahhüt.',
    c_s3_title: 'Konut & Yaşam Projeleri', c_s3_desc: 'Modern mimari ve ileri mühendislikle tasarlanan lüks yaşam kompleksleri.',
    c_s4_title: 'Yapı Mühendisliği & BIM', c_s4_desc: 'İleri seviye deprem mühendisliği, BIM entegrasyonu ve teknik projelendirme.',
    c_s5_title: 'Havalimanı & Ulaşım', c_s5_desc: 'Uluslararası standartlarda havalimanı terminalleri ve ulaşım altyapısı.',
    c_s6_title: 'Kentsel Dönüşüm', c_s6_desc: 'Riskli yapıların tespiti, güçlendirilmesi ve dönüşüm projelerinde uçtan uca yönetim.',
    portfolio_title: 'Seçkin Proje Galerisi',
    c_gal1_title: 'T-3 Veri Merkezi Yapımı', c_gal2_title: 'Uluslararası Havalimanı Terminali',
    c_gal3_title: 'Vadi Konakları Yaşam Kompleksi', c_gal4_title: 'Yapı Güçlendirme & BIM Tasarımı',
    e_title: 'Yakın Enerji',
    e_desc: 'Huawei, ABB, Vertiv gibi küresel markalar ile iş birliği içinde yüksek verimliliğe odaklanıyoruz.',
    e_a1_title: 'Güneş Enerjisi Sistemleri (GES)', e_a1_desc: 'Arazi ve çatı tipi GES EPC projelerinde yüksek kapasite verimlilik entegrasyonu.',
    e_a2_title: 'Rüzgar Enerjisi', e_a2_desc: 'RES kurulum ve tesis mühendisliği, türbin entegrasyon hizmetleri.',
    e_a3_title: 'Hibrit Enerji & BESS', e_a3_desc: 'Güneş ve rüzgar enerjisini lityum batarya teknolojileriyle entegre ediyoruz.',
    e_a4_title: 'Mekanik Tesisat', e_a4_desc: 'HVAC, boru tesisatı, iklimlendirme ve mekanik proje tasarımı.',
    e_b1_title: 'Siber Güvenlik Müşavirliği', e_b1_desc: 'IT güvenliği, SOC kurulumu, penetrasyon testleri ve güvenlik denetimleri.',
    e_b2_title: 'Veri Merkezi & Ağ Mimarisi', e_b2_desc: 'Omurga ağ kurulumu, sunucu optimizasyonu ve zayıf akım çözümleri.',
    e_b3_title: 'Akıllı Bina Otomasyonu', e_b3_desc: 'Tesis otomasyon sistemleri, BMS ve SCADA entegrasyon projeleri.',
    e_b4_title: 'Elektrik Altyapısı', e_b4_desc: 'Güçlü ve zayıf akım elektrik projelendirme, panel ve dağıtım tasarımı.',
    cap_desc: 'Yakın Capital, grubumuzun projelerini uçtan uca geliştiren, finansman çözümleri üreten bir danışmanlık ve yatırım platformudur.',
    cap_heading: 'Çok Disiplinli Finansman Yapılandırması',
    cap_body: 'Projelerin finansmanını organize etmek, riskleri yönetmek ve sürdürülebilir nakit akış modelleri oluşturmak temel vizyonumuzdur.',
    cap_legal: '* Yakın Capital, lisans gerektiren portföy yönetimi veya finansal aracılık faaliyetleri yürütmez.',
    cap_c1_title: 'Finansman ve Kredi', cap_c1_i1: 'Banka proje finansmanı', cap_c1_i2: 'Leasing organizasyonu', cap_c1_i3: 'Hakediş bazlı finansman modelleri',
    cap_c2_title: 'Yatırım ve Yapılandırma', cap_c2_i1: 'GYO iş birlikleri', cap_c2_i2: 'Girişim sermayesi ilişkileri', cap_c2_i3: 'SPV kurulumu',
    cap_c3_title: 'Risk ve Danışmanlık', cap_c3_i1: 'Nakit akışı modelleme', cap_c3_i2: 'Sigorta ve teminat çözümleri', cap_c3_i3: 'Finansal fizibilite danışmanlığı',
    cap_phase1_title: 'Bugün — Stratejik İş Birlikleri', cap_phase1_desc: 'Bankalar, leasing şirketleri ve sigorta kuruluşlarıyla çerçeve anlaşmalar.',
    cap_phase2_title: 'Advisory — Danışmanlık', cap_phase2_desc: 'Proje finansmanı danışmanlığı, finansal modelleme ve risk yönetimi.',
    cap_phase3_title: 'Fund — Yatırım Fonu', cap_phase3_desc: 'Gayrimenkul yatırım fonları ve yabancı yatırımcı katılımıyla proje bazlı platform.',
    tech_desc: 'Ağır sanayi, enerji ve altyapı projelerini ileri teknoloji ile uçtan uca dijitalleştiriyoruz.',
    tech_heading: 'Geleceğin Proje Yönetimi',
    tech_sub: 'Yakın Platform ile tüm mühendislik, satınalma ve saha koordinasyonunu tek ekrana taşıyoruz.',
    tech_t1_title: 'Dijital Hakediş', tech_t1_desc: 'Karmaşık taşeron ve malzeme süreçlerini otomatize ederek anlık, şeffaf hakediş onay ve ödeme altyapıları.',
    tech_t2_title: 'Yapay Zekâ', tech_t2_desc: 'Şantiye verimliliğini makine öğrenmesi ile analiz ediyor, iş güvenliği risklerini ve maliyet artışlarını öngörüyoruz.',
    tech_t3_title: 'BIM Entegrasyonu', tech_t3_desc: '5D dijital ikizler oluşturarak yapı ömrü boyunca kusursuz veri yönetimi ve proje koordinasyonu.',
    tech_t4_title: 'Yakın Platform', tech_t4_desc: 'İleri seviye proje yönetim yazılımımız ile tüm mühendislik, satınalma ve saha koordinasyonu tek ekranda.',
    partners_title: 'Teknoloji İş Ortaklarımız',
    partners_subtitle: 'Dünya devleri ile uluslararası standartlarda sistem entegrasyonu sağlıyoruz.',
    market_heading: 'Yakın Grup Online Marketplace',
    market_sub: 'Endüstriyel ekipman tedariki ve enerji & bilgi teknolojileri ürünlerine erişimde hızlı dijital altyapı.',
    badge_soon: 'ÇOK YAKINDA',
    market_b2b_title: 'B2B Kurumsal Alım Portalı',
    market_b2b_desc: 'Anlaşmalı tedarikçilerimiz ve bayilerimiz için toptan sipariş, özel vergi indirimleri, şartnamelere uygun teklif toplama paneli.',
    market_b2c_title: 'B2C Bireysel Sipariş',
    market_b2c_desc: 'Güneş PV camları, ev tipi şarj cihazları ve bina solar panelleri için doğrudan perakende satış ve montaj başvuru kanalları.',
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
    tag_construction: 'CONSTRUCTION & EPC', tag_energy: 'ENERGY & TECHNOLOGY',
    tag_capital: 'FINANCE & INVESTMENT', tag_technology: 'DIGITAL & AI',
    tag_group: 'YAKIN GROUP HOLDING', tag_about: 'CORPORATE TRUST',
    tag_portfolio: 'OUR PROJECTS', tag_partners: 'ENGINEERING PARTNERS',
    tag_store: 'ONLINE STORE & PORTAL', tag_digital: 'DIGITAL TRANSFORMATION',
    tag_cap_advisory: 'CAPITAL ADVISORY',
    cluster_a_label: 'CLUSTER A', cluster_b_label: 'CLUSTER B',
    cluster_a_title: 'Renewable Energy & Mechanical Systems',
    cluster_b_title: 'Low-Current, Network & Cybersecurity',
    hero_badge1: 'CONSTRUCTION & EPC', hero_badge2: 'RENEWABLE ENERGY',
    hero_badge3: 'FINANCE & INVESTMENT', hero_badge4: 'DIGITAL & AI',
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
    group_body: 'Yakın Group is an engineering holding operating in construction EPC, renewable energy, project financing and digital technology.',
    stat_years: 'Years Experience', stat_area: 'm² Construction Area',
    stat_mw: 'MW Installed Capacity', stat_companies: 'Group Companies',
    stat_mw_full: 'MW Total Installed Capacity', stat_co2: 'Tons CO₂ Reduction',
    stat_scada: 'Smart SCADA Monitoring', stat_services: 'Service Categories',
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
    portfolio_title: 'Featured Project Gallery',
    c_gal1_title: 'T-3 Data Center Construction', c_gal2_title: 'International Airport Terminal',
    c_gal3_title: 'Vadi Mansions Living Complex', c_gal4_title: 'Structural Retrofitting & BIM Design',
    e_title: 'Yakın Energy',
    e_desc: 'Focused on high efficiency in collaboration with global brands like Huawei, ABB, and Vertiv.',
    e_a1_title: 'Solar Energy Systems (SPP)', e_a1_desc: 'High-capacity efficiency integration in land and rooftop solar EPC projects.',
    e_a2_title: 'Wind Energy', e_a2_desc: 'Wind farm installation and facility engineering, turbine integration services.',
    e_a3_title: 'Hybrid Energy & BESS', e_a3_desc: 'Integrating solar and wind energy with lithium battery storage technologies.',
    e_a4_title: 'Mechanical Installations', e_a4_desc: 'HVAC, piping, air conditioning and mechanical project design.',
    e_b1_title: 'Cybersecurity Advisory', e_b1_desc: 'IT security, SOC setup, penetration testing and security audits.',
    e_b2_title: 'Data Center & Network Architecture', e_b2_desc: 'Backbone network installation, server optimization and low-current solutions.',
    e_b3_title: 'Smart Building Automation', e_b3_desc: 'Facility automation systems, BMS and SCADA integration projects.',
    e_b4_title: 'Electrical Infrastructure', e_b4_desc: 'Strong and low current electrical design, panel and distribution layout.',
    cap_desc: 'Yakın Capital is an advisory and investment platform that develops group projects end-to-end and creates financing solutions.',
    cap_heading: 'Multi-Disciplinary Finance Structuring',
    cap_body: 'Our vision is not only to develop construction and energy projects, but also to organize their financing, manage risks and create sustainable cash flow models.',
    cap_legal: '* Yakın Capital does not conduct portfolio management or financial brokerage activities requiring licenses.',
    cap_c1_title: 'Financing & Credit', cap_c1_i1: 'Bank project financing', cap_c1_i2: 'Leasing organization', cap_c1_i3: 'Progress-based financing models',
    cap_c2_title: 'Investment & Structuring', cap_c2_i1: 'REIT partnerships', cap_c2_i2: 'Venture capital relations', cap_c2_i3: 'SPV setup',
    cap_c3_title: 'Risk & Advisory', cap_c3_i1: 'Cash flow modeling', cap_c3_i2: 'Insurance and collateral solutions', cap_c3_i3: 'Financial feasibility consulting',
    cap_phase1_title: 'Today — Strategic Partnerships', cap_phase1_desc: 'Framework agreements with banks, leasing companies and insurance institutions.',
    cap_phase2_title: 'Advisory Phase', cap_phase2_desc: 'Project financing advisory, financial modeling and risk management.',
    cap_phase3_title: 'Fund Phase', cap_phase3_desc: 'Project-based investment platform with real estate funds and foreign investors.',
    tech_desc: 'We digitize heavy industry, energy and infrastructure projects end-to-end with advanced technology.',
    tech_heading: 'Next-Gen Project Management',
    tech_sub: 'With Yakın Platform, all engineering, procurement and field coordination in one screen.',
    tech_t1_title: 'Digital Progress Payments', tech_t1_desc: 'Automated subcontractor and material processes with instant, transparent payment approval infrastructure.',
    tech_t2_title: 'Artificial Intelligence', tech_t2_desc: 'Analyzing site efficiency with ML, predicting safety risks and cost overruns in advance.',
    tech_t3_title: 'BIM Integration', tech_t3_desc: '5D digital twins for flawless data management and project coordination throughout building lifecycle.',
    tech_t4_title: 'Yakın Platform', tech_t4_desc: 'Our advanced project management software consolidates all engineering, procurement and field coordination.',
    partners_title: 'Technology Partners',
    partners_subtitle: 'System integration at international standards with global industry leaders.',
    market_heading: 'Yakın Group Online Marketplace',
    market_sub: 'Fast digital infrastructure for industrial equipment supply and energy & IT products.',
    badge_soon: 'COMING SOON',
    market_b2b_title: 'B2B Corporate Procurement Portal',
    market_b2b_desc: 'Bulk ordering, special tax discounts, and specification-compliant quote collection panel for contracted suppliers and dealers.',
    market_b2c_title: 'B2C Individual Orders',
    market_b2c_desc: 'Direct retail sales and installation application channels for solar PV panels, home EV chargers and building solar systems.',
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
// Close when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// ── Smooth scroll for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Reveal on scroll (IntersectionObserver) ────────────────────────────────
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

// ── Gallery / Lightbox ─────────────────────────────────────────────────────
const galleryImages = [
  { src: 'assets/images/gallery_datacenter_1785092833568.png', title: 'T-3 Veri Merkezi Yapımı', caption: 'Ankara / Türkiye' },
  { src: 'assets/images/construction_hero_1784577666966.png', title: 'Uluslararası Havalimanı Terminali', caption: 'İzmir / Türkiye' },
  { src: 'assets/images/gallery_vadi_mansion_1785092899049.png', title: 'Vadi Konakları Yaşam Kompleksi', caption: 'İstanbul / Türkiye' },
  { src: 'assets/images/gallery_seismic_retrofitting_1785092947617.png', title: 'Yapı Güçlendirme & BIM Tasarımı', caption: 'Deprem Mühendisliği' },
];
let lightboxIdx = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  const img = galleryImages[lightboxIdx];
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-title').textContent = img.title;
  document.getElementById('lightbox-caption').textContent = img.caption;
  document.getElementById('lightbox-dialog').showModal();
}
function closeLightboxDialog() { document.getElementById('lightbox-dialog').close(); }
function navigateLightbox(dir) {
  lightboxIdx = (lightboxIdx + dir + galleryImages.length) % galleryImages.length;
  openLightbox(lightboxIdx);
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

  // Auto-advance slider
  slideTimer = setInterval(() => goToSlide(slideIndex + 1), SLIDE_INTERVAL);
});
