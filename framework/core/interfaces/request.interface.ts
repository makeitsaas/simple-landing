import { User } from '../../providers/auth';

export interface RequestInterface {
    params?: any;
    query?: any;
    body?: any;
    user?: User
}
