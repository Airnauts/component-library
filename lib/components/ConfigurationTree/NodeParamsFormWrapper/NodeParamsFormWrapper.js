import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from './../../Icon/Icon';
import { types } from './../NodeDiamond/NodeDiamond';

require(`./NodeParamsFormWrapper.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const NodeParamsFormWrapper = (props) => {
  const {
    type,
    saveDisabled,
    onSave,
    onDelete,
    children,
    count,
    onCountChange,
  } = props;

  const minusButtonClasses = classNames(
    'node-params-form-wrapper-counter__button',
    count <= 1 ? 'node-params-form-wrapper-counter__button--inactive' : null,
  );

  const saveButtonClasses = classNames(
    'node-params-form-wrapper-footer__save-button',
    { 'node-params-form-wrapper-footer__save-button--disabled': saveDisabled },
  );

  return (
    <div className="node-params-form-wrapper">
      <div className="node-params-form-wrapper-header">
        <Icon type={type} />
      </div>

      {
        count != null &&
        <div className="node-params-form-wrapper-counter">
          <div
            className={minusButtonClasses}
            role="presentation"
            onClick={count > 1 ? () => onCountChange(count - 1) : () => {}}
          >
            <Icon type="MinusCircle" />
          </div>
          <div className="node-params-form-wrapper-counter__value">{ count }</div>
          <div className="node-params-form-wrapper-counter__button" role="presentation" onClick={() => onCountChange(count + 1)}>
            <Icon type="PlusCircle" />
          </div>
        </div>
      }

      { children }

      <div className="node-params-form-wrapper-footer">
        <div className={saveButtonClasses} onClick={() => { if (!saveDisabled) onSave(); }} role="presentation">
          <span>SAVE</span>
        </div>

        <div className="node-params-form-wrapper-footer__delete-button" onClick={onDelete} role="presentation">
          <Icon type="Delete" />
        </div>
      </div>
    </div>
  );
};

NodeParamsFormWrapper.propTypes = {
  count: PropTypes.number,
  onCountChange: PropTypes.func,
  children: PropTypes.node,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool,
  type: PropTypes.oneOf(types).isRequired,
};

NodeParamsFormWrapper.defaultProps = {
  children: null,
  count: null,
  onCountChange: () => {},
  saveDisabled: false,
};

export default NodeParamsFormWrapper;
