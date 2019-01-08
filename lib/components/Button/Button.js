import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SVG from 'react-inlinesvg';

require(`./Button.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const Button = (props) => {
  const {
    label,
    disabled,
    onClick,
    type,
    className,
    reversed,
    icon,
    iconOnly,
    style,
  } = props;

  const buttonClasses = classNames(
    'button',
    `button--${type}`,
    className,
    iconOnly ? 'button--icon-only' : null,
    icon ? 'button-icon' : null,
    reversed ? 'button--reversed' : null,
  );

  const iconClasses = classNames(
    'button__icon',
    `icon${type}`,
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {!iconOnly &&
        <span className="button__label"> {label} </span>
      }
      {icon &&
        <i className={iconClasses}><SVG src={icon} /></i>
      }
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  reversed: PropTypes.bool,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'accent', 'cta', 'icon', 'verbund-primary', 'ghost', 'verbund-secondary', 'reversed']),
  icon: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  icon: undefined,
  iconOnly: false,
  disabled: false,
  reversed: null,
  label: '',
  onClick: () => {},
  className: '',
};

export default Button;
