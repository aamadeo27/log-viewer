const fs = require('fs')

const dir = {
    list(directory){
        
        return new Promise( (resolve, reject) => fs.readdir( directory , (err, files) => {
            if ( err ) reject(err)
            else resolve(files)
        }))
    }
}

module.exports = dir