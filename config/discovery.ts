import { DiscoveryConfigInterface } from '@framework-v2/providers/discovery/interfaces/discovery-config.interface';

export const ServiceDiscovery: DiscoveryConfigInterface = {
    'upload': {
        url: 'http://localhost:3006',
        provider: 'default'
    },
    'main': {
        url: 'http://localhost:3000'
    },
};
