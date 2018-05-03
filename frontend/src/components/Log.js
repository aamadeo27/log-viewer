import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Container, Grid, Loader, Dimmer, Label, Menu } from 'semantic-ui-react'
import * as api from '../api'

import LogFilter from './Filter'

const LogLine = ({ logLine, show, config }) => ({
    render(){
        const { logLine, show, config } = this.props

        let buffer = logLine.line.match(config.tagSplit)[0]
        let msg = logLine.line.substring(buffer.length)

        buffer = buffer.match(config.tagRegex).map( e => e.replace(/[[\]]/g,"").replace(/^\s+|\s+$/g,"") )
        const tags = buffer.map( (tagContent,i) => {
            let color = 'grey'
            
            for( let t = 0 ; t < config.tags.length; t++ ){
                let tag = config.tags[t]

                let matches = !!tagContent.match(tag.regex)
                
                if ( matches ) {
                    color = tag.style
                    break
                }
            }

            return <td key={i}><Label color={color}>{tagContent}</Label></td>
        })

        return <tr className="log-line" onClick={() => show(logLine.index)} tabIndex="0">
            {tags}
            <td>{msg}</td>
        </tr>
    }
})

@observer
class Log extends Component {
    showLine(index){
        this.props.log.currentIdx = index
    }

    render(){
        const { config, log } = this.props
        const { filtered, loading, name } = log

        const displayedLines = filtered.map( e => <LogLine key={e.index} logLine={e} show={this.showLine.bind(this)} config={config}/>)

        const refresh = () => {
            log.startLoading()
            api.loadLog( name )
                .then( data => log.setLog(data, name, config.regex) )
                .catch( err => {
                    console.error(err)
                })
        }
        
        return <div>
            <Dimmer active={loading}>
                <Loader indeterminate>Loading File</Loader>
            </Dimmer>
            <Container>
                <Grid divided={false} padded={false}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            { name ? <Menu borderless>
                                <Menu.Item header>{name}</Menu.Item>
                                <Menu.Item icon="refresh" onClick={refresh}/>
                                <Menu.Item>
                                    <LogFilter list={this.props.log} size={40}/>
                                </Menu.Item>
                            </Menu> : "" }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} >
                            <div className="logs">
                                <table >
                                    <tbody>
                                        {displayedLines}
                                    </tbody>
                                </table>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    }
}

export default Log