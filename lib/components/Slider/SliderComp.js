import React, { Component } from 'react';
import EventBus from 'eventing-bus';

require(`./Slider.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

const EventsList = {
  UPDATE_HORIZONTAL_SCROLLBAR_POSITION: 'UPDATE_HORIZONTAL_SCROLLBAR_POSITION'
}

class SliderCompBar extends Component {
  constructor(props) {
    super(props);

    this.barTrack = React.createRef();
    this.scrollBar = React.createRef();

    this.state = {
      isBarDragged: false,
      dragStartPosition: null,
      scrollBarMax: null,
      storedBarTransform: null,
      lastScrollValue: null,
      tooltipVisible: false
    }

    this.onTrackClick = this.onTrackClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onBarMouseUp = this.onBarMouseUp.bind(this);
  }

  componentDidMount() {
    this.barTrack = this.barTrack.current;
    this.scrollBar = this.scrollBar.current;
    this.scrollBarMax = this.barTrack.offsetWidth - this.scrollBar.offsetWidth;
    this.addEventsListeners(this.state);

    EventBus.on(EventsList.UPDATE_HORIZONTAL_SCROLLBAR_POSITION, () => {
      if(this.lastScrollValue){
        this.updateElementsPosition({ scrollValue: this.lastScrollValue })
      }
    })
  }

  addEventsListeners() {
    this.scrollBar.addEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('mouseup', this.onBarMouseUp, true);
  }

  removeEventsListeners(){
    this.scrollBar.removeEventListener('mousedown', this.onBarMouseDown.bind(this), true);
    document.removeEventListener('mousemove', this.onMouseMove, true);
    document.removeEventListener('mouseup', this.onBarMouseUp, true);
  }

  onBarMouseDown(event){
    this.state.isBarDragged = true;
    this.state.dragStartPosition = event.x;
  }

  onMouseMove(event){
    if(this.state.isBarDragged){
      this.updatePositions({ event, eventType: 'mousemove' })
    }
  }

  onBarMouseUp(event){
    console.log('this.state in onBarMouseUp: ', this.state);
    if(this.state.isBarDragged){
      setTimeout(() => {
        this.state.isBarDragged = false
        this.state.storedBarTransform = this.getBarTransformValue()
      })
    }
  }

  onTrackClick(event){
    if(!this.state.isBarDragged){
      this.updatePositions({ event, eventType: 'click' })
      this.state.storedBarTransform = this.getBarTransformValue()
    }
  }

  updatePositions({ event, eventType }){
    const scrollValue = this.getScrollValue({ event, eventType })

    this.updateBarPosition({ scrollValue })
    this.updateElementsPosition({ scrollValue })
    this.state.lastScrollValue = scrollValue
  }

  updateBarPosition({ scrollValue }){
    this.scrollBar.style.transform = `translateX(${scrollValue}px)`
  }

  updateElementsPosition({ scrollValue }){
    if (this.scrollableElements) {
      this.scrollableElements.forEach(selector => {

        const elements = document.querySelectorAll(selector)

        if(elements && elements.length){

          elements.forEach(target => {
            const scrollTrackMax = target.clientWidth - target.parentElement.parentElement.clientWidth
            const scrollMultiplier = scrollTrackMax / this.scrollBarMax
            const elementScrollValue = (scrollValue * scrollMultiplier)
            target.style.transform = `translateX(-${elementScrollValue}px)`
          })
        }
      })
    }
  }

  getScrollValue({ event, eventType }){

    let scrollValue;

    switch(eventType){
    case 'mousemove':
      scrollValue = (this.state.storedBarTransform || 0) + (event.x - this.state.dragStartPosition)
      break

    case 'click':
      const scrollBarX = this.scrollBar.getBoundingClientRect().x + (this.scrollBar.clientWidth / 2)
      scrollValue = event.x - scrollBarX + this.getBarTransformValue()
      break
    }

    if(scrollValue > this.scrollBarMax){
      return this.state.scrollBarMax
    }

    if(scrollValue < 0){
      return 0
    }

    return scrollValue
  }

  getBarTransformValue(){
    const value = this.scrollBar.style.transform.match(/translateX\((-?\d+\.?\d*px)\)/)

    if(!value){
      return 0
    } else {
      return parseFloat(value[1].replace('px'))
    }
  }

  componentWillUnmount() {
    this.removeEventsListeners();
  }

  render() {
    return (
      <div
        className="SliderComp__bar"
        onClick={this.onTrackClick}
        ref={this.barTrack}
      >
        <span
          className="SliderComp__bar-inner"
          ref={this.scrollBar}
        />
      </div>
    )
  }
}


class SliderComp extends Component {
  render() {
    return (
      <div className="SliderComp">
        <div className="SliderComp__inner">
          <SliderCompBar />
        </div>
      </div>
    )
  }
}

export default SliderComp;
