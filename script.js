document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navigation & Hamburger Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const firstb=document.querySelector("#firstb");
    firstb.addEventListener("click",()=>{
        console.log("Clicked");
    })
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 2. Destination Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Handle button active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            // Filter cards
            destCards.forEach(card => {
                const category = card.getAttribute('data-category');
                // Simple classList checking to allow multiple categories (e.g. data-category="nature mountains")
                if (filterVal === 'all' || category.includes(filterVal)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // match CSS transition duration
                }
            });
        });
    });

    // --- 3. Trip Planner Calculator ---
    // Object storing base prices per person per day
    const destPrices = {
        'coorg': 1500,
        'ooty': 1400,
        'manali': 1800,
        'goa': 2200,
        'munnar': 1600,
        'jaipur': 2000
    };

    // Object storing multipliers based on travel style
    const styleMultipliers = {
        'budget': 1.0,
        'standard': 1.5,
        'luxury': 3.0
    };

    const calcForm = document.getElementById('calc-form');
    const calcResult = document.getElementById('calc-result');

    calcForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        // Get input values
        const destSelector = document.getElementById('calc-dest');
        const destName = destSelector.options[destSelector.selectedIndex].text;
        const destKey = destSelector.value;

        const days = parseInt(document.getElementById('calc-days').value);
        const people = parseInt(document.getElementById('calc-people').value);
        const style = document.getElementById('calc-style').value;

        // Validation
        if (!destKey || isNaN(days) || isNaN(people)) return;

        // Calculation logic
        const basePrice = destPrices[destKey];
        const multiplier = styleMultipliers[style];

        const totalCost = basePrice * days * people * multiplier;

        // Update DOM
        document.getElementById('res-dest').innerText = destName;
        document.getElementById('res-dur').innerText = days;
        document.getElementById('res-trav').innerText = people;
        document.getElementById('res-cost').innerText = `₹${totalCost.toLocaleString('en-IN')}`;

        // Show result panel
        calcResult.classList.remove('hidden');
    });


    // --- 4. Intersection Observer for Scroll Animations ---
    // We specify multiple animation classes to observe
    const animatedElements = document.querySelectorAll('.reveal, .animate-pop, .reveal-slide-left, .reveal-slide-right');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animating so it doesn't repeat unnecessarily
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));


    // --- 5. Contact Form Mock Submission ---
    const contactForm = document.getElementById('contact-form');
    const submitMsg = document.getElementById('contact-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        btn.innerText = "SENDING REQUEST...";
        btn.style.opacity = '0.7';

        // Simulate API delay
        setTimeout(() => {
            contactForm.classList.add('hidden');
            submitMsg.classList.remove('hidden');
        }, 1200);
    });

});
