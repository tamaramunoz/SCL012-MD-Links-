const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl; 
const isUrl = require('isUrl'); // take all urls
const markDown = require('markdown-it')(); // transform the file in html
const chalk = require('chalk');// color text

// main function md-links
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate === true && options.stats === true) {
      // fileOrDirectory(path).then(res => {
      //   urlStats(data)
      //     .then(res => {
      //       resolve(res);
      //       console.log("VALIDATE + STATS RESULT:" + "\n");
      //     });
      // });
    } else if (options.validate === false && options.stats === true) {
      fileOrDirectory(path).then(res => {
        urlStats(data).then(res => {
          resolve(res);
          console.log("STATS LINKS RESULT:" + "\n");
        });
      });
    } else if (options.validate === true && options.stats === false) {
      fileOrDirectory(path).then(links => {
        urlValidate(links).then(res => {
          resolve(res);
          console.log("VALIDATE LINKS RESULT:" + "\n");
        });
      });
    } else if (options.validate === false && options.stats === false) {
      fileOrDirectory(path)
        .then(res => {
          resolve(res);
          console.log("LINKS SEARCH RESULT:" + "\n");
        })
        .catch(err => {
          reject(err);
          console.log("Invalid. Please choose one of the following option: --validate | --stats | --validate --stats");
        });
    } else {
      reject(
        console.log("Invalid path")
      );
    }
  });
};

// _____________

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
      totalLinks = totalLinks +1;
    }
  });
    // console.log(chalk.bold.yellow('Total Links: '+ totalLinks));
};

