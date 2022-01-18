import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { LastFM as LastFMApi } from '../lib/lastfm/lastfm.api'
import { LastFMCache } from '../lib/lastfm/lastfm.api.cache'

const TrackDisplay = ({ track, artist, nowPlaying }) =>
  track &&
  artist && (
    <div>
      {nowPlaying ? 'Now playing: ' : ''}
      {track} by {artist}
    </div>
  )

TrackDisplay.propTypes = {
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  nowPlaying: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ track, artist, nowPlaying }) => {
  return { track, artist, nowPlaying }
}

const ConnectedTrackDisplay = connect(mapStateToProps)(TrackDisplay)

export const LastFM = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let lastArtist
    let lastTrack

    const cache = new LastFMCache()
    /* Create a LastFM object */
    const lastfm = new LastFMApi({
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
            let nowPlaying = false
            if (typeof data.recenttracks.track[0]['@attr'] !== 'undefined') {
              if (data.recenttracks.track[0]['@attr'].nowplaying === 'true')
                nowPlaying = true
            }

            if (lastArtist === newArtist && lastTrack === newTrack) {
              return
            }

            lastArtist = newArtist
            lastTrack = newTrack

            dispatch({ type: 'UPDATE_ARTIST', payload: lastArtist })
            dispatch({ type: 'UPDATE_TRACK', payload: lastTrack })
            dispatch({ type: 'UPDATE_NOWPLPAYING', payload: nowPlaying })
          },
        },
      )
    }

    poll()
    setInterval(poll, 30 * 1000)
  })

  return <ConnectedTrackDisplay />
}
