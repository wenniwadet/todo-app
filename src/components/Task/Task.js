import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import TaskLabel from './TaskLabel'

import './Task.css'

export default class Task extends React.Component {
  static validateTextTask(str) {
    return str
      .split(' ')
      .filter((sub) => sub !== '')
      .join(' ')
  }

  dateCreatedId = null

  state = {
    distanceToNow: formatDistanceToNow(this.props.date),
  }

  componentDidMount() {
    const { updateTime, date } = this.props

    this.dateCreatedId = setInterval(() => {
      this.setState({ distanceToNow: formatDistanceToNow(date) })
    }, updateTime)
  }

  componentWillUnmount() {
    clearInterval(this.dateCreatedId)
  }

  changeText = (e) => {
    // e.preventDefault()

    const { id, onChangeText } = this.props
    const validTextTask = Task.validateTextTask(e.target.value)

    if (validTextTask === '') {
      alert('Наименование задачи не может быть пустым')
      return
    }

    onChangeText(id, validTextTask)
  }

  acceptText = (e) => {
    e.preventDefault()

    const { id, onEdit } = this.props
    onEdit(id)
  }

  onStartTimer = () => {
    const { id, onStartTimer } = this.props
    onStartTimer(id)
  }

  onPauseTimer = () => {
    const { id, onPauseTimer } = this.props
    onPauseTimer(id)
  }

  render() {
    const { id, textTask, done, editing, timer, timerRun, onDone, onEdit, onDelete } = this.props
    const { distanceToNow } = this.state

    let statusTask = null

    if (done) {
      statusTask = 'completed'
    }

    if (editing) {
      statusTask = 'editing'
    }

    const inputEditor = editing && (
      <form onSubmit={this.acceptText}>
        <input className="edit" type="text" onChange={this.changeText} value={textTask} maxLength={7} />
      </form>
    )

    return (
      <li className={statusTask}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={() => onDone(id)} defaultChecked={done} />
          <TaskLabel
            textTask={textTask}
            distanceToNow={distanceToNow}
            timer={timer}
            timerRun={timerRun}
            onStartTimer={this.onStartTimer}
            onPauseTimer={this.onPauseTimer}
          />
          <button className="icon icon-edit" type="button" aria-label="edit" onClick={() => onEdit(id)} />
          <button className="icon icon-destroy" type="button" aria-label="delete" onClick={() => onDelete(id)} />
        </div>
        {inputEditor}
      </li>
    )
  }
}

Task.defaultProps = {
  updateTime: 60000,
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  textTask: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  updateTime: PropTypes.number,
  timer: PropTypes.number.isRequired,
  timerRun: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}
