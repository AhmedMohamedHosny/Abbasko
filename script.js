/**
 * ==========================================================================
 * متجر عباسكو (Abasco) - إكسسوارات الهواتف المحمولة
 * الملف: script.js
 * الوظائف: إدارة الكتالوج، الوضع الليلي، الفلاتر، المعاينة، وزر الشات المتناوب
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. قاعدة بيانات المنتجات المطابقة للصور (Dream 2000 Inventory)
   ========================================================================== */
const abascoInventory = [
  {
    id: 1,
    title: 'أنكر زولو شاحن 30 واط، A2698L11 - أسود فائق السرعة',
    brand: 'Anker',
    category: 'chargers',
    price: 729.00,
    oldPrice: 859.00,
    discount: '130.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 2,
    title: 'سامسونج EP-T2510 شاحن محول طاقة 25 واط يو اس بي-C',
    brand: 'Samsung',
    category: 'chargers',
    price: 749.00,
    oldPrice: 879.00,
    discount: '130.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 3,
    title: 'سامسونج شاحن منزلي بقوة 45 واط مع كابل من Type-C إلى Type-C بطول 1.8 متر',
    brand: 'Samsung',
    category: 'chargers',
    price: 1999.00,
    oldPrice: 2360.00,
    discount: '361.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 4,
    title: 'سامسونج 25 واط شاحن PD Type-C أصلي سريع',
    brand: 'Samsung',
    category: 'chargers',
    price: 449.00,
    oldPrice: 529.00,
    discount: '80.00',
    rating: 5,
    ratingCount: 1,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 5,
    title: 'سامسونج EP-P3400 باور بانك 10000 مللي أمبير 25 واط شحن سريع',
    brand: 'Samsung',
    category: 'powerbanks',
    price: 1899.00,
    oldPrice: 2299.00,
    discount: '400.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 6,
    title: 'أنكر كابل A8752H11 من Type-C إلى Type-C طول 3.3 قدم، وشحن سريع 60 واط',
    brand: 'Anker',
    category: 'chargers',
    price: 219.00,
    oldPrice: 259.00,
    discount: '40.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 7,
    title: 'شاومي باور بانك 10000 مللي أمبير، 22.5 واط لايت رمادي فاتح',
    brand: 'Xiaomi',
    category: 'powerbanks',
    price: 799.00,
    oldPrice: 889.00,
    discount: '90.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
    inStock: true
  },
  {
    id: 8,
    title: 'يوجرين HP203 HiTune Max5c سماعات أذن لاسلكية مع خاصية إلغاء الضوضاء',
    brand: 'Ugreen',
    category: 'audio',
    price: 3860.00,
    oldPrice: 4550.00,
    discount: '690.00',
    rating: 0,
    ratingCount: 0,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
    inStock: true
  }
];

/* ==========================================================================
   2. حالة التطبيق العامة (App State)
   ========================================================================== */
const state = {
  products: [...abascoInventory],
  cart: JSON.parse(localStorage.getItem('abasco_raya_cart')) || [],
  selectedCategory: 'all',
  searchQuery: '',
  selectedBrand: 'all',
  maxPrice: 4000,
  inStockOnly: true,
  currentSort: 'featured',
  quantities: {}
};

/* ==========================================================================
   3. عناصر الواجهة (DOM Cache)
   ========================================================================== */
const DOM = {
  productsContainer: document.getElementById('catalog-products-container'),
  productsCountNum: document.getElementById('products-count-num'),
  cartCounter: document.getElementById('cart-counter'),
  mobCartCounter: document.getElementById('mob-cart-counter'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  searchCategory: document.getElementById('search-category'),
  sortSelect: document.getElementById('sort-select'),
  darkModeCheckbox: document.getElementById('dark-mode-checkbox'),
  priceRange: document.getElementById('price-range'),
  maxPriceDisplay: document.getElementById('max-price-display'),
  stockFilter: document.getElementById('stock-filter'),
  subnavLinks: document.querySelectorAll('.subnav-links-list a'),
  
  // المعاينة السريعة
  quickModalOverlay: document.getElementById('quick-modal-overlay'),
  quickModalContent: document.getElementById('quick-modal-content'),
  closeQuickModal: document.getElementById('close-quick-modal'),
  
  // زر الشات المتناوب
  chatBtn: document.getElementById('alternating-chat-btn'),
  chatLink: document.getElementById('chat-link'),
  chatIcon: document.getElementById('chat-icon')
};

/* ==========================================================================
   4. عرض وتوليد كروت المنتجات (Render Products)
   ========================================================================== */
function renderStars(rating) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    } else {
      starsHtml += '<i class="fa-regular fa-star" style="color:#d1d5db;"></i>';
    }
  }
  return starsHtml;
}

function renderCatalog(items) {
  if (!DOM.productsContainer) return;

  if (items.length === 0) {
    DOM.productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--bg-surface); border-radius: 12px; border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--dream-green); margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800;">لا توجد ملحقات مطابقة للتصفية حالياً</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem;">جرب ضبط نطاق السعر أو اختيار ماركة أخرى.</p>
      </div>
    `;
    if (DOM.productsCountNum) DOM.productsCountNum.textContent = '0';
    return;
  }

  if (DOM.productsCountNum) DOM.productsCountNum.textContent = items.length;

  DOM.productsContainer.innerHTML = items.map(product => {
    const qty = state.quantities[product.id] || 1;
    return `
      <article class="dream-product-card" data-id="${product.id}">
        <span class="discount-ribbon-tag">وفر ${product.discount} جنيه</span>
        
        <div class="card-media-box">
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
          </a>
          <button class="quick-view-eye-btn" onclick="openQuickModal(${product.id})" title="معاينة سريعة">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="card-meta-box">
          <span class="brand-label-text">${product.brand}</span>
          
          <h3 class="product-item-title">
            <a href="product.html?id=${product.id}" title="${product.title}">${product.title}</a>
          </h3>

          <div class="card-stars-row">
            ${renderStars(product.rating)}
            <span>(${product.ratingCount})</span>
          </div>

          <div class="price-block-dream">
            <span class="price-val-red">LE ${product.price.toFixed(2)}</span>
            <span class="price-struck-gray">LE ${product.oldPrice.toFixed(2)}</span>
          </div>

          <div class="stock-dot-indicator">
            <span class="blue-dot"></span>
            <span>في المخزن</span>
          </div>

          <div class="card-bottom-action-row">
            <button class="btn-dream-choose" onclick="addToCartDirect(${product.id})">Choose option</button>
            <div class="item-mini-stepper">
              <button class="mini-step-btn" onclick="modifyCardQty(${product.id}, 1)">+</button>
              <span class="mini-step-val" id="stepper-val-${product.id}">${qty}</span>
              <button class="mini-step-btn" onclick="modifyCardQty(${product.id}, -1)">-</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   5. إدارة العداد السريع في كرت المنتج (Mini Stepper)
   ========================================================================== */
window.modifyCardQty = function(id, delta) {
  let current = state.quantities[id] || 1;
  current += delta;
  if (current < 1) current = 1;
  state.quantities[id] = current;
  
  const el = document.getElementById(`stepper-val-${id}`);
  if (el) el.textContent = current;
};

/* ==========================================================================
   6. عربة التسوق والتحديث (Cart Functions)
   ========================================================================== */
function syncCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (DOM.cartCounter) DOM.cartCounter.textContent = totalCount;
  if (DOM.mobCartCounter) DOM.mobCartCounter.textContent = totalCount;
}

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
  
  // إعادة تعيين العداد للرقم 1
  state.quantities[productId] = 1;
  const el = document.getElementById(`stepper-val-${productId}`);
  if (el) el.textContent = 1;

  alert(`تمت إضافة (${addedQty}) قطع من:\n"${product.title}"\nإلى سلة المشتريات بنجاح!`);
};

/* ==========================================================================
   7. زر المحادثة العائم المتناوب (WhatsApp & Messenger Auto-Toggle 5s)
   ========================================================================== */
function setupAlternatingChat() {
  if (!DOM.chatLink || !DOM.chatIcon) return;

  let isWhatsAppMode = true;

  setInterval(() => {
    isWhatsAppMode = !isWhatsAppMode;

    // تشغيل أنيميشن الالتفاف
    DOM.chatIcon.classList.add('rotate-anim');

    setTimeout(() => {
      if (isWhatsAppMode) {
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

  }, 5000); // يتغير بدقة كل 5 ثوانٍ
}

/* ==========================================================================
   8. الوضع الليلي (Dark Mode Engine)
   ========================================================================== */
function setupDarkMode() {
  const savedMode = localStorage.getItem('abasco_dark_mode');
  
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    if (DOM.darkModeCheckbox) DOM.darkModeCheckbox.checked = true;
  }

  DOM.darkModeCheckbox?.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('abasco_dark_mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('abasco_dark_mode', 'disabled');
    }
  });
}

/* ==========================================================================
   9. الفلترة والتصفية والبحث (Filters & Search)
   ========================================================================== */
function applyFilters() {
  let result = [...abascoInventory];

  // 1. فلتر القسم
  if (state.selectedCategory !== 'all') {
    result = result.filter(item => item.category === state.selectedCategory);
  }

  // 2. فلتر نص البحث
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    result = result.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.brand.toLowerCase().includes(q)
    );
  }

  // 3. فلتر السعر الأقصى
  result = result.filter(item => item.price <= state.maxPrice);

  // 4. فلتر الماركة
  if (state.selectedBrand !== 'all') {
    result = result.filter(item => item.brand.toLowerCase() === state.selectedBrand.toLowerCase());
  }

  // 5. الترتيب
  if (state.currentSort === 'low-price') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.currentSort === 'high-price') {
    result.sort((a, b) => b.price - a.price);
  } else if (state.currentSort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  renderCatalog(result);
}

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

// شريط الأقسام السريع
DOM.subnavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    DOM.subnavLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const href = link.getAttribute('href').replace('#', '');
    state.selectedCategory = href === 'all' ? 'all' : href;
    if (DOM.searchCategory) DOM.searchCategory.value = state.selectedCategory;
    applyFilters();
  });
});

// شريط السعر المنزلق
DOM.priceRange?.addEventListener('input', (e) => {
  state.maxPrice = parseFloat(e.target.value);
  if (DOM.maxPriceDisplay) {
    DOM.maxPriceDisplay.textContent = `حتى: ${state.maxPrice.toLocaleString('ar-EG')} ج.م`;
  }
  applyFilters();
});

// فلاتر الماركة
document.querySelectorAll('.accordion-body .custom-chk input[type="checkbox"]').forEach(chk => {
  chk.addEventListener('change', (e) => {
    if (e.target.value) {
      state.selectedBrand = e.target.value;
      applyFilters();
    }
  });
});

// تغيير الترتيب
DOM.sortSelect?.addEventListener('change', (e) => {
  state.currentSort = e.target.value;
  applyFilters();
});

// فتح وطي الأكورديون
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

/* ==========================================================================
   10. نافذة المعاينة السريعة (Quick View Modal)
   ========================================================================== */
window.openQuickModal = function(productId) {
  const product = abascoInventory.find(p => p.id === productId);
  if (!product || !DOM.quickModalOverlay || !DOM.quickModalContent) return;

  DOM.quickModalContent.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <div style="width: 180px; height: 180px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); padding: 10px;">
        <img src="${product.image}" alt="${product.title}" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 240px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: var(--dream-green);">${product.brand}</span>
        <h2 style="font-size: 1.1rem; font-weight: 800; margin: 6px 0 10px;">${product.title}</h2>
        <div style="font-size: 1.3rem; font-weight: 900; color: var(--discount-red); margin-bottom: 12px;">
          LE ${product.price.toFixed(2)}
          <small style="font-size: 0.85rem; color: var(--text-subtle); text-decoration: line-through; margin-right: 8px;">LE ${product.oldPrice.toFixed(2)}</small>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px;">
          منتج أصلي معتمد مع إمكانية فتح الشحنة ومعاينتها بالكامل أمام المندوب قبل سداد الثمن كاش عند الاستلام.
        </p>
        <button class="btn-dream-choose" style="padding: 10px 24px; font-size: 0.95rem;" onclick="addToCartDirect(${product.id}); closeQuickModalFunc();">
          أضف إلى عربة التسوق فوراً
        </button>
      </div>
    </div>
  `;

  DOM.quickModalOverlay.classList.add('active');
};

function closeQuickModalFunc() {
  DOM.quickModalOverlay?.classList.remove('active');
}

DOM.closeQuickModal?.addEventListener('click', closeQuickModalFunc);
DOM.quickModalOverlay?.addEventListener('click', (e) => {
  if (e.target === DOM.quickModalOverlay) closeQuickModalFunc();
});

/* ==========================================================================
   11. التهيئة والتشغيل عند التحميل (Init)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(state.products);
  syncCartBadge();
  setupDarkMode();
  setupAlternatingChat();
});
