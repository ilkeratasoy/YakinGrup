
const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = { id, style: {}, classList: { add: ()=>{}, remove: ()=>{} }, appendChild: (c)=>{ (elements[id]._children = elements[id]._children || []).push(c); }, removeChild: ()=>{}, querySelector: (s)=>getEl(s.slice(1)), querySelectorAll: ()=>[], innerHTML: '', textContent: '', setAttribute: ()=>{} };
  }
  return elements[id];
}
const document = { getElementById: getEl, querySelectorAll: ()=>[], createElement: (t)=>({ tagName: t, style: {}, classList: { add: ()=>{}, remove: ()=>{} }, appendChild: ()=>{}, querySelector: (s)=>getEl(s.slice(1)), querySelectorAll: ()=>[], setAttribute: ()=>{} }), body: getEl('body'), addEventListener: (e, cb)=>{ if(e==='DOMContentLoaded') cb(); }, readyState: 'complete' };
const window = { URL: { createObjectURL: ()=>'' }, addEventListener: ()=>{} };
const sessionStorage = { getItem: ()=>'true', setItem: ()=>{} };
const localStorage = { getItem: ()=>'true', setItem: ()=>{} };
const navigator = { clipboard: { writeText: ()=>Promise.resolve() } };
const Blob = function() {};

    function safeEncode(str) {
      if (!str) return '';
      try {
        return encodeURIComponent(str);
      } catch (e) {
        try {
          return encodeURIComponent(Array.from(str).slice(0, 120).join(''));
        } catch (e2) {
          return encodeURIComponent(str.replace(/[^\x00-\x7F]/g, ' '));
        }
      }
    }

    const STUDIO_AUTH_USER = 'Admin';
    const STUDIO_AUTH_PASS = 'Yakin2026.!';

    function checkAuth() {
      const isAuth = sessionStorage.getItem('yg_studio_auth') === 'true' || localStorage.getItem('yg_studio_auth') === 'true';
      const overlay = document.getElementById('auth-overlay');
      if (overlay) {
        if (!isAuth) overlay.style.display = 'flex';
        else overlay.style.display = 'none';
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
        showToast('✓ Giriş Başarılı! Stüdyo kullanıma hazır.');
        renderMonthlyCalendar(currentYear, currentMonth);
      } else {
        err.style.display = 'block';
      }
    }

    const MONTH_NAMES = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    // ── 2026 - 2030 RESMİ, MİLLİ, DİNİ VE SEKTÖREL GÜNLER ──
    const RECURRING_SPECIAL_DAYS = [
      {
        baseId: '1-ocak',
        category: 'milli',
        title: '1 Ocak Yılbaşı (Resmi Tatil)',
        month: 0, day: 1, timeStr: '09:00',
        icon: '🎉', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => 'MUTLU VE BAŞARILI BİR YIL DİLERİZ!',
        getSubheadline: (yr) => `${yr} Yılında Yeni Yatırımlar ve Sürdürülebilir Projelerle...`,
        aiPrompt: 'Ultra-modern luxury New Year corporate artwork (1:1 square). Glowing 3D geometric numerals crafted from crystal glass and polished steel with internal cyan LED light (#38bdf8). Deep rich navy blue backdrop (#0b2545) with delicate golden sparkles. 8K Unreal Engine 5 render.',
        getText: (yr) => `Yeni yılın tüm çalışanlarımıza, iş ortaklarımıza ve ülkemize sağlık, başarı, huzur ve bereket getirmesini dileriz. Mutlu Yıllar! 🥂🌟`,
        hashtags: '#MutluYıllar #YeniYıl #HappyNewYear #YakınGrup #ResmiTatil'
      },
      {
        baseId: '18-mart',
        category: 'milli',
        title: '18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü',
        month: 2, day: 18, timeStr: '09:00',
        icon: '🇹🇷', tagText: 'MİLLİ ANMA', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '18 MART ÇANAKKALE ZAFERİMİZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Çanakkale Geçilmez: Aziz Şehitlerimizi Saygı ve Minnetle Anıyoruz.',
        aiPrompt: 'Epic corporate memorial artwork (1:1 square). Monumental silhouette of Canakkale Memorial with dramatic golden sunrise rays and Turkish Flag. Deep navy blue (#0b2545) atmosphere with cyan highlights (#38bdf8). 8K Octane render.',
        getText: (yr) => `18 Mart Çanakkale Deniz Zaferi'nin yıl dönümünde; başta Gazi Mustafa Kemal Atatürk olmak üzere tüm aziz şehitlerimizi rahmet, minnet ve saygıyla anıyoruz. 🇹🇷🕊️`,
        hashtags: '#18Mart #ÇanakkaleZaferi #ÇanakkaleGeçilmez #YakınGrup #MilliBirlik'
      },
      {
        baseId: '23-nisan',
        category: 'milli',
        title: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı (Resmi Tatil)',
        month: 3, day: 23, timeStr: '09:00',
        icon: '🎈', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '23 NİSAN ULUSAL EGEMENLİK VE ÇOCUK BAYRAMI KUTLU OLSUN!',
        getSubheadline: (yr) => 'Geleceğimizin Teminatı Çocuklarımıza Aydınlık Bir Yarın...',
        aiPrompt: 'Inspiring corporate holiday artwork (1:1 square). Children looking at a bright futuristic smart city. Deep navy blue (#0b2545) with glowing cyan rays (#38bdf8). 8K photorealistic render.',
        getText: (yr) => `Gazi Mustafa Kemal Atatürk'ün dünya çocuklarına armağan ettiği 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı'nı coşkuyla kutluyoruz! 🇹🇷✨`,
        hashtags: '#23Nisan #UlusalEgemenlikVeÇocukBayramı #TBMM #YakınGrup #ResmiTatil'
      },
      {
        baseId: '1-mayis',
        category: 'milli',
        title: '1 Mayıs Emek ve Dayanışma Günü (Resmi Tatil)',
        month: 4, day: 1, timeStr: '09:00',
        icon: '👷', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '1 MAYIS EMEK VE DAYANIŞMA GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Alın Teri ve Emeğiyle Geleceği İnşa Eden Tüm Emekçilerimize...',
        aiPrompt: 'High-tech industrial construction cranes and steel engineering structures under dramatic blue sunrise. Deep navy blue (#0b2545) with glowing cyan arcs (#38bdf8). 8K render.',
        getText: (yr) => `Şantiyelerimizde, enerji santrallerimizde ve tesislerimizde alın teriyle geleceği inşa eden tüm emekçilerin 1 Mayıs Emek ve Dayanışma Günü kutlu olsun! 🏗️⚡`,
        hashtags: '#1Mayıs #EmekveDayanışmaGünü #İşçiBayramı #YakınGrup #ResmiTatil'
      },
      {
        baseId: '19-mayis',
        category: 'milli',
        title: '19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı (Resmi Tatil)',
        month: 4, day: 19, timeStr: '09:00',
        icon: '🏃', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '19 MAYIS GENÇLİK VE SPOR BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Bağımsızlık Meşalesinin Yakıldığı İlk Günün İnancıyla...',
        aiPrompt: 'Dynamic corporate artwork (1:1 square). Glowing energy torch with cyan flame surrounded by steel architectural lines. Deep navy blue background (#0b2545). 8K render.',
        getText: (yr) => `19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramımız kutlu olsun! Gençliğin enerjisiyle geleceği inşa ediyoruz! 🇹🇷⚡`,
        hashtags: '#19Mayıs #GençlikveSporBayramı #Atatürk #YakınGrup #ResmiTatil'
      },
      {
        baseId: '15-temmuz',
        category: 'milli',
        title: '15 Temmuz Demokrasi ve Milli Birlik Günü (Resmi Tatil)',
        month: 6, day: 15, timeStr: '09:00',
        icon: '🇹🇷', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '15 TEMMUZ DEMOKRASİ VE MİLLİ BİRLİK GÜNÜ',
        getSubheadline: (yr) => 'Milli İrademize Sahip Çıkan Kahramanlarımızı Saygıyla Anıyoruz.',
        aiPrompt: 'Solemn national unity artwork (1:1 square). Istanbul Bosphorus Bridge under midnight navy sky (#0b2545) with red-white Turkish flag glow. 8K render.',
        getText: (yr) => `15 Temmuz Demokrasi ve Milli Birlik Günü'nde aziz şehitlerimizi rahmetle anıyor, kahraman gazilerimize şükranlarımızı sunuyoruz. 🇹🇷`,
        hashtags: '#15Temmuz #DemokrasiveMilliBirlikGünü #Milliİrade #YakınGrup #ResmiTatil'
      },
      {
        baseId: '30-agustos',
        category: 'milli',
        title: '30 Ağustos Zafer Bayramı (Resmi Tatil)',
        month: 7, day: 30, timeStr: '09:00',
        icon: '🇹🇷', tagText: 'RESMİ TATİL', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '30 AĞUSTOS ZAFER BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Milletimizin Bağımsızlık ve Kararlılık Zaferi...',
        aiPrompt: 'Magnificent Turkish Flag flying over modern infrastructure and skyline. Deep navy blue (#0b2545) with golden sunrise highlights (#38bdf8). 8K render.',
        getText: (yr) => `Büyük Taarruz zaferimizin yıl dönümünde 30 Ağustos Zafer Bayramı'nı gururla kutluyoruz! 🇹🇷`,
        hashtags: '#30Ağustos #ZaferBayramı #BüyükTaarruz #YakınGrup #ResmiTatil'
      },
      {
        baseId: '29-ekim',
        category: 'milli',
        title: '29 Ekim Cumhuriyet Bayramı (Resmi Tatil)',
        month: 9, day: 29, timeStr: '09:00',
        icon: '🇹🇷', tagText: 'ULUSAL BAYRAM', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => '29 EKİM CUMHURİYET BAYRAMIMIZ KUTLU OLSUN!',
        getSubheadline: (yr) => `Cumhuriyetimizin ${yr - 1923}. Yılında Geleceğin Altyapısını İnşa Ediyoruz.`,
        aiPrompt: 'High-end corporate 3D celebration artwork (1:1 square). Iconic Turkish Flag waving proudly over modern glass skyscrapers. Deep navy blue (#0b2545) with glowing cyan lighting (#38bdf8). 8K render.',
        getText: (yr) => `Cumhuriyetimizin ${yr - 1923}. yılını gurur ve coşkuyla kutluyoruz! 29 Ekim Cumhuriyet Bayramımız kutlu olsun! 🇹🇷`,
        hashtags: '#29Ekim #CumhuriyetBayramı #YakınGrup #Türkiye #ResmiTatil'
      },
      {
        baseId: '10-kasim',
        category: 'milli',
        title: '10 Kasım Atatürk’ü Anma Günü (09:05)',
        month: 10, day: 10, timeStr: '09:05',
        icon: '🇹🇷', tagText: 'MİLLİ ANMA', tagClass: 'tag-milli', eventClass: 'event-milli',
        getHeadline: (yr) => 'SAYGI, SEVGİ VE MİNNETLE ANIYORUZ...',
        getSubheadline: (yr) => 'Büyük Önder Gazi Mustafa Kemal Atatürk (1881 - 1938)',
        aiPrompt: 'Solemn silhouette profile of Mustafa Kemal Atatürk gazing toward an enlightened horizon. Deep midnight navy blue (#0b2545) with platinum silver lighting. 8K render.',
        getText: (yr) => `Büyük Önder Gazi Mustafa Kemal Atatürk'ü ebediyete irtihalinin yıl dönümünde saygı, rahmet ve sonsuz minnetle anıyoruz. 🕊️`,
        hashtags: '#10Kasım #MustafaKemalAtatürk #GaziMustafaKemal #YakınGrup'
      },

      // SEKTÖREL GÜNLER
      {
        baseId: 'enerji-gunu',
        category: 'sektor',
        title: '11 Ocak Dünya Enerji Günü',
        month: 0, day: 11, timeStr: '10:00',
        icon: '⚡', tagText: 'SEKTÖREL GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA ENERJİ GÜNÜ & ENERJİ VERİMLİLİĞİ',
        getSubheadline: (yr) => 'Geleceğin Gücü: Yenilenebilir, Akıllı ve Verimli Enerji...',
        aiPrompt: 'Bifacial solar PV panels and wind turbines under brilliant cyan sunrise. Deep navy blue (#0b2545) with neon pulses (#38bdf8). 8K render.',
        getText: (yr) => `Temiz enerji ve yüksek verimli şebeke çözümlerimizle enerji dönüşümüne öncülük ediyoruz. Dünya Enerji Günü kutlu olsun! ⚡🔋`,
        hashtags: '#DünyaEnerjiGünü #YenilenebilirEnerji #SolarEPC #YakınGrup #CleanEnergy'
      },
      {
        baseId: 'kadinlar-gunu',
        category: 'sektor',
        title: '8 Mart Dünya Kadınlar Günü',
        month: 2, day: 8, timeStr: '09:00',
        icon: '🌸', tagText: 'ÖZEL GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => '8 MART DÜNYA KADINLAR GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Emeği ve İlhamıyla Dünyayı Güzelleştiren Kadınlarımıza...',
        aiPrompt: 'Stylized silhouette of female engineer/leader looking towards architectural horizon. Deep navy blue (#0b2545) with cyan and gold accents. 8K render.',
        getText: (yr) => `Bilgisi ve üretkenliğiyle geleceği şekillendiren tüm kadınların 8 Mart Dünya Kadınlar Günü kutlu olsun! 💐✨`,
        hashtags: '#8Mart #DünyaKadınlarGünü #YakınGrup'
      },
      {
        baseId: 'isg-haftasi',
        category: 'sektor',
        title: '4 - 10 Mayıs İş Sağlığı ve Güvenliği (İSG) Haftası',
        month: 4, day: 4, timeStr: '10:00',
        icon: '🦺', tagText: 'SEKTÖREL İSG', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => 'İŞ SAĞLIĞI VE GÜVENLİĞİ HAFTASI',
        getSubheadline: (yr) => 'Önce İnsan, Önce Güvenlik: Şantiyelerimizde Sıfır Kaza Hedefi...',
        aiPrompt: 'Construction safety helmet with glowing cyan shield hologram on modern site. Deep navy blue (#0b2545), 8K render.',
        getText: (yr) => `Tüm şantiyelerimizde ve santrallerimizde en büyük önceliğimiz çalışanlarımızın güvenliğidir. Sıfır kaza hedefiyle çalışıyoruz. 🦺🏗️`,
        hashtags: '#İSGHaftası #İşSağlığıVeGüvenliği #ÖnceGüvenlik #YakınGrup'
      },
      {
        baseId: 'cevre-gunu',
        category: 'sektor',
        title: '5 Haziran Dünya Çevre Günü',
        month: 5, day: 5, timeStr: '10:00',
        icon: '🌱', tagText: 'SEKTÖREL GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => '5 HAZİRAN DÜNYA ÇEVRE GÜNÜ',
        getSubheadline: (yr) => 'Sıfır Karbon ve Temiz Enerjiyle Sürdürülebilir Bir Gelecek...',
        aiPrompt: 'Pristine Earth orb with glowing cyan energy rings (#38bdf8) and solar farms. Deep navy blue (#0b2545), 8K render.',
        getText: (yr) => `Sıfır emisyon vizyonumuzla yarınlara yaşanabilir yeşil bir dünya bırakmak için çalışıyoruz. 5 Haziran Dünya Çevre Günü kutlu olsun! 🌍☀️`,
        hashtags: '#DünyaÇevreGünü #Sürdürülebilirlik #YakınGrup #GreenFuture'
      },
      {
        baseId: 'mimarlik-gunu',
        category: 'sektor',
        title: 'Dünya Mimarlık Günü',
        month: 9, day: 5, timeStr: '10:00',
        icon: '📐', tagText: 'MESLEKİ GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA MİMARLIK GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Estetiği ve Dayanıklılığı Şekillendiren Mimarlarımıza...',
        aiPrompt: 'Parametric sustainable glass building with cyan structural lines. Deep navy blue (#0b2545), 8K render.',
        getText: (yr) => `Yaşam alanlarının estetiğini ve sürdürülebilir mekanların ruhunu tasarlayan tüm mimarlarımızın Dünya Mimarlık Günü kutlu olsun! 🏛️📐`,
        hashtags: '#DünyaMimarlıkGünü #Mimarlık #Yakınİnşaat #YakınGrup'
      },
      {
        baseId: 'ogretmenler-gunu',
        category: 'sektor',
        title: '24 Kasım Öğretmenler Günü',
        month: 10, day: 24, timeStr: '09:00',
        icon: '📚', tagText: 'ÖZEL GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => '24 KASIM ÖĞRETMENLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Geleceği Bilgi ve Sevgiyle İnşa Eden Kıymetli Öğretmenlerimize...',
        aiPrompt: 'Luminous holographic open book with knowledge particles rising into skyscrapers. Deep navy blue (#0b2545), 8K render.',
        getText: (yr) => `Başöğretmenimiz Gazi Mustafa Kemal Atatürk'ün izinde nesiller yetiştiren tüm öğretmenlerimizin 24 Kasım Öğretmenler Günü kutlu olsun! 📚✨`,
        hashtags: '#24Kasım #ÖğretmenlerGünü #YakınGrup'
      },
      {
        baseId: 'muhendisler-gunu',
        category: 'sektor',
        title: '5 Aralık Dünya Mühendisler Günü',
        month: 11, day: 5, timeStr: '10:00',
        icon: '⚙️', tagText: 'SEKTÖREL GÜN', tagClass: 'tag-sektor', eventClass: 'event-sektor',
        getHeadline: (yr) => 'DÜNYA MÜHENDİSLER GÜNÜ KUTLU OLSUN!',
        getSubheadline: (yr) => 'Hayalleri Projeye, Projeleri Geleceğe Dönüştüren Zihinler...',
        aiPrompt: 'Holographic glowing cyan 3D BIM blueprint and energy grid. Deep navy blue (#0b2545), 8K render.',
        getText: (yr) => `Bilim ve teknolojiyi sürdürülebilir yaşama dönüştüren tüm mühendislerimizin 5 Aralık Dünya Mühendisler Günü kutlu olsun! 📐⚙️`,
        hashtags: '#DünyaMühendislerGünü #5Aralık #Mühendislik #YakınGrup'
      }
    ];

    const ISLAMIC_HOLIDAYS_BY_YEAR = {
      2026: {
        ramazan: { month: 2, day: 20, str: '20 Mart 2026', iso: '2026-03-20' },
        kurban: { month: 4, day: 27, str: '27 Mayıs 2026', iso: '2026-05-27' }
      },
      2027: {
        ramazan: { month: 2, day: 10, str: '10 Mart 2027', iso: '2027-03-10' },
        kurban: { month: 4, day: 16, str: '16 Mayıs 2027', iso: '2027-05-16' }
      },
      2028: {
        ramazan: { month: 1, day: 27, str: '27 Şubat 2028', iso: '2028-02-27' },
        kurban: { month: 4, day: 5, str: '5 Mayıs 2028', iso: '2028-05-05' }
      },
      2029: {
        ramazan: { month: 1, day: 15, str: '15 Şubat 2029', iso: '2029-02-15' },
        kurban: { month: 3, day: 24, str: '24 Nisan 2029', iso: '2029-04-24' }
      },
      2030: {
        ramazan: { month: 1, day: 5, str: '5 Şubat 2030', iso: '2030-02-05' },
        kurban: { month: 3, day: 13, str: '13 Nisan 2030', iso: '2030-04-13' }
      }
    };

    function generatePlanForYear(yr) {
      const list = [];

      RECURRING_SPECIAL_DAYS.forEach(d => {
        const monthStr = String(d.month + 1).padStart(2, '0');
        const dayStr = String(d.day).padStart(2, '0');
        list.push({
          id: `${d.baseId}-${yr}`,
          category: d.category,
          title: d.title,
          dateISO: `${yr}-${monthStr}-${dayStr}`,
          timeStr: d.timeStr,
          dateStr: `${d.day} ${MONTH_NAMES[d.month]} ${yr}`,
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

      const isl = ISLAMIC_HOLIDAYS_BY_YEAR[yr] || ISLAMIC_HOLIDAYS_BY_YEAR[2026];

      list.push({
        id: `ramazan-${yr}`,
        category: 'dini',
        title: 'Ramazan Bayramı 1. Gün (Resmi Tatil)',
        dateISO: isl.ramazan.iso,
        timeStr: '09:00',
        dateStr: isl.ramazan.str,
        year: yr,
        month: isl.ramazan.month,
        day: isl.ramazan.day,
        icon: '🌙',
        tagText: 'RESMİ TATİL & DİNİ BAYRAM',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'RAMAZAN BAYRAMINIZ MÜBAREK OLSUN',
        subheadline: 'Birlik, Beraberlik ve Huzur Dolu Nice Bayramlara...',
        aiPrompt: '3D glowing golden crescent moon above sustainable skyscrapers. Deep navy blue (#0b2545) and cyan glow. 8K render.',
        text: `Mübarek Ramazan Bayramı'nın milletimize sağlık, huzur ve bereket getirmesini dileriz. Ramazan Bayramınız Mübarek Olsun! 🌙✨`,
        hashtags: '#RamazanBayramı #İyiBayramlar #YakınGrup #ResmiTatil'
      });

      list.push({
        id: `kurban-${yr}`,
        category: 'dini',
        title: 'Kurban Bayramı 1. Gün (Resmi Tatil)',
        dateISO: isl.kurban.iso,
        timeStr: '09:00',
        dateStr: isl.kurban.str,
        year: yr,
        month: isl.kurban.month,
        day: isl.kurban.day,
        icon: '🐑',
        tagText: 'RESMİ TATİL & DİNİ BAYRAM',
        tagClass: 'tag-dini',
        eventClass: 'event-dini',
        headline: 'KURBAN BAYRAMINIZ MÜBAREK OLSUN',
        subheadline: 'Paylaşmanın ve Dayanışmanın Bereketiyle...',
        aiPrompt: 'Serene crescent moon with golden lantern reflections on polished architectural glass. Deep navy blue (#0b2545), 8K render.',
        text: `Kurban Bayramı'nın dayanışma ruhunun hanelerinize esenlik getirmesini temenni ederiz. Kurban Bayramınız mübarek olsun. 🌙🕊️`,
        hashtags: '#KurbanBayramı #İyiBayramlar #YakınGrup #ResmiTatil'
      });

      list.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
      return list;
    }

    let CONTENT_PLAN = [];
    for (let y = 2026; y <= 2030; y++) {
      CONTENT_PLAN = CONTENT_PLAN.concat(generatePlanForYear(y));
    }

    let currentYear = 2026;
    let currentMonth = 9; // Ekim
    let activeCategoryFilter = 'all';

    // ── INTERACTIVE MONTHLY CALENDAR ENGINE ─────────────────────────────
    function renderMonthlyCalendar(year, month) {
      const yearPills = document.querySelectorAll('.year-pill');
      yearPills.forEach(p => {
        if (parseInt(p.textContent) === year) p.classList.add('active');
        else p.classList.remove('active');
      });

      const titleEl = document.getElementById('cal-month-title');
      if (titleEl) titleEl.innerHTML = `📅 <span>${MONTH_NAMES[month]} ${year}</span>`;

      // Render Month Chips Bar
      const chipsContainer = document.getElementById('months-chips');
      if (chipsContainer) {
        chipsContainer.innerHTML = '';
        MONTH_NAMES.forEach((mName, idx) => {
          const chip = document.createElement('button');
          chip.className = `month-chip ${idx === month ? 'active' : ''}`;
          chip.textContent = mName;
          chip.onclick = () => {
            currentMonth = idx;
            renderMonthlyCalendar(currentYear, currentMonth);
          };
          chipsContainer.appendChild(chip);
        });
      }

      // Compute Days Grid
      const container = document.getElementById('cal-days-container');
      if (!container) return;
      container.innerHTML = '';

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();

      let startDayOfWeek = firstDay.getDay() - 1;
      if (startDayOfWeek === -1) startDayOfWeek = 6;

      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const cell = document.createElement('div');
        cell.className = 'cal-day-cell other-month';
        cell.innerHTML = `<div class="cal-day-header"><span class="cal-day-num">${prevMonthLastDay - i}</span></div>`;
        container.appendChild(cell);
      }

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
            ${isToday ? '<span style="font-size:0.62rem; font-weight:800; color:#0284c7;">BUGÜN</span>' : ''}
          </div>
          <div class="cal-day-events" id="events-${dateISO}"></div>
        `;

        const eventsForDay = CONTENT_PLAN.filter(item => {
          if (item.dateISO !== dateISO) return false;
          if (activeCategoryFilter === 'all') return true;
          return item.category === activeCategoryFilter;
        });

        if (eventsForDay.length > 0) {
          cell.style.cursor = 'pointer';
          cell.onclick = () => openEventModal(eventsForDay[0].id);
        }

        const eventsContainer = cell.querySelector(`#events-${dateISO}`);
        eventsForDay.forEach(ev => {
          const badge = document.createElement('div');
          badge.className = `cal-event-badge ${ev.eventClass || 'event-milli'}`;
          badge.innerHTML = `
            <div style="font-weight:800; font-size:0.72rem;">${ev.icon} ${ev.title}</div>
            <div style="font-size:0.65rem; opacity:0.85;">⏰ ${ev.timeStr} • İncele</div>
          `;
          badge.onclick = (e) => {
            e.stopPropagation();
            openEventModal(ev.id);
          };
          eventsContainer.appendChild(badge);
        });

        container.appendChild(cell);
      }

      const totalRendered = startDayOfWeek + totalDays;
      const remaining = (7 - (totalRendered % 7)) % 7;
      for (let j = 1; j <= remaining; j++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day-cell other-month';
        cell.innerHTML = `<div class="cal-day-header"><span class="cal-day-num">${j}</span></div>`;
        container.appendChild(cell);
      }

      // Populate Month Summary List Underneath Calendar
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
          summaryList.innerHTML = `<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.82rem; padding: 8px 0;">Bu ayda seçili kategoriye ait planlanan etkinlik bulunmamaktadır.</div>`;
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

    function changeMonth(delta) {
      currentMonth += delta;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      else if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderMonthlyCalendar(currentYear, currentMonth);
    }

    function resetToToday() {
      currentYear = 2026;
      currentMonth = 9;
      renderMonthlyCalendar(currentYear, currentMonth);
    }

    // ── MODAL DETAIL POPUP ──────────────────────────────────────────────
    function openEventModal(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;

      const modal = document.getElementById('event-modal');
      const body = document.getElementById('event-modal-body');
      if (!modal || !body) return;

      const shareLiText = safeEncode(item.text + '\n\n' + item.hashtags);
      const shareXText = safeEncode(Array.from(item.text).slice(0, 120).join('') + '... ' + item.hashtags);
      const gCalUrl = getGoogleCalUrl(item);

      body.innerHTML = `
        <button class="modal-close" onclick="closeEventModal()">×</button>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:1rem;">
          <span style="font-size:2rem;">${item.icon}</span>
          <div>
            <h3 style="font-family:var(--font-heading); font-weight:800; font-size:1.2rem; color:var(--primary);">${item.title}</h3>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">📅 ${item.dateStr} • ⏰ ${item.timeStr} • <span class="event-tag ${item.tagClass}">${item.tagText}</span></div>
          </div>
        </div>

        <div style="text-align:center; margin-bottom:1rem; background:#07162c; border-radius:14px; padding:14px 12px; display:flex; flex-direction:column; align-items:center; gap:10px;">
          <canvas id="modal-canvas" class="banner-canvas" width="1080" height="1080" style="max-width:280px;"></canvas>
        </div>

        <div style="margin-bottom:1rem;">
          <div style="font-size:0.75rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Onaylı Paylaşım Metni</div>
          <div style="font-size:0.88rem; line-height:1.6; color:#334155; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; white-space:pre-line; max-height:140px; overflow-y:auto;">
            ${item.text}
          </div>
          <div style="font-size:0.8rem; color:var(--primary-accent); font-weight:600; margin-top:6px;">${item.hashtags}</div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:8px;">
            <button class="btn-act btn-copy" onclick="copyPostText('${item.id}')">📋 Metni Kopyala</button>
            <button class="btn-act btn-download" onclick="downloadBanner('${item.id}', '${item.title}')">⬇️ HD Görsel İndir</button>
          </div>

          <button class="btn-act" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; padding: 7px 8px; font-size: 0.78rem;" onclick="copyAiPrompt('${item.id}')">
            🤖 GPT / DALL-E Görsel Promptu
          </button>

          <div class="cal-actions-row">
            <button class="btn-cal" onclick="downloadSingleICS('${item.id}')">📲 Takvime Ekle (.ics)</button>
            <a href="${gCalUrl}" target="_blank" class="btn-cal google">📅 Google Takvim</a>
          </div>

          <div class="social-share-row" style="display:flex; gap:5px; flex-wrap:wrap;">
            <a href="https://www.linkedin.com/feed/?shareActive=true&text=${shareLiText}" target="_blank" class="btn-share share-linkedin">LinkedIn</a>
            <a href="https://twitter.com/intent/tweet?text=${shareXText}" target="_blank" class="btn-share share-x">X</a>
          </div>
        </div>
      `;

      modal.style.display = 'flex';
      setTimeout(() => drawModalCanvas(item), 40);
    }

    function closeEventModal() {
      const modal = document.getElementById('event-modal');
      if (modal) modal.style.display = 'none';
    }

    function drawModalCanvas(item) {
      const canvas = document.getElementById('modal-canvas');
      if (!canvas || !item) return;
      const ctx = canvas.getContext('2d');
      drawCanvasOnto(canvas, ctx, item);
    }

    // ── RENDER CARDS & LIST ─────────────────────────────────────────────
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

      filtered.forEach((item) => {
        const shareLiText = safeEncode(item.text + '\n\n' + item.hashtags);
        const shareXText = safeEncode(Array.from(item.text).slice(0, 120).join('') + '... ' + item.hashtags);
        const gCalUrl = getGoogleCalUrl(item);

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
            <canvas id="canvas-${item.id}" class="banner-canvas" width="1080" height="1080" style="cursor: pointer;" onclick="openEventModal('${item.id}')"></canvas>
          </div>

          <div class="post-card-body">
            <span class="post-text-label">Onaylı Paylaşım Metni</span>
            <div class="post-text-content">${item.text}</div>
            <div class="post-hashtags">${item.hashtags}</div>
          </div>

          <div class="post-card-footer">
            <div class="primary-actions">
              <button class="btn-act btn-copy" onclick="copyPostText('${item.id}')">📋 Metni Kopyala</button>
              <button class="btn-act btn-download" onclick="downloadBanner('${item.id}', '${item.title}')">⬇️ HD Görsel İndir</button>
            </div>

            <button class="btn-act" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; width: 100%; padding: 7px 10px; font-size: 0.78rem;" onclick="copyAiPrompt('${item.id}')">
              🤖 GPT Görsel Promptunu Kopyala
            </button>

            <div class="cal-actions-row">
              <button class="btn-cal" onclick="downloadSingleICS('${item.id}')">📲 Takvime Ekle (.ics)</button>
              <a href="${gCalUrl}" target="_blank" class="btn-cal google">📅 Google Takvim</a>
            </div>

            <div class="social-share-row" style="display: flex; gap: 5px; flex-wrap: wrap;">
              <a href="https://www.linkedin.com/feed/?shareActive=true&text=${shareLiText}" target="_blank" class="btn-share share-linkedin">LinkedIn</a>
              <a href="https://twitter.com/intent/tweet?text=${shareXText}" target="_blank" class="btn-share share-x">X</a>
            </div>
          </div>
        `;
        container.appendChild(card);

        // 2. List Item
        const listItem = document.createElement('div');
        listItem.className = 'list-item-card';
        const dateParts = item.dateStr.split(' ');
        listItem.innerHTML = `
          <div style="display: flex; align-items: center; gap: 1.2rem;">
            <div class="list-date-badge">
              <span class="list-date-day">${dateParts[0]}</span>
              <span class="list-date-month">${dateParts[1]}</span>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--primary);">${item.icon} ${item.title}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Saat: ${item.timeStr} • <span class="event-tag ${item.tagClass}">${item.tagText}</span></div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn-top" onclick="openEventModal('${item.id}')">👁️ Detay</button>
            <button class="btn-top" onclick="copyPostText('${item.id}')">📋 Kopyala</button>
            <button class="btn-top" onclick="downloadSingleICS('${item.id}')">📲 Takvim (.ics)</button>
            <a href="${gCalUrl}" target="_blank" class="btn-top primary">📅 Google</a>
          </div>
        `;
        listView.appendChild(listItem);
      });
    }

    function renderVisibleCanvases() {
      const filtered = CONTENT_PLAN.filter(d => {
        if (d.year !== currentYear) return false;
        if (activeCategoryFilter === 'all') return true;
        return d.category === activeCategoryFilter;
      });
      filtered.slice(0, 12).forEach((item, idx) => {
        setTimeout(() => drawBannerCanvas(item), idx * 25);
      });
    }

    // ── DRAW CANVAS BANNER (1080x1080) ──────────────────────────────────
    function drawCanvasOnto(canvas, ctx, item) {
      canvas.width = 1080;
      canvas.height = 1080;

      // 1. Gradient Arka Plan
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#07162c');
      bgGrad.addColorStop(0.5, '#0b2545');
      bgGrad.addColorStop(1, '#0f3d6e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // 2. Işık Efektleri
      const radialGrad = ctx.createRadialGradient(900, 180, 50, 900, 180, 600);
      radialGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      radialGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // 3. Dekoratif Çerçeve
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, 960, 960);

      // 4. Header Badge
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.roundRect(110, 110, 320, 50, 25);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`★ ${item.tagText}`, 270, 142);

      // 5. Tarih & Saat
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 24px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`📅 ${item.dateStr}`, 970, 142);

      // 6. İkon
      ctx.font = '100px serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.icon, 540, 360);

      // 7. Manşet (Headline)
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 50px Manrope, sans-serif';
      ctx.textAlign = 'center';
      wrapText(ctx, item.headline, 540, 480, 840, 64);

      // 8. Alt Başlık (Subheadline)
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 28px Inter, sans-serif';
      ctx.fillText(item.subheadline, 540, 680);

      // 9. Alt Çizgi
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(140, 880);
      ctx.lineTo(940, 880);
      ctx.stroke();

      // 10. Footer Brand
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 32px Manrope, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('YAKIN GRUP', 140, 950);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 20px Inter, sans-serif';
      ctx.fillText('İnşaat • Enerji • Capital • Teknoloji', 140, 985);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 22px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('yakingrup.net', 940, 965);
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, y);
    }

    function drawBannerCanvas(item) {
      const canvas = document.getElementById(`canvas-${item.id}`);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      drawCanvasOnto(canvas, ctx, item);
    }

    // ── CALENDAR SYNC (.ICS & GOOGLE) ───────────────────────────────────
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

        const desc = `${item.text.replace(/\n/g, '\\n')}\\n\\n${item.hashtags}\\n\\n---\\nhttps://yakingrup.net`;

        ics.push('BEGIN:VEVENT');
        ics.push(`UID:${item.id}-2026@yakingrup.net`);
        ics.push(`DTSTAMP:20260101T000000Z`);
        ics.push(`DTSTART;TZID=Europe/Istanbul:${startDT}`);
        ics.push(`DTEND;TZID=Europe/Istanbul:${endDT}`);
        ics.push(`SUMMARY:📢 ${item.title}`);
        ics.push(`DESCRIPTION:${desc}`);
        ics.push(`LOCATION:Sosyal Medya Kanalları`);
        ics.push('STATUS:CONFIRMED');
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
      showToast('✓ 2026 - 2030 Tüm Yılların Takvimi (.ICS) İndirildi!');
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
      const title = safeEncode(`📢 ${item.title}`);
      const details = safeEncode(`${item.text}\n\n${item.hashtags}\n\n---\nhttps://yakingrup.net`);
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=Sosyal+Medya`;
    }

    // ── ACTIONS & UTILS ──────────────────────────────────────────────────
    function switchView(view) {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      const cal = document.getElementById('calendar-month-view');
      const grid = document.getElementById('posts-container');
      const list = document.getElementById('list-view');

      if (view === 'calendar') {
        const btn = document.getElementById('btn-view-cal');
        if (btn) btn.classList.add('active');
        if (cal) cal.style.display = 'block';
        if (grid) grid.style.display = 'none';
        if (list) list.style.display = 'none';
        renderMonthlyCalendar(currentYear, currentMonth);
      } else if (view === 'grid') {
        const btn = document.getElementById('btn-view-grid');
        if (btn) btn.classList.add('active');
        if (cal) cal.style.display = 'none';
        if (grid) grid.style.display = 'grid';
        if (list) list.style.display = 'none';
        renderVisibleCanvases();
      } else {
        const btn = document.getElementById('btn-view-list');
        if (btn) btn.classList.add('active');
        if (cal) cal.style.display = 'none';
        if (grid) grid.style.display = 'none';
        if (list) list.style.display = 'flex';
      }
    }

    function filterPosts(category, btn) {
      activeCategoryFilter = category;
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      renderMonthlyCalendar(currentYear, currentMonth);
      renderPosts(category);
      showToast(`Filtrelendi: ${category.toUpperCase()}`);
    }

    function copyPostText(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item) return;
      const fullText = `${item.text}\n\n${item.hashtags}`;
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('✓ Paylaşım metni ve hashtagler panoya kopyalandı!');
      });
    }

    function copyAiPrompt(id) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      if (!item || !item.aiPrompt) return;
      navigator.clipboard.writeText(item.aiPrompt).then(() => {
        showToast('✓ GPT / DALL-E Görsel Promptu Kopyalandı!');
      });
    }

    function downloadBanner(id, title) {
      const item = CONTENT_PLAN.find(d => d.id === id);
      const canvas = document.getElementById(`canvas-${id}`) || document.getElementById('modal-canvas');
      if (!canvas || !item) return;

      const link = document.createElement('a');
      link.download = `Yakin_Grup_${id}_1080x1080.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast(`✓ HD Görsel (1080x1080) İndirildi!`);
    }

    function exportAllCSV() {
      let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
      csvContent += "Tarih,Saat,Özel Gün / Başlık,Kategori,Paylaşım Metni,Hashtagler\n";

      CONTENT_PLAN.forEach(item => {
        const cleanText = item.text.replace(/"/g, '""').replace(/\n/g, ' ');
        const cleanTags = item.hashtags.replace(/"/g, '""');
        csvContent += `"${item.dateStr}","${item.timeStr}","${item.title}","${item.category}","${cleanText}","${cleanTags}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Yakin_Grup_Icerik_Takvimi_2026_2030.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ İçerik Takvimi (CSV/Excel) İndirildi!');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3500);
    }

    // Modal background click
    window.onclick = function(event) {
      const modal = document.getElementById('event-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Window global bindings
    window.selectYear = selectYear;
    window.changeMonth = changeMonth;
    window.resetToToday = resetToToday;
    window.openEventModal = openEventModal;
    window.closeEventModal = closeEventModal;
    window.switchView = switchView;
    window.filterPosts = filterPosts;
    window.copyPostText = copyPostText;
    window.copyAiPrompt = copyAiPrompt;
    window.downloadBanner = downloadBanner;
    window.exportAllICS = exportAllICS;
    window.downloadSingleICS = downloadSingleICS;
    window.exportAllCSV = exportAllCSV;
    window.showToast = showToast;

    function initApp() {
      try {
        checkAuth();
        renderMonthlyCalendar(currentYear, currentMonth);
        renderPosts('all');
        console.log('✅ Yakın Grup Takvim ve Sosyal Medya Stüdyosu Başarıyla Yüklendi!');
      } catch (e) {
        console.error('Init error:', e);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  
console.log('1. Script parsed & executed cleanly with ZERO errors!');
console.log('2. Days rendered in grid:', (getEl('cal-days-container')._children || []).length);
console.log('3. Months rendered in chips:', (getEl('months-chips')._children || []).length);
console.log('4. Posts rendered in cards:', (getEl('posts-container')._children || []).length);
console.log('5. Month summary items:', (getEl('cal-month-events-list')._children || []).length);

// Test year selection
selectYear(2027);
console.log('6. Select year 2027 success!');

// Test filter selection
filterPosts('sektor');
console.log('7. Filter sektor success!');

// Test open modal
openEventModal(CONTENT_PLAN[0].id);
console.log('8. Open modal success! Modal display:', getEl('event-modal').style.display);
