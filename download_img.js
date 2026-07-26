const https = require('https');
const fs = require('fs');

const url = 'https://images.unsplash.com/photo-1541888087-b5523b0c345c?q=80&w=1600&auto=format&fit=crop';
const dest = '../../brain/8449d998-1892-4797-9722-c13cb25f75cf/real_airport_construction.jpg';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
    if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res2) => {
            res2.pipe(fs.createWriteStream(dest));
        });
    } else {
        res.pipe(fs.createWriteStream(dest));
    }
});
