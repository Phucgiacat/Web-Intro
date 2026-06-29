const fs = require('fs');

const files = ['privacy.html', 'terms.html', 'delivery.html', 'payment.html', 'refund.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove TOC sidebar
    content = content.replace(/<aside class="toc-sidebar">[\s\S]*?<\/aside>/, '');

    // Change grid layout to center content
    content = content.replace(/grid-template-columns:\s*280px\s*1fr;/, 'grid-template-columns: 1fr; max-width: 900px; margin: 0 auto;');

    // For the 4 new files, remove the intro text from privacy
    if (file !== 'privacy.html') {
        content = content.replace(/<p class="intro-text">Tại Neo AI, sứ mệnh của chúng tôi[\s\S]*?<\/p>/, '');
        content = content.replace(/<p class="intro-text">Tại NEO AI, chúng tôi cam kết tôn trọng quyền riêng tư[\s\S]*?<\/p>/, '');
    }

    fs.writeFileSync(file, content);
    console.log('Cleaned ' + file);
});
