import {Button, Modal} from "react-bootstrap";
import $api from "../../http";
import {useState} from "react";
import css from "./ModalCreateMap.module.css"
export const ModalCreateMap = ({show, handleClose, handleShow, getMaps}) => {

    const [map, setMap] = useState({
        name: "",
        radios: []
    })
    const sendNewMap = (e) => {
        e.preventDefault()
        $api.post("/map", map).then((res) => {
            console.log(res)
            getMaps()
            handleClose()
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={sendNewMap}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Створити нову мапу
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={css.name}>
                        <span>Назва карти</span>
                        <input required onChange={e => {
                            setMap({...map, name: e.target.value})
                        }} type="text"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={"submit"} variant="primary">
                            Створити
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}