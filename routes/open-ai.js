const {generateImage, ping} = require('../controllers/open-ai')

module.exports = (router) => {
    router.post('/generate-image', generateImage)
    router.get('/ping', ping)
}