const fs = require('fs');
const path = require('path');
const fileHound = require("fileHound"); //read directory
// const fetch = require('node-fetch');
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl;
const isUrl = require('isUrl'); // take all urls
const markDown = require('markdown-it')(); // transform the file in html
const chalk = require('chalk');// color text


// reading files
const readMdFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(console.log(`Error ${err}`));
            } else {
                lookForUrl(data);
                urlStats(data);
            };
        })
    })
};

// looking for .md file
const lookMdFile = (file) => {
    let extFile = path.extname(file);
    if (extFile === ".md") {
        readMdFile(file);
        // console.log("this is a .md file");
    } else {
        // console.log("This is not a .md file, try another file" + "\n");
    }
};
lookMdFile('README.md')
// .then(res => console.log(readMdFile(file))).catch(err => console.log(err));

// look for url
const lookForUrl = (data) => {
    let resultMd = markDown.render(data);
    let linkLine = resultMd.split('\n');
    linkLine.forEach(element => {
        if (element.includes('http')) {
            let cleanUrl = element.substring(element.indexOf('http'), element.indexOf('">'));
            urlValidate(cleanUrl);
        }
    });
};

// url validation
const urlValidate = (links) => {
    let status;
    fetchLink(links, (error, meta, body) => { 
      if(meta != undefined){
        status = meta.status;
        if (status === 200) {
          console.log(chalk.greenBright('This link it is OK ' + status + ' ' + links));
        }else{
          //console.log(chalk.red('This link it is BROKEN ' + status + ' ' + links));
        }
      } 
    });
  };

// url status
const urlStats = (data) => {
    let resultMd = markDown.render(data);
    let linkLine = resultMd.split('\n');
    let totalLinks = 0;
    linkLine.forEach(element => {
        if (element.includes('http')) {
            totalLinks = totalLinks + 1;
        }
    });
    // console.log(chalk.bold.yellow('Total Links: '+ totalLinks));
};
