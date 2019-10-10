import { BasicApi } from '@framework-v2/core/basic-api';
import { PageModule } from './modules/page/page.module';

const api = new BasicApi([
    new PageModule()
]);

api.listen();

