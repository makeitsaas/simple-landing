import { FileSchema } from '../schemas/file.schema';
import { UploadServiceInterface } from '../upload-service.interface';
import { service } from '../../../framework/core/decorators/service';
import { HttpRequest } from '../../../framework/providers/request/http-request';

export class HttpUploadService implements UploadServiceInterface {

    @service
    http: HttpRequest;

    getFileByUuid(uuid: string): Promise<FileSchema> {
        return this.http.get('the url to find').then(response => {
            return {
                uuid,
                ownerUuid: '7',
                privacy: 'public'
            }
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
