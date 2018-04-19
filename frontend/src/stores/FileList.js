import { observable, computed, action } from 'mobx'

const BASE_REGEX = new RegExp("")

class FileList {
    @observable list = []
    @observable filter = ""
    @observable filtering = false

    @computed get filteredList(){
        let regex = BASE_REGEX

        try {
            regex = new RegExp(this.filter,"i")
        } catch (err){
            console.error("Bad Filter", this.filter)
        }

        return this.list.filter( name => !this.filter || regex.test(name))
    }

    @action updateFiles(files){
        this.list = files
    }
}

const store = new FileList()

export default store