import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "description", "rating", "podcastId"]

    let serializedReview = {}

    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    
    let user = await review.$relatedQuery('user')
    serializedReview.user = await UserSerializer.getSummary(user)

    return serializedReview
  }

  static async getReviews(reviews) {
    return await Promise.all(reviews.map(async review => {
      const serializedReview = await ReviewSerializer.getSummary(review)
      return serializedReview
    }))
  }
}

export default ReviewSerializer