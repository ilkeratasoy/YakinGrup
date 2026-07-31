import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

group_section = """
  <!-- YAKIN GROUP Hiyerarşisi (Common Section) -->
  <section id="group-companies" class="group-section py-large container hidden-element">
    <div class="text-center mb-large">
      <div class="section-badge">YAKIN GROUP</div>
      <h2 class="section-heading">Grup Şirketlerimiz</h2>
      <p class="section-subtitle">Çok disiplinli bir proje geliştirme grubu olarak, inşaattan finansmana uçtan uca çözümler sunuyoruz.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; cursor: pointer;" onclick="selectSector('construction')">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #2b6cb0;">🏗️ Yakın Construction</h3>
        <p style="color: #4a5568; font-size: 0.95rem;">Kentsel Dönüşüm, Taahhüt ve Proje Geliştirme</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; cursor: pointer;" onclick="selectSector('energy')">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #38a169;">⚡ Yakın Energy</h3>
        <p style="color: #4a5568; font-size: 0.95rem;">Yenilenebilir Enerji ve EPC Çözümleri</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; cursor: pointer;" onclick="selectSector('capital')">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1e3a8a;">💼 Yakın Capital</h3>
        <p style="color: #4a5568; font-size: 0.95rem;">Proje Finansmanı, Leasing ve Yatırım Çözümleri</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; cursor: pointer;" onclick="selectSector('technology')">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #4c1d95;">💻 Yakın Technology</h3>
        <p style="color: #4a5568; font-size: 0.95rem;">Dijital Proje Yönetimi ve Yapay Zekâ</p>
      </div>
      <div style="border: 1px dashed #cbd5e0; border-radius: 8px; padding: 1.5rem; background: #f8fafc;">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #a0aec0;">🚀 Yakın Ventures</h3>
        <p style="color: #718096; font-size: 0.95rem;">(Yakında) Küresel Girişim ve Ölçeklenebilir Yatırımlar</p>
      </div>
    </div>
  </section>
"""

content = content.replace('<!-- Global Partners logo slider marquee (Common Section) -->', group_section + '\n  <!-- Global Partners logo slider marquee (Common Section) -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated group section")
