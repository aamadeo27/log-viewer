import { observable, computed, action } from 'mobx'

class FileList {
    @observable list = []
    @observable filter = ""
    @observable filtering = false

    @computed get filteredList(){
        const regex = new RegExp(this.filter,"i")
        const filtered = this.list.filter( name => !this.filter || regex.test(name))
        return filtered
    }

    @action updateFiles(files){
        this.list = files
    }
}

const store = new FileList()

export default store