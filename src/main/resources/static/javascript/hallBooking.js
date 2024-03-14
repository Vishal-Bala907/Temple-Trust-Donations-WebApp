// Handling payment first

window.addEventListener('load', () => {
	const res = fetch('/admin/donation-requests')
		.then(response => {
			if (!response.ok) {
				throw new Error("Network error")
			}
			return response.json();
		})
		.then((data) => {
			hello(data)
		})
		.catch((error) => {
			console.log(error)
		})
})

function makeDonationCompleted(){
	console.log('DONATION IS COMPLTED')
}


function hello(data) {
	let innerHtml = "";
	data.forEach((item) => {
		innerHtml += `
		<div class="card" style="width: 18rem; height: fit-content;">
  		<div class="card-body style="height: fit-content;>
	    	<h5 class="card-title">Name : ${item.contactName}</h5>
	    	<h6 class="card-subtitle mb-2 text-body-secondary">
	    		Phone No. ${item.contactPhone}
	    	</h6>
	    	<h6 class="card-subtitle mb-2 text-body-secondary">
	    		Donation Type ${item.donationType}
	    	</h6>
	    	<p class="card-text">
	    	Description : ${item.amountOrItems
			}
	    	</p>
	    	<button onclick=makeDonationCompleted() id="${item.id}" class="btn btn-success">Collected</button>
	    	<button class="card-link btn btn-danger">Reject</button>
 	 </div>
	</div>
		`
	})
	donations.innerHTML = innerHtml
}

document.getElementById('hall-submit').addEventListener('click', () => {
	let amount = document.getElementById('charges').value;
	let name = document.getElementById('contactName').value
	let contact = document.getElementById('contactPhone').value
	let email = document.getElementById('contactEmail').value
	console.log(amount)

	if (!checkFormValidation()) {
		console.log("hello checking again")
		return;
	} else {

		var options = {
			key: 'rzp_test_hDVO4xr8wTOJRr', // Replace with your Razorpay API key
			amount: amount + "00", // Amount in smallest currency unit (e.g., paisa for INR)
			currency: 'INR', // Currency code (e.g., INR for Indian Rupees)
			name: 'Temple Trsut Donation',
			description: 'Items Realted To Temple and GOd',
			image: null, // Logo or image URL
			handler: function(response) {
				// Handle successful payment
				alert('Payment successful: ' + response.razorpay_payment_id);
				document.getElementById('artist-book-confirm').disabled = false;
				localStorage.setItem('disable', false);
			},
			prefill: {
				name: name, // Buyer's name
				email: email, // Buyer's email
				contact: contact // Buyer's contact number
			},
			theme: {
				color: '#F37254' // Customize the checkout theme color
			}
		};

		var rzp = new Razorpay(options);
		rzp.open();
	}
})

function checkFormValidation() {
	let mark = true;
	if (document.getElementById('eventName').value.length < 6) {
		document.getElementById('form-an').innerText = 'Enter A Name With Atlest 5 Charcters'
		mark = false;
	} else {
		document.getElementById('form-an').innerText = ""
	}

	if (document.getElementById('eventDate').value === '') {
		document.getElementById('e-date').innerText = "Please Select a date"
		mark = false;
	} else {
		document.getElementById('e-date').innerText = ""
	}

	if (Number(document.getElementById('numberOfDays').value) < 1) {
		document.getElementById('form-dy').innerText = 'Enter A Valid Number Of Days '
		document.getElementById('form-dy').style.border = "2px solid red";
		mark = false;
	} else {
		document.getElementById('form-dy').innerText = ""
	}
	if (document.getElementById('contactName').value.length < 5) {
		document.getElementById('form-yn').innerText = 'Enter A Name With Atlest 5 Charcters'
		mark = false;
	} else {
		document.getElementById('form-yn').innerText = ""
	}
	if (document.getElementById('contactPhone').value.length < 10) {
		document.getElementById('form-yp').innerText = 'Enter A Valid Number'
		mark = false;
	} else {
		document.getElementById('form-yp').innerText = ""
	}

	return mark;
}
