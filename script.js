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
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80'
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
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
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
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80'
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
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
    ],
    stock: 8,
    inStock: true
  }
];
// حفظ المنتجات في الذاكرة لتفتح صفحة المنتج فورياً في 0 ثانية
localStorage.setItem('abasco_store_inventory', JSON.stringify(abascoInventory));
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

<div class="card-image-pane">
${product.discount ? `<span class="discount-ribbon-tag">وفر ${product.discount} جنيه</span>` : ''}
            
            <!-- زر العين الخضراء السريع -->
            <button class="quick-hover-eye" onclick="window.location.href='product.html?id=${product.id}'" title="نظرة سريعة">
              <i class="fa-solid fa-eye"></i>
            </button>

<div class="media-square-box" onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
              <img id="prod-img-${product.id}" src="${(product.images && product.images.filter(Boolean)[0]) || product.image || 'logo.png'}" alt="${product.title}" loading="lazy">
            </div>

            <!-- خط المؤشرات بعدد الصور الفعلي (1 إلى 4) -->
            ${(() => {
              const imgCount = (product.images && product.images.filter(Boolean).length) || 1;
              if (imgCount <= 1) return '';
              let dashes = '';
              for (let i = 0; i < imgCount; i++) dashes += `<span class="${i === 0 ? 'active' : ''}"></span>`;
              return `<div class="image-dash-indicators" id="dashes-${product.id}">${dashes}</div>`;
            })()}
          </div>
        </div>

        <div class="card-bottom-actions-full">
<button class="btn-quick-view-olive" onclick="window.location.href='product.html?id=${product.id}'">نظرة سريعة</button>          
          <button class="btn-choose-option-green" onclick="addToCartDirect('${product.id}')" ${!isAvailable ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
            ${isAvailable ? 'اختر اللون' : 'غير متوفر'}            
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

  stopAllCardSliders();
  startCardSliders(currentItemsPage);
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
  // توجيه العميل لصفحة المنتج علشان يختار اللون المطلوب
  window.location.href = `product.html?id=${productId}`;
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
      DOM.chatLink.href = 'https://wa.me/201125408111';
      DOM.chatIcon.className = 'fa-brands fa-whatsapp chat-icon';
    } else {
      DOM.chatLink.className = 'chat-circle-link messenger-mode';
      DOM.chatLink.href = 'https://m.me/abascostore';
      DOM.chatIcon.className = 'fa-brands fa-facebook-messenger chat-icon';
    }
    DOM.chatIcon.classList.remove('rotate-anim');
  }, 250);
}, 5000);

// ==========================================================================
// جلب وعرض المنتجات فوراً (0 ثانية وبدون أي شاشة تحميل نهائياً)
// ==========================================================================
function fetchProductsFromFirebase() {
  // 1. عرض المنتجات في الصفحة فوراً في جزء من الثانية من الكاش دون أي انتظار
  if (abascoInventory && abascoInventory.length > 0) {
    state.products = [...abascoInventory];
    executeFiltering();
  }

  // 2. تحديث لحظي من الفايربيز في الخلفية بدون لودينج ولا رسائل توقف الصفحة
  db.collection('products').onSnapshot((snapshot) => {
    if (!snapshot.empty) {
      abascoInventory = [];
      snapshot.forEach(doc => {
        abascoInventory.push({ id: doc.id, ...doc.data() });
      });

      // تحديث الذاكرة والواجهة بسلاسة تامة
      localStorage.setItem('abasco_store_inventory', JSON.stringify(abascoInventory));
      state.products = [...abascoInventory];
      executeFiltering();
    } else if (!abascoInventory || abascoInventory.length === 0) {
      if (typeof seedInitialProducts === 'function') {
        seedInitialProducts();
      }
    }
  }, (error) => {
    console.warn("تنبيه اتصال: يتم عرض المنتجات من النسخة المحفوظة محلياً.");
  });
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

// مزامنة الماركات وقائمة الأقسام الحية من الفايربيز مع الاندكس
async function syncLiveTaxonomy() {
  let liveBrands = JSON.parse(localStorage.getItem('abasco_store_brands')) || [];
  let liveCategories = JSON.parse(localStorage.getItem('abasco_store_categories')) || [];

  try {
    const doc = await db.collection('settings').doc('taxonomy').get();
    if (doc.exists) {
      const data = doc.data();
      if (data.brands) liveBrands = data.brands;
      if (data.categories) liveCategories = data.categories;
    }
  } catch(e) {}

  // 1. تحديث قائمة الماركات في الشريط الجانبي
  const brandsContainer = document.getElementById('brand-checkboxes-container');
  if (brandsContainer && liveBrands.length > 0) {
    brandsContainer.innerHTML = liveBrands.map(b => `
      <label class="custom-chk">
        <span>${b} <b class="count-tag" data-val="${b}">(0)</b></span>
        <input type="checkbox" class="filter-checkbox" data-type="brand" value="${b}">
      </label>
    `).join('');

    // إعادة ربط أحداث الفلترة على الماركات الجديدة
    brandsContainer.querySelectorAll('.filter-checkbox').forEach(chk => {
      chk.addEventListener('change', () => {
        state.currentPage = 1;
        const val = chk.value;
        if (chk.checked) {
          if (!activeFilters.brand.includes(val)) activeFilters.brand.push(val);
        } else {
          activeFilters.brand = activeFilters.brand.filter(v => v !== val);
        }
        executeFiltering();
      });
    });
  }

  // 2. تحديث قائمة الأقسام المنسدلة في شريط البحث العلوي
  const catSelect = document.getElementById('search-category');
  if (catSelect && liveCategories.length > 0) {
    catSelect.innerHTML = `<option value="all">جميع الفئات</option>` + liveCategories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join('');
  }
}

// ==========================================================================
// نظام العروض النارية فوق شريط الأقسام
// ==========================================================================
let offersSlideIndex = 0;
let offersSlideInterval = null;
let offersDataList = [];

async function loadHotOffersBanner() {
  const section = document.getElementById('hot-offers-section');
  const track = document.getElementById('offers-slides-track');
  const dotsBox = document.getElementById('offers-dots-strip');
  if (!section || !track || !dotsBox) return;

  try {
    const doc = await db.collection('settings').doc('offers').get();
    if (!doc.exists || !doc.data().items || doc.data().items.length === 0) {
      section.style.display = 'none';
      return;
    }

    const offerItems = doc.data().items;
    const productDocs = await Promise.all(
      offerItems.map(o => db.collection('products').doc(String(o.productId)).get())
    );

    offersDataList = [];
    productDocs.forEach((pDoc, idx) => {
      if (pDoc.exists) {
        offersDataList.push({ ...pDoc.data(), id: pDoc.id, badge: offerItems[idx].badge || '🔥 عرض النار' });
      }
    });

    if (offersDataList.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';

    track.innerHTML = offersDataList.map(item => `
      <div class="offer-slide-card" onclick="window.location.href='product.html?id=${item.id}'">
        <div class="offer-slide-image">
          <img src="${(item.images && item.images[0]) || item.image || 'logo.png'}" alt="${item.title}">
        </div>
        <div class="offer-slide-info">
          <span class="offer-slide-badge">${item.badge}</span>
          <div class="offer-slide-title">${item.title}</div>
          <div class="offer-slide-prices">
            <span class="offer-slide-price-new">LE ${Number(item.price).toFixed(2)}</span>
            ${item.oldPrice ? `<span class="offer-slide-price-old">LE ${Number(item.oldPrice).toFixed(2)}</span>` : ''}
          </div>
        </div>
        <span class="offer-slide-cta">اطلب الآن <i class="fa-solid fa-arrow-left"></i></span>
      </div>
    `).join('');

    dotsBox.innerHTML = offersDataList.length > 1
      ? offersDataList.map((_, idx) => `<span class="offer-dot-item ${idx === 0 ? 'active' : ''}" onclick="goToOfferSlide(${idx})"></span>`).join('')
      : '';

    offersSlideIndex = 0;
    updateOffersSliderPosition();
    startOffersAutoSlide();
  } catch (e) {
    console.warn('تعذر تحميل العروض:', e.message);
    section.style.display = 'none';
  }
}

function updateOffersSliderPosition() {
  const track = document.getElementById('offers-slides-track');
  if (track) track.style.transform = `translateX(${-offersSlideIndex * 100}%)`;
  document.querySelectorAll('.offer-dot-item').forEach((dot, idx) => dot.classList.toggle('active', idx === offersSlideIndex));
}

window.goToOfferSlide = function(idx) {
  offersSlideIndex = idx;
  updateOffersSliderPosition();
  stopOffersAutoSlide();
  startOffersAutoSlide();
};

function startOffersAutoSlide() {
  stopOffersAutoSlide();
  if (offersDataList.length <= 1) return;
  offersSlideInterval = setInterval(() => {
    offersSlideIndex = (offersSlideIndex + 1) % offersDataList.length;
    updateOffersSliderPosition();
  }, 3000);
}

function stopOffersAutoSlide() {
  if (offersSlideInterval) clearInterval(offersSlideInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  syncLiveTaxonomy();
  fetchProductsFromFirebase();
  syncCartBadge();
  loadHotOffersBanner();
});
/* ==========================================================================
   نظام الدخول السري للوحة تحكم المدير (Admin Secret Access)
   ========================================================================== */

function requestAdminAccess() {
  window.location.href = "admin.html";
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
let cardSliderIntervals = {};

function stopAllCardSliders() {
  Object.values(cardSliderIntervals).forEach(id => clearInterval(id));
  cardSliderIntervals = {};
}

function startCardSliders(items) {
  items.forEach(product => {
    const imgs = (product.images && product.images.filter(Boolean)) || (product.image ? [product.image] : []);
    if (imgs.length <= 1) return; // منتج بصورة واحدة مايتبدلش

    let idx = 0;
    cardSliderIntervals[product.id] = setInterval(() => {
      idx = (idx + 1) % imgs.length;
      const imgEl = document.getElementById(`prod-img-${product.id}`);
      const dashesBox = document.getElementById(`dashes-${product.id}`);
      if (imgEl) imgEl.src = imgs[idx];
      if (dashesBox) {
        dashesBox.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    }, 2000);
  });
}
/* =========================================================
   تشغيل الميزات الإضافية لمحل عباسكو
   ========================================================= */

// 1. تشغيل التوست السريع
window.showToast = function(message) {
  const toast = document.getElementById('abasco-toast');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
};

// 2. فحص وعرض سكرينات آراء العملاء الحقيقية فقط
(async function initCompactReviews() {
  const track = document.getElementById('reviews-compact-track');
  const section = document.querySelector('.reviews-section-compact');
  if (!track || !section) return;

  let realReviews = [];

  // جلب الصور الحقيقية من Firestore إن وُجدت
  try {
    const snap = await db.collection('reviews').get();
    snap.forEach(doc => {
      const data = doc.data();
      if (data.image) realReviews.push(data.image);
    });
  } catch (e) {
    // في حالة عدم وجود كولكشن reviews يتم فحص التخزين المحلي
    realReviews = JSON.parse(localStorage.getItem('abasco_store_reviews')) || [];
  }

  // إذا لم يتم رفع أي سكرينات بعد
  if (realReviews.length === 0) {
    track.parentElement.innerHTML = `
      <div style="text-align: center; padding: 24px; background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: 12px; margin: 10px auto; max-width: 500px;">
        <i class="fa-regular fa-clock" style="font-size: 1.8rem; color: var(--dream-green); margin-bottom: 8px;"></i>
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">لم يتم نشر تجارب أو محادثات بعد</h4>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">سيتم إضافة لقطات شاشة لآراء المشترين فور استلام وتقييم الشحنات الأولى.</p>
      </div>
    `;
    return;
  }

  // عرض السكرينات الحقيقية وتكرارها للشريط الانسيابي
  const html = realReviews.map(img => `
    <div class="review-mini-card" onclick="openReviewLightbox('${img}')">
      <img src="${img}" alt="رأي العميل">
    </div>
  `).join('');

  track.innerHTML = realReviews.length > 2 ? (html + html) : html;
})();

window.openReviewLightbox = function(src) {
  const lb = document.getElementById('reviews-lightbox');
  const img = document.getElementById('lightbox-img');
  if (lb && img) {
    img.src = src;
    lb.classList.add('open');
  }
};

// 3. نظام كوبونات الخصم في السلة
(function initCouponSystem() {
  const applyBtn = document.getElementById('apply-coupon-btn');
  const input = document.getElementById('coupon-code-input');
  const msg = document.getElementById('coupon-msg');
  const discountRow = document.getElementById('discount-row');
  const discountDisplay = document.getElementById('discount-display');
  const finalTotalEl = document.getElementById('final-total-display');

  if (!applyBtn || !input) return;

  const validCoupons = {
    'ABASCO10': 0.10, // خصم 10%
    'ABASCO50': 50    // خصم 50 جنيه
  };

  applyBtn.addEventListener('click', () => {
    const code = input.value.trim().toUpperCase();
    const cart = JSON.parse(localStorage.getItem('abasco_raya_cart')) || [];
    const totalPrice = cart.reduce((acc, i) => acc + (Number(i.price) * (Number(i.quantity) || 1)), 0);

    if (totalPrice <= 0) return;

    if (validCoupons[code]) {
      let discountVal = 0;
      if (validCoupons[code] < 1) {
        discountVal = totalPrice * validCoupons[code];
      } else {
        discountVal = validCoupons[code];
      }

      msg.style.display = 'block';
      msg.style.color = 'var(--dream-green)';
      msg.textContent = `✅ تم تفعيل الكود وخصم ${discountVal.toFixed(2)} ج.م بنجاح!`;

      discountRow.style.display = 'flex';
      discountDisplay.textContent = `- LE ${discountVal.toFixed(2)}`;

      const newTotal = Math.max(0, totalPrice - discountVal);
      if (finalTotalEl) finalTotalEl.textContent = `LE ${newTotal.toFixed(2)}`;
      localStorage.setItem('abasco_discount_val', discountVal);
    } else {
      msg.style.display = 'block';
      msg.style.color = 'var(--discount-red)';
      msg.textContent = '❌ كود الخصم غير صحيح أو منتهي الصلاحية!';
    }
  });
})();

// 4. تقييم النجوم التفاعلي
(function initInteractiveRating() {
  const stars = document.querySelectorAll('#user-star-picker .star-item');
  const feedback = document.getElementById('rating-feedback');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');
      if (feedback) feedback.style.display = 'inline';
      window.showToast?.("شكراً لتقييمك للمنتج! ⭐");
    });
  });
})();

// 5. جلب الموقع الجغرافي بالخريطة في صفحة الـ Checkout
document.getElementById('btn-geo-location')?.addEventListener('click', () => {
  const statusText = document.getElementById('geo-status-text');
  const mapInput = document.getElementById('geo-map-link');
  const addressBox = document.getElementById('order-address');

  if (!navigator.geolocation) {
    alert("خاصية تحديد الموقع غير مدعومة في متصفحك.");
    return;
  }

  statusText.style.display = 'block';
  statusText.textContent = "جاري التقاط إحداثيات موقعك عبر الأقمار الصناعية...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      if (mapInput) mapInput.value = mapUrl;
      if (addressBox) addressBox.value += `\n[موقعي على الخريطة: ${mapUrl}]`;
      statusText.textContent = "✅ تم تثبيت موقعك الجغرافي بنجاح لمساعدة المندوب!";
    },
    (err) => {
      statusText.textContent = "تعذر تحديد الموقع تلقائياً. يرجى كتابة العنوان يدوياً.";
    }
  );
});
// =========================================================
// المحرك التنفيذي الحي لتطبيق الألوان الفورية وحالة الصيانة
// =========================================================

// 1. تطبيق الثيم واللون فورياً بدون مقاومة
window.applyLiveThemeEngine = function(colorVal) {
  if (!colorVal) return;

  const isGrad = colorVal.includes('gradient');
  const isWhite = colorVal.toLowerCase() === '#ffffff' || colorVal.toLowerCase() === 'white';
  const contrastText = isWhite ? '#000000' : '#ffffff';

  // تحديث متغيرات CSS في الصفحة
  document.documentElement.style.setProperty('--dream-green', isWhite ? '#ffffff' : colorVal);
  document.documentElement.style.setProperty('--dream-green-hover', isWhite ? '#f3f4f6' : colorVal);

  let dynamicStyle = document.getElementById('abasco-live-theme-injector');
  if (!dynamicStyle) {
    dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'abasco-live-theme-injector';
    document.head.appendChild(dynamicStyle);
  }

  const bgRule = isGrad 
    ? `background: ${colorVal} !important; background-image: ${colorVal} !important; color: #fff !important;` 
    : `background-color: ${colorVal} !important; color: ${contrastText} !important;`;

  dynamicStyle.innerHTML = `
    .btn-choose-option-green,
    .btn-detail-add-cart,
    .btn-proceed-checkout,
    .single-center-badge,
    .search-submit-btn,
    .switch-ui input:checked + .slider-switch,
    .capsule-verified-tag,
    .dream-pagination-bar .page-num.active {
      ${bgRule}
      border: ${isWhite ? '1.5px solid #cbd5e1 !important' : 'none !important'};
    }
    .brand-en,
    .overview-brand-tag,
    .store-hours {
      color: ${isWhite ? '#111827' : (isGrad ? '#7cb342' : colorVal)} !important;
    }
    .dream-product-card:hover {
      border-color: ${isWhite ? '#cbd5e1' : (isGrad ? '#7cb342' : colorVal)} !important;
    }
    .dream-product-card::before {
      background: conic-gradient(transparent 0deg, transparent 180deg, ${isWhite ? '#cbd5e1' : (isGrad ? '#7cb342' : colorVal)} 270deg, transparent 320deg) !important;
    }
  `;
};

// 2. تطبيق وفحص حالة إغلاق المتجر (شاشة الصيانة)
window.applyStoreClosedState = function(isClosed) {
  const modal = document.getElementById('store-closed-modal');
  if (!modal) return;
  if (isClosed) {
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflow = 'hidden';
  } else {
    modal.style.setProperty('display', 'none', 'important');
    document.body.style.overflow = '';
  }
};

// تشغيل الفحص والمزامنة فور تحميل الصفحة
(function initStoreLiveState() {
  // فحص وتطبيق اللون
  const savedColor = localStorage.getItem('abasco_primary_color');
  if (savedColor) window.applyLiveThemeEngine(savedColor);

  // فحص وتطبيق حالة الإغلاق
  const savedClosed = localStorage.getItem('abasco_store_closed') === 'true';
  window.applyStoreClosedState(savedClosed);

  // المزامنة الحية المباشرة مع Firebase لجميع الزوار فوراً
  if (typeof db !== 'undefined') {
    db.collection('settings').doc('status').onSnapshot(doc => {
      if (doc.exists) {
        const closed = doc.data().isClosed === true;
        localStorage.setItem('abasco_store_closed', closed ? 'true' : 'false');
        window.applyStoreClosedState(closed);
      }
    }, err => {});

    db.collection('settings').doc('appearance').onSnapshot(doc => {
      if (doc.exists && doc.data().primaryColor) {
        const col = doc.data().primaryColor;
        localStorage.setItem('abasco_primary_color', col);
        window.applyLiveThemeEngine(col);
      }
    }, err => {});

    db.collection('settings').doc('coupons').onSnapshot(doc => {
      if (doc.exists) {
        localStorage.setItem('abasco_coupons_db', JSON.stringify(doc.data()));
      }
    }, err => {});
  }
})();
// محرك تبديل نصوص الشريط الإعلاني كل 3 ثوانٍ بتأثير التلاشي
(function initFadingTicker() {
  const tickerEl = document.getElementById('fade-ticker-text');
  if (!tickerEl) return;

  const savedTicker = JSON.parse(localStorage.getItem('abasco_ticker_data'));
  const messages = (savedTicker && savedTicker.length) ? savedTicker.filter(Boolean) : [
    '🔥 عروض عباسكو الحصرية على شواحن وكابلات GaN الأصلية',
    '🚚 معاينة الشحنة بالكامل وفحص المنتج أمام المندوب قبل دفع أي مبالغ',
    '⚡ شواحن أنكر وسامسونج ويوجرين الأصلية بضمان استبدال فوري',
    '💵 الدفع نقداً عند الاستلام كاش بكل أمان'
  ];

  let currentIndex = 0;
  tickerEl.textContent = messages[0];

  setInterval(() => {
    tickerEl.classList.add('fade-out');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      tickerEl.textContent = messages[currentIndex];
      tickerEl.classList.remove('fade-out');
    }, 400);
  }, 3000);
})();
