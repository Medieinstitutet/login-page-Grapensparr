//Setup of log in/create account form
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm")
    const createAccountForm = document.querySelector("#createAccountForm")

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.add("hidden")
        createAccountForm.classList.remove("hidden")
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("hidden")
        createAccountForm.classList.add("hidden")
    });
});

//Const
const errorView = document.getElementById("accountErrorMessage")
const successView = document.getElementById("accountSuccessMessage")
const loggedOutView = document.getElementById("loginContainer")
const loggedInView = document.getElementById("loggedInContainer")
const errorLogInView = document.getElementById("loginErrorMessage")
const welcomeMessage = document.getElementById("welcome")
const header = document.getElementById("headerTitle")
const loggedIn = localStorage.getItem("isLoggedIn")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

//User info
let usernameAndPassword = [
    {
        username: "janne",
        password: "test"
    },
    {
        username: "Liza",
        password: "Testar"
    },
    {
        username: "BCU22D",
        password: "MI"
    }
]

localStorage.setItem("usernameAndPassword", JSON.stringify(usernameAndPassword))

//Save user in localStorage
let createAccountButton = document.getElementById("createAccountButton")

createAccountButton.addEventListener("click", (e) => {
    e.preventDefault()
    let username = document.getElementById("newUsername").value
    let password = document.getElementById("newPassword").value

    JSON.stringify(localStorage.setItem("username", username))
    JSON.stringify(localStorage.setItem("password", password))

    var newUser = {
        username: username,
        password: password
    }

    successView.style.display = "block"
    errorView.style.display = "none"

    //Avoid identical usernames
    for(i = 0; i < usernameAndPassword.length; i++) {
        if(username === usernameAndPassword[i].username) {
            errorView.style.display = "block"
            successView.style.display = "none"
            return
        }
    }
    
    //Add user to usernameAndPassword
    usernameAndPassword.push(newUser)
    localStorage.removeItem("usernameAndPassword")
	let newUsernameAndPassword = JSON.stringify(usernameAndPassword)
	localStorage.setItem("usernameAndPassword", newUsernameAndPassword)
    console.log(usernameAndPassword)
})

//Log in function and content
function logIn() { 
    let usernameAndPassword = JSON.parse(localStorage.getItem("usernameAndPassword"))
    for (i = 0; i < usernameAndPassword.length; i++) {
      if (username.value == usernameAndPassword[i].username && password.value == usernameAndPassword[i].password) {

        loggedOutView.style.display = "none"
        loggedInView.style.display = "block"
        header.innerHTML = "Welcome to Santa's Workshop " + username.value + "!"
        welcomeMessage.innerHTML = "Merry Christmas " + username.value + "!"

        localStorage.setItem("loggedInUser", username.value)
        
        //Keep user logged in
        localStorage.setItem("isLoggedIn", true)

        return true;
    } else {
        errorLogInView.style.display = "block"
    }
    }
}

//Keep user logged in
if (loggedIn) {
    localStorage.getItem("username", username.value)
    loggedOutView.style.display = "none"
    loggedInView.style.display = "block"
    header.innerHTML = "Welcome to Santa's Workshop " + localStorage.getItem("loggedInUser") + "!"
    welcomeMessage.innerHTML = "Merry Christmas " + localStorage.getItem("loggedInUser") + "!"
}

//Log out function
logOutButton.addEventListener("click", () => {
    header.innerHTML = "Santa's Workshop"
    loggedOutView.style.display = "block"
    loggedInView.style.display = "none"
    errorLogInView.style.display = "none"
    errorView.style.display = "none"
    successView.style.display = "none"
    usernameInput.value = ""
    passwordInput.value = ""
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("loggedInUser")
});

//Remember new user if page is reloaded
if (window.location.reload) {
    var newUser = {
        username: localStorage.getItem("username", username),
        password: localStorage.getItem("password", password)
    }
    usernameAndPassword.push(newUser)
    localStorage.removeItem("usernameAndPassword")
	let newUsernameAndPassword = JSON.stringify(usernameAndPassword)
	localStorage.setItem("usernameAndPassword", newUsernameAndPassword)
}