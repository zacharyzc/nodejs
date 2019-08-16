const router = require('koa-router')()
const userService = require('../controller/mysqlConfig')
router.prefix('/users')
router.get('/', async (ctx, next) => {
  // ctx.body = 'this is a users response!'
  ctx.body = await userService.findUserData()
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
module.exports = router
