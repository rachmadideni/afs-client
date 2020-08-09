import React, { memo } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectTourState, makeSelectTourDialogStart } from './selectors';
import { toggleTour, toggleTourDialogStart } from "./actions";
import { color } from '../../styles/constants';

import Grid from '@material-ui/core/Grid';
import AppBar from 'components/AppBar';
import AppToolbar from 'components/AppToolbar';
import AppHeaderIcon from "components/AppHeaderIcon";
import AppHeaderNotification from "components/AppHeaderNotification";
import AppHeaderSettings from "components/AppHeaderSettings";
import BottomTabNavigation from 'components/BottomTabNavigation';

// containers
import FormSubmissionStep from 'containers/FormSubmissionStep';
import FormSummary from 'containers/FormSummary/Loadable';
import UserProfile from 'containers/UserProfile/Loadable';
import ChangePasswordPage from 'containers/ChangePasswordPage/Loadable';
import FormAkadStep from 'containers/FormAkadStep/Loadable';
import MainPage from 'containers/MainPage/Loadable';

import bgDashboard from 'images/wave-red-bg.png';
import afsImage from 'images/icon-512x512.png';
import { TABS } from './constants';

import ReactTour from "components/ReactTour";
import DialogTourStart from "components/DialogTourStart"; 

const Wrapper = styled(Grid)`
&& {
  flex:1;
  position: relative;
  background-image:url(${bgDashboard});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content:center;
  align-items:center;
  width:100%;
  height: 100vh;
  //padding-left:25px;
  //padding-right:25px;
  opacity: 1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color:${color.lightGreen};
    // background-image: linear-gradient(to bottom, ${color.white} 50%, ${
  color.green
} 100%);
    opacity: 0.5;
  }  
}`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomTabValue: 0, //dashboard      
    };
  }

  componentDidMount(){
    // this.props.toggleTour(true);    
    if(this.props.history.location.pathname === "/dashboard"){
      this.props.toggleTourDialogStart(true);
    }    
  }  

  handleBottomTabChange = (e, value) => {
    this.setState({
      bottomTabValue: value,
    });

    const { history } = this.props;

    // dashboard
    if (value === 0) {
      return history.replace('/dashboard');
    }

    // profil
    if (value === 1) {
      return history.replace('/profil');
    }
    return null;
  };

  getBottomTabs = () =>
    TABS.map((tab, tabIndex) => ({
      label: tab.label,
      value: tabIndex, //tab.value
      icon: tab.icon,
    }));
  
  goToInbox = () => {
    this.props.history.push('/inbox');
  }

  render() {
    const { history } = this.props;
    return (
      // <Wrapper container wrap="nowrap" direction="column">
      <React.Fragment>
        <DialogTourStart 
          open={this.props.isTourDialogStart} 
          onClose={()=>this.props.toggleTourDialogStart(false)}
          onClickActionButton={()=>{
            this.props.toggleTourDialogStart(false);
            this.props.toggleTour(true);
          }}
          onRejectUserGuide={()=>{
            this.props.toggleTourDialogStart(false);
          }} />
        <AppBar color="white" position="sticky" elevation={1}>
          <AppToolbar style={{ justifyContent: 'flex-start' }}>
            <AppHeaderIcon src={afsImage} />
            <div style={{ flexGrow:1 }} />
            <AppHeaderNotification 
              count={0}
              onClick={()=>this.goToInbox()} />
            <AppHeaderSettings />                        
          </AppToolbar>
        </AppBar>
        
        <Switch>
          <Route
            path="/dashboard"
            render={routeProps => (
              <MainPage history={history} {...routeProps} />
            )}
          />

          <Route
            path="/dashboard/section:(pinjaman|informasi)"
            render={routeProps => (
              <MainPage history={history} {...routeProps} />
            )}
          />

          <Route
            path="/application-form/step/customer"
            render={routeProps => (
              <FormSubmissionStep history={history} {...routeProps} />
            )}
          />

          <Route
            path="/application-form/step/customer/section:(installment|personal-details|work-history|documents|summary)"
            render={routeProps => (
              <FormSubmissionStep history={history} {...routeProps} />
            )}
          />

          <Route
            path="/summary"
            render={routeProps => (
              <FormSummary history={history} {...routeProps} />
            )}
          />

          <Route
            path="/akad"
            render={routeProps => (
              <FormAkadStep history={history} {...routeProps} />
            )}
          />

          <Route
            path="/profil"
            render={routeProps => (
              <UserProfile history={history} {...routeProps} />
            )}
          />

          {/* <Route
            path="/inbox"
            render={routeProps => (
              <UserInbox history={history} {...routeProps} />
            )}
          /> */}

          <Route
            path="/changePassword"
            render={routeProps => (
              <ChangePasswordPage history={history} {...routeProps} />
            )}
          />
        </Switch>            
        <BottomTabNavigation
          tourSelectorId="tut-navigasi"              
          tabs={this.getBottomTabs()}
          bottomTabValue={this.state.bottomTabValue}
          handleBottomTabChange={this.handleBottomTabChange}
        />
        <>
          <ReactTour 
            isOpen={this.props.isTourOpen}            
            onRequestClose={() => this.props.toggleTour(false)}
            update={this.props.history.location.pathname}
            updateDelay={1000} />
        </>          
      </React.Fragment>
      // </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isTourOpen: makeSelectTourState(),
  isTourDialogStart: makeSelectTourDialogStart()
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTour: (tourState) => dispatch(toggleTour(tourState)),
    toggleTourDialogStart: (dialogState) => dispatch(toggleTourDialogStart(dialogState))
  };
}

const withReducer = injectReducer({ key: 'dashboard', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  injectIntl,
  memo,
)(Dashboard);
