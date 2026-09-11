/**
 * YAKIN GRUP — KENTSEL DÖNÜŞÜM PROJE KARAR MOTORU & HIZLI TEKLİF PLATFORMU
 * Core Calculation, Simulation & Decision Engine (2026 Mevzuat & Destekler)
 */

const KD_PRESETS = {
  kadikoy: {
    name: "İstanbul Kadıköy — 20 Daireli Tipik Dönüşüm",
    city: "İstanbul",
    district: "Kadıköy",
    neighborhood: "Fenerbahçe / Caddebostan",
    ada: "1248",
    parsel: "14",
    landArea: 850,
    existingBuildingArea: 2200,
    unitCount: 20,
    shopCount: 0,
    existingUnitAvgNet: 95,
    existingUnitPriceM2: 85000,
    existingRentMonthly: 35000,
    ownerCount: 20,
    titleStatus: "Kat Mülkiyeti",
      specSegment: "orta",
    kaks: 2.05,
    taks: 0.35,
    hmax: "Z+8 Kat",
    usageType: "Konut",
    newUnitPriceM2: 145000,
    newRentMonthly: 60000,
    soilCategory: "ZF (Orta Sağlam Zemin)",
    majorityPct: 75,
    customGroundSlab: 298,
    customNormalSlab: 342,
    customNormalFloorCount: 8,
    unitsPerNormalFloor: 3,
    groundFloorShopsCount: 0,
    groundFloorUnitsCount: 0
  },
  besiktas: {
    name: "İstanbul Beşiktaş — Butik Lüks Parsel",
    city: "İstanbul",
    district: "Beşiktaş",
    neighborhood: "Levazım / Etiler",
    ada: "452",
    parsel: "7",
    landArea: 480,
    existingBuildingArea: 1100,
    unitCount: 8,
    shopCount: 0,
    existingUnitAvgNet: 110,
    existingUnitPriceM2: 120000,
    existingRentMonthly: 55000,
    ownerCount: 8,
    titleStatus: "Kat Mülkiyeti",
    kaks: 1.85,
    taks: 0.35,
    hmax: "Z+5 Kat",
    usageType: "Konut",
    newUnitPriceM2: 220000,
    newRentMonthly: 95000,
    soilCategory: "ZE (Sağlam Kayalık)",
    majorityPct: 100,
    customGroundSlab: 168,
    customNormalSlab: 195,
    customNormalFloorCount: 5,
    unitsPerNormalFloor: 2,
    groundFloorShopsCount: 0,
    groundFloorUnitsCount: 0
  },
  karsiyaka: {
    name: "İzmir Karşıyaka — Dünya Bankası İADŞP Projesi",
    city: "İzmir",
    district: "Karşıyaka",
    neighborhood: "Bostanlı / Mavişehir",
    ada: "890",
    parsel: "22",
    landArea: 1200,
    existingBuildingArea: 3100,
    unitCount: 24,
    shopCount: 2,
    existingUnitAvgNet: 105,
    existingUnitPriceM2: 55000,
    existingRentMonthly: 28000,
    ownerCount: 26,
    titleStatus: "Kat Mülkiyeti",
    kaks: 2.20,
    taks: 0.40,
    hmax: "Z+9 Kat",
    usageType: "Karma (Konut + Ticaret)",
    newUnitPriceM2: 95000,
    newRentMonthly: 45000,
    soilCategory: "ZD (Alüvyon Zemin / İyileştirme)",
    majorityPct: 80,
    customGroundSlab: 480,
    customNormalSlab: 550,
    customNormalFloorCount: 9,
    unitsPerNormalFloor: 3,
    groundFloorShopsCount: 2,
    groundFloorUnitsCount: 0
  },
  izmit: {
    name: "Kocaeli İzmit — İADŞP Pilot İl Dönüşüm Parseli",
    city: "Kocaeli",
    district: "İzmit",
    neighborhood: "Yahyakaptan",
    ada: "630",
    parsel: "11",
    landArea: 950,
    existingBuildingArea: 2100,
    unitCount: 16,
    shopCount: 4,
    existingUnitAvgNet: 90,
    existingUnitPriceM2: 38000,
    existingRentMonthly: 18000,
    ownerCount: 20,
    titleStatus: "Kat İrtifakı",
    kaks: 1.90,
    taks: 0.35,
    hmax: "Z+6 Kat",
    usageType: "Karma (Konut + Ticaret)",
    newUnitPriceM2: 68000,
    newRentMonthly: 30000,
    soilCategory: "ZF (Orta Sağlam Zemin)",
    majorityPct: 65,
    customGroundSlab: 332,
    customNormalSlab: 382,
    customNormalFloorCount: 6,
    unitsPerNormalFloor: 3,
    groundFloorShopsCount: 4,
    groundFloorUnitsCount: 0
  }
};

const IADSP_PILOT_CITIES = ["İstanbul", "İzmir", "Kocaeli", "Sakarya", "Manisa", "Tekirdağ", "Kahramanmaraş"];

// 2026 Birim Maliyetleri (TL / m²)
const UNIT_COSTS_2026 = {
  demolitionPerM2: 850,
  permitsAndDesignPerM2: 1250,
  roughConstructionPerM2: 10800,
  finishingStandardPerM2: 7800,
  finishingPremiumPerM2: 11800,
  mepPerM2: 3400,
  electricalPerM2: 2900,
  externalAndLandscapePerM2: 1200,
  siteOverheadPct: 0.08,
  contingencyRiskPct: 0.05,
  financingCostPct: 0.04,
  contractorProfitTargetPct: 0.18
};

// Cephe Yönleri ve Güneş/Manzara Tanımları
const FACADE_DIRECTIONS = [
  { name: "Güney - Doğu", desc: "Ön / Cadde Cephesi (Sabah & Öğle Güneşi • Ferah)", view: "Cadde & Şehir Manzarası", badge: "☀️ Güney-Doğu" },
  { name: "Güney - Batı", desc: "Köşe / Park Cephesi (Öğle & Akşam Güneşi • Sıcak)", view: "Park & Peyzaj Manzarası", badge: "☀️ Güney-Batı" },
  { name: "Kuzey - Doğu", desc: "Bahçe Cephesi (Sabah Güneşi • Sakin & Sessiz)", view: "İç Bahçe & Peyzaj", badge: "🌤️ Kuzey-Doğu" },
  { name: "Kuzey - Batı", desc: "Avlu Cephesi (Öğleden Sonra Güneşi • Havadar)", view: "Avlu & Şehir", badge: "🌤️ Kuzey-Batı" }
];

// Net m²'ye göre Oda Tipi Belirleme
function getRoomType(netM2) {
  if (netM2 >= 120) return "4+1 Lüks Daire";
  if (netM2 >= 82) return "3+1 Konfor Daire";
  if (netM2 >= 55) return "2+1 Fonksiyonel Daire";
  return "1+1 Rezidans Daire";
}

// 2026 Kurumsal Teknik İmalat Şartnamesi (3 Opsiyonel Segment: Giriş, Orta, Premium)
const TECHNICAL_SPECIFICATIONS_SEGMENTS = {
  giris: [
    {
      category: "1. Statik Taşıyıcı Sistem & Kaba Yapı Güvenliği",
      icon: "🏗️",
      summary: "C30/37 Hazır Beton, B420C Donatı Çeliği, Radye Temel & Standart Bohçalama",
      items: [
        "Taşıyıcı Sistem: TBDY-2018 Türkiye Bina Deprem Yönetmeliği standartlarına tam uyumlu, C30/37 sınıfı hazır beton ve B420C nervürlü donatı çeliği ile inşa edilen sünek betonarme karkas.",
        "Temel ve Zemin: Jeolojik ve jeofizik zemin etüt raporu onaylı, temel derinliği statik hesaplı rijit radye jeneral temel sistemi.",
        "Su ve Nem Yalıtımı: Bodrum çevre perdelerinde ve temel altında çift kat SBS katkılı bitümlü polimer membran ile eksiz su yalıtımı.",
        "Ses ve Darbe Yalıtımı: Kat aralarında ve daire ortak duvarlarında şap altı standart polietilen ses yalıtım şiltesi."
      ]
    },
    {
      category: "2. Dış Cephe Mimarisi & Enerji Verimliliği",
      icon: "🏢",
      summary: "5-6 cm EPS/Taşyünü Mantolama, 70'lik PVC Çift Cam, Silikonlu Dış Cephe Boyası",
      items: [
        "Isı Yalıtımı: Binalarda Enerji Performansı Yönetmeliğine uygun, 5-6 cm kalınlığında EPS veya taşyünü levhalar ile kesintisiz mantolama.",
        "Dış Cephe Kaplaması: Filli Boya / Jotun silikonlu dış cephe boyası ve dekoratif mineral sıva kaplaması.",
        "Doğrama Sistemi: 70'lik seri 5 odacıklı beyaz/antrasit PVC pencere doğramaları ve 4+16+4 mm standart çift cam kombinasyonu.",
        "Balkonlar: Elektrostatik fırın boyalı alüminyum profil ve standart güvenlikli lamine cam korkuluk detayları."
      ]
    },
    {
      category: "3. İç Mekan, Kapılar & İnce İmalatlar",
      icon: "🚪",
      summary: "Monoblok Çelik Kapı, Membran/Melamin İç Kapılar, 8 mm AC3 Laminant Parke",
      items: [
        "Daire Giriş Kapısı: Çift kilit emniyet mekanizmalı, monoblok çelik gövdeli ahşap desenli kaplamalı çelik kapı.",
        "İç Kapılar: Ahşap karkas üzeri MDF presli, kolay temizlenebilir mat membran veya melamin yüzeyli iç oda kapıları.",
        "Zemin Kaplamaları: Salon ve odalarda 8 mm 31/32. sınıf yerli laminant parke; antre, koridor ve mutfakta 1. sınıf 60x60 cm seramik kaplama.",
        "Duvar & Tavan: Alçı sıva üzeri su bazlı plastik/silikonlu mat iç cephe boyası, tavanlarda standart kartonpiyer perdahı."
      ]
    },
    {
      category: "4. Mutfak & Banyo Donanımları",
      icon: "🍳",
      summary: "MDF-Lam Mutfak, Akrilik/Granit Tezgah, Yerli 3'lü Ankastre Set, E.C.A./Artema & Vitra",
      items: [
        "Mutfak Dolapları: 1. sınıf MDF-Lam gövde, frenli menteşe sistemli parlak/mat PVC kapaklı modüler mutfak tasarımı.",
        "Mutfak Tezgahı: Antibakteriyel ve leke tutmaz döküm akrilik veya 1. sınıf yerli granit mutfak tezgahı.",
        "Ankastre Cihazlar: Silverline / Kumtel / Vestel marka 3'lü ankastre set (ocak, davlumbaz, statik/turbo fırın).",
        "Banyo Donanımı: Vitra / Serel marka gömme rezervuarlı klozet, E.C.A. / Artema krom bataryalar, şeffaf temperli cam duşakabin ve MDF banyo dolabı."
      ]
    },
    {
      category: "5. Isıtma & Mekanik Altyapı",
      icon: "❄️",
      summary: "Kombili Panel Radyatör veya Standart Yerden Isıtma, Klima Boru Altyapısı",
      items: [
        "Isıtma Sistemi: Daire içi tam yoğuşmalı kombi veya merkezi pay ölçerli panel radyatör / standart yerden ısıtma borulama sistemi.",
        "Klima Altyapısı: Salon bölgesinde split klima montajına uygun hazır bakır boru ve drenaj hattı tesisatı.",
        "Temiz ve Atık Su Tesisatı: TSE belgeli PPRC kompozit temiz su boruları ve standart PVC atık su borulama sistemi.",
        "Su Deposu & Hidrofor: Olası su kesintilerine karşı ortak paslanmaz çelik modüler su deposu ve otomatik hidrofor grubu."
      ]
    },
    {
      category: "6. Elektrik, Güvenlik & Ortak Donanımlar",
      icon: "⚡",
      summary: "Renkli Görüntülü Diafon, TSE Belgeli 8 Kişilik Asansör, Ortak Alan Jeneratörü",
      items: [
        "İletişim & İnterkom: Bina giriş paneli ile bağlantılı renkli görüntülü daire içi diafon sistemi ve merkezi uydu altyapısı.",
        "Elektrik Altyapısı: Viko / Panasonic otomatik sigorta panosu, kaçak akım koruma rölesi ve TSE standartlı yangına dayanıklı kablolama.",
        "Asansör: TSE standartlarında 8 kişilik, frekans kontrollü, çift hızlı, acil kat kurtarıcılı standart kabinli asansör.",
        "Ortak Alanlar: Hidrofor, asansör ve merdiven aydınlatmasını besleyen standart ortak alan jeneratörü ve çevre aydınlatmaları."
      ]
    }
  ],

  orta: [
    {
      category: "1. Statik Taşıyıcı Sistem & Kaba Yapı Güvenliği",
      icon: "🏗️",
      summary: "C35/40 Sınıfı Beton, B420C Donatı Çeliği, Radye Temel & Tam Bohçalama",
      items: [
        "Taşıyıcı Sistem: 2018 Türkiye Bina Deprem Yönetmeliği'ne (TBDY-2018) tam uyumlu, C35/40 hazır beton ve B420C nervürlü donatı çeliği ile inşa edilen sünek betonarme karkas sistem.",
        "Temel ve Zemin: Lisanslı zemin etüdü onaylı, zemin sınıfına göre gerekli kuyu/fore kazık güçlendirmeleri ve statik hesaplı radye jeneral temel.",
        "Su ve Nem Yalıtımı: Bodrum perde betonlarında ve temel altında çift kat polyester keçeli elastomerik membran ile eksiz tam bohçalama su yalıtımı.",
        "Ses ve Darbe Yalıtımı: Daireler arası ve kat tabliyelerinde şap altı yüksek yoğunluklu ses yalıtım şiltesi ile 52 dB akustik konfor."
      ]
    },
    {
      category: "2. Dış Cephe Mimarisi & Enerji Verimliliği",
      icon: "🏢",
      summary: "150 kg/m³ Taş Yünü Yalıtım, Mekanik Sinterflex Porselen & Isı Konfor Cam",
      items: [
        "Yangın ve Isı Yalıtımı: 150 kg/m³ yoğunluklu, A1 sınıfı alev almaz taş yünü levhalar ile kesintisiz mantolama ve yangın bariyerleri.",
        "Cephe Kaplaması: Mekanik ankrajlı sinterflex porselen seramik paneller + ahşap dokulu kompakt laminat ve antrasit alüminyum kompozit fuga detayları.",
        "Doğrama Sistemi: Isı yalıtım bariyerli antrasit alüminyum/PVC doğrama serisi, gizli panjur kutusu ve motorlu monoblok alüminyum panjurlar.",
        "Cam Kombinasyonu: 4+16+4 mm temperli Şişecam Konfor serisi çift cam (yazın güneş ısısını %40 engeller, kışın ısıyı %50 içeride tutar).",
        "Balkonlar: Lamine temperli şeffaf cam korkuluklar, gizli lineer LED aydınlatmalı alüminyum küpeşteler ve su tahliye süzgeçleri."
      ]
    },
    {
      category: "3. İç Mekan, Kapılar & İnce İmalatlar",
      icon: "🚪",
      summary: "Parmak İzi Çelik Kapı, Özel Tasarım Lake İç Kapılar, 1. Sınıf Derzli Parke",
      items: [
        "Daire Giriş Kapısı: Çift kilitli, parmak izi okuyuculu / şifreli manyetik sistem, ahşap giydirmeli monoblok çelik kapı.",
        "İç Kapılar: Masif gövdeli, manyetik kilitli ve sessiz fitilli, özel tasarım beyaz/antrasit lake boyalı mobilya kapılar.",
        "Zemin Kaplamaları: Salon ve odalarda 1. sınıf 8 mm AC4/32 derzli laminant / lamine parke; antre, koridor ve mutfakta 60x120 cm rektifiye granit porselen seramik.",
        "Duvar & Tavan: Alçı sıva üzeri su bazlı silinebilir antibakteriyel saten boya, salon ve antrede gizli LED/spot aydınlatmalı asma tavan bantları."
      ]
    },
    {
      category: "4. Mutfak & Banyo Özel Donanımları",
      icon: "🍳",
      summary: "Blum Mekanizmalı Mutfak, Kuvars Tezgah, Franke/Siemens 3'lü Ankastre, Vitra/Geberit",
      items: [
        "Mutfak Dolapları: Blum/Hettich frenli menteşe ve tandem ray mekanizmalı, soft-close lake veya akrilik kapaklı modüler mutfak tasarımı.",
        "Mutfak Tezgahı: Leke ve çizilmeye dayanıklı, antibakteriyel 1. sınıf kuvars (Çimstone/Belenco) veya porselen tezgah ve tezgah arası panel.",
        "Ankastre Set: Franke / Siemens / Bosch marka 3'lü ankastre set (dokunmatik indüksiyonlu ocak, davlumbaz, multifonksiyonlu ankastre fırın).",
        "Banyo Donanımı: Vitra / Geberit gömme rezervuarlar ve asma klozetler, Hansgrohe / ECA termostatik ankastre banyo bataryaları, temperli füme cam duşakabin ve lake banyo mobilyası."
      ]
    },
    {
      category: "5. Isıtma, Soğutma & Mekanik Altyapı",
      icon: "❄️",
      summary: "Rehau/Danfoss Pay Ölçerli Yerden Isıtma, Multi-Inverter Klima, Sessiz Tesisat",
      items: [
        "Isıtma Sistemi: Rehau / Danfoss oksijen bariyerli borularla döşenen, her odası bağımsız dijital termostat kontrollü pay ölçerli yerden ısıtma sistemi.",
        "İklimlendirme: Salon ve ebeveyn yatak odasında multi-inverter A+++ klima bakır borulama, drenaj ve elektrik altyapısı.",
        "Sıhhi Tesisat: Fırat/Pimapen sessiz atık su boruları, merkezi paslanmaz çelik su deposu, frekans kontrollü hidrofor ve merkezi filtreleme ünitesi.",
        "Yangın Güvenliği: Kapalı otoparkta ve bina kat hollerinde otomatik yangın sprinkler söndürme, duman tahliye ve yangın dolabı tesisatı."
      ]
    },
    {
      category: "6. Akıllı Ev, Elektrik & Ortak Alanlar",
      icon: "⚡",
      summary: "KNX Akıllı Ev, KONE Asansör, EV Şarj İstasyonu, 7/24 CCTV & Jeneratör",
      items: [
        "Akıllı Ev Sistemi: Aydınlatma, motorlu panjurlar, su vanası ve yerden ısıtmayı cep telefonundan uzaktan kontrol eden KNX akıllı ev altyapısı.",
        "Elektrik Ekipmanı: Schneider / Siemens otomatik sigortalar, kaçak akım koruma röleleri, halogen-free alev iletmez kablolama ve prizler.",
        "İnterkom & Güvenlik: Daire içi 10 inç dokunmatik IP görüntülü diafon, fiber optik internet altyapısı, bina çevresi ve otoparkta 7/24 HD CCTV kamera izleme.",
        "Asansör: KONE / Otis marka çift hızlı, 10 kişilik, frekans kontrollü, acil kurtarma sistemli, paslanmaz lüks kabinli tam otomatik asansör.",
        "Otopark & Enerji: Kapalı otoparkta her daireye tahsisli 1 araçlık park yeri ve elektrikli araç (EV) AC hızlı şarj altyapısı; ortak alanları ve daireleri besleyen tam güç otomatik jeneratör."
      ]
    }
  ],

  premium: [
    {
      category: "1. Statik Taşıyıcı Sistem & Ağır Yük Mühendisliği",
      icon: "🏗️",
      summary: "C40/45 veya C50 Beton, Sismik İzolatör Uyumlu Karkas, 3 Kat Ağır Hizmet Elastomerik Bohçalama",
      items: [
        "Taşıyıcı Sistem: C40/45 veya C50 ultra yüksek mukavemetli hazır beton, B420C donatı çeliği ve sismik izolatör / derin fore kazık altyapısına tam uyumlu sünek betonarme karkas.",
        "Temel ve Zemin: Kuyu temel ve jet-grouting / fore kazık zemin güçlendirmesi üzerine oturan, dinamik deprem simülasyonu onaylı 140 cm radye jeneral temel.",
        "Su ve Nem İzolasyonu: Temel ve perdelerde 3 kat ağır hizmet tipi EPDM / elastomerik polimer bitümlü membran ile basınçlı yeraltı sularına karşı ömür boyu garantili eksiz tam bohçalama.",
        "Akustik İzolasyon: Daireler arası duvarlarda çift kat çift karkas akustik taşyünü ve kat aralarında özel darbe emici elastomer şilteler ile 64 dB lüks akustik sessizlik."
      ]
    },
    {
      category: "2. High-Glass Alüminyum Giydirme Cephe & Akustik Cam",
      icon: "🏢",
      summary: "Schüco/Reynaers High-Glass Cephe, Guardian SunGuard Akustik Üçlü Cam, Doğal Granit & Çinko Giydirme",
      items: [
        "Giydirme Cephe: Schüco / Reynaers marka yüksek ısı yalıtım bariyerli yapısal silikonlu High-Glass alüminyum giydirme cephe ve doğal taş / titanyum çinko kompozit paneller.",
        "Ultra Konfor Cam Sistemi: Guardian SunGuard / Saint-Gobain akustik lamine üçlü cam (4+14+4+14+4 mm) ile güneş ışınımını %70 kesen, kışın ısı kaybını sıfırlayan mimari camlama.",
        "Doğrama ve Motorlu Sistemler: Gizli menteşeli, hebe-schiebe sürme cam kapılar ve Somfy akıllı motorlu dış cephe jaluzi / rüzgar sensörlü zip perde sistemleri.",
        "Balkon ve Teraslar: Kesintisiz panoramik görüş sunan gömme taban profilli ekstra şeffaf lamine temperli cam korkuluklar ve gizli lineer drenaj kanalları."
      ]
    },
    {
      category: "3. Lüks İç Mimari, Biyometrik Giriş & Zanaat Kapılar",
      icon: "🚪",
      summary: "Yüz Tanımalı Akıllı Zırhlı Kapı, Tavana Kadar Lake Gizli Menteşeli Kapılar, 14 mm Lamine Meşe Parke",
      items: [
        "Giriş Kapısı: 3D Biyometrik yüz tanımalı, akıllı telefon NFC ve parmak izi okuyuculu, balistik çelik gövdeli doğal ahşap kaplamalı özel tasarım zırhlı kapı.",
        "İç Mimari Kapılar: Tavana kadar uzanan (260 cm) gizli pervazlı, manyetik kilitli ve gizli menteşeli, fırınlanmış masif karkaslı mat lake / ceviz kaplama mobilya kapılar.",
        "Zemin Mimarisi: Salon ve yatak odalarında 1. sınıf 14 mm Macar/Balıksırtı lamine masif meşe parke; ıslak hacimlerde 120x240 cm ithal İtalyan Calacatta / Statuario porselen seramik.",
        "Duvar & Aydınlatma Tasarımı: İtalyan dekoratif efektli sıva ve Jotun Fenomastic saf mat boya, manyetik raylı akıllı LED spotlar ve gizli lineer ışık bantları."
      ]
    },
    {
      category: "4. Özel Tasarım Ada Mutfak & Master Banyo Spa",
      icon: "🍳",
      summary: "Ada Mutfak, Dekton/Neolith Porselen Tezgah, Gaggenau/Miele StudioLine Ankastre, Dornbracht/Axor & Duravit",
      items: [
        "Mutfak Mimarisi: Özel tasarım entegre ada mutfak, fırınlanmış lake ve ahşap kaplama dolaplar, elektrikli dokun-aç (Servo-Drive) Blum çekmece ve mekanizma sistemleri.",
        "Mutfak Tezgahı: Isıya, çizilmeye ve asite %100 dayanıklı ultra kompakt porselen tezgah ve tezgah arası (Dekton / Neolith / Laminam).",
        "Akıllı Ankastre Set: Gaggenau / Miele / Siemens StudioLine serisi WiFi bağlantılı 4'lü ankastre set (indüksiyonlu havalandırmalı ocak, akıllı buharlı fırın, mikrodalga, tam entegre sessiz bulaşık makinesi).",
        "Master Banyo & Spa: Dornbracht / Axor Hansgrohe termostatik ankastre yağmur duş sistemleri, Duravit / Laufen akıllı entegre taharetli klozetler, masif lavabo tezgahları ve buğu önleyicili akıllı LED aynalar."
      ]
    },
    {
      category: "5. Bağımsız VRV/VRF İklimlendirme & Taze Hava Santrali",
      icon: "❄️",
      summary: "DAIKIN/Mitsubishi Bağımsız VRF Gizli Tavan Tipi İklimlendirme, Taze Hava Santrali, Rehau Akıllı Yerden Isıtma",
      items: [
        "Merkezi İklimlendirme: DAIKIN / Mitsubishi Electric marka, her oda için bağımsız sıcaklık kontrolü sağlayan gizli tavan tipi kanallı VRV/VRF ısıtma ve soğutma sistemi.",
        "Taze Hava ve Havalandırma: Isı geri kazanımlı taze hava santrali (VAM ünitesi) ile pencereler açılmadan sürekli filtrelenmiş %100 taze hava beslemesi ve partikül filtreleme.",
        "Yerden Isıtma: Rehau akıllı sensörlü yerden ısıtma borulama sistemi, her hacimde dijital cam dokunmatik oda termostatları ile hassas sıcaklık yönetimi.",
        "Sıhhi Tesisat & Arıtma: Geberit Silent-PP ultra sessiz atık su boruları, bina ana girişinde kireç kırıcı su yumuşatma ve UV dezenfeksiyonlu merkezi su filtreleme istasyonu."
      ]
    },
    {
      category: "6. Tam Kapsamlı IoT Otomasyon & Ultra Lüks Tesis",
      icon: "⚡",
      summary: "Crestron/Control4 IoT Akıllı Otomasyon, Schindler 2.5 m/s Panoramik Asansör, 22kW Bağımsız EV Şarjı, 7/24 Concierge",
      items: [
        "Akıllı Ev Otomasyonu: Crestron / Control4 / KNX tabanlı tam entegre IoT otomasyon (aydınlatma senaryoları, perde/panjur, VRF klima, müzik yayını, su/gaz kaçak dedektörleri ve uzaktan erişim).",
        "Dikey Ulaşım: Schindler / Otis marka 2.5 m/s ultra hızlı, panoramik cam/lüks deri kaplamalı, kartlı kat yetkilendirmeli çift asansör sistemi.",
        "Yeşil Enerji & EV Şarjı: Kapalı otoparkta her daireye tahsisli 2 araçlık park yeri ve bağımsız 22 kW AC Type-2 hızlı elektrikli araç şarj istasyonu.",
        "Kesintisiz Enerji & Güvenlik: Bina ve tüm dairelerin elektrik ihtiyacını kesintisiz %100 karşılayan ses yalıtımlı jeneratör; yapay zeka destekli 7/24 çevre güvenlik kameraları ve concierge danışma desk altyapısı."
      ]
    }
  ]
};

const TECHNICAL_SPECIFICATIONS_2026 = TECHNICAL_SPECIFICATIONS_SEGMENTS.orta;

class KentselDonusumEngine {
  constructor() {
    this.state = {
      city: "İstanbul",
      district: "Kadıköy",
      neighborhood: "Fenerbahçe",
      ada: "1248",
      parsel: "14",
      landArea: 850,
      existingBuildingArea: 2200,
      unitCount: 20,
      shopCount: 0,
      existingUnitAvgNet: 95,
      existingUnitPriceM2: 85000,
      existingRentMonthly: 35000,
      ownerCount: 20,
      titleStatus: "Kat Mülkiyeti",
      majorityPct: 75,
      soilCategory: "ZF (Orta Sağlam Zemin)",
      
      kaks: 2.05,
      taks: 0.35,
      hmax: "Z+8 Kat",
      usageType: "Konut",
      newUnitPriceM2: 145000,
      newRentMonthly: 60000,
      
      customGroundSlab: 298,
      customNormalSlab: 342,
      customNormalFloorCount: 8,
      unitsPerNormalFloor: 3,
      groundFloorShopsCount: 0,
      groundFloorUnitsCount: 0,

      selectedScenario: 'B',
      projectMonths: 22,
      contractorSharePctInput: 55,
      contractorMarginPct: 35,
      applyContractorMargin: true,
      signatory: 'eylul',
      stampMode: 'both',
      
      owners: []
    };

    this.results = {};
    this.generateDefaultOwners();
    this.calculate();
  }

  loadPreset(key) {
    if (KD_PRESETS[key]) {
      this.state = { ...this.state, ...KD_PRESETS[key] };
      this.generateDefaultOwners();
      this.calculate();
    }
  }

  generateDefaultOwners(forceReset = false) {
    const oldOwners = (this.state.owners || []);
    const oldMap = new Map();
    if (!forceReset) {
      oldOwners.forEach(o => {
        oldMap.set(o.id, o);
      });
    }

    const list = [];
    const unitCount = parseInt(this.state.unitCount) >= 0 ? parseInt(this.state.unitCount) : 20;
    const shopCount = parseInt(this.state.shopCount) >= 0 ? parseInt(this.state.shopCount) : 0;
    const totalSections = Math.max(1, unitCount + shopCount);
    const avgNet = parseFloat(this.state.existingUnitAvgNet) || 95;
    const unitsPerFloor = parseInt(this.state.unitsPerNormalFloor) || 3;
    
    let id = 1;

    for (let i = 1; i <= unitCount; i++) {
      const existing = oldMap.get(id);
      const floor = Math.min(Math.ceil(i / unitsPerFloor), 12);
      let netM2, brutM2, name, customSet = false;

      if (existing && existing.customNetManuallySet) {
        netM2 = existing.existingNetM2;
        brutM2 = existing.existingGrossM2;
        name = existing.name || `Malik ${i} (Daire ${i} • Kat ${floor})`;
        customSet = true;
      } else {
        const variation = (i % 3 === 0 ? 8 : (i % 3 === 1 ? -6 : 0));
        netM2 = Math.max(30, Math.round(avgNet + variation));
        brutM2 = Math.round(netM2 * 1.25);
        name = existing ? existing.name : `Malik ${i} (Daire ${i} • Kat ${floor})`;
      }
      
      list.push({
        id: id,
        sectionType: 'Konut',
        typeLabel: '🏠 Daire',
        name: name,
        floor: floor,
        existingNetM2: netM2,
        existingGrossM2: brutM2,
        landShareRatio: (100 / totalSections).toFixed(2),
        agreed: id <= Math.ceil(totalSections * (this.state.majorityPct / 100)),
        customNetManuallySet: customSet
      });
      id++;
    }

    for (let j = 1; j <= shopCount; j++) {
      const existing = oldMap.get(id);
      let shopNetM2, brutM2, name, customSet = false;

      if (existing && existing.customNetManuallySet) {
        shopNetM2 = existing.existingNetM2;
        brutM2 = existing.existingGrossM2;
        name = existing.name || `Dükkan ${j} Sahibi (Zemin Dk:${j})`;
        customSet = true;
      } else {
        shopNetM2 = Math.round(avgNet * 1.25);
        brutM2 = Math.round(shopNetM2 * 1.30);
        name = existing ? existing.name : `Dükkan ${j} Sahibi (Zemin Dk:${j})`;
      }
      
      list.push({
        id: id,
        sectionType: 'Ticari',
        typeLabel: '🏪 Dükkan',
        name: name,
        floor: 0,
        existingNetM2: shopNetM2,
        existingGrossM2: brutM2,
        landShareRatio: (100 / totalSections).toFixed(2),
        agreed: id <= Math.ceil(totalSections * (this.state.majorityPct / 100)),
        customNetManuallySet: customSet
      });
      id++;
    }

    if (list.length === 0) {
      list.push({
        id: 1,
        sectionType: 'Konut',
        typeLabel: '🏠 Daire',
        name: `Malik 1 (Daire 1 • Kat 1)`,
        floor: 1,
        existingNetM2: avgNet,
        existingGrossM2: Math.round(avgNet * 1.25),
        landShareRatio: "100.00",
        agreed: true,
        customNetManuallySet: false
      });
    }

    this.state.owners = list;
  }

  updateOwnerNetM2(id, netVal) {
    const val = Math.max(1, parseFloat(netVal) || 0);
    const owner = (this.state.owners || []).find(o => o.id === id);
    if (owner) {
      const isShop = owner.sectionType === 'Ticari';
      owner.existingNetM2 = val;
      owner.existingGrossM2 = Math.round(val * (isShop ? 1.30 : 1.25));
      owner.customNetManuallySet = true;

      // Konutların ortalamasını güncelle
      const resUnits = (this.state.owners || []).filter(o => o.sectionType === 'Konut');
      if (resUnits.length > 0) {
        const sumResNet = resUnits.reduce((acc, u) => acc + (parseFloat(u.existingNetM2) || 0), 0);
        this.state.existingUnitAvgNet = Math.round((sumResNet / resUnits.length) * 10) / 10;
      }
      // Toplam bina mevcut alanını güncelle
      const totalGross = (this.state.owners || []).reduce((acc, o) => acc + (parseFloat(o.existingGrossM2) || 0), 0);
      if (totalGross > 0) {
        this.state.existingBuildingArea = totalGross;
      }
      this.calculate();
    }
  }

  updateOwnerName(id, name) {
    const owner = (this.state.owners || []).find(o => o.id === id);
    if (owner) {
      owner.name = name;
      this.calculate();
    }
  }

  distributeUniformNetM2(netM2) {
    const val = parseFloat(netM2) || parseFloat(this.state.existingUnitAvgNet) || 95;
    (this.state.owners || []).forEach(o => {
      const isShop = o.sectionType === 'Ticari';
      const unitVal = isShop ? Math.round(val * 1.25) : val;
      o.existingNetM2 = unitVal;
      o.existingGrossM2 = Math.round(unitVal * (isShop ? 1.30 : 1.25));
      o.customNetManuallySet = true;
    });
    this.state.existingUnitAvgNet = val;
    const totalGross = (this.state.owners || []).reduce((acc, o) => acc + (parseFloat(o.existingGrossM2) || 0), 0);
    if (totalGross > 0) {
      this.state.existingBuildingArea = totalGross;
    }
    this.calculate();
  }

  updateField(key, value) {
    this.state[key] = value;
    
    if (key === 'landArea' || key === 'taks') {
      const la = parseFloat(this.state.landArea) || 0;
      const tk = parseFloat(this.state.taks) || 0.35;
      const autoTaban = Math.round(la * tk);
      if (!this.state.customGroundSlabManuallySet) {
        this.state.customGroundSlab = autoTaban;
        this.state.customNormalSlab = Math.round(autoTaban * 1.15);
      }
    }

    if (key === 'customGroundSlab') {
      this.state.customGroundSlabManuallySet = true;
      const gSlab = parseFloat(value) || 0;
      if (gSlab > 0 && !this.state.customNormalSlabManuallySet) {
        this.state.customNormalSlab = Math.round(gSlab * 1.15);
      }
    }

    if (key === 'customNormalSlab') {
      this.state.customNormalSlabManuallySet = true;
    }

    if (key === 'unitCount' || key === 'shopCount') {
      const u = parseInt(this.state.unitCount) || 0;
      const s = parseInt(this.state.shopCount) || 0;
      this.state.ownerCount = u + s;
      this.state.groundFloorShopsCount = s;
      this.generateDefaultOwners(false);
    } else if (key === 'ownerCount' || key === 'majorityPct' || key === 'unitsPerNormalFloor') {
      this.generateDefaultOwners(false);
    } else if (key === 'existingUnitAvgNet') {
      // Eğer kullanıcı ortalamayı doğrudan değiştirdiyse, özel olarak ayarlanmamış birimleri güncelle
      const newAvg = parseFloat(value) || 95;
      (this.state.owners || []).forEach(o => {
        if (!o.customNetManuallySet) {
          const isShop = o.sectionType === 'Ticari';
          if (isShop) {
            o.existingNetM2 = Math.round(newAvg * 1.25);
            o.existingGrossM2 = Math.round(o.existingNetM2 * 1.30);
          } else {
            const variation = (o.id % 3 === 0 ? 8 : (o.id % 3 === 1 ? -6 : 0));
            o.existingNetM2 = Math.max(30, Math.round(newAvg + variation));
            o.existingGrossM2 = Math.round(o.existingNetM2 * 1.25);
          }
        }
      });
    }
    
    this.calculate();
  }

  calculate() {
    const s = this.state;
    
    // 1. İMAR VE TABLİYE HESAPLARI
    const landArea = parseFloat(s.landArea) || 0;
    const emsal = parseFloat(s.kaks) || 0;
    const taks = parseFloat(s.taks) || 0.35;
    
    const autoTabanAlani = Math.round(landArea * taks);
    const tabanAlani = (parseFloat(s.customGroundSlab) > 0) ? parseFloat(s.customGroundSlab) : autoTabanAlani;
    const zeminKatNetAlani = Math.round(tabanAlani * 0.80);
    
    const autoNormalKatBrut = Math.round(tabanAlani * 1.15);
    const normalKatBrut = (parseFloat(s.customNormalSlab) > 0) ? parseFloat(s.customNormalSlab) : autoNormalKatBrut;
    const normalKatNet = Math.round(normalKatBrut * 0.82);
    
    let autoNormalKatSayisi = 8;
    if (s.hmax) {
      const match = String(s.hmax).match(/(\d+)/);
      if (match) autoNormalKatSayisi = parseInt(match[1]);
    }
    const normalKatSayisi = (parseInt(s.customNormalFloorCount) > 0) ? parseInt(s.customNormalFloorCount) : autoNormalKatSayisi;
    const unitsPerNormalFloor = (parseInt(s.unitsPerNormalFloor) > 0) ? parseInt(s.unitsPerNormalFloor) : 2;

    const normalFloorUnitNetM2 = Math.max(25, Math.round(normalKatNet / unitsPerNormalFloor));
    const normalFloorUnitGrossM2 = Math.round(normalFloorUnitNetM2 * 1.25);
    const normalFloorRoomType = getRoomType(normalFloorUnitNetM2);

    const normalKatlarDaireSayisi = normalKatSayisi * unitsPerNormalFloor;
    const normalKatlarNetToplam = normalKatSayisi * normalKatNet;

    const emsaleDahilAlan = (emsal > 0 && landArea > 0) ? (landArea * emsal) : ((normalKatSayisi * normalKatBrut) + tabanAlani);
    const emsalDisiAlan = emsaleDahilAlan * 0.30;
    const bodrumOtoparkSiginak = emsaleDahilAlan * 0.32;
    const toplamInsaatAlani = emsaleDahilAlan + emsalDisiAlan + bodrumOtoparkSiginak;
    const toplamSatilabilirBrutAlan = (normalKatSayisi * normalKatBrut) + tabanAlani;

    // 2. MEVCUT DURUM VE BAĞIMSIZ BÖLÜM DAĞILIMI
    const existingUnits = Math.max(0, parseInt(s.unitCount) || 0);
    const existingShops = Math.max(0, parseInt(s.shopCount) || 0);
    const existingTotalSections = Math.max(1, existingUnits + existingShops);
    
    const avgNet = parseFloat(s.existingUnitAvgNet) || 90;
    const existingResidentialNet = existingUnits * avgNet;
    const existingShopNet = existingShops * (avgNet * 1.10);
    const existingTotalNet = existingResidentialNet + existingShopNet;

    const groundFloorShops = (s.groundFloorShopsCount !== null && s.groundFloorShopsCount !== undefined && s.groundFloorShopsCount !== "")
      ? parseInt(s.groundFloorShopsCount)
      : existingShops;
    
    const groundFloorUnits = (s.groundFloorUnitsCount !== null && s.groundFloorUnitsCount !== undefined && s.groundFloorUnitsCount !== "")
      ? parseInt(s.groundFloorUnitsCount)
      : 0;

    let targetShopNetTotal = 0;
    let targetShopAvgNet = 0;
    if (groundFloorShops > 0) {
      targetShopNetTotal = zeminKatNetAlani;
      targetShopAvgNet = Math.round(targetShopNetTotal / groundFloorShops);
    }

    const totalNewResidentialUnits = normalKatlarDaireSayisi + groundFloorUnits;
    const totalNewSections = totalNewResidentialUnits + groundFloorShops;

    const contractorUnits = Math.max(0, totalNewResidentialUnits - existingUnits);
    const contractorShops = Math.max(0, groundFloorShops - existingShops);
    const contractorTotalSections = contractorUnits + contractorShops;

    // Kat Kat Bağımsız Bölüm & Cephe Dağılım Çizelgesi (Floor & Facade Schedule)
    const floorSchedule = [];
    
    // Zemin Kat
    const zeminUnitsList = [];
    for (let sIdx = 1; sIdx <= groundFloorShops; sIdx++) {
      zeminUnitsList.push({
        doorNo: sIdx,
        type: "Ticari Dükkan",
        netM2: targetShopAvgNet,
        grossM2: Math.round(targetShopAvgNet * 1.25),
        facade: "Cadde / Vitrin Cephesi",
        ownerName: sIdx <= existingShops ? `Dükkan Malik ${sIdx}` : `🏷️ Yüklenici Dükkan ${sIdx - existingShops}`
      });
    }
    for (let uIdx = 1; uIdx <= groundFloorUnits; uIdx++) {
      const zNet = Math.round(zeminKatNetAlani / Math.max(1, groundFloorUnits));
      zeminUnitsList.push({
        doorNo: groundFloorShops + uIdx,
        type: getRoomType(zNet),
        netM2: zNet,
        grossM2: Math.round(zNet * 1.25),
        facade: "Bahçe / Zemin Cephesi",
        ownerName: `Zemin Konut ${uIdx}`
      });
    }

    floorSchedule.push({
      floorIndex: 0,
      floorName: "Zemin Kat",
      slabGrossM2: tabanAlani,
      slabNetM2: zeminKatNetAlani,
      shopsCount: groundFloorShops,
      unitsCount: groundFloorUnits,
      totalFloorSections: groundFloorShops + groundFloorUnits,
      unitAvgNetM2: groundFloorShops > 0 ? targetShopAvgNet : (groundFloorUnits > 0 ? Math.round(zeminKatNetAlani / groundFloorUnits) : 0),
      summaryText: groundFloorShops > 0 ? `${groundFloorShops} Dükkan (Net ~${targetShopAvgNet} m²)` : `${groundFloorUnits} Konut`,
      units: zeminUnitsList
    });

    // Normal Katlar (1..N Kat)
    let runningResidentialCounter = 0;
    for (let f = 1; f <= normalKatSayisi; f++) {
      const floorUnits = [];
      for (let u = 1; u <= unitsPerNormalFloor; u++) {
        runningResidentialCounter++;
        const facadeObj = FACADE_DIRECTIONS[(u - 1) % FACADE_DIRECTIONS.length];
        const isOwner = runningResidentialCounter <= existingUnits;
        const ownerLabel = isOwner ? `Malik ${runningResidentialCounter}` : `🏷️ Yüklenici Satış ${runningResidentialCounter - existingUnits}`;
        
        floorUnits.push({
          doorNo: u,
          globalUnitNo: runningResidentialCounter,
          type: normalFloorRoomType,
          netM2: normalFloorUnitNetM2,
          grossM2: normalFloorUnitGrossM2,
          facade: facadeObj.name,
          facadeBadge: facadeObj.badge,
          facadeDesc: facadeObj.desc,
          facadeView: facadeObj.view,
          ownerName: ownerLabel,
          isOwner: isOwner
        });
      }

      floorSchedule.push({
        floorIndex: f,
        floorName: `${f}. Normal Kat`,
        slabGrossM2: normalKatBrut,
        slabNetM2: normalKatNet,
        shopsCount: 0,
        unitsCount: unitsPerNormalFloor,
        totalFloorSections: unitsPerNormalFloor,
        unitAvgNetM2: normalFloorUnitNetM2,
        roomType: normalFloorRoomType,
        summaryText: `${unitsPerNormalFloor} Daire (${normalFloorRoomType} • Net ~${normalFloorUnitNetM2} m²)`,
        units: floorUnits
      });
    }

    // 3. MİMARİ SENARYOLAR
    const scA_avgNet = normalFloorUnitNetM2;
    const scA_unitCount = totalNewResidentialUnits;
    const scA_shopCount = groundFloorShops;
    const scA_totalSections = totalNewSections;
    const scA_unitPrice = parseFloat(s.newUnitPriceM2);
    const scA_totalValue = toplamSatilabilirBrutAlan * scA_unitPrice;

    const scB_unitCount = totalNewResidentialUnits;
    const scB_shopCount = groundFloorShops;
    const scB_totalSections = totalNewSections;
    const scB_unitPrice = parseFloat(s.newUnitPriceM2) * 1.03;
    const scB_totalValue = toplamSatilabilirBrutAlan * scB_unitPrice;

    const scC_unitCount = totalNewResidentialUnits;
    const scC_shopCount = groundFloorShops;
    const scC_totalSections = totalNewSections;
    const scC_unitPrice = parseFloat(s.newUnitPriceM2) * 1.25;
    const scC_totalValue = toplamSatilabilirBrutAlan * scC_unitPrice;

    const scenarios = {
      A: {
        id: 'A',
        title: "Senaryo A — Hak Koruyan Düzen",
        desc: `Kat tabliyesi (${normalKatBrut} m²) ve katta ${unitsPerNormalFloor} daire düzeniyle mevcut malik haklarını birebir koruyan dengeli mimari.`,
        unitCount: scA_unitCount,
        shopCount: scA_shopCount,
        totalSections: scA_totalSections,
        avgNetM2: scA_avgNet,
        shopAvgNetM2: targetShopAvgNet,
        shopNetTotal: targetShopNetTotal,
        tabanAlani: tabanAlani,
        zeminKatNetAlani: zeminKatNetAlani,
        normalKatBrut: normalKatBrut,
        normalKatNet: normalKatNet,
        normalKatSayisi: normalKatSayisi,
        unitsPerNormalFloor: unitsPerNormalFloor,
        roomType: normalFloorRoomType,
        ownerUnits: existingUnits,
        ownerShops: existingShops,
        contractorUnits: contractorUnits,
        contractorShops: contractorShops,
        contractorTotalSections: contractorTotalSections,
        unitPriceM2: scA_unitPrice,
        totalProjectValue: scA_totalValue,
        specGrade: "Standart Konfor"
      },
      B: {
        id: 'B',
        title: "Senaryo B — Maksimum Ekonomik Proje",
        desc: `Katta ${unitsPerNormalFloor} daireli optimize yerleşim (${normalFloorRoomType}) + zemin dükkanları ile maksimum satılabilir kârlılık modeli.`,
        unitCount: scB_unitCount,
        shopCount: scB_shopCount,
        totalSections: scB_totalSections,
        avgNetM2: normalFloorUnitNetM2,
        shopAvgNetM2: targetShopAvgNet,
        shopNetTotal: targetShopNetTotal,
        tabanAlani: tabanAlani,
        zeminKatNetAlani: zeminKatNetAlani,
        normalKatBrut: normalKatBrut,
        normalKatNet: normalKatNet,
        normalKatSayisi: normalKatSayisi,
        unitsPerNormalFloor: unitsPerNormalFloor,
        roomType: normalFloorRoomType,
        ownerUnits: existingUnits,
        ownerShops: existingShops,
        contractorUnits: contractorUnits,
        contractorShops: contractorShops,
        contractorTotalSections: contractorTotalSections,
        unitPriceM2: scB_unitPrice,
        totalProjectValue: scB_totalValue,
        specGrade: "Yüksek Kârlılık / Optimum"
      },
      C: {
        id: 'C',
        title: "Senaryo C — Premium Lüks Proje",
        desc: `Prestijli mimari kaplama, akıllı ev altyapısı ve yüksek marka şerefiye primi sunan lüks rezidans konsepti.`,
        unitCount: scC_unitCount,
        shopCount: scC_shopCount,
        totalSections: scC_totalSections,
        avgNetM2: normalFloorUnitNetM2,
        shopAvgNetM2: targetShopAvgNet,
        shopNetTotal: targetShopNetTotal,
        tabanAlani: tabanAlani,
        zeminKatNetAlani: zeminKatNetAlani,
        normalKatBrut: normalKatBrut,
        normalKatNet: normalKatNet,
        normalKatSayisi: normalKatSayisi,
        unitsPerNormalFloor: unitsPerNormalFloor,
        roomType: normalFloorRoomType,
        ownerUnits: existingUnits,
        ownerShops: existingShops,
        contractorUnits: contractorUnits,
        contractorShops: contractorShops,
        contractorTotalSections: contractorTotalSections,
        unitPriceM2: scC_unitPrice,
        totalProjectValue: scC_totalValue,
        specGrade: "Lüks Rezidans / Premium"
      }
    };

    const activeScenario = scenarios[s.selectedScenario] || scenarios.B;

    // 4. DETAYLI 2026 MALİYET MOTORU
    const isPremium = s.selectedScenario === 'C';
    const finCostM2 = isPremium ? UNIT_COSTS_2026.finishingPremiumPerM2 : UNIT_COSTS_2026.finishingStandardPerM2;
    
    const costDemolition = toplamInsaatAlani * UNIT_COSTS_2026.demolitionPerM2;
    const costPermits = toplamInsaatAlani * UNIT_COSTS_2026.permitsAndDesignPerM2;
    const costRough = toplamInsaatAlani * UNIT_COSTS_2026.roughConstructionPerM2;
    const costFinishing = toplamInsaatAlani * finCostM2;
    const costMEP = toplamInsaatAlani * UNIT_COSTS_2026.mepPerM2;
    const costElectrical = toplamInsaatAlani * UNIT_COSTS_2026.electricalPerM2;
    const costLandscape = toplamInsaatAlani * UNIT_COSTS_2026.externalAndLandscapePerM2;

    const directConstructionCost = costDemolition + costPermits + costRough + costFinishing + costMEP + costElectrical + costLandscape;

    const costSiteOverhead = directConstructionCost * UNIT_COSTS_2026.siteOverheadPct;
    const costContingency = directConstructionCost * UNIT_COSTS_2026.contingencyRiskPct;
    const costFinancing = directConstructionCost * UNIT_COSTS_2026.financingCostPct;

    const baseConstructionCost = directConstructionCost + costSiteOverhead + costContingency + costFinancing;
    
    const marginPct = (s.applyContractorMargin !== false) ? (parseFloat(s.contractorMarginPct) >= 0 ? parseFloat(s.contractorMarginPct) : 35) : 0;
    const costContractorMargin = baseConstructionCost * (marginPct / 100);

    const totalProjectCost = baseConstructionCost + costContractorMargin;
    const costPerM2Total = totalProjectCost / (toplamInsaatAlani || 1);

    // 5. DEVLET DESTEKLERİ & YARISI BİZDEN MOTORU
    const normCity = (s.city || "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
    
    const isIstanbul = normCity.includes("istanbul");
    const eligibleYBDUnits = isIstanbul ? existingUnits : 0;
    const eligibleYBDShops = isIstanbul ? existingShops : 0;
    
    const ybdHibePerUnit = 875000;
    const ybdKrediPerUnit = 875000;
    const ybdTahliyePerUnit = 125000;
    const ybdTotalPerUnit = 1875000;

    const ybdHibePerShop = 437500;
    const ybdKrediPerShop = 437500;
    const ybdTahliyePerShop = 125000;
    const ybdTotalPerShop = 1000000;
    
    const totalYBDHibe = (eligibleYBDUnits * ybdHibePerUnit) + (eligibleYBDShops * ybdHibePerShop);
    const totalYBDKredi = (eligibleYBDUnits * ybdKrediPerUnit) + (eligibleYBDShops * ybdKrediPerShop);
    const totalYBDTahliye = (eligibleYBDUnits + eligibleYBDShops) * 125000;
    const totalYBDFinancing = totalYBDHibe + totalYBDKredi + totalYBDTahliye;

    const ybdInsaatHakedisToplam = (eligibleYBDUnits * 1750000) + (eligibleYBDShops * 875000);
    const ybdHakedisSteps = [
      { name: "1. Aşama: İş Başlangıcı & Ruhsat", pct: 30, amount: ybdInsaatHakedisToplam * 0.30, desc: "Ruhsat alımı ve şantiye mobilizasyonu." },
      { name: "2. Aşama: Taşıyıcı Sistem (Kaba Yapı)", pct: 30, amount: ybdInsaatHakedisToplam * 0.30, desc: "Betonarme karkas ve çatı tamamlanması." },
      { name: "3. Aşama: Sıva & Dış Cephe & İnce İşler", pct: 30, amount: ybdInsaatHakedisToplam * 0.30, desc: "İç mekanik, sıva ve cephe mantolaması." },
      { name: "4. Aşama: İskan & Yapı Kullanım İzni", pct: 10, amount: ybdInsaatHakedisToplam * 0.10, desc: "İskan alımı ve dairelerin teslimi." }
    ];

    const isIADSPEligible = IADSP_PILOT_CITIES.some(c => {
      const normC = c.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
      return normCity.includes(normC);
    });
    const iadspMaxKrediPerUnit = 3000000;
    const iadspMonthlyRate = 0.0069;
    const iadspTotalMonths = 180;
    const iadspGraceMonths = 12;
    const iadspPayMonths = iadspTotalMonths - iadspGraceMonths;
    
    const r = iadspMonthlyRate;
    const n = iadspPayMonths;
    const iadspMonthlyInstallmentPerUnit = iadspMaxKrediPerUnit * ( (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) );
    const iadspTotalRepaymentPerUnit = iadspMonthlyInstallmentPerUnit * n;
    
    const totalIADSPFinancing = isIADSPEligible ? (existingTotalSections * iadspMaxKrediPerUnit) : 0;

    // 6. 4 FİNANSMAN MODELİ
    const requiredContractorEconomicShare = Math.min(0.85, Math.max(0.35, (totalProjectCost * 1.22) / (activeScenario.totalProjectValue || 1)));
    const model1_ContractorSharePct = Math.round(requiredContractorEconomicShare * 100);
    const model1_ContractorRevenue = activeScenario.totalProjectValue * (model1_ContractorSharePct / 100);
    const model1_ContractorNetProfit = model1_ContractorRevenue - totalProjectCost;
    const model1_ContractorROI = (model1_ContractorNetProfit / (totalProjectCost || 1)) * 100;

    const model2_NetCostAfterSupport = Math.max(0, totalProjectCost - ybdInsaatHakedisToplam);
    const model2_OwnerPaymentPerUnit = (eligibleYBDUnits + eligibleYBDShops) > 0 
      ? (model2_NetCostAfterSupport / (eligibleYBDUnits + eligibleYBDShops)) 
      : (totalProjectCost / existingTotalSections);
    const model2_ContractorSharePct = Math.max(0, Math.round((model2_NetCostAfterSupport / (activeScenario.totalProjectValue || 1)) * 100));
    const model2_ContractorProfit = (totalProjectCost * UNIT_COSTS_2026.contractorProfitTargetPct);
    const model2_ContractorROI = UNIT_COSTS_2026.contractorProfitTargetPct * 100;

    const model3_CreditUsedTotal = Math.min(totalProjectCost, totalIADSPFinancing);
    const model3_RemainingCost = Math.max(0, totalProjectCost - model3_CreditUsedTotal);
    const model3_OwnerPaymentPerUnit = isIADSPEligible ? (model3_RemainingCost / existingTotalSections) : (totalProjectCost / existingTotalSections);
    const model3_ContractorProfit = totalProjectCost * UNIT_COSTS_2026.contractorProfitTargetPct;
    const model3_ContractorROI = UNIT_COSTS_2026.contractorProfitTargetPct * 100;

    const model4_OwnerPaymentPerUnit = (totalProjectCost * 1.15) / existingTotalSections;
    const model4_ContractorNetProfit = totalProjectCost * 0.15;
    const model4_ContractorROI = 15.0;

    const existingLandValue = landArea * (parseFloat(s.existingUnitPriceM2) || 80000) * 0.60;
    const projectTotalSalesValue = activeScenario.totalProjectValue;
    const grossProjectValueAdded = projectTotalSalesValue - totalProjectCost;
    
    const existingMonthlyRentalTotal = (existingUnits * (parseFloat(s.existingRentMonthly) || 30000)) + (existingShops * (parseFloat(s.existingRentMonthly) || 30000) * 1.5);
    const newMonthlyRentalTotal = (totalNewResidentialUnits * (parseFloat(s.newRentMonthly) || 50000)) + (groundFloorShops * (parseFloat(s.newRentMonthly) || 50000) * 1.6);
    const newAnnualRentalTotal = newMonthlyRentalTotal * 12;
    const grossRentalYieldPct = (newAnnualRentalTotal / (projectTotalSalesValue || 1)) * 100;

    const months = parseInt(s.projectMonths) || 22;
    const annualizedROI = (Math.pow(1 + (model1_ContractorROI / 100), 12 / months) - 1) * 100;

    let scoreLegal = s.titleStatus === "Kat Mülkiyeti" ? 20 : 15;
    let scoreZoning = (emsal <= 2.2 && taks <= 0.40) ? 19 : 14;
    let scoreFinancing = isIstanbul ? 15 : (isIADSPEligible ? 13 : 8);
    let scoreMajority = (parseFloat(s.majorityPct) >= 70) ? 15 : ((parseFloat(s.majorityPct) >= 50.1) ? 11 : 5);
    let scoreCost = s.soilCategory.includes("Sağlam") ? 10 : (s.soilCategory.includes("Orta") ? 8 : 5);
    let scoreSales = (parseFloat(s.newUnitPriceM2) > 80000) ? 10 : 8;
    let scoreTime = months <= 24 ? 10 : 7;

    const totalRiskScore = scoreLegal + scoreZoning + scoreFinancing + scoreMajority + scoreCost + scoreSales + scoreTime;
    
    let riskLevel = "DÜŞÜK RİSK";
    let riskClass = "text-success";
    if (totalRiskScore < 65) {
      riskLevel = "YÜKSEK RİSK";
      riskClass = "text-danger";
    } else if (totalRiskScore < 78) {
      riskLevel = "ORTA RİSK";
      riskClass = "text-warning";
    }

    let decision = "AL";
    let decisionBadgeClass = "decision-take";
    let decisionIcon = "🟢";
    let decisionText = "PROJEYİ AL";
    let decisionRationale = "";
    let recommendedModel = "";

    if (isIstanbul) {
      recommendedModel = `Yarısı Bizden + %${model2_ContractorSharePct} Müteahhit Payı / Malik Katkısı`;
    } else if (isIADSPEligible) {
      recommendedModel = `Dünya Bankası İADŞP Finansmanı (3M TL/Bölüm) + Taahhüt`;
    } else {
      recommendedModel = `%${model1_ContractorSharePct} Kat Karşılığı Modeli`;
    }

    if (totalRiskScore >= 75 && model1_ContractorROI >= 24 && parseFloat(s.majorityPct) >= 60) {
      decision = "AL";
      decisionBadgeClass = "decision-take";
      decisionIcon = "🟢";
      decisionText = "PROJEYİ AL";
      decisionRationale = `Proje kârlılığı (Müteahhit ROI: %${model1_ContractorROI.toFixed(1)}), ${existingUnits} Daire ve ${existingShops} Dükkan arsa payı dinamikleri hedef yatırım kriterlerini tam olarak karşılıyor. Malik anlaşma oranı (%${s.majorityPct}) 6306 sayılı kanunun %50+1 salt çoğunluk şartını güvenle aşıyor.`;
    } else if (model1_ContractorROI >= 15 || parseFloat(s.majorityPct) >= 50.1) {
      decision = "MÜZAKERE_ET";
      decisionBadgeClass = "decision-negotiate";
      decisionIcon = "🟡";
      decisionText = "MÜZAKERE ET";
      const targetPct = Math.min(75, model1_ContractorSharePct + 6);
      decisionRationale = `Proje potansiyeli yüksek ancak mevcut şartlarda kâr marjı sınırda. Müteahhit payı %${model1_ContractorSharePct} yerine en az %${targetPct} olarak revize edilirse veya ${isIstanbul ? 'Yarısı Bizden hibe/kredisi' : 'İADŞP kredisi'} devreye alınırsa proje A+ fizibilite seviyesine ulaşır.`;
    } else {
      decision = "ALMA";
      decisionBadgeClass = "decision-pass";
      decisionIcon = "🔴";
      decisionText = "PROJEYİ ALMA";
      decisionRationale = `Finansman açığı yüksek, malik çoğunluğu yetersiz (%${s.majorityPct} < %50+1) veya proje yatırım kârlılığı risk primini karşılamıyor. Şartlar iyileştirilmeden taahhüt altına girilmesi önerilmez.`;
    }

    // 7. MALİK BAZLI BİLANÇO & KAT/CEPHE TAHSİS TABLOSU
    let assignedResidentialCounter = 0;
    let assignedShopCounter = 0;

    const ownerTable = (s.owners || []).map((o, idx) => {
      const isShop = o.sectionType === 'Ticari';
      const priceMultiplier = isShop ? 1.35 : 1.0;
      
      const unitPrice = parseFloat(s.existingUnitPriceM2) * priceMultiplier;
      const newPrice = parseFloat(s.newUnitPriceM2) * priceMultiplier;
      
      const existingVal = o.existingNetM2 * unitPrice;
      
      let newNetM2;
      let allocatedFloor = 0;
      let allocatedDoorNo = 0;
      let allocatedRoomType = "";
      let allocatedFacade = "";
      let allocatedFacadeDetail = "";
      let allocatedDescription = "";

      if (isShop) {
        assignedShopCounter++;
        allocatedFloor = 0;
        allocatedDoorNo = assignedShopCounter;
        newNetM2 = targetShopAvgNet || Math.round(zeminKatNetAlani / Math.max(1, groundFloorShops));
        allocatedRoomType = "Ticari Dükkan";
        allocatedFacade = "Cadde / Vitrin";
        allocatedFacadeDetail = "Zemin Kat Doğrudan Cadde Girişi (Güneş & Vitrin Alanı)";
        allocatedDescription = `Zemin Kat • Dükkan ${allocatedDoorNo} (Net ${newNetM2} m² • Cadde Cepheli)`;
      } else {
        assignedResidentialCounter++;
        allocatedFloor = Math.min(normalKatSayisi, Math.floor((assignedResidentialCounter - 1) / unitsPerNormalFloor) + 1);
        allocatedDoorNo = ((assignedResidentialCounter - 1) % unitsPerNormalFloor) + 1;
        
        const ratioToAvg = (avgNet > 0) ? (o.existingNetM2 / avgNet) : 1.0;
        newNetM2 = Math.round(normalFloorUnitNetM2 * (0.85 + 0.15 * ratioToAvg));
        allocatedRoomType = getRoomType(newNetM2);
        
        const facadeObj = FACADE_DIRECTIONS[(allocatedDoorNo - 1) % FACADE_DIRECTIONS.length];
        allocatedFacade = facadeObj.name;
        allocatedFacadeDetail = facadeObj.desc;
        allocatedDescription = `${allocatedFloor}. Kat • Daire ${allocatedDoorNo} (${allocatedRoomType} • ${allocatedFacade})`;
      }
      
      const newGrossM2 = Math.round(newNetM2 * 1.25);
      const newVal = newGrossM2 * newPrice;
      
      const hibeShare = isIstanbul ? (isShop ? ybdHibePerShop : ybdHibePerUnit) : 0;
      const krediShare = isIstanbul ? (isShop ? ybdKrediPerShop : ybdKrediPerUnit) : (isIADSPEligible ? iadspMaxKrediPerUnit : 0);
      const tahliyeShare = isIstanbul ? (isShop ? ybdTahliyePerShop : ybdTahliyePerUnit) : 0;
      
      const constructionSupport = isIstanbul ? (hibeShare + krediShare) : (isIADSPEligible ? krediShare : 0);
      const tahliyeSupportToOwner = isIstanbul ? tahliyeShare : 0;
      
      let extraPay = 0;
      if (isIstanbul) {
        extraPay = Math.max(0, Math.round((totalProjectCost / existingTotalSections) - constructionSupport));
      } else if (isIADSPEligible) {
        extraPay = Math.max(0, Math.round((totalProjectCost / existingTotalSections) - krediShare));
      } else {
        extraPay = 0;
      }
      
      const netGain = (newVal - existingVal) - extraPay;
      const ownerROI = (existingVal + extraPay) > 0 ? ((netGain / (existingVal + extraPay)) * 100) : 0;

      return {
        ...o,
        existingValue: existingVal,
        newNetM2: Math.max(25, newNetM2),
        newGrossM2: Math.max(35, newGrossM2),
        newValue: newVal,
        allocatedFloor,
        allocatedDoorNo,
        allocatedRoomType,
        allocatedFacade,
        allocatedFacadeDetail,
        allocatedDescription,
        hibe: hibeShare,
        kredi: krediShare,
        tahliye: tahliyeShare,
        constructionSupport: constructionSupport,
        totalSupport: constructionSupport,
        tahliyeSupportToOwner: tahliyeSupportToOwner,
        extraPayment: extraPay,
        netGain: netGain,
        roiPct: ownerROI
      };
    });

    this.results = {
      landArea,
      emsal,
      taks,
      tabanAlani,
      zeminKatNetAlani,
      normalKatBrut,
      normalKatNet,
      normalKatSayisi,
      unitsPerNormalFloor,
      normalFloorUnitNetM2,
      normalFloorUnitGrossM2,
      normalFloorRoomType,
      normalKatlarDaireSayisi,
      normalKatlarNetToplam,
      groundFloorShops,
      groundFloorUnits,
      targetShopNetTotal,
      targetShopAvgNet,
      totalNewResidentialUnits,
      totalNewSections,
      contractorUnits,
      contractorShops,
      contractorTotalSections,
      floorSchedule,
      technicalSpecs: TECHNICAL_SPECIFICATIONS_SEGMENTS[s.specSegment || 'orta'] || TECHNICAL_SPECIFICATIONS_SEGMENTS.orta,
      specSegment: {
        key: s.specSegment || 'orta',
        title: (s.specSegment === 'giris') ? 'Giriş / Standart' : ((s.specSegment === 'premium') ? 'Premium & High-Glass' : 'Orta / Konfor Plus'),
        badge: (s.specSegment === 'giris') ? '🌱 Giriş / Standart Segment' : ((s.specSegment === 'premium') ? '💎 Premium & High-Glass Segment' : '⭐ Orta / Konfor Plus (Önerilen)')
      },
      emsaleDahilAlan,
      emsalDisiAlan,
      bodrumOtoparkSiginak,
      toplamInsaatAlani,
      toplamSatilabilirBrutAlan,
      
      existingSummary: {
        units: existingUnits,
        shops: existingShops,
        totalSections: existingTotalSections,
        totalNetM2: existingTotalNet,
        totalOwners: s.ownerCount
      },

      scenarios,
      activeScenario,
      
      costs: {
        demolition: costDemolition,
        permits: costPermits,
        rough: costRough,
        finishing: costFinishing,
        mep: costMEP,
        electrical: costElectrical,
        landscape: costLandscape,
        directTotal: directConstructionCost,
        siteOverhead: costSiteOverhead,
        contingency: costContingency,
        financing: costFinancing,
        baseConstructionCost: baseConstructionCost,
        contractorMarginPct: marginPct,
        contractorMargin: costContractorMargin,
        isMarginActive: marginPct > 0,
        totalProjectCost: totalProjectCost,
        costPerM2: costPerM2Total
      },

      supports: {
        isIstanbul,
        isIADSPEligible,
        ybd: {
          eligibleUnits: eligibleYBDUnits,
          eligibleShops: eligibleYBDShops,
          totalSections: eligibleYBDUnits + eligibleYBDShops,
          hibePerUnit: ybdHibePerUnit,
          krediPerUnit: ybdKrediPerUnit,
          tahliyePerUnit: ybdTahliyePerUnit,
          contractorInsaatSupportPerUnit: ybdHibePerUnit + ybdKrediPerUnit,
          totalHibe: totalYBDHibe,
          totalKredi: totalYBDKredi,
          totalTahliye: totalYBDTahliye,
          totalInsaatHakedisFinancing: ybdInsaatHakedisToplam,
          totalFinancing: totalYBDFinancing,
          hakedisSteps: ybdHakedisSteps
        },
        iadsp: {
          isEligible: isIADSPEligible,
          maxKrediPerUnit: iadspMaxKrediPerUnit,
          monthlyRate: iadspMonthlyRate,
          totalMonths: iadspTotalMonths,
          graceMonths: iadspGraceMonths,
          monthlyInstallmentPerUnit: iadspMonthlyInstallmentPerUnit,
          totalRepaymentPerUnit: iadspTotalRepaymentPerUnit,
          totalFinancing: totalIADSPFinancing
        }
      },

      models: {
        model1_KatKarsiligi: {
          name: "Model 1: Kat Karşılığı (Risk Düzeltilmiş)",
          contractorSharePct: model1_ContractorSharePct,
          contractorRevenue: model1_ContractorRevenue,
          contractorProfit: model1_ContractorNetProfit,
          contractorROI: model1_ContractorROI,
          ownerCashPaymentTotal: 0,
          desc: "Maliklerden nakit alınmaz. Maliyet ve kâr karşılığı bağımsız bölümler müteahhide bırakılır."
        },
        model2_YarisiBizden: {
          name: "Model 2: Yarısı Bizden Destekli",
          totalInsaatSupport: ybdInsaatHakedisToplam,
          totalSupport: totalYBDFinancing,
          totalTahliyeToOwners: totalYBDTahliye,
          netCostToShare: model2_NetCostAfterSupport,
          ownerPaymentPerUnit: model2_OwnerPaymentPerUnit,
          contractorSharePct: model2_ContractorSharePct,
          contractorProfit: model2_ContractorProfit,
          contractorROI: model2_ContractorROI,
          desc: "Konut başına 875.000 TL Hibe + 875.000 TL Kredi (Toplam 1.750.000 TL) inşaat hakedişi olarak müteahhite aktarılır. 125.000 TL Taşınma Desteği doğrudan malikin hesabına nakit ödenir."
        },
        model3_IADSP: {
          name: "Model 3: Dünya Bankası İADŞP Finansmanı",
          totalCredit: model3_CreditUsedTotal,
          remainingCost: model3_RemainingCost,
          ownerPaymentPerUnit: model3_OwnerPaymentPerUnit,
          monthlyInstallment: iadspMonthlyInstallmentPerUnit,
          contractorProfit: model3_ContractorProfit,
          contractorROI: model3_ContractorROI,
          desc: "7 pilot ilde bağımsız bölüm başına 3 Milyon TL'ye kadar %0,69 aylık faiz, 180 ay vadeli uygun geri ödemeli kredi."
        },
        model4_Ozkaynak: {
          name: "Model 4: Özkaynak / Malik Katkısı",
          ownerPaymentPerUnit: model4_OwnerPaymentPerUnit,
          contractorProfit: model4_ContractorNetProfit,
          contractorROI: model4_ContractorROI,
          desc: "Tüm finansman maliklerce sağlanır; müteahhit saf taahhüt kârı (%15) ile inşaatı tamamlar."
        }
      },

      financials: {
        existingLandValue,
        projectTotalSalesValue,
        grossProjectValueAdded,
        existingMonthlyRentalTotal,
        newMonthlyRentalTotal,
        grossRentalYieldPct,
        annualizedROI
      },

      riskScore: {
        total: totalRiskScore,
        level: riskLevel,
        levelClass: riskClass,
        details: {
          legal: scoreLegal,
          zoning: scoreZoning,
          financing: scoreFinancing,
          majority: scoreMajority,
          cost: scoreCost,
          sales: scoreSales,
          time: scoreTime
        }
      },

      decision: {
        verdict: decision,
        badgeClass: decisionBadgeClass,
        icon: decisionIcon,
        text: decisionText,
        rationale: decisionRationale,
        recommendedModel: recommendedModel
      },

      ownersTable: ownerTable
    };

    return this.results;
  }

  formatCurrency(num) {
    if (isNaN(num)) return "0 TL";
    if (num >= 1000000) {
      return (num / 1000000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " Milyon TL";
    }
    return Math.round(num).toLocaleString('tr-TR') + " TL";
  }

  formatCurrencyFull(num) {
    if (isNaN(num)) return "0 TL";
    return Math.round(num).toLocaleString('tr-TR') + " TL";
  }

  formatM2(num) {
    if (isNaN(num)) return "0 m²";
    return Math.round(num).toLocaleString('tr-TR') + " m²";
  }

  formatPct(num) {
    if (isNaN(num)) return "%0";
    return "%" + Number(num).toFixed(1);
  }
}

// Global instance
window.KDEngine = new KentselDonusumEngine();
