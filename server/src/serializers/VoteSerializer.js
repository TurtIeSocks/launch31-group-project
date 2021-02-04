class VoteSerializer {
  static async getSummary(vote) {
    const allowedAttributes = ["userId", "value"]
    let serializedVote = {}

    if (vote) {
      for (const attribute of allowedAttributes) {
        serializedVote[attribute] = vote[attribute]
      }
    } else {
      serializedVote = undefined
    }
    return serializedVote
  }
  static async getVotes(votes) {
    return await Promise.all(votes.map(async vote => {
      const serializedVote = await VoteSerializer.getSummary(vote)
      return serializedVote
    }))
  }
}

export default VoteSerializer