import React, { BaseSyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import './Land.scss';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const actionButtonClasses: Classes = {
  mods: {
    type: 'action',
    size: 'l'
  }
};

const Land: React.FC = () => {

  const history = useHistory();
  const { t } = useTranslation();

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    history.push('/settings');
  };

  return (
    <div className="Land">
      <div className="Land-Logo"></div>
      <p className="Land-Text">
        Configure repository connection and&#160;synchronization settings
      </p>
      <Button
        className="Land-Button"
        text={ t('buttons.openSettings') }
        classes={actionButtonClasses}
        onClick={clickHandler}
      />
    </div>
  );
};

export default React.memo(Land);
