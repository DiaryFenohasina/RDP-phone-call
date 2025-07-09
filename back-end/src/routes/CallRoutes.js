const router = require('express').Router()
const {
    call,
    getState,
    endCall,
    getAgents,
    dropCall
} = require('../controllers/CallController')

router.post('/call', call);
router.post('/end/:id', endCall);
router.get('/state', getState);
router.get('/',getAgents)
router.delete('/',dropCall)


module.exports = router
