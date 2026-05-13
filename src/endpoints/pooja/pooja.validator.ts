import { Schema } from 'express-validator';

export const createPoojaValidator: Schema = {
  pooja_name: {
    in: 'body',
    exists: { errorMessage: 'Pooja name is required' },
    isString: true,
    trim: true
  },
  pooja_type: {
    in: 'body',
    exists: { errorMessage: 'Pooja type is required' },
    isIn: {
      options: [['daily', 'special', 'festival']],
      errorMessage: 'Invalid pooja type'
    }
  },
  pooja_price: {
    in: 'body',
    exists: { errorMessage: 'Pooja price is required' },
    isDecimal: { errorMessage: 'Invalid price' }
  },
  pooja_duration: {
    in: 'body',
    exists: { errorMessage: 'Pooja duration is required' },
    isString: true,
    trim: true
  }
};

export const updatePoojaValidator: Schema = {
  pooja_name: {
    in: 'body',
    optional: true,
    isString: true,
    trim: true
  },
  pooja_type: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['daily', 'special', 'festival']],
      errorMessage: 'Invalid pooja type'
    }
  },
  pooja_price: {
    in: 'body',
    optional: true,
    isDecimal: { errorMessage: 'Invalid price' }
  },
  pooja_duration: {
    in: 'body',
    optional: true,
    isString: true,
    trim: true
  }
};

export const emptyValidator: Schema = {};
