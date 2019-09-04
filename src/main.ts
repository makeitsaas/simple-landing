import { BasicApi } from '../framework/core/basic-api';
import { PageRouting } from './page/page.routing';

const api = new BasicApi([
    PageRouting
]);

api.listen();

