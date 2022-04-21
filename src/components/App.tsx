import * as React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import EditorSide from './EditorSide';
import CanvasSide from './CanvasSide';
import { LangProps, ProgLangProps, ThemeProps } from './Props';
import '../css/theme.css';
import Footer from './Footer';
import { ResourceContext } from './ResourceContext';
type Props = LangProps & ProgLangProps & ThemeProps;

interface State {
  answered: boolean;
  toggleAnswered: () => void;
}

export default class App extends React.Component<Props, State> {
  toggleAnswered: () => void;
  constructor(props: any) {
    super(props);
    this.toggleAnswered = () => {
      this.setState((state) => ({
        answered: !state.answered,
      }));
    };
    this.state = {
      answered: false,
      toggleAnswered: this.toggleAnswered,
    };
  }

  render() {
    const { lang, progLang, theme } = this.props;
    return (
      <ResourceContext.Provider value={this.state}>
        <Grid fluid={true}>
          <Row style={{ margin: '5px' }}>
            <Col
              lg={4}
              md={5}
              sm={6}
              xs={12}
              className={theme === 'light' ? 'theme-light' : 'theme-gray'}
            >
              <EditorSide lang={lang} progLang={progLang} />
            </Col>
            <Col
              lg={8}
              md={7}
              sm={6}
              xs={12}
              className={theme === 'light' ? 'theme-light' : 'theme-gray'}
            >
              <CanvasSide lang={lang} />
            </Col>
          </Row>
          <Footer fromYear={2018} />
        </Grid>
      </ResourceContext.Provider>
    );
  }
}
