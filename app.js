/* MarksVeda Premium EdTech Javascript Engine - Scholastic Notebook Upgrades */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navigation Sticky Scroll & Active Link Manager
    // ----------------------------------------------------
    const header = document.querySelector('.navbar-wrapper');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active link based on scroll position
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 2. Mobile Drawer Navigation Controller
    // ----------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Animate Hamburg menu to Close symbol
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinksContainer.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu drawer on clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ----------------------------------------------------
    // 3. Scroll Reveal System (AOS Mock)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-el');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ----------------------------------------------------
    // 4. Statistics Count-Up Animator
    // ----------------------------------------------------
    const statsSection = document.querySelector('.stats-bar');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
            count += Math.ceil(target / (duration / stepTime));
            if (count >= target) {
                element.innerText = prefix + target + suffix;
                clearInterval(timer);
            } else {
                element.innerText = prefix + count + suffix;
            }
        }, stepTime);
    };
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats) {
                    statNumbers.forEach(num => countUp(num));
                    animatedStats = true;
                    // Trigger timeline fill animation on step section if visible
                    const progressLine = document.querySelector('.steps-timeline-progress');
                    if (progressLine) {
                        progressLine.style.width = '80%';
                    }
                }
            });
        }, { threshold: 0.2 });
        
        statsObserver.observe(statsSection);
    }

    // ----------------------------------------------------
    // 5. Testimonial Slider / Carousel
    // ----------------------------------------------------
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (sliderContainer) {
        const cards = document.querySelectorAll('.testimonial-card');
        let cardWidth = cards[0].offsetWidth;
        let index = 0;
        let visibleCards = window.innerWidth > 768 ? 2 : 1;
        let maxIndex = Math.max(0, cards.length - visibleCards);
        
        // Recalculate dimensions on window resize
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth;
            visibleCards = window.innerWidth > 768 ? 2 : 1;
            maxIndex = Math.max(0, cards.length - visibleCards);
            goToSlide(index);
        });
        
        // Render pagination dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const updateDots = () => {
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, idx) => {
                dot.classList.remove('active');
                if (idx === index) dot.classList.add('active');
            });
        };
        
        const goToSlide = (slideIndex) => {
            index = Math.min(Math.max(slideIndex, 0), maxIndex);
            sliderContainer.style.transform = `translateX(-${index * cardWidth}px)`;
            updateDots();
        };
        
        nextBtn.addEventListener('click', () => {
            if (index < maxIndex) {
                goToSlide(index + 1);
            } else {
                goToSlide(0); // Loop to start
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                goToSlide(index - 1);
            } else {
                goToSlide(maxIndex); // Loop to end
            }
        });
        
        // Autoplay Interval
        let slideInterval = setInterval(() => {
            if (index < maxIndex) {
                goToSlide(index + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
        
        // Pause autoplay on mouse hover
        const sliderWrapper = document.querySelector('.testimonials-slider');
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderWrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (index < maxIndex) {
                    goToSlide(index + 1);
                } else {
                    goToSlide(0);
                }
            }, 5000);
        });
    }

    // ----------------------------------------------------
    // 6. Interactive FAQ Accordion Manager
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const headerEl = item.querySelector('.faq-header');
        const collapseEl = item.querySelector('.faq-collapse');
        const bodyEl = item.querySelector('.faq-body');
        
        headerEl.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items for a clean single-open layout
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-collapse').style.height = '0px';
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                collapseEl.style.height = '0px';
            } else {
                item.classList.add('active');
                collapseEl.style.height = `${bodyEl.scrollHeight + 1}px`;
            }
        });
    });

    // ----------------------------------------------------
    // 7. Interactive Study Planner Hours Calculator Logic
    // ----------------------------------------------------
    const calcFreq = document.getElementById('calcFreq');
    const calcDuration = document.getElementById('calcDuration');
    const calcFreqVal = document.getElementById('calcFreqVal');
    const calcDurationVal = document.getElementById('calcDurationVal');
    const calcTotalHours = document.getElementById('calcTotalHours');
    const calcResultsDiv = document.querySelector('.calculator-results');
    
    const reCalculateStudyHours = () => {
        if (!calcFreq || !calcDuration) return;
        
        const freq = parseInt(calcFreq.value, 10);
        const duration = parseFloat(calcDuration.value);
        
        // Calculate monthly hours (frequency * duration * 4 weeks)
        const totalHours = Math.round(freq * duration * 4);
        
        // Update label nodes
        calcFreqVal.innerText = `${freq} ${freq === 1 ? 'Class' : 'Classes'} / Week`;
        calcDurationVal.innerText = `${duration} ${duration === 1 ? 'Hour' : 'Hours'} / Class`;
        calcTotalHours.innerText = totalHours;
        
        // Modify target matching speed badge based on total hours intensity
        const statusBadge = calcResultsDiv.querySelector('strong');
        if (totalHours <= 10) {
            statusBadge.innerText = '🟢 Available Match';
            statusBadge.style.color = 'var(--accent-green-dark)';
        } else if (totalHours <= 24) {
            statusBadge.innerText = '⚡ Instant Match';
            statusBadge.style.color = 'var(--primary-blue)';
        } else {
            statusBadge.innerText = '🔥 Premium Priority';
            statusBadge.style.color = '#ef4444';
        }
    };
    
    if (calcFreq && calcDuration) {
        calcFreq.addEventListener('input', reCalculateStudyHours);
        calcDuration.addEventListener('input', reCalculateStudyHours);
        // Fire initial calculation
        reCalculateStudyHours();
    }

    // ----------------------------------------------------
    // 8. Tutor Request Form Processor & Receipt Creator
    // ----------------------------------------------------
    const tutorForm = document.getElementById('tutorRequestForm');
    const tuitionTypeBtns = document.querySelectorAll('.tuition-toggle-btn');
    const tuitionTypeInput = document.getElementById('tuitionType');
    
    // Toggle Tuition type button logic
    tuitionTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tuitionTypeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const radioVal = btn.querySelector('input').value;
            tuitionTypeInput.value = radioVal;
        });
    });
    
    const notificationContainer = document.getElementById('notificationContainer');
    
    const triggerBannerNotification = (name, details) => {
        const notif = document.createElement('div');
        notif.classList.add('notif');
        notif.innerHTML = `
            <div class="notif-icon">🔔</div>
            <div class="notif-text">
                <h5>Request Submitted</h5>
                <p>Tuition request logged for <strong>${name}</strong>.</p>
            </div>
        `;
        notificationContainer.appendChild(notif);
        
        // Animate in
        setTimeout(() => notif.classList.add('active'), 50);
        
        // Remove after 4.5 seconds
        setTimeout(() => {
            notif.classList.remove('active');
            setTimeout(() => notif.remove(), 400);
        }, 4500);
    };
    
    if (tutorForm) {
        tutorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract Field values
            const parentName = document.getElementById('parentName').value.trim();
            const studentName = document.getElementById('studentName').value.trim();
            const selectedClass = document.getElementById('studentClass').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const location = document.getElementById('location').value.trim();
            const preferredTiming = document.getElementById('preferredTiming').value.trim();
            const tuitionType = tuitionTypeInput.value || 'Home';
            
            // Calculate planned study config details
            const freq = calcFreq ? calcFreq.value : '3';
            const duration = calcDuration ? calcDuration.value : '1.5';
            const plannerConfig = `${freq} classes/week at ${duration} hrs/class`;
            
            let notes = document.getElementById('notes').value.trim();
            notes = `[Study Planner: ${plannerConfig}] ` + (notes || 'No extra notes.');
            
            // Basic Client-side check
            if (!parentName || !phone || !location || !selectedClass || !subject) {
                alert('Please fill in all the required fields (marked *).');
                return;
            }
            
            // Set up button loading state
            const submitBtn = tutorForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `⏳ Processing matches...`;
            submitBtn.disabled = true;
            
            // Simulate API Submission Delay
            setTimeout(() => {
                // Generate safe unique inquiry ID
                const reqId = 'MV-' + Math.floor(100000 + Math.random() * 900000);
                const submissionDate = new Date().toLocaleString();
                
                // Assemble target lead object
                const leadRecord = {
                    id: reqId,
                    parentName,
                    studentName: studentName || 'Not Specified',
                    class: selectedClass,
                    subject,
                    phone,
                    location,
                    timing: preferredTiming || 'Flexible',
                    type: tuitionType,
                    notes: notes,
                    date: submissionDate,
                    status: 'Pending Tutor Match'
                };
                
                // Load existing leads or initialize empty array
                const leads = JSON.parse(localStorage.getItem('marksVedaRequests')) || [];
                leads.unshift(leadRecord);
                localStorage.setItem('marksVedaRequests', JSON.stringify(leads));
                
                // Reset Button state
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
                
                // Reset Form elements and custom select states
                tutorForm.reset();
                tuitionTypeBtns.forEach((b, idx) => {
                    b.classList.remove('selected');
                    if (idx === 0) { // default select "Home"
                        b.classList.add('selected');
                        tuitionTypeInput.value = 'Home';
                    }
                });
                
                // Reset Study Planner Slider
                if (calcFreq && calcDuration) {
                    calcFreq.value = 3;
                    calcDuration.value = 1.5;
                    reCalculateStudyHours();
                }
                
                // Populate the interactive Success Modal Receipt fields
                document.getElementById('receiptId').innerText = reqId;
                document.getElementById('receiptDate').innerText = submissionDate.split(',')[0];
                document.getElementById('receiptParent').innerText = parentName;
                document.getElementById('receiptClass').innerText = selectedClass;
                document.getElementById('receiptSubject').innerText = subject;
                document.getElementById('receiptType').innerText = tuitionType;
                document.getElementById('receiptLocation').innerText = location;
                document.getElementById('receiptStatus').innerText = 'Matching Tutor';
                
                // Open Success Modal overlay
                const successModal = document.getElementById('successModal');
                successModal.classList.add('active');
                
                // Fire simulated desktop alert notification
                triggerBannerNotification(parentName, `${selectedClass} - ${subject}`);
                
            }, 1200);
        });
    }

    // Modal Control: Close modal action triggers
    const successModal = document.getElementById('successModal');
    const modalCloses = document.querySelectorAll('.modal-close, .modal-btn-close');
    
    modalCloses.forEach(btn => {
        btn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    });
    
    // Close modal on clicking backdrop
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });

    // Mock receipt print action helper
    const printBtn = document.getElementById('printReceiptBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const receiptContent = document.querySelector('.receipt-box').innerHTML;
            const printWindow = window.open('', '_blank', 'height=600,width=500');
            printWindow.document.write('<html><head><title>MarksVeda - Tuition Request Receipt</title>');
            printWindow.document.write('<style>body{font-family:sans-serif;padding:30px;color:#333;line-height:1.6;}h4{border-bottom:1px solid #ddd;padding-bottom:10px;margin-bottom:20px;font-size:18px;color:#0b1530;}div{display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;border-bottom:1px solid #f9f9f9;padding-bottom:6px;}strong{color:#000;}</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div style="text-align:center;margin-bottom:30px;"><h2>MarksVeda Tutors</h2><p>Home & Online Tuitions</p></div>');
            printWindow.document.write(receiptContent);
            printWindow.document.write('<p style="text-align:center;font-size:12px;color:#777;margin-top:40px;">Thank you for choosing MarksVeda. Our coordinator will contact you in a few minutes.</p>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        });
    }

    // ----------------------------------------------------
    // 9. Secret Lead Dashboard Panel System
    // ----------------------------------------------------
    const adminToggle = document.getElementById('adminDashboardToggle');
    const dashboardOverlay = document.getElementById('adminDashboardOverlay');
    const dashboardClose = document.getElementById('adminDashboardClose');
    const dashboardTbody = document.getElementById('dashboardTableBody');
    const clearDatabaseBtn = document.getElementById('clearDatabaseBtn');
    
    const refreshDashboardTable = () => {
        const leads = JSON.parse(localStorage.getItem('marksVedaRequests')) || [];
        dashboardTbody.innerHTML = '';
        
        if (leads.length === 0) {
            dashboardTbody.innerHTML = `
                <tr>
                    <td colspan="7" class="dashboard-empty">
                        📭 No tuition inquiries submitted yet. Go submit a request to populate this database!
                    </td>
                </tr>
            `;
            return;
        }
        
        leads.forEach(lead => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${lead.id}</strong></td>
                <td>
                    <div style="font-weight:700;color:var(--primary-dark);">${lead.parentName}</div>
                    <div style="font-size:0.75rem;color:var(--text-light)">Student: ${lead.studentName}</div>
                </td>
                <td>${lead.class}</td>
                <td><span class="badge" style="margin-bottom:0;padding:4px 10px;font-size:0.75rem;">${lead.subject}</span></td>
                <td>${lead.location}</td>
                <td><span class="dashboard-badge dashboard-badge-${lead.type.toLowerCase()}">${lead.type}</span></td>
                <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button class="btn assign-tutor-btn" data-id="${lead.id}" style="padding:6px 12px;font-size:0.75rem;background-color:${lead.status === 'Tutor Assigned!' ? 'var(--accent-green-dark)' : 'var(--primary-blue)'};color:#fff;border-radius:4px;">
                            ${lead.status === 'Tutor Assigned!' ? '✓ Assigned' : 'Match Tutor'}
                        </button>
                        <button class="btn delete-lead-btn" data-id="${lead.id}" style="padding:6px 10px;font-size:0.75rem;background-color:#ef4444;color:#fff;border-radius:4px;">🗑</button>
                    </div>
                </td>
            `;
            dashboardTbody.appendChild(tr);
        });
        
        // Bind Assign Tutor Action
        const assignBtns = dashboardTbody.querySelectorAll('.assign-tutor-btn');
        assignBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                let leadsList = JSON.parse(localStorage.getItem('marksVedaRequests')) || [];
                leadsList = leadsList.map(item => {
                    if (item.id === id) {
                        item.status = item.status === 'Tutor Assigned!' ? 'Pending Tutor Match' : 'Tutor Assigned!';
                    }
                    return item;
                });
                localStorage.setItem('marksVedaRequests', JSON.stringify(leadsList));
                refreshDashboardTable();
            });
        });

        // Bind Delete Action
        const deleteBtns = dashboardTbody.querySelectorAll('.delete-lead-btn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                let leadsList = JSON.parse(localStorage.getItem('marksVedaRequests')) || [];
                leadsList = leadsList.filter(item => item.id !== id);
                localStorage.setItem('marksVedaRequests', JSON.stringify(leadsList));
                refreshDashboardTable();
            });
        });
    };
    
    if (adminToggle) {
        adminToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardOverlay.classList.add('active');
            refreshDashboardTable();
        });
    }
    
    if (dashboardClose) {
        dashboardClose.addEventListener('click', () => {
            dashboardOverlay.classList.remove('active');
        });
    }
    
    dashboardOverlay.addEventListener('click', (e) => {
        if (e.target === dashboardOverlay) {
            dashboardOverlay.classList.remove('active');
        }
    });
    
    if (clearDatabaseBtn) {
        clearDatabaseBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all inquiries?')) {
                localStorage.removeItem('marksVedaRequests');
                refreshDashboardTable();
            }
        });
    }
    
    // Add custom keyboard shortcut to open Admin view (Ctrl + Shift + A)
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            dashboardOverlay.classList.add('active');
            refreshDashboardTable();
        }
    });

    // Populate mock demo data inside localStorage on first load so the dashboard is not completely blank!
    const mockDb = [
        {
            id: 'MV-782910',
            parentName: 'Sanjay Sharma',
            studentName: 'Amit Sharma',
            class: 'Class 10 (CBSE)',
            subject: 'Maths & Physics',
            phone: '+91 98765 43210',
            location: 'Connaught Place, New Delhi',
            timing: 'Evenings (5:00 PM - 7:00 PM)',
            type: 'Home',
            notes: '[Study Planner: 3 classes/week at 1.5 hrs/class] Requires preparation for upcoming board exams.',
            date: new Date(Date.now() - 3600000 * 2).toLocaleString(), // 2 hours ago
            status: 'Pending Tutor Match'
        },
        {
            id: 'MV-619280',
            parentName: 'Priya Patel',
            studentName: 'Riya Patel',
            class: 'Class 12 (ISC)',
            subject: 'Biology & Chemistry',
            phone: '+91 91234 56789',
            location: 'Whitefield, Bengaluru',
            timing: 'Weekends (10:00 AM - 1:00 PM)',
            type: 'Online',
            notes: '[Study Planner: 4 classes/week at 2.0 hrs/class] Preparing for NEET UG, focus on Organic Chemistry.',
            date: new Date(Date.now() - 3600000 * 18).toLocaleString(), // 18 hours ago
            status: 'Tutor Assigned!'
        }
    ];
    
    if (!localStorage.getItem('marksVedaRequests')) {
        localStorage.setItem('marksVedaRequests', JSON.stringify(mockDb));
    }
});
