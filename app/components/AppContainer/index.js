import React from "react";
import Container from '@material-ui/core/Container';

export default function AppContainer(props){
  return (
    <Container maxWidth="xs">
      {props.children}
    </Container>
  )
}