/**
 * Yakın Grup — Kentsel Dönüşüm Online Bulut Veritabanı & Arşiv Yönetim Motoru (assets/js/kentsel-donusum-db.js)
 * Gerçek zamanlı Firebase Cloud REST veritabanı senkronizasyonu, çoklu cihaz desteği (PC/Tablet/Mobil),
 * otomatik periyodik eşitleme ve offline-first yerel önbellekleme.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KDDB = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const LOCAL_STORAGE_KEY = 'yg_kd_proposals_db_v1';
  const CLOUD_URL_KEY = 'yg_kd_cloud_db_url';
  const LAST_SYNC_KEY = 'yg_kd_last_sync_time';

  // Yakın Grup Online Firebase Realtime Database Endpoint
  const DEFAULT_CLOUD_URL = 'https://yakingrup-default-rtdb.firebaseio.com/yakingrup_kd_proposals.json';

  let isSyncing = false;
  let syncStatus = 'online'; // 'online', 'syncing', 'offline', 'error'
  let lastSyncTime = null;

  // Önceden Tanımlı Örnek Arşiv Kayıtları (İlk Açılış / Çevrimdışı Başlangıç İçin)
  const defaultArchivedProposals = [
    {
      id: 'kd-prop-2026-001',
      docNo: 'YKN-KD-2026-0814',
      title: 'Kadıköy Fenerbahçe 1248/14 Kentsel Dönüşüm Resmi Teklifi',
      clientRepresentative: 'Fenerbahçe Palas Malikler Kurulu (Ahmet Yılmaz)',
      city: 'İstanbul',
      district: 'Kadıköy',
      neighborhood: 'Fenerbahçe / Caddebostan',
      ada: '1248',
      parsel: '14',
      landArea: 1200,
      totalConstructionArea: 3820,
      existingUnits: 20,
      existingShops: 2,
      newUnits: 24,
      newShops: 2,
      totalCost: 145200000,
      totalRevenue: 320000000,
      recommendedModel: '1. Model: %50 Kat Karşılığı + Yarısı Bizden Hibeli',
      decision: 'AL / YATIRIM UYGUN (Risk: 18/100 • Düşük)',
      status: 'Onaylandı',
      createdAt: '2026-08-14T11:30:00.000Z',
      updatedAt: '2026-08-20T14:45:00.000Z',
      notes: 'Malikler kurulu ile 3/4 çoğunluk sağlandı. Yarısı Bizden hibe başvurusu onaylandı.',
      stateSnapshot: {
        city: 'İstanbul',
        district: 'Kadıköy',
        neighborhood: 'Fenerbahçe / Caddebostan',
        ada: '1248',
        parsel: '14',
        landArea: 1200,
        unitCount: 20,
        shopCount: 2,
        existingUnitAvgNet: 95,
        existingUnitPriceM2: 120000,
        existingRentMonthly: 45000,
        ownerCount: 20,
        majorityPct: 75,
        kaks: 2.05,
        taks: 0.35,
        hmax: 'Z+8 Kat',
        usageType: 'Karma (Konut + Ticaret)',
        newUnitPriceM2: 145000,
        newRentMonthly: 60000,
        soilCategory: 'ZF (Orta Sağlam Zemin)',
        titleStatus: 'Kat Mülkiyeti',
        customGroundSlab: 420,
        customNormalSlab: 480,
        customNormalFloorCount: 8,
        unitsPerNormalFloor: 3,
        groundFloorShopsCount: 2,
        groundFloorUnitsCount: 0,
        selectedScenario: 'A',
        applyContractorMargin: true,
        contractorMarginPct: 35
      }
    },
    {
      id: 'kd-prop-2026-002',
      docNo: 'YKN-KD-2026-0828',
      title: 'Beşiktaş Levent 892/4 Butik Rezidans Dönüşüm Dosyası',
      clientRepresentative: 'Levent Çamlık Sitesi Temsilcisi (Selin Erdem)',
      city: 'İstanbul',
      district: 'Beşiktaş',
      neighborhood: 'Levent / Nisbetiye',
      ada: '892',
      parsel: '4',
      landArea: 750,
      totalConstructionArea: 2450,
      existingUnits: 8,
      existingShops: 0,
      newUnits: 12,
      newShops: 0,
      totalCost: 98000000,
      totalRevenue: 228000000,
      recommendedModel: '1. Model: %45 Kat Karşılığı Sözleşme',
      decision: 'AL / YATIRIM UYGUN (Risk: 12/100 • Çok Düşük)',
      status: 'Teklif İletildi',
      createdAt: '2026-08-28T09:15:00.000Z',
      updatedAt: '2026-08-28T09:15:00.000Z',
      notes: 'Lüks segment butik proje. Maliklere 3+1 brüt 145m² daireler önerildi.',
      stateSnapshot: {
        city: 'İstanbul',
        district: 'Beşiktaş',
        neighborhood: 'Levent / Nisbetiye',
        ada: '892',
        parsel: '4',
        landArea: 750,
        unitCount: 8,
        shopCount: 0,
        existingUnitAvgNet: 120,
        existingUnitPriceM2: 190000,
        existingRentMonthly: 75000,
        ownerCount: 8,
        majorityPct: 100,
        kaks: 2.10,
        taks: 0.35,
        hmax: 'Z+5 Kat',
        usageType: 'Konut',
        newUnitPriceM2: 210000,
        newRentMonthly: 90000,
        soilCategory: 'ZE (Sağlam Kayalık)',
        titleStatus: 'Kat Mülkiyeti',
        customGroundSlab: 260,
        customNormalSlab: 310,
        customNormalFloorCount: 5,
        unitsPerNormalFloor: 2,
        groundFloorShopsCount: 0,
        groundFloorUnitsCount: 2,
        selectedScenario: 'A',
        applyContractorMargin: true,
        contractorMarginPct: 35
      }
    },
    {
      id: 'kd-prop-2026-003',
      docNo: 'YKN-KD-2026-0905',
      title: 'İzmir Karşıyaka 4510/12 İADŞP Dünya Bankası Dönüşüm Projesi',
      clientRepresentative: 'Mavişehir Blokları Yönetim Kurulu',
      city: 'İzmir',
      district: 'Karşıyaka',
      neighborhood: 'Mavişehir / Bostanlı',
      ada: '4510',
      parsel: '12',
      landArea: 980,
      totalConstructionArea: 3200,
      existingUnits: 16,
      existingShops: 0,
      newUnits: 18,
      newShops: 0,
      totalCost: 112000000,
      totalRevenue: 240000000,
      recommendedModel: '4. Model: İADŞP Dünya Bankası 3M TL %0,69 Kredili',
      decision: 'AL / YATIRIM UYGUN (Risk: 22/100 • Orta-Düşük)',
      status: 'Taslak',
      createdAt: '2026-09-05T16:20:00.000Z',
      updatedAt: '2026-09-05T16:20:00.000Z',
      notes: 'Dünya Bankası %0.69 kredi limitleri ve zemin iyileştirme kalemleri hesaplandı.',
      stateSnapshot: {
        city: 'İzmir',
        district: 'Karşıyaka',
        neighborhood: 'Mavişehir / Bostanlı',
        ada: '4510',
        parsel: '12',
        landArea: 980,
        unitCount: 16,
        shopCount: 0,
        existingUnitAvgNet: 85,
        existingUnitPriceM2: 85000,
        existingRentMonthly: 32000,
        ownerCount: 16,
        majorityPct: 70,
        kaks: 2.20,
        taks: 0.35,
        hmax: 'Z+7 Kat',
        usageType: 'Konut',
        newUnitPriceM2: 110000,
        newRentMonthly: 45000,
        soilCategory: 'ZD (Alüvyon Zemin / İyileştirme)',
        titleStatus: 'Kat Mülkiyeti',
        customGroundSlab: 340,
        customNormalSlab: 400,
        customNormalFloorCount: 7,
        unitsPerNormalFloor: 2,
        groundFloorShopsCount: 0,
        groundFloorUnitsCount: 2,
        selectedScenario: 'A',
        applyContractorMargin: true,
        contractorMarginPct: 35
      }
    }
  ];

  // Helper: Local Storage Data Access
  function getLocalDB() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultArchivedProposals));
        return [...defaultArchivedProposals];
      }
      return JSON.parse(data) || [];
    } catch (e) {
      console.error('KDDB Local Storage Read Error:', e);
      return [...defaultArchivedProposals];
    }
  }

  function saveLocalDB(proposals) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proposals));
      return true;
    } catch (e) {
      console.error('KDDB Local Storage Write Error:', e);
      return false;
    }
  }

  function getCloudUrl() {
    try {
      let url = localStorage.getItem(CLOUD_URL_KEY) || DEFAULT_CLOUD_URL;
      if (url && url.includes('yakingrup-cloud-db-default-rtdb')) {
        url = url.replace('yakingrup-cloud-db-default-rtdb', 'yakingrup-default-rtdb');
        localStorage.setItem(CLOUD_URL_KEY, url);
      }
      return url;
    } catch (e) {
      return DEFAULT_CLOUD_URL;
    }
  }

  function sanitizeCloudUrl(url) {
    if (!url || !url.trim()) return DEFAULT_CLOUD_URL;
    let clean = url.trim();
    if (clean.endsWith('/.json')) {
      clean = clean.replace('/.json', '/yakingrup_kd_proposals.json');
    } else if (clean.endsWith('.json')) {
      // already a json file endpoint
    } else {
      if (clean.endsWith('/')) {
        clean = clean + 'yakingrup_kd_proposals.json';
      } else {
        clean = clean + '/yakingrup_kd_proposals.json';
      }
    }
    return clean;
  }

  function setCloudUrl(url) {
    try {
      if (url && url.trim()) {
        const sanitized = sanitizeCloudUrl(url);
        localStorage.setItem(CLOUD_URL_KEY, sanitized);
      } else {
        localStorage.removeItem(CLOUD_URL_KEY);
      }
      syncFromCloud(true);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Benzersiz Teklif Numarası Üretici
  function generateDocNo() {
    const list = getLocalDB();
    const count = list.length + 1;
    const pad = String(count).padStart(3, '0');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    return `YKN-KD-2026-${pad}-${randomSuffix}`;
  }

  // =========================================================================
  // ONLINE CLOUD REST SYNCHRONIZATION ENGINE
  // =========================================================================
  async function syncFromCloud(showNotification = false) {
    if (isSyncing) return;
    const url = getCloudUrl();
    if (!url) return;

    isSyncing = true;
    syncStatus = 'syncing';
    dispatchSyncEvent();

    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 8000) : null;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller ? controller.signal : undefined
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (response.ok) {
        const cloudData = await response.json();
        let cloudProposals = null;
        if (cloudData && Array.isArray(cloudData.proposals)) {
          cloudProposals = cloudData.proposals;
        } else if (cloudData && cloudData.proposals && typeof cloudData.proposals === 'object') {
          cloudProposals = Object.values(cloudData.proposals);
        }

        if (cloudProposals) {
          const localList = getLocalDB();
          const mergedList = [...localList];
          let hasNewOrUpdated = false;

          cloudProposals.forEach(cloudP => {
            if (!cloudP) return;
            const idx = mergedList.findIndex(m => m.docNo === cloudP.docNo || m.id === cloudP.id);
            if (idx >= 0) {
              const localUpdated = new Date(mergedList[idx].updatedAt || 0).getTime();
              const cloudUpdated = new Date(cloudP.updatedAt || 0).getTime();
              if (cloudUpdated > localUpdated) {
                mergedList[idx] = Object.assign({}, mergedList[idx], cloudP);
                hasNewOrUpdated = true;
              }
            } else {
              mergedList.unshift(cloudP);
              hasNewOrUpdated = true;
            }
          });

          saveLocalDB(mergedList);
          syncStatus = 'online';
          lastSyncTime = new Date().toLocaleTimeString('tr-TR');
          localStorage.setItem(LAST_SYNC_KEY, lastSyncTime);

          if (hasNewOrUpdated) {
            // Push back any local items the cloud didn't have
            pushToCloud();
          }

          if (showNotification && typeof showToastNotification === 'function') {
            showToastNotification(`☁️ Online bulut veritabanı eşitlendi (${mergedList.length} teklif aktif).`);
          }
        } else if (cloudData === null || (cloudData && !cloudData.proposals)) {
          // Cloud is empty or unseeded, push local data to seed cloud database
          pushToCloud();
          syncStatus = 'online';
          lastSyncTime = new Date().toLocaleTimeString('tr-TR');
        }
      } else {
        syncStatus = 'offline';
      }
    } catch (err) {
      console.warn('KDDB Cloud Sync notice (offline or network fallback):', err.message);
      syncStatus = 'offline';
    } finally {
      isSyncing = false;
      dispatchSyncEvent();
    }
  }

  async function pushToCloud() {
    const url = getCloudUrl();
    if (!url) return false;

    try {
      const list = getLocalDB();
      const payload = {
        updatedAt: new Date().toISOString(),
        proposals: list
      };

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        syncStatus = 'online';
        lastSyncTime = new Date().toLocaleTimeString('tr-TR');
        localStorage.setItem(LAST_SYNC_KEY, lastSyncTime);
        dispatchSyncEvent();
        return true;
      } else {
        console.error('KDDB Cloud Push response not ok:', res.status, res.statusText);
        syncStatus = 'offline';
        dispatchSyncEvent();
        return false;
      }
    } catch (err) {
      console.warn('KDDB Cloud Push warning:', err.message);
      syncStatus = 'offline';
      dispatchSyncEvent();
      return false;
    }
  }

  function dispatchSyncEvent() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yakin_kd_synced', {
        detail: {
          status: syncStatus,
          lastSyncTime: lastSyncTime || localStorage.getItem(LAST_SYNC_KEY) || '-'
        }
      }));
    }
  }

  // Start background periodic sync & event listeners
  function initBackgroundSync() {
    // Initial fetch
    setTimeout(() => {
      syncFromCloud();
    }, 500);

    // Periodic sync every 15 seconds
    setInterval(() => {
      syncFromCloud();
    }, 15000);

    // Sync on tab focus or online event
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        syncFromCloud();
      });
      window.addEventListener('online', () => {
        syncFromCloud();
      });
    }
  }

  // Initialize
  initBackgroundSync();

  // =========================================================================
  // PUBLIC API
  // =========================================================================
  const KDDB = {
    // 1. Tüm Teklifleri Getir
    getAll() {
      const list = getLocalDB();
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // 2. Belirli Teklifi Getir
    getById(idOrDocNo) {
      const list = getLocalDB();
      return list.find(p => p.id === idOrDocNo || p.docNo === idOrDocNo) || null;
    },

    // 3. Mevcut Stüdyo Durumunu Veritabanına Kaydet & Arşivle
    saveCurrentProposal(customMetadata = {}) {
      if (!window.KDEngine) {
        throw new Error('KDEngine bulunamadı.');
      }

      window.KDEngine.calculate();
      const eng = window.KDEngine;
      const s = eng.state;
      const r = eng.results;

      const list = getLocalDB();
      const isUpdate = customMetadata.docNo && list.some(p => p.docNo === customMetadata.docNo);
      
      const docNo = customMetadata.docNo || generateDocNo();
      const nowISO = new Date().toISOString();

      // Custom images from storage
      const extRender = localStorage.getItem('yg_custom_exterior_render') || '';
      const intRender = localStorage.getItem('yg_custom_interior_render') || '';

      const proposalRecord = {
        id: customMetadata.id || `kd-prop-${Date.now()}`,
        docNo: docNo,
        title: customMetadata.title || `${s.city} ${s.district} ${s.ada}/${s.parsel} Kentsel Dönüşüm Teklifi`,
        clientRepresentative: customMetadata.clientRepresentative || `${s.neighborhood} Malikler Kurulu Temsilcisi`,
        city: s.city,
        district: s.district,
        neighborhood: s.neighborhood,
        ada: s.ada,
        parsel: s.parsel,
        landArea: s.landArea,
        totalConstructionArea: r.toplamInsaatAlani,
        existingUnits: s.unitCount,
        existingShops: s.shopCount,
        newUnits: r.totalNewResidentialUnits,
        newShops: r.groundFloorShops,
        totalCost: r.costs.totalProjectCost,
        totalRevenue: r.financials.projectTotalSalesValue,
        recommendedModel: r.decision.recommendedModel,
        decision: `${r.decision.action} (${r.decision.text})`,
        status: customMetadata.status || 'Teklif İletildi',
        createdAt: isUpdate ? (list.find(p => p.docNo === docNo)?.createdAt || nowISO) : nowISO,
        updatedAt: nowISO,
        notes: customMetadata.notes || 'Yakın Grup Kentsel Dönüşüm Fizibilite ve Teklif Dosyası.',
        images: {
          hasCustomExterior: !!extRender,
          hasCustomInterior: !!intRender
        },
        stateSnapshot: JSON.parse(JSON.stringify(s)),
        resultsSnapshot: {
          costs: r.costs,
          financials: r.financials,
          decision: r.decision,
          riskScore: r.riskScore,
          supports: r.supports
        }
      };

      if (isUpdate) {
        const idx = list.findIndex(p => p.docNo === docNo);
        list[idx] = proposalRecord;
      } else {
        list.unshift(proposalRecord);
      }

      saveLocalDB(list);
      pushToCloud();
      dispatchSyncEvent();
      return proposalRecord;
    },

    // 4. Teklif Durumunu Güncelle
    updateStatus(docNo, newStatus) {
      const list = getLocalDB();
      const item = list.find(p => p.docNo === docNo);
      if (item) {
        item.status = newStatus;
        item.updatedAt = new Date().toISOString();
        saveLocalDB(list);
        pushToCloud();
        dispatchSyncEvent();
        return true;
      }
      return false;
    },

    // 5. Teklifi Sil (Tekil Silme)
    delete(docNo) {
      let list = getLocalDB();
      const initialLen = list.length;
      list = list.filter(p => p.docNo !== docNo && p.id !== docNo);
      if (list.length !== initialLen) {
        saveLocalDB(list);
        pushToCloud();
        dispatchSyncEvent();
        return true;
      }
      return false;
    },

    // 5b. Çoklu Teklif Sil (Toplu Silme)
    deleteMultiple(docNos) {
      if (!Array.isArray(docNos) || docNos.length === 0) return 0;
      let list = getLocalDB();
      const initialLen = list.length;
      list = list.filter(p => !docNos.includes(p.docNo) && !docNos.includes(p.id));
      const deletedCount = initialLen - list.length;
      if (deletedCount > 0) {
        saveLocalDB(list);
        pushToCloud();
        dispatchSyncEvent();
      }
      return deletedCount;
    },

    // 5c. Tüm Veritabanını Temizle
    clearAll() {
      saveLocalDB([]);
      pushToCloud();
      dispatchSyncEvent();
      return true;
    },

    // 5d. Örnek Veritabanını Yeniden Yükle
    resetToDefaults() {
      saveLocalDB(defaultArchivedProposals);
      pushToCloud();
      dispatchSyncEvent();
      return true;
    },

    // 6. Teklifi Klonla / Yeni Revizyon Oluştur
    clone(docNo) {
      const item = this.getById(docNo);
      if (!item) return null;

      const list = getLocalDB();
      const newDocNo = generateDocNo();
      const clonedItem = JSON.parse(JSON.stringify(item));

      clonedItem.id = `kd-prop-${Date.now()}`;
      clonedItem.docNo = newDocNo;
      clonedItem.title = `${item.title} (Revizyon)`;
      clonedItem.status = 'Taslak';
      clonedItem.createdAt = new Date().toISOString();
      clonedItem.updatedAt = new Date().toISOString();
      clonedItem.notes = `[${docNo}] numaralı teklif üzerinden klonlandı. ${item.notes || ''}`;

      list.unshift(clonedItem);
      saveLocalDB(list);
      pushToCloud();
      dispatchSyncEvent();
      return clonedItem;
    },

    // 7. Teklifi Stüdyoya Yükle & Hesapla
    loadToStudio(docNo) {
      const item = this.getById(docNo);
      if (!item || !item.stateSnapshot || !window.KDEngine) return false;

      // KDEngine State güncelle
      Object.assign(window.KDEngine.state, item.stateSnapshot);
      window.KDEngine.state.docNo = item.docNo || docNo;
      if (item.createdAt) {
        const d = new Date(item.createdAt);
        if (!isNaN(d.getTime())) {
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          window.KDEngine.state.proposalDate = `${day}.${month}.${year}`;
        }
      }
      if (!window.KDEngine.state.owners || window.KDEngine.state.owners.length === 0) {
        window.KDEngine.generateDefaultOwners(true);
      }
      window.KDEngine.calculate();

      // Form inputlarını ve arayüzü senkronize et
      if (typeof syncInputsWithState === 'function') syncInputsWithState();
      if (typeof renderUI === 'function') renderUI();

      return true;
    },

    // 8. Portföy KPI Metrikleri
    getPortfolioStats() {
      const list = this.getAll();
      const totalCount = list.length;
      const approvedCount = list.filter(p => p.status === 'Onaylandı' || p.status === 'Sözleşme İmzalandı').length;
      const activeCount = list.filter(p => p.status === 'Teklif İletildi' || p.status === 'Taslak').length;
      
      let totalVolumeTRY = 0;
      let totalAreaM2 = 0;
      let totalUnits = 0;

      list.forEach(p => {
        totalVolumeTRY += (p.totalCost || 0);
        totalAreaM2 += (p.totalConstructionArea || 0);
        totalUnits += ((p.newUnits || 0) + (p.newShops || 0));
      });

      return {
        totalCount,
        approvedCount,
        activeCount,
        totalVolumeTRY,
        totalAreaM2,
        totalUnits
      };
    },

    // 9. Bulut Eşitleme Metodları
    syncFromCloud,
    pushToCloud,
    getCloudUrl,
    setCloudUrl,
    getSyncStatus() {
      return {
        status: syncStatus,
        lastSyncTime: lastSyncTime || localStorage.getItem(LAST_SYNC_KEY) || 'Henüz eşitlenmedi',
        cloudUrl: getCloudUrl()
      };
    },

    // 10. Tüm Veritabanını JSON Olarak Dışa Aktar (Backup)
    exportDatabaseJSON() {
      const list = this.getAll();
      const payload = {
        title: 'Yakın Grup Kentsel Dönüşüm Teklif Veritabanı',
        exportedAt: new Date().toISOString(),
        cloudUrl: getCloudUrl(),
        proposals: list
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      const a = document.createElement('a');
      a.setAttribute("href", dataStr);
      a.setAttribute("download", `YakinGrup_KentselDonusum_OnlineDB_Yedek_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    // 11. JSON Dosyasından Veritabanını İçe Aktar (Restore)
    importDatabaseJSON(jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        const list = Array.isArray(parsed) ? parsed : (parsed.proposals && Array.isArray(parsed.proposals) ? parsed.proposals : null);
        if (list && list.length > 0) {
          saveLocalDB(list);
          pushToCloud();
          dispatchSyncEvent();
          return { success: true, count: list.length };
        }
        return { success: false, message: 'Geçersiz JSON veritabanı formatı.' };
      } catch (e) {
        return { success: false, message: e.message };
      }
    }
  };

  return KDDB;
}));