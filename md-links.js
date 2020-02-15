const fs = require('fs');
const chalk = require('chalk');

// reading files
const readMdFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(console.log(`Error ${err}`));
            } else {
                // reg expression "match" look for coincidence
                let links = data.match(/\(http([^)]+)\)/gi); 
                    if (links === null) {
                        resolve(console.log(chalk.bold.red('\n' + 'Have not found links at ' + (file) + '\n')));
                    } else {
                        resolve(console.log(chalk.bold.yellow('\n' + 'These all are links')));
                        resolve(console.log(links))
                    }
            } 
        });
    });
};
readMdFile('texto.md');

// } if (links.length === 0) {
//     console.log(chalk.bold.red("We haven´t found any links at: ") + chalk.red.underline(file));
//   } else
//     resolve(links);