import { observable, computed, action } from 'mobx'

const BASE_REGEX = new RegExp()

class Log {
    @observable name = ""
    @observable lines = []
    @observable filter = ""
    @observable filtering = false
    @observable currentIdx = 0
    @observable loading = false

    @computed get filtered(){
        let regex = BASE_REGEX

        try {
            regex = new RegExp(this.filter,"i")
        } catch (err){
            console.error("Bad Filter", this.filter)
        }

        const filtered =  this.lines.map( (line, index) => ({ line, index }) ).filter( e => !this.filter || regex.test(e.line))

        return filtered
    }

    @computed get currentLine(){
        return this.lines.length > 0 ? this.lines.get(this.currentIdx) : ""
    }

    @action startLoading(){
        this.lines = []
        this.filter = ""
        this.loading = true
    }

    @action setLog(content, name, regex){
        this.loading = false
        this.name = name

        const buffer =  []
        const tmp = content.split(regex)
        const toInt = x => parseInt(x,10)

        tmp.splice(0,1)
        tmp.forEach( (line, i) => buffer[toInt(i/2)] = i % 2 === 0 ? line : (buffer[toInt(i/2)] + line) )

        this.lines = buffer
    }
}

const store = new Log()

export default store