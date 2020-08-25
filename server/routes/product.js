const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");



router.post("/uploadProduct", (req, res) => {

    //save all the data we got from the client into the DB
    console.log("Creando producto,", req.body)
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/getProducts", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    //console.log(findArgs)

    if (term) {
        let busqueda = [];
        let terminos = term.trim().split(' ');
        terminos.forEach(palabra => {
            busqueda.push( new RegExp(palabra, "i") )
        });
        
        //console.log(busqueda, skip, limit, sortBy, order, findArgs)

        Product.find(findArgs)
            .find( {$and: [ {$and: [ {$or: [{title:busqueda}, {description:busqueda}]}, {eliminado:false} ]}, {envio:false} ]} )
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {
        console.log("aca")
        Product.find(findArgs)
            .find( {$and: [{eliminado:false}, {envio:false} ]})
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    }

});


//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 


router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    //console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //console.log("productIds", productIds)

    //we need to find the product information that belong to product Id 
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
        
});


router.get('/deleteProduct', async (req, res) => {
    productId = req.query._id;
    console.log("A REMOVER: ", productId)

    // Product.deleteOne({_id:productId}, (err, info) => {
    //     if (err) res.json({remove:false})
    //     res.json({remove:true})
    // })


    Product.updateOne({_id:productId}, {eliminado:true}, (err, info) => {
        if (err) res.json({remove:false})
        res.json({remove:true})
    })

});


router.post('/editProduct', (req, res) => {
    //console.log("A EDITAR: ", req.query)
    productId = req.query;
    console.log(req.body)
    const {title, description, price, types} = req.body;

    //console.log(title, description, price, types)

    Product.updateOne({_id:productId}, {title, description, price, types}, (err, info) => {
        console.log(info)
        if (err) res.json({edited:false})
        res.json({edited:true})
    });

});


module.exports = router;
