/**
 *
 * SectionMenu
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectSectionMenu from './selectors';
import messages from './messages';
import { color, typography } from '../../styles/constants';
import { ITEMS } from './constants';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from 'styled-components';
import {
  changeStepAction
} from '../MainPage/actions';

import { Switch, Route } from 'react-router-dom';
import SectionPinjaman from '../SectionPinjaman/Loadable';
import SectionInformasi from '../SectionInformasi/Loadable';

const GridWrapper = styled(props=>{
  return (
    <Grid {...props} />
  )
})`
&& {
  flex-direction:row;  
  justify-content:flex-start;
  align-items:flex-start;
  width:330px;
  padding-top:5px;
  padding-left:5px;
  padding-bottom:5px;
  background-color:${color.lightGrey};
  border-radius:6px;  
}
`;

const GridItem = styled(props=>{
  return (
    <Grid {...props} />
  )
})`
&& {  
  // background-color: ${props => props.active ? color.green : color.lightGrey};
  // background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => props.active ? "linear-gradient(to bottom, #76b852, #8dc26f)" : color.lightGrey};
  // background: linear-gradient(to right, #76b852, #8dc26f);
  width:80px;
  height:70px;
  margin:5px;
  padding:15px 10px;  
  border-radius:6px;
  text-align:center;
  align-items:center;
  justify-content:center;
}`;

const MenuType = styled(Typography)`
 && {
  padding-top:2px;
  font-family:${typography.fontFamily};
  font-size:11px;
  font-weight:bold;
  color:${props => props.active ? color.white : color.grey};
  text-transform:capitalize;
 }`;

class SectionMenu extends React.Component {
  constructor(props){
    super(props);
    this.renderMenus = this.renderMenus.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu(value){    
    const { history } = this.props;
    if(value === 1){
      // this.props.changeStep(value);
      return history.replace('/dashboard/pinjaman');
    } else if(value === 2){
      return history.replace('/dashboard/informasi');
    }    
  }
  
  renderMenus(){
    return ITEMS.map((item,i) => 
      <ButtonBase
        key={`item-${i}`} 
        centerRipple
        disabled={!item.active}
        style={{ borderRadius:6 }}
        onClick={evt=>this.handleMenu(item.step)}>
          <GridItem 
            item
            active={item.active}>
              <item.icon 
                style={{ 
                  color: item.active ? `${color.white}` : `${color.grey}`,
                  fontSize:20
                }} />
              <MenuType 
                align="center" 
                gutterBottom
                active={item.active}>
                {item.name}
              </MenuType>
          </GridItem>
      </ButtonBase>
    );
  }

  render(){
    return (
      <>
        <Grid 
          item 
          style={{ 
            paddingTop:10,
            paddingLeft:15,
            paddingBottom:5
          }}>
          <Typography 
            align="left"             
            style={{
              fontFamily:typography.fontFamily,
              fontSize:13,
              fontWeight:'bold',
              color:color.subtleBlack,
              textTransform:'capitalize'
            }}>
              quick menu
          </Typography>          
        </Grid>
        <Grid item>
          <GridWrapper 
            container>            
            {this.renderMenus()}
          </GridWrapper>
        </Grid>
        <Grid item style={{ marginTop:10 }}>
          <Switch>
            <Route 
              path="/dashboard"
              render={routeProps=>(
                <React.Fragment />
              )} />
            <Route 
              exact
              path="/dashboard/pinjaman"
              render={routeProps=>(
                <SectionPinjaman {...routeProps} />
              )} />
            <Route 
              exact
              path="/dashboard/informasi"
              render={routeProps=>(
                <SectionInformasi {...routeProps} />
              )} />
          </Switch>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sectionMenu: makeSelectSectionMenu(),
});

function mapDispatchToProps(dispatch) {
  return {    
    changeStep: (step) => dispatch(changeStepAction(step))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionMenu);
