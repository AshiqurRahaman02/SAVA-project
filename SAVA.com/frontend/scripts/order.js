let userInfo = JSON.parse(localStorage.getItem('userInfo'));
// let userInfo = null
if(userInfo){

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name;

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

const parent = document.querySelector("#left")
window.addEventListener("load", ()=>{
    getCartProduct();
})


let data = JSON.parse(localStorage.getItem("order")) || [];
function getCartProduct(){
    
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
    
    return num- Math.floor(num /10**mod)*(10**mod);
}

let orderBtn = document.querySelector("#order");

orderBtn.addEventListener("click", ()=>{
    let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

    orderBtn.innerHTML = "ORDER PLACED"
    displayOrder(data.length)

    for(let i=0; i<data.length; i++){
        
        let today = new Date()
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const orderDate = today.toLocaleString('en-US', options);

        data[i].orderDate = orderDate
        allOrders.push(data[i])
    }
    
    localStorage.setItem("allOrders", JSON.stringify(allOrders))
    window.localStorage.removeItem("order")
})


function displayOrder(total) {
    parent.innerHTML =""
    let today = new Date()

    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    const orderDate = today.toLocaleString('en-US', options);

    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    const shipDate = tomorrow.toLocaleDateString('en-US', options);

    const after5days = new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000));
    const deliveryDate = after5days.toLocaleDateString('en-US', options);

    const space = "  "


    parent.innerHTML = `
        <div style="width: 700px;">
            <h2>TOTAL ${total} ITEMS PLACED</h2>
            <div style="display: flex;justify-content: space-between;">
                <div>
                    <p>ORDER CONFIRMED</p>
                    <ion-icon name="ellipse-sharp"></ion-icon>
                    <p>${orderDate}</p>
                </div>
                <div>
                    <p>SHIP</p>
                    <ion-icon name="ellipse-sharp"></ion-icon>
                    <p>${shipDate}</p>
                </div>
                <div>
                    <p>OUT FOR DELIVERY</p>
                    <ion-icon name="ellipse-sharp"></ion-icon>
                    <p></p>
                </div>
                <div>
                    <p>DELIVERED</p>
                    <ion-icon name="ellipse-sharp"></ion-icon>
                    <p>EXPECTED BY ${deliveryDate}</p>
                </div>
            </div>
            <hr id="hrLine">
            <div id="delivery">
                <div>
                    <h4>DELIVERY ADDRESS</h4>
                    <div><h4>${userInfo.address}</h4> <span>CHANGE ADDRESS</span></div>
                    <div><h4>${userInfo.phoneNo}</h4> <span>CHANGE PHONE NO</span></div>
                </div>
                <div>
                    <h4><img src="../images/delivery.svg" alt=""> <span>CHANGE DATE</span></h4>
                    <h4><ion-icon name="close-outline"></ion-icon> <span>CANCEL DELIVERY</span></h4>
                    <h4><ion-icon name="help-circle-outline"></ion-icon><span> HELP</span></h4>
                </div>
            </div>
        </div>
    `
}