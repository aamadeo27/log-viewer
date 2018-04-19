import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Input } from 'semantic-ui-react'

@observer
class FileFilter extends Component {
    changeFilter(e){
        this.props.list.filtering = true
        this.props.list.filter = e.target.value
        this.props.list.filtering = false
    }

    render(){
        const { filter, filtering } = this.props.list

        const props = {
            value: filter,
            onChange: this.changeFilter.bind(this),
            placeholder:"filter",
            icon:"filter",
            loading: filtering
        }

        return <div className="filter">
            <Input {...props}/>
        </div>
    }
}

export default FileFilter