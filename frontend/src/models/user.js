export default class UserModel {

    userName;
    apiKey;
    secretKey;

    constructor(userName, apiKey, secretKey) {
        this.userName = userName;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }

}