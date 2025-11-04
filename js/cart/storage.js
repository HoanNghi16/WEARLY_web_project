var currentUser = JSON.parse(localStorage.getItem('currentUser'))
// Lấy giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem(`${currentUser['ID']}cart`)) || [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem(`${currentUser['ID']}cart`, JSON.stringify(cart));
}
// Xóa toàn bộ giỏ hàng
function clearCart() {
    localStorage.removeItem(`${currentUser['ID']}cart`);
}