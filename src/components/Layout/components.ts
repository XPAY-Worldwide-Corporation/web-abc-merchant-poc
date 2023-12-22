import styled from 'styled-components';

export const Container = styled.div`
  background: #f9f8f8;
  max-width: 500px;
  margin: 80px auto;
  height: auto;
  border: 1px solid #dddcdc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  border-radius: 15px;
  position: relative;
`;

export const Logo = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 85px;

  :before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 90px;
    height: 90px;
    background-image: url('/images/avatar-a.png');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  }
`;

export const Header = styled.div`
  padding-top: 70px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dddcdc;
  text-align: center;

  h2 {
    margin: 0;
  }
`;

export const DescriptionContainer = styled.div`
  width: 80%;
  margin: auto auto;

  p {
    text-align: center;
    font-size: 0.857143em;
    margin-top: 5px;
  }

  a {
    text-decoration: none;
    color: #00afe7;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const Content = styled.div`
  background: #ffffff;
  padding: 35px;
`;

export const Footer = styled.div`
  background: #f9f8f8;
  border-top: 1px solid #dddcdc;
  border-radius: 0 0 15px 15px;
  padding: 15px;
  text-align: center;
`;

export const Copyright = styled.p`
  font-size: 0.857143em;
`;
