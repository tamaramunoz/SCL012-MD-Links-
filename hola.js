const fs = require('fs');
const fetch = require('fetch');
const isUrl = require('isUrl');
const markDown = require('markdown-it')();
const fetchLink = fetch.fetchUrl;

// md-links function


// reading files
const readMdFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        reject(console.log(`Error ${err}`));
      } else {
        lookForUrl(data);
      };
    })  
  })
}
readMdFile('README.md');


// look for url
const lookForUrl = (data) => {
  let resultMd = markDown.render(data);
  let linkLine = resultMd.split('\n');
  linkLine.forEach(element => {
    if (element.includes('http')) {
      let cleanUrl = element.substring(element.indexOf('http'),element.indexOf('">'));
      urlValidate(cleanUrl);
    }
  });
};

// url status
const urlValidate = (links) => {
  let status;
  fetchLink(links, (error, meta, body) => { 
    if(meta != undefined){
      status = meta.status;
      if (status === 200) {
        (console.log('the file it is OK'));
      }
    }else{
      console.log('This link it is BROKEN');
    }
  });
};
