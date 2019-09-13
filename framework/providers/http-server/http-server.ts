import { APIContainer } from '../../core/api-container';
import { HttpVerb } from '../route';
import { Application, Response } from 'express';
import {
    AbstractMiddlewareClass,
    AuthMiddleware,
    toFunction,
    UserRequest
} from '../auth';
import { PageController } from '../../../src/page/controllers/page.controller';
import { validate, ValidationError } from 'class-validator';

const express = require('express');
const bodyParser = require('body-parser');

class InputObject {}

// const requiredMetadataKey = Symbol("required");
// export function parameterDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
//     let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
//     existingRequiredParameters.push(parameterIndex);
//     Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
// }

export function input(target: Object, propertyKey: string | symbol, parameterIndex: number) {
}

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

                let routeAction = this.buildRouteAction(callback),
                    routeArguments: any[] = [path, routeAction];

                if (options) {
                    let middlewareFns = options.middleware.map((m: AbstractMiddlewareClass) => toFunction(m));
                    routeArguments.splice(1, 0, ...middlewareFns);
                }

                // console.log(verb, path, routeArguments);

                //@ts-ignore
                this.app[verb].apply(this.app, routeArguments); // this.app[verb](path, actionFn);
            });
        }
    }

    private buildRouteAction(callback: Function) {
        const {controller, methodName} = APIContainer.getController(callback),
            callbackArgumentsTypes: {new():InputObject}[] = Reflect.getMetadata('design:paramtypes', PageController.prototype, methodName) || [];
        // console.log('callback', callback);
        // console.log(Object.getOwnPropertyNames(callback));
        // console.log("callback.length", callback.length);
        // console.log("callback.name", callback.name);
        // console.log(Object.getPrototypeOf(PageController));
        // console.log(Reflect.getMetadata('design:paramtypes', PageController.prototype, callback.name));
        // console.log(Reflect.getMetadata('design:paramtypes', callback));
        // console.log(Reflect.getMetadata('design:type', callback));
        // console.log(Reflect.getMetadata('design:param', callback));
        // console.log(Reflect.getMetadata('design:params', callback));
        // console.log('callbackArgumentsTypes', callback, callbackArgumentsTypes);

        return async (req: UserRequest, res: Response) => {

            const controllerInstance = new controller(req);

            // type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
            // type params = ArgumentTypes<typeof callback>; => how to use this ?
            // console.log('params', Reflect.getMetadata('design:paramtypes', callback));

            let requestArguments = [];

            try {
                requestArguments = await Promise.all(callbackArgumentsTypes.map(T => this.validateInput(T, req.body)));
            } catch(e) {
                res.status(400).send({message: e.message});
                console.log(e);
                return;
            }

            console.log('request arguments', requestArguments);

            try {
                const result = await callback.apply(controllerInstance, requestArguments);
                res.send({
                    controller: controllerInstance.constructor.name,
                    methodName,
                    value: result
                });
            } catch(e) {
                if(/^Invalid/i.test(e.message)) {
                    res.status(400).send({message: e.message});
                } else {
                    res.status(500).send({message: e.message});
                }
            }

        };
    }


    /**
     * validate shall return an error :
     *  - when a required property is missing
     *  - when property constraint are not valid
     *  - when an unauthorized property is set
     *  - when property type is invalid
     */
    private validateInput(inputClass: {new():any}, body: any): Promise<any> {
        const input = new inputClass();

        for(let key in body) {
            input[key] = body[key];
        }

        // whitelist : true => removes non-whitelisted properties
        // forbidNonWhitelisted : true => returns error in case non-whitelisted properties are encountered
        return validate(input, { whitelist: true, forbidNonWhitelisted: true })
            .then(errors => {
                if(errors && errors.length) {
                    throw new Error(this.stringifyValidationErrors(errors));
                } else {
                    return input;
                }
            });
    }

    private stringifyValidationErrors(errors: ValidationError[]): string {

        let errorsMap = errors.map(error => {
            let constraints: string[] = [];
            for(let key in error.constraints) {
                constraints.push(`${key}(${error.constraints[key]})`);
            }

            return `${error.property} => ${constraints.join(', ')}`;
        });

        return `${errors.length} errors: ${errorsMap.join(' | ')}`;
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
