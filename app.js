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
    cluster_a_label: 'Yenilenebilir Enerji Sistemleri', cluster_em_label: 'ELEKTRİK & MEKANİK TAAHHÜT', cluster_b_label: 'Veri Merkezi Sistemleri', cluster_telecom_label: 'Telekomünikasyon', cluster_cyber_label: 'Siber Güvenlik Çözümleri',
    hero_badge1: 'İNŞAAT & TAAHHÜT', hero_badge2: 'ENERJİ & ALTYAPI',
    hero_badge3: 'FİNANS & YATIRIM', hero_badge4: 'DİJİTAL DÖNÜŞÜM & YAPAY ZEKA',
    hero_title1: 'Yakın İnşaat',
    hero_title2: 'Yakın Enerji',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Teknoloji',
    hero_desc1: 'Veri merkezleri, endüstriyel tesisler ve ağır mühendislik taahhüt projelerinde küresel standartlar.',
    hero_desc2: 'Endüstriyel altyapı ve teknoloji projelerinde anahtar teslim çözümler.',
    hero_desc3: 'Proje finansmanı danışmanlığı, yapılandırma ve yatırım çözümleri platformu.',
    hero_desc4: 'Dijital hakediş, yapay zekâ, BIM entegrasyonu ve ileri seviye proje yönetim platformu.',
    btn_explore: 'Keşfet', btn_view_details: 'Detaylı İncele',
    btn_vcard_download: 'Kartviziti İndir (.vcf)', btn_vcard_share: 'Paylaş',
    btn_market_register: 'Bekleme Listesine Katıl', btn_market_browse: 'Kataloğu İncele',
    btn_market_join: 'Beni Listeye Ekle', btn_send: 'Mesajı Gönder',
    btn_presentation_tr: 'Yatırımcı Sunumu (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Yakın Grup Holding',
    group_lead: 'İnşaat, enerji, finans ve teknoloji sektörlerinde uçtan uca katma değeri yüksek çözümler sunuyoruz.',
    group_body: 'Köklü mühendislik tecrübemiz, finansal gücümüz ve yenilikçi teknoloji odaklı yaklaşımımızla tüm sektörlerimizde uluslararası standartlarda sürdürülebilir, emniyetli ve güvenilir bir gelecek inşa ediyoruz.',
    stat_years: 'YILLIK TECRÜBE', stat_area: 'm² İnşaat Alanı',
    stat_mw: 'MW Kurulu Güç', stat_companies: 'Grup Şirketi',
    stat_mw_full: 'MW Toplam Kurulu Güç', stat_co2: 'Ton CO₂ Azaltımı',
    stat_scada: 'Akıllı SCADA İzleme', stat_services: 'Mühendislik Branşı',
    iso_heading: 'ULUSLARARASI ISO SERTİFİKALARI', iso_sub: 'Entegre Kalite & Güvenlik Yönetim Sistemleri',
    c_title: 'Yakın İnşaat',
    c_desc: 'Veri merkezlerinden konut ve sanayi yapılarına kadar her projede üstün kalite, dayanıklılık ve sürdürülebilir yöntemler.',
    c_services_title: 'Endüstriyel İnşaat Çözümlerimiz',
    c_s1_title: 'Veri Merkezi İnşaatı', c_s1_desc: 'Tier III ve Tier IV sertifikalı, yüksek güvenilirlikli mission-critical veri merkezi yapıları.',
    c_s2_title: 'Ağır Sanayi Tesisleri', c_s2_desc: 'Fabrikalar, dökümhaneler ve ağır sanayi tesislerinde uçtan uca anahtar teslim inşaat taahhüdü.',
    c_s3_title: 'Konut & Yaşam Projeleri', c_s3_desc: 'Modern mimari estetik ve ileri deprem mühendisliğiyle tasarlanan lüks yaşam kompleksleri.',
    c_s4_title: 'Yapı Mühendisliği & BIM', c_s4_desc: 'İleri seviye deprem mühendisliği, 5D BIM entegrasyonu ve teknik mühendislik projelendirme.',
    c_s5_title: 'Havalimanı & Ulaşım', c_s5_desc: 'Uluslararası standartlarda havalimanı terminal binaları ve raylı sistem ulaşım altyapıları.',
    c_s6_title: 'Kentsel Dönüşüm', c_s6_desc: 'Riskli binaların tespiti, karbon elyaf / çelik mantolama ile deprem güçlendirme uygulamaları.',
    btn_service_details: 'Detaylar & vCard İrtibat ›',
    portfolio_title: 'Tamamlanan Referans Projelerimiz',
    c_gal1_title: 'T-3 Veri Merkezi Yapımı', c_gal2_title: 'Uluslararası Havalimanı Terminali',
    c_gal3_title: 'Vadi Konakları Yaşam Kompleksi', c_gal4_title: 'Yapı Güçlendirme & BIM Tasarımı',
    e_title: 'Yakın Enerji',
    e_services_title: 'Endüstriyel Çözüm ve Hizmetler',
    e_desc: 'Endüstriyel altyapı ve teknoloji projelerinde anahtar teslim çözümler, katma değer üreten mühendislik projeleri ve profesyonel hizmetler.',
    cap_desc: 'Yakın Capital, grubumuzun projelerini uçtan uca geliştiren, finansman çözümleri üreten bir danışmanlık ve yatırım platformudur.',
    cap_heading: 'Sermaye Yapılandırması & Proje Finansmanı',
    cap_body: 'Vizyonumuz; inşaat, enerji ve altyapı projelerimizin sadece fiziksel inşasını yapmak değil; bankalar, GYO\'lar, leasing şirketleri, sigorta kurumları ve yatırımcılar ile entegre şeffaf finansman ve risk modelleri sunmaktır.',
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
    cap_c1_title: 'Finansman ve Kredi',
    cap_c1_i1: 'Banka proje finansmanı',
    cap_c1_i2: 'Leasing organizasyonu',
    cap_c1_i3: 'Hakediş bazlı finansman modelleri',
    cap_c2_title: 'Yatırım ve Yapılandırma',
    cap_c2_i1: 'GYO iş birlikleri',
    cap_c2_i2: 'Girişim sermayesi ilişkileri',
    cap_c2_i3: 'SPV (Özel Amaçlı Şirket) kurulumu',
    cap_c3_title: 'Risk ve Danışmanlık',
    cap_c3_i1: 'Nakit akışı modelleme',
    cap_c3_i2: 'Sigorta ve teminat çözümleri',
    cap_c3_i3: 'Finansal fizibilite danışmanlığı',
    cap_phase1_title: 'Bugün — Stratejik İş Birlikleri',
    cap_phase1_desc: 'Bankalar, leasing şirketleri ve sigorta kuruluşlarıyla çerçeve anlaşmalar.',
    cap_phase2_title: 'Advisory — Danışmanlık',
    cap_phase2_desc: 'Proje finansmanı danışmanlığı, finansal modelleme ve risk yönetimi.',
    cap_phase3_title: 'Fund — Yatırım Fonu',
    cap_phase3_desc: 'Gayrimenkul yatırım fonları ve yabancı yatırımcı katılımıyla proje bazlı platform.',
    cap_vcard_box_title: 'Başvuru ve İletişim için Kurumsal vCard Kartvizitlerimiz',
    cap_vcard_box_desc: 'Proje finansmanı, leasing veya yatırım danışmanlığı başvurularınız için yöneticilerimize direkt ulaşabilirsiniz.',
    
    tech_t1_title: 'Dijital Hakediş',
    tech_t1_i1: 'Anlık ve şeffaf hakediş onay altyapıları',
    tech_t1_i2: 'Taşeron ve malzeme süreç otomasyonu',
    tech_t1_i3: 'Sıfır hata ile finansal onay & ödemeler',
    tech_t2_title: 'Yapay Zekâ',
    tech_t2_i1: 'Makine öğrenmesi ile şantiye verimlilik analizi',
    tech_t2_i2: 'İSG risklerini ve maliyet artışlarını öngörme',
    tech_t2_i3: 'Yapay zekâ destekli otonom veri raporlama',
    tech_t3_title: 'BIM Entegrasyonu',
    tech_t3_i1: '5D BIM dijital ikiz model entegrasyonu',
    tech_t3_i2: 'Yapı ömrü boyunca kusursuz veri yönetimi',
    tech_t3_i3: 'LOD 400 uygulama detay koordinasyonu',
    tech_t4_title: 'Yakın Platform',
    tech_t4_i1: 'Mühendislik, satınalma & saha tek ekranda',
    tech_t4_i2: 'Canlı mobil durum takibi & anlık telemetri',
    tech_t4_i3: 'IoT sensör ve bulut sistem entegrasyonu',
    tech_phase1_title: 'Bugün — SaaS & Mobil Saha Takibi',
    tech_phase1_desc: 'Yakın Platform ile anlık saha, satınalma ve mühendislik verisi entegrasyonu.',
    tech_phase2_title: 'AI & BIM Entegrasyonu — 5D Dijital İkiz',
    tech_phase2_desc: 'Yapay zekâ kestirimci analiz, otomatik çakışma tespiti ve LOD 400 BIM yönetimi.',
    tech_phase3_title: 'Otonom Şantiye & IoT — Geleceğin Altyapısı',
    tech_phase3_desc: 'IoT sensörler, canlı telemetri ve otonom iş güvenliği yönetim ekosistemi.',
    tech_vcard_box_title: 'Başvuru ve İletişim için Kurumsal vCard Kartvizitlerimiz',
    tech_vcard_box_desc: 'Teknoloji çözümlerimiz, BIM 5D entegrasyonu veya Yakın Platform SaaS demo talepleriniz için yöneticilerimize direkt ulaşabilirsiniz.',
    
    cluster_iot_label: 'IOT & OTOMASYON SİSTEMLERİ',
    tag_references: 'REFERANSLAR',
    energy_ref_subtitle: 'Uygulamasını gerçekleştirdiğimiz yenilenebilir enerji, depolama, akıllı ev otomasyonu ve veri merkezi çözümlerimiz.',
    portfolio_subtitle: 'Tüm projelerimizin detaylarını görsellere tıklayarak inceleyebilirsiniz.',
    btn_vcard_inspect: 'vCard & Detaylı İncele',
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
    hero_title1: 'Yakın Construction',
    hero_title2: 'Yakın Energy',
    hero_title3: 'Yakın Capital', hero_title4: 'Yakın Technology',
    hero_desc1: 'Global standards in data center construction, industrial facilities and heavy engineering projects.',
    hero_desc2: 'Renewable Energy Systems, Electrical & Mechanical, Telecommunications, Data Center & Cybersecurity, IoT & Automation Systems.',
    hero_desc3: 'Project financing advisory, structuring and investment solutions platform.',
    hero_desc4: 'Digital progress payments, AI, BIM integration and advanced project management platform.',
    btn_explore: 'Explore', btn_view_details: 'View Details',
    btn_vcard_download: 'Download Business Card (.vcf)', btn_vcard_share: 'Share',
    btn_market_register: 'Join Waitlist', btn_market_browse: 'Browse Catalogue',
    btn_market_join: 'Add Me to the List', btn_send: 'Send Message',
    btn_presentation_tr: 'Investor Presentation (TR)', btn_presentation_en: 'Investor Presentation (EN)',
    group_heading: 'Yakın Group Holding',
    group_lead: 'We provide end-to-end high value-added solutions across the construction, energy, finance, and technology sectors.',
    group_body: 'With our deep engineering expertise, financial strength, and innovative technology-driven approach, we build a sustainable, safe, and reliable future to international standards across all our sectors.',
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
    c_s3_title: 'Residential & Living Projects', c_s3_desc: 'Luxury living complexes designed with modern architectural aesthetics and advanced seismic engineering.',
    c_s4_title: 'Structural Engineering & BIM', c_s4_desc: 'Advanced seismic engineering, BIM integration and comprehensive technical design.',
    c_s5_title: 'Airport & Transportation', c_s5_desc: 'International standard airport terminals and transportation infrastructure projects.',
    c_s6_title: 'Urban Renewal', c_s6_desc: 'Assessment of vulnerable structures, seismic retrofitting via carbon fiber / steel jacketing.',
    btn_service_details: 'Details & vCard Contact ›',
    portfolio_title: 'Our Completed Reference Projects',
    c_gal1_title: 'T-3 Data Center Construction', c_gal2_title: 'International Airport Terminal',
    c_gal3_title: 'Vadi Mansions Living Complex', c_gal4_title: 'Structural Retrofitting & BIM Design',
    e_title: 'Yakın Energy',
    e_services_title: 'Industrial Solutions & Services',
    e_desc: 'Turnkey solutions, value-adding engineering projects, and professional services in industrial infrastructure and technology projects.',
    cap_desc: 'Yakın Capital is an advisory and investment platform that develops group projects end-to-end and creates financing solutions.',
    cap_heading: 'Capital Structuring & Project Finance',
    cap_body: 'Our vision is not only to physically build our construction, energy and infrastructure projects, but to offer transparent financing and risk models integrated with banks, REITs, leasing companies, insurance institutions and investors.',
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
    cap_c1_title: 'Financing & Credit',
    cap_c1_i1: 'Bank project financing',
    cap_c1_i2: 'Leasing organization',
    cap_c1_i3: 'Progress payment-based financing models',
    cap_c2_title: 'Investment & Structuring',
    cap_c2_i1: 'REIT partnerships',
    cap_c2_i2: 'Venture capital relations',
    cap_c2_i3: 'SPV (Special Purpose Vehicle) setup',
    cap_c3_title: 'Risk & Advisory',
    cap_c3_i1: 'Cash flow modeling',
    cap_c3_i2: 'Insurance & guarantee solutions',
    cap_c3_i3: 'Financial feasibility consulting',
    cap_phase1_title: 'Today — Strategic Partnerships',
    cap_phase1_desc: 'Framework agreements with banks, leasing companies and insurance institutions.',
    cap_phase2_title: 'Advisory — Consulting',
    cap_phase2_desc: 'Project finance advisory, financial modeling and risk management.',
    cap_phase3_title: 'Fund — Investment Fund',
    cap_phase3_desc: 'Project-based platform with real estate investment funds and foreign investor participation.',
    cap_vcard_box_title: 'Corporate vCard Contact Cards for Applications',
    cap_vcard_box_desc: 'You can reach our executives directly for project financing, leasing or investment advisory applications.',
    
    tech_t1_title: 'Digital Progress Payments',
    tech_t1_i1: 'Instant & transparent progress payment approval infrastructure',
    tech_t1_i2: 'Subcontractor & material process automation',
    tech_t1_i3: 'Financial approval & payments with zero error',
    tech_t2_title: 'Artificial Intelligence',
    tech_t2_i1: 'Construction site efficiency analysis via machine learning',
    tech_t2_i2: 'Predicting HSE risks and cost overruns',
    tech_t2_i3: 'AI-supported autonomous data reporting',
    tech_t3_title: 'BIM Integration',
    tech_t3_i1: '5D BIM digital twin model integration',
    tech_t3_i2: 'Seamless data management throughout building lifecycle',
    tech_t3_i3: 'LOD 400 construction detail coordination',
    tech_t4_title: 'Yakın Platform',
    tech_t4_i1: 'Engineering, procurement & field on a single screen',
    tech_t4_i2: 'Live mobile tracking & real-time telemetry',
    tech_t4_i3: 'IoT sensor and cloud system integration',
    tech_phase1_title: 'Today — SaaS & Mobile Field Tracking',
    tech_phase1_desc: 'Real-time field, procurement and engineering data integration via Yakın Platform.',
    tech_phase2_title: 'AI & BIM Integration — 5D Digital Twin',
    tech_phase2_desc: 'AI predictive analytics, automated clash detection and LOD 400 BIM management.',
    tech_phase3_title: 'Autonomous Site & IoT — Infrastructure of the Future',
    tech_phase3_desc: 'IoT sensors, live telemetry and autonomous occupational safety management ecosystem.',
    tech_vcard_box_title: 'Corporate vCard Contact Cards for Applications',
    tech_vcard_box_desc: 'Reach our executives directly for technology solutions, BIM 5D integration, or Yakın Platform SaaS demo requests.',
    
    cluster_iot_label: 'IOT & AUTOMATION SYSTEMS',
    tag_references: 'REFERENCES',
    energy_ref_subtitle: 'Our completed renewable energy, storage, smart home automation and data center solutions.',
    portfolio_subtitle: 'Click on images to inspect full details of all our completed projects.',
    btn_vcard_inspect: 'vCard & View Details',
  }
};

function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) { if (t[key].includes("<")) el.innerHTML = t[key]; else el.textContent = t[key]; }
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
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.reveal').forEach(child => child.classList.add('visible'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });

  reveals.forEach(el => observer.observe(el));

  const checkVisibility = () => {
    reveals.forEach(el => {
      if (!el.classList.contains('visible')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          el.classList.add('visible');
          el.querySelectorAll('.reveal').forEach(child => child.classList.add('visible'));
        }
      }
    });
  };

  window.addEventListener('scroll', checkVisibility, { passive: true });
  window.addEventListener('resize', checkVisibility, { passive: true });
  setTimeout(checkVisibility, 200);
  setTimeout(checkVisibility, 800);
}

// ── Service Details Modal ──────────────────────────────────────────────────
const SERVICES_DATA = {
  c_s1: {
    badge: 'MISSION CRITICAL',
    title: 'Veri Merkezi İnşaatı (Tier III & Tier IV)',
    cover: 'assets/images/data_center_construction_1785092614608.png',
    desc: 'Büyük ölçekli veri merkezlerinde statik taşıyıcı sistemler, iklimlendirme ve yüksek güvenlikli fiziki bina taahhüdü.<br>Kesintisiz enerji mimarisi, yangın izolasyonu ve uluslararası uptime sertifikasyonlarına tam uyumlu inşaat çözümleri.',
    specs: [
      'Tier III / Tier IV Uptime Institute Sertifikasyon Hizaması (Çözüm ve Hizmetler : <br>Tier III ve Tier IV uluslararası standartlarda %99.99 erişilebilirlik hedefli statik ve mekanik inşaat taahhüdü.<br>Tasarım (TCDD) ve Tesis (FCCD) sertifikasyonlarına tam uyumlu mission-critical veri merkezi yapı çözümleri.)',
      'Faraday Kafesi ve Elektromanyetik Kalkanlama (EMP Protection) (Üretici & Ürün Çözümleri : <br>ETS-Lindgren, Soliani EMC, Albatross Projects elektromanyetik kalkanlama ve sönümleme kafes üniteleri.<br>Askeri ve kurumsal veri merkezlerinde elektromanyetik dinleme ve EMP dış müdahalelere karşı tam koruma.)',
      'Hassas İklimlendirme (CRAC/CRAH) & Yükseltilmiş Taban Sistemleri (Üretici & Ürün Çözümleri : <br>Lindner, Tate Access Floors, Mero-TSK antistatik yükseltilmiş taban ve yangına dayanıklı kaset paneller.<br>Hassas koridor iklimlendirme kanalları, soğuk/sıcak hava sirkülasyon odaları ve ağır yük zemin taahhüdü.)',
      'BMS & SCADA Entegre Fiziksel Güvenlik Altyapısı (Üretici & Ürün Çözümleri : <br>Schneider EcoStruxure, Honeywell Enterprise Buildings, Johnson Controls Metasys bina otomasyonları.<br>Biyometrik geçiş kontrol, CCTV çevre güvenlik duvarı, gazlı yangın söndürme ve sismik izolatörlü bina yapısı.)'
    ]
  },
  c_s2: {
    badge: 'INDUSTRIAL EPC',
    title: 'Ağır Sanayi Tesisleri ve Fabrikalar',
    cover: 'assets/images/heavy_industry_clean_1785012805596.png',
    desc: 'Ağır yük taşıyıcı betonarme/çelik strüktürler ve yüksek mukavemetli endüstriyel epoksi zemin kaplama uygulamaları.<br>Endüstriyel üretim hatları, yüksek vinç kapasiteli fabrika binaları ve ağır altyapı mühendislik imalatları.',
    specs: [
      'Büyük Açıklıklı Endüstriyel Çelik Çatı ve Kolon Tasarımı (Çözüm ve Hizmetler : <br>Geniş açıklıklı endüstriyel çelik konstrüksiyon karkas, çatı makası ve ağır kreyn vinç yolları üretimi.<br>Yüksek rüzgar ve sismik yük dayanımlı fabrika taşıyıcı sistemlerinin fabrikasyon imalatı ve sahada montajı.)',
      'Ağır Ekipman Temelleri ve Titreşim Sönümleme Sistemleri (Çözüm ve Hizmetler : <br>Sanayi döküm presleri ve ağır makineler için kütlesel betonarme radye temeller ve anti-vibrasyon yatakları.<br>Darbe ve titreşim sönümleyici elastomerik mesnet kurulumları ile makine hassasiyetinin korunması.)',
      'Endüstriyel Atık Su Arıtma & Gaz Tahliye Boru Hatları (Çözüm ve Hizmetler : <br>Ağır kimyasal ve endüstriyel atık su nötralizasyon havuzları, paslanmaz çelik baca ve gaz tahliye kanalları.<br>Çevre mevzuatlarına tam uyumlu arıtma tesisi inşaatı, borulama ve yüksek izolasyonlu tank yapıları.)',
      'Uluslararası İş Güvenliği & ISO 9001 / 14001 Standartları (Çözüm ve Hizmetler : <br>Sıfır kaza hedefli OHSAS / ISO 45001 iş sağlığı ve güvenliği yönetim sistemleri eşliğinde saha taahhüdü.<br>ISO 9001 kalite ve ISO 14001 çevre yönetim sertifikalı inşaat teknikleri ile sürdürülebilir tesis teslimi.)'
    ]
  },
  c_s3: {
    badge: 'LUXURY RESIDENTIAL',
    title: 'Konut & Yaşam Projeleri',
    cover: 'assets/images/residential_luxury_project_1785010053703.png',
    desc: 'Sürdürülebilir yeşil bina standartlarında karma konut, sosyal tesis ve yüksek katlı rezidans mimari projeleri.<br>Akıllı bina otomasyonu, yüksek enerji verimliliği ve depreme dayanıklı tünel kalıp/kaset döşeme taşıyıcı sistemler.',
    specs: [
      'A+ Enerji Kimlik Sertifikalı Çevreci Binalar (Çözüm ve Hizmetler : <br>LEED Gold / Platinum ve BREEAM standartlarına uyumlu yüksek ısı yalıtımlı bina kabuğu tasarımları.<br>Güneş paneli entegreli ortak alan aydınlatmaları, gri su geri kazanım sistemleri ve A+ enerji kimlik belgelendirmesi.)',
      'Akıllı Bina Otomasyonu (BMS) ve Merkezi İklimlendirme (Üretici & Ürün Çözümleri : <br>KNX / BACnet tabanlı akıllı ev otomasyon panelleri, Daikin VRV / Mitsubishi VRF iklimlendirme üniteleri.<br>Mobil uygulama üzerinden aydınlatma, iklimlendirme, perde/panjur ve güvenlik sensörlerinin tek merkezden yönetimi.)',
      'Ses & Isı İzolasyonunda Üst Seviye Konfor Detayları (Üretici & Ürün Çözümleri : <br>Knauf Akustik, Izocam Taşyünü, Schüco 3-camlı alüminyum doğrama ve lamine akustik cam sistemleri.<br>Katlar arası yüzer şap ve daire bölme duvarlarında yüksek desibel ses yalıtımı ile lüks yaşam konforu.)',
      'Sosyal Tesisler, Kapalı Otopark ve Yeşil Alan Mimarisi (Çözüm ve Hizmetler : <br>Kapalı yüzme havuzları, fitness salonları, peyzaj düzenlemeleri ve elektrikli araç şarjlı otoparklar.<br>7/24 güvenlik kamerası entegreli, geniş peyzaj alanlarına sahip modern karma yaşam kompleksi inşası.)'
    ]
  },
  c_s4: {
    badge: '5D BIM & SEISMIC',
    title: 'Yapı Mühendisliği, Deprem & BIM Tasarımı',
    cover: 'assets/images/civil_engineering_bim_1785010076530.png',
    desc: '3D çakışma (clash) tespiti, statik mukavemet hesapları ve uluslararası EUROCODE / IBC bina yönetmelik uyumu.<br>BIM tabanlı metraj, hakediş ve zaman planlaması ile şantiye imalatlarının dijital ikiz üzerinden canlı takibi.',
    specs: [
      '5D BIM Modeli ile Çakışma Analizi ve Maliyet Yönetimi (Üretici & Ürün Çözümleri : <br>Autodesk Revit 5D BIM, Navisworks Manage, Trimble Tekla Structures projelendirme ve çakışma araçları.<br>Mimari, statik ve MEP disiplinleri arasındaki 3D çakışmaların (clash) şantiye öncesinde sıfırlanması ve metraj hesabı.)',
      'Sismik İzolatör ve Damperli Yapı Tasarımları (Üretici & Ürün Çözümleri : <br>Maurer Magnetic, Mageba, EPS (Earthquake Protection Systems) kurşun çekirdekli kauçuk sismik izolatörler.<br>Deprem anında yapının üst katlarına geçen sismik ivmeyi %80 oranında sönümleyen izolatörlü bina mühendisliği.)',
      'Non-Linear Zaman Tanım Alanında Deprem Analizleri (Üretici & Ürün Çözümleri : <br>SAP2000, ETAP, CSI Bridge ve Perform-3D doğrusal olmayan (non-linear) statik ve dinamik analiz yazılımları.<br>Gelecekteki olası büyüklükteki deprem senaryolarına göre performans bazlı tasarım ve güçlendirme raporlaması.)',
      'Mevzuat Uyumlu Statik Raporlama ve Proje Onay Süreçleri (Çözüm ve Hizmetler : <br>2018 Türkiye Bina Deprem Yönetmeliği (TBDY) ve EUROCODE uluslararası statik yönetmelik uyumu.<br>Üniversite onaylı statik raporlar, bağımsız denetim onayları ve ruhsat projelerinin eksiksiz hazırlanması.)'
    ]
  },
  c_s5: {
    badge: 'INFRASTRUCTURE',
    title: 'Havalimanı & Ulaşım Altyapısı',
    cover: 'assets/images/construction_hero_1784577666966.png',
    desc: 'Yüksek yolcu kapasiteli apron, pist, tünel, viyadük ve raylı sistem metro istasyon yapılarında taahhüt hizmetleri.<br>Uluslararası havacılık ve ulaştırma şartnamelerine tam uyumlu ağır mühendislik altyapı imalatları.',
    specs: [
      'ICAO & FAA Standartlarında Terminal ve Apron İnşaatı (Çözüm ve Hizmetler : <br>Uluslararası Sivil Havacılık Örgütü (ICAO) ve FAA standartlarında yolcu terminal binaları inşası.<br>Geniş açıklıklı çelik çatı terminalleri, körük bağlantı yapıları ve apron uçak park sahaları taahhüdü.)',
      'Özel Yüksek Dayanımlı Asfalt ve Beton Pist Kaplamaları (Çözüm ve Hizmetler : <br>Ağır gövdeli kargo ve yolcu uçaklarının iniş kalkışına uygun modifiye polimer asfalt ve ağır beton pist kaplaması.<br>Pist aydınlatma armatür kanalları, drenaj kanalları ve yüksek sürtünme katsayılı pist kaplama üretimi.)',
      'Yolcu Bagaj Entegrasyon (BHS) ve Güvenlik Altyapıları (Üretici & Ürün Çözümleri : <br>Vanderlande, Siemens Logistics BHS bagaj taşıma, Smiths Detection X-ray güvenlik tarayıcıları.<br>Saatlik yüksek bagaj tasnif kapasiteli konveyör hatları ve çok seviyeli patlayıcı tespit güvenlik entegrasyonu.)',
      'Kesintisiz Hava Trafik Kontrol Kule Yapıları (Çözüm ve Hizmetler : <br>Yüksek kule yapılarında rüzgar ve sismik konfor sağlayan mimari mühendislik tasarımı.<br>Radar, haberleşme ve kule kontrol konsolları için kesintisiz yedekli enerji ve iklimlendirme altyapısı.)'
    ]
  },
  c_s6: {
    badge: 'RETROFITTING',
    title: 'Kentsel Dönüşüm & Yapı Güçlendirme',
    cover: 'assets/images/gallery_seismic_retrofitting_1785092947617.png',
    desc: 'Kentsel dönüşüm projelerinde hak sahipleri yönetimi, resmi ruhsatlandırma ve sıfırdan güvenli bina inşası.<br>Mevcut beton/donatı analizleri, karbon elyaf (CFRP) sargı ve betonarme perde ilaveleri ile binaların güçlendirilmesi.',
    specs: [
      'Karbon Fiber (CFRP) ve Çelik Manto ile Deprem Güçlendirme (Üretici & Ürün Çözümleri : <br>SikaWrap CFRP karbon elyaf kumaşlar, BASF MasterBrace polimer matrisli güçlendirme kompozitleri.<br>Kolon ve kirişlerin karbon fiber sargı ve çelik levha mantolama ile sünekliğinin ve taşıma kapasitesinin artırılması.)',
      'Karot ve Sismik Testler ile Binasal Risk Analizi Raporlama (Çözüm ve Hizmetler : <br>Tahribatsız ultrasonik testler, karot numune beton basınç deneyleri ve donatı korozyon tespiti.<br>Çevre ve Şehircilik Bakanlığı lisanslı riskli bina tespit raporlarının hazırlanması ve kentsel dönüşüm süreci.)',
      'Hukuki ve Teknik Kentsel Dönüşüm Danışmanlığı (Çözüm ve Hizmetler : <br>6306 sayılı kanun kapsamında kat malikleri ve hak sahipleri sözleşme yönetimi ve noter süreçleri.<br>Resmi tahliye, yıkım ruhsatı, proje onayları ve devlet kira yardımı başvurularının uçtan uca yürütülmesi.)',
      'Sıfır Hata ile Bina Yenileme ve Projelendirme (Çözüm ve Hizmetler : <br>Eski riskli binaların güvenli şekilde yıkılması ve yerine depreme tam dayanıklı yeni binaların inşası.<br>Zemin etüdü, kazık/temel altı yalıtım ve yüksek kaliteli malzeme kullanımı ile anahtar teslim ev teslimatı.)'
    ]
  },
  // Enerji Küme A
  e_s1: {
    badge: 'SOLAR & BIPV',
    title: 'Güneş Enerjisi Sistemleri (GES) & BIPV',
    cover: 'assets/images/solar_rooftop_epc_user2.jpg',
    desc: 'Arazi ve çatı tipi GES EPC projeleri ile dış cephe fotovoltaik cephe kaplama ve akıllı fotovoltaik cam sistemleri (BIPV) entegrasyonu.',
    specs: [
      'BIPV (Building Integrated Photovoltaics) Cephe ve Cam Entegrasyonu (Üretici & Ürün Çözümleri : <br>Onyx Solar BIPV cam paneller, Schüco fotovoltaik giydirme cephe sistemleri, SunStyle Roof entegrasyonu.<br>Bina kabuğunu aktif enerji üretimine dönüştüren yarı saydam / opak BIPV panel kurulum mühendisliği.)',
      'Endüstriyel Çatı ve Arazi Tipi GES Anahtar Teslim EPC (Üretici & Ürün Çözümleri : <br>Schletter, K2 Systems ve Clenergy güneş panel taşıyıcı konstrüksiyon montaj sistemleri.<br>Mühendislik (E), Tedarik (P) ve İnşaat (C) tüm süreçlerini kapsayan anahtar teslim EPC taahhüdü.)',
      'Yüksek Verimli Monokristal & Bifacial Panel Teknolojileri (Üretici & Ürün Çözümleri : <br>LONGi Hi-MO 7 (N-Type HPBC), JA Solar DeepBlue 4.0 Pro, Trina Vertex S+ bifacial TOPCon paneller.<br>Çift taraflı ışık yakalayan yüksek verimli N-Type TOPCon / HJT teknolojisi ile maksimum kWh üretimi.)',
      'Şebeke Bağlantılı (On-Grid) & Hibrit İnvertör Sistemleri (Üretici & Ürün Çözümleri : <br>Huawei SUN2000 Smart String, Sungrow SG250HX, Fronius Tauro ve SMA Sunny Tripower invertörler.<br>BESS ve EV şarj entegreli hibrit invertör çözümleri ile uzaktan SCADA enerji yönetim otomasyonu.)'
    ],
    slides: [
      {
        title: 'BIPV (Building Integrated Photovoltaics) Cephe ve Cam Entegrasyonu',
        desc: 'Binaların dış cephelerine, giydirme cam sistemlerine ve çatı pencerelerine estetik fotovoltaik panel entegrasyonu. Yapı kabuğunu aktif elektrik üreten çevreci bir enerji kaynağına dönüştürür.',
        image: 'assets/images/solar_bipv_facade_user.jpg'
      },
      {
        title: 'Endüstriyel Çatı ve Arazi Tipi GES Anahtar Teslim EPC',
        desc: 'Endüstriyel tesisler, fabrikalar ve yüksek kapasiteli arazi GES projeleri için mühendislik (Engineering), tedarik (Procurement) ve inşaat (Construction) süreçlerinin anahtar teslim yürütülmesi.',
        image: 'assets/images/solar_rooftop_epc_user2.jpg'
      },
      {
        title: 'Yüksek Verimli Monokristal & Bifacial Panel Teknolojileri',
        desc: 'Ön ve arka yüzeyden çift taraflı ışık yakalama kabiliyetine sahip N-Type TOPCon / HJT Bifacial monokristal paneller ile alan başına maksimum kWh enerji üretimi.',
        image: 'assets/images/solar_bifacial_panels_user.jpg'
      },
      {
        title: 'Şebeke Bağlantılı (On-Grid) & Hibrit İnvertör Sistemleri',
        desc: 'Merkezi ve dizi tipi yüksek verimli invertör sistemleri, enerji depolama uyumlu hibrit invertör çözümleri, akıllı ev otomasyonu, EV şarj ve SCADA uzaktan izleme entegrasyonu.',
        image: 'assets/images/solar_inverter_system_user.jpg'
      }
    ]
  },
  e_s2: {
    badge: 'WIND POWER',
    title: 'Rüzgar Enerjisi Santrali (RES / WPP) & Rüzgar Çiftliği',
    cover: 'assets/images/wind_farm_cover_user.jpg',
    desc: 'Rüzgar santralleri (WPP) ve rüzgar çiftliği (WF) kurulum, türbin montajı, yüksek gerilim şebeke bağlantıları ve saha mühendisliği.',
    specs: [
      'Türbin Altyapı, Temel ve Montaj Mühendisliği (Üretici & Ürün Çözümleri : <br>Vestas V150/V162, Siemens Gamesa SG 5.0-145, GE Vernova 6.0 MW karada rüzgar türbinleri.<br>Ağır betonarme radye temel, kule bölüm montajı ve dev vinç operasyonu proje mühendisliği.)',
      'Rüzgar Sahası Ölçüm, Verim ve Fizibilite Raporlaması (Üretici & Ürün Çözümleri : <br>NRG Systems Symphonie Plus, Second Wind Nomad anemometre direk ve sensör sistemleri.<br>WAsP / WindPRO simülasyonları ile mikro-lokasyon rüzgar haritası ve P50/P90 fizibilite raporu.)',
      'Orta / Yüksek Gerilim Şebeke Bağlantı Altyapısı (Üretici & Ürün Çözümleri : <br>Hitachi Energy / ABB trafo, Siemens Energy şalt hücreleri ve Prysmian 34.5 kV yeraltı kablolama.<br>Türbin içi trafo merkezleri, 34.5/154/400 kV şalt sahası inşası ve TEİAŞ şebeke entegrasyonu.)',
      'Periyodik Bakım, Onarım ve SCADA Entegrasyonu (Üretici & Ürün Çözümleri : <br>Bachmann M1 SCADA, GE eTruck CMS, Mita-Teknik AgrosMet rüzgar türbin izleme sistemleri.<br>Dişli kutusu/yağ analizi, kanat muayenesi (drone), kestirimci bakım ve 7/24 arıza yönetimi.)'
    ],
    slides: [
      {
        title: 'Türbin Altyapı, Temel ve Montaj Mühendisliği',
        desc: 'Ağır betonarme dairesel radye türbin temeli dökümü, ankraj sepeti montajı, zemin iyileştirme ve dev vinçler ile kule/kanat montaj mühendisliği.',
        image: 'assets/images/wind_foundation_user.jpg'
      },
      {
        title: 'Rüzgar Sahası Ölçüm, Verim ve Fizibilite Raporlaması',
        desc: 'Mikro-lokasyon rüzgar haritası analizi, anemometre ölçüm direği verileri, WAsP / WindPRO simülasyonları ve yıllık P50/P90 üretim fizibilite raporları.',
        image: 'assets/images/wind_measurement_user.jpg'
      },
      {
        title: 'Orta / Yüksek Gerilim Şebeke Bağlantı Altyapısı',
        desc: 'Türbin içi trafo merkezleri, 34.5 kV / 154 kV / 400 kV şalt sahası inşası, güç transformatörleri, yeraltı OG kablolama ve TEİAŞ şebeke entegrasyonu.',
        image: 'assets/images/wind_substation_user.jpg'
      },
      {
        title: 'Periyodik Bakım, Onarım ve SCADA Entegrasyonu',
        desc: '7/24 merkezi SCADA izleme ve haberleşme odası, kestirimci bakım, dişli kutusu/kanat kontrolleri ve canlı türbin verimlilik analizi.',
        image: 'assets/images/wind_scada_user.jpg'
      }
    ]
  },
  e_s3: {
    badge: 'BESS & HYBRID',
    title: 'Batarya Enerji Depolama (BESS) & Hibrit Sistemler',
    cover: 'assets/images/bess_main_cover_user.jpg',
    desc: 'BESS (Battery Energy Storage System), HES/HRES hibrit sistemler, LFP batarya hücreleri, BMS ve çift yönlü PCS güç dönüştürücüler.',
    specs: [
      'BESS Konteyner Tipi Depolama Çözümleri (LFP / LiFePO4) (Üretici & Ürün Çözümleri : <br>CATL EnerC, BYD Battery Box Premium HVS, Tesla Megapack 2 ve Sungrow PowerTitan 2.0 BESS.<br>LFP kimyası, 20+ yıl ömür ve %90+ tur verimliliği ile konteyner tipi sahaya taşınabilir depolama.)',
      'BMS (Battery Management System) ve Hücre Dengeleme (Üretici & Ürün Çözümleri : <br>Orion BMS 2, Elithion Lithiumate Pro, CATL entegre hücre-modül-raf BMS hiyerarşik sistemler.<br>SOC/SOH hesaplama, aktif/pasif hücre dengeleme, termal yönetim ve acil devre dışı bırakma.)',
      'PCS (Power Conversion System) AC/DC Çift Yönlü Çevirici Entegrasyonu (Üretici & Ürün Çözümleri : <br>Sungrow SC2500UD-MV, Huawei SmartPCS1500KW-MV, ABB PVS-275 BESS PCS üniteleri.<br>Şarj/deşarj döngüsünü yöneten %98+ dönüştürme verimli çift yönlü AC/DC güç dönüştürücüler.)',
      'Şebeke Yük Dengeleme ve Peak Shaving Yazılım Otomasyonu (Üretici & Ürün Çözümleri : <br>Power Innovations BESS EMS, Fluence MOSAIC, Schneider EcoStruxure BESS enerji yönetim yazılımları.<br>Peak Shaving, frekans düzenleme (FCR/FFR) ve arbitraj uygulamaları için akıllı şebeke otomasyon.)'
    ],
    slides: [
      {
        title: 'BESS Konteyner Tipi Depolama Çözümleri (LFP / LiFePO4)',
        desc: 'Arazi GES sahalarına entegre edilmiş büyük ölçekli hibrit BESS konteyner depolama sistemi. Yüksek gerilim şalt sahası ve rüzgar tribünleri ile tam entegre hibrit enerji çiftliği.',
        image: 'assets/images/bess_main_cover_user.jpg'
      },
      {
        title: 'BESS Mimari: Rack, LFP Hücre, Modül & BMS Sistemi',
        desc: 'BESS konteyner içi sistem mimarisi: Rack, LFP Cell, Modül, DC Panel, Yangın Söndürme Sistemi, Modül BMS (BMU), Rack BMS (BCMU), Sistem BMS (BAMS) ve Battery Protection Unit (BPU) bileşenleri.',
        image: 'assets/images/bess_container_architecture_user.jpg'
      },
      {
        title: 'BMS (Battery Management System) ve Hücre Dengeleme',
        desc: 'Yüksek gerilim RBMS kartı; T-CAN/T-485 haberleşme arayüzü, LAN portu, AC giriş, kesici koruma, P+/P- UPS/invertör bağlantısı, BMU-OUT, DC Start ve COM-IN/COM-OUT iletişim portları ile kapsamlı hücre yönetim ve dengeleme sistemi.',
        image: 'assets/images/bess_bms_interface_user.jpg'
      },
      {
        title: 'PCS (Power Conversion System) AC/DC Çift Yönlü Çevirici Entegrasyonu',
        desc: 'Güneş paneli ve rüzgar türbini ile bütünleşik açık alanlara kurulu PCS konteyner sistemi; şarj/deşarj döngüsünü yöneten çift yönlü AC/DC çevirici ve BESS entegrasyonu.',
        image: 'assets/images/bess_pcs_container_user.jpg'
      },
      {
        title: 'Şebeke Yük Dengeleme ve Peak Shaving Yazılım Otomasyonu',
        desc: 'PowerON BESS kontrol panosu; Peak Shaving grafiksel gösterimi, yük dengeleme eğrileri, akıllı şebeke otomasyon yazılımı ve endüstriyel pano entegrasyonu ile anlık talep yönetimi.',
        image: 'assets/images/bess_peak_shaving_user.jpg'
      }
    ]
  },
  e_em1: {
    badge: 'MEP & CONTRACTING',
    title: 'Elektrik & Mekanik Taahhüt Hizmetleri',
    cover: 'assets/images/mep_cover_electrician_user.jpg',
    desc: 'Endüstriyel üretim tesisleri, ticari binalar, hastaneler ve veri merkezleri için anahtar teslim MEP (Mekanik, Elektrik, Tesisat) taahhüt ve uygulama çözümleri.',
    specs: [
      'Anahtar Teslim Elektrik & Mekanik Tesisat Taahhüdü (Çözüm ve Hizmetler : <br>Konsept tasarımdan saha montajına kadar uçtan uca elektrik ve mekanik altyapı kurulumu.<br>Schneider Electric, Siemens, Legrand elektrik panoları ve Prysmian/Kablo kablolama sistemleri.)',
      'HVAC VRF / VAV İklimlendirme ve İleri Havalandırma (Üretici & Ürün Çözümleri : <br>Daikin VRV, Mitsubishi Electric City Multi, Systemair havalandırma santralleri entegrasyonu.<br>Hassas sıcaklık ve nem kontrollü iklimlendirme ile yüksek enerji tasarrufu çözümleri.)',
      'Sıhhi Tesisat, Yangın Koruma ve Borulama Altyapısı (Üretici & Ürün Çözümleri : <br>Grundfos ve Wilo yangın pompaları, Viking/Tyco sprinkler söndürme başlıkları altyapısı.<br>GF Piping, GF Victaulic endüstriyel boru hatları ve kat bazlı ıslak/kuru yangın tesisatı.)',
      'Projelendirme, Süreç Yönetimi ve Devreye Alma (Commissioning) (Çözüm ve Hizmetler : <br>Uluslararası ASHRAE ve CIBSE standartlarına uygun MEP 3D BIM mühendislik tasarımları.<br>TAB (Test, Ayar, Dengeleme) ve geçici/kesin kabul resmi belgelendirme süreç yönetimi.)'
    ],
    slides: [
      {
        title: 'Elektrik & Mekanik Taahhüt Hizmetleri',
        desc: 'Endüstriyel üretim tesisleri, ticari binalar ve veri merkezleri için anahtar teslim MEP taahhüt, güç panoları ve sahada bağlantı çalışmaları.',
        image: 'assets/images/mep_cover_electrician_user.jpg'
      },
      {
        title: '1. Anahtar Teslim Elektrik & Mekanik Tesisat Taahhüdü (Çözüm ve Hizmetler : <br>1. Konsept tasarımdan saha montajına kadar uçtan uca elektrik ve mekanik altyapı kurulumu.<br>2. Schneider Electric, Siemens, Legrand elektrik panoları ve Prysmian/Kablo kablolama sistemleri.)',
        desc: 'Projenin konsept tasarımından fiziksel uygulamaya kadar elektrik tesisat planı, malzeme seçimi ve anahtar teslim uygulama sürecinin tam yönetimi.',
        image: 'assets/images/mep_anahtar_teslim_user.png'
      },
      {
        title: '2. HVAC VRF / VAV İklimlendirme ve İleri Havalandırma (Üretici & Ürün Çözümleri : <br>1. Daikin VRV, Mitsubishi Electric City Multi, Systemair havalandırma santralleri entegrasyonu.<br>2. Hassas sıcaklık ve nem kontrollü iklimlendirme ile yüksek enerji tasarrufu çözümleri.)',
        desc: 'VRF ve VAV sistemleri ile bina katlı çok bölgeli enerji verimli iklimlendirme ve taze hava çözümleri.',
        image: 'assets/images/mep_hvac_vrf_user.jpg'
      },
      {
        title: '3. Sıhhi Tesisat, Yangın Koruma ve Borulama Altyapısı (Üretici & Ürün Çözümleri : <br>1. Grundfos ve Wilo yangın pompaları, Viking/Tyco sprinkler söndürme başlıkları altyapısı.<br>2. GF Piping, GF Victaulic endüstriyel boru hatları ve kat bazlı ıslak/kuru yangın tesisatı.)',
        desc: 'Havalandırma kanalları, yangın söndürme sistemleri, kuru/ıslak sprinkler, sıhhi tesisat ve endüstriyel borulama altyapısı.',
        image: 'assets/images/mep_sihhi_yangin_user.jpg'
      },
      {
        title: '4. Projelendirme, Süreç Yönetimi ve Devreye Alma (Commissioning) (Çözüm ve Hizmetler : <br>1. Uluslararası ASHRAE ve CIBSE standartlarına uygun MEP 3D BIM mühendislik tasarımları.<br>2. TAB (Test, Ayar, Dengeleme) ve geçici/kesin kabul resmi belgelendirme süreç yönetimi.)',
        desc: 'MEP proje mühendisliği, saha koordinasyonu, test & devreye alma (commissioning) süreç yönetimi ve resmi kabul belgelendirme hizmetleri.',
        image: 'assets/images/mep_commissioning_user.png'
      }
    ]
  },
  e_em2: {
    badge: 'LOW VOLTAGE / ELV',
    title: 'Zayıf Akım Çözümleri & Akıllı Bina Otomasyonu',
    cover: 'assets/images/elv_cover_network_user.jpg',
    desc: 'Bina ve tesis emniyetini üst düzeye çıkaran CCTV siber güvenlik kameraları, yangın algılama, geçiş kontrol (Access Control), IP anons ve yapısal fiber altyapı.',
    specs: [
      'IP CCTV Güvenlik Kamera ve Video Analiz Sistemleri (Üretici & Ürün Çözümleri : <br>Axis Communications, Hikvision Pro Series, Dahua WizMind IP kamera ve NVR üniteleri.<br>Yapay zeka destekli plaka tanıma, yüz algılama, çit ihlal analizi ve 7/24 izleme merkezi.)',
      'Adresli Yangın Algılama ve Erken Uyarı Tesisatı (Üretici & Ürün Çözümleri : <br>Honeywell Notifier, Bosch Building Technologies, Siemens Cerberus PRO yangın panelleri.<br>Adresli optik duman dedektörleri, flanşlı sirenler ve kat bazlı acil durum yönlendirme.)',
      'Geçiş Kontrol (Access Control), Kartlı & Biyometrik Geçiş (Üretici & Ürün Çözümleri : <br>HID Global, Suprema BioEntry, Nedap Access Control biyometrik ve RFID kartlı okuyucular.<br>Turnike entegrasyonu, ziyaretçi kayıt yönetimi ve merkezi yetki matrisi yazılımları.)',
      'Yapısal Fiber Kablolama ve Veri Merkezi Network Altyapısı (Üretici & Ürün Çözümleri : <br>CommScope AMPNetconnect, Corning Fiber, Legrand LCS3 Cat6A / Cat8 ve OM4/OM5 fiber kablolar.<br>Yüksek yoğunluklu patch paneller, OTDR fiber testleri ve profesyonel kablo düzenleme.)'
    ],
    slides: [
      {
        title: '1. IP CCTV Güvenlik Kamera ve Video Analiz Sistemleri (Üretici & Ürün Çözümleri : <br>1. Axis Communications, Hikvision Pro Series, Dahua WizMind IP kamera ve NVR üniteleri.<br>2. Yapay zeka destekli plaka tanıma, yüz algılama, çit ihlal analizi ve 7/24 izleme merkezi.)',
        desc: 'Çok ekranlı güvenlik izleme merkezi, IP CCTV kamera sistemleri, yapay zeka destekli video analiz, hareket algılama ve merkezi kayıt yönetimi (NVR/DVR).',
        image: 'assets/images/elv_cctv_monitoring_user.jpg'
      },
      {
        title: '2. Adresli Yangın Algılama ve Erken Uyarı Tesisatı (Üretici & Ürün Çözümleri : <br>1. Honeywell Notifier, Bosch Building Technologies, Siemens Cerberus PRO yangın panelleri.<br>2. Adresli optik duman dedektörleri, flanşlı sirenler ve kat bazlı acil durum yönlendirme.)',
        desc: 'Duman dedektörleri, adresli yangın alarm paneli, kırmızı yangın sprinkler boru hatları, yangın tüpleri ve kat bazlı erken uyarı sistemi kurulumu.',
        image: 'assets/images/elv_fire_detection_user.png'
      },
      {
        title: '3. Geçiş Kontrol (Access Control), Kartlı & Biyometrik Geçiş (Üretici & Ürün Çözümleri : <br>1. HID Global, Suprema BioEntry, Nedap Access Control biyometrik ve RFID kartlı okuyucular.<br>2. Turnike entegrasyonu, ziyaretçi kayıt yönetimi ve merkezi yetki matrisi yazılımları.)',
        desc: 'Yüz tanıma teknolojisi, biyometrik kimlik doğrulama, kartlı geçiş sistemleri ve entegre erişim yetkilendirme yönetimi ile tesislerin fiziksel güvenliğinin sağlanması.',
        image: 'assets/images/elv_biometric_access_user.png'
      },
      {
        title: '4. Yapısal Fiber Kablolama ve Veri Merkezi Network Altyapısı (Üretici & Ürün Çözümleri : <br>1. CommScope AMPNetconnect, Corning Fiber, Legrand LCS3 Cat6A / Cat8 ve OM4/OM5 fiber kablolar.<br>2. Yüksek yoğunluklu patch paneller, OTDR fiber testleri ve profesyonel kablo düzenleme.)',
        desc: 'Multimodal ve singlemode fiber optik kablolama, patch panel sonlandırma, yüksek yoğunluklu veri merkezi kablo yönetimi ve yapısal kablolama altyapısı.',
        image: 'assets/images/elv_cover_network_user.jpg'
      }
    ]
  },
  e_em3: {
    badge: 'LV SYSTEMS / AG',
    title: 'Alçak Gerilim Sistemleri (AG) & Güç Dağıtımı',
    cover: 'assets/images/ag_cover_panel_team_user.png',
    desc: 'AG ana dağıtım panoları (ADP), tali dağıtım panoları, MCC kumanda merkezleri, Otomatik Reaktif Güç Kompanzasyonu ve Kesintisiz Güç Kaynağı (UPS) kurulumları.',
    specs: [
      'AG Ana Dağıtım ve Tali Dağıtım Panoları (Form 4b Standardı) (Üretici & Ürün Çözümleri : <br>Schneider Electric Okken/Prisma, ABB Emax 2 / TriLine, Siemens SIVACON S8 Form 4b panolar.<br>Kompakt şalterler, açık tip şalterler (ACB) ve haberleşmeli enerji analizörleri ile güvenli dağıtım.)',
      'Motor Kontrol Merkezleri (MCC) ve Sürücü Panoları (Üretici & Ürün Çözümleri : <br>ABB ACS880, Danfoss VLT AutomationDrive, Siemens SINAMICS frekans konvertör panoları.<br>PLC ve SCADA entegreli çekmeceli tipi MCC üniteleri ile motor koruma ve hız kontrolü.)',
      'Busbar Enerji Dağıtım Hatları ve Kablo Taşıma Sistemleri (Üretici & Ürün Çözümleri : <br>EAE Elektrik KX/KB Busbar, Legrand Zucchini, Schneider Canalis modüler busbar sistemleri.<br>Ağır hizmet tipi delikli kablo kanalları, merdiven kanallar ve yangına dayanıklı tava montajı.)',
      'Aktif / Pasif Harmonik Filtreli Kompanzasyon Panoları (Üretici & Ürün Çözümleri : <br>Schaffner, Janitza, Nokian Capacitors, Entes SVG aktif harmonik filtre panoları.<br>Reaktif güç kompanzasyonu, kondansatör kademe kontrolü ve güç kalitesi iyileştirme.)'
    ],
    slides: [
      {
        title: 'Alçak Gerilim Sistemleri (AG) & Güç Dağıtımı',
        desc: 'Endüstriyel tesislerde AG pano sırası önünde tablet ve ölçüm aleti ile denetim yapan iki mühendisten oluşan teknik ekip sahası.',
        image: 'assets/images/ag_cover_panel_team_user.png'
      },
      {
        title: 'AG Ana Dağıtım ve Tali Dağıtım Panoları (Form 4b Standardı)',
        desc: 'Form 4b standardında üretilmiş çok bölümlü AG ana dağıtım panoları, koruma röleleri, kompakt şalterleri ve dijital sayaçlarla tam donanımlı tesisat odası.',
        image: 'assets/images/ag_adp_panel_user.png'
      },
      {
        title: 'Motor Kontrol Merkezleri (MCC) ve Sürücü Panoları',
        desc: 'Endüstriyel MCC sürücü panoları, PLC bağlantılı frekans konvertörleri, klemens kutuları ve çok katlı kablo yönetimi ile entegre motor kontrol sistemi.',
        image: 'assets/images/ag_mcc_srucu_user.jpg'
      },
      {
        title: 'Busbar Enerji Dağıtım Hatları ve Kablo Taşıma Sistemleri',
        desc: 'Tavan montajlı kırmızı ve beyaz renkli busbar trunk hatları, modüler tap-off kutuları ve bina içi etkin kablo taşıma altyapısı.',
        image: 'assets/images/ag_busbar_user.png'
      },
      {
        title: 'Aktif / Pasif Harmonik Filtreli Kompanzasyon Panoları',
        desc: 'Aktif harmonik filtre ve reaktif güç kompanzasyonu entegre büyük ölçekli güç kalitesi kabinleri; endüstriyel üretim sahası teslim hazır depo görünümü.',
        image: 'assets/images/ag_kompanzasyon_user.png'
      }
    ]
  },
  e_em4: {
    badge: 'MV SYSTEMS / OG',
    title: 'Orta Gerilim Sistemleri (OG) & Şalt Tesisleri',
    cover: 'assets/images/og_cover_substation_user.jpg',
    desc: '36 kV Orta Gerilim hücresel şalt merkezleri, SF6 gazlı / hava yalıtımlı modüler hücreler, kuru ve yağlı tip trafo kurulumları ve OG şebeke entegrasyonu.',
    specs: [
      '36 kV OG Hücresel Şalt Tesisleri & Metal-Clad Hücreler (Üretici & Ürün Çözümleri : <br>Schneider Electric SM6 / RM6, Eaton Capitole, ABB UniGear / SafePlus modüler şalt hücreleri.<br>SF6 gaz yalıtımlı kesiciler, yük ayırıcıları ve vakumlu kesicili Metal-Clad hücresel şalt sahası.)',
      'Yağlı ve Kuru Tipi Dağıtım Trafoları (100 kVA - 10 MVA) (Üretici & Ürün Çözümleri : <br>ABB / Hitachi Energy Resibloc, Schneider Trihal, BEST Trafoları, Astor Kuru ve Yağlı Trafolar.<br>100 kVA - 10 MVA güç aralığında dökme reçineli kuru ve genleşme depolu/hermetik yağlı trafolar.)',
      'Mikroişlemcili Dijital Koruma Röleleri ve Testleri (Üretici & Ürün Çözümleri : <br>SEL (Schweitzer Engineering Labs), Schneider MiCOM / Sepam, ABB Relion koruma röleleri.<br>Omicron CMC 356 ikincil enjeksiyon test cihazı ile aşırı akım, toprak arıza ve selektivite doğrulaması.)',
      'OG Yeraltı Kablo Tesisatı ve Yüksek Gerilim İletim Hatları (Üretici & Ürün Çözümleri : <br>Prysmian Group, Hes Kablo, Nexans 36 kV XLPE yeraltı güç kabloları ve Raychem ek/başlık aksesuarları.<br>Tünel ve kablo kanalı tipi ağır sanayi yeraltı hat çekimi, boru başlık montajı ve izolasyon testleri.)'
    ],
    slides: [
      {
        title: 'Orta Gerilim Sistemleri (OG) & Şalt Tesisleri',
        desc: 'Açık şalt sahası, yüksek gerilim iletkenleri, trafo altyapısı ve açık havada masa üstü proje inceleyen baretli teknik mühendis ekibi.',
        image: 'assets/images/og_cover_substation_user.jpg'
      },
      {
        title: '1. 36 kV OG Hücresel Şalt Tesisleri & Metal-Clad Hücreler (Üretici & Ürün Çözümleri : <br>1. Schneider Electric SM6 / RM6, Eaton Capitole, ABB UniGear / SafePlus modüler şalt hücreleri.<br>2. SF6 gaz yalıtımlı kesiciler, yük ayırıcıları ve vakumlu kesicili Metal-Clad hücresel şalt sahası.)',
        desc: '36 kV metal-clad ve hava yalıtımlı modüler şalt hücreleri dizilimi; teknisyenlerin açık kapaklı OG panolarında montaj ve test çalışmaları.',
        image: 'assets/images/og_metalclad_cells_user.png'
      },
      {
        title: '2. Yağlı ve Kuru Tipi Dağıtım Trafoları (100 kVA - 10 MVA) (Üretici & Ürün Çözümleri : <br>1. ABB / Hitachi Energy Resibloc, Schneider Trihal, BEST Trafoları, Astor Kuru ve Yağlı Trafolar.<br>2. 100 kVA - 10 MVA güç aralığında dökme reçineli kuru ve genleşme depolu/hermetik yağlı trafolar.)',
        desc: 'Yüksek kapasiteli yağlı ve kuru tip güç dağıtım trafosu, OG/AG bağlantı buşingleri ve şalt sahası soğutma/güvenlik altyapısı.',
        image: 'assets/images/og_transformer_unit_user.png'
      },
      {
        title: '3. Mikroişlemcili Dijital Koruma Röleleri ve Testleri (Üretici & Ürün Çözümleri : <br>1. SEL (Schweitzer Engineering Labs), Schneider MiCOM / Sepam, ABB Relion koruma röleleri.<br>2. Omicron CMC 356 ikincil enjeksiyon test cihazı ile aşırı akım, toprak arıza ve selektivite doğrulaması.)',
        desc: 'Saha bilgisayarı ve ikincil enjeksiyon test cihazı (Omicron) ile dijital koruma rölelerinin haberleşme, aşırı akım ve selektivite testleri.',
        image: 'assets/images/og_protection_relay_test_user.png'
      },
      {
        title: '4. OG Yeraltı Kablo Tesisatı ve Yüksek Gerilim İletim Hatları (Üretici & Ürün Çözümleri : <br>1. Prysmian Group, Hes Kablo, Nexans 36 kV XLPE yeraltı güç kabloları ve Raychem ek/başlık aksesuarları.<br>2. Tünel ve kablo kanalı tipi ağır sanayi yeraltı hat çekimi, boru başlık montajı ve izolasyon testleri.)',
        desc: 'Derin tünel ve TBM delgi sahasında ağır sanayi OG/YG yeraltı kablo kanalı hazırlığı, kaynak ve montaj altyapı çalışmaları.',
        image: 'assets/images/og_underground_tunnel_user.jpg'
      }
    ]
  },
  e_em5: {
    badge: 'ENGINEERING & APPROVAL',
    title: 'Proje Mühendislik & Onay Hizmetleri',
    cover: 'assets/images/eng_cover_blueprint_user.jpg',
    desc: 'Elektrik Dağıtım Şirketleri (TEDAŞ, EDAŞ) resmi proje onayları, röle koordinasyon hesaplamaları, kısa devre analizleri ve kabul/ruhsat süreç danışmanlığı.',
    specs: [
      'TEDAŞ / EDAŞ Elektrik Proje Çizimi ve Resmi Onay Süreçleri (Çözüm ve Hizmetler : <br>Elektrik Dağıtım Şirketleri (TEDAŞ/EDAŞ) standartlarına uygun 2D/3D CAD elektrik projelendirme.<br>Resmi Kurum onay takipleri, mimari çakışma kontrolü ve tesis ruhsat belgelendirme Danışmanlığı.)',
      'Kısa Devre, Yük Akışı ve Gerilim Düşümü Hesaplamaları (Çözüm ve Hizmetler : <br>ETAP, Neplan ve SKM PowerTools mühendislik simülasyon yazılımları ile hat yük akışı analizi.<br>IEC 60909 standardında 3 faz / tek faz kısa devre akımları ve kablo gerilim düşümü hesap raporları.)',
      'Dijital Koruma Rölesi Selektivite ve Koordinasyon Analizleri (Çözüm ve Hizmetler : <br>Şebeke koruma röleleri aşırı akım, toprak arıza ve selektivite zaman koordinasyon eğrilerinin çizimi.<br>Arıza anında sadece ilgili şalterin açmasını sağlayan basamaklı selektivite mühendislik raporu.)',
      'Geçici Kabul, Tesis Ruhsatı ve Müşavirlik Danışmanlık Hizmetleri (Çözüm ve Hizmetler : <br>Bakanlık ve EDAŞ yetkili heyetleri ile saha eksik listesi (punch list) inceleme ve kabul yönetimi.<br>İşletme belgesi, tesis ruhsatı, topraklama/iç tesisat ölçüm raporları ve müşavirlik hizmetleri.)'
    ],
    slides: [
      {
        title: 'Proje Mühendislik & Onay Hizmetleri',
        desc: 'Mühendislik proje paftası üzerinde sarı baretli teknik ekip çalışması ve resmi onay süreç yönetimi.',
        image: 'assets/images/eng_cover_blueprint_user.jpg'
      },
      {
        title: 'TEDAŞ / EDAŞ Elektrik Proje Çizimi ve Resmi Onay Süreçleri',
        desc: 'Uluslararası standartlarda profesyonel mühendislik tasarımı, tedarik yönetimi ve saha entegrasyonu.',
        image: 'assets/images/eng_tedas_approval_user.png'
      },
      {
        title: 'Kısa Devre, Yük Akışı ve Gerilim Düşümü Hesaplamaları',
        desc: 'Proje paftası üzerinde teknik çizim, pergel ve kalemle hassas kısa devre ile yük akışı hesaplama mühendislik çalışmaları.',
        image: 'assets/images/eng_calculations_user.png'
      },
      {
        title: 'Geçici Kabul, Tesis Ruhsatı ve Müşavirlik Danışmanlık Hizmetleri',
        desc: 'Geçici kabul işlemlerinde dikkat edilmesi gereken noktalar; baretli mühendisler ve proje ekibi ile ruhsat onay toplantısı.',
        image: 'assets/images/eng_temporary_acceptance_new_user.png'
      }
    ]
  },
  e_em6: {
    badge: 'HV SYSTEMS / YG',
    title: 'Yüksek Gerilim Sistemleri (YG) & Şalt Sahaları',
    cover: 'assets/images/yg_trafo_merkezi_user.png',
    desc: '154 kV / 380 kV Yüksek Gerilim (YG) indirici ve şalt trafo merkezleri, yüksek gerilim enerji iletim hatları, kesiciler, ayırıcılar ve röle otomasyon altyapıları.',
    specs: [
      '154 kV & 380 kV Yüksek Gerilim (YG) Trafo Merkezleri & Şalt Sahası (Üretici & Ürün Çözümleri : <br>Hitachi Energy / ABB, Siemens Energy, GE Grid Solutions 154kV / 380kV güç trafoları.<br>TEİAŞ şartnamelerine tam uyumlu AIS / GIS açık ve kapalı şalt sahası anahtar teslim taahhüdü.)',
      'Yüksek Gerilim Enerji İletim Hatları ve Direk Tesisatı (Üretici & Ürün Çözümleri : <br>Mitaş Enerji, Şa-Ra Grubu kafes çelik direkler ve Mimsan yüksek gerilim iletken donanımları.<br>154 kV / 380 kV 2x3B Pheasant / Cardinal iletken çekimi ve tel çekme sahası altyapısı.)',
      'SF6 Gazlı YG Kesiciler, Döner / Düşey Ayırıcılar ve Akım-Gerilim Trafoları (Üretici & Ürün Çözümleri : <br>Siemens 3AP1, ABB LTB SF6 canlı tank kesiciler, Pfiffner / Trench akım-gerilim trafoları.<br>Döner ve düşey mekanizmalı açık şalt ayırıcı üniteleri ve bara sistemleri montajı.)',
      'TEİAŞ Bağlantı ve İletim Anlaşması Uyumlu Koruma & SCADA Otomasyonu (Üretici & Ürün Çözümleri : <br>SEL-421 / SEL-487, Siemens SIPROTEC 5, ABB Relion 670 serisi hat koruma ve fider kontrol röleleri.<br>TEİAŞ RYS ve YTM haberleşme protokolleri uyumlu RTU (IEC 60870-5-104) ve SCADA pano sistemleri.)'
    ],
    slides: [
      {
        title: '154 kV & 380 kV Yüksek Gerilim (YG) Trafo Merkezleri & Şalt Sahası',
        desc: 'Uluslararası standartlarda profesyonel mühendislik tasarımı, tedarik yönetimi ve saha entegrasyonu.',
        image: 'assets/images/yg_trafo_merkezi_user.png'
      },
      {
        title: 'Yüksek Gerilim Enerji İletim Hatları ve Direk Tesisatı',
        desc: 'Yüksek gerilim enerji iletim hatları, kafes çelik direk tesisatları ve dağlık sahalarda uzun mesafe enerji aktarım altyapısı.',
        image: 'assets/images/yg_iletim_hatlari_user.png'
      },
      {
        title: 'SF6 Gazlı YG Kesiciler, Döner / Düşey Ayırıcılar ve Akım-Gerilim Trafoları',
        desc: 'SF6 gaz yalıtımlı (GIS) yüksek gerilim kesicileri, döner/düşey ayırıcılar, akım-gerilim trafo üniteleri ve şalt sahası baraları.',
        image: 'assets/images/yg_sf6_kesiciler_user.jpg'
      },
      {
        title: 'TEİAŞ Bağlantı ve İletim Anlaşması Uyumlu Koruma & SCADA Otomasyonu',
        desc: 'TEİAŞ şebeke yönetmeliğine uygun çok ekranlı SCADA kontrol merkezi, uzaktan izleme, veri toplama ve röle otomasyon sistemleri.',
        image: 'assets/images/yg_scada_otomasyon_user.jpg'
      }
    ]
  },
  e_t1: {
    badge: 'TELECOM / MAINTENANCE',
    title: 'Bakım Çözüm Hizmetleri',
    cover: 'assets/images/telecom_maintenance_tower.jpg',
    desc: 'Sabit ve mobil ağların 7/24 önleyici ve düzeltici bakımı, saha müdahale ekipleri ve servis düzeyi anlaşmaları (SLA) yönetimi.',
    specs: [
      '7/24 Saha Müdahale ve Arıza Giderme Ekipleri (Çözüm ve Hizmetler : <br>Kritik baz istasyonları ve fiber şebeke arızalarına ortalama 2-4 saat içinde yerinde müdahale.<br>Mobil yedek jeneratör ve acil durum kule yedekleme ekipleri ile 7/24 kesintisiz iletişim.)',
      'Önleyici Bakım Planları ve Periyodik Kontrol Programları (Çözüm ve Hizmetler : <br>Baz istasyonu kule, RF anten, kablo ve güç sistemlerinin periyodik fiziki/elektronik muayenesi.<br>Akü kapasite testleri, klima iklimlendirme bakımları ve topraklama direnci ölçümleri.)',
      'Servis Düzeyi Anlaşması (SLA) Yönetimi ve Raporlama (Çözüm ve Hizmetler : <br>%99.99 erişilebilirlik (uptime) hedefli SLA kriterlerine uygun kurumsal şebeke yönetimi.<br>Canlı bilet (ticketing) takip portalı ve aylık performans/arıza kök neden raporlaması.)',
      'Yedek Parça Depo Yönetimi ve Lojistik Destek (Çözüm ve Hizmetler : <br>Bölgesel lojistik merkezlerinde kritik aktif donanım ve pasif sarf malzeme stok yönetimi.<br>Hızlı parça değişimi, arızalı ünite onarımı (RMA) ve üretici servis entegrasyonu.)'
    ]
  },
  e_t2: {
    badge: 'TELECOM / 5G',
    title: '5G Altyapı & Kurulum',
    cover: 'assets/images/telecom_5g_infra.jpg',
    desc: '5G NR (New Radio) aktif donanım kurulumu, anten entegrasyonu, küçük hücre (Small Cell) ve 5G ağ optimizasyon hizmetleri.',
    specs: [
      '5G NR Aktif Donanım (gNodeB) Mekanik Montajı ve Kurulumu (Üretici & Ürün Çözümleri : <br>Ericsson Radio System gNodeB, Huawei AAU 5G, Nokia AirScale 5G baz istasyon üniteleri.<br>Kule ve çatı tipi esnek donanım montajı, güç kablolaması ve yüksek hızlı fiber fronthaul bağlantısı.)',
      'Massive MIMO Anten & RU Entegrasyonu ve Hizalaması (Üretici & Ürün Çözümleri : <br>Kathrein, Huawei, CommScope 32R32T / 64R64T Massive MIMO aktif anten üniteleri.<br>Lazer kule açı hizalaması, RET (Remote Electrical Tilt) ayarlaması ve hüzme şekillendirme.)',
      'Küçük Hücre (Small Cell) ve O-RAN Mimarisi Kurulumları (Üretici & Ürün Çözümleri : <br>Ericsson Dot System, Nokia Smart Node, Mavenir / Samsung Open-RAN CU/DU donanımları.<br>Yüksek yoğunluklu şehir merkezleri ve endüstriyel tesisler için kapalı/açık küçük hücre ağı.)',
      '5G SA/NSA Şebeke Optimizasyonu ve KPI Analizi (Çözüm ve Hizmetler : <br>Standalone (SA) ve Non-Standalone (NSA) 5G şebeke hız, gecikme (latency) ve kapsama testleri.<br>VIAVI, Anritsu 5G sinyal analizörleri ile sürücü testleri ve performans iyileştirme.)'
    ]
  },
  e_t3: {
    badge: 'TELECOM / IBS',
    title: 'IBS / Bina İçi Kapsama',
    cover: 'assets/images/telecom_ibs.jpg',
    desc: 'AVM, hastane, havalimanı ve rezidanslarda In-Building Solution (IBS) tasarım ve kurulum; pasif/aktif DAS sistemleri.',
    specs: [
      'Pasif DAS (Distributed Antenna System) Tasarım ve Kurulumu (Üretici & Ürün Çözümleri : <br>Rosenberger, Andrew / CommScope pasif RF bölücüler (splitter), kuplörler ve omni antenler.<br>Düşük kayıplı 1/2" coaxial kablolama ile AVM ve gökdelenlerde homojen sinyal dağıtımı.)',
      'Aktif DAS & Small Cell İle Yüksek Kapasiteli Kapalı Alan Kapsama (Üretici & Ürün Çözümleri : <br>CommScope ERA Active DAS, Corning ONE Active DAS, SOLiD ALLIANCE fiber-DAS üniteleri.<br>Fiber optik omurga üzerinden çok operatörlü (Multi-Operator) 4G/5G yüksek kapasite kapsama.)',
      'Havalimanı, Tünel ve Metro Bina İçi Kapsama Projeleri (Üretici & Ürün Çözümleri : <br>RFS (Radio Frequency Systems) sızdırmalı (leaky) feeder kablo çözümleri ve tünel antenleri.<br>Yeraltı metro hatları, karayolu tünelleri ve terminal binalarında kesintisiz haberleşme altyapısı.)',
      'RF Kapsama Ölçümleri, Drive Test ve Optimizasyon Raporları (Çözüm ve Hizmetler : <br>iBwave Design 3D simülasyon yazılımı ile bina içi RF kapsama ve kapasite projelendirme.<br>TEMS Pocket, Nemo Outdoor ölçüm cihazları ile bina içi yürüyüş (walk) testleri ve raporlama.)'
    ]
  },
  e_t4: {
    badge: 'TELECOM / COW',
    title: 'Mobil Baz İstasyonu (COW)',
    cover: 'assets/images/telecom_cow.jpg',
    desc: 'Geçici kapsama gerektiren etkinlik, afet ve acil alanlar için Cell on Wheels (COW) mobil baz istasyonu çözümleri.',
    specs: [
      'COW (Cell on Wheels) Araç Üstü Mobil Baz İstasyonu Kurulumu (Üretici & Ürün Çözümleri : <br>Rohn, Will-Burt hidrolik/teleskobik mast kuleleri ve özel imalat araç üstü kompozit kabinler.<br>Ericsson/Nokia entegre multi-band baz istasyonu ve uydu/radyolink altyapısı kurulumu.)',
      'Büyük Organizasyon & Etkinlikler İçin Geçici Kapsama Çözümleri (Çözüm ve Hizmetler : <br>Stadyum, konser ve fuar alanlarında anlık yüksek insan yoğunluğuna özel mobil kapasite artırımı.<br>Hızlı intikal, yerinde devreye alma ve etkinlik süresince canlı şebeke izleme operasyonu.)',
      'Doğal Afet ve Acil Durum Sahaları İçin Hızlı Devreye Alma (Çözüm ve Hizmetler : <br>Deprem, yangın ve afet bölgelerinde haberleşmenin kesintisiz sürdürülmesi için acil intikal.<br>Otonom uydu transmisyonu (VSAT/Starlink) ile merkeze doğrudan bağlantı sağlama.)',
      'Güneş Enerjisi ve Jeneratör Destekli Off-Grid COW Sistemleri (Üretici & Ürün Çözümleri : <br>Victron Energy, Aksa Jeneratör, Lithium-ion BESS batarya ve katlanabilir solar paneller.<br>Şebekeden bağımsız (off-grid) sahalarda 7/24 yakıt tasarruflu hibrit enerji beslemesi.)'
    ]
  },
  e_t5: {
    badge: 'TELECOM / TETRA',
    title: 'TETRA Dijital Trunking Haberleşme',
    cover: 'assets/images/telecom_tetra.jpg',
    desc: 'Polis, jandarma, itfaiye ve kamu güvenliği birimleri için TETRA (Terrestrial Trunked Radio) dijital trunking telsiz sistemi kurulum ve entegrasyonu.',
    specs: [
      'TETRA Altyapı (Base Station, BSC, Dispatcher) Kurulumu (Üretici & Ürün Çözümleri : <br>Motorola DIMETRA IP, Airbus DS TACTILON Dabat, Hytera HBS (Hybrid Base Station) altyapıları.<br>Çok siteli geniş alan şebeke (Wide Area Network) TETRA sistemi ve merkezi kontrol odası.)',
      'El Telsizi, Araç Telsizi ve Ağ Yönetim Sistemi Entegrasyonu (Üretici & Ürün Çözümleri : <br>Motorola MTP3550, Airbus THR9, Hytera PD795Ex ATEX onaylı patlama korumalı el telsizleri.<br>Araç telsizleri, GPS takip modülleri ve merkezi Ağ Yönetim Sistemi (NMS) konsol entegrasyonu.)',
      'Şifreli Haberleşme ve Öncelikli Kanal Yönetimi (Çözüm ve Hizmetler : <br>TETRA TEA1/TEA2 hava arayüzü şifreleme ve uçtan uca E2EE kriptografik haberleşme güvenliği.<br>Yetki seviyesine göre öncelikli kanal tahsisi ve acil çağrı (Emergency Call) yönetimi.)',
      'Kamu Güvenliği ve Kritik Altyapı TETRA Ağ Tasarımı (Çözüm ve Hizmetler : <br>ETSI EN 300 392 TETRA standardına uygun frekans planlaması ve bölgesel kapsama tasarımı.<br>Enerji, su, doğalgaz ve ulaşım kritik altyapılarında güvenli trunking haberleşme mimarisi.)'
    ]
  },
  e_t6: {
    badge: 'TELECOM / DPO',
    title: 'DPO — Dizayn, Planlama, Optimizasyon',
    cover: 'assets/images/telecom_dpo.jpg',
    desc: 'Ağ altyapısı dizayn, RF planlama, frekans koordinasyonu, kapsama analizleri ve şebeke optimizasyon hizmetleri.',
    specs: [
      'RF Kapsama & Kapasite Planlama ve Frekans Koordinasyonu (Üretici & Ürün Çözümleri : <br>Atoll, Asset 3G/4G/5G, Forsk RF planlama yazılımları ile hücre yerleşim ve frekans simülasyonu.<br>BTSH frekans koordinasyonu, anten azimut/tilt hesaplamaları ve kapsama boşluğu analizi.)',
      'Ağ Altyapısı Mimari Dizayn ve Teknik Şartname Hazırlama (Çözüm ve Hizmetler : <br>Çekirdek ağ (Core), taşıyıcı (Transport) ve erişim (RAN) katmanı mimari tasarım ve boyutlama.<br>Ekipman teknik şartnamesi (RFQ/RFP) hazırlanması ve üretici teknik değerlendirmesi.)',
      'Drive Test, Walk Test ve Sinyal Ölçüm Kampanyaları (Üretici & Ürün Çözümleri : <br>TEMS Investigation, Nemo Outdoor, XCAL-Solo 5G analizörleri ile sahada canlı şebeke ölçümü.<br>CQT (Call Quality Test), DT (Drive Test) kampanyaları ve bölgesel kapsama haritaları.)',
      'KPI Analizi ve Şebeke Performans Optimizasyonu Raporları (Çözüm ve Hizmetler : <br>OSS (Ericsson ENIQ, Nokia NetAct) veri madenciliği ile şebeke KPI trendi ve kök neden analizi.<br>Drop call, handover başarısızlıkları ve veri hızı düşüşlerinin optimizasyon aksiyon raporu.)'
    ]
  },
  e_t7: {
    badge: 'TELECOM / WDM',
    title: 'WDM — Dalga Boyu Çoklama Sistemleri',
    cover: 'assets/images/telecom_wdm.jpg',
    desc: 'DWDM ve CWDM optik iletim sistemleri kurulumu, kapasite artırımı ve metro/uzun mesafe fiber optik ağ altyapı çözümleri.',
    specs: [
      'DWDM/CWDM Optik Multiplexer & OADM Kurulumu (Üretici & Ürün Çözümleri : <br>Ciena 6500 Packet-Optical, Nokia 1830 PSS, Huawei OptiX OSN 9800 DWDM platform çözümleri.<br>Çok kanallı (96x100G / 400G Flex-Grid) ROADM ile dinamik optik ağ anahtarlama altyapısı.)',
      'Fiber Optik Omurga Kapasite Artırımı ve Genişletme (Çözüm ve Hizmetler : <br>Mevcut fiber altyapı üzerinde Raman ve EDFA optik kuvvetlendirici ilave ile kapasite katlaması.<br>QAM-256, QPSK ve DP-16QAM modülasyon teknikleriyle spektral verimlilik optimizasyonu.)',
      'Metro Ethernet ve Uzun Mesafe WDM Ağ Tasarımı (Üretici & Ürün Çözümleri : <br>Coriant / Infinera GX Series, ECI Apollo OTN, Adtran Metro Ethernet taşıma ekipmanları.<br>Şehiriçi ring topoloji metro ağları ve 1000+ km uzun mesafe terrestrial omurga hat tasarımı.)',
      'OTDR & Optik Güç Ölçümü ile Bağlantı Testi & Sertifikasyon (Üretici & Ürün Çözümleri : <br>JDSU / VIAVI T-BERD 8000, Yokogawa AQ7280 OTDR ve Fluke Networks OF-500 fiber test setleri.<br>Ek kayıpları, yansıma haritaları ve link bütçe raporlaması ile profesyonel fiber sertifikasyon.)'
    ]
  },
  e_t8: {
    badge: 'TELECOM / FTTX',
    title: 'FTTX — Fiber to the X Altyapısı',
    cover: 'assets/images/telecom_fttx.jpg',
    desc: 'FTTH, FTTB ve FTTC fiber abone bağlantısı altyapı tasarımı, döşeme, fiber dağıtım kutusu ve ONU/ONT kurulumları.',
    specs: [
      'FTTH (Fiber to the Home) Abone Hat Tasarımı ve Döşemesi (Üretici & Ürün Çözümleri : <br>Corning SMF-28 Ultra G.657.A2, Prysmian FlexRibbon mikro fiber kablo ve ADSS hava hatları.<br>GIS tabanlı ağ envanter sistemi ile mahalle ve bina bazlı GPON abone hat projelendirmesi.)',
      'Fiber Dağıtım Kutuları (FDP/FDB) ve Splitter Kurulumu (Üretici & Ürün Çözümleri : <br>CommScope OptiSheath, Huawei ETP distribution box, PPC Broadband fiber bağlantı ekipmanları.<br>1:8 / 1:16 / 1:32 PLC splitter kaskad dağıtımı ve pasif optik ağ güç bütçe hesabı.)',
      'ONU / ONT / OLT Donanım Entegrasyonu ve Aktivasyonu (Üretici & Ürün Çözümleri : <br>Huawei MA5800 OLT, ZTE C650, Nokia 7360 ISAM FX ve GPON/XGS-PON ONU/ONT terminalleri.<br>TR-069 ACS ile uzaktan ZTP (Zero Touch Provisioning) ve toplu ONU konfigürasyon yönetimi.)',
      'Servis Aktivasyon, Test ve Müşteri Kabul Raporlaması (Çözüm ve Hizmetler : <br>RFC 2544 / Y.1564 Ethernet servis testi, BERT ve optik güç ölçümü ile hizmet kalite onayı.<br>Abone kabul formları, LAN tarafı bağlantı testi ve RFS (Ready For Service) onay raporlaması.)'
    ]
  },
  e_t9: {
    badge: 'TELECOM / CONSTRUCTION',
    title: 'Telekom İnşaat İşleri',
    cover: 'assets/images/telecom_construction.jpg',
    desc: 'Baz istasyonu kule ve direk imalatı, montajı, YASS/şehiriçi kanallar, boru döşeme ve zemin sondajlı yeraltı kablo hatları.',
    specs: [
      'Telekom Kule & Direk İmalat, Zemin Etüdü ve Montajı (Çözüm ve Hizmetler : <br>Rüzgar yükü hesabı ve zemin sondaj raporlarına göre 20-80m monopol ve kafes çelik kule imalatı.<br>Kule yükleme kapasitesi analizi, zemin çelik temel ve kule montaj mühendislik süreç yönetimi.)',
      'Yeraltı Boru ve Kablo Kanalı (Trench) Döşeme İşleri (Çözüm ve Hizmetler : <br>HDD (Yatay Yönlü Sondaj) ve geleneksel açık hendek yöntemi ile fiber optik boru hattı döşemesi.<br>PVC, HDPE ve çelik borular ile kablolara mekanik koruma altında güvenli yeraltı geçişleri.)',
      'Beton Kablo Kanalı ve Menhol Yapım ve Tamamlama İşleri (Çözüm ve Hizmetler : <br>Belediye standartlarına uygun prefabrik ve yerinde döküm beton menhol ile baca yapımı.<br>Yol boyu beton kablo kanalı, kablo askı menholleri ve kapak, çerçeve malzeme temini.)',
      'YASS (Yol Altı Altyapı) & Belediye İzin Süreç Yönetimi (Çözüm ve Hizmetler : <br>Belediye ve karayolları kurumlarına yol kazı, YASS ve zemin restorasyonu onay başvuruları.<br>İzin takibi, trafik çevirme planları ve çalışma sonrası asfalt/bordür restorasyon tamamlama.)'
    ]
  },
  e_t10: {
    badge: 'TELECOM / AUDIT',
    title: 'Denetim Hizmetleri',
    cover: 'assets/images/telecom_audit.jpg',
    desc: 'Telekom altyapısı saha denetimi, teknik uyumluluk raporlaması, kalite güvence (QA) testleri ve bağımsız proje yönetimi.',
    specs: [
      'Saha Denetimi ve Teknik Uyumluluk Kontrol Raporları (Çözüm ve Hizmetler : <br>Baz istasyonu, IBS, fiber dağıtım ve kule tesisatlarının operatör teknik şartnamesi uyumluluğu denetimi.<br>Saha eksik listesi (punch list) takibi ve sonuçlarını belgeleyen dijital saha denetim raporları.)',
      'Kalite Güvence (QA) Testleri ve Kabul Protokolleri (Çözüm ve Hizmetler : <br>RF sinyal gücü, fiber optik kayıp, güç ve topraklama testleri ile bağımsız kalite kabul protokolleri.<br>FAT (Factory Acceptance Test) ve SAT (Site Acceptance Test) raporlarının hazırlanması.)',
      'Bağımsız Proje Yönetimi (PMO) ve Milestone Takibi (Çözüm ve Hizmetler : <br>MS Project / Primavera P6 programları ile proje takvimi, iş gücü ve kaynak yönetim planlaması.<br>Haftalık/aylık milestone ilerleme raporları, risk kaydı ve değişiklik yönetimi süreci.)',
      'Operatör ve Yüklenici Performans Değerlendirme Raporları (Çözüm ve Hizmetler : <br>KPI bazlı yüklenici puanlama kartı ve proje SLA uyum denetim raporları.<br>Operatör bayi/yüklenici sözleşme performansı çeyreklik değerlendirme ve yaptırım önerileri.)'
    ]
  },
  e_t11: {
    badge: 'TELECOM / LV',
    title: 'LV — Alçak Gerilim Güç Beslemeleri',
    cover: 'assets/images/telecom_lv.jpg',
    desc: 'Telekom tesisleri ve baz istasyonlarına yönelik AG güç panosu, acil jeneratör bağlantısı ve kesintisiz güç besleme (UPS) sistemleri.',
    specs: [
      'Baz İstasyonu AC/DC Güç Altyapısı ve Pano Kurulumu (Üretici & Ürün Çözümleri : <br>Eltek Flatpack2, Huawei ETP48100, Vertiv NetSure 701 DC güç sistemi ve akü rafları.<br>-48V DC dağıtım panelları, PDU ve akü grup kabini kurulumu ile kapasite hesapları.)',
      'UPS Kesintisiz Güç Kaynağı Kurulumu ve Akü Grupları (Üretici & Ürün Çözümleri : <br>Eaton 9PX / 9SX, APC Galaxy VS / VX, Vertiv Liebert GXT5 modüler online UPS sistemleri.<br>VRLA ve Lityum-iyon akü grupları, kapasite testi ve akü ömür yönetim yazılımları.)',
      'Jeneratör Bağlantısı ve Otomatik Transfer Şalter (ATS) (Üretici & Ürün Çözümleri : <br>Aksa Power Generation, Cummins, Kohler ve Perkins motorlu telekom sahası jeneratörleri.<br>Schneider / Socomec ATYS ATS şalter ve jeneratör uzaktan başlatma otomasyon paneli.)',
      'Enerji Verimliliği Analizi ve Güç Yönetim Sistemleri (Çözüm ve Hizmetler : <br>Site bazında PUE (Power Usage Effectiveness) ölçümü ve enerji giderini düşüren optimizasyon raporu.<br>Uzaktan akü şarj, yük dengesi ve enerji tüketim izleme yazılımı entegrasyonu.)'
    ]
  },
  e_c1: {
    badge: 'CYBERSECURITY / SOC',
    title: 'IT / OT Siber Güvenlik & SOC Hizmetleri',
    cover: 'assets/images/energy_ref_soc_cyber.jpg',
    desc: '7/24 kesintisiz tehdit izleme, siber olaylara müdahale, log analizi, SIEM entegrasyonu ve IT/OT endüstriyel kontrol sistemleri ağ güvenliği çözümleri.',
    specs: [
      '7/24 SIEM & SOC Güvenlik Tehdit İzleme ve Analizi : <br>Kurumsal ağlarda 7/24 canlı tehdit avcılığı, SIEM korelasyonu ve anlık güvenlik ihlali takibi. (Splunk Enterprise Security, IBM QRadar SIEM, Microsoft Sentinel, LogRhythm NextGen SIEM)',
      'Endüstriyel Kontrol Sistemleri (ICS / OT) Güvenlik Duvarı : <br>SCADA, PLC ve fabrika otomasyon ağları için OT uyumlu derin paket inceleme ve izolasyon. (Palo Alto Networks PA-400 Series, Fortinet FortiGate Rugged, Claroty CTD, Nozomi Networks Guardian)',
      'Log Yönetimi, Korelasyon ve 5651 Sayılı Kanun Uyumu : <br>Yasal mevzuata uygun zaman damgalı log toplama, imzalama ve merkezi arşivleme altyapısı. (Logsign Unified SecOps, Crypttech CryptoLog, Trend Micro Apex Central, Micro Focus ArcSight)',
      'Tehdit İstihbaratı ve Siber Olaylara Müdahale (SOAR / IR) : <br>Otomatik siber tehdit engelleme, olay müdahale senaryoları ve 7/24 uzman müdahale hizmeti. (Cisco SecureX, CrowdStrike Falcon Complete, Palo Alto Cortex XSOAR, FireEye Mandiant IR)'
    ]
  },
  e_c2: {
    badge: 'CYBERSECURITY / PENTEST',
    title: 'Sızma Testleri & Güvenlik Denetimi',
    cover: 'assets/images/pentest_security_audit.jpg',
    desc: 'Sistem odası, ağ altyapısı, web uygulamaları ve kablosuz ağlar için sızma testleri (Pentest), zafiyet tarama analizleri ve sosyal mühendislik testleri.',
    specs: [
      'Ağ (Network) ve Sunucu Altyapısı Sızma Testleri (Çözüm ve Hizmetler : <br>İç ve dış ağ sunucu altyapılarına yönelik etik hackleme ve güvenlik açığı tespit simülasyonları.<br>Kritik ağ bileşenleri ve port seviyesinde güvenlik düzeyi analizi ile sızma engelleme planı.)',
      'Web ve Mobil Uygulama Zafiyet Tarama ve Güvenlik Testi (Çözüm ve Hizmetler : <br>OWASP Top 10 standartlarında web yazılım ve mobil uygulama güvenlik açıkları tespiti.<br>Veritabanı sızma, kod analizi ve yetkisiz erişim açıklarının kapatılması danışmanlığı.)',
      'Sosyal Mühendislik & Oltalama (Phishing) Simülasyonları (Çözüm ve Hizmetler : <br>Personel farkındalık seviyesini ölçen senaryo bazlı kurumsal oltalama e-posta simülasyonları.<br>İnsan kaynaklı güvenlik zafiyetlerinin tespiti ve siber güvenlik farkındalık eğitimleri.)',
      'Zafiyet Analiz Raporlaması ve Güvenlik Sıkılaştırma (Hardening) (Çözüm ve Hizmetler : <br>Tespit edilen açıkların risk derecesine göre önceliklendirildiği detaylı teknik yönetim raporu.<br>Sunucu, firewall ve işletim sistemi seviyesinde hardening sıkılaştırma uygulama desteği.)'
    ]
  },
  e_c3: {
    badge: 'COMPLIANCE / KVKK',
    title: 'Uyum & Siber Güvenlik Standartları Danışmanlığı',
    cover: 'assets/images/compliance_security_advisory.jpg',
    desc: 'ISO 27001 Bilgi Güvenliği Yönetim Sistemi, IEC 62443 endüstriyel siber güvenlik standart uyumu ve KVKK/GDPR kişisel veri koruma danışmanlığı.',
    specs: [
      'ISO 27001 Bilgi Güvenliği Yönetim Sistemi (BGYS) Uyum Süreci (Çözüm ve Hizmetler : <br>Kurumsal BGYS politikalarının hazırlanması, varlık yönetimi ve belgelendirme danışmanlığı.<br>İç denetim süreçlerinin yürütülmesi ve uluslararası ISO 27001 sertifikasyon hazırlığı.)',
      'IEC 62443 Endüstriyel Kontrol Sistemleri Siber Güvenlik Standardı (Çözüm ve Hizmetler : <br>OT, SCADA ve fabrika otomasyon sistemlerinin IEC 62443 standartlarına tam uyum denetimi.<br>Siber-fiziksel sistemler için alan (zone) ve kanal (conduit) güvenlik mimarisi tasarımı.)',
      'KVKK & GDPR Kişisel Verilerin Korunması Hukuki ve Teknik Uyum (Çözüm ve Hizmetler : <br>VERBİS kaydı, kişisel veri envanteri hazırlığı ve hukuki metinlerin düzenlenmesi.<br>Veri sızıntısı önleme (DLP), yetki matrisi ve teknik veri koruma altyapı kurulumu.)',
      'Kurumsal Risk Analizi ve Bilgi Güvenliği Politikaları Oluşturma (Çözüm ve Hizmetler : <br>Kurum genelinde siber risk haritasının çıkarılması ve tehdit önceliklendirmesi.<br>İş sürekliliği, felaket kurtarma ve bilgi güvenliği prosedürlerinin kurum kültürüne entegrasyonu.)'
    ]
  },
  e_s4: {
    badge: 'MEP & HVAC',
    title: 'Mekanik Tesisat & HVAC (VRF / VAV) / MEP',
    cover: 'assets/images/energy_hvac_mep.jpg',
    desc: 'MEP (Mechanical, Electrical, Plumbing) mühendisliği, HVAC VRF VAV hassas iklimlendirme ve havalandırma sistem tasarımları.',
    specs: [
      'Bina ve Sanayi Tesisleri İklimlendirme (HVAC VRF / VAV / AHU) (Üretici & Ürün Çözümleri : <br>Daikin VRV IV / VRV X, Mitsubishi Electric City Multi R3, Carrier AquaEdge sanayi soğutma grupları.<br>Çok bölgeli (multi-zone) VRF sistemler, VAV hava dağıtım kanalları ve enerji geri kazanımlı HRV üniteler.)',
      'MEP Mekanik & Elektrik Tesisat Projelendirmesi (Çözüm ve Hizmetler : <br>IFC uyumlu Revit MEP ve AutoCAD MEP araçlarıyla 3D BIM tabanlı mekanik ve elektrik proje tasarımı.<br>Koordinasyon toplantıları, saha clash analizi ve as-built belgelemeleri ile kaliteli tesisat teslimi.)',
      'Hassas Kontrollü Veri Merkezi Soğutma Altyapıları (Üretici & Ürün Çözümleri : <br>Vertiv Liebert CRV / DCD, Stulz CyberAir 4, Schneider InRow RC hassas iklimlendirme üniteleri.<br>Sıcak/soğuk koridor izolasyonu, yüksek yoğunluklu kabinet soğutması ve PUE optimizasyonu.)',
      'Enerji Geri Kazanımlı Havalandırma Sistemleri (Üretici & Ürün Çözümleri : <br>Systemair VEX, Swegon GOLD, Dantherm HCV Roof entalpik ısı geri kazanımlı havalandırma santralleri.<br>Isı geri kazanım verimliliği (η ≥ %85) ile yıllık enerji giderini önemli ölçüde düşüren HRV kurulumu.)'
    ]
  },
  e_s5: {
    badge: 'SCADA',
    title: 'SCADA — Merkezi Denetim, Kontrol ve Veri Toplama',
    cover: 'assets/images/energy_scada_control.jpg',
    desc: 'Elektrik üretimi, su dağıtımı, doğalgaz hatları ve endüstriyel tesisler için gerçek zamanlı canlı izleme, alarm yönetimi ve uzaktan kontrol.',
    specs: [
      'Canlı Veri Toplama, Sensör Entegrasyonu ve Trend Analizleri (Üretici & Ürün Çözümleri : <br>Emerson DeltaV, Honeywell Experion PKS, Yokogawa CENTUM VP süreç kontrol sistemleri.<br>Çok noktalı analog/dijital sensör datası, zaman damgalı veri arşivleme ve grafik trend çizimi.)',
      'Merkezi İzleme Ekranları ve Uzaktan Otomasyon Komutları (Üretici & Ürün Çözümleri : <br>Siemens WinCC Advanced, AVEVA System Platform, ICONICS GENESIS64 SCADA yazılımları.<br>Canlı mimik diyagramlar, uzaktan vana/şalter kontrolü ve çok kullanıcılı yetki tabanlı erişim.)',
      'PLC / RTU Haberleşme Protokolleri (Üretici & Ürün Çözümleri : <br>Schneider Quantum/M340 RTU, ABB AC500 PLC, Beckhoff CX serisi protokol gateway donanımları.<br>Modbus TCP/RTU, IEC 60870-5-101/104, DNP3 ve OPC UA çoklu protokol dönüştürme entegrasyonu.)',
      'Veri Güvenliği ve Yedekli Mimari Tasarımı (Çözüm ve Hizmetler : <br>Hotstandby yedekli SCADA sunucu mimarisi, veri replikasyonu ve otomatik fail-over yönetimi.<br>IEC 62443 OT siber güvenlik standartları uyumlu saha ağı izolasyonu ve erişim denetimi.)'
    ]
  },
  e_s6: {
    badge: 'FIRE SUPPRESSION',
    title: 'Yangın Söndürme ve Erken Uyarı Sistemleri',
    cover: 'assets/images/energy_fire_suppression.jpg',
    desc: 'Sprinkler sulu söndürme, gazlı söndürme (FM200 / Novec 1230), davlumbaz söndürme ve mobil yangın emniyet altyapıları.',
    specs: [
      'FM200 / Novec 1230 Gazlı Söndürme Sistemleri (Üretici & Ürün Çözümleri : <br>Kidde Fenwal Inergen/FM-200, Siemens Cerberus FIT, Fike Autopulse kontrol panelli gazlı söndürme.<br>Veri merkezleri ve sistem odaları için çevre dostu Novec 1230 / CO2 inert gaz söndürme tasarımı.)',
      'Otomatik Sprinkler (Yağmurlama) Sulu Söndürme Tesisatı (Üretici & Ürün Çözümleri : <br>Viking, Tyco / Johnson Controls, Minimax kuru/ıslak tip sprinkler başlıkları ve dağıtım borulama.<br>Pompa istasyonu, basınç tankı, alarm kapağı ve kat bazlı otomatik sprinkler tesisatı kurulumu.)',
      'Erken Uyarı Hassas Duman Algılama (VESDA) Entegrasyonu (Üretici & Ürün Çözümleri : <br>Xtralis VESDA-E LaserSCANNER, Wagner TITANUS MULTICRITERIA hava örneklemeli duman dedektörleri.<br>Laser tabanlı çok kriterli erken uyarı dedektörleri ile ppm seviyesinde duman tespiti altyapısı.)',
      'NFPA Standartlarına Uygun Mühendislik ve Test Raporlama (Çözüm ve Hizmetler : <br>NFPA 13 (Sprinkler), NFPA 72 (Yangın Alarm) ve NFPA 2001 (Gazlı Söndürme) uyumlu mühendislik.<br>Hidro testler, söndürme sistemi devreye alma ve bağımsız sertifikasyon raporu hazırlanması.)'
    ]
  },
  e_s7: {
    badge: 'EV CHARGE & E-MOBILITY',
    title: 'Elektrikli Araç Şarj İstasyonları (EV Charge)',
    cover: 'assets/images/ev_bess_solar_carport_user.jpg',
    desc: 'AC yavaş/normal (3.7 - 22 kW) ve DC ultra hızlı (50 - 350+ kW) şarj istasyonu kurulumları, Solar Carport & BESS entegrasyonu, Sicharge ürün ailesi ve modüler otopark çözümleri.',
    specs: [
      'Solar Carport & BESS Entegre Yeşil Şarj İstasyonu Altyapısı (Üretici & Ürün Çözümleri : <br>Siemens Sicharge UC, ABB Terra HP 350kW, Schneider EVlink hızlı şarj istasyonları.<br>Güneş paneli sundurmalı (Solar Carport), BESS batarya depolama ve sıfır emisyonlu şarj altyapısı.)',
      'Endüstriyel Sicharge & DC Ultra Hızlı Şarj Ürün Ailesi (Üretici & Ürün Çözümleri : <br>Siemens Sicharge D 160-300kW, Alpitronic HYC 300, Vestel EVC06 DC hızlı şarj üniteleri.<br>50 kW - 350+ kW modüler güç kabinleri, dinamik güç paylaşımı ve Tip 2/CCS2/CHAdeMO soketler.)',
      'Otopark & AVM Solar Sundurmalı Modüler Şarj Noktaları (Üretici & Ürün Çözümleri : <br>Schneider EVlink Pro AC 22kW, Ensto One Home, Phoenix Contact şarj denetleyicileri.<br>AVM, otel ve ticari binalar için OCPP 1.6J / 2.0.1 entegreli merkezi faturalandırmalı şarj noktaları.)'
    ],
    slides: [
      {
        title: 'Solar Carport & BESS Entegre Yeşil Şarj İstasyonu Altyapısı',
        desc: 'Güneş paneli sundurmalı (Solar Carport), BESS batarya depolama ünitesi ve hızlı DC şarj istasyonu entegreli sıfır emisyonlu açık otopark enerji çözümü.',
        image: 'assets/images/ev_bess_solar_carport_user.jpg'
      },
      {
        title: 'Endüstriyel Sicharge & DC Ultra Hızlı Şarj Ürün Ailesi',
        desc: 'Sicharge serisi kompakt duvara monte, yüksek güçlü dispenser ve modüler güç kabinli DC ultra hızlı şarj istasyonu ürün yelpazesi (50 kW - 350+ kW).',
        image: 'assets/images/ev_siemens_chargers_lineup_user.png'
      },
      {
        title: 'Otopark & AVM Solar Sundurmalı Modüler Şarj İstasyonları',
        desc: 'Ticari binalar, AVM otoparkları ve kamu alanları için güneş paneli zemin kaplamalı, bağımsız peron işaretlemeli akıllı EV şarj noktası altyapısı.',
        image: 'assets/images/ev_canopy_station_user.png'
      }
    ]
  },
  // Enerji Küme F — IoT & Otomasyon Sistemleri
  e_iot1: {
    badge: 'IOT / SMART SENSORS',
    title: 'Akıllı Sensörler',
    cover: 'assets/images/iot_smart_sensors_hand.jpg',
    desc: 'Sensör transdüserleri, mikroişlemciler, kablosuz haberleşme ve gaz, desibel, takometre, refraktometre, sıcaklık/nem, basınç, hava kalitesi sensörleri.',
    specs: [
      'Algılama (Transdüser) (Üretici & Ürün Çözümleri : <br>IFM Efector, Bosch Sensortec, Honeywell Sensing, Sensirion, Turck, Pepperl+Fuchs.<br>Ortamdaki fiziksel değişimi (ısı, ışık vb.) yakalar.)',
      'İşleme (Mikroişlemci) (Üretici & Ürün Çözümleri : <br>STMicroelectronics STM32, Texas Instruments MSP430, Microchip PIC/AVR, NXP Kinetis.<br>Verideki gürültüyü giderir ve analize uygun dijital formata çevirir.)',
      'İletişim Birimi (Üretici & Ürün Çözümleri : <br>Quectel Wireless, Semtech LoRa Transceiver, Nordic Semiconductor BLE, Telit Cinet.<br>Toplanan veriyi Wi-Fi, Bluetooth veya hücresel ağlar üzerinden buluta gönderir.)',
      'Gaz Dedektörleri (Üretici & Ürün Çözümleri : <br>Dräger Safety, Honeywell Analytics, MSA Safety, Crowcon Detection, Smart Sensor.<br>Yanıcı ve zehirli gaz kaçaklarını tespit eder.)',
      'Desibelmetreler (Üretici & Ürün Çözümleri : <br>Brüel & Kjær, Testo, Extech Instruments, Smart Sensor AR844 / AR854.<br>Ortamdaki ses ve gürültü seviyesini ölçer.)',
      'Takometreler (Üretici & Ürün Çözümleri : <br>SKF Tachometer, Shimpo Instruments, Testo 470, Smart Sensor AR926 / AR925.<br>Motor veya dönen parça devir hızını ölçer.)',
      'Refraktometreler (Üretici & Ürün Çözümleri : <br>Anton Paar, Atago refractometers, Mettler Toledo, Smart Sensor AR931.<br>Sıvıların kırılma indeksini ve yoğunluğunu belirler.)',
      'Sıcaklık ve Nem Sensörleri (Üretici & Ürün Çözümleri : <br>Sensirion SHT3x/SHT4x, Testo 605i, Vaisala HUMICAP, Honeywell HIH Series.<br>Ortam ısısını ve rutubeti ölçer; klima ve tarımda kullanılır.)',
      'Hareket Sensörleri (PIR / Kızılötesi) (Üretici & Ürün Çözümleri : <br>Panasonic PIR Sensors, Schneider Electric Argus, Bosch Security, Optex Infrared.<br>Alandaki canlı veya nesne hareketini algılar; güvenlik sistemlerinde yaygındır.)',
      'Basınç Sensörleri (Üretici & Ürün Çözümleri : <br>WIKA Pressure Transmitters, Endress+Hauser Cerabar, Keller Pressure, Danfoss MBS.<br>Gaz veya sıvı basıncındaki değişimleri takip eder; endüstriyel hatlarda ve barometrelerde yer alır.)',
      'Işık Sensörleri (LDR) (Üretici & Ürün Çözümleri : <br>ams OSRAM Lux Sensors, Vishay Opto, Texas Instruments OPT3001, Testo 540.<br>Ortamdaki aydınlık düzeyini ölçer; otomatik aydınlatmalarda kullanılır.)',
      'Hava Kalitesi Sensörleri (Üretici & Ürün Çözümleri : <br>Sensirion SCD30/SCD40, Vaisala CARBOCAP, Amphenol Telaire, Bosch BME680.<br>Karbondioksit veya zararlı gazları tespit eder; akıllı binalar için önemlidir.)',
      'Akıllı Ev Kullanım Alanları (Üretici & Ürün Çözümleri : <br>Somfy Smart Home, Schneider Wiser, Legrand Netatmo, Bosch Smart Home, Philips Hue.<br>Otomatik ışık, kombi ve güvenlik alarm sistemleri.)',
      'Endüstri 4.0 (Fabrikalar) (Üretici & Ürün Çözümleri : <br>Siemens Anomaly Detection, SKF Insight, Schaeffler OPTIME, ABB Ability.<br>Makinelerin arızalanmadan önce tahmin edilmesini sağlayan öngörücü bakım.)',
      'Akıllı Tarım Kullanım Alanları (Üretici & Ürün Çözümleri : <br>Netafim Smart Irrigation, Sentek Soil Moisture, CropX AgTech, Meter Group TEROS.<br>Toprak nemine göre sulama otomasyonu.)',
      'Sağlık Kullanım Alanları (Üretici & Ürün Çözümleri : <br>Medtronic Patient Monitoring, BioIntelliSense BioButton, Apple HealthKit Pro, Dexcom.<br>Hastaların nabız ve vücut ısısını uzaktan takip eden giyilebilir cihazlar.)'
    ],
    slides: [
      {
        title: 'Akıllı Sensörler',
        desc: 'Transdüser, mikroişlemci, haberleşme ünitesi ve gaz, desibel, takometre, refraktometre, sıcaklık/nem, basınç, hava kalitesi akıllı sensörleri.',
        image: 'assets/images/iot_smart_sensors_hand.jpg'
      }
    ]
  },
  e_iot2: {
    badge: 'IOT / ACTUATORS',
    title: 'Aktüatörler (Eyleyiciler)',
    cover: 'assets/images/ag_mcc_srucu_user.jpg',
    desc: 'Elektrikli, pnömatik, hidrolik aktüatörler; akıllı ev, endüstriyel otomasyon ve tarımsal eyleyici sistemleri.',
    specs: [
      'Veri Toplama (Üretici & Ürün Çözümleri : <br>IFM Efector, Turck, Pepperl+Fuchs, Bosch Sensortec, Honeywell Sensing.<br>Sensörler çevreden bilgi alır.)',
      'Karar / Sinyal Üretimi (Üretici & Ürün Çözümleri : <br>Siemens S7-1500 PLC, Schneider Modicon, Rockwell Allen-Bradley, Beckhoff.<br>Kontrol ünitesi veriyi işleyip elektrik sinyali üretir.)',
      'Eylem & Mekanik Hareket (Üretici & Ürün Çözümleri : <br>Festo Motion Terminal, SMC Actuators, Belimo Smart Actuators, Danfoss.<br>Aktüatör sinyali alıp mekanik ya da fiziksel hareketi başlatır.)',
      'Elektrikli Aktüatörler (Üretici & Ürün Çözümleri : <br>Siemens SIMOTICS, Yaskawa Sigma-7, Mitsubishi Electric, Oriental Motor, Parker.<br>Motorlar (step, servo) ve selenoidler; elektrik enerjisini dönel veya doğrusal harekete çevirir.)',
      'Pnömatik Aktüatörler (Üretici & Ürün Çözümleri : <br>Festo Pneumatic Cylinders, SMC Pneumatics, Norgren, Aventics (Emerson).<br>Basınçlı hava kullanarak mekanik hareket üretir.)',
      'Hidrolik Aktüatörler (Üretici & Ürün Çözümleri : <br>Bosch Rexroth, Parker Hannifin Hydraulics, Eaton Hydraulics, Moog Industrial.<br>Sıvı basıncı ile yüksek kuvvet gerektiren endüstriyel işleri yapar.)',
      'Termal / Manyetik Aktüatörler (Üretici & Ürün Çözümleri : <br>Thermocoax, Cedrat Technologies, Johnson Matthey, Magnet-Schultz.<br>Sıcaklık veya akım değişimleriyle şekil veya konum değiştirir.)',
      'Akıllı Ev Aktüatör Kullanımı (Üretici & Ürün Çözümleri : <br>Somfy Smart Motors, Belimo HVAC, Yale/August Smart Lock Actuators, Legrand.<br>Otomatik perdeler, akıllı kilitler, klima ve HVAC sistem ayarları.)',
      'Endüstriyel Otomasyon Aktüatörleri (Üretici & Ürün Çözümleri : <br>KUKA Robotics, ABB Motion, Emerson Smart Valve Actuators, Festo Automation.<br>Akıllı vanalar, robotik kollar, bant hareketleri ve üretim hattı kesicileri.)',
      'Tarım Otomasyon Aktüatörleri (Üretici & Ürün Çözümleri : <br>Netafim Smart Valves, Rain Bird Solenoids, Hunter Industries, Bermad Water Control.<br>Otomatik sulama vanalarının açılıp kapanması.)'
    ],
    slides: [
      {
        title: 'Aktüatörler (Eyleyiciler)',
        desc: 'Elektrikli, pnömatik, hidrolik aktüatörler; akıllı ev, endüstriyel otomasyon ve tarımsal eyleyici sistemleri.',
        image: 'assets/images/ag_mcc_srucu_user.jpg'
      }
    ]
  },
  e_iot3: {
    badge: 'IOT / GATEWAYS',
    title: 'Ağ Geçitleri (Gateways)',
    cover: 'assets/images/iot_gateways_network.jpg',
    desc: 'Protokol çevrimi, edge computing, endüstriyel güvenlik şifreleme ve kesintisiz veri aktarım ağ geçitleri.',
    specs: [
      'Protokol Çevrimi (Üretici & Ürün Çözümleri : <br>HMS Anybus Gateways, Moxa MGate, Advantech WebAccess/CNC, Teltonika RUTX.<br>Zigbee, Modbus veya LoRaWAN gibi farklı diller konuşan cihazların verilerini MQTT veya HTTP gibi bulut diline çevirir.)',
      'Ön İşleme (Edge Computing) (Üretici & Ürün Çözümleri : <br>Siemens SIMATIC IOT2050, Advantech UNO/ECU Edge, Cisco IR1101 Industrial Router, Eurotech Everyware.<br>Veriyi buluta göndermeden önce yerelde temizler, filtreler ve gereksiz yükü azaltır.)',
      'Güvenlik (Üretici & Ürün Çözümleri : <br>Fortinet FortiGate Rugged, Palo Alto Networks PA-220R, Phoenix Contact mGuard, Claroty Edge.<br>Sahadaki cihazlar ile dış dünya arasında şifreli bir duvar oluşturarak sızmaları engeller.)',
      'Kesintisiz Bağlantı (Üretici & Ürün Çözümleri : <br>Multitech Conduit Gateway, Kerlink iFemtoCell, Milesight Industrial Gateway, Sierra Wireless AirLink.<br>İnternet kopsa bile verileri geçici olarak depolar ve internet gelince buluta yollar.)',
      'Eski Tip Makinelerin Bağlanması (Üretici & Ürün Çözümleri : <br>Moxa NPort Serial-to-Ethernet, Advantech ADAM Modules, Siemens LOGO! 8, Brainboxes.<br>Eski tip makinelerin yeni sistemlere bağlanmasını sağlar.)',
      'Maliyet Optimizasyonu (Üretici & Ürün Çözümleri : <br>AWS IoT Greengrass, Azure IoT Edge, ThingsBoard Edge, Litmus Edge.<br>Buluta giden veri miktarını azalttığı için maliyeti düşürür.)',
      'Düşük Gecikme Süresi (Latency) (Üretici & Ürün Çözümleri : <br>Siemens Edge Industrial, Advantech WISE-PaaS, Cisco Edge Intelligence, Red Hat Edge.<br>Gecikme süresini (latency) en aza indirir.)'
    ],
    slides: [
      {
        title: 'Ağ Geçitleri (Gateways)',
        desc: 'Protokol çevrimi, edge computing, endüstriyel güvenlik şifreleme ve kesintisiz veri aktarım ağ geçitleri.',
        image: 'assets/images/iot_gateways_network.jpg'
      }
    ]
  },
  e_iot4: {
    badge: 'IOT / CLOUD & DASHBOARD',
    title: 'Bulut ve Yazılım',
    cover: 'assets/images/iot_cloud_software.jpg',
    desc: 'Cihaz/sensör katmanı, MQTT/HTTP protokolleri, bulut bilişim ve canlı izleme arayüz panelleri.',
    specs: [
      'Cihaz ve Sensör Katmanı (Üretici & Ürün Çözümleri : <br>IFM Efector, Bosch Sensortec, STMicroelectronics, Turck, Honeywell Sensing.<br>Veri üreten fiziksel donanımlar.)',
      'Ağ ve İletişim Protokolleri (Üretici & Ürün Çözümleri : <br>EMQX MQTT Broker, Eclipse Mosquitto, HiveMQ, Cisco IoT Networking, Teltonika.<br>MQTT, HTTP gibi yöntemlerle veri aktarımı.)',
      'Bulut Bilişim (Üretici & Ürün Çözümleri : <br>AWS IoT Core, Microsoft Azure IoT Hub, Google Cloud IoT, Siemens MindSphere.<br>Verilerin depolandığı ve analiz edildiği esnek altyapılar.)',
      'Uygulama Yazılımı (Üretici & Ürün Çözümleri : <br>ThingsBoard IoT Platform, Grafana IoT Dashboards, PTC ThingWorx, Losant IoT.<br>Kullanıcıların verileri takip ettiği arayüz panelleri.)',
      'Gerçek Zamanlı İzleme (Üretici & Ürün Çözümleri : <br>Datadog IoT Monitoring, Dynatrace Real-Time Analytics, Siemens WinCC OA, ThingsBoard Live.<br>Cihazların anlık takibi.)',
      'Ölçeklenebilirlik (Üretici & Ürün Çözümleri : <br>Kubernetes Edge Clusters, AWS Greengrass Fleet, Azure IoT Edge Deployment, Docker IoT.<br>Kolayca büyütülebilir sistem altyapısı.)',
      'Veri Analizi (Üretici & Ürün Çözümleri : <br>AWS IoT Analytics, Azure Stream Analytics, Snowflake IoT Data Lake, Databricks.<br>Üretilen veriden değer çıkarma.)',
      'Maliyet Tasarrufu (Üretici & Ürün Çözümleri : <br>Litmus Edge Computing, AWS Serverless IoT, Azure Pay-As-You-Go, ThingsBoard Cloud.<br>Donanım ve operasyonel yükün azalması.)'
    ],
    slides: [
      {
        title: 'Bulut ve Yazılım',
        desc: 'Cihaz/sensör katmanı, MQTT/HTTP iletişim protokolleri, esnek bulut altyapıları ve canlı dashboard arayüz panelleri.',
        image: 'assets/images/iot_cloud_software.jpg'
      }
    ]
  },
  e_iot5: {
    badge: 'IIOT & INDUSTRY 4.0',
    title: 'Endüstri ve Üretim (IIoT)',
    cover: 'assets/images/iiot_factory_robotics.jpg',
    desc: 'Akıllı sensörler, endüstriyel ağlar, veri analitiği, edge computing ile kestirimci bakım, kalite kontrol ve iş güvenliği.',
    specs: [
      'Akıllı Sensörler (Üretici & Ürün Çözümleri : <br>IFM Efector, Turck, Pepperl+Fuchs, Sick AG, Banner Engineering.<br>Sıcaklık, basınç ve titreşim gibi fiziksel durumları ölçer.)',
      'Ağ ve Bağlantı (Üretici & Ürün Çözümleri : <br>Moxa Industrial Networking, Siemens SCALANCE, Cisco Industrial Ethernet, HMS Anybus.<br>Cihazların birbiriyle ve bulut sistemleriyle konuşmasını sağlar.)',
      'Veri Analitiği (Üretici & Ürün Çözümleri : <br>Siemens MindSphere Analytics, PTC ThingWorx Analytics, GE Digital Predix, SAP Analytics.<br>Toplanan büyük veriyi işleyerek anlamlı sonuçlar çıkarır.)',
      'Bulut ve Uç Bilişim (Üretici & Ürün Çözümleri : <br>Advantech Edge, Siemens Industrial Edge, AWS IoT Greengrass, Azure IoT Edge.<br>Verilerin depolanması ve hızlıca karar alınması için kullanılır.)',
      'Kestirimci Bakım (Üretici & Ürün Çözümleri : <br>SKF Insight, Schaeffler OPTIME, Siemens Anomaly Detection, ABB Ability Predictive.<br>Makineler bozulmadan önce sorunları haber verir ve duruş sürelerini azaltır.)',
      'Enerji Tasarrufu (Üretici & Ürün Çözümleri : <br>Schneider EcoStruxure Resource Advisor, Siemens Power Manager, Janitza EMS.<br>Kaynakların verimli kullanılmasını sağlar.)',
      'Kalite Kontrol (Üretici & Ürün Çözümleri : <br>Cognex Industrial Vision, Keyence Machine Vision, Omron Microscan, Basler.<br>Hatalı üretimleri anında fark edip düzeltir.)',
      'İş Güvenliği (Üretici & Ürün Çözümleri : <br>Honeywell Safety Suite, Sick Safety Systems, Pilz Safety Automation, Rockwell GuardMaster.<br>Riskli alanları sürekli izleyerek kazaları önler.)'
    ],
    slides: [
      {
        title: 'Endüstri ve Üretim (IIoT)',
        desc: 'Akıllı fabrika otonom robotları, kestirimci bakım, kalite kontrol ve yüksek iş emniyeti endüstriyel otomasyon çözümleri.',
        image: 'assets/images/iiot_factory_robotics.jpg'
      }
    ]
  },
  e_iot6: {
    badge: 'SMART HEALTHCARE / IOMT',
    title: 'Sağlık Sektörü',
    cover: 'assets/images/iomt_smart_healthcare.jpg',
    desc: 'Giyilebilir cihazlar, tıbbi sensörler, edge bilişim, yapay zeka, uzaktan hasta takibi, veri güvenliği ve FHIR uyumluluğu.',
    specs: [
      'Giyilebilir Cihazlar (Üretici & Ürün Çözümleri : <br>Apple HealthKit Pro, Garmin Health, Omron Healthcare, Dexcom Continuous Glucose, BioIntelliSense.<br>Akıllı saatler ve tansiyon aletleri gibi araçlar nabız ve şeker gibi verileri toplar.)',
      'Tıbbi Sensörler (Üretici & Ürün Çözümleri : <br>Medtronic Guardian, GE HealthCare CARESCAPE, Philips Patient Monitoring, Sensirion Medical.<br>Vücuda yerleştirilen veya eşyalara konan cihazlar hayati belirtileri ölçer.)',
      'Bulut ve Kenar Bilişim (Edge Computing) (Üretici & Ürün Çözümleri : <br>AWS HealthLake, Microsoft Cloud for Healthcare, Google Cloud Healthcare API, Siemens Healthineers.<br>Toplanan büyük verileri hızlıca işler ve saklar.)',
      'Yapay Zeka (AI) (Üretici & Ürün Çözümleri : <br>IBM Watson Health, GE HealthCare Edison AI, Philips HealthSuite AI, Siemens syngo.via.<br>Verileri analiz ederek hastalık risklerini önceden tahmin eder.)',
      'Uzaktan Hasta Takibi (Üretici & Ürün Çözümleri : <br>Philips RPM Platform, ResMed Remote Care, Vivify Health (Optum), Medtronic CareLink.<br>Kronik hastalar evlerinden ayrılmadan doktorlar tarafından izlenir.)',
      'Hızlı Müdahale (Üretici & Ürün Çözümleri : <br>Ascom Myco Hospital Emergency, Vocera Smart Badges, Everbridge Critical Event Management.<br>Acil bir durumda sistemler doktora veya hastaneye hemen haber verir.)',
      'Kişiselleştirilmiş Tedavi (Üretici & Ürün Çözümleri : <br>Epic Systems MyChart, Cerner Millennium, Allscripts FollowMyHealth, Roche Digital Health.<br>Her hastanın verisine özel iyileştirme planları yapılır.)',
      'Veri Güvenliği (Üretici & Ürün Çözümleri : <br>Fortinet Medical Security, Palo Alto Networks IoMT Security, Claroty Medigate, Forescout.<br>Hasta bilgilerinin internet üzerinden akması siber saldırı riski taşır.)',
      'Gizlilik (Üretici & Ürün Çözümleri : <br>IBM Security Guardium, OneTrust Healthcare Privacy, Varonis Data Security Platform.<br>Hassas sağlık verilerinin üçüncü taraflardan korunması gerekir.)',
      'Cihaz Uyumluluğu (Üretici & Ürün Çözümleri : <br>InterSystems IRIS for Health, Infor Cloverleaf, Redox Engine, HL7 / FHIR Standards.<br>Farklı üreticilerin aletlerinin birbiriyle veri paylaşması zor olabilir.)'
    ],
    slides: [
      {
        title: 'Sağlık Sektörü (Akıllı Sağlık IoMT)',
        desc: 'IoMT tıbbi sensörler, giyilebilir cihazlar, yapay zeka analizleri, uzaktan hasta takibi ve siber güvenlik altyapıları.',
        image: 'assets/images/iomt_smart_healthcare.jpg'
      }
    ]
  },
  e_iot7: {
    badge: 'SMART AGRICULTURE & AGTECH',
    title: 'Tarım ve Hayvancılık (Akıllı Tarım)',
    cover: 'assets/images/smart_agriculture_drone.jpg',
    desc: 'Toprak nem sensörleri, sera iklimlendirme, zirai İHA, akıllı tasmalar, otomatik yemleme, ahır kontrolü ve erken teşhis.',
    specs: [
      'Toprak Nem Sensörleri & Otomatik Sulama (Üretici & Ürün Çözümleri : <br>Sentek Sensor Technologies, Meter Group TEROS, CropX Soil Sensor, Netafim.<br>Toprak nem verilerine ve su ihtiyacına göre otomatik sulama ve gübreleme.)',
      'Sera Otomasyonu & İklimlendirme (Üretici & Ürün Çözümleri : <br>Priva Connext, Ridder Climate Control, Hoogendoorn Growth Management.<br>Sera içi sıcaklık, nem, CO2 ve ışık seviyesinin hassas otonom kontrolü.)',
      'Zirai İHA / Drone Spreyleme (Üretici & Ürün Çözümleri : <br>DJI Agras T40 / T30, XAG Agricultural Drones, PrecisionHawk, Yamaha RMAX.<br>Otonom zirai dronlar ile haritalama, bitki sağlığı tespiti ve nokta atışı ilaçlama.)',
      'Akıllı Tasmalar ve Küpeler (Üretici & Ürün Çözümleri : <br>Allflex Livestock Intelligence, CowManager Sensor, Nedap CowControl, Moocall.<br>Hayvanların ateşini, adım sayısını ve yerini takip eder.)',
      'Otomatik Yemleme (Üretici & Ürün Çözümleri : <br>Lely Vector Automatic Feeding, DeLaval OptiFeeder, TRIOLIET Automatic, GEA DairyFeed.<br>Hayvanlara en uygun miktarda ve zamanda yem verir.)',
      'Ahır Kontrolü (Üretici & Ürün Çözümleri : <br>SKOV Climate Control, Big Dutchman Barn Systems, Munters Ventilation, DeLaval.<br>İçerideki hava kalitesini, sıcaklığı ve nemi dengede tutar.)',
      'Erken Teşhis (Üretici & Ürün Çözümleri : <br>HerdX Livestock AI, Smaxtec Bolus Health, DeLaval DelPro BioModel, Afimilk.<br>Hastalık belirtilerini erkenden fark edip veterinere haber verir.)',
      'Az Maliyet (Üretici & Ürün Çözümleri : <br>John Deere Precision Ag, Climate FieldView, Trimble Agriculture, Valmont.<br>Su, elektrik, ilaç ve yem giderlerini azaltır.)',
      'Çok Ürün (Üretici & Ürün Çözümleri : <br>Topcon Agriculture, Raven Industries, Kubota Smart Ag, AGCO Fuse Precision.<br>Kaliteli ve yüksek miktarda mahsul elde edilmesini sağlar.)',
      'Kolay Takip (Üretici & Ürün Çözümleri : <br>FarmLogs, Agrivi Farm Management, Granular (Corteva), xarvio Digital Farming.<br>Çiftçilerin her şeyi telefon veya bilgisayardan yönetmesine yardım eder.)'
    ],
    slides: [
      {
        title: 'Tarım ve Hayvancılık (Akıllı Tarım & AgTech)',
        desc: 'Zirai dronlar, toprak nem sensörleri, akıllı hayvan tasmaları, otomatik yemleme ve çiftlik yönetim yazılımları.',
        image: 'assets/images/smart_agriculture_drone.jpg'
      }
    ]
  },
  e_iot8: {
    badge: 'SMART CITIES & MOBILITY',
    title: 'Akıllı Şehirler ve Ulaşım',
    cover: 'assets/images/smart_cities_mobility.jpg',
    desc: 'Dinamik sinyalizasyon, akıllı otopark, canlı toplu taşıma takibi, filo yönetimi, EV şarjı, otonom araçlar ve yapay zeka trafik analitiği.',
    specs: [
      'Dinamik Sinyalizasyon (Üretici & Ürün Çözümleri : <br>Yunex Traffic (Siemens), Swarco Traffic Management, Kapsch TrafficCom, Econolite.<br>Yoğunluğa göre değişen trafik ışıkları.)',
      'Akıllı Otoparklar (Üretici & Ürün Çözümleri : <br>Nedap Identification Systems, Siemens Smart Parking, Cleverciti, Bosch Smart Parking.<br>Boş yer gösteren sensör sistemleri.)',
      'Anlık Takip (Üretici & Ürün Çözümleri : <br>Axis Communications, Hikvision ITS, Dahua Smart Transportation, FLIR ITS Cameras.<br>Kameralar ve IoT sensörleri ile 7/24 denetim.)',
      'Ortak Bilet ve Rota (Üretici & Ürün Çözümleri : <br>Conduent Transportation, Cubic Transportation Systems, INIT Mobile Ticketing, Kentkart.<br>Tüm araçların tek kartla veya mobil uygulamayla yönetilmesi.)',
      'Canlı Konum (Üretici & Ürün Çözümleri : <br>Transit App, Moovit Mobility Platform, Trapeze Group, IVU Traffic Technologies.<br>Otobüs ve metro varış saatlerinin anlık gösterimi.)',
      'Filo Yönetimi (Üretici & Ürün Çözümleri : <br>Geotab Fleet Management, Samsara Mobility, Teltonika Telematics, Trimble Transportation.<br>Araç hız ve güzergah kontrolü ile verimlilik.)',
      'Elektrikli Araçlar & Şarj (Üretici & Ürün Çözümleri : <br>ABB E-mobility, Schneider ChargePoint, Siemens SICHARGE, Bird / Lime Platforms.<br>Şarj istasyonları ve paylaşımlı e-scooter/bisikletler.)',
      'Otonom Sistemler (Üretici & Ürün Çözümleri : <br>EasyMile Autonomous Shuttles, Navya Autonom, Zoox, Baidu Apollo Bus.<br>Sürücüsüz toplu taşıma araçları denemeleri.)',
      'Veri Analitiği (Üretici & Ürün Çözümleri : <br>INRIX Traffic Analytics, TomTom City, HERE Mobility Platform, Google Cloud Traffic AI.<br>Yapay zeka ile gelecek trafik yoğunluğunu tahmin etme.)'
    ],
    slides: [
      {
        title: 'Akıllı Şehirler ve Ulaşım',
        desc: 'Dinamik kavşak kontrolü, akıllı otopark, ortak mobil biletleme, EV şarj ağları ve sürücüsüz toplu taşıma otomasyonu.',
        image: 'assets/images/smart_cities_mobility.jpg'
      }
    ]
  },
  e_b1: {
    badge: 'HARDWARE & INFRASTRUCTURE',
    title: 'Altyapı Donanım Bileşenleri Tedariği',
    cover: 'assets/images/infra_hardware_supply.jpg',
    desc: 'Kurumsal sunuculardan ağ ve güvenlik cihazlarına, KVM/PDU/UPS sistemlerinden istemci donanımlarına kadar uçtan uca yüksek performanslı IT altyapı donanım tedariği ve entegrasyonu.',
    specs: [
      'Sunucu ve Veri Depolama: Fiziksel sunucular, blade sistemler, NAS/SAN depolama üniteleri ve disk dizileri. (Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, NetApp FAS/AFF, Pure Storage FlashArray, IBM Storage)',
      'Ağ ve Bağlantı Cihazları: Router (yönlendirici), Switch (anahtar), Firewall (güvenlik duvarı), Access Point ve fiber optik kablolama. (Cisco Catalyst/Nexus, Fortinet FortiGate, Palo Alto Networks, Juniper Networks, Aruba, Huawei CloudEngine, Ruckus)',
      'İstemci Donanımları: Kurumsal masaüstü bilgisayarlar, dizüstü bilgisayarlar, iş istasyonları (Workstation) ve terminaller. (Dell OptiPlex/Precision/Latitude, HP ZBook/EliteBook, Lenovo ThinkPad/ThinkStation, Apple Mac)',
      'KVM, PDU, UPS, PUE Sistemleri: Akıllı yönetilebilir PDU, KVM over IP switchler, kesintisiz güç kaynakları (UPS) ve PUE izleme sistemleri. (APC by Schneider Electric, Vertiv Liebert, Eaton, Tripp Lite, Raritan, CyberPower)',
      'Tedarik Süreci Aşamaları (Çözüm ve Hizmetler : <br>İhtiyaç Analizi : Kurumun mevcut kapasitesi ve gelecek projeksiyonları çıkarılır.<br>Marka ve Model Seçimi : Fiyat/performans, garanti koşulları ve yedek parça bulunabilirliği değerlendirilir.<br>Teklif ve Satın Alma : Yetkili distribütörlerden veya üreticilerden en uygun maliyetli teklifler toplanır.<br>Lojistik ve Entegrasyon : Cihazların güvenli taşınması, montajı ve mevcut sistemle uyumlaştırılması sağlanır.)'
    ]
  },
  e_b2: {
    badge: 'CLOUD & VIRTUALIZATION',
    title: 'Bulut & Network & Sanallaştırma Çözümleri',
    cover: 'assets/images/cloud_network_virt.jpg',
    desc: 'Yönetilen hizmetler, yüksek performanslı bilgi işlem (HPC), iş sürekliliği/DR yedekleme çözümleri, SD-WAN & güvenlik ağ mimarileri ile SDDC bulut sanallaştırma altyapıları.',
    specs: [
      'Yönetilen Hizmetler : NOC, SOC, Managed Services, Trafik, Enerji, Soğutma, Kabinet, Sunucu ölçeklendirme. (Üretici & Ürün Çözümleri : <br>7/24 NOC & SOC Ağ ve Güvenlik İzleme: Kesintisiz şebeke altyapısı, anlık trafik analizi ve 7/24 tehdit yönetimi.<br>Veri Merkezi İklimlendirme ve Enerji Yönetimi: Kabinet bazlı yüksek hassasiyetli soğutma ve kesintisiz enerji altyapısı.<br>Sunucu ve Donanım Ölçeklendirme: Esnek x86/x64 fiziki ve sanal sunucu kaynak tahsisi ve kapasite artırımı.<br>Uçtan Uca Yönetilen Servis Mimarisi: Dedicated Server, Sanal Sunucu (VPS/VDS) ve Co-Location barındırma çözümleri.)',
      'Yüksek Performanslı Sunucu : CPU / GPU / TPU / NPU / DPU / QPU compute ölçeklendirme. (NVIDIA H100/H200/B200 Grace Hopper, AMD EPYC/Instinct MI300X, Intel Xeon 6/Gaudi 3, Google TPU v5p, AWS Trainium/Inferentia)',
      'Yedekleme Hizmetleri : BackUp / İş sürekliliği ve Felaket Kurtarma DR çözümleri. (Veeam Data Platform, Commvault Cloud, Cohesity DataProtect, Rubrik Security Cloud, Zerto Site Recovery, Dell PowerProtect DD)',
      'Network Çözümleri : SD-WAN, WAF, MPLS, VPN, VoIP, NLB, IPsec, WLAN, Firewall, Router, Switch, Access Point, UTM. (Fortinet FortiGate/FortiManager, Palo Alto PAN-OS/Prisma SD-WAN, Cisco Meraki/Viptela, F5 BIG-IP WAF/LTM, VMware Velocloud, Check Point Quantum)',
      'Sanallaştırma Çözümleri : SDDC, SD Server/Storage/Network & VDI, Private/Public Cloud. (VMware vSphere/vSAN/NSX-T, Nutanix Cloud Infrastructure, Microsoft Azure Stack HCI, Red Hat OpenShift/OpenStack, AWS Outposts, Cisco HyperFlex)'
    ]
  },
  e_b4: {
    badge: 'WHITE SPACE & DCIM',
    title: 'Veri Merkezi Beyaz Alan (White Space) Yönetimi & DCIM',
    cover: 'assets/images/gallery_datacenter_v2.jpg',
    desc: 'Sıcak/soğuk koridor tasarımı, PUE enerji ve soğutma verimliliği optimizasyonu, DCIM altyapı yazılımları ve beyaz alan fiziksel güvenlik yönetimi.',
    specs: [
      'Kapasite ve Yerleşim: Kabin (Rack) yerleşimi, ağırlık sınırları ve taban zemin altı kablolama düzeni, tavan busbar sistemleri ve Top of Rack (ToR) SW Data Center çözümleri. (APC NetShelter SX/VX, Vertiv VR Rack, Eaton RS Enclosure, EAE Busbar, Cisco Nexus 9300 ToR Switch, Arista 7050X3)',
      'İklimlendirme & PUE Optimizasyonu: Sıcak/soğuk koridor tasarımı, sıcaklık/nem kontrolü, PUE hedefleri ve kabin tipi sıvı soğutma entegrasyonu. (Vertiv Liebert CRV/PDX, Schneider Uniflair InRow, Stulz CyberAir, CoolIT Direct Liquid Cooling, Rittal LCP Inline)',
      'Enerji İzleme & Güç: Güç tüketimi, PUE (Güç Kullanımı Etkinliği) canlı izleme, akıllı PDU ve yedekli A+B enerji mimarisi. (APC AP8959 Managed PDU, Vertiv Geist GU2 PDU, Eaton EATS Transfer Switch, Socomec Masterys UPS, Janitza UMG Power Monitor)',
      'DCIM & Güvenlik: Veri Merkezi Altyapı Yönetimi (DCIM) yazılımları, biyometrik geçiş kontrolü, CCTV ve erken uyarı yangın algılama. (Schneider EcoStruxure IT DCIM, Vertiv Trellis Platform, Sunbird DCIM, Honeywell Pro-Watch, Axis Communications IP CCTV, Xtralis VESDA Early Fire Detection)',
      'Kapsayıcı Sistemler: Modüler & konteyner tipi taşınabilir DRS veri merkezleri, ISO konteyner ve Shell&Core kabinet ünite tasarımları. (Schneider EcoStruxure Modular Data Center, Vertiv SmartMod, Huawei FusionModule2000, Rittal RiMatrix Micro Data Center)'
    ]
  },
};

// ── Service Slide Modal — One-Page Horizontal Slide Design ────────────────
let currentSvcSlideIndex = 0;
let totalSvcSlides = 0;

function openServiceModal(id) {
  const data = SERVICES_DATA[id];
  if (!data) return;

  const track = document.getElementById('svc-slider-track');
  const indicators = document.getElementById('svc-slide-indicators');
  track.innerHTML = '';
  indicators.innerHTML = '';

  // Build spec slides array: ALWAYS use data.specs for text content to ensure formatted Üretici & Ürün / Çözüm ve Hizmetler render on all cards, while pulling custom images from data.slides
  let specSlides = [];
  if (data.specs && data.specs.length > 0) {
    specSlides = data.specs.map((specText, idx) => {
      let img = data.cover;
      if (data.slides && data.slides.length > 0) {
        if (data.slides.length === data.specs.length + 1 && data.slides[idx + 1] && data.slides[idx + 1].image) {
          img = data.slides[idx + 1].image;
        } else if (data.slides[idx] && data.slides[idx].image) {
          img = data.slides[idx].image;
        }
      }
      return {
        title: specText,
        image: img
      };
    });
  } else if (data.slides) {
    specSlides = data.slides;
  }

  totalSvcSlides = 1 + specSlides.length;
  currentSvcSlideIndex = 0;

  // ── Slide 0: Overview ──────────────────────────────────────────────
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
        <button class="svc-vcard-btn primary" onclick="showVCard('ilker')">📋 Direct Lead vCard — İlker ATASOY</button>
        <button class="svc-vcard-btn secondary" onclick="showVCard('eylul')">📋 Architecture vCard — Eylül YILMAZ</button>
      </div>
    </div>
    ${specSlides.length > 0 ? `<div class="svc-swipe-hint">${currentLang === 'en' ? 'Technical Specifications ❯' : 'Teknik Özellikler ❯'}</div>` : ''}
  `;
  track.appendChild(overviewSlide);

  // ── Slides 1-N: Spec Slides ────────────────────────────────────────
  specSlides.forEach((slide, idx) => {
    const specSlide = document.createElement('div');
    specSlide.className = 'svc-slide svc-slide--spec';

    let titleHtml = slide.title;
    if (slide.title && slide.title.includes(':')) {
      const colonIndex = slide.title.indexOf(':');
      const prefix = slide.title.substring(0, colonIndex + 1);
      const rest = slide.title.substring(colonIndex + 1).trim();
      titleHtml = `<span class="svc-spec-title-prefix">${prefix}</span> <span class="svc-spec-title-rest">${rest}</span>`;
    }

    // Check if title contains vendor/product in parentheses at the end (supports nested parens)
    let vendorText = '';
    let cleanTitleHtml = titleHtml;
    const parenMatch = slide.title.match(/\s*\(((?:Üretici & Ürün Çözümleri|Çözüm ve Hizmetler|[\w\s\&\/]+:).*)\)\s*$/) || slide.title.match(/\s*\(([^()]+)\)\s*$/);
    if (parenMatch) {
      vendorText = parenMatch[1];
      const fullParenStr = parenMatch[0];
      const titleWithoutParen = slide.title.slice(0, slide.title.length - fullParenStr.length).trim();
      if (titleWithoutParen.includes(':')) {
        const colonIndex = titleWithoutParen.indexOf(':');
        const prefix = titleWithoutParen.substring(0, colonIndex + 1);
        const rest = titleWithoutParen.substring(colonIndex + 1).trim();
        cleanTitleHtml = `<span class="svc-spec-title-prefix">${prefix}</span> <span class="svc-spec-title-rest">${rest}</span>`;
      } else {
        cleanTitleHtml = titleWithoutParen;
      }
    }

    let labelName = currentLang === 'en' ? 'Manufacturer & Product Solutions:' : 'Üretici & Ürün Çözümleri:';
    if (vendorText) {
      if (vendorText.includes('Çözüm ve Hizmetler') || vendorText.includes('Solutions & Services')) {
        labelName = currentLang === 'en' ? 'Solutions & Services:' : 'Çözüm ve Hizmetler :';
        vendorText = vendorText.replace(/(?:Çözüm ve Hizmetler|Solutions & Services)\s*:/g, '').trim();
      } else {
        vendorText = vendorText.replace(/(?:Üretici & Ürün Çözümleri|Manufacturer & Product Solutions)\s*:/g, '').trim();
      }
      // Remove any leading numbers like 1., 2., 1-, 2- from vendor text lines
      vendorText = vendorText.replace(/(?:<br\s*\/?>|\n|^)\s*\d+[\.\-\)]\s*/gi, '<br>').replace(/^(?:<br\s*\/?>|\s)+/i, '').trim();
    }
    const finalDesc = vendorText ? `<strong>${labelName}</strong><br>${vendorText}` : '';

    // Remove leading numbers from cleanTitleHtml if any remain
    cleanTitleHtml = cleanTitleHtml.replace(/^\s*\d+[\.\-\)]\s*/, '');

    const descHtml = finalDesc ? `<p class="svc-spec-desc">${finalDesc}</p>` : '';
    specSlide.innerHTML = `
      <div class="svc-slide-bg" style="background-image:url('${slide.image}')"></div>
      <div class="svc-slide-overlay"></div>
      <div class="svc-slide-spec-body">
        <div class="svc-spec-counter">${currentLang === 'en' ? 'TECHNICAL SPECIFICATION' : 'TEKNİK ÖZELLİK'} ${idx + 1} / ${specSlides.length}</div>
        <h4 class="svc-spec-title">${cleanTitleHtml}</h4>
        ${descHtml}
        <div class="svc-vcard-row" style="margin-top: 1.2rem;">
          <button class="svc-vcard-btn primary" onclick="showVCard('ilker')">📋 Direct Lead vCard — İlker ATASOY</button>
          <button class="svc-vcard-btn secondary" onclick="showVCard('eylul')">📋 Architecture vCard — Eylül YILMAZ</button>
        </div>
      </div>
    `;
    track.appendChild(specSlide);
  });

  // ── Indicators ─────────────────────────────────────────────────────
  for (let i = 0; i < totalSvcSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'svc-indicator-dot' + (i === 0 ? ' home-dot active' : '');
    dot.setAttribute('aria-label', i === 0 ? 'Ana Sayfa' : `Teknik Özellik ${i}`);
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
      { label: 'Yıl', val: '2025' }
    ]
  },
  {
    src: 'assets/images/gallery_factory_v2.jpg',
    tag: 'İZMİR / TÜRKİYE — AĞIR SANAYİ',
    title: 'Ağır Sanayi & Üretim Tesisleri',
    caption: '120.000 m² kapalı alana sahip yüksek teknolojili ağır sanayi üretim tesisi, otomasyon altyapısı ve imalat hatları.',
    specs: [
      { label: 'Lokasyon', val: 'İzmir, Türkiye' },
      { label: 'Kapalı Alan', val: '000 m²' },
      { label: 'Kapsam', val: 'Ağır Sanayi & Fabrika İnşaatı' },
      { label: 'Yıl', val: '2025' }
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
      { label: 'Yıl', val: '2024' }
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
      { label: 'Kapasite', val: '000 Ton/Yıl İşleme' },
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
      { label: 'İnşaat Alanı', val: '000 m²' },
      { label: 'Karma Konsept', val: 'Rezidans + A+ Ofis + Retail' },
      { label: 'Yıl', val: '2025' }
    ]
  },
  {
    src: 'assets/images/gallery_foundry_1785092866525.png',
    tag: 'BURSA / TÜRKİYE — AĞIR SANAYİ',
    title: 'Ağır Sanayi Dökümhane Kompleksi',
    caption: 'Yüksek sıcaklık fırınları, özel havalandırma-baca arıtma sistemleri ve ağır yük zeminleri içeren endüstriyel döküm tesisi.',
    specs: [
      { label: 'Lokasyon', val: 'Bursa, Türkiye' },
      { label: 'Kapasite', val: '000 Ton/Yıl Döküm' },
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
let activeLightboxMode = 'gallery';
let activeLightboxIdx = 0;

function renderLightboxContent(item) {
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
}

function openLightbox(idx) {
  activeLightboxMode = 'gallery';
  activeLightboxIdx = idx;
  renderLightboxContent(galleryImages[activeLightboxIdx]);
  document.getElementById('lightbox-dialog').showModal();
}

function closeLightboxDialog() {
  document.getElementById('lightbox-dialog').close();
}

function navigateLightbox(dir) {
  if (activeLightboxMode === 'technology') {
    activeLightboxIdx = (activeLightboxIdx + dir + techServices.length) % techServices.length;
    openTechModal(activeLightboxIdx);
  } else if (activeLightboxMode === 'capital') {
    activeLightboxIdx = (activeLightboxIdx + dir + capitalServices.length) % capitalServices.length;
    openCapitalModal(activeLightboxIdx);
  } else if (activeLightboxMode === 'energy') {
    activeLightboxIdx = (activeLightboxIdx + dir + energyProducts.length) % energyProducts.length;
    renderLightboxContent(energyProducts[activeLightboxIdx]);
  } else {
    activeLightboxIdx = (activeLightboxIdx + dir + galleryImages.length) % galleryImages.length;
    renderLightboxContent(galleryImages[activeLightboxIdx]);
  }
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
      { label: 'Batarya Depolama', val: '%68 LFP Akıllı Depolama (13.8 kWh)' },
      { label: 'EV Şarj Yönetimi', val: '1.3 kW Smart EV Charger' },
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
      { label: 'Depolama', val: 'Ahşap Giydirmeli Konteyner BESS' },
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
      { label: 'Katkı', val: '65.000 Ton CO₂ Tasarrufu' }
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
      { label: 'Ekran Mimarisi', val: 'Merkezi Video Wall & Otomasyon' },
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
      { label: 'Yedeklilik', val: 'N+2 Redundant Chiller & Kuleler' },
      { label: 'PUE Oranı', val: '< 1.15 PUE Verimlilik' },
      { label: 'Tesisat', val: 'MEP Paslanmaz Borulama' }
    ]
  }
];


// ── Capital Services Modal ──────────────────────────────────────────────────
const capitalServices = [
  {
    tag: 'FİNANSMAN & KREDİ',
    title: 'Finansman ve Kredi Yapılandırması',
    caption: 'Banka proje finansmanı organizasyonu, leasing ve hakediş bazlı finansman modelleri ile projelerinizin sermaye ve borç yapısını optimize ediyoruz.',
    specs: [
      { label: 'Banka Finansmanı', val: 'Proje Kredisi & Sendikasyon' },
      { label: 'Leasing Organizasyonu', val: 'GES, RES, BESS & Ağır Ekipman' },
      { label: 'Hakediş Modeli', val: 'Nakit Akış & Performans Odaklı' },
      { label: 'Danışmanlık', val: 'Uçtan Uca Finansal Mimari' }
    ]
  },
  {
    tag: 'YATIRIM & SPV',
    title: 'Yatırım ve Yapılandırma',
    caption: 'GYO iş birlikleri, girişim sermayesi ilişkileri ve projenize özel SPV (Özel Amaçlı Şirket) kurulumu ile güvenli yatırım platformu sunuyoruz.',
    specs: [
      { label: 'GYO Entegrasyonu', val: 'Gayrimenkul Yatırım Ortaklıkları' },
      { label: 'Girişim Sermayesi', val: 'GSYF & Fon Entegrasyonu' },
      { label: 'SPV Kurulumu', val: 'Proje Bazlı Şirket Mimarisi' },
      { label: 'Yatırımcı İlişkileri', val: 'Şeffaf Raporlama & Gelir Paylaşımı' }
    ]
  },
  {
    tag: 'RİSK & DANIŞMANLIK',
    title: 'Risk ve Danışmanlık',
    caption: 'Nakit akışı modelleme, sigorta & teminat çözümleri ve finansal fizibilite danışmanlığı ile projelerinizin risk skorunu kontrol altına alıyoruz.',
    specs: [
      { label: 'Nakit Akışı', val: 'Duyarlılık & Risk Simülasyonu' },
      { label: 'Sigorta & Teminat', val: 'CAR, EAR & Kefalet Senedi (Surety)' },
      { label: 'Fizibilite', val: 'Finansal Modelleme & ROI' },
      { label: 'Uyum', val: 'Uluslararası Risk Standartları' }
    ]
  }
];

function openCapitalModal(idx) {
  activeLightboxMode = 'capital';
  activeLightboxIdx = idx;
  const item = capitalServices[activeLightboxIdx];
  if (!item) return;

  document.getElementById('lightbox-img').src = 'assets/images/investment_finance_real_estate_1785010111511.png';
  document.getElementById('lightbox-tag').textContent = item.tag;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-caption').textContent = item.caption;

  const specsGrid = document.getElementById('lightbox-specs-grid');
  if (specsGrid) {
    specsGrid.innerHTML = '';
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

  document.getElementById('lightbox-dialog').showModal();
}


// ── Technology Services Modal ──────────────────────────────────────────────
const techServices = [
  {
    tag: 'DİJİTAL HAKEDİŞ',
    title: 'Dijital Hakediş & İş Akışları',
    caption: 'Karmaşık taşeron ve malzeme süreçlerini otomatize ederek sıfır hata ile anlık, şeffaf hakediş onay ve ödeme altyapıları sunuyoruz.',
    specs: [
      { label: 'Süreç Otomasyonu', val: 'Taşeron & Tedarik Hakedişleri' },
      { label: 'Hata Oranı', val: 'Sıfır Hata Şeffaf Onay' },
      { label: 'Entegrasyon', val: 'ERP & Muhasebe Bağlantısı' },
      { label: 'Hız', val: 'Anlık Onay & Canlı Raporlama' }
    ]
  },
  {
    tag: 'YAPAY ZEKÂ',
    title: 'Yapay Zekâ & Kestirimci Analiz',
    caption: 'Şantiye verimliliğini makine öğrenmesi ile analiz ediyor, iş güvenliği risklerini ve olası maliyet artışlarını önceden tespit ediyoruz.',
    specs: [
      { label: 'Analiz Tipi', val: 'Kestirimci Yapay Zekâ' },
      { label: 'Risk Tahmini', val: 'İSG & Bütçe Aşım Önleme' },
      { label: 'Veri Kaynağı', val: 'Canlı Saha Telemetrisi' },
      { label: 'Raporlama', val: 'Otonom AI Yönetici Özetleri' }
    ]
  },
  {
    tag: 'BIM 5D',
    title: 'BIM 5D Entegrasyonu & Dijital İkiz',
    caption: '5D dijital ikizler oluşturarak yapı ömrü boyunca kusursuz veri yönetimi, çakışma tespiti ve disiplinler arası proje koordinasyonu.',
    specs: [
      { label: 'LOD Standardı', val: 'LOD 400 Uygulama Detayı' },
      { label: 'Model Tipi', val: '5D BIM & Canlı Dijital İkiz' },
      { label: 'Çakışma Tespiti', val: 'Otomatik Clash Detection' },
      { label: 'Standart', val: 'ISO 19650 BIM Standardı' }
    ]
  },
  {
    tag: 'YAKIN PLATFORM',
    title: 'Yakın Platform SaaS & Saha Koordinasyonu',
    caption: 'İleri seviye proje yönetim yazılımımız ile tüm mühendislik, satınalma, bütçe ve saha koordinasyonu tek ekranda.',
    specs: [
      { label: 'Erişim', val: 'Web & Mobil Saha Uygulaması' },
      { label: 'Modüller', val: 'Mühendislik, Satınalma, Saha' },
      { label: 'IoT Bağlantısı', val: 'Canlı Sensör & Telemetri' },
      { label: 'Güvenlik', val: 'Yedekli Bulut Altyapısı' }
    ]
  }
];

function openTechModal(idx) {
  activeLightboxMode = 'technology';
  activeLightboxIdx = idx;
  const item = techServices[activeLightboxIdx];
  if (!item) return;

  document.getElementById('lightbox-img').src = 'assets/images/civil_engineering_bim_1785010076530.png';
  document.getElementById('lightbox-tag').textContent = item.tag;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-caption').textContent = item.caption;

  const specsGrid = document.getElementById('lightbox-specs-grid');
  if (specsGrid) {
    specsGrid.innerHTML = '';
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

  document.getElementById('lightbox-dialog').showModal();
}

function openEnergyProductModal(idx) {
  activeLightboxMode = 'energy';
  activeLightboxIdx = idx;
  renderLightboxContent(energyProducts[activeLightboxIdx]);
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
