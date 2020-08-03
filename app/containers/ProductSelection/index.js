/**
 *
 * ProductSelection
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductSelection from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { color } from '../../styles/constants';
import {
  Dashboard,
  Pages
} from '@material-ui/icons';

const StyledTabs = styled(Tabs).attrs({
  classes:{
    flexContainer: 'flex-container',
    indicator:'indicator'
  }
})`
  && {
    // min-width:100%;
    .flex-container {
      // width:100%;
      flex-direction: column;
    }
    .indicator {
      display:none;
    }
  }
`

const IconTab = styled(Tab).attrs({
  classes:{
    selected:'selected'
  }
})`
  && {
    min-width: 120px;
    width:180px;    
    min-height: 48px;
    opacity: 0.5;
    transition: background-color 200ms ease-in-out;
    border-radius:4px;
    border:solid 1px ${color.grey};
    box-shadow:none;
    font-weight:bold;
    text-transform:capitalize;
    color:${color.green};
    margin:4px;
    font-family:IBM Plex Sans;
    
    
  }
  &.selected {    
    opacity: 1;
    color:${color.white};
    font-weight:bold;
    text-transform:capitalize;
    background-image:linear-gradient(${color.green},${color.blue});
  }
  `
export function ProductTabs(props){
  const { tabs, ...tabsProps } = props;
  return (
    <StyledTabs  {...tabsProps}>
      {tabs.map((tab, index) => {
        const key = `navTab-${tab.label}-${index}`;
        return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
      })}
    </StyledTabs>
  );
}

class ProductSelection extends React.Component{
  
  getTabs = () => {
    // const { intl } = this.props;
    return [
      {
        icon: Pages,
        label: 'Al Ijarah',
      },
      {
        icon: Pages,
        label: 'Al Murabahah',
      }
    ];
  }

  render(){
    return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          flex:1,
          // display:'flex',
          alignItems:'center',
          // width:'100%',
          // height:'100%',
          // backgroundColor:color.grey
        }}>
          <Grid item style={{ flex:1 }}>
            <Typography style={{
              fontFamily:'IBM Plex Sans',
              fontWeight:'bold',
              fontSize:14,
              color:'#6d6d6d'
            }}>
              Pilih Produk Syariah
            </Typography>
            <ProductTabs 
              orientation="vertical"
              value={0}
              tabs={this.getTabs()} />
          </Grid>
      </Grid>
    );
  }
}

ProductSelection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productSelection: makeSelectProductSelection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductSelection);
