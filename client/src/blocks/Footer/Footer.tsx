import React from 'react';
import './Footer.scss';
import Nav from '../Nav/Nav';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Footer: React.FC = () => {

  const { t } = useTranslation();

  const changeLang = () => {
    const lang = (i18next.language === 'en') ? 'ru' : 'en';
    i18next.changeLanguage(lang)
  }

  return (
    <footer className="Footer  Page-Footer">
      <div className="Footer-Inner Container">
        <Nav className="Footer-Nav"/>
        <div className="Footer-Copyright">{ t('footer.copyright') }</div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
