document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const dashboard = document.getElementById('dashboard');
    const modal = document.getElementById('app-modal');
    const closeModal = document.getElementById('close-modal');
    const admissionForm = document.getElementById('admission-form');
    const specSelect = document.getElementById('spec-select');
    const tickerContent = document.getElementById('ticker-content');
    const toastContainer = document.getElementById('toast-container');
    const displayName = document.getElementById('display-name');

    // View Switching Elements
    const navChat = document.getElementById('nav-chat');
    const navDashboard = document.getElementById('nav-dashboard');
    const navScholarships = document.getElementById('nav-scholarships');
    const navDeadlines = document.getElementById('nav-deadlines');

    const chatView = document.getElementById('chat-view');
    const dashboardView = document.getElementById('dashboard-view');

    const navItems = [navChat, navDashboard, navScholarships, navDeadlines];
    window.userInput = userInput; // Expose for HTML onclicks
    let userName = "";

    const switchView = (target) => {
        navItems.forEach(item => item.classList.remove('active'));
        if (target === 'chat') {
            chatView.classList.remove('view-hidden');
            dashboardView.classList.add('view-hidden');
            navChat.classList.add('active');
        } else {
            chatView.classList.add('view-hidden');
            dashboardView.classList.remove('view-hidden');
            if (target === 'dashboard') navDashboard.classList.add('active');
            if (target === 'scholarships') navScholarships.classList.add('active');
            if (target === 'deadlines') navDeadlines.classList.add('active');
        }
    };

    navChat.addEventListener('click', (e) => { e.preventDefault(); switchView('chat'); });
    navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('dashboard'); });
    navScholarships.addEventListener('click', (e) => { e.preventDefault(); switchView('scholarships'); });
    navDeadlines.addEventListener('click', (e) => { e.preventDefault(); switchView('deadlines'); });

    const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    const appendMessage = (text, type, chips = []) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = `${text}<span class="timestamp">${getTimestamp()}</span>`;
        chatWindow.appendChild(msgDiv);

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
            chatWindow.appendChild(chipContainer);
        }
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    };

    const showTyping = () => {
        const div = document.createElement('div');
        div.className = 'message ai typing';
        div.id = 'typing-indicator';
        div.innerHTML = `Assistant is thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`;
        chatWindow.appendChild(div);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    };

    const removeTyping = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    };

    const callGeminiAPI = async (prompt) => {
        if (CONFIG.GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
            return "Please set your Gemini API Key in **config.js** to enable full AI intelligence! 🚀";
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `You are an expert Engineering Admission Assistant. Answer this query naturally and helpfully: ${prompt}` }]
                    }]
                })
            });
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("API Error:", error);
            return "I'm having trouble connecting to my AI brain. Please check your internet or API key!";
        }
    };

    const processInput = async (text) => {
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
        const words = cleanText.split(/\s+/).filter(w => w.length > 2);

        // Smart Name Detection
        const qPatterns = ['what', 'how', 'tell', 'fees', 'where', 'exam', 'available', 'is', 'are', 'show', 'info', 'guide'];
        const isQuery = qPatterns.some(p => cleanText.includes(p)) || words.length > 3;

        if (!userName && !isQuery) {
            userName = text;
            displayName.innerText = userName;
            showToast(`Welcome, ${userName}!`);
            return appendMessage(`Thank you, **${userName}**! 🎓 How can I help you today?`, 'ai', ["Apply Now", "B.Tech Branches", "Check Fees"]);
        } else if (!userName && isQuery) {
            userName = "Future Student";
            displayName.innerText = "Guest";
        }

        // 1. Direct Shortcuts
        if (cleanText.includes('fee')) return showFees();
        if (cleanText.includes('scholarship')) return showScholarships();
        if (cleanText.includes('deadline')) return showDeadlines();
        if (cleanText.includes('apply')) return openApplication();

        // 2. High-Confidence Scoring Match (Local Brain)
        let bestFAQ = null;
        let maxScore = 0;

        AdmissionData.faqs.forEach(faq => {
            let score = 0;
            faq.q.forEach(kw => {
                const kwClean = kw.toLowerCase();
                if (words.includes(kwClean)) score += 10;
                else if (cleanText.includes(kwClean)) score += 3;
            });
            if (score > maxScore) {
                maxScore = score;
                bestFAQ = faq;
            }
        });

        if (bestFAQ && maxScore >= 10) {
            return appendMessage(bestFAQ.a, 'ai', ["Apply Now", "Check Fees"]);
        }

        // 3. AI Brain (Gemini) - The "Answer Everything" fallback
        showTyping();
        const aiResponse = await callGeminiAPI(text);
        removeTyping();
        appendMessage(aiResponse, 'ai', ["Apply Now", "Ask More"]);
    };

    const openApplication = () => {
        modal.style.display = 'flex';
        showToast("Opening Form...");
    };

    const showFees = () => {
        let res = "<strong>Fees:</strong><br>";
        AdmissionData.courses.slice(0, 3).forEach(c => res += `• ${c.name}: ${c.fees.tuition}<br>`);
        appendMessage(res, 'ai', ["Scholarships?", "Apply Online"]);
        switchView('chat');
    };

    const showScholarships = () => {
        let res = "<strong>Scholarships:</strong><br>";
        AdmissionData.scholarships.forEach(s => res += `• ${s.name}: ${s.benefit}<br>`);
        appendMessage(res, 'ai', ["Apply Now", "Engineering CSE"]);
        switchView('chat');
    };

    const showDeadlines = () => {
        let d = AdmissionData.deadlines;
        appendMessage(`<strong>Key Dates:</strong><br>• Apply by: ${d.application_end}<br>• Exam: ${d.entrance_exam}`, 'ai', ["Apply Now", "B.Tech AI&ML"]);
        switchView('chat');
    };

    const recommend = () => {
        appendMessage(`Top choices: **CSE, AI & ML, DS**. These have high placement rates.`, 'ai', ["Apply Online", "AI Scope?"]);
        switchView('chat');
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
        tickerContent.innerHTML = AdmissionData.news.join(' &nbsp; • &nbsp; ');
        document.getElementById('deadline-info').innerHTML = `Last date: ${AdmissionData.deadlines.application_end}`;

        // Map Interactivity
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.onclick = () => {
                const loc = marker.getAttribute('data-label');
                showToast(`Location: ${loc}`);
                switchView('chat');
                appendMessage(`You clicked on **${loc}**. This building is open for visitors from 9 AM to 5 PM.`, 'ai');
            };
        });

        const timeline = document.getElementById('admission-timeline');
        AdmissionData.admission_steps.forEach((step, idx) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `step ${idx === 0 ? 'active' : ''}`;
            stepDiv.innerText = idx + 1;
            stepDiv.onclick = () => {
                switchView('chat');
                appendMessage(`<strong>Step ${idx + 1}: ${step}</strong><br>Details available for this stage.`, 'ai', ["Required Docs", "Fees"]);
                showToast(`Stage: ${step}`);
            };
            timeline.appendChild(stepDiv);
        });

        const checklist = document.getElementById('document-checklist');
        AdmissionData.required_docs.forEach(doc => {
            const item = document.createElement('label');
            item.className = 'checklist-item';
            item.innerHTML = `<input type="checkbox"> <span>${doc}</span>`;
            checklist.appendChild(item);
        });

        AdmissionData.courses.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.innerText = c.name;
            specSelect.appendChild(opt);
        });
    };

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSend());
    closeModal.onclick = () => modal.style.display = 'none';
    admissionForm.onsubmit = (e) => {
        e.preventDefault();
        modal.style.display = 'none';
        showToast("Success!");
        switchView('chat');
        appendMessage(`**Application Received!** 🎉 Thank you, ${userName}. We will contact you shortly.`, 'ai');
    };

    window.assistant = {
        showDetails: (id) => {
            switchView('chat');
            if (id === 'support') return appendMessage("<strong>Helpdesk:</strong><br>📞 +91 98765 43210", 'ai');
            const c = AdmissionData.courses.find(c => c.id === id);
            if (c) appendMessage(`<strong>${c.name}</strong><br>• Fees: ${c.fees.tuition}`, 'ai', ["Apply Now"]);
        }
    };

    initDashboardData();

    // Initial Greeting
    setTimeout(() => {
        appendMessage("Hello! I am your **Engineering Admission Assistant**. 🎓<br>To provide personalized guidance, may I know your **name**?", "ai");
    }, 100);
});
