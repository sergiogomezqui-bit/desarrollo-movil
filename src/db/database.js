import Dexie from 'dexie'

export const db = new Dexie('FrutasDB')

// ++id = autoincremental, &nombre = único
db.version(1).stores({
  fruits: '++id, &nombre, precio',
})

db.on('populate', () => {
  db.table('fruits').bulkAdd([
    { nombre: 'Mango', precio: 4500 },
    { nombre: 'Banano', precio: 2500 },
    { nombre: 'Fresa', precio: 6000 },
  ])
})
