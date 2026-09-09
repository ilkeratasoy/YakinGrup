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
  demolitionPerM2: 850,         // Yıkım, hafriyat, moloz ve bertaraf
  permitsAndDesignPerM2: 1250,   // Proje, ruhsat, harçlar (6306 muafiyetli)
  roughConstructionPerM2: 10800, // Kaba inşaat (C35/40 beton, nervürlü demir, kalıp, çatı)
  finishingStandardPerM2: 7800,  // Standart kaliteli ince işler
  finishingPremiumPerM2: 11800,  // Lüks / Premium ince işler
  mepPerM2: 3400,                // Mekanik tesisat (yerden ısıtma, yangın sprinkler, sıhhi)
  electricalPerM2: 2900,         // Elektrik, zayıf akım, akıllı ev altyapısı, otopark EV şarj
  externalAndLandscapePerM2: 1200, // Dış işler, istinat, çevre ve peyzaj
  // Oranlar
  siteOverheadPct: 0.08,         // %8 Şantiye genel gideri
  contingencyRiskPct: 0.05,      // %5 Beklenmeyen gider ve risk payı
  financingCostPct: 0.04,        // %4 Finansman / kur dalgalanma payı
  contractorProfitTargetPct: 0.18 // %18 Müteahhit hedef brüt kârı
};

class KentselDonusumEngine {
  constructor() {
    this.state = {
      // 1. Proje Verileri
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
      
      // 2. İmar Parametreleri
      kaks: 2.05,
      taks: 0.35,
      hmax: "Z+8 Kat",
      usageType: "Konut",
      newUnitPriceM2: 145000,
      newRentMonthly: 60000,
      
      // 3. Tabliye & Kat Dağılım Parametreleri
      customGroundSlab: 298,
      customNormalSlab: 342,
      customNormalFloorCount: 8,
      unitsPerNormalFloor: 3,
      groundFloorShopsCount: 0,
      groundFloorUnitsCount: 0,

      // Seçili Senaryo ('A', 'B', 'C')
      selectedScenario: 'B',
      
      // Süre Ayarı (Ay)
      projectMonths: 22,
      
      // Kat Karşılığı Müteahhit Payı Girişi (%)
      contractorSharePctInput: 55,
      
      // Opsiyonel Yüklenici Kâr Marjı (%35 Varsayılan)
      contractorMarginPct: 35,
      applyContractorMargin: true,
      
      // Malikler Listesi (Detaylı simülasyon için)
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

  generateDefaultOwners() {
    const list = [];
    const unitCount = parseInt(this.state.unitCount) >= 0 ? parseInt(this.state.unitCount) : 20;
    const shopCount = parseInt(this.state.shopCount) >= 0 ? parseInt(this.state.shopCount) : 0;
    const totalSections = Math.max(1, unitCount + shopCount);
    const avgNet = parseFloat(this.state.existingUnitAvgNet) || 95;
    const unitsPerFloor = parseInt(this.state.unitsPerNormalFloor) || 3;
    
    let id = 1;

    // 1. Konut / Daire Malikleri
    for (let i = 1; i <= unitCount; i++) {
      const variation = (i % 3 === 0 ? 8 : (i % 3 === 1 ? -6 : 0));
      const netM2 = Math.max(45, avgNet + variation);
      const brutM2 = Math.round(netM2 * 1.25);
      const floor = Math.min(Math.ceil(i / unitsPerFloor), 12);
      
      list.push({
        id: id++,
        sectionType: 'Konut',
        typeLabel: '🏠 Daire',
        name: `Malik ${i} (Daire ${i} • Kat ${floor})`,
        floor: floor,
        existingNetM2: netM2,
        existingGrossM2: brutM2,
        landShareRatio: (100 / totalSections).toFixed(2),
        agreed: id <= Math.ceil(totalSections * (this.state.majorityPct / 100))
      });
    }

    // 2. Ticari / Dükkan Malikleri
    for (let j = 1; j <= shopCount; j++) {
      const shopNetM2 = Math.round(avgNet * 1.25);
      const brutM2 = Math.round(shopNetM2 * 1.30);
      
      list.push({
        id: id++,
        sectionType: 'Ticari',
        typeLabel: '🏪 Dükkan',
        name: `Dükkan ${j} Sahibi (Zemin Dk:${j})`,
        floor: 0,
        existingNetM2: shopNetM2,
        existingGrossM2: brutM2,
        landShareRatio: (100 / totalSections).toFixed(2),
        agreed: id <= Math.ceil(totalSections * (this.state.majorityPct / 100))
      });
    }

    // Fallback if empty
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
        agreed: true
      });
    }

    this.state.owners = list;
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
      this.generateDefaultOwners();
    } else if (key === 'ownerCount' || key === 'existingUnitAvgNet' || key === 'majorityPct' || key === 'unitsPerNormalFloor') {
      this.generateDefaultOwners();
    }
    
    this.calculate();
  }

  /**
   * Tüm motorların tek bir deterministik akışta hesaplanması
   */
  calculate() {
    const s = this.state;
    
    // --- 1. İMAR VE TABLİYE HESAP MOTORU ---
    const landArea = parseFloat(s.landArea) || 0;
    const emsal = parseFloat(s.kaks) || 0;
    const taks = parseFloat(s.taks) || 0.35;
    
    // Taban Alanı / Zemin Tabliyesi (Kullanıcı girdisi veya Arsa * TAKS)
    const autoTabanAlani = Math.round(landArea * taks);
    const tabanAlani = (parseFloat(s.customGroundSlab) > 0) ? parseFloat(s.customGroundSlab) : autoTabanAlani;
    
    // Zemin Kat Net Kullanılabilir Oturum Alanı (Giriş holü, merdiven, asansör şaftı ~%80 net verim)
    const zeminKatNetAlani = Math.round(tabanAlani * 0.80);
    
    // Normal Kat Tabliyesi Brüt (İmar çıkmalarıyla ~1.15x veya kullanıcı girdisi)
    const autoNormalKatBrut = Math.round(tabanAlani * 1.15);
    const normalKatBrut = (parseFloat(s.customNormalSlab) > 0) ? parseFloat(s.customNormalSlab) : autoNormalKatBrut;
    const normalKatNet = Math.round(normalKatBrut * 0.82); // Kat holü ve yangın şaftları düşülmüş kat neti
    
    // Normal Kat Sayısı
    let autoNormalKatSayisi = 8;
    if (s.hmax) {
      const match = String(s.hmax).match(/(\d+)/);
      if (match) autoNormalKatSayisi = parseInt(match[1]);
    }
    const normalKatSayisi = (parseInt(s.customNormalFloorCount) > 0) ? parseInt(s.customNormalFloorCount) : autoNormalKatSayisi;

    // Katta Daire Sayısı Parametresi (Her normal katta kaç daire olacağı)
    const unitsPerNormalFloor = (parseInt(s.unitsPerNormalFloor) > 0) ? parseInt(s.unitsPerNormalFloor) : 2;

    // Normal Katta Daire Başına Düşen Net Metrekare
    const normalFloorUnitNetM2 = Math.max(25, Math.round(normalKatNet / unitsPerNormalFloor));
    const normalFloorUnitGrossM2 = Math.round(normalFloorUnitNetM2 * 1.25);

    // Normal Katlar Toplam Daire Sayısı ve Net Metraj
    const normalKatlarDaireSayisi = normalKatSayisi * unitsPerNormalFloor;
    const normalKatlarNetToplam = normalKatSayisi * normalKatNet;

    // Emsal ve Toplam İnşaat Alanı
    const emsaleDahilAlan = (emsal > 0 && landArea > 0) ? (landArea * emsal) : ((normalKatSayisi * normalKatBrut) + tabanAlani);
    const emsalDisiAlan = emsaleDahilAlan * 0.30;
    const bodrumOtoparkSiginak = emsaleDahilAlan * 0.32;
    const toplamInsaatAlani = emsaleDahilAlan + emsalDisiAlan + bodrumOtoparkSiginak;
    const toplamSatilabilirBrutAlan = (normalKatSayisi * normalKatBrut) + tabanAlani;

    // --- 2. MEVCUT DURUM VE ZEMİN/NORMAL KAT BAĞIMSIZ BÖLÜM DAĞILIMI ---
    const existingUnits = Math.max(0, parseInt(s.unitCount) || 0);
    const existingShops = Math.max(0, parseInt(s.shopCount) || 0);
    const existingTotalSections = Math.max(1, existingUnits + existingShops);
    
    const avgNet = parseFloat(s.existingUnitAvgNet) || 90;
    const existingResidentialNet = existingUnits * avgNet;
    const existingShopNet = existingShops * (avgNet * 1.10);
    const existingTotalNet = existingResidentialNet + existingShopNet;

    // Zemin Kat Dükkan & Konut Sayısı
    const groundFloorShops = (s.groundFloorShopsCount !== null && s.groundFloorShopsCount !== undefined && s.groundFloorShopsCount !== "")
      ? parseInt(s.groundFloorShopsCount)
      : existingShops;
    
    const groundFloorUnits = (s.groundFloorUnitsCount !== null && s.groundFloorUnitsCount !== undefined && s.groundFloorUnitsCount !== "")
      ? parseInt(s.groundFloorUnitsCount)
      : 0;

    // Zemin Kat Dükkan Metrajları (TAKS taban netine tam orantılı)
    let targetShopNetTotal = 0;
    let targetShopAvgNet = 0;
    if (groundFloorShops > 0) {
      targetShopNetTotal = zeminKatNetAlani;
      targetShopAvgNet = Math.round(targetShopNetTotal / groundFloorShops);
    }

    // Toplam Üretilen Konut ve Bağımsız Bölüm Sayısı
    const totalNewResidentialUnits = normalKatlarDaireSayisi + groundFloorUnits;
    const totalNewSections = totalNewResidentialUnits + groundFloorShops;

    // Müteahhide Kalan / Satılabilir Bağımsız Bölümler
    const contractorUnits = Math.max(0, totalNewResidentialUnits - existingUnits);
    const contractorShops = Math.max(0, groundFloorShops - existingShops);
    const contractorTotalSections = contractorUnits + contractorShops;

    // Kat Kat Bağımsız Bölüm Dağılım Çizelgesi (Floor Schedule)
    const floorSchedule = [];
    
    // Zemin Kat Çizelgesi
    const zeminDetails = [];
    if (groundFloorShops > 0) {
      zeminDetails.push(`${groundFloorShops} Dükkan (Net ~${targetShopAvgNet} m²)`);
    }
    if (groundFloorUnits > 0) {
      const zeminUnitNet = Math.round(zeminKatNetAlani / Math.max(1, groundFloorUnits));
      zeminDetails.push(`${groundFloorUnits} Konut (Net ~${zeminUnitNet} m²)`);
    }
    if (zeminDetails.length === 0) {
      zeminDetails.push(`Bina Giriş Holü, Güvenlik, Sosyal Tesis`);
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
      summaryText: zeminDetails.join(' + ')
    });

    // Normal Katlar Çizelgesi (1..N Kat)
    let runningResidentialAllocated = 0;
    for (let f = 1; f <= normalKatSayisi; f++) {
      const floorUnitDetails = [];
      for (let u = 1; u <= unitsPerNormalFloor; u++) {
        runningResidentialAllocated++;
        if (runningResidentialAllocated <= existingUnits) {
          floorUnitDetails.push(`Daire ${u}: Malik ${runningResidentialAllocated} (Net ${normalFloorUnitNetM2} m²)`);
        } else {
          const cNo = runningResidentialAllocated - existingUnits;
          floorUnitDetails.push(`Daire ${u}: 🏷️ Yüklenici Satış ${cNo} (Net ${normalFloorUnitNetM2} m²)`);
        }
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
        summaryText: `${unitsPerNormalFloor} Daire (Daire Başı Net ~${normalFloorUnitNetM2} m²)`,
        unitItems: floorUnitDetails
      });
    }

    // --- 3. 3 MİMARİ SENARYO MOTORU ---
    // Senaryo A: Hak Koruyan
    const scA_avgNet = normalFloorUnitNetM2;
    const scA_unitCount = totalNewResidentialUnits;
    const scA_shopCount = groundFloorShops;
    const scA_totalSections = totalNewSections;
    const scA_unitPrice = parseFloat(s.newUnitPriceM2);
    const scA_totalValue = toplamSatilabilirBrutAlan * scA_unitPrice;

    // Senaryo B: Maksimum Ekonomik (Optimum Kompakt)
    const scB_unitCount = totalNewResidentialUnits;
    const scB_shopCount = groundFloorShops;
    const scB_totalSections = totalNewSections;
    const scB_unitPrice = parseFloat(s.newUnitPriceM2) * 1.03;
    const scB_totalValue = toplamSatilabilirBrutAlan * scB_unitPrice;

    // Senaryo C: Premium Lüks Proje
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
        desc: `Katta ${unitsPerNormalFloor} daireli optimize yerleşim + zemin dükkanları ile maksimum satılabilir kârlılık sağlayan proje modeli.`,
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

    // --- 4. 2026 DETAYLI MALİYET MOTORU ---
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
    
    // Opsiyonel Yüklenici Kâr Marjı (Varsayılan %35)
    const marginPct = (s.applyContractorMargin !== false) ? (parseFloat(s.contractorMarginPct) >= 0 ? parseFloat(s.contractorMarginPct) : 35) : 0;
    const costContractorMargin = baseConstructionCost * (marginPct / 100);

    const totalProjectCost = baseConstructionCost + costContractorMargin;
    const costPerM2Total = totalProjectCost / (toplamInsaatAlani || 1);

    // --- 5. DEVLET DESTEKLERİ & FİNANSMAN MOTORLARI ---
    const normCity = (s.city || "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
    
    // A. Yarısı Bizden Motoru (Sadece İstanbul)
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

    // B. Dünya Bankası İADŞP
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

    // --- 6. 4 FİNANSMAN MODELİNİN KARŞILAŞTIRILMASI ---
    // MODEL 1: Kat Karşılığı
    const requiredContractorEconomicShare = Math.min(0.85, Math.max(0.35, (totalProjectCost * 1.22) / (activeScenario.totalProjectValue || 1)));
    const model1_ContractorSharePct = Math.round(requiredContractorEconomicShare * 100);
    const model1_ContractorRevenue = activeScenario.totalProjectValue * (model1_ContractorSharePct / 100);
    const model1_ContractorNetProfit = model1_ContractorRevenue - totalProjectCost;
    const model1_ContractorROI = (model1_ContractorNetProfit / (totalProjectCost || 1)) * 100;

    // MODEL 2: Yarısı Bizden + Taahhüt
    const model2_NetCostAfterSupport = Math.max(0, totalProjectCost - ybdInsaatHakedisToplam);
    const model2_OwnerPaymentPerUnit = (eligibleYBDUnits + eligibleYBDShops) > 0 
      ? (model2_NetCostAfterSupport / (eligibleYBDUnits + eligibleYBDShops)) 
      : (totalProjectCost / existingTotalSections);
    const model2_ContractorSharePct = Math.max(0, Math.round((model2_NetCostAfterSupport / (activeScenario.totalProjectValue || 1)) * 100));
    const model2_ContractorProfit = (totalProjectCost * UNIT_COSTS_2026.contractorProfitTargetPct);
    const model2_ContractorROI = UNIT_COSTS_2026.contractorProfitTargetPct * 100;

    // MODEL 3: Dünya Bankası İADŞP
    const model3_CreditUsedTotal = Math.min(totalProjectCost, totalIADSPFinancing);
    const model3_RemainingCost = Math.max(0, totalProjectCost - model3_CreditUsedTotal);
    const model3_OwnerPaymentPerUnit = isIADSPEligible ? (model3_RemainingCost / existingTotalSections) : (totalProjectCost / existingTotalSections);
    const model3_ContractorProfit = totalProjectCost * UNIT_COSTS_2026.contractorProfitTargetPct;
    const model3_ContractorROI = UNIT_COSTS_2026.contractorProfitTargetPct * 100;

    // MODEL 4: Özkaynak
    const model4_OwnerPaymentPerUnit = (totalProjectCost * 1.15) / existingTotalSections;
    const model4_ContractorNetProfit = totalProjectCost * 0.15;
    const model4_ContractorROI = 15.0;

    // --- 7. ARSA DEĞERİ, KİRA GETİRİSİ & ROI MOTORU ---
    const existingLandValue = landArea * (parseFloat(s.existingUnitPriceM2) || 80000) * 0.60;
    const projectTotalSalesValue = activeScenario.totalProjectValue;
    const grossProjectValueAdded = projectTotalSalesValue - totalProjectCost;
    
    const existingMonthlyRentalTotal = (existingUnits * (parseFloat(s.existingRentMonthly) || 30000)) + (existingShops * (parseFloat(s.existingRentMonthly) || 30000) * 1.5);
    const newMonthlyRentalTotal = (totalNewResidentialUnits * (parseFloat(s.newRentMonthly) || 50000)) + (groundFloorShops * (parseFloat(s.newRentMonthly) || 50000) * 1.6);
    const newAnnualRentalTotal = newMonthlyRentalTotal * 12;
    const grossRentalYieldPct = (newAnnualRentalTotal / (projectTotalSalesValue || 1)) * 100;

    const months = parseInt(s.projectMonths) || 22;
    const annualizedROI = (Math.pow(1 + (model1_ContractorROI / 100), 12 / months) - 1) * 100;

    // --- 8. RİSK SKORU & KARAR MOTORU ---
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

    // --- 9. MALİK BAZLI DETAYLI BİLANÇO & YENİ DAİRE TAHSİS TABLOSU ---
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
      let allocatedDescription = "";

      if (isShop) {
        assignedShopCounter++;
        allocatedFloor = 0;
        allocatedDoorNo = assignedShopCounter;
        newNetM2 = targetShopAvgNet || Math.round(zeminKatNetAlani / Math.max(1, groundFloorShops));
        allocatedDescription = `Zemin Kat • Dükkan ${allocatedDoorNo} (Net ${newNetM2} m²)`;
      } else {
        assignedResidentialCounter++;
        allocatedFloor = Math.min(normalKatSayisi, Math.floor((assignedResidentialCounter - 1) / unitsPerNormalFloor) + 1);
        allocatedDoorNo = ((assignedResidentialCounter - 1) % unitsPerNormalFloor) + 1;
        
        const ratioToAvg = (avgNet > 0) ? (o.existingNetM2 / avgNet) : 1.0;
        newNetM2 = Math.round(normalFloorUnitNetM2 * (0.85 + 0.15 * ratioToAvg));
        allocatedDescription = `${allocatedFloor}. Kat • Daire ${allocatedDoorNo} (Katta ${unitsPerNormalFloor} Daire Düzeni)`;
      }
      
      const newGrossM2 = Math.round(newNetM2 * 1.25);
      const newVal = newGrossM2 * newPrice;
      
      const hibeShare = isIstanbul ? (isShop ? ybdHibePerShop : ybdHibePerUnit) : 0;
      const krediShare = isIstanbul ? (isShop ? ybdKrediPerShop : ybdKrediPerUnit) : (isIADSPEligible ? iadspMaxKrediPerUnit : 0);
      const tahliyeShare = isIstanbul ? (isShop ? ybdTahliyePerShop : ybdTahliyePerUnit) : 0;
      
      // İnşaat Yapımını Karşılayan Devlet Desteği (Müteahhit Hakedişine: 875k Hibe + 875k Kredi = 1.750.000 TL)
      const constructionSupport = isIstanbul ? (hibeShare + krediShare) : (isIADSPEligible ? krediShare : 0);
      
      // 125.000 TL Taşınma Desteği inşaat hesabından düşülmez; doğrudan malikin hesabına nakit ödenir
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

    // Sonuçları nesneye kaydet
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
          totalPerUnit: ybdTotalPerUnit,
          totalHibe: totalYBDHibe,
          totalKredi: totalYBDKredi,
          totalTahliye: totalYBDTahliye,
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
          totalSupport: totalYBDFinancing,
          netCostToShare: model2_NetCostAfterSupport,
          ownerPaymentPerUnit: model2_OwnerPaymentPerUnit,
          contractorSharePct: model2_ContractorSharePct,
          contractorProfit: model2_ContractorProfit,
          contractorROI: model2_ContractorROI,
          desc: "İstanbul için konut başına 1.875.000 TL, dükkan başına 1.000.000 TL destek hakediş ile inşaata aktarılır."
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
