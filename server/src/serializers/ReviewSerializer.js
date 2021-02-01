import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static getSummary(review) {
    const allowedAttributes = ["id", "description", "rating"]

    let serializedReview = {}

    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    return serializedReview
  }

  static async updateData(reviews) {
    return await Promise.all(reviews.map(async review => {
      let user = await review.$relatedQuery('user')
      review.user = await UserSerializer.getSummary(user)
      return review
    }))
  }
}

export default ReviewSerializer