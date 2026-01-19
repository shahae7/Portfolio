
$(document).ready(function () {
    // Toggle menu and navbar
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Close navbar when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar').length && !$(e.target).closest('#menu').length) {
            $('#menu').removeClass('fa-times');
            $('.navbar').removeClass('nav-toggle');
        }
    });

    // Handle scrolling and loading events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTopButton = document.querySelector('#scroll-top');
        if (window.scrollY > 60) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }

        // Scroll spy for navigation links
        $('section').each(function () {
            const height = $(this).height();
            const offset = $(this).offset().top - 200;
            const top = $(window).scrollTop();
            const id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate(
            { scrollTop: $($(this).attr('href')).offset().top },
            500,
            'linear'
        );
    });

    // EmailJS integration for contact form
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submission initiated.");

        // Initialize EmailJS with the correct User ID
        emailjs.init("QJweFZIOi0I1mwEr1");

        // Send the form data
        emailjs.sendForm('service_2002', 'template_2002', '#contact-form')
            .then(() => {
                alert("Form Submitted Successfully");
                console.log("Form submitted successfully.");
                document.getElementById("contact-form").reset(); // Reset form
            })
            .catch((error) => {
                console.error("Form submission failed:", error);
                alert("Form Submission Failed! Try Again");
            });
    });



    // Page title and favicon change on visibility
    document.addEventListener('visibilitychange', function () {
        const title = document.visibilityState === "visible"
            ? "Portfolio | CodedWithShahae"
            : "Portfolio | Shahae Meeran";
        document.title = title;
        $("#favicon").attr("href", "assets/images/favicon.jpg");
    });

    // Typing effect using Typed.js
    new Typed(".typing-text", {
        strings: ["Linux Administration", "Docker", "Kubernetes", "Jenkins"],
        loop: true,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 500,
    });

    // Fetch and display skills
    fetchData().then(showSkills);
    fetchData("projects").then(showProjects);

    // Disable developer mode
    document.onkeydown = function (e) {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
            return false;
        }
    };

    // Calendar Modal Logic
    const logo = document.querySelector('.logo');
    const calendarModal = document.getElementById('calendar-modal');
    const closeCalendar = document.querySelector('.close-calendar');
    const calendarContent = document.getElementById('calendar-content');

    if (logo && calendarModal) {
        logo.addEventListener('click', function (e) {
            e.preventDefault();
            if (calendarModal.style.display === 'none' || calendarModal.style.display === '') {
                generateCalendar();
                calendarModal.style.display = 'flex';
            } else {
                calendarModal.style.display = 'none';
            }
        });
    }

    if (closeCalendar) {
        closeCalendar.addEventListener('click', function () {
            calendarModal.style.display = 'none';
        });
    }

    // Close calendar when clicking outside
    $(window).on('click', function (e) {
        if (e.target == calendarModal) {
            calendarModal.style.display = 'none';
        }
    });

    function generateCalendar() {
        const year = new Date().getFullYear();
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let html = '';

        months.forEach((month, index) => {
            html += `<div class="calendar-month"><h3>${month}</h3><div class="calendar-grid">`;
            const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            days.forEach(day => html += `<div class="calendar-day-header">${day}</div>`);

            const firstDay = new Date(year, index, 1).getDay();
            const daysInMonth = new Date(year, index + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                html += `<div></div>`;
            }

            for (let d = 1; d <= daysInMonth; d++) {
                let className = 'calendar-day';
                if (index === 8 && d === 5) {
                    className += ' birthday';
                }
                html += `<div class="${className}">${d}</div>`;
            }
            html += `</div></div>`;
        });
        calendarContent.innerHTML = html;
    }
});

// Fetch JSON data for skills or projects
async function fetchData(type = "skills") {
    const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
    return await response.json();
}

// Display skills in the skills container
function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    const skillHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
    skillsContainer.innerHTML = skillHTML;
}

// Display projects in the projects container
function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    const projectHTML = projects.slice(0, 10).filter(project => project.category !== "android").map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    projectsContainer.innerHTML = projectHTML;

    // Add tilt effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // Scroll reveal animation
    ScrollReveal().reveal('.work .box', { interval: 200 });
}
