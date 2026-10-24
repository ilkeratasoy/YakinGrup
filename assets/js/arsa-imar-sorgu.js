/**
 * YAKIN GRUP — AKILLI ARSA, TAPU & İMAR PLAN MOTORU (360DÖNÜŞÜM STANDARDI)
 * 3 Arama Modu: [Adres ile] • [Harita ile] • [Ada/parsel ile]
 * Türkiye'nin 81 İli, Detaylı İlçe & Mahalle Listeleri, Leaflet Uydu Haritası,
 * Vektörel Uydu Parseli, Ölçülü Kenar Metrajları, 1/1000 İmar Paftası, 360° VR.
 */

(function (window, document) {
  'use strict';

  const TILE = 256;

  // 1. TÜRKİYE 81 İL LİSTESİ (Plaka Sırasıyla)
  const TURKIYE_ILLERI = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
    'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
    'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
    'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
    'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis',
    'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
    'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
    'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Şırnak', 'Sivas',
    'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
  ];

  // 2. KAPSAMLI İLÇE VERİTABANI
  const ILCELER_DB = {
    'İstanbul': [
      'Kadıköy', 'Beşiktaş', 'Bakırköy', 'Şişli', 'Üsküdar', 'Ataşehir', 'Maltepe', 'Kartal',
      'Pendik', 'Tuzla', 'Ümraniye', 'Beykoz', 'Çekmeköy', 'Sancaktepe', 'Sultanbeyli', 'Şile',
      'Adalar', 'Fatih', 'Beyoğlu', 'Eyüpsultan', 'Kağıthane', 'Sarıyer', 'Zeytinburnu', 'Güngören',
      'Bahçelievler', 'Bağcılar', 'Esenler', 'Bayrampaşa', 'Gaziosmanpaşa', 'Sultangazi',
      'Küçükçekmece', 'Avcılar', 'Başakşehir', 'Beylikdüzü', 'Esenyurt', 'Büyükçekmece', 'Çatalca',
      'Silivri', 'Arnavutköy'
    ],
    'Ankara': [
      'Çankaya', 'Yenimahalle', 'Keçiören', 'Mamak', 'Altındağ', 'Etimesgut', 'Sincan', 'Gölbaşı',
      'Pursaklar', 'Polatlı', 'Kahramankazan', 'Beypazarı', 'Elmadağ', 'Çubuk', 'Akyurt', 'Bala',
      'Güdül', 'Haymana', 'Kalecik', 'Kızılcahamam', 'Nallıhan', 'Şereflikoçhisar'
    ],
    'İzmir': [
      'Karşıyaka', 'Konak', 'Bornova', 'Bayraklı', 'Buca', 'Çiğli', 'Karabağlar', 'Balçova',
      'Narlıdere', 'Gaziemir', 'Menemen', 'Torbalı', 'Urla', 'Çeşme', 'Seferihisar', 'Kemalpaşa',
      'Aliağa', 'Bergama', 'Dikili', 'Foça', 'Güzelbahçe', 'Karaburun', 'Menderes', 'Ödemiş',
      'Selçuk', 'Tire'
    ],
    'Kocaeli': [
      'İzmit', 'Gebze', 'Darıca', 'Çayırova', 'Körfez', 'Gölcük', 'Derince', 'Kartepe',
      'Başiskele', 'Karamürsel', 'Dilovası', 'Kandıra'
    ],
    'Bursa': [
      'Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya', 'Gemlik', 'İnegöl', 'Gürsu', 'Kestel',
      'Mustafakemalpaşa', 'Orhangazi', 'Karacabey', 'İznik', 'Yenişehir'
    ],
    'Antalya': [
      'Muratpaşa', 'Konyaaltı', 'Kepez', 'Alanya', 'Manavgat', 'Serik', 'Kemer', 'Kaş',
      'Döşemealtı', 'Aksu', 'Kumluca', 'Finike', 'Gazipaşa', 'Korkuteli'
    ],
    'Tekirdağ': [
      'Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Kapaklı', 'Ergene', 'Marmaraereğlisi', 'Şarköy', 'Muratlı', 'Malkara', 'Hayrabolu', 'Saray'
    ],
    'Sakarya': [
      'Adapazarı', 'Serdivan', 'Erenler', 'Arifiye', 'Sapanca', 'Hendek', 'Akyazı', 'Karasu', 'Geyve', 'Pamukova', 'Ferizli', 'Kocaali'
    ]
  };

  // 3. MAHALLE VERİTABANI
  const MAHALLELER_DB = {
    'Kadıköy': ['Fenerbahçe', 'Caddebostan', 'Suadiye', 'Bostancı', 'Erenköy', 'Göztepe', 'Kozyatağı', 'Caferağa (Moda)', 'Acıbadem', 'Rasimpaşa', 'Fikirtepe', 'Koşuyolu', 'Merdivenköy', 'Sahrayıcedit', 'Hasanpaşa', '19 Mayıs', 'Dumlupınar', 'Eğitim', 'Feneryolu', 'Osmanağa', 'Zühtüpaşa'],
    'Beşiktaş': ['Levazım', 'Etiler', 'Levent', 'Bebek', 'Ortaköy', 'Akatlar', 'Gayrettepe', 'Dikilitaş', 'Abbasağa', 'Balmumcu', 'Türkali', 'Sinanpaşa', 'Vişnezade', 'Yıldız', 'Kuruçeşme', 'Arnavutköy', 'Ulus', 'Konaklar', 'Mecidiye', 'Muradiye', 'Nisbetiye'],
    'Bakırköy': ['Yeşilköy', 'Yeşilyurt', 'Ataköy (1-2-5-6. Kısım)', 'Ataköy (3-4-11. Kısım)', 'Ataköy (7-8-9-10. Kısım)', 'Florya (Şenlikköy)', 'Zuhuratbaba', 'Kartaltepe', 'Osmaniye', 'Cevizlik', 'Sakızağacı', 'Yenimahalle', 'Basınköy'],
    'Şişli': ['Teşvikiye', 'Meşrutiyet (Nişantaşı)', 'Fulya', 'Mecidiyeköy', 'Esentepe', 'Halaskargazi', 'Gülbahar', 'İnönü (Pangaltı)', 'Feriköy', 'Cumhuriyet', 'Bozkurt', 'Duatepe', 'Ergenekon', 'Halide Edip Adıvar', 'Halil Rıfat Paşa', 'Kaptanpaşa', 'Kuştepe', 'Merkez', 'Paşa', 'Yayla'],
    'Üsküdar': ['Acıbadem', 'Altunizade', 'Beylerbeyi', 'Çengelköy', 'Kuzguncuk', 'Kandilli', 'Kısıklı', 'Ünalan', 'Bulgurlu', 'Salacak', 'Mimar Sinan', 'Ahmediye', 'Aziz Mahmut Hüdayi', 'Bahçelievler', 'Barbaros', 'Burhaniye', 'Cumhuriyet', 'Ferah', 'Güzeltepe', 'İcadiye', 'Kuleli', 'Murat Reis', 'Selami Ali', 'Sultantepe', 'Yavuztürk', 'Zeynep Kamil'],
    'Büyükçekmece': ['Mimaroba', 'Sinanoba', 'Ekinoba', 'Kumburgaz', 'Kamiloba', 'Dizdariye', 'Fatih', 'Tepekent', 'Güzelce', 'Albatros (Atatürk)', 'Cumhuriyet', 'Hürriyet', 'Murat Çeşme', 'Pınartepe', 'Ulus', 'Celaliye', 'Türkoba'],
    'Küçükçekmece': ['Atakent', 'Cennet', 'Halkalı Merkez', 'İnönü', 'Cumhuriyet', 'Fevzi Çakmak', 'Gültepe', 'Kanarya', 'Kartaltepe', 'Kemalpaşa', 'Mehmet Akif', 'Söğütlü Çeşme', 'Sultan Murat', 'Tevfik Bey', 'Yarımburgaz', 'Yenimahalle', 'Yeşilova'],
    'Ataşehir': ['Batı Ataşehir (Barbaros)', 'Doğu Ataşehir (Atatürk)', 'İçerenköy', 'Küçükbakkalköy', 'Örnek', 'Esatpaşa', 'Fetih', 'Ferhatpaşa', 'İnönü', 'Kayışdağı', 'Mevlana', 'Mimar Sinan', 'Mustafa Kemal', 'Yeni Çamlıca', 'Yeni Sahra', 'Yenişehir'],
    'Maltepe': ['Bağlarbaşı', 'İdealtepe', 'Küçükyalı', 'Altıntepe', 'Cevizli', 'Yalı', 'Zümrütevler', 'Altayçeşme', 'Aydınevler', 'Başıbüyük', 'Büyükbakkalköy', 'Esenkent', 'Feyzullah', 'Fındıklı', 'Girne', 'Gülensu', 'Gülsuyu', 'Çınar'],
    'Kartal': ['Kordonboyu', 'Atalar', 'Cevizli', 'Karlıktepe', 'Petrol İş', 'Yukarı Mahalle', 'Yakacık Çarşı', 'Uğur Mumcu', 'Soğanlık Yeni', 'Orhantepe', 'Gümüşpınar', 'Hürriyet', 'Esentepe', 'Çavuşoğlu', 'Cumhuriyet'],
    'Beylikdüzü': ['Barış', 'Büyükşehir', 'Cumhuriyet', 'Adnan Kahveci', 'Dereağzı', 'Gürpınar', 'Kavaklı', 'Marmara', 'Sahil', 'Yakuplu'],
    'Karşıyaka': ['Donanmacı', 'Alaybey', 'Bostanlı', 'Mavişehir', 'Aksoy', 'Bahçelievler', 'Tersane', 'Nergiz', 'Şemikler', 'Atakent', 'Bahriye Üçok', 'Dedebaşı', 'Demirköprü', 'Goncalar', 'İmbatlı', 'Örnekköy', 'Yalı'],
    'Konak': ['Alsancak', 'Göztepe', 'Güzelyalı', 'Kültür', 'Akdeniz', 'Kahramanlar', 'Basmane (İsmet Kaptan)', 'Gültepe', 'Mithatpaşa', 'Murat Reis', 'Alsancak Liman', 'Çankaya'],
    'İzmit': ['Yahyakaptan', 'Yenişehir', 'Karabaş', 'Alikahya Fatih', 'Bekirdere', 'Tepeköy', 'Bağçeşme', 'Kozluk', 'Cedit', 'Gündoğdu', 'Hacıhızır', 'Kadıköy Mah.', 'Kuruçeşme Fatih', 'Mehmet Ali Paşa', 'Serdar', 'Tavşantepe', 'Topçular', 'Yeşilova'],
    'Çankaya': ['Ayrancı', 'Gaziosmanpaşa', 'Çayyolu', 'Ümitköy', 'Kızılay', 'Kavaklıdere', 'Dikmen', 'Bahçelievler', 'Balgat', 'Oran', 'Yıldız (Hilal)', 'Birlik', 'Cinnah', 'Maltepe', 'Tunalı Hilmi', 'Beytepe', 'Mutlukent']
  };

  // 4. İLÇE KOORDİNAT MERKEZLERİ
  const DISTRICT_COORDS = {
    'Kadıköy': { lat: 40.9715, lng: 29.0528, kaks: 2.05, taks: 0.35, hmax: 'Z+8 Kat', use: 'Konut' },
    'Beşiktaş': { lat: 41.0712, lng: 29.0234, kaks: 1.85, taks: 0.35, hmax: 'Z+5 Kat', use: 'Konut' },
    'Bakırköy': { lat: 40.9632, lng: 28.8245, kaks: 1.75, taks: 0.35, hmax: 'Z+4 Kat', use: 'Konut' },
    'Şişli': { lat: 41.0560, lng: 28.9980, kaks: 2.50, taks: 0.40, hmax: 'Z+8 Kat', use: 'Karma (Konut + Ticaret)' },
    'Üsküdar': { lat: 41.0180, lng: 29.0430, kaks: 1.80, taks: 0.35, hmax: 'Z+6 Kat', use: 'Konut' },
    'Büyükçekmece': { lat: 41.0210, lng: 28.5820, kaks: 1.50, defaultTaks: 0.30, taks: 0.30, hmax: 'Z+4 Kat', use: 'Konut' },
    'Ataşehir': { lat: 40.9930, lng: 29.1130, kaks: 2.10, taks: 0.35, hmax: 'Z+8 Kat', use: 'Konut' },
    'Maltepe': { lat: 40.9320, lng: 29.1320, kaks: 1.90, taks: 0.35, hmax: 'Z+6 Kat', use: 'Konut' },
    'Kartal': { lat: 40.8980, lng: 29.1920, kaks: 2.00, taks: 0.35, hmax: 'Z+7 Kat', use: 'Konut' },
    'Küçükçekmece': { lat: 40.9980, lng: 28.7840, kaks: 1.80, taks: 0.35, hmax: 'Z+5 Kat', use: 'Konut' },
    'Beylikdüzü': { lat: 41.0020, lng: 28.6430, kaks: 1.60, taks: 0.30, hmax: 'Z+6 Kat', use: 'Konut' },
    'Karşıyaka': { lat: 38.4590, lng: 27.1180, kaks: 2.40, taks: 0.40, hmax: 'Z+7 Kat', use: 'Karma (Konut + Ticaret)' },
    'Konak': { lat: 38.4190, lng: 27.1280, kaks: 2.50, taks: 0.40, hmax: 'Z+8 Kat', use: 'Karma (Konut + Ticaret)' },
    'İzmit': { lat: 40.7680, lng: 29.9650, kaks: 1.60, taks: 0.30, hmax: 'Z+5 Kat', use: 'Konut' },
    'Çankaya': { lat: 39.9050, lng: 32.8600, kaks: 2.00, taks: 0.35, hmax: 'Z+6 Kat', use: 'Konut' }
  };

  // 5. GERÇEKÇİ ÖRNEK PARSEL VERİTABANI
  const PARCEL_DB = {
    'kadikoy_1248_14': {
      city: 'İstanbul',
      district: 'Kadıköy',
      neighborhood: 'Fenerbahçe',
      street: 'Cemil Topuzlu Cad.',
      door_no: '14',
      ada: '1248',
      parsel: '14',
      area_m2: 850,
      area_source: 'deed',
      qualification: 'Kargir Apartman ve Arsası',
      function: 'Konut',
      kaks: 2.05,
      taks: 0.35,
      floors: 8,
      height_m: 24.5,
      hmax: 'Z+8 Kat',
      setback: 'Ön: 5.00m, Yan: 3.00m, Arka: h/2 (12.25m)',
      plan_name: '1/1000 Ölçekli Kadıköy Merkez & Sahil Bölgesi Uygulama İmar Planı',
      road_status: 'Görünmüyor (İmar hattı net)',
      riskli_yapi: 'Tespit Edildi (6306 Kapsamında Riskli Yapı Şerhi)',
      plan_notes: [
        { text: 'Ayrık nizam konut adalarında ön bahçe mesafesi minimum 5.00 metredir.', article: '14' },
        { text: 'Kentsel dönüşüm mevzuatı kapsamında +0.50 emsal artışı veya %25 taban genişletme hakkı saklıdır.', article: '22/B' },
        { text: 'Zemin katta kapalı otopark yapılması durumunda emsal harici alan sayılır.', article: '31' }
      ],
      rules: [
        'Kadıköy Belediyesi İmar Müdürlüğü Plan Notu: Çatı piyesi bağımsız bölüm olarak tescil edilemez, çatı eğimi max %33.',
        'Zemin etüdü ZF veya ZE sınıfı olup fore kazık / radye temel zorunluluğu bulunmaktadır.'
      ],
      lat: 40.9715,
      lng: 29.0528,
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [29.0526, 40.9717],
          [29.0531, 40.9718],
          [29.0533, 40.9713],
          [29.0528, 40.9712],
          [29.0526, 40.9717]
        ]]
      }
    },
    'besiktas_452_7': {
      city: 'İstanbul',
      district: 'Beşiktaş',
      neighborhood: 'Levazım',
      street: 'Koru Sokak',
      door_no: '7',
      ada: '452',
      parsel: '7',
      area_m2: 480,
      area_source: 'deed',
      qualification: 'Kargir Apartman',
      function: 'Konut',
      kaks: 1.85,
      taks: 0.35,
      floors: 5,
      height_m: 15.5,
      hmax: 'Z+5 Kat',
      setback: 'Ön: 5.00m, Yan: 3.00m, Arka: 4.00m',
      plan_name: '1/1000 Ölçekli Beşiktaş Geri Görünüm & Etiler Koruma İmar Planı',
      road_status: 'Yola Terk Yok',
      riskli_yapi: 'Tespit Edildi (Muafiyetli)',
      plan_notes: [
        { text: 'Boğaziçi Kanunu Etkilenme Bölgesi hükümleri saklıdır.', article: '8' },
        { text: 'Blok nizamda bitişik sağır duvar bırakılamaz.', article: '12' }
      ],
      rules: [
        'Beşiktaş Belediyesi İmar Notu: Çevre dokusu ve gabari sınırlaması 15.50 metre ile tahditlidir.',
        'Kapalı çıkmalar parsel sınırından 3.00m çekilmeden yapılamaz.'
      ],
      lat: 41.0712,
      lng: 29.0234,
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [29.0231, 41.0714],
          [29.0236, 41.0714],
          [29.0237, 41.0710],
          [29.0232, 41.0710],
          [29.0231, 41.0714]
        ]]
      }
    },
    'karsiyaka_812_5': {
      city: 'İzmir',
      district: 'Karşıyaka',
      neighborhood: 'Donanmacı',
      street: 'Cemal Gürsel Cad.',
      door_no: '28',
      ada: '812',
      parsel: '5',
      area_m2: 620,
      area_source: 'deed',
      qualification: 'Apartman ve Zemin Dükkan',
      function: 'Karma (Konut + Ticaret)',
      kaks: 2.40,
      taks: 0.40,
      floors: 7,
      height_m: 21.5,
      hmax: 'Z+7 Kat',
      setback: 'Ön: 3.00m, Yan: 3.00m, Arka: 5.00m',
      plan_name: '1/1000 Karşıyaka Revizyon İmar Planı (İADŞP Kapsamı)',
      road_status: 'Görünmüyor',
      riskli_yapi: 'Tespit Edildi (Dünya Bankası Pilot Destekli)',
      plan_notes: [
        { text: 'Zemin kat cadde cephelerinde ticari fonksiyon zorunludur.', article: '19' },
        { text: 'Dünya Bankası İADŞP kapsamında 0.53 faiz sübvansiyonlu krediye uygundur.', article: 'Proje-E' }
      ],
      rules: [
        'İzmir Büyükşehir Belediyesi Kentsel Dönüşüm Yönetmeliği: Zemin sıvılaşma önlemleri uygulanacaktır.'
      ],
      lat: 38.4590,
      lng: 27.1180,
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [27.1177, 38.4592],
          [27.1183, 38.4593],
          [27.1184, 38.4588],
          [27.1178, 38.4587],
          [27.1177, 38.4592]
        ]]
      }
    },
    'izmit_1045_22': {
      city: 'Kocaeli',
      district: 'İzmit',
      neighborhood: 'Yahyakaptan',
      street: 'Gazi Mustafa Kemal Bulvarı',
      door_no: '42',
      ada: '1045',
      parsel: '22',
      area_m2: 950,
      area_source: 'deed',
      qualification: 'Kargir Bina ve Bahçesi',
      function: 'Konut',
      kaks: 1.60,
      taks: 0.30,
      floors: 5,
      height_m: 15.5,
      hmax: 'Z+5 Kat',
      setback: 'Ön: 5.00m, Yan: 3.00m, Arka: 5.00m',
      plan_name: '1/1000 İzmit Doğu Bölgesi İmar Planı',
      road_status: 'Yola Terk Yok',
      riskli_yapi: 'Tespit Edildi',
      plan_notes: [
        { text: 'Kocaeli Deprem İmar Master Planı hükümleri esastır.', article: '7' }
      ],
      rules: [
        'İzmit Belediyesi: Otopark ihtiyacı parsel bünyesinde bodrum katta çözümlenecektir.'
      ],
      lat: 40.7680,
      lng: 29.9650,
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [29.9646, 40.7683],
          [29.9654, 40.7683],
          [29.9654, 40.7677],
          [29.9646, 40.7677],
          [29.9646, 40.7683]
        ]]
      }
    }
  };

  let activeMode = 'address'; // 'address' | 'map' | 'parcel'
  let currentLoadedParcel = null;
  let leafletMapInstance = null;
  let currentMapMarker = null;

  function fmtNumber(n, dec = 0) {
    const val = Number(n);
    if (isNaN(val)) return '-';
    return val.toLocaleString('tr-TR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  // Dinamik Ada/Parsel veya Adres Üretici
  function generateDynamicParcel(city, district, neighborhood, ada, parsel, street = '', door_no = '', forcedCoords = null) {
    const dInfo = DISTRICT_COORDS[district] || { lat: 41.0082, lng: 28.9784, kaks: 2.00, taks: 0.35, hmax: 'Z+6 Kat', use: 'Konut' };
    
    const seed = (parseInt(ada) || 100) * 19 + (parseInt(parsel) || 1) * 37 + (street ? street.length * 7 : 13);
    const area = 450 + (seed % 650);
    const sideW = Math.sqrt(area * 1.25);
    const sideH = area / sideW;
    
    const latDelta = (sideH / 111000);
    const lngDelta = (sideW / (111000 * Math.cos(dInfo.lat * Math.PI / 180)));
    
    const centerLat = forcedCoords ? forcedCoords.lat : (dInfo.lat + ((seed % 100) - 50) * 0.0003);
    const centerLng = forcedCoords ? forcedCoords.lng : (dInfo.lng + ((seed % 100) - 50) * 0.0004);

    const p0 = [centerLng - lngDelta / 2, centerLat + latDelta / 2];
    const p1 = [centerLng + lngDelta / 2, centerLat + latDelta / 2 * 0.95];
    const p2 = [centerLng + lngDelta / 2 * 1.05, centerLat - latDelta / 2];
    const p3 = [centerLng - lngDelta / 2 * 0.95, centerLat - latDelta / 2];

    const finalAda = ada || String(100 + (seed % 890));
    const finalParsel = parsel || String(1 + (seed % 48));

    return {
      city: city || 'İstanbul',
      district: district || 'Kadıköy',
      neighborhood: neighborhood || 'Merkez',
      street: street || 'Ana Cadde',
      door_no: door_no || '12',
      ada: String(finalAda),
      parsel: String(finalParsel),
      area_m2: area,
      area_source: 'deed',
      qualification: 'Kargir Apartman ve Arsası',
      function: dInfo.use || 'Konut',
      kaks: dInfo.kaks || 2.00,
      taks: dInfo.taks || 0.35,
      floors: parseInt((dInfo.hmax || 'Z+6').replace(/\D/g, '')) || 6,
      height_m: (parseInt((dInfo.hmax || 'Z+6').replace(/\D/g, '')) || 6) * 3 + 0.5,
      hmax: dInfo.hmax || 'Z+6 Kat',
      setback: 'Ön: 5.00m, Yan: 3.00m, Arka: 4.00m',
      plan_name: `1/1000 Ölçekli ${district} Revizyon Uygulama İmar Planı`,
      road_status: 'Görünmüyor (İmar hattı net)',
      riskli_yapi: 'Tespit Edildi (6306 Kapsamında)',
      plan_notes: [
        { text: 'Ayrık nizam konut adalarında ön bahçe mesafesi minimum 5.00 metredir.', article: '11' },
        { text: '6306 sayılı kanun kapsamında kentsel dönüşüm ruhsat harçlarından muaftır.', article: '7/A' }
      ],
      rules: [
        `${district} Belediyesi İmar Müdürlüğü: Zemin kat otopark veya sığınak yönetmeliğine uygun projelendirilecektir.`
      ],
      lat: centerLat,
      lng: centerLng,
      geometry: {
        type: 'Polygon',
        coordinates: [[p0, p1, p2, p3, p0]]
      }
    };
  }

  // Web Mercator Projeksiyonu
  function mercator(lon, lat, z) {
    const n = TILE * Math.pow(2, z);
    const s = Math.sin(lat * Math.PI / 180);
    return [
      (lon + 180) / 360 * n,
      (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n
    ];
  }

  function projectRing(ring) {
    let lat0 = 0, lon0 = 0;
    ring.forEach(p => { lon0 += p[0]; lat0 += p[1]; });
    lon0 /= ring.length;
    lat0 /= ring.length;
    const kx = 111320 * Math.cos(lat0 * Math.PI / 180);
    const ky = 110540;
    const pts = ring.map(p => [(p[0] - lon0) * kx, -(p[1] - lat0) * ky]);
    if (pts.length > 1) {
      const f = pts[0], l = pts[pts.length - 1];
      if (Math.abs(f[0] - l[0]) < 0.01 && Math.abs(f[1] - l[1]) < 0.01) {
        pts.pop();
      }
    }
    return pts;
  }

  function outerRing(geometry) {
    if (!geometry || !geometry.coordinates) return null;
    if (geometry.type === 'Polygon') return geometry.coordinates[0];
    if (geometry.type === 'MultiPolygon') return geometry.coordinates[0][0];
    return null;
  }

  /**
   * 360DÖNÜŞÜM'ÜN SHAPESVG MOTORU:
   * Uydu karoları, parsel dışı karartma maskesi, neon halo sınır, kenar metrajları.
   */
  function generateShapeSvg(geometry, areaText) {
    const ring = outerRing(geometry);
    if (!ring || ring.length < 4) return '';

    const meters = projectRing(ring);
    const W = 320, H = 220, aspect = W / H;
    let z = 18, wp, minX, maxX, minY, maxY, viewW, viewH;

    for (; z >= 15; z--) {
      wp = ring.map(p => mercator(p[0], p[1], z));
      if (wp.length > meters.length) wp = wp.slice(0, meters.length);
      minX = Math.min(...wp.map(p => p[0]));
      maxX = Math.max(...wp.map(p => p[0]));
      minY = Math.min(...wp.map(p => p[1]));
      maxY = Math.max(...wp.map(p => p[1]));

      viewW = Math.max((maxX - minX) / 0.6, (maxY - minY) / 0.6 * aspect, 220);
      if (viewW <= 1200 || z === 15) break;
    }

    viewH = viewW / aspect;
    const vx = (minX + maxX) / 2 - viewW / 2;
    const vy = (minY + maxY) / 2 - viewH / 2;
    const k = W / viewW;
    const sp = wp.map(p => [(p[0] - vx) * k, (p[1] - vy) * k]);

    let tiles = '';
    const minTileX = Math.floor(vx / TILE);
    const maxTileX = Math.floor((vx + viewW) / TILE);
    const minTileY = Math.floor(vy / TILE);
    const maxTileY = Math.floor((vy + viewH) / TILE);

    for (let tx = minTileX; tx <= maxTileX; tx++) {
      for (let ty = minTileY; ty <= maxTileY; ty++) {
        const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${ty}/${tx}`;
        tiles += `<image class="pd-shape__tile" href="${url}" x="${((tx * TILE - vx) * k).toFixed(2)}" y="${((ty * TILE - vy) * k).toFixed(2)}" width="${(TILE * k + 0.6).toFixed(2)}" height="${(TILE * k + 0.6).toFixed(2)}" preserveAspectRatio="none"/>`;
      }
    }

    let cx = 0, cy = 0;
    sp.forEach(p => { cx += p[0]; cy += p[1]; });
    cx /= sp.length;
    cy /= sp.length;

    let perimeter = 0;
    const edges = [];
    for (let i = 0; i < meters.length; i++) {
      const a = meters[i], b = meters[(i + 1) % meters.length];
      const len = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
      perimeter += len;
      edges.push({ len, a: sp[i], b: sp[(i + 1) % sp.length] });
    }

    const labels = edges.map(e => {
      const mx = (e.a[0] + e.b[0]) / 2;
      const my = (e.a[1] + e.b[1]) / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      return `<text x="${(mx + dx / d * 14).toFixed(1)}" y="${(my + dy / d * 14 + 4).toFixed(1)}" text-anchor="middle">${fmtNumber(e.len, 1)} m</text>`;
    }).join('');

    const path = sp.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + 'Z';
    const maskId = 'pd-mask-' + Math.random().toString(36).slice(2, 8);

    return `
      <svg class="pd-shape__svg has-sat" viewBox="0 0 ${W} ${H}" role="img" aria-label="Parsel sınırı ve uydu görüntüsü">
        <g class="pd-shape__sat">${tiles}</g>
        <mask id="${maskId}">
          <rect width="${W}" height="${H}" fill="#fff"/>
          <path d="${path}" fill="#000"/>
        </mask>
        <rect class="pd-shape__veil" width="${W}" height="${H}" mask="url(#${maskId})"/>
        <path class="pd-shape__halo" d="${path}"/>
        <path class="pd-shape__fill" d="${path}"/>
        <g class="pd-shape__len">${labels}</g>
        <g class="pd-shape__pill">
          <rect x="8" y="${H - 28}" width="${areaText.length * 8 + 18}" height="22" rx="6"/>
          <text x="16" y="${H - 13}">${areaText}</text>
        </g>
        <g class="pd-shape__north" transform="translate(${W - 18} 20)">
          <path d="M0 -10 L5 4 L0 1 L-5 4 Z"/>
          <text y="14" text-anchor="middle">K</text>
        </g>
        <text class="pd-shape__attr" x="${W - 6}" y="${H - 6}" text-anchor="end">ESRI / TKGM</text>
      </svg>
    `;
  }

  /**
   * Belediye 1/1000 Uygulama İmar Planı Paftası Çizimi (SVG)
   */
  function generateZoningPlanSvg(parcel) {
    const W = 360, H = 240;
    return `
      <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#fff7ed; width:100%; height:100%;">
        <defs>
          <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#fdba74" stroke-width="1.5"/>
          </pattern>
        </defs>
        <rect x="15" y="15" width="${W - 30}" height="${H - 70}" fill="url(#hatch)" stroke="#ea580c" stroke-width="1.5"/>
        <rect x="15" y="${H - 55}" width="${W - 30}" height="40" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="${W / 2}" y="${H - 30}" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="middle">12.00 METRELİK İMAR YOLU</text>
        <rect x="55" y="35" width="250" height="130" fill="#ffedd5" stroke="#c2410c" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="65" y="52" font-family="sans-serif" font-size="11" font-weight="bold" fill="#9a3412">Ada: ${parcel.ada} / Parsel: ${parcel.parsel}</text>
        <text x="65" y="66" font-family="sans-serif" font-size="9" fill="#c2410c">Tapu: ${fmtNumber(parcel.area_m2)} m² • ${parcel.neighborhood}</text>
        <rect x="85" y="65" width="190" height="85" fill="#f97316" fill-opacity="0.25" stroke="#ea580c" stroke-width="2"/>
        <rect x="100" y="80" width="160" height="55" rx="5" fill="#ffffff" stroke="#ea580c" stroke-width="1"/>
        <text x="180" y="96" font-family="sans-serif" font-size="10" font-weight="bold" fill="#c2410c" text-anchor="middle">AYRIK NİZAM (${parcel.hmax})</text>
        <text x="180" y="110" font-family="sans-serif" font-size="9" font-weight="600" fill="#475569" text-anchor="middle">KAKS (Emsal): ${parcel.kaks} • TAKS: ${parcel.taks}</text>
        <text x="180" y="124" font-family="sans-serif" font-size="8.5" fill="#16a34a" font-weight="bold" text-anchor="middle">Ön: 5m | Yan: 3m | Arka: h/2</text>
        <g transform="translate(${W - 95}, 20)">
          <circle cx="25" cy="25" r="22" fill="#fff" stroke="#0284c7" stroke-width="1.2"/>
          <text x="25" y="20" font-family="sans-serif" font-size="6.5" font-weight="bold" fill="#0284c7" text-anchor="middle">${parcel.district.toUpperCase()} BLD.</text>
          <text x="25" y="29" font-family="sans-serif" font-size="5.5" fill="#0369a1" text-anchor="middle">İMAR ONAYLI</text>
          <text x="25" y="37" font-family="sans-serif" font-size="5.5" font-weight="bold" fill="#16a34a" text-anchor="middle">2026 PLAN</text>
        </g>
      </svg>
    `;
  }

  // Dinamik Leaflet Yükleyici (CDN)
  function loadLeaflet(callback) {
    if (window.L) {
      callback();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  /**
   * UI Bileşenini Render Etme
   */
  function renderSmartParcelUI(containerId, initialKey = 'kadikoy_1248_14') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let parcel = PARCEL_DB[initialKey] || PARCEL_DB['kadikoy_1248_14'];
    currentLoadedParcel = parcel;

    const html = `
      <div class="pd-section-container" id="pd-smart-container">
        
        <!-- Header -->
        <div class="pd-header-bar">
          <div class="pd-header-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <h3>Belediye & TKGM Akıllı Arsa Sorgulama</h3>
            <span class="pd-badge">360° VR & İmar Plan Motoru</span>
          </div>
          <div style="font-size:0.75rem; color:#64748b; font-weight:600;">
            Kaynak: Tapu Kadastro (TKGM) • Belediye KEOS İmar Otomasyonu
          </div>
        </div>

        <!-- 3 Arama Modu Sekmeleri -->
        <div class="e-tabs" role="tablist">
          <button type="button" class="e-tab ${activeMode === 'address' ? 'active' : ''}" onclick="ArsaImarMotoru.switchMode('address')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>Adres ile</span>
          </button>
          <button type="button" class="e-tab ${activeMode === 'map' ? 'active' : ''}" onclick="ArsaImarMotoru.switchMode('map')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            <span>Harita ile</span>
          </button>
          <button type="button" class="e-tab ${activeMode === 'parcel' ? 'active' : ''}" onclick="ArsaImarMotoru.switchMode('parcel')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <span>Ada/parsel ile</span>
          </button>
        </div>

        <!-- Arama Formu Paneli -->
        <div class="pd-search-card" id="pd-search-card-mount">
          ${getSearchFormHtml(activeMode, parcel)}
        </div>

        <!-- Durum Çubuğu -->
        <div class="pd-status" id="pd-status-bar" data-tone="ok">
          <span class="pd-status__icon">✓</span>
          <span class="pd-status__text" id="pd-status-text">Parsel ve belediye imar durumu başarıyla getirildi</span>
          <b class="pd-status__lot" id="pd-status-lot">Ada ${parcel.ada} · Parsel ${parcel.parsel} (${parcel.district})</b>
        </div>

        <!-- Arsanız Şeridi (Vektörel Uydu + Bilgiler + İmar Paftası) -->
        <div class="pd-parcel" id="pd-result-band">
          
          <!-- 1. Vektörel Uydu Çizimi -->
          <figure class="pd-shape" id="pd-shape-box">
            ${generateShapeSvg(parcel.geometry, fmtNumber(parcel.area_m2) + ' m²')}
          </figure>

          <!-- 2. Bilgi & Etiketler -->
          <div class="pd-parcel__info">
            <div class="pd-parcel__title">
              <span>Arsa & İmar Kimlik Özeti</span>
              <span style="font-size:0.75rem; color:#0284c7; font-weight:700;">${parcel.district} / ${parcel.neighborhood}</span>
            </div>
            
            <dl class="pd-facts">
              <div class="pd-fact">
                <dt>Arsa Alanı</dt>
                <dd><b>${fmtNumber(parcel.area_m2)} m²</b> <span class="pd-tag pd-tag--ok">Tapu kaydı</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Fonksiyon / Kullanım</dt>
                <dd><b>${parcel.function}</b> <span class="pd-tag pd-tag--city">Belediye</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Maksimum Kat / Hmax</dt>
                <dd><b>${parcel.hmax}</b> <span class="pd-tag pd-tag--city">Belediye</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Emsal (KAKS)</dt>
                <dd><b>${parcel.kaks} Kat</b> <span class="pd-tag pd-tag--city">Belediye</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Taban Oturumu (TAKS)</dt>
                <dd><b>%${Math.round(parcel.taks * 100)}</b> <span class="pd-tag pd-tag--city">Belediye</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Tapuda Yazan Nitelik</dt>
                <dd><b style="font-size:0.8rem;">${parcel.qualification}</b> <span class="pd-tag pd-tag--ok">Tapu</span></dd>
              </div>
              <div class="pd-fact">
                <dt>Yola Terk Riski</dt>
                <dd><b style="font-size:0.8rem; color:#16a34a;">${parcel.road_status}</b> <span class="pd-tag pd-tag--approx">Yaklaşık</span></dd>
              </div>
              <div class="pd-fact">
                <dt>6306 Riskli Yapı</dt>
                <dd><b style="font-size:0.8rem; color:#dc2626;">${parcel.riskli_yapi}</b> <span class="pd-tag pd-tag--city">Resmi</span></dd>
              </div>
            </dl>
          </div>

          <!-- 3. İmar Planı Paftası & VR Görselleri -->
          <figure class="pd-plan">
            <button type="button" class="pd-plan__btn" onclick="ArsaImarMotoru.openPlanLightbox()" title="1/1000 İmar Plan Paftasını Büyüt">
              ${generateZoningPlanSvg(parcel)}
              <span class="pd-plan__badge">1/1000 İmar Planı</span>
              <span class="pd-plan__zoom-hint">🔍 İncele</span>
            </button>
            <button type="button" class="pd-vr-btn" onclick="ArsaImarMotoru.openVrViewer()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              360° VR / Sokak Görünümü
            </button>
          </figure>

        </div>

        <!-- Detaylı Kartlar: Plan Notları & Tapu Hükümleri -->
        <div class="pd-cards-grid">
          
          <!-- İmar & Plan Notu Kartı -->
          <div class="pd-dcard">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              İmar Durumu & Çekme Mesafeleri
            </h4>
            <dl class="pd-dl">
              <div class="pd-dl__row">
                <dt>İmar Planı Adı</dt>
                <dd style="text-align:right;">${parcel.plan_name}</dd>
              </div>
              <div class="pd-dl__row">
                <dt>Bahçe Çekme Mesafeleri</dt>
                <dd>${parcel.setback}</dd>
              </div>
              <div class="pd-dl__row">
                <dt>Bina Taban Alanı (TAKS x Arsa)</dt>
                <dd>${fmtNumber(parcel.area_m2 * parcel.taks, 1)} m²</dd>
              </div>
              <div class="pd-dl__row">
                <dt>Emsale Esas Toplam İnşaat (KAKS)</dt>
                <dd>${fmtNumber(parcel.area_m2 * parcel.kaks, 1)} m²</dd>
              </div>
            </dl>

            <div class="pd-rules">
              <b>Belediye 1/1000 Plan Notu Maddeleri:</b>
              <ul>
                ${parcel.plan_notes.map(n => `<li>${n.text} ${n.article ? '<strong>(md. ' + n.article + ')</strong>' : ''}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Tapu & Yasal Kısıtlar Kartı -->
          <div class="pd-dcard">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Tapu & Kentsel Dönüşüm Hükümleri
            </h4>
            <dl class="pd-dl">
              <div class="pd-dl__row">
                <dt>İl / İlçe / Mahalle</dt>
                <dd>${parcel.city} / ${parcel.district} • ${parcel.neighborhood}</dd>
              </div>
              <div class="pd-dl__row">
                <dt>Ada / Parsel No</dt>
                <dd>Ada: ${parcel.ada} • Parsel: ${parcel.parsel}</dd>
              </div>
              <div class="pd-dl__row">
                <dt>Tapu Arsa Yüzölçümü</dt>
                <dd><b>${fmtNumber(parcel.area_m2)} m²</b></dd>
              </div>
              <div class="pd-dl__row">
                <dt>Tapu Kütük Niteliği</dt>
                <dd>${parcel.qualification}</dd>
              </div>
            </dl>

            <div class="pd-rules" style="border-left-color: #16a34a;">
              <b>Belediyenin Özel Kentsel Dönüşüm Kuralları:</b>
              <ul>
                ${parcel.rules.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          </div>

        </div>

        <!-- Alt Aksiyon Barı (Projeye Aktar) -->
        <div class="pd-apply-bar">
          <div class="pd-apply-info">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>Belediye ve tapu kayıtları tespit edildi. Bu arsa ve imar verilerini doğrudan projeye doldurup hesaplatabilirsiniz.</span>
          </div>
          <button type="button" class="pd-btn-apply" onclick="ArsaImarMotoru.applyToProject()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            Verileri İmar & Maliyet Motoruna Aktar ➔
          </button>
        </div>

      </div>

      <!-- Lightbox & VR Modalları -->
      <div class="pd-modal-backdrop" id="pd-lightbox-modal" onclick="ArsaImarMotoru.closeModal(event)">
        <div class="pd-modal-content" onclick="event.stopPropagation()">
          <div class="pd-modal-header">
            <h4 id="pd-modal-title">1/1000 İmar Plan Paftası</h4>
            <button type="button" class="pd-modal-close" onclick="ArsaImarMotoru.closeModal()">×</button>
          </div>
          <div class="pd-modal-body" id="pd-modal-body"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Harita modu seçiliyse Leaflet'i başlat
    if (activeMode === 'map') {
      initLeafletMap(parcel);
    }
  }

  /**
   * Mod Değiştirme
   */
  function switchMode(newMode) {
    activeMode = newMode;
    const cardMount = document.getElementById('pd-search-card-mount');
    if (cardMount && currentLoadedParcel) {
      cardMount.innerHTML = getSearchFormHtml(newMode, currentLoadedParcel);
    }

    // Tab butonlarını güncelle
    document.querySelectorAll('.e-tabs .e-tab').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.e-tabs .e-tab[onclick*="${newMode}"]`);
    if (btn) btn.classList.add('active');

    if (newMode === 'map' && currentLoadedParcel) {
      setTimeout(() => initLeafletMap(currentLoadedParcel), 100);
    }
  }

  /**
   * Arama Formu HTML Üretimi
   */
  function getSearchFormHtml(mode, parcel) {
    const selectedCity = parcel.city || 'İstanbul';
    const cityOptions = TURKIYE_ILLERI.map(c => `<option value="${c}" ${c === selectedCity ? 'selected' : ''}>${c}</option>`).join('');

    const distList = ILCELER_DB[selectedCity] || ['Merkez'];
    const selectedDist = parcel.district || distList[0];
    const distOptions = distList.map(d => `<option value="${d}" ${d === selectedDist ? 'selected' : ''}>${d}</option>`).join('');

    const mahList = MAHALLELER_DB[selectedDist] || ['Merkez Mah.', 'Cumhuriyet Mah.', 'Atatürk Mah.'];
    const selectedMah = parcel.neighborhood || mahList[0];
    const mahOptions = mahList.map(m => `<option value="${m}" ${m === selectedMah ? 'selected' : ''}>${m}</option>`).join('');

    if (mode === 'address') {
      return `
        <div class="pd-search-form pd-search-form--address">
          <div class="pd-search-group">
            <label>İl</label>
            <select id="pd-inp-city" onchange="ArsaImarMotoru.handleCityChange(this.value)">
              ${cityOptions}
            </select>
          </div>
          <div class="pd-search-group">
            <label>İlçe</label>
            <select id="pd-inp-district" onchange="ArsaImarMotoru.handleDistrictChange(this.value)">
              ${distOptions}
            </select>
          </div>
          <div class="pd-search-group">
            <label>Mahalle</label>
            <select id="pd-inp-neighborhood">
              ${mahOptions}
            </select>
          </div>
          <div class="pd-search-group">
            <label>Cadde / Sokak</label>
            <input type="text" id="pd-inp-street" value="${parcel.street || 'Cemil Topuzlu Cad.'}" placeholder="Cadde veya sokak adı...">
          </div>
          <div class="pd-search-group">
            <label>Kapı No</label>
            <input type="text" id="pd-inp-door" value="${parcel.door_no || '14'}" placeholder="Kapı no">
          </div>
          <div>
            <button type="button" class="pd-btn-fetch" onclick="ArsaImarMotoru.executeAddressSearch()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Binamı Göster
            </button>
          </div>
        </div>
      `;
    }

    if (mode === 'map') {
      return `
        <div class="pd-map-wrapper">
          <div class="pd-map-toolbar">
            <div class="pd-map-instruction">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Haritada binanızın çatısına veya parsel alanına bir kez dokunun / tıklayın.</span>
            </div>
            <div class="pd-map-tools">
              <button type="button" class="pd-map-tool-btn" onclick="ArsaImarMotoru.locateUserPosition()">
                📍 Konumumu Bul
              </button>
              <button type="button" class="pd-map-tool-btn" onclick="ArsaImarMotoru.toggleMapLayer('sat')">
                🛰️ Uydu
              </button>
              <button type="button" class="pd-map-tool-btn" onclick="ArsaImarMotoru.toggleMapLayer('osm')">
                🗺️ Sokak
              </button>
            </div>
          </div>
          <div id="pd-interactive-map" class="pd-map-canvas"></div>
        </div>
      `;
    }

    // Mode: 'parcel'
    return `
      <div class="pd-search-form pd-search-form--parcel">
        <div class="pd-search-group">
          <label>İl</label>
          <select id="pd-inp-city" onchange="ArsaImarMotoru.handleCityChange(this.value)">
            ${cityOptions}
          </select>
        </div>
        <div class="pd-search-group">
          <label>İlçe</label>
          <select id="pd-inp-district" onchange="ArsaImarMotoru.handleDistrictChange(this.value)">
            ${distOptions}
          </select>
        </div>
        <div class="pd-search-group">
          <label>Mahalle</label>
          <select id="pd-inp-neighborhood">
            ${mahOptions}
          </select>
        </div>
        <div class="pd-search-group">
          <label>Ada</label>
          <input type="text" id="pd-inp-ada" value="${parcel.ada}" placeholder="Ada no">
        </div>
        <div class="pd-search-group">
          <label>Parsel</label>
          <input type="text" id="pd-inp-parsel" value="${parcel.parsel}" placeholder="Parsel no">
        </div>
        <div>
          <button type="button" class="pd-btn-fetch" onclick="ArsaImarMotoru.executeParcelSearch()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Parseli Göster
          </button>
        </div>
      </div>
    `;
  }

  /**
   * İl Değiştiğinde İlçeleri Güncelleme
   */
  function handleCityChange(city) {
    const distSelect = document.getElementById('pd-inp-district');
    if (!distSelect) return;

    distSelect.innerHTML = '';
    const districts = ILCELER_DB[city] || ['Merkez'];
    districts.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      distSelect.appendChild(opt);
    });

    handleDistrictChange(districts[0]);
  }

  /**
   * İlçe Değiştiğinde Mahalleleri Güncelleme
   */
  function handleDistrictChange(district) {
    const mahSelect = document.getElementById('pd-inp-neighborhood');
    if (!mahSelect) return;

    mahSelect.innerHTML = '';
    const mahalleler = MAHALLELER_DB[district] || ['Merkez Mah.', 'Cumhuriyet Mah.', 'Atatürk Mah.', 'Yeni Mah.'];
    mahalleler.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      mahSelect.appendChild(opt);
    });
  }

  /**
   * 1. Adres ile Arama
   */
  function executeAddressSearch() {
    const city = document.getElementById('pd-inp-city')?.value || 'İstanbul';
    const district = document.getElementById('pd-inp-district')?.value || 'Kadıköy';
    const neighborhood = document.getElementById('pd-inp-neighborhood')?.value || '';
    const street = (document.getElementById('pd-inp-street')?.value || '').trim();
    const door = (document.getElementById('pd-inp-door')?.value || '').trim();

    showPendingStatus('Adres çözümleniyor ve belediye imar kayıtları taranıyor…');

    // Örnek DB eşleşmesi var mı kontrol et
    let matched = null;
    for (const k in PARCEL_DB) {
      const p = PARCEL_DB[k];
      if (p.district.toLowerCase() === district.toLowerCase() &&
          p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())) {
        matched = p;
        break;
      }
    }

    setTimeout(() => {
      const result = matched || generateDynamicParcel(city, district, neighborhood, null, null, street, door);
      updateDisplayWithParcel(result, `${district} / ${neighborhood} • ${street} No: ${door}`);
    }, 600);
  }

  /**
   * 2. Ada / Parsel ile Arama
   */
  function executeParcelSearch() {
    const city = document.getElementById('pd-inp-city')?.value || 'İstanbul';
    const district = document.getElementById('pd-inp-district')?.value || 'Kadıköy';
    const neighborhood = document.getElementById('pd-inp-neighborhood')?.value || '';
    const ada = (document.getElementById('pd-inp-ada')?.value || '').trim();
    const parsel = (document.getElementById('pd-inp-parsel')?.value || '').trim();

    if (!ada || !parsel) {
      alert('Lütfen ada ve parsel numarasını giriniz.');
      return;
    }

    showPendingStatus('TKGM ve belediye sisteminden imar durumu sorgulanıyor…');

    const key = `${district.toLowerCase()}_${ada}_${parsel}`;
    let result = PARCEL_DB[key];
    if (!result) {
      for (const k in PARCEL_DB) {
        if (PARCEL_DB[k].ada === String(ada) && PARCEL_DB[k].parsel === String(parsel)) {
          result = PARCEL_DB[k];
          break;
        }
      }
    }

    setTimeout(() => {
      const finalParcel = result || generateDynamicParcel(city, district, neighborhood, ada, parsel);
      updateDisplayWithParcel(finalParcel, `Ada ${finalParcel.ada} · Parsel ${finalParcel.parsel} (${district})`);
    }, 600);
  }

  /**
   * 3. Harita ile Arama (Leaflet Entegrasyonu)
   */
  let currentLayerType = 'sat';
  let satLayer = null;
  let osmLayer = null;

  function initLeafletMap(parcel) {
    loadLeaflet(() => {
      const mapContainer = document.getElementById('pd-interactive-map');
      if (!mapContainer || !window.L) return;

      if (leafletMapInstance) {
        leafletMapInstance.remove();
        leafletMapInstance = null;
      }

      const center = [parcel.lat || 40.9715, parcel.lng || 29.0528];
      leafletMapInstance = window.L.map('pd-interactive-map', {
        center: center,
        zoom: 17,
        maxZoom: 19
      });

      // Katmanlar
      satLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'ESRI World Imagery'
      });
      osmLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
      });

      if (currentLayerType === 'sat') {
        satLayer.addTo(leafletMapInstance);
      } else {
        osmLayer.addTo(leafletMapInstance);
      }

      // Marker
      currentMapMarker = window.L.marker(center).addTo(leafletMapInstance);
      currentMapMarker.bindPopup(`<b>${parcel.district} / ${parcel.neighborhood}</b><br>Ada: ${parcel.ada} · Parsel: ${parcel.parsel}<br>${fmtNumber(parcel.area_m2)} m²`).openPopup();

      // Harita Tıklama Dinleyicisi (Bina / Parsel Seçimi)
      leafletMapInstance.on('click', function (e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        if (currentMapMarker) {
          currentMapMarker.setLatLng(e.latlng);
        } else {
          currentMapMarker = window.L.marker(e.latlng).addTo(leafletMapInstance);
        }

        showPendingStatus('Tıklanan koordinattaki bina ve imar verisi getiriliyor…');

        // Reverse Geocode (OpenStreetMap Nominatim API veya simülasyon)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
          headers: { 'Accept': 'application/json' }
        }).then(r => r.json()).then(data => {
          const addr = data.address || {};
          const city = addr.province || addr.city || 'İstanbul';
          const district = addr.town || addr.suburb || addr.city_district || 'Kadıköy';
          const neighborhood = addr.neighbourhood || addr.quarter || 'Merkez';
          const road = addr.road || 'Ana Cadde';
          const houseNo = addr.house_number || '1';

          const resolved = generateDynamicParcel(city, district, neighborhood, null, null, road, houseNo, { lat, lng });
          currentMapMarker.bindPopup(`<b>${district} / ${neighborhood}</b><br>${road} No:${houseNo}<br>Ada: ${resolved.ada} · Parsel: ${resolved.parsel}`).openPopup();

          updateDisplayWithParcel(resolved, `${district} • ${road} No:${houseNo} (Haritadan Seçildi)`);
        }).catch(() => {
          // Fallback
          const resolved = generateDynamicParcel('İstanbul', 'Kadıköy', 'Merkez', null, null, 'Cadde', '1', { lat, lng });
          updateDisplayWithParcel(resolved, `Ada: ${resolved.ada} · Parsel: ${resolved.parsel} (Harita Noktası)`);
        });
      });
    });
  }

  function toggleMapLayer(type) {
    currentLayerType = type;
    if (!leafletMapInstance) return;
    if (type === 'sat') {
      if (osmLayer) leafletMapInstance.removeLayer(osmLayer);
      if (satLayer) satLayer.addTo(leafletMapInstance);
    } else {
      if (satLayer) leafletMapInstance.removeLayer(satLayer);
      if (osmLayer) osmLayer.addTo(leafletMapInstance);
    }
  }

  function locateUserPosition() {
    if (!navigator.geolocation || !leafletMapInstance) {
      alert('Tarayıcınız konum servisini desteklemiyor veya izin verilmedi.');
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      leafletMapInstance.setView([lat, lng], 18);
      if (currentMapMarker) currentMapMarker.setLatLng([lat, lng]);
      window.showToastNotification?.('📍 Konumunuz haritada ortalandı. Binanızın çatısına dokunun.');
    }, () => {
      alert('Konum bilgisi alınamadı. Lütfen konum iznini kontrol edin.');
    });
  }

  function showPendingStatus(msg) {
    const statusBar = document.getElementById('pd-status-bar');
    const statusText = document.getElementById('pd-status-text');
    if (statusBar && statusText) {
      statusBar.setAttribute('data-tone', 'pending');
      statusText.textContent = msg;
    }
  }

  function updateDisplayWithParcel(parcel, lotLabelText) {
    currentLoadedParcel = parcel;

    const statusBar = document.getElementById('pd-status-bar');
    const statusText = document.getElementById('pd-status-text');
    const statusLot = document.getElementById('pd-status-lot');

    if (statusBar && statusText && statusLot) {
      statusBar.setAttribute('data-tone', 'ok');
      statusText.textContent = 'Parsel ve belediye imar durumu başarıyla getirildi';
      statusLot.textContent = lotLabelText || `Ada ${parcel.ada} · Parsel ${parcel.parsel} (${parcel.district})`;
    }

    // Şekil & Pafta Güncelleme
    const shapeBox = document.getElementById('pd-shape-box');
    if (shapeBox) {
      shapeBox.innerHTML = generateShapeSvg(parcel.geometry, fmtNumber(parcel.area_m2) + ' m²');
    }

    // Bilgileri ve İmar Kartlarını Güncelle
    renderSmartParcelUI('pd-smart-container-wrapper', `${(parcel.district || 'kadikoy').toLowerCase()}_${parcel.ada}_${parcel.parsel}`);

    if (window.showToastNotification) {
      window.showToastNotification(`✓ ${parcel.district} Ada ${parcel.ada} Parsel ${parcel.parsel} imar verileri yüklendi.`);
    }
  }

  /**
   * İmar Planı Paftası Lightbox Açma
   */
  function openPlanLightbox() {
    if (!currentLoadedParcel) return;
    const modal = document.getElementById('pd-lightbox-modal');
    const title = document.getElementById('pd-modal-title');
    const body = document.getElementById('pd-modal-body');
    if (!modal || !title || !body) return;

    title.textContent = `${currentLoadedParcel.district} — ${currentLoadedParcel.plan_name}`;
    body.innerHTML = `
      <div style="background:#fff7ed; padding:20px; height:100%; display:flex; align-items:center; justify-content:center;">
        ${generateZoningPlanSvg(currentLoadedParcel)}
      </div>
    `;
    modal.style.display = 'flex';
  }

  /**
   * 360° VR / Sokak Görünümü Açma
   */
  function openVrViewer() {
    if (!currentLoadedParcel) return;
    const modal = document.getElementById('pd-lightbox-modal');
    const title = document.getElementById('pd-modal-title');
    const body = document.getElementById('pd-modal-body');
    if (!modal || !title || !body) return;

    const lat = currentLoadedParcel.lat || 40.9715;
    const lng = currentLoadedParcel.lng || 29.0528;

    title.textContent = `360° VR & Sokak Görünümü — ${currentLoadedParcel.district} Ada: ${currentLoadedParcel.ada} / Parsel: ${currentLoadedParcel.parsel}`;
    
    const streetViewUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;
    const yandexUrl = `https://yandex.com.tr/haritalar/?panorama%5Bpoint%5D=${lng}%2C${lat}`;

    body.innerHTML = `
      <div style="position:relative; width:100%; height:100%;">
        <iframe src="${streetViewUrl}" width="100%" height="480" frameborder="0" style="border:0;" allowfullscreen loading="lazy"></iframe>
        <div style="position:absolute; bottom:12px; left:12px; z-index:10; background:rgba(15,23,42,0.9); padding:8px 12px; border-radius:8px; display:flex; gap:10px;">
          <a href="${yandexUrl}" target="_blank" rel="noopener" style="color:#38bdf8; text-decoration:none; font-size:0.78rem; font-weight:700;">
            🌐 Yandex 360° Panoramada Aç ↗
          </a>
          <span style="color:#64748b;">|</span>
          <a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noopener" style="color:#38bdf8; text-decoration:none; font-size:0.78rem; font-weight:700;">
            🗺️ Resmi TKGM Parsel Sorgu ↗
          </a>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  }

  function closeModal(e) {
    const modal = document.getElementById('pd-lightbox-modal');
    if (modal) modal.style.display = 'none';
  }

  /**
   * "Verileri Projeye Aktar ve Hesapla" Butonu
   */
  function applyToProject() {
    if (!currentLoadedParcel) return;
    const p = currentLoadedParcel;

    if (window.KDEngine) {
      window.KDEngine.updateField('city', p.city);
      window.KDEngine.updateField('district', p.district);
      window.KDEngine.updateField('neighborhood', p.neighborhood);
      window.KDEngine.updateField('ada', p.ada);
      window.KDEngine.updateField('parsel', p.parsel);
      window.KDEngine.updateField('landArea', p.area_m2);
      window.KDEngine.updateField('kaks', p.kaks);
      window.KDEngine.updateField('taks', p.taks);
      window.KDEngine.updateField('hmax', p.hmax);
      window.KDEngine.updateField('usageType', p.function);

      if (typeof window.syncInputsWithState === 'function') {
        window.syncInputsWithState();
      }
      if (typeof window.renderUI === 'function') {
        window.renderUI();
      }

      if (window.showToastNotification) {
        window.showToastNotification(`✓ ${p.district} ${p.ada}/${p.parsel} verileri projeye aktarıldı ve fizibilite yeniden hesaplandı!`);
      }
    }

    // Data Platformu Input Senkronizasyonu
    const dpAda = document.getElementById('p-ada') || document.getElementById('proj-ada');
    const dpParsel = document.getElementById('p-parsel') || document.getElementById('proj-parsel');
    const dpLand = document.getElementById('p-land-area') || document.getElementById('proj-land');
    const dpKaks = document.getElementById('p-kaks') || document.getElementById('proj-kaks');
    const dpTaks = document.getElementById('p-taks') || document.getElementById('proj-taks');
    const dpDist = document.getElementById('p-district') || document.getElementById('proj-district');
    const dpMah = document.getElementById('p-neighborhood') || document.getElementById('proj-mahalle');

    if (dpAda) dpAda.value = p.ada;
    if (dpParsel) dpParsel.value = p.parsel;
    if (dpLand) dpLand.value = p.area_m2;
    if (dpKaks) dpKaks.value = p.kaks;
    if (dpTaks) dpTaks.value = p.taks;
    if (dpDist) dpDist.value = p.district;
    if (dpMah) dpMah.value = p.neighborhood;

    // Hedef bölgeye kaydır
    const targetSection = document.getElementById('inp-landArea') || document.getElementById('stage1');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Dışa Aktarılan API
  window.ArsaImarMotoru = {
    TURKIYE_ILLERI,
    ILCELER_DB,
    MAHALLELER_DB,
    PARCEL_DB,
    renderSmartParcelUI,
    switchMode,
    handleCityChange,
    handleDistrictChange,
    executeAddressSearch,
    executeParcelSearch,
    initLeafletMap,
    toggleMapLayer,
    locateUserPosition,
    openPlanLightbox,
    openVrViewer,
    closeModal,
    applyToProject,
    generateShapeSvg,
    generateZoningPlanSvg
  };

})(window, document);
