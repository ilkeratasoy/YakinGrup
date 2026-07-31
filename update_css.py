import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add new themes
new_themes = """
body.theme-capital {
  --color-theme: #1e3a8a;
  --color-theme-light: #3b82f6;
  --color-theme-glow: rgba(59, 130, 246, 0.4);
}
body.theme-technology {
  --color-theme: #4c1d95;
  --color-theme-light: #8b5cf6;
  --color-theme-glow: rgba(139, 92, 246, 0.4);
}
"""
css = css.replace('body.theme-energy {\n  --color-theme: var(--e-primary);\n  --color-theme-light: var(--e-primary-light);\n  --color-theme-glow: var(--e-primary-glow);\n}', 'body.theme-energy {\n  --color-theme: var(--e-primary);\n  --color-theme-light: var(--e-primary-light);\n  --color-theme-glow: var(--e-primary-glow);\n}' + new_themes)

# Add panel badges
new_badges = """
.capital-panel .panel-badge {
  color: #93c5fd;
  border-left: 3px solid #3b82f6;
}

.technology-panel .panel-badge {
  color: #c4b5fd;
  border-left: 3px solid #8b5cf6;
}
"""
css = css.replace('.energy-panel .panel-badge {\n  color: #6ed0a1;\n  border-left: 3px solid var(--e-primary-light);\n}', '.energy-panel .panel-badge {\n  color: #6ed0a1;\n  border-left: 3px solid var(--e-primary-light);\n}' + new_badges)

# Add 2x2 grid for splash-4
splash_4 = """
.splash-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
"""
css = css.replace('.splash-split {', splash_4 + '\n.splash-split {')

# Adjust media queries for splash-4 mobile
media_q = """
  .splash-4 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
"""
css = css.replace('@media (max-width: 991px) {\n  .splash-split {', '@media (max-width: 991px) {\n' + media_q + '\n  .splash-split {')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated style.css")
