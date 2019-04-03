/*
 * action types
 */

export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
export const UPDATE_TIME_LEFT = 'UPDATE_TIME_LEFT'

/*
 * other declarations
 */

const Players = {
  WHITE: 'white',
  BLACK: 'black'
}

const nextPlayer = {
  null: Players.WHITE,
  [Players.WHITE]: Players.BLACK,
  [Players.BLACK]: Players.WHITE
}

/*
 * action creators
 */

const setCurrentPlayer = ({player, timestamp}) => ({type: SET_CURRENT_PLAYER, player, timestamp})

const updateTimeLeft = ({timestamp}) => ({type: UPDATE_TIME_LEFT, timestamp})

export const updateCurrentPlayer = ({player}) => dispatch => {
  dispatch(setCurrentPlayer({
    player: nextPlayer[player],
    timestamp: Date.now()
  }))
  setInterval(() => dispatch(updateTimeLeft({
    timestamp: Date.now()
  })), 20)
}
