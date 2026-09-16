/**
 * YAKIN GRUP MARKETPLACE — B2B & B2C PLATFORM LOGIC
 * Comprehensive Renewable Energy & IT Equipment Platform (A to Z)
 * Features Category-Separated View, Macro Pillars, Multi-currency & Multi-language.
 */

// Global State
const state = {
  mode: 'b2b', // 'b2b' | 'b2c'
  lang: 'tr',  // 'tr' | 'en'
  currency: 'TRY', // 'TRY' | 'USD' | 'EUR'
  rates: { TRY: 1, USD: 0.026, EUR: 0.024 },
  currencySymbols: { TRY: '₺', USD: '$', EUR: '€' },
  macroPillar: 'all', // 'all' | 'energy' | 'it'
  category: 'all',
  searchQuery: '',
  sortBy: 'featured',
  filterStockOnly: false,
  filterBrand: 'all',
  cart: [],
  rfqItems: []
};

// Rates in TRY
const FX_RATES_TO_TRY = {
  TRY: 1,
  USD: 38.50,
  EUR: 41.20
};

// ── Translation Dictionary ──────────────────────────────────────────────────
const i18n = {
  tr: {
    topbar_tag: 'MÜHENDİSLİK, YENİLENEBİLİR ENERJİ & IT TİCARET PORTALI',
    topbar_holding: 'Yakın Grup Holding',
    topbar_teklif: 'Şartname & Teklif Stüdyosu',
    topbar_sunum: 'Yatırımcı Sunumu',
    topbar_support: '📞 Kurumsal Destek: +90 (542) 897 3446',
    
    brand_sub: 'MARKETPLACE',
    btn_b2b: '🏢 Kurumsal (B2B)',
    btn_b2c: '🏠 Bireysel (B2C)',
    search_placeholder: 'GES, RES, Isı Pompası, Sunucu, Switch, Firewall, Telekom, 5G, UPS ara...',
    btn_supplier_apply: 'Tedarikçi Ol',
    btn_cart: 'Sepet & Teklif',
    
    hero_b2b_badge: 'ENDÜSTRİYEL ENERJİ & KURUMSAL IT EKİPMAN TEDARİKİ',
    hero_b2b_title: 'Endüstriyel GES, RES, Isı Pompası, Sunucu & IT Altyapı Platformu',
    hero_b2b_sub: 'Tier-1 Solar PV, Rüzgar Türbinleri, Isı Pompaları, BESS Depolama ile Kurumsal Rack Sunucular (Dell/HPE), Cisco Ağ Çözümleri, Fortinet Firewall ve Modüler Veri Merkezi sistemlerinde doğrudan üretici fiyatları ve şartnameli RFQ altyapısı.',
    hero_b2b_cta1: 'Toptan Kataloğu Keşfet',
    hero_b2b_cta2: 'BOM / Şartname Teklifi Al',
    
    hero_b2c_badge: 'BİREYSEL YENİLENEBİLİR ENERJİ & İŞ İSTASYONU ÇÖZÜMLERİ',
    hero_b2c_title: 'Konut Güneş Enerjisi, Isı Pompası, EV Şarj & Profesyonel IT Sistemleri',
    hero_b2c_sub: 'Villa çatı GES paketleri, A+++ R290 ısı pompaları, Wallbox şarj cihazları, AI/BIM iş istasyonları, NAS depolama ve Wi-Fi 7 ağ çözümlerinde anahtar teslim kurulum ve garanti güvencesi.',
    hero_b2c_cta1: 'Tüm Paketleri İncele',
    hero_b2c_cta2: 'Ücretsiz Keşif Hesapla',

    stat_b2b_1: '500+ MW',
    stat_b2b_1_l: 'Tedarik Gücü (GES/RES)',
    stat_b2b_2: '10.000+',
    stat_b2b_2_l: 'Kurumsal IT & Enerji Ekipmanı',
    stat_b2b_3: '24 Saat',
    stat_b2b_3_l: 'Mühendislik RFQ Süresi',
    stat_b2b_4: 'Cari & Leasing',
    stat_b2b_4_l: 'Yakın Capital Finansmanı',

    stat_b2c_1: '12 Taksit',
    stat_b2c_1_l: 'Tüm Kartlara Vade Farksız',
    stat_b2c_2: '81 İl',
    stat_b2c_2_l: 'Montaj & Teknik Servis',
    stat_b2c_3: 'A+++ / Tier-1',
    stat_b2c_3_l: 'En Yüksek Enerji Verimi',
    stat_b2c_4: '10 Yıl',
    stat_b2c_4_l: 'Sistem & Donanım Garantisi',

    pillar_all: 'Tüm Sistemler & Ekipmanlar',
    pillar_energy: 'Yenilenebilir Enerji & Güç Altyapısı',
    pillar_it: 'IT, Bilişim & Veri Merkezi',

    cat_all: 'Tüm Kategoriler',
    cat_zoom_btn: 'Kategoriye Odaklan →',
    cat_back_btn: '← Tüm Kategorilere Dön (Bölümlendirilmiş Görünüm)',
    cat_items_suffix: 'Model / Ekipman',

    filters_title: 'Filtreler',
    filters_reset: 'Temizle',
    filter_cat_title: 'Ekipman Kategorisi',
    filter_brand_title: 'Marka & Üretici',
    filter_availability: 'Stok Durumu',
    filter_stock_only: 'Sadece Hemen Teslim Stoklar',

    results_found: 'ürün listeleniyor',
    sort_featured: 'Öne Çıkanlar',
    sort_price_asc: 'Fiyat: Düşükten Yükseğe',
    sort_price_desc: 'Fiyat: Yüksekten Düşüğe',
    sort_power_desc: 'Güç / Kapasite: Yüksekten Düşüğe',

    card_rfq_btn: 'Teklif Listesine Ekle (RFQ)',
    card_cart_btn: 'Sepete Ekle',
    card_spec_btn: 'Datasheet / Şartname',
    card_moq_prefix: 'Min. Sipariş (MOQ):',
    card_tier_label: 'Kademeli Toptan İskonto',
    card_install_included: '✓ Anahtar Teslim Montaj Dahil Opsiyonu',

    calc_badge: 'YENİLENEBİLİR ENERJİ & TASARRUF SİMÜLATÖRÜ',
    calc_title: 'Güneş, Isı Pompası & Şarj İhtiyacınızı Hesaplayın',
    calc_desc: 'Aylık elektrik faturanızı ve bina/tesis tipinizi seçin; size özel optimum GES gücü, ısı pompası kapasitesi, yıllık tasarruf ve amortisman süresini anında hesaplayalım.',
    calc_lbl_type: 'Kullanım Alanı / Yapı Türü',
    calc_opt_villa: '🏡 Müstakil Villa / Konut (GES + Isı Pompası)',
    calc_opt_commercial: '🏭 Fabrika / Ticari İşletme (Çatı GES + Depolama)',
    calc_opt_farm: '🚜 Tarımsal Sulama / Arazi GES & RES',
    calc_lbl_bill: 'Aylık Ortalama Enerji Faturası (₺ / Ay)',
    calc_lbl_city: 'Tesis Bölgesi (Güneşlenme & Rüzgar Verimi)',
    calc_opt_marmara: 'Marmara & Ege Bölgesi (Yüksek Güneş & Rüzgar)',
    calc_opt_akdeniz: 'Akdeniz & Güneydoğu (Maksimum Güneş Işıması)',
    calc_opt_anadolu: 'İç Anadolu & Karadeniz (Standart İklim Şartları)',
    calc_res_power: 'Önerilen GES / RES Gücü',
    calc_res_annual_gen: 'Tahmini Yıllık Üretim',
    calc_res_savings: 'Yıllık Fatura Tasarrufu',
    calc_res_payback: 'Yatırım Amortisman Süresi',
    calc_btn_package: 'Bu Çözümü İncele & Keşif İste',

    rfq_box_title: 'Toplu BOM & Şartname Teklifi İste (B2B)',
    rfq_box_desc: 'GES, RES, Isı Pompası, Sunucu, Depolama ve Network projeleriniz için malzeme listenizi (Excel / PDF) yükleyin; 24 saat içinde mühendislik onaylı proforma teklifinizi hazırlayalım.',
    rfq_box_btn: 'Şartname / BOM Yükle',
    supplier_box_title: 'Yakın Grup Tedarikçi Ekosistemi',
    supplier_box_desc: 'Yenilenebilir enerji veya kurumsal IT ekipmanları (Sunucu, Switch, Güvenlik, Trafo, Batarya vb.) üretiyorsanız, pazaryerimizde onaylı tedarikçi olun.',
    supplier_box_btn: 'Tedarikçi Başvuru Formu',

    drawer_b2b_title: 'Kurumsal RFQ & Teklif Sepeti',
    drawer_b2c_title: 'Alışveriş Sepetiniz',
    drawer_empty: 'Sepetinizde henüz ekipman bulunmamaktadır.',
    drawer_b2b_checkout: 'Proforma Fatura & Teklif Oluştur',
    drawer_b2c_checkout: 'Güvenli Sipariş & Keşif Onayı',

    footer_about_title: 'Yakın Grup Marketplace',
    footer_about_desc: 'Güneş (GES), Rüzgar (RES), Isı Pompası, Enerji Depolama, EV Şarj ve Kurumsal IT & Veri Merkezi altyapısında Türkiye\'nin ve bölgenin entegre B2B & B2C tedarik platformu.',
    footer_col1_title: 'Kurumsal B2B',
    footer_col2_title: 'Bireysel B2C & KOBİ',
    footer_col3_title: 'Holding & Ekosistem',
    footer_rights: '© 2026 Yakın Grup Holding A.Ş. Tüm hakları saklıdır.'
  },
  en: {
    topbar_tag: 'ENGINEERING, RENEWABLE ENERGY & IT COMMERCE PORTAL',
    topbar_holding: 'Yakın Group Holding',
    topbar_teklif: 'Spec & Proposal Studio',
    topbar_sunum: 'Investor Presentation',
    topbar_support: '📞 Corporate Support: +90 (542) 897 3446',

    brand_sub: 'MARKETPLACE',
    btn_b2b: '🏢 Corporate (B2B)',
    btn_b2c: '🏠 Consumer (B2C)',
    search_placeholder: 'Search Solar PV, Wind, Heat Pump, Server, Switch, Telecom, 5G, UPS...',
    btn_supplier_apply: 'Become Supplier',
    btn_cart: 'Cart & RFQ',

    hero_b2b_badge: 'INDUSTRIAL ENERGY & ENTERPRISE IT PROCUREMENT',
    hero_b2b_title: 'Industrial PV, Wind, Heat Pumps, Servers & IT Infrastructure Supply',
    hero_b2b_sub: 'Direct manufacturer pricing and specification-ready RFQs for Tier-1 Solar PV, Wind Turbines, BESS Storage, Enterprise Rack Servers (Dell/HPE), Cisco Networking, Fortinet Firewalls, and Modular Data Centers.',
    hero_b2b_cta1: 'Explore Wholesale Catalog',
    hero_b2b_cta2: 'Request Spec / BOM Quote',

    hero_b2c_badge: 'RESIDENTIAL RENEWABLES & PRO IT WORKSTATIONS',
    hero_b2c_title: 'Rooftop Solar, Heat Pumps, EV Chargers & Professional IT Systems',
    hero_b2c_sub: 'Turnkey engineering and installation on villa solar kits, A+++ heat pumps, Wallbox EV chargers, AI/BIM workstations, NAS storage, and Wi-Fi 7 networking.',
    hero_b2c_cta1: 'View All Packages',
    hero_b2c_cta2: 'Calculate Free Site Survey',

    stat_b2b_1: '500+ MW',
    stat_b2b_1_l: 'Supply Capacity (PV/Wind)',
    stat_b2b_2: '10,000+',
    stat_b2b_2_l: 'Enterprise IT & Energy Items',
    stat_b2b_3: '24 Hours',
    stat_b2b_3_l: 'Engineering RFQ Turnaround',
    stat_b2b_4: 'Credit & Lease',
    stat_b2b_4_l: 'Yakın Capital Financing',

    stat_b2c_1: '12 Installments',
    stat_b2c_1_l: 'Zero Interest Available',
    stat_b2c_2: '81 Cities',
    stat_b2c_2_l: 'Installation & Tech Support',
    stat_b2c_3: 'A+++ / Tier-1',
    stat_b2c_3_l: 'Highest Efficiency Ratings',
    stat_b2c_4: '10 Years',
    stat_b2c_4_l: 'System & Hardware Warranty',

    pillar_all: 'All Systems & Equipment',
    pillar_energy: 'Renewable Energy & Power Infrastructure',
    pillar_it: 'IT, Data Center & Telecom',

    cat_all: 'All Categories',
    cat_zoom_btn: 'Focus Category →',
    cat_back_btn: '← Back to All Categories (Sectioned View)',
    cat_items_suffix: 'Models / Equipment',

    filters_title: 'Filters',
    filters_reset: 'Reset',
    filter_cat_title: 'Equipment Category',
    filter_brand_title: 'Brand / Manufacturer',
    filter_availability: 'Availability',
    filter_stock_only: 'Immediate Stock Only',

    results_found: 'products listed',
    sort_featured: 'Featured',
    sort_price_asc: 'Price: Low to High',
    sort_price_desc: 'Price: High to Low',
    sort_power_desc: 'Power / Capacity: High to Low',

    card_rfq_btn: 'Add to RFQ Quote',
    card_cart_btn: 'Add to Cart',
    card_spec_btn: 'Datasheet / Specs',
    card_moq_prefix: 'Min. Order (MOQ):',
    card_tier_label: 'Volume Tier Pricing Available',
    card_install_included: '✓ Optional Turnkey Installation Available',

    calc_badge: 'RENEWABLE & SAVINGS SIMULATOR',
    calc_title: 'Calculate Your Solar, Heat Pump & EV Power Needs',
    calc_desc: 'Select your monthly energy bill and facility type to instantly estimate recommended PV/Wind capacity, annual generation, heat pump savings, and payback period.',
    calc_lbl_type: 'Usage Type',
    calc_opt_villa: '🏡 Detached Villa / Residential (PV + Heat Pump)',
    calc_opt_commercial: '🏭 Factory / Commercial (Roof PV + BESS)',
    calc_opt_farm: '🚜 Agricultural Irrigation / Land PV & Wind',
    calc_lbl_bill: 'Monthly Energy Bill (₺ / Month)',
    calc_lbl_city: 'Region (Solar & Wind Irradiance)',
    calc_opt_marmara: 'Marmara & Aegean (High Solar & Wind)',
    calc_opt_akdeniz: 'Mediterranean (Max Solar Yield)',
    calc_opt_anadolu: 'Central & Black Sea (Standard Yield)',
    calc_res_power: 'Recommended PV / Wind Power',
    calc_res_annual_gen: 'Estimated Annual Generation',
    calc_res_savings: 'Annual Bill Savings',
    calc_res_payback: 'Estimated Payback Period',
    calc_btn_package: 'Inspect Solution & Book Survey',

    rfq_box_title: 'Request Bulk BOM & Specification Quote (B2B)',
    rfq_box_desc: 'For large-scale utility, server, and networking projects, receive an engineered proforma within 24 hours.',
    rfq_box_btn: 'Upload BOM / Spec',
    supplier_box_title: 'Yakın Group Supplier Ecosystem',
    supplier_box_desc: 'If you manufacture high-quality renewable energy or enterprise IT equipment, join our marketplace network.',
    supplier_box_btn: 'Supplier Application Form',

    drawer_b2b_title: 'Corporate RFQ & Quote Cart',
    drawer_b2c_title: 'Your Shopping Cart',
    drawer_empty: 'Your cart is currently empty.',
    drawer_b2b_checkout: 'Generate Proforma Invoice',
    drawer_b2c_checkout: 'Proceed to Secure Checkout',

    footer_about_title: 'Yakın Group Marketplace',
    footer_about_desc: 'Trusted digital supply platform for industrial energy, contracting engineering, and enterprise IT data center infrastructure.',
    footer_col1_title: 'Corporate B2B',
    footer_col2_title: 'Consumer B2C & SMB',
    footer_col3_title: 'Holding & Ecosystem',
    footer_rights: '© 2026 Yakın Group Holding Inc. All rights reserved.'
  }
};

// ── Master Category Definitions (Metadata & Separation Map) ────────────────
const CATEGORIES_DEF = {
  // 🌿 RENEWABLE ENERGY & POWER INFRASTRUCTURE PILLAR
  ges: {
    pillar: 'energy',
    icon: '☀️',
    title_tr: 'Güneş Enerjisi (GES) & Fotovoltaik Sistemler',
    title_en: 'Solar Energy (PV) & Photovoltaic Systems',
    desc_tr: 'Tier-1 N-Type TOPCon çift cam güneş modülleri, BIPV bina cephe camları ve çatı GES sistemleri.',
    desc_en: 'Tier-1 TOPCon bifacial modules, BIPV solar glass facades, and rooftop PV systems.'
  },
  inverter: {
    pillar: 'energy',
    icon: '🔄',
    title_tr: 'İnvertör & Güç Dönüşüm Sistemleri',
    title_en: 'Inverters & Power Conversion Systems',
    desc_tr: 'Huawei, Sungrow, Deye ticari dizi invertörleri ve hibrit konut güç dönüştürücüleri.',
    desc_en: 'Huawei, Sungrow, Deye commercial string inverters and hybrid residential converters.'
  },
  energy_storage: {
    pillar: 'energy',
    icon: '🔋',
    title_tr: 'Enerji Depolama & BESS Bataryalar',
    title_en: 'Energy Storage & BESS Batteries',
    desc_tr: 'CATL 2.5 MWh konteyner BESS, 215 kWh ticari batarya kabinleri ve duvar tipi LiFePO4 ev bataryaları.',
    desc_en: 'CATL 2.5 MWh container BESS, 215 kWh commercial cabinets, and wall-mount LiFePO4 home batteries.'
  },
  transformer: {
    pillar: 'energy',
    icon: '⚡',
    title_tr: 'Trafo & OG/AG Şalt Merkezleri',
    title_en: 'Transformers & MV/LV Switchgear',
    desc_tr: '1600 kVA Kuru Tip Dökme Reçineli Transformatörler, Gaz Yalıtımlı RMU Hücreleri ve Kompakt Trafo Merkezleri.',
    desc_en: '1600 kVA Dry-Type Cast Resin Transformers, Gas-Insulated RMUs, and Compact Substations.'
  },
  ev: {
    pillar: 'energy',
    icon: '🔌',
    title_tr: 'Elektrikli Araç Şarj İstasyonları (EV Charging)',
    title_en: 'Electric Vehicle Charging Stations',
    desc_tr: 'Yakın Volt 180kW DC ultra hızlı şarj istasyonları ve 22kW ev tipi akıllı Wallbox cihazları.',
    desc_en: 'Yakın Volt 180kW DC ultra-fast chargers and 22kW smart home Wallbox units.'
  },
  heatpump: {
    pillar: 'energy',
    icon: '♨️',
    title_tr: 'Isı Pompaları & Termal Enerji Çözümleri',
    title_en: 'Heat Pumps & Thermal Energy Solutions',
    desc_tr: 'A+++ R290 çevre dostu havadan suya monoblok ev ısı pompaları ve endüstriyel yüksek sıcaklık kaskad sistemler.',
    desc_en: 'A+++ R290 eco air-to-water heat pumps and industrial high-temperature cascade systems.'
  },
  res: {
    pillar: 'energy',
    icon: '💨',
    title_tr: 'Rüzgar Enerjisi Santralleri (RES) & Türbinler',
    title_en: 'Wind Power Plants (RES) & Turbines',
    desc_tr: '500kW doğrudan tahrikli endüstriyel türbinler ve 3kW maglev sessiz ev/çiftlik rüzgar jeneratörleri.',
    desc_en: '500kW direct-drive industrial turbines and 3kW maglev silent home wind generators.'
  },
  scada: {
    pillar: 'energy',
    icon: '📊',
    title_tr: 'SCADA, Akıllı Şebeke & Enerji Otomasyonu',
    title_en: 'SCADA & Smart Grid Automation',
    desc_tr: 'GES/RES Santral SCADA Yazılımları, TEİAŞ Uyumlu RTU Panoları ve IoT Güç Kalitesi Analizörleri.',
    desc_en: 'Power plant SCADA systems, TEİAŞ compliant RTU telecontrol panels, and IoT power quality analyzers.'
  },
  generator: {
    pillar: 'energy',
    icon: '⚡',
    title_tr: 'Jeneratör & Hibrit Güç Sistemleri',
    title_en: 'Generators & Hybrid Power Systems',
    desc_tr: '550 kVA Perkins motorlu endüstriyel senkron dizel jeneratörler ve otomatik transfer panolu konut jeneratörleri.',
    desc_en: '550 kVA Perkins industrial synchronous diesel generators and residential automatic backup units.'
  },

  // 💻 IT, BİLİŞİM & VERİ MERKEZİ PILLAR (SERVER, STORAGE, NETWORK, SECURITY)
  server: {
    pillar: 'it',
    icon: '🖥️',
    title_tr: 'Sunucu & AI Hesaplama Sistemleri (Server)',
    title_en: 'Enterprise Servers & AI Compute Systems',
    desc_tr: 'Dell PowerEdge, HPE ProLiant 1U/2U/4U Rack Sunucular, Supermicro GPU AI Düğümleri ve KOBİ Tower Sunucuları.',
    desc_en: 'Dell PowerEdge, HPE ProLiant rack servers, Supermicro GPU AI compute nodes, and SMB tower servers.'
  },
  storage: {
    pillar: 'it',
    icon: '💾',
    title_tr: 'Veri Depolama & SAN / NAS Sistemleri (Storage)',
    title_en: 'Data Storage & SAN / NAS Systems',
    desc_tr: 'Dell PowerStore All-Flash NVMe SAN, HPE MSA Fibre Channel Hibrit Storage, Synology Enterprise Rackmount NAS ve QNAP ZFS Depolama.',
    desc_en: 'Dell PowerStore All-Flash NVMe SAN, HPE MSA Fibre Channel storage, Synology Enterprise Rack NAS, and QNAP ZFS backup units.'
  },
  network: {
    pillar: 'it',
    icon: '🌐',
    title_tr: 'Ağ & Telekomünikasyon Altyapısı (Network)',
    title_en: 'Enterprise Networking & Telecom Infrastructure',
    desc_tr: 'Cisco Catalyst ve Huawei CloudEngine 48-Port PoE+ Omurga Switchler, MikroTik 10G Routerlar ve Wi-Fi 7 Mesh AP Sistemleri.',
    desc_en: 'Cisco Catalyst and Huawei CloudEngine PoE+ core switches, MikroTik 10G routers, and enterprise Wi-Fi 7 mesh APs.'
  },
  security: {
    pillar: 'it',
    icon: '🛡️',
    title_tr: 'Siber Güvenlik & Next-Gen Firewall (Security)',
    title_en: 'Cyber Security & Next-Gen Firewalls',
    desc_tr: 'Fortinet FortiGate UTM Güvenlik Duvarları, Palo Alto ML-Powered Next-Gen Firewall Cihazları, Sophos XGS Tehdit Önleme ve Zero-Trust VPN.',
    desc_en: 'Fortinet FortiGate UTM firewalls, Palo Alto ML-Powered NGFW appliances, Sophos XGS threat prevention, and Zero-Trust VPN.'
  },
  datacenter: {
    pillar: 'it',
    icon: '🏢',
    title_tr: 'Veri Merkezi Kabinet & InRow Soğutma',
    title_en: 'Data Center Racks & InRow Cooling',
    desc_tr: '48U ağır hizmet sunucu kabinleri, akıllı IP-PDU güç dağıtımı ve biometrik erişim kontrolü.',
    desc_en: '48U heavy-duty server rack suites with managed IP-PDUs and biometric access control.'
  },
  ups: {
    pillar: 'it',
    icon: '⚡',
    title_tr: 'Kesintisiz Güç Kaynakları (Online UPS)',
    title_en: 'Uninterruptible Power Supplies (UPS)',
    desc_tr: 'Schneider Electric Galaxy 100kVA modüler 3-faz online UPS ve 3000VA saf sinüs rack/tower sistemleri.',
    desc_en: 'Schneider Galaxy 100kVA modular online 3-phase UPS and 3000VA pure sine wave systems.'
  },
  cabling: {
    pillar: 'it',
    icon: '🧶',
    title_tr: 'Yapısal Kablolama & Fiber Optik Sistemler',
    title_en: 'Structured Cabling & Fiber Optics',
    desc_tr: 'Fujikura 90S+ füzyon ek cihazları, Cat7 1000MHz S/FTP LSZH yangına dayanıklı veri kabloları.',
    desc_en: 'Fujikura 90S+ fusion splicers and Cat7 1000MHz S/FTP LSZH fire-resistant data cables.'
  },
  workstation: {
    pillar: 'it',
    title_tr: 'Profesyonel İş İstasyonları (AI & BIM)',
    title_en: 'Professional Workstations (AI & BIM)',
    desc_tr: 'Intel Core i9-14900K, NVIDIA RTX 4090 24GB AI, Deep Learning ve BIM mühendislik render sistemleri.',
    desc_en: 'Intel Core i9-14900K, NVIDIA RTX 4090 24GB AI, Deep Learning and BIM engineering workstations.'
  },
  telecom: {
    pillar: 'it',
    title_tr: 'Telekom, 5G & Transmisyon Altyapısı (Telecom)',
    title_en: 'Telecom, 5G & Transmission Infrastructure',
    desc_tr: 'Huawei / ZTE DWDM Optik Transmisyon, 5G Radyo Erişim Üniteleri (RRU/BBU), GPON OLT/ONT Fiber Dağıtım ve Noktadan Noktaya Mikrodalga Radyolink Sistemleri.',
    desc_en: 'Huawei / ZTE DWDM Optical Transmission, 5G Radio Units (RRU/BBU), GPON OLT/ONT Fiber Access and Point-to-Point Microwave Link Systems.'
  }
};

// ── Complete Renewable Energy & IT Equipment Database (A to Z) ──────────────
const PRODUCTS_DATA = [
  // =========================================================================
  // ── B2B PRODUCTS (KURUMSAL / ENDÜSTRİYEL ENERJİ & IT TEDARİK) ─────────────
  // =========================================================================

  // 1. GES (Güneş Enerjisi Sistemleri)
  {
    id: 'b2b-pv-585',
    mode: 'b2b',
    category: 'ges',
    title_tr: 'Yakın-Longi 585W Hi-MO X6 Bifacial N-Type Çift Cam Güneş Paneli',
    title_en: 'Yakın-Longi 585W Hi-MO X6 Bifacial N-Type Dual-Glass Solar Module',
    brand: 'Longi / Yakın',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '585Wp TOPCon',
    moq: 36,
    unit: 'Adet',
    basePriceTRY: 4250,
    tiers: [
      { min: 36, max: 144, discount: 0, priceTRY: 4250 },
      { min: 145, max: 500, discount: 8, priceTRY: 3910 },
      { min: 501, max: 5000, discount: 15, priceTRY: 3612 }
    ],
    specs: {
      'Hücre Tipi': 'N-Type TOPCon Bifacial Çift Yüzeyli',
      'Modül Verimliliği': '%22.8 Yüksek Verim',
      'Garanti': '15 Yıl Ürün / 30 Yıl Lineer Performans',
      'Maks. Sistem Voltajı': '1500V DC Standart'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak & Kocaeli Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-pv-700',
    mode: 'b2b',
    category: 'ges',
    title_tr: 'Trina Solar Vertex N 700W+ Endüstriyel Çift Cam Çift Yüzeyli Güneş Modülü',
    title_en: 'Trina Solar Vertex N 700W+ Utility-Scale Dual-Glass Bifacial PV Module',
    brand: 'Trina Solar',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '700Wp N-Type',
    moq: 31,
    unit: 'Adet',
    basePriceTRY: 4980,
    tiers: [
      { min: 31, max: 124, discount: 0, priceTRY: 4980 },
      { min: 125, max: 620, discount: 7, priceTRY: 4631 },
      { min: 621, max: 5000, discount: 14, priceTRY: 4282 }
    ],
    specs: {
      'Hücre Teknolojisi': '210mm N-Type i-TOPCon',
      'Modül Verimi': '%22.5',
      'Düşük Sıcaklık Katsayısı': '-0.30%/°C (Yüksek Sıcaklıkta Üstün Verim)',
      'Kullanım Alanı': 'Büyük Ölçekli Arazi GES & Endüstriyel Çatılar'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-bipv-glass',
    mode: 'b2b',
    category: 'ges',
    title_tr: 'Yakın BIPV Bina Entegre Fotovoltaik Güneş Camı Cephe & Çatı Modülü',
    title_en: 'Yakın BIPV Building Integrated Photovoltaic Solar Glass Facade Module',
    brand: 'Yakın Solar',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '180W - 240W / m²',
    moq: 20,
    unit: 'm²',
    basePriceTRY: 6800,
    tiers: [
      { min: 20, max: 100, discount: 0, priceTRY: 6800 },
      { min: 101, max: 500, discount: 10, priceTRY: 6120 }
    ],
    specs: {
      'Cam Yapısı': 'Lamine Çift Kat Temperli Güvenlik Camı',
      'Işık Geçirgenliği': '%10 - %40 Ayarlanabilir Saydamlık',
      'Isı Yalıtımı': 'Low-E Kaplamalı Çift Cam Isı Bariyeri'
    },
    inStock: false,
    leadTime: 'Proje Bazlı 3-4 Hafta',
    datasheetUrl: '#'
  },

  // 2. İNVERTÖR (Inverters & Eviriciler)
  {
    id: 'b2b-inv-110k',
    mode: 'b2b',
    category: 'inverter',
    title_tr: 'Huawei SUN2000-110KTL-M2 Üç Fazlı Ticari Dizi İnvertör',
    title_en: 'Huawei SUN2000-110KTL-M2 3-Phase Commercial String Inverter',
    brand: 'Huawei Smart PV',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '110 kW AC',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 265000,
    tiers: [
      { min: 1, max: 4, discount: 0, priceTRY: 265000 },
      { min: 5, max: 15, discount: 6, priceTRY: 249100 },
      { min: 16, max: 50, discount: 12, priceTRY: 233200 }
    ],
    specs: {
      'Maks. Verim': '%98.8 (Euro Verim %98.6)',
      'MPPT Sayısı': '10 Bağımsız MPPT (20 DC Giriş)',
      'Koruma': 'AI Destekli AFCI Ark Algılama + IP66'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-inv-330k',
    mode: 'b2b',
    category: 'inverter',
    title_tr: 'Sungrow SG330HX 330kW Çoklu MPPT Arazi Santral Tipi Dizi İnvertör',
    title_en: 'Sungrow SG330HX 330kW Multi-MPPT Utility-Scale String Inverter',
    brand: 'Sungrow',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '330 kW (800V AC)',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 620000,
    tiers: [
      { min: 1, max: 3, discount: 0, priceTRY: 620000 },
      { min: 4, max: 12, discount: 8, priceTRY: 570400 }
    ],
    specs: {
      'Maks. Verim': '%99.01',
      'MPPT Girişi': '6 MPPT / 12 Giriş (65A/MPPT)',
      'Soğutma': 'Akıllı Zorlamalı Hava Soğutma (IP66 & C5)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },

  // 3. ENERJİ DEPOLAMA (BESS / ESS Bataryalar)
  {
    id: 'b2b-ess-container',
    mode: 'b2b',
    category: 'energy_storage',
    title_tr: 'Yakın-CATL 2.5 MWh Konteyner Tipi Sıvı Soğutmalı Endüstriyel BESS Depolama',
    title_en: 'Yakın-CATL 2.5 MWh Containerized Liquid-Cooled Utility BESS Storage',
    brand: 'CATL / Yakın Energy',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '2.5 MWh / 1.25 MW',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 16800000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 16800000 },
      { min: 3, max: 10, discount: 7, priceTRY: 15624000 }
    ],
    specs: {
      'Hücre Kimyası': 'LiFePO4 (LFP) 314Ah Ultra Dayanıklı Prizmatik Hücre',
      'Konteyner Boyutu': '20ft Standart ISO / IP55 Sıvı Soğutmalı',
      'Çevrim Ömrü': '≥ 8000 Çevrim (%80 SOH)'
    },
    inStock: false,
    leadTime: '6-8 Hafta Üretim & Proje Teslim',
    datasheetUrl: '#'
  },

  // 4. ISI POMPASI & TERMAL SİSTEMLER
  {
    id: 'b2b-hp-commercial-100k',
    mode: 'b2b',
    category: 'heatpump',
    title_tr: 'Yakın EcoThermal 100kW Endüstriyel Yüksek Sıcaklık Havadan Suya Isı Pompası',
    title_en: 'Yakın EcoThermal 100kW Commercial High-Temp Air-to-Water Heat Pump',
    brand: 'Yakın Termal',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '100 kW Isıtma / 92 kW Soğutma',
    moq: 1,
    unit: 'Ünite',
    basePriceTRY: 580000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 580000 },
      { min: 3, max: 8, discount: 9, priceTRY: 527800 }
    ],
    specs: {
      'Çıkış Suyu Sıcaklığı': '80°C\'ye Kadar Yüksek Sıcaklık (Radyatör & Proses Uyumu)',
      'Soğutucu Gaz': 'R290 Doğal Çevre Dostu Gaz (GWP = 3)',
      'COP Verimliliği': 'COP 4.65 (A+++ Seviyesi)'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 5. RES (Rüzgar Enerjisi Santralleri)
  {
    id: 'b2b-res-turbine-500k',
    mode: 'b2b',
    category: 'res',
    title_tr: 'Yakın WindPro 500kW Doğrudan Tahrikli (Direct-Drive) Endüstriyel Rüzgar Türbini',
    title_en: 'Yakın WindPro 500kW Direct-Drive Industrial Wind Turbine (Gearless PMG)',
    brand: 'Yakın Wind',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '500 kW / 50m Rotor Çapı',
    moq: 1,
    unit: 'Türbin',
    basePriceTRY: 9500000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 9500000 },
      { min: 3, max: 8, discount: 6, priceTRY: 8930000 }
    ],
    specs: {
      'Jeneratör': 'Kalıcı Mıknatıslı Senkron Jeneratör (PMG - Dişli Kutusuz)',
      'Rüzgar Başlama Hızı': '2.5 m/s (Düşük Rüzgarda Yüksek Üretim)',
      'Nominal Hız': '10.5 m/s (Kesme Hızı: 25 m/s)'
    },
    inStock: false,
    leadTime: '8-10 Hafta Üretim & Kurulum',
    datasheetUrl: '#'
  },

  // 6. ARAÇ ŞARJ İSTASYONLARI (EV)
  {
    id: 'b2b-ev-dc180',
    mode: 'b2b',
    category: 'ev',
    title_tr: 'Yakın Volt Pro DC 180kW Çift Tabancalı Ultra Hızlı Şarj İstasyonu (CPO / Hub)',
    title_en: 'Yakın Volt Pro DC 180kW Dual-Gun Ultra-Fast Charging Station (CPO / Hub)',
    brand: 'Yakın Volt',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '180 kW Dual CCS2',
    moq: 1,
    unit: 'Ünite',
    basePriceTRY: 780000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 780000 },
      { min: 3, max: 8, discount: 8, priceTRY: 717600 }
    ],
    specs: {
      'Çıkış Voltajı': '150V - 1000V DC (800V Süper Hızlı Araçlarla Tam Uyum)',
      'Protokol': 'OCPP 1.6J / OCPP 2.0.1 Hazır',
      'Ekran': '15.6 inç Dış Ortam Yüksek Parlaklıklı Dokunmatik'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 7. TRAFO & OG/AG ŞALT MERKEZLERİ (Transformer & Switchgear)
  {
    id: 'b2b-trafo-1600k',
    mode: 'b2b',
    category: 'transformer',
    title_tr: 'Yakın PowerGrid 1600 kVA 34.5/0.4kV Kuru Tip Dökme Reçineli Dağıtım Trafosu',
    title_en: 'Yakın PowerGrid 1600 kVA 34.5/0.4kV Dry-Type Cast Resin Distribution Transformer',
    brand: 'Yakın PowerGrid',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '1600 kVA (34.5 kV / 400V)',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 1150000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 1150000 },
      { min: 3, max: 6, discount: 7, priceTRY: 1069500 }
    ],
    specs: {
      'Kayıp Sınıfı': 'Ecodesign Tier-2 (Düşük Boşta ve Yükte Enerji Kaybı)',
      'Yalıtım': 'F Sınıfı 155°C Dökme Reçine (Yangına & Neme Dayanıklı)',
      'Standart': 'IEC 60076 & TSE Uygunluk Sertifikalı'
    },
    inStock: true,
    leadTime: 'Stokta (Kocaeli Fabrika Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-rmu-switchgear',
    mode: 'b2b',
    category: 'transformer',
    title_tr: 'Schneider Electric RM6 36kV Gaz Yalıtımlı Ring Main Unit (RMU) Şalt Hücresi',
    title_en: 'Schneider Electric RM6 36kV Gas-Insulated Ring Main Unit (RMU) Compact Switchgear',
    brand: 'Schneider Electric',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '36 kV / 630A / 16 kA',
    moq: 1,
    unit: 'Hücre',
    basePriceTRY: 480000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 480000 },
      { min: 3, max: 8, discount: 8, priceTRY: 441600 }
    ],
    specs: {
      'Yapı': '3 Fonksiyonlu Gaz Yalıtımlı Kompakt Hücre (2 Hat + 1 Trafo Koruma Kesicili)',
      'Standart': 'IEC 62271-200 & TEİAŞ/TEDAŞ MYD-96 Tip Onaylı'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },

  // 8. SCADA & ENERJİ OTOMASYONU (Smart Grid & SCADA)
  {
    id: 'b2b-scada-rtu-panel',
    mode: 'b2b',
    category: 'scada',
    title_tr: 'Yakın ScadaGrid GES & RES Santral Otomasyonu ve TEİAŞ Uyumlu RTU Panosu',
    title_en: 'Yakın ScadaGrid Solar & Wind SCADA Automation & TEİAŞ Compliant RTU Panel',
    brand: 'Yakın Otomasyon',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'IEC 60870-5-104 / IEC 61850',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 275000,
    specs: {
      'Haberleşme': 'TEİAŞ Yük Tevzi Merkezine Çift Hatlı Kesintisiz Veri İletimi',
      'Yazılım': '7/24 Web & Mobil SCADA İzleme, Anlık Alarm ve Kayıp Tespiti',
      'Donanım': 'Endüstriyel PLC, Modbus TCP/RTU Gateway, Yedekli UPS Beslemesi'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 9. JENERATÖR & HİBRİT GÜÇ SİSTEMLERİ (Generators)
  {
    id: 'b2b-gen-550k',
    mode: 'b2b',
    category: 'generator',
    title_tr: 'Yakın PowerGen 550 kVA Perkins Motorlu Ağır Hizmet Kabinli Senkron Dizel Jeneratör',
    title_en: 'Yakın PowerGen 550 kVA Perkins Engine Heavy-Duty Canopy Synchronous Diesel Generator',
    brand: 'Yakın PowerGen',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '550 kVA Standby / 500 kVA Prime',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 890000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 890000 },
      { min: 3, max: 6, discount: 7, priceTRY: 827700 }
    ],
    specs: {
      'Motor': 'Orijinal Perkins 2506A Elektronik Enjeksiyonlu Dizel Motor',
      'Alternatör': 'Leroy Somer 4 Kutuplu Fırçasız Senkron Alternatör',
      'Kontrol Ünitesi': 'Deep Sea (DSE) Otomatik Şebeke & Solar Senkronizasyon Modülü'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Sevkiyat)',
    datasheetUrl: '#'
  },

  // 10. IT: SUNUCU & COMPUTE (Server)
  {
    id: 'b2b-srv-poweredge-r760',
    mode: 'b2b',
    category: 'server',
    title_tr: 'Dell PowerEdge R760 2U Çift Soket Intel Xeon Kurumsal Rack Sunucu',
    title_en: 'Dell PowerEdge R760 2U Dual-Socket Intel Xeon Enterprise Rack Server',
    brand: 'Dell Technologies',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '2x Intel Xeon Gold 6430 / 256GB RAM',
    moq: 1,
    unit: 'Sunucu',
    basePriceTRY: 485000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 485000 },
      { min: 3, max: 8, discount: 8, priceTRY: 446200 }
    ],
    specs: {
      'İşlemci': '2x Intel Xeon Gold 6430 (64 Çekirdek, 128 Thread)',
      'Bellek': '256GB DDR5 4800MHz RDIMM ECC (32 Yuva - 8TB Maks)',
      'Depolama': '8x 3.84TB NVMe SSD Enterprise Hot-Plug',
      'Yönetim': 'iDRAC9 Enterprise Remote Management'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Sevkiyat)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-srv-hpe-dl380',
    mode: 'b2b',
    category: 'server',
    title_tr: 'HPE ProLiant DL380 Gen11 2U Sanallaştırma & Veritabanı Rack Sunucu',
    title_en: 'HPE ProLiant DL380 Gen11 2U Virtualization & Database Rack Server',
    brand: 'HPE (Hewlett Packard)',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '2x Intel Xeon Platinum / 512GB RAM',
    moq: 1,
    unit: 'Sunucu',
    basePriceTRY: 620000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 620000 },
      { min: 3, max: 6, discount: 9, priceTRY: 564200 }
    ],
    specs: {
      'İşlemci': '2x Intel Xeon Platinum 8468 (96 Çekirdek, 2.10 GHz)',
      'Bellek': '512GB (16x32GB) DDR5 SmartMemory RDIMM',
      'Güvenlik': 'HPE Silicon Root of Trust & iLO 6 Advanced',
      'Güç Kaynağı': '2x 1600W Flex Slot Platin Redundant PSU'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-srv-supermicro-ai-gpu',
    mode: 'b2b',
    category: 'server',
    title_tr: 'Supermicro 4U 8x GPU AI & LLM Derin Öğrenme Yüksek Hesaplama Sunucusu',
    title_en: 'Supermicro 4U 8x GPU AI & LLM Deep Learning High-Compute Server Node',
    brand: 'Supermicro',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '8x NVIDIA L40S 48GB / 1TB DDR5',
    moq: 1,
    unit: 'Sunucu',
    basePriceTRY: 2450000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 2450000 },
      { min: 3, max: 6, discount: 6, priceTRY: 2303000 }
    ],
    specs: {
      'GPU Desteği': '8x NVIDIA L40S 48GB GDDR6 ECC PCIe 4.0/5.0',
      'İşlemci': '2x Intel Xeon Platinum 8480+ (112 Çekirdek, 224 Thread)',
      'Ağ & Interconnect': '4x 200Gb/s InfiniBand / RoCE v2 QSFP56',
      'Depolama': '8x 7.68TB Enterprise U.2 NVMe SSD (RAID-10)'
    },
    inStock: false,
    leadTime: '2-3 Hafta Proje Sevkiyatı',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-srv-dell-t560',
    mode: 'b2b',
    category: 'server',
    title_tr: 'Dell PowerEdge T560 KOBİ & Şube Ofis Sessiz Tower Sunucu',
    title_en: 'Dell PowerEdge T560 SMB & Branch Office Quiet Tower Server',
    brand: 'Dell Technologies',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'Intel Xeon Silver 4410Y / 64GB ECC',
    moq: 1,
    unit: 'Sunucu',
    basePriceTRY: 195000,
    tiers: [
      { min: 1, max: 3, discount: 0, priceTRY: 195000 },
      { min: 4, max: 10, discount: 7, priceTRY: 181350 }
    ],
    specs: {
      'İşlemci': 'Intel Xeon Silver 4410Y (12 Çekirdek, 24 Thread, 2.0 GHz)',
      'Bellek': '64GB (2x32GB) DDR5 RDIMM ECC',
      'Disk Yuvaları': '8x 3.5" SAS/SATA Hot-Plug (4x 8TB SAS 12G Dahil)',
      'RAID Denetleyici': 'PERC H755 8GB NV Cache Donanımsal RAID'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 8. IT: VERİ DEPOLAMA & SAN / NAS (Storage)
  {
    id: 'b2b-sto-dell-powerstore',
    mode: 'b2b',
    category: 'storage',
    title_tr: 'Dell PowerStore 1200T All-Flash NVMe Kurumsal SAN / NAS Birleşik Veri Depolama',
    title_en: 'Dell PowerStore 1200T All-Flash NVMe Enterprise SAN / NAS Storage Array',
    brand: 'Dell Technologies',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '92 TB Efektif / 25 GbE & 32Gb FC',
    moq: 1,
    unit: 'Array',
    basePriceTRY: 1450000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 1450000 },
      { min: 3, max: 5, discount: 7, priceTRY: 1348500 }
    ],
    specs: {
      'Mimari': 'Active-Active Çift Controller (Dual Node NVMe)',
      'Kapasite': '23 TB Ham / 92 TB Efektif (4:1 Veri Sıkıştırma Garantisi)',
      'Gecikme (Latency)': '< 0.3 ms Sub-millisecond Ultra Düşük Gecikme',
      'Protokoller': 'iSCSI, Fibre Channel (32G), NVMe-oF, NFS, SMB'
    },
    inStock: false,
    leadTime: '2-3 Hafta Proje Sevkiyatı',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sto-hpe-msa2060',
    mode: 'b2b',
    category: 'storage',
    title_tr: 'HPE MSA 2060 16Gb Fibre Channel Hibrit Kurumsal SAN Storage Array',
    title_en: 'HPE MSA 2060 16Gb Fibre Channel Hybrid Enterprise SAN Storage Array',
    brand: 'HPE (Hewlett Packard)',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '24-Bay SFF / Çift 16Gb FC Controller',
    moq: 1,
    unit: 'Array',
    basePriceTRY: 780000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 780000 },
      { min: 3, max: 5, discount: 8, priceTRY: 717600 }
    ],
    specs: {
      'Controller': 'Çift Aktif 16Gb Fibre Channel Controller (4 Port/Controller)',
      'Disk Kapasitesi': '24x 2.5" SFF Yuva (Dahili 8x 3.84TB RI SSD + 16x 2.4TB 10K SAS)',
      'Otomasyon': 'Otomatik Katmanlama (Tiering) ve Anlık Görüntü (Snapshot)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sto-synology-sa3610',
    mode: 'b2b',
    category: 'storage',
    title_tr: 'Synology Enterprise SA3610 24-Yuvalı 2U Rackmount NAS & Petabyte Yedekleme Sunucusu',
    title_en: 'Synology Enterprise SA3610 24-Bay 2U Rackmount NAS & Petabyte Backup Server',
    brand: 'Synology',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '24-Bay SAS/SATA / Dual 10GbE SFP+',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 395000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 395000 },
      { min: 3, max: 6, discount: 8, priceTRY: 363400 }
    ],
    specs: {
      'İşlemci': 'Intel Xeon D-1567 12-Core 2.1 GHz',
      'Bellek': '64GB DDR4 ECC RDIMM (128GB Maks)',
      'Ağ Arayüzü': '2x 10GbE RJ-45 + 4x 1GbE RJ-45 + PCIe Gen3 x8 Genişleme',
      'Ölçeklenebilirlik': 'Genişleme Üniteleriyle 96 Sürücüye / 1.7 PB Kapasite'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Sevkiyat)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sto-pure-flasharray',
    mode: 'b2b',
    category: 'storage',
    title_tr: 'Pure Storage FlashArray //C20 All-Flash NVMe Kapasite Optimize Depolama Ünitesi',
    title_en: 'Pure Storage FlashArray //C20 All-Flash NVMe Capacity-Optimized Storage Array',
    brand: 'Pure Storage',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'DirectFlash NVMe / 100% NVMe-oF',
    moq: 1,
    unit: 'Array',
    basePriceTRY: 2850000,
    specs: {
      'Yazılım': 'Purity//FA İşletim Sistemi, Evergreen Mimari',
      'Veri Azaltma': 'Ortalama 5:1 Tekilleştirme & Sıkıştırma (Deduplication)',
      'Süreklilik': '%99.9999 (6-Nines) Kesintisiz Çalışma Garantisi'
    },
    inStock: false,
    leadTime: '3-4 Hafta Proje Teslimatı',
    datasheetUrl: '#'
  },

  // 9. IT: AĞ & TELEKOM (Network)
  {
    id: 'b2b-net-cisco-catalyst-9300',
    mode: 'b2b',
    category: 'network',
    title_tr: 'Cisco Catalyst 9300 48-Port Gigabit PoE+ Layer-3 Yönetilebilir Omurga Switch',
    title_en: 'Cisco Catalyst 9300 48-Port Gigabit PoE+ Layer-3 Managed Core Switch',
    brand: 'Cisco Systems',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '48x 1GbE PoE+ / 4x 10G SFP+',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 165000,
    tiers: [
      { min: 1, max: 3, discount: 0, priceTRY: 165000 },
      { min: 4, max: 10, discount: 8, priceTRY: 151800 }
    ],
    specs: {
      'Portlar': '48 Port 10/100/1000 Ethernet (PoE+ 740W Bütçe)',
      'Uplink': 'Modüler Network Modülü (4x 10GE SFP+)',
      'Switching Kapasitesi': '480 Gbps / 480 Mpps İletim Hızı',
      'Stacking': 'StackWise-480 Donanımsal Yığınlama Teknolojisi'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-net-huawei-cloudengine',
    mode: 'b2b',
    category: 'network',
    title_tr: 'Huawei CloudEngine S5735-L48P4X-A1 48-Port PoE+ & 4x 10GE SFP+ Switch',
    title_en: 'Huawei CloudEngine S5735-L48P4X-A1 48-Port PoE+ & 4x 10GE SFP+ Enterprise Switch',
    brand: 'Huawei Enterprise',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '48 Port PoE+ (380W) / 4x 10GE SFP+',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 74000,
    tiers: [
      { min: 1, max: 4, discount: 0, priceTRY: 74000 },
      { min: 5, max: 15, discount: 9, priceTRY: 67340 }
    ],
    specs: {
      'Performans': '176 Gbps / 132 Mpps Paket Yönlendirme Kapasitesi',
      'Yönetim': 'iMaster NCE-Campus Bulut Yönetim & SNMP v3',
      'Enerji Tasarrufu': 'Energy Efficient Ethernet (EEE) Desteği'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-net-cisco-ap9130',
    mode: 'b2b',
    category: 'network',
    title_tr: 'Cisco Catalyst 9130AX Series Kurumsal Tri-Band Wi-Fi 6E / Wi-Fi 7 Access Point',
    title_en: 'Cisco Catalyst 9130AX Series Enterprise Tri-Band Wi-Fi 6E / Wi-Fi 7 Access Point',
    brand: 'Cisco Systems',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'Tri-Band 8x8:8 MIMO / 5 Gbps mGig',
    moq: 2,
    unit: 'Adet',
    basePriceTRY: 42000,
    tiers: [
      { min: 2, max: 10, discount: 0, priceTRY: 42000 },
      { min: 11, max: 50, discount: 10, priceTRY: 37800 }
    ],
    specs: {
      'Radyo Yapısı': 'Tri-Band (2.4GHz / 5GHz / 6GHz) 8x8:8 MIMO Akıllı Anten',
      'Kullanıcı Kapasitesi': '1000+ Eşzamanlı Kurumsal İstemci Bağlantısı',
      'Entegrasyon': 'Cisco DNA Spaces, BLE 5.0 ve Zigbee IoT Desteği'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-net-mikrotik-ccr2116',
    mode: 'b2b',
    category: 'network',
    title_tr: 'MikroTik CCR2116-16G-1S+ 16-Çekirdekli 10G Omurga BGP Router & ISP Gateway',
    title_en: 'MikroTik CCR2116-16G-1S+ 16-Core 10G Backbone BGP Router & ISP Gateway',
    brand: 'MikroTik',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '16-Core ARM 2.0 GHz / 4x 10G SFP+',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 58000,
    specs: {
      'İşlemci': 'Annapurna Labs Alpine AL73400 16-Core ARM 64-bit 2.0GHz',
      'Portlar': '13x 1GbE RJ45 + 4x 10G SFP+ Yuvaları + M.2 PCIe Yuvası',
      'BGP Throughput': '13 Gbit/s BGP Yönlendirme Performansı (Çift Yedekli PSU)'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 10. IT: SİBER GÜVENLİK & NEXT-GEN FIREWALL (Security)
  {
    id: 'b2b-sec-fortigate-200f',
    mode: 'b2b',
    category: 'security',
    title_tr: 'Fortinet FortiGate 200F Next-Generation Kurumsal Ağ Güvenlik Duvarı (UTM Bundle)',
    title_en: 'Fortinet FortiGate 200F Next-Generation Enterprise Security Firewall (UTM Bundle)',
    brand: 'Fortinet',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '27 Gbps Firewall / 3 Gbps IPSec VPN',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 245000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 245000 },
      { min: 3, max: 6, discount: 7, priceTRY: 227850 }
    ],
    specs: {
      'Firewall Verimliliği': '27 Gbps Throughput / 3 Gbps SSL-VPN İnceleme',
      'Arayüzler': '16x GE RJ45, 8x SFP, 4x 10GE SFP+ Yuvaları',
      'Lisans': '1 Yıl FortiGuard Enterprise UTM (IPS, AV, Web Filter, Antispam)'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Sevkiyat)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sec-paloalto-pa1410',
    mode: 'b2b',
    category: 'security',
    title_tr: 'Palo Alto Networks PA-1410 Next-Generation Firewall & Zero Trust SOC Cihazı',
    title_en: 'Palo Alto Networks PA-1410 Next-Gen Firewall & Zero Trust SOC Appliance',
    brand: 'Palo Alto Networks',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '10.5 Gbps App-ID / 5.2 Gbps Threat',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 380000,
    specs: {
      'Zero Trust': 'Tam Katman-7 Uygulama Tabanlı App-ID & User-ID Denetimi',
      'Tehdit Önleme': 'WildFire Bulut Tabanlı Sıfırıncı Gün Analizi & DNS Güvenliği',
      'Bağlantılar': '8x 10/100/1000, 4x 1G/2.5G/5G/10G RJ-45, 4x 1G/10G SFP/SFP+'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sec-sophos-xgs2100',
    mode: 'b2b',
    category: 'security',
    title_tr: 'Sophos XGS 2100 Next-Gen Hardware Firewall & Deep Packet Inspection Cihazı',
    title_en: 'Sophos XGS 2100 Next-Gen Hardware Firewall & Deep Packet Inspection Appliance',
    brand: 'Sophos',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '35 Gbps Firewall / 1.3 Gbps TLS',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 185000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 185000 },
      { min: 3, max: 5, discount: 8, priceTRY: 170200 }
    ],
    specs: {
      'İşlemci Mimarisi': 'Çift İşlemci (Xstream Flow İşlemcisi + Çok Çekirdekli x86)',
      'TLS İnceleme': '1.3 Gbps Donanımsal Hızlandırmalı SSL/TLS 1.3 Şifre Çözme',
      'Yönetim': 'Sophos Central Tek Merkezden Bulut Güvenlik Yönetimi'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-sec-checkpoint-quantum',
    mode: 'b2b',
    category: 'security',
    title_tr: 'Check Point Quantum Spark 1800 Pro Kurumsal Siber Savunma Ağ Geçidi',
    title_en: 'Check Point Quantum Spark 1800 Pro Enterprise Cyber Defense Gateway',
    brand: 'Check Point',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '5 Gbps Threat / SandBlast AI',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 215000,
    specs: {
      'Siber Koruma': 'SandBlast AI Zero-Day Tehdit ve Fidye Yazılımı (Ransomware) Engelleme',
      'Port Yapısı': '16x 1GbE LAN, 2x 10GbE SFP+ Fiber Yuva, Çift Güç Kaynağı',
      'VPN Performansı': '2.5 Gbps Güvenli IPSec/SSL Şubeler Arası VPN Tünelleme'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 11. IT: KESİNTİSİZ GÜÇ KAYNAĞI (UPS)
  {
    id: 'b2b-ups-schneider-galaxy-100k',
    mode: 'b2b',
    category: 'ups',
    title_tr: 'Schneider Electric Galaxy VS 100 kVA Modüler 3-Faz Online Kesintisiz Güç Kaynağı',
    title_en: 'Schneider Electric Galaxy VS 100 kVA Modular 3-Phase Online Industrial UPS',
    brand: 'APC by Schneider Electric',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '100 kVA / 100 kW (PF=1.0)',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 780000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 780000 },
      { min: 3, max: 5, discount: 8, priceTRY: 717600 }
    ],
    specs: {
      'Teknoloji': '3-Kademeli Çift Çevrim Online (VFI-SS-111)',
      'Verimlilik': '%99 ECOnversion Patentli Yüksek Verim Modu',
      'Yönetim': 'EcoStruxure IT Bulut İzleme & Akıllı SNMP/Modbus Kartı'
    },
    inStock: true,
    leadTime: 'Stokta (Kocaeli Depo)',
    datasheetUrl: '#'
  },

  // 12. IT: VERİ MERKEZİ & KABİNET
  {
    id: 'b2b-cab-datacenter-48u',
    mode: 'b2b',
    category: 'datacenter',
    title_tr: 'Yakın Datacenter Pro 48U Akıllı Soğutmalı Sunucu Kabinet Paketi (2x IP-PDU + Kilit)',
    title_en: 'Yakın Datacenter Pro 48U Smart Server Rack Suite (2x Managed IP-PDU + Biometric)',
    brand: 'Yakın Teknoloji',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '48U / 1800 kg Statik Taşıma',
    moq: 1,
    unit: 'Kabin',
    basePriceTRY: 210000,
    tiers: [
      { min: 1, max: 4, discount: 0, priceTRY: 210000 },
      { min: 5, max: 20, discount: 12, priceTRY: 184800 }
    ],
    specs: {
      'Boyutlar': '800 x 1200 x 2300 mm (48U Ekstra Derinlik)',
      'Güç Dağıtımı': '2 Adet 32A 3-Faz 22kW Akıllı Yönetilebilir Çıkış Bazlı PDU'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },

  // 13. IT: YAPISAL KABLOLAMA & FIBER
  {
    id: 'b2b-fib-fusion-splicer',
    mode: 'b2b',
    category: 'cabling',
    title_tr: 'Fujikura 90S+ Core Alignment Endüstriyel Fiber Optik Ek Cihazı Seti (Cleaver Dahil)',
    title_en: 'Fujikura 90S+ Core Alignment Industrial Optical Fiber Fusion Splicer Kit',
    brand: 'Fujikura / Yakın',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'Çekirdek Hizalama (Core-Alignment)',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 320000,
    specs: {
      'Ek Süresi': '6-8 Saniye Ultra Hızlı Füzyon Ek (0.01 dB Kayıp)',
      'Set İçeriği': 'CT50 Akıllı Bluetooth Cleaver, Çift Batarya, Taşıma Çantası'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-cab-cat7-drum',
    mode: 'b2b',
    category: 'cabling',
    title_tr: 'Yakın Cabling Cat7 S/FTP 1000MHz LSZH Halojensiz Veri Kablosu (500 Metre Makara)',
    title_en: 'Yakın Cabling Cat7 S/FTP 1000MHz LSZH Halogen-Free Data Cable (500m Drum)',
    brand: 'Yakın Cabling',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '10 Gbps / 1000 MHz Bant Genişliği',
    moq: 2,
    unit: 'Makara (500m)',
    basePriceTRY: 18500,
    tiers: [
      { min: 2, max: 10, discount: 0, priceTRY: 18500 },
      { min: 11, max: 50, discount: 12, priceTRY: 16280 }
    ],
    specs: {
      'İletken': '4x2x23 AWG Katı Saf Bakır (Solid Bare Copper)',
      'Ekranlama': 'Her Çift Alüminyum Folyo + Dış Kalaylı Bakır Örgü (S/FTP)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak & Kocaeli Depo)',
    datasheetUrl: '#'
  },

  // 13. IT: TELEKOM, 5G & TRANSMİSYON ALTYAPISI (Telecom)
  {
    id: 'b2b-telecom-dwdm-huawei',
    mode: 'b2b',
    category: 'telecom',
    title_tr: 'Huawei OptiX OSN 1800 V DWDM / OTN Taşıyıcı Sınıfı Optik Transmisyon Platformu (400G/800G)',
    title_en: 'Huawei OptiX OSN 1800 V Carrier-Grade DWDM / OTN Optical Transmission Platform (400G/800G)',
    brand: 'Huawei Technologies',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '400G / 800G OTN / 5U Subrack',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 640000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 640000 },
      { min: 3, max: 6, discount: 8, priceTRY: 588800 }
    ],
    specs: {
      'Transmisyon Kapasitesi': '80 Dalga Boyu DWDM (50GHz Izgara) / 400G-800G Taşıma',
      'Servis Desteği': '100GE, 10GE, STM-1/4/16/64, OTU2/OTU4 Hibrit Entegrasyon',
      'Yedeklilik': '1+1 Çift Kontrol Kartı, 1+1 Güç Modülü ve Optik Koruma (1+1 OLP)'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-telecom-gpon-olt-ma5800',
    mode: 'b2b',
    category: 'telecom',
    title_tr: 'Huawei SmartAX MA5800-X7 Dağıtık Mimarili XGS-PON / GPON OLT Şasi Sistemi',
    title_en: 'Huawei SmartAX MA5800-X7 Distributed Architecture XGS-PON / GPON OLT Chassis',
    brand: 'Huawei Enterprise',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '7x Hizmet Yuvası / 16-Port XGS-PON',
    moq: 1,
    unit: 'Şasi',
    basePriceTRY: 290000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 290000 },
      { min: 3, max: 5, discount: 7, priceTRY: 269700 }
    ],
    specs: {
      'Kullanıcı Kapasitesi': '7168 GPON / 3584 XGS-PON 10G Simetrik Abone Desteği',
      'Anahtarlama Kapasitesi': '7 Tbit/s Backplane / 200 Gbit/s Yuva Başına Hız',
      'Yedekli Yapı': 'Çift MPU Kontrol Ünitesi ve Çift -48V DC / 220V AC Güç Besleme'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-telecom-microwave-rtn950',
    mode: 'b2b',
    category: 'telecom',
    title_tr: 'Huawei RTN 950A Noktadan Noktaya (PtP) 10Gbps Modüler Mikrodalga Radyolink Seti',
    title_en: 'Huawei RTN 950A Point-to-Point (PtP) 10Gbps Modular Microwave Radio Link Kit',
    brand: 'Huawei Technologies',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '6-42 GHz / 10 Gbps Kapasite',
    moq: 1,
    unit: 'Komple Set',
    basePriceTRY: 380000,
    specs: {
      'Frekans Bandı': '6 GHz - 42 GHz Lisanslı Mikrodalga Bantları + E-Band (80 GHz)',
      'Modülasyon': '4096-QAM Adaptif Modülasyon (AM) ile Kesintisiz İletim',
      'Anten & ODU': '2 Adet Çift Polarizasyonlu Parabolik Çanak Anten ve Yüksek Güçlü ODU'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Sevkiyat)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-telecom-5g-rru-aau',
    mode: 'b2b',
    category: 'telecom',
    title_tr: 'Ericsson / Huawei 5G Massive MIMO 64T64R Aktif Anten Ünitesi (AAU / RRU Makro Baz İstasyonu)',
    title_en: 'Ericsson / Huawei 5G Massive MIMO 64T64R Active Antenna Unit (AAU / RRU Macro Base Station)',
    brand: 'Huawei / Ericsson',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '320W RF Çıkış Gücü / 64T64R',
    moq: 1,
    unit: 'Ünite',
    basePriceTRY: 520000,
    specs: {
      'RF Yapısı': '64 Gönderici / 64 Alıcı (64T64R) 3D Işın Şekillendirme (Beamforming)',
      'Frekans Desteği': 'n78 (3.5 GHz) / n77 C-Band 5G NR Makro Kapsama',
      'Arayüz': '2x 25G eCPRI Optik Fiber Arayüzü / IP65 Dış Ortam Koruma'
    },
    inStock: true,
    leadTime: 'Proje Teslim (1-2 Hafta)',
    datasheetUrl: '#'
  },

  // =========================================================================
  // ── B2C / KOBİ PRODUCTS (BİREYSEL & PROFESYONEL SİSTEMLER) ───────────────
  // =========================================================================

  // 1. GES (Konut & Tak-Çalıştır)
  {
    id: 'b2c-villa-ges-10k',
    mode: 'b2c',
    category: 'ges',
    title_tr: 'Yakın Home 10 kW Hibrit Villa Çatı Güneş Enerjisi Paketi (Batarya Uyumlu + Montaj)',
    title_en: 'Yakın Home 10 kW Hybrid Villa Rooftop Solar Package (Battery Ready + Turnkey)',
    brand: 'Yakın Home',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '10 kWp DC / 10 kW AC',
    moq: 1,
    unit: 'Komple Paket',
    basePriceTRY: 295000,
    installFeeTRY: 45000,
    specs: {
      'Panel Adedi': '18 x 585W TOPCon Çift Cam Modül',
      'İnvertör': '10kW 3-Faz Hibrit Akıllı İnvertör',
      'Montaj': 'Statik Onaylı Alüminyum Çatı Taşıyıcı Seti'
    },
    inStock: true,
    leadTime: '3 Günde Keşif / 7 Günde Kurulum',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-balcony-solar-800',
    mode: 'b2c',
    category: 'ges',
    title_tr: 'Yakın EcoPlug 800W Balkon & Bahçe Tak-Çalıştır Solar Seti (2x Panel + Mikroinverter)',
    title_en: 'Yakın EcoPlug 800W Balcony & Garden Plug & Play Solar Kit (2x Panel + Microinverter)',
    brand: 'Yakın EcoPlug',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '800W AC Çıkış',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 28900,
    specs: {
      'Kurulum': 'Doğrudan Ev Prizine Tak-Çalıştır (Ruhsat Gerektirmez)',
      'Paneller': '2 Adet 430W Full Black Yüksek Verimli Panel',
      'Tasarruf': 'Yıllık ~1100 kWh Elektrik Üretimi'
    },
    inStock: true,
    leadTime: '24 Saatte Kargo (Stokta)',
    datasheetUrl: '#'
  },

  // 2. ISI POMPASI (Konut Tipi)
  {
    id: 'b2c-hp-monoblock-12k',
    mode: 'b2c',
    category: 'heatpump',
    title_tr: 'Yakın EcoHeat 12kW R290 Havadan Suya Akıllı Monoblok Ev Isı Pompası',
    title_en: 'Yakın EcoHeat 12kW R290 Air-to-Water Smart Monobloc Home Heat Pump',
    brand: 'Yakın EcoHeat',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '12 kW Isıtma / A+++',
    moq: 1,
    unit: 'Ünite',
    basePriceTRY: 145000,
    installFeeTRY: 18000,
    specs: {
      'Enerji Sınıfı': 'A+++ (35°C) / A++ (55°C) ErP Enerji Etiketi',
      'Gaz Türü': 'R290 Propan Doğal Gaz (Sıfır Karbon Ayak İzi)',
      'Çıkış Sıcaklığı': '75°C Sıcak Su (Mevcut Peteklerle Tam Uyum)'
    },
    inStock: true,
    leadTime: 'Stokta (3 Günde Montaj)',
    datasheetUrl: '#'
  },

  // 3. JENERATÖR & AKILLI ENERJİ İZLEME (B2C Enerji Altyapısı)
  {
    id: 'b2c-gen-inverter-10k',
    mode: 'b2c',
    category: 'generator',
    title_tr: 'Yakın EcoGen 10 kVA Sessiz Kabinli Akıllı Dizel Ev & Villa Jeneratörü (ATS Dahil)',
    title_en: 'Yakın EcoGen 10 kVA Silent Canopy Smart Diesel Home & Villa Generator (ATS Bundle)',
    brand: 'Yakın EcoGen',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '10 kVA / 8 kW (230V / 400V)',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 78500,
    specs: {
      'Ses Seviyesi': '68 dB Ultra Sessiz Akustik Ses İzolasyon Kabini',
      'Otomatik Transfer': 'Elektrik Kesintisinde 5 Saniyede Otomatik Devreye Girme (ATS Panolu)',
      'Ekran & Kontrol': 'Dijital LCD Çok Fonksiyonlu Kontrol Paneli ve Aşırı Yük Koruması'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-scada-iot-meter',
    mode: 'b2c',
    category: 'scada',
    title_tr: 'Yakın SmartEnergy 3-Faz Akıllı IoT Enerji Analizörü & Mobil Güç İzleme Kiti',
    title_en: 'Yakın SmartEnergy 3-Phase Smart IoT Energy Analyzer & Mobile Power Monitor',
    brand: 'Yakın SmartLink',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '3-Faz 100A Akım Trafolu / Wi-Fi & RS485',
    moq: 1,
    unit: 'Kit',
    basePriceTRY: 8900,
    specs: {
      'İzleme': 'Anlık Tüketim, GES Üretimi, Şebekeye Verilen Güç ve Fatura Hesaplama',
      'Bağlantı': 'Wi-Fi + RS-485 Modbus RTU, Akıllı Telefon & Web Arayüzü',
      'Hassasiyet': 'Class 0.5S Yüksek Hassasiyetli Enerji Ölçümü'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 4. IT: SERVER (B2C & Prosumer Sunucular)
  {
    id: 'b2c-srv-homelab-mini',
    mode: 'b2c',
    category: 'server',
    title_tr: 'Yakın MicroServer Edge Home Lab & Sanallaştırma Mini Sunucu (i7-13700 / 64GB / 4x 2.5G)',
    title_en: 'Yakın MicroServer Edge Home Lab & Virtualization Mini Server (i7-13700 / 64GB / 4x 2.5G)',
    brand: 'Yakın Teknoloji Pro',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: 'Intel Core i7-13700 (16C) / 64GB DDR5',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 48500,
    specs: {
      'İşlemci': 'Intel Core i7-13700 (16 Çekirdek, 24 Thread, 5.2 GHz)',
      'Bellek': '64GB (2x32GB) DDR5 5600MHz Kingston Fury ECC Destekli',
      'Ağ': '4 Adet Intel i226-V 2.5 GbE Ethernet (Proxmox, ESXi, TrueNAS Uyumlu)',
      'Depolama': '2TB Samsung 990 PRO PCIe 4.0 NVMe SSD'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-srv-lenovo-st50',
    mode: 'b2c',
    category: 'server',
    title_tr: 'Lenovo ThinkSystem ST50 V2 Kompakt KOBİ & Ofis Tower Sunucu',
    title_en: 'Lenovo ThinkSystem ST50 V2 Compact SMB & Office Tower Server',
    brand: 'Lenovo Enterprise',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'Intel Xeon E-2324G / 32GB ECC RAM',
    moq: 1,
    unit: 'Sunucu',
    basePriceTRY: 62000,
    specs: {
      'İşlemci': 'Intel Xeon E-2324G (4 Çekirdek, 4.6 GHz)',
      'Bellek': '32GB TruDDR4 ECC UDIMM',
      'Depolama': '2x 4TB Enterprise SATA HDD (Dahili Donanımsal RAID-1)',
      'Kullanım': 'Muhasebe (Logo, Mikro, ERP), Dosya Paylaşımı ve Ofis Veritabanı'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 4. IT: STORAGE (B2C & KOBİ NAS Veri Depolama)
  {
    id: 'b2c-sto-synology-ds923',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'Synology DiskStation DS923+ 4-Yuvalı Akıllı Bulut & Yedekleme NAS Sunucusu (32TB Dahil)',
    title_en: 'Synology DiskStation DS923+ 4-Bay Smart Cloud & Backup NAS Server (32TB Bundle)',
    brand: 'Synology',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '4-Bay / 32 TB WD Red Pro RAID',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 54000,
    specs: {
      'Disk Konfigürasyonu': '4x 8TB WD Red Pro NAS HDD Dahil (RAID 5/6/SHR Desteği)',
      'NVMe Önbellek': '2x 500GB M.2 NVMe SSD Read/Write Cache Entegre',
      'Yazılım': 'Synology DSM 7.2 (Otomatik Ofis/Ev Yedekleme, Fotoğraf & Dosya Bulutu)'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-sto-qnap-tvs874',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'QNAP TVS-h874 Intel Core i7 8-Yuvalı ZFS QuTS hero 10GbE Yüksek Performanslı NAS',
    title_en: 'QNAP TVS-h874 Intel Core i7 8-Bay ZFS QuTS hero 10GbE High-Performance NAS',
    brand: 'QNAP',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'Intel i7 12-Core / 32GB DDR4 / 10GbE',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 115000,
    specs: {
      'İşletim Sistemi': 'ZFS Tabanlı QuTS hero (Veri Bütünlüğü, Self-Healing, Snapshots)',
      'Yuvalar': '8x 3.5"/2.5" SATA 6Gb/s + 2x M.2 2280 PCIe Gen 4 x4',
      'Bağlantılar': 'Dahili 2.5GbE + PCIe Gen 4 Yuvası (10GbE / 25GbE Kart Hazır)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-sto-synology-ds224',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'Synology DiskStation DS224+ 2-Yuvalı Ev & Kişisel Güvenli Bulut NAS Kiti (8TB Dahil)',
    title_en: 'Synology DiskStation DS224+ 2-Bay Home & Personal Secure Cloud NAS Kit (8TB Bundle)',
    brand: 'Synology',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '2-Bay / 2x 4TB WD Red RAID-1',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 24800,
    specs: {
      'Diskler': '2x 4TB Western Digital Red Plus NAS Disk Dahil (Ayna RAID-1)',
      'İşlemci': 'Intel Celeron J4125 4-Core 2.7 GHz',
      'Özellikler': 'Mobil Fotoğraf Otomatik Yedekleme, 4K Video Transcoding, VPN Sunucu'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 5. IT: NETWORK (B2C & KOBİ Ağ Ekipmanları)
  {
    id: 'b2c-net-meshpro-wifi7',
    mode: 'b2c',
    category: 'network',
    title_tr: 'Yakın MeshPro Wi-Fi 7 Tri-Band 19 Gbps Tüm Ev & Ofis Kesintisiz Kablosuz Ağ Kiti (3\'lü)',
    title_en: 'Yakın MeshPro Wi-Fi 7 Tri-Band 19 Gbps Whole Home & Office Mesh Wireless Kit (3-Pack)',
    brand: 'Yakın NetLink',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'BE19000 (6GHz + 5GHz + 2.4GHz)',
    moq: 1,
    unit: 'Set (3\'lü Paket)',
    basePriceTRY: 26500,
    specs: {
      'Hız & Bant': '19 Gbps Tri-Band Wi-Fi 7 (320 MHz Geniş Kanal & 4K-QAM)',
      'Kapsama Alanı': '750 m² Kesintisiz Dolaşım (Seamless Roaming)',
      'Kablolu Portlar': 'Her Ünitede 2x 10 Gbps + 2x 2.5 Gbps Ethernet WAN/LAN'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-net-sw-poe-24p',
    mode: 'b2c',
    category: 'network',
    title_tr: 'Yakın NetLink 24-Port Gigabit PoE+ Yönetilebilir Akıllı Switch (250W PoE + 2x SFP)',
    title_en: 'Yakın NetLink 24-Port Gigabit PoE+ Smart Managed Switch (250W PoE + 2x SFP)',
    brand: 'Yakın NetLink',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '24x PoE+ (250W) / 2x Gigabit SFP',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 12400,
    specs: {
      'Portlar': '24 Port 10/100/1000 Mbps PoE+ (Port Başına 30W Maks)',
      'Uplink': '2 Adet 1.25G Gigabit SFP Fiber Uplink Yuvası',
      'Yönetim': 'Web GUI, VLAN, QoS, IGMP Snooping, Port İzolasyonu'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-net-asus-rog-be98',
    mode: 'b2c',
    category: 'network',
    title_tr: 'ASUS ROG Rapture GT-BE98 Quad-Band Wi-Fi 7 25Gbps Gaming & Yüksek Hızlı Ofis Router',
    title_en: 'ASUS ROG Rapture GT-BE98 Quad-Band Wi-Fi 7 25Gbps Gaming & Office Router',
    brand: 'ASUS',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'BE25000 Quad-Band / Çift 10G Port',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 38500,
    specs: {
      'Hız': '25.000 Mbps Quad-Band Wi-Fi 7 (320MHz & MLO Desteği)',
      'Port Yapısı': '2x 10G Port + 4x 2.5G Port + 1x USB 3.2 Gen 1',
      'Güvenlik': 'AiProtection Pro Trend Micro Tabanlı Ömür Boyu Ücretsiz Ağ Koruması'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-net-ubiquiti-udm-pro',
    mode: 'b2c',
    category: 'network',
    title_tr: 'Ubiquiti UniFi Dream Machine Pro (UDM-Pro) 10G Güvenlik Ağ Geçidi & Switch',
    title_en: 'Ubiquiti UniFi Dream Machine Pro (UDM-Pro) 10G Security Gateway & Switch',
    brand: 'Ubiquiti UniFi',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '10G SFP+ WAN/LAN / 8x 1GbE Switch',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 29500,
    specs: {
      'Sistem': 'UniFi OS Entegre Controller, Protect CCTV, Access & Talk Desteği',
      'Güvenlik': '3.5 Gbps Tam IPS/IDS Tehdit Yönetimi ve DPI Trafik Analizi',
      'Depolama': 'UniFi Protect Video Kaydı İçin 3.5" HDD Yuvası'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 6. IT: SECURITY (B2C & KOBİ Güvenlik Duvarı)
  {
    id: 'b2c-sec-safegate-micro',
    mode: 'b2c',
    category: 'security',
    title_tr: 'Yakın SafeGate Micro KOBİ & Ev Ofis Next-Gen Güvenlik Duvarı (VPN + Siber Koruma)',
    title_en: 'Yakın SafeGate Micro SMB & Home Office Next-Gen Firewall (VPN + Cyber Defense)',
    brand: 'Yakın SafeGate',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '2.5 Gbps Throughput / 5x 2.5G Port',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 16800,
    specs: {
      'Portlar': '5x 2.5 GbE RJ45 Intel i226-V Ağ Portu',
      'Güvenlik': 'Dahili IPS/IDS, Reklam & Zararlı Yazılım Engelleme, DNS Filtreleme',
      'VPN Desteği': 'WireGuard & OpenVPN Donanımsal Hızlandırma (500 Mbps VPN Hızı)'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-sec-fortigate-40f',
    mode: 'b2c',
    category: 'security',
    title_tr: 'Fortinet FortiGate 40F Masaüstü Next-Gen Firewall & Güvenli SSL-VPN Şube Cihazı',
    title_en: 'Fortinet FortiGate 40F Desktop Next-Gen Firewall & Secure SSL-VPN Branch Appliance',
    brand: 'Fortinet',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '5 Gbps Firewall / SOC4 İşlemci',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 32000,
    specs: {
      'İşlemci': 'Fortinet Patentli SOC4 Güvenlik İşlemcisi',
      'Portlar': '5x GE RJ45 (1x WAN, 4x Dahili LAN Switch)',
      'Kapasite': '5 Gbps Firewall / 1 Gbps IPS / 600 Mbps Tehdit Koruması'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-sec-sonicwall-tz370',
    mode: 'b2c',
    category: 'security',
    title_tr: 'SonicWall TZ370 Multi-Gigabit Tehdit Önleme & KOBİ Donanımsal Güvenlik Duvarı',
    title_en: 'SonicWall TZ370 Multi-Gigabit Threat Prevention & SMB Hardware Firewall',
    brand: 'SonicWall',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '3 Gbps Firewall / 1 Gbps Anti-Malware',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 28500,
    specs: {
      'İnceleme': 'Real-Time Deep Memory Inspection (RTDMI) Patentli Bellek Analizi',
      'Arayüz': '8x 1GbE Bakır RJ-45 Port + USB 3.0',
      'Kullanıcı Desteği': '50 Eşzamanlı Kullanıcı ve 250.000 Bağlantı Kapasitesi'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 7. IT: WORKSTATION (İş İstasyonları)
  {
    id: 'b2c-ws-ai-workstation',
    mode: 'b2c',
    category: 'workstation',
    title_tr: 'Yakın AI-Station Pro Intel Core i9-14900K / 64GB DDR5 / RTX 4090 24GB İş İstasyonu',
    title_en: 'Yakın AI-Station Pro Intel Core i9-14900K / 64GB DDR5 / RTX 4090 24GB AI & BIM Workstation',
    brand: 'Yakın Teknoloji Pro',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: 'i9-14900K (24 Çekirdek) + RTX 4090 24GB',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 185000,
    specs: {
      'İşlemci': 'Intel Core i9-14900K (6.0 GHz Turbo, 24 Çekirdek, 32 Thread)',
      'Ekran Kartı': 'NVIDIA GeForce RTX 4090 24GB GDDR6X (AI LLM & BIM Render)',
      'Bellek': '64GB (2x32GB) DDR5 6000MHz Kingston Fury Beast',
      'Depolama': '2TB Samsung 990 Pro NVMe PCIe 4.0 M.2 SSD (7450 MB/s)'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 8. IT: UPS (Kesintisiz Güç Kaynağı)
  {
    id: 'b2c-ups-line-interactive-3k',
    mode: 'b2c',
    category: 'ups',
    title_tr: 'Yakın PowerGuard 3000VA / 2700W Saf Sinüs Online Rack / Tower Kesintisiz Güç Kaynağı',
    title_en: 'Yakın PowerGuard 3000VA / 2700W Pure Sine Wave Online Rack/Tower UPS',
    brand: 'Yakın PowerBase',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '3000 VA / 2700 W (PF=0.9)',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 22500,
    specs: {
      'Çıkış Dalga Şekli': '0ms Transfer Süreli Gerçek Çift Çevrim Saf Sinüs Dalgası',
      'Ekran': 'Döndürülebilir Renkli LCD Ekran',
      'Çıkışlar': '8x IEC C13 + 1x IEC C19 + 2x Standart Schuko Priz'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 9. ARAÇ ŞARJ (Wallbox)
  {
    id: 'b2c-wallbox-22k',
    mode: 'b2c',
    category: 'ev',
    title_tr: 'Yakın Volt Home 22kW Akıllı Elektrikli Araç Şarj Cihazı (Type-2 + RFID + Wi-Fi)',
    title_en: 'Yakın Volt Home 22kW Smart EV Wallbox Charger (Type-2 + RFID + Wi-Fi)',
    brand: 'Yakın Volt',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '22 kW (3-Faz 32A)',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 24500,
    installFeeTRY: 6500,
    specs: {
      'Kablo': '5 Metre Entegre Tip-2 Spiral Kablo',
      'Bağlantı': 'Wi-Fi, Bluetooth, RFID Kart Okuyucu, Mobil Uygulama',
      'Güneş Entegrasyonu': 'Solar Fazlalık Şarj Modu (Sadece GES Üretimiyle Şarj)'
    },
    inStock: true,
    leadTime: 'Stokta (Ücretsiz Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 10. IT: TELEKOM & VOIP / 5G KURUMSAL ERİŞİM (B2C & KOBİ)
  {
    id: 'b2c-telecom-gpon-ont-wifi6',
    mode: 'b2c',
    category: 'telecom',
    title_tr: 'Huawei OptiXstar HG8145X6-10 Wi-Fi 6 AX3000 Gigabit GPON ONT Fiber Modem Router',
    title_en: 'Huawei OptiXstar HG8145X6-10 Wi-Fi 6 AX3000 Gigabit GPON ONT Fiber Modem Router',
    brand: 'Huawei',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: 'AX3000 Wi-Fi 6 / GPON SC-APC',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 3850,
    specs: {
      'Fiber Optik Giriş': 'SC/APC GPON Sınıf B+ Optik Arayüz (2.5 Gbps Down / 1.25 Gbps Up)',
      'Kablosuz Hız': '3000 Mbps Çift Bant Wi-Fi 6 (160MHz Kanal Genişliği & OFDMA)',
      'Portlar': '4x Gigabit Ethernet LAN + 1x POTS VoIP Telefon Portu + 1x USB 2.0'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-telecom-voip-pbx-grandstream',
    mode: 'b2c',
    category: 'telecom',
    title_tr: 'Grandstream UCM6304 IP Santral & Kurumsal VoIP / Video Konferans Ağ Geçidi',
    title_en: 'Grandstream UCM6304 IP PBX & Enterprise VoIP / Video Conference Appliance',
    brand: 'Grandstream',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '1000 Kullanıcı / 150 Eşzamanlı Çağrı',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 46000,
    specs: {
      'Kapasite': '1000 SIP Abonesi, 150 Eşzamanlı Arama ve 6 Konferans Odası Desteği',
      'Port Yapısı': '4x FXO Harici Hat + 4x FXS Dahili Hat + 3x Gigabit PoE Portu',
      'Entegrasyon': 'Grandstream Wave Mobil/Masaüstü Softphone ve TLS/SRTP Güvenlik'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-telecom-5g-cellular-router',
    mode: 'b2c',
    category: 'telecom',
    title_tr: 'Teltonika RUTX50 Endüstriyel Çift SIM 5G / 4G LTE Gigabit Router & Yedekli Ağ Geçidi',
    title_en: 'Teltonika RUTX50 Industrial Dual SIM 5G / 4G LTE Gigabit Router & Failover Gateway',
    brand: 'Teltonika Networks',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '3.3 Gbps 5G Sub-6GHz / Wi-Fi 5',
    moq: 1,
    unit: 'Cihaz',
    basePriceTRY: 29800,
    specs: {
      'Hücresel Hız': '3.3 Gbps\'ye Varan 5G SA/NSA ve 2 Gbps 4G LTE Cat 20 İndirme',
      'SIM & Yedeklilik': 'Otomatik Yük Devretmeli (Auto-Failover) Çift SIM Yuvası',
      'Portlar': '5x Gigabit Ethernet RJ45, 4x SMA 5G Anten, Dayanıklı Alüminyum Gövde'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  }
];

// ── Currency Formatting Helper ──────────────────────────────────────────────
function formatPrice(amountTRY) {
  const cur = state.currency;
  let converted = amountTRY;
  if (cur === 'USD') {
    converted = amountTRY / FX_RATES_TO_TRY.USD;
  } else if (cur === 'EUR') {
    converted = amountTRY / FX_RATES_TO_TRY.EUR;
  }
  
  const symbol = state.currencySymbols[cur];
  const formattedNumber = new Intl.NumberFormat(state.lang === 'tr' ? 'tr-TR' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: (cur === 'TRY' ? 0 : 2)
  }).format(converted);

  return `${symbol}${formattedNumber}`;
}

// ── App Initialization ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlMode = urlParams.get('mode');
  if (urlMode === 'b2c' || urlMode === 'b2b') {
    state.mode = urlMode;
  }

  const urlCat = urlParams.get('cat');
  if (urlCat && CATEGORIES_DEF[urlCat]) {
    state.category = urlCat;
  }

  const savedCart = localStorage.getItem('yakin_market_cart');
  if (savedCart) {
    try { state.cart = JSON.parse(savedCart); } catch (e) { state.cart = []; }
  }

  applyMode(state.mode);
  setupEventListeners();
  renderCategories();
  renderProducts();
  updateCartBadge();
  initSolarCalculator();
});

// ── Mode Switching Logic (B2B ⇄ B2C) ───────────────────────────────────────
function setMarketMode(newMode) {
  if (state.mode === newMode) return;
  state.mode = newMode;
  state.category = 'all';
  state.macroPillar = 'all';
  applyMode(newMode);
  renderCategories();
  renderProducts();
  renderCartDrawer();
}

function applyMode(mode) {
  document.body.classList.remove('mode-b2b', 'mode-b2c');
  document.body.classList.add(`mode-${mode}`);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const t = i18n[state.lang];
  const isB2B = (mode === 'b2b');

  document.getElementById('hero-badge-text').textContent = isB2B ? t.hero_b2b_badge : t.hero_b2c_badge;
  document.getElementById('hero-title-text').textContent = isB2B ? t.hero_b2b_title : t.hero_b2c_title;
  document.getElementById('hero-sub-text').textContent = isB2B ? t.hero_b2b_sub : t.hero_b2c_sub;
  document.getElementById('hero-cta1').textContent = isB2B ? t.hero_b2b_cta1 : t.hero_b2c_cta1;
  document.getElementById('hero-cta2').textContent = isB2B ? t.hero_b2b_cta2 : t.hero_b2c_cta2;

  document.getElementById('stat-1-val').textContent = isB2B ? t.stat_b2b_1 : t.stat_b2c_1;
  document.getElementById('stat-1-lbl').textContent = isB2B ? t.stat_b2b_1_l : t.stat_b2c_1_l;
  document.getElementById('stat-2-val').textContent = isB2B ? t.stat_b2b_2 : t.stat_b2c_2;
  document.getElementById('stat-2-lbl').textContent = isB2B ? t.stat_b2b_2_l : t.stat_b2c_2_l;
  document.getElementById('stat-3-val').textContent = isB2B ? t.stat_b2b_3 : t.stat_b2c_3;
  document.getElementById('stat-3-lbl').textContent = isB2B ? t.stat_b2b_3_l : t.stat_b2c_3_l;
  document.getElementById('stat-4-val').textContent = isB2B ? t.stat_b2b_4 : t.stat_b2c_4;
  document.getElementById('stat-4-lbl').textContent = isB2B ? t.stat_b2b_4_l : t.stat_b2c_4_l;

  document.getElementById('drawer-title-text').textContent = isB2B ? t.drawer_b2b_title : t.drawer_b2c_title;

  const supportEl = document.getElementById('topbar-support-phone');
  if (supportEl) {
    supportEl.textContent = t.topbar_support;
  }
}

// ── Language Toggle ────────────────────────────────────────────────────────
function setLanguage(lang) {
  state.lang = lang;
  applyMode(state.mode);
  renderCategories();
  renderProducts();
  renderCartDrawer();
  initSolarCalculator();
}

// ── Currency Toggle ────────────────────────────────────────────────────────
function setCurrency(curr) {
  state.currency = curr;
  renderProducts();
  renderCartDrawer();
  initSolarCalculator();
}

// ── Macro Pillar & Category Navigation Rendering ───────────────────────────
function setMacroPillar(pillar) {
  state.macroPillar = pillar;
  state.category = 'all';
  renderCategories();
  renderProducts();
}

function handlePillarCategorySelect(pillar, catKey) {
  state.macroPillar = pillar;
  state.category = catKey;
  renderCategories();
  renderProducts();

  const catSection = document.getElementById('catalog');
  if (catSection) {
    catSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderCategories() {
  const catNav = document.getElementById('categories-nav-bar');
  if (!catNav) return;

  const t = i18n[state.lang];
  
  // Available categories for current mode
  const activeProducts = PRODUCTS_DATA.filter(p => p.mode === state.mode);
  const availableCatKeys = [...new Set(activeProducts.map(p => p.category))];

  // Count items per macro pillar
  const energyCount = activeProducts.filter(p => CATEGORIES_DEF[p.category] && CATEGORIES_DEF[p.category].pillar === 'energy').length;
  const itCount = activeProducts.filter(p => CATEGORIES_DEF[p.category] && CATEGORIES_DEF[p.category].pillar === 'it').length;

  // Filter categories by macro pillar if selected
  let filteredCatKeys = availableCatKeys;
  if (state.macroPillar !== 'all') {
    filteredCatKeys = availableCatKeys.filter(k => CATEGORIES_DEF[k] && CATEGORIES_DEF[k].pillar === state.macroPillar);
  }

  // Energy & IT specific categories for dropdowns
  const energyCatKeys = availableCatKeys.filter(k => CATEGORIES_DEF[k] && CATEGORIES_DEF[k].pillar === 'energy');
  const itCatKeys = availableCatKeys.filter(k => CATEGORIES_DEF[k] && CATEGORIES_DEF[k].pillar === 'it');

  // 3-Pillar Master Cards Grid with Dedicated Dropdowns Directly Under Main Headers
  let html = `
    <div class="pillar-cards-grid">
      
      <!-- Pillar 1: Tüm Sistemler & Ekipmanlar -->
      <div class="pillar-card ${state.macroPillar === 'all' && state.category === 'all' ? 'active' : ''}">
        <button class="pillar-card-btn" onclick="setMacroPillar('all')">
          <span class="pillar-title-text">${t.pillar_all}</span>
          <span class="pillar-badge-count">${activeProducts.length}</span>
        </button>
      </div>

      <!-- Pillar 2: Yenilenebilir Enerji & Güç Altyapısı (Header + Dedicated Dropdown) -->
      <div class="pillar-card ${state.macroPillar === 'energy' ? 'active' : ''}">
        <button class="pillar-card-btn" onclick="setMacroPillar('energy')">
          <span class="pillar-title-text">${t.pillar_energy}</span>
          <span class="pillar-badge-count">${energyCount}</span>
        </button>
        <div class="pillar-dropdown-box">
          <label class="pillar-dropdown-label">${state.lang === 'tr' ? 'Enerji Ekipmanları Kategorisi:' : 'Energy Equipment Category:'}</label>
          <select class="pillar-dropdown-select" onchange="handlePillarCategorySelect('energy', this.value)">
            <option value="all" ${state.macroPillar === 'energy' && state.category === 'all' ? 'selected' : ''}>
              ${state.lang === 'tr' ? 'Tüm Enerji Sistemleri' : 'All Energy Systems'} (${energyCount})
            </option>
            ${energyCatKeys.map(k => {
              const def = CATEGORIES_DEF[k];
              const catTitle = state.lang === 'tr' ? def.title_tr : def.title_en;
              const catCount = activeProducts.filter(p => p.category === k).length;
              return `<option value="${k}" ${state.category === k ? 'selected' : ''}>${catTitle} (${catCount})</option>`;
            }).join('')}
          </select>
        </div>
      </div>

      <!-- Pillar 3: IT, Bilişim & Veri Merkezi (Header + Dedicated Dropdown) -->
      <div class="pillar-card ${state.macroPillar === 'it' ? 'active' : ''}">
        <button class="pillar-card-btn" onclick="setMacroPillar('it')">
          <span class="pillar-title-text">${t.pillar_it}</span>
          <span class="pillar-badge-count">${itCount}</span>
        </button>
        <div class="pillar-dropdown-box">
          <label class="pillar-dropdown-label">${state.lang === 'tr' ? 'IT & Veri Merkezi Kategorisi:' : 'IT & Data Center Category:'}</label>
          <select class="pillar-dropdown-select" onchange="handlePillarCategorySelect('it', this.value)">
            <option value="all" ${state.macroPillar === 'it' && state.category === 'all' ? 'selected' : ''}>
              ${state.lang === 'tr' ? 'Tüm IT & Veri Merkezi Ekipmanları' : 'All IT & Data Center Equipment'} (${itCount})
            </option>
            ${itCatKeys.map(k => {
              const def = CATEGORIES_DEF[k];
              const catTitle = state.lang === 'tr' ? def.title_tr : def.title_en;
              const catCount = activeProducts.filter(p => p.category === k).length;
              return `<option value="${k}" ${state.category === k ? 'selected' : ''}>${catTitle} (${catCount})</option>`;
            }).join('')}
          </select>
        </div>
      </div>

    </div>

    <!-- Category Pill Strip (Large Typography, Zero Icons) -->
    <div class="categories-bar">
      <button class="cat-pill-btn ${state.category === 'all' && state.macroPillar === 'all' ? 'active' : ''}" onclick="setMacroPillar('all')">
        <span>${t.cat_all}</span>
        <span class="pill-count-chip">${activeProducts.length}</span>
      </button>
  `;

  filteredCatKeys.forEach(k => {
    const def = CATEGORIES_DEF[k];
    if (!def) return;
    const catTitle = (state.lang === 'tr' ? def.title_tr : def.title_en);
    const catCount = activeProducts.filter(p => p.category === k).length;
    html += `
      <button class="cat-pill-btn ${state.category === k ? 'active' : ''}" onclick="selectCategory('${k}')">
        <span>${catTitle}</span>
        <span class="pill-count-chip">${catCount}</span>
      </button>
    `;
  });

  html += `</div>`;
  catNav.innerHTML = html;
}

function selectCategory(catKey) {
  state.category = catKey;
  if (catKey !== 'all' && CATEGORIES_DEF[catKey]) {
    state.macroPillar = CATEGORIES_DEF[catKey].pillar;
  }
  renderCategories();
  renderProducts();

  // Smooth scroll to catalog section if selecting category
  const catSection = document.getElementById('catalog');
  if (catSection) {
    catSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── Product Card Template Generator ─────────────────────────────────────────
function createProductCardHTML(p) {
  const title = state.lang === 'tr' ? p.title_tr : p.title_en;
  const isB2B = (state.mode === 'b2b');
  const t = i18n[state.lang];

  const specEntries = Object.entries(p.specs).slice(0, 3);
  const specHtml = specEntries.map(([k, v]) => `
    <span class="spec-chip"><strong>${k}:</strong> ${v}</span>
  `).join('');

  let tierHtml = '';
  if (isB2B && p.tiers && p.tiers.length > 1) {
    const topTier = p.tiers[p.tiers.length - 1];
    tierHtml = `
      <div class="b2b-tier-preview">
        <span>${topTier.min}+ ${p.unit} Siparişte</span>
        <strong>%${topTier.discount} İskonto (${formatPrice(topTier.priceTRY)})</strong>
      </div>
    `;
  } else if (!isB2B && p.installFeeTRY) {
    tierHtml = `
      <div class="b2c-install-option">
        ${t.card_install_included}
      </div>
    `;
  }

  return `
    <div class="product-card">
      <div class="card-img-wrapper">
        <img src="${p.image}" alt="${title}" class="card-img" loading="lazy">
        <div class="card-tags-top">
          <span class="tag-badge ${isB2B ? 'tag-b2b' : 'tag-b2c'}">${isB2B ? 'B2B Kurumsal' : 'B2C Bireysel'}</span>
          <span class="tag-badge ${p.inStock ? 'tag-stock' : 'tag-leadtime'}">${p.leadTime}</span>
        </div>
        <button class="quick-view-btn" onclick="openProductDetailModal('${p.id}')">👁️ ${t.card_spec_btn}</button>
      </div>

      <div class="card-body">
        <div class="card-meta">
          <span class="card-brand">${p.brand}</span>
          <span>${p.power ? p.power : ''}</span>
        </div>

        <h3 class="card-title" title="${title}">${title}</h3>

        <div class="card-specs-list">
          ${specHtml}
        </div>

        <div class="card-price-block">
          ${tierHtml}
          <div class="price-main">
            <span class="price-amount">${formatPrice(p.basePriceTRY)}</span>
            <span class="price-sub">/ ${p.unit} ${isB2B ? '+ KDV' : '(KDV Dahil)'}</span>
          </div>
          ${isB2B ? `<div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 3px;">${t.card_moq_prefix} <strong>${p.moq} ${p.unit}</strong></div>` : ''}
        </div>

        <div class="card-actions-row">
          <button class="btn-card-action" onclick="addToCart('${p.id}')">
            ${isB2B ? '📋 ' + t.card_rfq_btn : '🛒 ' + t.card_cart_btn}
          </button>
          <button class="btn-icon-detail" onclick="openProductDetailModal('${p.id}')" title="${t.card_spec_btn}">
            📑
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Product Grid Rendering (Category-Separated Engine) ───────────────────────
function renderProducts() {
  const container = document.getElementById('products-grid-container');
  const countSpan = document.getElementById('results-count-number');
  if (!container) return;

  const t = i18n[state.lang];

  // Base list of mode products
  let modeProducts = PRODUCTS_DATA.filter(p => p.mode === state.mode);

  // Filter by stock
  if (state.filterStockOnly) {
    modeProducts = modeProducts.filter(p => p.inStock);
  }

  // Filter by macro pillar if active
  if (state.macroPillar !== 'all') {
    modeProducts = modeProducts.filter(p => CATEGORIES_DEF[p.category] && CATEGORIES_DEF[p.category].pillar === state.macroPillar);
  }

  // Filter by search query
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    modeProducts = modeProducts.filter(p => {
      const title = (state.lang === 'tr' ? p.title_tr : p.title_en).toLowerCase();
      const brand = p.brand.toLowerCase();
      const power = p.power ? p.power.toLowerCase() : '';
      const cat = p.category.toLowerCase();
      return title.includes(q) || brand.includes(q) || power.includes(q) || cat.includes(q);
    });
  }

  // Sorting
  if (state.sortBy === 'price-asc') {
    modeProducts.sort((a, b) => a.basePriceTRY - b.basePriceTRY);
  } else if (state.sortBy === 'price-desc') {
    modeProducts.sort((a, b) => b.basePriceTRY - a.basePriceTRY);
  }

  if (countSpan) {
    countSpan.textContent = modeProducts.length;
  }

  // Empty state
  if (modeProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px solid var(--border-light);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">${state.lang === 'tr' ? 'Aradığınız kriterlere uygun ekipman bulunamadı.' : 'No matching equipment found.'}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${state.lang === 'tr' ? 'Filtreleri temizleyebilir veya farklı bir arama terimi deneyebilirsiniz.' : 'Try resetting filters or using a different search keyword.'}</p>
        <button class="btn-primary" style="margin-top: 1.5rem;" onclick="resetAllFilters()">${t.filters_reset}</button>
      </div>
    `;
    return;
  }

  // ── CASE A: Specific Category Selected (Single Category Zoom View) ────────
  if (state.category !== 'all') {
    const singleCatProducts = modeProducts.filter(p => p.category === state.category);
    const def = CATEGORIES_DEF[state.category] || {
      icon: '⚡',
      title_tr: state.category.toUpperCase(),
      title_en: state.category.toUpperCase(),
      desc_tr: '',
      desc_en: ''
    };
    const catTitle = state.lang === 'tr' ? def.title_tr : def.title_en;
    const catDesc = state.lang === 'tr' ? def.desc_tr : def.desc_en;

    container.innerHTML = `
      <div style="grid-column: 1 / -1;">
        <div class="category-active-breadcrumb">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <h2 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: var(--text-main); margin: 0;">${catTitle}</h2>
              <span class="category-count-chip">${singleCatProducts.length} ${t.cat_items_suffix}</span>
            </div>
            ${catDesc ? `<p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 5px;">${catDesc}</p>` : ''}
          </div>
          <button class="breadcrumb-back-btn" onclick="selectCategory('all')">
            ${t.cat_back_btn}
          </button>
        </div>

        <div class="products-grid">
          ${singleCatProducts.map(p => createProductCardHTML(p)).join('')}
        </div>
      </div>
    `;
    return;
  }

  // ── CASE B: Search Query Active (Flat Search Results Grid) ─────────────────
  if (state.searchQuery.trim() !== '') {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;">
        <div style="margin-bottom: 1.25rem; font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
          "${state.searchQuery}" ${state.lang === 'tr' ? 'için arama sonuçları' : 'search results'}:
        </div>
        <div class="products-grid">
          ${modeProducts.map(p => createProductCardHTML(p)).join('')}
        </div>
      </div>
    `;
    return;
  }

  // ── CASE C: Category-Separated View (Grouped by Category Blocks) ───────────
  const presentCategories = [...new Set(modeProducts.map(p => p.category))];

  let sectionsHTML = '';

  presentCategories.forEach(catKey => {
    const catItems = modeProducts.filter(p => p.category === catKey);
    if (catItems.length === 0) return;

    const def = CATEGORIES_DEF[catKey] || {
      title_tr: catKey.toUpperCase(),
      title_en: catKey.toUpperCase(),
      desc_tr: '',
      desc_en: ''
    };

    const catTitle = state.lang === 'tr' ? def.title_tr : def.title_en;
    const catDesc = state.lang === 'tr' ? def.desc_tr : def.desc_en;

    sectionsHTML += `
      <section class="category-section-block" id="cat-sec-${catKey}">
        <div class="category-section-header">
          <div class="category-header-left">
            <div class="category-title-group">
              <h3>${catTitle}</h3>
              <p>${catDesc}</p>
            </div>
          </div>
          <div class="category-header-right">
            <span class="category-count-chip">${catItems.length} ${t.cat_items_suffix}</span>
            <button class="category-zoom-btn" onclick="selectCategory('${catKey}')">
              ${t.cat_zoom_btn}
            </button>
          </div>
        </div>

        <div class="products-grid">
          ${catItems.map(p => createProductCardHTML(p)).join('')}
        </div>
      </section>
    `;
  });

  container.innerHTML = `<div style="grid-column: 1 / -1;">${sectionsHTML}</div>`;
}

// ── Filter & Search Listeners ──────────────────────────────────────────────
function setupEventListeners() {
  const searchInput = document.getElementById('search-input-field');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-by-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  const stockCheck = document.getElementById('filter-stock-checkbox');
  if (stockCheck) {
    stockCheck.addEventListener('change', (e) => {
      state.filterStockOnly = e.target.checked;
      renderProducts();
    });
  }
}

function resetAllFilters() {
  state.category = 'all';
  state.macroPillar = 'all';
  state.searchQuery = '';
  state.filterStockOnly = false;
  state.sortBy = 'featured';

  const searchInput = document.getElementById('search-input-field');
  if (searchInput) searchInput.value = '';

  const stockCheck = document.getElementById('filter-stock-checkbox');
  if (stockCheck) stockCheck.checked = false;

  const brandRadios = document.querySelectorAll('input[name="brand-filter"]');
  if (brandRadios.length > 0) brandRadios[0].checked = true;

  renderCategories();
  renderProducts();
}

// ── Cart & RFQ State Management ───────────────────────────────────────────
function addToCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  const minQty = product.moq || 1;

  if (existing) {
    existing.qty += (product.mode === 'b2b' ? minQty : 1);
  } else {
    state.cart.push({
      id: product.id,
      title_tr: product.title_tr,
      title_en: product.title_en,
      brand: product.brand,
      image: product.image,
      unit: product.unit,
      mode: product.mode,
      priceTRY: product.basePriceTRY,
      moq: minQty,
      qty: minQty
    });
  }

  saveCart();
  updateCartBadge();
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  const step = (item.mode === 'b2b' ? item.moq : 1);
  item.qty += (delta * step);

  if (item.qty < item.moq) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCartDrawer();
  updateCartBadge();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('yakin_market_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count-display');
  if (badge) {
    const totalItems = state.cart.reduce((sum, item) => sum + 1, 0);
    badge.textContent = totalItems;
  }
}

// ── Slide-over Cart Drawer ─────────────────────────────────────────────────
function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer-panel');
  const backdrop = document.getElementById('drawer-backdrop-overlay');
  if (drawer && backdrop) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-panel');
  const backdrop = document.getElementById('drawer-backdrop-overlay');
  if (drawer && backdrop) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }
}

function renderCartDrawer() {
  const body = document.getElementById('drawer-items-body');
  const footer = document.getElementById('drawer-footer-panel');
  if (!body || !footer) return;

  const t = i18n[state.lang];
  const isB2B = (state.mode === 'b2b');

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty-state">
        <div class="empty-icon">🛒</div>
        <p>${t.drawer_empty}</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';

  let subtotalTRY = 0;

  body.innerHTML = state.cart.map(item => {
    const title = state.lang === 'tr' ? item.title_tr : item.title_en;
    const itemTotal = item.priceTRY * item.qty;
    subtotalTRY += itemTotal;

    return `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${title}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4>${title}</h4>
          <div class="cart-item-price">${formatPrice(item.priceTRY)} / ${item.unit}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <button class="item-delete-btn" onclick="removeFromCart('${item.id}')" title="Kaldır">🗑️</button>
        </div>
      </div>
    `;
  }).join('');

  const vatTRY = subtotalTRY * 0.20;
  const grandTotalTRY = subtotalTRY + vatTRY;

  document.getElementById('drawer-subtotal-val').textContent = formatPrice(subtotalTRY);
  document.getElementById('drawer-vat-val').textContent = formatPrice(vatTRY);
  document.getElementById('drawer-grandtotal-val').textContent = formatPrice(grandTotalTRY);
  document.getElementById('drawer-checkout-btn-text').textContent = isB2B ? t.drawer_b2b_checkout : t.drawer_b2c_checkout;
}

// ── Proforma / RFQ / Checkout Handler ──────────────────────────────────────
function handleDrawerCheckout() {
  closeCartDrawer();
  if (state.mode === 'b2b') {
    openRFQModal();
  } else {
    openB2CCheckoutModal();
  }
}

// ── Product Details Modal ──────────────────────────────────────────────────
function openProductDetailModal(productId) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('product-detail-modal');
  const container = document.getElementById('product-detail-modal-body');
  if (!modal || !container) return;

  const title = state.lang === 'tr' ? p.title_tr : p.title_en;
  const isB2B = (p.mode === 'b2b');

  const specsRows = Object.entries(p.specs).map(([k, v]) => `
    <tr style="border-bottom: 1px solid var(--border-light);">
      <td style="padding: 8px 12px; font-weight: 700; color: var(--text-secondary); width: 40%;">${k}</td>
      <td style="padding: 8px 12px; color: var(--text-main);">${v}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; margin-bottom: 1.5rem;">
      <div>
        <img src="${p.image}" alt="${title}" style="width: 100%; border-radius: 12px; object-fit: cover; max-height: 280px;">
      </div>
      <div>
        <div style="display: flex; gap: 6px; margin-bottom: 0.5rem;">
          <span class="tag-badge ${isB2B ? 'tag-b2b' : 'tag-b2c'}">${isB2B ? 'B2B Kurumsal' : 'B2C Bireysel'}</span>
          <span class="tag-badge ${p.inStock ? 'tag-stock' : 'tag-leadtime'}">${p.leadTime}</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; margin-bottom: 0.75rem;">${title}</h2>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem;">
          ${formatPrice(p.basePriceTRY)} <span style="font-size: 0.85rem; color: var(--text-muted);">/ ${p.unit} ${isB2B ? '+ KDV' : '(KDV Dahil)'}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
          ${state.lang === 'tr' ? 'Yakın Grup mühendislik garantisi ve orijinal üretici yetkili distribütör sevkiyatı.' : 'Certified original enterprise equipment with Yakın Group warranty.'}
        </p>
        <button class="btn-card-action" style="width: 100%; padding: 0.8rem;" onclick="addToCart('${p.id}'); closeProductDetailModal();">
          ${isB2B ? '📋 Teklif Listesine Ekle (RFQ)' : '🛒 Sepete Ekle'}
        </button>
      </div>
    </div>

    <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
      ${state.lang === 'tr' ? 'Teknik Özellikler & Şartname Değerleri' : 'Technical Specifications & Parameters'}
    </h4>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.86rem; background: var(--bg-subtle); border-radius: 8px; overflow: hidden;">
      ${specsRows}
    </table>
  `;

  modal.classList.add('active');
}

function closeProductDetailModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('active');
}

// ── Solar & Renewable Energy Calculator Logic ──────────────────────────────
function initSolarCalculator() {
  const billSlider = document.getElementById('calc-bill-slider');
  const billValBadge = document.getElementById('calc-bill-val');
  const usageType = document.getElementById('calc-usage-type');
  const regionSelect = document.getElementById('calc-region-select');

  if (!billSlider || !billValBadge) return;

  function calculate() {
    const monthlyBillTRY = parseFloat(billSlider.value);
    billValBadge.textContent = `₺${monthlyBillTRY.toLocaleString('tr-TR')}`;

    const type = usageType ? usageType.value : 'villa';
    const isCommercial = (type === 'commercial');
    const unitRateTRY = isCommercial ? 4.80 : 3.40;

    const monthlyKWh = monthlyBillTRY / unitRateTRY;
    const annualKWh = monthlyKWh * 12;

    let sunHours = 4.2;
    if (regionSelect && regionSelect.value === 'akdeniz') sunHours = 5.2;
    else if (regionSelect && regionSelect.value === 'anadolu') sunHours = 3.8;

    const recommendedKWp = (annualKWh / (sunHours * 365 * 0.82));
    const roundedKWp = Math.max(1, Math.round(recommendedKWp * 10) / 10);

    const estimatedAnnualGen = Math.round(roundedKWp * sunHours * 365 * 0.82);
    const annualSavingsTRY = Math.round(estimatedAnnualGen * unitRateTRY);

    const estimatedCostTRY = roundedKWp * (isCommercial ? 24000 : 31000);
    const paybackYears = Math.max(2.4, Math.round((estimatedCostTRY / annualSavingsTRY) * 10) / 10);

    document.getElementById('calc-res-power-val').textContent = `${roundedKWp} kWp`;
    document.getElementById('calc-res-gen-val').textContent = `${estimatedAnnualGen.toLocaleString('tr-TR')} kWh / Yıl`;
    document.getElementById('calc-res-savings-val').textContent = `₺${annualSavingsTRY.toLocaleString('tr-TR')} / Yıl`;
    document.getElementById('calc-res-payback-val').textContent = `${paybackYears} Yıl`;
  }

  billSlider.addEventListener('input', calculate);
  if (usageType) usageType.addEventListener('change', calculate);
  if (regionSelect) regionSelect.addEventListener('change', calculate);

  calculate();
}

// ── Modals: RFQ, Supplier Application, B2C Checkout ────────────────────────
function openRFQModal() {
  const modal = document.getElementById('rfq-modal');
  if (modal) modal.classList.add('active');
}

function closeRFQModal() {
  const modal = document.getElementById('rfq-modal');
  if (modal) modal.classList.remove('active');
}

function handleRFQSubmit(e) {
  e.preventDefault();
  alert(state.lang === 'tr' 
    ? 'Talebiniz başarıyla alındı! Şartname ve proforma teklif dökümanınız mühendislerimizce incelenip 24 saat içinde şirket e-posta adresinize iletilecektir.' 
    : 'Your RFQ request has been received! An engineered proforma quote will be sent to your email within 24 hours.');
  closeRFQModal();
}

function openSupplierModal() {
  const modal = document.getElementById('supplier-modal');
  if (modal) modal.classList.add('active');
}

function closeSupplierModal() {
  const modal = document.getElementById('supplier-modal');
  if (modal) modal.classList.remove('active');
}

function handleSupplierSubmit(e) {
  e.preventDefault();
  alert(state.lang === 'tr' 
    ? 'Tedarikçi başvurunuz Yakın Grup Satın Alma Komitesi\'ne iletilmiştir. Yetkililerimiz katalog ve teknik yeterlilik belgelerinizi inceleyerek sizinle irtibata geçecektir.' 
    : 'Your supplier application has been forwarded to Yakın Group Procurement Committee.');
  closeSupplierModal();
}

function openB2CCheckoutModal() {
  const modal = document.getElementById('b2c-checkout-modal');
  if (modal) modal.classList.add('active');
}

function closeB2CCheckoutModal() {
  const modal = document.getElementById('b2c-checkout-modal');
  if (modal) modal.classList.remove('active');
}

function handleB2CCheckoutSubmit(e) {
  e.preventDefault();
  alert(state.lang === 'tr' 
    ? 'Sipariş ve keşif / montaj randevu talebiniz onaylandı! Sipariş kodunuz: YKN-' + Math.floor(100000 + Math.random() * 900000) + '. Teknik servis ekibimiz keşif randevusu teyidi için sizi arayacaktır.' 
    : 'Your order and installation survey request has been confirmed!');
  state.cart = [];
  saveCart();
  updateCartBadge();
  closeB2CCheckoutModal();
}
