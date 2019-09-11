import { ControllerInterface } from '../interfaces/controller.interface';
import { RequestInterface } from '../interfaces/request.interface';

export abstract class AbstractController implements ControllerInterface{

    protected params: any;
    protected body: any;

    constructor(protected request: RequestInterface = {}) {
        this.params = this.request.params;
        this.body = this.request.body;
    }
}
