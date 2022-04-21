import { ThemeContext /*, themeType */ } from './theme-context';
import * as React from 'react';

// function ThemeTogglerButton() {
//   // ThemeTogglerButton は theme だけでなく、
//   // toggleTheme 関数もコンテクストから受け取ります
//   return (
//     <ThemeContext.Consumer>
//       {({ theme, toggleTheme }) => (
//         <button
//           onClick={toggleTheme}
//           style={{ backgroundColor: theme.background }}
//         >
//           Toggle Theme
//         </button>
//       )}
//     </ThemeContext.Consumer>
//   );
// }

class ThemeTogglerButton extends React.Component {
  render() {
    console.log(this.context);
    const { theme, toggleTheme } /*: themeType */ = this.context;
    // const theme = this.context.theme;
    // const func = this.context.toggleTheme;
    console.log('test');
    console.log(this.context);
    // console.log(func);
    return (
      <button
        onClick={toggleTheme}
        style={{ backgroundColor: theme.background }}
      >
        test
      </button>
    );
  }
}
ThemeTogglerButton.contextType = ThemeContext;
export default ThemeTogglerButton;
