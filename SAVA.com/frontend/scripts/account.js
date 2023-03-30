let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
// let userInfo = null
if(userInfo){
    console.log(userInfo);

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
allOrders.innerHTML = 2

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