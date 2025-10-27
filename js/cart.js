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
  function get_float_money(moneyStr) {
    return parseFloat(moneyStr.replace(/[₫,.]/g, ""));
  }
  function updateRowSubtotal(index) {
    var qty = get_float_money(qtyInputs[index].value);
    var price = get_float_money(priceCells[index].textContent);
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
        var rowSubtotal = get_float_money(row.querySelector(".subtotal").textContent);
        subtotal += rowSubtotal;
      }
    } else {
      for (var j = 0; j < subtotalCells.length; j++) {
        subtotal += get_float_money(subtotalCells[j].textContent);
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
