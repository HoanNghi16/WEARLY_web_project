window.addEventListener("DOMContentLoaded", function () {
  var checkboxs = document.querySelectorAll(".select-item");
  var qtyInputs = document.querySelectorAll(".quantity");
  var priceCells = document.querySelectorAll(".price");
  var subtotalCells = document.querySelectorAll(".subtotal");
  var subtotalAmount = document.querySelector(".subtotalAmount");
  var totalAmount = document.querySelector(".total");
  var shipFee = 30000;

  function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + "₫";
  }
  function updateRowSubtotal(index) {
    var qty = parseInt(qtyInputs[index].value);
    var price = parseInt(priceCells[index].textContent);
    var subtotal = qty * price;
    subtotalCells[index].textContent = subtotal;
    updateTotal();
  }
  function updateTotal() {
    var subtotal = 0;
    var checked = document.querySelectorAll(".select-item:checked");

    if (checked.length > 0) {
      for (var i = 0; i < checked.length; i++) {
        var cb = checked[i];
        var row = cb.closest("tr");
        var rowSubtotal = parseInt(row.querySelector(".subtotal").textContent);
        subtotal += rowSubtotal;
      }
    } else {
      for (var j = 0; j < subtotalCells.length; j++) {
        subtotal += parseInt(subtotalCells[j].textContent);
      }
    }
    var total = subtotal + shipFee;
    subtotalAmount.textContent = formatMoney(subtotal);
    totalAmount.textContent = formatMoney(total);
  }
  for (var k = 0; k < checkboxs.length; k++) {
    checkboxs[k].addEventListener("change", function () {
      updateTotal();
    });
  }
  for (var i = 0; i < qtyInputs.length; i++) {
    (function (index) {
      qtyInputs[index].addEventListener("input", function () {
        updateRowSubtotal(index);
      });
    })(i);
  }
  var removeButtons = document.querySelectorAll(".btn-remove");
  for (var m = 0; m < removeButtons.length; m++) {
    removeButtons[m].addEventListener("click", function () {
      this.closest("tr").remove();
      updateTotal();
    });
  }

  updateTotal();
});
