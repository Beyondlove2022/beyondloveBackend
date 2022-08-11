import BusinessReviews from "../Models/businessReview.js";

export const createReview = async (req, res) => {
  const customerId = req.user._id;
  const customerName = req.user.customerName;
  const customerEmail = req.user.email;
  // const customerProfilePic = req.user.profilePicture;
  const { businessId, customerReview, customerRating } = req.body;
  try {
    const rev = await new BusinessReviews({
      businessId,
      customerId,
      customerEmail,
      customerName,
      // customerProfilePic,
      customerReview,
      customerRating,
    });
    await rev.save();
    const businesReview = await BusinessReviews.find();
    return res.json({
      success: true,
      review: businesReview,
      msg: "Review posted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: "something went wrong",
      error: error,
    });
  }
};

export const getReview = async (req, res) => {
  const businessId = req.params.businessId;
  try {
    const review = await BusinessReviews.find({ businessId });
    return res.json({ success: true, review: review });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const createReply = async (req, res) => {
  const businessId = req.user._id;
  const reviewId = req.body.reviewId;
  const reply = req.body.reply;
  console.log({ businessId }, { reviewId }, { reply });
  try {
    const review = await BusinessReviews.findById(reviewId);
    console.log({ review });
    if (review.businessId != businessId) {
      return res.json({
        success: false,
        msg: "You don't have permission to reply this review",
      });
    }
    await BusinessReviews.findByIdAndUpdate({ _id: reviewId }, { reply });
    const rev = await BusinessReviews.find({ businessId });
    console.log({ rev });
    return res.json({
      success: true,
      msg: "Reply posted successfully",
      reviews: rev,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const reviewDelete = async (req, res) => {
  const customerId = req.user.id;
  const { reviewId } = req.params;
  try {
    console.log(req.body);
    const review = await BusinessReviews.findById(reviewId);
    if (!review)
      return res.json({ success: false, msg: "This review not found" });
    if (review.customerId != customerId)
      return res.json({
        success: false,
        msg: "you can't able to delete this review",
      });
    await BusinessReviews.findByIdAndDelete(reviewId);
    const rev = await BusinessReviews.find();
    return res.json({ success: true, review: rev });
  } catch (error) {
    return res.json({
      success: false,
      msg: "Somthing Went Wrong On Review Delete",
      err: error,
    });
  }
};
