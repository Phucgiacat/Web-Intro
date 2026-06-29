const fs = require('fs');
const path = require('path');

const files = ['privacy.html', 'terms.html', 'delivery.html', 'payment.html', 'refund.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove the TOC sidebar completely from all pages
    content = content.replace(/<aside class="toc-sidebar">[\s\S]*?<\/aside>/, '');

    // 2. Change the layout CSS to remove the left sidebar space
    content = content.replace(/grid-template-columns:\s*280px\s*1fr;/, 'grid-template-columns: 1fr; max-width: 900px; margin: 0 auto;');

    // 3. For the 4 new pages (not privacy.html), remove the generic privacy intro text under the h1
    if (file !== 'privacy.html') {
        content = content.replace(/<div class="privacy-header">\s*<h1>(.*?)<\/h1>[\s\S]*?<\/div>/, '<div class="privacy-header">\n      <h1>$1</h1>\n    </div>');
    }

    fs.writeFileSync(file, content);
    console.log('Successfully cleaned ' + file);
});
