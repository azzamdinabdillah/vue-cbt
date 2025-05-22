import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("682978c4002ff585753c");

const storage = new Storage(client);
const bucketId = "682c2fb0001659940227";

export async function getFile() {
  try {
    const file = await storage.getFile(bucketId, "682c3b350001c9891acf");
    console.log(file);

    return file;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function uploadFile(file: File) {
  try {
    const upload = await storage.createFile(bucketId, "unique()", file);

    return upload.$id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function urlFileStorage(fileId: string) {
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/682c2fb0001659940227/files/${fileId}/view?project=682978c4002ff585753c&mode=admin`;
}
