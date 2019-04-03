import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import zeroFill from 'zero-fill'
import {updateCurrentPlayer} from './index.actions'
import './index.css'

const App = ({player, black, white, onButtonClick}) => {
  const whiteDuration = moment.duration(white)
  const blackDuration = moment.duration(black)
  return (
    <div className='app'>
      <div className='container countdown'>
        <div className={`countdown ${player ? player : ''}`}>
          <span>White</span>
          <span>{zeroFill(2, whiteDuration.get('minutes'))}:{zeroFill(2, whiteDuration.get('seconds'))}</span>
          <span>.{zeroFill(3, whiteDuration.get('milliseconds'))}</span>
        </div>
        <div className={`countdown ${player ? player : ''}`}>
          <span>Black</span>
          <span>{zeroFill(2, blackDuration.get('minutes'))}:{zeroFill(2, blackDuration.get('seconds'))}</span>
          <span>.{zeroFill(3, blackDuration.get('milliseconds'))}</span>
        </div>
      </div>
      <button className='container mainButton' onClick={() => onButtonClick(player)}>Button</button>
    </div>
  )
}

const mapStateToProps = ({player, timeLeft: {black, white}}) => ({
  player,
  black,
  white
})

const mapDispatchToProps = dispatch => ({
  onButtonClick: player => dispatch(updateCurrentPlayer({player}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
