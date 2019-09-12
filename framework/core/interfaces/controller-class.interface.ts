import { ControllerInstanceInterface } from './controller-instance.interface';
import { RequestInterface } from './request.interface';

export interface ControllerClassInterface {
    new (request: RequestInterface): ControllerInstanceInterface
}
