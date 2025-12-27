// Global carousel state
let carouselState = {
    slides: null,
    dots: null,
    currentSlide: 0,
    slideInterval: null,
    slideDuration: 4000,
    touchStartX: 0,
    touchEndX: 0
};

document.addEventListener('DOMContentLoaded', function() {
    // console.log('🚀 Carousel script loaded');
    carouselState.slides = document.querySelectorAll('.carousel-slide');
    carouselState.dots = document.querySelectorAll('.carousel-dot');
    
    // console.log('📊 Slides found:', carouselState.slides.length);
    // console.log('📊 Dots found:', carouselState.dots.length);

    // Go to specific slide
    function goToSlide(n) {
        if (!carouselState.slides || carouselState.slides.length === 0) {
            console.error('❌ No slides available!');
            return;
        }
        
        console.log('🔄 goToSlide called with n:', n, 'currentSlide:', carouselState.currentSlide);
        
        // Reset all slides and dots
        carouselState.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        carouselState.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Update current slide index
        carouselState.currentSlide = (n + carouselState.slides.length) % carouselState.slides.length;
        
        // console.log('📍 New currentSlide:', carouselState.currentSlide);
        
        // Show current slide and dot
        if (carouselState.slides[carouselState.currentSlide]) {
            carouselState.slides[carouselState.currentSlide].classList.add('active');
            // console.log('✅ Slide', carouselState.currentSlide, 'activated');
        } else {
            console.error('❌ Slide', carouselState.currentSlide, 'not found!');
        }
        if (carouselState.dots[carouselState.currentSlide]) {
            carouselState.dots[carouselState.currentSlide].classList.add('active');
            // console.log('✅ Dot', carouselState.currentSlide, 'activated');
        }
    }
    
    // Next slide
    function nextSlide() {
        // console.log('➡️ nextSlide() called - currentSlide:', carouselState.currentSlide);
        goToSlide(carouselState.currentSlide + 1);
        resetSlideTimer();
    }
    
    // Previous slide
    function prevSlide() {
        // console.log('⬅️ prevSlide() called - currentSlide:', carouselState.currentSlide);
        goToSlide(carouselState.currentSlide - 1);
        resetSlideTimer();
    }
    
    // Start auto-sliding
    function startSlideShow() {
        if (carouselState.slideInterval) clearInterval(carouselState.slideInterval);
        carouselState.slideInterval = setInterval(nextSlide, carouselState.slideDuration);
    }
    
    // Pause auto-sliding
    function pauseSlideShow() {
        clearInterval(carouselState.slideInterval);
    }
    
    // Reset slide timer
    function resetSlideTimer() {
        pauseSlideShow();
        startSlideShow();
    }
    
    // Make functions globally accessible for inline onclick
    window.carouselNextSlide = function() {
        // console.log('🌐 Global carouselNextSlide() called');
        if (typeof nextSlide === 'function') {
            nextSlide();
        } else {
            console.error('❌ nextSlide function not available!');
        }
    };
    window.carouselPrevSlide = function() {
        // console.log('🌐 Global carouselPrevSlide() called');
        if (typeof prevSlide === 'function') {
            prevSlide();
        } else {
            console.error('❌ prevSlide function not available!');
        }
    };
    
    // Initialize the carousel
    function initCarousel() {
        if (!carouselState.slides || carouselState.slides.length === 0) {
            console.error('❌ No carousel slides found!');
            return;
        }
        
        // Show first slide
        carouselState.slides[0].classList.add('active');
        if (carouselState.dots.length > 0) carouselState.dots[0].classList.add('active');
        
        // Add navigation arrow event listeners - same approach as dots
        const prevButton = document.getElementById('carouselPrev');
        const nextButton = document.getElementById('carouselNext');
        
        console.log('🔍 Carousel buttons search:', { 
            prevButton: prevButton ? '✅ Found' : '❌ NOT FOUND', 
            nextButton: nextButton ? '✅ Found' : '❌ NOT FOUND' 
        });
        
        if (prevButton) {
            const prevStyles = window.getComputedStyle(prevButton);
            // console.log('🔍 Previous button info:', {
            //     zIndex: prevStyles.zIndex,
            //     pointerEvents: prevStyles.pointerEvents,
            //     display: prevStyles.display,
            //     visibility: prevStyles.visibility,
            //     opacity: prevStyles.opacity
            // });
            
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Previous button CLICK event fired!');
                console.log('📍 Before prevSlide - currentSlide:', carouselState.currentSlide);
                prevSlide();
                console.log('📍 After prevSlide - currentSlide:', carouselState.currentSlide);
                resetSlideTimer();
            });
            
            // Test click with direct function call
            prevButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Previous button ONCLICK fired!');
                prevSlide();
                resetSlideTimer();
                return false;
            };
        } else {
            console.error('❌ Previous button not found!');
        }
        
        if (nextButton) {
            const nextStyles = window.getComputedStyle(nextButton);
            // console.log('🔍 Next button info:', {
            //     zIndex: nextStyles.zIndex,
            //     pointerEvents: nextStyles.pointerEvents,
            //     display: nextStyles.display,
            //     visibility: nextStyles.visibility,
            //     opacity: nextStyles.opacity
            // });
            
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // console.log('🖱️ Next button CLICK event fired!');
                // console.log('📍 Before nextSlide - currentSlide:', carouselState.currentSlide);
                nextSlide();
                // console.log('📍 After nextSlide - currentSlide:', carouselState.currentSlide);
                resetSlideTimer();
            });
            
            // Test click with direct function call
            nextButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                // console.log('🖱️ Next button ONCLICK fired!');
                nextSlide();
                resetSlideTimer();
                return false;
            };
        } else {
            console.error('❌ Next button not found!');
        }
        
        // Add dot navigation event listeners
        carouselState.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // console.log('🖱️ Dot', index, 'clicked');
                goToSlide(index);
                resetSlideTimer();
            });
        });
        
        // Start auto-sliding
        startSlideShow();
        
        // Pause on hover
        const carousel = document.querySelector('.loan-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', pauseSlideShow);
            carousel.addEventListener('mouseleave', startSlideShow);
            
            // Touch events for mobile
            carousel.addEventListener('touchstart', function(e) {
                carouselState.touchStartX = e.changedTouches[0].screenX;
                pauseSlideShow();
            }, { passive: true });
            
            carousel.addEventListener('touchend', function(e) {
                carouselState.touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startSlideShow();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const difference = carouselState.touchStartX - carouselState.touchEndX;
            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Pause carousel when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseSlideShow();
        } else {
            startSlideShow();
        }
    });
});
