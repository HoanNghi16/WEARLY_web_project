import { products } from "../js/products.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = products.find((p) => p && p.id === id);

const container = document.getElementById("product-detail");

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
}

if (container) {
  if (product) {
    container.innerHTML = `
      <div class="row">
        <div class="col-2 m-0" id="productimg">
          <img src="${
            product.image
          }" alt="thumb1" class="m-1 img-thumbnail" style="cursor:pointer" />
          <img src="${
            product.image
          }" alt="thumb2" class="m-1 img-thumbnail" style="cursor:pointer" />
          <img src="${
            product.image
          }" alt="thumb3" class="m-1 img-thumbnail" style="cursor:pointer" />
          <img src="${
            product.image
          }" alt="thumb4" class="m-1 img-thumbnail" style="cursor:pointer" />
        </div>

        <div class="col-5">
          <img id="main-product-image" src="${product.image}" alt="${
      product.name
    }" class="w-100 img-fluid rounded" />
        </div>

        <div class="col-5 text-start">
          <h3>${product.name}</h3>
          <br />
          <div id="content">
            <p style="margin-bottom: 20px;">SKU: ${product.id}</p>
            <h3 class="text-danger">${formatPrice(product.price)}</h3>
          </div>
          <br />

          <div class="select-color">
            <p>Chọn màu</p>
            <img src="${
              product.image
            }" alt="color1" style="width:40px; height:40px; margin-right:6px; cursor:pointer" />
            <img src="${
              product.image
            }" alt="color2" style="width:40px; height:40px; margin-right:6px; cursor:pointer" />
            <img src="${
              product.image
            }" alt="color3" style="width:40px; height:40px; margin-right:6px; cursor:pointer" />
          </div>

          <br /><br />

          <p>Chọn size</p>
          <div id="nut" class="btn-group-circle">
            <button type="button" class="btn btn-outline-dark btn-circle">S</button>
            <button type="button" class="btn btn-outline-dark btn-circle">M</button>
            <button type="button" class="btn btn-outline-dark btn-circle">L</button>
            <button type="button" class="btn btn-outline-dark btn-circle">XL</button>
          </div>

          <p class="mt-3">Chọn số lượng</p>
          <div class="set-quantity d-flex align-items-center gap-2">
            <button class="btn btn-outline-dark btn-circle" id="down" onclick="chinhsoluong(-1)">-</button>
            <input class="inputsoluong text-center" type="number" id="quantity" value="1" min="0" style="width: 80px; padding: 6px 12px;" />
            <button class="btn btn-dark btn-circle" id="up" onclick="chinhsoluong(1)">+</button>
          </div>


          <div id="giohang">
            <div class="row align-items-center mt-2">
              <div class="col-6">
                <button type="button" class="btn btn-outline-dark">Thêm vào giỏ hàng</button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#myModal">Mua ngay</button>
              </div>
            </div>
          </div>
          <br />

          <div class="accordion mt-3" id="accordionExample">
            <div class="accordion-item" style="background-color: white">
              <h2 class="accordion-header">
                <button class="accordion-button bg-white text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">Chi tiết sản phẩm</button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="background-color: white">
                  <p>${product.description}</p>
                </div>
              </div>
            </div>

            <div class="accordion-item" style="background-color: white">
              <h2 class="accordion-header">
                <button class="accordion-button bg-white text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Hướng dẫn bảo quản</button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="background-color: white">
                  <p>${product.howtoclean}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Make thumbnail clicks change the main image
    const mainImg = container.querySelector("#main-product-image");
    const thumbs = container.querySelectorAll("#productimg img");
    thumbs.forEach((t) => {
      t.addEventListener("click", () => {
        if (mainImg && t.src) mainImg.src = t.src;
      });
    });
  } else {
    container.innerHTML = `<p class="text-danger">Không tìm thấy sản phẩm!</p>`;
  }
} else {
  console.error("No #product-detail container found in the page.");
}
