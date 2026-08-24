/**
 * Yakın Grup ERP — Gerçek Zamanlı Bulut & Kurumsal Veritabanı Motoru (erp-db.js)
 * Çoklu bilgisayar, tablet ve mobil cihazlar arasında anlık canlı senkronizasyon.
 * Müşteri Cari Kartları, Teklif Arşivi, Stok Takibi ve Yedekleme.
 */

const YakinERP = (function () {
  const DB_PREFIX = 'yakin_erp_';
  const CUSTOMERS_KEY = DB_PREFIX + 'customers';
  const PROPOSALS_KEY = DB_PREFIX + 'proposals';
  const INVENTORY_KEY = DB_PREFIX + 'inventory';
  const CLOUD_URL_KEY = DB_PREFIX + 'cloud_db_url';
  const LAST_SYNC_KEY = DB_PREFIX + 'last_sync_time';

  // Default Firebase / Cloud REST DB Endpoint for Yakın Grup
  const DEFAULT_CLOUD_URL = 'https://yakingrup-cloud-db-default-rtdb.firebaseio.com/yakingrup_erp.json';

  // Preloaded Defaults for Initial State
  const defaultCustomers = [
    {
      id: 'cust-1',
      company: 'Atlas Holding A.Ş.',
      contactName: 'Sayın Ahmet Yılmaz — Yatırımlar Direktörü',
      taxOffice: 'Büyük Mükellefler V.D.',
      taxNumber: '1234567890',
      address: 'Dilovası OSB 4. Cadde No: 12 Kocaeli / Türkiye',
      phone: '+90 262 555 0199',
      email: 'ahmet.yilmaz@atlasholding.com',
      balance: 0,
      currency: 'TRY',
      country: 'Türkiye',
      notes: 'Sanayi çatı GES ve enerji yatırımı projesi.'
    },
    {
      id: 'cust-2',
      company: 'Solaris Global Energy LLC',
      contactName: 'Mr. David Miller — Procurement Director',
      taxOffice: 'Delaware Tax Auth.',
      taxNumber: 'US-987654321',
      address: '1209 Orange St, Wilmington, DE 19801, USA',
      phone: '+1 302 555 0142',
      email: 'dmiller@solarisglobal.com',
      balance: 145000,
      currency: 'USD',
      country: 'United States',
      notes: 'Export - PV Module & Inverter Supply (Incoterm: CIF Hamburg)'
    },
    {
      id: 'cust-3',
      company: 'Ege Lojistik & Antrepo San. Tic. A.Ş.',
      contactName: 'Mehmet Ali Kaya — Operasyon Müdürü',
      taxOffice: 'Konak V.D.',
      taxNumber: '3829104821',
      address: 'Kemalpaşa OSB No: 88 İzmir / Türkiye',
      phone: '+90 232 444 8899',
      email: 'operasyon@egelojistik.com.tr',
      balance: -25000,
      currency: 'TRY',
      country: 'Türkiye',
      notes: 'Çatı GES ve depolama tesisi.'
    }
  ];

  const defaultInventory = [
    {
      id: 'inv-1',
      code: 'STK-PV-550',
      name: '550W Tier-1 Monokristal TOPCon Güneş Paneli',
      category: 'Enerji & Solar',
      unit: 'Adet',
      unitCost: 72,
      unitPrice: 95,
      currency: 'USD',
      stockQty: 2400,
      minStock: 200,
      gtip: '8541.43.00.00.00',
      description: 'MBB, %22.8 Verim, 30 Yıl Lineer Performans Garantisi'
    },
    {
      id: 'inv-2',
      code: 'STK-INV-100K',
      name: '100 kW Üç Fazlı String Solar İnvertör (10 MPPT)',
      category: 'Enerji & Solar',
      unit: 'Adet',
      unitCost: 3200,
      unitPrice: 4150,
      currency: 'USD',
      stockQty: 35,
      minStock: 5,
      gtip: '8504.40.88.00.00',
      description: 'IP66, AFCI Ark Koruması, Wi-Fi/LAN Haberleşme Entegre'
    },
    {
      id: 'inv-3',
      code: 'STK-ALU-01',
      name: 'Kenet/Sandviç Çatı Alüminyum Konstrüksiyon Seti',
      category: 'Konstrüksiyon',
      unit: 'kWp',
      unitCost: 14,
      unitPrice: 22,
      currency: 'USD',
      stockQty: 5000,
      minStock: 500,
      gtip: '7610.90.90.00.00',
      description: 'EN AW-6063 T6 Eloksallı Alüminyum, Paslanmaz Civata Takımı'
    },
    {
      id: 'inv-4',
      code: 'STK-SRV-EPC',
      name: 'Mühendislik, Statik Proje, TEDAŞ Onay & Şantiye Kurulum Hizmeti',
      category: 'Hizmet & Mühendislik',
      unit: 'kWp',
      unitCost: 15,
      unitPrice: 28,
      currency: 'USD',
      stockQty: 9999,
      minStock: 0,
      gtip: '9999.99.99.00.00',
      description: 'Anahtar teslim EPC, test, ölçüm ve resmi kabul hizmetleri'
    }
  ];

  function getCloudUrl() {
    return localStorage.getItem(CLOUD_URL_KEY) || DEFAULT_CLOUD_URL;
  }

  function setCloudUrl(url) {
    if (url && url.trim()) {
      localStorage.setItem(CLOUD_URL_KEY, url.trim());
      syncFromCloud(true);
      return true;
    }
    return false;
  }

  function getLocal(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  // --- Real-Time Cloud Sync Logic ---
  let isSyncing = false;

  async function pushToCloud() {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) return false;

    try {
      const payload = {
        updatedAt: new Date().toISOString(),
        customers: getCustomers(),
        proposals: getAllProposals(),
        inventory: getInventory()
      };

      const res = await fetch(cloudUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        localStorage.setItem(LAST_SYNC_KEY, new Date().toLocaleString('tr-TR'));
        dispatchSyncEvent();
        return true;
      }
    } catch (e) {
      console.warn('Cloud sync push:', e);
    }
    return false;
  }

  async function syncFromCloud(showToastNotice = false) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl || isSyncing) return;
    isSyncing = true;

    try {
      const res = await fetch(cloudUrl, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const cloudData = await res.json();
        if (cloudData) {
          let hasNew = false;

          // Merge Customers
          if (cloudData.customers && Array.isArray(cloudData.customers)) {
            const localCust = getCustomers();
            const mergedCust = [...localCust];
            cloudData.customers.forEach(c => {
              const idx = mergedCust.findIndex(m => m.id === c.id || (m.company.toLowerCase() === c.company.toLowerCase() && m.taxNumber === c.taxNumber));
              if (idx >= 0) {
                mergedCust[idx] = Object.assign({}, mergedCust[idx], c);
              } else {
                mergedCust.push(c);
                hasNew = true;
              }
            });
            setLocal(CUSTOMERS_KEY, mergedCust);
          }

          // Merge Proposals
          if (cloudData.proposals && Array.isArray(cloudData.proposals)) {
            const localProp = getAllProposals();
            const mergedProp = [...localProp];
            cloudData.proposals.forEach(p => {
              const idx = mergedProp.findIndex(m => m.id === p.id || m.docNo === p.docNo);
              if (idx >= 0) {
                mergedProp[idx] = Object.assign({}, mergedProp[idx], p);
              } else {
                mergedProp.unshift(p);
                hasNew = true;
              }
            });
            setLocal(PROPOSALS_KEY, mergedProp);
          }

          // Merge Inventory
          if (cloudData.inventory && Array.isArray(cloudData.inventory)) {
            const localInv = getInventory();
            const mergedInv = [...localInv];
            cloudData.inventory.forEach(i => {
              const idx = mergedInv.findIndex(m => m.id === i.id || m.code === i.code);
              if (idx >= 0) {
                mergedInv[idx] = Object.assign({}, mergedInv[idx], i);
              } else {
                mergedInv.push(i);
                hasNew = true;
              }
            });
            setLocal(INVENTORY_KEY, mergedInv);
          }

          localStorage.setItem(LAST_SYNC_KEY, new Date().toLocaleString('tr-TR'));
          dispatchSyncEvent();

          if (showToastNotice && typeof window.showToast === 'function') {
            window.showToast('☁️ Bulut veritabanı başarıyla eşitlendi!');
          }

          // Push back any local items the cloud might not have
          pushToCloud();
        }
      }
    } catch (e) {
      console.warn('Cloud fetch notice:', e);
    } finally {
      isSyncing = false;
    }
  }

  function dispatchSyncEvent() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yakin_erp_synced'));
    }
  }

  function initDB() {
    if (!localStorage.getItem(CUSTOMERS_KEY)) {
      setLocal(CUSTOMERS_KEY, defaultCustomers);
    }
    if (!localStorage.getItem(INVENTORY_KEY)) {
      setLocal(INVENTORY_KEY, defaultInventory);
    }
    if (!localStorage.getItem(PROPOSALS_KEY)) {
      setLocal(PROPOSALS_KEY, []);
    }

    // Initial background cloud sync
    setTimeout(() => {
      syncFromCloud();
    }, 400);

    // Continuous polling every 20 seconds
    setInterval(() => {
      syncFromCloud();
    }, 20000);

    // Auto-sync when window is focused
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        syncFromCloud();
      });
    }
  }

  // --- 1. Customers (Cari Kartlar) Management ---
  function getCustomers() {
    return getLocal(CUSTOMERS_KEY, defaultCustomers);
  }

  function getCustomerById(id) {
    return getCustomers().find(c => c.id === id);
  }

  function saveCustomer(customerData) {
    const list = getCustomers();
    const idx = list.findIndex(c => c.id === customerData.id);
    const record = {
      id: customerData.id || 'cust-' + Date.now(),
      company: customerData.company || 'Yeni Cari',
      contactName: customerData.contactName || '',
      taxOffice: customerData.taxOffice || '',
      taxNumber: customerData.taxNumber || '',
      address: customerData.address || '',
      phone: customerData.phone || '',
      email: customerData.email || '',
      balance: parseFloat(customerData.balance) || 0,
      currency: customerData.currency || 'TRY',
      country: customerData.country || 'Türkiye',
      notes: customerData.notes || '',
      updatedAt: new Date().toISOString()
    };

    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.push(record);
    }

    setLocal(CUSTOMERS_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return record;
  }

  function deleteCustomer(id) {
    let list = getCustomers();
    list = list.filter(c => c.id !== id);
    setLocal(CUSTOMERS_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return true;
  }

  // --- 2. Proposals / Documents Archive ---
  function getAllProposals() {
    return getLocal(PROPOSALS_KEY, []);
  }

  function getProposalById(id) {
    return getAllProposals().find(p => p.id === id || p.docNo === id);
  }

  function saveProposal(proposalData) {
    const list = getAllProposals();
    const existingIdx = list.findIndex(p => p.docNo === proposalData.docNo || p.id === proposalData.id);

    const record = {
      id: proposalData.id || 'PROP-' + Date.now(),
      docNo: proposalData.docNo || 'YKN-DOC-' + Math.floor(1000 + Math.random() * 9000),
      docType: proposalData.mode || 'spec',
      title: proposalData.subject || 'Başlıksız Teklif',
      clientCompany: proposalData.clientCompany || 'Müşteri',
      clientName: proposalData.clientName || '',
      currency: proposalData.currency || 'TRY',
      grandTotal: proposalData.grandTotal || 0,
      date: proposalData.date || new Date().toISOString().split('T')[0],
      validityDays: proposalData.validityDays || 30,
      status: proposalData.status || 'Taslak',
      updatedAt: new Date().toISOString(),
      createdAt: existingIdx >= 0 ? list[existingIdx].createdAt : new Date().toISOString(),
      fullState: proposalData
    };

    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.unshift(record);
    }

    setLocal(PROPOSALS_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return record;
  }

  function updateProposalStatus(docNo, newStatus) {
    const list = getAllProposals();
    const item = list.find(p => p.docNo === docNo || p.id === docNo);
    if (item) {
      item.status = newStatus;
      item.updatedAt = new Date().toISOString();
      setLocal(PROPOSALS_KEY, list);
      pushToCloud();
      dispatchSyncEvent();
      return true;
    }
    return false;
  }

  function deleteProposal(idOrDocNo) {
    let list = getAllProposals();
    list = list.filter(p => p.id !== idOrDocNo && p.docNo !== idOrDocNo);
    setLocal(PROPOSALS_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return true;
  }

  // --- 3. Inventory (Stok Kalemleri) Management ---
  function getInventory() {
    return getLocal(INVENTORY_KEY, defaultInventory);
  }

  function getInventoryItemById(id) {
    return getInventory().find(i => i.id === id || i.code === id);
  }

  function saveInventoryItem(itemData) {
    const list = getInventory();
    const idx = list.findIndex(i => i.id === itemData.id || (itemData.code && i.code === itemData.code));
    const record = {
      id: itemData.id || 'inv-' + Date.now(),
      code: itemData.code || 'STK-' + Math.floor(100 + Math.random() * 900),
      name: itemData.name || 'Yeni Ürün/Hizmet',
      category: itemData.category || 'Genel',
      unit: itemData.unit || 'Adet',
      unitCost: parseFloat(itemData.unitCost) || 0,
      unitPrice: parseFloat(itemData.unitPrice) || 0,
      currency: itemData.currency || 'USD',
      stockQty: parseFloat(itemData.stockQty) || 0,
      minStock: parseFloat(itemData.minStock) || 0,
      gtip: itemData.gtip || '8541.43.00.00.00',
      description: itemData.description || '',
      updatedAt: new Date().toISOString()
    };

    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.push(record);
    }

    setLocal(INVENTORY_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return record;
  }

  function deleteInventoryItem(id) {
    let list = getInventory();
    list = list.filter(i => i.id !== id);
    setLocal(INVENTORY_KEY, list);
    pushToCloud();
    dispatchSyncEvent();
    return true;
  }

  // --- 4. Export & Import JSON Backup ---
  function exportFullBackupJSON() {
    const backup = {
      version: '4.0 (Enterprise Cloud)',
      exportedAt: new Date().toISOString(),
      cloudUrl: getCloudUrl(),
      customers: getCustomers(),
      proposals: getAllProposals(),
      inventory: getInventory()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YAKIN_GRUP_VERITABANI_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFullBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.customers && Array.isArray(data.customers)) setLocal(CUSTOMERS_KEY, data.customers);
      if (data.proposals && Array.isArray(data.proposals)) setLocal(PROPOSALS_KEY, data.proposals);
      if (data.inventory && Array.isArray(data.inventory)) setLocal(INVENTORY_KEY, data.inventory);
      if (data.cloudUrl) localStorage.setItem(CLOUD_URL_KEY, data.cloudUrl);
      pushToCloud();
      dispatchSyncEvent();
      return { success: true, message: 'Şirket veritabanı başarıyla içe aktarıldı ve buluta eşitlendi!' };
    } catch (e) {
      return { success: false, message: 'Geçersiz yedek dosyası: ' + e.message };
    }
  }

  function saveDraft(stateData) {
    return saveProposal(Object.assign({}, stateData, { status: 'Taslak' }));
  }

  function loadDraft() {
    return null;
  }

  function clearDraft() {}

  initDB();

  return {
    initDB,
    getCloudUrl,
    setCloudUrl,
    syncFromCloud,
    pushToCloud,
    getCustomers,
    getCustomerById,
    saveCustomer,
    deleteCustomer,
    getAllProposals,
    getProposalById,
    saveProposal,
    updateProposalStatus,
    deleteProposal,
    getInventory,
    getInventoryItemById,
    saveInventoryItem,
    deleteInventoryItem,
    saveDraft,
    loadDraft,
    clearDraft,
    exportFullBackupJSON,
    importFullBackupJSON
  };
})();

if (typeof window !== 'undefined') {
  window.YakinERP = YakinERP;
}
