const { major } = require('../models')

module.exports = (app) => {
    const router = app.Router()

    router.get('/major', async(req, res) => {
        const majorData = await major.findAll({
            attributes: ['id', 'name'],
        })

        return res.status(200).json({
            message: 'Get all major',
            data: majorData
        })
    })

    return router;
}