/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const create = (schema: any, data: object): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .create({
        data,
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const createMany = (schema: any, data: object[]): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .createMany({
        data,
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const updateById = (
  schema: any,
  data: object,
  key: string = 'id',
  id: number | string | undefined,
): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .update({
        where: {
          [key]: id,
        },
        data,
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const deleteById = (
  schema: any,
  key: string = 'id',
  id: number | string | undefined,
): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .delete({
        where: {
          [key]: id,
        },
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const getById = (
  schema: any,
  key: string = 'id',
  id: number | string | undefined,
): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .findUnique({
        where: {
          [key]: id,
        },
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const getAlli = (
  schema: any,
  take: number = 10,
  skip: number = 0,
): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .findMany({ take, skip })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const getAll = async (
  schema: any,
  filters: object,
  take: number = 10,
  skip: number = 0,
): Promise<any> => {
  try {
    const data = await schema.findMany({ where: filters, take, skip });
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

export const getAllById = (
  schema: any,
  key: string = 'id',
  id: number | string | undefined,
  take: number = 10,
  skip: number = 0,
): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .findMany({
        take,
        skip,
        where: {
          [key]: id,
        },
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};

export const getAllByQuery = (schema: any, queryObj: object): Promise<any> => {
  return new Promise(async (res, rej) => {
    await schema
      .findMany({
        where: {
          ...queryObj,
        },
      })
      .then((response: any) => res(response))
      .catch((err: any) => rej(err));
  });
};
