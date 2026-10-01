const about = document.querySelector('.about');
const slider = document.querySelector('.about-slider');
const slides = slider.querySelectorAll('img');
const current = document.querySelector('.about-pagination .current');

let index = 0;
let timer = null;

const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        about.classList.add('is-visible');

        if (timer === null) {
            timer = setInterval(() => {
                index = (index + 1) % slides.length;
                slider.style.transform = `translateX(-${index * 100}%)`;
                current.textContent = String(index + 1).padStart(2, '0');
            }, 3000);
        }
    } else {
        clearInterval(timer);
        timer = null;
    }
}, { threshold: 0.4 });

aboutObserver.observe(about);

const skills = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        skills.classList.add('is-visible');
        skillsObserver.unobserve(skills);
    }
}, { threshold: 0.4 });

skillsObserver.observe(skills);

/* project 영역 */
const projectsSlider = document.querySelector(".projects-slider");
const projectsList = document.querySelector(".projects-list");
const projectsItems = document.querySelectorAll(".projects-item")

projectsItems.forEach((item) => {
    const cloneItem = item.cloneNode(true)
    projectsList.appendChild(cloneItem)
})

const allProjectItems = document.querySelectorAll(".projects-item")
const loopWidth = (projectsItems[0].getBoundingClientRect().width + 20) * projectsItems.length
let position = 0;
function wrapPosition() {
    // 왼쪽 경계를 넘으면 한 묶음 거리 더하기
    while (position <= -loopWidth) {
        position = position + loopWidth;
    }

    // 오른쪽 경계를 넘으면 한 묶음 거리 빼기
    while (position > 0) {
        position = position - loopWidth;
    }
}

// 자동 이동
function moveProject() {
    position = position - 1;

    wrapPosition();

    projectsList.style.transform = `translateX(${position}px)`;
}
let timer2 = setInterval(moveProject, 15);
let restartTimer;
allProjectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        clearInterval(timer2)
        clearTimeout(restartTimer)
    })
    item.addEventListener("mouseleave", () => {
        restartTimer = setTimeout(() => {
            timer2 = setInterval(moveProject, 15);
        }, 300);
    })
})

let isDragging = false;
let startX = 0;
let startPosition = 0;
projectsSlider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true
    startX = e.clientX
    startPosition = position
    console.log(startX)
})
window.addEventListener("mouseup", () => {
    if (!isDragging) {
        return;
    }
    isDragging = false;
    console.log(isDragging)
})
window.addEventListener("mousemove", (e) => {
    if (!isDragging) {
        return;
    }
    const distance = e.clientX - startX
    position = startPosition + distance
    projectsList.style.transform = (`translateX(${position}px)`)
    console.log(distance)
})

/* Projects 등장 애니메이션 */
const projects = document.querySelector(".projects");

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            projects.classList.add("is-visible");
        }
    });
}, { threshold: 0.4 });

projectsObserver.observe(projects);

/* Contact 등장 애니메이션 */
const contact = document.querySelector(".contact");

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.2
        ) {
            contact.classList.add("is-visible");

            // 한 번 등장하면 감시 종료
            contactObserver.unobserve(contact);
        }
    });
}, { threshold: 0.4 });

contactObserver.observe(contact);