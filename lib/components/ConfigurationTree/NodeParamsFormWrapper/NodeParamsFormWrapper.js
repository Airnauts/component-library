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
  } = props;

  const saveButtonClasses = classNames(
    'node-params-form-wrapper-footer__save-button',
    { 'node-params-form-wrapper-footer__save-button--disabled': saveDisabled },
  );

  return (
    <div className="node-params-form-wrapper">
      <div className="node-params-form-wrapper-header">
        <Icon type={type} />
      </div>
      <div className="node-params-form-wrapper__childrens">
        { children }
      </div>
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
  children: PropTypes.node,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool,
  type: PropTypes.oneOf(types).isRequired,
};

NodeParamsFormWrapper.defaultProps = {
  children: null,
  saveDisabled: false,
};

export default NodeParamsFormWrapper;
