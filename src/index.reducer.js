import createReducer from '@agillic/create-reducer'
import {
  SET_CURRENT_PLAYER,
  UPDATE_TIME_LEFT
} from './index.actions'

const initialState = {
  player: null,
  lastTimeChange: undefined,
  timeLeft: {
    white: 1000 * 60 * 15,
    black: 1000 * 60 * 15
  }
}

const chessClock = createReducer({
  initialState,
  actions: {
    [SET_CURRENT_PLAYER]: ({action: {player, timestamp}}) => ({
      player,
      lastTimeChange: timestamp
    }),
    [UPDATE_TIME_LEFT]: ({action: {timestamp}, state: {player, lastTimeChange, timeLeft}}) => ({
      timeLeft: {
        ...timeLeft,
        [player]: timeLeft[player] - (timestamp - lastTimeChange)
      },
      lastTimeChange: timestamp
    })
  },
  options: {
    mode: 'setState'
  }
})

export default chessClock
