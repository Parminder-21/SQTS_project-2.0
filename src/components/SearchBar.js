export default function SearchBar({ defaultValue = '', placeholder = 'Search courses, descriptions, or categories' }) {
  return (
    <label style={{ display: 'grid', gap: '8px' }}>
      <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>Search</span>
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(2, 6, 23, 0.65)',
          color: '#fff'
        }}
      />
    </label>
  );
}
