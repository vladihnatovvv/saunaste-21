# How to Add Calculator to Every Page

The calculator has been created as a **reusable component** that can be added to any page.

## Files Involved

- **JavaScript**: `js/calculator.js` (already exists)
- **HTML Component**: `CALCULATOR_COMPONENT.html` (template with full HTML)
- **Already Added To**: 
  - ✅ `index.html` (original)
  - ✅ `food.html` (just added)

## To Add Calculator to Other Pages

### Step 1: Find the closing `</main>` tag

In any page (e.g., `hamam.html`, `sauna1.html`, etc.), find where `</main>` ends.

### Step 2: Add the calculator HTML

Copy and paste this **entire section** right after `</main>` and before `<footer>`:

```html
<!-- CALCULATOR SECTION -->
<section id="calculator" class="calculator-section">
  <div class="container">
    <div class="calculator-wrapper">
      <h2>Калькулятор цены</h2>
      <p class="calculator-subtitle">Выберите параметры бани и услуг</p>

      <form id="saunaCalculator">
        <!-- Service Type Selection -->
        <div class="calculator-grid">
          <div class="service-selector">
            <p class="service-label" style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px;">Выберите баню:</p>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="serviceType" value="vip" checked>
                <span class="radio-label">Vip-Баня</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="serviceType" value="lux">
                <span class="radio-label">Lux Баня</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="serviceType" value="drovami">
                <span class="radio-label">Баня на дровах</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="serviceType" value="mix">
                <span class="radio-label">Комбо</span>
              </label>
            </div>
          </div>

          <!-- Period Selection -->
          <div class="service-selector">
            <p class="service-label" style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 12px;">Дата:</p>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="period" value="weekday" checked>
                <span class="radio-label">Пн-Пт</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="period" value="weekend">
                <span class="radio-label">Сб-Вс</span>
              </label>
            </div>
          </div>

          <!-- Hours Selection -->
          <div class="service-input">
            <label for="hours" style="font-size: 13px; font-weight: 500; color: #666;">Количество часов</label>
            <div class="counter-input">
              <button type="button" class="counter-btn counter-minus" data-for="hours">−</button>
              <input type="number" id="hours" name="hours" min="2" value="2" class="counter-value">
              <button type="button" class="counter-btn counter-plus" data-for="hours">+</button>
            </div>
            <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">Минимум 2 часа</p>
          </div>

          <!-- Adults Count -->
          <div class="service-input">
            <label for="adultsCount" style="font-size: 13px; font-weight: 500; color: #666;">Взрослых (2-10)</label>
            <div class="counter-input">
              <button type="button" class="counter-btn counter-minus" data-for="adultsCount">−</button>
              <input type="number" id="adultsCount" name="adultsCount" min="2" max="20" value="2" class="counter-value">
              <button type="button" class="counter-btn counter-plus" data-for="adultsCount">+</button>
            </div>
            <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">В стандартную цену</p>
          </div>

          <!-- Children 6-12 Count -->
          <div class="service-input">
            <label for="childrenOld" style="font-size: 13px; font-weight: 500; color: #666;">Дети 6-12 лет</label>
            <div class="counter-input">
              <button type="button" class="counter-btn counter-minus" data-for="childrenOld">−</button>
              <input type="number" id="childrenOld" name="childrenOld" min="0" value="0" class="counter-value">
              <button type="button" class="counter-btn counter-plus" data-for="childrenOld">+</button>
            </div>
            <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">6.25€ за час</p>
          </div>

          <!-- Children <6 Count (not billed) -->
          <div class="service-input">
            <label for="childrenYoung" style="font-size: 13px; font-weight: 500; color: #666;">Дети до 6 лет</label>
            <div class="counter-input">
              <button type="button" class="counter-btn counter-minus" data-for="childrenYoung">−</button>
              <input type="number" id="childrenYoung" name="childrenYoung" min="0" value="0" class="counter-value">
              <button type="button" class="counter-btn counter-plus" data-for="childrenYoung">+</button>
            </div>
            <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">Бесплатно</p>
          </div>

          <!-- Additional Services -->
          <div class="additional-services">
            <p class="service-label" style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 16px;">Дополнительные услуги:</p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div class="service-input">
                <label for="banshchikCount" style="font-size: 13px; font-weight: 500; color: #666;">Банщик (заходов)</label>
                <div class="counter-input">
                  <button type="button" class="counter-btn counter-minus" data-for="banshchikCount">−</button>
                  <input type="number" id="banshchikCount" name="banshchikCount" min="0" value="0" class="counter-value">
                  <button type="button" class="counter-btn counter-plus" data-for="banshchikCount">+</button>
                </div>
                <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">12.50€ за заход</p>
              </div>
              <div class="service-input">
                <label for="birchVeniki" style="font-size: 13px; font-weight: 500; color: #666;">Березовый веник</label>
                <div class="counter-input">
                  <button type="button" class="counter-btn counter-minus" data-for="birchVeniki">−</button>
                  <input type="number" id="birchVeniki" name="birchVeniki" min="0" value="0" class="counter-value">
                  <button type="button" class="counter-btn counter-plus" data-for="birchVeniki">+</button>
                </div>
                <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">9.00€ за штуку</p>
              </div>
              <div class="service-input">
                <label for="oakVeniki" style="font-size: 13px; font-weight: 500; color: #666;">Дубовый веник</label>
                <div class="counter-input">
                  <button type="button" class="counter-btn counter-minus" data-for="oakVeniki">−</button>
                  <input type="number" id="oakVeniki" name="oakVeniki" min="0" value="0" class="counter-value">
                  <button type="button" class="counter-btn counter-plus" data-for="oakVeniki">+</button>
                </div>
                <p class="service-hint" style="font-size: 11px; color: #AB8C6B; margin: 4px 0 0 0;">10.00€ за штуку</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div class="price-breakdown" style="background: rgba(171, 140, 107, 0.03); border: 2px solid rgba(171, 140, 107, 0.1); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div class="price-row" style="display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Базовая цена:</span>
            <span id="basePrice" style="font-weight: 600;">25.00 €</span>
          </div>
          <div class="price-row" id="extraAdultsRow" style="display: none; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Дополнительные взрослые:</span>
            <span id="extraAdultsPrice" style="font-weight: 600;">0.00 €</span>
          </div>
          <div class="price-row" id="childrenRow" style="display: none; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Дети 6-12 лет:</span>
            <span id="childrenPrice" style="font-weight: 600;">0.00 €</span>
          </div>
          <div class="price-row" id="banshchikRow" style="display: none; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Услуги банщика:</span>
            <span id="banshchikPrice" style="font-weight: 600;">0.00 €</span>
          </div>
          <div class="price-row" id="birchVenikiRow" style="display: none; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Березовые веники:</span>
            <span id="birchVenikiPrice" style="font-weight: 600;">0.00 €</span>
          </div>
          <div class="price-row" id="oakVenikiRow" style="display: none; justify-content: space-between; align-items: center; font-size: 15px; color: #555; padding-bottom: 8px; border-bottom: 1px solid rgba(171, 140, 107, 0.1);">
            <span>Дубовые веники:</span>
            <span id="oakVenikiPrice" style="font-weight: 600;">0.00 €</span>
          </div>
          <div class="price-row total" style="display: flex; justify-content: space-between; align-items: center; border: none; border-top: 2px solid #AB8C6B; padding-top: 12px; padding-bottom: 0; font-size: 18px; font-weight: 700; color: #AB8C6B; margin-top: 8px;">
            <span>ИТОГО:</span>
            <span id="totalPrice" style="color: #AB8C6B;">25.00 €</span>
          </div>
        </div>

        <button type="button" class="btn" id="bookButton" style="margin-top: 24px; width: 100%; padding: 14px 24px; background: #AB8C6B; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Забронировать</button>
      </form>
    </div>
  </div>
</section>
```

### Step 3: Add the script reference

Find the `</body>` closing tag and before it add:

```html
<script src="js/calculator.js"></script>
```

Make sure it's added **after** the other scripts like `script.js`.

## Pages That Need the Calculator

Add calculator to these pages:

- ✅ **index.html** - Already has it
- ✅ **food.html** - Just added
- ⏳ **hamam.html** - Needs calculator
- ⏳ **sauna1.html** - Needs calculator
- ⏳ **bathhousevip.html** - Needs calculator
- ⏳ **fishbanua.html** - Needs calculator
- ⏳ **luxbanua.html** - Needs calculator
- ⏳ **banua1.html** - Needs calculator

## Easy Way to Add to All Pages at Once

Instead of copying HTML each time, create a simple reusable approach:

1. Use `CALCULATOR_COMPONENT.html` as a reference
2. Copy the entire calculator section
3. Paste into each page before `</main>` closing tag
4. Add `<script src="js/calculator.js"></script>` before `</body>`

## CSS Classes Used by Calculator

The calculator uses these CSS classes (already defined in `styles.css`):

- `.calculator-section`
- `.calculator-wrapper`
- `.calculator-grid`
- `.service-selector`
- `.service-input`
- `.counter-input`
- `.counter-btn`
- `.radio-option`
- `.radio-group`
- `.price-breakdown`
- `.price-row`

All styling is already in place - just copy the HTML!

## Need Help?

If any page shows "Form #saunaCalculator not found", it means:
1. The calculator HTML wasn't added properly
2. The script reference wasn't added
3. Check browser console (F12) for errors
