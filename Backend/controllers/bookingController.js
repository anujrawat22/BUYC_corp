const { BookingModel } = require("../models/bookingModel");


exports.createBooking = async(req,res)=>{
    try {
        const { userId} = req.body;
        const {id} = req.params;

        const booking = await new BookingModel({
            createdBy : userId,
            inventoryId : id
        })
        booking.save()
        res.status(201).send({msg : "Booking created"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

exports.deleteBooking = async(req,res)=>{
    try {
        const { userId} = req.body;
        const {id} = req.params;

        const booking = await BookingModel.findOne({
            createdBy : userId,
            inventoryId : id
        })

        if(!booking){
            return res.status(201).send({msg : "No booking found"})
        }
        await BookingModel.findByIdAndDelete(id)
        res.status(201).send({msg : "Booking deleted sucessfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}