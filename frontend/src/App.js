import React, { Component } from 'react'
import { Grid, Header, Button, Icon } from 'semantic-ui-react'

import fileList from './stores/FileList'
import log from './stores/Log'

import Logs from './components/Logs'
import FileFilter from './components/Filter'
import Log from './components/Log'
import LogDetail from './components/LogDetail'
import * as api from './api'

api.list().then( logs => fileList.updateFiles(logs))

class App extends Component {
  render() {

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Header as="h1" textAlign="center">
              Log Viewer
            </Header>
            <Button icon floated="right" primary>
              <Icon name='settings' />
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}/>
          <Grid.Column width={4} className="sidebar">
            <Grid.Row>
              <Grid.Column>
                <FileFilter list={fileList} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Logs files={fileList} log={log}/>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={9}>
            <Grid.Row>
              <Grid.Column>
                <Log log={log} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <LogDetail log={log} />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
