import * as React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import translate from '../locales/translate';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import decideDifficulty from '../non-display/decideDifficulty';
import { setVariableList } from '../non-display/variableList';
import { ResourceContext, AnswerContextType } from './ResourceContext';

import '../css/fileform.css';
import { LangProps } from './Props';
import { slot } from './emitter';
type Props = LangProps;

interface State {
  output: string;
  value: string;
  ans: string;
  printed: boolean;
  variableList: string;
}

export default class AnswerForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      output: '',
      value: '',
      ans: '',
      printed: false,
      variableList: '',
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    slot('changeOutput', (output: string) => {
      this.setState({ output });
      if (output === '') {
        this.setState({ printed: false, ans: '' });
      } else {
        this.setState({ printed: true });
      }
    });
  }

  onChangeValue(e: any) {
    this.setState({ value: e.target.value });
  }

  checkAnswer() {
    let outputNormalized = this.state.output.replace(/\r?\n/g, '');
    let valueNormalized = this.state.value.replace(/\r?\n/g, '');
    if (outputNormalized === '') {
      this.setState({ ans: '' });
      return;
    }
    if (valueNormalized === outputNormalized) {
      this.setState({ ans: 'correct' });
    } else {
      this.setState({ ans: 'wrong' });
    }
  }

  onChangeVariableList(e: any) {
    this.setState({ variableList: e.target.value });
  }
  setVariable() {
    for (const variable of this.state.variableList.split(' ')) {
      setVariableList(variable);
    }
  }

  render() {
    const { answered, toggleAnswered }: AnswerContextType = this.context;
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          {!this.state.printed
            ? '最後まで実行してください'
            : '答えを入力してください'}
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Form inline>
            <FormGroup>
              {/* inputの改行でのリロード回避，ダミーinputを置く */}
              <FormControl style={{ display: 'none' }} />
              <FormControl
                value={this.state.value}
                onChange={(event) => {
                  this.onChangeValue(event as any);
                }}
              />
            </FormGroup>
            <Button
              type="button"
              onClick={() => {
                this.checkAnswer();
              }}
            >
              {translate(this.props.lang, 'submit')}
            </Button>
          </Form>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          {translate(this.props.lang, this.state.ans)}
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          {/*this.state.output*/}
        </Col>
        {/* <Col lg={12} md={12} sm={12} xs={12}>
          難易度ボタン
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Button
              type="button"
              onClick={() => {
                decideDifficulty(i);
              }}
            >
              {i}
            </Button>
          ))}
        </Col> */}
        <Col lg={12} md={12} sm={12} xs={12}>
          隠す変数リスト（スペース区切りで入力）
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Form inline>
            <FormGroup>
              {/* inputの改行でのリロード回避，ダミーinputを置く */}
              <FormControl style={{ display: 'none' }} />
              <FormControl
                value={this.state.variableList}
                onChange={(event) => {
                  this.onChangeVariableList(event as any);
                }}
              />
            </FormGroup>
            <Button
              type="button"
              onClick={() => {
                this.setVariable();
              }}
            >
              設定
            </Button>
          </Form>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          隠れている変数の値は？
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Form inline>
            <FormGroup>
              {/* inputの改行でのリロード回避，ダミーinputを置く */}
              <FormControl style={{ display: 'none' }} />
              <FormControl
                value={answered ? 'true' : 'false'}
                onChange={(event) => {
                  this.onChangeVariableList(event as any);
                }}
              />
            </FormGroup>
            <Button
              type="button"
              onClick={() => {
                toggleAnswered();
              }}
            >
              設定
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
AnswerForm.contextType = ResourceContext;
