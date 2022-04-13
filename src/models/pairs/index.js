'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const pairSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pair:  String, 
    originalRate: String,
    feePercent: Number,
    feeAmount: Number,
    rateWithMarkUpFee: Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Pair', pairSchema);