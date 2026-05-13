import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
  reportError
} from 'node-server-engine';
import { Response } from 'express';
import { Pooja } from 'db';
import { UPDATE_POOJA_ERROR, POOJA_NOT_FOUND } from '../pooja.const';

export const updatePoojaHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req: EndpointRequestType[EndpointAuthType.NONE], res: Response) => {
  const { id } = req.params;
  const { pooja_name, pooja_type, pooja_price, pooja_duration } = req.body;

  try {
    const pooja = await Pooja.findByPk(id);

    if (!pooja) {
      res.status(404).json({ message: POOJA_NOT_FOUND });
      return;
    }

    await pooja.update({
      pooja_name,
      pooja_type,
      pooja_price,
      pooja_duration
    });

    res.status(200).json({
      message: 'Pooja updated successfully',
      data: pooja
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: UPDATE_POOJA_ERROR });
  }
};
