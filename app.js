/* ==========================================================================
   YAKIN GRUP — CORE JS STABILITY & TRANSLATION ENGINE
   ========================================================================== */

// Global State
let currentLang = localStorage.getItem('yakin_lang');
if (!currentLang) {
  currentLang = navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}
let activeSector = sessionStorage.getItem('yakin_sector') || null; // 'construction', 'energy' or null (splash)
let constSlideIndex = 0;
let energySlideIndex = 0;
let lightboxIndex = 0;
let lightboxSector = 'construction';

// Translation Dictionary (TR / EN)
const TRANSLATIONS = {
  tr: {
    // Nav & General Buttons
    nav_about: "Kurumsal",
    nav_services: "Hizmetlerimiz",
    nav_partners: "İş Ortaklarımız",
    nav_marketplace: "Online Mağaza",
    nav_energy_it: "Siber Güvenlik & IT",
    nav_contact: "İletişim",
    btn_explore: "Keşfet",
    btn_view_details: "Hizmetlerimizi İncele",
    btn_switch_sector: "Sektör Değiştir",
    btn_market_register: "Bekleme Listesine Katıl",
    btn_market_browse: "Kataloğu İncele",
    btn_send: "Mesajı Gönder",
    btn_vcard_download: "Kartviziti İndir (.vcf)",
    btn_vcard_share: "Paylaş",
    btn_market_join: "Beni Listeye Ekle",

    // Splash Screen
    tag_construction: "İNŞAAT & TAAHHÜT",
    tag_energy: "ENERJİ & TEKNOLOJİ",
    splash_const_title: "Geleceğin Güçlü Altyapıları",
    splash_const_desc: "Veri merkezleri, endüstriyel tesisler ve ağır mühendislik taahhüt projelerinde küresel standartlar.",
    splash_energy_title: "Sürdürülebilir Enerji Çözümleri",
    splash_energy_desc: "Güneş, rüzgar, akıllı bina otomasyonu ve ileri düzey siber güvenlik altyapı mühendisliği.",
    splash_tagline: "Mühendislik ve Enerjide Güç Birliği",

    // Common Sections Badges & Titles
    tag_about: "KURUMSAL GÜVEN",
    tag_portfolio: "PROJELERİMİZ",
    tag_technology: "MÜHENDİSLİK PAYDAŞLARI",
    tag_store: "ONLINE SATIŞ & PORTAL",
    stat_experience: "Yıllık Tecrübe",
    stat_area: "m² İnşaat Alanı",
    stat_success: "Teslimat Başarısı",
    stat_power: "MW Toplam Kurulu Güç",
    stat_reduction: "Ton CO₂ Azaltımı",
    stat_monitoring: "Akıllı SCADA İzleme",
    portfolio_title: "Seçkin Proje Galerisi",
    partners_title_const: "Proje Referanslarımız",
    partners_subtitle_const: "Türkiye ve bölge genelinde imza attığımız prestijli inşaat ve taahhüt projeleri.",
    tag_const_refs: "PROJE REFERANSLARI",
    partners_title: "Teknoloji İş Ortaklarımız",
    partners_subtitle: "Dünya devleri ile uluslararası standartlarda sistem entegrasyonu sağlıyoruz.",
    market_heading: "Yakın Grup Online Marketplace",
    market_sub: "Endüstriyel ekipman tedariki ve enerji & bilgi teknolojileri ürünlerine erişimde hızlı dijital altyapı.",
    badge_soon: "ÇOK YAKINDA",
    market_b2b_title: "B2B Kurumsal Alım Portalı",
    market_b2b_desc: "Anlaşmalı tedarikçilerimiz ve bayilerimiz için toptan sipariş, özel vergi indirimleri, şartnamelere uygun teklif toplama paneli.",
    market_b2c_title: "B2C Bireysel Siparişi",
    market_b2c_desc: "Güneş PV camları, ev tipi şarj cihazları ve bina solar panelleri için doğrudan perakende satış ve montaj başvuru kanalları.",
    vcard_list_title: "Kurumsal İrtibat Noktaları",
    contact_title: "Bizimle İletişime Geçin",
    contact_desc: "Projeleriniz veya danışmanlık ihtiyaçlarınız için ekibimiz 7/24 hazırdır.",
    contact_lbl_loc: "Merkez Ofis",
    contact_lbl_phone: "Telefon",
    contact_lbl_mail: "E-posta",
    contact_form_title: "Haberleşme Formu",
    lbl_form_name: "Adınız Soyadınız / Firma",
    lbl_form_email: "E-posta Adresiniz",
    lbl_form_phone: "Telefon Numaranız",
    lbl_form_sector: "İlgili Birim / Sektör",
    lbl_form_msg: "Mesajınız",
    lbl_form_type: "Müşteri Türü",
    lbl_market_opt: "Online Mağaza / B2B",
    vc_ilker_title: "Yönetim Kurulu Başkanı / CEO (Mühendis)",
    vc_eylul_title: "Operasyon Direktörü / COO (Mimar)",
    vc_murat_title: "Mühendislik & Operasyon Lideri",

    // Modals
    field_phone: "Telefon",
    field_email: "E-posta",
    field_office: "Ofis Adresi",
    market_dialog_title: "Yakın Grup Marketplace Erişimi",
    market_dialog_desc: "Hizmet vermeye başlayacağımız mağaza altyapımız için erken erişim başvurusu.",
    market_b2b_opt: "Kurumsal / B2B Bayi Alıcısı",
    market_b2c_opt: "Bireysel / B2C Satış Talebi",
    market_kvkk_note: "KVKK İletişim izni şartlarını ve bilgilendirme formunu okudum ve kabul ediyorum.",
    footer_tagline: "Mühendislik temelli yaklaşımlarla altyapı ve enerjinin birleşimi.",
    footer_col_services: "Sektör Çözümleri",
    footer_col_corporate: "Kurumsal Bilgiler",
    footer_col_legal: "Yasal Mevzuat",
    footer_kvkk: "KVKK Aydınlatma Metni",
    footer_cookies: "Çerez Politikası",
    footer_terms: "Kullanım Şartları",
    footer_lic_note: "Marka logoları tanıtım amaçlı olup mülkiyet hakları yetkili tescil sahiplerine aittir.",
    footer_presentation: "Banka, Yatırımcı ve Finansman Ortaklığı Sunumu | 2026",

    // Inside Portals Localizations
    c_hero1_title: "Veri Merkezi İnşaatları",
    c_hero1_desc: "Tier III ve Tier IV sertifikalı, yüksek güvenilirlikli (mission-critical) veri merkezleri inşası.",
    c_hero2_title: "Ağır Sanayi Tesisleri",
    c_hero2_desc: "Fabrikalar, dökümhaneler ve enerji üretim santrallerinde mühendislik ve anahtar teslim taahhüt.",
    c_hero3_title: "Konut ve Yaşam Projeleri",
    c_hero3_desc: "Modern mimari, yenilikçi yaklaşım ve ileri mühendislikle tasarlanan lüks yaşam kompleksleri.",
    c_hero4_title: "Yapı Mühendisliği & Müşavirlik",
    c_hero4_desc: "İleri seviye deprem mühendisliği, BIM entegrasyonu ve kapsamlı teknik projelendirme.",
    c_about_heading: "Yakın Grup İnşaat Mühendisliği",
    c_about_lead: "Endüstriyel vizyonumuz ve teknik tecrübemiz ile yapı sektöründe sınırları çiziyoruz.",
    c_about_body: "Mühendislik temelli yaklaşımımız, ağır inşaat projelerinde en yüksek uluslararası standartları garanti eder. Veri merkezlerinden konut ve sanayi yapılarına kadar her yapıda üstün kalite, dayanıklılık ve sürdürülebilir yöntemler uyguluyoruz.",
    c_services_title: "Endüstriyel İnşaat Çözümlerimiz",

    e_hero1_title: "Güneş Enerjisi Sistemleri",
    e_hero1_title: "GES / RES & Hibrit Enerji Sistemleri",
    e_hero1_desc: "Arazi ve çatı tipi GES, karasal RES ve hibrit enerji sistemlerinde yüksek kapasite EPC projeleri.",
    e_hero2_title: "Akıllı Bina & Siber Güvenlik",
    e_hero2_desc: "Tesis otomasyon sistemleri ve zayıf akım tasarımları ile veri merkezleri için IT güvenliği.",
    e_hero3_title: "Hibrit Enerji & Batarya Depolama",
    e_hero3_desc: "Güneş ve rüzgar enerjisi sistemlerini lityum batarya (BESS) teknolojileriyle entegre ediyoruz.",
    e_hero4_title: "Veri Merkezi & Ağ Mimarisi",
    e_hero4_desc: "Tier sertifikalı veri merkezlerinde omurga ağ kurulumu, sunucu optimizasyonu ve zayıf akım çözümleri.",
    e_about_heading: "Yakın Grup Enerji & Akıllı Altyapı",
    e_about_lead: "Doğa ile uyumlu yenilenebilir enerji kaynakları ve yapay zeka entegreli yönetim teknolojileri.",
    e_about_body: "Sürdürülebilir kalkınmanın merkezine yenilenebilir enerjiyi koyuyoruz. Huawei, ABB, Vertiv gibi küresel markalar ile iş birliği içinde yüksek verimliliğe odaklanıyor, akıllı kontrol şebekeleri ve güvenli ağ mimarileri geliştiriyoruz.",
    e_services_title: "Enerji, Haberleşme ve Siber Güvenlik Mimariniz",
    cluster_a_title: "KÜME A — Yenilenebilir Enerji & Mekanik Sistemler",
    cluster_b_title: "KÜME B — Zayıf Akım, Network & Siber Güvenlik Müşavirliği",

    c_gal1_title: "T-3 Veri Merkezi Yapımı", c_gal1_sub: "Ankara / Türkiye",
    c_gal2_title: "Ağır Çelik Döküm Fabrikası", c_gal2_sub: "Kocaeli / Türkiye",
    c_gal3_title: "Vadi Konakları Yaşam Kompleksi", c_gal3_sub: "İstanbul / Türkiye",
    c_gal4_title: "Yapı Güçlendirme & BIM Tasarımı", c_gal4_sub: "Deprem Mühendisliği",

    e_gal1_title: "150 MW Arazi GES Kurulumu", e_gal1_sub: "Konya / Türkiye",
    e_gal2_title: "Akıllı Kamu Binası Otomasyonu", e_gal2_sub: "İzmir / Türkiye",
    e_gal3_title: "Sertifikalı Tier III Veri Merkezi Beyaz Alan", e_gal3_sub: "Bursa / Türkiye",
    e_gal4_title: "Siber Güvenlik Omurga Kurulumu", e_gal4_sub: "Finans Kurumu"
  },
  en: {
    nav_about: "Corporate",
    nav_services: "Services",
    nav_partners: "Technology Partners",
    nav_marketplace: "Shop / Marketplace",
    nav_energy_it: "Cybersecurity & IT",
    nav_contact: "Contact",
    btn_explore: "Explore",
    btn_view_details: "Discover Solutions",
    btn_switch_sector: "Switch Sector",
    btn_market_register: "Join Waitlist",
    btn_market_browse: "Browse Catalog",
    btn_send: "Send Message",
    btn_vcard_download: "Download vCard (.vcf)",
    btn_vcard_share: "Share Contact",
    btn_market_join: "Add Me to List",

    tag_construction: "CONSTRUCTION & EPC",
    tag_energy: "ENERGY & TECHNOLOGY",
    splash_const_title: "High-performance Infrastructure",
    splash_const_desc: "Global standards in mission-critical data centers, heavy industrial facilities, and contracting projects.",
    splash_energy_title: "Sustainable Solution Architecture",
    splash_energy_desc: "Utility solar, smart automation systems, precision mechanical HVAC, and network cyber security.",
    splash_tagline: "Synergy in Engineering and Energy Systems",

    tag_about: "CORPORATE TRUST",
    tag_portfolio: "PROJECTS",
    tag_technology: "ENGINEERING ALLIANCES",
    tag_store: "ONLINE SHOP & PORTAL",
    stat_experience: "Years Experience",
    stat_area: "m² Construction Area",
    stat_success: "Delivery Success",
    stat_power: "MW Total Installed Power",
    stat_reduction: "Tons CO₂ Saved",
    stat_monitoring: "Smart SCADA Control",
    portfolio_title: "Featured Project Gallery",
    partners_title_const: "Project References",
    partners_subtitle_const: "Prestigious construction and contracting reference projects delivered across the region.",
    tag_const_refs: "PROJECT REFERENCES",
    partners_title: "Technology Partners",
    partners_subtitle: "Upholding global standards with leading industrial partners.",
    market_heading: "Yakin Group Marketplace",
    market_sub: "High-speed digital platform for industrial equipment, energy & information technology products.",
    badge_soon: "COMING SOON",
    market_b2b_title: "B2B Corporate Portal",
    market_b2b_desc: "Bulk order placement, special industry discounts, customized quotation requests for developers and partner agencies.",
    market_b2c_title: "B2C Consumer Shop",
    market_b2c_desc: "Direct retail, ordering and configuration for balcony PV systems, residential EV chargers, and solar roof glass.",
    vcard_list_title: "Contact Registry Directory",
    contact_title: "Reach Out to Us",
    contact_desc: "Our project steering team is available 24/7 for technical inquiries.",
    contact_lbl_loc: "Headquarters",
    contact_lbl_phone: "Phone",
    contact_lbl_mail: "Email",
    contact_form_title: "Inquiry Dispatch",
    lbl_form_name: "Full Name / Organization",
    lbl_form_email: "Email Address",
    lbl_form_phone: "Phone Reference",
    lbl_form_sector: "Division / Target Sector",
    lbl_form_msg: "Message Content",
    lbl_form_type: "Client Category",
    lbl_market_opt: "Online Store / B2B",
    vc_ilker_title: "Chairman of the Board / CEO (Engineer)",
    vc_eylul_title: "Chief Operating Officer / COO (Architect)",
    vc_murat_title: "Engineering & Operations Leader",

    field_phone: "Phone",
    field_email: "Email",
    field_office: "HQ Address",
    market_dialog_title: "Yakin Group Marketplace Entry",
    market_dialog_desc: "Register your interest early for our digital parts marketplace integration.",
    market_b2b_opt: "Enterprise / B2B Procurement Officer",
    market_b2c_opt: "Individual Customer / Retail Buyer",
    market_kvkk_note: "I have read and consent to the data protection / GDPR guidelines.",
    footer_tagline: "Aligning technical construction engineering with green energy networks.",
    footer_col_services: "Business Sectors",
    footer_col_corporate: "Company Profile",
    footer_col_legal: "Information",
    footer_kvkk: "Privacy Policy (GDPR)",
    footer_cookies: "Cookie Policy",
    footer_terms: "Terms of Service",
    footer_lic_note: "Logo trademarks belong to their respective registered legal owners.",
    footer_presentation: "Bank, Investor & Financing Partnership Presentation | 2026",

    c_hero1_title: "Data Center Construction",
    c_hero1_desc: "Tier III and Tier IV certified critical facilities building from site design to operations.",
    c_hero2_title: "Industrial Plant Engineering",
    c_hero2_desc: "Turnkey EPC construction for factories, metal foundries, and thermal / solar power fields.",
    c_hero3_title: "Residential & Lifestyle Projects",
    c_hero3_desc: "Luxury residential complexes designed with modern architecture, innovative approaches, and advanced engineering.",
    c_hero4_title: "Structural Engineering & Consulting",
    c_hero4_desc: "Advanced seismic engineering, BIM integration, and comprehensive technical project design.",
    c_about_heading: "Yakin Group Heavy Engineering",
    c_about_lead: "Pushing infrastructural limits through premium systems design and execution.",
    c_about_body: "Our heavy construction framework implements international directives. From mission-critical server environments to urban housing developments, we ensure engineering resilience.",
    c_services_title: "Civil & Infrastructure Services",

    e_hero1_title: "Utility Photovoltaic Arrays",
    e_hero1_title: "Solar (SPP) / Wind (WPP) & Hybrid Energy",
    e_hero1_desc: "Utility-scale solar, onshore wind, and hybrid microgrid EPC projects at high capacity.",
    e_hero2_title: "Smart Facility Integration",
    e_hero2_desc: "Building management networks, structural low-voltage circuits, and data security nodes.",
    e_hero3_title: "Hybrid Energy & Battery Storage",
    e_hero3_desc: "Integrating solar and wind energy systems with advanced lithium battery (BESS) technologies.",
    e_hero4_title: "Data Center & Network Architecture",
    e_hero4_desc: "Backbone network installation, server optimization, and low-voltage solutions for Tier-certified data centers.",
    e_about_heading: "Yakin Group Energy & Intelligence",
    e_about_lead: "Interfacing eco-friendly grid distribution with machine-learning industrial optimization.",
    e_about_body: "Sustainability powers our future. Operating alongside global giants like Huawei, Vertiv, and ABB, we build intelligent energy collection layouts and secure network routing systems.",
    e_services_title: "Energy & Infrastructure Architecture",
    cluster_a_title: "CLUSTER A — Renewable Power & Mechanical Systems",
    cluster_b_title: "CLUSTER B — Smart Building Controls, Networks & Cybersecurity",

    c_gal1_title: "T-3 Datacenter Site", c_gal1_sub: "Ankara / Turkey",
    c_gal2_title: "Heavy Steel Casting Plant", c_gal2_sub: "Kocaeli / Turkey",
    c_gal3_title: "Vadi Residences Complex", c_gal3_sub: "Istanbul / Turkey",
    c_gal4_title: "Structural Retrosfit & BIM Plan", c_gal4_sub: "Seismic Engineering",

    e_gal1_title: "150 MW Solar PV Plant", e_gal1_sub: "Konya / Turkey",
    e_gal2_title: "Smart Municipal Administration BMS", e_gal2_sub: "Izmir / Turkey",
    e_gal3_title: "Tier III Server White Space", e_gal3_sub: "Bursa / Turkey",
    e_gal4_title: "Secured Backbone Enterprise Router", e_gal4_sub: "Banking Client"
  }
};

// Raw Services Data Lists
const CONSTRUCTION_SERVICES = [
  {
    icon: "🏢",
    tr_title: "6.1. Veri Merkezi İnşaatları",
    en_title: "6.1. Data Center Construction (Mission-Critical)",
    tr_desc: "Data Solutions, uluslararası standartlarda ve Tier 1-2-3-4 sertifikasyonlarına uyumlu mission-critical tesislerin inşası.",
    en_desc: "International mission-critical facility construction conforming to Tier 1-2-3-4 regulatory and design specifications.",
    tr_items: [
      "Anahtar teslim veri merkezi bina inşaatı (shell & core'dan tam donanıma)",
      "Tier 1-2-3-4 gereksinimlerine tam uygun statik ve mimari tasarım",
      "Modüler ve konteyner tipi veri merkezi montajı",
      "Mekanik ve elektrik altyapıya entegre hassas bina mühendisliği",
      "Yangın güvenliği altyapısı ve gazlı yangın söndürme bölmeleri",
      "Hızlandırılmış (fast-track) inşaat planlama metodolojisi"
    ],
    en_items: [
      "Turnkey data center construction (shell & core to active network setup)",
      "Architectural planning custom-tailored to Tier 1-2-3-4 conditions",
      "Modular containerized deployment configurations",
      "Sensory heat extraction system building design",
      "Clean-agent fire extinguishing compartment engineering",
      "Fast-track scheduling and building acceleration management"
    ],
    img: "assets/images/construction_hero_1784577666966.png"
  },
  {
    icon: "🏭",
    tr_title: "6.2. Endüstriyel Tesis İnşaatı",
    en_title: "6.2. Industrial Plants & Heavy Factories",
    tr_desc: "Uçtan uca ağır mühendislik, fabrika, dökümhane, santral ve depolama sahaları inşası.",
    en_desc: "Turnkey layouts for mechanical manufacturing plants, factories, metal casting fields, and logistics units.",
    tr_items: [
      "Otomotiv, gıda, kimya tesisleri inşaatı",
      "Ağır sanayi dökümhane binaları",
      "Termik, hidroelektrik ve yenilenebilir enerji santral binaları",
      "Lojistik depoları ve liman antrepoları",
      "Ağır çelik konstrüksiyon çözümleri",
      "Tesis genişletme ve yapısal revizyonlar"
    ],
    en_items: [
      "Automotive, food-prep, and chemical factories layout",
      "Heavy load casting foundry structures",
      "Hydroelectric and solar powerhouse building construction",
      "Distribution centers and port containment depots",
      "Large-span heavy steel frame configuration",
      "Structural rehabilitation and plant size extension"
    ],
    img: "assets/images/heavy_industry_factory_1785010003542.png"
  },
  {
    icon: "🏡",
    tr_title: "6.3. Konut ve Yaşam Projeleri",
    en_title: "6.3. Residential Developments",
    tr_desc: "Premium yaşam alanları, yeşil bina standartlarına uygun konut projeleri.",
    en_desc: "Luxurious smart villas, high-rise living towers, and LEED conform green housing developments.",
    tr_items: [
      "Karma kullanımlı (mixed-use) prestij kuleleri",
      "Modern villa siteleri ve lüks konutlar",
      "Planlı kentsel dönüşüm blokları",
      "Yeşil Bina (LEED, BREEAM) entegreli konut mühendisliği"
    ],
    en_items: [
      "Mixed-use high-rise apartment towers",
      "Contemporary community villas and luxury estates",
      "Urban regeneration zone construction",
      "LEED/BREEAM certified smart houses"
    ],
    img: "assets/images/residential_luxury_project_1785010053703.png"
  },
  {
    icon: "📐",
    tr_title: "6.4. Yapı Mühendisliği & Müşavirlik",
    en_title: "6.4. Civil Engineering & Consultancy",
    tr_desc: "EPC/BIM odaklı proje denetimi, deprem mühendisliği ve mimarlık hizmetleri.",
    en_desc: "EPC design-build directives, seismic safety evaluation, and automated BIM coordination.",
    tr_items: [
      "Anahtar teslim EPC/Design-Build müşavirliği",
      "Statik betonarme ve çelik yapı mukavemet hesabı",
      "BIM (Yapı Bilgi Modellemesi) sistem entegrasyonu",
      "Kalite kontrol (QA/QC) ve saha iş güvenliği (HSE) denetimi",
      "Deprem dayanım analizi ve modern ankraj güçlendirmesi"
    ],
    en_items: [
      "Design-Build EPC engineering coordination",
      "Reinforced concrete and hollow section structural load calculation",
      "BIM (Building Information Modeling) asset management",
      "Operational HSE supervision and QA/QC quality assurance",
      "Retrofitting structures for severe seismic events"
    ],
    img: "assets/images/civil_engineering_bim_1785010076530.png"
  },
  {
    icon: "💼",
    tr_title: "6.5. İhale ve Sözleşme Yönetimi",
    en_title: "6.5. Tender & Procurement Management",
    tr_desc: "FIDIC standartlarına tam uyumlu şartname, RFI ve tedarikçi değerlendirme yönetimi.",
    en_desc: "Drafting technical guidelines, RFI/RFP evaluation, and contract assessment matching FIDIC norms.",
    tr_items: [
      "Gelişmiş idari ve teknik şartname paketleri oluşturma",
      "RFI, RFP, RFQ süreç takipleri",
      "FIDIC standartlarında uluslararası ihale danışmanlığı",
      "Yüklenici ön yeterlilik analizleri"
    ],
    en_items: [
      "Compiling complete contract packages and technical specs",
      "Tracking active RFI, RFP, and RFQ workflows",
      "FIDIC matching international contract advisory",
      "Subcontractor pre-qualification analysis"
    ],
    img: "assets/images/tender_contract_management_1785010026255.png"
  },
  {
    icon: "📈",
    tr_title: "6.6. Yatırım ve Finans Danışmanlığı",
    en_title: "6.6. Real Estate & Project Finance",
    tr_desc: "Mali fizibilite analizleri ve risk profili oluşturma hizmetleri.",
    en_desc: "Feasibility evaluations and risk profiling for large infrastructures investment portfolio optimization.",
    tr_items: [
      "Mali fizibilite raporları ve yatırım geri dönüş (ROI) takvimleri",
      "Proje finansmanı yapılandırma desteği",
      "İnşaat maliyet bütçe optimizasyonu"
    ],
    en_items: [
      "Financial feasibility audits and ROI schedules",
      "Structuring project capital allocations",
      "Construction cost budget control and risk estimation"
    ],
    img: "assets/images/investment_finance_real_estate_1785010111511.png"
  }
];

const ENERGY_CLUSTER_A = [
  {
    tr_title: "7.1. Güneş Enerjisi (GES) / Rüzgar Enerjisi (RES) & Hibrit Sistemler",
    en_title: "7.1. Solar (SPP) / Wind (WPP) & Hybrid Energy Systems",
    tr_items: [
      "Arazi tipi (utility-scale) mega GES ve RES sahaları taahhüt (EPC) işleri",
      "Endüstriyel çatı GES panel tasarımı ve saha uyarlaması",
      "GES + RES hibrit mikro-şebeke (microgrid) tasarım ve entegrasyonu",
      "Uzaktan O&M (Bakım-Onarım) ve IoT SCADA performans analitiği"
    ],
    en_items: [
      "Utility-scale photovoltaic (SPP) and onshore wind (WPP) EPC coordination",
      "Industrial roof solar arrays engineering and placement",
      "Solar + Wind hybrid microgrid design and grid integration",
      "Remote O&M inspection and IoT SCADA analysis"
    ],
    partners: "Huawei FusionSolar, SMA, Trina Solar, Longi Solar"
  },
  {
    tr_title: "7.2. Dikey Eksenli Rüzgar Türbini Sistemleri",
    en_title: "7.2. Vertical Axis Wind Turbines",
    tr_items: [
      "Kentsel ve endüstriyel çatılar için verimli dikey türbinler",
      "Gelişmiş rüzgar-solar hibrit mikro-şebeke (microgrid) tasarımları",
      "Düşük sürtünmeli sessiz jeneratör rotör teknolojileri"
    ],
    en_items: [
      "Compact vertical axis wind turbines for urban/plant rooftops",
      "Wind-solar hybrid microgrid circuit optimization",
      "Acoustically insulated generators with low kinetic friction"
    ],
    partners: "Yakin Energy Industrial Division"
  },
  {
    tr_title: "7.3. Fotovoltaik Akıllı Cam Sistemleri (BIPV)",
    en_title: "7.3. Building Integrated Photovoltaics (BIPV)",
    tr_items: [
      "Elektrik üreten akıllı cam giyotin balkon sistemleri",
      "Çatı güneş camı entegre tasarımları (solar rooftop glazing)",
      "Cephe giydirmeli yarı geçirgen PV silikon cam paneller (solar curtains)"
    ],
    en_items: [
      "Power-generating double-glazed balcony systems",
      "Solar rooftop glazing components construction",
      "BIPV curtain walls and semi-transparent window panels"
    ],
    partners: "Yakin Glass Tech, AGC Solar"
  },
  {
    tr_title: "7.4. Hibrit Enerji Sistemleri & Batarya Depolama",
    en_title: "7.4. Hybrid Systems & Battery Energy Storage (BESS)",
    tr_items: [
      "Güneş-rüzgar-şebeke dinamik kontrolör tasarımları",
      "Konteyner tipi endüstriyel BESS depolama üniteleri kurulumu",
      "Akıllı EMS (Enerji Yönetim Yazılımları) ile frekans dengeleme"
    ],
    en_items: [
      "Solar-wind-grid multi-input dynamic controller design",
      "Containerized BESS lithium pack field installations",
      "Intelligent EMS algorithms for load balancing/shaving"
    ],
    partners: "ABB, Huawei, SolarEdge, Tesla Megapack"
  },
  {
    tr_title: "7.5. EV Şarj İstasyonları & EPC Kurulumu",
    en_title: "7.5. Electric Vehicle (EV) Chargers & Grid Integration",
    tr_items: [
      "DC yüksek hızlı otoban şarj şebekeleri ve AC bireysel kutular",
      "Filo taşımacılık ve toplu otopark şarj altyapısı tasarımı",
      "EPC anahtar teslim enerji şebeke bağlantı mühendisliği"
    ],
    en_items: [
      "High-power DC highway chargers and local AC smart wallboxes",
      "Fleet logistics parking hub charging configurations",
      "Medium voltage grid connection EPC permits and wiring"
    ],
    partners: "ABB E-mobility, Schneider Electric"
  },
  {
    tr_title: "7.6. Isı Pompası, HVAC & İklimlendirme",
    en_title: "7.6. Heat Pumps & Precision Climate Control (HVAC)",
    tr_items: [
      "Toprak ve hava kaynaklı endüstriyel ısı pompası tesisatları",
      "Büyük alan VRF, chiller iklimlendirme projeleri",
      "Veri merkezleri için hassas kontrollü (inrow/crac) soğutma sistem tasarımı"
    ],
    en_items: [
      "Geothermal and air-source heat pump engineering layouts",
      "Heavy VRF cooling circuits and water chills",
      "Data center in-row / CRAC unit precision cooling configurations"
    ],
    partners: "ABB, Daikin, Mitsubishi Electric, Vertiv Liebert"
  }
];

const ENERGY_CLUSTER_B = [
  {
    tr_title: "7.7. Akıllı Bina, Tesis & Güvenlik Yönetimi",
    en_title: "7.7. Building Management & Automation (BMS)",
    tr_items: [
      "Merkezi SCADA / BMS yazılımlı bina otomasyonu",
      "Akıllı otopark bariyer algılama ve CCTV yapay zeka analizörü",
      "Yangın ihbar, anons ve geçiş yetkili zayıf akım çözümleri",
      "Endüstriyel PLC makine ağları otomasyon mühendisliği"
    ],
    en_items: [
      "Central SCADA monitor and BMS integration",
      "Smart barrier management and AI-guided CCTV safety feed",
      "Integrated emergency warnings, PA speaker, and card reader layers",
      "Industrial PLC controllers and SCADA setups"
    ],
    partners: "Schneider Electric, Siemens, Honeywell, ABB"
  },
  {
    tr_title: "7.8. Veri Merkezi Altyapı Tasarımı",
    en_title: "7.8. Datacenter Infrastructure Design",
    tr_items: [
      "Top of Rack (ToR) yapılandırılmış kablolama ve grid dizaynı",
      "Beyaz alan (white space) soğuk/sıcak koridor odaları ayrımı",
      "Modüler jeneratör setleri, bypass panelleri ve statik transfer anahtarları (STS)",
      "Kesintisiz endüstriyel UPS güç kaynakları mühendisliği"
    ],
    en_items: [
      "Top of Rack (ToR) cabling schemes and cabinet dimensions",
      "Hot/cold aisle containment layouts for server white space",
      "Modular standby generator configurations and bypass switchboards",
      "Static transfer switches (STS) and double-conversion UPS batteries"
    ],
    partners: "ABB, Vertiv, Schneider Electric, Rittal, Eaton"
  },
  {
    tr_title: "7.9. IT Ekipmanları, Network & Siber Güvenlik",
    en_title: "7.9. IT Infrastructure, Networking & Cybersecurity",
    tr_items: [
      "Enterprise sunucu (Server) ve SAN depolama (Storage) kurulumları",
      "Network mimarisi: L1-L2-L3 switch, fiber omurga, siber güvenlik UTM firewall",
      "Yönetilen 24/7 IT gözetim ve teknik destek servisleri",
      "Kamu/Özel (Cloud) hibrit sunucu konfigürasyonları ve veri güvenliği"
    ],
    en_items: [
      "Scalable host virtualization servers and high-speed SAN arrays",
      "Routing fabrics: Core switch lines, campus WiFi, next-gen NGFW firewalls",
      "Managed service provider (MSP) operations and security audit NOC",
      "Private and public cloud networking configurations"
    ],
    partners: "Cisco, Fortinet, Juniper, Dell Technologies, HPE, VMware"
  },
  {
    tr_title: "7.10. Regülasyon & Sertifikasyon Danışmanlığı",
    en_title: "7.10. Regulatory Compliance & IT Standards Audit",
    tr_items: [
      "KVKK / GDPR veri koruma ve veri haritası oluşturma danışmanlığı",
      "ISO 27001 Bilgi Güvenliği Yönetim Sistemi altyapı sertifikalandırması",
      "ISO 9001 Kalite Standartları süreç iyileştirme"
    ],
    en_items: [
      "Advisory on KVKK / GDPR data governance schemes",
      "ISO 27001 compliance, risk analysis and authorization templates",
      "ISO 9001 operations mapping and process auditing"
    ],
    partners: "Global Certification Partners"
  },
  {
    tr_title: "7.11. İhale Danışmanlığı & Tedarik Yönetimi",
    en_title: "7.11. Technology Sourcing & SlAs Setup",
    tr_items: [
      "Teknik şartnameler ve donanım performans kıyas analizleri",
      "RFP ve donanım tedarikçi ilişkileri yönetimi",
      "Servis Seviyesi Anlaşmaları (SLA) şartname danışmanlığı"
    ],
    en_items: [
      "Generating server hardware specifications and spec audits",
      "RFP and tender selection for network gear vendors",
      "SLA formulation advisory for technical assets maintenance"
    ],
    partners: "Yakin Tech Procurement Bureau"
  }
];

// Profile registries for digital vCards
const VCARD_REGISTRY = {
  ilker: {
    fn: "İlker ATASOY",
    org: "Yakın Grup Holding A.Ş.",
    title: "Yönetim Kurulu Başkanı / CxO (Mühendis)",
    title_en: "Chairman of the Board / CxO (Engineer)",
    phone: "+90 542 897 34 46",
    email: "ilker.atasoy@yakingrup.net",
    linkedin: "https://tr.linkedin.com/company/yakingrupnet",
    address: "Maslak Sun Plaza Kat: 12, Şişli / İstanbul",
    avatar: "İA"
  },
  eylul: {
    fn: "Eylül YILMAZ",
    org: "Yakın Grup Holding A.Ş.",
    title: "Yönetim Kurulu Başkanı / CEO (Mimar)",
    title_en: "Chairwoman of the Board / CEO (Architect)",
    phone: "+90 544 224 95 84",
    email: "eylul.yilmaz@yakingrup.net",
    linkedin: "https://tr.linkedin.com/company/yakingrupnet",
    address: "Maslak Sun Plaza Kat: 12, Şişli / İstanbul",
    avatar: "EY"
  },
  murat: {
    fn: "Dr. Murat Kaya",
    org: "Yakın Grup Holding A.Ş.",
    title: "Mühendislik & Operasyon Lideri",
    title_en: "Engineering & Operations Leader",
    phone: "",
    email: "murat.kaya@yakingrup.net",
    linkedin: "https://tr.linkedin.com/company/yakingrupnet",
    address: "Maslak Sun Plaza Kat: 12, Şişli / İstanbul",
    avatar: "MK"
  }
};

let activeVCardNode = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initHeaderScroll();
  initAutoSliders();
});

// App State Core Controller
function initApp() {
  // Check default query or session
  if (activeSector) {
    selectSector(activeSector);
  } else {
    // Show splash screen, hide portal details
    document.getElementById('splash-screen').classList.remove('hidden-element');
    document.getElementById('splash-screen').classList.remove('fade-out');
    document.body.classList.remove('theme-construction', 'theme-energy');
    document.body.classList.add('loading-state');
  }
  
  // Apply visual text translations
  translateUI();
  
  // Fill in Dynamic lists
  populateConstructionServices();
  populateEnergyServices();

  // Mobile / Tablet: Touch-based panel animation (mirrors desktop hover)
  const panels = document.querySelectorAll('.splash-panel');
  panels.forEach(panel => {
    panel.addEventListener('touchstart', function(e) {
      // If already active, let the click/onclick proceed normally
      if (this.classList.contains('touch-active')) return;
      // Otherwise, first touch just activates the panel (shows description), prevent navigation
      e.preventDefault();
      panels.forEach(p => p.classList.remove('touch-active'));
      this.classList.add('touch-active');
    }, { passive: false });
  });

  // Tap outside panels to deactivate
  document.addEventListener('touchstart', function(e) {
    if (!e.target.closest('.splash-panel')) {
      panels.forEach(p => p.classList.remove('touch-active'));
    }
  });
}

// Translations Injector
function translateUI() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });

  // Switch buttons text updates
  document.getElementById('splash-lang-btn').textContent = currentLang === 'tr' ? 'EN' : 'TR';
  document.getElementById('header-lang-btn').textContent = currentLang === 'tr' ? 'EN' : 'TR';
  
  // Update PDF presentation link
  const presLink = document.getElementById('footer-presentation-link');
  if (presLink) {
    presLink.href = currentLang === 'tr' ? 'assets/docs/presentation_tr.pdf' : 'assets/docs/presentation_en.pdf';
  }

  // Toggle form placeholding text
  translateFormPlaceholders();
}

function toggleLanguage() {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  localStorage.setItem('yakin_lang', currentLang);
  translateUI();
  
  // Rerender services dynamic tabs and modules
  populateConstructionServices();
  populateEnergyServices();
}

// Form placeholders localization
function translateFormPlaceholders() {
  const nameInp = document.getElementById('c-name');
  const emailInp = document.getElementById('c-email');
  const phoneInp = document.getElementById('c-phone');
  const msgInp = document.getElementById('c-msg');
  const mName = document.getElementById('m-name');
  const mEmail = document.getElementById('m-email');

  if (currentLang === 'tr') {
    if (nameInp) nameInp.placeholder = "Örn. Ahmet Yılmaz";
    if (emailInp) emailInp.placeholder = "ahmet@firma.com";
    if (phoneInp) phoneInp.placeholder = "+90 532...";
    if (msgInp) msgInp.placeholder = "Mesajınızı bu alana yazınız...";
    if (mName) mName.placeholder = "Örn. ABC Mühendislik";
    if (mEmail) mEmail.placeholder = "isim@firma.com";
  } else {
    if (nameInp) nameInp.placeholder = "e.g. John Doe";
    if (emailInp) emailInp.placeholder = "john@firm.com";
    if (phoneInp) phoneInp.placeholder = "+1 555...";
    if (msgInp) msgInp.placeholder = "Enter your specifications here...";
    if (mName) mName.placeholder = "e.g. ABC Civil Ltd";
    if (mEmail) mEmail.placeholder = "name@firm.com";
  }
}

// Choose Construction or Energy
function selectSector(sectorName) {
  activeSector = sectorName;
  sessionStorage.setItem('yakin_sector', sectorName);
  
  // Hide splash screen panel
  const splash = document.getElementById('splash-screen');
  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.classList.add('hidden-element');
  }, 600);

  // Body classes
  document.body.classList.remove('loading-state');
  
  const constructionView = document.getElementById('construction-portal');
  const energyView = document.getElementById('energy-portal');
  const header = document.getElementById('main-header');
  const partnersSec = document.getElementById('partners');
  const marketSec = document.getElementById('marketplace');
  const contactSec = document.getElementById('contact');
  const footer = document.querySelector('.global-footer');

  // Reveal shared and specific zones
  header.classList.remove('hidden-element');
  partnersSec.classList.remove('hidden-element');
  marketSec.classList.remove('hidden-element');
  contactSec.classList.remove('hidden-element');
  footer.classList.remove('hidden-element');

  const marqueeConst = document.getElementById('marquee-construction');
  const marqueeEnergy = document.getElementById('marquee-energy');
  const badge = document.getElementById('partners-badge');
  const title = document.getElementById('partners-title');
  const sub = document.getElementById('partners-subtitle');

  if (sectorName === 'construction') {
    constructionView.classList.remove('hidden-element');
    energyView.classList.add('hidden-element');
    document.body.classList.add('theme-construction');
    document.body.classList.remove('theme-energy');

    if (marqueeConst) marqueeConst.classList.remove('hidden-element');
    if (marqueeEnergy) marqueeEnergy.classList.add('hidden-element');
    if (badge) badge.setAttribute('data-i18n', 'tag_const_refs');
    if (title) title.setAttribute('data-i18n', 'partners_title_const');
    if (sub) sub.setAttribute('data-i18n', 'partners_subtitle_const');
  } else if (sectorName === 'energy') {
    energyView.classList.remove('hidden-element');
    constructionView.classList.add('hidden-element');
    document.body.classList.add('theme-energy');
    document.body.classList.remove('theme-construction');

    if (marqueeEnergy) marqueeEnergy.classList.remove('hidden-element');
    if (marqueeConst) marqueeConst.classList.add('hidden-element');
    if (badge) badge.setAttribute('data-i18n', 'tag_technology');
    if (title) title.setAttribute('data-i18n', 'partners_title');
    if (sub) sub.setAttribute('data-i18n', 'partners_subtitle');
  }

  // Refresh language translation and populate dynamic service accordions/tabs
  setLanguage(currentLang);
  populateConstructionServices();
  populateEnergyServices();
}

// Smooth scroll helper for active portal services section
function scrollToServices(e) {
  if (e) e.preventDefault();
  closeMobileMenu();
  const targetId = activeSector === 'energy' ? 'energy-services-sec' : 'const-services-sec';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToSection(targetId, e) {
  if (e) e.preventDefault();
  closeMobileMenu();
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToAbout(e) {
  if (e) e.preventDefault();
  closeMobileMenu();
  const targetId = activeSector === 'energy' ? 'energy-about-sec' : 'const-about-sec';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// Legal modal content
const LEGAL_CONTENT = {
  kvkk: {
    tr: {
      title: 'KVKK Aydınlatma Metni',
      body: `
        <p><strong>Veri Sorumlusu:</strong> Yakın Grup Sanayi İnşaat Enerji Teknoloji LTD ŞTİ ("Şirket"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmektedir.</p>
        <p><strong>İşlenen Kişisel Veriler:</strong> Ad-soyad, e-posta adresi, telefon numarası, şirket unvanı ve iletişim formu aracılığıyla paylaştığınız diğer bilgiler.</p>
        <p><strong>Kişisel Verilerin İşlenme Amacı:</strong> Toplanan kişisel veriler; iletişim taleplerinizin yanıtlanması, hizmet tekliflerinin sunulması, yasal yükümlülüklerin yerine getirilmesi ve ticari faaliyetlerin yürütülmesi amacıyla işlenmektedir.</p>
        <p><strong>Kişisel Verilerin Aktarımı:</strong> Kişisel verileriniz, yasal düzenlemeler çerçevesinde yetkili kamu kurumlarına ve iş ortaklarımıza aktarılabilir. Yurt dışına veri aktarımı yapılmamaktadır.</p>
        <p><strong>Veri Sahibinin Hakları:</strong> KVKK'nın 11. maddesi kapsamında kişisel verilerinize erişme, düzeltme, silme, işlemenin kısıtlanması ve itiraz etme haklarına sahipsiniz. Talepleriniz için: <a href="mailto:kvkk@yakingrup.net" style="color:var(--color-theme)">kvkk@yakingrup.net</a></p>
        <p><strong>İletişim:</strong> Yakın Grup Sanayi İnşaat Enerji Teknoloji LTD ŞTİ | info@yakingrup.net | yakingrup.net</p>
      `
    },
    en: {
      title: 'GDPR / KVKK Privacy Notice',
      body: `
        <p><strong>Data Controller:</strong> Yakın Grup Sanayi İnşaat Enerji Teknoloji LTD ŞTİ acts as data controller under Turkish Law No. 6698 (KVKK) and EU GDPR principles.</p>
        <p><strong>Data Collected:</strong> Name, email address, phone number, company name, and any information submitted via contact forms.</p>
        <p><strong>Purpose:</strong> Data is processed to respond to enquiries, provide service offers, fulfill legal obligations, and conduct business operations.</p>
        <p><strong>Data Transfers:</strong> Data may be shared with authorised public institutions per legal requirements and select business partners. No cross-border transfers.</p>
        <p><strong>Your Rights:</strong> You have the right to access, correct, delete, restrict processing, and object to use of your data. Contact: <a href="mailto:kvkk@yakingrup.net" style="color:var(--color-theme)">kvkk@yakingrup.net</a></p>
        <p><strong>Contact:</strong> Yakın Grup Sanayi İnşaat Enerji Teknoloji LTD ŞTİ | info@yakingrup.net | yakingrup.net</p>
      `
    }
  },
  cerez: {
    tr: {
      title: 'Çerez Politikası',
      body: `
        <p><strong>Çerez Nedir?</strong> Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır.</p>
        <p><strong>Kullandığımız Çerez Türleri:</strong></p>
        <ul style="margin:0.5rem 0 1rem 1.5rem;display:flex;flex-direction:column;gap:0.4rem;">
          <li><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevleri için gereklidir (oturum bilgisi, dil tercihi).</li>
          <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistikleri ve kullanım verilerini anonim olarak toplarız.</li>
          <li><strong>Tercih Çerezleri:</strong> Dil ve portal seçimi gibi kullanıcı tercihlerinizi kaydeder.</li>
        </ul>
        <p><strong>Çerezleri Kontrol Etme:</strong> Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Zorunlu çerezleri kapatmak sitenin işlevselliğini etkileyebilir.</p>
        <p><strong>İletişim:</strong> <a href="mailto:info@yakingrup.net" style="color:var(--color-theme)">info@yakingrup.net</a></p>
      `
    },
    en: {
      title: 'Cookie Policy',
      body: `
        <p><strong>What are Cookies?</strong> Cookies are small text files stored in your browser when you visit our website.</p>
        <p><strong>Types of Cookies We Use:</strong></p>
        <ul style="margin:0.5rem 0 1rem 1.5rem;display:flex;flex-direction:column;gap:0.4rem;">
          <li><strong>Essential Cookies:</strong> Required for core site functionality (session state, language preference).</li>
          <li><strong>Analytics Cookies:</strong> Anonymous visitor statistics and usage data.</li>
          <li><strong>Preference Cookies:</strong> Stores user preferences such as portal and language selection.</li>
        </ul>
        <p><strong>Managing Cookies:</strong> You can manage or delete cookies from your browser settings. Disabling essential cookies may affect site functionality.</p>
        <p><strong>Contact:</strong> <a href="mailto:info@yakingrup.net" style="color:var(--color-theme)">info@yakingrup.net</a></p>
      `
    }
  },
  kullanim: {
    tr: {
      title: 'Kullanım Şartları',
      body: `
        <p><strong>Genel Şartlar:</strong> Bu web sitesi Yakın Grup Holding A.Ş. tarafından işletilmektedir. Siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>
        <p><strong>Fikri Mülkiyet:</strong> Sitedeki tüm içerikler, görseller, logolar ve metinler Yakın Grup Holding A.Ş.'ye aittir. İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.</p>
        <p><strong>Sorumluluk Reddi:</strong> Web sitesindeki bilgiler yalnızca genel bilgilendirme amaçlıdır. Şirket, bilgilerin doğruluğu veya eksiksizliğine dair herhangi bir garanti vermemektedir.</p>
        <p><strong>Üçüncü Taraf Bağlantıları:</strong> Sitede yer alan dış bağlantılar üzerinde kontrolümüz bulunmamaktadır. Bu bağlantılar aracılığıyla ulaşılan sitelerin içeriğinden sorumlu değiliz.</p>
        <p><strong>Değişiklikler:</strong> Şirket, bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar.</p>
        <p><strong>Uygulanacak Hukuk:</strong> Türkiye Cumhuriyeti hukuku uygulanır. Uyuşmazlıklar İstanbul Mahkemelerinde çözülür.</p>
        <p><strong>İletişim:</strong> <a href="mailto:info@yakingrup.net" style="color:var(--color-theme)">info@yakingrup.net</a></p>
      `
    },
    en: {
      title: 'Terms of Use',
      body: `
        <p><strong>General Terms:</strong> This website is operated by Yakın Grup Holding A.Ş. By using this site, you agree to the following terms.</p>
        <p><strong>Intellectual Property:</strong> All content, images, logos, and text on this site belong to Yakın Grup Holding A.Ş. Unauthorized copying, distribution, or commercial use is prohibited.</p>
        <p><strong>Disclaimer:</strong> Information on this website is for general informational purposes only. No warranty is given as to accuracy or completeness.</p>
        <p><strong>Third-Party Links:</strong> We have no control over external links. We are not responsible for the content of linked third-party sites.</p>
        <p><strong>Amendments:</strong> The Company reserves the right to amend these terms at any time without prior notice.</p>
        <p><strong>Governing Law:</strong> Turkish law applies. Disputes shall be resolved in Istanbul Courts.</p>
        <p><strong>Contact:</strong> <a href="mailto:info@yakingrup.net" style="color:var(--color-theme)">info@yakingrup.net</a></p>
      `
    }
  }
};

function openLegalModal(type) {
  const dialog = document.getElementById('legal-dialog');
  const titleEl = document.getElementById('legal-modal-title');
  const bodyEl = document.getElementById('legal-modal-body');
  const content = LEGAL_CONTENT[type];
  if (!content || !dialog) return;
  const lang = currentLang || 'tr';
  titleEl.textContent = content[lang].title;
  bodyEl.innerHTML = content[lang].body;
  dialog.showModal();
}

// Go back to splashscreen selector
function backToSplash() {
  activeSector = null;
  sessionStorage.removeItem('yakin_sector');
  
  const splash = document.getElementById('splash-screen');
  splash.classList.remove('hidden-element');
  setTimeout(() => {
    splash.classList.remove('fade-out');
  }, 50);

  document.body.classList.add('loading-state');
  document.body.classList.remove('theme-construction', 'theme-energy');
  
  // Hide portal sections
  document.getElementById('construction-portal').classList.add('hidden-element');
  document.getElementById('energy-portal').classList.add('hidden-element');
  document.getElementById('main-header').classList.add('hidden-element');
  document.getElementById('partners').classList.add('hidden-element');
  document.getElementById('marketplace').classList.add('hidden-element');
  document.getElementById('contact').classList.add('hidden-element');
  document.querySelector('.global-footer').classList.add('hidden-element');
}

// Header styling toggle on scroll
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Menu Mobile Toggle
function toggleMobileMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('active');
}

function closeMobileMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.remove('active');
}

// Populate Construction Services Tabs
function populateConstructionServices() {
  const menuContainer = document.getElementById('const-services-menu');
  const detailsContainer = document.getElementById('const-services-details');
  if (!menuContainer || !detailsContainer) return;
  
  menuContainer.innerHTML = '';
  detailsContainer.innerHTML = '';

  CONSTRUCTION_SERVICES.forEach((service, index) => {
    const title = currentLang === 'tr' ? service.tr_title : service.en_title;
    
    // Create button tab
    const tabBtn = document.createElement('button');
    tabBtn.className = `tab-menu-btn ${index === 0 ? 'active' : ''}`;
    tabBtn.setAttribute('onclick', `switchConstTab(${index})`);
    tabBtn.innerHTML = `
      <span>${service.icon} &nbsp; ${title}</span>
      <span class="tab-chevron">&rarr;</span>
    `;
    menuContainer.appendChild(tabBtn);

    // Create details card
    const desc = currentLang === 'tr' ? service.tr_desc : service.en_desc;
    const items = currentLang === 'tr' ? service.tr_items : service.en_items;

    const detailBlock = document.createElement('div');
    detailBlock.id = `const-tab-${index}`;
    detailBlock.className = `tab-content ${index === 0 ? 'active' : ''}`;
    
    let sublistHTML = '';
    items.forEach(liItem => {
      sublistHTML += `<li class="service-sub-item">${liItem}</li>`;
    });

    detailBlock.innerHTML = `
      <h3>${title}</h3>
      <p class="tab-content-desc">${desc}</p>
      <div class="tab-media-frame">
        <img src="${service.img}" alt="${title}">
      </div>
      <ul class="services-list-grid">
        ${sublistHTML}
      </ul>
      <div class="tab-actions">
        <button class="cta-primary-btn" onclick="openMarketplaceModal()">
          <span data-i18n="btn_market_browse">${TRANSLATIONS[currentLang].btn_market_browse}</span>
        </button>
      </div>
    `;
    detailsContainer.appendChild(detailBlock);
  });
}

function switchConstTab(targetIndex) {
  const buttons = document.querySelectorAll('#const-services-menu .tab-menu-btn');
  const tabs = document.querySelectorAll('#const-services-details .tab-content');
  
  buttons.forEach((btn, idx) => {
    if (idx === targetIndex) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  tabs.forEach((tab, idx) => {
    if (idx === targetIndex) tab.classList.add('active');
    else tab.classList.remove('active');
  });
}

// Populate Energy Services Accordion (Clusters A & B)
function populateEnergyServices() {
  const clusterA = document.getElementById('energy-cluster-a-acc');
  const clusterB = document.getElementById('energy-cluster-b-acc');
  if (!clusterA || !clusterB) return;

  clusterA.innerHTML = '';
  clusterB.innerHTML = '';

  // Render Cluster A: Mechanical & Renewable GES
  ENERGY_CLUSTER_A.forEach((item, index) => {
    const accItem = createAccordionNode(item, index, 'a');
    clusterA.appendChild(accItem);
  });

  // Render Cluster B: Electrical IT Cyber
  ENERGY_CLUSTER_B.forEach((item, index) => {
    const accItem = createAccordionNode(item, index, 'b');
    clusterB.appendChild(accItem);
  });
}

function createAccordionNode(item, index, typeCode) {
  const accItem = document.createElement('div');
  accItem.className = 'accordion-item';
  const title = currentLang === 'tr' ? item.tr_title : item.en_title;
  const itemsList = currentLang === 'tr' ? item.tr_items : item.en_items;

  let liItemsHTML = '';
  itemsList.forEach(li => {
    liItemsHTML += `<li>${li}</li>`;
  });

  const partText = currentLang === 'tr' ? 'Teknoloji İş Ortakları' : 'Technology Partners';

  accItem.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('${typeCode}-${index}')">
      <h4>${title}</h4>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content" id="acc-content-${typeCode}-${index}">
      <div class="accordion-body">
        <ul>
          ${liItemsHTML}
        </ul>
        <div class="tech-partners-meta">
          <strong>${partText}:</strong> ${item.partners}
        </div>
      </div>
    </div>
  `;
  return accItem;
}

function toggleAccordion(accID) {
  const targetContent = document.getElementById(`acc-content-${accID}`);
  const targetItem = targetContent.parentElement;
  
  targetItem.classList.toggle('active');
}

// Active Hero Slider Autoplays
function initAutoSliders() {
  // Dot generators
  setupHeroDots('const-hero-slider', 'const-hero-dots');
  setupHeroDots('energy-hero-slider', 'energy-dots');

  setInterval(() => {
    if (activeSector === 'construction') {
      nextSlide('const-hero-slider');
    } else if (activeSector === 'energy') {
      nextSlide('energy-hero-slider');
    }
  }, 6000);
}

function setupHeroDots(sliderID, dotBoxID) {
  const slides = document.querySelectorAll(`#${sliderID} .hero-slide`);
  const dotBox = document.getElementById(dotBoxID);
  if (!dotBox) return;

  dotBox.innerHTML = '';
  slides.forEach((_, idx) => {
    const dotSpan = document.createElement('span');
    dotSpan.className = `dot ${idx === 0 ? 'active' : ''}`;
    dotSpan.setAttribute('onclick', `jumpToSlide('${sliderID}', ${idx})`);
    dotBox.appendChild(dotSpan);
  });
}

function updateSliderDots(sliderID, activeIdx) {
  let dotBoxID = sliderID === 'const-hero-slider' ? 'const-hero-dots' : 'energy-dots';
  const dots = document.querySelectorAll(`#${dotBoxID} .dot`);
  dots.forEach((dot, idx) => {
    if (idx === activeIdx) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function nextSlide(sliderID) {
  const slides = document.querySelectorAll(`#${sliderID} .hero-slide`);
  if (!slides.length) return;
  
  let currentIndex = 0;
  slides.forEach((slide, idx) => {
    if (slide.classList.contains('active')) currentIndex = idx;
  });

  slides[currentIndex].classList.remove('active');
  let nextIdx = (currentIndex + 1) % slides.length;
  slides[nextIdx].classList.add('active');

  updateSliderDots(sliderID, nextIdx);
}

function prevSlide(sliderID) {
  const slides = document.querySelectorAll(`#${sliderID} .hero-slide`);
  if (!slides.length) return;
  
  let currentIndex = 0;
  slides.forEach((slide, idx) => {
    if (slide.classList.contains('active')) currentIndex = idx;
  });

  slides[currentIndex].classList.remove('active');
  let prevIdx = (currentIndex - 1 + slides.length) % slides.length;
  slides[prevIdx].classList.add('active');

  updateSliderDots(sliderID, prevIdx);
}

function jumpToSlide(sliderID, targetIdx) {
  const slides = document.querySelectorAll(`#${sliderID} .hero-slide`);
  slides.forEach(slide => slide.classList.remove('active'));
  slides[targetIdx].classList.add('active');
  updateSliderDots(sliderID, targetIdx);
}

// Digital vCard exporter (.vcf Blob generator)
function showVCard(profileKey) {
  const profile = VCARD_REGISTRY[profileKey];
  if (!profile) return;
  
  activeVCardNode = profile;

  // Fill in modal DOM elements
  document.getElementById('modal-card-avatar').textContent = profile.avatar;
  document.getElementById('modal-card-name').textContent = profile.fn;
  
  const title = currentLang === 'tr' ? profile.title : profile.title_en;
  document.getElementById('modal-card-title').textContent = title;
  
  // Phone — hide row if empty
  const phoneEl = document.getElementById('modal-card-phone');
  const phoneRow = phoneEl ? phoneEl.closest('.vcard-field') : null;
  if (profile.phone) {
    phoneEl.textContent = profile.phone;
    phoneEl.href = `tel:${profile.phone.replace(/[^\d+]/g, '')}`;
    if (phoneRow) phoneRow.style.display = '';
  } else {
    if (phoneRow) phoneRow.style.display = 'none';
  }
  
  document.getElementById('modal-card-email').textContent = profile.email;
  document.getElementById('modal-card-email').href = `mailto:${profile.email}`;
  
  document.getElementById('modal-card-office').textContent = profile.address;

  // LinkedIn — always set from registry
  const linkedinEl = document.getElementById('modal-card-linkedin');
  if (linkedinEl && profile.linkedin) {
    linkedinEl.href = profile.linkedin;
    linkedinEl.textContent = profile.linkedin.replace('https://', '');
  }

  // Open modal dialog
  const dialog = document.getElementById('vcard-dialog');
  dialog.showModal();
}


function closeVCardDialog() {
  document.getElementById('vcard-dialog').close();
}

function downloadVCF() {
  if (!activeVCardNode) return;
  const p = activeVCardNode;
  
  // Format VCF standard payload
  const vcardBody = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${p.fn}`,
    `ORG:${p.org}`,
    `TITLE:${p.title}`,
    `TEL;TYPE=cell,voice:${p.phone}`,
    `EMAIL;TYPE=internet,pref:${p.email}`,
    `ADR;TYPE=work:;;${p.address}`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcardBody], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `${p.fn.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function shareCard() {
  if (!activeVCardNode) return;
  const p = activeVCardNode;
  const title = currentLang === 'tr' ? p.title : p.title_en;
  const shareText = [
    p.fn,
    title,
    p.org,
    p.phone ? `📞 ${p.phone}` : '',
    `✉️ ${p.email}`,
    p.linkedin ? `🔗 ${p.linkedin}` : ''
  ].filter(Boolean).join('\n');

  if (navigator.share) {
    navigator.share({
      title: `${p.fn} — Yakın Grup`,
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast(currentLang === 'tr' ? 'İrtibat bilgisi panoya kopyalandı!' : 'Contact copied to clipboard!');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('yakin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'yakin-toast';
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--color-dark);color:#fff;padding:0.75rem 1.5rem;border-radius:2rem;font-size:0.9rem;font-weight:600;z-index:99999;opacity:0;transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Lightbox modal handler
const GALLERY_DB = {
  construction: [
    { title: "T-3 Veri Merkezi Yapımı", sub: "Ankara / Türkiye", img: "assets/images/gallery_datacenter_1785092833568.png" },
    { title: "Uluslararası Havalimanı Terminali", sub: "İzmir / Türkiye", img: "assets/images/construction_hero_1784577666966.png" },
    { title: "Vadi Konakları Yaşam Kompleksi", sub: "İstanbul / Türkiye", img: "assets/images/gallery_vadi_mansion_1785092899049.png" },
    { title: "Yapı Güçlendirme & BIM Tasarımı", sub: "Deprem Mühendisliği", img: "assets/images/gallery_seismic_retrofitting_1785092947617.png" }
  ],
  energy: [
    { title: "150 MW Arazi GES Kurulumu", sub: "Konya / Türkiye", img: "assets/images/energy_hero_1784577681830.png" },
    { title: "Akıllı Kamu Binası Otomasyonu", sub: "İzmir / Türkiye", img: "assets/images/yakin_grup_headquarters_1784577698669.png" },
    { title: "Sertifikalı Tier III Veri Merkezi Beyaz Alan", sub: "Bursa / Türkiye", img: "assets/images/construction_hero_1784577666966.png" },
    { title: "Siber Güvenlik Omurga Kurulumu", sub: "Finans Kurumu", img: "assets/images/energy_hero_1784577681830.png" }
  ]
};

function openLightbox(indexNum, sectorKey) {
  lightboxIndex = indexNum;
  lightboxSector = sectorKey;
  
  updateLightboxItem();
  
  const dialog = document.getElementById('lightbox-dialog');
  dialog.showModal();
}

function updateLightboxItem() {
  const item = GALLERY_DB[lightboxSector][lightboxIndex];
  if (!item) return;

  const titleText = currentLang === 'tr' ? TRANSLATIONS.tr[`${lightboxSector === 'construction' ? 'c' : 'e'}_gal${lightboxIndex + 1}_title`] : TRANSLATIONS.en[`${lightboxSector === 'construction' ? 'c' : 'e'}_gal${lightboxIndex + 1}_title`];
  const subText = currentLang === 'tr' ? TRANSLATIONS.tr[`${lightboxSector === 'construction' ? 'c' : 'e'}_gal${lightboxIndex + 1}_sub`] : TRANSLATIONS.en[`${lightboxSector === 'construction' ? 'c' : 'e'}_gal${lightboxIndex + 1}_sub`];

  document.getElementById('lightbox-img').src = item.img;
  document.getElementById('lightbox-title').textContent = titleText;
  document.getElementById('lightbox-caption').textContent = subText;
}

function closeLightboxDialog() {
  document.getElementById('lightbox-dialog').close();
}

function navigateLightbox(dir) {
  const list = GALLERY_DB[lightboxSector];
  lightboxIndex = (lightboxIndex + dir + list.length) % list.length;
  updateLightboxItem();
}

// Marketplace Waitlist Modal Dialog triggers
function openMarketplaceModal() {
  const dialog = document.getElementById('market-dialog');
  dialog.showModal();
}

function closeMarketplaceModal() {
  document.getElementById('market-dialog').close();
}

// Submition handlings
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById('c-name').value;
  
  const successMsg = currentLang === 'tr' 
    ? `Teşekkürler ${name}. Mesajınız başarıyla iletildi. Yetkili birimimiz en kısa sürede dönüş yapacaktır.` 
    : `Thank you ${name}. Your message has been sent successfully. Our team will contact you shortly.`;
    
  alert(successMsg);
  form.reset();
}

function handleMarketplaceSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('m-name').value;
  const email = document.getElementById('m-email').value;

  const successMsg = currentLang === 'tr'
    ? `Tebrikler ${name}! Dijital Mağaza erken erişim / bekleme listesine başarıyla eklendiniz. Gelişmeler ${email} adresine gönderilecektir.`
    : `Congratulations ${name}! You have been registered to our Marketplace waiting list. News will be sent to ${email}.`;

  alert(successMsg);
  closeMarketplaceModal();
  event.target.reset();
}
