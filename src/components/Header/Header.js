import React from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './Header.css'

export default class Header extends React.Component {
  static validateTextTask(text) {
    return text
      .split(' ')
      .filter((sub) => sub !== '')
      .join(' ')
  }

  static validTimer(str) {
    let result = true

    str.split('').forEach((el) => {
      if (Number.isNaN(+el)) {
        result = false
      }
    })

    return result
  }

  state = {
    textTask: '',
    min: '',
    sec: '',
  }

  changeText = ({ target }) => {
    this.setState({ textTask: target.value })
  }

  changeTimerMin = ({ target }) => {
    if (Header.validTimer(target.value)) {
      this.setState({ min: target.value })
    }
  }

  changeTimerSec = ({ target }) => {
    if (Header.validTimer(target.value)) {
      this.setState({ sec: target.value })
    }
  }

  acceptNewTask = (e) => {
    e.preventDefault()

    const { onAddedTask } = this.props
    const { textTask, min, sec } = this.state
    const timer = (Number(min) * 60 + Number(sec)) * 1000
    const validTextTask = Header.validateTextTask(textTask)

    if (validTextTask === '') {
      alert('Наименование задачи не может быть пустым')
      this.setState({ textTask: '' })
      return
    }

    onAddedTask(validTextTask, timer)
    this.setState({ textTask: '', min: '', sec: '' })
  }

  render() {
    const { textTask, min, sec } = this.state
    const timer = [min, sec]

    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          textTask={textTask}
          timer={timer}
          onChangeText={this.changeText}
          onChangeTimerMin={this.changeTimerMin}
          onChangeTimerSec={this.changeTimerSec}
          onAcceptTask={this.acceptNewTask}
        />
      </header>
    )
  }
}

Header.propTypes = {
  onAddedTask: PropTypes.func.isRequired,
}
