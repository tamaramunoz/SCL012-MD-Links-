const fs = require('fs');
const path = require('path');
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl;
const isUrl = require('isUrl'); // take all urls
const markDown = require('markdown-it')(); // transform the file in html
const chalk = require('chalk'); // color text

// main function md-Links
const mdLinks = (file, data, links) => {
  return new Promise((resolve, reject) => {
    resolve
      .then(res => {
        resolve(res)
        readMdFile(file);
        lookForUrl(data);
        urlValidate(links);
        urlStats(data);

      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
};

// _____________
let userPath = process.argv[2];
if (!path.isAbsolute(userPath)) {
  userPath = path.normalize(userPath);
  userPath = path.resolve(userPath);
  console.log(chalk.magenta('This is the directory root: ' + userPath)); 
}

// Reading directory
exports.dirContent = (userPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(userPath, function (error, data) {
      if (error) return reject(error);
      return resolve(data)
    })
  })
}

exports.dirContent(userPath)
  .then(data => {
    data.forEach(function (file) {
      let extFile = path.extname(file);
      if (extFile === '.md') {
        readMdFile(file);
        console.log(chalk.magentaBright('Have found this .md file: ' + file));
      } else {
        console.log(chalk.yellow('Have not found a .md file, try another directory ' + '\n'));
      }
    })
  })
  .catch(error => console.log(chalk.redBright('Invalid root. Please, enter a right DIRECTORY ' + error)));

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

// look for url
const lookForUrl = (data) => {
  let resultMd = markDown.render(data); // transform in html
  let linkLine = resultMd.split('\n'); // cut all things after an enter
  linkLine.forEach(element => {
    if (element.includes('http')) {
      let cleanUrl = element.substring(element.indexOf('http'), element.indexOf('">'));
      urlValidate(cleanUrl);
    }
  });
};

// url validation
const urlValidate = (links) => {
  fetchLink(links, (error, meta, body) => {
    if (meta != undefined) {
      status = meta.status;
      if (status === 200) {
        console.log(chalk.greenBright('Link OK, status: ' + status + ' ' + links));
      } else {
        console.log(chalk.red('Link BROKEN, status: ' + status + ' ' + links));
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
  console.log(chalk.yellow('Total Links: ' + totalLinks));
};

module.exports = {
  mdLinks,
  readMdFile,
  lookForUrl,
  urlValidate,
  urlStats
};
