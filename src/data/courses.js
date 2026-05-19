/**
 * Master course data — single source of truth.
 * All course detail pages and the seed script read from here.
 * To add a course: add an entry here, then run: npm run seed
 */

export const COURSES = [
  // ─── PROGRAMMING ──────────────────────────────────────────────────────────
  {
    id: 'c-programming',
    title: 'C Programming',
    category: 'Programming',
    level: 'Beginner',
    duration: '6 weeks',
    icon: '⚙️',
    color: '#3B82F6',
    tagline: 'Build a rock-solid programming foundation with the language that powers the world.',
    description: 'C Programming is the foundation of all modern software. This course takes you from zero to confident — covering variables, loops, functions, pointers, and file handling with hands-on practice every step of the way.',
    forWhom: ['BCA / BTech / MCA students', 'School students (Class 11–12)', 'Anyone starting their programming journey', 'Students preparing for competitive exams'],
    tools: ['GCC Compiler', 'VS Code', 'Code::Blocks', 'Linux Terminal'],
    projects: [
      { title: 'Student Grade Calculator', desc: 'Build a console app that calculates grades and GPA.' },
      { title: 'Library Management System', desc: 'File-based system to manage books and members.' },
      { title: 'Mini Banking App', desc: 'Simulate deposit, withdrawal, and balance operations.' },
    ],
    careerPaths: ['Software Developer', 'Embedded Systems Engineer', 'Systems Programmer', 'Competitive Programmer'],
    internship: true,
    certification: true,
    related: ['cpp', 'java', 'python'],
    modules: [
      { title: 'Introduction to C & Setup', details: 'History of C, setting up the environment, first program.', topics: ['History of C', 'GCC Setup', 'Hello World', 'Compilation Process'] },
      { title: 'Variables, Data Types & Operators', details: 'Core building blocks of any C program.', topics: ['int, float, char', 'Arithmetic Operators', 'Relational Operators', 'Type Casting'] },
      { title: 'Control Flow', details: 'Decision making and loops.', topics: ['if/else', 'switch', 'for loop', 'while loop', 'do-while', 'break/continue'] },
      { title: 'Functions & Recursion', details: 'Modular programming and recursive thinking.', topics: ['Function Declaration', 'Parameters & Return', 'Recursion', 'Scope & Lifetime'] },
      { title: 'Arrays & Strings', details: 'Working with collections of data.', topics: ['1D & 2D Arrays', 'String Functions', 'Character Arrays', 'Sorting Algorithms'] },
      { title: 'Pointers & Memory', details: 'The most powerful feature of C.', topics: ['Pointer Basics', 'Pointer Arithmetic', 'Dynamic Memory', 'malloc/free'] },
      { title: 'Structures & File Handling', details: 'Organising data and persisting it.', topics: ['struct & union', 'typedef', 'File I/O', 'fread/fwrite'] },
    ],
    packages: [
      { name: 'Basic', price: '₹2,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹4,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹7,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'cpp',
    title: 'C++ Programming',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '8 weeks',
    icon: '🔷',
    color: '#3B82F6',
    tagline: 'Master object-oriented programming and build real-world applications.',
    description: 'C++ extends C with powerful object-oriented features. This course covers OOP concepts, STL, templates, and modern C++ practices used in competitive programming and software development.',
    forWhom: ['Students who know C basics', 'BCA / BTech students', 'Competitive programmers', 'Game development aspirants'],
    tools: ['GCC / G++', 'VS Code', 'CLion', 'Online Judge Platforms'],
    projects: [
      { title: 'Bank Account System (OOP)', desc: 'Full OOP implementation with inheritance and polymorphism.' },
      { title: 'Student Database', desc: 'CRUD operations using classes and file handling.' },
      { title: 'Mini Game (Console)', desc: 'Text-based game using STL containers.' },
    ],
    careerPaths: ['Software Engineer', 'Game Developer', 'Competitive Programmer', 'Systems Developer'],
    internship: true,
    certification: true,
    related: ['c-programming', 'java', 'data-analysis'],
    modules: [
      { title: 'C++ Basics & OOP Intro', details: 'From C to C++, classes and objects.', topics: ['Classes & Objects', 'Constructors', 'Destructors', 'Access Specifiers'] },
      { title: 'Inheritance & Polymorphism', details: 'Code reuse and runtime behaviour.', topics: ['Single Inheritance', 'Multiple Inheritance', 'Virtual Functions', 'Overriding'] },
      { title: 'Templates & STL', details: 'Generic programming and standard library.', topics: ['Function Templates', 'Class Templates', 'vector, map, set', 'Iterators'] },
      { title: 'Exception Handling', details: 'Writing robust, error-safe code.', topics: ['try/catch/throw', 'Custom Exceptions', 'RAII Pattern'] },
      { title: 'File I/O & Streams', details: 'Reading and writing files in C++.', topics: ['ifstream/ofstream', 'Serialisation', 'Binary Files'] },
      { title: 'Modern C++ (C++11/14/17)', details: 'Smart pointers, lambdas, and range-based loops.', topics: ['auto', 'Lambda', 'Smart Pointers', 'Move Semantics'] },
    ],
    packages: [
      { name: 'Basic', price: '₹3,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹5,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹8,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'java',
    title: 'Java Programming',
    category: 'Programming',
    level: 'Beginner to Advanced',
    duration: '10 weeks',
    icon: '☕',
    color: '#F59E0B',
    tagline: 'The most in-demand language for enterprise software and Android development.',
    description: 'Java is the backbone of enterprise applications, Android apps, and backend systems. This comprehensive course covers core Java, OOP, collections, multithreading, and JDBC — everything you need to get hired.',
    forWhom: ['BCA / BTech / MCA students', 'Android development aspirants', 'Backend development learners', 'Job seekers targeting IT companies'],
    tools: ['JDK 17+', 'IntelliJ IDEA', 'Eclipse', 'Maven', 'MySQL'],
    projects: [
      { title: 'Hospital Management System', desc: 'Full CRUD app with JDBC and MySQL.' },
      { title: 'Chat Application', desc: 'Multi-threaded client-server chat using sockets.' },
      { title: 'E-Commerce Backend', desc: 'REST-style backend with collections and file I/O.' },
    ],
    careerPaths: ['Java Developer', 'Android Developer', 'Backend Engineer', 'Software Engineer at TCS/Infosys/Wipro'],
    internship: true,
    certification: true,
    related: ['cpp', 'python', 'mern-stack'],
    modules: [
      { title: 'Java Fundamentals', details: 'JVM, JDK, syntax, and first programs.', topics: ['JVM Architecture', 'Data Types', 'Operators', 'Control Flow'] },
      { title: 'Object-Oriented Programming', details: 'Classes, objects, and OOP pillars.', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Abstraction', 'Encapsulation'] },
      { title: 'Collections Framework', details: 'Working with data structures in Java.', topics: ['ArrayList', 'HashMap', 'LinkedList', 'Iterator', 'Generics'] },
      { title: 'Exception Handling & I/O', details: 'Robust error handling and file operations.', topics: ['try/catch/finally', 'Custom Exceptions', 'File I/O', 'Serialisation'] },
      { title: 'Multithreading & Concurrency', details: 'Writing concurrent Java programs.', topics: ['Thread Class', 'Runnable', 'Synchronisation', 'Executor Service'] },
      { title: 'JDBC & Database', details: 'Connecting Java to MySQL.', topics: ['JDBC Setup', 'CRUD Operations', 'PreparedStatement', 'Connection Pooling'] },
      { title: 'Java 8+ Features', details: 'Modern Java for industry use.', topics: ['Lambda Expressions', 'Stream API', 'Optional', 'Functional Interfaces'] },
    ],
    packages: [
      { name: 'Basic', price: '₹3,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹6,499', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹9,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'python',
    title: 'Python Programming',
    category: 'Programming',
    level: 'Beginner to Advanced',
    duration: '8 weeks',
    icon: '🐍',
    color: '#10B981',
    tagline: 'The most versatile language for web, data, AI, and automation.',
    description: 'Python is the #1 language for data science, AI, web development, and automation. This course takes you from basics to building real projects — with clean, readable code that employers love.',
    forWhom: ['Absolute beginners', 'College students (any stream)', 'Data science aspirants', 'Automation and scripting learners'],
    tools: ['Python 3.11+', 'VS Code', 'Jupyter Notebook', 'PyCharm', 'pip'],
    projects: [
      { title: 'Web Scraper', desc: 'Scrape and analyse data from websites using BeautifulSoup.' },
      { title: 'Data Dashboard', desc: 'Visualise datasets with Pandas and Matplotlib.' },
      { title: 'Automation Bot', desc: 'Automate repetitive tasks with Python scripts.' },
    ],
    careerPaths: ['Python Developer', 'Data Analyst', 'ML Engineer', 'Automation Engineer', 'Backend Developer'],
    internship: true,
    certification: true,
    related: ['data-analysis', 'ai-tools', 'mern-stack'],
    modules: [
      { title: 'Python Basics', details: 'Syntax, variables, and control flow.', topics: ['Variables & Types', 'Lists & Tuples', 'Dictionaries', 'Loops', 'Functions'] },
      { title: 'OOP in Python', details: 'Classes, objects, and Pythonic patterns.', topics: ['Classes & Objects', 'Inheritance', 'Magic Methods', 'Decorators'] },
      { title: 'File Handling & Modules', details: 'Working with files and organising code.', topics: ['File I/O', 'JSON & CSV', 'Modules & Packages', 'Virtual Environments'] },
      { title: 'Libraries: NumPy & Pandas', details: 'Data manipulation essentials.', topics: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Aggregation'] },
      { title: 'Data Visualisation', details: 'Turning data into insights.', topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Chart Types'] },
      { title: 'Web Scraping & Automation', details: 'Practical Python for real tasks.', topics: ['requests', 'BeautifulSoup', 'Selenium Basics', 'Task Automation'] },
    ],
    packages: [
      { name: 'Basic', price: '₹3,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹5,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹8,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  // ─── DEVELOPMENT ──────────────────────────────────────────────────────────
  {
    id: 'mern-stack',
    title: 'MERN Stack Development',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '14 weeks',
    icon: '🌐',
    color: '#06B6D4',
    tagline: 'Build full-stack web apps with MongoDB, Express, React, and Node.js.',
    description: 'The MERN stack is the most popular full-stack JavaScript framework used by startups and enterprises alike. This course takes you from frontend to backend — building real, deployable applications.',
    forWhom: ['Students who know JavaScript basics', 'BCA / BTech students', 'Aspiring full-stack developers', 'Freelancers wanting to build web apps'],
    tools: ['MongoDB', 'Express.js', 'React 18', 'Node.js', 'VS Code', 'Postman', 'Vercel'],
    projects: [
      { title: 'E-Commerce Platform', desc: 'Full-stack store with cart, auth, and payment integration.' },
      { title: 'Social Media App', desc: 'Posts, likes, comments, and real-time notifications.' },
      { title: 'Job Portal', desc: 'Job listings, applications, and admin dashboard.' },
    ],
    careerPaths: ['Full Stack Developer', 'React Developer', 'Node.js Developer', 'Freelance Web Developer'],
    internship: true,
    certification: true,
    related: ['web-development', 'python', 'java'],
    modules: [
      { title: 'HTML, CSS & JavaScript Refresh', details: 'Solid foundation before diving into the stack.', topics: ['Semantic HTML', 'CSS Flexbox/Grid', 'ES6+', 'DOM Manipulation'] },
      { title: 'React Fundamentals', details: 'Building interactive UIs with React.', topics: ['Components', 'Props & State', 'Hooks', 'React Router', 'Context API'] },
      { title: 'Node.js & Express', details: 'Server-side JavaScript and REST APIs.', topics: ['Node.js Basics', 'Express Setup', 'REST API Design', 'Middleware', 'Authentication'] },
      { title: 'MongoDB & Mongoose', details: 'NoSQL database for modern apps.', topics: ['MongoDB Basics', 'Mongoose ODM', 'CRUD Operations', 'Aggregation', 'Indexing'] },
      { title: 'Authentication & Security', details: 'JWT, bcrypt, and secure APIs.', topics: ['JWT Auth', 'bcrypt', 'Protected Routes', 'CORS', 'Rate Limiting'] },
      { title: 'Deployment & DevOps Basics', details: 'Taking your app live.', topics: ['Vercel / Render', 'MongoDB Atlas', 'Environment Variables', 'CI/CD Basics'] },
    ],
    packages: [
      { name: 'Basic', price: '₹5,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹9,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹14,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Web Development',
    level: 'Beginner to Intermediate',
    duration: '10 weeks',
    icon: '💻',
    color: '#06B6D4',
    tagline: 'From zero to building beautiful, responsive websites.',
    description: 'Learn to build modern, responsive websites from scratch. This course covers HTML, CSS, JavaScript, and introduces you to frameworks — giving you everything needed to start freelancing or land a web dev job.',
    forWhom: ['Complete beginners', 'School students (Class 10+)', 'Anyone wanting to build websites', 'Freelancers and entrepreneurs'],
    tools: ['VS Code', 'Chrome DevTools', 'Figma (basics)', 'GitHub', 'Netlify'],
    projects: [
      { title: 'Personal Portfolio', desc: 'Responsive portfolio website with animations.' },
      { title: 'Business Landing Page', desc: 'Professional landing page for a local business.' },
      { title: 'Blog Website', desc: 'Multi-page blog with navigation and contact form.' },
    ],
    careerPaths: ['Frontend Developer', 'Web Designer', 'Freelance Developer', 'UI Developer'],
    internship: true,
    certification: true,
    related: ['mern-stack', 'wordpress', 'graphic-design'],
    modules: [
      { title: 'HTML Fundamentals', details: 'Structure of the web.', topics: ['HTML5 Tags', 'Semantic HTML', 'Forms', 'Tables', 'Accessibility'] },
      { title: 'CSS & Styling', details: 'Making websites look great.', topics: ['Selectors', 'Box Model', 'Flexbox', 'CSS Grid', 'Animations', 'Responsive Design'] },
      { title: 'JavaScript Essentials', details: 'Making websites interactive.', topics: ['Variables', 'Functions', 'DOM Manipulation', 'Events', 'Fetch API'] },
      { title: 'Bootstrap & Tailwind', details: 'CSS frameworks for faster development.', topics: ['Bootstrap Grid', 'Components', 'Tailwind Utility Classes', 'Dark Mode'] },
      { title: 'Git & GitHub', details: 'Version control for developers.', topics: ['Git Basics', 'Branching', 'Pull Requests', 'GitHub Pages'] },
      { title: 'Deployment & Hosting', details: 'Taking your site live.', topics: ['Netlify', 'Vercel', 'Custom Domain', 'Performance Basics'] },
    ],
    packages: [
      { name: 'Basic', price: '₹3,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹6,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹10,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'wordpress',
    title: 'WordPress Development',
    category: 'Web Development',
    level: 'Beginner',
    duration: '5 weeks',
    icon: '🔵',
    color: '#06B6D4',
    tagline: 'Build professional websites without writing code — then go deeper.',
    description: 'WordPress powers 43% of the internet. Learn to build, customise, and manage WordPress websites — from blogs to e-commerce stores — and start freelancing immediately after the course.',
    forWhom: ['Entrepreneurs and small business owners', 'Freelancers wanting quick income', 'Bloggers and content creators', 'Anyone wanting a website without deep coding'],
    tools: ['WordPress.org', 'Elementor', 'WooCommerce', 'cPanel', 'Yoast SEO'],
    projects: [
      { title: 'Business Website', desc: 'Full business site with pages, contact form, and SEO.' },
      { title: 'E-Commerce Store', desc: 'WooCommerce store with products, cart, and checkout.' },
      { title: 'Blog Platform', desc: 'Multi-author blog with categories and newsletter.' },
    ],
    careerPaths: ['WordPress Developer', 'Freelance Web Designer', 'Digital Agency Employee', 'Content Manager'],
    internship: true,
    certification: true,
    related: ['web-development', 'shopify', 'graphic-design'],
    modules: [
      { title: 'WordPress Setup & Hosting', details: 'Getting your site online.', topics: ['Hosting Setup', 'Domain & SSL', 'WordPress Install', 'Dashboard Tour'] },
      { title: 'Themes & Customisation', details: 'Making your site look professional.', topics: ['Theme Selection', 'Elementor Page Builder', 'Header/Footer', 'Typography & Colors'] },
      { title: 'Plugins & Functionality', details: 'Extending WordPress.', topics: ['Essential Plugins', 'Contact Forms', 'SEO with Yoast', 'Security Plugins'] },
      { title: 'WooCommerce E-Commerce', details: 'Selling online with WordPress.', topics: ['Product Setup', 'Payment Gateways', 'Shipping', 'Order Management'] },
      { title: 'SEO & Performance', details: 'Getting found on Google.', topics: ['On-Page SEO', 'Speed Optimisation', 'Caching', 'Image Optimisation'] },
    ],
    packages: [
      { name: 'Basic', price: '₹2,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹4,499', includes: 'Everything in Basic + 2 projects + doubt sessions' },
      { name: 'Premium', price: '₹6,999', includes: 'Everything in Standard + internship + freelance guidance' },
    ],
  },

  {
    id: 'shopify',
    title: 'Shopify Store Development',
    category: 'Web Development',
    level: 'Beginner',
    duration: '4 weeks',
    icon: '🛍️',
    color: '#10B981',
    tagline: 'Build and launch profitable Shopify stores for clients or your own business.',
    description: 'Shopify is the world\'s leading e-commerce platform. Learn to build, customise, and market Shopify stores — a high-demand skill for freelancers and digital agencies.',
    forWhom: ['Entrepreneurs wanting to sell online', 'Freelancers targeting e-commerce clients', 'Digital marketing students', 'Anyone wanting to start an online store'],
    tools: ['Shopify Admin', 'Liquid (Shopify templating)', 'Canva', 'Google Analytics', 'Meta Ads'],
    projects: [
      { title: 'Fashion Store', desc: 'Complete clothing store with collections and variants.' },
      { title: 'Digital Products Store', desc: 'Store selling downloadable products.' },
    ],
    careerPaths: ['Shopify Developer', 'E-Commerce Manager', 'Freelance Store Builder', 'Digital Agency Specialist'],
    internship: false,
    certification: true,
    related: ['wordpress', 'graphic-design', 'web-development'],
    modules: [
      { title: 'Shopify Setup & Products', details: 'Getting your store ready.', topics: ['Store Setup', 'Product Listings', 'Collections', 'Inventory'] },
      { title: 'Theme Customisation', details: 'Making your store unique.', topics: ['Theme Editor', 'Sections & Blocks', 'Liquid Basics', 'Custom CSS'] },
      { title: 'Payments & Shipping', details: 'Taking orders and fulfilling them.', topics: ['Payment Gateways', 'Shipping Zones', 'Tax Setup', 'Order Management'] },
      { title: 'Apps & Integrations', details: 'Extending your store.', topics: ['Essential Apps', 'Email Marketing', 'Reviews', 'Upsell Apps'] },
      { title: 'Marketing & SEO', details: 'Driving traffic and sales.', topics: ['Shopify SEO', 'Meta Ads Basics', 'Google Shopping', 'Analytics'] },
    ],
    packages: [
      { name: 'Basic', price: '₹2,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹4,999', includes: 'Everything in Basic + 2 projects + doubt sessions' },
      { name: 'Premium', price: '₹7,499', includes: 'Everything in Standard + freelance client guidance' },
    ],
  },

  // ─── AI & FUTURE TECH ─────────────────────────────────────────────────────
  {
    id: 'ai-tools',
    title: 'AI Tools & Prompt Engineering',
    category: 'AI & Future Tech',
    level: 'Beginner',
    duration: '4 weeks',
    icon: '🤖',
    color: '#8B5CF6',
    tagline: 'Master the AI tools that are reshaping every industry.',
    description: 'AI is not replacing people — it\'s replacing people who don\'t use AI. This practical course teaches you to use ChatGPT, Midjourney, Copilot, and other AI tools to 10x your productivity in any field.',
    forWhom: ['Students in any field', 'Working professionals', 'Content creators and marketers', 'Entrepreneurs and freelancers'],
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'GitHub Copilot', 'Notion AI', 'Canva AI'],
    projects: [
      { title: 'AI Content Pipeline', desc: 'Build a workflow to create blog posts, social content, and images using AI.' },
      { title: 'AI-Powered Resume & Portfolio', desc: 'Use AI to craft a standout resume and portfolio.' },
    ],
    careerPaths: ['AI Prompt Engineer', 'Content Strategist', 'AI Product Manager', 'Digital Marketing Specialist'],
    internship: false,
    certification: true,
    related: ['data-analysis', 'python', 'graphic-design'],
    modules: [
      { title: 'Introduction to AI & LLMs', details: 'How AI works and why it matters.', topics: ['What is AI?', 'LLMs Explained', 'ChatGPT vs Claude', 'AI Ethics'] },
      { title: 'Prompt Engineering', details: 'Getting the best results from AI.', topics: ['Prompt Structure', 'Chain of Thought', 'Few-Shot Prompting', 'System Prompts'] },
      { title: 'AI for Content & Writing', details: 'Writing, editing, and content creation.', topics: ['Blog Writing', 'Email Drafting', 'Social Media', 'SEO Content'] },
      { title: 'AI for Images & Design', details: 'Visual content generation.', topics: ['Midjourney', 'DALL-E', 'Canva AI', 'Image Prompting'] },
      { title: 'AI for Productivity & Coding', details: 'Automating work with AI.', topics: ['GitHub Copilot', 'Notion AI', 'Zapier AI', 'Code Generation'] },
    ],
    packages: [
      { name: 'Basic', price: '₹1,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹3,499', includes: 'Everything in Basic + projects + doubt sessions' },
      { name: 'Premium', price: '₹5,499', includes: 'Everything in Standard + 1-on-1 mentoring' },
    ],
  },

  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'AI & Future Tech',
    level: 'Beginner to Intermediate',
    duration: '10 weeks',
    icon: '📊',
    color: '#8B5CF6',
    tagline: 'Turn raw data into decisions that drive business growth.',
    description: 'Data Analysis is one of the highest-paying entry-level tech skills. This course teaches you Excel, SQL, Python, and Power BI — the complete toolkit for a data analyst role.',
    forWhom: ['Commerce and science graduates', 'BCA / BTech / MBA students', 'Working professionals wanting to upskill', 'Job seekers targeting analytics roles'],
    tools: ['Excel', 'SQL (MySQL)', 'Python (Pandas)', 'Power BI', 'Tableau Basics'],
    projects: [
      { title: 'Sales Dashboard', desc: 'Interactive Power BI dashboard from raw sales data.' },
      { title: 'Customer Churn Analysis', desc: 'Python analysis to predict customer churn.' },
      { title: 'SQL Business Report', desc: 'Complex SQL queries to answer business questions.' },
    ],
    careerPaths: ['Data Analyst', 'Business Analyst', 'MIS Executive', 'BI Developer', 'Product Analyst'],
    internship: true,
    certification: true,
    related: ['python', 'ai-tools', 'cyber-security'],
    modules: [
      { title: 'Excel for Data Analysis', details: 'The most used tool in every office.', topics: ['Pivot Tables', 'VLOOKUP/XLOOKUP', 'Charts', 'Data Validation', 'Macros Intro'] },
      { title: 'SQL Fundamentals', details: 'Querying databases like a pro.', topics: ['SELECT & WHERE', 'JOINs', 'GROUP BY', 'Subqueries', 'Window Functions'] },
      { title: 'Python for Data Analysis', details: 'Pandas and NumPy for data work.', topics: ['DataFrames', 'Data Cleaning', 'Merging', 'Aggregation', 'EDA'] },
      { title: 'Data Visualisation', details: 'Communicating insights visually.', topics: ['Matplotlib', 'Seaborn', 'Power BI Basics', 'Dashboard Design'] },
      { title: 'Statistics for Analysts', details: 'The math behind the insights.', topics: ['Descriptive Stats', 'Probability', 'Hypothesis Testing', 'Correlation'] },
      { title: 'Capstone Project', details: 'End-to-end analysis project.', topics: ['Problem Framing', 'Data Collection', 'Analysis', 'Presentation'] },
    ],
    packages: [
      { name: 'Basic', price: '₹4,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹7,499', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹11,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'cyber-security',
    title: 'Cyber Security',
    category: 'AI & Future Tech',
    level: 'Intermediate',
    duration: '12 weeks',
    icon: '🔐',
    color: '#EF4444',
    tagline: 'Protect systems, networks, and data in a world of growing threats.',
    description: 'Cyber Security is one of the fastest-growing fields with a massive talent shortage. This course covers ethical hacking, network security, and security operations — preparing you for certifications and jobs.',
    forWhom: ['BCA / BTech / MCA students', 'IT professionals wanting to specialise', 'Students interested in ethical hacking', 'Anyone preparing for CEH or CompTIA Security+'],
    tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nmap', 'Burp Suite', 'VirtualBox'],
    projects: [
      { title: 'Vulnerability Assessment', desc: 'Scan and report vulnerabilities in a test environment.' },
      { title: 'Network Packet Analysis', desc: 'Capture and analyse network traffic with Wireshark.' },
      { title: 'Web App Penetration Test', desc: 'Find and document vulnerabilities in a test web app.' },
    ],
    careerPaths: ['Cyber Security Analyst', 'Ethical Hacker', 'SOC Analyst', 'Network Security Engineer', 'Security Consultant'],
    internship: true,
    certification: true,
    related: ['aws', 'data-analysis', 'python'],
    modules: [
      { title: 'Networking Fundamentals', details: 'The foundation of all security work.', topics: ['OSI Model', 'TCP/IP', 'DNS/DHCP', 'Firewalls', 'VPN'] },
      { title: 'Linux for Security', details: 'Kali Linux and command-line tools.', topics: ['Linux Basics', 'File Permissions', 'Bash Scripting', 'Kali Tools'] },
      { title: 'Ethical Hacking & Recon', details: 'Thinking like an attacker.', topics: ['Footprinting', 'Scanning with Nmap', 'OSINT', 'Social Engineering'] },
      { title: 'Exploitation & Post-Exploitation', details: 'Controlled attack techniques.', topics: ['Metasploit', 'Password Cracking', 'Privilege Escalation', 'Persistence'] },
      { title: 'Web Application Security', details: 'OWASP Top 10 and beyond.', topics: ['SQL Injection', 'XSS', 'CSRF', 'Burp Suite', 'OWASP Top 10'] },
      { title: 'Incident Response & Forensics', details: 'Defending and investigating.', topics: ['Log Analysis', 'SIEM Basics', 'Incident Response', 'Digital Forensics'] },
    ],
    packages: [
      { name: 'Basic', price: '₹5,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹8,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹13,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  {
    id: 'aws',
    title: 'AWS Cloud Computing',
    category: 'AI & Future Tech',
    level: 'Intermediate',
    duration: '10 weeks',
    icon: '☁️',
    color: '#F59E0B',
    tagline: 'The cloud skill that every company is hiring for right now.',
    description: 'Amazon Web Services powers 33% of the internet. This course prepares you for the AWS Solutions Architect Associate exam while teaching you to deploy real applications on the cloud.',
    forWhom: ['BCA / BTech / MCA students', 'IT professionals wanting cloud skills', 'DevOps aspirants', 'Students preparing for AWS certifications'],
    tools: ['AWS Console', 'AWS CLI', 'Terraform Basics', 'Docker', 'GitHub Actions'],
    projects: [
      { title: 'Static Website on S3 + CloudFront', desc: 'Deploy a website with CDN and custom domain.' },
      { title: 'Serverless API', desc: 'Build a REST API with Lambda, API Gateway, and DynamoDB.' },
      { title: 'Auto-Scaling Web App', desc: 'Deploy an app with EC2, Load Balancer, and Auto Scaling.' },
    ],
    careerPaths: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect', 'Cloud Support Engineer'],
    internship: true,
    certification: true,
    related: ['cyber-security', 'mern-stack', 'python'],
    modules: [
      { title: 'Cloud Fundamentals & AWS Intro', details: 'What is cloud and why AWS.', topics: ['Cloud Models', 'AWS Global Infrastructure', 'IAM', 'Billing & Free Tier'] },
      { title: 'Compute: EC2 & Lambda', details: 'Running applications on AWS.', topics: ['EC2 Instances', 'AMIs', 'Security Groups', 'Lambda Functions', 'Serverless'] },
      { title: 'Storage: S3, EBS & RDS', details: 'Storing data in the cloud.', topics: ['S3 Buckets', 'Storage Classes', 'EBS Volumes', 'RDS Setup', 'Backups'] },
      { title: 'Networking: VPC & Route 53', details: 'Cloud networking essentials.', topics: ['VPC Setup', 'Subnets', 'Internet Gateway', 'Route 53', 'CloudFront'] },
      { title: 'DevOps on AWS', details: 'CI/CD and infrastructure as code.', topics: ['CodePipeline', 'CodeDeploy', 'CloudFormation Basics', 'Docker on ECS'] },
      { title: 'AWS Exam Prep', details: 'Preparing for AWS certifications.', topics: ['SAA-C03 Overview', 'Practice Questions', 'Exam Strategy', 'Mock Tests'] },
    ],
    packages: [
      { name: 'Basic', price: '₹5,999', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹9,499', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹13,999', includes: 'Everything in Standard + internship + placement support' },
    ],
  },

  // ─── DESIGN & DIGITAL SKILLS ──────────────────────────────────────────────
  {
    id: 'graphic-design',
    title: 'Graphic Design & Digital Skills',
    category: 'Design & Digital Skills',
    level: 'Beginner',
    duration: '8 weeks',
    icon: '🎨',
    color: '#EC4899',
    tagline: 'Create stunning visuals for brands, social media, and the web.',
    description: 'Graphic design is one of the most in-demand freelance skills. This course teaches you Canva, Photoshop, and Illustrator — covering logo design, social media graphics, branding, and video editing.',
    forWhom: ['Creative students and hobbyists', 'Social media managers', 'Entrepreneurs wanting to brand themselves', 'Freelancers targeting design clients'],
    tools: ['Canva Pro', 'Adobe Photoshop', 'Adobe Illustrator', 'CapCut', 'Figma Basics'],
    projects: [
      { title: 'Brand Identity Package', desc: 'Logo, business card, and social media kit for a brand.' },
      { title: 'Social Media Campaign', desc: '30-day content calendar with designed posts.' },
      { title: 'Product Packaging Design', desc: 'Label and packaging design for a product.' },
    ],
    careerPaths: ['Graphic Designer', 'Social Media Designer', 'UI Designer', 'Freelance Designer', 'Brand Consultant'],
    internship: true,
    certification: true,
    related: ['web-development', 'shopify', 'ai-tools'],
    modules: [
      { title: 'Design Principles', details: 'The theory behind great design.', topics: ['Colour Theory', 'Typography', 'Layout & Composition', 'Visual Hierarchy'] },
      { title: 'Canva Mastery', details: 'Professional design without Photoshop.', topics: ['Templates', 'Brand Kit', 'Social Media Sizes', 'Presentations', 'Video'] },
      { title: 'Adobe Photoshop', details: 'Industry-standard photo editing.', topics: ['Layers & Masks', 'Photo Retouching', 'Compositing', 'Filters & Effects'] },
      { title: 'Adobe Illustrator', details: 'Vector graphics and logo design.', topics: ['Pen Tool', 'Logo Design', 'Icons', 'Typography Effects', 'Export'] },
      { title: 'Social Media & Branding', details: 'Designing for digital platforms.', topics: ['Instagram Design', 'YouTube Thumbnails', 'Brand Guidelines', 'Content Strategy'] },
      { title: 'Video Editing Basics', details: 'Short-form video for social media.', topics: ['CapCut', 'Reels & Shorts', 'Transitions', 'Captions', 'Music'] },
    ],
    packages: [
      { name: 'Basic', price: '₹3,499', includes: 'Video lessons, assignments, certificate' },
      { name: 'Standard', price: '₹5,999', includes: 'Everything in Basic + 3 projects + doubt sessions' },
      { name: 'Premium', price: '₹8,999', includes: 'Everything in Standard + internship + freelance guidance' },
    ],
  },

  // ─── SCHOOL COACHING ──────────────────────────────────────────────────────
  {
    id: 'school-computer',
    title: 'School Computer Coaching',
    category: 'School Coaching',
    level: 'Beginner',
    duration: '12 weeks',
    icon: '🏫',
    color: '#3B82F6',
    tagline: 'Build a strong digital foundation for Class 3–8 students.',
    description: 'A structured computer education program for school students covering digital literacy, MS Office, typing, internet safety, and an introduction to programming — aligned with school curriculum.',
    forWhom: ['Students in Class 3–8', 'Parents wanting digital skills for their children', 'Schools looking for after-school programs'],
    tools: ['Windows OS', 'MS Office (Word, Excel, PowerPoint)', 'Scratch (Programming)', 'Google Workspace'],
    projects: [
      { title: 'My Digital Portfolio', desc: 'Students create a PowerPoint presentation about themselves.' },
      { title: 'Scratch Animation', desc: 'Build a simple animated story using Scratch.' },
      { title: 'Excel Grade Sheet', desc: 'Create a class grade sheet with formulas.' },
    ],
    careerPaths: ['Foundation for all tech careers', 'Digital literacy for life'],
    internship: false,
    certification: true,
    related: ['c-programming', 'python', 'web-development'],
    modules: [
      { title: 'Computer Basics', details: 'Understanding computers and how they work.', topics: ['Hardware & Software', 'Input/Output Devices', 'Operating System', 'File Management'] },
      { title: 'Typing & Keyboard Skills', details: 'Touch typing for speed and accuracy.', topics: ['Home Row', 'Touch Typing', 'Typing Speed Practice', 'Keyboard Shortcuts'] },
      { title: 'MS Word', details: 'Document creation and formatting.', topics: ['Typing & Formatting', 'Tables', 'Images', 'Page Layout', 'Printing'] },
      { title: 'MS Excel', details: 'Spreadsheets and basic formulas.', topics: ['Data Entry', 'SUM/AVERAGE', 'Charts', 'Sorting & Filtering'] },
      { title: 'MS PowerPoint', details: 'Creating presentations.', topics: ['Slides & Layouts', 'Animations', 'Transitions', 'Presenting'] },
      { title: 'Internet & Digital Safety', details: 'Safe and smart internet use.', topics: ['Browsing', 'Email Basics', 'Online Safety', 'Cyberbullying Awareness'] },
      { title: 'Introduction to Scratch', details: 'First steps in programming.', topics: ['Scratch Interface', 'Sprites & Backdrops', 'Events & Loops', 'Simple Games'] },
    ],
    packages: [
      { name: 'Basic', price: '₹1,999', includes: 'Classes, worksheets, certificate' },
      { name: 'Standard', price: '₹3,499', includes: 'Everything in Basic + projects + parent progress reports' },
      { name: 'Premium', price: '₹4,999', includes: 'Everything in Standard + 1-on-1 sessions + exam prep' },
    ],
  },
];

// ─── Helper maps ──────────────────────────────────────────────────────────────

/** Get a course by its slug id */
export function getCourseById(id) {
  return COURSES.find(c => c.id === id) || null;
}

/** Get all courses in a category */
export function getCoursesByCategory(category) {
  return COURSES.filter(c => c.category === category);
}

/** Get related courses for a given course */
export function getRelatedCourses(course) {
  if (!course?.related?.length) return [];
  return course.related
    .map(id => getCourseById(id))
    .filter(Boolean)
    .slice(0, 3);
}

/** All unique categories */
export const CATEGORIES = [...new Set(COURSES.map(c => c.category))];

/** Category metadata */
export const CATEGORY_META = {
  'Programming':          { icon: '💻', color: '#3B82F6', desc: 'C, C++, Java, Python and more' },
  'Web Development':      { icon: '🌐', color: '#06B6D4', desc: 'MERN, WordPress, Shopify, HTML/CSS' },
  'AI & Future Tech':     { icon: '🤖', color: '#8B5CF6', desc: 'AI Tools, Data Analysis, Cyber Security, AWS' },
  'Design & Digital Skills': { icon: '🎨', color: '#EC4899', desc: 'Graphic Design, Canva, Photoshop, Video' },
  'School Coaching':      { icon: '🏫', color: '#10B981', desc: 'Computer basics for Class 3–8 students' },
};
