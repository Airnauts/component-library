import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SVG from 'react-inlinesvg';

import Label from '../Label/Label';
import IconArrowDown from './../../images/icon_arrow_down.svg';

require(`./Select.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const Select = (props) => {
  const {
    className,
    kind,
    htmlFor,
    label,
    onChange,
    onClick,
    options,
    error,
    errorMsg,
    ...other
  } = props;


  if (!options) return null;

  const optionList = options.map(i => (
    <option
      key={i.value}
      value={i.value}
    >
      {i.option}
    </option>
  ));

  const wrapperClasses = classNames(
    'nativeSelect__wrapper',
    className,
  );

  const selectClasses = classNames(
    'nativeSelect',
    `nativeSelect--${kind}`,
  );

  const handleChange = (event) => {
    const { value, name } = event.target;

    onChange({ value, name });
  };

  const handleClick = (evt) => {
    onClick(evt);
  };

  const errorVisibility = () => (error ? 'visible' : 'hidden');

  return (
    <div className={wrapperClasses}>
      <Label
        htmlFor={htmlFor}
        label={label}
      />
      <div className={selectClasses}>
        <i className="nativeSelect__icon">
          <SVG src={IconArrowDown} />
        </i>
        <select
          className="nativeSelect__select"
          onChange={handleChange}
          onClick={handleClick}
          {...other}
        >
          {optionList}
        </select>
        <span className="nativeSelect__error-msg" style={{ visibility: errorVisibility }}>{errorMsg}</span>
      </div>
    </div>
  );
};


Select.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['small', 'medium']),
  htmlFor: PropTypes.string,
  errorMsg: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  error: PropTypes.bool,
};

Select.defaultProps = {
  className: '',
  kind: 'small',
  htmlFor: '',
  errorMsg: '',
  error: false,
  label: '',
  onChange: () => {},
  onClick: () => {},
};

export default Select;
