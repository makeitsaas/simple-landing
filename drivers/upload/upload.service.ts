import { MockUploadService } from './services/MockUploadService';
import { HttpUploadService } from './services/HttpUploadService';
import { providerManager, ProviderSelector } from '../../framework/core/providers/providers-container';

export class UploadService extends MockUploadService {
}

const selector: ProviderSelector = {
    default: HttpUploadService,
    mock: MockUploadService
};

providerManager.bind(UploadService, selector);
// const service = providerManager.providerInstance<UploadService>(UploadService);
