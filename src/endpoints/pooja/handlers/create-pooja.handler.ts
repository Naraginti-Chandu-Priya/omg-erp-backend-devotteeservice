import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
  reportError
} from 'node-server-engine';
import { Response } from 'express';
import { Pooja } from 'db';
import { CREATE_POOJA_ERROR } from '../pooja.const';

export const createPoojaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req: EndpointRequestType[EndpointAuthType.NONE], res: Response) => {
  const { pooja_name, pooja_type, pooja_price, pooja_duration, temple_id } = req.body;

  try {
    const pooja = await Pooja.create({
      pooja_name,
      pooja_type,
      pooja_price,
      pooja_duration,
      temple_id
    });

    res.status(201).json({
      message: 'Pooja created successfully',
      data: pooja
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: CREATE_POOJA_ERROR });
  }
};
