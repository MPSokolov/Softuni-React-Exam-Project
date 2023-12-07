import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/comments";

export const create = async (data) => {
  const result = await request.post(baseUrl, data);

  return result;
};

export const getRecipeComments = async (recipeId) => {
  const result = await request.get(
    `${baseUrl}?where=recipeId LIKE "${recipeId}"&sortBy=_createdOn desc`
  );

  return result;
};
