let products = [];

const productList = document.getElementById("product-list");
const emptyMessage = document.getElementById("empty-message");
const totalPriceEl = document.getElementById("total-price");
const toast = document.getElementById("toast");

const modal = document.getElementById("modal");
const form = document.getElementById("product-form");
const addBtn = document.getElementById("add-product-btn");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");

form.onsubmit = handleFormSubmit;
addBtn.onclick = () => openModal();
closeModal.onclick = () => closeModalWindow();

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}

function openModal(product = null) {
  modal.classList.remove("hidden");
  if (product) {
    modalTitle.textContent = "Редагування товару";
    form["product-id"].value = product.id;
    form["product-name"].value = product.name;
    form["product-price"].value = product.price;
    form["product-category"].value = product.category;
    form["product-image"].value = product.image;
  } else {
    modalTitle.textContent = "Новий товар";
    form.reset();
    form["product-id"].value = "";
  }
}

function closeModalWindow() {
  modal.classList.add("hidden");
}

function handleFormSubmit(event) {
  event.preventDefault();
  const id = form["product-id"].value || Date.now().toString();
  const name = form["product-name"].value;
  const price = parseFloat(form["product-price"].value);
  const category = form["product-category"].value;
  const image = form["product-image"].value;

  const existing = products.find((p) => p.id === id);
  if (existing) {
    existing.name = name;
    existing.price = price;
    existing.category = category;
    existing.image = image;
    existing.updatedAt = new Date();
    showToast(`Оновлено товар: [${id}] ${name}`);
  } else {
    products.push({
      id,
      name,
      price,
      category,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  renderProducts();
  closeModalWindow();
}

function renderProducts() {
  productList.innerHTML = "";
  if (products.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
    products.forEach(renderProductCard);
  }
  updateTotalPrice();
  renderFilters();
}

function renderProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <p><strong>ID:</strong> ${product.id}</p>
    <h3>${product.name}</h3>
    <p>Ціна: ${product.price} грн</p>
    <p>Категорія: ${product.category}</p>
    <img src="${product.image}" alt="${product.name}" />
    <button onclick="editProduct('${product.id}')">Редагувати</button>
    <button onclick="deleteProduct('${product.id}')">Видалити</button>
  `;
  productList.appendChild(card);
}

function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  renderProducts();
  showToast("Товар успішно видалено.");
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  openModal(product);
}

function updateTotalPrice() {
  const total = products.reduce((sum, p) => sum + p.price, 0);
  totalPriceEl.textContent = `Загальна вартість: ${total} грн`;
}

function renderFilters() {
  const categories = [...new Set(products.map((p) => p.category))];
  const container = document.getElementById("filter-buttons");
  container.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    container.appendChild(btn);
  });
}

function filterByCategory(cat) {
  const filtered = products.filter((p) => p.category === cat);
  productList.innerHTML = "";
  if (filtered.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
    filtered.forEach(renderProductCard);
  }
  updateTotalPrice();
}

document.getElementById("reset-filter").onclick = () => renderProducts();

document.getElementById("sort-price").onclick = () => {
  products.sort((a, b) => a.price - b.price);
  renderProducts();
};

document.getElementById("sort-created").onclick = () => {
  products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  renderProducts();
};

document.getElementById("sort-updated").onclick = () => {
  products.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  renderProducts();
};

document.getElementById("reset-sort").onclick = () => renderProducts();
