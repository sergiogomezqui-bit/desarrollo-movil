export const seedPatients = [
  { id: 'p1', firstName: 'Laura', lastName: 'Gómez', cc: '1043921234', phone: '3001234567' },
  { id: 'p2', firstName: 'Carlos', lastName: 'Pérez', cc: '1122334455', phone: '3109876543' },
  { id: 'p3', firstName: 'Ana', lastName: 'Torres', cc: '1098765432', phone: '3204561234' },
]

export const seedVisits = [
  { id: 'v1', patientId: 'p1', patientName: 'Laura Gómez', time: '08:00', status: 'pendiente' },
  { id: 'v2', patientId: 'p2', patientName: 'Carlos Pérez', time: '09:30', status: 'en_camino' },
  { id: 'v3', patientId: 'p3', patientName: 'Ana Torres', time: '11:00', status: 'finalizada' },
]
