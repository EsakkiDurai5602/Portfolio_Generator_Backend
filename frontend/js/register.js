const registerForm=document.getElementById("registerForm");

registerForm.addEventListener("submit",async e=>{
    e.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPassword").value;

    if(password!==confirmPassword){
        alert("Passwords do not match");
        return;
    }

    const user={name,email,password};

    try{

        const response=await fetch("http://localhost:8001/auth/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });

        const data=await response.json();

        if(!response.ok){
            alert(data.message);
            return;
        }

        alert(data.message);

        registerForm.reset();

        window.location.href="login.html";

    }catch(err){

        console.log(err);

        alert("Something went wrong");

    }

});