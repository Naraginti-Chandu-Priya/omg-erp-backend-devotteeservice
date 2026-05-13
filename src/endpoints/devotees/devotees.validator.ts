import { Schema } from 'express-validator';

export const addDevoteeValidator: Schema = {
  temple_id: {
    in: 'body',
    exists: { errorMessage: 'Temple ID is required' },
    isUUID: { errorMessage: 'Invalid Temple ID format' }
  },
  first_name: {
    in: 'body',
    exists: { errorMessage: 'First name is required' },
    isString: true,
    trim: true
  },
  last_name: {
    in: 'body',
    exists: { errorMessage: 'Last name is required' },
    isString: true,
    trim: true
  },
  status: {
    in: 'body',
    exists: { errorMessage: 'Status is required' },
    isIn: {
      options: [['Active', 'Inactive']],
      errorMessage: 'Invalid status'
    }
  },
  phone: {
    in: 'body',
    optional: true,
    isString: true
  },
  email: {
    in: 'body',
    optional: true,
    isEmail: { errorMessage: 'Invalid email' }
  },
  date_of_birth: {
    in: 'body',
    optional: true,
    isISO8601: { errorMessage: 'Invalid date format' }
  }
};
export const updateDevoteeValidator: Schema = {
  temple_id: {
    in: 'body',
    optional: true,
    isUUID: { errorMessage: 'Invalid Temple ID format' }
  },
  first_name: {
    in: 'body',
    optional: true,
    isString: true,
    trim: true
  },
  last_name: {
    in: 'body',
    optional: true,
    isString: true,
    trim: true
  },
  status: {
    in: 'body',
    optional: true,
    isIn: {
      options: [['Active', 'Inactive']],
      errorMessage: 'Invalid status'
    }
  },
  phone: {
    in: 'body',
    optional: true,
    isString: true
  },
  email: {
    in: 'body',
    optional: true,
    isEmail: { errorMessage: 'Invalid email' }
  },
  date_of_birth: {
    in: 'body',
    optional: true,
    isISO8601: { errorMessage: 'Invalid date format' }
  }
};
export const emptyValidator: Schema = {};
