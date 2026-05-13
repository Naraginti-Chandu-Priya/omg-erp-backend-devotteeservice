import {
  EndpointAuthType,
  EndpointHandler,
  reportError,
  sequelize
} from 'node-server-engine';
import { Response } from 'express';
import {
  Devotee,
  Spiritualinformation,
  CommunicationPreference,
  ReminderPreference,
  FamilyMembers
} from 'db';
import { ADD_DEVOTEE_ERROR } from '../devotees.const';

export const deleteDevoteeHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res: Response) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();

  try {
    const devotee = await Devotee.findOne({ where: { id } });

    if (!devotee) {
      await transaction.rollback();
      res.status(404).json({ message: 'Devotee not found' });
      return;
    }

    await Spiritualinformation.destroy({ where: { devotee_id: id }, transaction });
    await CommunicationPreference.destroy({
      where: { devotee_id: id },
      transaction
    });
    await ReminderPreference.destroy({ where: { devotee_id: id }, transaction });
    await FamilyMembers.destroy({ where: { devotee_id: id }, transaction });

    await Devotee.destroy({ where: { id }, transaction });
    await transaction.commit();

    res.json({ message: 'Devotee permanently deleted' });
  } catch (error) {
    await transaction.rollback();
    reportError(error);
    res.status(500).json({ message: ADD_DEVOTEE_ERROR });
  }
};
