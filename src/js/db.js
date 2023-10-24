import { openDB } from "idb"
import presetsJSON from './presets.json'

const dbName = 'pocket-synth-pwa-db'
const dbVersion = 1
const storeName = 'presets'

const initDB = async () => {
  await openDB(dbName, dbVersion, {
    upgrade(db) {
      db.createObjectStore(storeName, {
        keyPath: 'id',
        autoIncrement: true,
      })
    }
  })
}

const seedPresets = async () => {
  // seed the db if empty
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.store
  const presets = await store.getAllKeys()
  if ((presets.length === 0)) {
    for (const p of presetsJSON) {
      await store.add(p)
    }
  }
}

// create
export const addPreset = async preset => {
  const db = await openDB(dbName, dbVersion)
  await db.add(storeName, preset)
}

// read
export const getAllPresets = async () => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.store  
  return await store.getAll()
}

export const getPreset = async id => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.store  
  return await store.get(id)
}

// update
export const updatePreset = async preset => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.store  
  return await store.put(preset)
}

// delete
export const deletePreset = async id => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.store  
  return await store.delete(id)
}

await initDB()
await seedPresets()

// addPreset({ harmonicity: 1, modulationType: 'square' })
// console.log(await getAllPresets())
// await updatePreset({harmonicity: 1, modulationType: 'triangle', id: 2})
// console.log(await getPreset(2))
// await deletePreset(2)