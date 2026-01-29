import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./lib/mongodb";
import Consumer from "./lib/Consumer";
import Seller from "./lib/Seller";
import Item from "./lib/Item";
import orderItem  from "./lib/OrderItem";
import Order from "./lib/Order";

// import Order from "@/models/Order";
// import mongoose from "mongoose";


export async function getOrderDetails(orderId: string) {
  await connectDB();
  const result = await Order.aggregate([
    // 1) Find the order
    { $match: { orderId } },

    // 2) Join buyer (Consumer) using uid
    {
      $lookup: {
        from: "consumers",               // collection name (important)
        localField: "consumerId",        // order.consumerId
        foreignField: "uid",             // consumer.uid
        as: "buyer",
      },
    },
    { $unwind: "$buyer" },

    // 3) Join seller (Seller) using uid
    {
      $lookup: {
        from: "sellers",
        localField: "sellerId",
        foreignField: "uid",
        as: "seller",
      },
    },
    { $unwind: "$seller" },

    // 4) Join order items using orderId
    {
      $lookup: {
        from: "orderitems",
        localField: "orderId",
        foreignField: "orderId",
        as: "items",
      },
    },

    // 5) For each item, join item details + compute subtotal
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items.itemId",
        foreignField: "uid",   // change to "_id" if Item uses _id
        as: "itemDetails",
      },
    },
    {
      $addFields: {
        "items.itemDetails": { $arrayElemAt: ["$itemDetails", 0] },

        // ✅ subtotal = priceAtBooking * quantity
        "items.subtotal": {
          $multiply: ["$items.priceAtBooking", "$items.quantity"],
        },
      },
    },

    // 6) Group back to single order doc and compute totalValue
    {
      $group: {
        _id: "$_id",
        orderId: { $first: "$orderId" },
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },

        buyer: { $first: "$buyer" },
        seller: { $first: "$seller" },

        items: { $push: "$items" },

        // ✅ totalValue = sum of subtotals
        totalValue: { $sum: "$items.subtotal" },
      },
    },

    // 7) Remove Mongo _id if you want cleaner output
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  console.log(result[0]);
}
getOrderDetails("aa95fd59-85a6-40bf-bf74-79735ae70ba4").catch(console.error);
