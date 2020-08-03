import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import AuthGuard from 'containers/AuthGuard';
import CreatePassword from 'containers/CreatePassword/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Login from 'containers/Login/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Verifikasi from 'containers/Verifikasi/Loadable';
import VerifyConfirmPage from 'containers/VerifyConfirmPage';
import ForgotPassword from "containers/ForgotPassword";
import UserRegistration from "../UserRegistration/Loadable";

import styled from 'styled-components';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Pembiayaan Amanah"
        defaultTitle="Pembiayaan Amanah"
      >
        <meta name="description" content="Pembiayaan Amanah" />
      </Helmet>
      <Container maxWidth="xs" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Switch>
          
          <Route 
            exact 
            path="/" 
            render={() => <Redirect to="/login" />} 
          />

          <Route 
            path="/login" 
            component={Login} />

          <Route 
            exact 
            path="/verifikasi" 
            component={Verifikasi} />

          <Route
            exact
            path="/verifikasi/confirm"
            component={VerifyConfirmPage} />
          
          <Route exact path="/registrasi" component={UserRegistration} />
          
          <Route
            exact
            path="/resetPassword"
            component={ForgotPassword} />

          <Route 
            exact 
            path="/createPassword" 
            component={CreatePassword} />

          <Route
            path="/changePassword"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/dashboard"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/dashboard/section:(pinjaman|informasi)"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/application-form/step/customer"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/application-form/step/customer/section:(installment|personal-details|work-related|documents|summary)"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/summary"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/akad"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/profil"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/inbox"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route path="" component={NotFoundPage} />
        </Switch>
      </Container>
      <GlobalStyle />
    </AppWrapper>
  );
}