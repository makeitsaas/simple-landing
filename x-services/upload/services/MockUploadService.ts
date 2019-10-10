import { FileSchema } from '../schemas/file.schema';
import { UploadServiceInterface } from '../upload-service.interface';

export class MockUploadService implements UploadServiceInterface {
    getFileByUuid(uuid: string): Promise<FileSchema> {
        return Promise.resolve({
            uuid,
            ownerUuid: '7',
            privacy: 'public'
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
