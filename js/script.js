
/* About 영역 등장 애니메이션 */
const about = document.querySelector('.about');

const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        about.classList.add('is-visible');
        aboutObserver.unobserve(about);
    }
}, { threshold: 0.4 });

aboutObserver.observe(about);


/* Skills 영역 등장 애니메이션 */
const skills = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        skills.classList.add('is-visible');
        skillsObserver.unobserve(skills);
    }
}, { threshold: 0.4 });

skillsObserver.observe(skills);


/* Projects 영역 */
const projects = document.querySelector('.projects');


/* Projects 영역 등장 애니메이션 */
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            projects.classList.add('is-visible');
        }
    });
}, { threshold: 0.4 });

projectsObserver.observe(projects);


/* Projects 카드 드래그 기능 */
const projectsSlider = document.querySelector('.projects-slider');
const projectsList = document.querySelector('.projects-list');

if (projectsSlider && projectsList) {
    let isDragging = false;
    let startX = 0;
    let startPosition = -100;
    let position = -100;

    // 마우스를 누른 위치가 프로젝트 카드일 때만 드래그 시작
    projectsSlider.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.projects-item')) {
            return;
        }

        // 링크나 버튼을 누르면 클릭 동작을 유지
        if (e.target.closest('a, button')) {
            return;
        }

        isDragging = true;
        startX = e.clientX;
        startPosition = position;

        projectsSlider.style.cursor = 'grabbing';
        projectsList.style.transition = 'none';

        e.preventDefault();
    });

    // 마우스 이동에 따라 프로젝트 목록 이동
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) {
            return;
        }

        const distance = e.clientX - startX;

        const minPosition = Math.min(
            0,
            projectsSlider.clientWidth - projectsList.scrollWidth
        );

        position = Math.max(
            minPosition,
            Math.min(0, startPosition + distance)
        );

        projectsList.style.transform = `translateX(${position}px)`;
    });

    // 마우스를 놓으면 드래그 종료
    window.addEventListener('mouseup', () => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        projectsSlider.style.cursor = '';
        projectsList.style.transition = '';
    });

    // 브라우저 창을 벗어날 때 드래그 상태 초기화
    window.addEventListener('blur', () => {
        isDragging = false;
        projectsSlider.style.cursor = '';
        projectsList.style.transition = '';
    });
}


/* Contact 영역 등장 애니메이션 */
const contact = document.querySelector('.contact');

const contactObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        contact.classList.add('is-visible');
        contactObserver.unobserve(contact);
    }
}, { threshold: 0.4 });

contactObserver.observe(contact);
