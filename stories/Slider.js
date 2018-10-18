// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions';
//
// import { ThemeProvider, Card, SliderComp } from '../lib';
//
// const wrapperStyle = {
//   padding: '15px',
// };
//
// const cardStyle = {
//   width: '340px',
//   margin: '0 auto',
// };
//
//
// storiesOf('D3A/Organisms/Slider', module)
//   .add(
//     'Slider',
//     withInfo(`
//       Slider from https://github.com/react-component/slider
//
//       ~~~js
//       <SliderComp />
//       ~~~
//
//     `)(() => (
//       <ThemeProvider theme="d3a">
//         <div className="base" style={wrapperStyle}>
//           <Card style={cardStyle}>
//             <SliderComp
//               min={0}
//               max={24}
//               markerDistance={1}
//               unit="h"
//               onBeforeChange={action('onBeforeChange')}
//               onAfterChange={action('onAfterChange')}
//               onChange={action('onChange')}
//             />
//           </Card>
//         </div>
//       </ThemeProvider>
//     )),
//   );
