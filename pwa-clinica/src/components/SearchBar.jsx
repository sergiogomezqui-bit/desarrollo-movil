export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="text"
        placeholder="Buscar por nombre, apellido o CC..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
