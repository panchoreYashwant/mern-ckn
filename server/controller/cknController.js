
const CknItemModel = require("../models/cknItemModel");

exports.setCknItems = (req, res) => {
    console.log("url hitted");
    try {
        const cknFiles = new CknItemModel({
            
            orderId: req.body.orderId,
            orderNo: req.body.orderNo,
            date: req.body.date,
            chai: req.body.chai,
            coffee: req.body.coffee,
            cigarette: req.body.cigarette,
            cigaretteQuantity: req.body.cigaretteQuantity,
            chaiQuantity: req.body.chaiQuantity,
            coffeeQuantity: req.body.coffeeQuantity,
            orderStatus: req.body.orderStatus,
            orderTotal: req.body.orderTotal,
            paymentMode:req.body.paymentMode
        });
        cknFiles.save();
        res.status(200).json({ data: cknFiles });   
    }
     catch (error) {
      console.log(error)
        
    }
    

};
exports.updateCknItems = (req, res) => {
    console.log("url hits");
    try {
        const cknFiles= CknItemModel.findOneAndUpdate({_id:req.query.id},{
            $set: {
                orderId: req.body.orderId,
                orderNo: req.body.orderNo,
                date: req.body.date,
                chai: req.body.chai,
                coffee: req.body.coffee,
                cigarette: req.body.cigarette,
                cigaretteQuantity: req.body.cigaretteQuantity,
                chaiQuantity: req.body.chaiQuantity,
                coffeeQuantity: req.body.coffeeQuantity,
                orderStatus: req.body.orderStatus,
                orderTotal: req.body.orderTotal,
                paymentMode:req.body.paymentMode} 
            }).then(resp=>{
                console.log("updated single file");
                console.log(`response hai ${resp}`);
                // oldJson[req.params.index] = oldJsonSpecificRecord;
        res.status(200).json({ data: cknFiles });   
        // res.status(201).send('single File Updated Successfully');
            });
        // res.status(200).json({ data: cknFiles });   
    }
     catch (error) {
      console.log(error)
        
    }
    

};

exports.getCknItems = async (req, res, next) => {
   
    try{
  
        const data = await CknItemModel.find();
        const dataLength=data.length;
     
        // const data=files.slice(startIndex,endIndex);
        
        
        res.send({"data":data,"dataLength":dataLength});
        console.log(data,"ye aai");
    }catch(error) {
        res.status(400).send(error.message);
        console.log(error);
    }
  }
  exports.getCknItemsByDate = async (req, res, next) => {
    const date=req.params.date;
    try{
        console.log(req.query);
        const data = await CknItemModel.find({date:req.query.date});
        const dataLength=data.length;

     
        // const data=files.slice(startIndex,endIndex);
        
        
        res.send({"data":data,"dataLength":dataLength});
        console.log(data,"ye aai");
    }catch(error) {
        res.status(400).send(error.message);
        console.log(error);
    }
  }
  exports.getCknItemsByDateAndStatus = async (req, res, next) => {
    const date=req.params.date;
    try{
        console.log(req.query);
        const data = await CknItemModel.find({date:req.query.date,orderStatus:req.query.status});
     
        // const data=files.slice(startIndex,endIndex);
        
        
        res.send({"data":data});
        console.log(data,"ye aai");
    }catch(error) {
        res.status(400).send(error.message);
        console.log(error);
    }
  }
  exports.getCknItemsById = async (req, res, next) => {
    try{
        const data = await CknItemModel.find({_id:req.query.id});
     
        res.send({"data":data});
        console.log(data,"ye aai");
    }catch(error) {
        res.status(400).send(error.message);
        console.log(error);
    }
  }