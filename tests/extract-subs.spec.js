// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const records = parse(fs.readFileSync(path.join(__dirname, 'database.csv')), {
  columns: true,
  delimiter: ',',
  trim: true,
  skip_empty_lines: true
})//.slice(0, 3);

for (const record of records) {
  const dest = path.join(__dirname, '..', 'results', `sub_${record.id}`)
  if (!fs.existsSync(dest)) {
    test(`extract sub for ${record.id}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.getByRole('article').filter({ hasText: '1. Cliquez sur le bouton FranceConnect Documentation générale de FranceConnect' }).getByRole('link').first().click();
      await page.getByRole('button', { name: 'Soumettre' }).click();
      await page.getByRole('link', { name: 'Démonstration - faible' }).click();
      await page.getByPlaceholder('Identifiant').fill(record.identifiant);
      await page.getByPlaceholder('Mot de passe').fill(record.motDePasse);
      await page.getByRole('button', { name: 'Valider' }).click();
      await page.getByTestId('consent-continue').click();
      const e = await page.locator('#json-output')
      fs.writeFileSync(dest, JSON.parse(await e.innerText()).sub, "utf-8")
    });
  }
}
