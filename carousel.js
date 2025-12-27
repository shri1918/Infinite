function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 3000; // 3 seconds

    // Show current slide
    function showSlide(index) {
        // Hide all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and update dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
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
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    if (slides.length > 0) {
        // Set initial active states
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
            if (index === 0) {
                slide.style.display = 'block';
                slide.classList.add('active');
            }
        });
        
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        
        // Start auto slide after a small delay to ensure DOM is ready
        setTimeout(() => {
            startAutoSlide();
        }, 1000);
    }
}

// Wait for DOM to be fully loaded
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
            initCarousel(carousel);
        });
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousels);
} else {
    initializeCarousels();
}
