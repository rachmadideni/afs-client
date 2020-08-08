import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import bgDashboard from 'images/wave-green-bg.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, typography } from '../../../styles/constants';

// Welcome user
export const WelcomeUser = styled(typographyProps => (
  <Typography {...typographyProps} />
))`
  line-height:1;
  && {
    font-weight: bold;
  }
`;

// Swipeables How To Text
export const SwipeablesHowTo = styled(typographyProps => (
  <Typography
    variant="subtitle1"
    align="center"
    gutterBottom
    {...typographyProps}
  />
))`
  && {
    font-size: 10px;
    font-weight: 500;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

// content section
export const Content = styled(Grid)`
  width: 100%;
  margin-top: 10px;
`;

export const SwipeableItemsWrap = styled(props => <div {...props} />)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-right: 10px;
`;

// HEADER
export const Header = styled(props => (
  <Grid item {...props}>
    <HeaderText align="left">Menu</HeaderText>
  </Grid>
))`
  && {
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 5px;
  }
`;

export const HeaderText = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-size: 13px;
    font-weight: bold;
    color: ${color.subtleBlack};
    text-transform: capitalize;
  }
`;

// GRID WRAPPER
export const GridWrapper = styled(props => (
  <Grid container wrap="nowrap" {...props} />
))`
  && {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 330px;
    width: 280px;
    margin-top:15px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: ${color.white};//lightGrey
    border-radius: 6px;
  }
`;

// Grid Item
export const GridItem = styled(({ active, ...otherProps }) => (
  <Grid {...otherProps} />
))`
  && {
    // background-color: ${active =>
    active ? color.biru[400] : color.lightGrey};    
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 90px;
    height: 75px;
    margin: 5px;
    padding: 15px 10px;
    border-radius: 6px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

// Quick Menu ITem
export const MenuType = styled(Typography)`
  && {
    padding-top: 2px;
    font-family: ${typography.fontFamily};
    font-size: 11px;
    font-weight: bold;
    color: ${props => (props.active ? color.white : color.grey)};
    text-transform: capitalize;
  }
`;

const StyledButtonBase = styled(props => <ButtonBase {...props} />)`
&& {
  // .root {
  //   background-color:green;
  //   width:100px;
  // }
  border-radius: 6px;
  // background-color:${color.toska[400]};      
  margin-top:30px;
  margin-bottom:40px;
  background-image:url(${bgDashboard});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}`;

export const SwipeableItem = ({ item, onSwipeablesClick }) => (
  <StyledButtonBase
    centerRipple
    disabled={!item.active}
    variant="outlined"
    onClick={() => onSwipeablesClick(item.step)}
  >
    <GridItem item active={item.active}>
      <item.icon
        style={{
          color: item.active ? `${color.white}` : `${color.grey}`,
          fontSize: 28,
        }}
      />
      <MenuType align="center" gutterBottom active={item.active}>
        {item.name}
      </MenuType>
    </GridItem>
  </StyledButtonBase>
);

SwipeableItem.propTypes = {
  item: PropTypes.object,
  onSwipeablesClick: PropTypes.func,
};
