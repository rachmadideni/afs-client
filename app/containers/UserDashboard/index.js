/**
 *
 * UserDashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  status_sp3
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  cekSp3Action
} from './actions'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

// Component
import DashboardWelcomeUser from '../../components/DashboardWelcomeUser';

import BookIcon from '@material-ui/icons/Book';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import PagesIcon from '@material-ui/icons/Pages';

import { typography, color } from '../../styles/constants';
import demimoore from '../../images/demimoore.jpg';
import styled from 'styled-components';

const Wrapper = styled( props => {
  return (
    <Grid 
      container 
      wrap="nowrap" 
      direction="column"
      {...props}>
      {props.children}
    </Grid>
  );
})`
  && {
    display:flex;    
    padding-top:20px;
    background-color:transparent;
    justify-content:center;
    align-items:center;
    margin-top:12px;
    padding-left:10px;
    padding-right:10px;
  }
`;

const StyledTabs = styled(Tabs).attrs({
  classes:{
    flexContainer: 'flex-container',
    indicator:'indicator'
  }
})`
  && {
    .flex-container {
      flex-direction: row;
    }
    .indicator {
      display:none;
    }
  }
`

const IconTab = styled(Tab).attrs({
  classes:{
    selected:'selected',
    wrapper:'wrapper',
    disabled:'disabled'
  }
})`
  && {
    // width:120px;
    // min-height: 58px;
    min-width: 120px;
    flex-direction:row;    
    
    transition: background-color 200ms ease-in-out;
    border-radius:4px;
    border:solid 1px ${color.grey};
    box-shadow:none;
    font-size:12px;
    font-weight:bold;
    text-transform:capitalize;
    // color:${color.green};
    margin:4px;
    font-family:${typography.fontFamily};    
    line-height:1.2;            
    background-image:linear-gradient(${color.green},${color.blue});
    color:${color.white};    
    opacity: 1;
  }
  
  &.selected {    
    opacity: 1;
    font-weight:bold;
    text-transform:capitalize;
  }

  &.disabled {
    opacity: 0.1;
    background-color:${color.grey};
  }`;

export function ProductTabs(props){
  const { tabs, intl, ...tabsProps } = props;
  return (
    <StyledTabs  {...tabsProps}>
      {tabs.map((tab, index) => {
        const key = `navTab-${tab.label}-${index}`;
        return <IconTab key={key} icon={<tab.icon />} disabled={tab.disabled} label={intl.formatMessage(tab.label)} />;
      })}
    </StyledTabs>
  );
}


class UserDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      MenuTabValue:-1
    }
  }
  
  componentDidMount(){
    this.props.cekSp3();
  }

  getTabs = () => {
    const {
      status_sp3
    } = this.props;

    return [
      {
        icon: AddCircleIcon,
        label: messages.btnFormPengajuan,
        value:0,
        disabled: status_sp3 > 0 && status_sp3 < 3 ? true : false 
      },
      {
        icon: BookIcon,
        label: messages.btnFormAkad,
        value:1,
        disabled: status_sp3 === 2 ? false : true
      }
    ];
  }

  handleMenuTabChange = (e, value) => {
    this.setState({
      MenuTabValue:value
    });
    const { history } = this.props;
    if(value === 0){
      return history.replace('/application-form/step/customer/installment');
    }
    else if(value === 1){
      return history.replace('/akad');
    }
  }

  onClickProduct = () => {
    const { history } = this.props;    
    return history.replace('/application-form/step/customer/installment');
  }

  render(){
    const { intl } = this.props
    return (
      <Wrapper>      
      
          <DashboardWelcomeUser 
            imgProps={demimoore} 
            welcomeText={`Selamat datang di \nAplikasi Pembiayaan`} />          
          
          <Grid 
            item
            style={{
              width:'100%',
              padding:'12px 20px 15px 20px',               
              border:`solid 2px ${color.lightGrey}`,
              borderRadius:8
            }}>
              <Typography
                align="left"
                gutterBottom
                style={{
                  textTransform:'capitalize',
                  fontWeight:'bold'
                }}>
                pengajuan
              </Typography>          
              
              <Grid 
                item 
                style={{ 
                  width:250,
                  marginBottom:10,
                }}>
                
                <Typography               
                  align="center"                            
                  style={{
                    fontFamily:typography.fontFamily,
                    fontSize:11,
                  }}>
                  {
                    this.props.status_sp3 === 1 && 
                    <span>{`pengajuan anda sdh kami terima terima.                    
                    silahkan tunggu informasi selanjutnya`}</span>
                    
                  }                  
                  {
                    this.props.status_sp3 === 0 && 
                    `${intl.formatMessage(messages.noApplicationYet)}  
                    ${intl.formatMessage(messages.pembiayaanMultiGuna)}`
                  }
                </Typography>
                                
              </Grid>

              <ProductTabs 
                intl={intl}
                centered
                orientation="vertical"
                value={this.state.MenuTabValue}
                onChange={this.handleMenuTabChange} 
                tabs={this.getTabs()} />
              
              <Grid 
                container
                wrap="nowrap"
                direction="column"
                style={{
                  justifyContent:'space-around',
                  alignItems:'space-around'
                }}>
                  <Grid item>
                    <Card 
                      variant="outlined"
                      style={{ paddingTop:5 }}>
                      <CardContent>
                      {
                          this.props.status_sp3 === 1 && 
                          <Typography 
                            variant="body2"
                            align="center"
                            style={{
                              fontSize:12
                            }}>
                          {`anda belum memiliki aplikasi. \n klik tombol di bawah untuk memulai`}
                          </Typography>
                      }                  
                      </CardContent>
                      <CardActions>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          fullWidth>
                            <Typography
                              style={{
                                fontFamily:typography.fontFamily,
                                fontSize:12,
                                fontWeight:'bold',
                                textTransform:'capitalize'                    
                              }}>
                              saya ingin mengajukan aplikasi
                            </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                </Grid>
                <Grid item style={{ marginTop:5 }}>              
                    <Card 
                      variant="outlined"
                      style={{ paddingTop:5 }}>
                      <CardContent>
                      {
                          this.props.status_sp3 === 0 && 
                          <Typography 
                            variant="body2"
                            align="center"
                            style={{
                              fontSize:12
                            }}>
                          {`anda sudah memiliki aplikasi pengajuan `}
                          </Typography>
                      }                  
                      </CardContent>
                      <CardActions>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          fullWidth>
                            <Typography
                              style={{
                                fontFamily:typography.fontFamily,
                                fontSize:12,
                                fontWeight:'bold',
                                textTransform:'capitalize'                    
                              }}>
                              Pengisian Form Tahap 2
                            </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                </Grid>
              </Grid>
          </Grid>                    
      </Wrapper>
    );
  }
}

UserDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // userDashboard: makeSelectUserDashboard(),
  status_sp3: status_sp3()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cekSp3: () => dispatch(cekSp3Action())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboardSaga', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  injectIntl,
  memo,
)(UserDashboard);
