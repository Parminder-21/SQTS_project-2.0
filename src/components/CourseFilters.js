export default function CourseFilters({ categories = [], selectedCategory = 'All', selectedLimit = 9 }) {
  return (
    <>
      <label style={{ display: 'grid', gap: '6px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</span>
        <select name="category" defaultValue={selectedCategory} className="input" style={{ cursor: 'pointer' }}>
          {categories.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>

      <label style={{ display: 'grid', gap: '6px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Per Page</span>
        <select name="limit" defaultValue={String(selectedLimit)} className="input" style={{ cursor: 'pointer' }}>
          {[6, 9, 12, 18, 24].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      <button type="submit" className="btn-primary" style={{ alignSelf: 'end', padding: '12px 20px', whiteSpace: 'nowrap' }}>
        Apply
      </button>
    </>
  );
}
