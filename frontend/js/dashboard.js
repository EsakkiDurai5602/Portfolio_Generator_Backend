const portfolioForm = document.getElementById("portfolioForm");

portfolioForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const portfolio = {
        email: document.getElementById("email").value,

        fullName: document.getElementById("fullName").value,

        title: document.getElementById("title").value,

        profileImage: document.getElementById("profileImage").value,

        about: document.getElementById("about").value,

        skills: document
            .getElementById("skills")
            .value
            .split(",")
            .map((skill) => skill.trim()),

        education: [
            {
                college: document.getElementById("college").value,

                degree: document.getElementById("degree").value,

                year: document.getElementById("year").value
            }
        ],

        projects: [
            {
                title: document.getElementById("projectTitle").value,

                description: document.getElementById("projectDescription").value,

                github: document.getElementById("github").value,

                liveLink: document.getElementById("liveLink").value
            }
        ],

        experience: [
            {
                company: document.getElementById("company").value,

                role: document.getElementById("role").value,

                years: document.getElementById("years").value
            }
        ],

        socialLinks: {
            github: document.getElementById("githubSocial").value,

            linkedin: document.getElementById("linkedin").value,

            instagram: document.getElementById("instagram").value
        }
    };

    try{

        const response = await fetch(
            "http://localhost:8001/portfolio/create",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(portfolio)
            }
        );

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            portfolioForm.reset();
        }

    }
    catch(err){

        console.log(err);

        alert("Something went wrong");
    }

});

document.getElementById("getBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;

    try{

        const response = await fetch(
            `http://localhost:8001/portfolio/${email}`
        );

        const data = await response.json();

        if(!response.ok){

            alert(data.message);

            return;
        }

        document.getElementById("fullName").value = data.fullName;

        document.getElementById("title").value = data.title;

        document.getElementById("profileImage").value = data.profileImage;

        document.getElementById("about").value = data.about;

        document.getElementById("skills").value =
            data.skills.join(",");

        document.getElementById("college").value =
            data.education[0].college;

        document.getElementById("degree").value =
            data.education[0].degree;

        document.getElementById("year").value =
            data.education[0].year;

        document.getElementById("projectTitle").value =
            data.projects[0].title;

        document.getElementById("projectDescription").value =
            data.projects[0].description;

        document.getElementById("github").value =
            data.projects[0].github;

        document.getElementById("liveLink").value =
            data.projects[0].liveLink;

        document.getElementById("company").value =
            data.experience[0].company;

        document.getElementById("role").value =
            data.experience[0].role;

        document.getElementById("years").value =
            data.experience[0].years;

        document.getElementById("githubSocial").value =
            data.socialLinks.github;

        document.getElementById("linkedin").value =
            data.socialLinks.linkedin;

        document.getElementById("instagram").value =
            data.socialLinks.instagram;

        alert("Portfolio Loaded");

    }
    catch(err){

        console.log(err);

        alert("Something went wrong");
    }

});

document.getElementById("updateBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;

    const portfolio = {
        fullName: document.getElementById("fullName").value,

        title: document.getElementById("title").value,

        profileImage: document.getElementById("profileImage").value,

        about: document.getElementById("about").value,

        skills: document
            .getElementById("skills")
            .value
            .split(",")
            .map((skill) => skill.trim()),

        education: [
            {
                college: document.getElementById("college").value,

                degree: document.getElementById("degree").value,

                year: document.getElementById("year").value
            }
        ],

        projects: [
            {
                title: document.getElementById("projectTitle").value,

                description: document.getElementById("projectDescription").value,

                github: document.getElementById("github").value,

                liveLink: document.getElementById("liveLink").value
            }
        ],

        experience: [
            {
                company: document.getElementById("company").value,

                role: document.getElementById("role").value,

                years: document.getElementById("years").value
            }
        ],

        socialLinks: {
            github: document.getElementById("githubSocial").value,

            linkedin: document.getElementById("linkedin").value,

            instagram: document.getElementById("instagram").value
        }
    };

    try{

        const response = await fetch(
            `http://localhost:8001/portfolio/update/${email}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(portfolio)
            }
        );

        const data = await response.json();

        alert(data.message);

    }
    catch(err){

        console.log(err);

        alert("Something went wrong");
    }

});

document.getElementById("deleteBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;

    try{

        const response = await fetch(
            `http://localhost:8001/portfolio/delete/${email}`,
            {
                method:"DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            portfolioForm.reset();
        }

    }
    catch(err){

        console.log(err);

        alert("Something went wrong");
    }

});