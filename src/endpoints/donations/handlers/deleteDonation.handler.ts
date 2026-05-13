import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { Donation } from 'db';
import {
  ADD_DONATION_ERROR,
  ADD_DONATION_UNAUTHORIZED,
  DONATION_NOT_FOUND
} from '../donations.const';

export const deleteDonationHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await Donation.findByPk(id);

    if (!donation) {
      res.status(404).json({ message: DONATION_NOT_FOUND });
      return;
    }

    await donation.destroy();

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: ADD_DONATION_ERROR });
  }
};
