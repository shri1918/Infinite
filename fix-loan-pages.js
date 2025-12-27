// Script to fix common issues across loan pages
const fs = require('fs');
const path = require('path');

// List of loan pages to fix
const loanPages = [
    'loan-products.html',
    'personal-loan.html',
    'home-loan-new.html',
    'business-loan.html',
    'education-loan.html',
    'gold-loan.html',
    'vehicle-loan.html'
];

// Function to update HTML content
function updatePageContent(filePath, content) {
    try {
        // Add logo to navigation
        const logoHtml = `
                <!-- Logo -->
                <div class="nav-logo">
                    <a href="index.html" class="logo-link">
                        <img src="images/icm-logo-golden-lion.jpg" alt="Infinite Capital Management" class="logo-img">
                        <span class="logo-text">ICM</span>
                    </a>
                </div>`;
        
        // Update CSS references
        const updatedContent = content
            .replace(/<link rel="stylesheet" href="[^"]*styles\.css"[^>]*>/g, 
                    '<link rel="stylesheet" href="assets/css/main.css">\n    <link rel="stylesheet" href="css/carousel.css">')
            .replace(/(<nav class="navbar">\s*)(<!-- Profile icon on the left -->\s*\n\s*)?/g, 
                    `$1${logoHtml}\n                `);
        
        // Update active state in navigation
        const pageName = path.basename(filePath);
        const activeNavItem = pageName === 'loan-products.html' ? 'Loan Products' : 
                            pageName.startsWith('personal-') ? 'Personal Loan' :
                            pageName.startsWith('home-') ? 'Home Loan' :
                            pageName.startsWith('business-') ? 'Business Loan' :
                            pageName.startsWith('education-') ? 'Education Loan' :
                            pageName.startsWith('gold-') ? 'Gold Loan' :
                            pageName.startsWith('vehicle-') ? 'Vehicle Loan' : '';
        
        if (activeNavItem) {
            return updatedContent
                .replace(new RegExp(`<a href="[^"]*${pageName}"[^>]*>([^<]*)<\/a>`, 'g'), 
                        `<a href="${pageName}" class="active">$1</a>`)
                .replace(new RegExp(`<a href="[^"]*"[^>]*>${activeNavItem}<\/a>`, 'g'), 
                        `<a href="${pageName}" class="active">${activeNavItem}</a>`);
        }
        
        return updatedContent;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
        return content;
    }
}

// Process each loan page
loanPages.forEach(page => {
    const filePath = path.join(__dirname, page);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const updatedContent = updatePageContent(filePath, content);
        
        if (updatedContent !== content) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated ${page}`);
        } else {
            console.log(`ℹ️  No changes needed for ${page}`);
        }
    } else {
        console.log(`⚠️  File not found: ${page}`);
    }
});

console.log('\n🎉 All loan pages have been updated!');
