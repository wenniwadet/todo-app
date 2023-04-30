import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

function TaskList({ data, onDone, onEdit, onDelete, onChangeText, onStartTimer, onPauseTimer }) {
  const arrayOfTask = data.map(({ id, textTask, done, editing, date, timer, timerRun }) => (
    <Task
      key={id}
      id={id}
      textTask={textTask}
      done={done}
      editing={editing}
      date={date}
      timer={timer}
      timerRun={timerRun}
      onDone={onDone}
      onEdit={onEdit}
      onDelete={onDelete}
      onChangeText={onChangeText}
      onStartTimer={onStartTimer}
      onPauseTimer={onPauseTimer}
    />
  ))

  return <ul className="todo-list">{arrayOfTask}</ul>
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}

export default TaskList
