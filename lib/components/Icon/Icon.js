import React from 'react';
import PropTypes from 'prop-types';
import iconsPath from './../../images/sprite.svg';

require(`./Icon.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const Icon = props => (
  <div className="svg-icon" style={{ fill: 'currentColor' }}>
    <svg viewBox="0 0 16 16" className={`icon-${props.icon}`} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <use xlinkHref={`${iconsPath}#icon_${props.icon}`} />
    </svg>
  </div>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;

