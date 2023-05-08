import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default function App() {
  function filteringData(arr, filter) {
    switch (filter) {
      case 'all':
        return arr
      case 'active':
        return arr.filter((el) => !el.done)
      case 'completed':
        return arr.filter((el) => el.done)
      default:
        return arr
    }
  }

  function findTask(arr, id) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newArr = [...arr]

    return {
      newArr,
      idx,
      oldItem,
    }
  }

  function toggleProperty(arr, id, propName) {
    const { newArr, idx, oldItem } = findTask(arr, id)

    const newItem =
      propName === 'done'
        ? { ...oldItem, [propName]: !oldItem[propName], timer: 0 }
        : { ...oldItem, [propName]: !oldItem[propName] }

    newArr.splice(idx, 1, newItem)
    return newArr
  }

  function createNewTask(textTask, timer) {
    return {
      id: nanoid(3),
      textTask,
      done: false,
      editing: false,
      date: new Date(),
      timer,
      timerRun: false,
    }
  }

  const [data, setData] = useState([
    { id: nanoid(3), textTask: '1', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
    { id: nanoid(3), textTask: '2', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
    { id: nanoid(3), textTask: '3', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
  ])

  const [filter, setFilter] = useState('all')

  function cancelEditing() {
    setData((dataTask) => {
      const newArr = dataTask.map((task) => {
        const { editing } = task

        if (editing) {
          return { ...task, editing: false }
        }
        return task
      })

      return newArr
    })
  }

  useEffect(() => {
    function handleMouseDown({ target }) {
      if (!target.matches('.edit')) {
        cancelEditing()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    function handleKeyDown({ key }) {
      if (key === 'Escape') {
        cancelEditing()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
  }, [])

  const togglePropertyDone = (id) => {
    setData((dataTask) => toggleProperty(dataTask, id, 'done'))
  }

  const togglePropertyEditing = (id) => {
    setData((dataTask) => toggleProperty(dataTask, id, 'editing'))
  }

  const addTask = (taskName, timer) => {
    setData((dataTask) => {
      const newArr = [...dataTask]

      newArr.push(createNewTask(taskName, timer))

      return newArr
    })
  }

  const deleteTask = (id) => {
    setData((dataTask) => {
      const newArr = dataTask.filter((el) => {
        if (el.id !== id) {
          return true
        }

        clearInterval(el.timerId)
        return false
      })

      return newArr
    })
  }

  const changeFilter = ({ target }) => {
    setFilter(target.value)
  }

  const clearCompleted = () => {
    setData((dataTask) => {
      const newArr = dataTask.filter((el) => {
        if (!el.done) {
          return true
        }

        clearInterval(el.timerId)
        return false
      })

      return newArr
    })
  }

  const changeText = (id, textTask) => {
    setData((dataTask) => {
      const { newArr, idx, oldItem } = findTask(dataTask, id)
      const newItem = { ...oldItem, textTask }

      newArr.splice(idx, 1, newItem)
      return newArr
    })
  }

  function updateTimer(id) {
    setData((dataTask) => {
      const { newArr, idx, oldItem } = findTask(dataTask, id)
      const { timer, timerId } = oldItem

      let newItem

      if (timer > 0) {
        newItem = { ...oldItem, timer: timer - 1000 }
      } else {
        clearInterval(timerId)
        newItem = { ...oldItem, timer: 0, timerRun: false }
      }

      newArr.splice(idx, 1, newItem)
      return newArr
    })
  }

  const startTimer = (id) => {
    setData((dataTask) => {
      const { newArr, idx, oldItem } = findTask(dataTask, id)

      const timerId = setInterval(() => {
        updateTimer(id)
      }, 1000)

      const newItem = { ...oldItem, timerRun: true, timerId }
      newArr.splice(idx, 1, newItem)
      return newArr
    })
  }

  const pauseTimer = (id) => {
    setData((dataTask) => {
      const { newArr, idx, oldItem } = findTask(dataTask, id)
      const newItem = { ...oldItem, timerRun: false }

      clearInterval(oldItem.timerId)
      newArr.splice(idx, 1, newItem)
      return newArr
    })
  }

  const filteredData = filteringData(data, filter)

  return (
    <>
      <Header onAddedTask={addTask} />
      <section className="main">
        <TaskList
          data={filteredData}
          onDone={togglePropertyDone}
          onEdit={togglePropertyEditing}
          onDelete={deleteTask}
          onChangeText={changeText}
          onStartTimer={startTimer}
          onPauseTimer={pauseTimer}
        />
        <Footer data={data} filter={filter} onChangeFilter={changeFilter} onClearCompleted={clearCompleted} />
      </section>
    </>
  )
}
