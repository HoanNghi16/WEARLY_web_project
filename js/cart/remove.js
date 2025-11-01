function handleRemoveItem() {
    const tbody = document.querySelector(".cart-table tbody");

    tbody.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-remove")) {
            const cart = getCart();
            const row = e.target.closest("tr");
            const index = row.dataset.index;

            if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                cart.splice(index, 1);
                saveCart(cart);
                renderCart();
            }
        }
    });
}