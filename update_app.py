import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update selectSector function
select_sector_replacement = """function selectSector(sectorName) {
  activeSector = sectorName;
  sessionStorage.setItem('yakin_sector', sectorName);
  
  // Hide splash screen panel
  const splash = document.getElementById('splash-screen');
  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.classList.add('hidden-element');
  }, 600);

  // Body classes
  document.body.classList.remove('loading-state');
  
  const portals = ['construction-portal', 'energy-portal', 'capital-portal', 'technology-portal'];
  portals.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.classList.add('hidden-element');
  });

  const activePortal = document.getElementById(sectorName + '-portal');
  if(activePortal) activePortal.classList.remove('hidden-element');

  const themes = ['theme-construction', 'theme-energy', 'theme-capital', 'theme-technology'];
  document.body.classList.remove(...themes);
  document.body.classList.add('theme-' + sectorName);

  const header = document.getElementById('main-header');
  const partnersSec = document.getElementById('partners');
  const marketSec = document.getElementById('marketplace');
  const contactSec = document.getElementById('contact');
  const footer = document.querySelector('.global-footer');

  header.classList.remove('hidden-element');
  partnersSec.classList.remove('hidden-element');
  marketSec.classList.remove('hidden-element');
  contactSec.classList.remove('hidden-element');
  footer.classList.remove('hidden-element');

  const marqueeConst = document.getElementById('marquee-construction');
  const marqueeEnergy = document.getElementById('marquee-energy');
  const badge = document.getElementById('partners-badge');
  const title = document.getElementById('partners-title');
  const sub = document.getElementById('partners-subtitle');

  if (sectorName === 'construction') {
    if (marqueeConst) marqueeConst.classList.remove('hidden-element');
    if (marqueeEnergy) marqueeEnergy.classList.add('hidden-element');
    if (badge) badge.setAttribute('data-i18n', 'tag_const_refs');
    if (title) title.setAttribute('data-i18n', 'partners_title_const');
    if (sub) sub.setAttribute('data-i18n', 'partners_subtitle_const');
  } else {
    // For Energy, Capital, Technology use the same partners or hide it if needed
    if (marqueeEnergy) marqueeEnergy.classList.remove('hidden-element');
    if (marqueeConst) marqueeConst.classList.add('hidden-element');
    if (badge) badge.setAttribute('data-i18n', 'tag_technology');
    if (title) title.setAttribute('data-i18n', 'partners_title');
    if (sub) sub.setAttribute('data-i18n', 'partners_subtitle');
  }

  setLanguage(currentLang);
  populateConstructionServices();
  populateEnergyServices();
}"""

js = re.sub(r'function selectSector\(sectorName\) \{.*?\n\}\n', select_sector_replacement + '\n', js, flags=re.DOTALL)


# 2. Update scrollToServices
scroll_services_replacement = """function scrollToServices(e) {
  if (e) e.preventDefault();
  closeMobileMenu();
  let targetId = 'const-services-sec';
  if (activeSector === 'energy') targetId = 'energy-services-sec';
  if (activeSector === 'capital') targetId = 'capital-services-sec';
  if (activeSector === 'technology') targetId = 'tech-services-sec';
  
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    const y = targetEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}"""
js = re.sub(r'function scrollToServices.*?\}', scroll_services_replacement, js, flags=re.DOTALL)


# 3. Update scrollToAbout
scroll_about_replacement = """function scrollToAbout(e) {
  if (e) e.preventDefault();
  closeMobileMenu();
  let targetId = 'const-about-sec';
  if (activeSector === 'energy') targetId = 'energy-about-sec';
  // Note: capital and technology might not have about sec yet, fallback or skip
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    const y = targetEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}"""
js = re.sub(r'function scrollToAbout.*?\}', scroll_about_replacement, js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated app.js")
