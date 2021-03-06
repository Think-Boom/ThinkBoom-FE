import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';

type CardProps = {
  width: number;
  height: number;
  children?: React.ReactChild;
  isPointer?: boolean;
};

type StyleProps = {
  width?: number;
  height?: number;
  isPointer?: boolean;
};

const Card = ({ width, height, children, isPointer = true }: CardProps) => {
  return (
    <CardWrapper isPointer={isPointer}>
      <StyledCard width={width} height={height}>
        {children}
      </StyledCard>
      <AfterCard width={width} height={height} />
    </CardWrapper>
  );
};

const CardWrapper = styled.div<StyleProps>`
  position: relative;
  ${props => props.isPointer && `cursor: pointer;`}
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  z-index: 1;
  :hover {
    transform: translate(8px, 8px);
  }
`;

const AfterCard = styled.div<StyleProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  z-index: 0;
  left: 8px;
  top: 8px;
`;

export { Card };
