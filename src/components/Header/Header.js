import React from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './Header.css'

function Header({ onAddedTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddedTask={onAddedTask} />
    </header>
  )
}

Header.propTypes = {
  onAddedTask: PropTypes.func.isRequired,
}

export default Header
