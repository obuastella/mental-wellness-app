import { Client, Account, Databases } from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("685ae1000013f6625103");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
