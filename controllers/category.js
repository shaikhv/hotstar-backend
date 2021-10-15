const Category = require('../models/category')
const slugify = require('slugify')

exports.list = async (req, res) => {
    try {
        const category = await Category.find({}).exec()
        res.json(category)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.create = async (req, res) => {
    const { name, image } = req.body
    const exsistingCategory = await Category.find({ name: name }).exec()
    console.log('exsistingCategory',exsistingCategory)
    try {
        let category
        if (exsistingCategory.length !== 0) {
            category = await Category.findByIdAndUpdate({ _id: exsistingCategory[0]._id }, { name, slug: slugify(name), image: image }, { new: true }).exec()
        } else {
            category = await new Category({ name, slug: slugify(name), image: image }).save()
        }
        res.json(category)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params
    try {
        const deletedCategory = await Category.findByIdAndDelete({ _id: categoryId }).exec()
        res.json(deletedCategory)
    } catch (err) {
        res.json(err)
    }
}
