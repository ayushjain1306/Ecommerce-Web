import Products from "../model/productSchema.js";
import Orders from "../model/orderSchema.js";
import Categories from "../model/categoryModel.js";
import Admin from "../model/adminSchema.js";

async function getResult(request, response){
    try {
        const number_of_products = await Products.countDocuments();

        const number_of_categories = await Categories.countDocuments();

        const number_of_pending_orders = await Orders.countDocuments({status: "Pending"});

        const orders = await Orders.countDocuments();

        if (orders !== 0){
            const total_amount = await Orders.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: {$sum: '$amount'}
                    }
                }
            ]);
    
            const result = {
                products: number_of_products,
                categories: number_of_categories,
                orders: number_of_pending_orders,
                amount: total_amount[0].totalAmount
            }
    
            return response.status(200).json(result);
        }
        else {
    
            const result = {
                products: number_of_products,
                categories: number_of_categories,
                orders: number_of_pending_orders,
                amount: 0
            }
    
            return response.status(200).json(result);
        }
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getYears(request, response){
    try {
        const username = request.username;

        const adminData = await Admin.findOne({username});

        const startYear = new Date(adminData.date_created).getFullYear();

        const currentYear = new Date(Date.now()).getFullYear();

        const years = [...Array(currentYear-startYear).keys()].map((x => x + startYear));

        return response.status(200).json([...years, currentYear]);
    } 
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getSalesData(request, response){
    try {
        const email = request.email;

        const admin = await Admin.findOne({email});

        const salesData = await Orders.find({});

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthlySales = salesData.reduce((acc, sale) => {
            const month = sale.date_created.getMonth();
            const year = sale.date_created.getFullYear();

            if (acc[year]){
                const element = acc[year].find((x) => x.month === months[month]);

                if (element){
                    element.sale += sale.amount;
                }
                else {
                    acc[year].push({month: months[month], sale: sale.amount})
                }
            }
            else {
                acc[year] = [];
                acc[year].push({month: months[month], sale: sale.amount})
            }

            return acc;
        }, {})

        return response.status(200).json(monthlySales);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getTopSellingProducts(request, response){
    try {
        const topSellingProducts = await Orders.aggregate([
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.name",
                    totalSales: {
                        $sum: "$products.quantity"
                    },
                    image: {
                        $first: "$products.image"
                    }
                }
            },
            {
                $sort: {
                    totalSales: -1
                }
            },
            {
                $limit: 5
            }
        ])

        return response.status(200).json(topSellingProducts);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    getResult,
    getYears,
    getSalesData,
    getTopSellingProducts
}