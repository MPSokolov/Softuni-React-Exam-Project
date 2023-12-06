import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/recipes';

export const create = async (data) => {
    const result = await request.post(baseUrl, data);

    // const { ownerId, ...recipeData } = data;
    // const result = await request.post(`${baseUrl}?load=author=${ownerId}:users`, recipeData);

    return result;
};