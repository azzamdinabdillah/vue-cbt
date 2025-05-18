import { Client, Databases } from "appwrite";

export const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("682978c4002ff585753c");

export const databases = new Databases(client);
