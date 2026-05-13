import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { Op } from 'sequelize';

import { PoojaSeva, Devotee } from 'db';

import {
  ADD_POOJASEVA_ERROR,
  GET_POOJASEVA_ERROR,
  UPDATE_POOJASEVA_ERROR,
  DELETE_POOJASEVA_ERROR
} from './poojasevas.const';
import { nanoid } from 'nanoid';

export const addPoojaSevaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const data = req.body;

  try {
    const seva_code = `SEVA-${nanoid(6).toUpperCase()}`;

    const receipt_number =
      data.receipt_number || `REC-${nanoid(6).toUpperCase()}`;

    const poojaSeva = await PoojaSeva.create({
      ...data,
      seva_code,
      receipt_number,
      registered_by: data.registered_by,
      updated_by: data.updated_by
    });

    res.status(201).json({
      message: 'Pooja Seva recorded successfully',
      id: poojaSeva.id,
      seva_code: poojaSeva.seva_code
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({
      message: ADD_POOJASEVA_ERROR
    });
  }
};

export const getPoojaSevasHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  try {
    const {
      page = '1',
      limit = '100',
      date
    } = req.query as {
      page?: string;
      limit?: string;
      date?: string;
    };

    const where: {
      is_deleted: boolean;
      seva_date?: { [Op.between]: [Date, Date] };
    } = { is_deleted: false };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.seva_date = {
        [Op.between]: [startOfDay, endOfDay]
      };
    }

    const { rows, count } = await PoojaSeva.findAndCountAll({
      where,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['seva_date', 'ASC']],
      include: [{ model: Devotee }]
    });

    res.json({
      data: rows,
      meta: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: GET_POOJASEVA_ERROR });
  }
};

export const getPoojaSevaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const { id } = req.params;

  try {
    const poojaSeva = await PoojaSeva.findOne({
      where: { id, is_deleted: false },
      include: [{ model: Devotee }]
    });

    if (!poojaSeva) {
      res.status(404).json({ message: 'Pooja Seva not found' });
      return;
    }

    res.json(poojaSeva);
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: GET_POOJASEVA_ERROR });
  }
};

export const updatePoojaSevaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const [updated] = await PoojaSeva.update(
      {
        ...data,
        updated_by: data.updated_by
      },
      { where: { id } }
    );

    if (updated) {
      res.json({ message: 'Pooja Seva updated successfully' });
    } else {
      res.status(404).json({ message: 'Pooja Seva not found' });
    }
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: UPDATE_POOJASEVA_ERROR });
  }
};

export const deletePoojaSevaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PoojaSeva.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({ message: 'Pooja Seva deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pooja Seva not found' });
    }
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: DELETE_POOJASEVA_ERROR });
  }
};
