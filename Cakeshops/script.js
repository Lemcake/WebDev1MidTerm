const cakeData = [
  { name: "Midnight Truffle", price: 45, category: "Chocolate", desc: "Deep dark chocolate with a silky ganache.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { name: "Velvet Strawberry", price: 38, category: "Fruit", desc: "Fresh strawberries whipped into light cream.", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400" },
  { name: "Golden Honey", price: 35, category: "Classic", desc: "Local honey infused into a crunchy crust.", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400" },
  { name: "Vanilla Bean", price: 40, category: "Classic", desc: "Authentic Madagascan vanilla bean sponge.", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400" },
  { name: "Caramel Crunch", price: 42, category: "Specialty", desc: "Salted caramel with toasted almond bits.", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400" },
  { name: "Pistachio Dream", price: 50, category: "Specialty", desc: "Roasted pistachios and white chocolate glaze.", img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=400" },
  { name: "Lemon Zest", price: 32, category: "Fruit", desc: "Zesty lemon curd on a shortbread base.", img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400" },
  { name: "Berry Cheesecake", price: 48, category: "Cheesecake", desc: "NY style cheesecake with forest berries.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
  { name: "Dark Forest", price: 46, category: "Chocolate", desc: "Cherries and chocolate with whipped kirsch.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
  { name: "Espresso Cream", price: 44, category: "Specialty", desc: "Rich coffee layers for the caffeine lovers.", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400" }
];

const CART_KEY = "velvetCart";
let cart = [];

window.onload = () => {
  cart = loadCart();
  updateCartCount();
  renderTrending();
  setupCartModal();
};

function renderTrending() {
  const grid = document.getElementById("trending-grid");
  grid.innerHTML = "";
  cakeData.slice(0, 6).forEach(cake => {
    grid.innerHTML += `
      <div class="cake-card">
        <img src="${cake.img}" alt="${cake.name}" />
        <h3>${cake.name}</h3>
        <p>${cake.desc}</p>
        <strong>$${cake.price}</strong>
        <button onclick="openCartModal('${cake.name}')">Add to Cart</button>
      </div>
    `;
  });
}

function setupCartModal() {
  const modal = document.createElement("div");
  modal.id = "cart-modal";
  modal.style.cssText = `
    position: fixed; top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.4);
    display: none; justify-content: center; align-items: center; z-index: 9999;
  `;
  modal.innerHTML = `
    <div style="background: var(--cream-transparent); padding: 2rem; border-radius: 20px; max-width: 350px; text-align: center;">
      <h2 id="modal-title"></h2>
      <p id="modal-message"></p>
      <label for="qty-input">Quantity:</label>
      <input id="qty-input" type="number" value="1" min="1" style="width: 60px; margin: 1rem 0; padding: 5px; border-radius: 10px; border: 1px solid var(--glass-border);" />
      <div style="display: flex; justify-content: space-around; gap: 1rem;">
        <button id="modal-confirm" class="btn-cream" style="flex: 1;">Add</button>
        <button id="modal-cancel" class="btn-cream" style="flex: 1; background: transparent; border: 1.5px solid var(--brown-dark); color: var(--brown-dark);">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("modal-cancel").onclick = () => {
    modal.style.display = "none";
  };
  document.getElementById("modal-confirm").onclick = () => {
    const qty = parseInt(document.getElementById("qty-input").value);
    if (qty < 1 || isNaN(qty)) {
      alert("Please enter a valid quantity (1 or more).");
      return;
    }
    addToCart(modal.dataset.cakeName, qty);
    modal.style.display = "none";
  };
}

function openCartModal(cakeName) {
  const modal = document.getElementById("cart-modal");
  modal.dataset.cakeName = cakeName;
  document.getElementById("modal-title").textContent = `Add "${cakeName}" to cart?`;
  document.getElementById("modal-message").textContent = "";
  document.getElementById("qty-input").value = 1;
  modal.style.display = "flex";
}

function addToCart(cakeName, quantity) {
  const cake = cakeData.find(c => c.name === cakeName);
  if (!cake) return;
  const existing = cart.find(item => item.name === cakeName);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ ...cake, qty: quantity, id: Date.now() });
  }
  saveCart();
  updateCartCount();
  alert(`Added ${quantity} x ${cakeName} to your cart!`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => (el.textContent = count));
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}