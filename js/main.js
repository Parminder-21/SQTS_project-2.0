document.addEventListener('DOMContentLoaded', () => {
    // add common header and footer to all pages
    const navbarHTML = `
        <header class="navbar">
            <div class="container nav-container">
                <a href="index.html" class="logo">
                    <i class="fas fa-layer-group"></i> SQTS<span>.</span>
                </a>
                <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="courses.html">Courses</a></li>
                    <li><a href="placed-students.html">Placed Students</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h4>SQTS Indore</h4>
                        <p>Sparkque Tech Solutions is a premier training institute offering job-oriented skill development programs with real industry projects.</p>
                    </div>
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <a href="about.html">About Us</a>
                        <a href="courses.html">Our Courses</a>
                        <a href="reviews.html">Student Reviews</a>
                        <a href="contact.html">Contact</a>
                    </div>
                    <div class="footer-col">
                        <h4>Contact Info</h4>
                        <p><i class="fas fa-map-marker-alt"></i> Indore, Madhya Pradesh</p>
                        <p><i class="fas fa-phone"></i> +91 98765 43210</p>
                        <p><i class="fas fa-envelope"></i> info@sqts.com</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Sparkque Tech Solutions. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    `;

    // inject them if placeholders exist
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // make current page link active
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // handle mobile hamburger menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // sticky header effect on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // scroll animations using intersection observer
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
