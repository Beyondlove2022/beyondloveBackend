import BusinessReviews from "../Models/businessReview.js";

export const createReview = async (req, res) => {
  const customerId = req.user._id;
  const customerName = req.user.name;
  const customerEmail = req.user.email;
  const customerProfilePic = req.user.profilePicture;
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
  try {
    const review = await BusinessReviews.findById(reviewId);
    if (review.businessId != businessId) {
      return res.json({
        success: false,
        msg: "You don't have permission to reply this review",
      });
    }
    await BusinessReviews.findByIdAndUpdate({ _id: reviewId }, { reply });
    const rev = await BusinessReviews.find({ businessId });
    return res.json({
      success: true,
      msg: "Reply posted successfully",
      reviews: rev,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};
