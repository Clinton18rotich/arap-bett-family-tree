const fs = require('fs');
let content = fs.readFileSync('src/App.js', 'utf8');

// 1. Replace renderPersonCard to handle spouses with expand button
const oldCard = `  const renderPersonCard = (person, showWifeBtn = true) => {
    const isMale = person.type === 'patriarch' || person.gender === 'male' || (person.title && person.title.includes('Son'));
    const hasSpouse = person.wives || person.husbands;

    return (
      <div key={person.id} className={'person-card ' + (isMale ? 'male' : 'female')}>
        <div className="person-name" onClick={() => setSelectedPerson(person)}>{person.name}</div>
        {person.title && <div className="person-title">{person.title}</div>}
        {person.location && <div className="person-location">📍 {person.location}</div>}
        <div className="person-actions">
          {showWifeBtn && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'wife', parentId: person.id }); setShowAddForm(true); }}>+ Wife</button>}
          <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: person.id }); setShowAddForm(true); }}>+ Child</button>
          {hasSpouse && <button className="btn-sm expand-btn" onClick={() => toggleExpandSon(person.id)}>{expandedSons[person.id] ? '▲' : '▼'}</button>}
          <button className="btn-sm btn-edit" onClick={() => openEditForm(person)}>✎</button>
          <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(person)}>✕</button>
        </div>
      </div>
    );
  };`;

// Keep renderPersonCard but add a new recursive function after it
const newCard = `  const renderPersonCard = (person, showWifeBtn = true) => {
    const isMale = person.type === 'patriarch' || person.gender === 'male' || (person.title && person.title.includes('Son'));
    const hasSpouse = person.wives || person.husbands;

    return (
      <div key={person.id} className={'person-card ' + (isMale ? 'male' : 'female')}>
        <div className="person-name" onClick={() => setSelectedPerson(person)}>{person.name}</div>
        {person.title && <div className="person-title">{person.title}</div>}
        {person.location && <div className="person-location">📍 {person.location}</div>}
        <div className="person-actions">
          {showWifeBtn && !person.husbands && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'wife', parentId: person.id }); setShowAddForm(true); }}>+ Wife</button>}
          <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: person.id }); setShowAddForm(true); }}>+ Child</button>
          {hasSpouse && <button className="btn-sm expand-btn" onClick={() => toggleExpandSon(person.id)}>{expandedSons[person.id] ? '▲' : '▼'}</button>}
          <button className="btn-sm btn-edit" onClick={() => openEditForm(person)}>✎</button>
          <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(person)}>✕</button>
        </div>
      </div>
    );
  };

  // Recursive function to render any person with spouses
  const renderPersonWithSpouses = (person) => {
    const hasSpouse = person.wives || person.husbands;
    const isExpanded = expandedSons[person.id];

    return (
      <div key={person.id} className="nested-person">
        {renderPersonCard(person, !hasSpouse)}
        {hasSpouse && isExpanded && (
          <div className="nested-spouses">
            {person.wives && person.wives.map(spouse => (
              <div key={spouse.id} className="nested-spouse-card">
                <div className="nested-spouse-header">
                  <strong>{spouse.name}</strong>
                  <span className="wife-subtitle"> - {spouse.title}</span>
                </div>
                <div className="nested-spouse-actions">
                  <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: spouse.id }); setShowAddForm(true); }}>+ Child</button>
                  <button className="btn-sm btn-edit" onClick={() => openEditForm(spouse)}>✎</button>
                  <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(spouse)}>✕</button>
                </div>
                {spouse.children && spouse.children.length > 0 && (
                  <div className="nested-children">
                    {spouse.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => 
                      renderPersonWithSpouses(child)
                    )}
                  </div>
                )}
              </div>
            ))}
            {person.husbands && person.husbands.map(spouse => (
              <div key={spouse.id} className="nested-spouse-card">
                <div className="nested-spouse-header">
                  <strong>{spouse.name}</strong>
                  <span className="wife-subtitle"> - {spouse.title}</span>
                </div>
                <div className="nested-spouse-actions">
                  <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: spouse.id }); setShowAddForm(true); }}>+ Child</button>
                  <button className="btn-sm btn-edit" onClick={() => openEditForm(spouse)}>✎</button>
                  <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(spouse)}>✕</button>
                </div>
                {spouse.children && spouse.children.length > 0 && (
                  <div className="nested-children">
                    {spouse.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => 
                      renderPersonWithSpouses(child)
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };`;

if (content.includes(oldCard)) {
    content = content.replace(oldCard, newCard);
    console.log('✓ renderPersonCard and renderPersonWithSpouses updated');
} else {
    console.log('✗ Could not find renderPersonCard');
}

// 2. Replace the grandchildren rendering to use the recursive function
const oldGrandchild = `                {wife.children && wife.children.length > 0 && (
                  <div className="grandchildren-grid">
                    {wife.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => {
                      const hasGrandSpouse = child.wives || child.husbands;
                      return (
                        <div key={child.id} className="grandchild-container">
                          {renderPersonCard(child, !hasGrandSpouse)}
                          {hasGrandSpouse && expandedSons[child.id] && (
                            <div className="great-grandchildren">
                              {child.wives && child.wives.map(gwife => (
                                <div key={gwife.id} className="great-grand-wife">
                                  <strong>{gwife.name}</strong> ({gwife.title})
                                  {gwife.children && gwife.children.length > 0 && (
                                    <div className="great-grandchildren-list">
                                      {gwife.children.map(gc => renderPersonCard(gc, false))}
                                    </div>
                                  )}
                                </div>
                              ))}
                              {child.husbands && child.husbands.map(ghusb => (
                                <div key={ghusb.id} className="great-grand-husband">
                                  <strong>{ghusb.name}</strong> ({ghusb.title})
                                  {ghusb.children && ghusb.children.length > 0 && (
                                    <div className="great-grandchildren-list">
                                      {ghusb.children.map(gc => renderPersonCard(gc, false))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}`;

const newGrandchild = `                {wife.children && wife.children.length > 0 && (
                  <div className="grandchildren-grid">
                    {wife.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => 
                      renderPersonWithSpouses(child)
                    )}
                  </div>
                )}`;

if (content.includes(oldGrandchild)) {
    content = content.replace(oldGrandchild, newGrandchild);
    console.log('✓ Grandchild rendering now uses recursive function');
} else {
    console.log('✗ Could not find grandchild rendering section');
    // Try partial match
    if (content.includes('renderPersonWithSpouses')) {
        console.log('  But recursive function already exists');
    }
}

// Write back
fs.writeFileSync('src/App.js', content, 'utf8');
console.log('✓ Done');
