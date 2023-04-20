import React from 'react'
import PropTypes from 'prop-types'

import './TaskButtons.css'

function TaskButtons({ onDelete, onEdit }) {
  return (
    <>
      <button className="icon icon-edit" type="button" aria-label="edit" onClick={onEdit} />
      <button className="icon icon-destroy" type="button" aria-label="delete" onClick={onDelete} />
    </>
  )
}

TaskButtons.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default TaskButtons
