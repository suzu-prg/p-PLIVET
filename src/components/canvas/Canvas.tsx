import * as React from 'react';
import { Stage } from 'react-konva';
import { slot } from '../emitter';
import { ExecState } from 'unicoen.ts/dist/interpreter/Engine/ExecState';
import CanvasContent from './CanvasContent';
import '../../css/canvas.css';
import { CanvasDrawer } from './CanvasDrawer';
import { ResourceContext, AnswerContextType } from '../ResourceContext';

interface Props {
  width: number;
  height: number;
  scale: number;
}
interface State {
  execState?: ExecState;
  show: boolean;
}
// Canvas以外の場所，もっと上の段階で新規・更新かどうかを判定する
// コンテキスト？

export default class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { execState: undefined, show: false };
    slot('draw', (execState: ExecState) => this.setState({ execState }));
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    const { answered, toggleAnswered }: AnswerContextType = this.context;
    console.log('canvas: ' + answered);
    console.log('canvas: ' + toggleAnswered);
    return (
      <div id="display">
        <Stage
          width={0.95 * this.props.width}
          height={0.95 * this.props.height}
          scale={{ x: this.props.scale, y: this.props.scale }}
        >
          <CanvasContent
            canvasDrawer={new CanvasDrawer(this.state.execState)}
          />
        </Stage>
      </div>
    );
  }
}
Canvas.contextType = ResourceContext;
