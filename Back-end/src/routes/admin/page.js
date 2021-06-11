const express = require('express');
const { createPage, getPage } = require('../../controller/admin/page');
const { requireSignin, adminMiddleware, upload } = require('../../middleware');
const router = express.Router();

router.post(`/page/create`, 
            requireSignin,
            adminMiddleware,
            upload.fields([
    { name: 'banners' },
    { name: 'products' }
]),createPage )

router.get(`/page/:category/:type`,getPage);

module.exports = router;