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
    .then((res) => {
        if(!res.ok){
            throw new Error("Error al iniciar sesion");
        }else{
            return res.json();
        }
    })
    .then((res) => {
        

        if (res != undefined){
            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            localStorage.setItem("mongo_id", res.mongo_id);
            
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

            let statsBtn = document.getElementById("stats");
            statsBtn.style.display = "block";
            
            let statsDiv = document.getElementById("statsDiv");
            statsDiv.style.display = "none";

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
            dropDown.selectedIndex = 0
            dropDown[0].disabled = true
            languages.selectedIndex = 0
            languages[0].disabled = true

        }
    })
    .catch((error) => {
        console.error(error.message);

        const errorBox = document.getElementById("error-message"); 
        let divError = document.getElementById("error");
        const p = document.createElement("p");
        p.textContent = "datos incorrectos";
        divError.appendChild(p);
        errorBox.style.display = "block";
    
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

    console.log(user);
    const errorBox = document.getElementById("error-message-register");
    let divError = document.getElementById("error-register");
    const p = document.createElement("p");

    divError.innerHTML = " <i class='bx bx-error'></i>";
    
    if(user.password === "" && user.email === "" && user.username === "" && user.password2 === ""){
        
        p.textContent = "Rellena los datos";
        divError.appendChild(p);
        errorBox.style.display = "block";
        

    }else if(user.username === ""){

        p.textContent = "Introduce el usuario";
        divError.appendChild(p);
        errorBox.style.display = "block";

    }else if(user.email === ""){

        p.textContent = "Introduce el email"
        divError.appendChild(p);
        errorBox.style.display = "block";

    }else if(user.password === ""){
        p.textContent = "Introduce una contraseña"
        divError.appendChild(p);
        errorBox.style.display = "block";

    }else if(user.password2 === ""){

        p.textContent = "Confirma la contraseña";
        divError.appendChild(p);
        errorBox.style.display = "block";

    }else if(user.password !== user.password2 && user.username !== "" && user.email !== ""){

        p.textContent = "Las contraseñas no coinciden";
        divError.appendChild(p);
        errorBox.style.display = "block";

    }else if(user.password === user.password2 && user.username !== "" && user.email !== ""){
            fetch(`${BaseURL[BaseURLValue]}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res) => {res
            if(!res.ok){
                throw new Error("Error al registrarse");
            }
        })
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
        })
        .catch((error) => {
            console.error(error.message)

            p.textContent = error.message;
            divError.appendChild(p);
            errorBox.style.display = "block";
        })
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
    let p      = document.createElement("p");
    p.textContent = localStorage.getItem("username");

    userData.appendChild(p);

    let caja = document.getElementById("caja");

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", ()=> {
        
        caja.style.display   = "none";
    });
}
