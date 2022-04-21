import { ThemeContext, themes } from './theme-context';
import ThemeTogglerButton from './themed-button';
import * as React from 'react';

interface Props {}

interface State {
  theme: {
    foreground: string;
    background: string;
  };
  toggleTheme: () => void;
}

// ThemedButtonを使用する中間のコンポーネント

export default class App extends React.Component<Props, State> {
  toggleTheme: () => void;
  constructor(props: any) {
    super(props);
    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // ThemeProvider 内の ThemedButton ボタンは
    // state からのテーマを使用し、外側では
    // デフォルトの dark テーマを使用します
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <ThemeTogglerButton />
        </ThemeContext.Provider>
      </div>
    );
  }
}
