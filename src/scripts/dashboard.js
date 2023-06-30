import {
  createPostRequest,
  getAllPosts,
  updatePostById,
  deletePostById,
  getUsersProfile,
} from "./requests.js";

import { render } from "./render.js";

render(await getAllPosts());
