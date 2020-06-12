/* eslint-disable import/no-extraneous-dependencies */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const { handler } = require('./index');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

// Create POST route
router.post('/', async ctx => {
  const { body } = ctx.request;

  // Call the Lambda function
  const res = await handler(body);
  ctx.body = res;
});

app.use(router.routes());

// Start Koa server
app.listen(3000, () => {
  console.log('Local alexa skill listening on port 3000!');
});
