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
    errorMessages,
  } = props;

  const saveButtonClasses = classNames(
    'node-params-form-wrapper-footer__save-button',
    { 'node-params-form-wrapper-footer__save-button--disabled': saveDisabled },
  );

  return (
    <div className="node-params-form-wrapper">
      <div className="node-params-form-wrapper-header">
        <Icon icon={type} className="node-params-form-wrapper-header__icon" />
      </div>
      <div className="node-params-form-wrapper__childrens">
        { children }
      </div>
      <div className="node-params-form-wrapper-footer">
        {
          errorMessages && errorMessages.length > 0 &&
          errorMessages.map((message, index) => (
            <span
              className="node-params-form-wrapper-footer__error-msg"
              key={index} // eslint-disable-line react/no-array-index-key
            >
              { message }
            </span>
          ))
        }
        <div className="node-params-form-wrapper-footer__buttons-container">
          <div className={saveButtonClasses} onClick={() => { if (!saveDisabled) onSave(); }} role="presentation">
            <span>SAVE</span>
          </div>

          <div className="node-params-form-wrapper-footer__delete-button" onClick={onDelete} role="presentation">
            <Icon icon="Delete" className="node-params-form-wrapper-footer__delete-button-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

NodeParamsFormWrapper.propTypes = {
  children: PropTypes.node,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool,
  type: PropTypes.oneOf(types).isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
};

NodeParamsFormWrapper.defaultProps = {
  children: null,
  saveDisabled: false,
  errorMessages: null,
};

export default NodeParamsFormWrapper;
