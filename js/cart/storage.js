// Lấy giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// Xóa toàn bộ giỏ hàng
function clearCart() {
    localStorage.removeItem("cart");
}