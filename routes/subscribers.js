const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers')

//view all
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//view one
router.get('/subscribers/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})
//create one
router.post('/subscribers', async (req, res) => {
    const subscribers = new Subscriber({
        name: req.body.name,
        subscribersToChannel: req.body.subscribersToChannel
    })
    try {
        const newSubscriber = await subscribers.save()
        res.status(201).json(newSubscriber)
    } catch {
        res.status(400).json({message: message.err})
    }
})
//update one
router.patch('/subscribers/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribersToChannel != null) {
        res.subscriber.subscribersToChannel = requ.body.subscribersToChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (err) {
        res.status(400).json({mesage: err.mesage})
    }
})
//delete one
router.delete('/subscribers/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'deleted subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router