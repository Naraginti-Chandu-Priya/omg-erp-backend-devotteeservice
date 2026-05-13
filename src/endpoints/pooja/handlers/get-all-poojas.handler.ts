import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
  reportError
} from 'node-server-engine';
import { Response } from 'express';
import { Pooja } from 'db';
import { GET_POOJA_ERROR } from '../pooja.const';

export const getAllPoojasHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req: EndpointRequestType[EndpointAuthType.NONE], res: Response) => {

  try {
    const poojas = await Pooja.findAll();
    res.status(200).json({ data: poojas });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: GET_POOJA_ERROR });
  }
};
