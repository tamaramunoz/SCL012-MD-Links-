const fs = require("fs");
const path = require("path");
//const fetch = require("node-fetch");
const fileHound = require("fileHound"); //read directory
const fetch = require('fetch');
const fetchLink = fetch.fetchUrl; 
const isUrl = require('isUrl'); // take all urls
const markDown = require('markdown-it')(); // transform the file in html
const chalk = require('chalk');// color text


const isFileOrDirectory = path => {
      fs.lstat(path, (err, stats) => {
        if (err) {
          console.log(err)
        } else if (stats.isDirectory()) { 
          // console.log("estoy en el directorio");
           goDirectory(path);
        } else {
            // console.log('ir al archivo')
          readMdFile(file);
        }
      });
    
  };
  isFileOrDirectory('pruebas');
  
  
// Imprime en terminal los archivos que concuerden con la extención del formato markdown ".md".
const goDirectory = (path) => {
    return new Promise((resolve, reject) => {
      fileHound.create()
        .discard("node_modules")
        .paths(path)
        .ext(".md")
        .find()
        .then(res => (res.forEach(file => {
          if (file.length != 0) {
            console.log("We have found .md files at: " + file);
            // resolve(readMdFile(file));
          }
        })))
        .catch(err => {
          reject(new Error("Path it is not valid"));
        })
    })
  };

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