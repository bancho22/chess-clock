import createReducer from '@agillic/create-reducer'
import {
  SET_CURRENT_PLAYER,
  UPDATE_TIME_LEFT,
  Players
} from './index.actions'

const opposingPlayer = player => (player === Players.WHITE) ? Players.BLACK : Players.WHITE

const initialState = {
  player: null, // game starts when a player is set for the first time
  lastTimeChange: undefined,
  totalTimePassed: 1,
  timeLeft: {
    white: 1000 * 60 * 15,
    black: 1000 * 60 * 15
  },
  lastTurnStart: {
    white: undefined,
    black: undefined
  },
  turnsLength: []
}

const chessClock = createReducer({
  initialState,
  actions: {
    [SET_CURRENT_PLAYER]: ({action: {player, timestamp}, state: {player: prevPlayer, lastTurnStart, turnsLength, gameStartTimestamp}}) => ({
      player,
      lastTimeChange: timestamp,
      lastTurnStart: {
        ...lastTurnStart,
        [player]: timestamp
      },
      gameStartTimestamp: (prevPlayer === null) ? timestamp : gameStartTimestamp,
      turnsLength: lastTurnStart[opposingPlayer(player)]
        ? [
          ...turnsLength,
          timestamp - lastTurnStart[opposingPlayer(player)]
        ]
        : turnsLength
    }),
    [UPDATE_TIME_LEFT]: ({action: {timestamp}, state: {player, lastTimeChange, timeLeft, gameStartTimestamp}}) => ({
      timeLeft: {
        ...timeLeft,
        [player]: timeLeft[player] - (timestamp - lastTimeChange)
      },
      totalTimePassed: timestamp - gameStartTimestamp,
      lastTimeChange: timestamp
    })
  },
  options: {
    mode: 'setState'
  }
})

export default chessClock
