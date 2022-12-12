const router = require('express').Router();

const openAiRoutes = require('./open-ai')

openAiRoutes(router);

module.exports = router