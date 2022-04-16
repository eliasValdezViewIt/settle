'use strict';

const axios = require('axios').default;
const mongoose = require('mongoose');
const fastForexUrl = 'https://api.fastforex.io/';
const key = process.env.FOREX_API_KEY;
const Pair = require('../../models/pairs')

class Pairs {
    static async getRateByCurrency(currency, symbols = ['USD','ARS','BRL','EUR']){
        try {
            const { data } = await axios.get(`${fastForexUrl}fetch-multi`,{
                params: {
                    from: currency.toUpperCase(),
                    to: symbols.join(','),
                    api_key: key,
                }
            })
            return { base: data.base, rates: data.results }
        } catch (err) {
            return err
        }
    }

    static async getPairListByCurrency(pair){
        try {
            return Pair.find({ pair }).exec();
        } catch (error) {
            console.log(error)
            return error
        }
    }

    static async getPairs(pair){
        try {
            const exist = await Pair.find({ pair }).exec()
            const from = pair.slice(0,3);
            const to = pair.slice(3,6);
            const { data: { results } } = await axios.get(`${fastForexUrl}fetch-multi`,{
                params: {
                    from,
                    to,
                    api_key: key,
                }
            })
            return { rate: results[to] }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    static createPair(template){
        const pair = new Pair(template)
        return pair.save()
        .them( result => {
            console.log(result)
            return result
        })
        .catch(err => console.log(err))
    }

    static calculateFeeAmountByPercent(rate, fee){
        return (rate * fee)/100 ;
    }

    static calculateFeePercentByAmount(rate, fee){
        return (fee/rate)*100
    }

    static async addMarkUp(args){
        try {
            const { pair, feeAmount, feePercent } = args;
            const exist = await Pair.find({ pair }).exec()
            if(exist)
               return `Cannot create markup for pair ${pair}, becouse already exist, please use the update markup API!`

            const { rate } = await this.getPairs(pair);
            if(!rate)
                return `Cannot get the rate for pair ${pair}.`
    
            const feeInAmount = feeAmount || this.calculateFeeAmountByPercent(rate, feePercent);
            return this.createPair({
                _id : new mongoose.Types.ObjectId(),
                pair, 
                originalRate: rate,
                feePercent: feePercent || this.calculateFeePercentByAmount(rate, feeAmount),
                feeAmount: feeInAmount,
                rateWithMarkUpFee: rate + feeInAmount,
            })
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    static async updateMarkUp(args){
        try {
            const { pair, feeAmount, feePercent } = args;
            const [{_id}] = await Pair.find({ pair }).exec();
            if(!_id)
                throw new Error(`Cannot update the rate for pair: ${pair} becouse dont exist`);

            const { rate } = await this.getPairs(pair);
            if(!rate)
                return `Cannot get the rate for pair ${pair}.`

            const feeInAmount = feeAmount || this.calculateFeeAmountByPercent(rate, feePercent);
            return Pair.updateOne({
                _id : _id.toString() 
            },{ 
                originalRate: rate,
                feePercent: feePercent || this.calculateFeePercentByAmount(rate, feeAmount),
                feeAmount: feeInAmount,
                rateWithMarkUpFee: rate + feeInAmount,
             })
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    static async delelteMarkUp(id){
        try {
            return Pair.deleteOne({ _id: id }).exec();
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

module.exports = Pairs;