import React from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends React.Component {
  static filteringData = (arr, filter) => {
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

  static findTask(arr, id) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newArr = [...arr]

    return {
      newArr,
      idx,
      oldItem,
    }
  }

  static toggleProperty = (arr, id, propName) => {
    const { newArr, idx, oldItem } = App.findTask(arr, id)
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    newArr.splice(idx, 1, newItem)

    return newArr
  }

  static createNewTask = (textTask, timer) => ({
    id: nanoid(3),
    textTask,
    done: false,
    editing: false,
    date: new Date(),
    timer,
    timerRun: false,
  })

  state = {
    data: [
      { id: nanoid(3), textTask: '1', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
      { id: nanoid(3), textTask: '2', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
      { id: nanoid(3), textTask: '3', done: false, editing: false, date: new Date(), timer: 100000, timerRun: false },
    ],
    filter: 'all',
  }

  componentDidMount() {
    document.addEventListener('click', ({ target }) => {
      if (!target.matches('.edit')) {
        this.cancelEditing()
      }
    })

    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.cancelEditing()
      }
    })
  }

  startTimer = (id) => {
    this.setState(({ data }) => {
      const { newArr, idx, oldItem } = App.findTask(data, id)
      const timerId = setInterval(() => {
        this.updateTimer(id)
      }, 1000)
      const newItem = { ...oldItem, timerRun: true, timerId }

      newArr.splice(idx, 1, newItem)
      return {
        data: newArr,
      }
    })
  }

  pauseTimer = (id) => {
    this.setState(({ data }) => {
      const { newArr, idx, oldItem } = App.findTask(data, id)
      const newItem = { ...oldItem, timerRun: false }

      clearInterval(oldItem.timerId)
      newArr.splice(idx, 1, newItem)

      return {
        data: newArr,
      }
    })
  }

  togglePropertyDone = (id) => {
    this.setState(({ data }) => ({
      data: App.toggleProperty(data, id, 'done'),
    }))
  }

  togglePropertyEditing = (id) => {
    this.setState(({ data }) => ({
      data: App.toggleProperty(data, id, 'editing'),
    }))
  }

  addTask = (taskName, timer) => {
    this.setState(({ data }) => {
      const newArr = [...data]

      newArr.push(App.createNewTask(taskName, timer))

      return {
        data: newArr,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ data }) => {
      const newArr = data.filter((el) => {
        if (el.id !== id) {
          return true
        }

        clearInterval(el.timerId)
        return false
      })

      return {
        data: newArr,
      }
    })
  }

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    })
  }

  clearCompleted = () => {
    this.setState(({ data }) => {
      const newArr = data.filter((el) => {
        if (!el.done) {
          return true
        }

        clearInterval(el.timerId)
        return false
      })

      return {
        data: newArr,
      }
    })
  }

  changeText = (id, textTask) => {
    this.setState(({ data }) => {
      const { newArr, idx, oldItem } = App.findTask(data, id)
      const newItem = { ...oldItem, textTask }

      newArr.splice(idx, 1, newItem)

      return {
        data: newArr,
      }
    })
  }

  cancelEditing() {
    this.setState(({ data }) => {
      const newArr = data.map((task) => {
        const { editing } = task

        if (editing) {
          return { ...task, editing: false }
        }
        return task
      })

      return {
        data: newArr,
      }
    })
  }

  updateTimer(id) {
    this.setState(({ data }) => {
      const { newArr, idx, oldItem } = App.findTask(data, id)
      const { timer, timerId } = oldItem
      let newItem

      if (timer > 0) {
        newItem = { ...oldItem, timer: timer - 1000 }
      } else {
        clearInterval(timerId)
        newItem = { ...oldItem, timer: 0, timerRun: false }
      }

      newArr.splice(idx, 1, newItem)

      return {
        data: newArr,
      }
    })
  }

  render() {
    const { data, filter } = this.state
    const filteredData = App.filteringData(data, filter)

    return (
      <>
        <Header onAddedTask={this.addTask} />
        <section className="main">
          <TaskList
            data={filteredData}
            onDone={this.togglePropertyDone}
            onEdit={this.togglePropertyEditing}
            onDelete={this.deleteTask}
            onChangeText={this.changeText}
            onStartTimer={this.startTimer}
            onPauseTimer={this.pauseTimer}
          />
          <Footer
            data={data}
            filter={filter}
            onChangeFilter={this.changeFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </>
    )
  }
}
