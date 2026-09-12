import { useState } from 'react'

const initialForm = { firstName: '', lastName: '', cc: '', phone: '' }

export default function PatientForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!form.firstName.trim() || form.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres.'
    }
    if (!form.lastName.trim() || form.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres.'
    }
    if (!/^\d{6,10}$/.test(form.cc.trim())) {
      newErrors.cc = 'La cédula debe tener entre 6 y 10 dígitos numéricos.'
    }
    if (form.phone.trim() && !/^\d{7,10}$/.test(form.phone.trim())) {
      newErrors.phone = 'El teléfono debe tener entre 7 y 10 dígitos.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    onAdd({
      id: crypto.randomUUID(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      cc: form.cc.trim(),
      phone: form.phone.trim(),
    })
    setForm(initialForm)
    setErrors({})
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Agregar paciente</h2>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="firstName">Nombre</label>
          <input
            id="firstName"
            value={form.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
          {errors.firstName && <span className="field-error">{errors.firstName}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            value={form.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
          {errors.lastName && <span className="field-error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cc">Cédula (CC)</label>
          <input
            id="cc"
            inputMode="numeric"
            value={form.cc}
            onChange={(e) => handleChange('cc', e.target.value)}
          />
          {errors.cc && <span className="field-error">{errors.cc}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>

      <button type="submit">Agregar paciente</button>
    </form>
  )
}
