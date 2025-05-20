import { ID } from "appwrite";
import { databases } from "./config";
import type { CollectionUserIF } from "../interface/databaseCollection";

type collection = "users";
// type roles = "students" | "teachers";

const databaseId = "682982930002cafc9b6dL";
const collections: {
  [key in collection]: {
    name: string;
    collectionId: string;
  };
} = {
  users: {
    name: "users",
    collectionId: "682982c5001ed4dc5ef5",
  },
};

export async function getData({
  collection,
  query,
}: {
  collection: collection;
  query: any[];
}) {
  try {
    const result = await databases.listDocuments(
      databaseId,
      collections[collection].collectionId,
      query
    );

    return result.documents;
  } catch (error: any) {
    return error.message;
  }
}

export async function createData({
  collection,
  datas,
}: {
  collection: collection;
  datas: CollectionUserIF;
}) {
  try {
    const result = await databases.createDocument(
      databaseId,
      collections[collection].collectionId,
      ID.unique(),
      datas
    );

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
