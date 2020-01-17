var price = document.querySelector("#price");
var refreshbtn = document.querySelector(".refreshbtn");
var icon = document.querySelector(".icon");
var currencybtn = document.querySelector("#currency");
var USDbtn = document.querySelector("#USDbtn");
var EURbtn = document.querySelector("#EURbtn");
var GBPbtn = document.querySelector("#GBPbtn");
var currencyvar = "USD";
var allshowing = false;

var spinbutton = ()=> {
icon.classList.add("spin");

setTimeout(()=>{
    icon.classList.remove("spin");
}, 500);
};

var checkPrice = currency =>{
    const XHR = new XMLHttpRequest();


    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4
            && XHR.status == 200){
                let newprice = JSON.parse(XHR.responseText).bpi[currency].rate;
                let placeremoved = newprice.length - 5;
                let finalprice = newprice.substring(0, placeremoved)
                price.textContent = "$" + finalprice;
        } else {
            console.log("There was a problem");
        }
    }
    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send();

}

checkPrice(currencyvar);

//refrsh price on btn click

refreshbtn.addEventListener("click", ()=>{
    checkPrice(currencyvar);
    spinbutton();

});

if(!allshowing){
    currencybtn.addEventListener("click", ()=>{
        if (allshowing === false) {
        spinbutton();
        USDbtn.style.display = "inline"
        EURbtn.style.display = "inline"
        GBPbtn.style.display = "inline"
        allshowing = true;
        }
    });

}

if (allshowing === true){
    EURbtn.addEventListener("click", ()=>{
            USDbtn.style.display = "none";
            GBPbtn.style.display = "none";
            currencyvar ="EUR";
            checkPrice(currencyvar);
            allshowing = false;

    });

    GBPbtn.addEventListener("click", ()=>{
            USDbtn.style.display = "none";
            EURbtn.style.display = "none";
            currencyvar ="GBP";
            checkPrice(currencyvar);
            allshowing = false;

    });

    USDbtn.addEventListener("click", ()=>{
            GBPbtn.style.display = "none";
            EURbtn.style.display = "none";
            currencyvar ="USD";
            checkPrice(currencyvar);
            allshowing = false;

    });


}