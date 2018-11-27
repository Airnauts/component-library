import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import Label from '../Label/Label';

require(`./InputSwitcher.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

class InputSwitcher extends Component {
  constructor(props) {
    super(props);

    const { checked } = props;

    this.state = {
      checked,
    };
  }

  handleClick = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  }

  render() {
    const {
      className,
      disabled,
      label,
      id,
      name,
      checked,
      value,
      children,
      onChange,
      ...other
    } = this.props;

    const duration = 300;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    };

    const Fade = () => (
      <CSSTransition
        in={this.state.checked}
        classNames="fade"
        timeout={duration}
        unmountOnExit
        appear
      >
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          >
            <div>
              {children}
            </div>
          </div>
        )}
      </CSSTransition>
    );

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
            value={value}
            disabled={disabled}
            onChange={onChange}
            onClick={e => this.handleClick(e)}
            checked={this.state.checked}
            hidden
          />
          <div className="InputSwitcher__inner">
            <span className="InputSwitcher__button InputSwitcher__button--on">Hide</span>
            <span className="InputSwitcher__button InputSwitcher__button--off">Show</span>
          </div>
        </Label>
        <Fade />
      </div>
    );
  }
}

InputSwitcher.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
};

InputSwitcher.defaultProps = {
  id: 'switch',
  name: 'switch',
  value: 'switch',
  label: '',
  className: '',
  onChange: () => {},
  disabled: false,
  checked: false,
  children: null,
};

export default InputSwitcher;
