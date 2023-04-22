import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

function TasksFilter({ onChangeFilter, filter }) {
  const radioButtonsFilter = [
    { filterName: 'all', label: 'All' },
    { filterName: 'active', label: 'Active' },
    { filterName: 'completed', label: 'Completed' },
  ]

  const radioButtons = radioButtonsFilter.map(({ filterName, label }) => {
    const isActive = filter === filterName ? 'selected' : null
    return (
      <li key={filterName}>
        <input
          style={{ display: 'none' }}
          type="radio"
          name="filters"
          value={filterName}
          id={filterName}
          onChange={onChangeFilter}
          defaultChecked={filterName === 'all'}
        />
        <label className={isActive} htmlFor={filterName}>
          {label}
        </label>
      </li>
    )
  })

  return <ul className="filters">{radioButtons}</ul>
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TasksFilter
