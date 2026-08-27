
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('sosyal-medya.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'https://yakingrup.net/sosyal-medya.html'
});

const window = dom.window;
const document = window.document;

// Simulate logged-in state
window.sessionStorage.setItem('yg_studio_auth', 'true');

console.log('Window loaded!');
console.log('Auth overlay display:', window.document.getElementById('auth-overlay').style.display);
console.log('Days in cal-days-container:', window.document.getElementById('cal-days-container').children.length);
console.log('Months in months-chips:', window.document.getElementById('months-chips').children.length);
console.log('Posts in posts-container:', window.document.getElementById('posts-container').children.length);
console.log('List items in list-view:', window.document.getElementById('list-view').children.length);

// Test clicking a filter button
console.log('Testing filterPosts("milli")...');
window.filterPosts('milli');
console.log('After filter milli, days in cal-days-container:', window.document.getElementById('cal-days-container').children.length);

// Test clicking an event badge to open modal
const firstBadge = window.document.querySelector('.cal-event-badge');
if (firstBadge) {
  console.log('Found badge:', firstBadge.textContent.trim());
  firstBadge.click();
  console.log('Modal display after click:', window.document.getElementById('event-modal').style.display);
  console.log('Modal body title:', window.document.querySelector('#event-modal-body h3') ? window.document.querySelector('#event-modal-body h3').textContent : 'none');
} else {
  console.log('No badge found!');
}

// Test clicking switchView("grid")
console.log('Testing switchView("grid")...');
window.switchView('grid');
console.log('Posts container display:', window.document.getElementById('posts-container').style.display);

// Test clicking switchView("list")
console.log('Testing switchView("list")...');
window.switchView('list');
console.log('List view display:', window.document.getElementById('list-view').style.display);

console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
