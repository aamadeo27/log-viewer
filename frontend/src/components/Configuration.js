import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Grid, Form, Icon, Button, Transition, Modal, Label } from 'semantic-ui-react'

import RegexInput from './RegexInput'


class NewTagDialog extends Component {
    constructor(props){
        super(props)
        this.state = { name: "New Tag" }
    }

    render(){ 
        const { onSubmit, open, onClose } = this.props

        return <Modal onClose={onClose} open={open} size='small'>
            <Modal.Content>
                <h3>New Tag</h3>
                <Form onSubmit={() => onSubmit(this.state.name)}>
                    <Form.Input label="Tag name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                { this.state.error ? <Label color="red">{this.state.error}</Label> : ""}
                <Button color='green' onClick={() => onSubmit(this.state.name)} inverted>
                    <Icon name='checkmark' /> Done
                </Button>
                <Button color='red' onClick={onClose} inverted>
                    <Icon name='cancel' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    }
}

@observer
class Configuration extends Component {
    constructor(props){
        super(props)
        this.state = { showTags: false, showAddTag: false }
    }

    updateTag(tagName, field){
        const { config } = this.props
        return value => {
            const tag = {...config.tags.find( t => t.name === tagName )}
            
            if ( field === 'regex' ){
                try {
                    tag.regex = new RegExp(value)
                } catch(err){
                    //show error
                }
            } else {
                tag.style = value.target.value
            }
            
            config.setTags(config.tags.map( t => t.name === tagName ? tag : t))
        }
    }

    render(){
        const { config } = this.props
        const { showTags } = this.state
        let options = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"]
        options = options.map( o => <option key={o} value={o}>{o}</option>)

        const toggleTags = () => this.setState({ showTags: !showTags })
        const tagIcon = showTags ? 'caret up' : 'caret down'
        const tagTitle = showTags ? 'Hide Tags' : 'Show Tags'
        const onChange = (tag, field) => this.updateTag(tag,field)

        const addTag = name => {
            this.props.config.addTag(name)
            this.setState({ showAddTag: false })
        }

        const deleteTag = name => this.props.config.deleteTag(name)

        const tagList = config.tags.map( (t, i) => <Form.Group key={i}>
            <RegexInput width={12} label={t.name} value={t.regex.toString()} onChange={onChange(t.name, 'regex')} />
            <Form.Field control='select'width={3} value={t.style} onChange={onChange(t.name,'style')} color={t.style} label="&nbsp;">
                {options}
            </Form.Field>
            <Form.Button color="red" icon="trash" inverted label="&nbsp;" onClick={() => deleteTag(t.name)}/>
        </Form.Group>)

        const onChangeRegex = field => regex => { config[field] = regex }

        return <Grid>
            <Grid.Row>
                <Grid.Column><h2>Configuration</h2></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column><h3>{config.name}</h3></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Button onClick={toggleTags} >
                        {tagTitle}
                        <Icon name={tagIcon} />
                    </Button>
                    <Transition visible={showTags} animation='fade' duration={500}>
                        <Form>
                            {tagList}
                            <Button color="blue" onClick={() => this.setState({ showAddTag: true })}> add tag </Button>
                            <NewTagDialog onSubmit={addTag} onClose={() => this.setState( { showAddTag : false })} open={this.state.showAddTag} />
                        </Form>
                    </Transition>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <RegexInput value={config.regex} onChange={onChangeRegex('regex')} label="Message Splitter"/>
                        <RegexInput value={config.tagSplit} onChange={onChangeRegex('tagSplit')} label="Message/Tag Border"/>
                        <RegexInput value={config.tagRegex} onChange={onChangeRegex('tagRegex')} label="Tag Regex"/>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }
}

export default Configuration