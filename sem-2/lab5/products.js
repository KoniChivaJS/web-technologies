const products = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const registeredUsers = new WeakSet();

let idCounter = 1;

function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  for (const [id, product] of products.entries()) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
    <h4>${product.name}</h4>
    <p class="id">ID: ${id}</p>

    <p class="price">Ціна: ${product.price} грн</p>
    <p>Кількість: ${
      product.quantity > 0
        ? product.quantity
        : '<span class="out-of-stock">Немає в наявності</span>'
    }</p>
  `;

    container.appendChild(card);
  }
}

function addProduct() {
  const name = prompt("Назва продукту:");
  const price = +prompt("Ціна:");
  const qty = +prompt("Кількість:");

  if (!name || isNaN(price) || isNaN(qty)) return alert("Некоректні дані!");

  const id = idCounter++;
  const product = { name, price, quantity: qty };
  products.set(id, product);
  productHistory.set(product, [`Створено: ${new Date().toLocaleString()}`]);

  alert(`Додано продукт: ${name}`);
  renderProducts();
}

function removeProduct() {
  const id = +prompt("ID продукту для видалення:");
  if (products.has(id)) {
    const product = products.get(id);
    products.delete(id);
    alert(`Продукт "${product.name}" видалено`);
    renderProducts();
  } else {
    alert("Продукт не знайдено.");
  }
}

function updateProduct() {
  const id = +prompt("ID продукту:");
  if (products.has(id)) {
    const product = products.get(id);
    const newPrice = +prompt("Нова ціна:", product.price);
    const newQty = +prompt("Нова кількість:", product.quantity);

    if (isNaN(newPrice) || isNaN(newQty)) return alert("Некоректні дані!");

    product.price = newPrice;
    product.quantity = newQty;

    const history = productHistory.get(product) || [];
    history.push(`Оновлено: ${new Date().toLocaleString()}`);
    productHistory.set(product, history);

    alert(`Продукт "${product.name}" оновлено`);
    renderProducts();
  } else {
    alert("Продукт не знайдено.");
  }
}

function searchProduct() {
  const name = prompt("Назва продукту для пошуку:")?.toLowerCase();
  if (!name) return;

  for (const [id, product] of products.entries()) {
    if (product.name.toLowerCase() === name) {
      alert(
        `Знайдено: ID: ${id}, Ціна: ${product.price} грн, Кількість: ${product.quantity}`
      );
      return;
    }
  }
  alert("Продукт не знайдено.");
}

function makeOrder() {
  const name = prompt("Назва продукту для замовлення:")?.toLowerCase();
  if (!name) return;

  for (const [id, product] of products.entries()) {
    if (product.name.toLowerCase() === name) {
      if (product.quantity > 0) {
        product.quantity--;
        orders.add(product.name);
        alert(`Замовлено: ${product.name}. Залишилось: ${product.quantity}`);
        renderProducts();
      } else {
        alert("Цей товар закінчився.");
      }
      return;
    }
  }
  alert("Продукт не знайдено.");
}

renderProducts();
