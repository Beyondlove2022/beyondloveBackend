export const createReview = async (req, res) => {
  const customerId = req.user._id;
  const customerName = req.user.name;
  const customerEmail = req.user.email;
  const customerProfilePic = req.user.profilePicture;
  const { vendorId, customerReview, customerRating } = req.body;
  try {
  } catch (error) {
    return res.json({ success: false, msg: "something went wrong" });
  }
};
