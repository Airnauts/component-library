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
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value }) {
    this.setState({
      value,
    });
  }

  render() {
    const { value } = this.state;

    return (
      <SliderComp
        minVal={50}
        maxVal={150}
        unit="h"
        label="Risk"
        value={value}
        offsetLeft={20}
        markerStep={5}
        labelStep={4}
        onChange={this.handleChange}
      />);
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
