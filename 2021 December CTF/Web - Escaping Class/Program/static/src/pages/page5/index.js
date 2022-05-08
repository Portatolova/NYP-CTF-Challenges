import React, { Component } from "react";

import styles from "./index.module.css";

class Page5 extends React.Component {
    constructor(props) {
        super(props)
        this.transitionEnd = this.transitionEnd.bind(this)
        this.mountStyle = this.mountStyle.bind(this)
        this.unMountStyle = this.unMountStyle.bind(this)
        this.state = { //base css
            show: false,
            style: {
                fontSize: 60,
                opacity: 1,
                transition: 'all 2s ease',
            }
        }
    }

    componentWillReceiveProps(newProps) { 

        if (!newProps.mounted)
            return this.unMountStyle()
        
        this.setState({ 
            show: true
        })

        setTimeout(this.mountStyle, 10) 
    }

    unMountStyle() {
        this.setState({
            style: {
                fontSize: 60,
                opacity: 0,
                transition: 'all 1s ease',
            }
        })
    }

    mountStyle() {
        this.setState({
            style: {
                fontSize: 60,
                opacity: 1,
                transition: 'all 1s ease',
            }
        })
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10) 
    }

    transitionEnd() {
        if (!this.props.mounted) {
            this.setState({
                show: false
            })
        }
    }

    render() {
        return this.state.show && (<>
            <div className={styles.page5}>
                <h1 style={this.state.style} onTransitionEnd={this.transitionEnd}>Ms Tan is not happy that Carl is sleeping in class</h1>
            </div>
        </>);
    }
}

export default Page5;