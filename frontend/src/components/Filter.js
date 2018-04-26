import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Input } from 'semantic-ui-react'

@observer
class FileFilter extends Component {
    constructor(props){
        super(props)

        this.state = { filter: this.props.list.filter }
    }

    onPressKey(e){
        if ( e.key === 'Enter' ){
            this.props.list.filtering = true
            this.props.list.filter = this.state.filter
            this.props.list.filtering = false
        }
    }

    onChange(e){
        this.setState({ filter: e.target.value })
    }
    

    render(){
        const { filtering } = this.props.list
        const { size } = this.props
        const { filter } = this.state

        const props = {
            value: filter,
            onKeyPress: this.onPressKey.bind(this),
            onChange: this.onChange.bind(this),
            placeholder:"filter",
            icon:"filter",
            loading: filtering
        }

        return <div style={{ width: size + "vw" }} >
            <Input {...props} fluid/>
        </div>
    }
}

export default FileFilter