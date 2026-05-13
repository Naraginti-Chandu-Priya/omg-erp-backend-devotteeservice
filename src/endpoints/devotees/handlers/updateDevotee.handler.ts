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
  ReminderPreference
} from 'db';
import { persistFamilyMembers } from './utils';
import { ADD_DEVOTEE_ERROR } from '../devotees.const';

export const updateDevoteeHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const transaction = await sequelize.transaction();

  try {
    const devotee = await Devotee.findOne({
      where: { id, is_deleted: false },
      transaction
    });

    if (!devotee) {
      await transaction.rollback();
      res.status(404).json({ message: 'Devotee not found' });
      return;
    }

    await Devotee.update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        address_line: data.address_line,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        occupation: data.occupation,
        membership_type: data.membership_type,
        updated_by: data.updated_by
      },
      { where: { id }, transaction }
    );

    if (data.nakshatra || data.rasi || data.gothram) {
      const existing = await Spiritualinformation.findOne({
        where: { devotee_id: id },
        transaction
      });

      if (existing) {
        await existing.update(
          {
            nakshatra: data.nakshatra,
            rasi: data.rasi,
            gothram: data.gothram
          },
          { transaction }
        );
      } else {
        await Spiritualinformation.create(
          {
            devotee_id: id,
            nakshatra: data.nakshatra,
            rasi: data.rasi,
            gothram: data.gothram
          },
          { transaction }
        );
      }
    }

    if (data.communication_preferences) {
      await CommunicationPreference.upsert(
        { devotee_id: id, ...data.communication_preferences },
        { transaction }
      );
    }

    if (data.reminder_preferences) {
      await ReminderPreference.upsert(
        { devotee_id: id, ...data.reminder_preferences },
        { transaction }
      );
    }

    if (data.family_members) {
      await persistFamilyMembers(id, data.family_members, transaction);
    }

    await transaction.commit();

    res.json({ message: 'Devotee updated successfully' });
  } catch (error) {
    await transaction.rollback();
    reportError(error);
    res.status(500).json({ message: ADD_DEVOTEE_ERROR });
  }
};
