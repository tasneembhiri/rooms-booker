const express = require('express')
const router = express.Router()
const { getAllRooms } = require('./getAllRooms')
const { getAllEvents } = require('./getAllEvents')
const userEvents = require('./userHome')
const getEditEvent = require('./getEditEvent')
const { login } = require('./login')
const addEvent = require('../controllers/addEvent')
const editEvent = require('./editEvent.js')

router.get('/api/rooms', getAllRooms)
router.get('/api/user-events/:id', userEvents)
router.get('/api/edit-event/:id', getEditEvent)
router.post('/api/update-event', editEvent)
router.get('/api/events', getAllEvents)
router.post('/api/login', login)
router.post('/api/booking', addEvent)

module.exports = router
