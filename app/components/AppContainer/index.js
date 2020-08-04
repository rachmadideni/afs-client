import React from "react";
import Container from '@material-ui/core/Container';
import "./styles.scss";

export default function AppContainer(props){
  return (
    <Container maxWidth="xs" className="appContainer">
      {props.children}
    </Container>
  )
}