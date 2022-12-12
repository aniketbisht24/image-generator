const {generateImage} = require('../controllers/open-ai')

module.exports = (router) => {
    router.post('/generate-image', generateImage)
}