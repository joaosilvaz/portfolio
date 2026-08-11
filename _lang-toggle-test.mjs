import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push('PAGEERROR: ' + err.message));

await page.goto('http://localhost:3002/pt', { waitUntil: 'networkidle' });
console.log('Initial URL:', page.url());
console.log('Initial <html lang>:', await page.getAttribute('html', 'lang'));

// Find the desktop language toggle button (aria-label = "Mudar idioma")
const toggle = page.getByRole('button', { name: 'Mudar idioma' }).first();
const count = await toggle.count();
console.log('Toggle button found count:', count);

if (count > 0) {
  await toggle.click();
  await page.waitForTimeout(1500);
  console.log('URL after click:', page.url());
  console.log('<html lang> after click:', await page.getAttribute('html', 'lang'));
  const bodyText = await page.locator('body').innerText();
  console.log('Contains "Sobre mim" (PT):', bodyText.includes('Sobre mim'));
  console.log('Contains "About me" (EN):', bodyText.includes('About me'));
}

console.log('Console errors:', JSON.stringify(consoleErrors, null, 2));

await browser.close();
