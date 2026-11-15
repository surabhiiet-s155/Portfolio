/**
 * Main Interactive Application Logic (Executive Burnt Orange & Cream Theme)
 * Author: Surabhi Subhas Chandra Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Scroll Effects
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (navbar) {
            if (scrolled > 40) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        }

        highlightActiveSection();
    });

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('open');
            const isOpen = navLinks.classList.contains('nav-open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            playUiSound('click');
        });

        navItems.forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('open');
            });
        });
    }

    // 2. Large Profile Photo Upload & LocalStorage Persistence
    const photoInput = document.getElementById('profile-photo-input');
    const profileImg = document.getElementById('profile-avatar-img');

    if (profileImg) {
        const savedPhoto = localStorage.getItem('surabhi_custom_profile_photo');
        if (savedPhoto) {
            profileImg.src = savedPhoto;
        }
    }

    if (photoInput && profileImg) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    showToast('Please select an image smaller than 5MB.', 'error');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    profileImg.src = dataUrl;
                    try {
                        localStorage.setItem('surabhi_custom_profile_photo', dataUrl);
                        showToast('Profile photo updated successfully!', 'success');
                        playUiSound('success');
                    } catch (err) {
                        showToast('Photo displayed for this session.', 'info');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 3. Dynamic Typewriter in Hero
    const typeWriterEl = document.getElementById('typewriter-text');
    if (typeWriterEl) {
        const phrases = [
            '3rd Year B.Tech CSE (5th Sem)',
            'Best Intern Awardee @ Abhimo',
            'High-IQ Rapid Learner & SDE Aspirant',
            'NxtWave CCBP 4.0 Fellow',
            '3x Live Production Deployments',
            'Problem Solver & UI Architect'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typeWriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typeWriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1600;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 700);
    }

    // 4. Stats Counter Animation (Strictly 3rd Year CSE, No Confusing 8 Years)
    const statCounters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    function countUp() {
        statCounters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0;
            const duration = 1800;
            const increment = target / (duration / 25);

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(count) + suffix;
                }
            }, 25);
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasCounted) {
                    hasCounted = true;
                    countUp();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(statsSection);
    }

    // 5. Project Filter Tabs
    const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            playUiSound('tab');

            const filterValue = btn.getAttribute('data-project-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            if (window.refreshCardEffects) window.refreshCardEffects();
        });
    });

    // 6. Certificate & Achievement Filter Tabs
    const certFilterBtns = document.querySelectorAll('[data-cert-filter]');
    const certCards = document.querySelectorAll('.cert-card');

    certFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            certFilterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            playUiSound('tab');

            const filter = btn.getAttribute('data-cert-filter');

            certCards.forEach((card) => {
                const cat = card.getAttribute('data-cert-category');
                if (filter === 'all' || cat.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            if (window.refreshCardEffects) window.refreshCardEffects();
        });
    });

    // 7. Interactive Certificate / Award Modal (Expanded Badges & Credentials)
    const modal = document.getElementById('cert-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDate = document.getElementById('modal-date');
    const modalCredentialId = document.getElementById('modal-credential-id');
    const modalDescription = document.getElementById('modal-description');
    const modalBadge = document.getElementById('modal-badge');
    const modalMediaContainer = document.getElementById('modal-media');
    const modalActionBtn = document.getElementById('modal-action-btn');

    const certData = {
        'best-intern': {
            title: 'Best Intern Award',
            issuer: 'Abhimo Technologies Private Limited',
            date: 'April 2026',
            credentialId: 'ABHIMO-HONOR-2026-BI-01',
            description: 'Conferred for outstanding engineering contributions, responsive UI architecture, rapid project deployment, and exceptional work ethic during the internship period. Spearheaded the official company website and client production portals.',
            badge: '<i class="fa-solid fa-trophy text-amber-500"></i> Top Performer Honor',
            mediaType: 'image',
            mediaSrc: 'assets/best_intern_award.jpg',
            actionText: 'View Award Ceremony Photo',
            actionUrl: 'assets/best_intern_award.jpg'
        },
        'nptel-scd': {
            title: 'Software Conceptual Design — Elite Certification',
            issuer: 'NPTEL | Ministry of Education, Govt. of India & IIT Kharagpur',
            date: 'Aug - Sep 2026 (4-Week Course)',
            credentialId: 'NPTEL26CS185S674201360 (Score: 60%)',
            description: 'Comprehensive academic certification in formal software modeling, conceptual design frameworks, behavioral representations, architectural analysis, and engineering specifications. Awarded 2 university course credits.',
            badge: '<i class="fa-solid fa-certificate text-orange-600"></i> Elite Govt. Certification',
            mediaType: 'pdf',
            mediaSrc: 'assets/NPTEL_Certificate_Software_Conceptual_Design.pdf',
            actionText: 'Download NPTEL Certificate PDF',
            actionUrl: 'assets/NPTEL_Certificate_Software_Conceptual_Design.pdf'
        },
        'nxtwave-fellow': {
            title: 'NxtWave CCBP 4.0 Academy Fellow',
            issuer: 'NxtWave Technologies',
            date: '2024 - Present',
            credentialId: 'CCBP-FELLOW-SURABHI-S155',
            description: 'Intensive industry-ready software engineering track covering modern HTML5, CSS3, JavaScript ES6+, Python, responsive architecture, data structures, and production-grade project development.',
            badge: '<i class="fa-solid fa-code text-orange-600"></i> Full-Stack & DSA Track',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'View GitHub Repos',
            actionUrl: 'https://github.com/surabhiiet-s155'
        },
        'nxtwave-mock': {
            title: 'NxtWave HTML & CSS Technical Mock Assessment',
            issuer: 'NxtWave Evaluation Board',
            date: '2026',
            credentialId: 'NXT-MOCK-HTML-CSS-SURABHI',
            description: 'Validated technical proficiency in HTML semantic markup, CSS Box Model, spatial margins/padding, DOM manipulation, and responsive web design in live mock interview evaluation.',
            badge: '<i class="fa-solid fa-check-double text-emerald-600"></i> Validated Technical Assessment',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'Connect on LinkedIn',
            actionUrl: 'https://www.linkedin.com/in/surabhi-subhas-chandra/'
        },
        'mind-print': {
            title: 'Research Paper: "Impact of Social Media Algorithms on Youth Behavior"',
            issuer: 'Tech Yuva 2026 — Technical Event & Research Forum',
            date: '2026',
            credentialId: 'TY26-MIND-PRINT-RES',
            description: 'Presented an empirical analysis exploring cognitive loops, recommendation algorithm dynamics, engagement vectors, and intervention strategies for youth digital well-being at the national symposium.',
            badge: '<i class="fa-solid fa-brain text-orange-600"></i> Research & Symposium',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'Connect on LinkedIn',
            actionUrl: 'https://www.linkedin.com/in/surabhi-subhas-chandra/'
        },
        'prompt-buddy': {
            title: 'Prompt Buddy AI Championship',
            issuer: 'SUIET University Technical Event',
            date: '2026',
            credentialId: 'PB-AI-SU-2026',
            description: 'Award-winning participation in high-stakes prompt engineering and AI solution synthesis. Tested prompt optimization, model behavior steering, and LLM-assisted algorithmic problem solving.',
            badge: '<i class="fa-solid fa-wand-magic-sparkles text-emerald-400"></i> AI & Prompt Engineering',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'Explore Projects',
            actionUrl: '#projects'
        },
        'production-deploy': {
            title: '3x Live Production Deployments Milestone',
            issuer: 'Abhimo Technologies & Live Client Networks',
            date: '2026',
            credentialId: 'PROD-DEP-3X-LIVE',
            description: 'Successfully deployed and maintained 3 high-traffic client portals including corporate web apps, inquiry pipelines, and B2B industrial solutions with 100% mobile responsiveness and speed optimization.',
            badge: '<i class="fa-solid fa-cloud-arrow-up text-amber-500"></i> Live Production Achievement',
            mediaType: 'image',
            mediaSrc: 'assets/internship_completion.jpg',
            actionText: 'View Completion Photo',
            actionUrl: 'assets/internship_completion.jpg'
        },
        'blockchain-res': {
            title: 'Blockchain in Governance & Judiciary Technical Research',
            issuer: 'Department of Computer Science & Engineering, SUIET',
            date: '2026',
            credentialId: 'BC-GOV-RES-2026',
            description: 'Authored an architectural research monograph exploring distributed ledger technology (DLT), smart contract validation, and immutable tamper-evident record keeping for Indian judiciary case files.',
            badge: '<i class="fa-solid fa-cubes text-orange-600"></i> Advanced Systems Research',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'View GitHub Repos',
            actionUrl: 'https://github.com/surabhiiet-s155'
        },
        'codealpha-intern': {
            title: 'Python Programming Internship Completion',
            issuer: 'CodeAlpha Technologies',
            date: '2026',
            credentialId: 'CA-PYTHON-DEV-2026',
            description: 'Engineered Python computational utilities, word guessing state machines, and algorithmic task solvers during intensive development sprint.',
            badge: '<i class="fa-brands fa-python text-amber-500"></i> Python Dev Certification',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'View GitHub Repos',
            actionUrl: 'https://github.com/surabhiiet-s155'
        },
        'academic-distinction': {
            title: 'Academic Excellence in Computer Science & Engineering',
            issuer: 'Srinivas University Institute of Engineering & Technology',
            date: '2024 - 2026',
            credentialId: 'SUIET-CSE-01SU24CS155',
            description: 'Recognized for top performance across Data Structures & Algorithms, Object-Oriented Programming (Java), Operating Systems, DBMS, and Web Engineering.',
            badge: '<i class="fa-solid fa-star text-amber-500"></i> Academic Excellence',
            mediaType: 'badge',
            mediaSrc: '',
            actionText: 'Download Resume',
            actionUrl: 'assets/Surabhi_Subhas_Chandra_Resume.pdf'
        }
    };

    document.querySelectorAll('[data-cert-id]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const certId = trigger.getAttribute('data-cert-id');
            const data = certData[certId];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalIssuer.textContent = data.issuer;
            modalDate.textContent = data.date;
            modalCredentialId.textContent = data.credentialId;
            modalDescription.textContent = data.description;
            modalBadge.innerHTML = data.badge;

            if (data.mediaType === 'image' && data.mediaSrc) {
                modalMediaContainer.innerHTML = `
                    <div class="modal-media-wrap">
                        <img src="${data.mediaSrc}" alt="${data.title}" class="modal-img-preview" />
                    </div>
                `;
            } else if (data.mediaType === 'pdf' && data.mediaSrc) {
                modalMediaContainer.innerHTML = `
                    <div class="modal-pdf-box">
                        <i class="fa-solid fa-file-pdf text-orange-600 text-5xl mb-3"></i>
                        <p class="text-sm text-dark font-medium">Verified Official Document (PDF)</p>
                        <span class="text-xs text-orange-600 font-mono mt-1">${data.credentialId}</span>
                    </div>
                `;
            } else {
                modalMediaContainer.innerHTML = `
                    <div class="modal-badge-box">
                        <i class="fa-solid fa-award text-amber-500 text-5xl mb-2"></i>
                        <p class="text-sm text-dark font-medium">Verified Industry & Academic Badge</p>
                        <span class="text-xs text-orange-600 font-mono mt-1">${data.credentialId}</span>
                    </div>
                `;
            }

            modalActionBtn.textContent = data.actionText;
            modalActionBtn.href = data.actionUrl;
            modalActionBtn.target = '_blank';

            modal.classList.add('modal-visible');
            document.body.style.overflow = 'hidden';
            playUiSound('modal');
        });
    });

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('modal-visible');
        document.body.style.overflow = '';
        playUiSound('click');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('modal-visible')) {
            closeModal();
        }
    });

    // 8. Interactive CSE Terminal
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalInput && terminalOutput) {
        const terminalCommands = {
            help: `Available commands:
  <span class="cmd-highlight">about</span>        - Summary of Surabhi (3rd Year CSE Undergraduate)
  <span class="cmd-highlight">nxtwave</span>      - Details on NxtWave CCBP 4.0 fellowship
  <span class="cmd-highlight">skills</span>       - Languages & tools (Stitch, Antigravity, Java, etc.)
  <span class="cmd-highlight">badges</span>       - All 10+ verified awards & badges
  <span class="cmd-highlight">projects</span>     - Production and hackathon project catalog
  <span class="cmd-highlight">whatsapp</span>     - Direct professional WhatsApp connect
  <span class="cmd-highlight">contact</span>      - Email, phone, and professional profiles
  <span class="cmd-highlight">warp</span>         - Engage/disengage 3D space hyperdrive warp
  <span class="cmd-highlight">clear</span>        - Clear terminal console
  <span class="cmd-highlight">sudo hire</span>    - Recruiter hiring route`,

            about: `Name: <span class="font-bold text-orange-600">Surabhi Subhas Chandra</span>
Academic Status: 3rd Year B.Tech CSE (5th Semester) - Current Student
College: Srinivas University Institute of Engineering and Technology (SUIET), Mangaluru
Role: Frontend & Software Developer | Best Intern Awardee @ Abhimo Technologies
USN: 01SU24CS155 | Key Strengths: Quick Learner, High Problem-Solving IQ, Production Deployer`,

            nxtwave: `🎓 <span class="font-bold text-orange-600">NxtWave CCBP 4.0 Academy Fellow</span>
• Full-Stack & DSA Track: Mastered Python, modern JavaScript (ES6+), HTML5, CSS3, SQL.
• Continuous Hands-on Sprints: Rapid concept absorption, real-world algorithmic development.
• Validated Mock Assessments: Verified technical understanding of DOM, layout geometry & box models.`,

            skills: `Frontend:  HTML5, CSS3, Modern JavaScript, Bootstrap 5, Tailwind, WebGL/Three.js, Stitch UI
Backend:   Java, Python, C, C++, Node.js, Express, REST APIs
Modern AI: Google Antigravity Agentic Workflows, Prompt Engineering, LLM Integration
Databases: MongoDB, MySQL, SQL Relational Architecture
Tools:     Git, GitHub, VS Code, Android Studio, Postman, Vercel`,

            badges: `🏆 1. Best Intern Award - Abhimo Technologies (Top recognition)
📜 2. NPTEL Elite Certification - Software Conceptual Design (60%, IIT KGP)
🎓 3. NxtWave CCBP 4.0 Academy Fellow - Full-Stack & DSA
✅ 4. NxtWave HTML & CSS Technical Mock Assessment
💡 5. "Mind Print" Tech Yuva 2026 - Social Media Algorithms Paper
✨ 6. Prompt Buddy AI Championship Winner
🚀 7. 3x Live Production Deployments Milestone
⛓️ 8. Blockchain in Governance Technical Research
🐍 9. CodeAlpha Python Programming Internship Certificate
⭐ 10. Academic Distinction in Computer Science & Engineering`,

            whatsapp: () => {
                window.open('https://wa.me/917204853544?text=' + encodeURIComponent('Hi Surabhi, I am reaching out from your portfolio regarding an opportunity.'), '_blank');
                return 'Opening WhatsApp chat with Surabhi...';
            },

            contact: `Email:    <a href="mailto:asurabhisubhaschandra@gmail.com" class="text-orange-600 underline">asurabhisubhaschandra@gmail.com</a>
WhatsApp: <a href="https://wa.me/917204853544" target="_blank" class="text-emerald-500 underline">+91 7204853544</a>
LinkedIn: <a href="https://www.linkedin.com/in/surabhi-subhas-chandra/" target="_blank" class="text-orange-600 underline">linkedin.com/in/surabhi-subhas-chandra</a>
GitHub:   <a href="https://github.com/surabhiiet-s155" target="_blank" class="text-orange-600 underline">github.com/surabhiiet-s155</a>`,

            warp: () => {
                if (window.toggleWarpDrive) {
                    const active = window.toggleWarpDrive();
                    return active ? '🚀 Hyperspace engaged! Accelerating starfield...' : '✨ Normal cruising speed restored.';
                }
                return 'Warp drive module unavailable.';
            },

            'sudo hire': `🎉 <span class="text-emerald-500 font-bold">ACCESS GRANTED!</span>
Surabhi is actively available for SDE Internships and Graduate Roles.
Direct email: <a href="mailto:asurabhisubhaschandra@gmail.com?subject=Opportunity%20for%20Surabhi" class="text-orange-600 underline">asurabhisubhaschandra@gmail.com</a>
Direct WhatsApp: <a href="https://wa.me/917204853544" target="_blank" class="text-emerald-500 underline">+91 7204853544</a>`
        };

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                if (!rawCmd) return;

                const promptLine = document.createElement('div');
                promptLine.className = 'terminal-line';
                promptLine.innerHTML = `<span class="prompt-text">surabhi@cse-terminal:~$</span> <span class="text-dark font-bold">${escapeHtml(rawCmd)}</span>`;
                terminalOutput.appendChild(promptLine);

                if (rawCmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    playUiSound('click');
                    return;
                }

                let response = '';
                if (terminalCommands[rawCmd]) {
                    const handler = terminalCommands[rawCmd];
                    response = typeof handler === 'function' ? handler() : handler;
                } else {
                    response = `<span class="text-red-400">Command not recognized: "${escapeHtml(rawCmd)}". Type <span class="text-orange-600 font-bold">help</span> to list commands.</span>`;
                }

                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-response';
                responseLine.innerHTML = response;
                terminalOutput.appendChild(responseLine);

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                playUiSound('type');
            }
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // 9. Interactive Dual Contact Form
    const btnSendEmail = document.getElementById('btn-send-email');
    const btnSendWhatsApp = document.getElementById('btn-send-whatsapp');
    const toast = document.getElementById('toast');

    function getFormData() {
        const name = (document.getElementById('form-name')?.value || '').trim();
        const email = (document.getElementById('form-email')?.value || '').trim();
        const subject = (document.getElementById('form-subject')?.value || '').trim();
        const message = (document.getElementById('form-message')?.value || '').trim();

        if (!name || !email || !message) {
            showToast('Please fill out Name, Email, and Message.', 'error');
            return null;
        }
        return { name, email, subject: subject || 'Professional Inquiry for Surabhi', message };
    }

    if (btnSendEmail) {
        btnSendEmail.addEventListener('click', (e) => {
            e.preventDefault();
            const data = getFormData();
            if (!data) return;

            const bodyContent = `Hello Surabhi,\n\nFrom: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}\n\n---\nSent via Portfolio Website`;
            const mailtoUrl = `mailto:asurabhisubhaschandra@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(bodyContent)}`;

            showToast('Opening your email app with pre-filled message...', 'success');
            playUiSound('success');

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 600);
        });
    }

    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', (e) => {
            e.preventDefault();
            const data = getFormData();
            if (!data) return;

            const waText = `Hello Surabhi,\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${data.subject}\n\n*Message:*\n${data.message}\n\n_(Sent via your Portfolio Website)_`;
            const waUrl = `https://wa.me/917204853544?text=${encodeURIComponent(waText)}`;

            showToast('Opening WhatsApp with your professional message...', 'success');
            playUiSound('success');

            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 600);
        });
    }

    document.querySelectorAll('[data-wa-template]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-wa-template');
            let text = '';
            if (template === 'hiring') {
                text = 'Hello Surabhi, I reviewed your CSE portfolio and would love to discuss an SDE opportunity with you.';
            } else if (template === 'project') {
                text = 'Hi Surabhi, I am interested in collaborating with you on a software engineering project.';
            } else {
                text = 'Hi Surabhi, I came across your portfolio website and wanted to connect with you!';
            }
            const waUrl = `https://wa.me/917204853544?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
            playUiSound('click');
        });
    });

    function showToast(msg, type = 'info') {
        if (!toast) return;
        toast.textContent = msg;
        toast.className = `toast toast-visible toast-${type}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 4000);
    }

    // 10. Soft UI Sound Effects (Web Audio API)
    let audioCtx = null;
    let isSoundMuted = true;

    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            isSoundMuted = !isSoundMuted;
            if (isSoundMuted) {
                soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Sound: OFF';
                soundToggleBtn.classList.remove('sound-active');
            } else {
                soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Sound: ON';
                soundToggleBtn.classList.add('sound-active');
                playUiSound('success');
            }
        });
    }

    function playUiSound(type) {
        if (isSoundMuted) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.start(now);
                osc.stop(now + 0.06);
            } else if (type === 'tab') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'modal') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(640, now + 0.14);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.start(now);
                osc.stop(now + 0.14);
            } else if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now);
                osc.frequency.setValueAtTime(880, now + 0.09);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                osc.start(now);
                osc.stop(now + 0.22);
            } else if (type === 'type') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
            }
        } catch (e) {}
    }

    const warpBtn = document.getElementById('warp-btn');
    if (warpBtn) {
        warpBtn.addEventListener('click', () => {
            if (window.toggleWarpDrive) {
                window.toggleWarpDrive();
                playUiSound('success');
            }
        });
    }
});
