import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { Donation } from 'db';
import { ADD_DONATION_ERROR, DONATION_NOT_FOUND } from '../donations.const';

export const updateDonationHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await Donation.findByPk(id);

    if (!donation) {
      res.status(404).json({ message: DONATION_NOT_FOUND });
      return;
    }

    await donation.update({
      amount: req.body.amount,
      category: req.body.category,
      donation_date: req.body.donation_date,
      channel: req.body.channel,
      payment_method: req.body.payment_method,
      payment_status: req.body.payment_status,
      notes: req.body.notes,
      updated_by: req.body.updated_by
    });

    res.json({ message: 'Donation updated successfully' });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: ADD_DONATION_ERROR });
  }
};
