// js/cart/checkout.js

document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkout-btn");
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem(`${currentUser['ID']}cart`)) || [];

        if (cart.length === 0) {
            alert("🛒 Giỏ hàng của bạn đang trống!");
            return;
        }


        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


        const confirmCheckout = confirm(
            `Tổng thanh toán: ${total.toLocaleString()}₫\n\nXác nhận thanh toán?`
        );

        if (confirmCheckout) {
            localStorage.removeItem("cart");


            alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");


            window.location.reload(); // tải lại để làm trống giỏ hàng
        }
    });
});