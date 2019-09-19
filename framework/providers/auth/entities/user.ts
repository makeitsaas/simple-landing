export class User {
    uuid: string|null;
    jwt = null;
    constructor(parsedJwtUser?: any) {
        const possibleUuid = parsedJwtUser && (parsedJwtUser.uuid || parsedJwtUser.id);
        this.jwt = parsedJwtUser;
        this.uuid = possibleUuid ? `${possibleUuid}`:null;
    }

    isAuthenticated() {
        return !!this.jwt;
    }
}
