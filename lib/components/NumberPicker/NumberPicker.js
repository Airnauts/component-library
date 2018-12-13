import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Icon from './../Icon/Icon';

require(`./NumberPicker.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const NumberPicker = (props) => {
  const {
    min,
    max,
    value,
    name,
    onChange,
    ...other
  } = props;

  const minusButtonClasses = classNames(
    'number-picker__button',
    min != null && value <= min ? 'number-picker__button--inactive' : null,
  );

  const plusButtonClasses = classNames(
    'number-picker__button',
    max != null && value >= max ? 'number-picker__button--inactive' : null,
  );

  return (
    <div className="number-picker__container" {...other}>
      <div
        className={minusButtonClasses}
        role="presentation"
        onClick={min == null || value > min
            ? () => onChange({ name, value: value - 1 })
            : () => {}
          }
      >
        <Icon type="MinusCircle" />
      </div>
      <div className="number-picker__value">{ value }</div>
      <div
        className={plusButtonClasses}
        role="presentation"
        onClick={max == null || value < max
            ? () => onChange({ name, value: value + 1 })
            : () => {}
          }
      >
        <Icon type="PlusCircle" />
      </div>
    </div>
  );
};

NumberPicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

NumberPicker.defaultProps = {
  min: null,
  max: null,
};

export default NumberPicker;
