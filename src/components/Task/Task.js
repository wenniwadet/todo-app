import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import TaskLabel from './TaskLabel'
import TaskButtons from './TaskButtons'

import './Task.css'

export default class Task extends React.Component {
  state = {
    taskName: this.props.taskName,
    editing: false,
    distanceToNow: formatDistanceToNow(this.props.date),
  }

  componentDidMount() {
    const { updateTime, date } = this.props
    this.timerId = setInterval(() => {
      this.setState({ distanceToNow: formatDistanceToNow(date) })
    }, updateTime)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  changeTaskName = (e) => {
    this.setState({ taskName: e.target.value })
  }

  toggleStateEditing = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
    }))
  }

  acceptTaskName = (e) => {
    const { taskName } = this.state
    const { id, onChangeTaskName } = this.props

    e.preventDefault()
    onChangeTaskName(id, taskName)

    this.toggleStateEditing()
  }

  render() {
    const { id, done, onDone, onDelete } = this.props
    const { editing, distanceToNow, taskName } = this.state

    let statusTask = null

    if (done) {
      statusTask = 'completed'
    }

    if (editing) {
      statusTask = 'editing'
    }

    const inputEditor = editing && (
      <form onSubmit={this.acceptTaskName}>
        <input className="edit" type="text" onChange={this.changeTaskName} value={taskName} />
      </form>
    )

    return (
      <li className={statusTask}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={() => onDone(id)} defaultChecked={!!done} />
          <TaskLabel taskName={taskName} distanceToNow={distanceToNow} />
          <TaskButtons onDelete={() => onDelete(id)} onEdit={this.toggleStateEditing} />
        </div>
        {inputEditor}
      </li>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  taskName: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeTaskName: PropTypes.func.isRequired,
  updateTime: PropTypes.number,
}

Task.defaultProps = {
  updateTime: 60000,
}
