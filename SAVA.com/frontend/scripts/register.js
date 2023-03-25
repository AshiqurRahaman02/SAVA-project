let email = document.getElementById('email');
let passwords = document.getElementById("password")
let address = document.getElementById("address");
let phoneNo = document.getElementById("phoneNo");
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e)=>{
    e.preventDefault();

    let newUser = {
        email: email.value,
        password: passwords.value,
        address: address.value,
        phoneNo: phoneNo.value
    }
    fetch("http://localhost:2528/users/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        window.location.href = "../pages/login.html"
        
    })
    .catch(err=>console.log(err))
})