/**
 * YAKIN GRUP MARKETPLACE — B2B & B2C PLATFORM LOGIC
 * Supports Mode Switching, Multi-currency, Multi-language,
 * Dynamic Filtering, RFQ & Cart Drawer, Solar & Renewable Calculator & Proforma Export.
 */

// Global State
const state = {
  mode: 'b2b', // 'b2b' | 'b2c'
  lang: 'tr',  // 'tr' | 'en'
  currency: 'TRY', // 'TRY' | 'USD' | 'EUR'
  rates: { TRY: 1, USD: 0.026, EUR: 0.024 }, // relative to TRY
  currencySymbols: { TRY: '₺', USD: '$', EUR: '€' },
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
    topbar_tag: 'YENİLENEBİLİR ENERJİ & TİCARET PORTALI',
    topbar_holding: 'Yakın Grup Holding',
    topbar_teklif: 'Şartname & Teklif Stüdyosu',
    topbar_sunum: 'Yatırımcı Sunumu',
    topbar_support: 'Tedarikçi Destek: +90 (212) 345 67 89',
    
    brand_sub: 'MARKETPLACE',
    btn_b2b: '🏢 Kurumsal (B2B)',
    btn_b2c: '🏠 Bireysel (B2C)',
    search_placeholder: 'GES, RES, Isı Pompası, İnvertör, Batarya, Şarj İstasyonu ara...',
    btn_supplier_apply: 'Tedarikçi Ol',
    btn_cart: 'Sepet & Teklif',
    
    hero_b2b_badge: 'ENDÜSTRİYEL YENİLENEBİLİR ENERJİ & ŞARTNAMELİ TEDARİK',
    hero_b2b_title: 'Endüstriyel GES, RES, Isı Pompası & Enerji Depolama Tedarik Platformu',
    hero_b2b_sub: 'Tier-1 Solar PV, Rüzgar Türbinleri, Yüksek Sıcaklık Isı Pompaları, BESS Batarya Konteynerleri ve DC Ultra Hızlı Şarj İstasyonlarında doğrudan üretici fiyatları, kademeli toptan iskonto ve şartnameli RFQ altyapısı.',
    hero_b2b_cta1: 'Toptan Kataloğu Keşfet',
    hero_b2b_cta2: 'BOM / Şartname Teklifi Al',
    
    hero_b2c_badge: 'BİREYSEL & KONUT YENİLENEBİLİR ENERJİ ÇÖZÜMLERİ',
    hero_b2c_title: 'Konut Güneş Enerjisi, Isı Pompası & Akıllı EV Şarj Sistemleri',
    hero_b2c_sub: 'Villa çatı GES paketleri, A+++ çevre dostu R290 ısı pompaları, mikro rüzgar türbinleri, ev tipi bataryalar ve Wallbox şarj cihazlarında anahtar teslim mühendislik ve montaj güvencesi.',
    hero_b2c_cta1: 'Konut Paketlerini İncele',
    hero_b2c_cta2: 'Ücretsiz Keşif Hesapla',

    stat_b2b_1: '500+ MW',
    stat_b2b_1_l: 'Tedarik Gücü (GES/RES)',
    stat_b2b_2: '%100',
    stat_b2b_2_l: 'Tier-1 & CE / IEC Standart',
    stat_b2b_3: '24 Saat',
    stat_b2b_3_l: 'Mühendislik RFQ Süresi',
    stat_b2b_4: 'Cari & Leasing',
    stat_b2b_4_l: 'Yakın Capital Finansmanı',

    stat_b2c_1: '12 Taksit',
    stat_b2c_1_l: 'Tüm Kartlara Vade Farksız',
    stat_b2c_2: '81 İl',
    stat_b2c_2_l: 'Montaj & Mühendislik Ağı',
    stat_b2c_3: 'A+++ / R290',
    stat_b2c_3_l: 'Yüksek Verimli Isı Pompası',
    stat_b2c_4: '10 Yıl',
    stat_b2c_4_l: 'Sistem Performans Garantisi',

    // Categories
    cat_all: 'Tüm Ekipmanlar',
    cat_ges: '☀️ Güneş Enerjisi (GES)',
    cat_res: '💨 Rüzgar Enerjisi (RES)',
    cat_heatpump: '♨️ Isı Pompası & Termal',
    cat_inverter: '🔄 İnvertör & Eviriciler',
    cat_storage: '🔋 Enerji Depolama (BESS)',
    cat_ev: '⚡ Araç Şarj İstasyonu',
    cat_electrical: '🔌 Trafo & Şalt Altyapı',
    cat_smarthome: '📱 Akıllı Enerji & EMS',

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
    rfq_box_desc: 'GES, RES, Isı Pompası ve Depolama projeleriniz için malzeme listenizi (Excel / PDF) yükleyin; 24 saat içinde mühendislik onaylı proforma teklifinizi hazırlayalım.',
    rfq_box_btn: 'Şartname / BOM Yükle',
    supplier_box_title: 'Yakın Grup Tedarikçi Ekosistemi',
    supplier_box_desc: 'Tier-1 güneş panelleri, rüzgar türbinleri, ısı pompaları, invertörler veya bataryalar üretiyorsanız, pazaryerimizde onaylı tedarikçi olun.',
    supplier_box_btn: 'Tedarikçi Başvuru Formu',

    drawer_b2b_title: 'Kurumsal RFQ & Teklif Sepeti',
    drawer_b2c_title: 'Alışveriş Sepetiniz',
    drawer_empty: 'Sepetinizde henüz ekipman bulunmamaktadır.',
    drawer_b2b_checkout: 'Proforma Fatura & Teklif Oluştur',
    drawer_b2c_checkout: 'Güvenli Sipariş & Keşif Onayı',

    footer_about_title: 'Yakın Grup Marketplace',
    footer_about_desc: 'Güneş (GES), Rüzgar (RES), Isı Pompası, Enerji Depolama ve EV Şarj altyapısında Türkiye\'nin ve bölgenin lider B2B & B2C yenilenebilir enerji ticaret platformu.',
    footer_col1_title: 'Kurumsal B2B',
    footer_col2_title: 'Bireysel B2C',
    footer_col3_title: 'Holding & Ekosistem',
    footer_rights: '© 2026 Yakın Grup Holding A.Ş. Tüm hakları saklıdır.'
  },
  en: {
    topbar_tag: 'RENEWABLE ENERGY & COMMERCE PORTAL',
    topbar_holding: 'Yakın Group Holding',
    topbar_teklif: 'Spec & Proposal Studio',
    topbar_sunum: 'Investor Presentation',
    topbar_support: 'Supplier Support: +90 (212) 345 67 89',

    brand_sub: 'MARKETPLACE',
    btn_b2b: '🏢 Corporate (B2B)',
    btn_b2c: '🏠 Consumer (B2C)',
    search_placeholder: 'Search Solar PV, Wind, Heat Pump, Inverter, Battery, EV Chargers...',
    btn_supplier_apply: 'Become Supplier',
    btn_cart: 'Cart & RFQ',

    hero_b2b_badge: 'INDUSTRIAL RENEWABLE ENERGY & SPEC PROCUREMENT',
    hero_b2b_title: 'Industrial Solar (PV), Wind (WTG), Heat Pumps & Energy Storage Supply',
    hero_b2b_sub: 'Direct factory pricing, volume discounts and specification-ready RFQs for Tier-1 Solar PV, Wind Turbines, High-Temp Heat Pumps, Containerized BESS, and Ultra-Fast DC Chargers.',
    hero_b2b_cta1: 'Explore Wholesale Catalog',
    hero_b2b_cta2: 'Request Spec / BOM Quote',

    hero_b2c_badge: 'RESIDENTIAL & CONSUMER RENEWABLE ENERGY',
    hero_b2c_title: 'Rooftop Solar, Eco Heat Pumps & Smart EV Charging',
    hero_b2c_sub: 'Turnkey engineering and installation guarantee on villa rooftop solar packages, A+++ R290 eco heat pumps, micro wind turbines, home batteries, and Wallbox EV chargers.',
    hero_b2c_cta1: 'View Residential Packages',
    hero_b2c_cta2: 'Calculate Free Site Survey',

    stat_b2b_1: '500+ MW',
    stat_b2b_1_l: 'Supply Capacity (PV/Wind)',
    stat_b2b_2: '100%',
    stat_b2b_2_l: 'Tier-1 & CE / IEC Standard',
    stat_b2b_3: '24 Hours',
    stat_b2b_3_l: 'Engineering RFQ Turnaround',
    stat_b2b_4: 'Credit & Lease',
    stat_b2b_4_l: 'Yakın Capital Financing',

    stat_b2c_1: '12 Installments',
    stat_b2c_1_l: 'Zero Interest Available',
    stat_b2c_2: '81 Cities',
    stat_b2c_2_l: 'Turnkey Installation Network',
    stat_b2c_3: 'A+++ / R290',
    stat_b2c_3_l: 'Eco High-Efficiency Heat Pump',
    stat_b2c_4: '10 Years',
    stat_b2c_4_l: 'Performance Guarantee',

    // Categories
    cat_all: 'All Equipment',
    cat_ges: '☀️ Solar Power (PV)',
    cat_res: '💨 Wind Power (WTG)',
    cat_heatpump: '♨️ Heat Pumps & Thermal',
    cat_inverter: '🔄 Inverters & Systems',
    cat_storage: '🔋 Energy Storage (BESS)',
    cat_ev: '⚡ EV Charging Stations',
    cat_electrical: '🔌 Transformers & Grid',
    cat_smarthome: '📱 Smart Energy & EMS',

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
    rfq_box_desc: 'For large-scale utility projects, tenders, or custom Bill of Materials (BOM), receive an engineered proforma within 24 hours.',
    rfq_box_btn: 'Upload BOM / Spec',
    supplier_box_title: 'Yakın Group Supplier Ecosystem',
    supplier_box_desc: 'If you manufacture high-quality solar modules, wind turbines, heat pumps, inverters, or batteries, join our marketplace network.',
    supplier_box_btn: 'Supplier Application Form',

    drawer_b2b_title: 'Corporate RFQ & Quote Cart',
    drawer_b2c_title: 'Your Shopping Cart',
    drawer_empty: 'Your cart is currently empty.',
    drawer_b2b_checkout: 'Generate Proforma Invoice',
    drawer_b2c_checkout: 'Proceed to Secure Checkout',

    footer_about_title: 'Yakın Group Marketplace',
    footer_about_desc: 'Trusted digital supply platform for industrial and residential renewable energy equipment, contracting engineering, and smart technologies.',
    footer_col1_title: 'Corporate B2B',
    footer_col2_title: 'Consumer B2C',
    footer_col3_title: 'Holding & Ecosystem',
    footer_rights: '© 2026 Yakın Group Holding Inc. All rights reserved.'
  }
};

// ── Complete Renewable Energy Product Database ──────────────────────────────
const PRODUCTS_DATA = [
  // =========================================================================
  // ── B2B PRODUCTS (KURUMSAL / ENDÜSTRİYEL TEDARİK) ─────────────────────────
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
    moq: 36, // 1 Pallet
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
      'Maks. Sistem Voltajı': '1500V DC Standart',
      'Dayanım': '5400 Pa Kar / 2400 Pa Rüzgar Yükü'
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
    moq: 31, // 1 Pallet
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
      'Kullanım Alanı': 'Büyük Ölçekli Arazi GES & Endüstriyel Çatılar',
      'Sertifikalar': 'IEC 61215, IEC 61730, CE, UL'
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
      'Isı Yalıtımı': 'Low-E Kaplamalı Çift Cam Isı Bariyeri',
      'Mimari': 'Renkli / Şeffaf / Opak Cephe Giydirme Uyumu'
    },
    inStock: false,
    leadTime: 'Proje Bazlı 3-4 Hafta',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-ges-tracker',
    mode: 'b2b',
    category: 'ges',
    title_tr: 'YakınTrack Çift Eksenli Akıllı Astronomik Güneş Takip Sistemi (Tracker)',
    title_en: 'YakınTrack Dual-Axis Smart Astronomical Solar Tracker System',
    brand: 'Yakın Mühendislik',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '40kWp / 64 Panel Taşıma',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 185000,
    tiers: [
      { min: 1, max: 5, discount: 0, priceTRY: 185000 },
      { min: 6, max: 25, discount: 12, priceTRY: 162800 }
    ],
    specs: {
      'Verim Artışı': '+%35 - +%45 Ekstra Yıllık Enerji Üretimi',
      'Kontrol': 'GPS + Astronomik Algoritma + Rüzgar Sensörü Otomatik Park Modu',
      'Motor & Şanzıman': 'IP66 IP Sınıfı Ağır Hizmet Sonsuz Vida Tahrik',
      'Konstrüksiyon': 'Sıcak Daldırma Galvanizli Çelik (C4/C5 Korozyon Direnci)'
    },
    inStock: true,
    leadTime: 'Stokta (1-2 Hafta Kurulum)',
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
      'Haberleşme': 'RS485, MBUS, 4G / Smart Dongle Entegre',
      'Koruma': 'AI Destekli AFCI Ark Algılama + IP66',
      'PID Kurtarma': 'Entegre Anti-PID Modülü'
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
      'DC/AC Oranı': '1.8x Yüksek DC Yükleme Oranı',
      'MPPT Girişi': '6 MPPT / 12 Giriş (65A/MPPT)',
      'Şebeke Uyumu': 'SCR ≥ 1.0 Zayıf Şebeke Desteği & Q-at-Night',
      'Soğutma': 'Akıllı Zorlamalı Hava Soğutma (IP66 & C5)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-inv-hybrid-50k',
    mode: 'b2b',
    category: 'inverter',
    title_tr: 'Deye 50kW Yüksek Voltaj Üç Fazlı Ticari Hibrit İnvertör (Batarya Uyumlu)',
    title_en: 'Deye 50kW High-Voltage 3-Phase Commercial Hybrid Inverter (BESS Ready)',
    brand: 'Deye / Yakın',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '50 kW AC / 65 kW DC',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 195000,
    tiers: [
      { min: 1, max: 3, discount: 0, priceTRY: 195000 },
      { min: 4, max: 10, discount: 7, priceTRY: 181350 }
    ],
    specs: {
      'Batarya Voltaj Aralığı': '160V - 800V HV Lityum Batarya Desteği',
      'Şebekeden Bağımsız (Off-Grid)': '10ms Kesintisiz Güç Geçişi (UPS Fonksiyonu)',
      'Paralel Bağlantı': '10 Üniteye Kadar Paralel Çalışma (500kW)',
      'Dizel Jeneratör Girişi': 'Entegre Otomatik Jeneratör Start/Stop Yönetimi'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 3. ENERJİ DEPOLAMA (BESS / ESS Bataryalar)
  {
    id: 'b2b-ess-container',
    mode: 'b2b',
    category: 'storage',
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
      'Çevrim Ömrü': '≥ 8000 Çevrim (%80 SOH)',
      'Yangın Güvenliği': 'NFPA 855 / Aerosol + Novec 1230 Gazlı Söndürme',
      'PCS Entegrasyonu': 'Entegre 1.25MW Çift Yönlü Evirici + Trafo'
    },
    inStock: false,
    leadTime: '6-8 Hafta Üretim & Proje Teslim',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-ess-commercial-215kwh',
    mode: 'b2b',
    category: 'storage',
    title_tr: 'Yakın PowerVault 215 kWh / 100kW Fabrika & KOBİ Ticari Batarya Kabini',
    title_en: 'Yakın PowerVault 215 kWh / 100kW Commercial & Industrial Energy Storage Cabinet',
    brand: 'Yakın Energy',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '215 kWh / 100 kW',
    moq: 1,
    unit: 'Kabin',
    basePriceTRY: 1850000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 1850000 },
      { min: 3, max: 8, discount: 8, priceTRY: 1702000 }
    ],
    specs: {
      'Uygulama': 'Pik Tıraşlama (Peak Shaving) & Jeneratör İkamesi',
      'Batarya Teknolojisi': 'LFP Hücreler + Akıllı Çift Yönlü BMS',
      'Soğutma Sistemi': 'Endüstriyel Sıvı Soğutma (Liquid Cooling)',
      'Boyut & Yerleşim': 'Kompakt Dış Ortam IP55 Kabin (Sadece 1.8 m² Taban Alanı)'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak & Kocaeli Depo)',
    datasheetUrl: '#'
  },

  // 4. ISI POMPASI & TERMAL SİSTEMLER (Heat Pumps)
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
      'COP Verimliliği': 'COP 4.65 (A+++ Seviyesi)',
      'Kaskad Desteği': '16 Üniteye Kadar Kaskad Bağlantı (1.6 MW Kapasite)',
      'Kullanım Alanı': 'Oteller, Hastaneler, Fabrika Isıtma & Sıcak Su Hatları'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-hp-geothermal-150k',
    mode: 'b2b',
    category: 'heatpump',
    title_tr: 'Yakın GeoMaster 150kW Toprak / Su Kaynaklı Jeotermal Isı Pompası',
    title_en: 'Yakın GeoMaster 150kW Ground/Water-Source Geothermal Heat Pump',
    brand: 'Yakın Termal',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '150 kW Jeotermal Güç',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 890000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 890000 },
      { min: 3, max: 6, discount: 8, priceTRY: 818800 }
    ],
    specs: {
      'COP Değeri': 'COP 5.80 (Maksimum Jeotermal Verim)',
      'Kompresör': 'Danfoss Inverter Scroll Çift Kompresör',
      'Sondaj & Kolektör': 'Dikey Jeotermal Kuyu / Göl / Deniz Suyu Entegrasyonu',
      'Akıllı Kontrol': 'Modbus & BACnet Bina Otomasyonu (BMS) Entegre'
    },
    inStock: false,
    leadTime: '4-6 Hafta Proje Bazlı Teslim',
    datasheetUrl: '#'
  },

  // 5. RES (Rüzgar Enerjisi Santralleri & Türbinleri)
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
      'Nominal Hız': '10.5 m/s (Kesme Hızı: 25 m/s)',
      'Kule Yüksekliği': '45m / 55m Konik Çelik Kule Seçenekleri',
      'Kanat': 'Epoksi Cam Elyaf Takviyeli 24.5m Aerodinamik Kanatlar'
    },
    inStock: false,
    leadTime: '8-10 Hafta Üretim & Kurulum',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-res-lidar',
    mode: 'b2b',
    category: 'res',
    title_tr: 'ZX 300 Sürekli Dalga Rüzgar Lidar Ölçüm & RES Saha Fizibilite İstasyonu',
    title_en: 'ZX 300 Continuous Wave Wind Lidar Measurement Station',
    brand: 'ZX Lidars / Yakın',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '10m - 300m Ölçüm Aralığı',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 1450000,
    specs: {
      'Ölçüm Yüksekliği': '10m ile 300m Arasında 50 Farklı Yükseklik Katmanı',
      'Güç Kaynağı': 'Entegre Güneş Paneli + Metanol Yakıt Pili (Otonom Çalışma)',
      'Hassasiyet': 'Banka ve Finans Onaylı RES Fizibilite Raporlaması',
      'Haberleşme': 'Uydu & 4G/5G Canlı Veri Aktarımı'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 6. ARAÇ ŞARJ İSTASYONLARI (EV Charging)
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
      { min: 3, max: 8, discount: 8, priceTRY: 717600 },
      { min: 9, max: 30, discount: 14, priceTRY: 670800 }
    ],
    specs: {
      'Çıkış Voltajı': '150V - 1000V DC (800V Süper Hızlı Araçlarla Tam Uyum)',
      'Protokol': 'OCPP 1.6J / OCPP 2.0.1 Hazır',
      'Ödeme Terminali': 'Entegre Temassız POS / Kredi Kartı / RFID',
      'Ekran': '15.6 inç Dış Ortam Yüksek Parlaklıklı Dokunmatik',
      'Dinamik Güç': 'Smart Power Matrix Akıllı Yük Dağılımı'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-ev-dc360',
    mode: 'b2b',
    category: 'ev',
    title_tr: 'Yakın Volt Ultra DC 360kW Sıvı Soğutmalı Dağıtımlı Megawatt Şarj İstasyonu Hub\'ı',
    title_en: 'Yakın Volt Ultra DC 360kW Liquid-Cooled Split Megawatt Charging Hub',
    brand: 'Yakın Volt',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '360 kW (500A Sıvı Soğutmalı)',
    moq: 1,
    unit: 'Sistem',
    basePriceTRY: 1480000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 1480000 },
      { min: 3, max: 6, discount: 7, priceTRY: 1376400 }
    ],
    specs: {
      'Şarj Hızı': '10 Dakikada 300+ km Menzil Şarjı',
      'Kablo': 'Sıvı Soğutmalı Hafif 500A CCS2 Tabanca',
      'Dağıtıcı Ünite': '1 Güç Kabini + 4 Bağımsız Dispenser Uyumu',
      'Verimlilik': '%96.5 Yüksek Enerji Dönüşüm Verimi'
    },
    inStock: true,
    leadTime: 'Stokta (Kocaeli Depo)',
    datasheetUrl: '#'
  },

  // 7. TRAFO & ŞALT ALTYAPI & VERİ MERKEZİ
  {
    id: 'b2b-trafo-1600',
    mode: 'b2b',
    category: 'electrical',
    title_tr: '1600 kVA 34.5/0.4 kV Kuru Tip Dökme Reçineli Dağıtım Transformatörü',
    title_en: '1600 kVA 34.5/0.4 kV Cast Resin Dry-Type Distribution Transformer',
    brand: 'Schneider / Yakın',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '1600 kVA',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 1250000,
    tiers: [
      { min: 1, max: 2, discount: 0, priceTRY: 1250000 },
      { min: 3, max: 10, discount: 6, priceTRY: 1175000 }
    ],
    specs: {
      'Gerilim': '34.5 kV / 400V (50 Hz)',
      'Yalıtım': 'F / F Sınıfı Kuru Tip (Yangına Dayanıklı)',
      'Kayıp': 'EcoDesign Tier 2 Uyumlu (Ultra Düşük Kayıplı)',
      'Koruma': 'PT100 Sıcaklık Sensörleri + IP31 Muhafaza'
    },
    inStock: false,
    leadTime: '3-4 Hafta Üretim',
    datasheetUrl: '#'
  },
  {
    id: 'b2b-dc-rack42u',
    mode: 'b2b',
    category: 'electrical',
    title_tr: 'Yakın Modular Data Center 42U Akıllı Sunucu Kabin Paketi (PDU + InRow Soğutma)',
    title_en: 'Yakın Modular Data Center 42U Smart Server Rack Suite (PDU + InRow Cooling)',
    brand: 'Yakın Teknoloji',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '12 kW Kapasite',
    moq: 2,
    unit: 'Kabin',
    basePriceTRY: 185000,
    tiers: [
      { min: 2, max: 5, discount: 0, priceTRY: 185000 },
      { min: 6, max: 20, discount: 10, priceTRY: 166500 }
    ],
    specs: {
      'Ölçüler': '800 x 1200 x 2055 mm (42U)',
      'Statik Yük': '1500 kg Taşıma Kapasitesi',
      'PDU': 'Yönetilebilir IP-PDU (32A 3-Faz)',
      'Sertifikasyon': 'TIA-942 Tier III Uyumlu'
    },
    inStock: true,
    leadTime: 'Stokta (Maslak Depo)',
    datasheetUrl: '#'
  },

  // =========================================================================
  // ── B2C PRODUCTS (BİREYSEL & KONUT ENERJİ SİSTEMLERİ) ────────────────────
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
      'Montaj': 'Statik Onaylı Alüminyum Çatı Taşıyıcı Seti',
      'Mobil Takip': 'Yakın Energy iOS & Android Anlık İzleme',
      'Garanti': '10 Yıl Sistem & Montaj Garantisi'
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
      'Mikroinverter': '800W Dahili Wi-Fi / Bulut Bağlantılı',
      'Kablo & Askı': 'Balkon Korkuluğu / Teras Ayarlanabilir Montaj Braketi',
      'Tasarruf': 'Yıllık ~1100 kWh Elektrik Üretimi'
    },
    inStock: true,
    leadTime: '24 Saatte Kargo (Stokta)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-portable-solar-400',
    mode: 'b2c',
    category: 'ges',
    title_tr: 'Yakın SolarFold 400W Katlanabilir Monokristal Taşınabilir Güneş Paneli',
    title_en: 'Yakın SolarFold 400W Foldable Monocrystalline Portable Solar Panel',
    brand: 'Yakın PowerBase',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '400Wp Monokristal',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 16500,
    specs: {
      'Hücre Verimi': '%23.4 Yüksek Dönüşüm Verimliliği',
      'Taşıma': 'Dahili Taşıma Çantası + Ayaklı Destek Sehpa',
      'Suya Dayanıklılık': 'IP68 Su & Toz Geçirmezlik Kaplaması',
      'Bağlantı': 'MC4 Evrensel Konnektör / Güç İstasyonları ile Uyumlu'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 2. ISI POMPASI (Konut Tipi Isıtma & Sıcak Su)
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
      'Çıkış Sıcaklığı': '75°C Sıcak Su (Mevcut Peteklerle Tam Uyum)',
      'Ses Seviyesi': '38 dB(A) Ultra Sessiz Gece Çalışma Modu',
      'Mobil Uygulama': 'Wi-Fi Entegre Akıllı Oda Termostatı & Sıcaklık Takibi'
    },
    inStock: true,
    leadTime: 'Stokta (3 Günde Montaj)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-hp-hybrid-boiler',
    mode: 'b2c',
    category: 'heatpump',
    title_tr: 'Yakın ThermPlus 250L Güneş & Isı Pompası Entegreli Akıllı Sıcak Su Boyleri',
    title_en: 'Yakın ThermPlus 250L Solar & Heat Pump Integrated Smart Domestic Hot Water Boiler',
    brand: 'Yakın EcoHeat',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '2.5 kW Termal / 250 Litre',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 48500,
    installFeeTRY: 6500,
    specs: {
      'Hacim': '250 Litre Emaye Kaplı Titanyum Anot Korumalı Depo',
      'Tasarruf': 'Klasik Elektrikli Termosifona Göre %75 Daha Az Tüketim',
      'Çalışma Aralığı': '-7°C ile +43°C Dış Ortam Havasından Isı Transferi',
      'Legionella Koruması': 'Otomatik 65°C Anti-Bakteri Dezenfeksiyon Döngüsü'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 3. İNVERTÖR (Ev & Mikro Sistemler)
  {
    id: 'b2c-inv-hybrid-8k',
    mode: 'b2c',
    category: 'inverter',
    title_tr: 'Growatt SPH 8000TL-HU 8kW Üç Fazlı Hibrit Akıllı Ev İnvertörü',
    title_en: 'Growatt SPH 8000TL-HU 8kW 3-Phase Smart Hybrid Home Inverter',
    brand: 'Growatt',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '8 kW AC / 12 kW DC',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 68000,
    specs: {
      'Verim': '%98.2 Maksimum Verimlilik',
      'MPPT': '2 Bağımsız MPPT Takipçisi',
      'Batarya Arayüzü': 'Lityum & Kurşun-Asit Batarya Desteği',
      'EPS Çıkışı': 'Elektrik Kesildiğinde 10ms İçinde Evi Besleme'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-microinv-hoymiles-800',
    mode: 'b2c',
    category: 'inverter',
    title_tr: 'Hoymiles HMS-800W-2T 800W Dahili Wi-Fi Mikroinverter (2 Panel İçin 2 MPPT)',
    title_en: 'Hoymiles HMS-800W-2T 800W Built-in Wi-Fi Microinverter (2 MPPTs)',
    brand: 'Hoymiles',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '800W AC (2x MPPT)',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 8400,
    specs: {
      'Giriş': '2 Adet 320W - 540W+ Güneş Paneli Desteği',
      'Haberleşme': 'Dahili Wi-Fi Modülü (Ek Gateway DTU Gerektirmez)',
      'Güvenlik': '60V DC Altı Güvenli Voltaj (Yangın Riski Sıfır)',
      'Garanti': '12 Yıl Standart / 25 Yıl Opsiyonel Garanti'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 4. ENERJİ DEPOLAMA (Ev Bataryaları & Güç İstasyonları)
  {
    id: 'b2c-home-bat-5k',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'Yakın WallBattery 5.12 kWh Duvar Tipi Lityum LiFePO4 Ev Bataryası',
    title_en: 'Yakın WallBattery 5.12 kWh Wall-Mount Lithium LiFePO4 Home Battery',
    brand: 'Yakın Energy',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '5.12 kWh / 100Ah 51.2V',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 88000,
    installFeeTRY: 12000,
    specs: {
      'Hücre Kimyası': 'Tier-1 LiFePO4 (6000+ Çevrim)',
      'Genişletilebilirlik': '15 Üniteye Kadar Paralel Bağlantı (76.8 kWh)',
      'Uyumlu İnvertörler': 'Growatt, Deye, Huawei, Victron, Goodwe',
      'İletişim': 'CAN / RS485 Entegre Akıllı BMS'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-home-bat-10k',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'Yakın StackPower 10.24 kWh Yüksek Voltaj Modüler Ev Enerji Depolama Kulesi',
    title_en: 'Yakın StackPower 10.24 kWh High-Voltage Modular Home Battery Tower',
    brand: 'Yakın Energy',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '10.24 kWh / 204.8V HV',
    moq: 1,
    unit: 'Kule',
    basePriceTRY: 165000,
    installFeeTRY: 15000,
    specs: {
      'Modüler Yapı': 'Tak-Çıkar Modüllerle 25.6 kWh\'e Kadar Kolay Büyütme',
      'HV Avantajı': 'Yüksek Voltaj Sayesinde %97.5 Çift Yönlü Çevrim Verimi',
      'Tasarım': 'Şık İnce Tasarım (Evin İçinde veya Garajda Sıfır Alan Kaybı)',
      'Güvenlik': 'Çok Kademeli Termal Koruma & Otomatik Hücre Dengeleme'
    },
    inStock: true,
    leadTime: 'Stokta (3 Günde Kurulum)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-power-station-2k',
    mode: 'b2c',
    category: 'storage',
    title_tr: 'Yakın PowerBase 2048Wh Portatif Güç İstasyonu (2400W Kesintisiz Güç Kaynağı)',
    title_en: 'Yakın PowerBase 2048Wh Portable Power Station (2400W AC UPS)',
    brand: 'Yakın PowerBase',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '2400W Sürekli / 4800W Tepe AC',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 64900,
    specs: {
      'Batarya': '2048Wh LiFePO4 (3500+ Çevrim)',
      'Şarj': '55 Dakikada %80 Hızlı Şebeke Şarjı / 800W Güneş Girişi',
      'Çıkışlar': '4x 220V AC Priz, 2x 100W USB-C PD, 4x USB-A',
      'UPS Modu': 'Elektrik Kesintisinde 20ms İçinde Devreye Girme'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },

  // 5. RES (Mikro Konut & Çiftlik Rüzgar Türbinleri)
  {
    id: 'b2c-res-turbine-3k',
    mode: 'b2c',
    category: 'res',
    title_tr: 'Yakın AeroHome 3kW Sessiz Dikey Eksenli Konut & Çiftlik Rüzgar Türbini',
    title_en: 'Yakın AeroHome 3kW Silent Vertical-Axis Home & Farm Wind Turbine',
    brand: 'Yakın Wind',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '3 kW (48V / 220V)',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 78000,
    installFeeTRY: 14000,
    specs: {
      'Tasarım': 'Dikey Eksenli (Maglev Manyetik Yataklama ile 30 dB Süper Sessiz)',
      'Rüzgar Yönü': '360 Derece Tüm Rüzgarları Karşılar (Yön Değiştirme Gerektirmez)',
      'Başlama Hızı': '1.5 m/s Düşük Rüzgarda Dönmeye Başlar',
      'Kullanım': 'Müstakil Ev, Çiftlik, Karavan, Baz İstasyonu'
    },
    inStock: true,
    leadTime: 'Stokta (Hemen Teslim)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-res-hybrid-controller',
    mode: 'b2c',
    category: 'res',
    title_tr: 'Yakın WindSolar 5kW Hibrit Rüzgar & Güneş Akıllı MPPT Şarj Kontrolörü',
    title_en: 'Yakın WindSolar 5kW Hybrid Wind & Solar Smart MPPT Charge Controller',
    brand: 'Yakın Wind',
    image: 'assets/images/data_center_construction_1785092614608.png',
    power: '3kW Rüzgar + 2kW Güneş',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 14200,
    specs: {
      'Frenleme': 'Otomatik Elektronik & Manuel Kademeli Dump-Load Rüzgar Freni',
      'Ekran': 'Geniş Renkli LCD (Rüzgar Hızı, Panel Voltajı, Batarya Şarj Akımı)',
      'Batarya Uyumu': '12V / 24V / 48V Otomatik Algılama LFP & Jel Batarya'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 6. ARAÇ ŞARJ İSTASYONLARI (Wallbox)
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
      'Güneş Entegrasyonu': 'Solar Fazlalık Şarj Modu (Sadece GES Üretimiyle Şarj)',
      'Koruma': 'Dahili 6mA DC Kaçak Akım + IP65 Su Geçirmezlik',
      'Yük Dengeleme': 'Ev Ana Sigortasını Attırmayan Dinamik Güç Yönetimi'
    },
    inStock: true,
    leadTime: 'Stokta (Ücretsiz Aynı Gün Kargo)',
    datasheetUrl: '#'
  },
  {
    id: 'b2c-ev-mobile-charger',
    mode: 'b2c',
    category: 'ev',
    title_tr: 'Yakın Volt Go 11kW Ayarlanabilir Taşınabilir Seyahat Tipi EV Şarj Adaptörü',
    title_en: 'Yakın Volt Go 11kW Adjustable Portable Travel EV Charger Adapter',
    brand: 'Yakın Volt',
    image: 'assets/images/energy_hero_1784577681830.png',
    power: '11 kW (3-Faz 16A)',
    moq: 1,
    unit: 'Set',
    basePriceTRY: 12800,
    specs: {
      'Ayarlanabilir Akım': '6A / 8A / 10A / 13A / 16A Kademeli Seçim',
      'Dönüştürücü': 'Kırmızı CEE Sanayi Prizi + Standart Ev Prizi (Schuko) Adaptörü',
      'Ekran': 'OLED Ekran (Çekilen Akım, Sıcaklık, Toplam Verilen kWh)',
      'Çanta': 'Özel Darbeye Dayanıklı Taşıma Çantası Dahil'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
    datasheetUrl: '#'
  },

  // 7. AKILLI ENERJİ & EMS YÖNETİMİ
  {
    id: 'b2c-iot-meter',
    mode: 'b2c',
    category: 'smarthome',
    title_tr: 'Yakın SmartSense 3-Faz Akıllı Enerji Analizörü & Mobil Kaçak Akım Rölesi',
    title_en: 'Yakın SmartSense 3-Phase Smart Energy Meter & Cloud Leakage Relay',
    brand: 'Yakın Teknoloji',
    image: 'assets/images/civil_engineering_bim_1785010076530.png',
    power: '80A x 3-Faz',
    moq: 1,
    unit: 'Adet',
    basePriceTRY: 4850,
    specs: {
      'İzleme': 'Gerilim, Akım, Aktif/Reaktif Güç, Tüketim Grafiği (₺/Saat)',
      'Haberleşme': 'Wi-Fi / Zigbee / Tuya Entegrasyonu',
      'Akıllı Koruma': 'Aşırı Voltaj, Düşük Voltaj ve Sıcaklık Alarmları',
      'DIN Ray Montajı': 'Standart Sigorta Panosuna Kolay Geçme'
    },
    inStock: true,
    leadTime: 'Stokta (Aynı Gün Kargo)',
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
  if (urlCat) {
    state.category = urlCat;
  }

  // Restore cart
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
  state.category = 'all'; // Reset category on mode switch
  applyMode(newMode);
  renderCategories();
  renderProducts();
  renderCartDrawer();
}

function applyMode(mode) {
  document.body.classList.remove('mode-b2b', 'mode-b2c');
  document.body.classList.add(`mode-${mode}`);

  // Update pill buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Update Dynamic Text elements
  const t = i18n[state.lang];
  const isB2B = (mode === 'b2b');

  document.getElementById('hero-badge-text').textContent = isB2B ? t.hero_b2b_badge : t.hero_b2c_badge;
  document.getElementById('hero-title-text').textContent = isB2B ? t.hero_b2b_title : t.hero_b2c_title;
  document.getElementById('hero-sub-text').textContent = isB2B ? t.hero_b2b_sub : t.hero_b2c_sub;
  document.getElementById('hero-cta1').textContent = isB2B ? t.hero_b2b_cta1 : t.hero_b2c_cta1;
  document.getElementById('hero-cta2').textContent = isB2B ? t.hero_b2b_cta2 : t.hero_b2c_cta2;

  // Stats
  document.getElementById('stat-1-val').textContent = isB2B ? t.stat_b2b_1 : t.stat_b2c_1;
  document.getElementById('stat-1-lbl').textContent = isB2B ? t.stat_b2b_1_l : t.stat_b2c_1_l;
  document.getElementById('stat-2-val').textContent = isB2B ? t.stat_b2b_2 : t.stat_b2c_2;
  document.getElementById('stat-2-lbl').textContent = isB2B ? t.stat_b2b_2_l : t.stat_b2c_2_l;
  document.getElementById('stat-3-val').textContent = isB2B ? t.stat_b2b_3 : t.stat_b2c_3;
  document.getElementById('stat-3-lbl').textContent = isB2B ? t.stat_b2b_3_l : t.stat_b2c_3_l;
  document.getElementById('stat-4-val').textContent = isB2B ? t.stat_b2b_4 : t.stat_b2c_4;
  document.getElementById('stat-4-lbl').textContent = isB2B ? t.stat_b2b_4_l : t.stat_b2c_4_l;

  // Drawer Title
  document.getElementById('drawer-title-text').textContent = isB2B ? t.drawer_b2b_title : t.drawer_b2c_title;
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

// ── Category Pills Rendering ───────────────────────────────────────────────
function renderCategories() {
  const catNav = document.getElementById('categories-nav-bar');
  if (!catNav) return;

  const t = i18n[state.lang];
  
  // Universal categories across modes
  let categories = [
    { key: 'all', label: t.cat_all, icon: '⚡' },
    { key: 'ges', label: t.cat_ges, icon: '☀️' },
    { key: 'heatpump', label: t.cat_heatpump, icon: '♨️' },
    { key: 'inverter', label: t.cat_inverter, icon: '🔄' },
    { key: 'storage', label: t.cat_storage, icon: '🔋' },
    { key: 'res', label: t.cat_res, icon: '💨' },
    { key: 'ev', label: t.cat_ev, icon: '⚡' }
  ];

  if (state.mode === 'b2b') {
    categories.push(
      { key: 'electrical', label: t.cat_electrical, icon: '🔌' }
    );
  } else {
    categories.push(
      { key: 'smarthome', label: t.cat_smarthome, icon: '📱' }
    );
  }

  catNav.innerHTML = categories.map(cat => `
    <button class="cat-pill-btn ${state.category === cat.key ? 'active' : ''}" onclick="selectCategory('${cat.key}')">
      ${cat.label}
    </button>
  `).join('');
}

function selectCategory(catKey) {
  state.category = catKey;
  renderCategories();
  renderProducts();
}

// ── Product Grid Rendering ─────────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid-container');
  const countSpan = document.getElementById('results-count-number');
  if (!grid) return;

  const t = i18n[state.lang];

  // Filter products by mode
  let filtered = PRODUCTS_DATA.filter(p => p.mode === state.mode);

  // Filter by category
  if (state.category !== 'all') {
    filtered = filtered.filter(p => p.category === state.category);
  }

  // Filter by search query
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => {
      const title = (state.lang === 'tr' ? p.title_tr : p.title_en).toLowerCase();
      const brand = p.brand.toLowerCase();
      const power = p.power ? p.power.toLowerCase() : '';
      const cat = p.category.toLowerCase();
      return title.includes(q) || brand.includes(q) || power.includes(q) || cat.includes(q);
    });
  }

  // Filter by stock only
  if (state.filterStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }

  // Sort
  if (state.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.basePriceTRY - b.basePriceTRY);
  } else if (state.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.basePriceTRY - a.basePriceTRY);
  }

  if (countSpan) {
    countSpan.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px solid var(--border-light);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">${state.lang === 'tr' ? 'Aradığınız kriterlere uygun yenilenebilir enerji ekipmanı bulunamadı.' : 'No matching renewable energy equipment found.'}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${state.lang === 'tr' ? 'Filtreleri temizleyebilir veya farklı bir arama terimi (GES, RES, Isı Pompası vb.) deneyebilirsiniz.' : 'Try resetting filters or using a different search keyword.'}</p>
        <button class="btn-primary" style="margin-top: 1.5rem;" onclick="resetAllFilters()">${t.filters_reset}</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const title = state.lang === 'tr' ? p.title_tr : p.title_en;
    const isB2B = (state.mode === 'b2b');

    // Spec chips
    const specEntries = Object.entries(p.specs).slice(0, 3);
    const specHtml = specEntries.map(([k, v]) => `
      <span class="spec-chip"><strong>${k}:</strong> ${v}</span>
    `).join('');

    // Tier or B2C Install text
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
  }).join('');
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
          ${state.lang === 'tr' ? 'Yakın Grup mühendislik garantisi ve teknik şartname onaylı orijinal üretici sevkiyatı.' : 'Certified original equipment with Yakın Group engineering warranty.'}
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

    // Daily peak sun hours & wind coefficient by region
    let sunHours = 4.2;
    if (regionSelect && regionSelect.value === 'akdeniz') sunHours = 5.2;
    else if (regionSelect && regionSelect.value === 'anadolu') sunHours = 3.8;

    // Recommended system size in kWp: Annual / (sunHours * 365 * 0.82 PR)
    const recommendedKWp = (annualKWh / (sunHours * 365 * 0.82));
    const roundedKWp = Math.max(1, Math.round(recommendedKWp * 10) / 10);

    const estimatedAnnualGen = Math.round(roundedKWp * sunHours * 365 * 0.82);
    const annualSavingsTRY = Math.round(estimatedAnnualGen * unitRateTRY);

    // Payback period
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
