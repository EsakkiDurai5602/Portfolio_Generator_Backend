const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {email,password};
    console.log(user);
    
    
    await fetch("http://localhost:8001/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    
    alert("Login Successful");
    window.location.href = "dashboard.html";
});
