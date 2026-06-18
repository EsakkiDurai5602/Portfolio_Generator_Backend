const portfolioForm = document.getElementById("portfolioForm");

portfolioForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const portfolio = {
        email: document.getElementById("email").value,

        fullName: document.getElementById("fullName").value,
        title: document.getElementById("title").value,
        profileImage: document.getElementById("profileImage").value,
        about: document.getElementById("about").value,

        skills: document.getElementById("skills").value.split(",").map(s => s.trim()),

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

    const response = await fetch("http://localhost:8001/portfolio/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(portfolio)
    });

    const data = await response.json();

    alert(data.message);
    portfolioForm.reset();
});


// VIEW PORTFOLIO
async function viewPortfolio() {

    const email = document.getElementById("email").value;

    const res = await fetch(`http://localhost:8001/portfolio/${email}`);
    const data = await res.json();

    console.log(data);
}


// UPDATE PORTFOLIO
async function updatePortfolio() {

    const email = document.getElementById("email").value;

    const updatedData = {
        title: document.getElementById("title").value,
        about: document.getElementById("about").value
    };

    const res = await fetch(`http://localhost:8001/portfolio/update/${email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    alert(data.message);
}


// DELETE PORTFOLIO
async function deletePortfolio() {

    const email = document.getElementById("email").value;

    const res = await fetch(`http://localhost:8001/portfolio/delete/${email}`, {
        method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);
}