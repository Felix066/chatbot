document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const modal = document.getElementById('app-modal');
    const closeModal = document.getElementById('close-modal');
    const admissionForm = document.getElementById('admission-form');
    const specSelect = document.getElementById('spec-select');
    const tickerContent = document.getElementById('ticker-content');
    const toastContainer = document.getElementById('toast-container');
    const displayName = document.getElementById('display-name');

    // Navigation Elements
    const navChat = document.getElementById('nav-chat');
    const navCourses = document.getElementById('nav-courses');
    const navScholarships = document.getElementById('nav-scholarships');
    const navJourney = document.getElementById('nav-journey');
    const navDocs = document.getElementById('nav-docs');

    const chatView = document.getElementById('chat-view');
    const dashboardView = document.getElementById('dashboard-view');

    // Dashboard Sections
    const sectionCourses = document.getElementById('section-courses');
    const sectionScholarships = document.getElementById('section-scholarships');
    const sectionAdmission = document.getElementById('section-admission');
    const sectionDocs = document.getElementById('section-docs');

    const navItemsMap = {
        'chat': navChat,
        'courses': navCourses,
        'scholarships': navScholarships,
        'journey': navJourney,
        'docs': navDocs
    };

    const dashboardSections = [sectionCourses, sectionScholarships, sectionAdmission, sectionDocs];

    let userName = "";

    const switchView = (target) => {
        // Reset Nav
        Object.values(navItemsMap).forEach(item => item && item.classList.remove('active'));

        if (target === 'chat') {
            chatView.classList.remove('view-hidden');
            dashboardView.classList.add('view-hidden');
            if (navChat) navChat.classList.add('active');
        } else {
            chatView.classList.add('view-hidden');
            dashboardView.classList.remove('view-hidden');

            // Hide all sections first
            dashboardSections.forEach(s => s && s.classList.add('view-hidden'));

            // Show target section & activate nav
            if (target === 'courses') {
                if (sectionCourses) sectionCourses.classList.remove('view-hidden');
                if (navCourses) navCourses.classList.add('active');
            } else if (target === 'scholarships') {
                if (sectionScholarships) sectionScholarships.classList.remove('view-hidden');
                if (navScholarships) navScholarships.classList.add('active');
            } else if (target === 'journey') {
                if (sectionAdmission) sectionAdmission.classList.remove('view-hidden');
                if (navJourney) navJourney.classList.add('active');
            } else if (target === 'docs') {
                if (sectionDocs) sectionDocs.classList.remove('view-hidden');
                if (navDocs) navDocs.classList.add('active');
            }

            dashboardView.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (navChat) navChat.addEventListener('click', (e) => { e.preventDefault(); switchView('chat'); });
    if (navCourses) navCourses.addEventListener('click', (e) => { e.preventDefault(); switchView('courses'); });
    if (navScholarships) navScholarships.addEventListener('click', (e) => { e.preventDefault(); switchView('scholarships'); });
    if (navJourney) navJourney.addEventListener('click', (e) => { e.preventDefault(); switchView('journey'); });
    if (navDocs) navDocs.addEventListener('click', (e) => { e.preventDefault(); switchView('docs'); });

    const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
        if (toastContainer) toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    const toggleTypingIndicator = (show) => {
        const existing = document.getElementById('typing-indicator');
        if (show) {
            if (existing) return;
            const indicator = document.createElement('div');
            indicator.id = 'typing-indicator';
            indicator.className = 'message ai typing';
            indicator.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
            if (chatWindow) chatWindow.appendChild(indicator);
            if (chatWindow) chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
        } else {
            if (existing) existing.remove();
        }
    };

    const callGeminiAPI = async (prompt) => {
        const trimmedKey = CONFIG.GEMINI_API_KEY.trim();
        const base = "https://generativelanguage.googleapis.com/v1beta";

        // 1. Try the most common model first
        const tryModel = async (modelName) => {
            const url = `${base}/models/${modelName}:generateContent?key=${trimmedKey}`;
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            return await resp.json();
        };

        try {
            // First attempt with Flash
            let data = await tryModel('gemini-1.5-flash');

            // 2. If it fails, try to "Discover" what models THIS key can actually use
            if (data.error && data.error.status === "NOT_FOUND") {
                console.warn("Standard model not found. Discovering available models...");
                const listUrl = `${base}/models?key=${trimmedKey}`;
                const listResp = await fetch(listUrl);
                const listData = await listResp.json();

                if (listData.models && listData.models.length > 0) {
                    // Find the first model that supports "generateContent"
                    const discoverable = listData.models.find(m => m.supportedGenerationMethods.includes("generateContent"));
                    if (discoverable) {
                        const modelName = discoverable.name.split('/').pop();
                        console.log(`Discovered working model: ${modelName}`);
                        data = await tryModel(modelName);
                    }
                }
            }

            if (data.candidates && data.candidates[0].content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }

            if (data.error) throw new Error(data.error.message);
            throw new Error("Unexpected API response structure.");

        } catch (error) {
            console.error('Gemini Discovery Error:', error);
            return `<strong>Configuration Needed:</strong> ${error.message}<br><br>` +
                `1. Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent-primary)">Google AI Studio</a>.<br>` +
                `2. Ensure you have **"Gemini 1.5 Flash"** available in your list of models.<br>` +
                `3. If you just created the key, wait 60 seconds and refresh.`;
        }
    };

    const appendMessage = (text, type, chips = []) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = `${text}<span class="timestamp">${getTimestamp()}</span>`;
        if (chatWindow) chatWindow.appendChild(msgDiv);

        if (chips.length > 0) {
            const chipContainer = document.createElement('div');
            chipContainer.className = 'chip-container';
            chips.forEach(chipText => {
                const chip = document.createElement('button');
                chip.className = 'chip';
                chip.innerText = chipText;
                chip.onclick = () => {
                    if (chipText.includes("Apply")) return openApplication();
                    userInput.value = chipText;
                    handleSend();
                };
                chipContainer.appendChild(chip);
            });
            if (chatWindow) chatWindow.appendChild(chipContainer);
        }
        if (chatWindow) chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    };

    const processInput = async (text) => {
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
        const words = cleanText.split(/\s+/).filter(w => w.length > 2);

        // Smart Name Detection
        const qPatterns = ['what', 'how', 'tell', 'fees', 'where', 'exam', 'available', 'is', 'are', 'show', 'info', 'guide', 'doc', 'required', 'branch', 'course', 'subject'];
        const isQuery = qPatterns.some(p => cleanText.includes(p)) || words.length > 3;

        if (!userName && !isQuery) {
            userName = text;
            if (displayName) displayName.innerText = userName;
            showToast(`Welcome, ${userName}!`);
            return appendMessage(`Thank you, **${userName}**! 🎓 How can I help you today?`, 'ai', ["Apply Now", "B.Tech Branches", "Check Fees"]);
        } else if (!userName && isQuery) {
            userName = "Future Student";
            if (displayName) displayName.innerText = "Guest";
        }

        // Contextual Navigation Mapping
        if (cleanText.includes('scholarship')) return switchView('scholarships');
        if (cleanText.includes('deadline') || cleanText.includes('journey') || cleanText.includes('admission')) return switchView('journey');
        if (cleanText.includes('doc')) return switchView('docs');
        if (cleanText.includes('branch') || cleanText.includes('course')) return switchView('courses');
        if (cleanText.includes('apply')) return openApplication();

        // FAQ Matching
        let bestFAQ = null;
        let maxScore = 0;

        AdmissionData.faqs.forEach(faq => {
            let score = 0;
            faq.q.forEach(kw => {
                const kwClean = kw.toLowerCase();
                if (words.includes(kwClean)) score += 10;
                else if (cleanText.includes(kwClean)) score += 3;
            });
            const answerKeywords = faq.a.toLowerCase().split(/\s+/);
            words.forEach(word => {
                if (answerKeywords.includes(word)) score += 2;
            });
            if (score > maxScore) {
                maxScore = score;
                bestFAQ = faq;
            }
        });

        if (bestFAQ && maxScore >= 8) {
            return appendMessage(bestFAQ.a, 'ai', ["Apply Now", "Check Fees"]);
        }

        // Gemini AI Fallback
        toggleTypingIndicator(true);
        const aiResponse = await callGeminiAPI(`You are a professional B.Tech admission assistant for an engineering college in 2026. 
            User says: "${text}". 
            Provide a helpful, professional, and concise response. 
            If they ask about admission, refer to the "Admission Journey" section. 
            Keep it under 3 sentences unless detailed info is requested.`);
        toggleTypingIndicator(false);

        appendMessage(aiResponse, 'ai', ["Available Courses", "Admission Journey"]);
    };

    const openApplication = () => {
        if (modal) modal.style.display = 'flex';
        showToast("Opening Form...");
    };

    const handleSend = async () => {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage(text, 'user');
        userInput.value = '';
        await processInput(text);
    };
    window.handleSend = handleSend;

    const initDashboardData = () => {
        if (tickerContent) tickerContent.innerHTML = AdmissionData.news.join(' &nbsp; • &nbsp; ');

        // 1. Populate Course Grid
        const courseGrid = document.getElementById('course-grid');
        if (courseGrid) {
            courseGrid.innerHTML = '';
            AdmissionData.courses.forEach(c => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.innerHTML = `
                    <h3>${c.name}</h3>
                    <p class="description">${c.why_suitable}</p>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-label">Duration</span>
                            <span class="stat-value">${c.duration || '4 Years'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Intake</span>
                            <span class="stat-value">60 Seats</span>
                        </div>
                    </div>
                    <button class="send-btn" style="width: 100%;" onclick="openApplication()">Apply Now</button>
                `;
                courseGrid.appendChild(card);
            });
        }

        // 2. Populate Scholarship List
        const scholarshipGrid = document.getElementById('scholarship-grid');
        if (scholarshipGrid) {
            scholarshipGrid.innerHTML = '';
            AdmissionData.scholarships.forEach(s => {
                const card = document.createElement('div');
                card.className = 'scholarship-card';
                card.innerHTML = `
                    <div class="scholarship-info">
                        <h4>${s.name}</h4>
                        <p>${s.criteria}</p>
                        <div class="scholarship-deadline">Deadline: ${s.deadline || 'Contact Office'}</div>
                    </div>
                    <div class="scholarship-benefit">
                        <div class="benefit-tag">${s.benefit}</div>
                    </div>
                `;
                scholarshipGrid.appendChild(card);
            });
        }

        // 3. Populate Admission Timeline & Training
        const timeline = document.getElementById('admission-timeline');
        if (timeline) {
            timeline.innerHTML = '';
            AdmissionData.admission_steps.forEach((step, idx) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'timeline-step';
                stepDiv.innerHTML = `
                    <div class="step-number">${idx + 1}</div>
                    <h4>${step}</h4>
                    <p>Status: Active for 2026</p>
                `;
                timeline.appendChild(stepDiv);
            });
        }

        const trainingList = document.getElementById('training-list');
        if (trainingList) {
            trainingList.innerHTML = '';
            (AdmissionData.training_programs || ["Industry Training", "Internship Assistance", "Placement Support"]).forEach(program => {
                const li = document.createElement('li');
                li.innerText = program;
                trainingList.appendChild(li);
            });
        }

        // 4. Populate Document Checklist
        const docChecklist = document.getElementById('document-checklist');
        if (docChecklist) {
            docChecklist.innerHTML = '';
            AdmissionData.required_docs.forEach(doc => {
                const card = document.createElement('div');
                card.className = 'check-card';
                card.innerHTML = `
                    <div class="check-icon">✓</div>
                    <span>${doc}</span>
                `;
                docChecklist.appendChild(card);
            });
        }

        // Modal Specifics
        if (specSelect) {
            specSelect.innerHTML = '';
            AdmissionData.courses.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.innerText = c.name;
                specSelect.appendChild(opt);
            });
        }
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (userInput) userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSend());
    if (closeModal) closeModal.onclick = () => modal.style.display = 'none';
    if (admissionForm) admissionForm.onsubmit = (e) => {
        e.preventDefault();
        modal.style.display = 'none';
        showToast("Success!");
        switchView('chat');
        appendMessage(`**Application Received!** 🎉 Thank you, ${userName}. We will contact you shortly.`, 'ai');
    };

    window.assistant = {
        showDetails: (id) => {
            switchView('chat');
            if (id === 'support') return appendMessage("<strong>Helpdesk Support:</strong><br>Our counselors are available. Please use the application form for direct assistance.", 'ai');
        }
    };

    window.openApplication = openApplication;
    initDashboardData();

    // Initial Greeting
    setTimeout(() => {
        appendMessage("Hello! I am your **Admission Support Assistant**. 🎓<br><br>I can help you with course details, scholarships, and the admission process. Which section would you like to explore?", "ai");
    }, 100);
});
