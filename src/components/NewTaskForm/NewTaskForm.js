import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

function NewTaskForm(props) {
  const { textTask, timer, onChangeText, onChangeTimerMin, onChangeTimerSec, onAcceptTask } = props
  const [min, sec] = timer

  return (
    <form onSubmit={onAcceptTask} className="new-todo-form">
      <input className="new-todo" placeholder="Task" value={textTask} onChange={onChangeText} maxLength={7} required />
      <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={onChangeTimerMin} maxLength={2} />
      <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={onChangeTimerSec} maxLength={2} />
      <input type="submit" hidden />
    </form>
  )
}

NewTaskForm.propTypes = {
  textTask: PropTypes.string.isRequired,
  timer: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeTimerMin: PropTypes.func.isRequired,
  onChangeTimerSec: PropTypes.func.isRequired,
  onAcceptTask: PropTypes.func.isRequired,
}

export default NewTaskForm
