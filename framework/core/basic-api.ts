import "reflect-metadata";
import { config as loadEnv } from 'dotenv';

loadEnv();

import { APIContainer } from './api-container';
import { AbstractModule } from './abstracts/abstract-module';
import { HttpServer } from '../providers/http-server/http-server';

export class BasicApi {
    constructor(modules: AbstractModule[] = []) {
        APIContainer.registerModules(modules);
        APIContainer.ready.then(() => {
            // modules.map(m => m.testRoutes());
            // console.log('global rule set', APIContainer.globalRoutingRuleSet);
        });
    }

    listen() {
        return APIContainer.ready.then(() => {
            const server = new HttpServer();
            return server.listen();
        })
    }
}
