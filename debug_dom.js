
// Simple DOM Mock
const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      style: {},
      classList: {
        add: function(c) { this._classes = this._classes || []; this._classes.push(c); },
        remove: function(c) { this._classes = (this._classes || []).filter(x => x !== c); },
        contains: function(c) { return (this._classes || []).includes(c); }
      },
      appendChild: function(c) { this._children = this._children || []; this._children.push(c); },
      removeChild: function(c) { this._children = (this._children || []).filter(x => x !== c); },
      querySelector: function(sel) {
        if (sel.startsWith('#')) return getEl(sel.slice(1));
        return { style: {}, classList: { add: ()=>{}, remove: ()=>{} }, appendChild: ()=>{} };
      },
      querySelectorAll: function(sel) {
        return [];
      },
      innerHTML: '',
      textContent: '',
      setAttribute: function(k, v) { this[k] = v; },
      getAttribute: function(k) { return this[k]; }
    };
  }
  return elements[id];
}

const document = {
  getElementById: getEl,
  querySelectorAll: function(sel) { return []; },
  createElement: function(tag) {
    return {
      tagName: tag,
      style: {},
      classList: {
        add: function(c) { this._classes = this._classes || []; this._classes.push(c); },
        remove: function(c) { this._classes = (this._classes || []).filter(x => x !== c); }
      },
      appendChild: function(c) { this._children = this._children || []; this._children.push(c); },
      querySelector: function(sel) {
        if (sel.startsWith('#')) return getEl(sel.slice(1));
        return { style: {}, classList: { add: ()=>{}, remove: ()=>{} }, appendChild: ()=>{} };
      },
      querySelectorAll: function(sel) { return []; },
      setAttribute: function(k, v) { this[k] = v; }
    };
  },
  body: getEl('body'),
  addEventListener: function(evt, cb) { if (evt === 'DOMContentLoaded') cb(); }
};

const window = { URL: { createObjectURL: () => '' } };
const sessionStorage = { getItem: () => 'true', setItem: () => {} };
const localStorage = { getItem: () => 'true', setItem: () => {} };
const navigator = { clipboard: { writeText: () => Promise.resolve() } };
const Blob = function() {};

try {

    const STUDIO_AUTH_USER = 'Admin';
    const STUDIO_AUTH_PASS = 'Yakin2026.!';

    function checkAuth() {
      const isAuth = sessionStorage.getItem('yg_studio_auth') === 'true' || localStorage.getItem('yg_studio_auth') === 'true';
      const overlay = document.getElementById('auth-overlay');
      if (!isAuth) {
        overlay.style.display = 'flex';
      } else {
        overlay.style.display = 'none';
      }
    }

    function handleAuthLogin(e) {
      e.preventDefault();
      const u = document.getElementById('auth-u').value.trim();
      const p = document.getElementById('auth-p').value.trim();
      const err = document.getElementById('auth-err');
      if (u.toLowerCase() === STUDIO_AUTH_USER.toLowerCase() && p === STUDIO_AUTH_PASS) {
        sessionStorage.setItem('yg_studio_auth', 'true');
        localStorage.setItem('yg_studio_auth', 'true');
        document.getElementById('auth-overlay').style.display = 'none';
      } else {
        err.style.display = 'block';
      }
    }

    // ── 1 YILLIK KAPSAMLI İÇERİK HAVUZU ──────────────────────────────────────────
        // ── 2026 - 2030 ÇOK YILLI ÖZEL GÜNLER & SEKTÖREL İÇERİK MOTORU ──────────
        // ── 2026 - 2030 TÜM RESMİ, MİLLİ, DİNİ VE SEKTÖREL ÖZEL GÜNLER HAVUZU ──
        // ── 2026 - 2030 TÜM RESMİ, MİLLİ, DİNİ VE SEKTÖREL GÜNLER HAVUZU ──
    const RECURRING_SPECIAL_DAYS = [
      // 🇹🇷 RESMİ TATİLLER, MİLLİ BAYRAMLAR VE ANMA GÜNLERİ (category: 'resmi')
      {
        baseId: '1-ocak-yilbasi',
        category: 'resmi',
        title: '1 Ocak Yılbaşı (Resmi Tatil)',
        month: 0, // Ocak
        day: 1,
        timeStr: '09:00',
        icon: '🎉',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => `MUTLU VE BAŞARILI BİR YIL DİLERİZ!`,
        getSubheadline: (yr) => `${yr} Yılında Yeni Yatırımlar ve Sürdürülebilir Projelerle...`,
        aiPrompt: 'Ultra-modern luxury New Year corporate artwork (1:1 square). Glowing 3D geometric numerals crafted from crystal glass and polished steel with internal cyan LED light (#38bdf8). Deep rich navy blue backdrop (#0b2545) with delicate golden sparkles and modern skyscraper lights. 8K Unreal Engine 5 render, sophisticated, futuristic holding greeting.',
        getText: (yr) => `Yeni yılın tüm çalışanlarımıza, iş ortaklarımıza ve ülkemize sağlık, başarı, huzur ve bereket getirmesini dileriz. 

${yr} yılında da yenilenebilir enerji, modern inşaat ve ileri teknoloji projelerimizle büyümeye ve değer üretmeye devam edeceğiz. Mutlu Yıllar! 🥂🌟`,
        hashtags: '#MutluYıllar #YeniYıl #HappyNewYear #YakınGrup #YatırımVeGelecek #ResmiTatil'
      },
      {
        baseId: '18-mart',
        category: 'resmi',
        title: '18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü',
        month: 2, // Mart
        day: 18,
        timeStr: '09:00',
        icon: '🇹🇷',
        tagText: 'MİLLİ ANMA GÜNÜ',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '18 MART ÇANAKKALE ZAFERİMİZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Çanakkale Geçilmez: Aziz Şehitlerimizi Saygı ve Minnetle Anıyoruz.',
        aiPrompt: 'Epic and respectful corporate memorial artwork (1:1 square). Monumental silhouette of Canakkale Martyrs Memorial with golden dramatic sunrise rays and a proud waving Turkish Flag. Deep midnight navy blue (#0b2545) atmosphere with ambient cyan highlights (#38bdf8). 8K Unreal Engine 5 render, cinematic raytracing, patriotic and prestigious corporate identity.',
        getText: (yr) => `18 Mart Çanakkale Deniz Zaferi'nin ${yr - 1915}. yıl dönümünde; başta Gazi Mustafa Kemal Atatürk olmak üzere vatanımız uğruna can veren tüm aziz şehitlerimizi ve kahraman gazilerimizi rahmet, minnet ve saygıyla anıyoruz.

"Çanakkale Zaferi, milletimizin bağımsızlık ve hürriyet kararlılığının ebedi anıtıdır." 🇹🇷🕊️`,
        hashtags: '#18Mart #ÇanakkaleZaferi #ÇanakkaleGeçilmez #18MartÇanakkaleZaferi #YakınGrup #MilliBirlik'
      },
      {
        baseId: '23-nisan',
        category: 'resmi',
        title: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı (Resmi Tatil)',
        month: 3, // Nisan
        day: 23,
        timeStr: '09:00',
        icon: '🎈',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '23 NİSAN ULUSAL EGEMENLİK VE ÇOCUK BAYRAMI KUTLU OLSUN!',
        getSubheadline: (yr) => 'Geleceğimizin Teminatı Çocuklarımıza Aydınlık Bir Yarın...',
        aiPrompt: 'Inspiring and vibrant corporate holiday artwork (1:1 square). Silhouettes of joyful children looking at a bright futuristic green and smart city. Deep navy blue (#0b2545) base blending into glowing sky-blue and cyan rays (#38bdf8) with red and white celebration ribbons. Floating subtle energy particles, high-tech architectural structures in background. 8K photorealistic, uplifting and prestigious corporate brand design.',
        getText: (yr) => `Türkiye Büyük Millet Meclisi'nin açılışının ${yr - 1920}. yıl dönümünde, Gazi Mustafa Kemal Atatürk'ün dünya çocuklarına armağan ettiği 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı'nı coşkuyla kutluyoruz.

Çocuklarımızın güvenle, huzurla ve umutla büyüyeceği sürdürülebilir bir gelecek inşa etmek en büyük sorumluluğumuzdur. 🇹🇷✨`,
        hashtags: '#23Nisan #UlusalEgemenlikVeÇocukBayramı #TBMM #GeleceğimizÇocuklar #YakınGrup #23NisanKutluOlsun #ResmiTatil'
      },
      {
        baseId: '1-mayis',
        category: 'resmi',
        title: '1 Mayıs Emek ve Dayanışma Günü (Resmi Tatil)',
        month: 4, // Mayıs
        day: 1,
        timeStr: '09:00',
        icon: '👷',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '1 MAYIS EMEK VE DAYANIŞMA GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Alın Teri ve Emeğiyle Geleceği İnşa Eden Tüm Emekçilerimize...',
        aiPrompt: 'Powerful, modern architectural tribute artwork (1:1 square). High-tech industrial construction cranes, steel engineering structures, and solar panels under a dramatic blue sunrise. Deep navy blue background (#0b2545) with glowing cyan energy arcs (#38bdf8) and warm golden safety highlights. Respectful, monumental, premium engineering holding aesthetic, 8K render.',
        getText: (yr) => `Şantiyelerimizde, enerji santrallerimizde, üretim tesislerimizde ve ofislerimizde alın teriyle geleceği inşa eden tüm çalışma arkadaşlarımızın ve emekçilerin 1 Mayıs Emek ve Dayanışma Günü'nü kutluyoruz.

En büyük gücümüz emeğimiz ve dayanışmamızdır. 🏗️⚡`,
        hashtags: '#1Mayıs #EmekveDayanışmaGünü #İşçiBayramı #AlınTeri #YakınGrup #BirlikteGüçlüyüz #ResmiTatil'
      },
      {
        baseId: '19-mayis',
        category: 'resmi',
        title: '19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı (Resmi Tatil)',
        month: 4, // Mayıs
        day: 19,
        timeStr: '09:00',
        icon: '🏃',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '19 MAYIS GENÇLİK VE SPOR BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Bağımsızlık Meşalesinin Yakıldığı İlk Günün İnancıyla...',
        aiPrompt: 'Dynamic, futuristic corporate artwork (1:1 square). A glowing energy torch with cyan and electric blue flames surrounded by modern steel engineering and architectural lines. Deep navy blue background (#0b2545) with vibrant cyan-blue light beams (#0284c7 / #38bdf8). Turkish national flag motif smoothly blended in glass reflections. 8K Octane render, cinematic, innovative and prestigious holding brand identity.',
        getText: (yr) => `19 Mayıs 1919'da Samsun'da yakılan bağımsızlık meşalesinin ${yr - 1919}. yılında; Gazi Mustafa Kemal Atatürk ve tüm kahramanlarımızı saygıyla anıyor, geleceğimizi omuzlayan tüm gençlerimizin bayramını kutluyoruz.

Gençliğin enerjisi ve inovasyon vizyonuyla Türkiye'nin yarınlarını inşa ediyoruz! 🇹🇷⚡`,
        hashtags: '#19Mayıs #GençlikveSporBayramı #AtatürküAnma #19Mayıs1919 #YakınGrup #İnovasyonGençlikte #ResmiTatil'
      },
      {
        baseId: '15-temmuz',
        category: 'resmi',
        title: '15 Temmuz Demokrasi ve Milli Birlik Günü (Resmi Tatil)',
        month: 6, // Temmuz
        day: 15,
        timeStr: '09:00',
        icon: '🇹🇷',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '15 TEMMUZ DEMOKRASİ VE MİLLİ BİRLİK GÜNÜ',
        getSubheadline: (yr) => 'Milli İrademize Sahip Çıkan Kahramanlarımızı Saygıyla Anıyoruz.',
        aiPrompt: 'Solemn and powerful national unity artwork (1:1 square). Istanbul Bosphorus Bridge and skyline under a deep midnight navy blue sky (#0b2545). Ethereal red and white Turkish flag illumination with soft cyan ambient glow (#38bdf8). Peaceful, monumental, respectful corporate memorial aesthetic. 8K resolution, cinematic lighting.',
        getText: (yr) => `15 Temmuz Demokrasi ve Milli Birlik Günü'nde; vatanı, bağımsızlığı ve milli iradesi için canını ortaya koyan tüm aziz şehitlerimizi rahmetle anıyor, kahraman gazilerimize şükranlarımızı sunuyoruz. 🇹🇷`,
        hashtags: '#15Temmuz #DemokrasiveMilliBirlikGünü #Milliİrade #TürkiyeGeçilmez #YakınGrup #ResmiTatil'
      },
      {
        baseId: '30-agustos',
        category: 'resmi',
        title: '30 Ağustos Zafer Bayramı (Resmi Tatil)',
        month: 7, // Ağustos
        day: 30,
        timeStr: '09:00',
        icon: '🇹🇷',
        tagText: 'RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '30 AĞUSTOS ZAFER BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Milletimizin Bağımsızlık ve Kararlılık Zaferi...',
        aiPrompt: 'Epic and prestigious victory celebration artwork (1:1 square). A magnificent Turkish Flag flying triumphantly over sleek modern infrastructure and industrial towers. Deep navy blue atmospheric sky (#0b2545) illuminated by golden and cyan sunrise highlights (#38bdf8). Sharp raytraced glass reflections, strong architectural foundation, 8K ultra-detailed photorealistic corporate render.',
        getText: (yr) => `Tarihimizin en şanlı dönüm noktalarından biri olan Büyük Taarruz ve Başkomutanlık Meydan Muharebesi'nin zaferle taçlandığı 30 Ağustos Zafer Bayramı'nın ${yr - 1922}. yılını gururla kutluyoruz.

Başta Gazi Mustafa Kemal Atatürk olmak üzere, vatanımız uğruna can veren tüm şehit ve gazilerimizi minnetle anıyoruz. 🇹🇷`,
        hashtags: '#30Ağustos #ZaferBayramı #BüyükTaarruz #30AğustosZaferBayramı #YakınGrup #MilliBirlik #ResmiTatil'
      },
      {
        baseId: '19-eylul-gaziler',
        category: 'resmi',
        title: '19 Eylül Gaziler Günü',
        month: 8, // Eylül
        day: 19,
        timeStr: '09:00',
        icon: '🎖️',
        tagText: 'MİLLİ ANMA GÜNÜ',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '19 EYLÜL GAZİLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Vatanı Uğruna Fedakarca Mücadele Eden Kahramanlarımıza Saygıyla...',
        aiPrompt: 'Respectful, solemn corporate memorial artwork (1:1 square). Silhouette of a heroic veteran soldier in front of a majestic waving Turkish Flag and golden laurel wreath. Deep midnight navy blue (#0b2545) atmosphere with soft cyan glow (#38bdf8), 8K render.',
        getText: (yr) => `Başta Gazi Mustafa Kemal Atatürk olmak üzere, vatanımızın bölünmez bütünlüğü ve milletimizin huzuru için canını siper eden tüm kahraman gazilerimizin 19 Eylül Gaziler Günü'nü minnet ve saygıyla kutluyoruz. 🇹🇷🎖️`,
        hashtags: '#19Eylül #GazilerGünü #KahramanGazilerimiz #MustafaKemalAtatürk #YakınGrup #Minnettarız'
      },
      {
        baseId: '29-ekim',
        category: 'resmi',
        title: '29 Ekim Cumhuriyet Bayramı (Resmi Tatil)',
        month: 9, // Ekim
        day: 29,
        timeStr: '09:00',
        icon: '🇹🇷',
        tagText: 'ULUSAL BAYRAM & RESMİ TATİL',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => '29 EKİM CUMHURİYET BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => `Cumhuriyetimizin ${yr - 1923}. Yılında Geleceğin Altyapısını İnşa Ediyoruz.`,
        aiPrompt: 'High-end corporate 3D celebration artwork (1:1 square). An iconic, elegant Turkish Flag waving proudly with dramatic cinematic lighting over a futuristic modern glass skyline in Istanbul. Deep midnight navy blue (#0b2545) background with glowing cyan and soft light blue ambient lighting (#0284c7 / #38bdf8). Geometric construction lines, solar infrastructure glass blueprints subtly integrated in the base. Luxury holding corporate aesthetics, 8K Octane render, photorealistic, pristine professional presentation.',
        getText: (yr) => `Gazi Mustafa Kemal Atatürk ve silah arkadaşlarının bizlere armağan ettiği Cumhuriyetimizin ${yr - 1923}. yılını gurur ve coşkuyla kutluyoruz. 

Yakın Grup olarak; bağımsızlığımızın, üretimin ve milli mühendisliğin gücüyle ülkemizin kalkınması ve geleceğin inşası için durmaksızın çalışmaya devam ediyoruz.

29 Ekim Cumhuriyet Bayramımız kutlu olsun! 🇹🇷`,
        hashtags: '#29Ekim #CumhuriyetBayramı #YakınGrup #MilliMühendislik #Türkiye #Geleceğinİnşası #ResmiTatil'
      },
      {
        baseId: '10-kasim',
        category: 'resmi',
        title: '10 Kasım Atatürk’ü Anma Günü (09:05)',
        month: 10, // Kasım
        day: 10,
        timeStr: '09:05',
        icon: '🇹🇷',
        tagText: 'MİLLİ ANMA GÜNÜ',
        tagClass: 'tag-milli',
        eventClass: 'event-milli',
        getHeadline: (yr) => 'SAYGI, SEVGİ VE MİNNETLE ANIYORUZ...',
        getSubheadline: (yr) => 'Büyük Önder Gazi Mustafa Kemal Atatürk (1881 - 1938)',
        aiPrompt: 'Minimalist, solemn and deeply prestigious tribute artwork (1:1 square). A respectful silhouette profile of Mustafa Kemal Atatürk gazing toward an enlightened horizon. Deep midnight navy blue (#0b2545) atmosphere with soft platinum silver and ethereal azure backlighting (#38bdf8). Subtle geometric modernist architecture and glowing beacon light. 8K Unreal Engine 5 render, cinematic raytracing, refined corporate memorial design.',
        getText: (yr) => `Cumhuriyetimizin kurucusu, vizyonu ve ilkeleriyle yolumuzu aydınlatan Büyük Önder Gazi Mustafa Kemal Atatürk'ü, ebediyete irtihalinin ${yr - 1938}. yıl dönümünde saygı, rahmet ve sonsuz minnetle anıyoruz.

"Büyük işler, önemli atılımlar ancak birlikte çalışarak başarılır." 🕊️`,
        hashtags: '#10Kasım #MustafaKemalAtatürk #GaziMustafaKemal #SonsuzaDek #YakınGrup #1881denSonsuza'
      },

      // ⚙️ SEKTÖREL, MESLEKİ, İSG & KÜRESEL GÜNLER (category: 'sektor')
      {
        baseId: '10-ocak-gazeteciler',
        category: 'sektor',
        title: '10 Ocak Çalışan Gazeteciler Günü',
        month: 0, // Ocak
        day: 10,
        timeStr: '09:00',
        icon: '📰',
        tagText: 'MESLEKİ GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '10 OCAK ÇALIŞAN GAZETECİLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Doğru, İlkeli ve Tarafsız Habercilikle Toplumu Aydınlatan Basın Mensuplarımıza...',
        aiPrompt: 'Modern digital press and journalism visual (1:1 square). Glowing microphone and press badge in front of a global holographic news screen. Deep navy blue background (#0b2545) with crisp cyan lighting (#38bdf8), 8K render.',
        getText: (yr) => `Kamuoyunu bilgilendirmek adına gece gündüz özveriyle görev yapan tüm basın mensuplarımızın 10 Ocak Çalışan Gazeteciler Günü'nü tebrik eder, meslek hayatlarında başarılar dileriz. 📰🎙️`,
        hashtags: '#10Ocak #ÇalışanGazetecilerGünü #Basın #Gazetecilik #YakınGrup'
      },
      {
        baseId: 'enerji-gunu',
        category: 'sektor',
        title: '11 Ocak Dünya Enerji Tasarrufu & Enerji Günü',
        month: 0, // Ocak
        day: 11,
        timeStr: '10:00',
        icon: '⚡',
        tagText: 'SEKTÖREL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA ENERJİ GÜNÜ & ENERJİ VERİMLİLİĞİ',
        getSubheadline: (yr) => 'Geleceğin Gücü: Yenilenebilir, Akıllı ve Verimli Enerji...',
        aiPrompt: 'Breathtaking renewable energy landscape visual (1:1 square). Large gleaming Tier-1 bifacial solar PV panels and aerodynamic wind turbines under a brilliant cyan sunrise (#38bdf8). Flowing digital neon energy pulses and battery storage telemetry lines leading into a modern smart city. Deep midnight navy blue (#0b2545), 8K ultra-realistic corporate energy holding visual.',
        getText: (yr) => `Enerjinin verimli kullanılması ve temiz kaynaklardan üretilmesi, kalkınmanın ve bağımsızlığın temel anahtarıdır.

Yakın Enerji olarak; güneş, batarya depolama ve yüksek verimli şebeke çözümlerimizle enerji dönüşümüne öncülük ediyoruz. ⚡🔋`,
        hashtags: '#DünyaEnerjiGünü #EnerjiVerimliliği #YenilenebilirEnerji #SolarEPC #YakınGrup #CleanEnergy'
      },
      {
        baseId: 'kadinlar-gunu',
        category: 'sektor',
        title: '8 Mart Dünya Kadınlar Günü',
        month: 2, // Mart
        day: 8,
        timeStr: '09:00',
        icon: '🌸',
        tagText: 'ÖZEL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '8 MART DÜNYA KADINLAR GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Emeği, Cesareti ve İlhamıyla Dünyayı Güzelleştiren Kadınlarımıza...',
        aiPrompt: 'Elegant, inspiring, and empowering corporate artwork (1:1 square). A stylized silhouette of a visionary female engineer/leader looking towards a modern architectural horizon. Deep navy blue background (#0b2545) blended with soft glowing cyan, light blue, and delicate gold floral accents (#38bdf8 / #d4af37). Prestigious, empowering, 8K ultra-detailed corporate design.',
        getText: (yr) => `İş dünyasında, şantiyelerimizde, mühendislik projelerimizde ve hayatın her alanında bilgisi, vizyonu ve üretkenliğiyle geleceği şekillendiren tüm kadınların 8 Mart Dünya Kadınlar Günü'nü saygı ve minnetle kutlarız. 💐✨`,
        hashtags: '#8Mart #DünyaKadınlarGünü #8MartDünyaKadınlarGünü #KadınMühendisler #YakınGrup #EşitlikVeGelecek'
      },
      {
        baseId: '14-mart-tip',
        category: 'sektor',
        title: '14 Mart Tıp Bayramı',
        month: 2, // Mart
        day: 14,
        timeStr: '09:00',
        icon: '🩺',
        tagText: 'MESLEKİ GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '14 MART TIP BAYRAMI KUTLU OLSUN!',
        getSubheadline: (yr) => 'İnsan Yaşamını ve Sağlığını Korumak İçin Fedakarca Çalışan Hekimlerimize...',
        aiPrompt: 'Sophisticated medical and healthcare tribute artwork (1:1 square). Holographic medical heartbeat line and Caduceus emblem glowing in cyan (#38bdf8) over a modern hospital medical facility. Deep navy blue background (#0b2545), 8K render.',
        getText: (yr) => `İnsan hayatını her şeyin üstünde tutarak gece gündüz büyük bir özveriyle şifa dağıtan tüm hekimlerimizin ve sağlık çalışanlarımızın 14 Mart Tıp Bayramı'nı kutlar, emekleri için teşekkür ederiz. 🩺🤍`,
        hashtags: '#14Mart #TıpBayramı #SağlıkÇalışanları #HekimlerimizeTeşekkürler #YakınGrup'
      },
      {
        baseId: '21-mart-orman',
        category: 'sektor',
        title: '21 Mart Dünya Ormancılık Günü & Orman Haftası',
        month: 2, // Mart
        day: 21,
        timeStr: '10:00',
        icon: '🌲',
        tagText: 'ÇEVRE GÜNÜ',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '21 MART DÜNYA ORMANCILIK GÜNÜ',
        getSubheadline: (yr) => 'Daha Yeşil Bir Gelecek: Doğaya Nefes Olan Ormanlarımızı Koruyoruz...',
        aiPrompt: 'Lush evergreen pine forest with golden sunbeams filtering through the canopy, surrounded by glowing cyan ecological particles (#38bdf8). Deep navy blue sky (#0b2545), 8K ultra-realistic environmental render.',
        getText: (yr) => `Gelecek nesillere daha yaşanabilir yeşil bir dünya bırakmak için ormanlarımızı korumak ve ağaçlandırmayı desteklemek en temel sorumluluğumuzdur. 21 Mart Dünya Ormancılık Günü kutlu olsun! 🌲🌍`,
        hashtags: '#DünyaOrmancılıkGünü #OrmanHaftası #YeşilGelecek #DoğayıKoru #YakınGrup #Sürdürülebilirlik'
      },
      {
        baseId: 'su-gunu',
        category: 'sektor',
        title: '22 Mart Dünya Su Günü',
        month: 2, // Mart
        day: 22,
        timeStr: '10:00',
        icon: '💧',
        tagText: 'KÜRESEL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '22 MART DÜNYA SU GÜNÜ',
        getSubheadline: (yr) => 'Her Damla Yaşamdır: Sürdürülebilir Su ve Altyapı Çözümleri...',
        aiPrompt: 'Pristine, crystal-clear water droplet suspended in the air with glowing cyan and azure reflections (#38bdf8). In background, clean modern hydraulic engineering and sustainable green nature. Deep navy blue atmosphere (#0b2545), 8K Octane render, luxury corporate environmental visual.',
        getText: (yr) => `Su kaynaklarımızın korunması ve verimli altyapı yönetimi geleceğimizin en hayati güvencesidir. Doğaya saygılı mühendislik ile sürdürülebilirliği destekliyoruz. 22 Mart Dünya Su Günü kutlu olsun! 💧🌍`,
        hashtags: '#DünyaSuGünü #22Mart #SuGelecektir #Sürdürülebilirlik #YakınGrup #Mühendislik'
      },
      {
        baseId: '21-nisan-inovasyon',
        category: 'sektor',
        title: '21 Nisan Dünya Yaratıcılık ve İnovasyon Günü',
        month: 3, // Nisan
        day: 21,
        timeStr: '10:00',
        icon: '💡',
        tagText: 'İNOVASYON GÜNÜ',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '21 NİSAN DÜNYA YARATICILIK VE İNOVASYON GÜNÜ',
        getSubheadline: (yr) => 'Fikirleri Mühendislikle, İnovasyonu Gelecekle Buluşturuyoruz...',
        aiPrompt: 'Futuristic glowing cyan lightbulb composed of geometric architectural lines and circuits (#38bdf8) floating above a high-tech digital smart city. Deep navy blue background (#0b2545), 8K render.',
        getText: (yr) => `Sınırları aşan fikirler, teknoloji ve mühendislikle birleştiğinde geleceği şekillendirir. Yakın Grup olarak inşaat, enerji ve teknoloji alanlarında sürekli inovasyon üretiyoruz! 💡🚀`,
        hashtags: '#DünyaİnovasyonGünü #YaratıcılıkVeİnovasyon #ArGe #PropTech #CleanTech #YakınGrup'
      },
      {
        baseId: '4-mayis-isg',
        category: 'sektor',
        title: '4 - 10 Mayıs İş Sağlığı ve Güvenliği (İSG) Haftası',
        month: 4, // Mayıs
        day: 4,
        timeStr: '10:00',
        icon: '🦺',
        tagText: 'SEKTÖREL İSG',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => 'İŞ SAĞLIĞI VE GÜVENLİĞİ HAFTASI',
        getSubheadline: (yr) => 'Önce İnsan, Önce Güvenlik: Şantiyelerimizde Sıfır Kaza Hedefi...',
        aiPrompt: 'High-tech construction safety helmet and harness with glowing cyan safety shield hologram (#38bdf8) on a modern mega-construction site. Deep midnight navy blue backdrop (#0b2545), 8K render.',
        getText: (yr) => `Tüm şantiyelerimizde, enerji santrallerimizde ve tesislerimizde en büyük önceliğimiz çalışanlarımızın can güvenliği ve sağlığıdır. Sıfır kaza hedefiyle güvenli yarınları inşa ediyoruz. 🦺🏗️`,
        hashtags: '#İSGHaftası #İşSağlığıVeGüvenliği #ÖnceGüvenlik #SıfırKaza #Yakınİnşaat #YakınEnerji #YakınGrup'
      },
      {
        baseId: 'cevre-gunu',
        category: 'sektor',
        title: '5 Haziran Dünya Çevre Günü',
        month: 5, // Haziran
        day: 5,
        timeStr: '10:00',
        icon: '🌱',
        tagText: 'SEKTÖREL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '5 HAZİRAN DÜNYA ÇEVRE GÜNÜ',
        getSubheadline: (yr) => 'Sıfır Karbon ve Temiz Enerjiyle Sürdürülebilir Bir Gelecek...',
        aiPrompt: 'Futuristic sustainable green earth and clean technology visual (1:1 square). A pristine planet Earth orb enveloped by glowing cyan clean energy rings (#38bdf8) and lush green leaves, surrounded by modern solar farms and wind turbines. Deep navy blue universe background (#0b2545) with ambient light blue glow. 8K Octane render, environmental stewardship, high-end holding brand.',
        getText: (yr) => `Güneşten aldığımız güç ve sıfır emisyon vizyonumuzla yarınlara daha yaşanabilir yeşil bir dünya bırakmak için çalışıyoruz. 

Doğayı korumak, sürdürülebilir enerjiyi benimsemek ve geleceğimize sahip çıkmak hepimizin ortak görevidir. 5 Haziran Dünya Çevre Günü kutlu olsun! 🌍☀️`,
        hashtags: '#DünyaÇevreGünü #5Haziran #Sürdürülebilirlik #GüneşEnerjisi #TemizEnerji #YakınGrup #GreenFuture'
      },
      {
        baseId: '1-temmuz-kabotaj',
        category: 'sektor',
        title: '1 Temmuz Denizcilik ve Kabotaj Bayramı',
        month: 6, // Temmuz
        day: 1,
        timeStr: '09:00',
        icon: '⚓',
        tagText: 'RESMİ GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '1 TEMMUZ DENİZCİLİK VE KABOTAJ BAYRAMI KUTLU OLSUN!',
        getSubheadline: (yr) => 'Mavi Vatanımızda Bağımsızlığımızın ve Deniz Ticaretimizin Teminatı...',
        aiPrompt: 'Majestic modern cargo ship and naval engineering fleet sailing on azure deep blue sea under a golden sunrise with Turkish Flag. Deep navy blue atmosphere (#0b2545), 8K render.',
        getText: (yr) => `Denizlerimizdeki bağımsızlığımızın ve egemenliğimizin simgesi olan 1 Temmuz Denizcilik ve Kabotaj Bayramı'nı kutlar, tüm denizcilerimize pruvanız neta, rüzgarınız kolayına olsun deriz! ⚓🇹🇷`,
        hashtags: '#1Temmuz #KabotajBayramı #DenizcilikVeKabotajBayramı #MaviVatan #YakınGrup'
      },
      {
        baseId: 'mimarlik-gunu',
        category: 'sektor',
        title: 'Dünya Mimarlık Günü',
        month: 9, // Ekim (Ekim'in ilk haftası)
        day: 5,
        timeStr: '10:00',
        icon: '📐',
        tagText: 'MESLEKİ GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA MİMARLIK GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Estetiği, Dayanıklılığı ve Fonksiyonu Şekillendiren Mimarlarımıza...',
        aiPrompt: 'Avant-garde architectural design visualization (1:1 square). A stunning parametric sustainable glass building designed by visionary architects with glowing cyan structural lines (#38bdf8) and biophilic vertical gardens. Deep navy blue background (#0b2545), 8K architectural photography.',
        getText: (yr) => `Şehirlerin kimliğini, yaşam alanlarının estetiğini ve sürdürülebilir mekanların ruhunu tasarlayan; hayalleri çizgilere dönüştüren tüm mimarlarımızın Dünya Mimarlık Günü'nü kutlarız! 🏛️📐`,
        hashtags: '#DünyaMimarlıkGünü #Mimarlık #Architecture #ModernDesign #Yakınİnşaat #YakınGrup #SürdürülebilirMimari'
      },
      {
        baseId: 'sehircilik-gunu',
        category: 'sektor',
        title: '17 Ekim Dünya Şehircilik Günü',
        month: 9, // Ekim
        day: 17,
        timeStr: '10:00',
        icon: '🏙️',
        tagText: 'SEKTÖREL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA ŞEHİRCİLİK GÜNÜ',
        getSubheadline: (yr) => 'Dirençli, Akıllı ve İnsana Değer Katan Şehirler İnşa Ediyoruz...',
        aiPrompt: 'Ultra-modern master-planned futuristic smart city with sustainable skyscrapers, lush vertical gardens, and clean transit bridges under a cyan-blue sky. Deep navy blue corporate lighting (#0b2545), 8K architectural render.',
        getText: (yr) => `Depreme dayanıklı, estetik ve çevreyle uyumlu yaşam alanları tasarlamak modern şehirciliğin temelidir. Kentsel dönüşüm ve mühendislik vizyonumuzla güvenli şehirler inşa ediyoruz. 🏙️✨`,
        hashtags: '#DünyaŞehircilikGünü #KentselDönüşüm #AkıllıŞehirler #YakınGrup #ModernMimari'
      },
      {
        baseId: 'ogretmenler-gunu',
        category: 'sektor',
        title: '24 Kasım Öğretmenler Günü',
        month: 10, // Kasım
        day: 24,
        timeStr: '09:00',
        icon: '📚',
        tagText: 'ÖZEL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '24 KASIM ÖĞRETMENLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Geleceği Bilgi ve Sevgiyle İnşa Eden Kıymetli Öğretmenlerimize...',
        aiPrompt: 'Inspiring educational and mentorship corporate artwork (1:1 square). A luminous holographic open book with knowledge particles rising up into modern architectural blueprints and smart city skyscrapers. Deep navy blue background (#0b2545) with warm golden and cyan lighting (#38bdf8). Prestigious, grateful, 8K render.',
        getText: (yr) => `Başöğretmenimiz Gazi Mustafa Kemal Atatürk'ün izinde; aklın, bilimin ve aydınlık nesillerin mimarı olan tüm saygıdeğer öğretmenlerimizin 24 Kasım Öğretmenler Günü'nü şükran ve minnetle kutluyoruz.

Geleceği inşa eden en büyük güç eğitimdir! 📚✨`,
        hashtags: '#24Kasım #ÖğretmenlerGünü #24KasımÖğretmenlerGünü #BaşöğretmenAtatürk #YakınGrup #EğitimGelecektir'
      },
      {
        baseId: 'muhendisler-gunu',
        category: 'sektor',
        title: '5 Aralık Dünya Mühendisler Günü',
        month: 11, // Aralık
        day: 5,
        timeStr: '10:00',
        icon: '⚙️',
        tagText: 'SEKTÖREL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA MÜHENDİSLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Hayalleri Projeye, Projeleri Geleceğe Dönüştüren Zihinler...',
        aiPrompt: 'High-tech 5D BIM and engineering innovation artwork (1:1 square). Holographic glowing cyan 3D architectural blueprints (#38bdf8) interacting with renewable energy grid diagrams in mid-air. Deep navy blue background (#0b2545) with fine precision grid lines and optic light trails. 8K raytraced, futuristic, elite engineering corporate identity.',
        getText: (yr) => `Karmaşık problemleri çözüme, bilim ve teknolojiyi sürdürülebilir yaşama dönüştüren; inşaattan enerjiye, yazılımdan altyapıya hayatı kolaylaştıran tüm mühendislerimizin 5 Aralık Dünya Mühendisler Günü'nü kutlarız! 📐⚙️`,
        hashtags: '#DünyaMühendislerGünü #5Aralık #Mühendislik #Engineering #YakınGrup #BIM #İnşaat #Enerji'
      },
      {
        baseId: '10-aralik-insan-haklari',
        category: 'sektor',
        title: '10 Aralık Dünya İnsan Hakları Günü',
        month: 11, // Aralık
        day: 10,
        timeStr: '10:00',
        icon: '⚖️',
        tagText: 'KÜRESEL GÜN',
        tagClass: 'tag-sektor',
        eventClass: 'event-sektor',
        getHeadline: (yr) => '10 ARALIK DÜNYA İNSAN HAKLARI GÜNÜ',
        getSubheadline: (yr) => 'Eşitlik, Adalet ve İnsan Onuruna Saygıyla Daha Adil Bir Dünya...',
        aiPrompt: 'Universal justice scales glowing with platinum silver and cyan light (#38bdf8) over a global network of connected diverse people. Deep navy blue background (#0b2545), 8K render.',
        getText: (yr) => `Tüm insanların eşit, özgür ve onurlu bir yaşam sürme hakkına sahip olduğu bilinciyle; 10 Aralık Dünya İnsan Hakları Günü'nü kutluyor, barış ve adalet dolu bir dünya diliyoruz. ⚖️🕊️`,
        hashtags: '#DünyaİnsanHaklarıGünü #10Aralık #İnsanHakları #Eşitlik #Adalet #YakınGrup'
      }
    ];

    // 2026 - 2030 DİNİ BAYRAM VE ARİFE TARİHLERİ (Hicri Takvim Kesin Hesaplı)
    const ISLAMIC_HOLIDAYS_BY_YEAR = {
      2026: {
        ramazanArefe: { month: 2, day: 19, str: '19 Mart 2026', iso: '2026-03-19' },
        ramazan1: { month: 2, day: 20, str: '20 Mart 2026', iso: '2026-03-20' },
        ramazan2: { month: 2, day: 21, str: '21 Mart 2026', iso: '2026-03-21' },
        ramazan3: { month: 2, day: 22, str: '22 Mart 2026', iso: '2026-03-22' },
        kurbanArefe: { month: 4, day: 26, str: '26 Mayıs 2026', iso: '2026-05-26' },
        kurban1: { month: 4, day: 27, str: '27 Mayıs 2026', iso: '2026-05-27' },
        kurban2: { month: 4, day: 28, str: '28 Mayıs 2026', iso: '2026-05-28' },
        kurban3: { month: 4, day: 29, str: '29 Mayıs 2026', iso: '2026-05-29' },
        kurban4: { month: 4, day: 30, str: '30 Mayıs 2026', iso: '2026-05-30' }
      },
      2027: {
        ramazanArefe: { month: 2, day: 9, str: '9 Mart 2027', iso: '2027-03-09' },
        ramazan1: { month: 2, day: 10, str: '10 Mart 2027', iso: '2027-03-10' },
        ramazan2: { month: 2, day: 11, str: '11 Mart 2027', iso: '2027-03-11' },
        ramazan3: { month: 2, day: 12, str: '12 Mart 2027', iso: '2027-03-12' },
        kurbanArefe: { month: 4, day: 15, str: '15 Mayıs 2027', iso: '2027-05-15' },
        kurban1: { month: 4, day: 16, str: '16 Mayıs 2027', iso: '2027-05-16' },
        kurban2: { month: 4, day: 17, str: '17 Mayıs 2027', iso: '2027-05-17' },
        kurban3: { month: 4, day: 18, str: '18 Mayıs 2027', iso: '2027-05-18' },
        kurban4: { month: 4, day: 19, str: '19 Mayıs 2027', iso: '2027-05-19' }
      },
      2028: {
        ramazanArefe: { month: 1, day: 26, str: '26 Şubat 2028', iso: '2028-02-26' },
        ramazan1: { month: 1, day: 27, str: '27 Şubat 2028', iso: '2028-02-27' },
        ramazan2: { month: 1, day: 28, str: '28 Şubat 2028', iso: '2028-02-28' },
        ramazan3: { month: 1, day: 29, str: '29 Şubat 2028', iso: '2028-02-29' },
        kurbanArefe: { month: 4, day: 4, str: '4 Mayıs 2028', iso: '2028-05-04' },
        kurban1: { month: 4, day: 5, str: '5 Mayıs 2028', iso: '2028-05-05' },
        kurban2: { month: 4, day: 6, str: '6 Mayıs 2028', iso: '2028-05-06' },
        kurban3: { month: 4, day: 7, str: '7 Mayıs 2028', iso: '2028-05-07' },
        kurban4: { month: 4, day: 8, str: '8 Mayıs 2028', iso: '2028-05-08' }
      },
      2029: {
        ramazanArefe: { month: 1, day: 14, str: '14 Şubat 2029', iso: '2029-02-14' },
        ramazan1: { month: 1, day: 15, str: '15 Şubat 2029', iso: '2029-02-15' },
        ramazan2: { month: 1, day: 16, str: '16 Şubat 2029', iso: '2029-02-16' },
        ramazan3: { month: 1, day: 17, str: '17 Şubat 2029', iso: '2029-02-17' },
        kurbanArefe: { month: 3, day: 23, str: '23 Nisan 2029', iso: '2029-04-23' },
        kurban1: { month: 3, day: 24, str: '24 Nisan 2029', iso: '2029-04-24' },
        kurban2: { month: 3, day: 25, str: '25 Nisan 2029', iso: '2029-04-25' },
        kurban3: { month: 3, day: 26, str: '26 Nisan 2029', iso: '2029-04-26' },
        kurban4: { month: 3, day: 27, str: '27 Nisan 2029', iso: '2029-04-27' }
      },
      2030: {
        ramazanArefe: { month: 1, day: 4, str: '4 Şubat 2030', iso: '2030-02-04' },
        ramazan1: { month: 1, day: 5, str: '5 Şubat 2030', iso: '2030-02-05' },
        ramazan2: { month: 1, day: 6, str: '6 Şubat 2030', iso: '2030-02-06' },
        ramazan3: { month: 1, day: 7, str: '7 Şubat 2030', iso: '2030-02-07' },
        kurbanArefe: { month: 3, day: 12, str: '12 Nisan 2030', iso: '2030-04-12' },
        kurban1: { month: 3, day: 13, str: '13 Nisan 2030', iso: '2030-04-13' },
        kurban2: { month: 3, day: 14, str: '14 Nisan 2030', iso: '2030-04-14' },
        kurban3: { month: 3, day: 15, str: '15 Nisan 2030', iso: '2030-04-15' },
        kurban4: { month: 3, day: 16, str: '16 Nisan 2030', iso: '2030-04-16' }
      }
    };


    
    // ── 4 ANA SEKTÖR HAFTALIK DÖNÜŞÜMLÜ İÇERİK HAVUZU (52 HAFTA x 4 = 208 POST/YIL) ──
    const SECTOR_WEEKLY_THEMES = {
      insaat: [
        {
          sub: 'Endüstriyel Taahhüt & Ağır Sanayi',
          title: 'Yakın İnşaat — Ağır Sanayi ve Endüstriyel Tesis Mühendisliği',
          headline: 'ENDÜSTRİYEL TAAHHÜTTE YÜKSEK MÜHENDİSLİK GÜCÜ',
          subheadline: 'Ağır Sanayi Tesisleri, Lojistik Merkezleri ve Fabrika İnşaatları...',
          icon: '🏗️',
          prompt: 'High-tech modern industrial heavy manufacturing plant and logistics warehouse facility with structural steel frames under bright cyan sunlight. Deep navy blue background (#0b2545), 8K render.',
          text: `Sanayi üretiminin kalbi olan fabrikalar, lojistik depolar ve ağır sanayi tesislerinde; depreme dayanıklı çelik ve betonarme çözümlerimizle anahtar teslim taahhüt sunuyoruz. 🏗️🏭`,
          tags: '#Yakınİnşaat #AğırSanayi #EndüstriyelTaahhüt #ÇelikYapı #Fabrikaİnşaatı #EPC #YakınGrup'
        },
        {
          sub: 'Veri Merkezleri (Data Center Tier-3)',
          title: 'Yakın İnşaat — Yüksek Güvenlikli Veri Merkezleri',
          headline: 'VERİ MERKEZLERİ İÇİN KRİTİK ALTYAPI İNŞAATI',
          subheadline: 'Tier-3 Standartlarında Kesintisiz Enerji ve Yüksek Güvenlikli Yapılar...',
          icon: '🏢',
          prompt: 'State-of-the-art Tier-3 Data Center facility with glowing cyan optical fiber lines and robust architectural blast-resistant facade. Deep navy blue (#0b2545), 8K render.',
          text: `Türkiye'nin dijital dönüşümüne güç katıyoruz. Yüksek sismik izolasyon, kesintisiz enerji ve iklimlendirme altyapısıyla Tier-3 seviyesinde veri merkezleri inşa ediyoruz. 🏢🌐`,
          tags: '#Yakınİnşaat #DataCenter #VeriMerkezi #KritikAltyapı #Mühendislik #YakınGrup'
        },
        {
          sub: 'Kentsel Dönüşüm & Rezidans',
          title: 'Yakın İnşaat — Depreme Dayanıklı Kentsel Dönüşüm',
          headline: 'GÜVENLİ VE MODERN YAŞAM ALANLARI İNŞA EDİYORUZ',
          subheadline: '2026 Yarısı Bizden ve İADŞP Destekli Kentsel Dönüşüm Çözümleri...',
          icon: '🏙️',
          prompt: 'Modern earthquake-resilient luxury residential architecture with sustainable green balconies in Istanbul under clear sky. Deep navy blue accents (#0b2545), 8K architectural photo.',
          text: `Deprem riski altındaki yapıları güvenli, modern ve estetik yaşam alanlarına dönüştürüyoruz. 2026 Kentsel Dönüşüm modellerimizle mülk sahiplerine değer katıyoruz. 🏙️✨`,
          tags: '#Yakınİnşaat #KentselDönüşüm #DepremDirençli #YarısıBizden #ModernKonut #YakınGrup'
        },
        {
          sub: 'Altyapı & Çevre Mühendisliği',
          title: 'Yakın İnşaat — Mega Altyapı ve Çevre Projeleri',
          headline: 'GELECEĞİN ŞEHİRLERİ İÇİN ALTYAPI MÜHENDİSLİĞİ',
          subheadline: 'Kanalizasyon, İleri Arıtma ve Şebeke Tesisleri Taahhüdü...',
          icon: '🌐',
          prompt: 'Modern civil engineering and environmental infrastructure piping network with cyan glowing flow telemetry lines. Deep midnight navy blue (#0b2545), 8K render.',
          text: `Şehirlerin sürdürülebilirliği altyapıdan başlar. İleri biyolojik arıtma, drenaj ve şebeke altyapı projelerimizle geleceğe temiz çevre bırakıyoruz. 🌐💧`,
          tags: '#Yakınİnşaat #Altyapı #ÇevreMühendisliği #ArıtmaTesisleri #MegaProjeler #YakınGrup'
        }
      ],
      enerji: [
        {
          sub: 'Tier-1 Bifacial Güneş Santralleri (GES)',
          title: 'Yakın Enerji — Endüstriyel Çatı ve Arazi GES',
          headline: 'GÜNEŞİN GÜCÜYLE SIFIR ELEKTRİK MALİYETİ',
          subheadline: 'Tier-1 Çift Yüzeyli Güneş Panelleri ile Maksimum Verim...',
          icon: '☀️',
          prompt: 'Pristine industrial rooftop solar PV farm with gleaming Tier-1 bifacial panels reflecting sunlight with cyan energy lines. Deep navy blue sky (#0b2545), 8K render.',
          text: `Fabrikanızın çatısını temiz enerji santraline dönüştürün! Yakın Enerji, Tier-1 bifacial paneller ve yüksek verimli invertörlerle anahtar teslim GES kurulumu gerçekleştirir. ☀️⚡`,
          tags: '#YakınEnerji #GüneşEnerjisi #SolarEPC #ÇatıGES #TemizEnerji #SıfırKarbon #YakınGrup'
        },
        {
          sub: 'BESS Batarya Enerji Depolama',
          title: 'Yakın Enerji — BESS Batarya Depolama Sistemleri',
          headline: 'ENERJİNİZİ DEPOLAYIN, 7/24 KESİNTİSİZ KULLANIN',
          subheadline: 'Yüksek Kapasiteli Lityum ve BESS Depolama Çözümleri...',
          icon: '🔋',
          prompt: 'Futuristic industrial BESS battery energy storage container units with glowing neon cyan power indicators (#38bdf8). Deep navy blue background (#0b2545), 8K render.',
          text: `Yenilenebilir enerjide dalgalanmalara son! BESS batarya depolama sistemlerimizle enerjinizi depoluyor, en yüksek tüketim saatlerinde şebekeden bağımsız güç sağlıyoruz. 🔋⚡`,
          tags: '#YakınEnerji #BESS #BataryaDepolama #EnerjiDepolama #EnergyStorage #GridStability #YakınGrup'
        },
        {
          sub: 'Rüzgar Santralleri (RES)',
          title: 'Yakın Enerji — Rüzgar Enerjisi Santralleri (RES)',
          headline: 'RÜZGARIN GÜCÜYLE YÜKSEK KAPASİTELİ ÜRETİM',
          subheadline: 'Yüksek Türbin Verimliliği ve Hibrit Enerji Entegrasyonu...',
          icon: '💨',
          prompt: 'Massive modern aerodynamic wind turbines turning on green hills under dramatic cyan sunrise clouds. Deep navy blue lighting (#0b2545), 8K clean energy render.',
          text: `Rüzgarın kinetik enerjisini temiz elektriğe dönüştürüyoruz. RES ve hibrit santral projelerimizle Türkiye'nin yenilenebilir enerji kurulu gücünü artırıyoruz. 💨⚡`,
          tags: '#YakınEnerji #RüzgarEnerjisi #RES #WindEnergy #CleanPower #YenilenebilirEnerji #YakınGrup'
        },
        {
          sub: 'Enerji Yönetimi & SCADA Telemetri',
          title: 'Yakın Enerji — Akıllı SCADA & Enerji Telemetrisi',
          headline: '7/24 DİJİTAL İZLEME VE ENERJİ VERİMLİLİĞİ',
          subheadline: 'IoT Sensörler ve Yapay Zekâ ile Santral Performans Optimizasyonu...',
          icon: '⚡',
          prompt: 'High-tech holographic energy SCADA monitoring dashboard showing real-time solar and wind power charts with glowing cyan UI (#38bdf8). Deep navy blue (#0b2545), 8K render.',
          text: `Santrallerinizi saniye saniye izleyin. Akıllı SCADA ve IoT telemetri sistemlerimizle arızaları önceden tespit ediyor, enerji üretim verimini %15 artırıyoruz. ⚡📊`,
          tags: '#YakınEnerji #SCADA #EnerjiVerimliliği #IoT #SmartGrid #Telemetri #YakınGrup'
        }
      ],
      capital: [
        {
          sub: 'SPV & Proje Finansmanı',
          title: 'Yakın Capital — SPV Yapılandırma ve Yatırım Finansmanı',
          headline: 'BÜYÜK ÖLÇEKLİ PROJELERDE SERMAYE VE SPV MİMARİSİ',
          subheadline: 'Uluslararası Fonlar, SPV Güvencesi ve Finansal Mühendislik...',
          icon: '💼',
          prompt: 'Executive financial boardroom with glowing holographic 3D investment growth models and skyscraper views. Deep navy blue (#0b2545) with gold and cyan lighting, 8K render.',
          text: `Büyük ölçekli altyapı ve enerji yatırımlarını doğru finansman modelleriyle hayata geçiriyoruz. SPV kurulumu ve proje finansmanı ile sermayenizi güvence altına alın. 💼🏛️`,
          tags: '#YakınCapital #ProjeFinansmanı #SPV #SermayeYönetimi #YatırımDanışmanlığı #YakınGrup'
        },
        {
          sub: 'GYO & Gayrimenkul Yatırımları',
          title: 'Yakın Capital — GYO Ortaklıkları ve Gayrimenkul Fonları',
          headline: 'GAYRİMENKUL YATIRIMINDA YÜKSEK GETİRİ VE GÜVEN',
          subheadline: 'GYO Projeleri, Portföy Çeşitlendirme ve Varlık Yönetimi...',
          icon: '📈',
          prompt: 'Modern architectural residential high-rises with 3D glowing golden ROI charts and investment analytics. Deep navy blue background (#0b2545), 8K render.',
          text: `Kentsel dönüşüm ve ticari gayrimenkul projelerinde GYO ortaklıkları ve fon yapılandırmasıyla yatırımcılara düzenli ve yüksek getiri sağlayan varlık modelleri sunuyoruz. 📈🏢`,
          tags: '#YakınCapital #GYO #GayrimenkulYatırımı #PortföyYönetimi #VarlıkYönetimi #YakınGrup'
        },
        {
          sub: 'Yeşil Finansman & Karbon Kredisi',
          title: 'Yakın Capital — Yeşil Tahvil & Karbon Finansmanı',
          headline: 'SÜRDÜRÜLEBİLİR DÖNÜŞÜM İÇİN YEŞİL FİNANSMAN',
          subheadline: 'Karbon Kredisi, Yeşil Tahviller ve ESG Uyumlu Yatırım Mimarisi...',
          icon: '🌱',
          prompt: 'Glowing green leaf and gold currency coins merged with digital blockchain telemetry lines in a modern banking architecture. Deep navy blue (#0b2545), 8K render.',
          text: `Sıfır karbon hedeflerine ulaşırken yeşil finansmandan yararlanın. Karbon kredisi ticareti ve yeşil tahvil yapılandırmasıyla sürdürülebilir yatırımlarınızı finanse ediyoruz. 🌱💶`,
          tags: '#YakınCapital #YeşilFinansman #GreenBonds #KarbonKredisi #ESG #SürdürülebilirYatırım #YakınGrup'
        },
        {
          sub: 'M&A & Şirket Ortaklıkları',
          title: 'Yakın Capital — Birleşme & Devralma (M&A) Danışmanlığı',
          headline: 'STRATEJİK ORTAKLIKLAR VE ŞİRKET DEVRALMALARI',
          subheadline: 'Enerji ve İnşaat Sektörlerinde Güçlü Büyüme ve Satın Alma Modelleri...',
          icon: '🤝',
          prompt: 'Two business executives sealing a multi-million dollar handshake with glowing cyan corporate networks connecting globally in background. Deep navy blue (#0b2545), 8K render.',
          text: `Şirketinizi stratejik birleşmelerle büyütün. Enerji ve taahhüt sektörlerinde şirket değerleme, M&A ve ortaklık süreçlerinde uçtan uca danışmanlık sağlıyoruz. 🤝💼`,
          tags: '#YakınCapital #MAndA #ŞirketBirleşmesi #YatırımStratejisi #Holding #YakınGrup'
        }
      ],
      teknoloji: [
        {
          sub: '5D BIM Modelleme & Dijital İkiz',
          title: 'Yakın Teknoloji — 5D BIM ve Dijital İkiz Yönetimi',
          headline: 'ŞANTİYELERDE DİJİTAL DÖNÜŞÜM: 5D BIM İLE SIFIR HATA',
          subheadline: 'Zaman, Maliyet ve 3D Modeli Birleştiren İleri Mühendislik...',
          icon: '💻',
          prompt: 'Holographic 5D BIM digital twin building model floating over an architectural tablet with glowing cyan wireframe measurements. Deep navy blue atmosphere (#0b2545), 8K high-tech render.',
          text: `İnşaatta hata payını sıfırlayın! 5D BIM ve dijital ikiz teknolojimizle projeleri sanal ortamda simüle ediyor, maliyet ve zaman aşımlarını engelliyoruz. 📐🚀`,
          tags: '#YakınTeknoloji #5DBIM #BIM #Dijitalİkiz #PropTech #İleriMühendislik #YakınGrup'
        },
        {
          sub: 'Yapay Zekâ Karar Motorları',
          title: 'Yakın Teknoloji — Yapay Zekâ Destekli Proje Analitiği',
          headline: 'YAPAY ZEKÂ İLE AKILLI ŞANTİYE VE VERİ YÖNETİMİ',
          subheadline: 'Tahmine Dayalı Bakım, Risk Analizi ve Otomatik Teklif Motorları...',
          icon: '🤖',
          prompt: 'Futuristic AI neural network brain visualizing geometric construction and energy flow with glowing cyan light trails (#38bdf8). Deep midnight navy blue (#0b2545), 8K render.',
          text: `Büyük veriyi akıllı kararlara dönüştürüyoruz. Yapay zekâ algoritmalarımızla riskleri önceden öngörüyor, şantiye ve santral operasyonlarını optimize ediyoruz. 🤖💡`,
          tags: '#YakınTeknoloji #YapayZeka #AI #MakineÖğrenimi #SmartConstruction #DataAnalytics #YakınGrup'
        },
        {
          sub: 'IoT Şantiye Telemetrisi',
          title: 'Yakın Teknoloji — IoT Sensörler ve Canlı Şantiye Takibi',
          headline: 'ŞANTİYENİZ 7/24 AVUCUNUZUN İÇİNDE',
          subheadline: 'Drone Haritalama, IoT Sensörler ve Canlı Telemetri Ağı...',
          icon: '📡',
          prompt: 'Autonomous drone scanning a construction site with glowing cyan lidar measurement beams connecting to a digital tablet. Deep navy blue (#0b2545), 8K render.',
          text: `Drone haritalama ve IoT sensörlerle şantiyelerimizi anlık takip ediyoruz. İlerleme durumu, malzeme stoğu ve iş güvenliği canlı telemetriyle ekranınızda! 📡🛰️`,
          tags: '#YakınTeknoloji #IoT #DroneMapping #Lidar #AkıllıŞantiye #Telemetri #YakınGrup'
        },
        {
          sub: 'Siber Güvenlik & Bulut Altyapı',
          title: 'Yakın Teknoloji — Endüstriyel Siber Güvenlik ve Bulut',
          headline: 'KRİTİK ENERJİ VE ALTYAPI SİSTEMLERİNDE SİBER GÜVENLİK',
          subheadline: 'SCADA ve Endüstriyel Ağlar İçin Uçtan Uca Koruma Kalkanı...',
          icon: '🔒',
          prompt: 'Futuristic digital security shield glowing with cyan and gold binary data defending industrial infrastructure against threats. Deep navy blue (#0b2545), 8K render.',
          text: `Endüstriyel tesisler ve enerji santrallerinde siber güvenlik hayati önem taşır. Yakın Teknoloji; SCADA, IoT ve bulut sistemlerinizi en üst düzeyde korur. 🔒🛡️`,
          tags: '#YakınTeknoloji #SiberGüvenlik #CyberSecurity #SCADAGüvenliği #CloudInfrastructure #YakınGrup'
        }
      ]
    };

    const MONTH_NAMES = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    // GENERATE COMPLETE PLAN FOR A GIVEN YEAR (2026 - 2030)
        // GENERATE COMPLETE PLAN FOR A GIVEN YEAR (2026 - 2030)
        function generatePlanForYear(yr) {
      const list = [];

      // 1. Resmi Tatiller, Milli Bayramlar & Anma Günleri
      RECURRING_SPECIAL_DAYS.forEach(d => {
        const monthStr = String(d.month + 1).padStart(2, '0');
        const dayStr = String(d.day).padStart(2, '0');
        const dateISO = `${yr}-${monthStr}-${dayStr}`;
        const dateStr = `${d.day} ${MONTH_NAMES[d.month]} ${yr}`;

        list.push({
          id: `${d.baseId}-${yr}`,
          category: d.category,
          title: d.title,
          dateISO: dateISO,
          timeStr: d.timeStr,
          dateStr: dateStr,
          year: yr,
          month: d.month,
          day: d.day,
          icon: d.icon,
          tagText: d.tagText,
          tagClass: d.tagClass,
          eventClass: d.eventClass,
          headline: d.getHeadline(yr),
          subheadline: d.getSubheadline(yr),
          aiPrompt: d.aiPrompt,
          text: d.getText(yr),
          hashtags: d.hashtags
        });
      });

      // 2. Dini Bayramlar & Arifeler (Resmi Tatil Günleri)
      const isl = ISLAMIC_HOLIDAYS_BY_YEAR[yr] || ISLAMIC_HOLIDAYS_BY_YEAR[2026];

      // Ramazan Bayramı Arifesi
      list.push({
        id: `ramazan-arefe-${yr}`,
        category: 'dini',
        title: 'Ramazan Bayramı Arifesi (Resmi Yarım Gün Tatil)',
        dateISO: isl.ramazanArefe.iso,
        timeStr: '13:00',
        dateStr: isl.ramazanArefe.str,
        year: yr,
        month: isl.ramazanArefe.month,
        day: isl.ramazanArefe.day,
        icon: '✨',
        tagText: 'RESMİ TATİL & ARİFE',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'RAMAZAN BAYRAMI ARİFENİZ MÜBAREK OLSUN',
        subheadline: 'Huzur, Sağlık ve Bereket Dolu Bir Bayram Temennisiyle...',
        aiPrompt: 'Spiritual sunset over modern architectural minarets and glass skyscrapers with glowing lantern light and subtle crescent moon. Deep navy blue atmosphere (#0b2545) with golden radiance, 8K render.',
        text: `Mübarek Ramazan Bayramı'nın müjdecisi olan Arife Günü'nün hanelerinize esenlik, huzur ve sağlık getirmesini dileriz. Arife gününüz mübarek olsun. 🌙✨`,
        hashtags: '#ArifeGünü #RamazanArifesi #HayırlıBayramlar #YakınGrup #ResmiTatil'
      });

      // Ramazan Bayramı 1. Gün
      list.push({
        id: `ramazan-bayrami-1-${yr}`,
        category: 'dini',
        title: 'Ramazan Bayramı 1. Gün (Resmi Tatil)',
        dateISO: isl.ramazan1.iso,
        timeStr: '09:00',
        dateStr: isl.ramazan1.str,
        year: yr,
        month: isl.ramazan1.month,
        day: isl.ramazan1.day,
        icon: '🌙',
        tagText: 'RESMİ TATİL & DİNİ BAYRAM',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'RAMAZAN BAYRAMINIZ MÜBAREK OLSUN',
        subheadline: 'Birlik, Beraberlik ve Huzur Dolu Nice Bayramlara...',
        aiPrompt: 'Luxurious corporate Eid holiday greeting visual (1:1 square). A stunning 3D glowing golden crescent moon floating gracefully above modern sustainable glass skyscrapers and green rooftop solar panels. Deep midnight navy blue (#0b2545) and soft cyan-teal atmosphere (#0284c7 / #38bdf8) with subtle geometric Islamic motifs. 8K Octane render, photorealistic, pristine executive design.',
        text: `Mübarek Ramazan Bayramı'nın milletimize, iş ortaklarımıza ve tüm insanlığa sağlık, huzur, bereket ve mutluluk getirmesini dileriz. 

Sevdiklerinizle bir arada, neşe ve esenlik dolu bir bayram geçirmeniz dileğiyle. Ramazan Bayramınız Mübarek Olsun! 🌙✨`,
        hashtags: '#RamazanBayramı #İyiBayramlar #BayramınızMübarekOlsun #YakınGrup #HuzurVeBereket #ResmiTatil'
      });

      // Kurban Bayramı Arifesi
      list.push({
        id: `kurban-arefe-${yr}`,
        category: 'dini',
        title: 'Kurban Bayramı Arifesi (Resmi Yarım Gün Tatil)',
        dateISO: isl.kurbanArefe.iso,
        timeStr: '13:00',
        dateStr: isl.kurbanArefe.str,
        year: yr,
        month: isl.kurbanArefe.month,
        day: isl.kurbanArefe.day,
        icon: '✨',
        tagText: 'RESMİ TATİL & ARİFE',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'KURBAN BAYRAMI ARİFENİZ MÜBAREK OLSUN',
        subheadline: 'Paylaşmanın ve Kardeşliğin Bereketli Bayramına Ulaşırken...',
        aiPrompt: 'Peaceful twilight sky with glowing golden crescent moon and lantern reflections on contemporary glass architecture. Deep navy blue background (#0b2545) with warm amber light, 8K render.',
        text: `Kurban Bayramı Arifesi'nin milletimize ve tüm İslam alemine sağlık, barış ve esenlik getirmesini temenni ederiz. Arifeniz mübarek olsun. 🌙🕊️`,
        hashtags: '#KurbanArifesi #ArifeGünü #Huzur #Bereket #YakınGrup #ResmiTatil'
      });

      // Kurban Bayramı 1. Gün
      list.push({
        id: `kurban-bayrami-1-${yr}`,
        category: 'dini',
        title: 'Kurban Bayramı 1. Gün (Resmi Tatil)',
        dateISO: isl.kurban1.iso,
        timeStr: '09:00',
        dateStr: isl.kurban1.str,
        year: yr,
        month: isl.kurban1.month,
        day: isl.kurban1.day,
        icon: '🐑',
        tagText: 'RESMİ TATİL & DİNİ BAYRAM',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'KURBAN BAYRAMINIZ MÜBAREK OLSUN',
        subheadline: 'Paylaşmanın, Dayanışmanın ve Kardeşliğin Bereketiyle...',
        aiPrompt: 'Elegant and spiritual corporate holiday artwork (1:1 square). A radiant crescent moon and subtle golden lantern light casting serene reflections on polished modern architectural glass. Deep navy blue background (#0b2545) with soft light blue and emerald highlights (#38bdf8). Peaceful, generous, high-end corporate holding aesthetic, 8K ultra-detailed render.',
        text: `Kurban Bayramı'nın bereketinin, paylaşma ve dayanışma ruhunun hanelerinize sağlık, esenlik ve huzur getirmesini temenni ederiz. 

Tüm milletimizin ve İslam aleminin Kurban Bayramı mübarek olsun. 🌙🕊️`,
        hashtags: '#KurbanBayramı #İyiBayramlar #KurbanBayramınızMübarekOlsun #YakınGrup #PaylaşmakGüzeldir #ResmiTatil'
      });

      // 3. Haftalık 4 Proje Vitrini Paylaşımı (Salı, Çarşamba, Perşembe, Cuma)
      let currDate = new Date(yr, 0, 1);
      let weekCount = 1;

      while (currDate.getFullYear() === yr) {
        const dayOfWeek = currDate.getDay();
        const m = currDate.getMonth();
        const d = currDate.getDate();
        const mStr = String(m + 1).padStart(2, '0');
        const dStr = String(d).padStart(2, '0');
        const iso = `${yr}-${mStr}-${dStr}`;
        const str = `${d} ${MONTH_NAMES[m]} ${yr}`;

        const themeIdx = (weekCount - 1) % 4;

        if (dayOfWeek === 2) { // SALI -> YAKIN İNŞAAT
          const t = SECTOR_WEEKLY_THEMES.insaat[themeIdx];
          list.push({
            id: `haftalik-insaat-w${weekCount}-${yr}`,
            category: 'proje',
            title: t.title,
            dateISO: iso,
            timeStr: '11:00',
            dateStr: str,
            year: yr,
            month: m,
            day: d,
            icon: t.icon,
            tagText: 'YAKIN İNŞAAT',
            tagClass: 'tag-proje',
            eventClass: 'event-proje',
            headline: t.headline,
            subheadline: t.subheadline,
            aiPrompt: t.prompt,
            text: t.text,
            hashtags: t.tags
          });
        } else if (dayOfWeek === 3) { // ÇARŞAMBA -> YAKIN ENERJİ
          const t = SECTOR_WEEKLY_THEMES.enerji[themeIdx];
          list.push({
            id: `haftalik-enerji-w${weekCount}-${yr}`,
            category: 'proje',
            title: t.title,
            dateISO: iso,
            timeStr: '11:00',
            dateStr: str,
            year: yr,
            month: m,
            day: d,
            icon: t.icon,
            tagText: 'YAKIN ENERJİ',
            tagClass: 'tag-proje',
            eventClass: 'event-proje',
            headline: t.headline,
            subheadline: t.subheadline,
            aiPrompt: t.prompt,
            text: t.text,
            hashtags: t.tags
          });
        } else if (dayOfWeek === 4) { // PERŞEMBE -> YAKIN CAPITAL
          const t = SECTOR_WEEKLY_THEMES.capital[themeIdx];
          list.push({
            id: `haftalik-capital-w${weekCount}-${yr}`,
            category: 'proje',
            title: t.title,
            dateISO: iso,
            timeStr: '11:00',
            dateStr: str,
            year: yr,
            month: m,
            day: d,
            icon: t.icon,
            tagText: 'YAKIN CAPITAL',
            tagClass: 'tag-proje',
            eventClass: 'event-proje',
            headline: t.headline,
            subheadline: t.subheadline,
            aiPrompt: t.prompt,
            text: t.text,
            hashtags: t.tags
          });
        } else if (dayOfWeek === 5) { // CUMA -> YAKIN TEKNOLOJİ
          const t = SECTOR_WEEKLY_THEMES.teknoloji[themeIdx];
          list.push({
            id: `haftalik-teknoloji-w${weekCount}-${yr}`,
            category: 'proje',
            title: t.title,
            dateISO: iso,
            timeStr: '11:00',
            dateStr: str,
            year: yr,
            month: m,
            day: d,
            icon: t.icon,
            tagText: 'YAKIN TEKNOLOJİ',
            tagClass: 'tag-proje',
            eventClass: 'event-proje',
            headline: t.headline,
            subheadline: t.subheadline,
            aiPrompt: t.prompt,
            text: t.text,
            hashtags: t.tags
          });
        }

        if (dayOfWeek === 0) {
          weekCount++;
        }

        currDate.setDate(currDate.getDate() + 1);
      }

      list.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
      return list;
    }

    // ALL DATA FOR 2026 - 2030
    let CONTENT_PLAN = [];
    for (let y = 2026; y <= 2030; y++) {
      CONTENT_PLAN = CONTENT_PLAN.concat(generatePlanForYear(y));
    }

    let currentYear = 2026;
    let currentMonth = 9; // Ekim 2026 başlangıç // Ekim (0-indexed: 9 = Ekim)

    // ── INTERACTIVE MONTHLY CALENDAR ENGINE ─────────────────────────────────────
    function renderMonthlyCalendar(year, month) {
      // Update year pill
      const yearPills = document.querySelectorAll('.year-pill');
      yearPills.forEach(p => {
        if (parseInt(p.textContent) === year) p.classList.add('active');
        else p.classList.remove('active');
      });
      const titleEl = document.getElementById('cal-month-title');
      titleEl.innerHTML = `📅 <span>${MONTH_NAMES[month]} ${year}</span>`;

      // Render Month Chips Bar
      const chipsContainer = document.getElementById('months-chips');
      chipsContainer.innerHTML = '';
      MONTH_NAMES.forEach((mName, idx) => {
        const chip = document.createElement('button');
        chip.className = `month-chip ${idx === month ? 'active' : ''}`;
        chip.textContent = `${mName}`;
        chip.onclick = () => {
          currentMonth = idx;
          renderMonthlyCalendar(currentYear, currentMonth);
        };
        chipsContainer.appendChild(chip);
      });

      // Compute Days Grid
      const container = document.getElementById('cal-days-container');
      container.innerHTML = '';

      // First day of month & total days
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();

      // Monday-first indexing (0 = Mon, 6 = Sun)
      let startDayOfWeek = firstDay.getDay() - 1;
      if (startDayOfWeek === -1) startDayOfWeek = 6;

      // Previous month days for padding
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const dayNum = prevMonthLastDay - i;
        const cell = document.createElement('div');
        cell.className = 'cal-day-cell other-month';
        cell.innerHTML = `<div class="cal-day-header"><span class="cal-day-num">${dayNum}</span></div>`;
        container.appendChild(cell);
      }

      // Current Month Days
      const today = new Date();
      for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div');
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateISO = `${year}-${monthStr}-${dayStr}`;

        const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day);
        cell.className = `cal-day-cell ${isToday ? 'today' : ''}`;

        cell.innerHTML = `
          <div class="cal-day-header">
            <span class="cal-day-num">${day}</span>
            ${isToday ? '<span style="font-size:0.65rem; font-weight:800; color:#0284c7;">BUGÜN</span>' : ''}
          </div>
          <div class="cal-day-events" id="events-${dateISO}"></div>
        `;

        // Check if there are events for this day (filtered by activeCategoryFilter)
        const eventsForDay = CONTENT_PLAN.filter(item => {
          if (item.dateISO !== dateISO) return false;
          if (activeCategoryFilter === 'all') return true;
          return item.category === activeCategoryFilter;
        });
        const eventsContainer = cell.querySelector(`#events-${dateISO}`);

        eventsForDay.forEach(ev => {
          const badge = document.createElement('div');
          badge.className = `cal-event-badge ${ev.eventClass || 'event-milli'}`;
          badge.innerHTML = `
            <div style="font-weight:800; font-size:0.74rem;">${ev.icon} ${ev.title}</div>
            <div style="font-size:0.68rem; opacity:0.85;">⏰ ${ev.timeStr} • Tıkla & İncele</div>
          `;
          badge.onclick = (e) => {
            e.stopPropagation();
            openEventModal(ev.id);
          };
          eventsContainer.appendChild(badge);
        });

        container.appendChild(cell);
      }

      // Next month padding to complete grid
      const totalRendered = startDayOfWeek + totalDays;
      const remaining = (7 - (totalRendered % 7)) % 7;
      for (let j = 1; j <= remaining; j++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day-cell other-month';
        cell.innerHTML = `<div class="cal-day-header"><span class="cal-day-num">${j}</span></div>`;
        container.appendChild(cell);
      }

      // Populate cal-month-events-list
      const summaryList = document.getElementById('cal-month-events-list');
      const summaryTitle = document.getElementById('cal-summary-title');
      if (summaryList) {
        summaryList.innerHTML = '';
        const monthEvents = CONTENT_PLAN.filter(item => {
          if (item.year !== year || item.month !== month) return false;
          if (activeCategoryFilter === 'all') return true;
          return item.category === activeCategoryFilter;
        });

        if (summaryTitle) {
          summaryTitle.textContent = `📌 ${MONTH_NAMES[month]} ${year} — ${activeCategoryFilter === 'all' ? 'TÜM PAYLAŞIMLAR' : 'SEÇİLİ KATEGORİ'} (${monthEvents.length} Paylaşım)`;
        }

        if (monthEvents.length === 0) {
          summaryList.innerHTML = `<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.82rem; padding: 8px 0;">Bu ayda seçili kategoriye ait paylaşım bulunmamaktadır.</div>`;
        } else {
          monthEvents.forEach(ev => {
            const itemEl = document.createElement('div');
            itemEl.style = 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;';
            itemEl.onmouseenter = () => { itemEl.style.borderColor = '#0284c7'; itemEl.style.background = '#f0f9ff'; };
            itemEl.onmouseleave = () => { itemEl.style.borderColor = '#e2e8f0'; itemEl.style.background = '#f8fafc'; };
            itemEl.onclick = () => openEventModal(ev.id);
            itemEl.innerHTML = `
              <div>
                <div style="font-weight: 800; font-size: 0.82rem; color: var(--primary);">${ev.icon} ${ev.title}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">📅 ${ev.dateStr} • ⏰ ${ev.timeStr}</div>
              </div>
              <button class="btn-top" style="padding: 4px 8px; font-size: 0.72rem;">İncele ➔</button>
            `;
            summaryList.appendChild(itemEl);
          });
        }
      }
    }

        function selectYear(yr, btn) {
      currentYear = yr;
      if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('.year-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      renderMonthlyCalendar(currentYear, currentMonth);
      renderPosts(activeCategoryFilter);
    }

    let activeCategoryFilter = 'all';

    function changeMonth(delta) {
      currentMonth += delta;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderMonthlyCalendar(currentYear, currentMonth);
    }

    function resetToToday() {
      const now = new Date();
      currentYear = 2026;
      currentMonth = 9; // Ekim 2026 odaklı
      renderMonthlyCalendar(currentYear, currentMonth);
    }

    // ── MODAL EVENT POPUP ──────────────────────────────────────────────────
    function openEventModal(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;

      const modal = document.getElementById('event-modal');
      const body = document.getElementById('event-modal-body');

      body.innerHTML = `
        <button class="modal-close" onclick="closeEventModal()">×</button>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:1rem;">
          <span style="font-size:2rem;">${item.icon}</span>
          <div>
            <h3 style="font-family:var(--font-heading); font-weight:800; font-size:1.2rem; color:var(--primary);">${item.title}</h3>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">📅 ${item.dateStr} • ⏰ ${item.timeStr} • <span class="event-tag ${item.tagClass}">${item.tagText}</span></div>
          </div>
        </div>

        <div style="background:#07162c; padding:1rem; border-radius:14px; margin-bottom:1.2rem; display:flex; justify-content:center;">
          <canvas id="modal-canvas" class="banner-canvas" width="1080" height="1080" style="max-width:280px;"></canvas>
        </div>

        <div style="margin-bottom:1rem;">
          <div style="font-size:0.75rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Paylaşım Metni</div>
          <div class="post-text-content" style="max-height:140px;">${item.text}</div>
          <div class="post-hashtags" style="margin-top:6px;">${item.hashtags}</div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div class="primary-actions">
            <button class="btn-act btn-copy" onclick="copyPostText('${item.id}')">📋 Metni Kopyala</button>
            <button class="btn-act btn-download" onclick="downloadBanner('${item.id}', '${item.title}')">⬇️ 1080x1080 İndir</button>
          </div>

          <button class="btn-act" style="background:linear-gradient(135deg, #0284c7, #0369a1); color:#fff;" onclick="copyAiPrompt('${item.id}')">
            🤖 GPT Görsel Promptunu Kopyala
          </button>

          <div class="cal-actions-row">
            <button class="btn-cal" onclick="downloadSingleICS('${item.id}')">📲 Takvime Ekle (.ics)</button>
            <a href="${getGoogleCalUrl(item)}" target="_blank" class="btn-cal google">📅 Google Takvim</a>
          </div>

          <!-- AI Görsel & Video Prompt Butonları -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button class="btn-act" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff;" onclick="copyAiPrompt('${item.id}')">
              🤖 AI Görsel Promptu Kopyala
            </button>
            <button class="btn-act" style="background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff;" onclick="copyVideoPrompt('${item.id}')">
              🎬 AI Video Promptu Kopyala (Sora/Kling)
            </button>
          </div>

          <div class="social-share-row" style="display: flex; gap: 6px; flex-wrap: wrap;">
            <a href="https://www.instagram.com/yakingrupnet" target="_blank" class="btn-share share-instagram">Instagram</a>
            <a href="https://www.youtube.com/@yakingrup" target="_blank" class="btn-share share-youtube">YouTube</a>
            <a href="https://www.facebook.com/yakingrup" target="_blank" class="btn-share share-facebook">Facebook</a>
            <a href="https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(item.text + '\n\n' + item.hashtags)}" target="_blank" class="btn-share share-linkedin">LinkedIn</a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(item.text.substring(0, 180) + '... ' + item.hashtags)}" target="_blank" class="btn-share share-x">X</a>
          </div>
        </div>
      `;

      modal.style.display = 'flex';
      setTimeout(() => drawModalCanvas(item), 50);
    }

    function closeEventModal() {
      document.getElementById('event-modal').style.display = 'none';
    }

    function drawModalCanvas(item) {
      const canvas = document.getElementById('modal-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      drawCanvasOnto(canvas, ctx, item);
    }

    // ── RENDER POSTS (GRID & LIST) ──────────────────────────────────────────
        // ── RENDER POSTS (GRID & LIST GÖRÜNÜMÜ) ─────────────────────────────
    function renderPosts(filter = 'all') {
      const container = document.getElementById('posts-container');
      const listView = document.getElementById('list-view');
      if (!container || !listView) return;

      container.innerHTML = '';
      listView.innerHTML = '';

      const filtered = CONTENT_PLAN.filter(d => {
        if (d.year !== currentYear) return false;
        if (filter === 'all') return true;
        return d.category === filter;
      });

      if (filtered.length === 0) {
        const emptyMsg = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: 14px; border: 1px dashed #cbd5e1; color: var(--text-muted);">
            <div style="font-size: 2rem; margin-bottom: 8px;">📭</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--primary);">Bu kategoride ${currentYear} yılı için kayıt bulunamadı.</div>
            <div style="font-size: 0.82rem; margin-top: 4px;">Filtreyi değiştirebilir veya "🌟 Tümü" seçeneğine tıklayabilirsiniz.</div>
          </div>
        `;
        container.innerHTML = emptyMsg;
        listView.innerHTML = emptyMsg;
        return;
      }

      filtered.forEach((item) => {
        // 1. Grid Card
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
          <div class="post-card-header">
            <div class="event-meta">
              <span class="event-icon">${item.icon}</span>
              <div>
                <div class="event-title">${item.title}</div>
                <div class="event-date">📅 ${item.dateStr} • ⏰ ${item.timeStr}</div>
              </div>
            </div>
            <span class="event-tag ${item.tagClass}">${item.tagText}</span>
          </div>

          <div class="post-preview-box">
            <div style="position: absolute; top: 10px; left: 10px; right: 10px; display: flex; justify-content: center; gap: 4px; z-index: 10;">
              <button class="ratio-pill active" onclick="changeAspect('${item.id}', '1:1', this)">1:1 Kare</button>
              <button class="ratio-pill" onclick="changeAspect('${item.id}', '4:5', this)">4:5 Post</button>
              <button class="ratio-pill" onclick="changeAspect('${item.id}', '9:16', this)">9:16 Story</button>
              <button class="ratio-pill" onclick="changeAspect('${item.id}', '16:9', this)">16:9 X/YT</button>
            </div>
            <canvas id="canvas-${item.id}" class="banner-canvas" width="1080" height="1080" style="margin-top: 24px;"></canvas>
          </div>

          <div class="post-card-body">
            <span class="post-text-label">Onaylı Paylaşım Metni</span>
            <div class="post-text-content">${item.text}</div>
            <div class="post-hashtags">${item.hashtags}</div>
          </div>

          <div class="post-card-footer">
            <div class="primary-actions">
              <button class="btn-act btn-copy" onclick="copyPostText('${item.id}')" title="Metni ve Hashtagleri Kopyala">
                📋 Metni Kopyala
              </button>
              <button class="btn-act btn-download" onclick="downloadBanner('${item.id}', '${item.title}')" title="1080x1080 HD Banner İndir">
                ⬇️ HD Görsel İndir
              </button>
            </div>

            <!-- AI GÖRSEL & VİDEO PLUG-IN ENTEGRASYONLARI -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
              <button class="btn-act" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; padding: 6px 8px; font-size: 0.75rem;" onclick="copyAiPrompt('${item.id}')" title="DALL-E 3 / Midjourney Görsel Promptu">
                🤖 AI Görsel Promptu
              </button>
              <button class="btn-act" style="background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff; padding: 6px 8px; font-size: 0.75rem;" onclick="copyVideoPrompt('${item.id}')" title="Kling AI / Runway / Sora Video Promptu">
                🎬 AI Video Promptu
              </button>
            </div>

            <div class="cal-actions-row">
              <button class="btn-cal" onclick="downloadSingleICS('${item.id}')" title="Bu Günü Apple / Outlook / Telefona Ekle">
                📲 Takvime Ekle (.ics)
              </button>
              <a href="${getGoogleCalUrl(item)}" target="_blank" class="btn-cal google" title="Google Takvim Web'de Aç">
                📅 Google Takvim
              </a>
            </div>

            <div class="social-share-row" style="display: flex; gap: 5px; flex-wrap: wrap;">
              <a href="https://www.instagram.com/yakingrupnet" target="_blank" class="btn-share share-instagram" title="Instagram Profilini ve Post Alanını Aç">
                Instagram
              </a>
              <a href="https://www.youtube.com/@yakingrup" target="_blank" class="btn-share share-youtube" title="YouTube Kanalını ve Topluluk Gönderisini Aç">
                YouTube
              </a>
              <a href="https://www.facebook.com/yakingrup" target="_blank" class="btn-share share-facebook" title="Facebook Sayfasını Aç">
                Facebook
              </a>
              <a href="https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(item.text + '

' + item.hashtags)}" target="_blank" class="btn-share share-linkedin" title="LinkedIn'de Paylaş">
                LinkedIn
              </a>
              <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(item.text.substring(0, 180) + '... ' + item.hashtags)}" target="_blank" class="btn-share share-x" title="X'te Paylaş">
                X
              </a>
            </div>
          </div>
        `;
        container.appendChild(card);

        // 2. List Item
        const listItem = document.createElement('div');
        listItem.className = 'list-item-card';
        const dateParts = item.dateStr.split(' ');
        listItem.innerHTML = `
          <div style="display: flex; align-items: center; gap: 1.2rem; flex: 1; min-width: 260px;">
            <div class="list-date-badge">
              <span class="list-date-day">${dateParts[0]}</span>
              <span class="list-date-month">${dateParts[1]} ${dateParts[2]}</span>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--primary); display: flex; align-items: center; gap: 6px;">
                <span>${item.icon}</span> <span>${item.title}</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 3px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span>⏰ Saat: ${item.timeStr}</span>
                <span>•</span>
                <span class="event-tag ${item.tagClass}">${item.tagText}</span>
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 6px; line-height: 1.4; max-width: 600px;">
                ${item.headline}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
            <button class="btn-top primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="openEventModal('${item.id}')">👁️ Görsel & Detay</button>
            <button class="btn-top" style="padding: 6px 10px; font-size: 0.78rem;" onclick="copyPostText('${item.id}')">📋 Metin</button>
            <button class="btn-top" style="padding: 6px 10px; font-size: 0.78rem;" onclick="copyAiPrompt('${item.id}')">🤖 Prompt</button>
            <button class="btn-top" style="padding: 6px 10px; font-size: 0.78rem;" onclick="downloadSingleICS('${item.id}')">📲 .ICS</button>
            <a href="${getGoogleCalUrl(item)}" target="_blank" class="btn-top" style="padding: 6px 10px; font-size: 0.78rem;">📅 Google</a>
          </div>
        `;
        listView.appendChild(listItem);

        // Draw Canvas for Grid Card
        setTimeout(() => drawBannerCanvas(item), 40);
      });
    }

    // ── DRAW CANVAS BANNER (1080x1080) ──────────────────────────────────────────
        // ── DRAW CANVAS BANNER (MULTI-ASPECT RATIO: 1:1, 4:5, 9:16, 16:9) ───────
        // ── DRAW CANVAS BANNER (MULTI-ASPECT RATIO: 1:1, 4:5, 9:16, 16:9) ───────
    function drawCanvasOnto(canvas, ctx, item, ratio = '1:1') {
      let W = 1080;
      let H = 1080;

      if (ratio === '4:5') {
        W = 1080;
        H = 1350;
      } else if (ratio === '9:16') {
        W = 1080;
        H = 1920;
      } else if (ratio === '16:9') {
        W = 1200;
        H = 675;
      }

      canvas.width = W;
      canvas.height = H;

      // 1. Arka Plan
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#07162c');
      grad.addColorStop(0.4, '#0b2545');
      grad.addColorStop(0.85, '#0f3d6e');
      grad.addColorStop(1, '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const radialLight = ctx.createRadialGradient(W, 0, 50, W, 0, H * 0.7);
      radialLight.addColorStop(0, 'rgba(56, 189, 248, 0.38)');
      radialLight.addColorStop(0.5, 'rgba(2, 132, 199, 0.15)');
      radialLight.addColorStop(1, 'rgba(11, 37, 69, 0)');
      ctx.fillStyle = radialLight;
      ctx.fillRect(0, 0, W, H);

      // Çerçeve
      const pad = ratio === '16:9' ? 24 : 40;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = ratio === '16:9' ? 8 : 12;
      ctx.strokeRect(pad, pad, W - (pad * 2), H - (pad * 2));

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(pad + 12, pad + 12, W - ((pad + 12) * 2), H - ((pad + 12) * 2));

      // Köşe Altın Vurguları
      ctx.fillStyle = '#d4af37';
      const cornerSize = ratio === '16:9' ? 16 : 24;
      ctx.fillRect(pad - 6, pad - 6, cornerSize, cornerSize);
      ctx.fillRect(W - pad + 6 - cornerSize, pad - 6, cornerSize, cornerSize);
      ctx.fillRect(pad - 6, H - pad + 6 - cornerSize, cornerSize, cornerSize);
      ctx.fillRect(W - pad + 6 - cornerSize, H - pad + 6 - cornerSize, cornerSize);

      // Konumlandırma Hesapları
      let iconY = H * 0.22;
      let dateY = H * 0.36;
      let headlineY = H * 0.44;
      let subY = H * 0.54;
      let logoY = H * 0.88;
      let subLogoY = H * 0.92;

      if (ratio === '16:9') {
        iconY = 110;
        dateY = 200;
        headlineY = 270;
        subY = 360;
        logoY = 570;
        subLogoY = 610;
      } else if (ratio === '9:16') {
        iconY = 380;
        dateY = 580;
        headlineY = 700;
        subY = 880;
        logoY = 1650;
        subLogoY = 1720;
      }

      // İkon Çemberi
      const iconRadius = ratio === '16:9' ? 50 : 85;
      ctx.beginPath();
      ctx.arc(W / 2, iconY, iconRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#d4af37';
      ctx.stroke();

      ctx.font = `${ratio === '16:9' ? '50px' : '75px'} sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.icon, W / 2, iconY);

      // Tarih Rozeti
      ctx.font = `700 ${ratio === '16:9' ? '20px' : '26px'} "Inter", sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.letterSpacing = '4px';
      ctx.fillText(item.dateStr.toUpperCase(), W / 2, dateY);

      // Ana Başlık
      const titleFontSize = ratio === '16:9' ? 36 : (ratio === '9:16' ? 52 : 46);
      ctx.font = `800 ${titleFontSize}px "Manrope", sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.letterSpacing = '-0.5px';
      
      const words = item.headline.split(' ');
      let line = '';
      let y = headlineY;
      const maxW = W - (ratio === '16:9' ? 140 : 180);
      const lineStep = titleFontSize + 14;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          ctx.fillText(line.trim(), W / 2, y);
          line = words[n] + ' ';
          y += lineStep;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), W / 2, y);

      // Alt Başlık
      ctx.font = `500 ${ratio === '16:9' ? '22px' : '26px'} "Inter", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText(item.subheadline, W / 2, y + (ratio === '16:9' ? 55 : 75));

      // Alt Logo Alanı
      ctx.font = `800 ${ratio === '16:9' ? '28px' : '36px'} "Cinzel", serif`;
      ctx.fillStyle = '#ffffff';
      ctx.letterSpacing = '6px';
      ctx.fillText('YAKIN GRUP', W / 2, logoY);

      ctx.font = `600 ${ratio === '16:9' ? '16px' : '20px'} "Inter", sans-serif`;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.letterSpacing = '3px';
      ctx.fillText('İNŞAAT • ENERJİ • CAPITAL • TEKNOLOJİ', W / 2, subLogoY);
    }

    function drawBannerCanvas(item) {
      const canvas = document.getElementById(`canvas-${item.id}`);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const ratio = currentAspectMap[item.id] || '1:1';
      drawCanvasOnto(canvas, ctx, item, ratio);
    }

    function generateICSContent(items) {
      let ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Yakin Grup//Social Media Calendar//TR',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Yakın Grup Sosyal Medya & İçerik Takvimi',
        'X-WR-TIMEZONE:Europe/Istanbul'
      ];

      items.forEach(item => {
        const dateClean = item.dateISO.replace(/-/g, '');
        const timeClean = item.timeStr.replace(':', '') + '00';
        const startDT = `${dateClean}T${timeClean}`;
        
        const endHour = String(parseInt(item.timeStr.split(':')[0]) + 1).padStart(2, '0');
        const endDT = `${dateClean}T${endHour}${item.timeStr.split(':')[1]}00`;

        const desc = `${item.text.replace(/\n/g, '\\n')}\\n\\n${item.hashtags}\\n\\n---\\nPaylaşım Linkleri:\\nLinkedIn: https://www.linkedin.com/company/yakingrupnet\\nInstagram: https://www.instagram.com/yakingrupnet\\nX: https://x.com/yakingrupnet`;

        ics.push('BEGIN:VEVENT');
        ics.push(`UID:${item.id}-2026@yakingrup.net`);
        ics.push(`DTSTAMP:20260101T000000Z`);
        ics.push(`DTSTART;TZID=Europe/Istanbul:${startDT}`);
        ics.push(`DTEND;TZID=Europe/Istanbul:${endDT}`);
        ics.push(`SUMMARY:📢 ${item.title} (Yakın Grup Paylaşım Vakti)`);
        ics.push(`DESCRIPTION:${desc}`);
        ics.push(`LOCATION:Sosyal Medya Kanalları`);
        ics.push('STATUS:CONFIRMED');
        
        ics.push('BEGIN:VALARM');
        ics.push('TRIGGER:-PT60M');
        ics.push('ACTION:DISPLAY');
        ics.push(`DESCRIPTION:Yakın Grup: ${item.title} paylaşımına 1 saat kaldı!`);
        ics.push('END:VALARM');

        ics.push('BEGIN:VALARM');
        ics.push('TRIGGER:PT0M');
        ics.push('ACTION:DISPLAY');
        ics.push(`DESCRIPTION:Yakın Grup: ${item.title} paylaşım vakti geldi!`);
        ics.push('END:VALARM');

        ics.push('END:VEVENT');
      });

      ics.push('END:VCALENDAR');
      return ics.join('\r\n');
    }

    function exportAllICS() {
      const icsData = generateICSContent(CONTENT_PLAN);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Yakin_Grup_2026_2030_Kurumsal_Icerik_Takvimi.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ 2026 - 2030 Tüm Yılların Takvimi (.ICS) İndirildi! Çift tıklayarak telefonunuza/bilgisayarınıza ekleyebilirsiniz.');
    }

    function downloadSingleICS(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;
      const icsData = generateICSContent([item]);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `Yakin_Grup_${item.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`✓ "${item.title}" takviminize eklendi!`);
    }

    function getGoogleCalUrl(item) {
      const start = item.dateISO.replace(/-/g, '') + 'T' + item.timeStr.replace(':', '') + '00';
      const endHour = String(parseInt(item.timeStr.split(':')[0]) + 1).padStart(2, '0');
      const end = item.dateISO.replace(/-/g, '') + 'T' + endHour + item.timeStr.split(':')[1] + '00';
      
      const title = encodeURIComponent(`📢 ${item.title} (Yakın Grup Paylaşım Vakti)`);
      const details = encodeURIComponent(`${item.text}

${item.hashtags}

---
https://yakingrup.net`);
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=Sosyal+Medya`;
    }

    // ── ACTIONS & UTILS ──────────────────────────────────────────────────────
            function switchView(view) {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      const cal = document.getElementById('calendar-month-view');
      const grid = document.getElementById('posts-container');
      const list = document.getElementById('list-view');
      
      if (view === 'calendar') {
        document.getElementById('btn-view-cal').classList.add('active');
        cal.style.display = 'block';
        grid.style.display = 'none';
        list.style.display = 'none';
        renderMonthlyCalendar(currentYear, currentMonth);
      } else if (view === 'grid') {
        document.getElementById('btn-view-grid').classList.add('active');
        cal.style.display = 'none';
        grid.style.display = 'grid';
        list.style.display = 'none';
        renderPosts(activeCategoryFilter);
      } else {
        document.getElementById('btn-view-list').classList.add('active');
        cal.style.display = 'none';
        grid.style.display = 'none';
        list.style.display = 'flex';
        renderPosts(activeCategoryFilter);
      }
    }

            function filterPosts(category, btn) {
      activeCategoryFilter = category;
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      // Eğer mevcut ayda bu kategoride etkinlik yoksa, bu yıl içindeki ilk aya otomatik odaklan
      if (category !== 'all') {
        const eventsInYear = CONTENT_PLAN.filter(d => d.year === currentYear && d.category === category);
        if (eventsInYear.length > 0) {
          const hasInCurrentMonth = eventsInYear.some(d => d.month === currentMonth);
          if (!hasInCurrentMonth) {
            currentMonth = eventsInYear[0].month;
          }
        }
      }

      // Re-render both views
      renderMonthlyCalendar(currentYear, currentMonth);
      renderPosts(category);

      const categoryNames = {
        'all': 'Tüm Etkinlikler (237 Paylaşım)',
        'resmi': '🇹🇷 Resmi Tatiller & Milli Bayramlar (10 Gün)',
        'dini': '🌙 Dini Bayramlar & Arifeler (4 Gün)',
        'sektor': '⚡ Sektörel & Mesleki Günler (15 Gün)',
        'proje': '🏗️ Sektör Proje Vitrini (208 Post)'
      };
      showToast(`Filtrelendi: ${categoryNames[category] || category}`);
    }

    function copyPostText(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;
      const fullText = `${item.text}

${item.hashtags}`;
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('✓ Paylaşım metni ve hashtagler panoya kopyalandı!');
      });
    }

        function copyVideoPrompt(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;
      const videoPrompt = `Cinematic 4K hyper-realistic corporate video scene (9:16 vertical & 16:9). Seamless camera tracking shot of ${item.title}. Modern futuristic architecture and clean energy telemetry, dramatic ambient lighting with deep navy blue (#0b2545) and glowing cyan rays (#38bdf8). High-end corporate brand commercial, photorealistic, 60fps, Unreal Engine 5 aesthetic.`;
      navigator.clipboard.writeText(videoPrompt).then(() => {
        showToast('✓ AI Video Promptu Kopyalandı! (Kling AI, Sora, Runway Gen-3, CapCut için hazır)');
      });
    }

    function copyAiPrompt(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item || !item.aiPrompt) return;
      navigator.clipboard.writeText(item.aiPrompt).then(() => {
        showToast('✓ GPT / DALL-E Görsel Promptu Kopyalandı! (ChatGPT\'ye yapıştırabilirsiniz)');
      });
    }

        const currentAspectMap = {};

    function changeAspect(id, ratio, btn) {
      currentAspectMap[id] = ratio;
      if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('.ratio-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;
      const canvas = document.getElementById(`canvas-${id}`);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      drawCanvasOnto(canvas, ctx, item, ratio);
    }

    function downloadBanner(id, title) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      const ratio = currentAspectMap[id] || '1:1';
      const canvas = document.getElementById(`canvas-${id}`) || document.getElementById('modal-canvas');
      if (!canvas || !item) return;

      const link = document.createElement('a');
      const cleanRatio = ratio.replace(':', 'x');
      link.download = `Yakin_Grup_${id}_${cleanRatio}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast(`✓ HD Görsel (${ratio} formatında) İndirildi!`);
    }

    function exportAllCSV() {
      let csvContent = "data:text/csv;charset=utf-8,﻿";
      csvContent += "Tarih,Saat,Özel Gün / Başlık,Kategori,Paylaşım Metni,Hashtagler\n";

      CONTENT_PLAN.forEach(item => {
        const cleanText = item.text.replace(/"/g, '""').replace(/\n/g, ' ');
        const cleanTags = item.hashtags.replace(/"/g, '""');
        csvContent += `"${item.dateStr}","${item.timeStr}","${item.title}","${item.category}","${cleanText}","${cleanTags}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Yakin_Grup_1_Yillik_Icerik_Takvimi_2026_2027.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ 2026 - 2030 Tüm Yılların İçerik Takvimi (CSV/Excel) İndirildi!');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3500);
    }

    // Close modal on background click
    window.onclick = function(event) {
      const modal = document.getElementById('event-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Init
    document.addEventListener('DOMContentLoaded', () => {
      checkAuth();
      renderMonthlyCalendar(currentYear, currentMonth);
      renderPosts('all');
    });
  
  console.log('Script loaded successfully!');
  console.log('Days container children count:', (getEl('cal-days-container')._children || []).length);
  console.log('Months chips children count:', (getEl('months-chips')._children || []).length);
} catch (err) {
  console.error('RUNTIME ERROR:', err);
}
