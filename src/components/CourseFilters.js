export default function CourseFilters({ categories = [], selectedCategory = 'All', selectedLimit = 9 }) {
  return (
    <>
      <label style={{ display: 'grid', gap: '8px' }}>
        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>Category</span>
        <select
          name="category"
          defaultValue={selectedCategory}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(2, 6, 23, 0.65)',
            color: '#fff'
          }}
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: 'grid', gap: '8px' }}>
        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>Per Page</span>
        <select
          name="limit"
          defaultValue={String(selectedLimit)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(2, 6, 23, 0.65)',
            color: '#fff'
          }}
        >
          {[6, 9, 12, 18, 24].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="btn-primary"
        style={{ padding: '14px 20px', borderRadius: '14px', whiteSpace: 'nowrap' }}
      >
        Apply
      </button>
    </>
  );
}
