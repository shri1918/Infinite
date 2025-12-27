document.addEventListener('DOMContentLoaded', function() {
    const loanTypes = document.querySelectorAll('.loan-type');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    // Show current slide
    function showSlide(index) {
        // Hide all slides
        loanTypes.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and update dot
        loanTypes[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % loanTypes.length;
        showSlide(currentIndex);
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + loanTypes.length) % loanTypes.length;
        showSlide(currentIndex);
    }

    // Start auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause on hover
    const slider = document.querySelector('.loan-types-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    showSlide(0);
    startAutoSlide();
});
