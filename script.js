//SlideShow//

let count = 1;
document.getElementById("radio1").checked = "true";

setInterval(function() {
    nextImage();
}, 5000)

function nextImage(){
    count++;
    if(count > 3){
        count = 1;
    }

    document.getElementById("radio"+count).checked = "true";
}

//Fim SlideShow//

// Função Carrinho de compras

// document.addEventListener('DOMContentLoaded', function() {
//     const cartIcon = document.getElementById('cart-icon');
//     const cartDropdown = document.getElementById('cart-dropdown');
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     const cartItemsContainer = document.getElementById('cart-items');
//     let cartItems = [];

//     cartIcon.addEventListener('click', () => {
//         cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
//     });
// 19
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', (event) => {
//             const productName = event.target.getAttribute('data-product');
//             cartItems.push(productName);
//             updateCart();
//         });
//     });

//     function updateCart() {
//         cartItemsContainer.innerHTML = '';
//         cartItems.forEach(item => {
//             const div = document.createElement('div');
//             div.textContent = item;
//             cartItemsContainer.appendChild(div);
//         });
//     }
// });
