var express = require('express');
const photoModel = require('../models/photos');
var router = express.Router();
const cors = require('./cors');
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

const upload = multer({storage: storage});

router.route('/photos')
    .post(cors.corsWithOptions, upload.single('photo'), async (req, res) => {
        try {
            const photo = new photoModel({
                title: req.body.title,
                date: req.body.date,
                location: req.body.location,
                url: req.file.filename
            });
            await photo.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(photo);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .get(cors.corsWithOptions, async (req, res, next) => {
        const photos = await photoModel.find({});

        try {
            res.send(photos);
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.route('/photo/:id')
    .delete(cors.corsWithOptions, async (req, res) => {
        try {

            const photo = await photoModel.findByIdAndDelete(req.params.id)
            fs.unlinkSync(`./public/images/uploads/${photo.url}`);


            if (!photo) res.status(404).send("No item found")
            res.status(200).send()
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })


module.exports = router;