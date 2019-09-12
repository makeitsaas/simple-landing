export class User {
    jwt = null;
    constructor(parsedJwtUser?: any) {
        this.jwt = parsedJwtUser;
    }

    isAuthenticated() {
        return !!this.jwt;
    }
}
