document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const totalItems = document.getElementById('total-items');
    const calculateShippingButton = document.getElementById('calculate-shipping');
    const checkoutButton = document.getElementById('checkout-button');

    let cartItems = getCartItems();
    updateCartPage();

    function getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : {};
    }

    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function updateCartPage() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        for (let product in cartItems) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            // Adicionando a imagem do produto
            const productImage = document.createElement('img');
            productImage.src = cartItems[product].imageUrl; // Definindo a URL da imagem
            productImage.alt = product;
            productImage.className = 'cart-item-image'; // Classe CSS para estilização da imagem

            const productName = document.createElement('span');
            productName.textContent = product;

            const productPrice = document.createElement('span');
            productPrice.textContent = `R$${cartItems[product].price.toFixed(2)}`;

            const quantity = document.createElement('input');
            quantity.type = 'number';
            quantity.min = '1';
            quantity.value = cartItems[product].quantity;
            quantity.addEventListener('change', function () {
                if (quantity.value < 1) {
                    quantity.value = 1;
                }
                cartItems[product].quantity = parseInt(quantity.value);
                saveCartItems(cartItems);
                updateCartPage();
            });

            const itemTotal = document.createElement('span');
            itemTotal.textContent = `Total: R$${(cartItems[product].quantity * cartItems[product].price).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                delete cartItems[product];
                saveCartItems(cartItems);
                updateCartPage();
            });

            cartItem.appendChild(productImage); // Adicionando a imagem ao item do carrinho
            cartItem.appendChild(productName);
            cartItem.appendChild(productPrice);
            cartItem.appendChild(quantity);
            cartItem.appendChild(itemTotal);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
            total += cartItems[product].quantity * cartItems[product].price;
            itemCount += cartItems[product].quantity;
        }

        subtotalAmount.textContent = `R$${total.toFixed(2)}`;
        totalItems.textContent = itemCount;

        if (itemCount === 0) {
            checkoutButton.disabled = true;
        } else {
            checkoutButton.disabled = false;
        }
    }

    calculateShippingButton.addEventListener('click', function () {
        const cep = document.getElementById('cep').value;
        if (cep) {
            alert(`Frete calculado para o CEP: ${cep}.`);
        } else {
            alert('Por favor, insira um CEP válido.');
        }
    });

    checkoutButton.addEventListener('click', function () {
        alert('Pedido finalizado!');
        localStorage.removeItem('cartItems');
        window.location.href = 'index.html';
    });
});
