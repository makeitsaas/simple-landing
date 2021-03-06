import { DiscoveryConfigInterface } from './interfaces/discovery-config.interface';
import { ServiceDiscovery } from '../../../config/discovery';
import { ServiceConfig } from '../../../config/service-config';

export class DiscoveryClient {

    config: DiscoveryConfigInterface;

    async load() {
        await Promise.all([
            this.fetchConfig(),
            this.register(),
        ]);
    }

    getServiceUrl(serviceToken: string): string {
        if(this.config[serviceToken]) {
            return this.config[serviceToken].url;
        }

        throw new Error('Invalid service token ' + serviceToken);
    }

    getSelfServiceCode() {
        return ServiceConfig.selfDiscoveryCode;
    }

    getSelfDefaultUrl() {
        return this.getServiceUrl(this.getSelfServiceCode());
    }

    private fetchConfig() {
        // console.log('register service')
        this.config = ServiceDiscovery;
    }

    private register() {
        // console.log('register service')
    }
}
