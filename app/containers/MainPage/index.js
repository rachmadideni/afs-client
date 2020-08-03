/**
 *
 * MainPage
 *
 */
import 'swiper/css/swiper.css';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import Swipeables from 'react-id-swiper';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { color } from 'styles/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import SectionInformasi from '../SectionInformasi/Loadable';
import SectionPinjaman from '../SectionPinjaman/Loadable';
import { cekPinjamanAction, changeStepAction } from './actions';
import {
  GridWrapper as SwipeableWrapper,
  SwipeableItem,
  SwipeablesHowTo,
  WelcomeUser,
  Content,
  SwipeableItemsWrap,
} from './components';
import { SWIPEABLES, SWIPEABLE_PARAM } from './constants';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectActiveStep, makeSelectStatusAplikasi } from './selectors';

const Wrapper = styled(props => <Grid {...props}>{props.children}</Grid>)`
  && {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // background-color: ${color.white};
  }
`;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderSwipeables = this.renderSwipeables.bind(this);
    this.onSwipeablesClick = this.onSwipeablesClick.bind(this);
  }

  componentDidMount() {
    this.props.changeStep(0);
    this.props.cekPinjaman();
  }

  componentDidUpdate(prevProps) {
    const { history, activeStep } = this.props;

    if (prevProps.activeStep !== this.props.activeStep) {
      if (activeStep === 0) {
        return history.push('/dashboard');
      }

      if (activeStep === 1) {
        this.props.cekPinjaman();
        return history.push('/dashboard/pinjaman');
      }

      if (activeStep === 2) {
        return history.push('/dashboard/informasi');
      }
    }
    return false;
  }

  renderSwipeables() {
    return SWIPEABLES.map(item => (
      <SwipeableItemsWrap image={item.image}>
        <SwipeableItem
          key={`quick-menu-${item.step}`}
          item={item}
          onSwipeablesClick={this.onSwipeablesClick}
        />
      </SwipeableItemsWrap>
    ));
  }

  onSwipeablesClick(value) {
    this.props.changeStep(value);
  }

  render() {
    const { intl, history } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <Grid item>
          <WelcomeUser>{intl.formatMessage(messages.welcomeUser)}</WelcomeUser>

          <SwipeablesHowTo>
            {intl.formatMessage(messages.swipeablesHowTo)}
          </SwipeablesHowTo>

          <SwipeableWrapper>
            <Swipeables {...SWIPEABLE_PARAM}>
              {this.renderSwipeables()}
            </Swipeables>
          </SwipeableWrapper>
        </Grid>

        <Content item>
          <Switch>
            <Route
              exact
              path="/dashboard/pinjaman"
              render={routeProps => (
                <SectionPinjaman history={history} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/dashboard/informasi"
              render={routeProps => <SectionInformasi {...routeProps} />}
            />
          </Switch>
        </Content>
      </Wrapper>
    );
  }
}

MainPage.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  changeStep: PropTypes.func,
  cekPinjaman: PropTypes.func,
  activeStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  activeStep: makeSelectActiveStep(),
  statusAplikasi: makeSelectStatusAplikasi(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStep: step => dispatch(changeStepAction(step)),
    cekPinjaman: () => dispatch(cekPinjamanAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  injectIntl,
  withConnect,
  memo,
)(MainPage);
