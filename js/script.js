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