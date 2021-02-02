import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "description", "rating", "userId"]

    let serializedReview = {}

    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    let user = await review.$relatedQuery('user')
    serializedReview.user = UserSerializer.getSummary(user)

    return serializedReview
  }

  static async getUser(reviews) {
    return await Promise.all(reviews.map(async review => {
      let user = await review.$relatedQuery('user')
      review.user = await UserSerializer.getSummary(user)
      return review
    }))
  }
}

export default ReviewSerializer