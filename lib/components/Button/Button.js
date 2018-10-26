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
    icon,
    style,
  } = props;

  const classes = classNames(
    'button',
    `button--${type}`,
    className,
    icon ? 'button-icon' : null,
  );
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      <span className="button__label"> {label} </span>
      {icon &&
        <i className="button__icon"><SVG src={icon} /></i>
      }
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'accent', 'cta', 'icon', 'verbund-primary', 'verbund-secondary']),
  icon: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  icon: undefined,
  disabled: false,
  onClick: () => {},
  className: '',
};

export default Button;
