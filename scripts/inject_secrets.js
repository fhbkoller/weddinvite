const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, '..', 'public');

// 1. Generate individual guest files
const guestsEnv = process.env.GUESTS_JSON;
if (guestsEnv) {
    try {
        const guests = JSON.parse(guestsEnv);
        const guestsDir = path.join(publicDir, 'guests');
        if (!fs.existsSync(guestsDir)) fs.mkdirSync(guestsDir, { recursive: true });
        for (const [id, name] of Object.entries(guests)) {
            fs.writeFileSync(path.join(guestsDir, `${id}.json`), JSON.stringify({ name }));
        }
        console.log(`Generated ${Object.keys(guests).length} guest files.`);
    } catch (e) {
        console.error('Failed to parse GUESTS_JSON:', e);
    }
}

console.log('--- DEBUG ENVS ---');
console.log('GUESTS_JSON is set:', !!process.env.GUESTS_JSON);
console.log('WEDDING_DATE_TIME is set:', !!process.env.WEDDING_DATE_TIME);
console.log('WEDDING_DATE_TEXT is set:', !!process.env.WEDDING_DATE_TEXT);
console.log('WEDDING_NAMES is set:', !!process.env.WEDDING_NAMES);
console.log('WEDDING_SHORT_NAMES is set:', !!process.env.WEDDING_SHORT_NAMES);
console.log('CEREMONY_LOCATION is set:', !!process.env.CEREMONY_LOCATION);
console.log('RECEPTION_NAME is set:', !!process.env.RECEPTION_NAME);
console.log('RECEPTION_ADDRESS is set:', !!process.env.RECEPTION_ADDRESS);
console.log('WEDDING_URL is set:', !!process.env.WEDDING_URL);
console.log('CASAR_PHOTO_1_URL is set:', !!process.env.CASAR_PHOTO_1_URL);
console.log('CASAR_PHOTO_3_URL is set:', !!process.env.CASAR_PHOTO_3_URL);
console.log('------------------');

// 2. Inject Config & URLs into HTML
let indexHtmlPath = path.join(publicDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');

    console.log('--- PLACEHOLDERS IN HTML ---');
    console.log('Contains "João e Maria":', html.includes('João e Maria'));
    console.log('Contains "João &amp; Maria":', html.includes('João &amp; Maria'));
    console.log('Contains "J&amp;M":', html.includes('J&amp;M'));
    console.log('Contains "2099-12-31":', html.includes('2099-12-31'));
    console.log('Contains "Local da Cerimônia":', html.includes('Local da Cerimônia Fictícia'));
    console.log('----------------------------');
    
    if (process.env.WEDDING_DATE_TIME) html = html.replace(/2099-12-31 15:30:00/g, process.env.WEDDING_DATE_TIME);
    if (process.env.WEDDING_DATE_TEXT) html = html.replace(/Sábado, 31 de Dezembro de 2099/g, process.env.WEDDING_DATE_TEXT);
    if (process.env.WEDDING_NAMES) {
        html = html.replace(/João e Maria/g, process.env.WEDDING_NAMES);
        html = html.replace(/João &amp; Maria/g, process.env.WEDDING_NAMES.replace(/&/g, '&amp;'));
    }
    if (process.env.WEDDING_SHORT_NAMES) {
        html = html.replace(/J&amp;M/g, process.env.WEDDING_SHORT_NAMES.replace(/&/g, '&amp;'));
    }
    if (process.env.CEREMONY_LOCATION) html = html.replace(/Local da Cerimônia Fictícia/g, process.env.CEREMONY_LOCATION);
    if (process.env.RECEPTION_NAME) html = html.replace(/Recepção Fictícia/g, process.env.RECEPTION_NAME);
    if (process.env.RECEPTION_ADDRESS) html = html.replace(/Endereço Fictício da Recepção, 123/g, process.env.RECEPTION_ADDRESS);
    if (process.env.WEDDING_URL) html = html.replace(/https:\/\/example\.com\/wedding/g, process.env.WEDDING_URL);

    fs.writeFileSync(indexHtmlPath, html);
    console.log('Injected config into index.html');
}

// 3. Download Assets
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307 || response.statusCode === 308) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const assetsToDownload = [
    { env: 'CASAR_PHOTO_1_URL', path: 'assets/images/casar_photo_1.jpg' },
    { env: 'CASAR_PHOTO_3_URL', path: 'assets/images/casar_photo_3.jpg' }
];

Promise.all(assetsToDownload.map(async item => {
    if (process.env[item.env]) {
        try {
            await downloadFile(process.env[item.env], path.join(publicDir, item.path));
            console.log(`Downloaded ${item.path}`);
        } catch (e) {
            console.error(`Failed to download ${item.path}:`, e);
        }
    }
})).then(() => {
    console.log('Asset injection complete.');
});
