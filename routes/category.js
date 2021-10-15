const express = require('express');
const router = express.Router()

const { authCheck , adminCheck } = require('../middleware/auth')
const {list, create, deleteCategory} = require('../controllers/category')

router.get('/categories', list )
router.post('/category', authCheck, adminCheck, create )
router.delete('/category/:categoryId', authCheck, adminCheck, deleteCategory)



module.exports = router