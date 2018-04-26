import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { List } from 'semantic-ui-react'
import * as api from '../api'

@observer
class Logs extends Component {
    onClick(file){
        const { log, config } = this.props
        
        log.startLoading()
        api.loadLog( file )
            .then( data => log.setLog(data, file, config.regex) )
            .catch( err => {
                console.error(err)
            })
    }

    render(){
        const { filteredList } = this.props.files

        const displayedList = filteredList.map( (file, i) => <List.Item key={i} onClick={() => this.onClick(file)}>
            <List.Icon name="file"></List.Icon>
            <List.Content>{file}</List.Content>
        </List.Item>)
        
        return <List className="log-list">
            {displayedList}
        </List>
    }
}

export default Logs