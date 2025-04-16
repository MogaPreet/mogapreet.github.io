document.addEventListener('DOMContentLoaded', function() {
    // Create page transition effect
    const createPageTransition = () => {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        // Simulate page loading
        const loading = document.createElement('div');
        loading.className = 'loading';
        const loadingIcon = document.createElement('div');
        loadingIcon.className = 'loading-icon';
        loading.appendChild(loadingIcon);
        document.body.appendChild(loading);
        
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 800);
    };
    
    createPageTransition();
    
    // Create scroll indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = `${scrollPercentage}%`;
        });
    };
    
    createScrollIndicator();
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-links');
        const navToggle = document.createElement('div');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        document.querySelector('nav').insertBefore(navToggle, nav);
        
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            navToggle.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Check if we need the mobile navigation
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                navToggle.style.display = 'block';
            } else {
                navToggle.style.display = 'none';
                nav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileNav();
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced parallax effect
    const parallaxElements = document.querySelectorAll('[data-depth]');
    const perspectiveSections = document.querySelectorAll('.perspective-section');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const depth = parseFloat(element.getAttribute('data-depth'));
            const scrollY = window.scrollY;
            const translateY = scrollY * depth;
            element.style.transform = `translateY(${translateY}px)`;
        });
    });
    
    // Enhanced mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const percentX = (mouseX / windowWidth - 0.5) * 2; // -1 to 1
        const percentY = (mouseY / windowHeight - 0.5) * 2; // -1 to 1
        
        perspectiveSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const elements = section.querySelectorAll('.transform-element');
                
                elements.forEach(element => {
                    // Only apply effect if the element is in view
                    const elementRect = element.getBoundingClientRect();
                    if (elementRect.top < windowHeight && elementRect.bottom > 0) {
                        // Apply different transform strengths based on element type
                        let xStrength = 15;
                        let yStrength = 15;
                        
                        if (element.classList.contains('skill-card')) {
                            xStrength = 20;
                            yStrength = 10;
                        } else if (element.classList.contains('project-card')) {
                            xStrength = 15;
                            yStrength = 8;
                        } else if (element.classList.contains('tech-tag')) {
                            xStrength = 25;
                            yStrength = 15;
                        }
                        
                        element.style.transform = `translateX(${percentX * xStrength}px) translateY(${percentY * yStrength}px)`;
                    }
                });
            }
        });
    });
    
    // Enhanced float animation for floating elements
    const addFloatAnimation = () => {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((elem, index) => {
            // Randomize animation parameters slightly for each element
            const duration = 4 + Math.random() * 2; // 4-6s
            const delay = index * 0.2; // staggered start
            
            elem.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    };
    
    addFloatAnimation();
    
    // Intersection Observer for enhanced fade-in effect
    const fadeInElements = document.querySelectorAll('section, .three-d-card, .skill-card, .project-card');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small random delay for a more natural feel
                const delay = Math.random() * 0.3;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay * 1000);
            }
        });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        fadeInObserver.observe(element);
    });
    
    // Add 3D tilt effect to cards
    const tiltElements = document.querySelectorAll('.skill-card, .project-card, .contact-info, .contact-form');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const tiltX = (yPercent - 0.5) * 10; // -5 to 5 degrees
            const tiltY = (0.5 - xPercent) * 10; // -5 to 5 degrees
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Type animation for the hero section
    const typeAnimation = () => {
        const titles = [
            'Flutter Developer',
            'UI Designer',
            'Mobile App Expert',
            'Creative Coder'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const typeWriter = () => {
            const titleElement = document.querySelector('.hero p');
            if (!titleElement) return;
            
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                // Deleting text
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal speed when typing
            }
            
            // Add blinking cursor
            titleElement.style.borderRight = '2px solid var(--hover-color)';
            
            // Logic for cycling through titles
            if (!isDeleting && charIndex === currentTitle.length) {
                // Finished typing, pause before deleting
                typingSpeed = 1500;
                isDeleting = true;
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, typingSpeed - 500);
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next title
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500; // Pause before typing new title
            }
            
            setTimeout(typeWriter, typingSpeed);
        };
        
        // Start the typing animation
        typeWriter();
    };
    
    // Uncomment to enable typing animation
    // typeAnimation();
    
    // Add form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Message sent successfully!';
                successMsg.style.color = '#42a5f5';
                successMsg.style.padding = '1rem';
                successMsg.style.marginTop = '1rem';
                successMsg.style.borderRadius = '8px';
                successMsg.style.background = 'rgba(66, 165, 245, 0.1)';
                successMsg.style.textAlign = 'center';
                
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    successMsg.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
});