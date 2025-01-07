import React from 'react';
import { useTranslation } from 'react-i18next'
const Advantages = () => {
    const { t } = useTranslation();
    return (
        <div className='field-section'>
            <h1 className='field-section__big-title'>{t ('service.id6.before')}</h1>
            <ul>{t ('service.advantages',{ returnObjects: true }).map((item, index) => (
                <li key={index}><span>&bull;</span> <p>{item.text}</p></li>
            ))}</ul>
        </div>
    )
}

export default Advantages;