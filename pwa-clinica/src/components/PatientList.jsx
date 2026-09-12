export default function PatientList({ patients }) {
  if (patients.length === 0) {
    return <p className="empty-state">No hay pacientes que coincidan con la búsqueda.</p>
  }

  return (
    <table className="patient-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>CC</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>{p.firstName}</td>
            <td>{p.lastName}</td>
            <td>{p.cc}</td>
            <td>{p.phone || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
