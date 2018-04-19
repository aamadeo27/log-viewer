import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Loader, Dimmer, Header } from 'semantic-ui-react'

import LogFilter from './Filter'

const LogLine = ({ logLine, show, regex }) => ({
    render(){
        const { logLine, show, regex } = this.props
        const firstTags = /.+](?=[^[].+?)/

        let buffer = logLine.line.match(firstTags)[0]
        let msg = logLine.line.substring(buffer.length)

        buffer = buffer.match(regex).map( e => e.replace(/[[\]]/g,"").replace(/^\s+|\s+$/g,"") )
        const tags = buffer.map( (e,i) => <span key={i} className={"tag tag-" + e}>{e}</span>)

        if ( logLine.index  < 5 ) console.log(buffer)

        return <div className="log-line" onClick={() => show(logLine.index)} tabIndex="0">
            {tags}
            {msg}
        </div>
    }
})

@observer
class Log extends Component {
    showLine(index){
        this.props.log.currentIdx = index
    }

    render(){
        const { filtered, loading, name } = this.props.log 
        const regex = /(\[.+?\])+?/g

        const displayedLines = filtered.map( e => <LogLine key={e.index} logLine={e} show={this.showLine.bind(this)} regex={regex}/>)
        
        return <div>
            <Dimmer active={loading}>
                <Loader indeterminate>Loading File</Loader>
            </Dimmer>
            <Header as="h3">{name}</Header>
            <LogFilter list={this.props.log} />
            <div className="logs">
                {displayedLines}
            </div>
        </div>
    }
}

export default Log