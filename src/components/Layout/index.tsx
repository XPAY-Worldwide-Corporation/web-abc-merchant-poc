import {
  Container,
  Content,
  Copyright,
  DescriptionContainer,
  Footer,
  Header,
  Logo,
} from './components';

const Layout = (props: any) => {
  return (
    <Container>
      <Logo />
      <Header>
        <h2>Merchant</h2>

        <DescriptionContainer>
          <p>
            Thank you for being our valued customer. We truly appreciate your
            business and look forward to serving you again.
          </p>
        </DescriptionContainer>
      </Header>
      <Content>{props.children}</Content>
      <Footer>
        <Copyright>
          © {new Date().getFullYear()} Merchant. All rights reserved.
        </Copyright>
      </Footer>
    </Container>
  );
};

export default Layout;
