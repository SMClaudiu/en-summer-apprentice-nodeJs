const express = require('express');
const router = express.Router();
const {EventType, Event, VenueDto} = require('/models')

router.get('/')