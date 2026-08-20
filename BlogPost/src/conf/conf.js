const conf={
    appwriteurl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritetableid:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwritebucketid:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;