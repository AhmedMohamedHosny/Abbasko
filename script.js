/**
 * ==========================================================================
 * متجر عباسكو (Abasco) - إكسسوارات الهواتف المحمولة
 * الملف: script.js
 * ==========================================================================
 */

'use strict';

// 1. إعدادات مشروع فايربيز الخاص بك (abbasko-store)
const firebaseConfig = {
  apiKey: "AIzaSyBhOo-nzA3TztOFQlxPQaOTrLtPDjKb_xU",
  authDomain: "abbasko-store.firebaseapp.com",
  projectId: "abbasko-store",
  storageBucket: "abbasko-store.firebasestorage.app",
  messagingSenderId: "475025963892",
  appId: "1:475025963892:web:8790442f8bc83539368a21",
  measurementId: "G-B1866569VZ"
};

// تهيئة الفايربيز وقاعدة البيانات
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// مصفوفة المنتجات (ستُملأ تلقائياً من الفايربيز)
// مصفوفة المنتجات مجهزة بـ 4 صور زوايا لكل ملحق
let abascoInventory = [
  {
    id: '1',
    title: 'أنكر زولو شاحن 30 واط، A2698L11 - أسود فائق السرعة',
    brand: 'Anker',
    category: 'chargers',
    price: 729.00,
    oldPrice: 859.00,
    discount: '130.00',
    rating: 5,
    ratingCount: 19,
    specs: 'النوع: شاحن طاقة | شحن سريع بقوة 30 واط | منفذ USB-C.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80'
    ],
    stock: 15,
    inStock: true
  },
  {
    id: '2',
    title: 'سامسونج EP-T2510 شاحن محول طاقة 25 واط يو اس بي-C',
    brand: 'Samsung',
    category: 'chargers',
    price: 749.00,
    oldPrice: 879.00,
    discount: '130.00',
    rating: 4,
    ratingCount: 6,
    specs: 'الطاقة: 25 واط | منفذ يو اس بي-C | اللون: أسود.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80'
    ],
    stock: 10,
    inStock: true
  },
  {
    id: '3',
    title: 'سامسونج شاحن منزلي بقوة 45 واط مع كابل من Type-C إلي Type-C بطول 1.8 متر',
    brand: 'Samsung',
    category: 'chargers',
    price: 1999.00,
    oldPrice: 2360.00,
    discount: '361.00',
    rating: 5,
    ratingCount: 12,
    specs: 'الماركة: سامسونج | شحن فائق السرعة 2.0 كحد أقصى 45 واط | كابل تايب سي 1.8 متر.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80'
    ],
    stock: 20,
    inStock: true
  },
  {
    id: '4',
    title: 'سامسونج 25 واط شاحن PD Type-C',
    brand: 'Samsung',
    category: 'chargers',
    price: 449.00,
    oldPrice: 529.00,
    discount: '80.00',
    rating: 4,
    ratingCount: 8,
    specs: 'النوع: Adapter | الطاقة: 25 Watt | شحن فائق السرعة للبقاء على قيد الحياة.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80'
    ],
    stock: 8,
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
  viewMode: 'grid',
  currentPage: 1 // <-- أضف هذا السطر هنا
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

// دالة رسم النجوم الحقيقية بناءً على تقييم الملحق في قاعدة البيانات
function getStarsHTML(rating) {
  const rate = Math.round(Number(rating) || 0);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars += '<i class="fa-solid fa-star"></i>';
    } else {
      stars += '<i class="fa-regular fa-star" style="color:#d1d5db;"></i>';
    }
  }
  return stars;
}

// دالة عرض الكتالوج مع التوزيع الحقيقي للأسعار والنجوم والمخزون
function renderCatalog(items) {
  if (!DOM.productsContainer) return;

  const itemsPerPage = 16;
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

  if (state.currentPage > totalPages) state.currentPage = 1;

  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItemsPage = items.slice(startIndex, endIndex);

  if (currentItemsPage.length === 0) {
    DOM.productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: 12px; border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--dream-green); margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800;">لا توجد ملحقات مطابقة للتصفية</h3>
      </div>
    `;
    if (DOM.productsCounterBadge) DOM.productsCounterBadge.textContent = '0 منتجات';
    const pag = document.getElementById('pagination-container');
    if (pag) pag.innerHTML = '';
    return;
  }

  if (DOM.productsCounterBadge) {
    DOM.productsCounterBadge.textContent = `${items.length} من ${abascoInventory.length} منتجات`;
  }

  DOM.productsContainer.innerHTML = currentItemsPage.map(product => {
    const qty = state.quantities[product.id] || 1;
    const isAvailable = product.inStock === true || (Number(product.stock) > 0);

    return `
      <article class="dream-product-card" data-id="${product.id}">
        <div class="card-top-horizontal-split">
          <div class="card-details-pane">
            <span class="brand-label-text">${product.brand || 'عام'}</span>
            <h3 class="product-item-title">
              <a href="product.html?id=${product.id}">${product.title}</a>
            </h3>
            
            <div class="card-stars-row">
              ${getStarsHTML(product.rating)}
              <span>(${product.ratingCount || 0})</span>
            </div>

            <!-- السعر قابل للضغط للنقل المباشر لصفحة الملحق -->
            <div class="price-block-dream" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
              <span class="price-val-red">LE ${Number(product.price).toFixed(2)}</span>
              ${product.oldPrice ? `<span class="price-struck-gray">LE ${Number(product.oldPrice).toFixed(2)}</span>` : ''}
            </div>

            <p class="specs-summary-text">${product.specs || ''}</p>

            <div class="stock-dot-indicator">
              <span class="blue-dot" style="${!isAvailable ? 'background-color:#d32f2f;' : ''}"></span>
              <span style="${!isAvailable ? 'color:#d32f2f;' : ''}">${isAvailable ? 'في المخزن' : 'نفذ المخزون'}</span>
            </div>
          </div>

<div class="card-image-pane" onmouseleave="resetCardSlice('${product.id}')">
            ${product.discount ? `<span class="discount-ribbon-tag">وفر ${product.discount} جنيه</span>` : ''}
            
            <!-- زر العين الخضراء السريع بأعلى الكارت -->
            <button class="quick-hover-eye" onclick="window.location.href='product.html?id=${product.id}'" title="معاينة المنتج">
              <i class="fa-solid fa-eye"></i>
            </button>

            <div class="media-square-box">
              <a href="product.html?id=${product.id}">
                <img id="prod-img-${product.id}" src="${(product.images && product.images[0]) || product.image || 'logo.png'}" alt="${product.title}" loading="lazy">
              </a>
              
              <!-- 4 شرائح أفقية شفافة تتحسس حركة الماوس -->
              <div class="hover-slices-overlay">
                <div class="hover-slice-item" onmouseenter="setCardSlice('${product.id}', 0)"></div>
                <div class="hover-slice-item" onmouseenter="setCardSlice('${product.id}', 1)"></div>
                <div class="hover-slice-item" onmouseenter="setCardSlice('${product.id}', 2)"></div>
                <div class="hover-slice-item" onmouseenter="setCardSlice('${product.id}', 3)"></div>
              </div>
            </div>

            <!-- خط المؤشرات الأربعة أسفل الصورة -->
            <div class="image-dash-indicators" id="dashes-${product.id}">
              <span class="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div class="card-bottom-actions-full">
<button class="btn-quick-view-olive" onclick="window.location.href='product.html?id=${product.id}'">نظرة سريعة</button>          
          <button class="btn-choose-option-green" onclick="addToCartDirect('${product.id}')" ${!isAvailable ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
            ${isAvailable ? 'Choose option' : 'غير متوفر'}
          </button>
          <div class="item-mini-stepper">
            <button class="mini-step-btn" onclick="modifyCardQty('${product.id}', 1)">+</button>
            <span class="mini-step-val" id="stepper-val-${product.id}">${qty}</span>
            <button class="mini-step-btn" onclick="modifyCardQty('${product.id}', -1)">-</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  renderPaginationControls(totalPages);
}

// أزرار أرقام الصفحات (Pagination)
function renderPaginationControls(totalPages) {
  const container = document.getElementById('pagination-container');
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `
    <button class="page-arrow" ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
      <i class="fa-solid fa-chevron-right"></i> السابق
    </button>
  `;
  for (let i = 1; i <= totalPages; i++) {
    html += `<span class="page-num ${i === state.currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</span>`;
  }
  html += `
    <button class="page-arrow" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
      التالي <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;
  container.innerHTML = html;
}

window.changePage = function(targetPage) {
  state.currentPage = targetPage;
  executeFiltering();
  window.scrollTo({ top: 300, behavior: 'smooth' });
};

// ==========================================================================
// محرك الفلترة الحقيقي الكامل للـ 9 أقسام وتحديث الأعداد الحية
// ==========================================================================
const activeFilters = {
  brand: [], screen: [], mic: [], type: [], conn: [], power: [], battery: [], color: []
};

// دالة حساب الأعداد الحقيقية ووضعها بين القوسين جنب كل خيار
function updateFilterCounts() {
  document.querySelectorAll('.count-tag').forEach(tag => {
    const val = tag.getAttribute('data-val').toUpperCase();
    const count = abascoInventory.filter(item => {
      const fullText = ((item.title || '') + ' ' + (item.specs || '') + ' ' + (item.brand || '')).toUpperCase();
      if (val === 'BLACK' || val === 'أسود') return fullText.includes('BLACK') || fullText.includes('أسود');
      if (val === 'WHITE' || val === 'أبيض') return fullText.includes('WHITE') || fullText.includes('أبيض');
      return fullText.includes(val);
    }).length;
    tag.textContent = `(${count})`;
  });
}

// تشغيل الفلترة التفاعلية عند الضغط على أي Checkbox
document.querySelectorAll('.filter-checkbox').forEach(chk => {
  chk.addEventListener('change', () => {
    state.currentPage = 1;
    const type = chk.getAttribute('data-type');
    const val = chk.value;

    if (chk.checked) {
      if (!activeFilters[type].includes(val)) activeFilters[type].push(val);
    } else {
      activeFilters[type] = activeFilters[type].filter(v => v !== val);
    }

    const countEl = document.getElementById(`count-${type}`);
    if (countEl) countEl.textContent = `تم تحديد ${activeFilters[type].length} عناصر`;
    executeFiltering();
  });
});

// زر إعادة التعيين لأي قسم
window.resetFilterGroup = function(type) {
  state.currentPage = 1;
  if (type === 'price') {
    const priceEl = document.getElementById('price-range');
    if (priceEl) priceEl.value = 4000;
    state.maxPrice = 4000;
    const disp = document.getElementById('max-price-display');
    if (disp) disp.textContent = 'حتى: 4,000 ج.م';
  } else {
    activeFilters[type] = [];
    document.querySelectorAll(`.filter-checkbox[data-type="${type}"]`).forEach(c => c.checked = false);
    const countEl = document.getElementById(`count-${type}`);
    if (countEl) countEl.textContent = 'تم تحديد 0 عناصر';
  }
  executeFiltering();
};

// تنفيذ الفلترة الفعلية على المنتجات
function executeFiltering() {
  let result = [...abascoInventory];

  // 1. فلتر المخزون
  if (document.getElementById('stock-filter')?.checked) {
    result = result.filter(item => item.inStock === true || (Number(item.stock) > 0));
  }

  // 2. فلتر السعر
  result = result.filter(item => Number(item.price) <= state.maxPrice);

  // 3. فلتر البحث
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    result = result.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      (item.specs && item.specs.toLowerCase().includes(q))
    );
  }

  // 4. فلتر تصنيف الهيدر
  if (state.selectedCategory !== 'all') {
    result = result.filter(item => item.category === state.selectedCategory);
  }

  // 5. تطبيق خيارات الفلترة المختارة في كل الأقسام
  for (const [key, selectedVals] of Object.entries(activeFilters)) {
    if (selectedVals.length > 0) {
      result = result.filter(item => {
        const itemText = ((item.title || '') + ' ' + (item.specs || '') + ' ' + (item.brand || '')).toUpperCase();
        return selectedVals.some(val => {
          if (key === 'brand') return item.brand && item.brand.toUpperCase() === val.toUpperCase();
          if (val === 'Black') return itemText.includes('BLACK') || itemText.includes('أسود');
          if (val === 'White') return itemText.includes('WHITE') || itemText.includes('أبيض');
          return itemText.includes(val.toUpperCase());
        });
      });
    }
  }

  // 6. الترتيب
  if (state.currentSort === 'price-asc') {
    result.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (state.currentSort === 'price-desc') {
    result.sort((a, b) => Number(b.price) - Number(a.price));
  }

  // تحديث عدادات الأرقام في الفلاتر بناء على أحدث بيانات
  updateFilterCounts();
  renderCatalog(result);
}

// فتح وغلق صناديق التصفية
document.querySelectorAll('.filter-card-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

// فتح وغلق الشريط الجانبي للتصفية
document.getElementById('filter-toggle-btn')?.addEventListener('click', () => {
  document.querySelector('.dream-main-layout')?.classList.toggle('sidebar-active');
});

// فلتر متوفر بالمخزون
document.getElementById('stock-filter')?.addEventListener('change', () => {
  state.currentPage = 1;
  executeFiltering();
});

// شريط السعر
DOM.priceRange?.addEventListener('input', (e) => {
  state.maxPrice = parseFloat(e.target.value);
  if (DOM.maxPriceDisplay) DOM.maxPriceDisplay.textContent = `حتى: ${state.maxPrice.toLocaleString('ar-EG')} ج.م`;
  state.currentPage = 1;
  executeFiltering();
});

// البحث الفوري
DOM.searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  state.searchQuery = DOM.searchInput.value;
  state.selectedCategory = DOM.searchCategory.value;
  state.currentPage = 1;
  executeFiltering();
});

DOM.searchInput?.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  state.currentPage = 1;
  executeFiltering();
});

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

// قائمة الترتيب
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
    executeFiltering();
  });
});

// إدارة كمية الكرت
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
  const product = abascoInventory.find(p => String(p.id) === String(productId));
  if (!product) return;

  const addedQty = state.quantities[productId] || 1;
  const existing = state.cart.find(item => String(item.id) === String(productId));

  if (existing) {
    existing.quantity += addedQty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.title,
      price: Number(product.price),
      image: product.image || 'logo.png',
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

// نافذة نظرة سريعة
window.openQuickModal = function(id) {
  const product = abascoInventory.find(p => String(p.id) === String(id));
  if (!product || !DOM.quickModalOverlay) return;

  DOM.quickModalContent.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <div style="width: 170px; height: 170px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px solid var(--border-color);">
        <img src="${product.image || 'logo.png'}" alt="${product.title}" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 220px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: var(--dream-green);">${product.brand || ''}</span>
        <h3 style="font-size: 1.05rem; font-weight: 800; margin: 4px 0 8px;">${product.title}</h3>
        <div style="font-size: 1.25rem; font-weight: 900; color: var(--discount-red); margin-bottom: 8px;">
          LE ${Number(product.price).toFixed(2)}
          ${product.oldPrice ? `<small style="font-size: 0.8rem; color: var(--text-subtle); text-decoration: line-through; margin-right: 6px;">LE ${Number(product.oldPrice).toFixed(2)}</small>` : ''}
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">${product.specs || ''}</p>
        <button class="btn-dream-choose" style="padding: 10px 20px;" onclick="addToCartDirect('${product.id}'); DOM.quickModalOverlay.classList.remove('active');">
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

// جلب المنتجات الحقيقية من Firestore
async function fetchProductsFromFirebase() {
  const container = document.getElementById('catalog-products-container');
  if (container) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.5rem; color: var(--dream-green); margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800;">جاري تحميل المنتجات من قاعدة البيانات...</h3>
      </div>
    `;
  }

  try {
    const snapshot = await db.collection('products').get();
    if (snapshot.empty) {
      await seedInitialProducts();
      return;
    }

    abascoInventory = [];
    snapshot.forEach(doc => {
      abascoInventory.push({ id: doc.id, ...doc.data() });
    });

    state.products = [...abascoInventory];
    executeFiltering();
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    if (container) {
      container.innerHTML = `<h3 style="grid-column: 1 / -1; text-align: center; color: red;">فشل الاتصال بقاعدة البيانات. تأكد من إعدادات الـ Rules.</h3>`;
    }
  }
}

// رفع المنتجات المبدئية لمرة واحدة إن كانت قاعدة البيانات فارغة
async function seedInitialProducts() {
  const initialData = [
    {
      title: 'سامسونج شاحن منزلي بقوة 45 واط مع كابل من Type-C إلي Type-C بطول 1.8 متر',
      brand: 'Samsung',
      category: 'chargers',
      price: 1999.00,
      oldPrice: 2360.00,
      discount: '361.00',
      rating: 5,
      ratingCount: 12,
      specs: 'الماركة: سامسونج | شحن فائق السرعة 2.0 كحد أقصى 45 واط | كابل تايب سي 1.8 متر.',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      stock: 15,
      inStock: true
    },
    {
      title: 'سامسونج 25 واط شاحن PD Type-C',
      brand: 'Samsung',
      category: 'chargers',
      price: 449.00,
      oldPrice: 529.00,
      discount: '80.00',
      rating: 4,
      ratingCount: 8,
      specs: 'النوع: Adapter | الطاقة: 25 Watt | شحن فائق السرعة للبقاء على قيد الحياة.',
      image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      stock: 20,
      inStock: true
    },
    {
      title: 'أنكر زولو شاحن 30 واط، A2698L11 - أسود فائق السرعة',
      brand: 'Anker',
      category: 'chargers',
      price: 729.00,
      oldPrice: 859.00,
      discount: '130.00',
      rating: 5,
      ratingCount: 19,
      specs: 'النوع: شاحن طاقة | شحن سريع بقوة 30 واط | منفذ USB-C.',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      stock: 10,
      inStock: true
    },
    {
      title: 'سامسونج EP-T2510 شاحن محول طاقة 25 واط يو اس بي-C',
      brand: 'Samsung',
      category: 'chargers',
      price: 749.00,
      oldPrice: 879.00,
      discount: '130.00',
      rating: 4,
      ratingCount: 6,
      specs: 'الطاقة: 25 واط | منفذ يو اس بي-C | اللون: أسود.',
      image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      stock: 0,
      inStock: false
    }
  ];

  for (const item of initialData) {
    await db.collection('products').add(item);
  }
  fetchProductsFromFirebase();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProductsFromFirebase();
  syncCartBadge();
});
/* ==========================================================================
   نظام الدخول السري للوحة تحكم المدير (Admin Secret Access)
   ========================================================================== */

// كلمة المرور السرية الخاصة بك للدخول (يمكنك تغييرها لاحقاً)
const ADMIN_SECRET_PASS = "abasco2026";

function requestAdminAccess() {
  const pass = prompt("🔐 منطقة إدارة محل عباسكو\nيرجى إدخال كلمة المرور:");
  if (pass === ADMIN_SECRET_PASS) {
    alert("مرحباً بك يا قدوة! جاري التوجيه للوحة التحكم...");
    window.location.href = "admin.html";
  } else if (pass !== null) {
    alert("❌ كلمة المرور غير صحيحة!");
  }
}

// 1. الدخول عبر اختصار لوحة المفاتيح: Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
    e.preventDefault();
    requestAdminAccess();
  }
});

// 2. الدخول بالنقر 5 مرات متتالية على اللوجو
let logoClickCount = 0;
let logoTimer = null;

document.querySelector('.main-store-logo')?.addEventListener('click', (e) => {
  logoClickCount++;
  clearTimeout(logoTimer);

  // إعادة تصفير العداد بعد ثانيتين ونصف إذا لم تكتمل النقرات
  logoTimer = setTimeout(() => {
    logoClickCount = 0;
  }, 2500);

  if (logoClickCount >= 5) {
    e.preventDefault();
    logoClickCount = 0;
    requestAdminAccess();
  }
});
// ==========================================================================
// محرك تبديل الصور الأربعة بالماوس (Scrub on Hover)
// ==========================================================================
window.setCardSlice = function(productId, sliceIndex) {
  const prod = abascoInventory.find(p => String(p.id) === String(productId));
  if (!prod) return;

  const imgEl = document.getElementById(`prod-img-${productId}`);
  const dashesBox = document.getElementById(`dashes-${productId}`);

  // تغيير مسار الصورة للربع المستهدف
  if (imgEl && prod.images && prod.images[sliceIndex]) {
    imgEl.src = prod.images[sliceIndex];
  }

  // تحريك الخط الأسود للربع النشط
  if (dashesBox) {
    const dashes = dashesBox.querySelectorAll('span');
    dashes.forEach((d, idx) => {
      if (idx === sliceIndex) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }
};

// إعادة الصورة للوضع الأصلي عند خروج الماوس من الكارت
window.resetCardSlice = function(productId) {
  window.setCardSlice(productId, 0);
};
