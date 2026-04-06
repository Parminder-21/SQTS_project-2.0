# SQTS Project 2.0 - Complete Architecture & Documentation

## 1. Project Overview
**Sparkque Tech Solutions (SQTS)** is a static website designed to present training modules, student reviews, alumni placements, and institute details. It is styled to feel premium and fast, utilizing pure Web Technologies (HTML, CSS, Vanilla JS) without the overhead of heavy frameworks like React or Angular.

### Live Environments
- **Vercel Deployment:** [https://sqts-2.vercel.app](https://sqts-2.vercel.app)
- **GitHub Repository:** [Parminder-21/SQTS_project-2.0](https://github.com/Parminder-21/SQTS_project-2.0)
- **GitHub Pages:** https://parminder-21.github.io/SQTS_project-2.0/

---

## 2. Directory Structure
```text
/
├── css/             # Contains style.css (Custom styling and variables)
├── data/            # Contains dynamic JSON files
│   ├── courses.json
│   ├── reviews.json
│   ├── students.json
│   └── tutors.json
├── images/          # Assets and placeholders
├── js/              # Client-side logic
│   ├── main.js      # Global layout, animations, analytics, navbar/footer injector
│   └── data.js      # Fetch logic to pull JSON and populate the DOM
├── HTML Files       # index.html, about.html, contact.html, courses.html, etc.
└── README.md        # Basic quick-start guide
```

---

## 3. How the Website Works (Technical Architecture)

### A. Dynamic Component Injection (`main.js`)
Instead of copying and pasting the Header (Navbar) and Footer code across 6 different HTML files, the `js/main.js` file handles **Navbar and Footer Injection**.  
- It finds `<div id="navbar-placeholder"></div>` inside the HTML files and injects the header template.
- It finds `<div id="footer-placeholder"></div>` and injects the footer.
- **Analytics:** `main.js` also contains a script that loads Vercel Web Analytics automatically across the entire site avoiding duplication.

### B. Data Population (`data.js` & `/data` JSONs)
The website is completely "data-driven." Rather than hardcoding course names, tutor details, or student reviews in the HTML, they are stored in `JSON` files.
- `js/data.js` fetches data from the `/data/` folder.
- Depending on the current page (`index.html` or `courses.html` etc.), it dynamically generates HTML cards and mounts them into specific DOM elements (e.g., `#featured-courses`, `#students-grid`).
- **Maintenance:** If you want to add a new course, you DO NOT need to touch the HTML. You simply add a new object to `/data/courses.json` and the website will automatically generate the card.

---

## 4. Maintenance & Updating Guide

### Adding a New Course
1. Open `data/courses.json`.
2. Add a new block at the end:
```json
{
  "id": "new_unique_id",
  "title": "Course Name",
  "category": "Web Dev",
  "duration": "3 Months",
  "description": "Short description of the course.",
  "image": "images/placeholder.jpg",
  "link": "#"
}
```
3. Save the file. The website updates automatically.

### Updating Placement Records (Alumni)
1. Open `data/students.json`.
2. To add a successfully placed student, append their data:
```json
{
  "name": "Student Name",
  "role": "Frontend Developer",
  "company": "Company Name",
  "package": "8 LPA",
  "image": "images/student.png"
}
```

---

## 5. Deployment Lifecycle

This project is configured with a **Continuous Integration / Continuous Deployment (CI/CD)** pipeline through GitHub and Vercel.

**Steps to deploy an update:**
1. Open your terminal in VS Code.
2. Ensure you are in the project folder.
3. Run the following Git commands:
   ```bash
   git add .
   git commit -m "Update student records"
   git push
   ```
4. **Vercel** and **GitHub Pages** will automatically detect the `git push` event, retrieve the new code, rebuild the edge cache, and update the live websites within seconds. There is absolutely no need for manual FTP uploads or server restarts.
