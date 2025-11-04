import { products } from "../js/products.js";
function get_homeProducts() {
  let homeProducts = [];
  var cate = { pants: 0, jacket: 0, shirt: 0, dress: 0 };
  products.forEach((p) => {
    if (cate[p.category] < 2) {
      homeProducts.push(p);
      cate[p.category] += 1;
    }
  });
  return homeProducts;
}

var homeProducts = get_homeProducts();
function truncate(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function show_price(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

function show_product() {
  // Render only existing homeProducts and set link to detail page with id query param
  for (let i = 0; i < homeProducts.length; i++) {
    const p = homeProducts[i];
    const slot = document.getElementById(`Product${i + 1}`);
    if (!slot || !p) continue;
    slot.innerHTML = `
            <div class="card h-100 shadow-sm product-card" data-id="${p.id}" style="cursor:pointer;">
                <img src="${p.image}" class="card-img-top"
                    style="width: 100%; height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${truncate(p.name, 25)}</h5>
                    <p class="card-text text-danger fw-bold">${show_price(p.price)}</p>
                    <p class="card-text text-muted">${truncate(p.description, 35)}</p>
                </div>
            </div>
        `;
    // Set the anchor href to include the product id so detail page can read it
    slot.setAttribute(
      "href",
      `../html/detail.htmlid=${encodeURIComponent(p.id)}`
    );
  }
}
document.querySelectorAll(".product-list .nav-item").forEach(item => {
  item.addEventListener("click", e => {
      let category='';
      e.preventDefault();
      const span = item.querySelector("span");
      if (!span) return;
      const text = span.textContent.trim().toLowerCase();
      
      switch (text) {
          case "váy": category = "dress"; break;
          case "áo": category = "shirt"; break;
          case "áo khoác": category = "jacket"; break;
          case "quần": category = "pants"; break;
          default: category = "";
      }
      window.location.href = `../html/products.html?category=${category}`
  });
});


document.addEventListener("DOMContentLoaded", () => {
  show_product();
});
