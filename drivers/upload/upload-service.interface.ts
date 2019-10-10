import { FileSchema } from './schemas/file.schema';

export interface UploadServiceInterface {
    getFileByUuid(uuid: string): Promise<FileSchema>

    changePrivacy(uuid: string, newPrivacy: 'public' | 'private'): Promise<FileSchema>
}
