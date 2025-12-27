document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Loan Calculator Functionality
    const loanAmount = document.getElementById('loan-amount');
    const interestRate = document.getElementById('interest-rate');
    const loanTenure = document.getElementById('loan-tenure');
    const loanAmountValue = document.getElementById('loan-amount-value');
    const interestRateValue = document.getElementById('interest-rate-value');
    const loanTenureValue = document.getElementById('loan-tenure-value');
    const emiAmount = document.getElementById('emi-amount');

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Calculate EMI
    function calculateEMI() {
        const principal = parseFloat(loanAmount.value);
        const rate = parseFloat(interestRate.value) / 12 / 100; // Monthly interest rate
        const time = parseFloat(loanTenure.value) * 12; // Convert years to months

        // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
        const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
        
        // Update EMI display
        emiAmount.textContent = formatNumber(emi.toFixed(0));
    }

    // Event Listeners for Calculator
    if (loanAmount && loanAmountValue) {
        loanAmount.addEventListener('input', function() {
            loanAmountValue.textContent = formatNumber(this.value);
            calculateEMI();
        });
    }

    if (interestRate && interestRateValue) {
        interestRate.addEventListener('input', function() {
            interestRateValue.textContent = this.value;
            calculateEMI();
        });
    }

    if (loanTenure && loanTenureValue) {
        loanTenure.addEventListener('input', function() {
            loanTenureValue.textContent = this.value;
            calculateEMI();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--white)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Initialize calculator on page load
    if (loanAmount && loanAmountValue) {
        loanAmountValue.textContent = formatNumber(loanAmount.value);
    }
    if (interestRate && interestRateValue) {
        interestRateValue.textContent = interestRate.value;
    }
    if (loanTenure && loanTenureValue) {
        loanTenureValue.textContent = loanTenure.value;
    }
    calculateEMI();
});
