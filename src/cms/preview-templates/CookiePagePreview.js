import React from 'react';
import { CookiePageTemplate } from '../../templates/cookie-page';

const CookiePagePreview = ({ entry, widgetFor }) => (
  <CookiePageTemplate title={entry.getIn(['data', 'title'])} content={widgetFor('body')} />
);

export default CookiePagePreview;
