import { APIContainer } from '../../core/api-container';
import { HttpVerb } from '../route/routing-rule-set';
import { Application } from 'express';
import { AbstractController } from '../../core/abstracts/abstract-controller';
import { PageController } from '../../../src/page/controllers/page.controller';

const express = require('express');
const bodyParser = require('body-parser');

export class HttpServer {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());       // to support JSON-encoded bodies
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));
        this.app.use(function (req: any, res: any, next: any) {
            // CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    }

    listen() {
        const allRoutes = APIContainer.globalRoutingRuleSet.routes;
        let verb: HttpVerb;
        for (verb in allRoutes) {
            allRoutes[verb].map(([path, callback]) => {
                console.log('configure', path);
                this.app[verb](path, async (req, res) => {
                    const {controller, methodName} = APIContainer.getController(callback);
                    const controllerInstance = new controller(req);

                    const result = await callback.apply(controllerInstance, []);
                    res.send({
                        controller: controllerInstance.constructor.name,
                        methodName,
                        value: result
                    });
                });
            });
        }
        this.app.get('*', (req, res) => res.send("Application is running"));
        this.app.listen(this.getPort(), () => console.log(`
*************************************************
       App listening on port ${this.getPort()}!
*************************************************
    `));
    }

    getPort() {
        return process.env.PORT || 3000;
    }
}
