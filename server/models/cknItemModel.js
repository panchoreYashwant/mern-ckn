const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cknItemSchema = new Schema({
    
    orderId: {
        type: String,
        required: true
    },
    chai: {
        type: String,
    },
    coffee: {
        type: String,
    },
    cigarette: {
        type: String,
    },
    cigaretteQuantity: {
        type: String,
    },
    chaiQuantity: {
        type: String,
    },
    coffeeQuantity: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    orderNo: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderTotal: {
        type: String,
        required: true
    },
    paymentMode:{
        type:String,
    }
    
}, {timestamps: true});
var CknItemModel = mongoose.model('CknItem', cknItemSchema);
module.exports = CknItemModel;