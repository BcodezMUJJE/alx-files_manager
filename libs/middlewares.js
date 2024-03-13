import express from 'express';

/**
 * This adds middlewares to the given express application.
 * @param {express.Express} api The express application.
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};
export default injectMiddlewares;
