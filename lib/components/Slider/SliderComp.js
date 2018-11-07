import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventBus from 'eventing-bus';

require(`./Slider.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const EventsList = {
  UPDATE_HORIZONTAL_SCROLLBAR_POSITION: 'UPDATE_HORIZONTAL_SCROLLBAR_POSITION',
};

class SliderComp extends Component {
  constructor(props) {
    super(props);

    this.barTrack = React.createRef();
    this.scrollBar = React.createRef();

    this.state = {
      // <<<<< This component should get only Value and render UI state >>>>>

      // percentageFrom: null,
      // percentageTo: null,
      // isBarDragged: false,
      // dragStartPosition: null,
      // scrollBarMax: null,
      // storedBarTransform: null,
      // lastScrollValue: null
    };

    // this.onTrackClick = this.onTrackClick.bind(this);
    // this.onMouseMove = this.onMouseMove.bind(this);
    // this.onBarMouseUp = this.onBarMouseUp.bind(this);
  }

  componentDidMount() {
    // this.barTrack = this.barTrack.current;
    // this.scrollBar = this.scrollBar.current;
    // this.scrollBarMax = this.barTrack.offsetWidth - this.scrollBar.offsetWidth;
    // this.addEventsListeners(this.state);

    // EventBus.on(EventsList.UPDATE_HORIZONTAL_SCROLLBAR_POSITION, () => {
    //   if(this.lastScrollValue){
    //     this.updateElementsPosition({ scrollValue: this.lastScrollValue })
    //   }
    // })
  }

  addEventsListeners() {
    // this.scrollBar.addEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    // document.addEventListener('mousemove', this.onMouseMove, true);
    // document.addEventListener('mouseup', this.onBarMouseUp, true);
  }

  removeEventsListeners() {
    // this.scrollBar.removeEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    // document.removeEventListener('mousemove', this.onMouseMove, true);
    // document.removeEventListener('mouseup', this.onBarMouseUp, true);
  }

  onBarMouseDown(event) {
    // this.state.isBarDragged = true;
    // this.state.dragStartPosition = event.x;
  }

  onMouseMove(event) {
    // if(this.state.isBarDragged){
    //   this.updatePositions({ event, eventType: 'mousemove' })
    // }
  }

  onBarMouseUp(event) {
    // console.log('this.state in onBarMouseUp: ', this.state);
    // if(this.state.isBarDragged){
    //   setTimeout(() => {
    //     this.state.isBarDragged = false
    //     this.state.storedBarTransform = this.getBarTransformValue()
    //   })
    // }
  }

  onTrackClick(event) {
    // if(!this.state.isBarDragged){
    //   this.updatePositions({ event, eventType: 'click' })
    //   this.state.storedBarTransform = this.getBarTransformValue()
    // }
  }

  updatePositions({ event, eventType }) {
    // const scrollValue = this.getScrollValue({ event, eventType })
    //
    // this.updateBarPosition({ scrollValue })
    // this.updateElementsPosition({ scrollValue })
    // this.state.lastScrollValue = scrollValue
  }

  updateBarPosition({ scrollValue }) {
    // console.log(scrollValue, 'scrollValue');
    // this.scrollBar.style.transform = `translateX(${scrollValue}px)`
  }

  updateElementsPosition({ scrollValue }) {
    // if (this.scrollableElements) {
    //   this.scrollableElements.forEach(selector => {
    //
    //     const elements = document.querySelectorAll(selector)
    //
    //     if(elements && elements.length){
    //
    //       elements.forEach(target => {
    //         const scrollTrackMax = target.clientWidth - target.parentElement.parentElement.clientWidth
    //         const scrollMultiplier = scrollTrackMax / this.scrollBarMax
    //         const elementScrollValue = (scrollValue * scrollMultiplier)
    //         target.style.transform = `translateX(-${elementScrollValue}px)`
    //       })
    //     }
    //   })
    // }
  }

  getScrollValue({ event, eventType }) {

    // let scrollValue;
    //
    // switch(eventType){
    // case 'mousemove':
    //   scrollValue = (this.state.storedBarTransform || 0) + (event.x - this.state.dragStartPosition)
    //   break
    //
    // case 'click':
    //   const scrollBarX = this.scrollBar.getBoundingClientRect().x + (this.scrollBar.clientWidth / 2)
    //   scrollValue = event.x - scrollBarX + this.getBarTransformValue()
    //   break
    // }
    //
    // if(scrollValue > this.scrollBarMax){
    //   return this.state.scrollBarMax
    // }
    //
    // if(scrollValue < 0){
    //   return 0
    // }
    //
    // return scrollValue
  }

  getBarTransformValue() {
    // const value = this.scrollBar.style.transform.match(/translateX\((-?\d+\.?\d*px)\)/)

    // if(!value){
    //   return 0
    // } else {
    //   return parseFloat(value[1].replace('px'))
    // }
  }

  componentWillUnmount() {
    this.removeEventsListeners();
  }

  render() {
    const {
      unit,
      minVal,
      maxVal,
      label,
      value,
      markerDistance,
      markerStep,
      labelStep,
    } = this.props;

    const markers = [];
    const markerWidth = ((markerStep / maxVal) * 100).toFixed(2);
    const trackWidth = (100 - markerWidth).toFixed(2);

    for (let i = 0; i <= Math.ceil((maxVal - minVal) / markerStep); i++) {
      if (i % labelStep === 0) {
        markers.push((
          <div style={{ width: `${markerWidth}%` }} key={i} className="marker marker--accent">
            <span>{minVal + i * markerStep}{unit}</span>
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
          style={{ maxWidth: `${trackWidth}%`, marginLeft: `${markerWidth / 2}%` }}
          className="SliderComp__track"
          onClick={this.onTrackClick}
        >
          <div
            className="SliderComp__bar"
            ref={this.barTrack}
          />
          <span
            className="SliderComp__pole"
            ref={this.scrollBar}
          />
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
  labelStep: PropTypes.number,
  markerStep: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
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
  onClick: () => {},
};

export default SliderComp;
