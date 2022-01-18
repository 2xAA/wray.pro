/* global LastFMCache LastFm */

import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { LastFM as LastFMApi } from '../lib/lastfm/lastfm.api'
import { LastFMCache } from '../lib/lastfm/lastfm.api.cache'

const TrackDisplay = ({ track, artist }) =>
  track &&
  artist && (
    <div>
      Now playing: {track} by {artist}
    </div>
  )

TrackDisplay.propTypes = {
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
}

const mapStateToProps = ({ track, artist }) => {
  return { track, artist }
}

// const mapDispatchToProps = (dispatch) => {
//   return { increment: () => dispatch({ type: `INCREMENT` }) }
// }

// const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)
const ConnectedTrackDisplay = connect(mapStateToProps)(TrackDisplay)

export const LastFM = () => {
  let lastArtist
  let lastTrack
  let lastfm

  const dispatch = useDispatch()

  useEffect(() => {
    const cache = new LastFMCache()
    /* Create a LastFM object */
    lastfm = new LastFMApi({
      apiKey: '7e8faf77ea9f5e451591076fae780680',
      apiSecret: '6450f82a1a034de763684b49149f7f5f',
      cache: cache,
    })

    function poll() {
      lastfm.user.getRecentTracks(
        { user: 'theonly2xaa' },
        {
          success: (data) => {
            const newArtist = data.recenttracks.track[0].artist['#text']
            const newTrack = data.recenttracks.track[0].name

            if (lastArtist === newArtist && lastTrack === newTrack) {
              return
            }

            lastArtist = newArtist
            lastTrack = newTrack

            dispatch({ type: 'UPDATE_ARTIST', payload: lastArtist })
            dispatch({ type: 'UPDATE_TRACK', payload: lastTrack })
          },
        },
      )
    }

    poll()
    setInterval(poll, 30 * 1000)
  }, [])

  return <ConnectedTrackDisplay />
}
