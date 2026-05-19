/**
 * Trust-building data — placements, testimonials, partners, projects, internship, FAQs.
 * All marked as sample data until replaced with real institute records.
 */

// ─── PLACEMENT SUCCESS ────────────────────────────────────────────────────────
export const PLACEMENTS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    initials: 'RS',
    course: 'MERN Stack Development',
    company: 'Infosys',
    role: 'Frontend Developer',
    package: '₹6.5 LPA',
    outcome: 'Placed within 3 weeks of course completion.',
    batch: '2024',
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Priya Verma',
    initials: 'PV',
    course: 'Data Analysis',
    company: 'TCS',
    role: 'Data Analyst',
    package: '₹7.2 LPA',
    outcome: 'Cracked TCS NQT after completing the Data Analysis program.',
    batch: '2024',
    color: '#06B6D4',
  },
  {
    id: 3,
    name: 'Amit Patel',
    initials: 'AP',
    course: 'Python Programming',
    company: 'Wipro',
    role: 'Python Developer',
    package: '₹8.0 LPA',
    outcome: 'Got shortlisted through campus drive after building 3 live projects.',
    batch: '2025',
    color: '#10B981',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    initials: 'SG',
    course: 'Graphic Design & Digital Skills',
    company: 'Capgemini',
    role: 'UI/UX Designer',
    package: '₹5.8 LPA',
    outcome: 'Portfolio built during the course directly impressed the hiring panel.',
    batch: '2025',
    color: '#EC4899',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    initials: 'VS',
    course: 'Java Programming',
    company: 'HCL Technologies',
    role: 'Java Developer',
    package: '₹7.5 LPA',
    outcome: 'Cleared HCL technical round with JDBC and multithreading skills from the course.',
    batch: '2025',
    color: '#F59E0B',
  },
  {
    id: 6,
    name: 'Anjali Mehta',
    initials: 'AM',
    course: 'Web Development',
    company: 'Freelance / Agency',
    role: 'Freelance Web Developer',
    package: '₹4.5 LPA',
    outcome: 'Started freelancing within 1 month and now earns consistently from clients.',
    batch: '2024',
    color: '#8B5CF6',
  },
];

// ─── HIRING PARTNERS ──────────────────────────────────────────────────────────
export const HIRING_PARTNERS = [
  { name: 'Infosys',       abbr: 'IN', bg: '#0052CC' },
  { name: 'TCS',           abbr: 'TC', bg: '#1A1A2E' },
  { name: 'Wipro',         abbr: 'WI', bg: '#341F97' },
  { name: 'HCL Tech',      abbr: 'HC', bg: '#C8102E' },
  { name: 'Capgemini',     abbr: 'CA', bg: '#0070AD' },
  { name: 'Tech Mahindra', abbr: 'TM', bg: '#C8102E' },
  { name: 'Accenture',     abbr: 'AC', bg: '#A100FF' },
  { name: 'Cognizant',     abbr: 'CO', bg: '#1A6FBF' },
  { name: 'Mphasis',       abbr: 'MP', bg: '#E31837' },
  { name: 'Persistent',    abbr: 'PS', bg: '#0066CC' },
  { name: 'Zensar',        abbr: 'ZN', bg: '#FF6600' },
  { name: 'NIIT Tech',     abbr: 'NT', bg: '#003087' },
];

// ─── INTERNSHIP DOMAINS ───────────────────────────────────────────────────────
export const INTERNSHIP_DOMAINS = [
  { domain: 'Web Development',       icon: '🌐', color: '#06B6D4', openings: 12 },
  { domain: 'Python Development',    icon: '🐍', color: '#10B981', openings: 8  },
  { domain: 'Data Analysis',         icon: '📊', color: '#8B5CF6', openings: 6  },
  { domain: 'Graphic Design',        icon: '🎨', color: '#EC4899', openings: 10 },
  { domain: 'Digital Marketing',     icon: '📣', color: '#F59E0B', openings: 7  },
  { domain: 'React Development',     icon: '⚛️', color: '#3B82F6', openings: 5  },
  { domain: 'UI/UX Design',          icon: '✏️', color: '#06B6D4', openings: 4  },
  { domain: 'Content Writing',       icon: '✍️', color: '#10B981', openings: 9  },
  { domain: 'Video Editing',         icon: '🎬', color: '#EF4444', openings: 6  },
  { domain: 'SEO & SEM',             icon: '🔍', color: '#F59E0B', openings: 5  },
  { domain: 'Android Development',   icon: '📱', color: '#3B82F6', openings: 3  },
  { domain: 'Cyber Security',        icon: '🔐', color: '#EF4444', openings: 4  },
];

export const INTERNSHIP_FEATURES = [
  { icon: '🗂️', title: 'Live Projects',       desc: 'Work on real client projects, not dummy assignments.' },
  { icon: '👨‍🏫', title: 'Mentor Support',      desc: 'Dedicated mentor for weekly 1-on-1 guidance sessions.' },
  { icon: '🏆', title: 'Certificate',          desc: 'Industry-recognised internship completion certificate.' },
  { icon: '📄', title: 'Resume Building',      desc: 'Professional resume crafted with your internship work.' },
  { icon: '📅', title: 'Weekly Reviews',       desc: 'Structured weekly check-ins to track your progress.' },
  { icon: '🤝', title: 'Placement Assistance', desc: 'Direct referrals to our 200+ hiring partner network.' },
];

// ─── STUDENT PROJECTS ─────────────────────────────────────────────────────────
export const STUDENT_PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    student: 'Rahul Sharma',
    course: 'MERN Stack',
    type: 'Full Stack App',
    desc: 'A complete online store with product listings, cart, user auth, and Razorpay payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    color: '#06B6D4',
    icon: '🛒',
  },
  {
    id: 2,
    title: 'Sales Analytics Dashboard',
    student: 'Priya Verma',
    course: 'Data Analysis',
    type: 'Data Dashboard',
    desc: 'Interactive Power BI dashboard analysing 2 years of sales data with trend forecasting.',
    tags: ['Power BI', 'Excel', 'SQL', 'Python'],
    color: '#8B5CF6',
    icon: '📊',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    student: 'Arjun Nair',
    course: 'AI Tools',
    type: 'AI Project',
    desc: 'A tool that generates blog posts, social captions, and email drafts using GPT API.',
    tags: ['Python', 'OpenAI API', 'Streamlit'],
    color: '#10B981',
    icon: '🤖',
  },
  {
    id: 4,
    title: 'Personal Portfolio Website',
    student: 'Sneha Gupta',
    course: 'Web Development',
    type: 'Portfolio',
    desc: 'Fully responsive portfolio with animations, project showcase, and contact form.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    color: '#3B82F6',
    icon: '💼',
  },
  {
    id: 5,
    title: 'Student Grade Tracker',
    student: 'Vikram Singh',
    course: 'Python Programming',
    type: 'Python App',
    desc: 'Console-based grade management system with file persistence and report generation.',
    tags: ['Python', 'File I/O', 'OOP'],
    color: '#F59E0B',
    icon: '🐍',
  },
  {
    id: 6,
    title: 'Brand Identity Package',
    student: 'Anjali Mehta',
    course: 'Graphic Design',
    type: 'Design Project',
    desc: 'Complete brand kit — logo, business card, social media templates, and brand guidelines.',
    tags: ['Canva', 'Illustrator', 'Photoshop'],
    color: '#EC4899',
    icon: '🎨',
  },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Riya Kapoor',
    role: 'BCA Student → Web Developer',
    batch: '2024',
    type: 'student',
    rating: 5,
    text: 'Shree Balaji completely changed my career trajectory. The live projects and mock interviews gave me the confidence to crack my first job interview. The mentors are incredibly supportive and always available.',
    initials: 'RK',
    color: '#3B82F6',
    course: 'MERN Stack Development',
  },
  {
    id: 2,
    name: 'Suresh Kumar',
    role: 'Parent of Class 7 Student',
    batch: '2025',
    type: 'parent',
    rating: 5,
    text: 'My son joined the school computer program and within 3 months he was creating his own presentations and learning Python basics. The teachers make it fun and easy to understand. Highly recommend for school students.',
    initials: 'SK',
    color: '#10B981',
    course: 'School Computer Coaching',
  },
  {
    id: 3,
    name: 'Pooja Sharma',
    role: 'Internship → Digital Marketing',
    batch: '2024',
    type: 'student',
    rating: 5,
    text: 'The internship program at Shree Balaji is genuinely different. I worked on real campaigns, got a verified certificate, and the experience directly helped me land a full-time role. Highly recommend!',
    initials: 'PS',
    color: '#8B5CF6',
    course: 'Graphic Design & Digital Skills',
  },
  {
    id: 4,
    name: 'Deepak Verma',
    role: 'BTech Student → Data Analyst',
    batch: '2025',
    type: 'student',
    rating: 5,
    text: 'I tried online courses before but always got stuck. At Shree Balaji, the mentor was always there to help. The SQL and Python projects I built here are what got me my first interview call.',
    initials: 'DV',
    color: '#06B6D4',
    course: 'Data Analysis',
  },
  {
    id: 5,
    name: 'Meena Patel',
    role: 'Parent of BCA Student',
    batch: '2024',
    type: 'parent',
    rating: 5,
    text: 'We were worried about our daughter\'s placement after BCA. Shree Balaji not only taught her Java and web development but also helped with resume building and mock interviews. She got placed within 2 months.',
    initials: 'MP',
    color: '#F59E0B',
    course: 'Java Programming',
  },
  {
    id: 6,
    name: 'Karan Malhotra',
    role: 'Freelance Developer',
    batch: '2025',
    type: 'student',
    rating: 5,
    text: 'The WordPress and web development course gave me everything I needed to start freelancing. I got my first client within 3 weeks of finishing the course. The fee was worth every rupee.',
    initials: 'KM',
    color: '#EC4899',
    course: 'WordPress Development',
  },
];

// Video testimonial slots (placeholders until real videos are recorded)
export const VIDEO_TESTIMONIALS = [
  { id: 1, name: 'Rahul Sharma', role: 'Placed at Infosys', thumbnail: null, duration: '2:34' },
  { id: 2, name: 'Priya Verma',  role: 'Data Analyst at TCS', thumbnail: null, duration: '1:58' },
  { id: 3, name: 'Pooja Sharma', role: 'Digital Marketing Intern', thumbnail: null, duration: '3:12' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    category: 'Fees & Payment',
    questions: [
      {
        q: 'What are the course fees?',
        a: 'Fees vary by course and plan. Basic plans start from ₹1,999 and Premium plans go up to ₹14,999. All fees are one-time with no hidden charges. EMI options are available on request.',
      },
      {
        q: 'Is there an EMI option?',
        a: 'Yes. We offer 2–3 month EMI options for courses above ₹5,000. Contact us to set up an EMI plan before enrolling.',
      },
      {
        q: 'Are there any scholarships?',
        a: 'Yes. We offer merit-based scholarships for deserving students. Contact us with your academic details to check eligibility.',
      },
    ],
  },
  {
    category: 'Demo Class',
    questions: [
      {
        q: 'Is the demo class really free?',
        a: 'Yes, completely free. No payment, no commitment. You attend one session, experience our teaching style, and then decide.',
      },
      {
        q: 'How do I book a demo class?',
        a: 'Click "Book Free Demo" on any page, fill in your name and contact details, and we will confirm your slot within 24 hours.',
      },
    ],
  },
  {
    category: 'Internship',
    questions: [
      {
        q: 'Who can apply for the internship program?',
        a: 'Any student who has completed or is currently enrolled in one of our courses can apply. We also accept direct internship applications from students with basic skills.',
      },
      {
        q: 'Is the internship paid?',
        a: 'Most internships are unpaid learning internships with a stipend for top performers. Some domain-specific internships offer a monthly stipend of ₹2,000–₹5,000.',
      },
      {
        q: 'What certificate do I get after the internship?',
        a: 'You receive an industry-recognised internship completion certificate with your project details, mentor name, and duration — suitable for your resume and LinkedIn.',
      },
    ],
  },
  {
    category: 'Placement Support',
    questions: [
      {
        q: 'Do you guarantee placement?',
        a: 'We provide dedicated placement assistance — resume building, mock interviews, and referrals to our 200+ hiring partners. While we cannot guarantee a job (no one ethically can), our placement rate is 92% for students who complete the full program.',
      },
      {
        q: 'How long does placement support last?',
        a: 'Placement support is available for 6 months after course completion for Premium plan students.',
      },
    ],
  },
  {
    category: 'Who Can Join',
    questions: [
      {
        q: 'I have no prior coding experience. Can I join?',
        a: 'Absolutely. Courses like C Programming, Python, Web Development, and School Coaching are designed for complete beginners. No prior experience needed.',
      },
      {
        q: 'What is the minimum age or qualification?',
        a: 'School Coaching is for Class 3–8 students. All other courses are open to Class 10+ students, college students, and working professionals.',
      },
      {
        q: 'Can working professionals join?',
        a: 'Yes. We offer flexible batch timings including evening and weekend batches specifically for working professionals.',
      },
    ],
  },
  {
    category: 'Certification',
    questions: [
      {
        q: 'Is the certificate recognised by companies?',
        a: 'Our certificates are recognised by our hiring partner network. They are not government-accredited but are valued by IT companies, agencies, and freelance clients.',
      },
      {
        q: 'When do I receive my certificate?',
        a: 'Certificates are issued within 7 days of completing the course and passing the final assessment.',
      },
    ],
  },
];
