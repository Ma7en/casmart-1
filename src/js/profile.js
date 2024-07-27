// ===================================================

// age: 28
// birthDate : "1996-5-30"
// email : "emily.johnson@x.dummyjson.com"
// firstName: "Emily"
// gender: "female"
// id : 1
// image: "https://dummyjson.com/icon/emilys/128"
// lastName: "Johnson"
// maidenName: "Smith"
// password : "emilyspass"
// phone : "+81 965-431-3024"
// username : "emilys"

// ===================================================

window.addEventListener("load", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(`1-->`, user);

    if (user) {
        let profile = document.getElementById("profile-content");
        profile.innerHTML += `
            <img
                src="${user.image}"
                alt="${user.firstName}"
                class="profile-image"
            />
            <h2>Welcome, ${user.username}</h2>
            <div>
                <p><strong>ID: </strong> ${user.id}</p>
                <p><strong>firstName: </strong> ${user.firstName}</p>
                <p><strong>lastName: </strong> ${user.lastName}</p>
                <p><strong>Age: </strong> ${user.age}</p>
                <p><strong>birthDate: </strong>  ${user.birthDate}</p>
                <p><strong>gender: </strong>  ${user.gender}</p> 
                <p>
                    <strong>phone: </strong> 
                    <a href="tel:${user.phone}"> ${user.phone}</a>
                </p>
                <p>
                    <strong>email: </strong>
                    <a href="mailto:${user.email}">
                        ${user.email}
                    </a>
                </p>
                <p><strong>password: </strong> 
                 <input
                            type="password"
                            id="password"
                            name="password"
                            value="${user.password}"
                        />
                </p>

            </div>
            <button id="logout">Logout</button>
        `;
        // <p><strong>password: </strong> ${user.password}</p>

        function logout() {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        }
        let signE = document.querySelector(".header .sign");
        let signLabel = document.querySelector(
            ".header .sign .header-action-label"
        );
        // console.log(`-->>`, signLabel);
        signLabel.textContent = "Logout";
        signE.addEventListener("click", logout);

        let btnLogout = document.getElementById("logout");
        btnLogout.addEventListener("click", logout);
    } else {
        window.location.href = "login.html";
    }
});
