import React, {useEffect, useState} from 'react';
import css from "./Header.module.css"
import $api from "../../http";
import RadioStationCard from "../RadioStationCard/RadioStationCard";
import radiosStore from "../../store/radiosStore";
import {observer} from "mobx-react-lite";
import {ModalCreateRadio} from "../ModalCreateRadio/ModalCreateRadio";

const Header = observer(() => {

    const [radios, setRadios] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [rerender, setRerender] = useState(false)
    const forceRerender = () => {
        setRerender(!rerender)
    }
    const getRadios = () => {
        $api.get("/radio").then(res => {
            setRadios(res.data)
        }).then(() => {
            setIsLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        getRadios()
    }, []);

    return (
        <div className={css.container}>
            {isLoading ? <div>Loading...</div> : radios.map(item => (
                <RadioStationCard isActive={radiosStore.currentRadio && item.id === radiosStore.currentRadio.id}
                                  onClick={() => {
                                          radiosStore.changeCurrentRadio(item)
                                          forceRerender()
                                  }} station={item}/>
            ))}
                <ModalCreateRadio show={show} getRadio={getRadios} handleShow={handleShow} handleClose={handleClose}/>
            <div className={css.dropActiveBtn} onClick={() => {
                handleShow()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                     class="bi bi-file-plus" viewBox="0 0 16 16">
                    <path
                        d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
                    <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                </svg>
            </div>
        </div>
    );
});

export default Header;