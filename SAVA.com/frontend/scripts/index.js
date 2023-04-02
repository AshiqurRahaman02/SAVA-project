let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
// let userInfo = null
if(userInfo){
    console.log(userInfo);

    let name = userInfo.name.split(" ")[0];
    let div = document.getElementById("name")
    div.innerHTML = name;

    div.addEventListener("click" , ()=>{
        window.location.href ="./pages/account.html"
    })

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".login>span").innerHTML = cartData.length

    document.querySelector(".name").innerHTML = name;
    document.querySelector(".name").addEventListener("click" , ()=>{
        window.location.href ="./pages/account.html"
    })

    document.querySelector(".cancel>.login span").innerHTML = cartData.length
}else{
    let div = document.getElementById("name")

    div.addEventListener("click" , ()=>{
        window.location.href = "./pages/login.html"
    })

    document.querySelector(".name").addEventListener("click" , ()=>{
        window.location.href = "./pages/login.html"
    })
}



//slider part
let cancel = document.querySelector(".cancel>ion-icon");
cancel.addEventListener("click", () => {
  document.querySelector("#content").style.display = "none";
});

let icon = document.querySelector("#icon");
icon.addEventListener("click", () => {
  document.querySelector("#content").style.display = "block";
});




//catagotry part
let woman = document.getElementById("woman")
let man = document.getElementById("man")
let kids = document.getElementById("kids")
let beauty = document.getElementById("beauty")

let womanCat = document.querySelector(".womanCategories")
let manCat = document.querySelector(".manCategories")
let kidsCat = document.querySelector(".kidsCategories")
let beautyCat = document.querySelector(".beautyCategories")

woman.addEventListener("click",(e)=>{
    e.preventDefault();

    //catagotry part
    womanCat.style.display = "block";
    manCat.style.display = "none";
    kidsCat.style.display = "none";
    beautyCat.style.display = "none";

    //underline part
    woman.classList.add("underline");
    man.classList.remove("underline");
    kids.classList.remove("underline");
    beauty.classList.remove("underline");

    //body background image
    document.body.style.backgroundImage = "url('https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-collection/subhome-xmedia-12-in//w/1920/IMAGE-landscape-fill-6269b9d8-965c-4461-af61-f33e934296a2-default_0.jpg?ts=1679585677356')"
})

man.addEventListener("click",(e)=>{
    e.preventDefault();
    womanCat.style.display = "none";
    manCat.style.display = "block";
    kidsCat.style.display = "none";
    beautyCat.style.display = "none";

    //underline part
    woman.classList.remove("underline");
    man.classList.add("underline");
    kids.classList.remove("underline");
    beauty.classList.remove("underline");

    //body background image
    document.body.style.backgroundImage = "url('https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-ramadan/subhome-xmedia-11//w/1920/IMAGE-landscape-fill-4208d23e-f994-4aef-b2eb-c269dace2b1d-default_0.jpg?ts=1679048406618')"
})

kids.addEventListener("click",(e)=>{
    e.preventDefault();
    womanCat.style.display = "none";
    manCat.style.display = "none";
    kidsCat.style.display = "block";
    beautyCat.style.display = "none";

    //underline part
    woman.classList.remove("underline");
    man.classList.remove("underline");
    kids.classList.add("underline");
    beauty.classList.remove("underline");

    //body background image
    document.body.style.backgroundImage = "url('https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-girl/subhome-xmedia-13//w/1920/IMAGE-landscape-default-fill-453b48a8-9ccd-415a-bf4f-e23a25e383f3-default_0.jpg?ts=1679665278404')"
})

beauty.addEventListener("click",(e)=>{
    e.preventDefault();
    womanCat.style.display = "none";
    manCat.style.display = "none";
    kidsCat.style.display = "none";
    beautyCat.style.display = "block";

    //underline part
    woman.classList.remove("underline");
    man.classList.remove("underline");
    kids.classList.remove("underline");
    beauty.classList.add("underline");

    //body background image
    document.body.style.backgroundImage = "url('https://static.zara.net/photos///contents/mkt/spots/ss23-north-beauty-new/subhome-xmedia-10//w/1920/IMAGE-landscape-default-fill-064e8a8d-c422-412d-a6be-96fdd82d6554-default_0.jpg?ts=1678438239201')"
})



//on window load 
window.addEventListener("load", ()=>{

})

//on window scroll 
window.addEventListener("scroll", ()=>{
    
})



//body background image
const images = ['https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-new/subhome-xmedia-12//w/1920/IMAGE-landscape-fill-9f775843-f9a3-4536-a319-c4a3cba8cd62-default_0.jpg?ts=1679501859704', 'https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-babygirl/subhome-xmedia-12//w/1920/IMAGE-landscape-default-fill-a0123bd2-79b5-4170-9aa9-afa215953182-default_0.jpg?ts=1679655646683', 'https://static.zara.net/photos///contents/mkt/spots/ss23-north-beauty-new/subhome-xmedia-10//w/1920/IMAGE-landscape-default-fill-064e8a8d-c422-412d-a6be-96fdd82d6554-default_0.jpg?ts=1678438239201', "https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-collection/subhome-xmedia-12-in//w/1920/IMAGE-landscape-fill-6269b9d8-965c-4461-af61-f33e934296a2-default_0.jpg?ts=1679585677356","https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-new/subhome-xmedia-13-2//w/1920/IMAGE-landscape-fill-a1d78788-2ba4-42eb-b976-f1d6df5c11f4-default_0.jpg?ts=1680104073040","https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-dresses/subhome-xmedia-12//w/1920/IMAGE-landscape-fill-98d3f952-ac71-4167-84cb-9c8f473aea8c-default_0.jpg?ts=1679497898062","https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-girl/subhome-xmedia-13-02//w/1920/IMAGE-landscape-default-fill-db28e492-0ecc-47d4-be77-caa7b6524b6c-default_0.jpg?ts=1680258162811","https://static.zara.net/photos///2023/V/0/1/p/2183/058/064/2/w/1920/2183058064_9_1_1.jpg?ts=1679046861085"]; 
let index = 0;

function changeBackground() {
  const body = document.querySelector('body');

  let width = window.innerWidth;
  
  if(width>950){
    body.style.backgroundImage = `url(${images[index]})`;
  }else if(width>500){
    body.style.backgroundImage = `url("../images/middium\ background.png")`;
  }

  index = (index + 1) % images.length;
}

setInterval(changeBackground, 10000);

//news popup
setInterval(() => {
    document.querySelector(".news p").style.visibility = "visible";
    document.querySelector(".social").style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(".news p").style.visibility = "hidden";
        document.querySelector(".social").style.visibility = "hidden";
    },2500)
}, 7500);

