const twit = require('twit')
const Issue = require('../models/Issue')

module.exports = () => {
  // Config Settings For Twit
  const Twitter = new twit({
    consumer_key: process.env.TWIT_CK,
    consumer_secret: process.env.TWIT_CS,
    access_token: process.env.TWIT_AT,
    access_token_secret: process.env.TWIT_ATS,
    timeout_ms: 60000
  })

  // Start Listening To Twitter Stream
  const stream = Twitter.stream('statuses/filter', {track: ['#FixMyCity', '#fixmycity', '#fmc', '#FMC']})

  // Set Action For New Tweet
  stream.on('tweet', (tweet) => {
    // TODO: NEED TO TURN ISSUE INTO TAGS WITH FN

    const media = () => {
      if(tweet.extended_entities) return tweet.extended_entities.media.map(img => img.media_url_https)
      return ''
    }

    if (!tweet.geo) {
      const message = `.@${tweet.user.screen_name} It seems your post didn't have a location. Please add your precise location so we know where the issue is. Thank you!`

      Twitter.post('statuses/update', { status: message }, (err, data, response) => {
          if(err) console.log("Error posting reply Tweet:", err)
      })
    } else {
      const issue = new Issue ({
        posted_by: tweet.user.screen_name,
        posted_by_id: tweet.user.id,
        profile_image: tweet.user.profile_image_url_https,
        posted_on: new Date(tweet.created_at),
        tweet_content: tweet.text,
        media: media(),
        location: {
          coordinates: tweet.geo.coordinates
        }
      })

      issue.save((err, newIssue) => {
        if(err) console.log("Error saving Tweet:", err)
      })
    }
  })
}
