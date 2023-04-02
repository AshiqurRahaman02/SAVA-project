const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginbtn');


loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let popup = document.getElementById("popup")
            popup.classList.add("openpopup")

            let otp = document.getElementById("otp")
            let otpNumber = Math.floor(1000 + Math.random() * 9000);
            otp.innerText = otpNumber

            
            let otpButton = document.getElementById("otpButton")
                otpButton.addEventListener("click" , (e)=>{
                    let i1 = document.getElementById("otpInput1")
                    let i2 = document.getElementById("otpInput2")
                    let i3 = document.getElementById("otpInput3")
                    let i4 = document.getElementById("otpInput4")

                    let otpInput = i1.value + i2.value + i3.value + i4.value
                
                    if(otpInput == otpNumber){
                        popup.classList.remove("openpopup")

                        loginFunction()
                        
                    }else{
                        document.querySelector("#otpInput>h3").innerHTML="WRONG OPT"
                        document.querySelector("#otpInput>h3").style.color="red"
                    }
            })
    
})

function loginFunction(){
    let newUser = {
        email: email.value,
        password: password.value
    }

    console.log(newUser)

    fetch("https://ill-trousers-crab.cyclic.app/users/login",{
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
        window.location.href = "../index.html"
    })
    .catch(err=>console.log(err))
}