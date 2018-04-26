const fs = require('fs')

const dir = {
    list(directory){
        
        return new Promise( (resolve, reject) => fs.readdir( directory , (err, files) => {
            if ( err ) return reject(err)
            
            const logs = []

            files.forEach( f => {
                if ( fs.statSync(directory + "/" + f).isDirectory() ) return

                logs.push(f)
            })
            
            resolve(logs)
        }))
    }
}

module.exports = dir