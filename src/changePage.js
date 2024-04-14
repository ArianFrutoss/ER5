import { BaseURL, BaseURLValue } from "./constants.js";

document.getElementById("enterLogin").addEventListener("click", login)
document.getElementById("goToRegister").addEventListener("click", goToRegister)
document.getElementById("enterRegister").addEventListener("click", register)
document.getElementById("btnPlay").addEventListener("click", startPlaying)
document.getElementById("Logout").addEventListener("click", logout)
function login(){
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
        };
    fetch(`${BaseURL[BaseURLValue]}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        
    })
    .then((res) => res.json())
    .then((res) => {

        if (res != undefined){
            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            localStorage.setItem("opponents", JSON.stringify(res.opponents))
            
            let gameScreen = document.getElementById("login");
            gameScreen.style.display = "none";

            let btnPlay = document.getElementById("btnPlay");
            btnPlay.style.display = "none";

            let logout = document.getElementById("Logout");
            logout.style.display = "block";

            let goToRegister = document.getElementById("goToRegister");
            goToRegister.style.display = "none";

            let register = document.getElementById("register");
            register.style.display = "none";

            addUserData();

            let caja = document.getElementById("caja");
            caja.style.display = "block";
            let dropDown = document.getElementById("player_list");
            dropDown.style.display = "block";
            
            for (let i = 0; i < res.opponents.length; i++) {
                const opponent = res.opponents[i].username;
                const option = document.createElement("option")
                option.text = opponent
                dropDown.add(option)
                
            }

        }
    })
}

function goToRegister(){

    let gameScreen = document.getElementById("login");
    gameScreen.style.display = "none";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "block";
}

function register(){

    let user = {
        email: document.getElementById("email_register").value,
        username: document.getElementById("user_register").value,
        password: document.getElementById("password_register").value,
        password2: document.getElementById("password_confirm").value
        };

    if(user.password === user.password2){
            fetch(`${BaseURL[BaseURLValue]}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res) => res)
        .then((res) => {
            console.log(res);
            
            if (res != undefined){

                let gameScreen = document.getElementById("login");
                gameScreen.style.display = "block";

                let btnPlay = document.getElementById("btnPlay");
                btnPlay.style.display = "none";

                let goToRegister = document.getElementById("goToRegister");
                goToRegister.style.display = "block";

                let register = document.getElementById("register");
                register.style.display = "none";
            }
        });
    }else{
        window.alert("las contraseñas no coinciden");
    }
    
}

function startPlaying(){

    let gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "none";

    let logout = document.getElementById("Logout");
    logout.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "none";

    let dropDown = document.getElementById("player_list");
    dropDown.style.display = "none";
}

function logout() {
    localStorage.clear()
    location.reload()
}   

function addUserData() {

    let userData   = document.getElementById("user-data");
    let user   = document.createTextNode("user : " + localStorage.getItem("username"));
    let email  = document.createTextNode("email : " + localStorage.getItem("email"));
    let br     = document.createElement("br");
    userData.appendChild(user);
    userData.appendChild(br);
    userData.appendChild(email);
    let caja = document.getElementById("caja");

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", ()=> {
        caja.style.display   = "none";
    });
}
