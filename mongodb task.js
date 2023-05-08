// Inserting the data into MongoDB shell, database and into products collection

db.product.insertmany([
  {
    id: "1",
    product_name: "fabrics",
    product_price: "200",
    product_color: "red",
    product_material: "cotton",
  },
  {
    id: "2",
    product_name: "cement",
    product_price: "400",
    product_color: "grey",
    product_material: "concrete",
  },
  {
    id: "3",
    product_name: "chair",
    product_price: "500",
    product_color: "yellow",
    product_material: "plastic",
  },
  {
    id: "4 ",
    product_name: "fridge",
    product_price: "15000",
    product_color: "violet",
    product_material: "plastc",
  },
]);
// 1. Find all the information about each products
db.product.find().pretty();

// 2. Find the product price which are between 400 to 800
db.product.find({
  product_price: { $gt: 400, $lt: 800 },
});
// 3. Find the product price which are not between 400 to 600
db.products.find({
  product_price: { $not: { $gt: 400, $lt: 800 } },
});
// 4. List the four product which are grater than 500 in price
db.products
  .find({
    product_price: { $gt: 500 },
  })
  .limit(4);
// 5. Find the product name and product material of each products
db.products.find(
  {},
  {
    product_name: 1,
    product_material: 1,
  }
);
// 6. Find the product with a row id of 10
db.products.find({
  id: "10",
});
// 7. Find only the product name and product material
db.products.find(
  {},
  {
    _id: 0,
    product_name: 1,
    product_material: 1,
  }
);
// 8. Find all products which contain the value of soft in product material
db.products.find({ product_material: "Soft" });
// 9. Find products which contain product color indigo  and product price 492.00
db.products.find({
  $or: [{ product_price: 492.0 }, { product_color: "indigo" }],
});

// 10. Delete the products which product price value are same

db.products.aggregate([
  { $group: { _id: "$product_price", count: { $count: {} } } },
  { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
]); // result is [36, 47] so will be deleting them from the database using below command

db.products.deleteMany({ product_price: { $in: [36, 47] } });
