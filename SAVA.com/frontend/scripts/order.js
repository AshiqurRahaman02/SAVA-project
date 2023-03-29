let userInfo = JSON.parse(localStorage.getItem('userInfo'));
// let userInfo = null
if(userInfo){

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name;

    div.addEventListener("click" , (e)=>{
        window.location.href = "../pages/index.html"
    })

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".login>span").innerHTML = cartData.length
}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}

const parent = document.querySelector("#left")
window.addEventListener("load", ()=>{
    getCartProduct();
})

function getCartProduct(){
    let data = JSON.parse(localStorage.getItem("order")) || [];
    
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

function display(allProducts ) {
    let randomProducts = allProducts;

    let price = 0

    let html = ""
    randomProducts.forEach(product => {

        price+=product.productPrice*product.quantity

        let productName = product.productName;
        let maxLength = 17;
        if(product.productColor.length>6){
            maxLength = 15;
        }
        if (productName.length > maxLength) {
            productName = productName.substring(0, maxLength) + "...";
        }
        html += `
        <div class="col-md-4">
            <div class="card">
                <img src="${product.productImage}" class="card-img-top" alt="..." >
                <div class="card-body">
                    <h5 class="card-title" >${productName}<br> ₹ ${product.productPrice}</h5>
                    <h6 class="card-color">${product.productColor}</h6>
                </div>
                <div id="div2">
                    <div><button onclick="incQuantity('${product._id}')" id="btn">+</button> <span>${product.quantity}</span> <button onclick="decQuantity('${product._id}')" id="btn">-</button></div>
                 <span id="delete" onclick="deleteProduct('${product._id}')">REMOVE</span> 
                </div>
            </div>
        </div>
        `
    })
    parent.innerHTML = ""
    parent.innerHTML = html

    rightPartDisplay(price,allProducts.length)
}

function incQuantity(id){
    let data = JSON.parse(localStorage.getItem("order")) || [];
    let index = data.findIndex(product => product._id === id);
    data[index].quantity++;
    localStorage.setItem("order", JSON.stringify(data))
    getCartProduct();
}

function decQuantity(id){
    let data = JSON.parse(localStorage.getItem("order")) || [];
    let index = data.findIndex(product => product._id === id);
    data[index].quantity--;
    localStorage.setItem("order", JSON.stringify(data))
    getCartProduct();
}

function deleteProduct(id){
    let data = JSON.parse(localStorage.getItem("order")) || [];
    let index = data.findIndex(product => product._id === id);
    data.splice(index, 1);
    localStorage.setItem("order", JSON.stringify(data))
    getCartProduct();
}

function rightPartDisplay(price,length){
    
    let totalProducts = document.querySelector("#totalProducts h2:nth-child(2)");
    totalProducts.innerHTML = length;

    let totalPrice = document.querySelector("#totalPrice h2:nth-child(2)");
    totalPrice.innerHTML = "₹"+price;

    let discount = document.querySelector("#discount h2:nth-child(2)");
    if(price>499){
        var dis = roundToThousands(price) +1
    }else{
        var dis = 0
    }
    discount.innerHTML = `<span style="color: green;">₹${dis}</span>`

    let delivery = document.querySelector("#deliveryCharges h3:nth-child(2)")
    if(price-dis>999){
        delivery.innerHTML=`<span style="color: green;">FREE</span>`
    }else{
        delivery.innerHTML=`<span>₹149</span>`
        price+=149
    }

    let total = document.querySelector("#total h1:nth-child(2)");
    total.innerHTML = "₹"+(price - dis) 
}

function roundToThousands(num) {
    let mod = num.toString().length-2
    console.log(mod)
    
    return num- Math.floor(num /10**mod)*(10**mod);
}

let orderBtn = document.querySelector("#order");

orderBtn.addEventListener("click", ()=>{
    let data = JSON.parse(localStorage.getItem("order")) || [];
    data = []
    // localStorage.setItem("order", JSON.stringify(data))

    orderBtn.innerHTML = "ORDER PLACED"
    // orderBtn.style.backgroundColor = "green"
})