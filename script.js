/**
 * ==========================================================================
 * متجر عباسكو (Abasco) - إكسسوارات الهواتف الذكية
 * الملف: script.js
 * الوظائف: إدارة المنتجات، الفلترة اللحظية، محرك البحث، عربة التسوق، والمؤثرات التفاعلية
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. قاعدة بيانات المنتجات الأولية (Mock Product Inventory)
   ========================================================================== */
const abascoProducts = [
  {
    id: 1,
    title: 'جراب MagSafe مغناطيسي شفاف ومقاوم للصدمات لآيفون 15 برو ماكس',
    category: 'cases',
    categoryName: 'جرابات وكفرات',
    price: 349,
    oldPrice: 465,
    rating: 4.8,
    reviewsCount: 128,
    discount: 25,
    imageIcon: 'fa-shield-halved',
    description: 'حواف معززة بتقنية الوسائد الهوائية، يدعم الشحن اللاسلكي السريع ومقاوم للاصفرار.',
    isFeatured: true
  },
  {
    id: 2,
    title: 'شاحن جداري GaN فائق السرعة بقدرة 65 واط مزود بـ 3 منافذ Type-C + USB',
    category: 'chargers',
    categoryName: 'شواحن وكابلات',
    price: 680,
    oldPrice: 850,
    rating: 4.9,
    reviewsCount: 215,
    discount: 20,
    imageIcon: 'fa-bolt',
    description: 'يدعم تقنية Power Delivery لشحن اللابتوب والهواتف في وقت قياسي بأمان حراري.',
    isFeatured: true
  },
  {
    id: 3,
    title: 'اسكرينة زجاجية يابانية 9D للحماية القصوى مع شبلونة تركيب سهلة',
    category: 'screen-protectors',
    categoryName: 'اسكرينات وحماية',
    price: 185,
    oldPrice: 250,
    rating: 4.7,
    reviewsCount: 94,
    discount: 26,
    imageIcon: 'fa-mobile-screen',
    description: 'مقاومة للبصمات والخدوش بقوة 9H، تغطي الحواف المنحنية بدون فقاعات هوائية.',
    isFeatured: true
  },
  {
    id: 4,
    title: 'سماعة بلوتوث لاسلكية Pro بعزل ضوضاء نشط (ANC) ومقاومة للماء IPX5',
    category: 'audio',
    categoryName: 'سماعات وصوتيات',
    price: 899,
    oldPrice: 1200,
    rating: 4.6,
    reviewsCount: 310,
    discount: 25,
    imageIcon: 'fa-headphones',
    description: 'بطارية تدوم 32 ساعة مع الحافظة، مايكروفون رباعي لمكالمات فائقة الوضوح.',
    isFeatured: true
  },
  {
    id: 5,
    title: 'باور بانك 20,000 مللي أمبير بقوة 22.5W مع شاشة رقمية لعرض النسبة',
    category: 'powerbanks',
    categoryName: 'بنوك طاقة (باور بانك)',
    price: 799,
    oldPrice: 999,
    rating: 4.9,
    reviewsCount: 180,
    discount: 20,
    imageIcon: 'fa-battery-three-quarters',
    description: 'يشحن هاتفك حتى 4 مرات ونصف مع حماية من الشحن الزائد والحرارة المرتفعة.',
    isFeatured: false
  },
  {
    id: 6,
    title: 'ماسك سيارة مغناطيسي MagSafe يثبت على فتحة المكيف بدوران 360 درجة',
    category: 'holders',
    categoryName: 'حوامل وماسك سيارة',
    price: 260,
    oldPrice: 320,
    rating: 4.5,
    reviewsCount: 76,
    discount: 19,
    imageIcon: 'fa-car',
    description: 'مغناطيس نيوديميوم فائق القوة يثبت الموبايل بثبات تام حتى على الطرق الوعرة.',
    isFeatured: false
  },
  {
    id: 7,
    title: 'كابل شحن نايلون مضفر فائق المتانة Type-C to Type-C بطول 2 متر (100W)',
    category: 'chargers',
    categoryName: 'شواحن وكابلات',
    price: 145,
    oldPrice: 210,
    rating: 4.8,
    reviewsCount: 142,
    discount: 31,
    imageIcon: 'fa-plug',
    description: 'رؤوس ألومنيوم مقاومة للقطع والالتواء مجربة لأكثر من 20 ألف انحناء.',
    isFeatured: false
  },
  {
    id: 8,
    title: 'واقي عدسات كاميرا حماية فردي مع حلقة معدنية ماسية لسامسونج S24 Ultra',
    category: 'screen-protectors',
    categoryName: 'اسكرينات وحماية',
    price: 190,
    oldPrice: 280,
    rating: 4.6,
    reviewsCount: 58,
    discount: 32,
    imageIcon: 'fa-camera',
    description: 'زجاج كريستال ياقوتي لا يؤثر إطلاقاً على جودة تصوير الفيديو الليلي.',
    isFeatured: false
  }
];

/* ==========================================================================
   2. إدارة حالة التطبيق (Global State Management)
   ========================================================================== */
const state = {
  products: [...abascoProducts],
  cart: JSON.parse(localStorage.getItem('abasco_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('abasco_wishlist')) || [],
  activeFilter: 'all',
  searchQuery: '',
  selectedCategory: 'all'
};

/* ==========================================================================
   3. عناصر واجهة المستخدم (DOM Elements Cache)
   ========================================================================== */
const DOM = {
  productsContainer: document.getElementById('products-container'),
  filterPills: document.querySelectorAll('.pill-btn'),
  categoryCards: document.querySelectorAll('.category-card'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  searchCategory: document.getElementById('search-category'),
  
  // عناصر السلة
  cartSidebar: document.getElementById('cart-sidebar'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  closeCartBtn: document.getElementById('close-cart'),
  cartItemsList: document.getElementById('cart-items-list'),
  cartCountBadge: document.getElementById('cart-count'),
  cartHeaderTotal: document.getElementById('cart-total-header'),
  cartSidebarCount: document.getElementById('cart-items-count'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartFinalTotal: document.getElementById('cart-final-total'),
  clearCartBtn: document.getElementById('clear-cart-btn'),
  checkoutBtn: document.getElementById('checkout-btn'),
  
  // المفضلة والرجوع للأعلى
  wishlistCountBadge: document.getElementById('wishlist-count'),
  backToTopBtn: document.getElementById('back-to-top')
};

/* ==========================================================================
   4. دوال الرسم وعرض المنتجات (Rendering Engine)
   ========================================================================== */

/**
 * إنشاء نجوم التقييم بناءً على الدرجة
 */
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalf) {
    starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="fa-regular fa-star"></i>';
  }
  return starsHtml;
}

/**
 * عرض قائمة المنتجات مع تفعيل الحركات التفاعلية
 */
function renderProducts(productList) {
  if (!DOM.productsContainer) return;

  if (productList.length === 0) {
    DOM.productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; border: 1px dashed #d5d9d9;">
        <i class="fa-solid fa-box-open" style="font-size: 3.5rem; color: #febd69; margin-bottom: 15px;"></i>
        <h3 style="font-weight: 700; margin-bottom: 8px;">لم نعثر على أي ملحقات تطابق بحثك</h3>
        <p style="color: #565959; font-size: 0.95rem;">جرب كتابة كلمات بحث أخرى أو اختر فئة مختلفة من القائمة.</p>
      </div>
    `;
    return;
  }

  DOM.productsContainer.innerHTML = productList.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    return `
      <article class="product-card" data-id="${product.id}">
        <span class="badge-discount">-${product.discount}%</span>
        
        <!-- زر الإضافة للمفضلة أعلى يمين الكرت -->
        <button class="wishlist-toggle-icon" 
                onclick="toggleWishlist(${product.id})" 
                aria-label="إضافة للمفضلة" 
                style="position: absolute; top: 14px; left: 14px; z-index: 4; font-size: 1.25rem; color: ${isWishlisted ? '#cc0c39' : '#888'}; background: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <div class="product-thumb">
          <i class="fa-solid ${product.imageIcon} fallback-icon"></i>
        </div>

        <div class="product-info">
          <span class="product-cat">${product.categoryName}</span>
          <h3 class="product-title" title="${product.title}">${product.title}</h3>
          
          <div class="product-rating">
            ${renderStars(product.rating)}
            <span>(${product.reviewsCount})</span>
          </div>

          <div class="product-price-row">
            <div class="prices">
              <span class="current-price">${product.price.toLocaleString('ar-EG')} ج.م</span>
              <span class="old-price">${product.oldPrice.toLocaleString('ar-EG')} ج.م</span>
            </div>
            <button class="add-cart-btn" onclick="addToCart(${product.id})" aria-label="أضف إلى السلة">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // ربط تأثير الميل ثلاثي الأبعاد المباشر عند تمرير الماوس على كروت المنتجات
  attach3DTiltEffect();
}

/* ==========================================================================
   5. تأثير الميل ثلاثي الأبعاد الانسيابي (3D Interactive Tilt Effect)
   ========================================================================== */
function attach3DTiltEffect() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   6. نظام الفلترة والبحث الفوري (Search & Category Filters)
   ========================================================================== */
function applyFilters() {
  let filtered = [...state.products];

  // فلترة حسب التبويب النشط
  if (state.activeFilter !== 'all') {
    filtered = filtered.filter(item => item.category === state.activeFilter);
  }

  // فلترة حسب القائمة المنسدلة للبحث
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category === state.selectedCategory);
  }

  // فلترة حسب عبارة البحث
  if (state.searchQuery.trim() !== '') {
    const query = state.searchQuery.trim().toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.categoryName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  renderProducts(filtered);
}

// أحداث شريط البحث
DOM.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.searchQuery = DOM.searchInput.value;
  state.selectedCategory = DOM.searchCategory.value;
  applyFilters();
  
  // تمرير سلس لمنطقة المنتجات
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
});

DOM.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  applyFilters();
});

// أزرار الفلترة السريعة (Pill Buttons)
DOM.filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    DOM.filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.activeFilter = pill.getAttribute('data-filter');
    applyFilters();
  });
});

// بطاقات الفئات السريعة التفاعلية
DOM.categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.getAttribute('data-category');
    state.activeFilter = cat;
    
    // تحديث الزر الدائري المقابل
    DOM.filterPills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === cat);
    });

    applyFilters();
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ==========================================================================
   7. محرك عربة التسوق التفاعلي (Full Shopping Cart Engine)
   ========================================================================== */

/**
 * حفظ السلة في الذاكرة المحلية
 */
function saveCartToStorage() {
  localStorage.setItem('abasco_cart', JSON.stringify(state.cart));
}

/**
 * تحديث واجهات وأرقام السلة في الهيدر واللوحة الجانبية
 */
function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // تحديث الشارات في الهيدر
  DOM.cartCountBadge.textContent = totalItems;
  DOM.cartHeaderTotal.textContent = `${totalPrice.toLocaleString('ar-EG')} ج.م`;

  // تحديث محتوى اللوحة الجانبية
  DOM.cartSidebarCount.textContent = totalItems;
  DOM.cartSubtotal.textContent = `${totalPrice.toLocaleString('ar-EG')} ج.م`;
  DOM.cartFinalTotal.textContent = `${totalPrice.toLocaleString('ar-EG')} ج.م`;

  if (state.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `
      <div class="empty-cart-message">
        <i class="fa-solid fa-cart-arrow-down"></i>
        <p>سلة التسوق فارغة حالياً</p>
        <span>ابدأ بإضافة ملحقاتك المفضلة!</span>
      </div>
    `;
    return;
  }

  DOM.cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <div style="width: 55px; height: 55px; background: #f7f8f8; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #232f3e;">
        <i class="fa-solid ${item.imageIcon}"></i>
      </div>
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <span class="cart-item-price">${(item.price * item.quantity).toLocaleString('ar-EG')} ج.م</span>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)">-</button>
          <span style="font-weight: 700; font-size: 0.9rem; min-width: 20px; text-align: center;">${item.quantity}</span>
          <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
          <button onclick="removeFromCart(${item.id})" style="color: #cc0c39; font-size: 0.8rem; margin-right: 12px; font-weight: 600;">
            <i class="fa-regular fa-trash-can"></i> حذف
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * إضافة منتج إلى السلة
 */
window.addToCart = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      imageIcon: product.imageIcon,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`تمت إضافة "${product.title.substring(0, 30)}..." إلى السلة بنجاح!`);
  openCartDrawer();
};

/**
 * تعديل كمية منتج في السلة
 */
window.updateItemQuantity = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
};

/**
 * حذف منتج تماماً من السلة
 */
window.removeFromCart = function(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast('تم حذف المنتج من السلة.', 'info');
};

/**
 * تفريغ السلة بالكامل
 */
DOM.clearCartBtn.addEventListener('click', () => {
  if (state.cart.length === 0) return;
  if (confirm('هل أنت متأكد من رغبتك في تفريغ سلة التسوق بالكامل؟')) {
    state.cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('تم إفراغ سلة التسوق بالكامل.', 'info');
  }
});

// فتح وإغلاق السلة الجانبية
function openCartDrawer() {
  DOM.cartSidebar.classList.add('active');
  DOM.cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // منع سكرول الصفحة أثناء فتح السلة
}

function closeCartDrawer() {
  DOM.cartSidebar.classList.remove('active');
  DOM.cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

DOM.cartToggleBtn.addEventListener('click', openCartDrawer);
DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
DOM.cartOverlay.addEventListener('click', closeCartDrawer);

// إغلاق السلة بالضغط على زر Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && DOM.cartSidebar.classList.contains('active')) {
    closeCartDrawer();
  }
});

/* ==========================================================================
   8. إتمام الطلب والتحويل للواتساب (Checkout Simulation)
   ========================================================================== */
DOM.checkoutBtn.addEventListener('click', () => {
  if (state.cart.length === 0) {
    showToast('سلتك فارغة! أضف بعض المنتجات أولاً.', 'warning');
    return;
  }

  const orderItemsText = state.cart.map((item, idx) => 
    `${idx + 1}. ${item.title} (الكمية: ${item.quantity}) - السعر: ${item.price * item.quantity} ج.م`
  ).join('%0A');

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const message = `مرحباً متجر عباسكو (Abasco)، أود تأكيد الطلب التالي:%0A%0A${orderItemsText}%0A%0Aالإجمالي: ${total} ج.م%0Aطريقة الدفع: الدفع عند الاستلام.`;

  // فتح محادثة واتساب برقم تجريبي جاهز
  const whatsappUrl = `https://wa.me/201000000000?text=${message}`;
  window.open(whatsappUrl, '_blank');
});

/* ==========================================================================
   9. نظام قائمة المفضلة (Wishlist System)
   ========================================================================== */
window.toggleWishlist = function(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index === -1) {
    state.wishlist.push(productId);
    showToast('تمت إضافة المنتج إلى قائمتك المفضلة ❤️');
  } else {
    state.wishlist.splice(index, 1);
    showToast('تم حذف المنتج من المفضلة');
  }

  localStorage.setItem('abasco_wishlist', JSON.stringify(state.wishlist));
  DOM.wishlistCountBadge.textContent = state.wishlist.length;
  applyFilters(); // إعادة الرسم لتحديث أيقونة القلب
};

/* ==========================================================================
   10. نظام الرسائل التنبيهية العائمة (Amazon Clean Toast Notification)
   ========================================================================== */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'warning' ? '#b12704' : '#131921';
  
  toast.style.cssText = `
    background: ${bgColor};
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    gap: 10px;
    border-right: 4px solid #febd69;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: auto;
  `;

  toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: #febd69;"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // إظهار التنبيه
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // الإخفاء الذاتي بعد 3.2 ثانية
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ==========================================================================
   11. زر العودة للأعلى وتهيئة المتجر عند التشغيل (Initialization)
   ========================================================================== */
DOM.backToTopBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// بدء تشغيل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(state.products);
  updateCartUI();
  DOM.wishlistCountBadge.textContent = state.wishlist.length;
});
