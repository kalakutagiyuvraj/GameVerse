// LOGIN DROPDOWN

const openLogin = document.querySelector(".openLogin");
const loginDropdown = document.getElementById("loginDropdown");

openLogin.addEventListener("click", () => {
    loginDropdown.classList.toggle("active");
});


// LOGIN FORM

document.getElementById("loginForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const users =
            JSON.parse(localStorage.getItem("players")) || [];

        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        const loginMessage =
            document.getElementById("loginMessage");
        if (user) {
            // Save the logged-in user
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("snakeHigh", user.snakeHigh);
            localStorage.setItem("racingHighScore", user.racingHighScore);
            localStorage.setItem("SpaceShooterHighScore", user.SpaceShooterHighScore);
            localStorage.setItem("moleHighScore", user.moleHighScore);
            loginMessage.style.color = "lime";
            loginMessage.textContent =
                "Login Successful!";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            loginMessage.style.color = "red";
            loginMessage.textContent =
                "Invalid Email or Password";

        }
    });




// PLAY NOW BUTTONS

const gamesLink =
    document.getElementsByClassName("gamesLink");

for (let i = 0; i < gamesLink.length; i++) {

    gamesLink[i].addEventListener("click", (e) => {

        e.preventDefault();

        loginDropdown.classList.add("active");

    });

}


// SIGN IN DROPDOWN

const openSignin =
    document.querySelector(".openSignin");

const signinDropdown =
    document.getElementById("signinDropdown");

openSignin.addEventListener("click", () => {

    signinDropdown.classList.toggle("active");

});


// SIGN IN FORM

const form =
    document.getElementById("signinForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        document.getElementById("signinName")
            .value.trim();

    const email =
        document.getElementById("signinEmail")
            .value.trim();

    const password =
        document.getElementById("signinPassword")
            .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
            .value;

    const signinMessage =
        document.getElementById("signinMessage");

    if (password !== confirmPassword) {

        signinMessage.style.color = "red";
        signinMessage.textContent =
            "Passwords do not match!";

        return;
    }

    let users =
        JSON.parse(localStorage.getItem("players"))
        || [];

    const existingUser =
        users.find(user => user.email === email);

    if (existingUser) {

        signinMessage.style.color = "red";
        signinMessage.textContent =
            "Email already registered!";

        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        snakeHigh: 0,
        racingHighScore: 0,
        SpaceShooterHighScore: 0,
        moleHighScore: 0,
        totalScore: 0
    };

    users.push(newUser);

    localStorage.setItem(
        "players",
        JSON.stringify(users)
    );

    signinMessage.style.color = "lime";
    signinMessage.textContent =
        "Signup Successful!";

    form.reset();

});


// UDPATE USER TOTAL SCORE
function saveCurrentUserScores() {

    let loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) return;

    let players =
        JSON.parse(localStorage.getItem("players")) || [];

    const player =
        players.find(p => p.id === loggedInUser.id);

    if (!player) return;

    // Save every game's high score
    player.snakeHigh =
        Number(localStorage.getItem("snakeHigh")) || 0;

    player.racingHighScore =
        Number(localStorage.getItem("racingHighScore")) || 0;

    player.SpaceShooterHighScore =
        Number(localStorage.getItem("SpaceShooterHighScore")) || 0;

    player.moleHighScore =
        Number(localStorage.getItem("moleHighScore")) || 0;

    // Calculate total
    player.totalScore =
        player.snakeHigh * 60 +
        player.racingHighScore +
        player.SpaceShooterHighScore +
        player.moleHighScore * 100;

    // Keep loggedInUser updated
    Object.assign(loggedInUser, player);

    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );
}

saveCurrentUserScores();



