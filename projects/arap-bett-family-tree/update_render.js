const fs = require('fs');
let content = fs.readFileSync('src/App.js', 'utf8');

// 1. Update renderPersonCard to check for husbands too
const oldRenderCard = `  const renderPersonCard = (person, showWifeBtn = true) => {
    const isMale = person.type === 'patriarch' || person.gender === 'male' || (person.title && person.title.includes('Son'));

    return (
      <div key={person.id} className={'person-card ' + (isMale ? 'male' : 'female')}>
        <div className="person-name" onClick={() => setSelectedPerson(person)}>{person.name}</div>
        {person.title && <div className="person-title">{person.title}</div>}
        {person.location && <div className="person-location">📍 {person.location}</div>}
        <div className="person-actions">
          {showWifeBtn && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'wife', parentId: person.id }); setShowAddForm(true); }}>+ Wife</button>}
          <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: person.id }); setShowAddForm(true); }}>+ Child</button>
          <button className="btn-sm btn-edit" onClick={() => openEditForm(person)}>✎</button>
          <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(person)}>✕</button>
        </div>
      </div>
    );
  };`;

const newRenderCard = `  const renderPersonCard = (person, showWifeBtn = true) => {
    const isMale = person.type === 'patriarch' || person.gender === 'male' || (person.title && person.title.includes('Son'));
    const hasSpouse = person.wives || person.husbands;

    return (
      <div key={person.id} className={'person-card ' + (isMale ? 'male' : 'female')}>
        <div className="person-name" onClick={() => setSelectedPerson(person)}>{person.name}</div>
        {person.title && <div className="person-title">{person.title}</div>}
        {person.location && <div className="person-location">📍 {person.location}</div>}
        <div className="person-actions">
          {showWifeBtn && !person.husbands && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'wife', parentId: person.id }); setShowAddForm(true); }}>+ Wife</button>}
          {showWifeBtn && !person.wives && !person.husbands && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: person.id }); setShowAddForm(true); }}>+ Child</button>}
          {showWifeBtn && person.husbands && <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: person.id }); setShowAddForm(true); }}>+ Child</button>}
          {hasSpouse && (
            <button className="btn-sm expand-btn" onClick={() => toggleExpandSon(person.id)}>
              {expandedSons[person.id] ? '▲' : '▼'}
            </button>
          )}
          <button className="btn-sm btn-edit" onClick={() => openEditForm(person)}>✎</button>
          <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(person)}>✕</button>
        </div>
      </div>
    );
  };`;

if (content.includes(oldRenderCard)) {
    content = content.replace(oldRenderCard, newRenderCard);
    console.log('✓ renderPersonCard updated');
} else {
    console.log('✗ Could not find renderPersonCard to update');
}

// 2. Update renderSonDetails to show grandchildren with spouses
const oldGrandchildRender = `                {wife.children && wife.children.length > 0 && (
                  <div className="grandchildren-grid">
                    {wife.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => renderPersonCard(child, false))}
                  </div>
                )}`;

const newGrandchildRender = `                {wife.children && wife.children.length > 0 && (
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

if (content.includes(oldGrandchildRender)) {
    content = content.replace(oldGrandchildRender, newGrandchildRender);
    console.log('✓ Grandchild rendering updated');
} else {
    console.log('✗ Could not find grandchild rendering section');
}

// 3. Also update the other grandchildren rendering (the one with renderPersonCard(child, true))
const oldDirectRender = `                            return renderPersonCard(child, true);`;
const newDirectRender = `                            return renderPersonCard(child, true);`;

// Write back
fs.writeFileSync('src/App.js', content, 'utf8');
console.log('✓ All updates applied');
