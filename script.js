
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
