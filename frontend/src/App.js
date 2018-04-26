import React, { Component } from 'react'
import { Grid, Modal, Button, Icon, Menu } from 'semantic-ui-react'

import fileList from './stores/FileList'
import log from './stores/Log'
import config from './stores/Config'

import Logs from './components/Logs'
import FileFilter from './components/Filter'
import Log from './components/Log'
import LogDetail from './components/LogDetail'
import * as api from './api'
import Configuration from './components/Configuration'


api.list().then( logs => fileList.updateFiles(logs))
config.init()

class App extends Component {
  constructor(props){
    super(props)

    this.state = { showConfig: false }
  }

  render() {
    const close = () => this.setState({ showConfig: false })

    return (
      <Grid celled="internally" divided={false} padded={false}>
        <Modal
          onClose={close}
          open={this.state.showConfig}
          size='small'
        >
          <Modal.Content>
            <Configuration config={config} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={close} inverted>
              <Icon name='checkmark' /> Done
            </Button>
          </Modal.Actions>
        </Modal>
        <Grid.Row>
          <Grid.Column width={16}>
            <Menu>
              <Menu.Item header>Log Viewer</Menu.Item>
              <Menu.Item position="right" onClick={() => this.setState({ showConfig: true })}>
                <Icon name="settings" />
              </Menu.Item>
            </Menu>  
          </Grid.Column>
        </Grid.Row>
        <Grid.Row divided={false}>
          <Grid.Column width={4} className="sidebar">
            <Grid.Row>
              <Grid.Column>
                <FileFilter list={fileList} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Logs files={fileList} log={log} config={config}/>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Log log={log} config={config} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <LogDetail log={log} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default App;
