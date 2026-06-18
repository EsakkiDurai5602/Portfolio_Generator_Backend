const email=prompt("Enter your email");

fetch(`http://localhost:8001/portfolio/${email}`)

.then(response=>response.json())
.then(portfolio=>{
    document.getElementById("profileImage").src =portfolio.profileImage;
    document.getElementById("fullName").innerText =portfolio.fullName;
    document.getElementById("title").innerText =portfolio.title;
    document.getElementById("about").innerText =portfolio.about;


    const skillsList=document.getElementById("skillsList");

    portfolio.skills.forEach(skill=>{
        const li=
        document.createElement("li");

        li.innerText=skill;

        skillsList.appendChild(li);
    });


    const educationList=
    document.getElementById("educationList");

    portfolio.education.forEach(edu=>{

        const div=
        document.createElement("div");

        div.innerHTML=`
            <h3>${edu.college}</h3>
            <p>${edu.degree}</p>
            <p>${edu.year}</p>
        `;

        educationList.appendChild(div);

    });


    const projectList=
    document.getElementById("projectList");

    portfolio.projects.forEach(project=>{

        const div=
        document.createElement("div");

        div.innerHTML=`

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <a href="${project.github}" target="_blank">

                Github

            </a>

            <br>

            <a href="${project.liveLink}" target="_blank">

                Live Demo

            </a>

        `;

        projectList.appendChild(div);

    });


    const experienceList=
    document.getElementById("experienceList");

    portfolio.experience.forEach(exp=>{

        const div=
        document.createElement("div");

        div.innerHTML=`

            <h3>${exp.company}</h3>

            <p>${exp.role}</p>

            <p>${exp.years}</p>

        `;

        experienceList.appendChild(div);

    });


    document.getElementById("github").href=
    portfolio.socialLinks.github;

    document.getElementById("linkedin").href=
    portfolio.socialLinks.linkedin;

    document.getElementById("instagram").href=
    portfolio.socialLinks.instagram;

})

.catch(err=>{

    console.log(err);

    alert("Portfolio not found");

});