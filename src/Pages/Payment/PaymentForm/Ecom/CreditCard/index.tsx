import IMask from 'imask';
import { useRef, useState } from 'react';
import { PaymentData } from '../../../../../shared/interfaces/PaymentData.interface';
import classes from '../../classes.module.css';
import {
  CreditCardGroup,
  Label,
  MaskedStyledCardInput,
} from '../../components';

const panMask = [
  {
    mask: '0000 000000 00000',
    regex: '^3[47]\\d{0,13}',
    cardTypeName: 'american express',
  },
  {
    mask: '0000 0000 0000 0000',
    regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
    cardTypeName: 'mastercard',
  },
  {
    mask: '0000 000000 00000',
    regex: '^(?:2131|1800)\\d{0,11}',
    cardTypeName: 'jcb15',
  },
  {
    mask: '0000 0000 0000 0000',
    regex: '^(?:35\\d{0,2})\\d{0,12}',
    cardTypeName: 'jcb',
  },
  {
    mask: '0000 0000 0000 0000',
    regex: '^4\\d{0,15}',
    cardTypeName: 'visa',
  },
  {
    mask: '0000 0000 0000 0000',
    cardTypeName: 'unknown',
  },
];

interface CreditCardProps {
  paymentData: PaymentData;
  setPaymentData: (param: any) => any;
}

const CreditCard = (props: CreditCardProps) => {
  const { paymentData, setPaymentData } = props;

  const [cardDisplay, setCardDisplay] = useState<string>('cc-unknown');
  // @ref https://www.designcise.com/web/tutorial/how-to-fix-useref-react-hook-cannot-assign-to-read-only-property-typescript-error
  let expiryDateInput = useRef<HTMLInputElement | null>(null);
  let cvcInput = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Label>Payment Information</Label>
      <CreditCardGroup className={classes.space}>
        {/* PAN */}
        <MaskedStyledCardInput
          // Input Props
          type='text'
          value={paymentData.card.cardNumber}
          id={classes.cardnumber}
          pattern='[0-9]*'
          inputMode='numeric'
          placeholder='Card Number'
          style={{
            backgroundImage: `url(/images/${cardDisplay}.png)`,
            backgroundColor: '#ffffff',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '26px',
            backgroundPosition: '14px',
          }}
          // IMask Props
          mask={panMask}
          dispatch={(appended: any, dynamicMasked: any) => {
            var number = (dynamicMasked.value + appended).replace(/\D/g, '');

            for (let item of dynamicMasked.compiledMasks) {
              let re = new RegExp(item.regex);

              if (number.match(re) != null) {
                return item;
              }
            }
          }}
          onAccept={(value: any, mask: any) => {
            const cardTypeName: string = mask.masked.currentMask.cardTypeName;

            const tempCardType: { [key: string]: string } = {
              'american express': 'cc-amex',
              visa: 'cc-visa',
              jcb: 'cc-jcb',
              jcb15: 'cc-jcb',
              mastercard: 'cc-mastercard',
              unknown: 'cc-unknown',
            };

            setCardDisplay(tempCardType[cardTypeName]);

            setPaymentData((prev: any) => {
              return {
                ...prev,
                card: {
                  ...prev.card,
                  cardNumber: value,
                },
              };
            });
          }}
          onComplete={() => {
            expiryDateInput.current?.focus();
            expiryDateInput.current?.select();
          }}
        />

        {/* Expiry Date */}
        <MaskedStyledCardInput
          // Input Props
          type='text'
          id={classes.expirationdate}
          pattern='[0-9]*'
          inputMode='numeric'
          placeholder='MM/YY'
          inputRef={(el: any) => (expiryDateInput.current = el)} // access to nested input
          // IMask Props
          mask={'MM{/}YY'}
          blocks={{
            YY: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 99,
            },
            MM: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 12,
            },
          }}
          onAccept={(value: any, mask: any) => {
            const [month, year] = value.split('/');

            setPaymentData((prev: any) => {
              return {
                ...prev,
                card: {
                  ...prev.card,
                  expiryMonth: month,
                  expiryYear: year,
                },
              };
            });
          }}
          onComplete={() => {
            cvcInput.current?.focus();
            cvcInput.current?.select();
          }}
        />

        {/* CVC */}
        <MaskedStyledCardInput
          // Input Props
          type='text'
          value={paymentData.card.cvc}
          id={classes.securitycode}
          pattern='[0-9]*'
          inputMode='numeric'
          placeholder='CVC'
          inputRef={(el: any): any => (cvcInput.current = el)}
          // IMask Props
          mask={'0000'}
          onAccept={(value: any, mask: any) => {
            setPaymentData((prev: any) => {
              return {
                ...prev,
                card: {
                  ...prev.card,
                  cvc: value,
                },
              };
            });
          }}
        />
      </CreditCardGroup>
    </div>
  );
};

export default CreditCard;
