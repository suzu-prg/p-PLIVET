import * as React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import translate from '../locales/translate';

import '../css/fileform.css';
import { LangProps } from './Props';
type Props = LangProps;

interface State {
  value: string;
  ans: boolean;
}

export default class AnswerForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '', ans: false };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e: any) {
    this.setState({ value: e.target.value });
  }

  checkAnswer() {
    if (this.state.value === 'a') {
      this.setState({ ans: true });
    } else {
      this.setState({ ans: false });
    }
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <FormControl
            value={this.state.value}
            onChange={(event) => this.onChange(event as any)}
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
        {this.state.ans
          ? translate(this.props.lang, 'correct')
          : translate(this.props.lang, 'wrong')}
      </Form>
    );
  }
}
