const router = require('express').Router()
const {
    call,
    getState,
    endCall,
    getAgents
} = require('../controllers/CallController')

router.post('/call', call);
router.post('/end/:id', endCall);
router.get('/state', getState);
router.get('/',getAgents)


module.exports = router
