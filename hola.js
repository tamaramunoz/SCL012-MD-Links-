// const fetchUrl = fetch.fetchUrl;
// const fetchUrl = require('./README.md').fetchUrl;
const fs = require('fs');
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl;

// reading files
// const readMdFile = (file) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, "utf-8", (err, data) => {
//             if (err) {
//                 reject(console.log(`Error ${err}`));
//             } else {
//                 // reg expression "match" look for coincidence
//                 let links = data.match(/\(http([^)]+)\)/gi); 
//                     if (links === null) {
//                         resolve(console.log('Have not found links at ' + (file)));
//                     } else {
//                         resolve(console.log('\n' + 'These all are links'));
//                         // resolve(console.log(links))
//                     }
//             } 
//         });
//     });
// };
// readMdFile('README.md');

// url validation
function validateUrl(links) {
    return new Promise((resolve, reject) => {
      let status;
      fetchLink(links, (error, meta, body) => { 
        status = meta.status;
        if(status === 200) {
            resolve(console.log('the file it is OK'));
            resolve(console.log(status));
        } else {
            console.log('This link it is BROKEN');
        }
        
      });
    });
  }
validateUrl('https://github.com/Laboratia/SCL012-MD-Links-');

// let statusLinks = links.map(link => {
//     // links.map(link => {
//     return fetch(link.href).then(res => {
//       if (res.status === 200) {
//         link.status = res.status;
//         link.response = "O.K.";
//         //console.log("LINK O.K.", link.response);
//       } else {
//         link.status = res.status;
//         link.response = res.statusText;
//         link.response = "FAIL";
//         //console.log("LINK FAIL", link.response);
//       }