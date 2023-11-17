import React from 'react';
import css from "./RadioStationCard.module.css"

const RadioStationCard = ({station, onClick, isActive}) => {
    return (
        <div onClick={onClick} className={`${css.card} ${isActive && css.active}`}>
            <div className={css.field}>
                {/*<span className={css.fieldTitle}>Модель:</span>*/}
                <span className={css.fieldValue}>{station.model}</span>
            </div>
            <div className={css.field}>
                <span className={css.fieldTitle}> Радіус:</span>
                <span className={css.fieldValue}>{station.radius}м</span>
            </div>
        </div>
    );
};

export default RadioStationCard;