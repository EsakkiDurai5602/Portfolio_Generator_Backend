const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const user = {
        email,
        password
    };

    try{

        const response = await fetch(
            "http://localhost:8001/auth/login",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(user)
            }
        );

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            window.location.href =
                "dashboard.html?email=" + email;
        }

    }
    catch(err){

        console.log(err);

        alert("Something went wrong");
    }

});