import React from 'react'

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

  static toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    const newArr = [...arr]

    newArr.splice(index, 1, newItem)
    return newArr
  }

  maxId = 100

  state = {
    data: [
      { id: 1, taskName: 'First Task', done: false, date: new Date() },
      { id: 2, taskName: 'Second Task', done: false, date: new Date() },
      { id: 3, taskName: 'Third Task', done: false, date: new Date() },
    ],
    filter: 'all',
  }

  togglePropertyDone = (id) => {
    this.setState(({ data }) => ({
      data: App.toggleProperty(data, id, 'done'),
    }))
  }

  addTask = (taskName) => {
    const { data } = this.state
    const newArr = [...data]

    newArr.push(this.createNewTask(taskName))
    this.setState({
      data: newArr,
    })
  }

  deleteTask = (id) => {
    const { data } = this.state
    const newArr = data.filter((el) => el.id !== id)
    this.setState({
      data: newArr,
    })
  }

  createNewTask = (taskName) => {
    this.maxId += 1

    return {
      id: this.maxId,
      taskName,
      done: false,
      date: new Date(),
    }
  }

  changeFilter = (filter) => {
    this.setState({
      filter,
    })
  }

  clearCompletedTask = () => {
    const { data } = this.state
    const newArr = data.filter((el) => !el.done)
    this.setState({
      data: newArr,
    })
  }

  changeTaskName = (id, taskName) => {
    const { data } = this.state
    const index = data.findIndex((el) => el.id === id)
    const oldItem = data[index]
    const newItem = { ...oldItem, taskName }
    const newArr = [...data]

    newArr.splice(index, 1, newItem)
    this.setState({ data: newArr })
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
            onDelete={this.deleteTask}
            onChangeTaskName={this.changeTaskName}
          />
          <Footer
            data={data}
            filter={filter}
            onChangeFilter={this.changeFilter}
            onClearCompleted={this.clearCompletedTask}
          />
        </section>
      </>
    )
  }
}
