
// Load cart data from local storage when the page loads
window.addEventListener('load', function() {
	makePayment()
});




document.getElementById("pay-now-button").addEventListener('click', () => {
	let amount = localStorage.getItem("price");
	
	var options = {
		key: 'rzp_test_q9VAoWuCTIuUQ8', // Replace with your Razorpay API key
		amount: Number(amount) + "00", // Amount in smallest currency unit (e.g., paisa for INR)
		currency: 'INR', // Currency code (e.g., INR for Indian Rupees)
		name: 'Temple Trsut Donation',
		description: 'Items Realted To Temple and GOd',
		image: null, // Logo or image URL
		handler: function(response) {
			// Handle successful payment
			alert('Payment successful: ' + response.razorpay_payment_id);
			localStorage.clear()
		},
		prefill: {
			name: 'John Doe', // Buyer's name
			email: 'john.doe@example.com', // Buyer's email
			contact: '9876543210' // Buyer's contact number
		},
		theme: {
			color: '#F37254' // Customize the checkout theme color
		}
	};

	var rzp = new Razorpay(options);
	rzp.open();
})

function makePayment() {
	document.getElementById("amount").value = localStorage.getItem("price")
	document.getElementById("amount").readOnly = true
}





