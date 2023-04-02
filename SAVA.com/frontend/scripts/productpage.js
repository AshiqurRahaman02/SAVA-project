let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
// let userInfo = null
if(userInfo){

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name

    div.addEventListener("click" , (e)=>{
        window.location.href = "../pages/account.html"
    })

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".login>span").innerHTML = cartData.length

}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}


const parent = document.querySelector("#parent")
var allProductsData = null;
window.addEventListener("load", (e)=>{
    getAllProducts(1)
})

var currentPage = 1
async function getAllProducts(page) {
    
    try {
        const response = await fetch(`https://ill-trousers-crab.cyclic.app/products/page/${page}`)
        const data = await response.json()
        if (data.length) {
            allProductsData = data
            display(data)
        } else {
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
    } catch (error) {
        console.log(error)
    }
}


function display(allProducts ) {

    let randomProducts = allProducts

    let html = ""
    randomProducts.forEach(product => {
        let productName = product.productName;
        let maxLength = 17;
        if(product.productColor=="TRANSPARENT"){
            maxLength = 15;
        }
        if (productName.length > maxLength) {
            productName = productName.substring(0, maxLength) + "...";
        }

        html += `
        <div class="col-md-4">
            <div class="card">
                <img src="${product.productImage}" class="card-img-top" alt="..."  onclick="viewProduct('${product._id}')">
                <div class="card-body">
                    <h5 class="card-title"  onclick="viewProduct('${product._id}')">${productName}<br> ₹ ${product.productPrice}</h5>
                    <h6 class="card-color">${product.productColor}</h6>
                    <div>
                        <ion-icon name="cart-outline" class="cart" onclick="addToCart('${product._id}')"></ion-icon>
                        <ion-icon name="bookmark-outline" class="fav" onclick="addToWishlist('${product._id}')"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
        `
    })

    parent.innerHTML = ""
    parent.innerHTML = html
    document.querySelector("#pagination>div").style.display="block"
}


function viewProduct(id){
    fetch(`https://ill-trousers-crab.cyclic.app/products/product/${id}`)
   .then(response=>response.json())
   .then(data=>{
    displayProduct(data)
   })
   .catch(err => {
    console.log(err)
   })
}

function displayProduct(product) {
    let popup = document.getElementById("popup")
    popup.classList.add("openpopup")


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
            <p id="catP">CATEGORY <span id="category">&nbsp;&nbsp;${product.productCategory.toUpperCase()}</span></p>
            <div>
                <button id="addToCart" onclick="addToCart('${product._id}')">ADD TO CART</button>
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


function addToWishlist(id){
    
    fetch(`https://ill-trousers-crab.cyclic.app/products/product/${id}`)
    .then(response=>response.json())
    .then(data=>{
            console.log(data)
            addtoWishListFunction(data)
    })
    .catch(err => {
            console.log(err)
    })
}

function addtoWishListFunction(data){
    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if(!userInfo){
        var typewriterText = "PLEASE LOGIN FIRST";
        var time = 3000
    }else
    if(isPresent(data)){
        var typewriterText = "PRODUCT ALLREADY ADDED TO WISHLIST";
        var time = 4000
        console.log(data)
    }else{
        var typewriterText = "PRODUCT ADDED TO WISHLIST";
        var time = 3000
        wishlistData.push(data)
        localStorage.setItem("wishlist", JSON.stringify(wishlistData))
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
        for(let i = 0; i < wishlistData.length; i++){
            if(data._id == wishlistData[i]._id){
                return true;
            }
        }
        return false;
    }

    setTimeout(function(){
        document.getElementById("alert").style.visibility="hidden"
    }, time)
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


let sort = document.getElementById("sort")

sort.addEventListener("change", (e)=>{
    let value = sort.value;
    let data = allProductsData
    if(value==""){
        getAllProducts(1)
    }else
    if(value == "asc"){
        data.sort((a,b)=>{
            return a.productPrice - b.productPrice
        })
        display(data)
    }else
    if(value == "desc"){
        data.sort((a,b)=>{
            return b.productPrice - a.productPrice
        })
        display(data)
    }else
    if(value == "review"){
        
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        display(data)
    }
})


let filters = {}
document.querySelectorAll("input[type=checkbox]").forEach((checkbox)=>{
    checkbox.addEventListener("change", (e)=>{
        filters[checkbox.name] = checkbox.checked
        parent.innerHTML =`
            <div id="load">
                <div class="loading"></div>
                <p>LOADING</p>
            </div>
        `
        applyFilters()
    })
})


async function getProducts() {
    try {
        const response = await fetch('https://ill-trousers-crab.cyclic.app/products');
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function applyFilters() {
    const products = await getProducts();
    console.log(filters)
    const filteredProducts = products.filter(product => {
        for(let key in filters) {
            if(filters[key]&&(product.productCategory==key || product.productColor==key || product.productGender==key || product.productYear==key )){
                return product
            }
        }
    })

    let randomProducts = [];

    if(filteredProducts.length>32){
        // loop to randomly select 24 products
        while (randomProducts.length < 32) {
            const randomIndex = Math.floor(Math.random() * filteredProducts.length); 
            const randomProduct = filteredProducts[randomIndex]; 
            if (!randomProducts.includes(randomProduct)) { 
                randomProducts.push(randomProduct); 
            }
        }
    }else{
        randomProducts = filteredProducts
    }
    console.log(filteredProducts)

    if(randomProducts.length){

        document.querySelector("#pagination").style.display="none"
        document.querySelector("#parent").style.height = "70vh"

        display(randomProducts)
    }else{
        
        document.querySelector("#pagination").style.display="block"
        document.querySelector("#parent").style.height = "63vh"

        getAllProducts(1)
    }
}

let icon = document.querySelector("#open")

icon.addEventListener("click", (e)=>{
    //550
    if(window.innerWidth<500){
        iconFunction()
    }
})

function iconFunction(){
    document.getElementById("left").style.display = "block"
    document.getElementById("right").style.display = "none"

    document.getElementById("close").style.display = "block"
    document.getElementById("open").style.display = "none"
}

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("left").style.display = "none"
    document.getElementById("right").style.display = "block"

    document.getElementById("close").style.display = "none"
    document.getElementById("open").style.display = ""
})


var rangeOne = document.querySelector('input[name="rangeOne"]'),
rangeTwo = document.querySelector('input[name="rangeTwo"]'),
outputOne = document.querySelector('.outputOne'),
outputTwo = document.querySelector('.outputTwo'),
inclRange = document.querySelector('.incl-range'),
updateView = function () {
    if (this.getAttribute('name') === 'rangeOne') {
        outputOne.innerHTML = this.value;
        outputOne.style.left = this.value / this.getAttribute('max') * 100 + '%';
    } else {
        outputTwo.style.left = this.value / this.getAttribute('max') * 100 + '%';
        outputTwo.innerHTML = this.value
    }
    if (parseInt(rangeOne.value) > parseInt(rangeTwo.value)) {
        inclRange.style.width = (rangeOne.value - rangeTwo.value) / this.getAttribute('max') * 100 + '%';
        inclRange.style.left = rangeTwo.value / this.getAttribute('max') * 100 + '%';
    } else {
        inclRange.style.width = (rangeTwo.value - rangeOne.value) / this.getAttribute('max') * 100 + '%';
        inclRange.style.left = rangeOne.value / this.getAttribute('max') * 100 + '%';
    }
};

document.addEventListener('DOMContentLoaded', function () {
    updateView.call(rangeOne);
    updateView.call(rangeTwo);
    $('input[type="range"]').on('mouseup', function() {
        this.blur();
    }).on('mousedown input', function () {
        updateView.call(this);
    });
});


rangeOne.addEventListener("change",()=>{
    parent.innerHTML =`
    <div id="load">
    <div class="loading"></div>
    <p>LOADING</p>
</div>
    `
    getProductsByPrice(rangeOne.value, rangeTwo.value)
    
})

rangeTwo.addEventListener("change",()=>{
    console.log(rangeOne.value, rangeTwo.value)
    parent.innerHTML =`
    <div id="load">
        <div class="loading"></div>
        <p>LOADING</p>
    </div>
    `
    getProductsByPrice(rangeOne.value, rangeTwo.value)
    
})

async function getProductsByPrice(min,max) {

    try {
        const response = await fetch(`https://ill-trousers-crab.cyclic.app/products/price?min=${min}&max=${max}`)
        const data = await response.json()
        if (data.length) {
            allProductsData = data
            display(data)
        } else {
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
    } catch (error) {
        console.log(error)
    }
}