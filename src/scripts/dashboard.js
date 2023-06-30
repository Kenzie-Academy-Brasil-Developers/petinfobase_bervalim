import { createPostRequest, getAllPosts } from "./requests.js";

// createPostRequest({
//   title: "Libertem os caes",
//   content: "Não os deixem em correntes",
// });

console.log(await getAllPosts());
