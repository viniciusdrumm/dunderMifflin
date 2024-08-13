document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const moreInfoButtons = document.querySelectorAll('.more-info');
    const cartItemsContainer = document.getElementById('cart-items');
    const goToCartButton = document.getElementById('go-to-cart');

    const productPrices = {
        'Papel Sulfite A4 Branco 75g': 35.00,
        'Papel Sulfite A5 Branco 200g': 40.00,
        'Papel Sulfite A4 Reciclado 75g': 30.00,
        'Camiseta \'Halloween\'': 99.90,
        'Camiseta \'Nooo, Please, God.\'': 99.90,
        'Caneca \'World\'s best boss\'': 45.00,
        'Livro The Office': 109.90,
        'Boneco Dwight': 245.00,
        'Quadro The Office': 35.00,
        'Troféu Dundie': 55.00,
        'Sacola Aniversário': 50.00,
        'Boné Scranton': 89.00
    };

    const productDescriptions = {
        'Papel Sulfite A4 Branco 75g': 'Papel Sulfite A4 Branco 75g, ideal para impressões de alta qualidade e uso diário. Resistente e com ótima durabilidade, possui 500 folhas por pacote. A escolha perfeita para escritórios e escolas que necessitam de um papel confiável e de alto desempenho.',
        'Papel Sulfite A5 Branco 200g': 'Papel Sulfite A5 Branco 200g, um papel mais espesso que oferece resistência adicional, perfeito para convites, cartões e projetos de artesanato. Com 500 folhas por pacote, garante resultados profissionais em impressoras jato de tinta e laser.',
        'Papel Sulfite A4 Reciclado 75g': 'Papel Sulfite A4 Reciclado 75g, fabricado com materiais reciclados para uma alternativa sustentável. Ideal para o dia a dia no escritório ou em casa, este papel ecológico não compromete a qualidade, oferecendo 500 folhas por pacote.',
        'Camiseta \'Halloween\'': 'Camiseta temática "Halloween", inspirada no personagem Dwight Schrute de The Office. Confeccionada em algodão de alta qualidade, esta camiseta é perfeita para fãs da série e para quem adora o estilo excêntrico de Dwight.',
        'Camiseta \'Nooo, Please, God.\'': 'Camiseta "Nooo, Please, God.", um clássico entre os fãs de The Office, com uma das frases mais icônicas de Michael Scott. Feita de algodão macio, oferece conforto e durabilidade, além de ser uma peça indispensável para qualquer colecionador da série.',
        'Caneca \'World\'s best boss\'': 'Caneca "World\'s best boss", famosa por ser um símbolo do chefe Michael Scott de The Office. Feita em cerâmica de alta qualidade, é perfeita para café, chá ou qualquer bebida favorita. Um presente ideal para qualquer chefe (ou fã de The Office).',
        'Livro The Office': 'The Office: A História da Maior Sitcom dos Anos 2000. Este livro mergulha nos bastidores da série, revelando curiosidades e detalhes sobre a produção que conquistou o mundo. Um item obrigatório para qualquer fã da série.',
        'Boneco Dwight': 'Boneco Colecionável Dwight Schrute, um bobblehead que representa o personagem inesquecível de The Office. Com detalhes fiéis ao personagem, é um item de coleção essencial para os fãs mais dedicados da série.',
        'Quadro The Office': 'Quadro Poster "The Office", perfeito para decorar seu ambiente de trabalho ou casa. Com um design minimalista, este quadro captura a essência da série de maneira elegante e estilosa. Um toque especial para qualquer fã.',
        'Troféu Dundie': 'Troféu Dundie, inspirado nas premiações hilárias de Michael Scott em The Office. Feito em material resistente, é um item divertido e nostálgico que qualquer fã adoraria receber como prêmio ou como peça decorativa.',
        'Sacola Aniversário': 'Sacola Ecológica "Aniversário do Harry", uma homenagem divertida a um dos momentos clássicos de The Office. Feita de material durável e reutilizável, esta sacola é perfeita para compras ou como um acessório estiloso para qualquer fã.',
        'Boné Scranton': 'Boné "Scranton", inspirado no escritório mais famoso de The Office. Este boné de alta qualidade é perfeito para uso casual, com um ajuste confortável e design que destaca a série. Um must-have para os fãs que querem mostrar sua lealdade à Dunder Mifflin.'
    };

    let cartItems = getCartItems();

    // Alternar exibição do dropdown ao clicar no ícone do carrinho
    cartIcon.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Adicionar item ao carrinho ao clicar no botão de adicionar
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.closest('button').getAttribute('data-name');
            const imageUrl = event.target.closest('.product-card').querySelector('img').src; // Obtendo a URL da imagem
            addItemToCart(productName, imageUrl);
            saveCartItems(cartItems);
            updateCartDropdown();  // Atualiza o dropdown do carrinho imediatamente após adicionar
        });
    });

    // Exibir informações adicionais ao clicar no botão "Mais Informações"
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.closest('button').getAttribute('data-product');
            showProductInfo(productName);
        });
    });

    // Função para adicionar item ao carrinho
    function addItemToCart(productName, imageUrl) {
        if (cartItems[productName]) {
            cartItems[productName].quantity++;
        } else {
            cartItems[productName] = {
                quantity: 1,
                price: productPrices[productName],
                imageUrl: imageUrl  // Adicionando a URL da imagem
            };
        }
        console.log('Estado atual do carrinho:', cartItems); // Para depuração
    }

    // Função para atualizar a visualização do dropdown do carrinho
    function updateCartDropdown() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        for (let product in cartItems) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            const productName = document.createElement('span');
            productName.textContent = product;

            const productPrice = document.createElement('span');
            productPrice.textContent = `R$${cartItems[product].price.toFixed(2)}`;

            const quantity = document.createElement('span');
            quantity.textContent = `Quantidade: ${cartItems[product].quantity}`;

            const itemTotal = document.createElement('span');
            itemTotal.textContent = `Total: R$${(cartItems[product].quantity * cartItems[product].price).toFixed(2)}`;

            cartItem.appendChild(productName);
            cartItem.appendChild(productPrice);
            cartItem.appendChild(quantity);
            cartItem.appendChild(itemTotal);

            cartItemsContainer.appendChild(cartItem);
            total += cartItems[product].quantity * cartItems[product].price;
        }

        let totalContainer = document.getElementById('total-container');
        if (!totalContainer) {
            totalContainer = document.createElement('div');
            totalContainer.id = 'total-container';
            cartDropdown.appendChild(totalContainer);
        }
        totalContainer.textContent = `Total: R$${total.toFixed(2)}`;
    }

    // Função para exibir o modal com informações do produto
    function showProductInfo(product) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const productInfo = document.createElement('p');
        productInfo.textContent = productDescriptions[product];

        const closeModalButton = document.createElement('button');
        closeModalButton.className = 'modal-close';
        closeModalButton.textContent = 'Fechar';
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });

        modalContent.appendChild(productInfo);
        modalContent.appendChild(closeModalButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }

    // Redirecionar para a página do carrinho ao clicar no botão "Ir para o Carrinho"
    goToCartButton.addEventListener('click', () => {
        window.location.href = 'carrinho.html';
    });

    // Funções para gerenciar localStorage
    function getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : {};
    }

    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Inicializa o dropdown do carrinho na página
    updateCartDropdown();
});
