var currentUser = JSON.parse(localStorage.getItem('currentUser'))
document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.querySelector("#giohang .btn-outline-dark");
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener("click", () => {
        const productName = document.querySelector("h3").innerText.trim();
        const priceText = document.querySelector("#content h4").innerText.trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ""));
        const image = document.querySelector(".col-5 img").src;
        const quantity = parseInt(document.getElementById("quantity").value) || 1;
        if (currentUser == null){
            if(window.confirm('Bạn chưa đăng nhập! Vui lòng đăng nhập để sử dụng chức giỏ hàng.')){
                window.location.href = '/html/signin.html';
                return false;
            }
        }

        const product = {
            id: Date.now(),
            name: productName,
            price,
            image,
            quantity
        };

        // Lấy danh sách hiện tại từ localStorage
        let cart = JSON.parse(localStorage.getItem(`${currentUser['ID']}cart`)) || [];


        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push(product);
        }

        // Lưu lại vào localStorage
        localStorage.setItem(`${currentUser['ID']}cart`, JSON.stringify(cart));


        alert(" Đã thêm vào giỏ hàng!");


    });
});