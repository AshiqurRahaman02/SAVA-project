let userInfo = JSON.parse(localStorage.getItem('userInfo')) 

// let userInfo = null
if(userInfo){

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name;

    div.addEventListener("click" , (e)=>{
        window.location.href = "../pages/account.html"
    })

}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}


const parent = document.querySelector("#main>div")
let price = document.getElementById("totalPrice")

window.addEventListener("load",()=>{
    getCartProduct();
})

function getCartProduct(){
    let data = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelector("#totalItems").innerHTML = data.length
    
    if(data.length){
        display(data)
    }else{
        parent.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-danger" role="alert">
                        <strong>No products found!</strong>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

function getWishlistProduct(){
    let data = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if(data.length){
        displayWishlist(data)
    }else{
        parent.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-danger" role="alert">
                        <strong>No products found!</strong>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

function display(allProducts ) {
    document.getElementById("notify").style.visibility = "visible";
    var totalPrice = 0
    let randomProducts = allProducts;


    let html = ""
    randomProducts.forEach(product => {
        let productName = product.productName;
        let maxLength = 17;
        if(product.productColor.length>6){
            maxLength = 15;
        }
        if (productName.length > maxLength) {
            productName = productName.substring(0, maxLength) + "...";
        }
        totalPrice+=(+product.productPrice)*(+product.quantity)
        html += `
        <div class="col-md-4">
            <div class="card">
                <img src="${product.productImage}" class="card-img-top" alt="..."  onclick="viewProduct('${product._id}','${product.quantity}')">
                <div class="card-body">
                    <h5 class="card-title"  onclick="viewProduct('${product._id}')">${productName}<br> ₹ ${product.productPrice}</h5>
                    <h6 class="card-color">${product.productColor}</h6>
                </div>
                <div id="div2">
                    <div><button onclick="incQuantity('${product._id}')" id="btn">+</button> <span>${product.quantity}</span> <button onclick="decQuantity('${product._id}')" id="btn">-</button></div>
                 <span id="buy"  onclick="buyProduct('${product._id}')">BUY NOW</span><span id="delete" onclick="deleteProduct('${product._id}','cart')">REMOVE</span> 
                </div>
            </div>
        </div>
        `
    })
    parent.innerHTML = ""
    parent.innerHTML = html
    price.innerHTML ="₹"+ totalPrice
}

function displayWishlist(data){
    var totalPrice = 0
    let randomProducts = data;


    let html = ""
    randomProducts.forEach(product => {
        let productName = product.productName;
        let maxLength = 17;
        if(product.productColor.length>6){
            maxLength = 15;
        }
        if (productName.length > maxLength) {
            productName = productName.substring(0, maxLength) + "...";
        }
        totalPrice+=(+product.productPrice)*(+product.quantity)
        html += `
        <div class="col-md-4">
            <div class="card">
                <img src="${product.productImage}" class="card-img-top" alt="..."  onclick="viewProduct('${product._id}','${product.quantity}')">
                <div class="card-body">
                    <h5 class="card-title"  onclick="viewProduct('${product._id}')">${productName}<br> ₹ ${product.productPrice}</h5>
                    <h6 class="card-color">${product.productColor}</h6>
                </div>
                <div id="div2">
                <span id="addToCart" onclick="addToCart('${product._id}')">ADD TO CART</span>
                 <span id="buy" onclick="buyProduct('${product._id}')">BUY NOW</span><span id="delete" onclick="deleteProduct('${product._id}','wishlist')">REMOVE</span> 
                </div>
            </div>
        </div>
        `
    })
    parent.innerHTML = ""
    parent.innerHTML = html
    document.getElementById("notify").style.visibility = "hidden"
}

function incQuantity(id){
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    let index = data.findIndex(product => product._id === id);
    data[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(data));
    getCartProduct();
}

function decQuantity(id){
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    let index = data.findIndex(product => product._id === id);
    data[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(data));
    getCartProduct();
}

function deleteProduct(id,page){
    
    
    if(page=="cart"){
        let data = JSON.parse(localStorage.getItem("cart")) || [];
        let index = data.findIndex(product => product._id === id);
        data.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(data));
        getCartProduct();
    }else
    if(page== "wishlist"){
        let data = JSON.parse(localStorage.getItem("wishlist")) || [];
        let index = data.findIndex(product => product._id === id);
        data.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(data));
        console.log(page)
        getWishlistProduct()
    }
}

function addToCart(id){
    
    fetch(`https://ill-trousers-crab.cyclic.app/products/product/${id}`)
    .then(response=>response.json())
    .then(data=>{
            console.log(data)
            addtoCartFunction(data)
    })
    .catch(err => {
            console.log(err)
    })

}

function addtoCartFunction(data){
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    
    if(!userInfo){
        var typewriterText = "PLEASE LOGIN FIRST";
    }else
    if(isPresent(data)){
        var typewriterText = "PRODUCT ALLREADY ADDED TO CART";
        console.log(data)
    }else{
        var typewriterText = "PRODUCT ADDED TO CART";
        data.quantity = 1
        cartData.push(data)
        localStorage.setItem("cart", JSON.stringify(cartData))

        document.querySelector(".login>span").innerHTML = cartData.length
    }

    document.getElementById("alert").style.visibility="visible"
    const typewriterDelay = 100;
    const typewriterElement = document.getElementById("typewriter");
    typewriterElement.innerHTML = ""
    let i = 0;
    typeWriter();
    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.innerHTML += typewriterText.charAt(i);
            i++;
            setTimeout(typeWriter, typewriterDelay);
        }
    }

    function isPresent(data){
        for(let i = 0; i < cartData.length; i++){
            if(data._id == cartData[i]._id){
                return true;
            }
        }
        return false;
    }

    setTimeout(function(){
        document.getElementById("alert").style.visibility="hidden"
    }, 3000)
}

function buyProduct(id){
    fetch(`https://ill-trousers-crab.cyclic.app/products/product/${id}`)
    .then(response=>response.json())
    .then(data=>{
        buyProductFunction(data)
    })
    .catch(err => {
        console.log(err)
    })
}

function buyProductFunction(data){
    let orderData = JSON.parse(localStorage.getItem("order")) || [];
    
    if(isPresent(data)){
        let index=isPresent(data)-1
        orderData[index].quantity++;
    }else{
        data.quantity = 1
        orderData.push(data)
    }
    localStorage.setItem("order", JSON.stringify(orderData))
    window.location.href = '../pages/order.html'

    function isPresent(data){
        for(let i = 0; i < orderData.length; i++){
            if(data._id == orderData[i]._id){
                return i+1;
            }
        }
        return false;
    }
}



//view product
function viewProduct(id,quantity){
    fetch(`https://ill-trousers-crab.cyclic.app/products/product/${id}`)
   .then(response=>response.json())
   .then(data=>{
    console.log(data)
    displayProduct(data,quantity)
   })
   .catch(err => {
    console.log(err)
   })
}

function displayProduct(product,quantity) {
    let popup = document.getElementById("popup")
    popup.classList.add("openpopup")

    parent.style.display="none"

    popup.innerHTML=`
        <div>
            <img src="${product.productImage}" alt="">
        </div>
        <div>
            <h3 id="name">${product.productName}</h3>
            <h4 id="ph4">PRICE <span id="price">&nbsp;&nbsp;₹${product.productPrice}</span></h4>
            <p id="description">${product.productDescription}</p>
            <p id="genP">FOR <span id="gender">&nbsp;&nbsp;${product.productGender}</span></p>
            <p id="colP">COLOR <span id="color">&nbsp;&nbsp;${product.productColor}</span></p>
            <p id="catP">CATEGORY <span id="category">&nbsp;&nbsp;${product.productCategory}</span></p>
            <div>
                <button id="addToWishlist" onclick="addToWishlist('${product._id}')">ADD TO WISHLIST</button>
            </div>
            <button id="buyNow" onclick="buyProduct('${product._id}')">BUY NOW</button>
            <div>
                <p id="check">CHECK IN-STORE AVAILABILITY</p>
                <p id="check">DELIVERY, EXCHANGES AND RETURNS</p>
            </div>
        </div>
        <ion-icon name="close-outline" id="cancel" onclick="closePopup()"></ion-icon>
    `
}

const closePopup = (productCategory) => {

    document.getElementById("popup").classList.remove("openpopup")

    parent.style.display = "block"
    window.location.reload()
}

let cart = document.getElementById("cart")
let wishlist = document.getElementById("wishlist")

cart.addEventListener("click", (e)=>{
    cart.classList.add("underline")
    wishlist.classList.remove("underline")

    getCartProduct();
})

wishlist.addEventListener("click", (e)=>{
    cart.classList.remove("underline")
    wishlist.classList.add("underline")

    getWishlistProduct()
})



  