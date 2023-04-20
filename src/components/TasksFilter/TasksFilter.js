import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

function TasksFilter({ onChangeFilter, filter }) {
  const buttonsFilter = [
    { filterName: 'all', label: 'All' },
    { filterName: 'active', label: 'Active' },
    { filterName: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsFilter.map(({ filterName, label }) => {
    const isActive = filter === filterName ? 'selected' : null
    return (
      <li key={filterName}>
        <button className={isActive} type="button" onClick={() => onChangeFilter(filterName)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TasksFilter
