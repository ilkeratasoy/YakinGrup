import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Group Companies with Images
group_replacement = """
  <!-- YAKIN GROUP Hiyerarşisi (Common Section) -->
  <section id="group-companies" class="group-section py-large container hidden-element">
    <div class="text-center mb-large">
      <div class="section-badge">YAKIN GROUP</div>
      <h2 class="section-heading">Grup Şirketlerimiz</h2>
      <p class="section-subtitle">Çok disiplinli bir proje geliştirme grubu olarak, inşaattan finansmana uçtan uca çözümler sunuyoruz.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; position: relative; height: 200px;" onclick="selectSector('construction')">
        <div style="position: absolute; inset: 0; background: url('assets/images/construction_hero_1784577666966.png') center/cover; filter: brightness(0.6);"></div>
        <div style="position: relative; z-index: 10; padding: 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">🏗️ Yakın Construction</h3>
          <p style="font-size: 0.95rem; opacity: 0.9;">Kentsel Dönüşüm, Taahhüt ve Proje Geliştirme</p>
        </div>
      </div>
      
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; position: relative; height: 200px;" onclick="selectSector('energy')">
        <div style="position: absolute; inset: 0; background: url('assets/images/energy_hero_1784577681830.png') center/cover; filter: brightness(0.6);"></div>
        <div style="position: relative; z-index: 10; padding: 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">⚡ Yakın Energy</h3>
          <p style="font-size: 0.95rem; opacity: 0.9;">Yenilenebilir Enerji ve EPC Çözümleri</p>
        </div>
      </div>
      
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; position: relative; height: 200px;" onclick="selectSector('capital')">
        <div style="position: absolute; inset: 0; background: url('assets/images/yakin_capital_hero.png') center/cover; filter: brightness(0.6);"></div>
        <div style="position: relative; z-index: 10; padding: 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">💼 Yakın Capital</h3>
          <p style="font-size: 0.95rem; opacity: 0.9;">Proje Finansmanı, Leasing ve Yatırım Çözümleri</p>
        </div>
      </div>
      
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; position: relative; height: 200px;" onclick="selectSector('technology')">
        <div style="position: absolute; inset: 0; background: url('assets/images/yakin_technology_hero.png') center/cover; filter: brightness(0.6);"></div>
        <div style="position: relative; z-index: 10; padding: 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">💻 Yakın Technology</h3>
          <p style="font-size: 0.95rem; opacity: 0.9;">Dijital Proje Yönetimi ve Yapay Zekâ</p>
        </div>
      </div>
      
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; height: 200px;">
        <div style="position: absolute; inset: 0; background: url('assets/images/yakin_ventures_hero.png') center/cover; filter: brightness(0.5) grayscale(50%);"></div>
        <div style="position: relative; z-index: 10; padding: 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; height: 100%;">
          <div class="badge-soon" style="position: absolute; top: 1rem; right: 1rem; margin:0;">YAKINDA</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">🚀 Yakın Ventures</h3>
          <p style="font-size: 0.95rem; opacity: 0.9;">Küresel Girişim ve Ölçeklenebilir Yatırımlar</p>
        </div>
      </div>
    </div>
  </section>
"""
content = re.sub(r'<!-- YAKIN GROUP Hiyerarşisi \(Common Section\) -->.*?</section>', group_replacement, content, flags=re.DOTALL)

# 2. Update Technology Portal
tech_html = """
  <!-- Technology Portal Layout -->
  <main id="technology-portal" class="portal-view hidden-element">
    <section class="hero-section">
      <div class="hero-slider" id="tech-hero-slider">
        <div class="hero-slide active">
          <div class="slide-bg" style="background-image: url('assets/images/yakin_technology_hero.png');"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>Yakın Teknoloji</h1>
            <p>Dijital Hakediş, Yapay Zekâ, BIM ve Yakın Platform İleri Seviye Proje Yönetimi</p>
          </div>
        </div>
      </div>
    </section>
    
    <section id="tech-services-sec" class="services-section bg-light py-large">
      <div class="container">
        <div class="text-center mb-large">
          <div class="section-badge">DİJİTAL DÖNÜŞÜM</div>
          <h2 class="section-heading">Geleceğin Proje Yönetimi</h2>
          <p class="section-subtitle mt-medium">Ağır sanayi, enerji ve altyapı projelerini ileri teknoloji ile uçtan uca dijitalleştiriyoruz.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-bottom: 4px solid #8b5cf6;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">📊</div>
            <h3 style="color: #4c1d95; margin-bottom: 1rem; font-size: 1.35rem;">Dijital Hakediş</h3>
            <p style="color: #4a5568; line-height: 1.6;">Karmaşık taşeron ve malzeme süreçlerini otomatize ederek, sıfır hata ile anlık, şeffaf hakediş onay ve ödeme altyapıları kuruyoruz.</p>
          </div>
          
          <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-bottom: 4px solid #8b5cf6;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧠</div>
            <h3 style="color: #4c1d95; margin-bottom: 1rem; font-size: 1.35rem;">Yapay Zekâ</h3>
            <p style="color: #4a5568; line-height: 1.6;">Şantiye verimliliğini makine öğrenmesi ile analiz ediyor, iş güvenliği risklerini öngörüyor ve maliyet artışlarını önceden uyaran yapay zeka modelleri geliştiriyoruz.</p>
          </div>
          
          <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-bottom: 4px solid #8b5cf6;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏗️</div>
            <h3 style="color: #4c1d95; margin-bottom: 1rem; font-size: 1.35rem;">BIM Entegrasyonu</h3>
            <p style="color: #4a5568; line-height: 1.6;">Building Information Modeling (BIM) standartlarında 5D (Zaman+Maliyet) dijital ikizler oluşturarak yapı ömrü boyunca kusursuz veri yönetimi sağlıyoruz.</p>
          </div>
          
          <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-bottom: 4px solid #8b5cf6;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">📱</div>
            <h3 style="color: #4c1d95; margin-bottom: 1rem; font-size: 1.35rem;">Yakın Platform</h3>
            <p style="color: #4a5568; line-height: 1.6;">İleri seviye proje yönetim yazılımımız olan "Yakın Platform" ile tüm mühendislik, satınalma ve saha koordinasyonunu tek bir ekrana taşıyoruz.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
content = re.sub(r'<!-- Technology Portal Layout -->.*?</main>', tech_html, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Technology Portal & Group Companies images")
