import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import NodeDiamond, { typeToStyle, types } from './../NodeDiamond/NodeDiamond';

require(`./NodeCard.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const NodeCard = (props) => {
  const {
    name,
    type,
    count,
    ...other
  } = props;

  const nameClasses = classNames(
    'node-card__name',
    `node-card__name--${typeToStyle[type].color}`,
  );

  return (
    <div className="node-card">
      <NodeDiamond type={type} {...other} count={count} />
      <span className={nameClasses}>{ name }</span>
    </div>
  );
};

NodeCard.propTypes = {
  name: PropTypes.string,
  count: PropTypes.string,
  type: PropTypes.oneOf(types).isRequired,
};

NodeCard.defaultProps = {
  name: '',
  count: '',
};

export default NodeCard;
