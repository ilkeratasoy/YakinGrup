/**
 * Yakın Grup ERP — %100 Canlı Bulut Veritabanı Motoru (Cloud-First DB)
 * Tüm Cari Kartlar, Teklif Arşivi ve Stok Takibi doğrudan merkezi bulutta saklanır.
 * Yerel hafızada veri tutulmaz; tüm bilgisayarlar ve cihazlar tek bir ortak canlı bulutu kullanır.
 */

const YakinERP = (function () {
  // Central Cloud REST API Endpoint for Yakın Grup
  const CLOUD_ENDPOINT = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a0332f06be0c30';

  // In-Memory Live Store (Always mirrors the online cloud)
  let cloudStore = {
    customers: [
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
    ],
    proposals: [],
    inventory: [
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
        gtip: '8541.43.00.00.00',
        description: 'TÜV Sertifikalı, UV ve Ozon Dayanımlı, Halojensiz'
      }
    ],
    updatedAt: new Date().toISOString()
  };

  let isSyncing = false;

  // Push in-memory data to Central Online Cloud
  async function pushToCloud() {
    try {
      const payload = {
        name: 'YakinGrup ERP Central Cloud Database',
        data: {
          updatedAt: new Date().toISOString(),
          customers: cloudStore.customers,
          proposals: cloudStore.proposals,
          inventory: cloudStore.inventory
        }
      };

      const res = await fetch(CLOUD_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        dispatchSyncEvent();
        return { success: true };
      }
    } catch (e) {
      console.warn('Cloud write warning:', e);
    }
    return { success: false };
  }

  // Fetch live online data from Central Cloud
  async function syncFromCloud(showToastNotice = false) {
    if (isSyncing) return;
    isSyncing = true;

    try {
      const res = await fetch(CLOUD_ENDPOINT, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const data = json.data || {};
        if (data.customers && Array.isArray(data.customers)) {
          cloudStore.customers = data.customers;
        }
        if (data.proposals && Array.isArray(data.proposals)) {
          cloudStore.proposals = data.proposals;
        }
        if (data.inventory && Array.isArray(data.inventory)) {
          cloudStore.inventory = data.inventory;
        }
        if (data.updatedAt) {
          cloudStore.updatedAt = data.updatedAt;
        }

        dispatchSyncEvent();

        if (showToastNotice && typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast('☁️ Canlı bulut veritabanı güncellendi!');
        }
      }
    } catch (e) {
      console.warn('Cloud fetch warning:', e);
    } finally {
      isSyncing = false;
    }
  }

  function dispatchSyncEvent() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yakin_erp_synced'));
    }
  }

  // Initialize Cloud Connection & Continuous Polling
  function initDB() {
    // 1. Initial live fetch
    syncFromCloud();

    // 2. Poll every 12 seconds for multi-device realtime synchronization
    setInterval(() => {
      syncFromCloud();
    }, 12000);

    // 3. Sync immediately when window/tab is focused
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        syncFromCloud();
      });
    }
  }

  // --- 1. Customers (Cari Kartlar) Management ---
  function getCustomers() {
    return cloudStore.customers || [];
  }

  function getCustomerById(id) {
    return (cloudStore.customers || []).find(c => c.id === id);
  }

  function saveCustomer(customerData) {
    const list = cloudStore.customers || [];
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
    cloudStore.customers = list;
    
    // Push directly to online cloud
    pushToCloud();
    return record;
  }

  function deleteCustomer(id) {
    cloudStore.customers = (cloudStore.customers || []).filter(c => c.id !== id);
    pushToCloud();
    return true;
  }

  // --- 2. Proposals / Documents Archive ---
  function getAllProposals() {
    return cloudStore.proposals || [];
  }

  function getProposalById(id) {
    return (cloudStore.proposals || []).find(p => p.id === id || p.docNo === id);
  }

  function saveProposal(proposalData) {
    const list = cloudStore.proposals || [];
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

    cloudStore.proposals = list;
    pushToCloud();
    return record;
  }

  function updateProposalStatus(docNo, newStatus) {
    const list = cloudStore.proposals || [];
    const item = list.find(p => p.docNo === docNo || p.id === docNo);
    if (item) {
      item.status = newStatus;
      item.updatedAt = new Date().toISOString();
      pushToCloud();
      return true;
    }
    return false;
  }

  function deleteProposal(idOrDocNo) {
    cloudStore.proposals = (cloudStore.proposals || []).filter(p => p.id !== idOrDocNo && p.docNo !== idOrDocNo);
    pushToCloud();
    return true;
  }

  // --- 3. Inventory (Stok Yönetimi) ---
  function getInventory() {
    return cloudStore.inventory || [];
  }

  function getInventoryItemById(id) {
    return (cloudStore.inventory || []).find(item => item.id === id || item.code === id);
  }

  function saveInventoryItem(itemData) {
    const list = cloudStore.inventory || [];
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

    cloudStore.inventory = list;
    pushToCloud();
    return record;
  }

  function deleteInventoryItem(id) {
    cloudStore.inventory = (cloudStore.inventory || []).filter(i => i.id !== id);
    pushToCloud();
    return true;
  }

  // --- 4. Export / Backup / Restore ---
  function exportFullBackupJSON() {
    const backup = {
      version: '3.0 (Cloud-First)',
      exportedAt: new Date().toISOString(),
      proposals: getAllProposals(),
      customers: getCustomers(),
      inventory: getInventory()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YAKIN_GRUP_CLOUD_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFullBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.proposals && Array.isArray(data.proposals)) cloudStore.proposals = data.proposals;
      if (data.customers && Array.isArray(data.customers)) cloudStore.customers = data.customers;
      if (data.inventory && Array.isArray(data.inventory)) cloudStore.inventory = data.inventory;
      pushToCloud();
      return { success: true, message: 'Veritabanı başarıyla içe aktarıldı ve buluta kaydedildi!' };
    } catch (e) {
      return { success: false, message: 'Geçersiz yedek dosyası: ' + e.message };
    }
  }

  // Draft helper for backward compatibility
  function saveDraft(stateData) {
    // Also save active document into proposals as Taslak in cloud
    if (stateData && stateData.docNo) {
      saveProposal(Object.assign({}, stateData, { status: 'Taslak' }));
    }
    return true;
  }

  function loadDraft() {
    return null;
  }

  function clearDraft() {}

  // Run initial cloud fetch
  initDB();

  return {
    initDB,
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

// Export globally
if (typeof window !== 'undefined') {
  window.YakinERP = YakinERP;
}
