import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import Aux from '../Aux'
import './Modal.css'

const Box = (props) => {
    return (
        <Aux>
            <Modal open={props.open} toggle={props.toggle} size="lg">
                <ModalHeader className="box-top">TOOL</ModalHeader>
                <ModalBody className="box-bottom">Add a point</ModalBody>
            </Modal>
        </Aux>
    )
}

export default Box