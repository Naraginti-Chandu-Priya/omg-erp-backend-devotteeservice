import { Schema } from 'express-validator';

export const addDonationValidator: Schema = {
  devotee_id: {
    in: 'body',
    exists: { errorMessage: 'DevoteeId is required' }
  },
  amount: {
    in: 'body',
    exists: { errorMessage: 'Amount is required' },
    isFloat: true
  },
  donation_date: {
    in: 'body',
    exists: { errorMessage: 'Donation date is required' }
  }
};

export const updateDonationValidator: Schema = {
  amount: {
    in: 'body',
    optional: true,
    isFloat: true
  }
};

export const emptyValidator: Schema = {};
