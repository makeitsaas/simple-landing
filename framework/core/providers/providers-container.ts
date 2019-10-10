export interface ProviderSelector {
    default: new () => any;
    mock: new () => any;
}

class ProvidersContainer {
    containerBindings: {
        provider: any;
        use?: any
    }[] = [
        // UploadService => HttpUploadService
    ];

    bind<T>(baseClass: new () => T, selector: ProviderSelector) {
        this.containerBindings.push({
            provider: baseClass,
            use: this.selectClass(selector)
        });
    }

    providerInstance<T = any>(baseClass: new() => T): T {
        for (let binding of this.containerBindings) {
            if (binding.provider === baseClass) {
                console.log('found', binding);
                return new (binding.use || binding.provider)();
            }
        }

        return new baseClass();
    }

    private selectClass(selector: ProviderSelector): (new () => any) {
        const envMode: string = process.env.MODE === 'test' ? 'mock' : 'default';

        switch (envMode) {
            case 'default':
            case 'mock':
                return selector[envMode];
            default:
                throw new Error('Invalid mode ' + envMode);
        }
    }
}

export const providerManager = new ProvidersContainer();
