const { validationResult } = require("express-validator");
const { post, user } = require("../models");
const self = {}

self.save = async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)
    }

    const {
        content_text,
    } = req.body

    await post.create({
        content_text: content_text,
        private: false,
        user_id: req?.user?.data?.id,
    })

    res.status(201).send({
        message: "Post created successfully",
    })
}

self.list = async (_, res) => {
    let data = await post.findAll({
        include: [{
            model: user,
            attributes: ['username']
        }]
    })

    res.status(200).json({
        message: 'post is found',
        data: data
    })
}


module.exports = self