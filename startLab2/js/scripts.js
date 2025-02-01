import {temples} from '../data/temples.js'
// console.log(temples)

import {url} from '../data/temples.js'
// console.log(url)

// Grab a reference to the division where we display the items
const showHere =document.querySelector("#showHere")

// Get a reference to the HTML dialog element
const mydialog =document.querySelector('#mydialog')
const mytitle =document.querySelector('#mydialog h2')
const myclose =document.querySelector('#mydialog button')
const myinfo =document.querySelector('#mydialog p')

myclose.addEventListener("click", () => mydialog.closest())

// loop through the array of json items
function displayItems(data){
    console.log(data)
    data.forEach(x=> {
        console.log(x)
        const photo= document.createElement('img')
        photo.src=`${url}${x.path}`
        photo.alt=x.name

     photo.addEventListener('click' ,() => showStuff(x));

        showHere.appendChild(photo)
    })

}

displayItems(temples)


// populate the dialog