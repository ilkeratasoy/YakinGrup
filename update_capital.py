import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

capital_html_new = """
  <!-- Capital Portal Layout -->
  <main id="capital-portal" class="portal-view hidden-element">
    <section class="hero-section">
      <div class="hero-slider" id="capital-hero-slider">
        <div class="hero-slide active">
          <div class="slide-bg" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Financial_District%2C_Singapore.jpg');"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>Yakın Capital</h1>
            <p>Proje Finansmanı, Danışmanlık ve Yatırım Çözümleri Platformu</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Legal / Position Info -->
    <section class="about-section container py-large">
      <div class="section-grid" style="grid-template-columns: 1fr;">
        <div class="about-info" style="max-width: 800px; margin: 0 auto; text-align: center;">
          <div class="section-badge">CAPITAL ADVISORY</div>
          <h2 class="section-heading">Çok Disiplinli Finansman Yapılandırması</h2>
          <p class="about-lead">Yakın Capital, klasik bir finans kuruluşu değil; grubumuzun projelerini uçtan uca geliştiren, finansman çözümleri üreten bir danışmanlık ve yatırım platformudur.</p>
          <p class="about-body">
            Vizyonumuz sadece inşaat ve enerji projeleri geliştirmek değil; aynı zamanda bu projelerin finansmanını organize etmek, riskleri yönetmek ve sürdürülebilir nakit akış modelleri oluşturmaktır. Bankalar, GYO'lar ve leasing kuruluşları için sadece kredi talep eden bir yapı değil, projeyi finansal açıdan yöneten güvenilir bir çözüm ortağıyız.
          </p>
          <p class="about-body" style="font-size: 0.85rem; color: #718096; margin-top: 1rem;">
            * Yakın Capital, lisans gerektiren portföy yönetimi veya finansal aracılık faaliyetleri yürütmez. Odak noktamız "Proje Finansmanı Danışmanlığı ve Yapılandırma"dır.
          </p>
        </div>
      </div>
    </section>

    <!-- Faaliyet Alanları & Vizyon (Cards) -->
    <section id="capital-services-sec" class="services-section bg-light py-large">
      <div class="container">
        <div class="text-center mb-large">
          <div class="section-badge">FAALİYET ALANLARI</div>
          <h2 class="section-heading">Finansal Çözümlerimiz</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="color: #1e3a8a; margin-bottom: 1rem;">Finansman ve Kredi</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              <li>✔️ Banka proje finansmanı</li>
              <li>✔️ Leasing organizasyonu</li>
              <li>✔️ Hakediş bazlı finansman modelleri</li>
            </ul>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="color: #1e3a8a; margin-bottom: 1rem;">Yatırım ve Yapılandırma</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              <li>✔️ GYO İş birlikleri</li>
              <li>✔️ Girişim sermayesi ilişkileri</li>
              <li>✔️ SPV (Özel Amaçlı Şirket) kurulumu</li>
            </ul>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="color: #1e3a8a; margin-bottom: 1rem;">Risk ve Danışmanlık</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              <li>✔️ Nakit akışı modelleme</li>
              <li>✔️ Sigorta ve teminat çözümleri</li>
              <li>✔️ Finansal fizibilite danışmanlığı</li>
            </ul>
          </div>
        </div>

        <div class="text-center mb-large mt-large">
          <div class="section-badge">STRATEJİ</div>
          <h2 class="section-heading">Uzun Vadeli Vizyonumuz</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div style="background: #f8fafc; padding: 2rem; border-left: 4px solid #3b82f6;">
            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">1. Aşama (Bugün)</h3>
            <ul style="list-style: none; padding: 0; color: #4a5568;">
              <li>• Bankalarla stratejik iş birlikleri</li>
              <li>• Leasing şirketleriyle çerçeve anlaşmalar</li>
              <li>• Sigorta şirketleriyle entegrasyon</li>
            </ul>
          </div>
          <div style="background: #f8fafc; padding: 2rem; border-left: 4px solid #1e3a8a;">
            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">2. Aşama (Advisory)</h3>
            <ul style="list-style: none; padding: 0; color: #4a5568;">
              <li>• Proje finansmanı danışmanlığı</li>
              <li>• Finansal modelleme</li>
              <li>• Risk yönetimi</li>
            </ul>
          </div>
          <div style="background: #f8fafc; padding: 2rem; border-left: 4px solid #172554;">
            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">3. Aşama (Fund)</h3>
            <ul style="list-style: none; padding: 0; color: #4a5568;">
              <li>• Gayrimenkul yatırım fonlarıyla projeler</li>
              <li>• Yabancı yatırımcıların katılımı</li>
              <li>• Proje bazlı yatırım platformu</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
"""

content = re.sub(r'<!-- Capital Portal Layout -->.*?<!-- Technology Portal Layout -->', capital_html_new + '\n  <!-- Technology Portal Layout -->', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated capital content in index.html")
