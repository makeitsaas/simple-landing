import { BasicApi } from '../framework/core/basic-api';
import { PageModule } from './page/page.module';

const api = new BasicApi([
    new PageModule()
]);

api.listen();

