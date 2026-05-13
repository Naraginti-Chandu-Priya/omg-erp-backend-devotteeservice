import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { Response } from 'express';
import {
  Devotee,
  Spiritualinformation,
  CommunicationPreference,
  ReminderPreference,
  FamilyMembers,
  Donation,
  PoojaSeva
} from 'db';

export const getDevoteeHandler: EndpointHandler<EndpointAuthType.NONE> = async (
  req,
  res: Response
) => {
  const { id } = req.params;

  try {
    const devotee = await Devotee.findOne({
      where: { id, is_deleted: false },
      include: [
        { model: Spiritualinformation },
        { model: CommunicationPreference },
        { model: ReminderPreference },
        { model: FamilyMembers },
        { model: Donation },
        { model: PoojaSeva }
      ]
    });

    if (!devotee) {
      res.status(404).json({ message: 'Devotee not found' });
      return;
    }

    res.json(devotee);
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: 'Devotee not found' });
  }
};
