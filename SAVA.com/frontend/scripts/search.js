let userInfo = JSON.parse(localStorage.getItem('userInfo'));
// let userInfo = null
if(userInfo){
    console.log(userInfo);

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name;

    div.addEventListener("click" , (e)=>{
        window.location.href = "../pages/index.html"
    })
}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}



const parent = document.querySelector("#main>div")

window.addEventListener("load", () => {
    getProducts("WOMAN")
})


function getProducts(catagory) {
    fetch(`http://localhost:2528/products/gender/${catagory}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
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
    })
    .catch(err => {
        console.log(err)
    })
}

function display(allProducts ) {

    let randomProducts = [];

    if(allProducts.length>24){
        // loop to randomly select 24 products
        while (randomProducts.length < 24) {
            const randomIndex = Math.floor(Math.random() * allProducts.length); 
            const randomProduct = allProducts[randomIndex]; 
            if (!randomProducts.includes(randomProduct)) { 
                randomProducts.push(randomProduct); 
            }
        }
    }else{
        randomProducts = allProducts
    }

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
}

const woman = document.getElementById("woman")
const man = document.getElementById("man")
const kids = document.getElementById("kids")

woman.addEventListener("click",(e) => {
    e.preventDefault()

    getProducts("WOMAN")
    woman.classList.add("underline")
    man.classList.remove("underline")
    kids.classList.remove("underline")
})
man.addEventListener("click",(e) => {
    e.preventDefault()

    getProducts("MAN")
    man.classList.add("underline")
    woman.classList.remove("underline")
    kids.classList.remove("underline")
})
kids.addEventListener("click",(e) => {
    e.preventDefault()

    getProducts("KIDS")
    kids.classList.add("underline")
    man.classList.remove("underline")
    woman.classList.remove("underline")
})

const searchIcon = document.querySelector("#searchIcon")
const searchInput = document.querySelector("#searchInput")
const cancelIcon = document.querySelector("#cancelIcon")

searchIcon.addEventListener("click",(e) => {
    e.preventDefault()

    searchIcon.style.display = "none"
    cancelIcon.style.display = "block"
    console.log(searchInput.value)
    let catagory = searchInput.value

    if(catagory.toUpperCase() == "PERFUME" || catagory.toUpperCase() == "SHOES" || catagory.toUpperCase() == "LIPSTICK" || catagory.toUpperCase() == "") {
        getProductsByCategory(catagory.toUpperCase())
    }else{
        getProductsByColor(catagory.toUpperCase())
    }

    // getProductsByCategory(catagory.toUpperCase())
    // getProductsByName(catagory)
    
    if(!catagory){
        getProducts("WOMAN")
    }else{
        document.querySelector("#main>p").innerText = `You searched for ${catagory}`
    }

})

cancelIcon.addEventListener("click",(e) => {
    e.preventDefault()

    searchIcon.style.display = "block"
    cancelIcon.style.display = "none"

    searchInput.value = ""

    document.querySelector("#hideDiv").style.visibility = "visible"
})

function getProductsByCategory(catagory) {
    fetch(`http://localhost:2528/products/category?c=${catagory}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.length){
            hideDiv()
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
    })
    .catch(err => {
        console.log(err)
    })
}

function getProductsByName(name) {
    fetch(`http://localhost:2528/products/name?n=${name}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.length){
            hideDiv()
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
    })
    .catch(err => {
        console.log(err)
    })
}

function getProductsByColor(color) {
    fetch(`http://localhost:2528/products/color?c=${color}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.length){
            hideDiv()
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
    })
    .catch(err => {
        console.log(err)
    })
}

function hideDiv() {
    document.querySelector("#hideDiv").style.visibility = "hidden"
}

function viewProduct(id){
    fetch(`http://localhost:2528/products/product/${id}`)
   .then(response=>response.json())
   .then(data=>{
    console.log(data)
    displayProduct(data)
   })
   .catch(err => {
    console.log(err)
   })
}

function displayProduct(product) {
    let popup = document.getElementById("popup")
    popup.classList.add("openpopup")

    parent.style.display="none"

    popup.innerHTML=`
        <div>
            <img src="${product.productImage}" alt="">
        </div>
        <div>
            <h3 id="name">${product.productName}</h3>
            <h4 id="ph4">PRICE <span id="price"></span></h4>
            <p id="description">${product.productDescription}</p>
            <p id="genP">FOR <span id="gender">${product.productGender}</span></p>
            <p id="colP">COLOR <span id="color">${product.productColor}</span></p>
            <p id="catP">CATEGORY <span id="category">${product.productCategory}</span></p>
            <div>
                <button id="addToCart" onclick="addToCart('${product._id}')">ADD TO CART</button>
                <button id="addToWishlist" onclick="addToWishlist('${product._id}')">ADD TO WISHLIST</button>
            </div>
            <button id="buyNow">BUY NOW</button>
        </div>
        <ion-icon name="close-outline" id="cancel" onclick="closePopup()"></ion-icon>
    `
}

const closePopup = (productCategory) => {

    document.getElementById("popup").classList.remove("openpopup")

    parent.style.display = "block"
    window.location.reload()
}