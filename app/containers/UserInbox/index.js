import React, { memo } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { 
  makeSelectIsFetching, 
  makeSelectNotifikasi } from './selectors';
import { 
  fetchNotifikasiAction,
  setMessageAsRead
} from './actions';
import messages from './messages';

import { INBOX } from './constants';
import { color, typography } from 'styles/constants';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Skeleton from '@material-ui/lab/Skeleton';

import AppBar from 'components/AppBar';
import AppToolbar from 'components/AppToolbar';
// import AppHeaderIcon from 'components/AppHeaderIcon';
import AppHeaderNotification from 'components/AppHeaderNotification';
import AppHeaderSettings from 'components/AppHeaderSettings';
import BtnCustom from "components/BtnCustom";
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TimeAgo from "react-timeago";
// import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// const formatter = buildFormatter(1,'jam','yang lalu');

// import afsImage from 'images/icon-512x512.png';
import "./styles.scss";


const StyledTileText = styled(props => {
  return <Typography {...props} />;
})`
  && {
    font-family: ${typography.fontFamily};
    font-size: ${props => props.size}px;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  }
`;

const CardTile = styled(props => {
  return <Card {...props} />;
})`
  && {
    padding: 10px;
    border-width: ${props => (props.fresh ? 2 : 1)}px;
    border-color: ${props => (props.fresh ? color.green : color.grey)};
  }
`;

class UserInbox extends React.Component {
  constructor(props) {
    super(props);
    this.loadInbox = this.loadInbox.bind(this);
  }

  componentDidMount() {
    this.loadInbox();
  }

  loadInbox() {    
    return this.props.fetchNotifikasi();
  }

  renderSkeleton = () => {
    return (
      <GridList cellHeight='auto' style={{ marginTop: 20 }}>      
      {INBOX.map(item => (
          <GridListTile cols={2} rows={0}>
            <Skeleton variant="rect" animation="wave" height={60} />
          </GridListTile>
        ))}
      </GridList>
    );
    // return skeleton_list;
  };

  // renderSkeleton = () => {
  //   return (
  //     <Grid>
  //       {INBOX.map(item => 
  //         <Card>
  //           <Skeleton 
  //             variant="rect" 
  //             animation="wave" height={60} />
  //         </Card>
  //       )}
  //     </Grid>
  //   )
  // }

  handleBack = () => {
    this.props.history.replace('/dashboard');
  }
  render() {
    const { intl, notifikasi } = this.props;
    return (
      <React.Fragment>
        <AppBar color="white" position="fixed" elevation={1}>
          <AppToolbar style={{ justifyContent: 'flex-start' }}>
            <IconButton onClick={() => this.handleBack()}>
              <KeyboardBackspaceOutlinedIcon />
            </IconButton>
            <Typography
              variant="body1"
              className="inboxHeader"
              gutterBottom>
              {intl.formatMessage(messages.inbox)}
            </Typography>            
            <div style={{ flexGrow: 1 }} />            
          </AppToolbar>
        </AppBar>

        <Grid 
          container 
          direction="column" 
          className="inboxWrapper">

          {this.props.isFetching ? 'loading' : null}

          <GridList 
            cellHeight="auto">
            <GridListTile 
              cols={2} rows={0}>
              
              {notifikasi.length > 0 &&
                notifikasi.map((item, i) => (
                  <Card
                    key={`card-key-${i}`}
                    variant="outlined"
                    className="messageCard">
                    <div className="messageHeader">
                      <div className="messageHeaderLeft">
                        <IconButton 
                          size="small" 
                          onClick={()=>this.props.setMessageAsRead(item.id)}>
                          <ExpandMore />
                        </IconButton>
                        <Typography
                          className="messageTitle"
                          align="left"
                          gutterBottom>
                          {item.header}
                        </Typography>
                      </div>
                      <div className="messageHeaderRight">
                        <Typography className="timestamp">
                          <TimeAgo date={item.tanggal_pesan} />
                        </Typography>
                      </div>
                    </div>

                    {/* <Collapse in={item.is_read}> */}
                      <div className="messageBody">
                        <Typography variant="body2" className="bodyText">
                          {item.body}
                        </Typography>
                      </div>
                      {item.action && (
                        <div className="messageFooter">
                          <BtnCustom
                            size="small"
                            variant="contained"
                            title="dadada"
                          />
                        </div>
                      )}
                    {/* </Collapse> */}
                  </Card>
                ))}
            </GridListTile>
          </GridList>

          {/* {this.renderSkeleton()} */}

          <Grid item>
            {/*userInbox.isFetching ? (
              this.renderSkeleton()
            ) : (
              <GridList cellHeight={60} style={{ marginTop: 20 }}>
                {INBOX.length > 0 ? (
                  INBOX.map((item, i) => (
                    <GridListTile cols={2} rows={0}>
                      <CardTile variant="outlined" fresh={item.fresh}>
                        <StyledTileText bold size={12}>
                          {item.title}
                        </StyledTileText>
                        <StyledTileText size={10}>{item.title}</StyledTileText>
                      </CardTile>
                    </GridListTile>
                  ))
                ) : (
                  <Grid item xs>
                    <Typography
                      align="center"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontSize: '12px',
                        color: color.grey,
                      }}
                    >
                      belum ada pesan masuk
                    </Typography>
                  </Grid>
                )}
              </GridList>
                    )*/}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

// UserInbox.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  isFetching: makeSelectIsFetching(),
  notifikasi: makeSelectNotifikasi(),
});

function mapDispatchToProps(dispatch) {
  return {    
    fetchNotifikasi: () => dispatch(fetchNotifikasiAction()),
    setMessageAsRead: messageId => dispatch(setMessageAsRead(messageId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userInbox', reducer });
const withSaga = injectSaga({ key: 'userInboxSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  memo,
)(UserInbox);
