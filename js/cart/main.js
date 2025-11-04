document.addEventListener("DOMContentLoaded", () => {
    if (currentUser == null){
        alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để sử dụng chức giỏ hàng.')
        window.location.href = '/html/signin.html';
        return false;
    }
    renderCart();
    handleQuantityChange();
    handleRemoveItem();
});