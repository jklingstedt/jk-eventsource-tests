import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class App extends Component {
    constructor() {
        super()

        this.state = {
            messages: [],
            sseSource: null
        }

        this.subscribeToSSE = this.subscribeToSSE.bind(this)
        this.stopSSE = this.stopSSE.bind(this)
        this.clearMessages = this.clearMessages.bind(this)
    }

    componentDidMount() {
        this.subscribeToSSE()
    }

    subscribeToSSE() {
        this.setState(
            {
                sseSource: new EventSource('http://localhost:3001/event-stream')
            },
            () => {
                this.state.sseSource.addEventListener('message', e => {
                    this.setState({
                        messages: [...this.state.messages, e.data]
                    })
                })
            }
        )
    }

    stopSSE() {
        this.state.sseSource.close()
        this.setState({ sseSource: null })
    }

    clearMessages() {
        this.setState({ messages: [] })
    }

    render() {
        return (
            <>
                <button
                    onClick={
                        this.state.sseSource
                            ? this.stopSSE
                            : this.subscribeToSSE
                    }
                >
                    {this.state.sseSource ? 'Stop' : 'Start'}
                </button>
                <button onClick={this.clearMessages}>Clear Messages</button>
                <ul>
                    {this.state.messages.map(message => (
                        <li key={message.split(' -- ')[1]}>{message}</li>
                    ))}
                </ul>
            </>
        )
    }
}

App.propTypes = {}

export default App
