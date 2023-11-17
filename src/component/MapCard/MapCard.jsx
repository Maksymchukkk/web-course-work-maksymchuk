import React from 'react';
import css from "./MapCard.module.css"
import {observer} from "mobx-react-lite";
import radiosStore from "../../store/radiosStore";

const MapCard = observer(({map, forceRerender, isActive}) => {
    return (
        <div onClick={() => {
            radiosStore.changeCurrentMap(map)
            forceRerender()
        }} className={`${css.card} ${isActive && css.active}`}>
            <div className={css.field}><span className={css.fieldTitle}>id: </span>{map.id}</div>
            <div className={css.field}><span className={css.fieldTitle}>Назва:</span> {map.name}</div>
            <div className={css.field}><span className={css.fieldTitle}>К-ть р/с:</span> {map.radios.length}</div>
        </div>
    );
});

export default MapCard;