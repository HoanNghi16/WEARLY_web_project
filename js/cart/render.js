function renderCart() {
    const tbody = document.querySelector(".cart-table tbody");
    const subtotalAmount = document.querySelector(".subtotalAmount");
    const shipFee = document.querySelector(".shipfee");
    const totalAmount = document.querySelector(".total");

    const cart = getCart();
    tbody.innerHTML = "";

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center empty-cart">Giỏ hàng trống!</td></tr>`;
        subtotalAmount.textContent = "0";
        totalAmount.textContent = shipFee.textContent;
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        const row = document.createElement("tr");
        row.dataset.index = index;
        row.innerHTML = `
            <td><input type="checkbox" class="select-item" /></td>
            <td><a href='../html/detail.html?id=${item.id}'><img src="${item.image}" class="img rounded-circle" style="width:70px"></a></td>
            <td>${item.name}</td>
            <td class="price">${item.price.toLocaleString("vi-VN")}đ</td>
            <td><input type="number" class="quantity form-control w-50" value="${item.quantity}" min="1"></td>
            <td class="subtotal">${lineTotal.toLocaleString("vi-VN")}đ</td>
            <td><button class="btn-remove btn btn-outline-danger btn-sm">Xóa</button></td>
        `;
        tbody.appendChild(row);
    });

    subtotalAmount.textContent = subtotal.toLocaleString("vi-VN");
    const shipping = parseFloat(shipFee.textContent);
    totalAmount.textContent = (subtotal + shipping).toLocaleString("vi-VN");
}