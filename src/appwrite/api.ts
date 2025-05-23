import { ID } from "appwrite";
import { databases } from "./config";
import type {
  CollectionCourseIF,
  CollectionUserIF,
} from "../interface/databaseCollection";

type collection = "users" | "courses";
// type roles = "students" | "teachers";

const databaseId = "682982930002cafc9b6d";
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
  courses: {
    name: "courses",
    collectionId: "682c31c00025f30fcc2b",
  },
};

export async function getSingleData({
  collection,
  documentId,
}: {
  collection: collection;
  documentId: string;
}) {
  try {
    const result = await databases.getDocument(
      databaseId,
      collections[collection].collectionId,
      documentId
    );

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

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
    throw new Error(error.message);
  }
}

export async function createData({
  collection,
  datas,
}: {
  collection: collection;
  datas: CollectionUserIF | CollectionCourseIF;
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

export async function deleteData({
  collection,
  documentId,
}: {
  collection: collection;
  documentId: string;
}) {
  try {
    const result = await databases.deleteDocument(
      databaseId,
      collections[collection].collectionId,
      documentId
    );

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
