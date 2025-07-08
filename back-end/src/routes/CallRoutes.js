const router = require('express').Router()
const {
    call,
    getState,
    endCall
} = require('../controllers/CallController')

router.post('/call', call);
router.post('/end/:id', endCall);
router.get('/state', getState);


module.exports = router
