const fs = require('fs');
const files = ['index.html', 'privacy.html', 'terms.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/href="\/index\.html/g, 'href="index.html');
    content = content.replace(/href="\/terms\.html/g, 'href="terms.html');
    content = content.replace(/href="\/privacy\.html/g, 'href="privacy.html');
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
});
