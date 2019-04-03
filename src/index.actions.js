/*
 * action types
 */

export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
export const UPDATE_TIME_LEFT = 'UPDATE_TIME_LEFT'

const Players = {
  WHITE: 'white',
  BLACK: 'black'
}

/*
 * action creators
 */

const setCurrentPlayer = ({player, timestamp}) => ({type: SET_CURRENT_PLAYER, player, timestamp})

const updateTimeLeft = ({timestamp}) => ({type: UPDATE_TIME_LEFT, timestamp})

export const updateCurrentPlayer = ({player}) => dispatch => {
  if (player === null) {
    dispatch(setCurrentPlayer({
      player: Players.WHITE,
      timestamp: Date.now()
    }))
  }
  else if (player === Players.WHITE) {
    dispatch(setCurrentPlayer({
      player: Players.BLACK,
      timestamp: Date.now()
    }))
  }
  else if (player === Players.BLACK) {
    dispatch(setCurrentPlayer({
      player: Players.WHITE,
      timestamp: Date.now()
    }))
  }
  setInterval(() => dispatch(updateTimeLeft({
    timestamp: Date.now()
  })), 20)
}
