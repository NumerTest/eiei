var express = require('express');
var router = express.Router();

let bisectionmodel = require('../models/bisectionmodel');
let falsepositionmodel = require('../models/falsepositionmodel');
let newtonmodel = require('../models/newton');
let onepointmodel = require('../models/onepoint');
let secantmodel = require('../models/secant');

let simpsonmodel = require('../models/simpsonmodel');
let trapmodel    = require('../models/Trapmodel');
let Csimpsonmodel = require('../models/Csimpsonmodel')
let Ctrapmodel = require('../models/CTrapmodel');

let backwardmodel = require('../models/backward');
let backwardh2model = require('../models/backwardh2');
let forwardmodel = require('../models/forward');
let forwardh2model = require('../models//forwardh2');
let centralmodel = require('../models/central');
let centralh2model = require('../models/centralh2');

/* GET users listing. */

/////////////////////////////////////////////////////////////

router.get('/showbisectionmodel', function(req, res, next) {
 
  bisectionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addbisectionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new bisectionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////////////////////////////////////////

router.get('/showfalsepositionmodel', function(req, res, next) {
 
  falsepositionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addfalsepositionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new falsepositionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////////////////////////////////////////


router.get('/shownewtonmodel', function(req, res, next) {
 
  newtonmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addnewtonmodel',(req,res)=>{
  console.log(req.body);
  let doc = new newtonmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////////////////////////////////////////


router.get('/showonepointmodel', function(req, res, next) {
 
  onepointmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addonepointmodel',(req,res)=>{
  console.log(req.body);
  let doc = new onepointmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


////////////////////////////////////////////////////////////

router.get('/showsecantmodel', function(req, res, next) {
 
  secantmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addsecantmodel',(req,res)=>{
  console.log(req.body);
  let doc = new secantmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////

router.get('/showsimpsonmodel', function(req, res, next) {
 
  simpsonmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addsimpsonmodel',(req,res)=>{
  console.log(req.body);
  let doc = new simpsonmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////

router.get('/showtrapmodel', function(req, res, next) {
 
  trapmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addtrapmodel',(req,res)=>{
  console.log(req.body);
  let doc = new trapmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////

router.get('/showCsimpsonmodel', function(req, res, next) {
 
  Csimpsonmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addCsimpsonmodel',(req,res)=>{
  console.log(req.body);
  let doc = new Csimpsonmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////

router.get('/showCtrapmodel', function(req, res, next) {
 
  Ctrapmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addCtrapmodel',(req,res)=>{
  console.log(req.body);
  let doc = new Ctrapmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////

router.get('/showbackwardmodel', function(req, res, next) {
 
  backwardmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addbackwardmodel',(req,res)=>{
  console.log(req.body);
  let doc = new backwardmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


router.get('/showbackwardh2model', function(req, res, next) {
 
  backwardh2model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addbackwardh2model',(req,res)=>{
  console.log(req.body);
  let doc = new backwardh2model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////////////////////////////





router.get('/showforwardmodel', function(req, res, next) {
 
  forwardmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addforwardmodel',(req,res)=>{
  console.log(req.body);
  let doc = new forwardmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


router.get('/showforwardh2model', function(req, res, next) {
 
  forwardh2model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addforwardh2model',(req,res)=>{
  console.log(req.body);
  let doc = new forwardh2model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


////////////////////////////////////////////////////////////


router.get('/showcentralmodel', function(req, res, next) {
 
  centralmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addcentralmodel',(req,res)=>{
  console.log(req.body);
  let doc = new centralmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


router.get('/showcentralh2model', function(req, res, next) {
 
  centralh2model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addcentralh2model',(req,res)=>{
  console.log(req.body);
  let doc = new centralh2model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


////////////////////////////////////////////////////////////


module.exports = router;