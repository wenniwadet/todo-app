import React, { useState } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './Header.css'

export default function Header({ onAddedTask }) {
  const validateTextTask = (text) =>
    text
      .split(' ')
      .filter((sub) => sub !== '')
      .join(' ')

  const validTimer = (str) => {
    let result = true

    str.split('').forEach((el) => {
      if (Number.isNaN(+el)) {
        result = false
      }
    })

    return result
  }

  const [textTask, setTextTask] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const changeText = ({ target }) => {
    setTextTask(target.value)
  }

  const changeTimerMin = ({ target }) => {
    if (validTimer(target.value)) {
      setMin(target.value)
    }
  }

  const changeTimerSec = ({ target }) => {
    if (validTimer(target.value)) {
      setSec(target.value)
    }
  }

  const acceptNewTask = (e) => {
    e.preventDefault()

    const timer = (Number(min) * 60 + Number(sec)) * 1000
    const validTextTask = validateTextTask(textTask)

    if (validTextTask === '') {
      alert('Наименование задачи не может быть пустым')
      setTextTask('')
      return
    }

    onAddedTask(validTextTask, timer)
    setTextTask('')
    setMin('')
    setSec('')
  }

  const timer = [min, sec]

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm
        textTask={textTask}
        timer={timer}
        onChangeText={changeText}
        onChangeTimerMin={changeTimerMin}
        onChangeTimerSec={changeTimerSec}
        onAcceptTask={acceptNewTask}
      />
    </header>
  )
}

Header.propTypes = {
  onAddedTask: PropTypes.func.isRequired,
}
