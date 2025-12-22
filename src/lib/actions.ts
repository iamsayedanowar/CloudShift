import { Client, Functions, ExecutionMethod } from "appwrite";

const client = new Client().setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const functions = new Functions(client);
const FUNCTION_ID = import.meta.env.VITE_APPWRITE_FN_ID;

export const deleteFolderAction = async (folderPath: string) => {
    const result = await functions.createExecution(
        FUNCTION_ID,
        JSON.stringify({ folderPath }),
        false,
        '/delete-folder',
        ExecutionMethod.POST
    );
    const response = JSON.parse(result.responseBody);
    if (!result.responseBody || response.error) throw new Error(response.error);
    return response;
};

export const renameFolderAction = async (sourcePath: string, newName: string) => {
    const result = await functions.createExecution(
        FUNCTION_ID,
        JSON.stringify({ sourcePath, newName }),
        false,
        '/rename-folder',
        ExecutionMethod.POST
    );
    const response = JSON.parse(result.responseBody);
    if (response.error) throw new Error(response.error);
    return response;
};

export const searchFilesAction = async (query: string) => {
    const result = await functions.createExecution(
        FUNCTION_ID,
        JSON.stringify({ query }),
        false,
        '/search',
        ExecutionMethod.POST
    );
    const response = JSON.parse(result.responseBody);
    return response.results || [];
};