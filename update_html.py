import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Splash Screen
splash_replacement = """    <div class="splash-split splash-4">
      <!-- Construction Panel -->
      <div class="splash-panel construction-panel" onclick="selectSector('construction')">
        <div class="panel-background" style="background-image: url('assets/images/construction_hero_1784577666966.png');"></div>
        <div class="panel-overlay"></div>
        <div class="panel-content">
          <div class="panel-badge" data-i18n="tag_construction">İNŞAAT & TAAHHÜT</div>
          <h2 class="panel-title" data-i18n="splash_const_title">Yakın İnşaat</h2>
          <button class="panel-btn"><span data-i18n="btn_explore">Keşfet</span><svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        </div>
      </div>

      <!-- Energy Panel -->
      <div class="splash-panel energy-panel" onclick="selectSector('energy')">
        <div class="panel-background" style="background-image: url('assets/images/energy_hero_1784577681830.png');"></div>
        <div class="panel-overlay"></div>
        <div class="panel-content">
          <div class="panel-badge" data-i18n="tag_energy">ENERJİ</div>
          <h2 class="panel-title" data-i18n="splash_energy_title">Yakın Enerji</h2>
          <button class="panel-btn"><span data-i18n="btn_explore">Keşfet</span><svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        </div>
      </div>

      <!-- Capital Panel -->
      <div class="splash-panel capital-panel" onclick="selectSector('capital')">
        <div class="panel-background" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Financial_District%2C_Singapore.jpg');"></div>
        <div class="panel-overlay"></div>
        <div class="panel-content">
          <div class="panel-badge" data-i18n="tag_capital">FİNANS & YATIRIM</div>
          <h2 class="panel-title" data-i18n="splash_capital_title">Yakın Capital</h2>
          <button class="panel-btn"><span data-i18n="btn_explore">Keşfet</span><svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        </div>
      </div>

      <!-- Technology Panel -->
      <div class="splash-panel technology-panel" onclick="selectSector('technology')">
        <div class="panel-background" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Racks_Amravati_Data_Center.jpg');"></div>
        <div class="panel-overlay"></div>
        <div class="panel-content">
          <div class="panel-badge" data-i18n="tag_technology">DİJİTAL & YZ</div>
          <h2 class="panel-title" data-i18n="splash_tech_title">Yakın Teknoloji</h2>
          <button class="panel-btn"><span data-i18n="btn_explore">Keşfet</span><svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        </div>
      </div>
    </div>"""

content = re.sub(r'<div class="splash-split">.*?</div>\s*<div class="splash-footer">', splash_replacement + '\n\n    <div class="splash-footer">', content, flags=re.DOTALL)

# 2. Add Portals for Capital and Technology right after Energy portal
capital_technology_portals = """
  <!-- Capital Portal Layout -->
  <main id="capital-portal" class="portal-view hidden-element">
    <section class="hero-section">
      <div class="hero-slider" id="capital-hero-slider">
        <div class="hero-slide active">
          <div class="slide-bg" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Financial_District%2C_Singapore.jpg');"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>Yakın Capital</h1>
            <p>Proje Finansmanı, Leasing ve Yatırım Ortaklıkları</p>
          </div>
        </div>
      </div>
    </section>
    <section id="capital-services-sec" class="services-section bg-light py-large">
      <div class="container">
        <div class="text-center mb-large">
          <div class="section-badge">HİZMETLERİMİZ</div>
          <h2 class="section-heading">Finansal Çözümlerimiz</h2>
        </div>
        <div class="services-tabs-container">
          <div class="services-tabs-menu" id="capital-services-menu"></div>
          <div class="services-tab-content-wrapper" id="capital-services-details"></div>
        </div>
      </div>
    </section>
  </main>

  <!-- Technology Portal Layout -->
  <main id="technology-portal" class="portal-view hidden-element">
    <section class="hero-section">
      <div class="hero-slider" id="tech-hero-slider">
        <div class="hero-slide active">
          <div class="slide-bg" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Racks_Amravati_Data_Center.jpg');"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>Yakın Teknoloji</h1>
            <p>Dijital Hakediş, Yapay Zekâ ve BIM Çözümleri</p>
          </div>
        </div>
      </div>
    </section>
    <section id="tech-services-sec" class="services-section bg-light py-large">
      <div class="container">
        <div class="text-center mb-large">
          <div class="section-badge">HİZMETLERİMİZ</div>
          <h2 class="section-heading">Teknoloji Çözümlerimiz</h2>
        </div>
        <div class="services-tabs-container">
          <div class="services-tabs-menu" id="tech-services-menu"></div>
          <div class="services-tab-content-wrapper" id="tech-services-details"></div>
        </div>
      </div>
    </section>
  </main>
"""

content = content.replace('</main>\n\n  <!-- Global Partners logo slider marquee (Common Section) -->', '</main>\n' + capital_technology_portals + '\n  <!-- Global Partners logo slider marquee (Common Section) -->')

# Update contact form sectors
contact_options_replacement = """
              <option value="insaat" data-i18n="tag_construction">Yakın İnşaat</option>
              <option value="enerji" data-i18n="tag_energy">Yakın Enerji</option>
              <option value="capital">Yakın Capital</option>
              <option value="teknoloji">Yakın Teknoloji</option>
"""
content = re.sub(r'<select id="c-sector">.*?</select>', f'<select id="c-sector">{contact_options_replacement}            </select>', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html")
