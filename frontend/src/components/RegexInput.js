import React, { Component } from 'react'
import { Grid, Input, Form, Modal, Icon, Button, TextArea, Label } from 'semantic-ui-react'

class RegexInput extends Component {
    constructor(props){
        super(props)
        let regex = props.value.toString()
        regex = regex.substring(1,regex.lastIndexOf("/"))
        this.state = { regex , testLine: "", open: false }
    }

    componentWillReceiveProps(props){
        this.setState({ regex: props.value, testLine: "", open: false })
    }

    updateTag(tagName, field){
        const { config } = this.props
        return e => {
            const tag = {...config.tags.find( t => t.name === tagName )}
            
            if ( field === 'regex' ){
                try {
                    tag.regex = new RegExp(e.target.value)
                    //show error
                } catch(err){
                    tag.style = e.target.value
                }
            }
            
            config.setTags(config.tags.map( t => t.name === tagName ? tag : t))
        }
    }

    render(){
        const { onChange, label, width } = this.props

        const close = () => {
            this.setState({ error: false, open: false })
        }

        const done = () => {
            let regexStr = this.state.regex
            let scope = "g"

            try {                
                regex = new RegExp(regexStr, scope)
                close()
                onChange( regex )
            } catch ( err ){
                console.log(err)
                this.setState({ error: "Not valid regex " + regexStr + "/" + scope })
            }    
        }

        const onChangeRegex = e => this.setState({ regex: e.target.value })
        const onChangeTestLine = e => this.setState({ testLine: e.target.value })

        let regex = null
        try {
            regex = new RegExp(this.state.regex)
        } catch ( err ){
            console.debug(this.state.regex + " : invalid Regex")
        }

        const regexMatches = regex != null && regex.test(this.state.testLine)
        const matches = <Label color="green">matches</Label>
        const noMatches = <Label color="red">no matches</Label>

        const content = <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <Form.Input label="Regex" value={this.state.regex} onChange={onChangeRegex}/>
                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form>
                        <h3>Test Content</h3>
                        <TextArea value={this.state.testLine} onChange={onChangeTestLine} />
                    </Form>
                </Grid.Column>
                <Grid.Column width={4}>
                    { regexMatches ? matches : noMatches }
                </Grid.Column>
            </Grid.Row>
        </Grid>

        return <Form.Field width={width}>
            <label>{label}</label>
            <Input onClick={() => this.setState({ open: true })} value={this.props.value} readOnly/>
            <Modal onClose={close} open={this.state.open} size='small'>
                <Modal.Content>
                    <h3>Regex Selector</h3>
                    {content}
                </Modal.Content>
                <Modal.Actions>
                    { this.state.error ? <Label color="red">{this.state.error}</Label> : ""}
                    <Button color='green' onClick={done} inverted>
                        <Icon name='checkmark' /> Done
                    </Button>
                    <Button color='red' onClick={close} inverted>
                        <Icon name='cancel' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Form.Field>
    }
}

export default RegexInput