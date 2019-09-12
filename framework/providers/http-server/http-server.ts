import { APIContainer } from '../../core/api-container';
import { HttpVerb } from '../route';
import { Application, Response } from 'express';
import {
    AbstractMiddlewareClass,
    AuthMiddleware,
    toFunction,
    UserRequest
} from '../auth';

const express = require('express');
const bodyParser = require('body-parser');

export class HttpServer {
    public app: Application;

    constructor() {
        this.app = express();
        this.requestParseBody();
        this.requestEnableCors();
        this.app.use(toFunction(AuthMiddleware.parseUserMiddleware));
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
            allRoutes[verb].map(([path, callback, options]) => {
                // console.log('configure', path);
                // if (options && options.middleware) {
                //     console.log(options.middleware);
                // }

                let routeArguments: any[] = [path];

                if (options) {
                    routeArguments = [path, ...options.middleware.map((m: AbstractMiddlewareClass) => toFunction(m))];
                }

                const actionFn = async (req: UserRequest, res: Response) => {
                    const {controller, methodName} = APIContainer.getController(callback);
                    const controllerInstance = new controller(req);

                    const result = await callback.apply(controllerInstance, []);
                    res.send({
                        controller: controllerInstance.constructor.name,
                        methodName,
                        value: result
                    });
                };

                routeArguments.push(actionFn);

                //@ts-ignore
                this.app[verb].apply(this.app, routeArguments);

                // this.app[verb](path, actionFn);
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
