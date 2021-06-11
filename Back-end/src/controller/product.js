const Product=require('../models/product');
const slugify=require('slugify');
const shortid=require('shortid');
const Category=require('../models/category');

exports.createProduct=(req,res)=>{
    const {
        name,price,description,mrp,category,quantity,ratings,saving,createdBy
    }=req.body;

    let productImages=[];
    if(req.files.length>0){
        productImages=req.files.map(file=>{
            return {img:file.filename};
        })
    }
    // res.status(200).json({file:req.files,body:req.body})
    const product=new Product({
        name:name,
        slug:slugify(name),
        price,
        quantity,
        description,
        mrp,
        ratings,
        saving,
        productImages,
        category,
        createdBy:req.user._id
    });
    product.save((err,product)=>{
        if(err) return res.status(400).json({err});
        if(product){
            res.status(201).json({product});
        }
    })
};

exports.getProductBySlug=(req,res)=>{
    const {slug}=req.params;
    Category.findOne({slug:slug})
    .select('_id')
    .exec((error,category)=>{
        if(error){
            return res.status(400).json({error});
        }
        if(category){
            Product.find({category:category._id})
            .exec((err,products)=>{
                if(err) res.status(400).json({err})
                if(products.length>0){
                    res.status(200).json({
                        products,
                        productsByPrice:{
                            under5k:products.filter(product=>product.price<=5000),
                            under10k:products.filter(product=>product.price>=5000 && product.price<=10000),
                            under20k:products.filter(product=>product.price>10000 && product.price<=20000),
                            under50k:products.filter(product=>product.price>20000 && product.price<=50000),
                            above50k:products.filter(product=>product.price>50000),
                        }
                    });
                }
            })
        }
        // res.status(200).json({category});
    });
    // console.log(slug);
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };