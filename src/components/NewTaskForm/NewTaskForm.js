import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    taskName: '',
  }

  changeNameNewTask = (e) => {
    this.setState({ taskName: e.target.value })
  }

  acceptNameNewTask = (e) => {
    const { onAddedTask } = this.props
    const { taskName } = this.state

    e.preventDefault()
    onAddedTask(taskName)

    this.setState({ taskName: '' })
  }

  render() {
    const { taskName } = this.state

    return (
      <form onSubmit={this.acceptNameNewTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.changeNameNewTask}
          value={taskName}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddedTask: PropTypes.func.isRequired,
}
