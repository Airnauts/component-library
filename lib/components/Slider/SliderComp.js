import React, { Component } from 'react';
import PropTypes from 'prop-types';

require(`./Slider.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

class SliderComp extends Component {
  constructor(props) {
    super(props);
    this.barTrack = React.createRef();
    this.startPole = React.createRef();
    this.endPole = React.createRef();
    this.markers = React.createRef();

    this.state = {
      // <<<<< This component should get only Value and render UI state >>>>>
      percentageFrom: null,
      percentageTo: null,
      isBarDragged: false,
      draggedPole: null,
      dragStartPosition: null,
      storedBarTransform: null,
      lastScrollValue: null,
      offsetLeft: 20,
      scrollBarMax: null,
    };

    this.isRange = Array.isArray(this.props.value);


    // this.onTrackClick = this.onTrackClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onSliderMouseDown = this.onSliderMouseDown.bind(this);
  }


  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      scrollBarMax: this.barTrack.current.getBoundingClientRect().width,
    });
    this.addEventsListeners(this.state);
  }

  componentWillUnmount() {
    this.removeEventsListeners();
  }

  onStartPoleMouseDown() {
    if (this.isRange) {
      const { value } = this.props;

      this.setState({
        isBarDragged: true,
        draggedPole: 'start',
        dragValue: value,
      });
    }
  }

  onSliderMouseDown(event) {
    const {
      minVal,
      maxVal,
      value,
      onChange,
      name,
    } = this.props;

    const newValue = this.scrollPxToValue(event.x - this.getScrollBarStartX());
    if (newValue < minVal || newValue > maxVal) {
      return;
    }

    if (this.isRange) {
      if (newValue === value[0] || newValue === value[1]) {
        // pole clicked
        return;
      }

      if (newValue > value[1]) {
        onChange({ name, value: [value[0], newValue] });
      } else if (newValue < value[0]) {
        onChange({ name, value: [newValue, value[1]] });
      } else if (newValue - value[0] > (value[1] - value[0]) / 2) {
        // clicked place is closer to end pole
        onChange({ name, value: [value[0], newValue] });
      } else {
        // clicked place is closer to start pole
        onChange({ name, value: [newValue, value[1]] });
      }
    } else if (newValue !== value) {
      onChange({ name, value: newValue });
    }
  }

  onEndPoleMouseDown() {
    const { value } = this.props;

    this.setState({
      isBarDragged: true,
      draggedPole: 'end',
      dragValue: value,
    });
  }

  onMouseMove(event) {
    const {
      isBarDragged,
      draggedPole,
    } = this.state;

    const {
      minVal,
      maxVal,
      value,
    } = this.props;

    if (isBarDragged) {
      const scrollValue = this.scrollPxToValue(event.x - this.getScrollBarStartX());
      if (scrollValue < minVal || scrollValue > maxVal) {
        return;
      }

      if (this.isRange) {
        if ((draggedPole === 'start' && scrollValue < value[1]) || (draggedPole === 'end' && scrollValue > value[0])) {
          this.setState({
            dragValue: draggedPole === 'start' ? [scrollValue, value[1]] : [value[0], scrollValue],
          });
        }
      } else {
        this.setState({
          dragValue: scrollValue,
        });
      }
    }
  }

  onMouseUp() {
    const {
      isBarDragged,
      dragValue,
    } = this.state;

    const {
      onChange,
      name,
    } = this.props;

    if (isBarDragged) {
      this.setState({
        isBarDragged: false,
      });

      onChange({ name, value: dragValue });
    }
  }

  getScrollBarStartX() {
    return this.barTrack.current.getBoundingClientRect().x;
  }

  scrollPxToValue(scrollPx) {
    const {
      minVal,
      maxVal,
      markerStep,
    } = this.props;

    const stepsCount = Math.ceil((maxVal - minVal) / markerStep);
    const pxPerStep = this.state.scrollBarMax / stepsCount;
    return (Math.round(scrollPx / pxPerStep) * markerStep) + minVal;
  }

  valueToPct(value) {
    const {
      minVal,
      maxVal,
    } = this.props;

    return ((value - minVal) / (maxVal - minVal)) * 100;
  }

  valueToPx(value) {
    const {
      minVal,
      maxVal,
    } = this.props;

    return ((value - minVal) / (maxVal - minVal)) * this.state.scrollBarMax;
  }

  addEventsListeners() {
    this.startPole.current.addEventListener('mousedown', this.onStartPoleMouseDown.bind(this), true);
    this.endPole.current.addEventListener('mousedown', this.onEndPoleMouseDown.bind(this), true);
    this.barTrack.current.addEventListener('mousedown', this.onSliderMouseDown, true);
    this.markers.current.addEventListener('mousedown', this.onSliderMouseDown, true);
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('mouseup', this.onMouseUp, true);
  }

  removeEventsListeners() {
    this.startPole.current.removeEventListener('mousedown', this.onStartPoleMouseDown.bind(this), true);
    this.endPole.current.removeEventListener('mousedown', this.onEndPoleMouseDown.bind(this), true);
    this.barTrack.current.removeEventListener('mousedown', this.onSliderMouseDown, true);
    this.markers.current.removeEventListener('mousedown', this.onSliderMouseDown, true);
    document.removeEventListener('mousemove', this.onMouseMove, true);
    document.removeEventListener('mouseup', this.onMouseUp, true);
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
      errorMsg,
    } = this.props;

    const {
      isBarDragged,
      dragValue,
    } = this.state;

    const markers = [];
    const markerWidth = (((markerStep / ((maxVal - minVal))) * 100).toFixed(2));
    const markersArrayLength = Math.ceil((maxVal - minVal) / markerStep);


    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= markersArrayLength; i++) {
      if (i % labelStep === 0) {
        if (i === 0 || i === markersArrayLength) {
          markers.push((
            <div style={{ width: `calc(${markerWidth}% / 2)` }} key={i} className="marker marker--accent">
              <span>{minVal + (i * markerStep)}{unit}</span>
            </div>
          ));
        } else {
          markers.push((
            <div style={{ width: `${markerWidth}%` }} key={i} className="marker marker--accent">
              <span>{minVal + (i * markerStep)}{unit}</span>
            </div>
          ));
        }
      } else {
        markers.push((<div style={{ width: `${markerWidth}%` }} key={i} className="marker" />));
      }
    }

    const usedValue = isBarDragged ? dragValue : value;

    const { offsetLeft, barWidth } = this.isRange
      ? {
        offsetLeft: this.valueToPx(usedValue[0]),
        barWidth: this.valueToPx(usedValue[1]) - this.valueToPx(usedValue[0]),
      }
      : {
        offsetLeft: 0,
        barWidth: this.valueToPx(usedValue),
      };

    return (
      <div className="SliderComp">
        <div className="SliderComp__label">
          <span>{label}: </span> <span>{this.isRange ? `${usedValue[0]}-${usedValue[1]}` : usedValue}</span>
        </div>
        <div
          style={{ paddingLeft: `${offsetLeft}px` }}
          className="SliderComp__track"
          ref={this.barTrack}
        >
          <div
            className="SliderComp__bar"
            style={{ width: `${barWidth}px` }}
          >
            <span
              className={`SliderComp__pole SliderComp__pole--first ${this.isRange ? null : 'SliderComp__pole--hidden'}`}
              ref={this.startPole}
            />
            <span
              className="SliderComp__pole"
              ref={this.endPole}
            />
          </div>
        </div>
        <div
          className="SliderComp__markers"
          ref={this.markers}
        >
          {markers}
        </div>
        <span className="SliderComp__error-msg" style={{ display: errorMsg != null ? 'block' : 'none' }}>{ errorMsg }</span>
      </div>
    );
  }
}

SliderComp.propTypes = {
  label: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  labelStep: PropTypes.number,
  markerStep: PropTypes.number,
  onChange: PropTypes.func,
  name: PropTypes.string,
  errorMsg: PropTypes.string,
};

SliderComp.defaultProps = {
  label: '',
  unit: '',
  value: null,
  markerStep: 10,
  minVal: 0,
  maxVal: 100,
  labelStep: 50,
  onChange: () => {},
  name: '',
  errorMsg: null,
};

export default SliderComp;
