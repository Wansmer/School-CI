import React from 'react';
import './Nav.scss';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export interface NavProps {
  className: string;
}

const Nav: React.FC<NavProps> = (props) => {

  const { t } = useTranslation();

  const changeLang = () => {
    const lang = (i18next.language === 'en') ? 'ru' : 'en';
    i18next.changeLanguage(lang)
  }

  return (
    <nav className={ props.className + ' Nav' }>
      <a href='https://yandex.ru/support/' className="Link Link_color_secondary">{ t('footer.nav.support') }</a>
      <a href='https://account.shri.yandex' className="Link Link_color_secondary">{ t('footer.nav.learning') }</a>
      <p className="Link Link_color_secondary" onClick={ changeLang }>{ t('footer.nav.lang') }</p>
    </nav>
  )
};

export default React.memo(Nav);
