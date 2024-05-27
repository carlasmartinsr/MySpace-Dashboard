const sectionAuthor = document.getElementById("section-author")
const sectionCurrency = document.getElementById("section-currency")
const sectionweather = document.getElementById("section-weather")
const sectionDate = document.getElementById("section-date")
const sectionQuote = document.getElementById("section-quote")
const sectionActivity = document.getElementById("section-activity")
const btnUpdate = document.getElementById("btn-update")
const modal = document.getElementById("modal")
const sectionLink = document.getElementById("section-link")

let links=[]


async function getBgImg(){
    try{
       const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=pet")
       const data = await res.json()
       console.log(data)
       document.body.style.backgroundImage= ` linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)),url(${data.urls.full})`
       sectionAuthor.innerHTML = 
       `<p>Photo by <a href="${data.user.links.html}" target="_blank">${data.user.name} </a> on <a href="https://unsplash.com/" target="_blank" >Unsplash </a> </p>`
    }catch(e){
        console.error(e),
        document.body.style.backgroundImage= `url(https://images.unsplash.com/photo-1511044568932-338cba0ad803?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQyMzQ3MDd8&ixlib=rb-4.0.3&q=85)`
        sectionAuthor.innerHTML = 
        `<p>Photo by<a href="https://unsplash.com/@ludemeula" target="_blank"> Ludemeula Fernandes </a>on <a href="https://unsplash.com/" target="_blank">Unsplash</a> </p>`
    }
}

function changeBackgroundImage() {
    getBgImg(); 
    setInterval(getBgImg, 24 * 60 * 60 * 1000); 
}


async function getcurrency(){
    try{
        const res= await fetch("https://open.er-api.com/v6/latest/EUR")
        const data =  await res.json()
        console.log(data)
        sectionCurrency.innerHTML=  `
        <p class="bold-text">Currency Rates</p>
        <div class="currency-rate">
            <p><span class="bold-text">From EUR to USD:</span> ${data.rates.USD}</p>
            <p><span class="bold-text">From EUR to TRY:</span> ${data.rates.TRY}</p>
            <p><span class="bold-text">From EUR to VES:</span> ${data.rates.VES}</p>
        </div>    
        <a href="https://www.exchangerate-api.com" target="_blank">Rates By Exchange Rate API</a>`
    }
    catch(e){
      console.log(e)
    }
}

async function getWeather(){
    navigator.geolocation.getCurrentPosition(async(position) => {
        try{
        const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=455a4254b76c1a5f2aeb503c0695b2a4`)
        const data = await res.json()
        const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        const firstLetter = data.weather[0].description.slice(0,1).toUpperCase()
        const sentence = data.weather[0].description.slice(1)
        const newDesc = firstLetter.concat(sentence)
        const temMax=Math.round(data.main.temp_max)
        const temMin=Math.round(data.main.temp_min)
        console.log(newDesc)
        sectionweather.innerHTML =`
        <p class="weather-header bold-text">${data.name}: ${newDesc}</p>
        <div class="weather-details">
            <div class="weather-icon">
                <img src="${iconURL}"/>
            </div>
            <div>
                <p >${data.main.temp} °C </p>
                <p>feels like ${data.main.feels_like} °C</p>
            </div>
            <div>
                <p> ⬆️: ${temMax} °C</p>
                <p> ⬇️: ${temMin} °C</p>
            </div>
        </div>
        `
        console.log(data)
        } catch(e){
            console.log(e)
        }
    });
}

async function getCurrentDate(){
    const date= new Date()
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    sectionDate.innerHTML=`
        <p>${date.toLocaleTimeString("en-us", {timeStyle: "short"})}</p>
        <p>${date.toLocaleDateString("en-us", options)}</p>`
}


setInterval(getCurrentDate, 1000)

async function getQuotes(){
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '93767f0705msh5d0b0b2845f9c0fp1a7682jsn38e6543473e4',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    const quoteContent = result.content;
     if (quoteContent.length>=140){
        const newQuote=quoteContent.slice(0,140)
        sectionQuote.innerHTML=`
            <blockquote class="vert-flex">
                <p class="quote-text">"${newQuote}..."  <a href="${result.url}" target="_blank">See Full Quote</a></p>
                <p><cite>&mdash; ${result.originator.name}</cite>, <a href="https://quotepark.com/" target="_blank">Quotes of famous people</a> </p> 
            </blockquote>`
     }
     else{
    sectionQuote.innerHTML=`
        <blockquote class="vert-flex">
            <p class="quote-text">"${quoteContent}"</p>
            <p><cite>&mdash; ${result.originator.name}</cite>, <a href="https://quotepark.com/" target="_blank">Quotes of famous people</a> </p>
        </blockquote>`}
} catch (error) {
	console.error(error);
    sectionQuote.innerHTML=`
        <blockquote class="vert-flex">
            <p class="quote-text">“Here is my secret. It is very simple. It is only with the heart that one can see rightly; What is essential 
                is invisible to the eye.”</p>
            <p><cite>Antoine de Saint-Exupéry</cite>, <a href="https://quotepark.com/" target="_blank">Quotes of famous people</a></p>
        </blockquote>`
}
}


/* async function getRamdomActivities(){
    try{
        const res= await fetch("http://www.boredapi.com/api/activity/")
        const data =  await res.json()
        console.log(data)
        console.log(data.activity)
       sectionActivity.innerHTML=  `
        <p >Feeling a bit bored?😕</p>
        <p>${data.activity}</p>
       ` 
    }
    catch(e){
      console.log(e)
      sectionActivity.innerHTML=  `
      <p>Feeling a bit bored?😕</p>
      <p>Look at pictures and videos of cute animals</p>
     ` 
    }
} */

async function getRamdomActivities(){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://www.boredapi.com/api/activity/";

    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();
        console.log(data);
        sectionActivity.innerHTML = `
            <p>Feeling a bit bored?😕</p>
            <p>${data.activity}</p>`;
    } catch (e) {
        console.log(e);
        sectionActivity.innerHTML = `
            <p>Feeling a bit bored?😕</p>
            <p>Look at pictures and videos of cute animals</p>`;
    }
}


function capitalizedDomain(domain){
    return domain.charAt(0).toUpperCase() + domain.slice(1)
}


function generateDefaultLinksHTML(){
   return  `<a href="https://scrimba.com/#overview" class="anchor bg-color scrimba"  target="_blank">Scrimba</a>
    <a href="https://google.com/" class="anchor bg-color"   target="_blank">Google</a>
    <a href="https://linkedin.com/in/carla-martins-378a0223b/"  class="anchor bg-color"  target="_blank">Linkedin</a>
    <button class="btn-update" id="btn-update"> Add + </button>
    `  
}

function generateLinksHTML(linksData){
    let className=""
    let linksHTML=""
    linksData.forEach((link) =>{
        console.log("paso")
        let newDomain= capitalizedDomain(link.domain)
        if (newDomain==="Scrimba"){
            className="scrimba"
        } 
        else {className=" "

        }
        linksHTML+= `<a href="${link.url}"  class="anchor bg-color ${className}"  target="_blank">${newDomain}</a>`
        console.log(linksHTML)
    })
    linksHTML+=`<button class="btn-update" id="btn-update"> Add + </button>`
    console.log(linksHTML)
    return linksHTML
}




function loadLinks(){
    const storedLinks = localStorage.getItem("links") 
    let linksData
    let newLinks=[]
    let linksHTML=""
    
    if (storedLinks===null){
        linksHTML=generateDefaultLinksHTML()
    }
    else{
        linksData = JSON.parse(storedLinks)
        if (linksData.length>0 ){
            linksHTML = generateLinksHTML(linksData)
        } 
        else{
            linksHTML=generateDefaultLinksHTML()
        }
       
    }
    sectionLink.innerHTML = linksHTML
    document.querySelectorAll('.anchor').forEach((link,index)=>{
        newLinks[index]={
            url:link.href,
            domain:link.textContent
            }
        }) 
    localStorage.setItem("links", JSON.stringify(newLinks)); 
}

function exitModal(){
    modal.style.display="none"
    modal.style.visibility="hidden";
    modal.style.opacity=0; 
}

function addNewLink(){
    let linksHTML=""
    const urlInput = document.getElementById("url-site")
    const urlSite = urlInput.value.trim()
    const validUrl = URL.canParse(urlSite)
    console.log(links)
    if(validUrl){
        let domain =  urlSite.replace( /https:\/\//g, '')
        let obtainDomain =  domain.split('.')[0]
        let newDomain= capitalizedDomain(obtainDomain)
        const repetedDomain = links.some((link)=> link.domain===newDomain)
        if(!repetedDomain){
           let newLink={ 
                url:urlSite,
                domain:newDomain
       
            }
            if (links.length === 3) {
                links.splice(2, 1); 
            }
        
            links.splice(1, 0, newLink); 
            console.log(links);

           linksHTML = generateLinksHTML(links);
      
        urlInput.value=""
        sectionLink.innerHTML = linksHTML
        localStorage.setItem("links", JSON.stringify(links));
        exitModal()
       
        }
        
    } 
}



function updateLink(){
    modal.style.visibility="visible";
    modal.style.opacity=1;
    modal.style.display="block"
    const storedLinks = localStorage.getItem("links")
    links =JSON.parse(storedLinks)||[]  
}


document.addEventListener("DOMContentLoaded",function(){
    changeBackgroundImage()
    getcurrency()
    getWeather()
    getCurrentDate()
    getQuotes()
    getRamdomActivities()
    loadLinks()
   
})


document.addEventListener("click",function(e){
    if(e.target.id==="btn-update"){
        updateLink(); 
    }
    if(e.target.id==="btn-add"){
       
        addNewLink()
    }
    if (e.target.id==="btn-cancel"){
        exitModal()
    }
    if(e.target.id==="modal-close"){
        exitModal()
    }
})
