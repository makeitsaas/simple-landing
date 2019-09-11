import { ControllerInterface } from './controller.interface';
import { RequestInterface } from './request.interface';

export interface ControllerClassInterface {
    new (request: RequestInterface): ControllerInterface
}
