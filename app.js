const fs = require('fs');
const path = require('path');

// fs.readFile('README.md', 'utf-8', (err, data) => {
//     if(err){
//         console.log(`Error ${err}`);
//     }else{
//         console.log(data);
//     }
// });

let pathObj = path.parse(__filename);
console.log(pathObj);

// funcion que busca archivos .md
const goMdFile = file => {
    let extFile = path.extname(file);
    if (extFile === ".md") {
      // console.log("es un archivo .md");
      return readMdFile(file);
    } else {
      console.log("Este no es un archivo con extension .md, intenta con otro archivo o directorio" + "\n");
    }
  };
  