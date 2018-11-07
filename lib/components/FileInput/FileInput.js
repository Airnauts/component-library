import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import iconDownload from './../../images/icon_download.svg';
import Label from '../Label/Label';
import Icon from './../Icon/Icon';

require(`./FileInput.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const FileInput = ({
  className,
  kind,
  htmlFor,
  label,
  placeholder,
  fileName,
  onChange,
  ...other
}) => {
  const fileInputClasses = classNames(
    'fileInput',
    `fileInput--${kind}`,
    className,
  );

  const handleChange = (evt) => {
    onChange(evt);
  };

  return (
    <div className={fileInputClasses}>
      <Label
        htmlFor={htmlFor}
        label={label}
      >
        <div className="fileInput__fake-input" >
          <span>{ fileName }</span>
          <input
            type="file"
            className="fileInput__input"
            id={htmlFor}
            placeholder={placeholder}
            onChange={handleChange}
            {...other}
          />
          <Icon type={iconDownload} />
        </div>
      </Label>
    </div>
  );
};

FileInput.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['small', 'medium']),
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  fileName: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

FileInput.defaultProps = {
  className: '',
  kind: 'small',
  htmlFor: '',
  fileName: 'Profile.csv',
  label: '',
  placeholder: '',
  onChange: () => {},
};

export default FileInput;
