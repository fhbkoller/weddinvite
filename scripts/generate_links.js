const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const inputFile = process.argv[2] || 'guests.csv';
const baseDir = path.join(__dirname, '..');

if (!fs.existsSync(path.join(baseDir, inputFile))) {
    console.error(`Error: File ${inputFile} not found in the root directory.`);
    process.exit(1);
}

const fileContent = fs.readFileSync(path.join(baseDir, inputFile), 'utf-8');
const lines = fileContent.split('\n').map(l => l.trim()).filter(l => l);

const guests = {};
const links = [];
// Feel free to update this if you change your domain
const baseUrl = 'https://example.com/wedding'; 

for (let i = 0; i < lines.length; i++) {
    const cols = lines[i].split(',');
    
    // Skip header if present
    if (i === 0 && (cols[0].toLowerCase() === 'name' || cols[0].toLowerCase() === 'nome')) {
        continue;
    }
    
    let name = cols[0].trim();
    // Remove quotes if present
    if (name.startsWith('"') && name.endsWith('"')) {
        name = name.slice(1, -1);
    }
    
    if (name) {
        // Generate an 8-character hex string as a unique ID
        const id = crypto.randomBytes(4).toString('hex');
        guests[id] = name;
        
        // Ensure name is properly escaped for CSV if it contains commas
        const csvName = name.includes(',') ? `"${name}"` : name;
        links.push(`${csvName},${baseUrl}?id=${id}`);
    }
}

// Write the mapping for the frontend to use
fs.writeFileSync(path.join(baseDir, 'guests.json'), JSON.stringify(guests, null, 2));

// Write the CSV for the couple to share the links
fs.writeFileSync(path.join(baseDir, 'generated_links.csv'), `Name,Link\n${links.join('\n')}`);

console.log(`Generated links for ${Object.keys(guests).length} guests.`);
console.log(`Output: guests.json (Frontend map) and generated_links.csv (Your shareable links)`);
