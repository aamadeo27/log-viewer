import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { TextArea } from 'semantic-ui-react'

@observer
class Log extends Component {
    shouldComponentUpdate({ log }){
        return log.currentLine !== this.props.log.currentLine
    }

    render(){
        const { currentLine } = this.props.log

        const firstTags = /.+](?=[^[].+?)/

        let msg = ""
        if ( currentLine ){
            let buffer = currentLine.match(firstTags)[0]
            msg = currentLine.substring(buffer.length)
        }

        return <TextArea className="log-detail" value={msg} />
    }
}

export default Log