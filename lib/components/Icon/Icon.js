import React from 'react';
import PropTypes from 'prop-types';
import iconsPath from './../../images/sprite.svg';

require(`./Icon.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);


const Icon = (props) => {
  const typeToIcon = {
    Add: 'plus',
    Area: 'area',
    CellTower: 'cell_tower',
    Close: 'close',
    Delete: 'delete',
    Error: 'error',
    FiniteDieselGenerator: 'finite_diesel',
    InfiniteDieselGenerator: 'infinite_diesel',
    Load: 'load',
    MinusCircle: 'minus_circle',
    PlusCircle: 'plus_circle',
    PV: 'pv',
    Storage: 'storage',
  };

  const {
    type,
    iconType,
    ...other
  } = props;

  const IconName = () => (iconType ? typeToIcon[type] : type);

  return (
    <div className="svg-icon" {...other}>
      <svg viewBox="0 0 16 16" height="" width="" className={`icon-${type.toLowerCase()}`} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor' }}>
        <use xlinkHref={`${iconsPath}#icon_${IconName(type)}`} />
      </svg>
    </div>
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  iconType: PropTypes.string,
};

export default Icon;

