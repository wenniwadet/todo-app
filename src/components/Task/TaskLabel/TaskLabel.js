import React from 'react'
import PropTypes from 'prop-types'

import Timer from '../../Timer'

import './TaskLabel.css'

function TaskLabel({ textTask, distanceToNow, timer, timerRun, onStartTimer, onPauseTimer }) {
  return (
    <div className="label">
      <span className="title">{textTask}</span>
      <Timer timer={timer} timerRun={timerRun} onPauseTimer={onPauseTimer} onStartTimer={onStartTimer} />
      <span className="description">created {distanceToNow} ago</span>
    </div>
  )
}

TaskLabel.propTypes = {
  textTask: PropTypes.string.isRequired,
  distanceToNow: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  timerRun: PropTypes.bool.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}

export default TaskLabel
