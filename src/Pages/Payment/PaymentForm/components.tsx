import { IMaskMixin } from 'react-imask';
import styled from 'styled-components';

export const PaymentModeButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #dddcdc;
  padding: 10px;
  width: 50%;

  :hover {
    background-color: #efefef;
    cursor: pointer;
  }
`;

// PaymentForm Components
export const Input = styled.input`
  padding: 8px 8px 8px 50px;
  width: 100%;
  border: 1px solid #dddcdc;
  outline: none;
  font-size: 15px;
  color: #555555;
  background-color: #ffffff;
`;

export const InputNoIcon = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #dddcdc;
  outline: none;
  font-size: 15px;
  color: #555555;
  background-color: #ffffff;
  margin-top: 6px;
`;

export const Select = styled.select`
  padding: 8px;
  width: 100%;
  border: 1px solid #dddcdc;
  outline: none;
  font-size: 15px;
  color: #555555;
  background-color: #ffffff;
`;

export const CardGroup = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  width: 48%;

  @media screen and (max-width: 420px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const CardItemFull = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const PayButton = styled.button`
  margin-top: 20px;
  background: #00afe7;
  padding: 12px;
  text-align: center;
  color: #f8f8f8;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  border: 1px solid #00afe7;

  :hover:enabled {
    background: #009dcf;
  }

  :disabled {
    cursor: not-allowed;
    background-color: #e9ecef;
    color: #adb5bd;
    border-color: transparent;
  }

  @media screen and (max-width: 420px) {
    margin-top: 20px;
  }
`;

// Credit Card Components
export const Label = styled.label`
  display: block;
  color: #555555;
  margin-bottom: 13px;
`;

export const StepsLabel = styled.label`
  display: block;
  color: #000000;
  font-size: 14px;
`;

export const StepsLabelSecondary = styled.label`
  display: block;
  color: #555555;
  font-size: 14px;
`;

export const CreditCardGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #dddcdc;
`;

export const CreditCardInput = styled.input`
  padding: 8px 8px 8px 50px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  color: #555555;
  background-color: #ffffff;
`;

export const MaskedStyledCardInput = IMaskMixin(
  ({ inputRef, ...props }: { inputRef: any; props: any }) => (
    <CreditCardInput {...props} ref={inputRef} />
  )
);

export const MaskedStyledInput = IMaskMixin(
  ({ inputRef, ...props }: { inputRef: any; props: any }) => (
    <Input {...props} ref={inputRef} />
  )
);
