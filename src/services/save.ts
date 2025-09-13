import localforage from 'localforage'

export async function save<T>(key: string, value: T){
  return localforage.setItem<T>(key, value)
}
export async function load<T>(key: string){
  return localforage.getItem<T>(key)
}
