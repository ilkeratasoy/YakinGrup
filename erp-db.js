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
  const defaultProposals = [
    {
      id: 'prop-101',
      docNo: 'YKN-TEK-2026-0816',
      docType: 'hybrid',
      title: '1.2 MWp Endüstriyel Çatı Tipi Güneş Enerji Santrali (GES) EPC Anahtar Teslim Kurulumu',
      clientCompany: 'Atlas Holding A.Ş.',
      clientName: 'Sayın Ahmet Yılmaz — Yatırımlar Direktörü',
      currency: 'USD',
      grandTotal: 228798,
      date: '2026-08-16',
      validityDays: 30,
      status: 'Onaylandı',
      updatedAt: new Date().toISOString(),
      createdAt: '2026-08-16T10:00:00Z',
      fullState: {
        id: 'prop-101',
        mode: 'hybrid',
        company: 'enerji',
        docNo: 'YKN-TEK-2026-0816',
        date: '2026-08-16',
        validityDays: 30,
        currency: 'USD',
        clientCompany: 'Atlas Holding A.Ş.',
        clientName: 'Sayın Ahmet Yılmaz — Yatırımlar Direktörü',
        clientLocation: 'Kocaeli Dilovası OSB 4. Cadde No: 12 / Türkiye',
        subject: '1.2 MWp Endüstriyel Çatı Tipi Güneş Enerji Santrali (GES) EPC Anahtar Teslim Kurulumu Teknik ve İdari Şartnamesi',
        intro: 'İşbu şartname ve teklif dosyası; Yakın Grup tarafından taahhüt edilen mühendislik, satınalma, montaj, test-devreye alma, yasal kurum onayları ve kesin kabul süreçlerinin teknik ve idari esaslarını belirler.',
        discountRate: 5,
        vatRate: 20,
        stampVisible: true,
        stampMode: 'both',
        author: 'ilker',
        bankKey: 'both',
        showBankQr: true,
        clientSigFormat: 'company',
        paymentTerms: '%30 Sözleşme İmzasında Peşinat / Avans, %50 Saha Montajı ve Teslimatı, %20 Geçici Kabul ve Tedaş Onayında',
        deliveryTime: '60 İş Günü',
        warranty: '2 Yıl Sistem Garantisi & 25 Yıl Lineer Performans Garantisi',
        status: 'Onaylandı',
        productSpecs: '• Güneş Panelleri: Tier-1 Bloomberg listesinde yer alan, minimum 550Wp N-Type TOPCon hücre teknolojili, 30 yıl lineer performans garantili fotovoltaik modüller.\n• İnvertörler: %98.6 maksimum verimlilik, 10 MPPT, IP66 dış ortam korumalı ve AFCI ark algılama özellikli üç fazlı string eviriciler.\n• Konstrüksiyon: EN AW-6063 T6 eloksallı alüminyum profiller ve A2-70 paslanmaz çelik bağlantı elemanları.',
        items: [
          { id: 101, name: '550W Tier-1 Monokristal N-Type PV Panel (Tier-1 Bloomberg)', desc: 'MBB, %22.8 Verim, 30 Yıl Lineer Performans Garantisi, IP68 Bağlantı Kutusu', gtip: '8541.43.00.00.00', qty: 2182, unit: 'Adet', price: 95 },
          { id: 102, name: '100 kW Üç Fazlı String Solar İnvertör (10 MPPT, IP66)', desc: 'AFCI Ark Koruması, Wi-Fi/Ethernet Entegre İzleme, %98.6 Verim', gtip: '8504.40.88.00.00', qty: 10, unit: 'Adet', price: 4150 },
          { id: 103, name: 'Statik Güçlendirilmiş Kenet Çatı Alüminyum Konstrüksiyon', desc: 'EN AW-6063 T6 Eloksallı Alüminyum Profil Seti ve Paslanmaz Civata Takımı', gtip: '7610.90.90.00.00', qty: 1200, unit: 'kWp', price: 22 },
          { id: 104, name: 'Mühendislik, TEDAŞ Onayı, Statik Proje ve Saha Kurulumu', desc: 'Anahtar teslim EPC, test-ölçüm, devreye alma ve kesin kabul hizmetleri', gtip: '9999.99.99.00.00', qty: 1200, unit: 'kWp', price: 28 }
        ],
        clauses: [
          { id: 1, title: 'Amaç ve Kapsam', body: 'Bu teknik şartname, İşveren mülkiyetindeki tesis çatısına kurulacak olan 1.2 MWp kapasiteli Güneş Enerji Santrali (GES) projesinin statik analizleri, mühendislik onayları, malzeme temini, montaj, elektriksel bağlantı, test-devreye alma ve geçici kabul süreçlerini eksiksiz kapsar.' },
          { id: 2, title: 'Geçerli Standartlar ve Kalite Uygunluğu', body: 'Tüm ekipman ve işçilikler; TSE, IEC (IEC 61215, IEC 61730, IEC 62109), CE ve yürürlükteki Elektrik Piyasasında Lisanssız Elektrik Üretim Yönetmeliği ile TEDAŞ şartnamelerine tam uyumlu olacaktır.' },
          { id: 3, title: 'Fotovoltaik (PV) Modül Şartları', body: 'Kullanılacak paneller Tier-1 sınıfında, minimum 550Wp gücünde, Monokristal N-Type / TOPCon hücre teknolojisine sahip olacaktır. Paneller 12 yıl ürün, 25 yıl en az %84.8 lineer performans garantili olacaktır.' },
          { id: 4, title: 'İnvertör (Evirici) ve Pano Sistemi', body: 'İnvertörler üç fazlı, minimum %98.6 verimli, IP66 koruma sınıfında ve uzaktan izleme (Wi-Fi/4G) modülüne sahip olacaktır. AC/DC parafudrlar ve koruma panoları tip testli olacaktır.' },
          { id: 5, title: 'Mekanik Konstrüksiyon ve Statik Taşıyıcılar', body: 'Taşıyıcı alüminyum ve sıcak daldırma galvanizli çelik konstrüksiyon, çatı tipine uygun özel kenet/sandviç aparatları ile su yalıtımını bozmadan monte edilecek; rüzgar ve kar yükü statik hesapları onaylatılacaktır.' },
          { id: 6, title: 'Test, Devreye Alma ve Geçici Kabul', body: 'Yüklenici, TEDAŞ ve Dağıtım Şirketi kabul heyetinin onaylarını alarak santrali anahtar teslim işletmeye alacaktır. Termal kamera, IV-Curve ve izolasyon test raporları İşveren\'e dosya halinde teslim edilecektir.' }
        ]
      }
    },
    {
      id: 'prop-102',
      docNo: 'YKN-PRF-2026-0902',
      docType: 'proforma',
      title: 'Solar Module Export Proforma Invoice (CIF Hamburg)',
      clientCompany: 'Solaris Global Energy LLC',
      clientName: 'Mr. David Miller — Procurement Director',
      currency: 'USD',
      grandTotal: 145000,
      date: '2026-09-02',
      validityDays: 15,
      status: 'İletildi',
      updatedAt: new Date().toISOString(),
      createdAt: '2026-09-02T14:30:00Z',
      fullState: {
        id: 'prop-102',
        mode: 'proforma',
        company: 'group',
        docNo: 'YKN-PRF-2026-0902',
        date: '2026-09-02',
        validityDays: 15,
        currency: 'USD',
        clientCompany: 'Solaris Global Energy LLC',
        clientName: 'Mr. David Miller — Procurement Director',
        clientLocation: '1209 Orange St, Wilmington, DE 19801, USA',
        subject: 'Export Proforma Invoice - Tier-1 TOPCon Solar PV Modules Supply (CIF Hamburg)',
        intro: 'We are pleased to submit our export proforma invoice for the international supply of Tier-1 solar photovoltaic modules in accordance with Incoterms 2020 rules.',
        discountRate: 0,
        vatRate: 0,
        stampVisible: true,
        stampMode: 'both',
        author: 'ilker',
        bankKey: 'both',
        showBankQr: true,
        incoterm: 'CIF',
        origin: 'Türkiye (TR)',
        portLoading: 'Istanbul Port / Ambarlı (TR)',
        portDischarge: 'Hamburg Port (DE)',
        swift: 'YAPITRISXXX',
        exportPayment: '%30 Advance T/T, %70 against B/L Copy',
        paymentTerms: '%30 Advance T/T with Proforma Confirmation, %70 against Bill of Lading (B/L) copy',
        deliveryTime: '20 Working Days',
        warranty: '12 Years Product Warranty & 30 Years Linear Power Output Warranty',
        status: 'İletildi',
        productSpecs: '• High efficiency TOPCon Solar PV Panels with IEC, CE and TÜV certifications.',
        items: [
          { id: 201, name: '550W Tier-1 Monokristal N-Type TOPCon PV Module', desc: 'Efficiency: 22.8%, MBB, 1500V DC System Voltage, IP68 Junction Box', gtip: '8541.43.00.00.00', qty: 1526, unit: 'Adet', price: 95 }
        ],
        clauses: [
          { id: 1, title: 'Incoterms & Shipping Terms', body: 'Delivery term is CIF Hamburg Port (Germany) as per Incoterms 2020. Insurance coverage includes Institute Cargo Clauses (A) 110% of CIF value.' },
          { id: 2, title: 'Documentation & Inspection', body: 'Commercial Invoice, Packing List, Certificate of Origin (EUR.1 / Form A), Clean on Board Bill of Lading and Flash Test Data Reports will be provided.' }
        ]
      }
    }
  ];
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
      setLocal(PROPOSALS_KEY, defaultProposals);
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
  // Prefix mapping per Document Format
  const MODE_PREFIXES = {
    prop: 'YKN-TEK',
    teklif: 'YKN-TEK',
    spec: 'YKN-SRT',
    sartname: 'YKN-SRT',
    hybrid: 'YKN-PKT',
    paket: 'YKN-PKT',
    proforma: 'YKN-PRF',
    dispatch: 'YKN-IRS',
    irsaliye: 'YKN-IRS',
    invoice: 'YKN-FAT',
    fatura: 'YKN-FAT'
  };

  function getNextDocNo(mode, targetDate = null) {
    const prefix = MODE_PREFIXES[mode] || 'YKN-TEK';
    const d = targetDate ? new Date(targetDate) : new Date();
    
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateTag = `${yyyy}${mm}${dd}`; // e.g. 20260911
    const basePrefix = `${prefix}-${dateTag}`;

    const list = getAllProposals();
    let maxSeq = 0;

    list.forEach(p => {
      const docNo = p.docNo || (p.fullState ? p.fullState.docNo : '');
      if (docNo) {
        if (docNo.startsWith(basePrefix + '-')) {
          const seqPart = parseInt(docNo.replace(basePrefix + '-', ''), 10);
          if (!isNaN(seqPart) && seqPart > maxSeq) {
            maxSeq = seqPart;
          }
        } else if (docNo === basePrefix) {
          if (maxSeq < 1) maxSeq = 1;
        }
      }
    });

    const nextSeq = String(maxSeq + 1).padStart(2, '0');
    return `${basePrefix}-${nextSeq}`;
  }

  function getAllProposals() {
    return getLocal(PROPOSALS_KEY, defaultProposals);
  }

  function getProposalById(id) {
    return getAllProposals().find(p => p.id === id || p.docNo === id);
  }

  function saveProposal(proposalData, forceNew = false) {
    const list = getAllProposals();
    const mode = proposalData.mode || proposalData.docType || 'prop';
    
    // Ensure document has a valid, non-empty serial number
    let docNo = (proposalData.docNo || '').trim();
    if (!docNo || forceNew) {
      docNo = getNextDocNo(mode, proposalData.date);
      proposalData.docNo = docNo;
    }

    // Check if updating existing record
    let existingIdx = -1;
    if (!forceNew) {
      existingIdx = list.findIndex(p => p.id === proposalData.id || p.docNo === docNo);
    }

    // Compute accurate grand total from lines
    let computedTotal = parseFloat(proposalData.grandTotal) || 0;
    if (computedTotal === 0 && Array.isArray(proposalData.items)) {
      let sub = 0;
      proposalData.items.forEach(it => {
        sub += (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0);
      });
      const disc = sub * ((parseFloat(proposalData.discountRate) || 0) / 100);
      const net = sub - disc;
      const vat = net * ((parseFloat(proposalData.vatRate) || 0) / 100);
      computedTotal = net + vat;
    }

    const uniqueId = (existingIdx >= 0 && !forceNew) 
      ? list[existingIdx].id 
      : (proposalData.id && !list.some(p => p.id === proposalData.id) ? proposalData.id : 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));

    proposalData.id = uniqueId;
    proposalData.docNo = docNo;
    proposalData.grandTotal = computedTotal;

    const record = {
      id: uniqueId,
      docNo: docNo,
      docType: mode,
      title: proposalData.subject || 'Başlıksız Belge',
      clientCompany: proposalData.clientCompany || 'Müşteri',
      clientName: proposalData.clientName || '',
      currency: proposalData.currency || 'TRY',
      grandTotal: computedTotal,
      date: proposalData.date || new Date().toISOString().split('T')[0],
      validityDays: parseInt(proposalData.validityDays, 10) || 30,
      status: proposalData.status || 'Taslak',
      updatedAt: new Date().toISOString(),
      createdAt: (existingIdx >= 0 && !forceNew) ? (list[existingIdx].createdAt || new Date().toISOString()) : new Date().toISOString(),
      fullState: JSON.parse(JSON.stringify(proposalData))
    };

    if (existingIdx >= 0 && !forceNew) {
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
    getNextDocNo,
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
