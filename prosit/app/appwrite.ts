import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // your endpoint
  .setProject("685ae1000013f6625103"); // your project ID

export { client };
