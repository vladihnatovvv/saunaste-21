# Google Sheets для калькулятора і галерей

Цей документ описує, як перетворити Google Sheets у центральне джерело для тарифів, доповнень та медіа-контенту калькуляторів сервісів.

## 1. Створити таблицю

1. Відкрий https://sheets.google.com і створи нову таблицю, наприклад `VIP-RU Calculator`.
2. Поділися нею з доступом **«Кожен, у кого є посилання» (читання)**.
3. Створи три аркуші (вкладки): `Pricing`, `Extras`, `Gallery`.

### Аркуш Pricing
| service | period | count2 | count3 | count4 | count5 | count6 | count7 | count8 | count9 | count10 |
|---------|--------|--------|--------|--------|--------|--------|--------|--------|--------|---------|
| fishbanua | weekday | 25 | 33 | 36 | 40 | 45 | 49 | 52 | 54 | 60 |
| fishbanua | weekend | 30 | 36 | 44 | 50 | 54 | 60 | 64 | 68 | 70 |

В описі для кожного рядка:
1. `service` — точна назва із прихованого поля `serviceType` (fishbanua, hamam, lux, massage тощо).
2. `period` — `weekday` для буднього дня, `weekend` для п’ятниці після 16:00 + вихідних.
3. `count2…count10` — тариф за 2, 3, … до 10 гостей одним числом (євро/годину). Точне відповідність колонок:
  - `count2`: базовий тариф для 2 гостей.
  - `count3`–`count10`: для 3–10 гостей.

Відповідно до попередньої логіки калькулятора: якщо вводиш `adultsCount` 5, скрипт бере `count5` у відповідному рядку для обраного `period`.

### Аркуш Extras
| service | key | price |
|---------|-----|-------|
| fishbanua | extraAdult | 12.5 |
| fishbanua | child6to12 | 6.25 |
| fishbanua | banshchik | 12.5 |
| fishbanua | birchVeniki | 9 |
| fishbanua | oakVeniki | 10 |

Опиши таким чином кожен сервіс:
1. `service` — назва як у формі (fishbanua, hamam, lux, massage, drovami тощо).
2. `key` — ключ, який використовується у `js/calculator.js` для прив’язки:
  - `extraAdult` — плата за кожного дорослого понад 10.
  - `child6to12` — фіксована ціна для дітей 6-12 років.
  - `banshchik`, `birchVeniki`, `oakVeniki` — вартість послуг/веника за один епізод.
3. `price` — євро за одиницю, без символів (наприклад, `12.5`).

Якщо для сервісу немає специфічного ключа, пропусти запис — калькулятор використовує дефолтні значення `DEFAULT_EXTRAS_CONFIG`.

### Аркуш Gallery
| service | type | url | alt | title |
|---------|------|-----|-----|-------|
| fishbanua | image | https://.../fish-1.jpg | Баня збоку | |
| fishbanua | image | https://.../fish-2.jpg | Поличка з віниками | |
| fishbanua | video | https://.../tour.mp4 | | Відео-тур |

Пояснення колонок:
1. `service` — назва калькулятора (fishbanua, hamam, lux тощо).
2. `type` — `image` для фото, `video` для роликів.
3. `url` — пряме посилання на медіа з http(s);
4. `alt` — опис для фотографій (відображається в `alt`), для відео можна залишити пустим.
5. `title` — необов’язковий підпис для відео; у випадку зображення використовується, якщо треба текст під камерою.

Скрипт автоматично перезаписує `.gallery-grid` і `.gallery-video`, якщо у таблиці є записані URLs.

## 2. Створити Apps Script

1. Відкрий https://script.google.com і створи новий проєкт.
2. Встав цей код і збережи:
```javascript
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pricing = readPricing(ss.getSheetByName('Pricing'));
  const extras = readExtras(ss.getSheetByName('Extras'));
  const gallery = readGallery(ss.getSheetByName('Gallery'));

  const services = {};
  Object.keys(pricing).forEach((service) => {
    services[service] = services[service] || {};
    services[service].pricing = pricing[service];
  });

  Object.keys(extras).forEach((service) => {
    services[service] = services[service] || {};
    services[service].extras = extras[service];
  });

  Object.keys(gallery).forEach((service) => {
    services[service] = services[service] || {};
    services[service].gallery = gallery[service];
  });

  return ContentService.createTextOutput(JSON.stringify({ services }))
    .setMimeType(ContentService.MimeType.JSON);
}

function readPricing(sheet) {
  if (!sheet) return {};
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const serviceIdx = headers.indexOf('service');
  const periodIdx = headers.indexOf('period');

  const data = {};
  rows.forEach((row) => {
    const service = row[serviceIdx];
    const period = row[periodIdx];
    if (!service || !period) return;

    const prices = row.slice(periodIdx + 1).map(Number).filter((n) => !isNaN(n));
    data[service.trim().toLowerCase()] = data[service.trim().toLowerCase()] || {};
    data[service.trim().toLowerCase()][period.trim().toLowerCase()] = prices;
  });
  return data;
}

function readExtras(sheet) {
  if (!sheet) return {};
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const serviceIdx = headers.indexOf('service');
  const keyIdx = headers.indexOf('key');
  const priceIdx = headers.indexOf('price');
  const data = {};
  rows.forEach((row) => {
    const service = row[serviceIdx];
    const key = row[keyIdx];
    const price = Number(row[priceIdx]);
    if (!service || !key || isNaN(price)) return;
    const normalized = service.trim().toLowerCase();
    data[normalized] = data[normalized] || {};
    data[normalized][key.trim()] = price;
  });
  return data;
}

function readGallery(sheet) {
  if (!sheet) return {};
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const serviceIdx = headers.indexOf('service');
  const typeIdx = headers.indexOf('type');
  const urlIdx = headers.indexOf('url');
  const altIdx = headers.indexOf('alt');
  const titleIdx = headers.indexOf('title');
  const data = {};
  rows.forEach((row) => {
    const service = row[serviceIdx];
    const type = row[typeIdx];
    const url = row[urlIdx];
    if (!service || !type || !url) return;
    const normalized = service.trim().toLowerCase();
    data[normalized] = data[normalized] || { images: [], videos: [] };
    const entry = { url: url.trim() };
    if (altIdx >= 0 && row[altIdx]) entry.alt = row[altIdx];
    if (titleIdx >= 0 && row[titleIdx]) entry.title = row[titleIdx];
    if (type.toLowerCase() === 'image') {
      data[normalized].images.push(entry);
    } else if (type.toLowerCase() === 'video') {
      data[normalized].videos.push(entry);
    }
  });
  return data;
}
```

## 3. Деплой веб-аплікації

1. У Apps Script натисни **Deploy → New deployment**.
2. Тип: **Web app**.
3. Виконавець: твій акаунт, доступ: **Anyone**.
4. Збережи URL — він знадобиться далі.

## 4. Підключення до сайту

1. У `js/calculator.js` знайди `GOOGLE_SHEETS_CALCULATOR_URL` і встав туди URL скрипта.
2. Збережи файл і онови сторінку. Якщо все працює — в консолі з’явиться `Calculating for:` та дані з таблиці.
3. Галерея на сторінці оновиться автоматично, якщо у Google Sheet є записи.

## 5. Оновлення даних

1. Зміни ціни в `Pricing` — оновлюються після перезавантаження сторінки.
2. `Extras` контролює допсервіси (банщик, веники тощо).
3. `Gallery` задає всі фото/відео для відповідної послуги; кожен запис може мати `alt` або `title`.

## 6. Приклад результату
```json
{
  "services": {
    "fishbanua": {
      "pricing": {
        "weekday": [25, 33, 36, 40, 45, 49, 52, 54, 60],
        "weekend": [30, 36, 44, 50, 54, 60, 64, 68, 70]
      },
      "extras": {
        "extraAdult": 12.5,
        "child6to12": 6.25,
        "banshchik": 12.5,
        "birchVeniki": 9,
        "oakVeniki": 10
      },
      "gallery": {
        "images": [
          { "url": "https://.../1.jpg", "alt": "Зала" }
        ],
        "videos": [
          { "url": "https://.../tour.mp4", "title": "Відео-тур" }
        ]
      }
    }
  }
}
```

Якщо потрібно додати новий сервіс, просто додай його рядки у тій же таблиці (наприклад, `lux`, `hamam`, `massage`).