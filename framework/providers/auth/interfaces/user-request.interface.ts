import { Request } from 'express';
import { User } from '..';

export interface UserRequest extends Request{
    user?: User;
}
