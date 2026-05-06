export default function SearchBar({ defaultValue = '', placeholder = 'Search courses, topics, or categories…' }) {
  return (
    <label style={{ display: 'grid', gap: '6px' }}>
      <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search</span>
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}
