import React from 'react'
import PropTypes from 'prop-types'

import './TaskLabel.css'

function TaskLabel({ taskName, distanceToNow }) {
  return (
    <label>
      <span className="description">{taskName}</span>
      <span className="created">created {distanceToNow} ago</span>
    </label>
  )
}

TaskLabel.propTypes = {
  taskName: PropTypes.string.isRequired,
  distanceToNow: PropTypes.string.isRequired,
}

export default TaskLabel
