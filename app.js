const fs = require('fs');
const path = require('path');
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl;

// // reading files
// const readMdFile = (file) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, "utf-8", (err, data) => {
//             if (err) {
//                 reject(console.log(`Error ${err}`));
//             } else {
//                 // reg expression "match" look for coincidence
//                 let links = data.match(/\(http([^)]+)\)/gi);
//                 if (links === null) {
//                     resolve(console.log('Have not found links at ' + (file)));
//                 } else {
//                     resolve(console.log('\n' + 'These all are links'));
//                     resolve(console.log(links))
//                 }
//             }
//         });
//     });
// };
// readMdFile('README.md');

// // looking for .md file
// // const lookMdFile = file => {
// //     let extFile = path.extname(file);
// //     if (extFile === ".md") {
// //         // console.log("this is a .md file");
// //         return readMdFile(file);
// //     } else {
// //         console.log("This is not a .md file, try another directory or file" + "\n");
// //     }
// // };

// // looking for .md file
// const lookMdFile = (__filename) => {
//     return new Promise((resolve, reject) => {
//         let pathFile = path.extname(__filename);
//         if (pathFile === ".md") {
//             console.log("this is a .md file" + "\n");
//             resolve(console.log(pathFile));
//             return readMdFile(file);
//         } else {
//             reject(console.log("This is not a .md file, try another directory or file" + "\n"));
//         }
//     });
// };
// lookMdFile();

// this gives the file ext
// let pathFile = path.extname(__filename);
// console.log(pathFile)

// url status
const urlStatus = (links) => {
    return new Promise((resolve, reject) => {
        let status;
        fetchLink(links, (error, meta, body) => {
            status = meta.status;
            if (status === 200) {
                resolve(console.log('the file it is OK'));
                resolve(console.log(status));
            } else {
                console.log('This link it is BROKEN');
            }

        });
    });
}
urlStatus('https://docs.npmjs.com/getting-started/publishing-npm-packages');

