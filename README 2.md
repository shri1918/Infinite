# Infinite Capital Management - Loan Website

A modern, responsive website for Infinite Capital Management, providing loan services with a focus on user experience and trust-building design.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Interactive Loan Calculator**: Real-time EMI calculation
- **Modern UI/UX**: Clean design with smooth animations
- **Fast Performance**: Optimized assets and code for quick loading
- **SEO Optimized**: Structured for better search engine visibility

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins & Inter)
- Font Awesome Icons

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Open the project folder:
   ```bash
   cd loan-website
   ```

3. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local server (e.g., Live Server in VS Code)

## Project Structure

```
loan-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # Main JavaScript file
└── README.md           # Project documentation
```

## Customization

### Colors

Primary colors can be customized by updating the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #0F52BA;
    --primary-dark: #003366;
    --secondary-color: #FF8C00;
    --accent-color: #FFD700;
    --text-dark: #333333;
    --text-light: #666666;
    --light-bg: #F5F7FA;
    --white: #FFFFFF;
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the link in `index.html` and the corresponding font-family in `style.css`.

## Features in Detail

### Loan Calculator

The interactive EMI calculator allows users to:
- Adjust loan amount using a slider
- Modify interest rates
- Change loan tenure
- See real-time EMI updates

### Responsive Navigation

- Mobile-friendly hamburger menu
- Smooth scrolling to sections
- Sticky header on scroll

### Performance Optimizations

- Minified assets
- Lazy loading for images
- Optimized animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS/Android)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) for placeholder images

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loan Products - Infinite Capital Management</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Main CSS -->
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <!-- Logo -->
                <div class="nav-logo">
                    <a href="index.html" class="logo-link">
                        <img src="logonew.png" alt="ICM Logo" class="logo-img">
                        <span class="logo-text">ICM</span>
                    </a>
                </div>
                
                <!-- Navigation links in the middle -->
                <div class="nav-center">
                    <ul class="nav-links">
                        <li><a href="index.html" class="active">Home</a></li>
                        <li class="nav-dropdown">
                            <a href="loan-products.html" class="dropdown-toggle">Loan Products <i class="fas fa-chevron-down"></i></a>
                            <div class="dropdown-menu">
                                <a href="personal-loan.html" class="dropdown-item">
                                    <i class="fas fa-wallet"></i>
                                    <div>
                                        <strong>Personal Loan</strong>
                                        <span>Up to ₹50 Lakhs</span>
                                    </div>
                                </a>
                                <a href="home-loan-new.html" class="dropdown-item">
                                    <i class="fas fa-home"></i>
                                    <div>
                                        <strong>Home Loan</strong>
                                        <span>Up to ₹5 Crores</span>
                                    </div>
                                </a>
                                <a href="business-loan.html" class="dropdown-item">
                                    <i class="fas fa-briefcase"></i>
                                    <div>
                                        <strong>Business Loan</strong>
                                        <span>Up to ₹2 Crores</span>
                                    </div>
                                </a>
                                <a href="vehicle-loan.html" class="dropdown-item">
                                    <i class="fas fa-car"></i>
                                    <div>
                                        <strong>Vehicle Loan</strong>
                                        <span>Cars & Two Wheelers</span>
                                    </div>
                                </a>
                                <a href="education-loan.html" class="dropdown-item">
                                    <i class="fas fa-graduation-cap"></i>
                                    <div>
                                        <strong>Education Loan</strong>
                                        <span>Study in India & Abroad</span>
                                    </div>
                                </a>
                                <a href="gold-loan.html" class="dropdown-item">
                                    <i class="fas fa-coins"></i>
                                    <div>
                                        <strong>Gold Loan</strong>
                                        <span>Instant Approval</span>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li><a href="free-credit-score.html">Free Credit Score</a></li>
                        <li><a href="partner-with-us.html">Partner with Us</a></li>
                        <li><a href="blog.html">Blog</a></li>
                    </ul>
                </div>
                
                <!-- Apply button on the right -->
                <div class="nav-actions">
                    <a href="apply-for-loan.html" class="btn btn-primary">Apply for Loan</a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-light) 100%);">
        <div class="container">
            <div class="section-header">
                <span class="section-subtitle">Financial Solutions</span>
                <h1 class="section-title">Our Loan Products</h1>
                <p class="section-description">Choose from our wide range of loan products designed to meet your specific financial needs with competitive rates and flexible terms.</p>
            </div>
        </div>
    </section>

    <!-- Loan Products Section -->
    <section class="featured-loans">
        <div class="container">
            <div class="loan-grid">
                <!-- Personal Loan -->
                <div class="loan-card featured">
                    <div class="loan-badge">Most Popular</div>
                    <div class="loan-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <h3>Personal Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹50 Lakhs</li>
                        <li>✓ Interest rates starting at 10.49% p.a.</li>
                        <li>✓ Flexible tenure up to 7 years</li>
                        <li>✓ Quick approval & disbursal</li>
                        <li>✓ Minimal documentation</li>
                        <li>✓ No collateral required</li>
                    </ul>
                    <a href="personal-loan.html" class="btn btn-primary">Apply Now</a>
                </div>
                
                <!-- Home Loan -->
                <div class="loan-card">
                    <div class="loan-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Home Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹5 Crores</li>
                        <li>✓ Interest rates starting at 8.40% p.a.</li>
                        <li>✓ Tenure up to 30 years</li>
                        <li>✓ Balance transfer facility</li>
                        <li>✓ Top-up loan available</li>
                        <li>✓ Tax benefits under Section 80C</li>
                    </ul>
                    <a href="home-loan-new.html" class="btn btn-outline">Know More</a>
                </div>
                
                <!-- Business Loan -->
                <div class="loan-card">
                    <div class="loan-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <h3>Business Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹2 Crores</li>
                        <li>✓ Interest rates starting at 12% p.a.</li>
                        <li>✓ No collateral required</li>
                        <li>✓ Quick processing</li>
                        <li>✓ Flexible repayment options</li>
                        <li>✓ Working capital solutions</li>
                    </ul>
                    <a href="business-loan.html" class="btn btn-outline">Know More</a>
                </div>

                <!-- Education Loan -->
                <div class="loan-card">
                    <div class="loan-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3>Education Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹1 Crore</li>
                        <li>✓ Interest rates starting at 9% p.a.</li>
                        <li>✓ Covers tuition & living expenses</li>
                        <li>✓ Moratorium period available</li>
                        <li>✓ Tax benefits available</li>
                        <li>✓ Study abroad financing</li>
                    </ul>
                    <a href="apply-for-loan.html" class="btn btn-outline">Apply Now</a>
                </div>

                <!-- Vehicle Loan -->
                <div class="loan-card">
                    <div class="loan-icon">
                        <i class="fas fa-car"></i>
                    </div>
                    <h3>Vehicle Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹50 Lakhs</li>
                        <li>✓ Interest rates starting at 8.5% p.a.</li>
                        <li>✓ New & used vehicle financing</li>
                        <li>✓ Tenure up to 7 years</li>
                        <li>✓ Quick approval process</li>
                        <li>✓ Flexible EMI options</li>
                    </ul>
                    <a href="apply-for-loan.html" class="btn btn-outline">Apply Now</a>
                </div>

                <!-- Gold Loan -->
                <div class="loan-card">
                    <div class="loan-icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <h3>Gold Loan</h3>
                    <ul class="loan-features">
                        <li>✓ Loan up to ₹25 Lakhs</li>
                        <li>✓ Interest rates starting at 12% p.a.</li>
                        <li>✓ Instant approval</li>
                        <li>✓ Flexible tenure options</li>
                        <li>✓ Minimal documentation</li>
                        <li>✓ Safe gold storage</li>
                    </ul>
                    <a href="apply-for-loan.html" class="btn btn-outline">Apply Now</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="section bg-light">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Why Choose Infinite Capital?</h2>
                <p class="section-description">We provide comprehensive financial solutions with customer-centric approach</p>
            </div>
            
            <div class="financial-grid">
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3>Quick Processing</h3>
                    <p>Get loan approval within 24-48 hours with our streamlined digital process and minimal documentation requirements.</p>
                </div>
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <h3>Competitive Rates</h3>
                    <p>Enjoy some of the most competitive interest rates in the market with transparent pricing and no hidden charges.</p>
                </div>
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Secure & Reliable</h3>
                    <p>Your data and transactions are protected with bank-grade security measures and complete privacy assurance.</p>
                </div>
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3>Personalized Service</h3>
                    <p>Get dedicated relationship manager support and customized loan solutions tailored to your specific needs.</p>
                </div>
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Digital Experience</h3>
                    <p>Complete loan application process online with real-time tracking and instant status updates on your mobile.</p>
                </div>
                <div class="financial-card">
                    <div class="financial-icon">
                        <i class="fas fa-award"></i>
                    </div>
                    <h3>Trusted Brand</h3>
                    <p>Over 10,000+ satisfied customers trust us for their financial needs with 98% customer satisfaction rating.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white;">
        <div class="container text-center">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: white;">Ready to Get Started?</h2>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">
                Choose the loan that best fits your needs and apply online in just a few minutes. Our experts are here to help you every step of the way.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="apply-for-loan.html" class="btn btn-lg" style="background: white; color: var(--primary-color); border-color: white;">Apply for Loan</a>
                <a href="tel:+918127090456" class="btn btn-lg btn-secondary" style="border-color: white; color: white;">Call Us Now</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-about">
                    <div class="footer-logo">
                        <img src="images/icm-logo-golden-lion.jpg" alt="ICM">
                        <span>ICM</span>
                    </div>
                    <p>Your trusted partner for all your financial needs. We provide transparent and hassle-free loan solutions.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="loan-products.html">Loan Products</a></li>
                        <li><a href="partner-with-us.html">Partner with Us</a></li>
                        <li><a href="free-credit-score.html">Free Credit Score</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact Us</h4>
                    <p><i class="fas fa-map-marker-alt"></i> 123 Financial District, Mumbai, India</p>
                    <p><i class="fas fa-phone"></i> +9181270 90456</p>
                    <p><i class="fas fa-envelope"></i> info@infinitecapmanagement.com</p>
                </div>
                <div class="footer-newsletter">
                    <h4>Newsletter</h4>
                    <p>Subscribe to our newsletter for financial tips and updates.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Your Email Address" required>
                        <button type="submit"><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 Infinite Capital Management. All Rights Reserved.</p>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Disclaimer</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js" defer></script>
</body>
</html>


