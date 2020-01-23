import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import Aux from '../Aux'
import Box from '../Modal/Modal'
import './ToolTray.css'

class ToolTray extends React.Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <Aux>
                <Box open={this.state.modal} toggle={this.toggle} />
                <div className="tool-tray">
                    <div className="tool" onClick={this.toggle}>
                        GEOMETRY<br />
                        <FontAwesomeIcon icon={faGlobe} />
                    </div>
                </div>
            </Aux>
        )
    }
}

export default ToolTray