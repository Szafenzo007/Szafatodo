import {ID, storage} from "@/appwrite"

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded =  await storage.createFile(
        "650b5e6ca08e48d138c7",
        ID.unique(),
        file
    );
    return fileUploaded;
};

export default uploadImage;