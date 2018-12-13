import SVG from 'react-inlinesvg';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import IconDownload from './../../images/icon_download.svg';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';

require(`./FileInput.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const FileInput = (props) => {
  const {
    className,
    kind,
    htmlFor,
    label,
    placeholder,
    value,
    onChange,
    name,
    error,
    errorMsg,
    ...other
  } = props;

  let filename;
  if (typeof value === 'string') {
    filename = value;
  } else if (value) {
    filename = value.name;
  }

  const fileInputClasses = classNames(
    'fileInput',
    `fileInput--${kind}`,
    className,
    { 'fileInput--invalid': error },
  );

  const handleChange = (evt) => {
    const file = evt.target.files[0];

    if (file) {
      onChange({
        name,
        value: file,
      });
    }
  };

  return (
    <div className={fileInputClasses}>
      <Label
        htmlFor={htmlFor}
        label={label}
      >
        <div className="fileInput__fake-input" >
          <input
            type="file"
            className="fileInput__input"
            id={htmlFor}
            onChange={handleChange}
            {...other}
          />
          <span className="fileInput__file-name">{ filename || placeholder }</span>
          <div className="fileInput__fake-input__icons">
            <SVG src={IconDownload} className="fileInput__icon" />
            { error && <Icon icon="Error" className="input-field-input-wrapper__error-icon" /> }
          </div>
        </div>
        <span className="fileInput__error-msg" style={{ display: errorMsg != null ? 'block' : 'none' }}>{ errorMsg }</span>
      </Label>
    </div>
  );
};

FileInput.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['small', 'medium']),
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  errorMsg: PropTypes.string,
  error: PropTypes.bool,
};

FileInput.defaultProps = {
  className: '',
  kind: 'small',
  htmlFor: '',
  label: '',
  placeholder: 'Choose a file',
  onChange: () => {},
  value: null,
  errorMsg: null,
  error: false,
};

export default FileInput;
