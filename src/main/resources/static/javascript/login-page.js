let loginPageEye = document.getElementsByClassName("eye")[0];
let passwordField = document.getElementById("InputPassword");
//.innerHTML = "visibility_off"

// Handling remove items age
async function fetchPosts() {
	try {
		const res = await fetch('http://localhost:8080/getAllItems');
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error; // Re-throwing the error to be handled by the caller
	}
}



// To use the function and retrieve the posts object
let innerhtml = "";

// loading all the items to the Shop
window.addEventListener('load', function() {
	console.log("hello")
	loadEventsOfNext7Days();
	fetchPosts()
		.then(data => {
			data.forEach(item => {
				innerhtml += ` 
            <div class="card" style="width: 18rem; height: fit-content;">
                 <img src="/${item.imageUrl}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h3 class="card-title">Rs. ${item.price}</h3>
                        <p class="card-text">${item.description}</p>
                        <a href="#" class="btn btn-danger" id="add-to-bag-${item.p_id}">Remove</a>
                      </div>
            </div>`
			});

			document.getElementById('remove-products').innerHTML = innerhtml;
			// Add click event listener to each "Add To Bag" button
			data.forEach(item => {
				document.getElementById(`add-to-bag-${item.p_id}`).addEventListener('click', function(event) {
					removeItemFromList(item);
				});
			});

		})
		.catch(error => {
			// Handle error
		});


});

// Function to handle logout
function logout() {
	fetch('/logout', {
		method: 'GET',
		credentials: 'same-origin', // Ensures cookies are included in the request
		redirect: 'follow'
	}).then(response => {
		if (response.redirected) {
			window.location.href = response.url;
		}
	}).catch(error => {
		console.error('Logout failed:', error);
	});
}

// Toggle eye function
loginPageEye.addEventListener('click', function() {
	if (loginPageEye.innerHTML === "visibility_off") {
		loginPageEye.innerHTML = "visibility";
		passwordField.type = "password"
	}

	else {
		loginPageEye.innerHTML = "visibility_off";
		passwordField.type = "text"
	}
})


async function loadEventsOfNext7Days(){
	fetch("/7days-events").
	then((res)=>{
		if(!res.ok){
			throw new Error("Error")
			}
			 return res.json()
	}).then((data)=>{
		let html = "";
		data.forEach((item)=>{ 
		html = html +	`<div class="card" style="width: 100%; margin:2%;">
  			<div class="card-body">
	    		<p class="card-text">
	    			<h2> Event Name : ${item.eventName} </h2> <hr>
	    			<h5> Event Date : ${item.date} </h5> <hr>
	    			<h5> Event Days : ${item.noOFdays} </h5> <hr>
	    			<h5> Organizer Email : ${item.yourEmail} </h5> <hr>
	    			<h5> Organizer Name Email : ${item.yourName} </h5> <hr>
	    			<h5> Organizer Name Phone : ${item.yourPhone} </h5> <hr>
	    		</p> <hr>
	    		<button class="btn btn-success" id="event-com-${item.id}" >Completed </button>
	    		<button class="btn btn-danger" id="event-can-${item.id}">Canceled</button>
  			</div>
			</div>`
		})
		document.getElementById("admin-event-dates").innerHTML = html;
	}
		
	)
}



