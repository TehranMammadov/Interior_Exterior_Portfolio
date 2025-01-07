import React from 'react';
import { useTranslation } from 'react-i18next'

const RepairStagesFields = () => {
    const { t } = useTranslation();
    return (
        <div className='stages-fields'>
            {t('service.repairStages',{ returnObjects: true }).map((item, index) => (
                <div key={index} className='stages-fields__item-field'>
                    <span className='field-id'>{item.id}</span>
                    <h4 className='field-title'><span>&bull;</span> {item.title}</h4>
                    <p className='field-desc'>{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default RepairStagesFields;