import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/recipes';

export const create = async (data) => {
    const result = await request.post(baseUrl, data);

    // const { ownerId, ...recipeData } = data;
    // const result = await request.post(`${baseUrl}?load=author=${ownerId}:users`, recipeData);

    return result;
};

export const getAll = async () => {
    const result = await request.get(`${baseUrl}?select=title,pictureUrl,_id,_createdOn&sortBy=_createdOn desc`);

    return result;
};

export const getOne = async (_id) => {
    const result = await request.get(`${baseUrl}/${_id}`)

    return result;
};

export const get3MostRecent = async () => {
    const result = await request.get(`${baseUrl}?select=title,pictureUrl,_id,_createdOn&sortBy=_createdOn desc&offset=0&pageSize=3`);

    return result;
};

export const getUserRecipes = async (userId) => {
    const result = await request.get(`${baseUrl}?where=_ownerId LIKE "${userId}"`)

    return result;
};