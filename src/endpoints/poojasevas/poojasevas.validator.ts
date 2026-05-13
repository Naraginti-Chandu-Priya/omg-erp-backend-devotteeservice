import { Schema } from 'express-validator';

export const addPoojaSevaValidator: Schema = {
  seva_name: {
    in: 'body',
    exists: { errorMessage: 'Seva name is required' },
    isString: true,
    trim: true
  },
  seva_amount: {
    in: 'body',
    exists: { errorMessage: 'Seva amount is required' },
    isDecimal: true
  },
  seva_date: {
    in: 'body',
    exists: { errorMessage: 'Seva date is required' },
    isISO8601: { errorMessage: 'Invalid date format' }
  },
  devotee_id: {
    in: 'body',
    optional: true,
    isUUID: { errorMessage: 'Invalid devotee ID' }
  },
  status: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['Scheduled', 'Completed', 'Cancelled']],
      errorMessage: 'Invalid status'
    }
  },
  payment_status: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['Pending', 'Paid', 'Refunded']],
      errorMessage: 'Invalid payment status'
    }
  }
};

export const updatePoojaSevaValidator: Schema = {
  seva_name: {
    in: 'body',
    optional: true,
    isString: true,
    trim: true
  },
  seva_amount: {
    in: 'body',
    optional: true,
    isDecimal: true
  },
  seva_date: {
    in: 'body',
    optional: true,
    isISO8601: { errorMessage: 'Invalid date format' }
  },
  status: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['Scheduled', 'Completed', 'Cancelled']],
      errorMessage: 'Invalid status'
    }
  },
  payment_status: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['Pending', 'Paid', 'Refunded']],
      errorMessage: 'Invalid payment status'
    }
  }
};

export const emptyValidator: Schema = {};
