import React from 'react';
import css from "./ControlBar.module.css"
import radiosStore from "../../store/radiosStore";
import $api from "../../http";
import {observer} from "mobx-react-lite";

const ControlBar = () => {

    const save = () => {
        if (radiosStore.currentMap) {
            $api.put(`/map/${radiosStore.currentMap.id}`, radiosStore.currentMap).then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const deleteMap = () => {
        if (radiosStore.currentMap) {
            $api.delete(`/map/${radiosStore.currentMap.id}`).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <div className={css.container}>
            <button onClick={save} className={css.btn}>
                Зберегти
            </button>

            <button onClick={deleteMap} className={css.btn}>
                Видалити
            </button>
        </div>);
};

export default observer(ControlBar);