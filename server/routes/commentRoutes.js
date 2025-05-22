const { body } = require("express-validator");
const { authenticateJWT } = require("../middleware/authMiddleware");
const comment_ctrl =  require("../controller/comment_ctrl");

module.exports = (app) => {
    const router = app.Router()
    
    // router.get('/comment-list', authenticateJWT, comment_ctrl.list)
    
    router.post('/create-comment', authenticateJWT, [
        body('content_comment_text').notEmpty(),
        body('post_id').notEmpty(async (value) => {
            let postCheck = await post.findOne({
                where: {
                    id: value
                }
            })
            if (!postCheck) {
                return Promise.reject('Post not found')
            }
        }),
    ], comment_ctrl.save)

    return router;
}