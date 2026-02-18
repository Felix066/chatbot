const AdmissionData = {
    courses: [
        {
            id: "btech-cse",
            name: "B.Tech Computer Science & Engineering",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 60% aggregate.",
            subjects: ["Algorithms", "Machine Learning", "Cloud Computing"],
            fees: { tuition: "₹1,50,00:0/yr", others: "₹25,000/yr" },
            career_scope: "Software Architect, AI Researcher, Devops Lead.",
            why_suitable: "Ideal for technical problem solvers and logic-driven students."
        },
        {
            id: "btech-aiml",
            name: "B.Tech AI & Machine Learning",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 65% aggregate.",
            subjects: ["Neural Networks", "Data Mining", "Robotics"],
            fees: { tuition: "₹1,75,000/yr", others: "₹30,000/yr" },
            career_scope: "AI Engineer, ML specialist, Automation expert.",
            why_suitable: "Perfect for students passionate about the future of automation."
        },
        {
            id: "btech-ece",
            name: "B.Tech Electronics & Communication",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 55% aggregate.",
            subjects: ["VLSI Design", "Signal Processing", "IOT"],
            fees: { tuition: "₹1,30,000/yr", others: "₹20,000/yr" },
            career_scope: "VLSI Designer, Embedded Engineer, Network Architect.",
            why_suitable: "Best for hardware-software integration enthusiasts."
        },
        {
            id: "btech-ds",
            name: "B.Tech Data Science",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 60% aggregate.",
            subjects: ["Big Data Analytics", "Statistical Modeling", "Python for DS"],
            fees: { tuition: "₹1,60,000/yr", others: "₹25,000/yr" },
            career_scope: "Data Analyst, BI Developer, Data Engineer.",
            why_suitable: "Ideal for students who love working with numbers and insights."
        },
        {
            id: "btech-mech",
            name: "B.Tech Mechanical Engineering",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 50% aggregate.",
            subjects: ["Thermodynamics", "CAD/CAM", "Robotics"],
            fees: { tuition: "₹1,20,000/yr", others: "₹15,000/yr" },
            career_scope: "Automotive Engineer, Product Designer, Manufacturing Lead.",
            why_suitable: "Perfect for those interested in mechanics and machines."
        },
        {
            id: "btech-civil",
            name: "B.Tech Civil Engineering",
            stream: "Science (PCM)",
            eligibility: "12th PCM with min 50% aggregate.",
            subjects: ["Structural Analysis", "Geotechnical Engg", "Urban Planning"],
            fees: { tuition: "₹1,15,000/yr", others: "₹15,000/yr" },
            career_scope: "Site Engineer, Project Manager, Urban Designer.",
            why_suitable: "Great for students fascinated by architecture and infrastructure."
        }
    ],
    deadlines: {
        application_start: "March 1, 2026",
        application_end: "May 15, 2026",
        entrance_exam: "June 10, 2026",
        results: "June 30, 2026"
    },
    scholarships: [
        { name: "STEM Merit", criteria: ">95% in PCM", benefit: "75% Fee Waiver" },
        { name: "Innovator Award", criteria: "Top 100 in Entrance", benefit: "50% Fee Waiver" }
    ],
    faqs: [
        { q: ["hostel", "accommodation", "living", "stay", "room", "dorm"], a: "We offer AC & non-AC hostels with Wi-Fi and 24/7 security near the campus." },
        { q: ["placement", "job", "salary", "recruit", "company", "career", "work"], a: "Average placement is 8 LPA, with top recruiters like Google, Amazon, and Microsoft." },
        { q: ["document", "paper", "certificate", "id", "marksheet", "proof"], a: "Required: 10th/12th marksheets, Transfer Certificate, and Govt ID." },
        { q: ["exam", "test", "admit", "entrance", "score", "rank", "paper"], a: "Admission is via the ADMIT-AI entrance test scheduled for June 10, 2026." },
        { q: ["location", "address", "where", "city", "reach", "map"], a: "We are located at the Tech-Education Hub, Sector 44, New City." },
        { q: ["ragging", "disciplinary", "antiragging", "safe", "security", "bully"], a: "We have a strict Zero Tolerance policy towards ragging with a 24/7 helpline." },
        { q: ["faculty", "teacher", "professor", "teaching", "staff"], a: "Our faculty includes PhD holders from IITs and industry veterans with 10+ years exp." },
        { q: ["refund", "cancel", "money back", "withdraw"], a: "Refunds are processed as per UGC guidelines if requested before the session starts." },
        { q: ["sport", "extra", "club", "cultural", "hobby", "activity"], a: "We have 15+ clubs including Robotics, Coding, Music, and various sports teams." },
        { q: ["uniform", "dress", "code", "wear", "cloth"], a: "Standard formals are required on Mon/Thu; college branded t-shirts on other days." },
        { q: ["canteen", "food", "mess", "lunch", "dinner", "eat"], a: "The multi-cuisine canteen serves hygienic veg & non-veg meals with global options." },
        { q: ["library", "book", "reading", "study", "journal"], a: "A 24/7 digital library with over 50,000 physical books and IEEE journal access." },
        { q: ["transport", "bus", "shuttle", "travel", "commute", "pickup"], a: "Centralized bus service covers entire city; tracking available on the mobile app." },
        { q: ["timing", "hour", "schedule", "class", "time"], a: "Classes run from 9:00 AM to 4:30 PM, Monday through Friday." },
        { q: ["wifi", "internet", "connectivity", "lan"], a: "High-speed 1Gbps Wi-Fi is available across every corner of the campus." },
        { q: ["medical", "hospital", "doctor", "health", "care", "emergency"], a: "A 24-hour medical room with an on-call doctor and ambulance is available." },
        { q: ["internship", "visit", "industry", "exposure"], a: "Compulsory summer internships and monthly industrial visits to tech parks are part of the curriculum." },
        { q: ["fest", "tech", "event", "workshop"], a: "Our annual tech-fest 'ADMIT-TECH' features global competitions and workshops." },
        { q: ["lab", "computer", "hardware", "research"], a: "State-of-the-art labs including NVIDIA AI Lab and Embedded Systems Research Center." },
        { q: ["attendance", "rule", "class", "leave"], a: "A minimum of 75% attendance is required to be eligible for final examinations." },
        { q: ["payment", "bank", "loan", "card"], a: "Fees can be paid online via Portal, Credit/Debit cards, or Demand Drafts." },
        { q: ["lateral", "direct", "diploma"], a: "Diploma holders can apply for Lateral Entry directly into the 2nd year of B.Tech." },
        { q: ["coding", "club", "hackathon"], a: "Active coding culture with regular hackathons and Google Developer Student Clubs." },
        { q: ["laptop", "computer", "requirement", "pc"], a: "Students are advised to have a laptop with at least 16GB RAM and an i5/i7 processor for B.Tech courses." },
        { q: ["ranking", "accreditation", "nirf", "naac"], a: "We are NAAC A+ accredited and consistently ranked in the top 50 private engineering colleges by NIRF." },
        { q: ["branch", "change", "shift"], a: "Branch change is allowed after the 1st year based on CGPA merit and seat availability." },
        { q: ["grading", "cgpa", "gpa", "mark"], a: "We follow a 10-point CGPA grading system with continuous internal assessments." },
        { q: ["holiday", "vacation", "break"], a: "We have a 4-week summer break in June and a 2-week winter break in December." },
        { q: ["bank", "atm", "cash"], a: "There is a 24/7 ATM and a branch of a leading nationalized bank right inside the campus." },
        { q: ["gym", "pool", "fitness", "workout"], a: "Our sports complex includes a modern gym, Olympic-sized swimming pool, and indoor courts." },
        { q: ["parent", "report", "portal"], a: "Parents can track attendance and academic progress through a dedicated Parent Portal app." },
        { q: ["project", "research", "patent"], a: "Students start minor projects from the 2nd year; we provide funding for innovative research and patents." },
        { q: ["alumni", "network", "senior"], a: "Our alumni network of 10,000+ graduates working globally provides regular mentorship and referrals." }
    ],
    admission_steps: [
        "Online Registration",
        "Document Verification",
        "Entrance Exam",
        "Merit List",
        "Fee Payment"
    ],
    required_docs: [
        "10th Marksheet",
        "12th Marksheet",
        "Transfer Certificate",
        "Aadhar Card",
        "Passport Photos"
    ],
    news: [
        "Admission Portal 2026 is now LIVE!",
        "New B.Tech specialization in AI & Data Science launched.",
        "Merit Scholarship applications closing in 10 days.",
        "ADMIT-AI Entrance Test mocks available from next week.",
        "Campus tour scheduled for the coming weekend."
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdmissionData;
}
