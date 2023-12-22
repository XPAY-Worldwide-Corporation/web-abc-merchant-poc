import { useEffect, useState } from 'react';
import { Merchant, Merchants } from '../../shared/data/Merchants';
import { Currency } from '../../shared/enums/Currency.enum';
import { PaymentMode } from '../../shared/enums/PaymentMode.enum';
import { PaymentData } from '../../shared/interfaces/PaymentData.interface';
import EcomPaymentForm from './PaymentForm/Ecom';
import QRPaymentForm from './PaymentForm/QR';
import classes from './PaymentForm/classes.module.css';
import { CardGroup, PaymentModeButton, Select } from './PaymentForm/components';

const Payment = () => {
  const initialPaymentData = {
    amount: 0,
    card: {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
    },
    currency: Currency.PHP,
    email: '',
    merchant: Merchants[0],
    message: '',
    name: '',
  };
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.CARD);
  const [paymentData, setPaymentData] =
    useState<PaymentData>(initialPaymentData);

  const inputHandler = (e: any) => {
    const { value, name } = e.target;

    setPaymentData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetPaymentData = () => {
    setPaymentData(initialPaymentData);
  };

  useEffect(() => {
    resetPaymentData();
  }, [paymentMode]);

  return (
    <>
      {/* Select Payment Mode */}
      <div className={classes.space}>
        <PaymentModeButton
          style={{
            backgroundColor:
              paymentMode === PaymentMode.CARD ? '#f8f8f8' : '#FFFFFF',
            color: paymentMode === PaymentMode.CARD ? '#000000' : '#9c9c9c',
          }}
          onClick={() => setPaymentMode(PaymentMode.CARD)}
        >
          Pay with Card
        </PaymentModeButton>
        <PaymentModeButton
          style={{
            backgroundColor:
              paymentMode === PaymentMode.QR ? '#EFEFEF' : '#FFFFFF',
            color: paymentMode === PaymentMode.QR ? '#000000' : '#9c9c9c',
          }}
          onClick={() => setPaymentMode(PaymentMode.QR)}
        >
          Pay with QR
        </PaymentModeButton>
      </div>

      {/* Select a Merchant */}
      <div style={{ marginBottom: '8px' }}>
        <label>Select a Merchant</label>
      </div>
      <CardGroup className={`${classes.space}`}>
        <Select
          id='merchant'
          name='merchant'
          style={{ backgroundColor: '#f8f8f8' }}
          value={paymentData.merchant?.id}
        >
          {paymentMode === PaymentMode.CARD ? (
            <>
              {/* Display all merchants with ECOM credentials */}
              {Merchants.filter((merchant: Merchant) =>
                merchant.keys.ecom ? true : false
              ).map((merchant: Merchant, key: number) => {
                return (
                  <option key={key} value={merchant.id}>
                    {merchant.name}
                  </option>
                );
              })}
            </>
          ) : (
            <>
              {/* Display all merchants with QR credentials */}
              {Merchants.filter((merchant: Merchant) =>
                merchant.keys.qr ? true : false
              ).map((merchant: Merchant, key: number) => {
                return (
                  <option key={key} value={merchant.id}>
                    {merchant.name}
                  </option>
                );
              })}
            </>
          )}
        </Select>
      </CardGroup>

      {paymentMode === PaymentMode.CARD ? (
        <EcomPaymentForm
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          inputHandler={inputHandler}
        />
      ) : (
        <QRPaymentForm
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          inputHandler={inputHandler}
          resetPaymentData={resetPaymentData}
        />
      )}
    </>
  );
};

export default Payment;
