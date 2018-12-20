import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, Button } from '../lib';
import IconSolar from './img/icon_solar.svg';
import IconPlus from './img/icon_plus.svg';

const divStyle = {
  padding: '15px',
};

storiesOf('D3A/Atoms/Button', module)
  .add(
    'primary',
    withInfo(`
      <Button />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            label="primary"
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'secondary',
    withInfo(`
      <Button type="secondary"/>
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            label="reconfigure"
            type="secondary"
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'accent',
    withInfo(`
      <Button />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            label="accent"
            type="accent"
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'accent secondary',
    withInfo(`
      <Button />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            type="icon"
            icon={IconPlus}
            iconOnly
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'accent with icon',
    withInfo(`
      <Button />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            label="New simulation"
            type="accent"
            icon={IconPlus}
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'call to action',
    withInfo(`
      <Button type="cta" />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            type="cta"
            label="Action"
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'icon',
    withInfo(`
      <Button type="icon" icon={IconSolar} />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            type="icon"
            label="SolarPower"
            icon={IconSolar}
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'disabled',
    withInfo(`
      <Button />
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={divStyle}>
          <Button
            label="disabled"
            disabled
            onClick={action('clicked')}
          />
        </div>
      </ThemeProvider>
    )),
  );
