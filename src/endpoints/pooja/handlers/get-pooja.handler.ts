import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
  reportError
} from 'node-server-engine';
import { Response } from 'express';
import { Pooja } from 'db';
import { GET_POOJA_ERROR, POOJA_NOT_FOUND } from '../pooja.const';

export const getPoojaHandler: EndpointHandler<EndpointAuthType.NONE> = async (
  req: EndpointRequestType[EndpointAuthType.NONE],
  res: Response
) => {
  const { id } = req.params;

  try {
    const pooja = await Pooja.findByPk(id);

    if (!pooja) {
      res.status(404).json({ message: POOJA_NOT_FOUND });
      return;
    }

    res.status(200).json({ data: pooja });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: GET_POOJA_ERROR });
  }
};
