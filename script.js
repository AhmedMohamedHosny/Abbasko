/**
 * ==========================================================================
 * متجر عباسكو (Abasco) - إكسسوارات الهواتف المحمولة
 * الملف: script.js
 * ==========================================================================
 */

'use strict';
const abascoInventory = [
  {
    id: 1,
    title: 'سامسونج شاحن منزلي بقوة 45 واط مع كابل من Type-C إلي Type-C بطول 1.8 متر',
    brand: 'Samsung',
    category: 'chargers',
    price: 1999.00,
    oldPrice: 2360.00,
    discount: '361.00',
    ratingCount: 0,
    specs: 'الماركة: سامسونج | المميزات: شحن فائق السرعة 2.0 كحد أقصى 45 واط | يتضمن كابل USB من النوع C بطول 1.8 متر.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 2,
    title: 'سامسونج 25 واط شاحن PD Type-C',
    brand: 'Samsung',
    category: 'chargers',
    price: 449.00,
    oldPrice: 529.00,
    discount: '80.00',
    ratingCount: 1,
    specs: 'النوع: Adapter | الطاقة: 25 Watt | المدخل: 100-240 V | المخرج: 5 V | شحن فائق السرعة للبقاء على قيد الحياة.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 3,
    title: 'أنكر زولو شاحن 30 واط، A2698L11 - أسود فائق السرعة',
    brand: 'Anker',
    category: 'chargers',
    price: 729.00,
    oldPrice: 859.00,
    discount: '130.00',
    ratingCount: 0,
    specs: 'النوع: شاحن طاقة | شحن سريع بقوة 30 واط | المدخل: تيار متردد 100-240V | الإخراج: منفذ USB-C أقصى طاقة 30 واط.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 4,
    title: 'سامسونج EP-T2510 شاحن محول طاقة 25 واط يو اس بي-C',
    brand: 'Samsung',
    category: 'chargers',
    price: 749.00,
    oldPrice: 879.00,
    discount: '130.00',
    ratingCount: 0,
    specs: 'الطاقة: 25 واط | المنافذ: منفذ يو اس بي-C | المدخل: 100-240V | المخرج: 3A, 5V | اللون: أسود.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    inStock: true
  }
];

const state = {
  products: [...abascoInventory],
  cart: JSON.parse(localStorage.getItem('abasco_raya_cart')) || [],
  selectedCategory: 'all',
  searchQuery: '',
  selectedBrand: 'all',
  maxPrice: 4000,
  currentSort: 'featured',
  quantities: {},
  viewMode: 'grid' // 'grid' أو 'list'
};

const DOM = {
  productsContainer: document.getElementById('catalog-products-container'),
  productsCounterBadge: document.getElementById('products-counter-badge'),
  cartCounter: document.getElementById('cart-counter'),
  mobCartCounter: document.getElementById('mob-cart-counter'),
  btnViewGrid: document.getElementById('btn-view-grid'),
  btnViewList: document.getElementById('btn-view-list'),
  sortTrigger: document.getElementById('sort-dropdown-trigger'),
  sortMenu: document.getElementById('sort-options-menu'),
  selectedSortLabel: document.getElementById('selected-sort-label'),
  activeFiltersBar: document.getElementById('active-filters-bar'),
  currentBrandChip: document.getElementById('current-brand-chip'),
  chipBrandText: document.getElementById('chip-brand-text'),
  removeBrandChip: document.getElementById('remove-brand-chip'),
  clearAllFiltersBtn: document.getElementById('clear-all-filters-btn'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  searchCategory: document.getElementById('search-category'),
  priceRange: document.getElementById('price-range'),
  maxPriceDisplay: document.getElementById('max-price-display'),
  darkModeCheckbox: document.getElementById('dark-mode-checkbox'),
  quickModalOverlay: document.getElementById('quick-modal-overlay'),
  quickModalContent: document.getElementById('quick-modal-content'),
  closeQuickModal: document.getElementById('close-quick-modal'),
  chatLink: document.getElementById('chat-link'),
  chatIcon: document.getElementById('chat-icon')
};

function renderCatalog(items) {
  if (!DOM.productsContainer) return;

  if (items.length === 0) {
    DOM.productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: 12px; border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--dream-green); margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800;">لا توجد ملحقات مطابقة للتصفية</h3>
      </div>
    `;
    DOM.productsCounterBadge.textContent = '0 منتجات';
    return;
  }

  DOM.productsCounterBadge.textContent = `${items.length} من ${abascoInventory.length} منتجات`;

DOM.productsContainer.innerHTML = items.map(product => {
    const qty = state.quantities[product.id] || 1;
    return `
      <article class="dream-product-card" data-id="${product.id}">
        
        <!-- الجزء العلوي: تفاصيل يميناً وصورة يساراً -->
        <div class="card-top-horizontal-split">
          
          <div class="card-details-pane">
            <span class="brand-label-text">${product.brand}</span>
            <h3 class="product-item-title">
              <a href="product.html?id=${product.id}">${product.title}</a>
            </h3>
            
            <div class="card-stars-row">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <span>(${product.ratingCount})</span>
            </div>

            <div class="price-block-dream">
              <span class="price-val-red">LE ${product.price.toFixed(2)}</span>
              <span class="price-struck-gray">LE ${product.oldPrice.toFixed(2)}</span>
            </div>

            <p class="specs-summary-text">${product.specs}</p>

            <div class="stock-dot-indicator">
              <span class="blue-dot"></span>
              <span>في المخزن</span>
            </div>
          </div>

          <div class="card-image-pane">
            <span class="discount-ribbon-tag">وفر ${product.discount} جنيه</span>
            <div class="media-square-box">
              <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
              </a>
            </div>
          </div>

        </div>

        <!-- الجزء السفلي: الأزرار الثلاثة بعرض الكارت -->
        <div class="card-bottom-actions-full">
          <button class="btn-quick-view-olive" onclick="openQuickModal(${product.id})">نظرة سريعة</button>
          <button class="btn-choose-option-green" onclick="addToCartDirect(${product.id})">Choose option</button>
          <div class="item-mini-stepper">
            <button class="mini-step-btn" onclick="modifyCardQty(${product.id}, 1)">+</button>
            <span class="mini-step-val" id="stepper-val-${product.id}">${qty}</span>
            <button class="mini-step-btn" onclick="modifyCardQty(${product.id}, -1)">-</button>
          </div>
        </div>

      </article>
    `;
  }).join('');
}

// تبديل طرق العرض (Grid vs List)
DOM.btnViewGrid?.addEventListener('click', () => {
  DOM.btnViewGrid.classList.add('active');
  DOM.btnViewList.classList.remove('active');
  document.body.classList.remove('view-list-active');
  document.body.classList.add('view-grid-active');
  state.viewMode = 'grid';
});

DOM.btnViewList?.addEventListener('click', () => {
  DOM.btnViewList.classList.add('active');
  DOM.btnViewGrid.classList.remove('active');
  document.body.classList.remove('view-grid-active');
  document.body.classList.add('view-list-active');
  state.viewMode = 'list';
});

// قائمة الترتيب المنسدلة المخصصة
DOM.sortTrigger?.addEventListener('click', (e) => {
  e.stopPropagation();
  DOM.sortMenu.classList.toggle('open');
});

document.addEventListener('click', () => {
  DOM.sortMenu?.classList.remove('open');
});

DOM.sortMenu?.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    DOM.sortMenu.querySelectorAll('li').forEach(l => l.classList.remove('active'));
    item.classList.add('active');
    DOM.selectedSortLabel.textContent = item.textContent;
    state.currentSort = item.getAttribute('data-sort');
    applyFilters();
  });
});

// عداد الكمية السريع
window.modifyCardQty = function(id, delta) {
  let current = state.quantities[id] || 1;
  current += delta;
  if (current < 1) current = 1;
  state.quantities[id] = current;
  const el = document.getElementById(`stepper-val-${id}`);
  if (el) el.textContent = current;
};

// إضافة للسلة
window.addToCartDirect = function(productId) {
  const product = abascoInventory.find(p => p.id === productId);
  if (!product) return;

  const addedQty = state.quantities[productId] || 1;
  const existing = state.cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += addedQty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: addedQty
    });
  }

  localStorage.setItem('abasco_raya_cart', JSON.stringify(state.cart));
  syncCartBadge();
  alert(`تمت إضافة (${addedQty}) قطعة من "${product.title}" إلى عربة التسوق بنجاح!`);
};

function syncCartBadge() {
  const total = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (DOM.cartCounter) DOM.cartCounter.textContent = total;
  if (DOM.mobCartCounter) DOM.mobCartCounter.textContent = total;
}

// محرك الفلترة المتكامل
function applyFilters() {
  let result = [...abascoInventory];

  if (state.selectedCategory !== 'all') {
    result = result.filter(item => item.category === state.selectedCategory);
  }

  if (state.selectedBrand !== 'all') {
    result = result.filter(item => item.brand.toLowerCase() === state.selectedBrand.toLowerCase());
    DOM.activeFiltersBar.style.display = 'flex';
    DOM.chipBrandText.textContent = state.selectedBrand;
  } else {
    DOM.activeFiltersBar.style.display = 'none';
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    result = result.filter(i => i.title.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q));
  }

  result = result.filter(i => i.price <= state.maxPrice);

  if (state.currentSort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.currentSort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (state.currentSort === 'alpha-az') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.currentSort === 'alpha-za') {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderCatalog(result);
}

// أحداث فلاتر الماركة
document.querySelectorAll('input[name="brand_filter"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    state.selectedBrand = e.target.value;
    applyFilters();
  });
});

DOM.removeBrandChip?.addEventListener('click', () => {
  state.selectedBrand = 'all';
  const allRadio = document.querySelector('input[name="brand_filter"][value="all"]');
  if (allRadio) allRadio.checked = true;
  applyFilters();
});

DOM.clearAllFiltersBtn?.addEventListener('click', () => {
  state.selectedBrand = 'all';
  state.maxPrice = 4000;
  if (DOM.priceRange) DOM.priceRange.value = 4000;
  if (DOM.maxPriceDisplay) DOM.maxPriceDisplay.textContent = 'حتى: 4,000 ج.م';
  const allRadio = document.querySelector('input[name="brand_filter"][value="all"]');
  if (allRadio) allRadio.checked = true;
  applyFilters();
});

// شريط السعر
DOM.priceRange?.addEventListener('input', (e) => {
  state.maxPrice = parseFloat(e.target.value);
  if (DOM.maxPriceDisplay) DOM.maxPriceDisplay.textContent = `حتى: ${state.maxPrice.toLocaleString('ar-EG')} ج.م`;
  applyFilters();
});

// أحداث البحث
DOM.searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  state.searchQuery = DOM.searchInput.value;
  state.selectedCategory = DOM.searchCategory.value;
  applyFilters();
});

DOM.searchInput?.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  applyFilters();
});

// نافذة نظرة سريعة
window.openQuickModal = function(id) {
  const product = abascoInventory.find(p => p.id === id);
  if (!product || !DOM.quickModalOverlay) return;

  DOM.quickModalContent.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <div style="width: 170px; height: 170px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px solid var(--border-color);">
        <img src="${product.image}" alt="${product.title}" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 220px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: var(--dream-green);">${product.brand}</span>
        <h3 style="font-size: 1.05rem; font-weight: 800; margin: 4px 0 8px;">${product.title}</h3>
        <div style="font-size: 1.25rem; font-weight: 900; color: var(--discount-red); margin-bottom: 8px;">
          LE ${product.price.toFixed(2)}
          <small style="font-size: 0.8rem; color: var(--text-subtle); text-decoration: line-through; margin-right: 6px;">LE ${product.oldPrice.toFixed(2)}</small>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">${product.specs}</p>
        <button class="btn-dream-choose" style="padding: 10px 20px;" onclick="addToCartDirect(${product.id}); DOM.quickModalOverlay.classList.remove('active');">
          أضف إلى السلة فوراً
        </button>
      </div>
    </div>
  `;
  DOM.quickModalOverlay.classList.add('active');
};

DOM.closeQuickModal?.addEventListener('click', () => DOM.quickModalOverlay.classList.remove('active'));

// دارك مود
const darkCheckbox = document.getElementById('dark-mode-checkbox');
if (localStorage.getItem('abasco_dark_mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkCheckbox) darkCheckbox.checked = true;
}
darkCheckbox?.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('abasco_dark_mode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('abasco_dark_mode', 'disabled');
  }
});

// تناوب زر الشات كل 5 ثوانٍ
let isWhatsApp = true;
setInterval(() => {
  isWhatsApp = !isWhatsApp;
  if (!DOM.chatIcon || !DOM.chatLink) return;
  DOM.chatIcon.classList.add('rotate-anim');
  setTimeout(() => {
    if (isWhatsApp) {
      DOM.chatLink.className = 'chat-circle-link whatsapp-mode';
      DOM.chatLink.href = 'https://wa.me/201000000000';
      DOM.chatIcon.className = 'fa-brands fa-whatsapp chat-icon';
    } else {
      DOM.chatLink.className = 'chat-circle-link messenger-mode';
      DOM.chatLink.href = 'https://m.me/abascostore';
      DOM.chatIcon.className = 'fa-brands fa-facebook-messenger chat-icon';
    }
    DOM.chatIcon.classList.remove('rotate-anim');
  }, 250);
}, 5000);

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(state.products);
  syncCartBadge();
});
// فتح وإغلاق قائمة التصفية باليمين عند الضغط
document.getElementById('filter-toggle-btn')?.addEventListener('click', () => {
  document.body.classList.toggle('filters-opened');
});
// 1. زر تصفية: فتح وإغلاق القائمة في اليمين عند النقر
const filterBtn = document.getElementById('filter-toggle-btn');
const mainLayout = document.querySelector('.dream-main-layout');

filterBtn?.addEventListener('click', () => {
  mainLayout?.classList.toggle('sidebar-active');
});

// 2. زر متوفر بالمخزون: فلترة المنتجات لحظياً
const stockCheckbox = document.getElementById('stock-filter');
stockCheckbox?.addEventListener('change', (e) => {
  if (e.target.checked) {
    // إظهار المنتجات المتوفرة فقط بالمخزون
    const inStockItems = abascoInventory.filter(item => item.inStock === true);
    renderCatalog(inStockItems);
  } else {
    // إظهار كل المنتجات
    renderCatalog(abascoInventory);
  }
});
document.querySelectorAll('.filter-card-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});
