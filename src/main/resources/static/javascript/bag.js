
let bagArray = []

// Function to save cart data to local storage
function saveCartToLocalStorage() {
	localStorage.setItem('cart', JSON.stringify(bagArray));
}

// Function to load cart data from local storage
function loadCartFromLocalStorage() {
	const cartData = localStorage.getItem('cart');
	if (cartData) {
		bagArray = JSON.parse(cartData);
	}
}



// Load cart data from local storage when the page loads
window.addEventListener('load', function() {
	loadCartFromLocalStorage();
	document.getElementById('cart').innerText = bagArray.length
	displayCart()
	createCartBill()
	makePayment()
	document.getElementById('artist-book-confirm').disabled = Boolean(localStorage.getItem('disable'))
	//displayCart(); // Display cart items on the page
});

function addItemToBag(item) {
	console.log("add to bag clicked", item)
	bagArray.push(item)
	console.log(item)
	saveCartToLocalStorage();
	document.getElementById('cart').innerText = bagArray.length
	createCartBill()
	/*document.getElementById('cart').innerText = id*/
}
// function Used to remove Items From Shop list
function removeItemFromList(item) {
	console.log(item)
	fetch('http://localhost:8080/delete-item', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	})
		.then(response => {
			// Check if the response is successful
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Parse the JSON response
			return response.json();
		})
		.then(data => {
			// Use the fetched data
			location.reload();
			console.log(data);
		})
		.catch(error => {
			// Handle any errors that occur during the fetch
			console.error('Error:', error);
		});


}

// Function to remove items from bag
function removeFromBag(item) {
	bagArray = bagArray.filter((bagitem) => {
		return item.p_id !== bagitem.p_id;
	})
	saveCartToLocalStorage()
	document.getElementById('cart').innerText = bagArray.length
	location.reload();
	createCartBill()
	createTotal()
}


let cartHtml = "";

// This funcitons Displays the Cart with the selcted items and Payment area
let displayCart = () => {

	if (bagArray.length === 0) {
		cartHtml += ` <div style="display:flex;justify-content:center;align-items:center; height:60%;font-size:xxx-large;"
		<h1 style="font-size:xxx-large;" > No Items In The Cart </h1>
		</div>
		`
			;
	} else {

		if (document.getElementById('cart-items').classList.contains('admin')) {

			bagArray.forEach(item => {
				/*shop.push(item)*/

				cartHtml += ` 
            <div class="card" style="width: 18rem; height: fit-content;;">
                 <img src="/${item.imageUrl}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h3 class="card-title">Rs. ${item.price}</h3>
                        <p class="card-text">${item.description}</p>
                        <a href="/admin/user-cart" style="margin-left:20%;" class="btn btn-danger ml-auto" id="remove-from-${item.p_id}">Remove From Bag</a>
                      </div>
            </div>`
			});
			document.getElementById('cart-items').innerHTML = cartHtml;
		} else {
			bagArray.forEach(item => {
				/*shop.push(item)*/

				cartHtml += ` 
            <div class="card" style="width: 18rem; height: fit-content;;">
                 <img src="/${item.imageUrl}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h3 class="card-title">Rs. ${item.price}</h3>
                        <p class="card-text">${item.description}</p>
                        <a href="/user-cart" style="margin-left:20%;" class="btn btn-danger ml-auto" id="remove-from-${item.p_id}">Remove From Bag</a>
                      </div>
            </div>`
			});

			document.getElementById('cart-items').innerHTML = cartHtml;
		}


	}



	bagArray.forEach(item => {
		document.getElementById(`remove-from-${item.p_id}`).addEventListener('click', function(event) {
			// Your click event handler code goes here
			//= You can use the "item" object to access the details of the product being clicked
			removeFromBag(item);
		});
	});

}
let cartBillHtml = "";
let totalPrice = 0;
let createCartBill = () => {
	bagArray.forEach(item => {
		/*shop.push(item)*/
		totalPrice += item.price
		cartBillHtml += ` 
            <section class="cart-items-bill">
							<div class="itemName"><b>	${item.name} : </b></div>
							<div class="itemPrice">${item.price} Rs</div>
						</section>
							<hr />`
	});

	localStorage.setItem("price", totalPrice);
	document.getElementById("card-bill").innerHTML = cartBillHtml;
	document.getElementById("total-price").innerText = `${totalPrice} Rs`
}

document.getElementById('numberOfDays').addEventListener('keyup', (e) => {
	var positiveIntegerRegex = /^[1-9]\d*$/;
	let perDayCharge = 5000;
	if (positiveIntegerRegex.test(e.key) || e.key === 'Backspace') {
		var days = Number(document.getElementById('numberOfDays').value)
		var charges = days * perDayCharge;
		document.getElementById('charges').value = charges
	} else {
		alert("Please Enter a Number")
	}
})


// Handling payment first, of Artist Booking
document.getElementById('artist-submit').addEventListener('click', () => {
	let amount = document.getElementById('charges').value;
	let name = document.getElementById('contactName').value
	let contact = document.getElementById('contactPhone').value
	let email = document.getElementById('contactEmail').value
	
		checkArtistDateAvaibility().then((data)=>{
			if(data.length > 0){
				document.getElementById('e-date').innerText = "The Entered Date Is Not Available"
				return;
			}else{
				if (!checkFormValidationForArtist()) {
				return;
			} else {
	
				var options = {
				key: 'rzp_test_q9VAoWuCTIuUQ8', // Replace with your Razorpay API key
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
			}
				
		})
	

		
})


async function checkArtistDateAvaibility(){
	try{
 	const res = await fetch(`http://localhost:8080/get-artist-book-date/${document.getElementById('eventDate').value}`);
    if(!res.ok){
		throw new Error("Network Error")
	}
	const data = res.json();
	return data;
	}
	catch(error){
		console.log(error);
	}
}


// Validates the from Filled by the user , ArtistBooking Form
function checkFormValidationForArtist() {
	let mark = true;
	if (document.getElementById('artistName').value.length < 6) {
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



