import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import Label from '../Label/Label';

require(`./InputSwitcher.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const InputSwitcher = (props) => {
  const {
    className,
    disabled,
    label,
    id,
    name,
    value,
    children,
    onChange,
    ...other
  } = props;

  const duration = 150;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const innerStyle = {
    transition: 'max-height .2s linear',
    maxHeight: value ? '500px' : '0',
  };

  const transitionStyles = {
    enter: { opacity: 0 },
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
  };

  const switchClasses = classNames(
    'switch',
    className,
  );

  return (
    <div className="InputSwitcher">
      <Label
        className={switchClasses}
        htmlFor={id}
        label={label}
        {...other}
      >
        <input
          type="checkbox"
          className="InputSwitcher__input"
          id={id}
          name={name}
          disabled={disabled}
          onClick={() => onChange({ name, value: !value })}
          checked={value}
          hidden
        />
        <div className="InputSwitcher__inner">
          <span className="InputSwitcher__button InputSwitcher__button--on">Hide</span>
          <span className="InputSwitcher__button InputSwitcher__button--off">Show</span>
        </div>
      </Label>
      <CSSTransition
        in={value}
        classNames="fade"
        timeout={duration}
        appear
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <div
            style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            className="InputSwitcher__childrens"
          >
            <div style={{ ...innerStyle }}>
              {children}
            </div>
          </div>
          )}
      </CSSTransition>
    </div>
  );
};

InputSwitcher.propTypes = {
  value: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
};

InputSwitcher.defaultProps = {
  id: 'switch',
  name: 'switch',
  value: false,
  label: '',
  className: '',
  onChange: () => {},
  disabled: false,
  children: null,
};

export default InputSwitcher;
