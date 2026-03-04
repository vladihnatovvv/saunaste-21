// Static pricing data derived from the shared chart.
const pricingTable = {
  lux: {
    weekday: [25.0, 33.0, 36.0, 40.0, 45.0, 49.0, 52.0, 54.0, 60.0],
    weekend: [30.0, 36.0, 44.0, 50.0, 54.0, 60.0, 64.0, 68.0, 70.0]
  },
  drovami: {
    weekday: [40.0, 45.0, 50.0, 55.0, 60.0, 63.0, 68.0, 72.0, 75.0],
    weekend: [42.0, 51.0, 54.0, 60.0, 66.0, 70.0, 72.0, 76.0, 80.0]
  },
  mix: {
    weekday: [55.0, 63.0, 68.0, 75.0, 83.0, 88.0, 92.0, 96.0, 100.0],
    weekend: [63.0, 68.0, 75.0, 83.0, 88.0, 92.0, 96.0, 100.0, 105.0]
  },
  fishbanua: {
    weekday: [25.0, 33.0, 36.0, 40.0, 45.0, 49.0, 52.0, 54.0, 60.0],
    weekend: [30.0, 36.0, 44.0, 50.0, 54.0, 60.0, 64.0, 68.0, 70.0]
  },
  hamam: {
    weekday: [30.0, 36.0, 44.0, 50.0, 54.0, 60.0, 64.0, 68.0, 70.0],
    weekend: [40.0, 45.0, 50.0, 55.0, 60.0, 63.0, 68.0, 72.0, 75.0]
  },
  massage: {
    weekday: [30.0, 36.0, 44.0, 50.0, 54.0, 60.0, 64.0, 68.0, 70.0],
    weekend: [40.0, 45.0, 50.0, 55.0, 60.0, 63.0, 68.0, 72.0, 75.0]
  },
  vip: {
    weekday: [30.0, 36.0, 44.0, 50.0, 54.0, 60.0, 64.0, 68.0, 70.0],
    weekend: [40.0, 45.0, 50.0, 55.0, 60.0, 63.0, 68.0, 72.0, 75.0]
  }
};

const EXTRA_PRICES = {
  extraAdult: 12.5,
  child6to12: 6.25,
  banshchik: 12.5,
  birchVeniki: 9.0,
  oakVeniki: 10.0
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('saunaCalculator');
  const bookButton = document.getElementById('bookButton');
  if (!form) {
    console.error('✗ calculator form not found');
    return;
  }

  const counterBtns = form.querySelectorAll('.counter-btn');
  const inputs = form.querySelectorAll('input[type="number"], input[type="radio"]');

  inputs.forEach((input) => {
    input.addEventListener('input', calculateTotal);
    input.addEventListener('change', calculateTotal);
  });

  counterBtns.forEach((btn) => {
    btn.addEventListener('click', handleCounterButton);
  });

  if (bookButton) {
    bookButton.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.call-back-btn')?.click();
    });
  }

  calculateTotal();
});

function handleCounterButton(event) {
  event.preventDefault();
  event.stopPropagation();
  const btn = event.currentTarget;
  const fieldId = btn?.getAttribute('data-for');
  const input = fieldId ? document.getElementById(fieldId) : null;
  if (!input) return;

  const value = parseInt(input.value, 10) || 0;
  if (btn.classList.contains('counter-plus')) {
    input.value = value + 1;
  } else if (btn.classList.contains('counter-minus')) {
    input.value = Math.max(0, value - 1);
  }

  calculateTotal();
}

function calculateTotal() {
  const serviceTypeInput = document.querySelector('input[name="serviceType"]');
  const periodInput = document.querySelector('input[name="period"]:checked');
  const hoursInput = document.getElementById('hours');

  if (!serviceTypeInput || !periodInput || !hoursInput) {
    console.error('Missing calculator inputs');
    return;
  }

  const period = periodInput.value;
  const serviceType = serviceTypeInput.value;
  const adults = Math.max(2, parseInt(document.getElementById('adultsCount')?.value, 10) || 2);
  const childrenOld = Math.max(0, parseInt(document.getElementById('childrenOld')?.value, 10) || 0);
  const banshchik = Math.max(0, parseInt(document.getElementById('banshchikCount')?.value, 10) || 0);
  const birchVeniki = Math.max(0, parseInt(document.getElementById('birchVeniki')?.value, 10) || 0);
  const oakVeniki = Math.max(0, parseInt(document.getElementById('oakVeniki')?.value, 10) || 0);
  const hours = Math.max(adults >= 3 ? 3 : 2, parseInt(hoursInput.value, 10) || 2);

  hoursInput.value = hours;

  const adultPrice = getHourlyPrice(serviceType, period, adults);
  const basePrice = adultPrice * hours;

  const extraAdultsPrice = adults > 10 ? (adults - 10) * EXTRA_PRICES.extraAdult * hours : 0;
  const childrenPrice = childrenOld * EXTRA_PRICES.child6to12 * hours;
  const banshchikPrice = banshchik * EXTRA_PRICES.banshchik * hours;
  const birchPrice = birchVeniki * EXTRA_PRICES.birchVeniki;
  const oakPrice = oakVeniki * EXTRA_PRICES.oakVeniki;

  const total = basePrice + extraAdultsPrice + childrenPrice + banshchikPrice + birchPrice + oakPrice;
  updateDisplay(basePrice, extraAdultsPrice, childrenPrice, banshchikPrice, birchPrice, oakPrice, total, hours);
}

function getHourlyPrice(serviceType, period, adults) {
  const normalized = normalizeServiceKey(serviceType);
  const table = pricingTable[normalized] || pricingTable[serviceType];
  if (!table) {
    console.warn('Unknown service type', serviceType);
    return 0;
  }

  const index = Math.min(Math.max(adults - 2, 0), 8);
  return table[period]?.[index] || 0;
}

function updateDisplay(basePrice, extraAdults, children, banshchik, birch, oak, total, hours) {
  setText('basePrice', formatPrice(basePrice) + ' (' + hours + ' ч.)');
  toggleRow('extraAdultsRow', 'extraAdultsPrice', extraAdults);
  toggleRow('childrenRow', 'childrenPrice', children);
  toggleRow('banshchikRow', 'banshchikPrice', banshchik);
  toggleRow('birchVenikiRow', 'birchVenikiPrice', birch);
  toggleRow('oakVenikiRow', 'oakVenikiPrice', oak);
  setText('totalPrice', formatPrice(total));
}

function toggleRow(rowId, priceId, value) {
  const row = document.getElementById(rowId);
  const priceEl = document.getElementById(priceId);
  if (!row || !priceEl) return;

  if (value > 0) {
    row.style.display = 'flex';
    priceEl.textContent = formatPrice(value);
  } else {
    row.style.display = 'none';
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function normalizeServiceKey(value) {
  return (value || '').toString().trim().toLowerCase();
}

function formatPrice(amount) {
  return amount.toFixed(2) + ' €';
}
