/**
 *
 * UserInbox
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import makeSelectUserInbox from './selectors';
import { fetchInboxAction } from './actions';
import messages from './messages';

import { INBOX } from './constants';
import { color, typography } from 'styles/constants';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

const StyledHeader = styled(props=>{
  return (
    <Typography {...props} />
  )
})`
&& {
  font-family:${typography.fontFamily};
  font-weight:bold;
}`;

const StyledTileText = styled(props=>{
  return (
    <Typography {...props} />
  )
})`
&& {
  font-family:${typography.fontFamily};
  font-size:${props=>props.size}px;
  font-weight:${props=>props.bold ? 'bold' : 'normal'};
}`;

const CardTile = styled(props=>{
  return (
    <Card {...props} />
  )
})`
&& {
  padding:10px;
  border-width:${props=>props.fresh ? 2 : 1}px;
  border-color:${props=>props.fresh ? color.green : color.grey};
}`;

class UserInbox extends React.Component {
  constructor(props){
    super(props);
    this.loadInbox = this.loadInbox.bind(this); 
  }

  componentDidMount(){
    this.loadInbox();
  }

  loadInbox(){
    // call saga to fetch inbox data
    return this.props.fetchInbox();
  }

  renderSkeleton = () => {
    const skeleton_list = 
      <GridList cellHeight={60} style={{ marginTop:20 }}>
      {INBOX.map((item)=>(      
          <GridListTile cols={2} rows={0}>
            <Skeleton 
              variant="rect" 
              animation="wave" 
              width={500} 
              height={60} />
          </GridListTile>
      ))}
      </GridList>;    
    return skeleton_list;
  }
  render(){
    const { 
      intl,
      userInbox
    } = this.props;
    return (
      <Grid 
        container 
        wrap="nowrap" 
        direction="column"
        style={{
          marginTop:20
        }}>
          <Grid item>
            <StyledHeader 
              variant="h6">
              {intl.formatMessage(messages.inbox)}
            </StyledHeader>
            {userInbox.isFetching ? this.renderSkeleton() : 
            <GridList cellHeight={60} style={{ marginTop:20 }}>
              { INBOX.length > 0 ?
                INBOX.map((item,i)=>(
                <GridListTile cols={2} rows={0}>
                  <CardTile 
                    variant="outlined" 
                    fresh={item.fresh}>
                    <StyledTileText bold size={12}>
                      {item.title}
                    </StyledTileText>
                    <StyledTileText size={10}>
                      {item.title}
                    </StyledTileText>
                  </CardTile>
                </GridListTile>
              ))
              : 
              <Grid item xs>
                <Typography 
                  align="center"
                  style={{
                    fontFamily:typography.fontFamily,
                    fontSize:'12px',
                    color:color.grey
                  }}>
                  belum ada pesan masuk
                </Typography>
              </Grid>
            }
            </GridList>            
            }
          </Grid>
      </Grid>
      
    );
  }
}

// UserInbox.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  userInbox: makeSelectUserInbox(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    fetchInbox: () => dispatch(fetchInboxAction())
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
