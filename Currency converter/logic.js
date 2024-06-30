const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; ///usd/inr.json
//featching the api using the end link which have returns {information}(that 1usd = 83.9768inr)

const dropSelect=document.querySelectorAll(".dropdown select");
//getting 2 dropdown(class select)

const btn=document.querySelector(".btn");
//accessing button

const fromcurr= document.querySelector(".from select"); //getting the from (select) element

const tocurr =document.querySelector(".to select"); //getting the to (select) element

const msgg =document.querySelector(".msggg");


for(let select of dropSelect){
    for (code in countryList){
     //console.log(code, countryList[code]);
        //    currency code-----country code

        let newOption = document.createElement("option"); //creating new element that is of option type
        newOption.innerText = code;
        newOption.value = code;
        if(select.name==="from"&& code === "USD"){
            newOption.selected ="selected";
        }
        else if(select.name==="to"&& code === "INR"){
            newOption.selected ="selected";
        }
        select.append(newOption); //this option are being aadded in real time.
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
        // console.log(evt.target); it gives the elemnt in which change occured.
        //ent is a object passed by event listener which have all the infformation about the the event and element on which event is added.
    });
}

const updateflag=(element)=>{
    let currency_code = element.value; //extrected currency code
    let countery_code = countryList[currency_code]; //extrecting countery code using 
    let new_src=`https://flagsapi.com/${countery_code}/flat/64.png`;
    let imgg = element.parentElement.querySelector("img"); //selecting the parent of current element(select of {from}or{to} class) and then accessing its image tag.
    imgg.src= new_src; // here updating the link with new flag link
};



const update_exchange_rate = async()=>{
    let amount =document.querySelector(".amount input"); //here we will get element(input)
    let amount_value= amount.value; //what ever teh value is present inside the input block.
    if(amount_value===""|| amount_value<1){
        amount_value = 1;
        amount.value="1";
    }

    const URL =`${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`; 
    // console.log(URL);
    //when we send the request to this url we will get our exchange rate as response(here 1st we will get promise then result)
    let response = await fetch(URL); //here we will get the promise which we will hwndle with await.
    //since data will be received in java script object we have to convert it.
    let data = await response.json();
    //here jason() method will we used to convert our data from jason object to usable data.
    let rate =data[tocurr.value.toLowerCase()]; //is key par rate avaliable hoga read in hindi.

    let final_amount = amount_value*rate;

    msgg.innerText = `${amount_value}${fromcurr.value} = ${final_amount}${tocurr.value}`
};



//here we are featching the value from the api. when ever we click on the button.
btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); //meaning what ever the default changes are being made when clicked on button will not be applicable.
    // let amount =document.querySelector(".amount input"); //here we will get element(input)
    // let amount_value= amount.value; //what ever teh value is present inside the input block.
    // if(amount_value===""|| amount_value<1){
    //     amount_value = 1;
    //     amount.value="1";
    // }

    // const URL =`${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`; 
    // // console.log(URL);
    // //when we send the request to this url we will get our exchange rate as response(here 1st we will get promise then result)
    // let response = await fetch(URL); //here we will get the promise which we will hwndle with await.
    // //since data will be received in java script object we have to convert it.
    // let data = await response.json();
    // //here jason() method will we used to convert our data from jason object to usable data.
    // let rate =data[tocurr.value.toLowerCase()]; //is key par rate avaliable hoga read in hindi.

    // let final_amount = amount_value*rate;

    // msgg.innerText = `${amount_value}${fromcurr.value} = ${final_amount}${tocurr.value}`
    update_exchange_rate(evt);
});

window.addEventListener("load",async(evt)=>{ //when we want our data to change its value at the load time.
    update_exchange_rate(evt);
});