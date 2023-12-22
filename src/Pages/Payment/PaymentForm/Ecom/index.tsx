import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Currency } from '../../../../shared/enums/Currency.enum';
import { PaymentData } from '../../../../shared/interfaces/PaymentData.interface';
import classes from '../classes.module.css';
import {
  CardGroup,
  CardItem,
  CardItemFull,
  Input,
  MaskedStyledInput,
  PayButton,
  Select,
} from '../components';
import CreditCard from './CreditCard/index';

interface EcomPaymentFormProps {
  paymentData: PaymentData;
  setPaymentData: (param: any) => any;
  inputHandler: (param: any) => any;
}

const EcomPaymentForm = (props: EcomPaymentFormProps) => {
  const { paymentData, setPaymentData, inputHandler } = props;

  const [httpRequestIsLoading, setHttpRequestIsLoading] = useState(false);
  const [httpRequestIsError, setHttpRequestIsError] = useState({
    openAlert: false,
    message: '',
  });

  const createEcomPayment = async () => {};

  return (
    <div className='ecomForm'>
      {/* Message to recipient */}
      <CardGroup className={`${classes.space} ${classes.iconRelative}`}>
        <Input
          type='text'
          name='message'
          placeholder='Message to recipient'
          onChange={inputHandler}
          value={paymentData.message}
        />
        <i className={`${classes.far} far fa-comment`}></i>
      </CardGroup>

      {/* Full Name, Email Address */}
      <CardGroup className={`${classes.space}`}>
        <CardItem className={classes.iconRelative}>
          <Input
            type='text'
            name='name'
            placeholder='Your Name'
            onChange={inputHandler}
            value={paymentData.name}
          />
          <i className={`${classes.far} far fa-user`}></i>
        </CardItem>
        <CardItem className={classes.iconRelative}>
          <Input
            type='email'
            name='email'
            placeholder='Your Email'
            onChange={inputHandler}
            value={paymentData.email}
          />
          <i className={`${classes.far} far fa-envelope`}></i>
        </CardItem>
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
            onAccept={(value: any, mask: any) =>
              setPaymentData((prev: any) => {
                return {
                  ...prev,
                  amount: value,
                };
              })
            }
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

      {/* PAN, Expiry Date, CVC */}
      <CreditCard paymentData={paymentData} setPaymentData={setPaymentData} />

      <Box mb={2}>
        <PayButton
          onClick={() => createEcomPayment()}
          disabled={httpRequestIsLoading}
        >
          {httpRequestIsLoading
            ? 'Loading...'
            : `Pay ${paymentData.currency} ${paymentData.amount || '0'}`}
        </PayButton>
      </Box>

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

export default EcomPaymentForm;
