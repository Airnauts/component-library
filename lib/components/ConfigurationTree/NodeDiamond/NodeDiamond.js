import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from './../../Icon/Icon';

require(`./NodeDiamond.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

export const typeToStyle = {
  Area: { color: 'color1' },
  CellTower: { color: 'color2' },
  FiniteDieselGenerator: { color: 'color2' },
  InfiniteDieselGenerator: { color: 'color2' },
  Load: { color: 'color2' },
  PV: { color: 'color2' },
  Storage: { color: 'color2' },
  // Storage2: { color: 'color3' },
};

const NodeDiamond = (props) => {
  const {
    type,
    state,
    count,
    ...other
  } = props;

  const diamondWrapperClasses = classNames(
    'node-diamond-wrapper',
    `node-diamond-wrapper--${typeToStyle[type].color}`,
    type === 'Area' ? 'node-diamond-wrapper--circle' : null,
  );

  const diamondClasses = classNames(
    'node-diamond',
    type === 'Area' ? 'node-diamond--circle' : null,
    `node-diamond--${typeToStyle[type].color}${state !== 'inactive' ? `-${state}` : ''}`,
  );

  const iconClasses = classNames('node-diamond__icon');

  return (
    <div className={diamondWrapperClasses}>
      <div className={diamondClasses} {...other}>
        {
          (count && count > 1) ? <span className="node-diamond__count">{ count }</span> : null
        }
        <Icon type={type} className={iconClasses} />
      </div>
    </div>
  );
};

NodeDiamond.propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToStyle)),
  state: PropTypes.oneOf(['inactive', 'active', 'clicked']),
  count: PropTypes.string,
};

NodeDiamond.defaultProps = {
  type: 'Area',
  state: 'inactive',
  count: '',
};

export default NodeDiamond;

export const types = Object.keys(typeToStyle);
