import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { PathHelper } from '../../core/utils/path.helper';
import { EverythingSubscriber } from './events';

export class DatabaseLoader {
    public connection: Connection;
    load() {
        return loadConnection().then(connection => this.connection = connection);
    }
}

const loadConnection = () => {
    return createConnection(getConnectionOptions())
        .then(connection => {
            // here you can start to work with your entities
            return connection;
        })
        .catch(error => {
            throw error;
        });
}

const getConnectionOptions = (): ConnectionOptions => {

    const entities = PathHelper.getAllEntitiesFilesNames();

    console.log('entities', entities);

    return {
        type: 'mysql',
        host: process.env[`DB_HOSTNAME`],
        port: 3306,
        username: process.env[`DB_USERNAME`],
        password: process.env[`DB_PASSWORD`],
        database: process.env[`DB_DATABASE`],
        entities: entities,
        synchronize: true,
        logging: false,
        subscribers: [EverythingSubscriber]
    };
};
