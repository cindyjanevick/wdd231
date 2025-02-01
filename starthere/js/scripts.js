// Grab the entire URL for this page including the attached GET values
const currentUrl = window.location.href;


// Divide the url into two halves
const everything=currentUrl.split('?')


// grab just the second half
let formData = everything[1].split('&')


function show(cup) {
    console.log(cup)
    formData.forEach((element) =>{
        console.log(element)
        if (element.startsWith(cup)){
            result=element.split('=')[1].replace("%40","@")
            
        }
    })
    return(result)
}



const showInfo = document.querySelector('#results')
showInfo.innerHTML= `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show('ordinance')} on ${show('fecha')}in the ${show('location')}</p>
<p>Your Phone: ${show('phone')}</p>
<p>Your Email: <a href="mailto:${show('email')}">${show('email')}</a></p>`

