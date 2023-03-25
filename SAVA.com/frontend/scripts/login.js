const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginbtn');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let newUser = {
        email: email.value,
        password: password.value
    }

    fetch("http://localhost:2528/users/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(res=>{
        localStorage.setItem("token", res.token)
        localStorage.setItem("userInfo",JSON.stringify(res.user))
        window.location.href = "../pages/index.html"
    })
    .catch(err=>console.log(err))
})