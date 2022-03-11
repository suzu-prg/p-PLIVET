import React from 'react';
import { Group } from 'react-konva';
import { CanvasRow, CanvasCell } from './CanvasDrawer';
import TextWithRect from './TextWithRect';

interface Props {
  canvasRow: CanvasRow;
}

interface State {
  fill: string;
}

export default class VariableRect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fill: TextWithRect.ACCENT_COLOR,
    };
    const canvasRow = this.props.canvasRow;
    const variableName = canvasRow[canvasRow.length - 3].getText();
    const text = canvasRow[canvasRow.length - 2].getText();
    let correct = false;
    for (let i = 0; i < 3; ++i) {
      const result = window.prompt(variableName + 'の値は？');
      if (result !== null && result === text) {
        window.alert('correct');
        correct = true;
        break;
      } else {
        window.alert('wrong');
      }
    }
    if (!correct) {
      window.alert('answer: ' + text);
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    const nextCanvasRow = nextProps.canvasRow;
    console.log(nextCanvasRow[nextCanvasRow.length - 2].getText());
    this.setState({ fill: 'black' });
  }
  render() {
    const canvasRow = this.props.canvasRow;
    const list = canvasRow.map(
      (cell: CanvasCell, index: number, array: CanvasCell[]) => {
        const { width, isVisible, key } = cell;
        const x = cell.x();
        const y = cell.y();
        const text = cell.getText();
        const canToggleFold = cell.canToggleFold();
        return (
          <TextWithRect
            key={key}
            x={x}
            y={y}
            text={text}
            width={width}
            align={canToggleFold ? 'center' : undefined}
            onClick={canToggleFold ? () => cell.toggleFold() : undefined}
            isVisible={isVisible}
            colors={cell.getColors()}
            /*isValueCell={index === array.length - 2}*/
            fill={index === array.length - 2 ? this.state.fill : 'black'}
          />
        );
      }
    );
    return <Group>{list}</Group>;
  }
}
