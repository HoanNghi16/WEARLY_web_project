function handleQuantityChange() {
    const tbody = document.querySelector(".cart-table tbody");

    tbody.addEventListener("input", (e) => {
        if (e.target.classList.contains("quantity")) {
            const cart = getCart();
            const row = e.target.closest("tr");
            const index = row.dataset.index;
            const newQty = parseInt(e.target.value);

            if (newQty > 0) {
                cart[index].quantity = newQty;
                saveCart(cart);
                renderCart();
            }
        }
    });
}