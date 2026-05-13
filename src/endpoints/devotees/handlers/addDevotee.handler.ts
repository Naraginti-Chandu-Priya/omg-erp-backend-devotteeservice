import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
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
import { ADD_DEVOTEE_ERROR } from '../devotees.const';
import { persistFamilyMembers } from './utils';
import { nanoid } from 'nanoid';

export const addDevoteeHandler: EndpointHandler<EndpointAuthType.NONE> = async (
  req: EndpointRequestType[EndpointAuthType.NONE],
  res: Response
) => {
  const data = req.body;
  const transaction = await sequelize.transaction();

  try {
    const devotee_code = `DEV-${nanoid(6).toUpperCase()}`;

    const devotee = await Devotee.create(
      {
        devotee_code,
        temple_id: data.temple_id,
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
        created_by: data.created_by,
        updated_by: data.updated_by
      },
      { transaction }
    );

    if (data.nakshatra || data.rasi || data.gothram) {
      await Spiritualinformation.create(
        {
          devotee_id: devotee.id,
          nakshatra: data.nakshatra,
          rasi: data.rasi,
          gothram: data.gothram
        },
        { transaction }
      );
    }

    if (data.communication_preferences) {
      await CommunicationPreference.create(
        {
          devotee_id: devotee.id,
          ...data.communication_preferences
        },
        { transaction }
      );
    }

    if (data.reminder_preferences) {
      await ReminderPreference.create(
        {
          devotee_id: devotee.id,
          ...data.reminder_preferences
        },
        { transaction }
      );
    }

    if (data.family_members?.length) {
      await persistFamilyMembers(devotee.id, data.family_members, transaction);
    }

    await transaction.commit();

    res.status(201).json({
      message: 'Devotee created successfully',
      id: devotee.id,
      devotee_code: devotee.devotee_code
    });
  } catch (error) {
    await transaction.rollback();
    reportError(error);

    res.status(500).json({
      message: ADD_DEVOTEE_ERROR
    });
  }
};
