import React from 'react';
import PropTypes from 'prop-types';
import iconsPath from './../../images/sprite.svg';

const Icon = props => (
  <div className="svg-icon">
    <svg viewBox="0 0 16 16" className={`icon-${props.icon}`} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <use xlinkHref={`${iconsPath}#icon_${props.icon}`} />
    </svg>
  </div>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;

