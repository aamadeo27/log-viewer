import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { TextArea, Container } from 'semantic-ui-react'

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

        return <Container>
            <TextArea className="log-detail" value={msg}/>
        </Container>
    }
}

export default Log