// addToCart.js

document.addEventListener("click", (e) => {
    // Kiểm tra nếu người dùng click vào nút "Thêm vào giỏ hàng"
    if (e.target && e.target.classList.contains("btn-outline-primary")) {
        const productName = document.querySelector("h3").innerText.trim();
        const priceText = document.querySelector("#content p:nth-of-type(2)").innerText.trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ""));
        const image = document.querySelector(".col-5 img").src;
        const quantity = parseInt(document.getElementById("quantity").value) || 1;

        const product = {
            id: Date.now(),
            name: productName,
            price,
            image,
            quantity
        };

        // Lấy danh sách hiện tại từ localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Kiểm tra nếu sản phẩm đã có thì cộng dồn số lượng
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push(product);
        }

        // Lưu lại vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Đã thêm vào giỏ hàng!");
    }
});