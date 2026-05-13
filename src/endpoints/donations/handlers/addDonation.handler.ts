import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { Donation } from 'db';
import { nanoid } from 'nanoid';
import {
  ADD_DONATION_ERROR
} from '../donations.const';

export const addDonationHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  try {
    const donation_code = `DON-${nanoid(6).toUpperCase()}`;
    const transaction_ref = `TXN-${nanoid(6).toUpperCase()}`;
    const receipt_number = `REC-${nanoid(6).toUpperCase()}`;

    const data = req.body;

    const donation = await Donation.create({
      devotee_id: data.devotee_id,
      amount: data.amount,
      category: data.category,
      donation_date: data.donation_date,
      channel: data.channel,
      payment_method: data.payment_method,
      payment_status: data.payment_status,
      notes: data.notes,
      donation_code,
      transaction_ref,
      receipt_number,
      created_by: data.created_by,
      updated_by: data.updated_by
    });

    res.status(201).json({
      message: 'Donation created successfully',
      id: donation.id,
      donation_code,
      transaction_ref,
      receipt_number
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: ADD_DONATION_ERROR });
  }
};
