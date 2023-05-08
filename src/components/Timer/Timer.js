import React from 'react'
import PropTypes from 'prop-types'
import Countdown, { zeroPad } from 'react-countdown'

import './Timer.css'
import pause from './pause.png'
import play from './play.png'

function Timer({ timer, timerRun, onPauseTimer, onStartTimer }) {
  let countdownApi = null

  const setRef = (countdown) => {
    if (countdown) {
      countdownApi = countdown.getApi()
    }
  }

  const onClickStart = () => {
    if (timerRun) return
    countdownApi.start()
    onStartTimer()
  }

  const onClickPause = () => {
    if (!timerRun) return
    countdownApi.pause()
    onPauseTimer()
  }

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>00:00</span>
    }

    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )
  }

  return (
    <div className="description">
      {timerRun ? (
        <button className="button-timer" type="button" aria-label="stop timer" onClick={onClickPause}>
          <img src={pause} alt="pause timer" />
        </button>
      ) : (
        <button className="button-timer" type="button" aria-label="start timer" onClick={onClickStart}>
          <img src={play} alt="start timer" />
        </button>
      )}
      <Countdown date={Date.now() + timer} renderer={renderer} autoStart={timerRun} ref={setRef} />
    </div>
  )
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  timerRun: PropTypes.bool.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}

export default Timer
