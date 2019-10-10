import { FileSchema } from '../schemas/file.schema';
import { UploadServiceInterface } from '../upload-service.interface';
import { service } from '../../../framework/core/decorators/service';
import { HttpClient } from '../../../framework/providers/request/http-client';
import { APIContainer } from '../../../framework/core/api-container';

export class HttpUploadService implements UploadServiceInterface {

    @service
    http: HttpClient;

    getFileByUuid(uuid: string): Promise<FileSchema> {
        const url = APIContainer.discovery.getServiceUrl('upload');
        return this.http.get<FileSchema>(`${url}/files/${uuid}`).then(file => {
            return file;
        });
    }

    changePrivacy(uuid: string, newPrivacy: 'public' | 'private'): Promise<FileSchema> {
        return Promise.resolve({
            uuid,
            ownerUuid: '7',
            privacy: 'public'
        });
    }
}
