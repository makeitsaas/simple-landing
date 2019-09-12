import { APIContainer } from '../../core/api-container';
import { HttpVerb } from '../route/routing-rule-set';
import { Application } from 'express';
import { AbstractController } from '../../core/abstracts/abstract-controller';
import { PageController } from '../../../src/page/controllers/page.controller';
import { AuthProvider } from '../auth/auth';

const express = require('express');
const bodyParser = require('body-parser');

export class HttpServer {
    public app: Application;

    constructor() {
        this.app = express();
        this.requestParseBody();
        this.requestEnableCors();
        this.app.use(AuthProvider.middlewareParseUser);
    }

    listen() {
        this.useApplicationRoutes();
        this.app.get('*', (req, res) => res.status(404).send({message: "Not Found"}));
        this.app.listen(this.getApplicationPort(), () => this.logStartSuccess());
    }

    getApplicationPort() {
        return process.env.PORT || 3000;
    }

    /*
     *
     * Private methods
     *
     */

    private requestParseBody() {
        this.app.use(bodyParser.json());       // to support JSON-encoded bodies
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));
    }

    private requestEnableCors() {
        this.app.use(function (req: any, res: any, next: any) {
            // CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    }

    private useApplicationRoutes() {
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
    }

    private logStartSuccess() {
        console.log(
`
*************************************************
       App listening on port ${this.getApplicationPort()}!
*************************************************
`
        );
    }
}
