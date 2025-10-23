import { products } from "../js/products.js";
function get_homeProducts(){
    let homeProducts = []
    var cate = {"pants": 0, "jacket": 0, "shirt": 0, "dress": 0}
    products.forEach(p =>{
        if (cate[p.category] < 2){
            homeProducts.push(p)
            cate[p.category] +=1
        }
    })
    return homeProducts
}

var homeProducts = get_homeProducts()
console.log(homeProducts)
function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
function show_product(){
    let i = 1;
    while (i<=9){
        console.log()
        document.getElementById(`Product${i}`).innerHTML= `
            <img src=${homeProducts[i-1]["image"]} style="width: 100%; height: 300px;margin: auto;object-fit: cover">
            <h5 id="ProductName">${homeProducts[i-1]["name"]}</h5>
            <p id="ProductPrice">${homeProducts[i-1]["price"]}</p>
            <p id="description">${truncate(homeProducts[i-1]["description"], 30)}</p>
        `;
        i++;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    show_product();
});