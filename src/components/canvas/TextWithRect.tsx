import React from 'react';
import { Rect, Text } from 'react-konva';
import { CanvasCell } from './CanvasDrawer';
import hexToRgba from '../Color';

interface Props {
  x: number;
  y: number;
  text: string;
  width: number;
  align?: string;
  fontStyle?: string;
  onClick?: () => void;
  isVisible: boolean;
  colors?: string[];
  /*isValueCell?: boolean;*/
  fill: string;
}

interface State {
  /*fill: string;*/
}

export default class TextWithRect extends React.Component<Props, State> {
  public static readonly ACCENT_COLOR = '#ff4b00';
  constructor(props: Props) {
    super(props);
    // this.state = {
    //   fill: /*props.isValueCell ? TextWithRect.ACCENT_COLOR : */ 'black',
    // };
  }
  // componentWillReceiveProps(nextProps: Props) {
  //   if (nextProps.isValueCell) {
  //     if (nextProps.text !== this.props.text) {
  //       // console.log(nextProps.text, this.props.text);
  //       this.setState({ fill: TextWithRect.ACCENT_COLOR });
  //     } else {
  //       this.setState({ fill: 'black' });
  //     }
  //   }
  // }
  render() {
    if (!this.props.isVisible) {
      return null;
    }
    const {
      x,
      y,
      text,
      width,
      align,
      fontStyle,
      onClick,
      colors,
      fill,
    } = this.props;
    const height = CanvasCell.HEIGHT;
    const isAlignCenter = align && align === 'center';
    const colorAndPos: (string | number)[] = [];
    if (Array.isArray(colors) && 0 < colors.length) {
      let pos = 0;
      const colorBuf = colors.length === 1 ? colors.concat(colors[0]) : colors;
      for (const color of colorBuf.map((color) => color + '44')) {
        colorAndPos.push(pos, hexToRgba(color));
        pos += 1.0 / (colorBuf.length - 1);
      }
    } else {
      // [Caution!] Microsoft Edge does not support
      // RGBA hexadecimal notation #RRGGBBAA (e.g. #00000000)
      colorAndPos.push(0, 'rgba(0,0,0,0)', 1, 'rgba(0,0,0,0)');
    }
    // if (this.state.fill === TextWithRect.ACCENT_COLOR) {
    //   let result = window.prompt(this.props.text + 'の値は？');
    //   if (result !== null && result === this.props.text) {
    //     console.log('correct');
    //   } else {
    //     console.log('wrong');
    //   }
    // }
    return (
      <React.Fragment>
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={`black`}
          // fill="rgba(0,0,0,127)"
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: width, y: 0 }}
          fillLinearGradientColorStops={colorAndPos}
        />
        <Text
          x={x}
          y={y}
          fontFamily="Consolas, 'Courier New', monospace"
          fontStyle={fontStyle ? fontStyle : 'normal'}
          align={align ? align : 'left'}
          verticalAlign="middle"
          offsetX={isAlignCenter ? 0 : -CanvasCell.FONT_SIZE / 2}
          width={width}
          height={height}
          text={text}
          fontSize={CanvasCell.FONT_SIZE}
          onClick={onClick ? onClick : undefined}
          fill={fill}
        />
      </React.Fragment>
    );
  }
}
