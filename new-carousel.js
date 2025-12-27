class InfiniteCarousel {
    constructor(container) {
        this.container = container;
        this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
        this.dots = Array.from(container.querySelectorAll('.dot'));
        this.prevBtn = container.querySelector('.carousel-control.prev');
        this.nextBtn = container.querySelector('.carousel-control.next');
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        // Show first slide
        this.showSlide(this.currentIndex);

        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto slide
        this.startAutoSlide();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });

        // Deactivate all dots
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        if (this.slides[index]) {
            this.slides[index].style.display = 'block';
            this.slides[index].classList.add('active');
        }

        // Activate current dot
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentIndex);
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.showSlide(this.currentIndex);
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Initialize all carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        new InfiniteCarousel(container);
    });
});
