const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Address = sequelize.define('address', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    country: {type: DataTypes.STRING, allowNull: false},
    state: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    street: {type: DataTypes.STRING, allowNull: false},
    flat: {type: DataTypes.STRING, allowNull: false},
    zip: {type: DataTypes.STRING, allowNull: false},
})

const Order = sequelize.define('order', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color: {type: DataTypes.STRING, unique: true, allowNull: false},
    size: {type: DataTypes.INTEGER  , unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
    imgUrl: {type: DataTypes.STRING, allowNull: false},
})

const ProductInfo = sequelize.define('Product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequelize.define('cart_Product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Share = sequelize.define('share', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shared_platform: {type: DataTypes.STRING, allowNull: true},
})

const Reviews = sequelize.define('reviews', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    review_text: {type: DataTypes.INTEGER, allowNull: true},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(CartProduct)
CartProduct.belongsTo(Order)

Order.hasOne(Address)
Address.belongsTo(Order)

User.hasMany(Address)
Address.belongsTo(User)

User.hasMany(Share)
Share.belongsTo(User)

User.hasMany(Reviews)
Reviews.belongsTo(User)

Product.hasMany(Share)
Share.belongsTo(Product)

Product.hasMany(Reviews)
Reviews.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasOne(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)


Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Address,
    Product,
    ProductInfo,
    Cart,
    CartProduct,
    Type,
    Brand,
    Order,
    Reviews,
    Share,
}





