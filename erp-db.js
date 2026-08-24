/**
 * Yakın Grup ERP & Veritabanı Motoru (erp-db.js)
 * Teklif Arşivi, Cari Hesaplar, Stok Yönetimi, Otomatik Taslak, Dış Ticaret & Fatura
 */

const YakinERP = (function () {
  const DB_PREFIX = 'yakin_erp_';
  const DRAFT_KEY = DB_PREFIX + 'current_draft';
  const PROPOSALS_KEY = DB_PREFIX + 'proposals';
  const CUSTOMERS_KEY = DB_PREFIX + 'customers';
  const INVENTORY_KEY = DB_PREFIX + 'inventory';
  const SETTINGS_KEY = DB_PREFIX + 'settings';

  // Initial Preloaded Data for Customers & Inventory
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
    },
    {
      id: 'inv-5',
      code: 'STK-CBL-SOLAR',
      name: '1x6 mm² H1Z2Z2-K Kalaylı Bakır Solar Kablo (Kırmızı/Siyah)',
      category: 'Kablo & Elektrik',
      unit: 'Metre',
      unitCost: 0.95,
      unitPrice: 1.45,
      currency: 'USD',
      stockQty: 18000,
      minStock: 2000,
      gtip: '8544.49.91.00.00',
      description: 'TÜV Sertifikalı, UV ve Ozon Dayanımlı, Halojensiz'
    }
  ];

  // Helper storage functions
  function getStorage(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Storage Read Error:', e);
      return fallback;
    }
  }

  function setStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage Write Error:', e);
      return false;
    }
  }

  // Initialize Defaults if Empty
  function initDB() {
    if (!localStorage.getItem(CUSTOMERS_KEY)) {
      setStorage(CUSTOMERS_KEY, defaultCustomers);
    }
    if (!localStorage.getItem(INVENTORY_KEY)) {
      setStorage(INVENTORY_KEY, defaultInventory);
    }
    if (!localStorage.getItem(PROPOSALS_KEY)) {
      setStorage(PROPOSALS_KEY, []);
    }
  }

  // --- 1. Draft (Taslak) Management ---
  function saveDraft(stateData) {
    if (!stateData) return false;
    const payload = {
      savedAt: new Date().toISOString(),
      state: stateData
    };
    return setStorage(DRAFT_KEY, payload);
  }

  function loadDraft() {
    return getStorage(DRAFT_KEY, null);
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  }

  // --- 2. Proposals / Documents Archive ---
  function getAllProposals() {
    return getStorage(PROPOSALS_KEY, []);
  }

  function getProposalById(id) {
    const list = getAllProposals();
    return list.find(p => p.id === id || p.docNo === id);
  }

  function saveProposal(proposalData) {
    const list = getAllProposals();
    const existingIdx = list.findIndex(p => p.docNo === proposalData.docNo || p.id === proposalData.id);

    const record = {
      id: proposalData.id || 'PROP-' + Date.now(),
      docNo: proposalData.docNo || 'YKN-DOC-' + Math.floor(1000 + Math.random() * 9000),
      docType: proposalData.mode || 'spec', // 'spec', 'prop', 'hybrid', 'proforma', 'dispatch', 'invoice'
      title: proposalData.subject || 'Başlıksız Teklif',
      clientCompany: proposalData.clientCompany || 'Müşteri',
      clientName: proposalData.clientName || '',
      currency: proposalData.currency || 'TRY',
      grandTotal: proposalData.grandTotal || 0,
      date: proposalData.date || new Date().toISOString().split('T')[0],
      validityDays: proposalData.validityDays || 30,
      status: proposalData.status || 'Taslak', // 'Taslak', 'İletildi', 'Onaylandı', 'Faturalandı', 'İptal'
      updatedAt: new Date().toISOString(),
      createdAt: existingIdx >= 0 ? list[existingIdx].createdAt : new Date().toISOString(),
      fullState: proposalData
    };

    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.unshift(record);
    }

    setStorage(PROPOSALS_KEY, list);
    return record;
  }

  function updateProposalStatus(docNo, newStatus) {
    const list = getAllProposals();
    const item = list.find(p => p.docNo === docNo || p.id === docNo);
    if (item) {
      item.status = newStatus;
      item.updatedAt = new Date().toISOString();
      setStorage(PROPOSALS_KEY, list);
      return true;
    }
    return false;
  }

  function deleteProposal(idOrDocNo) {
    let list = getAllProposals();
    list = list.filter(p => p.id !== idOrDocNo && p.docNo !== idOrDocNo);
    setStorage(PROPOSALS_KEY, list);
    return true;
  }

  // --- 3. Customers (Cari Kartlar) Management ---
  function getCustomers() {
    return getStorage(CUSTOMERS_KEY, defaultCustomers);
  }

  function getCustomerById(id) {
    const list = getCustomers();
    return list.find(c => c.id === id);
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
    setStorage(CUSTOMERS_KEY, list);
    return record;
  }

  function deleteCustomer(id) {
    let list = getCustomers();
    list = list.filter(c => c.id !== id);
    setStorage(CUSTOMERS_KEY, list);
    return true;
  }

  // --- 4. Inventory (Stok & Kalemler) Management ---
  function getInventory() {
    return getStorage(INVENTORY_KEY, defaultInventory);
  }

  function getInventoryItemById(id) {
    const list = getInventory();
    return list.find(item => item.id === id || item.code === id);
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
    setStorage(INVENTORY_KEY, list);
    return record;
  }

  function deleteInventoryItem(id) {
    let list = getInventory();
    list = list.filter(i => i.id !== id);
    setStorage(INVENTORY_KEY, list);
    return true;
  }

  // --- 5. Export / Backup / Restore DB ---
  function exportFullBackupJSON() {
    const backup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      proposals: getAllProposals(),
      customers: getCustomers(),
      inventory: getInventory(),
      draft: loadDraft()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YAKIN_GRUP_ERP_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFullBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.proposals && Array.isArray(data.proposals)) setStorage(PROPOSALS_KEY, data.proposals);
      if (data.customers && Array.isArray(data.customers)) setStorage(CUSTOMERS_KEY, data.customers);
      if (data.inventory && Array.isArray(data.inventory)) setStorage(INVENTORY_KEY, data.inventory);
      if (data.draft) setStorage(DRAFT_KEY, data.draft);
      return { success: true, message: 'Veritabanı başarıyla içe aktarıldı!' };
    } catch (e) {
      return { success: false, message: 'Geçersiz yedek dosyası: ' + e.message };
    }
  }

  // Run initial setup
  initDB();

  return {
    initDB,
    saveDraft,
    loadDraft,
    clearDraft,
    getAllProposals,
    getProposalById,
    saveProposal,
    updateProposalStatus,
    deleteProposal,
    getCustomers,
    getCustomerById,
    saveCustomer,
    deleteCustomer,
    getInventory,
    getInventoryItemById,
    saveInventoryItem,
    deleteInventoryItem,
    exportFullBackupJSON,
    importFullBackupJSON
  };
})();

// Export globally
if (typeof window !== 'undefined') {
  window.YakinERP = YakinERP;
}
