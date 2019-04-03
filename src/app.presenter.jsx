import React from 'react'
import {connect} from 'react-redux'
import {updateCurrentPlayer} from './index.actions'
import './index.css'

const App = ({player, black, white, onButtonClick}) => (
  <div className='app'>
    <span>White: {white}</span>
    <span>Black: {black}</span>
    <button onClick={() => onButtonClick(player)}>Button</button>
  </div>
)

const mapStateToProps = ({player, timeLeft: {black, white}}) => ({
  player,
  black,
  white
})

const mapDispatchToProps = dispatch => ({
  onButtonClick: player => dispatch(updateCurrentPlayer({player, dispatch}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
