import React from 'react'
import {connect} from 'react-redux'
import {updateCurrentPlayer} from './index.actions'
import './index.css'

const App = ({player, black, white, onButtonClick}) => (
  <div className='app'>
    <div className='container countdown'>
      <span className={`countdown ${player ? player : ''}`}>White: {white}</span>
      <span className={`countdown ${player ? player : ''}`}>Black: {black}</span>
    </div>
    <button className='container mainButton' onClick={() => onButtonClick(player)}>Button</button>
  </div>
)

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
