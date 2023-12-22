export interface Merchant {
  id: string;
  name: string;
  keys: {
    ecom: {
      activationCode: string | undefined;
      authPass: string | undefined;
      secretKey: string | undefined;
    };
    qr?: {
      activationCode: string | undefined;
      authPass: string | undefined;
      secretKey: string | undefined;
    };
  };
}

export const Merchants: Merchant[] = [
  {
    id: '9bddbc97-b1b0-4400-a005-4ad13e24a77e',
    name: 'Merchant 1',
    keys: {
      ecom: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
      qr: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
    },
  },
  {
    id: '6874157d-f0af-44bc-94ab-e7efa58171c6',
    name: 'Merchant 2',
    keys: {
      ecom: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
      qr: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
    },
  },
  {
    id: '42e86a51-a0a0-4155-929a-ffc39193adab',
    name: 'Merchant 3',
    keys: {
      ecom: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
      qr: {
        activationCode: 'ACTIVATION_CODE',
        authPass: 'AUTH_PASS',
        secretKey: 'SECRET_KEY',
      },
    },
  },
];
