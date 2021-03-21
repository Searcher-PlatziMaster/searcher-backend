/* eslint-disable */ 
const email = document.getElementById("form-email")
const password = document.getElementById("form-password")
const form_button = document.getElementById("form-button")
const loading_container = document.getElementById("loading")

form_button.onclick = () => {
    loading_container.style.display = 'flex'

    fetch('/api/auth/sign-in', {
        method: "post",
        headers: {
            Authorization: `Basic ${btoa(email.value+":"+password.value)}`
        }
    }).then(data => {
        return data.json()
    }).then( data => {
        if(data.token){
            window.location.href = ('/api/dashboard')
        }
    })
}
