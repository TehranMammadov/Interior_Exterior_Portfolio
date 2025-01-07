import React from 'react';
import { useTranslation } from 'react-i18next'

const Insurance = () => {
    const { t } = useTranslation();
    return (
        <div className='field-section'>
            <h1 className='field-section__big-title'>{t ('service.id8.field-sec')}</h1>
            <p className='field-section__desc'>{t ('service.insurance.description')}</p>
            <ul>
                {t('service.insurance.elements',{ returnObjects: true }).map((item, index) => (
                    <li key={index}><span>&bull;</span> <p>{item.text}</p></li>
                ))}
            </ul>
        </div>
    )
}

export default Insurance;