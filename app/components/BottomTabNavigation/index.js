/**
 *
 * BottomTabNavigation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { color } from '../../styles/constants';

const BottomNavigationStyled = styled(BottomNavigation)`
  && {
    // background-color: ${color.toska['400']};
    background-color: ${color.biru['400']};
    position: fixed;
    width: 100%;
    bottom: 0px;
    left: 0px;
  }
`;

const NavigationAction = styled(BottomNavigationAction).attrs({
  classes: {
    selected: 'selected',
    label: 'label',
  },
})`
  && {
    color: ${color.lightGrey};
    // color:#68c972;
    &.selected {
      font-size: 10px;
      color: ${color.white};
    }
    .label {
      text-transform: capitalize;
      padding-top: 2px;
      font-size: 10px;
      font-weight: bold;
      color: ${color.white};
    }
  }
`;

function BottomTabNavigation(props) {
  const { tabs, bottomTabValue, handleBottomTabChange } = props;
  return (
    <BottomNavigationStyled
      color="primary"
      value={bottomTabValue}
      onChange={handleBottomTabChange}
    >
      {tabs.map(tab => (
        <NavigationAction
          key={`${tab.label}`}
          label={tab.label}
          value={tab.value}
          icon={<tab.icon />}
        />
      ))}
    </BottomNavigationStyled>
  );
}

BottomTabNavigation.propTypes = {
  tabs: PropTypes.array,
  bottomTabValue: PropTypes.number,
  handleBottomTabChange: PropTypes.func,
};

export default BottomTabNavigation;
