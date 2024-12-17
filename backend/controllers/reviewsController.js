import Reviews from "../model/reviewSchema.js";
import Admin from "../model/adminSchema.js";
import Users from "../model/userSchema.js";
import Products from "../model/productSchema.js";
import bucket from "../firebase/firebaseConfig.js";

const reviewsLimit = 5;

async function getReviews(request, response){
    try {
        const username = request.username;

        const admin = await Admin.findOne({username});

        const reviews = await Reviews.find({admin_id: admin._id});

        return response.status(200).json(reviews);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getProductReviews(request, response){
    try {
        const { productid, skip } = request.headers;

        const reviews = await Reviews.find({product_id: productid}).sort({"_id": -1}).skip(skip).limit(reviewsLimit);

        let newReviews = [];

        for (let i = 0; i< reviews.length; i++){
            const review = reviews[i];

            const user = await Users.findOne({_id: review.user_id}).select('name');

            newReviews.push({review, user});
        }

        return response.status(200).json(newReviews);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

async function addProductReview(request, response){
    try {
        const email = request.email;

        if (!email){
            return response.status(404).json({message: "User Email Not Found."});
        }

        const user = await Users.findOne({email});

        const review = request.body.review;

        const product = await Products.findOne({_id: review.product_id});

        const newReview = { ...review, admin_id: product.admin_id, user_id: user._id, user_name: user.name };

        await Reviews.create(newReview);

        return response.status(200).json({message: "Review Added Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addReviewImage(request, response){
    try {
        const image = request.file;

        if (!image) {
            return response.status(404).json({ message: "File not Found." });
        }

        const filename = Date.now() + "-" + request.file.originalname;

        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: request.file.mimetype
            }
        })

        blobStream.on('error', (error) => {
            return response.status(500).json({ message: error.message });
        })

        blobStream.on('finish', async () => {
            await blob.makePublic();

            const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            return response.status(200).json(url);
        })

        blobStream.end(request.file.buffer);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function deleteReview(request, response){
    try {
        const { reviewid } = request.headers;

        await Reviews.deleteOne({_id: reviewid});

        return response.status(200).json({message: "Review Deleted Successfully."});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export {
    getReviews,
    getProductReviews,
    addReviewImage,
    addProductReview,
    deleteReview
}