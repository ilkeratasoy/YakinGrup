import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add group-companies to selectSector visibility toggle
js = js.replace("const footer = document.querySelector('.global-footer');", "const groupSec = document.getElementById('group-companies');\n  const footer = document.querySelector('.global-footer');")
js = js.replace("footer.classList.remove('hidden-element');", "if(groupSec) groupSec.classList.remove('hidden-element');\n  footer.classList.remove('hidden-element');")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js for group section visibility")
