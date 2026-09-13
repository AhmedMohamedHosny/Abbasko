/**
 * ==========================================================================
 * متجر عباسكو (Abasco) - إكسسوارات الهواتف المحمولة
 * الملف: script.js
 * الوظائف: إدارة المنتجات، السلايدر، شريط البحث النابض، السلة التفاعلية، وعجلة الحظ
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. قاعدة بيانات ملحقات الهواتف (Abasco Accessories Inventory)
   ========================================================================== */
const abascoCatalog = [
  {
    id: 1,
    name: 'جراب MagSafe مغناطيسي شفاف ومقاوم للصدمات لآيفون 15 و16 برو ماكس',
    category: 'cases',
    price: 349,
    regularPrice: 469,
    discountAmount: 120,
    rating: 4.9,
    reviewsCount: 142,
    installmentMonths: 12,
    installmentValue: 32,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر مبيعاً',
    inStock: true
  },
  {
    id: 2,
    name: 'شاحن GaN فائق السرعة بقدرة 65 واط بـ 3 منافذ Type-C + USB من عباسكو',
    category: 'chargers',
    price: 680,
    regularPrice: 850,
    discountAmount: 170,
    rating: 5.0,
    reviewsCount: 210,
    installmentMonths: 12,
    installmentValue: 62,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر مبيعاً',
    inStock: true
  },
  {
    id: 3,
    name: 'اسكرينة زجاجية يابانية 9D للحماية القصوى مع شبلونة سهلة التركيب',
    category: 'screen-protectors',
    price: 185,
    regularPrice: 250,
    discountAmount: 65,
    rating: 4.8,
    reviewsCount: 98,
    installmentMonths: 12,
    installmentValue: 18,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر مبيعاً',
    inStock: true
  },
  {
    id: 4,
    name: 'باور بانك 20,000 مللي أمبير بقوة 22.5W وشاشة رقمية لعرض نسبة الشحن',
    category: 'powerbanks',
    price: 799,
    regularPrice: 999,
    discountAmount: 200,
    rating: 4.9,
    reviewsCount: 165,
    installmentMonths: 12,
    installmentValue: 73,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر مبيعاً',
    inStock: true
  },
  {
    id: 5,
    name: 'سماعة أذن لاسلكية Pro بعزل ضوضاء فعال ANC وبطارية حتى 32 ساعة',
    category: 'audio',
    price: 899,
    regularPrice: 1199,
    discountAmount: 300,
    rating: 4.7,
    reviewsCount: 312,
    installmentMonths: 12,
    installmentValue: 82,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر مبيعاً',
    inStock: true
  },
  {
    id: 6,
    name: 'كابل نايلون مضفر فائق المتانة Type-C to Type-C بقوة 100W بطول 2 متر',
    category: 'chargers',
    price: 145,
    regularPrice: 210,
    discountAmount: 65,
    rating: 4.8,
    reviewsCount: 130,
    installmentMonths: 6,
    installmentValue: 26,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    tag: 'وصل حديثاً',
    inStock: true
  },
  {
    id: 7,
    name: 'حامل سيارة مغناطيسي MagSafe يثبت على فتحة المكيف بدوران 360 درجة',
    category: 'holders',
    price: 260,
    regularPrice: 340,
    discountAmount: 80,
    rating: 4.6,
    reviewsCount: 84,
    installmentMonths: 6,
    installmentValue: 46,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
    tag: 'عروض حصرية',
    inStock: true
  },
  {
    id: 8,
    name: 'إسوارة ساعة أبل وسامسونج من السيليكون الطبي المقاوم للتعرق',
    category: 'smartwatch',
    price: 120,
    regularPrice: 180,
    discountAmount: 60,
    rating: 4.5,
    reviewsCount: 62,
    installmentMonths: 3,
    installmentValue: 40,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
    tag: 'الأكثر طلباً',
    inStock: true
  }
];

/* ==========================================================================
   2. إدارة حالة المتجر وسلة الشراء (State Management)
   ========================================================================== */
const appState = {
  cart: JSON.parse(localStorage.getItem('abasco_raya_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('abasco_raya_wishlist')) || [],
  activeCategoryFilter: 'all',
  sliderIndex: 0
};

/* ==========================================================================
   3. عناصر الواجهة البرمجية (DOM Elements)
   ========================================================================== */
const UI = {
  cartDrawer: document.getElementById('cart-sidebar'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  closeCartBtn: document.getElementById('close-cart'),
  cartItemsContainer: document.getElementById('cart-items-list'),
  cartCountBadge: document.getElementById('cart-count'),
  cartDrawerCount: document.getElementById('cart-items-count'),
  cartFinalTotal: document.getElementById('cart-final-total'),
  clearCartBtn: document.getElementById('clear-cart-btn'),
  checkoutBtn: document.getElementById('checkout-btn'),
  
  // السلايدر والبحث
  searchInput: document.getElementById('search-input'),
  searchForm: document.getElementById('search-form'),
  bestsellerContainer: document.getElementById('bestseller-container'),
  dealTabButtons: document.querySelectorAll('.deal-tab-btn'),
  sliderPrev: document.querySelector('.arrow-prev'),
  sliderNext: document.querySelector('.arrow-next')
};

/* ==========================================================================
   4. حركة كتابة نص البحث التلقائي (Search Input Ticker / Typewriter)
   ========================================================================== */
const searchPlaceholders = [
  'ابحث عن كفر آيفون 16 برو ماكس...',
  'ابحث عن شاحن GaN سريع 65 واط...',
  'ابحث عن اسكرينات 9D مضادة للبصمات...',
  'ابحث عن باور بانك 20,000 مللي أمبير...',
  'ابحث عن سماعات عازلة للضوضاء ANC...'
];

let placeholderIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeSearchTicker() {
  if (!UI.searchInput) return;

  const currentPhrase = searchPlaceholders[placeholderIndex];
  
  if (isDeleting) {
    UI.searchInput.setAttribute('placeholder', currentPhrase.substring(0, charIndex - 1));
    charIndex--;
  } else {
    UI.searchInput.setAttribute('placeholder', currentPhrase.substring(0, charIndex + 1));
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 1800; // الانتظار بعد كتابة الجملة كاملة
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    placeholderIndex = (placeholderIndex + 1) % searchPlaceholders.length;
    typeSpeed = 400;
  }

  setTimeout(typeSearchTicker, typeSpeed);
}

/* ==========================================================================
   5. سلايدر البانر الترويجي التلقائي (Hero Slider Engine)
   ========================================================================== */
const sliderSlides = [
  {
    tag: 'موسم التخفيضات الكبرى | عروض المدارس والجامعات',
    title: 'جهّز هاتفك بأفضل الملحقات الأصلية',
    desc: 'خصم يصل إلى 40% على شواحن MagSafe، كفرات الصدمات المعتمدة، وبنوك الطاقة السريعة.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'شواحن GaN الذكية | أمان فائق ضد الحرارة',
    title: 'سرعة شحن خارقة تصل إلى 100W',
    desc: 'وفّر وقتك واشحن اللابتوب والهاتف معاً من رأس شاحن واحدة معتمدة بضمان عام كامل.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'حماية كاملة 360 درجة | مضادة للكسر',
    title: 'اسكرينات وكفرات صلبة بأعلى المعايير',
    desc: 'طبقات حماية يابانية 9D مع كفرات حواف هوائية تضمن حماية شاشتك من أقوى الصدمات.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
  }
];

function updateSlider(direction = 'next') {
  if (direction === 'next') {
    appState.sliderIndex = (appState.sliderIndex + 1) % sliderSlides.length;
  } else {
    appState.sliderIndex = (appState.sliderIndex - 1 + sliderSlides.length) % sliderSlides.length;
  }

  const slide = sliderSlides[appState.sliderIndex];
  const tagEl = document.querySelector('.campaign-tag');
  const titleEl = document.querySelector('.banner-info-pane h1');
  const descEl = document.querySelector('.banner-info-pane p');
  const imgEl = document.querySelector('.banner-image-pane img');

  if (tagEl && titleEl && descEl && imgEl) {
    // حركة انتقال ناعمة
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      tagEl.textContent = slide.tag;
      titleEl.textContent = slide.title;
      descEl.textContent = slide.desc;
      imgEl.src = slide.image;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 250);
  }
}

// تشغيل السلايدر التلقائي كل 6 ثوانٍ
let sliderTimer = setInterval(() => updateSlider('next'), 6000);

UI.sliderNext?.addEventListener('click', () => {
  clearInterval(sliderTimer);
  updateSlider('next');
  sliderTimer = setInterval(() => updateSlider('next'), 6000);
});

UI.sliderPrev?.addEventListener('click', () => {
  clearInterval(sliderTimer);
  updateSlider('prev');
  sliderTimer = setInterval(() => updateSlider('next'), 6000);
});

/* ==========================================================================
   6. رسم كروت المنتجات المطابقة لراية شوب (Product Rendering)
   ========================================================================== */
function renderProductCardHTML(product) {
  const isWish = appState.wishlist.includes(product.id);
  
  return `
    <article class="raya-product-card" data-id="${product.id}">
      <div class="card-header-actions">
        <span class="badge-bestseller">${product.tag}</span>
        <div class="quick-icons">
          <button class="action-icon-circle ${isWish ? 'active' : ''}" 
                  onclick="toggleWishlist(${product.id})" 
                  title="أضف للمفضلة">
            <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
      </div>

      <!-- الضغط على الصورة ينقل لصفحة تفاصيل المنتج -->
      <a href="product.html?id=${product.id}" class="product-image-container">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <button type="button" class="raya-blue-cart-btn" onclick="event.preventDefault(); addToCart(${product.id})" title="أضف إلى السلة فوراً">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </a>

      <div class="product-data">
        <div class="rating-line">
          <i class="fa-solid fa-star"></i>
          <strong>${product.rating}</strong>
          <span>(${product.reviewsCount})</span>
        </div>

        <!-- الضغط على اسم المنتج ينقل لصفحة تفاصيل المنتج -->
        <h3 class="product-name">
          <a href="product.html?id=${product.id}" title="${product.name}">${product.name}</a>
        </h3>

        <div class="price-discount-line">
          <span class="sale-price">${product.price.toLocaleString('ar-EG')} ج.م</span>
          <span class="discount-pill">-${product.discountAmount} ج.م</span>
        </div>
        <span class="regular-price">${product.regularPrice.toLocaleString('ar-EG')} ج.م</span>

        <div class="fulfilled-badge">
          <i class="fa-solid fa-shield-halved"></i> منتج معتمد من عباسكو
        </div>

        <div class="installment-line">
          <i class="fa-solid fa-percent"></i>
          <span>تقسيط يبدأ من <strong>${product.installmentValue} ج.م</strong> / ${product.installmentMonths} شهر</span>
        </div>
      </div>
    </article>
  `;
}

function renderCatalog(items) {
  if (!UI.bestsellerContainer) return;

  if (items.length === 0) {
    UI.bestsellerContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px; background: #fff; border-radius: 12px; border: 1px dashed #d5d9d9;">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #0056b3; margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800;">لا توجد ملحقات مطابقة للبحث حالياً</h3>
        <p style="color: #64748b; font-size: 0.9rem;">جرب كتابة اسم آخر أو تصفح كل الأقسام.</p>
      </div>
    `;
    return;
  }

  UI.bestsellerContainer.innerHTML = items.map(renderProductCardHTML).join('');
}

/* ==========================================================================
   7. الفلترة السريعة بالتبويبات والبحث (Filter Tabs & Search)
   ========================================================================== */
UI.dealTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    UI.dealTabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tabText = btn.textContent.trim();
    let filtered = abascoCatalog;

    if (tabText === 'كفرات آيفون' || tabText === 'كفرات سامسونج') {
      filtered = abascoCatalog.filter(p => p.category === 'cases');
    } else if (tabText === 'شواحن وسلوك') {
      filtered = abascoCatalog.filter(p => p.category === 'chargers');
    } else if (tabText === 'سماعات وبلوتوث') {
      filtered = abascoCatalog.filter(p => p.category === 'audio');
    }

    renderCatalog(filtered);
  });
});

// محرك البحث الفوري
UI.searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const searchResults = abascoCatalog.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );
  renderCatalog(searchResults);
});

UI.searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
});

/* ==========================================================================
   8. محرك سلة الشراء التفاعلية الكاملة (Raya Flyout Cart Engine)
   ========================================================================== */
function saveCart() {
  localStorage.setItem('abasco_raya_cart', JSON.stringify(appState.cart));
}

function updateCartView() {
  const totalCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (UI.cartCountBadge) UI.cartCountBadge.textContent = totalCount;
  if (UI.cartDrawerCount) UI.cartDrawerCount.textContent = totalCount;
  if (UI.cartFinalTotal) UI.cartFinalTotal.textContent = `${totalPrice.toLocaleString('ar-EG')} ج.م`;

  if (appState.cart.length === 0) {
    UI.cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-cart-arrow-down"></i>
        <p>السلة فارغة حالياً</p>
        <span>تصفح الإكسسوارات وأضف ما يعجبك!</span>
      </div>
    `;
    return;
  }

  UI.cartItemsContainer.innerHTML = appState.cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="item-price">${(item.price * item.quantity).toLocaleString('ar-EG')} ج.م</span>
        <div class="cart-item-actions">
          <div class="qty-counter">
            <button class="qty-btn" onclick="adjustItemQty(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="adjustItemQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-item-btn" onclick="removeItemFromCart(${item.id})">
            <i class="fa-regular fa-trash-can"></i> حذف
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.addToCart = function(productId) {
  const product = abascoCatalog.find(p => p.id === productId);
  if (!product) return;

  const existingItem = appState.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartView();
  openDrawer();
};

window.adjustItemQty = function(productId, delta) {
  const item = appState.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItemFromCart(productId);
    return;
  }

  saveCart();
  updateCartView();
};

window.removeItemFromCart = function(productId) {
  appState.cart = appState.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartView();
};

UI.clearCartBtn?.addEventListener('click', () => {
  if (appState.cart.length === 0) return;
  if (confirm('هل تريد تفريغ كل المنتجات من السلة؟')) {
    appState.cart = [];
    saveCart();
    updateCartView();
  }
});

// فتح وإغلاق السلة
function openDrawer() {
  UI.cartDrawer?.classList.add('active');
  UI.cartOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  UI.cartDrawer?.classList.remove('active');
  UI.cartOverlay?.classList.remove('active');
  document.body.style.overflow = '';
}

UI.cartToggleBtn?.addEventListener('click', openDrawer);
UI.closeCartBtn?.addEventListener('click', closeDrawer);
UI.cartOverlay?.addEventListener('click', closeDrawer);

/* ==========================================================================
   9. إتمام الطلب بالواتساب المباشر (WhatsApp Order Dispatch)
   ========================================================================== */
UI.checkoutBtn?.addEventListener('click', () => {
  if (appState.cart.length === 0) {
    alert('سلة التسوق فارغة! اختر ملحقاتك أولاً.');
    return;
  }

  const orderLines = appState.cart.map((item, idx) => 
    `${idx + 1}. ${item.name}%0A   الكمية: ${item.quantity} | السعر: ${item.price * item.quantity} ج.م`
  ).join('%0A%0A');

  const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const textMsg = `مرحباً متجر عباسكو (Abasco)%0Aأود تأكيد طلب إكسسوارات الهاتف التالي:%0A%0A${orderLines}%0A%0Aإجمالي الطلب: ${total} ج.م%0Aطريقة الدفع: الدفع عند الاستلام%0Aيرجى تأكيد موعد الشحن.`;

  window.open(`https://wa.me/201000000000?text=${textMsg}`, '_blank');
});

/* ==========================================================================
   10. قائمة المفضلة (Wishlist Toggle)
   ========================================================================= */
window.toggleWishlist = function(productId) {
  const index = appState.wishlist.indexOf(productId);
  if (index === -1) {
    appState.wishlist.push(productId);
  } else {
    appState.wishlist.splice(index, 1);
  }
  localStorage.setItem('abasco_raya_wishlist', JSON.stringify(appState.wishlist));
  
  // إعادة رسم الكتالوج لتحديث لون الأيقونة
  renderCatalog(abascoCatalog);
};

/* ==========================================================================
   11. الزر العائم "جرب حظك" (Lucky Wheel Floating Widget)
   ========================================================================== */
function setupLuckyWheelWidget() {
  const widget = document.createElement('div');
  widget.className = 'lucky-wheel-widget';
  widget.innerHTML = `<i class="fa-solid fa-arrows-spin"></i> <span>جرب حظك</span>`;
  document.body.appendChild(widget);

  widget.addEventListener('click', () => {
    const discounts = ['خصم 10% بكود: ABASCO10', 'شحن مجاني بكود: FREESHIP', 'جراب هدية مع أي شاحن', 'خصم 50 جنيه بكود: TECH50'];
    const prize = discounts[Math.floor(Math.random() * discounts.length)];
    alert(`🎉 مبروك كسبت معانا:\n\n${prize}\n\nاستخدم الكود عند تأكيد الطلب عبر الواتساب!`);
  });
}

/* ==========================================================================
   12. بدء تشغيل الصفحة (Initialization)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(abascoCatalog);
  updateCartView();
  typeSearchTicker();
  setupLuckyWheelWidget();
});
