import {
    Client,
    TablesDB,
    Storage,
    Query,
    ID,
} from "appwrite";

import conf from "../conf/conf.js";

class AppwriteService {
    constructor() {
        this.client = new Client();

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    // =========================
    // CREATE POST
    // =========================

    async createPost({
        title,
        content,
        featuredImage,
        status,
        userId,
    }) {
        try {
            const slug = this.createSlug(title);

            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            console.error("createPost:", error);
            throw error;
        }
    }

    // =========================
    // UPDATE POST
    // =========================

    async updatePost(
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    ) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            });
        } catch (error) {
            console.error("updatePost:", error);
            throw error;
        }
    }

    // =========================
    // DELETE POST
    // =========================

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });

            return true;
        } catch (error) {
            console.error("deletePost:", error);
            return false;
        }
    }

    // =========================
    // GET SINGLE POST
    // =========================

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.error("getPost:", error);
            return null;
        }
    }

    // =========================
    // GET ALL POSTS
    // =========================

    async getPosts(queries = []) {
        try {
            const finalQueries = [
                Query.equal("status", "active"),
                Query.orderDesc("$createdAt"),
                ...queries,
            ];

            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: finalQueries,
            });
        } catch (error) {
            console.error("getPosts:", error);
            return null;
        }
    }

    // =========================
    // GET USER POSTS
    // =========================

    async getUserPosts(userId) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: [
                    Query.equal("userId", userId),
                    Query.orderDesc("$createdAt"),
                ],
            });
        } catch (error) {
            console.error("getUserPosts:", error);
            return null;
        }
    }

    // =========================
    // IMAGE UPLOAD
    // =========================

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.error("uploadFile:", error);
            return null;
        }
    }

    // =========================
    // DELETE IMAGE
    // =========================

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });

            return true;
        } catch (error) {
            console.error("deleteFile:", error);
            return false;
        }
    }

    // =========================
    // IMAGE PREVIEW
    // =========================

    getFilePreview(fileId) {
        if (!fileId) return "";

        return this.storage.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId,
        });
    }

    // =========================
    // CREATE SLUG
    // =========================

    createSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 36);
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;