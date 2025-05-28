import { ID } from "appwrite";
import { databases } from "./config";
import type {
  CollectionCourseIF,
  CollectionQuestionIF,
  CollectionUserIF,
} from "../interface/databaseCollection";

type collection = "users" | "courses" | "questions" | "students_course";
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
  questions: {
    name: "questions",
    collectionId: "68355c8c002523f677dd",
  },
  students_course: {
    name: "students_course",
    collectionId: "6836b68700115d3c1ac4",
  },
};

export async function getSingleData({
  collection,
  documentId,
  query,
}: {
  collection: collection;
  documentId: string;
  query?: any[];
}) {
  try {
    const result = await databases.getDocument(
      databaseId,
      collections[collection].collectionId,
      documentId,
      query
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
  datas: CollectionUserIF | CollectionCourseIF | CollectionQuestionIF;
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

export async function updateData({
  collection,
  datas,
  documentId,
}: {
  collection: collection;
  datas: CollectionUserIF | CollectionCourseIF | CollectionQuestionIF;
  documentId: string;
}) {
  try {
    const result = await databases.updateDocument(
      databaseId,
      collections[collection].collectionId,
      documentId,
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
