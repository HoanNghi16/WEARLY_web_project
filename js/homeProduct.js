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
            <img src=${
              p["image"]
            } style="width: 100%; height: 300px;margin: auto;object-fit: cover; margin-bottom: 10px">
            <h5 id="ProductName">${truncate(p["name"], 30)}</h5>
            <p id="ProductPrice">${show_price(p["price"])}</p>
            <p id="description">${truncate(p["description"], 40)}</p>
        `;
    // Set the anchor href to include the product id so detail page can read it
    slot.setAttribute(
      "href",
      `../html/detail.html?id=${encodeURIComponent(p.id)}`
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  show_product();
});
