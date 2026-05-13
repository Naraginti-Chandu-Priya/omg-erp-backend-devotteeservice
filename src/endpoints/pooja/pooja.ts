import { Endpoint, EndpointAuthType, EndpointMethod } from 'node-server-engine';
import {
  createPoojaHandler,
  getPoojaHandler,
  getAllPoojasHandler,
  updatePoojaHandler,
  deletePoojaHandler
} from './handlers';
import {
  createPoojaValidator,
  updatePoojaValidator,
  emptyValidator
} from './pooja.validator';

export const createPoojaEndpoint = new Endpoint({
  path: '/poojas',
  method: EndpointMethod.POST,
  handler: createPoojaHandler,
  authType: EndpointAuthType.NONE,
  validator: createPoojaValidator
});

export const getAllPoojasEndpoint = new Endpoint({
  path: '/poojas',
  method: EndpointMethod.GET,
  handler: getAllPoojasHandler,
  authType: EndpointAuthType.NONE,
  validator: emptyValidator
});

export const getPoojaEndpoint = new Endpoint({
  path: '/poojas/:id',
  method: EndpointMethod.GET,
  handler: getPoojaHandler,
  authType: EndpointAuthType.NONE,
  validator: emptyValidator
});

export const updatePoojaEndpoint = new Endpoint({
  path: '/poojas/:id',
  method: EndpointMethod.PUT,
  handler: updatePoojaHandler,
  authType: EndpointAuthType.NONE,
  validator: updatePoojaValidator
});

export const deletePoojaEndpoint = new Endpoint({
  path: '/poojas/:id',
  method: EndpointMethod.DELETE,
  handler: deletePoojaHandler,
  authType: EndpointAuthType.NONE,
  validator: emptyValidator
});
