const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const mapImageSize = {
    small: '256x256',
    medium: '512x512',
    large: '1024x1024'
}

const generateImage = async (req, res) => {
    const { body: { image, size = 'medium', count = 1 } } = req;

    const imageSize = mapImageSize[size];
    
    try {
        const response = await openai.createImage({
            prompt: image,
            n: parseInt(count),
            size: imageSize
        })

        const { data: { data: result } } = response

        res.status(200).json({ response: result })
    }
    catch (err) {
        res.status(500).json({ statusCode: 500, type: 'unexpected server error', error: err })
    }
}

module.exports = {
    generateImage
}