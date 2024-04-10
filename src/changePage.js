function login(){

    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
        };
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res[0]);

        if (res[0] != undefined){

            let gameScreen = document.getElementById("login");
            gameScreen.style.display = "none";

            let btnPlay = document.getElementById("btnPlay");
            btnPlay.style.display = "block";

            let goToRegister = document.getElementById("goToRegister");
            goToRegister.style.display = "none";

            let register = document.getElementById("register");
            register.style.display = "none";
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
            fetch("http://localhost:3000/register", {
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

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "none";
}