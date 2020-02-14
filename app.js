const fs = require('fs');
const path = require('path');
const fetchUrl = fetch.fetchUrl;

// // funcion MD-Links
// const mdLinks = (path, options) => {
//     return new Promise((resolve, reject) => {


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

// fs.readFile('README.md', 'utf-8', (err, data) => {
//     if(err){
//         console.log(`Error ${err}`);
//     }else{
//         console.log(data);
//     }
// });

// looking for .md file
// const lookMdFile = file => {
//     let extFile = path.extname(file);
//     if (extFile === ".md") {
//         // console.log("this is a .md file");
//         return readMdFile(file);
//     } else {
//         console.log("This is not a .md file, try another directory or file" + "\n");
//     }
// };

// looking for .md file
const lookMdFile = (__filename) => {
    return new Promise((resolve, reject) => {
        let pathFile = path.extname(__filename);
        if (pathFile === ".md") {
            console.log("this is a .md file" + "\n");
            resolve(console.log(pathFile));
            return readMdFile(file);
        } else {
            reject(console.log("This is not a .md file, try another directory or file" + "\n"));
        }
    });
};
lookMdFile(__filename);

// this gives the file ext
// let pathFile = path.extname(__filename);
// console.log(pathFile)

// /\(([^)]+)\)/gi;
function validateUrl(link) {
    return new Promise((resolve, reject) => {
      let status;
      fetchUrl(link, function(error, meta, body) {
        status = meta.status;
        resolve(status);
      });
    });
  }
  

