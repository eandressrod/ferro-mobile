const products = [
  {
    id: "drill",
    name: "Taladro percutor 1/2 pulg. 850 W",
    category: "Herramientas",
    price: 799,
    previousPrice: 925,
    stock: 7,
    rating: 4.9,
    reviews: 86,
    badge: "-14%",
    visual: "drill"
  },
  {
    id: "hammer",
    name: "Martillo uña curva 16 oz",
    category: "Herramientas",
    price: 89,
    stock: 24,
    rating: 4.8,
    reviews: 64,
    visual: "hammer"
  },
  {
    id: "tape",
    name: "Cinta métrica reforzada 5 m",
    category: "Medición",
    price: 42.5,
    stock: 38,
    rating: 4.7,
    reviews: 51,
    badge: "Popular",
    visual: "tape"
  },
  {
    id: "pliers",
    name: "Alicate universal aislado 8 pulg.",
    category: "Herramientas",
    price: 74.95,
    stock: 0,
    rating: 4.6,
    reviews: 39,
    visual: "pliers"
  },
  {
    id: "ladder",
    name: "Escalera aluminio 5 peldaños",
    category: "Construcción",
    price: 649,
    stock: 5,
    rating: 4.8,
    reviews: 27,
    badge: "-10%",
    previousPrice: 719,
    visual: "ladder"
  },
  {
    id: "paint",
    name: "Pintura látex interior blanco 1 gal",
    category: "Pintura",
    price: 189,
    stock: 12,
    rating: 4.9,
    reviews: 72,
    visual: "paint"
  }
];

const productDetails = {
  drill: {
    description: "Taladro de alto desempeño para perforar madera, metal y concreto. Su empuñadura auxiliar mejora el control en trabajos exigentes.",
    specs: [["Potencia", "850 W"], ["Mandril", "1/2 pulg."], ["Velocidad", "0–3,000 rpm"], ["Garantía", "2 años"]]
  },
  hammer: {
    description: "Martillo balanceado para armado, reparación y carpintería. La cabeza pulida permite golpear y retirar clavos con precisión.",
    specs: [["Peso", "16 oz"], ["Mango", "Fibra de vidrio"], ["Cabeza", "Acero forjado"], ["Garantía", "1 año"]]
  },
  tape: {
    description: "Cinta métrica resistente con freno automático y cubierta de goma para un agarre firme durante mediciones en obra.",
    specs: [["Longitud", "5 m"], ["Ancho", "19 mm"], ["Escala", "Métrica"], ["Seguro", "Automático"]]
  },
  pliers: {
    description: "Alicate multiuso con zonas de agarre y corte. Los mangos aislados ofrecen comodidad para tareas domésticas y de taller.",
    specs: [["Longitud", "8 pulg."], ["Material", "Acero al carbono"], ["Mango", "Aislado"], ["Uso", "Universal"]]
  },
  ladder: {
    description: "Escalera liviana con peldaños antideslizantes y plataforma superior. Se pliega para facilitar el transporte y almacenamiento.",
    specs: [["Peldaños", "5"], ["Altura", "1.65 m"], ["Capacidad", "120 kg"], ["Material", "Aluminio"]]
  },
  paint: {
    description: "Pintura de acabado mate para interiores, con buena cobertura y bajo olor. Recomendada para paredes de concreto y tabla yeso.",
    specs: [["Contenido", "1 galón"], ["Acabado", "Mate"], ["Cobertura", "35–40 m²"], ["Secado", "2 horas"]]
  }
};

const categories = ["Todos", "Herramientas", "Medición", "Pintura", "Construcción"];

const state = {
  screen: "login",
  returnScreen: "catalog",
  productId: null,
  detailQuantity: 1,
  query: "",
  category: "Todos",
  sort: "relevance",
  filters: {
    stockOnly: false,
    maxPrice: 1500
  },
  favorites: new Set(["tape"]),
  cart: new Map([
    ["drill", 1],
    ["tape", 2]
  ])
};

const els = {
  app: document.querySelector("#app"),
  screens: [...document.querySelectorAll(".screen")],
  bottomNav: document.querySelector("#bottom-nav"),
  navItems: [...document.querySelectorAll(".nav-item")],
  loginForm: document.querySelector("#login-form"),
  loginError: document.querySelector("#login-error"),
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  passwordField: document.querySelector("#password-field"),
  togglePassword: document.querySelector("#toggle-password"),
  homeSearchForm: document.querySelector("#home-search-form"),
  homeSearch: document.querySelector("#home-search"),
  installApp: document.querySelector("#install-app"),
  featuredProducts: document.querySelector("#featured-products"),
  catalogSearch: document.querySelector("#catalog-search"),
  clearSearch: document.querySelector("#clear-search"),
  categoryChips: document.querySelector("#category-chips"),
  catalogProducts: document.querySelector("#catalog-products"),
  searchEmpty: document.querySelector("#search-empty"),
  resultsCount: document.querySelector("#results-count"),
  sortSelect: document.querySelector("#sort-select"),
  resetFilters: document.querySelector("#reset-filters"),
  filterSheet: document.querySelector("#filter-sheet"),
  openFilters: document.querySelector("#open-filters"),
  closeFilters: document.querySelector("#close-filters"),
  closeFiltersBackdrop: document.querySelector("#close-filters-backdrop"),
  stockOnly: document.querySelector("#stock-only"),
  priceRange: document.querySelector("#price-range"),
  priceOutput: document.querySelector("#price-output"),
  applyFilters: document.querySelector("#apply-filters"),
  filterIndicator: document.querySelector("#filter-indicator"),
  productBack: document.querySelector("#product-back"),
  detailFavorite: document.querySelector("#detail-favorite"),
  productDetailContent: document.querySelector("#product-detail-content"),
  detailAdd: document.querySelector("#detail-add"),
  detailBuy: document.querySelector("#detail-buy"),
  cartBadge: document.querySelector("#cart-badge"),
  cartContent: document.querySelector("#cart-content"),
  cartItems: document.querySelector("#cart-items"),
  cartEmpty: document.querySelector("#cart-empty"),
  cartCountLabel: document.querySelector("#cart-count-label"),
  clearCart: document.querySelector("#clear-cart"),
  subtotal: document.querySelector("#subtotal"),
  deliveryFee: document.querySelector("#delivery-fee"),
  total: document.querySelector("#total"),
  checkoutTotal: document.querySelector("#checkout-total"),
  checkoutButton: document.querySelector("#checkout-button"),
  successState: document.querySelector("#success-state"),
  successHome: document.querySelector("#success-home"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toast-message")
};

let toastTimer;
let deferredInstallPrompt = null;

function money(value) {
  return `Q${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function normalize(value) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function productCard(product) {
  const isFavorite = state.favorites.has(product.id);
  const isUnavailable = product.stock === 0;
  const badge = isUnavailable
    ? `<span class="product-badge product-badge--muted">Agotado</span>`
    : product.badge
      ? `<span class="product-badge">${product.badge}</span>`
      : "";

  return `
    <article class="product-card" data-product="${product.id}">
      <div class="product-visual">
        ${badge}
        <button class="favorite-button${isFavorite ? " favorite-button--active" : ""}" type="button" data-favorite="${product.id}" aria-label="${isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/></svg>
        </button>
        <button class="product-image-button" type="button" data-view-product="${product.id}" aria-label="Ver detalle de ${product.name}">
          <svg aria-hidden="true"><use href="assets/products.svg#${product.visual}"></use></svg>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name"><button class="product-name-button" type="button" data-view-product="${product.id}">${product.name}</button></h3>
        <div class="rating"><span>★</span><strong>${product.rating}</strong><span>(${product.reviews})</span></div>
        <div class="product-footer">
          <div class="product-price">
            <small>${product.previousPrice ? money(product.previousPrice) : "&nbsp;"}</small>
            <strong>${money(product.price)}</strong>
          </div>
          <button class="add-button" type="button" data-add="${product.id}" ${isUnavailable ? "disabled" : ""} aria-label="${isUnavailable ? `${product.name}, agotado` : `Agregar ${product.name}`}">${isUnavailable ? "×" : "+"}</button>
        </div>
      </div>
    </article>`;
}

function renderFeatured() {
  els.featuredProducts.innerHTML = products
    .filter((product) => ["drill", "paint"].includes(product.id))
    .map(productCard)
    .join("");
}

function renderCategoryChips() {
  els.categoryChips.innerHTML = categories
    .map((category) => `
      <button class="filter-chip${state.category === category ? " filter-chip--active" : ""}" type="button" data-category="${category}" aria-pressed="${state.category === category}">${category}</button>
    `)
    .join("");
}

function filteredProducts() {
  const query = normalize(state.query.trim());
  const filtered = products.filter((product) => {
    const matchesQuery = !query || normalize(`${product.name} ${product.category}`).includes(query);
    const matchesCategory = state.category === "Todos" || product.category === state.category;
    const matchesStock = !state.filters.stockOnly || product.stock > 0;
    const matchesPrice = product.price <= state.filters.maxPrice;
    return matchesQuery && matchesCategory && matchesStock && matchesPrice;
  });

  if (state.sort === "price-asc") return filtered.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") return filtered.sort((a, b) => b.price - a.price);
  return filtered;
}

function renderCatalog() {
  renderCategoryChips();
  const visibleProducts = filteredProducts();
  els.catalogProducts.innerHTML = visibleProducts.map(productCard).join("");
  els.catalogProducts.hidden = visibleProducts.length === 0;
  els.searchEmpty.hidden = visibleProducts.length !== 0;
  els.resultsCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "producto" : "productos"}`;
  els.catalogSearch.value = state.query;
  els.clearSearch.hidden = state.query.length === 0;
  els.sortSelect.value = state.sort;
  els.filterIndicator.hidden = !state.filters.stockOnly && state.filters.maxPrice === 1500;
}

function renderProductDetail() {
  const product = products.find((item) => item.id === state.productId);
  if (!product) return;

  const details = productDetails[product.id];
  const isFavorite = state.favorites.has(product.id);
  const isUnavailable = product.stock === 0;
  const badge = isUnavailable
    ? `<span class="detail-badge detail-badge--muted">Agotado</span>`
    : product.badge
      ? `<span class="detail-badge">${product.badge}</span>`
      : "";

  els.productDetailContent.innerHTML = `
    <div class="detail-visual" data-product="${product.id}">
      ${badge}
      <span class="detail-visual-ring" aria-hidden="true"></span>
      <svg aria-hidden="true"><use href="assets/products.svg#${product.visual}"></use></svg>
    </div>
    <div class="detail-content">
      <span class="product-category">${product.category}</span>
      <h1 id="detail-title">${product.name}</h1>
      <div class="detail-rating"><span>★</span><strong>${product.rating}</strong><span>${product.reviews} opiniones</span></div>

      <div class="detail-price-row">
        <div class="detail-price">
          <strong>${money(product.price)}</strong>
          ${product.previousPrice ? `<small>${money(product.previousPrice)}</small>` : ""}
        </div>
        <span class="stock-pill${isUnavailable ? " stock-pill--empty" : ""}">${isUnavailable ? "Agotado" : `${product.stock} disponibles`}</span>
      </div>

      <section class="detail-section" aria-labelledby="description-title">
        <h2 id="description-title">Descripción</h2>
        <p>${details.description}</p>
      </section>

      <section class="detail-section" aria-labelledby="specs-title">
        <h2 id="specs-title">Especificaciones</h2>
        <dl class="spec-grid">
          ${details.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
        </dl>
      </section>

      <section class="detail-section detail-quantity" aria-labelledby="quantity-title">
        <div>
          <h2 id="quantity-title">Cantidad</h2>
          <p>${isUnavailable ? "Temporalmente no disponible" : `Máximo ${product.stock} unidades`}</p>
        </div>
        <div class="quantity-stepper quantity-stepper--large" aria-label="Cantidad de ${product.name}">
          <button type="button" data-detail-quantity="decrease" aria-label="Disminuir cantidad" ${isUnavailable || state.detailQuantity <= 1 ? "disabled" : ""}>−</button>
          <span id="detail-quantity-value" aria-live="polite">${state.detailQuantity}</span>
          <button type="button" data-detail-quantity="increase" aria-label="Aumentar cantidad" ${isUnavailable || state.detailQuantity >= product.stock ? "disabled" : ""}>+</button>
        </div>
      </section>
    </div>`;

  els.detailFavorite.classList.toggle("detail-favorite--active", isFavorite);
  els.detailFavorite.setAttribute("aria-label", isFavorite ? "Quitar de favoritos" : "Agregar a favoritos");
  els.detailAdd.disabled = isUnavailable;
  els.detailBuy.disabled = isUnavailable;
  els.detailAdd.textContent = isUnavailable ? "Agotado" : "Agregar al carrito";
  els.detailBuy.textContent = isUnavailable ? "No disponible" : "Comprar ahora";
}

function cartQuantity() {
  return [...state.cart.values()].reduce((total, quantity) => total + quantity, 0);
}

function updateCartBadge() {
  const quantity = cartQuantity();
  els.cartBadge.textContent = quantity;
  els.cartBadge.hidden = quantity === 0;
}

function renderCart() {
  const entries = [...state.cart.entries()]
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
    .filter((entry) => entry.product && entry.quantity > 0);

  const isEmpty = entries.length === 0;
  els.cartContent.hidden = isEmpty;
  els.cartEmpty.hidden = !isEmpty;
  els.clearCart.hidden = isEmpty;

  if (isEmpty) {
    updateCartBadge();
    return;
  }

  els.cartItems.innerHTML = entries.map(({ product, quantity }) => `
    <article class="cart-item">
      <div class="cart-item-visual"><svg aria-hidden="true"><use href="assets/products.svg#${product.visual}"></use></svg></div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <h3>${product.name}</h3>
          <button class="remove-button" type="button" data-remove="${product.id}" aria-label="Eliminar ${product.name}">×</button>
        </div>
        <strong>${money(product.price)}</strong>
        <div class="quantity-stepper" aria-label="Cantidad de ${product.name}">
          <button type="button" data-quantity="decrease" data-product-id="${product.id}" aria-label="Disminuir cantidad">−</button>
          <span aria-live="polite">${quantity}</span>
          <button type="button" data-quantity="increase" data-product-id="${product.id}" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
    </article>`).join("");

  const itemCount = cartQuantity();
  const subtotal = entries.reduce((sum, entry) => sum + (entry.product.price * entry.quantity), 0);
  const delivery = 25;
  const total = subtotal + delivery;
  els.cartCountLabel.textContent = `(${itemCount})`;
  els.subtotal.textContent = money(subtotal);
  els.deliveryFee.textContent = money(delivery);
  els.total.textContent = money(total);
  els.checkoutTotal.textContent = money(total);
  updateCartBadge();
}

function showScreen(name) {
  state.screen = name;
  els.screens.forEach((screen) => {
    const active = screen.id === `screen-${name}`;
    screen.hidden = !active;
    screen.classList.toggle("screen--active", active);
    if (active) {
      const scrollArea = screen.querySelector(".screen-scroll");
      if (scrollArea) scrollArea.scrollTop = 0;
    }
  });

  const showBottomNav = !["login", "product"].includes(name);
  els.bottomNav.hidden = !showBottomNav;
  els.navItems.forEach((item) => item.classList.toggle("nav-item--active", item.dataset.nav === name));

  if (name === "home") renderFeatured();
  if (name === "catalog") renderCatalog();
  if (name === "product") renderProductDetail();
  if (name === "cart") renderCart();
}

function showProduct(id) {
  if (!products.some((product) => product.id === id)) return;
  if (state.screen !== "product") state.returnScreen = state.screen;
  state.productId = id;
  state.detailQuantity = 1;
  showScreen("product");
}

function openCategory(category) {
  state.category = categories.includes(category) ? category : "Todos";
  state.query = "";
  showScreen("catalog");
}

function addQuantityToCart(id, quantity) {
  const product = products.find((item) => item.id === id);
  if (!product || product.stock === 0 || quantity < 1) return 0;
  const current = state.cart.get(id) || 0;
  const next = Math.min(current + quantity, product.stock);
  state.cart.set(id, next);
  updateCartBadge();
  return next - current;
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const added = addQuantityToCart(id, 1);
  if (added === 0) {
    showToast("Ya alcanzaste la cantidad disponible");
    return;
  }
  showToast(`${product.name} agregado`);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toastMessage.textContent = message;
  els.toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    els.toast.hidden = true;
  }, 2200);
}

function closeFilterSheet() {
  els.filterSheet.hidden = true;
  els.openFilters.focus();
}

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const validEmail = els.email.value.trim().toLowerCase() === "cliente@ferro.gt";
  const validPassword = els.password.value === "ferro123";
  const isValid = validEmail && validPassword;
  els.loginError.hidden = isValid;
  els.passwordField.classList.toggle("field-control--error", !isValid);
  els.email.closest(".field-control").classList.toggle("field-control--error", !isValid);
  if (isValid) showScreen("home");
});

[els.email, els.password].forEach((input) => input.addEventListener("input", () => {
  els.loginError.hidden = true;
  els.passwordField.classList.remove("field-control--error");
  els.email.closest(".field-control").classList.remove("field-control--error");
}));

els.togglePassword.addEventListener("click", () => {
  const showing = els.password.type === "text";
  els.password.type = showing ? "password" : "text";
  els.togglePassword.setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
});

els.homeSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = els.homeSearch.value;
  state.category = "Todos";
  showScreen("catalog");
});

els.installApp.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  els.installApp.hidden = true;
});

els.catalogSearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCatalog();
});

els.clearSearch.addEventListener("click", () => {
  state.query = "";
  renderCatalog();
  els.catalogSearch.focus();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderCatalog();
});

els.resetFilters.addEventListener("click", () => {
  state.query = "";
  state.category = "Todos";
  state.filters.stockOnly = false;
  state.filters.maxPrice = 1500;
  els.stockOnly.checked = false;
  els.priceRange.value = "1500";
  els.priceOutput.textContent = money(1500).replace(".00", "");
  renderCatalog();
});

els.openFilters.addEventListener("click", () => {
  els.stockOnly.checked = state.filters.stockOnly;
  els.priceRange.value = String(state.filters.maxPrice);
  els.priceOutput.textContent = money(state.filters.maxPrice).replace(".00", "");
  els.filterSheet.hidden = false;
  els.closeFilters.focus();
});

els.closeFilters.addEventListener("click", closeFilterSheet);
els.closeFiltersBackdrop.addEventListener("click", closeFilterSheet);
els.priceRange.addEventListener("input", () => {
  els.priceOutput.textContent = money(Number(els.priceRange.value)).replace(".00", "");
});

els.applyFilters.addEventListener("click", () => {
  state.filters.stockOnly = els.stockOnly.checked;
  state.filters.maxPrice = Number(els.priceRange.value);
  els.filterSheet.hidden = true;
  renderCatalog();
});

els.productBack.addEventListener("click", () => {
  showScreen(state.returnScreen || "catalog");
});

els.detailFavorite.addEventListener("click", () => {
  const id = state.productId;
  if (!id) return;
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  renderProductDetail();
  renderFeatured();
  renderCatalog();
});

els.detailAdd.addEventListener("click", () => {
  const product = products.find((item) => item.id === state.productId);
  if (!product) return;
  const added = addQuantityToCart(product.id, state.detailQuantity);
  if (added === 0) showToast("Ya alcanzaste la cantidad disponible");
  else showToast(`${added} ${added === 1 ? "unidad agregada" : "unidades agregadas"}`);
});

els.detailBuy.addEventListener("click", () => {
  const product = products.find((item) => item.id === state.productId);
  if (!product || product.stock === 0) return;
  addQuantityToCart(product.id, state.detailQuantity);
  showScreen("cart");
});

els.clearCart.addEventListener("click", () => {
  state.cart.clear();
  renderCart();
});

els.checkoutButton.addEventListener("click", () => {
  if (cartQuantity() === 0) return;
  state.cart.clear();
  updateCartBadge();
  els.successState.hidden = false;
  els.bottomNav.hidden = true;
  els.successHome.focus();
});

els.successHome.addEventListener("click", () => {
  els.successState.hidden = true;
  showScreen("home");
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".payment-option").forEach((option) => {
      option.classList.toggle("payment-option--selected", option.querySelector("input").checked);
    });
  });
});

els.app.addEventListener("click", (event) => {
  const navTarget = event.target.closest("[data-nav]");
  if (navTarget) {
    showScreen(navTarget.dataset.nav);
    return;
  }

  const categoryTarget = event.target.closest("[data-open-category]");
  if (categoryTarget) {
    openCategory(categoryTarget.dataset.openCategory);
    return;
  }

  const productTarget = event.target.closest("[data-view-product]");
  if (productTarget) {
    showProduct(productTarget.dataset.viewProduct);
    return;
  }

  const chipTarget = event.target.closest("[data-category]");
  if (chipTarget) {
    state.category = chipTarget.dataset.category;
    renderCatalog();
    return;
  }

  const addTarget = event.target.closest("[data-add]");
  if (addTarget) {
    addToCart(addTarget.dataset.add);
    return;
  }

  const favoriteTarget = event.target.closest("[data-favorite]");
  if (favoriteTarget) {
    const id = favoriteTarget.dataset.favorite;
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    renderFeatured();
    renderCatalog();
    if (state.screen === "product") renderProductDetail();
    return;
  }

  const detailQuantityTarget = event.target.closest("[data-detail-quantity]");
  if (detailQuantityTarget) {
    const product = products.find((item) => item.id === state.productId);
    if (!product || product.stock === 0) return;
    if (detailQuantityTarget.dataset.detailQuantity === "increase") {
      state.detailQuantity = Math.min(state.detailQuantity + 1, product.stock);
    } else {
      state.detailQuantity = Math.max(state.detailQuantity - 1, 1);
    }
    renderProductDetail();
    return;
  }

  const removeTarget = event.target.closest("[data-remove]");
  if (removeTarget) {
    state.cart.delete(removeTarget.dataset.remove);
    renderCart();
    return;
  }

  const quantityTarget = event.target.closest("[data-quantity]");
  if (quantityTarget) {
    const id = quantityTarget.dataset.productId;
    const product = products.find((item) => item.id === id);
    const current = state.cart.get(id) || 0;
    if (quantityTarget.dataset.quantity === "increase") {
      state.cart.set(id, Math.min(current + 1, product.stock));
    } else if (current <= 1) {
      state.cart.delete(id);
    } else {
      state.cart.set(id, current - 1);
    }
    renderCart();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.filterSheet.hidden) closeFilterSheet();
  else if (event.key === "Escape" && state.screen === "product") showScreen(state.returnScreen || "catalog");
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  els.installApp.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  els.installApp.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

renderFeatured();
renderCategoryChips();
renderCatalog();
renderCart();
showScreen("login");
