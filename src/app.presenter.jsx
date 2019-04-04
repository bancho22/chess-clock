import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import zeroFill from 'zero-fill'
import {updateCurrentPlayer, Players} from './index.actions'
import './index.css'

const Countdown = ({player, duration}) => (
  <div className={`countdownContent ${player}`}>
    <span>{player}</span>
    <span>{zeroFill(2, duration.get('minutes'))}:{zeroFill(2, duration.get('seconds'))}</span>
    <span>.{zeroFill(3, duration.get('milliseconds'))}</span>
  </div>
)

const App = ({player, black, white, turnsLength, onButtonClick}) => {
  const allTurnsLength = turnsLength.reduce((sum, turn) => sum + turn, 0)
  const whiteDuration = moment.duration(white)
  const blackDuration = moment.duration(black)
  return (
    <div className={`app ${player ? player : 'white'}`}>
      <div className={`container countdown ${player ? player : ''}`}>
        <Countdown
          player={Players.WHITE}
          duration={whiteDuration}
        />
        <Countdown
          player={Players.BLACK}
          duration={blackDuration}
        />
      </div>
      <button
        className='container mainButton'
        onClick={() => onButtonClick(player)}
      >
        {player === null ? 'Start game' : 'Next player'}
      </button>
      <div className='lengthContainer'>
        {turnsLength.map(turnLength => (
          <div
            className='duration'
            style={{width: `${(turnLength / allTurnsLength) * 100}%`}}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({player, timeLeft: {black, white}, turnsLength}) => ({
  player,
  black,
  white,
  turnsLength
})

const mapDispatchToProps = dispatch => ({
  onButtonClick: player => dispatch(updateCurrentPlayer({player}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
