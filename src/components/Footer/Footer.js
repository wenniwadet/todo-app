import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

import './Footer.css'

function Footer({ data, filter, onChangeFilter, onClearCompleted }) {
  const countActiveTask = data.filter((el) => !el.done).length

  return (
    <footer className="footer">
      <span className="todo-count">{countActiveTask} items left</span>
      <TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
