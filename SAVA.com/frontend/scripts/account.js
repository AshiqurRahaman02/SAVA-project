let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null ;
if(userInfo){

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.style.visibility="hidden";

    div.addEventListener("click" , (e)=>{
        window.location.href = "../pages/account.html"
    })

}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}

let firstLetter = document.querySelector(".account>h1")
firstLetter.innerHTML = userInfo.name[0].toUpperCase()

let name = document.querySelector(".account>h5")
name.innerHTML = userInfo.name

let allOrders = document.querySelector("#left>div:nth-child(3)>h4")
let allorders = JSON.parse(localStorage.getItem("allOrders")) || [];
allOrders.innerHTML = allorders.length

let cart = document.querySelector("#left>div:nth-child(4)>h4")
var cartData = JSON.parse(localStorage.getItem("cart")) || [];
cart.innerHTML = cartData.length

let wishList = document.querySelector("#left>div:nth-child(5)>h4");
let wishListData = JSON.parse(localStorage.getItem("wishlist")) || [];
wishList.innerHTML = wishListData.length

let order = document.querySelector("#left>div:nth-child(6)>h4");
let orderData = JSON.parse(localStorage.getItem("order")) || [];
order.innerHTML = orderData.length

displayAccount()

function displayAccount(){
    
    let name = document.querySelector(".name>h4")
    name.innerHTML = userInfo.name

    let email = document.querySelector(".email>h4")
    email.innerHTML = userInfo.email

    let phone = document.querySelector(".phone>h4")
    phone.innerHTML = userInfo.phoneNo

    let alternate = document.querySelector(".alternate>h4")
    let alternatePhoneNo =  userInfo.alternatePhoneNo 
    if(alternatePhoneNo){
        alternate.innerHTML = alternatePhoneNo
        document.querySelector(".alternate>h5").innerHTML = "CHANGE"
    }

    let address = document.querySelector(".address>div>h4")
    let add = (userInfo.address).replace(/,/g, ',<br>')
    address.innerHTML = `${add}`
}

let icon = document.querySelector("#open")

icon.addEventListener("click", (e)=>{
    //550
    console.log(window.innerWidth)
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

document.getElementById("logout").addEventListener("click",()=>{

    window.localStorage.removeItem("userInfo")

    window.location.href = "./login.html" 
})

document.querySelector("#left>div:nth-child(3)").addEventListener("click",()=>{
    displayAllOrders(allorders)
})

function displayAllOrders(allorders){
    let parent=document.querySelector("#right")

    let data =[]
    
    for(let i=allorders.length-1; i>=0; i--){
        data.push(allorders[i])
    }
    console.log(data)

    let html =""
    data.forEach((order)=>{
        let price = order.productPrice*order.quantity

        let productName = order.productName;
        let maxLength = 30;
        if (productName.length > maxLength) {
            productName = productName.substring(0, maxLength) + "...";
        }

        let today = new Date(order.orderDate);
        let after5days = new Date(today.getTime());
        after5days.setDate(today.getDate() + 5);

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        let deliveryDate = after5days.toLocaleString('en-US', options);

        const dateTimestamp = Date.parse(deliveryDate);
        const currentDateTimestamp = Date.now();

        let line1="ON THE WAY"
        let line2="EXPECTED BY"
        let line3="CANCEL DELIVERY"
        if (dateTimestamp < currentDateTimestamp) {
            line1 = "DELIVERED"
            line2 = "DELIVERED ON"
            line3 = "RETURN"
        }
        
        html+=`
            <div id="orderDiv" style="width: 70%;">
                <div>
                    <img src="${order.productImage}">
                </div>
                <div>
                    <h3>${productName}</h3>
                    <p>TOTAL PRICE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹${price}</p>
                    <p>TOTAL QUANTITY    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${order.quantity}</p>
                    <a> ORDER DATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${order.orderDate}</a>
                </div>
                <div>
                    <h4><ion-icon name="ellipse"></ion-icon> ${line1}</h4>
                    <p>${line2} <br> ${deliveryDate}</p>
                    <p>${line3}</p>
                    <p>NEED HELP ?</p>
                </div>
            </div>
        `
    })

    parent.innerHTML = ""
    parent.innerHTML = html
}

document.querySelector("#left>div:nth-child(2)").addEventListener("click",()=>{
    window.location.reload()
})

document.getElementById("delete").addEventListener("click",()=>{
    window.localStorage.removeItem("userInfo")
    window.location.href = "../pages/register.html"
})