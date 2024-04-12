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
        console.log(res);

        if (res != undefined){

            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            
            let gameScreen = document.getElementById("login");
            gameScreen.style.display = "none";

            let btnPlay = document.getElementById("btnPlay");
            btnPlay.style.display = "block";

            let logout = document.getElementById("Logout");
            logout.style.display = "block";

            let goToRegister = document.getElementById("goToRegister");
            goToRegister.style.display = "none";

            let register = document.getElementById("register");
            register.style.display = "none";

            addUserData();
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

    let logout = document.getElementById("Logout");
    logout.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "none";
}

function logout() {
    localStorage.setItem("username", "");
    localStorage.setItem("email", "");
    window.location.href = 'http://127.0.0.1:5501/'
}

function addUserData() {
    // crea un nuevo div
    // y añade contenido
    let newDiv = document.createElement("div");
    let user   = document.createTextNode("user: " + localStorage.getItem("username"));
    let email  = document.createTextNode("email: " + localStorage.getItem("email"));
    let br     = document.createElement("br");
    newDiv.appendChild(user); //añade texto al div creado.
    newDiv.appendChild(br);
    newDiv.appendChild(email);

    newDiv.style.marginLeft = "10px";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", ()=> {
        newDiv.style.display = "none";
    });
    
    // añade el elemento creado y su contenido al DOM
    let currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}
