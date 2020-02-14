// const fetchUrl = fetch.fetchUrl;
// const fetchUrl = require('./README.md').fetchUrl;
const fs = require('fs');

// reading files
const readMdFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(console.log(`Error ${err}`));
            } else {
                // reg expression "match" look for coincidence
                let links = data.match(/\(http([^)]+)\)/gi); 
                console.log(links);
                resolve(console.log('These all are links' + "\n"));
            }
        });
    });
};
readMdFile('README.md');
