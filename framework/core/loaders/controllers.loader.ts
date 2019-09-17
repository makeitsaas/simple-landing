import { PathHelper } from '../utils/path.helper';
import { AbstractController } from '../abstracts/abstract-controller';
import { ControllerClassInterface } from '../interfaces/controller-class.interface';

export class ControllersLoader {
    private controllers: ControllerClassInterface[];

    async load(): Promise<Function[]> {
        return this.getControllersList();
    }

    /**
     * Note: controllers files should all be valid and contain class that can be instanciated without causing
     *      any error.
     */
    getControllersList(): ControllerClassInterface[] {
        if(!this.controllers) {
            this.controllers = [];
            const controllersFilesNames = PathHelper.getSrcControllersFilesNames();

            controllersFilesNames.map(fileName => {
                const ControllerContent = require(fileName);
                for (let key in ControllerContent) {
                    const tmpInstance = new ControllerContent[key];
                    if (tmpInstance instanceof AbstractController) {
                        this.controllers.push(ControllerContent[key]);
                    }
                }
            });
        }

        return this.controllers;
    }
}
