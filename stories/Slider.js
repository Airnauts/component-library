import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ThemeProvider, Card, SliderComp } from '../lib';

const wrapperStyle = {
  padding: '15px',
};

const cardStyle = {
  width: '340px',
  margin: '0 auto',
};

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: [10, 30],
      slider: 40,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { slider, range } = this.state;

    return (
      <React.Fragment>
        <SliderComp
          minVal={0}
          maxVal={100}
          unit="h"
          label="Hours per day"
          value={range}
          name="range"
          markerStep={5}
          labelStep={4}
          onChange={this.handleChange}
        />
        <SliderComp
          minVal={0}
          maxVal={100}
          name="slider"
          unit="%"
          label="Risk"
          value={slider}
          markerStep={5}
          labelStep={4}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

storiesOf('D3A/Organisms/Slider', module)
  .add(
    'Slider',
    withInfo(`
      Slider from https://github.com/react-component/slider

      ~~~js
      <SliderComp />
      ~~~

    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <Card style={cardStyle}>
            <Container />
          </Card>
        </div>
      </ThemeProvider>
    )),
  );
