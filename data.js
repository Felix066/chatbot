const AdmissionData = {
    courses: [
        {
            id: "btech-cse",
            name: "B.Tech Computer Science & Engineering",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th with Physics, Chemistry, Mathematics (Minimum 60%)",
            subjects: [
                "Data Structures & Algorithms",
                "Operating Systems",
                "Machine Learning",
                "Cloud Computing",
                "Software Engineering"
            ],
            fees: {
                tuition: "₹1,50,000 / year",
                other_charges: "₹25,000 / year",
                total_estimated: "₹1,75,000 / year"
            },
            career_scope: "Software Architect, AI Researcher, DevOps Engineer, Full Stack Developer",
            why_suitable: "Ideal for analytical thinkers and students passionate about software innovation."
        },
        {
            id: "btech-aiml",
            name: "B.Tech Artificial Intelligence & Machine Learning",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th PCM with minimum 65%",
            subjects: [
                "Neural Networks",
                "Deep Learning",
                "Data Mining",
                "Robotics",
                "Natural Language Processing"
            ],
            fees: {
                tuition: "₹1,75,000 / year",
                other_charges: "₹30,000 / year",
                total_estimated: "₹2,05,000 / year"
            },
            career_scope: "AI Engineer, ML Specialist, Automation Engineer, Data Scientist",
            why_suitable: "Best suited for students interested in automation and intelligent systems."
        },
        {
            id: "btech-ece",
            name: "B.Tech Electronics & Communication Engineering",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th PCM with minimum 55%",
            subjects: [
                "VLSI Design",
                "Signal Processing",
                "Embedded Systems",
                "Internet of Things (IoT)"
            ],
            fees: {
                tuition: "₹1,30,000 / year",
                other_charges: "₹20,000 / year",
                total_estimated: "₹1,50,000 / year"
            },
            career_scope: "VLSI Designer, Embedded Engineer, Telecom Engineer",
            why_suitable: "Ideal for students who enjoy hardware-software integration."
        },
        {
            id: "btech-ds",
            name: "B.Tech Data Science",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th PCM with minimum 60%",
            subjects: [
                "Big Data Analytics",
                "Statistical Modeling",
                "Python for Data Science",
                "Business Intelligence"
            ],
            fees: {
                tuition: "₹1,60,000 / year",
                other_charges: "₹25,000 / year",
                total_estimated: "₹1,85,000 / year"
            },
            career_scope: "Data Analyst, Data Engineer, BI Developer",
            why_suitable: "Perfect for students who love working with numbers and insights."
        },
        {
            id: "btech-mech",
            name: "B.Tech Mechanical Engineering",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th PCM with minimum 50%",
            subjects: [
                "Thermodynamics",
                "CAD/CAM",
                "Robotics",
                "Manufacturing Technology"
            ],
            fees: {
                tuition: "₹1,20,000 / year",
                other_charges: "₹15,000 / year",
                total_estimated: "₹1,35,000 / year"
            },
            career_scope: "Automotive Engineer, Product Designer, Manufacturing Manager",
            why_suitable: "Suitable for students interested in mechanics and industrial systems."
        },
        {
            id: "btech-civil",
            name: "B.Tech Civil Engineering",
            duration: "4 Years",
            stream: "Science (PCM)",
            eligibility: "12th PCM with minimum 50%",
            subjects: [
                "Structural Analysis",
                "Geotechnical Engineering",
                "Urban Planning",
                "Environmental Engineering"
            ],
            fees: {
                tuition: "₹1,15,000 / year",
                other_charges: "₹15,000 / year",
                total_estimated: "₹1,30,000 / year"
            },
            career_scope: "Site Engineer, Urban Planner, Construction Manager",
            why_suitable: "Best for students passionate about infrastructure and design."
        }
    ],

    deadlines: {
        application_start: "March 1, 2026",
        application_end: "May 15, 2026",
        entrance_exam: "June 10, 2026",
        result_announcement: "June 30, 2026"
    },

    scholarships: [
        {
            name: "STEM Merit Scholarship",
            criteria: "Above 95% in PCM",
            benefit: "75% Tuition Fee Waiver"
        },
        {
            name: "Innovator Award",
            criteria: "Top 100 Rank in Entrance Exam",
            benefit: "50% Tuition Fee Waiver"
        }
    ],

    admission_steps: [
        "Online Registration",
        "Document Verification",
        "Entrance Examination",
        "Merit List Publication",
        "Fee Payment & Admission Confirmation"
    ],

    required_docs: [
        "10th Marksheet",
        "12th Marksheet",
        "Transfer Certificate",
        "Government ID Proof",
        "Passport Size Photographs"
    ],

    faqs: [
        {
            q: ["placement", "job", "salary"],
            a: "Average placement package is ₹8 LPA. Top recruiters include Google, Amazon, and Microsoft."
        },
        {
            q: ["hostel", "accommodation"],
            a: "AC and Non-AC hostels available with Wi-Fi, 24/7 security, and mess facility."
        },
        {
            q: ["exam", "entrance"],
            a: "Admission is based on the ADMIT-AI Entrance Test scheduled for June 10, 2026."
        },
        {
            q: ["library"],
            a: "24/7 Digital Library with 50,000+ books and IEEE journal access."
        },
        {
            q: ["ragging"],
            a: "Strict zero tolerance anti-ragging policy with 24/7 helpline support."
        }
    ],

    news: [
        "Admission Portal 2026 is now LIVE!",
        "New specialization in AI & Data Science launched.",
        "Merit Scholarship applications closing soon.",
        "Entrance test mock exams available online.",
        "Campus tour scheduled this weekend."
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdmissionData;
}
