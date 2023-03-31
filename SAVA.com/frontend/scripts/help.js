let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
// let userInfo = null
if(userInfo){
    console.log(userInfo);

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

    document.querySelector(".name").addEventListener("click" , (e)=>{
        window.location.href = "./login.html"
    })
}