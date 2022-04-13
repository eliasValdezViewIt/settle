'use strict';
const Joi = require('@hapi/joi');
const Pairs = require('../controllers/pairs')

const routes = [
    {
        method: 'GET',
        path: '/rates',
        options: {
            description: 'Get rates by currency',
            tags: ['api'],
            validate: {
                query: Joi.object({
                    currency: Joi.string().required(),
                    to: Joi.string()
                })
            },
            handler: (req) => {
                const { currency, to } = req.query;
                if(!to) 
                    return Pairs.getRateByCurrency(currency)

                return Pairs.getRateByCurrency(currency, [to])
            }
        }
    },{
        method: 'GET',
        path: '/pair',
        options: {
            description: 'Get pair rate',
            tags: ['api'],
            validate: {
                query: Joi.object({
                    pair: Joi.string().required()
                })
            },
            handler: (req) => {
                const { pair } = req.query;
                return Pairs.getPairs(pair)
            },
        }
    },{
        method: 'GET',
        path: '/pair-list',
        options: {
            description: 'Get pair list attributes',
            tags: ['api'],
            validate: {
                query: Joi.object({
                    pair: Joi.string().required()
                })
            },
            handler: (req) => {
                const { pair } = req.query;
                return Pairs.getPairListByCurrency(pair)
            },
        }
    },{
        method: 'POST',
        path: '/mark-up',
        options: {
            description: 'Add markup over fx rate',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    pair: Joi.string().required(),
                    feePercent: Joi.number(),
                    feeAmount: Joi.number()
                })
            },
            handler: (req) => {
                return Pairs.addMarkUp(req.payload)
            },
        }
    },{
        method: 'PUT',
        path: '/mark-up',
        options: {
            description: 'Update markup over fx rate',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    pair: Joi.string().required(),
                    feePercent: Joi.number(),
                    feeAmount: Joi.number()
                })
            },
            handler: (req) => {
                return Pairs.updateMarkUp(req.payload)
            },
        }
    },{
        method: 'DELETE',
        path: '/mark-up',
        options: {
            description: 'Delete markup over fx rate',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    pair: Joi.string().required(),
                    feePercent: Joi.number(),
                    feeAmount: Joi.number()
                })
            },
            handler: (req) => {
                const { id } = req.payload
                return Pairs.delelteMarkUp(id)
            },
        }
    }
]


module.exports = routes