import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

function TaskList({ data, onDone, onDelete, onChangeTaskName }) {
  const arrayOfTask = data.map(({ id, taskName, done, date }) => (
    <Task
      key={id}
      id={id}
      taskName={taskName}
      done={done}
      date={date}
      onDone={onDone}
      onDelete={onDelete}
      onChangeTaskName={onChangeTaskName}
    />
  ))

  return <ul className="todo-list">{arrayOfTask}</ul>
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeTaskName: PropTypes.func.isRequired,
}

export default TaskList
