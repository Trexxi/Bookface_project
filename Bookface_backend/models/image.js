/**
 *Upload images here
 */


var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
        img: { data: Buffer, contentType: String },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
});

var Image = module.exports = mongoose.model('Image', ImageSchema);


module.exports.saveImage = function(imageData) {
    imageData.save();
};

module.exports.getImage = function(req, res){
    Image.find({},function(err, images) {
        var imageMap = {};
        console.log(req.user);
        images.forEach(function(image) {
            console.log(image,"HEHEHEH");
            if(req.user._id.toString() === image.user.toString()) {
                console.log('am inside(HOLY) :)))))');
                imageMap[image._id] = image.img.data;
            }
        });

        console.log(imageMap);
        res.send(imageMap);
    });
};