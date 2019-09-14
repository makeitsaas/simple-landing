import { ControllerInstanceInterface } from '../interfaces/controller-instance.interface';
import { RequestInterface } from '../interfaces/request.interface';

export abstract class AbstractController implements ControllerInstanceInterface {

    protected params: any;
    protected payload: any;

    constructor(protected request: RequestInterface = {}) {
        this.params = this.request.params;
        this.payload = this.request.body;
    }
}
