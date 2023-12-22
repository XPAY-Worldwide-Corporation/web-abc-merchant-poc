import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
// Config
// React Components
import {
  CardGroup,
  CardItem,
  CardItemFull,
  MaskedStyledInput,
  PayButton,
  Select,
} from '../components';
// Enums
// Interfaces
import { PaymentData } from '../../../../shared/interfaces/PaymentData.interface';
// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
// CSS Modules
import classes from '../classes.module.css';
// Utils
import { Currency } from '../../../../shared/enums/Currency.enum';
import { PaymentGateway } from '../../../../shared/enums/PaymentGateway.enum';

interface QRPaymentFormProps {
  paymentData: PaymentData;
  setPaymentData: (param: any) => any;
  inputHandler: (param: any) => any;
  resetPaymentData: () => any;
}

const QRPaymentForm = (props: QRPaymentFormProps) => {
  const { paymentData, setPaymentData, inputHandler } = props;

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(
    PaymentGateway.PAYMAYA
  );
  const [httpRequestIsLoading, setHttpRequestIsLoading] = useState(false);
  const [httpRequestIsError, setHttpRequestIsError] = useState({
    openAlert: false,
    message: '',
  });
  const [qrCodeBody, setQrCodeBody] = useState<string | null>(null);

  const createQrPayment = async () => {
    setQrCodeBody(
      '{"m":{"n":"Merchant 1"},"t":{"p":"5f1e1df5-b58f-481b-89cb-8dd41afcf771","a":100}}'
    );
  };

  const cancelQrPayment = async () => {};

  const displayQrWithCancelPaymentBtn = () => {
    const qrImage = (
      <Box mt={6} style={{ textAlign: 'center' }}>
        <QRCode value={qrCodeBody as string} />
      </Box>
    );

    const cancelPaymentBtn = (
      <Box mt={2} style={{ textAlign: 'center' }}>
        <Button
          style={{ textTransform: 'none', color: '#8a8a8a' }}
          onClick={cancelQrPayment}
          disabled={httpRequestIsLoading}
        >
          {httpRequestIsLoading ? 'Loading...' : `Cancel Payment`}
        </Button>
      </Box>
    );

    return (
      <>
        {qrImage}
        {cancelPaymentBtn}
      </>
    );
  };

  useEffect(() => {
    setQrCodeBody(null);
  }, [paymentData, selectedPaymentGateway]);

  return (
    <div className='qrForm'>
      <div style={{ marginBottom: '8px' }}>
        <label>Select Payment Gateway</label>
      </div>
      <CardGroup className={`${classes.space}`}>
        <Select
          id='paymentGateway'
          name='paymentGateway'
          // @ts-ignore
          onChange={(e) => setSelectedPaymentGateway(e.target.value)}
          style={{ backgroundColor: '#f8f8f8' }}
          value={selectedPaymentGateway}
        >
          <option key={PaymentGateway.PAYMAYA} value={PaymentGateway.PAYMAYA}>
            PayMaya
          </option>
          <option key={PaymentGateway.GCASH} value={PaymentGateway.GCASH}>
            GCash
          </option>
        </Select>
      </CardGroup>

      {/* Amount, Currency */}
      <CardGroup className={classes.space}>
        <CardItemFull className={classes.iconRelative}>
          <MaskedStyledInput
            // Input Props
            name='amount'
            placeholder='Amount to Send'
            // IMask Props
            mask={Number}
            radix='.'
            min={1.0}
            thousandsSeparator=','
            onAccept={(value: any, mask: any) => {
              setPaymentData((prev: any) => {
                return {
                  ...prev,
                  amount: value,
                };
              });
            }}
          />
          <i className={`${classes.far} far fa-money-bill-alt`}></i>
        </CardItemFull>
        <CardItem>
          <Select
            id='currency'
            name='currency'
            onChange={inputHandler}
            value={paymentData.currency}
          >
            <option value={Currency.PHP}>PHP</option>
            <option value={Currency.USD}>USD</option>
          </Select>
        </CardItem>
      </CardGroup>

      {/* Display "Pay" button when QR Code Body exists */}
      {!qrCodeBody && (
        <Box mb={2}>
          <PayButton onClick={createQrPayment} disabled={httpRequestIsLoading}>
            {httpRequestIsLoading
              ? 'Loading...'
              : `Pay ${paymentData.currency} ${paymentData.amount || '0'}`}
          </PayButton>

          <Box mt={2}>
            <Typography variant='caption' style={{ color: '#424242' }}>
              How do I pay with{' '}
              <a
                href={
                  selectedPaymentGateway === PaymentGateway.PAYMAYA
                    ? 'https://support.maya.ph/s/article/ScanToPay-with-PayMaya-QR'
                    : 'https://help.gcash.com/hc/en-us/articles/360017722773-How-Do-I-Pay-Merchants-via-QR-Code-'
                }
                style={{
                  color:
                    selectedPaymentGateway === PaymentGateway.PAYMAYA
                      ? '#08AD60'
                      : '#0179F5',
                  textDecoration: 'none',
                }}
                target='_blank'
                rel='noreferrer'
              >
                {selectedPaymentGateway === PaymentGateway.PAYMAYA
                  ? 'PayMaya QR'
                  : 'GCash QR'}
              </a>
              ?
            </Typography>
          </Box>
        </Box>
      )}

      {/* Display QR Code and Cancel Payment Button */}
      {qrCodeBody && displayQrWithCancelPaymentBtn()}

      {/* Error Alert */}
      <Collapse in={httpRequestIsError.openAlert}>
        <Alert
          severity='error'
          style={{ marginLeft: '8px' }}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setHttpRequestIsError((prev) => ({
                  ...prev,
                  openAlert: false,
                }));
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {httpRequestIsError.message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default QRPaymentForm;
