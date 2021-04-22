import { v1 } from 'uuid'

const key = "_7388442c33d94870"

export const insert = (data) => {
  const allData = selectAll() || {};
  if (allData[data.data.id]) {
    delete allData[data.data.id]
  }
  const id = v1()
  data.data.id = id;
  allData[id] = data
  localStorage.setItem(key, JSON.stringify(allData))
  return allData
}

export const selectAll = () => {
  return JSON.parse(localStorage.getItem(key))
}

export const deleteItem = (id) => {
  const allData = selectAll()
  delete allData[id]
  insert(allData)
}

export const deleteAll = () => {
  localStorage.removeItem(key)
}