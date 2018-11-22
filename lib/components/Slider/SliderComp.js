import React, { Component } from 'react';
import PropTypes from 'prop-types';

require(`./Slider.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

class SliderComp extends Component {
  constructor(props) {
    super(props);
    this.scrollBarLine = React.createRef();
    this.barTrack = React.createRef();
    this.scrollBar = React.createRef();

    this.state = {
      // <<<<< This component should get only Value and render UI state >>>>>
      percentageFrom: null,
      percentageTo: null,
      isBarDragged: false,
      dragStartPosition: null,
      storedBarTransform: null,
      lastScrollValue: null,
      offsetLeft: 20,
    };
    this.scrollBarMax = null;

    // this.onTrackClick = this.onTrackClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onBarMouseUp = this.onBarMouseUp.bind(this);
  }


  componentDidMount() {
    this.scrollBarMax = this.barTrack.current.offsetWidth - this.scrollBar.current.offsetWidth;

    this.addEventsListeners(this.state);
  }

  componentWillUnmount() {
    this.removeEventsListeners();
  }

  onBarMouseDown(event) {
    this.setState({
      isBarDragged: true,
      dragValue: event.x - this.getScrollBarStartX(),
    });
  }

  onMouseMove(event) {
    if (this.state.isBarDragged) {
      this.setState({
        dragValue: event.x - this.getScrollBarStartX(),
      });
    }
  }

  onBarMouseUp() {
    const {
      isBarDragged,
      dragValue,
    } = this.state;

    const {
      onChange,
      name,
      minVal,
      maxVal,
      markerStep,
    } = this.props;

    if (isBarDragged) {
      this.setState({
        isBarDragged: false,
      });

      const stepsCount = Math.ceil((maxVal - minVal) / markerStep);
      const pxPerStep = this.scrollBarMax / stepsCount;
      const value = (Math.round(dragValue / pxPerStep) * markerStep) + minVal;
      onChange({ name, value });
    }
  }

  getBarTransformValue() {
    const value = this.scrollBar.style.transform.match(/translateX\((-?\d+\.?\d*px)\)/);

    return !value ? 0 : parseFloat(value[1].replace('px'));
  }

  getScrollBarStartX() {
    return this.scrollBarLine.current.getBoundingClientRect().x;
  }

  valueToPct(value) {
    const {
      minVal,
      maxVal,
    } = this.props;

    return ((value - minVal) / (maxVal - minVal)) * 100;
  }

  addEventsListeners() {
    this.scrollBar.current.addEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('mouseup', this.onBarMouseUp, true);
  }

  removeEventsListeners() {
    this.scrollBar.current.removeEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    document.removeEventListener('mousemove', this.onMouseMove, true);
    document.removeEventListener('mouseup', this.onBarMouseUp, true);
  }

  render() {
    const {
      unit,
      minVal,
      maxVal,
      label,
      value,
      markerStep,
      labelStep,
      offsetLeft,
    } = this.props;

    const {
      isBarDragged,
      dragValue,
    } = this.state;

    const markers = [];
    const markerWidth = (((markerStep / ((maxVal - minVal))) * 100).toFixed(2));
    const trackWidth = ((100 - markerWidth)).toFixed(2);


    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= Math.ceil((maxVal - minVal) / markerStep); i++) {
      if (i % labelStep === 0) {
        markers.push((
          <div style={{ width: `${markerWidth}%` }} key={i} className="marker marker--accent">
            <span>{minVal + (i * markerStep)}{unit}</span>
          </div>
        ));
      } else {
        markers.push((<div style={{ width: `${markerWidth}%` }} key={i} className="marker" />));
      }
    }
    return (
      <div className="SliderComp">
        <div className="SliderComp__percentage">
          <span>{label}: </span> <span>{this.percentageTo}%</span>
        </div>
        <div
          style={{ maxWidth: `calc(${trackWidth}%)`, marginLeft: `calc((${markerWidth / 2}%))`, paddingLeft: `${offsetLeft}px` }}
          className="SliderComp__track"
          ref={this.barTrack}
        >
          <div
            className="SliderComp__bar"
            style={{ width: isBarDragged ? `${dragValue}px` : `${this.valueToPct(value)}%` }}
            ref={this.scrollBarLine}
          >
            <span
              className="SliderComp__pole SliderComp__pole--first"
            />
            <span
              className="SliderComp__pole"
              ref={this.scrollBar}
            />
          </div>
        </div>
        <div className="SliderComp__markers">
          {markers}
        </div>
      </div>
    );
  }
}

SliderComp.propTypes = {
  label: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.number,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  offsetLeft: PropTypes.number,
  labelStep: PropTypes.number,
  markerStep: PropTypes.number,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

SliderComp.defaultProps = {
  label: '',
  unit: '',
  value: null,
  markerStep: 10,
  minVal: 0,
  maxVal: 100,
  offsetLeft: 0,
  labelStep: 50,
  onChange: () => {},
  name: '',
};

export default SliderComp;
