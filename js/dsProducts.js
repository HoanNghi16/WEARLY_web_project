import { products } from "../js/products.js";

function get_dsProducts(){
    let dsProducts = []
    var cate = {"pants": 0, "jacket": 0, "shirt": 0, "dress": 0}
    products.forEach(p =>{
        if (cate[p.category] < 2){
            dsProducts.push(p)
            cate[p.category] +=1
        }
    })
    return dsProducts
}

function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function show_price(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + " đ";
}

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

function getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(p => p.category === category);
}

const itemsPerPage = 8;
let filteredProducts = [];
let originalProducts = [];
let currentPage = 1; 
let totalPages = 1;

function renderProducts(page) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    if (pageProducts.length === 0) {
        productList.innerHTML = "<p>Không có sản phẩm nào để hiển thị.</p>";
        return;
    }

    pageProducts.forEach((p, index) => {
<<<<<<< HEAD
        const col = document.createElement("div");
=======
        const col = document.createElement("a");
        col.setAttribute("style", "text-decoration: none; color: inherit;");
>>>>>>> 4d9034a747a69d193e2c84833cfbd9356bed7d3d
        col.className = "col-md-3 mb-4 product-item";
        col.innerHTML = `
            <div class="card h-100 shadow-sm product-card" data-id="${p.id}" style="cursor:pointer;">
                <img src="${p.image}" class="card-img-top"
                    style="width: 100%; height: 300px; object-fit: cover;">
                <div class="card-body">
<<<<<<< HEAD
                    <h5 class="card-title">${truncate(p.name, 30)}</h5>
                    <p class="card-text text-danger fw-bold">${show_price(p.price)}</p>
                    <p class="card-text text-muted">${truncate(p.description, 40)}</p>
                </div>
            </div>
        `;
        productList.appendChild(col);
        setTimeout(() => col.classList.add("show"), 100 * index);
    });

    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-id");
            window.location.href = `../html/chitietsanpham.html?id=${id}`;
        });
    });
=======
                    <h5 class="card-title">${truncate(p.name, 25)}</h5>
                    <p class="card-text text-danger fw-bold">${show_price(p.price)}</p>
                    <p class="card-text text-muted">${truncate(p.description, 35)}</p>
                </div>
            </div>
        `;
        col.setAttribute(
        "href",
        `../html/detail.html?id=${encodeURIComponent(p.id)}`
    );
        productList.appendChild(col);
        setTimeout(() => col.classList.add("show"), 100 * index);
    });
>>>>>>> 4d9034a747a69d193e2c84833cfbd9356bed7d3d
}

function setupPagination() {
    totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    const prevLi = document.createElement("li");
    prevLi.className = "page-item";
    prevLi.innerHTML = `<a class="page-link" href="#">←</a>`;
    pagination.appendChild(prevLi);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        if (i === currentPage) li.classList.add("active");
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pagination.appendChild(li);
    }

    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    nextLi.innerHTML = `<a class="page-link" href="#">→</a>`;
    pagination.appendChild(nextLi);
}

function handlePaginationClick(e) {
    e.preventDefault();
    if (e.target.tagName !== "A") return;

    const text = e.target.textContent.trim();

    if (text === "←" && currentPage > 1) currentPage--;
    else if (text === "→" && currentPage < totalPages) currentPage++;
    else if (!isNaN(text)) currentPage = parseInt(text);
    else return;

    renderProducts(currentPage);
    updateActivePage(currentPage);

    document.getElementById("productList").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

function updateActivePage(pageNum) {
    document.querySelectorAll("#pagination .page-item").forEach(li => li.classList.remove("active"));
    const target = Array.from(document.querySelectorAll("#pagination .page-item a"))
        .find(a => a.textContent.trim() === pageNum.toString());
    if (target && target.parentElement) {
        target.parentElement.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const category = getCategoryFromURL();
    filteredProducts = getProductsByCategory(category);
    originalProducts = [...filteredProducts];
    currentPage = 1;
    renderProducts(currentPage);
    setupPagination();
    document.getElementById("pagination").addEventListener("click", handlePaginationClick);

    document.querySelectorAll(".product-list .nav-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();

            const span = item.querySelector("span");
            if (!span) return;

            const text = span.textContent.trim().toLowerCase();
            let category = "";
            switch (text) {
                case "váy": category = "dress"; break;
                case "áo": category = "shirt"; break;
                case "áo khoác": category = "jacket"; break;
                case "quần": category = "pants"; break;
                default: category = "";
            }

            filteredProducts = getProductsByCategory(category);
            originalProducts = [...filteredProducts];
            currentPage = 1;
            renderProducts(currentPage);
            setupPagination();

            document.getElementById("productList").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            document.querySelectorAll(".product-list .nav-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    //Sắp xếp theo giá tăng dần / giảm dần
    document.getElementById("sortGia").addEventListener("change", e => {
        const sortValue = e.target.value;

        if (sortValue === "tangdan") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "giamdan") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else {
            filteredProducts = [...originalProducts];
        }

        currentPage = 1;
        renderProducts(currentPage);
        setupPagination();

        document.getElementById("productList").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
});
