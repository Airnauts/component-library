import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider } from '../lib';
import InputSwitcher from '../lib/components/InputSwitcher/InputSwitcher';

storiesOf('D3A/Atoms/InputSwitcher', module)
  .add(
    'InputSwitcher',
    withInfo(`
    InputSwitcher
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={{ padding: '100px 0' }}>
          <InputSwitcher label="Advanced settings">
            <ul>
              <li>Child1</li>
              <li>Child2</li>
              <li>Child3</li>
              <li>Child4</li>
            </ul>
          </InputSwitcher>
        </div>
      </ThemeProvider>
    )),
  );
