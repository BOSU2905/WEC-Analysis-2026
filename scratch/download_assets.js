const fs = require('fs');
const path = require('path');

const files = {
    'oreca-07-gibson.jpg': 'File:Oreca_07_-_Gibson_-_IDEC_Sport_Racing_-_2019_24_Hours_of_Le_Mans.jpg',
    'aston-martin-vantage-v8.jpg': 'File:Aston_Martin_Vantage_V8_2012_WEC_Fuji.jpg',
    'porsche-911-rsr.jpg': 'File:Porsche_GT_Team_-_Porsche_911_RSR_-92_(28098279377).jpg',
    'toyota-ts050-hybrid.jpg': 'File:No.8_Toyota_TS050_Hybrid.jpg',
    'porsche-919-hybrid.jpg': 'File:2015_Porsche_919_Hybrid_(19809197974).jpg'
};

const baseUrl = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=';
const assetsDir = path.join(__dirname, 'web', 'src', 'assets', 'machines');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

async function download() {
    for (const [name, title] of Object.entries(files)) {
        try {
            const apiResp = await fetch(baseUrl + encodeURIComponent(title), {
                headers: { 'User-Agent': 'AntigravityAgent/1.0' }
            });
            const data = await apiResp.json();
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            
            if (page.imageinfo && page.imageinfo.length > 0) {
                const imgUrl = page.imageinfo[0].url;
                console.log(`Downloading ${name} from ${imgUrl}`);
                
                const imgResp = await fetch(imgUrl, {
                    headers: { 'User-Agent': 'AntigravityAgent/1.0' }
                });
                const buffer = await imgResp.arrayBuffer();
                fs.writeFileSync(path.join(assetsDir, name), Buffer.from(buffer));
                console.log(`Saved ${name}`);
            } else {
                console.log(`No image info for ${title}`);
            }
        } catch (e) {
            console.log(`Error fetching ${title}: ${e}`);
        }
    }
}

download();
