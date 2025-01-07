import React from 'react'
import { useTranslation } from 'react-i18next'

const RepairStages = () => {
    const { t } = useTranslation();
    return (
        <div className='field-section'>
            <h1 className='field-section__big-title'>{t('service.main-4.banner-text')}</h1>
        </div>
    )
}

export default RepairStages;