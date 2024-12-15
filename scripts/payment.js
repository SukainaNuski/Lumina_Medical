document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const processPaymentButton = document.getElementById('process-payment');

    // Validate form fields
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the form from submitting immediately

        const name = document.getElementById('Name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const amount = document.getElementById('amount').value;

        // Check if all fields are filled
        if (name && cardNumber && expiryDate && cvv && amount) {
            alert('Thank you for purchasing with us!');
        } else {
            alert('Field not filled');
        }
    });
});
