import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Label from '../Label/Label';
import Icon from '../Icon/Icon';

require(`./InputField.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const InputField = ({
  error,
  errorMsg,
  label,
  name,
  onChange,
  type,
  unit,
  ...other
}) => {
  const inputClasses = classNames(
    'input-field',
    { 'input-field--invalid': error },
  );

  const handleChange = (event) => {
    let { value } = event.target;

    if (type === 'number') {
      value = parseFloat(value);
    }
    onChange({ value, name });
  };

  const nameInputMaxLength = 27;
  const elemId = `input-field-${name}`;

  const input = (
    <React.Fragment>
      <div className="input-field-input-wrapper">
        <input
          type={type}
          className="input-field-input-wrapper__input"
          id={elemId}
          name={name}
          onChange={handleChange}
          {...other}
          maxLength={nameInputMaxLength}
        />
        <div className="input-field-input-wrapper__suffix">
          { unit != null && <span className="input-field-input-wrapper__unit">{ unit }</span>}
          { error && <Icon icon="Error" className="input-field-input-wrapper__error-icon" /> }
        </div>
      </div>
      <span className="input-field__error-msg" style={{ display: errorMsg != null ? 'block' : 'none' }}>{ errorMsg || 'placeholder' }</span>
    </React.Fragment>
  );

  return (
    <div className={inputClasses}>
      {
        label != null
          ? (
            <Label
              htmlFor={elemId}
              label={label}
            >
              { input }
            </Label>
          )
          : input
      }
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  unit: PropTypes.string,
};

InputField.defaultProps = {
  label: null,
  type: 'text',
  onChange: () => {},
  error: false,
  errorMsg: null,
  unit: null,
};

export default InputField;
