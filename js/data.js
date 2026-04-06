// helper to make ui avatars
const getAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=150`;

function checkImage(imagePath, fallbackName) {
    if (!imagePath || imagePath.includes('.jpg')) {
        return getAvatar(fallbackName);
    }
    return imagePath;
}

// simple fetch wrapper
async function fetchData(endpoint) {
    try {
        const res = await fetch(`data/${endpoint}.json`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// load prominent courses for homepage
async function renderFeaturedCourses() {
    const container = document.getElementById('featured-courses');
    if (!container) return;

    const courses = await fetchData('courses');
    // Display only first 3 courses
    const html = courses.slice(0, 3).map(course => `
        <div class="card">
            <img src="${checkImage(course.image, course.title)}" class="card-img" alt="${course.title}">
            <div class="card-body">
                <h3 class="card-title"><i class="${course.icon}"></i> ${course.title}</h3>
                <p class="card-text">${course.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <span style="color: var(--secondary-color); font-weight: 600;"><i class="fas fa-clock"></i> ${course.duration}</span>
                </div>
                <a href="courses.html?id=${course.id}" class="btn btn-primary" style="width: 100%; text-align: center;">View Course</a>
            </div>
        </div>
    `).join('');
    container.innerHTML = html;
}

// populate courses page and handle filtering
async function renderAllCourses() {
    const container = document.getElementById('all-courses');
    const filterContainer = document.getElementById('course-filters');
    if (!container || !filterContainer) return;

    let courses = await fetchData('courses');

    // Setup Filters
    const categories = ['All', ...new Set(courses.map(c => c.category))];
    filterContainer.innerHTML = categories.map(cat =>
        `<button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`
    ).join('');

    const render = (items) => {
        container.innerHTML = items.map(course => `
            <div class="card">
                <img src="${checkImage(course.image, course.title)}" class="card-img" alt="${course.title}">
                <div class="card-body">
                    <h3 class="card-title"><i class="${course.icon}"></i> ${course.title}</h3>
                    <p class="card-text" style="font-size: 0.9rem;">${course.description}</p>
                    <div style="margin-bottom: 15px;">
                        ${course.modules.map(mod => `<span style="display:inline-block; background: var(--bg-color); padding: 3px 10px; border-radius: 10px; font-size: 0.8rem; margin: 0 5px 5px 0;">${mod.title}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary" onclick="openCourseModal('${course.id}')" style="width: 100%;">View Details</button>
                </div>
            </div>
        `).join('');
    };

    render(courses);

    // Filter Logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            if (filter === 'All') {
                render(courses);
            } else {
                render(courses.filter(c => c.category === filter));
            }
        });
    });
}

// modal popup for course details
async function openCourseModal(id) {
    const courses = await fetchData('courses');
    const course = courses.find(c => c.id === id);
    if (!course) return;

    const modal = document.getElementById('course-modal');
    const content = document.getElementById('course-modal-body');

    let html = `
        <h2 style="margin-bottom: 10px; color: var(--secondary-color);">${course.title}</h2>
        <p style="color: var(--text-muted); margin-bottom: 30px;">${course.description}</p>
        
        <h3 style="margin-bottom: 20px;">Course Modules</h3>
        <div style="display: grid; gap: 20px; margin-bottom: 40px;">
            ${course.modules.map((mod, i) => `
                <div style="background: var(--bg-color); padding: 20px; border-radius: 10px; border-left: 4px solid var(--primary-color);">
                    <h4 style="margin-bottom: 10px;">Module ${i + 1} – ${mod.title}</h4>
                    <p style="font-size: 0.9rem; margin-bottom: 10px; color: var(--text-muted);">${mod.details}</p>
                    <ul style="list-style: disc; margin-left: 20px; font-size: 0.9rem;">
                        ${mod.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>

        <h3 style="margin-bottom: 20px;">Packages Pricing</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            ${course.packages.map(pkg => `
                <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 10px; text-align: center;">
                    <h4 style="color: var(--accent-color); margin-bottom: 10px;">${pkg.name}</h4>
                    <p style="font-size: 0.8rem; margin-bottom: 15px;">${pkg.includes}</p>
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 15px;">${pkg.price}</div>
                    <a href="https://wa.me/919876543210?text=I am interested in ${course.title} - ${pkg.name}" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.9rem;">Enroll / Query</a>
                </div>
            `).join('')}
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('active');
}

// logic to close the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('course-modal');
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});

// render trainers in grid
async function renderTutors() {
    const container = document.getElementById('tutors-grid');
    if (!container) return;

    const tutors = await fetchData('tutors');
    container.innerHTML = tutors.map(tutor => `
        <div class="card tutor-card">
            <div class="card-body">
                <img src="${checkImage(tutor.image, tutor.name)}" class="tutor-img" alt="${tutor.name}">
                <h3 style="color: white; margin-bottom: 5px;">${tutor.name}</h3>
                <p style="color: var(--secondary-color); font-weight: 500; margin-bottom: 10px;">${tutor.expertise}</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px;">${tutor.experience}</p>
                <div style="margin-top: auto;">
                    <strong style="display:block; margin-bottom: 10px; font-size: 0.8rem; text-transform: uppercase;">Teaches:</strong>
                    ${tutor.courses.map(c => `<span style="display:inline-block; font-size:0.8rem; background: rgba(79,70,229,0.2); color: var(--primary-color); padding: 3px 8px; border-radius: 4px; margin: 2px;">${c}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// load alumni
async function renderStudents() {
    const container = document.getElementById('students-grid');
    if (!container) return;

    const students = await fetchData('students');
    container.innerHTML = students.map(student => `
        <div class="card" style="flex-direction: row; align-items: center; padding: 15px; gap: 20px;">
            <img src="${checkImage(student.image, student.name)}" alt="${student.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
            <div>
                <h4 style="color: white; margin-bottom: 5px;">${student.name}</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 5px;">${student.role} at <strong style="color: white;">${student.company}</strong></p>
                <div style="color: var(--accent-color); font-weight: bold;">${student.salary} Package</div>
            </div>
        </div>
    `).join('');
}

// student testimonials
async function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container) return;

    const reviews = await fetchData('reviews');
    container.innerHTML = reviews.map(review => `
        <div class="card">
            <div class="card-body">
                <div style="display: flex; gap: 15px; margin-bottom: 20px; align-items: center;">
                    <img src="${checkImage(review.image, review.name)}" alt="${review.name}" style="width: 50px; height: 50px; border-radius: 50%;">
                    <div>
                        <h4 style="color: white; font-size: 1.1rem;">${review.name}</h4>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${review.course}</span>
                    </div>
                </div>
                <p style="font-style: italic; color: var(--text-main); margin-bottom: 20px;">"${review.text}"</p>
                <div style="color: #fbbf24; margin-top: auto;">
                    ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                </div>
            </div>
        </div>
    `).join('');
}

// fill out dropdown in contact form
async function populateContactDropdown() {
    const select = document.getElementById('course-interest');
    if (!select) return;

    const courses = await fetchData('courses');
    select.innerHTML += courses.map(c => `<option value="${c.title}">${c.title}</option>`).join('');
}

// boot everything up when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // If the modal exists, this implies we might be on courses page
    renderAllCourses();
    renderFeaturedCourses();
    renderTutors();
    renderStudents();
    renderReviews();
    populateContactDropdown();

    // Check if there is an ID param in URL to auto open a course modal
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    if (courseId && document.getElementById('course-modal')) {
        setTimeout(() => openCourseModal(courseId), 500); // delay to let data load
    }
});
