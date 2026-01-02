document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    function downloadFile() {
      window.location.href = "https://i.ibb.co/mVvJtqQ5/18835-24x24x4.png";
    }
    const nav = document.querySelector('nav');
    const backToTopBtn = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
        
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        triggerAnimations();
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    function animateCounter(statItem) {
        const numberElement = statItem.querySelector('h3');
        const targetNumber = parseFloat(numberElement.textContent.replace(/[^0-9.]/g, ''));
        const suffix = numberElement.textContent.replace(/[0-9.]/g, '');
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 1500; 
        
        function updateCounter() {
            if (currentNumber < targetNumber) {
                currentNumber += increment;
                if (currentNumber > targetNumber) currentNumber = targetNumber;
                
                let displayNumber;
                if (targetNumber === 0) {
                    displayNumber = '0';
                } else if (targetNumber < 10) {
                    displayNumber = currentNumber.toFixed(1);
                } else {
                    displayNumber = Math.floor(currentNumber).toLocaleString();
                }
                
                numberElement.textContent = displayNumber + suffix;
                requestAnimationFrame(updateCounter);
            }
        }
        
        if (targetNumber > 0) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    triggerAnimations();
    
    function triggerAnimations() {
        document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isVisible && !el.classList.contains('visible')) {
                el.classList.add('visible');
                
                if (el.classList.contains('stat-item')) {
                    animateCounter(el);
                }
            }
        });
    }
    
    if (!document.getElementById('scrollProgress')) {
        const scrollProgress = document.createElement('div');
        scrollProgress.id = 'scrollProgress';
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
    }
    
    if (!document.getElementById('backToTop')) {
        const backToTopBtn = document.createElement('a');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.href = '#';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        document.body.appendChild(backToTopBtn);
    }
    
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            this.classList.add('downloading');
            
            setTimeout(() => {
                this.textContent = 'Download Complete!';
                this.classList.remove('downloading');
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary.downloading {
            opacity: 0.8;
            cursor: not-allowed;
        }
        
        .btn-primary.downloading::before {
            animation: downloading 1.5s linear infinite;
        }
        
        @keyframes downloading {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.floating-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
});