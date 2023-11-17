import {Button, Modal} from "react-bootstrap";
import $api from "../../http";
import {useState} from "react";
import css from "./ModalCreateRadio.module.css"

export const ModalCreateRadio = ({show, handleClose, handleShow, getRadio}) => {

    const [radio, setRadio] = useState({
        model: "",
        radius: []
    })
    const sendNewMap = (e) => {
        e.preventDefault()
        $api.post("/radio", radio).then((res) => {
            console.log(res)
            getRadio()
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
                            Створити нову радіостанцію
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div className={css.name}>
                            <span>Назва станції</span>
                            <input required onChange={e => {
                                setRadio({...radio, model: e.target.value})
                            }} type="text"/>
                        </div>
                        <div className={css.name}>
                            <span>Радіус покриття</span>
                            <input required onChange={e => {
                                setRadio({...radio, radius: Number(e.target.value)})
                            }} type="number"/>
                        </div>
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