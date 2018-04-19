import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Loader, Dimmer } from 'semantic-ui-react'

import LogFilter from './Filter'

const LogLine = ({ logLine, show, regex }) => ({
    render(){
        const { logLine, show, regex } = this.props

        const buffer = logLine.line.match(regex)
        if ( logLine.index  < 5 ) console.log(buffer)

        return <div className="log-line" key={logLine.index} onClick={() => show(logLine.index)}>
            {logLine.line}
    </div>
    }
})

@observer
class Log extends Component {
    showLine(index){
        this.props.log.currentIdx = index
    }

    render(){
        const { filtered, loading } = this.props.log 
        const regex = /(\[\d\d\/\d\d\/\d\d\d\d\]\[\d\d:\d\d:\d\d\])(\[.+\])+/g

        const displayedLines = filtered.map( e => <LogLine logLine={e} show={this.showLine.bind(this)} regex={regex}/>)
        
        return <div>
            <Dimmer active={loading}>
                <Loader indeterminate>Loading File</Loader>
            </Dimmer>
            <LogFilter list={this.props.log} />
            <div className="logs">
                {displayedLines}
            </div>
        </div>
    }
}

export default Log