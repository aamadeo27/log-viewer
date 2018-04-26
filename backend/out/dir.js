const fs = require('fs')

const list = directory => {
    return new Promise( (resolve, reject) => fs.readdir( directory , (err, files) => {
        if ( err ) return reject(err)
        
        const logs = []
        const dirs = []

        files.forEach( f => {
            if ( fs.statSync(directory + "/" + f).isDirectory() ) {
                return dirs.push(directory+ "/" + f)
            }

            logs.push(directory + "/" + f)
        })
        
        if ( dirs.length == 0 ) resolve(logs)

        Promise.all(dirs.map( d => list(d) )).then ( dirsFiles => {
            dirsFiles.forEach( dirFiles => dirFiles.forEach( f => logs.push(f)) )
            
            resolve(logs)
        }).catch( reject )
    }))
}

module.exports = { list }