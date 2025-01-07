import React from 'react';
import { useTranslation } from 'react-i18next'
const Guarantee = () => {
    const { t } = useTranslation();
    return (
        <div className='field-section'>
            <h1 className='field-section__big-title'>{t ('service.id7.after')}</h1>
            <p className='field-section__desc'>{t ('service.guarantee.description')}</p>
            <div style={{marginBottom: "40px"}}>
                <h3>{t ('service.guarantee.applicable.title')}</h3>
                <ul>
                    {t('service.guarantee.applicable.elements',{ returnObjects: true }).map((item, index) => (
                        <li key={index}><span>&bull;</span> <p>{item.text}</p></li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>{t ('service.guarantee.notProvided.title')}</h3>
                <ul>
                  {t('service.guarantee.notProvided.elements',{ returnObjects: true }).map((item, index) => (
                        <li key={index}><span>&bull;</span> <p>{item.text}</p></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Guarantee;