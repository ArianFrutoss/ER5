function login(){
    
    const result =postLogin();
    // let gameScreen = document.getElementById("login");
    // gameScreen.style.display = "none";

    // let btnPlay = document.getElementById("btnPlay");
    // btnPlay.style.display = "block";

    // let goToRegister = document.getElementById("goToRegister");
    // goToRegister.style.display = "none";

    // let register = document.getElementById("register");
    // register.style.display = "none";
}

async function postLogin(){
 
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value 
        };
        let response = await fetch('localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;'
        },
        body: JSON.stringify(user)
        });
        
        let result = response.json();

        return result;
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

    let login = document.getElementById("login");
    login.style.display = "none";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "block";

    let register = document.getElementById("register");
    register.style.display = "none";
}

function startPlaying(){

    let gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "none";
}