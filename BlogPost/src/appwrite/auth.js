import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

class AuthService {
    constructor() {
        this.client = new Client();

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (user) {
                return await this.login({ email, password });
            }

            return user;
        } catch (error) {
            console.error("AuthService :: createAccount ::", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.error("AuthService :: login ::", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("AuthService :: logout ::", error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;