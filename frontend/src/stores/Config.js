import { observable, action, toJS } from 'mobx'
import { init, updateConfig } from '../localDB'

class Configuration {
    @observable tags = []
    @observable regex = /.*/
    @observable tagRegex = /.*/
    @observable tagSplit = /.*/
    @observable name = ""

    @action setName(name){
        this.name = name
        this.update()
    }

    @action setRegex(regex){
        this.regex = regex
        this.update()
    }

    @action setTagRegex(regex){
        this.tagRegex = regex
        this.update()
    }

    @action setTagSplit(regex){
        this.tagSplit = regex
        this.update()
    }

    @action setTags(tags){
        this.tags = tags
        this.update()
    }

    @action addTag(name){
        const tag = { regex: /.*/, style: "blue", name }
        this.tags = [...this.tags, tag]
        this.update()
    }

    @action deleteTag(name){
        this.tags = this.tags.filter( t => t.name !== name)
        this.update()
    }

    init(){
        init(this)
    }

    update(){
        updateConfig(toJS(this))
    }
}

const store = new Configuration()

export default store