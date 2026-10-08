-- ========================================================================
-- YAKIN GRUP DATA PLATFORMU — SUPABASE (POSTGRESQL) SCHEMA
-- ========================================================================
-- Bu SQL kodunu Supabase Dashboard > SQL Editor alanına yapıştırıp "RUN"
-- butonuna basarak tüm tabloları, RLS yetkilerini ve Storage'ı oluşturabilirsiniz.
-- ========================================================================

-- 1. İNŞAAT PROJELERİ TABLOSU
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  date TEXT DEFAULT '',
  code TEXT DEFAULT '',
  name TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'Kentsel Dönüşüm',
  client TEXT DEFAULT '',
  location TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Planlama',
  notes TEXT DEFAULT '',
  district TEXT DEFAULT '',
  neighborhood TEXT DEFAULT '',
  ada TEXT DEFAULT '',
  parsel TEXT DEFAULT '',
  area TEXT DEFAULT '',
  municipality TEXT DEFAULT '',
  imar_url TEXT DEFAULT '',
  taks TEXT DEFAULT '',
  kaks TEXT DEFAULT '',
  floors TEXT DEFAULT '',
  setbacks TEXT DEFAULT '',
  nizam TEXT DEFAULT 'Ayrık Nizam',
  building_name TEXT DEFAULT '',
  unit_count TEXT DEFAULT '',
  manager_name TEXT DEFAULT '',
  manager_phone TEXT DEFAULT '',
  manager_email TEXT DEFAULT '',
  manager_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CARİ KARTLARI TABLOSU
CREATE TABLE IF NOT EXISTS public.accounts (
  id TEXT PRIMARY KEY,
  company TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'Müşteri',
  related_project TEXT DEFAULT '',
  related_projects JSONB DEFAULT '[]'::jsonb,
  contact TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  website TEXT DEFAULT '',
  tax_office TEXT DEFAULT '',
  tax_no TEXT DEFAULT '',
  tax TEXT DEFAULT '',
  iban TEXT DEFAULT '',
  address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  receivable NUMERIC DEFAULT 0,
  collected NUMERIC DEFAULT 0,
  payable NUMERIC DEFAULT 0,
  balance NUMERIC DEFAULT 0,
  expense_items JSONB DEFAULT '[]'::jsonb,
  documents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ALIŞ FATURALARI TABLOSU
CREATE TABLE IF NOT EXISTS public.invoices (
  id TEXT PRIMARY KEY,
  reg_date TEXT DEFAULT '',
  date TEXT DEFAULT '',
  no TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT '',
  vendor TEXT DEFAULT '',
  tax TEXT DEFAULT '',
  project TEXT DEFAULT '',
  subtotal NUMERIC DEFAULT 0,
  vat NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  due_date TEXT DEFAULT '',
  status TEXT DEFAULT 'Bekliyor',
  method TEXT DEFAULT 'Banka Havale / EFT',
  description TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  file_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROJE DÖKÜMANLARI TABLOSU
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT '',
  project TEXT DEFAULT '',
  date TEXT DEFAULT '',
  expiry TEXT DEFAULT '',
  url TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TO DO LIST TABLOSU
CREATE TABLE IF NOT EXISTS public.todos (
  id TEXT PRIMARY KEY,
  created_at_date TEXT DEFAULT '',
  title TEXT NOT NULL,
  project TEXT DEFAULT 'Genel',
  priority TEXT DEFAULT 'Normal',
  assignee TEXT DEFAULT '',
  due_date TEXT DEFAULT '',
  completed BOOLEAN DEFAULT false,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. STOK TABLOSU
CREATE TABLE IF NOT EXISTS public.stock (
  id TEXT PRIMARY KEY,
  code TEXT DEFAULT '',
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Demir & Çelik',
  qty NUMERIC DEFAULT 0,
  unit TEXT DEFAULT 'Adet',
  price TEXT DEFAULT '',
  total_value TEXT DEFAULT '',
  location TEXT DEFAULT '',
  status TEXT DEFAULT 'Yeterli',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. MÜŞTERİLER / KARTVİZİTLER TABLOSU
CREATE TABLE IF NOT EXISTS public.cards (
  id TEXT PRIMARY KEY,
  date TEXT DEFAULT '',
  name TEXT NOT NULL,
  company TEXT DEFAULT '',
  role TEXT DEFAULT '',
  sector TEXT DEFAULT 'İnşaat & Taahhüt',
  mobile TEXT DEFAULT '',
  office TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  category TEXT DEFAULT 'Müşteri',
  address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) VE ANON ERİŞİM İZİNLERİ
-- ========================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon public access on projects" ON public.projects;
CREATE POLICY "Anon public access on projects" ON public.projects FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on accounts" ON public.accounts;
CREATE POLICY "Anon public access on accounts" ON public.accounts FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on invoices" ON public.invoices;
CREATE POLICY "Anon public access on invoices" ON public.invoices FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on documents" ON public.documents;
CREATE POLICY "Anon public access on documents" ON public.documents FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on todos" ON public.todos;
CREATE POLICY "Anon public access on todos" ON public.todos FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on stock" ON public.stock;
CREATE POLICY "Anon public access on stock" ON public.stock FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon public access on cards" ON public.cards;
CREATE POLICY "Anon public access on cards" ON public.cards FOR ALL TO anon USING (true) WITH CHECK (true);

-- ========================================================================
-- REALTIME YAYIN AYARLARI (Canlı senkronizasyon için)
-- ========================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'projects'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'accounts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.accounts;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'invoices'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.invoices;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'documents'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'todos'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.todos;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'stock'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.stock;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'cards'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cards;
  END IF;
END $$;

-- ========================================================================
-- STORAGE BUCKET (Belgeler, Vergi Levhaları, Faturalar)
-- ========================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('yakin-docs', 'yakin-docs', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anon public upload on yakin-docs" ON storage.objects;
CREATE POLICY "Anon public upload on yakin-docs" ON storage.objects 
FOR INSERT TO anon WITH CHECK (bucket_id = 'yakin-docs');

DROP POLICY IF EXISTS "Anon public read on yakin-docs" ON storage.objects;
CREATE POLICY "Anon public read on yakin-docs" ON storage.objects 
FOR SELECT TO anon USING (bucket_id = 'yakin-docs');

DROP POLICY IF EXISTS "Anon public delete on yakin-docs" ON storage.objects;
CREATE POLICY "Anon public delete on yakin-docs" ON storage.objects 
FOR DELETE TO anon WITH CHECK (bucket_id = 'yakin-docs');
