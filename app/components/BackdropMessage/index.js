/**
 *
 * BackdropMessage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CheckCircle, CloseRounded } from '@material-ui/icons';
import { color, typography } from '../../styles/constants';

function BackdropMessage(props) {
  const { open, onClick, messages, type, ...otherProps } = props;

  return (
    <Backdrop
      open={open}
      onClick={onClick}
      style={{ zIndex: 2000 }}
      {...otherProps}
    >
      <Grid
        container
        wrap="nowrap"
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          width: '75vw',
        }}
      >
        <Card>
          <Grid
            container
            wrap="nowrap"
            justify="center"
            alignItems="center"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              xs
              style={{
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
                textAlign: 'center',
              }}
            >
              {type ? (
                <CheckCircle
                  color="primary"
                  size="large"
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: color.white,
                  }}
                />
              ) : (
                <CloseRounded
                  size="large"
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                />
              )}

              <Typography
                variant="subtitle2"
                align="center"
                style={{
                  color: color.black,
                  lineHeight: 1,
                  paddingTop: 20,
                  paddingBottom: 20,
                  fontWeight: 'normal',
                }}
              >
                {type ? (
                  <FormattedMessage {...messages.success} />
                ) : (
                  <FormattedMessage {...messages.error} />
                )}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onClick}
                disableElevation
                style={{
                  borderRadius: 18,
                  marginTop: 10,
                  fontFamily: typography.fontFamily,
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                <FormattedMessage {...messages.btnConfirmOk} />
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Backdrop>
  );
}

BackdropMessage.propTypes = {
  open: PropTypes.bool,
  messages: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.bool,
};

export default BackdropMessage;
