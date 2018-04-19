import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { TextArea } from 'semantic-ui-react'

@observer
class Log extends Component {
    render(){
        const { currentLine } = this.props.log

        return <TextArea className="log-detail" value={currentLine} />
    }
}

export default Log