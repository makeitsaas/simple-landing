import { RoutingObject } from './routing-object';
import { PageController } from '../../src/page/controllers/page.controller';
import { BlockController } from '../../src/page/controllers/block.controller';

export class BasicApi {
    constructor(routes: RoutingObject[] = []) {
        routes.map(ro => {
            if(ro.routes && ro.routes.get.length) {
                const [path, callback] = ro.routes.get[0];
                console.log('ro', path);
                console.log(callback);
                const pcInstance = new PageController();
                console.log(PageController.prototype.getById === callback);
                console.log(pcInstance.getById === callback);
                console.log(BlockController.prototype.getById === callback);
            }
        })
    }

    listen() {
        console.log('listen port');
    }
}
