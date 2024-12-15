document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartTable = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const saveFavouritesButton = document.getElementById('save-favourites');
    const applyFavouritesButton = document.getElementById('apply-favourites');
    const favouriteList = document.getElementById('favouriteList');
    const favouritesSet = new Set();
    const buyNowButton = document.getElementById('buy-now');

    // Function to add an item to the cart
    function addToCart(itemName, price, quantity, inputElement) {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const existingRow = Array.from(cartTable.querySelectorAll('tr')).find(row => row.cells[0].textContent === itemName);

        if (existingRow) {
            const currentQuantity = parseInt(existingRow.cells[1].textContent);
            const newQuantity = currentQuantity + quantity;
            existingRow.cells[1].textContent = newQuantity;
            existingRow.cells[3].textContent = 'Rs.' + (newQuantity * price).toFixed(2);
        } else {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${itemName}</td>
                <td>${quantity}</td>
                <td>Rs.${price.toFixed(2)}</td>
                <td>Rs.${(price * quantity).toFixed(2)}</td>
            `;
            cartTable.appendChild(row);
        }

        inputElement.value = ''; // Reset the input field
        updateTotalPrice();
    }

    // Update total price
    function updateTotalPrice() {
        let total = 0;
        cartTable.querySelectorAll('tr').forEach(row => {
            total += parseFloat(row.cells[3].textContent.replace('Rs.', ''));
        });
        totalPriceElement.textContent = 'Total Price: Rs.' + total.toFixed(2);
    }

    // Save favourites to localStorage
    saveFavouritesButton.addEventListener('click', () => {
        const favourites = [];
        cartTable.querySelectorAll('tr').forEach(row => {
            favourites.push({
                itemName: row.cells[0].textContent,
                quantity: parseInt(row.cells[1].textContent),
                price: parseFloat(row.cells[2].textContent.replace('Rs.', ''))
            });
        });

        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Favourites saved!');
    });

    // Apply favourites from localStorage
    applyFavouritesButton.addEventListener('click', () => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (savedFavourites.length === 0) {
            alert('No favourites saved yet!');
            return;
        }

        savedFavourites.forEach(item => {
            const inputElement = document.getElementById(item.itemName.toLowerCase());
            addToCart(item.itemName, item.price, item.quantity, inputElement);
        });

        alert('Favourites applied!');
    });

    // Add to cart event
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantityInput = document.getElementById(itemName.toLowerCase());
            const quantity = parseInt(quantityInput.value) || 0;

            addToCart(itemName, price, quantity, quantityInput);
        });
    });

    // Save individual items to favourites
    const saveToFavButtons = document.querySelectorAll('.save-to-fav');
    saveToFavButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const itemName = button.dataset.name;

            if (!favouritesSet.has(itemName)) {
                favouritesSet.add(itemName);
                const listItem = document.createElement('li');
                listItem.textContent = itemName;
                favouriteList.appendChild(listItem);
                alert(`${itemName} saved to favourites!`);
            } else {
                alert(`${itemName} is already in your favourites.`);
            }
        });
    });
    buyNowButton.addEventListener('click', () => {
        const cartRows = cartTable.querySelectorAll('tr:not(:first-child)'); // Exclude header row

        if (cartRows.length == 0) {
            alert('Your cart is empty! Add items before purchasing.');
            return;
        }

        const totalPrice = parseFloat(totalPriceElement.textContent.replace('Total Price: Rs.', '').trim());
        const confirmPurchase = confirm(`Your total is Rs.${totalPrice.toFixed(2)}. Do you want to proceed with the purchase?`);

        if (confirmPurchase) {
            // Redirect to a confirmation page
            window.location.href = 'Payment Page.html'; // Change this to your desired HTML file
        } else {
            alert('Purchase canceled.');
        }
    });
});
