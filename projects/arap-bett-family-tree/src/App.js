import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [familyData, setFamilyData] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedSons, setExpandedSons] = useState({});
  const [formData, setFormData] = useState({
    type: '',
    parentId: null,
    name: '',
    gender: 'male',
    order: 1
  });
  const [editData, setEditData] = useState({
    id: null,
    name: '',
    title: '',
    location: '',
    history: '',
    gender: 'male'
  });

  const initialFamilyData = {
    id: 'arap_bett',
    name: 'Arap Bett',
    title: 'Great Great Grandfather',
    type: 'patriarch',
    location: '',
    history: '',
    wives: [
      {
        id: 'wife_1',
        name: '[Name]',
        title: '1st Wife',
        location: '',
        history: '',
        children: []
      },
      {
        id: 'tab_towa',
        name: 'Tab Towa',
        title: '2nd Wife',
        location: '',
        history: '',
        children: [
          {
            id: 'zakayo_cheres',
            name: 'Zakayo Cheres',
            title: '1st Son',
            location: '',
            history: '',
            wives: [
              {
                id: 'obot_musa',
                name: 'Obot Musa',
                title: '1st Wife',
                location: '',
                history: '',
                children: [
                  { id: 'moses_kirui', name: 'Moses Kirui', order: 1, location: '', history: '' },
                  { id: 'andrew_kirui', name: 'Andrew Kirui', order: 2, location: '', history: '' },
                  { id: 'joseph_kirui_cheptenden', name: 'Joseph Kirui (Cheptenden)', order: 3, location: '', history: '' },
                  { id: 'ezekiel_kirui', name: 'Ezekiel Kirui', order: 4, location: '', history: '' },
                  { id: 'samuel_kirui', name: 'Samuel Kirui', order: 5, location: '', history: '' },
                  { id: 'walter_kirui', name: 'Walter Kirui', order: 6, location: '', history: '' }
                ]
              },
              {
                id: 'obot_esther',
                name: "Obot Esther of Ng'esumin",
                title: '2nd Wife',
                location: '',
                history: '',
                children: [
                  { id: 'joseph_kirui_esther', name: 'Joseph Kirui', order: 1, location: '', history: '' },
                  { id: 'johana_kirui', name: 'Johana Kirui', order: 2, location: '', history: '' },
                  { id: 'gilbert_kirui', name: 'Gilbert Kirui', order: 3, location: '', history: '' },
                  { id: 'wesley_kirui', name: 'Wesley Kirui', order: 4, location: '', history: '' },
                  { id: 'edward_kirui', name: 'Edward Kirui', order: 5, location: '', history: '' },
                  { id: 'peter_kirui', name: 'Peter Kirui', order: 6, location: '', history: '' }
                ]
              }
            ]
          },
          {
            id: 'stanley_ngasura',
            name: "Stanley Ng'asura",
            title: '2nd Son',
            location: '',
            history: '',
            wives: [
              {
                id: 'tab_sargok',
                name: 'Tab Sargok',
                title: '1st Wife',
                location: '',
                history: '',
                children: [
                  { id: 'wilson_kowogen', name: 'Wilson Kowoğen', order: 1, location: '', history: '' },
                  { id: 'isaiah_kowogen', name: 'Isaiah Kowoğen', order: 2, location: '', history: '' },
                  { id: 'jonathan_kowogen', name: 'Jonathan Kowoğen', order: 3, location: '', history: '' },
                  { id: 'michael_kowogen', name: 'Michael Kowoğen', order: 4, location: '', history: '' },
                  { id: 'andrew_kowogen', name: 'Andrew Kowoğen', order: 5, location: '', history: '' }
                ]
              },
              {
                id: 'bot_jane',
                name: 'Bot Jane',
                title: '2nd Wife',
                location: '',
                history: '',
                children: [
                  { id: 'james_simotwo', name: 'James Simotwo', order: 1, location: '', history: '' },
                  { id: 'samuel_simotwo', name: 'Samuel Simotwo', order: 2, location: '', history: '' },
                  { id: 'david_simotwo', name: 'David Simotwo', order: 3, location: '', history: '' },
                  { id: 'richard_simotwo', name: 'Richard Simotwo', order: 4, location: '', history: '' },
                  { id: 'blank_simotwo', name: '[Blank]', order: 5, location: '', history: '' },
                  { id: 'julius_simotwo', name: 'Julius Simotwo', order: 6, location: '', history: '' }
                ]
              }
            ]
          },
          {
            id: 'william_ngasura',
            name: "William Ng'asura",
            title: '3rd Son',
            location: '',
            history: '',
            wives: [
              {
                id: 'tab_randich',
                name: 'Tab Randich',
                title: '1st Wife',
                location: '',
                history: '',
                children: [
                  { id: 'philip_tonui', name: 'Philip Tonui', order: 1, location: '', history: '' },
                  { id: 'jonathan_tonui', name: 'Jonathan Tonui', order: 2, location: '', history: '' }
                ]
              },
              {
                id: 'sophia_chepkirui',
                name: 'Sophia Chepkirui',
                title: '2nd Wife',
                location: '',
                history: '',
                children: [
                  { id: 'paul_tonui', name: 'Paul Tonui', order: 1, location: '', history: '' },
                  { id: 'matthew_tonui', name: 'Matthew Tonui', order: 2, location: '', history: '' },
                  { id: 'charles_tonui', name: 'Charles Tonui', order: 3, location: '', history: '' },
                  { id: 'nelson_tonui', name: 'Nelson Tonui', order: 4, location: '', history: '' }
                ]
              },
              {
                id: 'jane_ngasura',
                name: "Jane Ng'asura",
                title: '3rd Wife',
                location: '',
                history: '',
                children: [
                  { id: 'zakayo_tonui', name: 'Zakayo Tonui', order: 1, location: '', history: '' },
                  { id: 'richard_tonui', name: 'Richard Tonui', order: 2, location: '', history: '' },
                  { id: 'robert_tonui', name: 'Robert Tonui', order: 3, location: '', history: '' },
                  { id: 'kenneth_tonui', name: 'Kenneth Tonui', order: 4, location: '', history: '' },
                  { id: 'vincent_tonui', name: 'Vincent Tonui', order: 5, location: '', history: '' },
                  { id: 'patrick_tonui', name: 'Patrick Tonui', order: 6, location: '', history: '' },
                  { id: 'evans_kiprop_tonui', name: 'Evans Kiprop Tonui', order: 7, location: '', history: '' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'wife_3',
        name: '[Name]',
        title: '3rd Wife',
        location: '',
        history: '',
        children: []
      },
      {
        id: 'wife_4',
        name: '[Name]',
        title: '4th Wife',
        location: '',
        history: '',
        children: []
      },
      {
        id: 'wife_5',
        name: '[Name]',
        title: '5th Wife',
        location: '',
        history: '',
        children: []
      }
    ]
  };

  useEffect(() => {
    const savedData = localStorage.getItem('familyTreeData');
    if (savedData) {
      setFamilyData(JSON.parse(savedData));
    } else {
      setFamilyData(initialFamilyData);
      localStorage.setItem('familyTreeData', JSON.stringify(initialFamilyData));
    }
  }, []);

  const showSaveNotification = (message) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const saveData = (data) => {
    setFamilyData(data);
    localStorage.setItem('familyTreeData', JSON.stringify(data));
    showSaveNotification('✓ Changes saved!');
  };

  const toggleExpandSon = (sonId) => {
    setExpandedSons(prev => ({
      ...prev,
      [sonId]: !prev[sonId]
    }));
  };

  const deletePerson = (personId) => {
    const newData = JSON.parse(JSON.stringify(familyData));
    
    const findAndDelete = (obj) => {
      if (obj.wives) {
        for (let i = obj.wives.length - 1; i >= 0; i--) {
          if (obj.wives[i].id === personId) {
            obj.wives.splice(i, 1);
            return true;
          }
          if (obj.wives[i].children) {
            for (let j = obj.wives[i].children.length - 1; j >= 0; j--) {
              if (obj.wives[i].children[j].id === personId) {
                obj.wives[i].children.splice(j, 1);
                return true;
              }
              if (findAndDelete(obj.wives[i].children[j])) return true;
            }
          }
        }
      }
      if (obj.children) {
        for (let i = obj.children.length - 1; i >= 0; i--) {
          if (obj.children[i].id === personId) {
            obj.children.splice(i, 1);
            return true;
          }
          if (findAndDelete(obj.children[i])) return true;
        }
      }
      return false;
    };

    if (personId === 'arap_bett') {
      showSaveNotification('Cannot delete Arap Bett!');
      return;
    }

    findAndDelete(newData);
    saveData(newData);
    setSelectedPerson(null);
    setDeleteConfirm(null);
  };

  const updatePerson = (personId, updatedData) => {
    const newData = JSON.parse(JSON.stringify(familyData));
    
    const findAndUpdate = (obj) => {
      if (obj.id === personId) {
        obj.name = updatedData.name;
        obj.location = updatedData.location;
        obj.history = updatedData.history;
        if (updatedData.title) obj.title = updatedData.title;
        if (updatedData.gender) obj.gender = updatedData.gender;
        return true;
      }
      if (obj.wives) {
        for (let wife of obj.wives) {
          if (findAndUpdate(wife)) return true;
          if (wife.children) {
            for (let child of wife.children) {
              if (findAndUpdate(child)) return true;
            }
          }
        }
      }
      if (obj.children) {
        for (let child of obj.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      return false;
    };

    findAndUpdate(newData);
    saveData(newData);
    setSelectedPerson(null);
    setShowEditForm(false);
  };

  const addWife = (parentId, wifeData) => {
    const newData = JSON.parse(JSON.stringify(familyData));
    
    const findAndAddWife = (obj) => {
      if (obj.id === parentId) {
        if (!obj.wives) obj.wives = [];
        obj.wives.push({
          id: 'wife_' + Date.now(),
          ...wifeData,
          location: '',
          history: '',
          children: []
        });
        return true;
      }
      if (obj.wives) {
        for (let wife of obj.wives) {
          if (findAndAddWife(wife)) return true;
          if (wife.children) {
            for (let child of wife.children) {
              if (findAndAddWife(child)) return true;
            }
          }
        }
      }
      if (obj.children) {
        for (let child of obj.children) {
          if (findAndAddWife(child)) return true;
        }
      }
      return false;
    };

    findAndAddWife(newData);
    saveData(newData);
  };

  const addChild = (parentId, childData) => {
    const newData = JSON.parse(JSON.stringify(familyData));
    
    const findAndAddChild = (obj) => {
      if (obj.id === parentId) {
        if (!obj.children) obj.children = [];
        obj.children.push({
          id: 'child_' + Date.now(),
          ...childData,
          location: '',
          history: ''
        });
        return true;
      }
      if (obj.wives) {
        for (let wife of obj.wives) {
          if (findAndAddChild(wife)) return true;
          if (wife.children) {
            for (let child of wife.children) {
              if (findAndAddChild(child)) return true;
            }
          }
        }
      }
      if (obj.children) {
        for (let child of obj.children) {
          if (findAndAddChild(child)) return true;
        }
      }
      return false;
    };

    findAndAddChild(newData);
    saveData(newData);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formData.type === 'wife') {
      addWife(formData.parentId, { name: formData.name, title: formData.title || 'Wife' });
    } else {
      addChild(formData.parentId, { name: formData.name, gender: formData.gender, order: formData.order });
    }
    setShowAddForm(false);
    setFormData({ type: '', parentId: null, name: '', gender: 'male', order: 1 });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updatePerson(editData.id, editData);
  };

  const openEditForm = (person) => {
    setEditData({
      id: person.id,
      name: person.name || '',
      title: person.title || '',
      location: person.location || '',
      history: person.history || '',
      gender: person.gender || 'male'
    });
    setShowEditForm(true);
  };

  const renderPersonCard = (person, showWifeBtn = true) => {
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
  };

  const renderSonDetails = (son) => {
    const isExpanded = expandedSons[son.id];
    
    return (
      <div key={son.id} className="son-container">
        <div className="son-header">
          {renderPersonCard(son, true)}
          {son.wives && son.wives.length > 0 && (
            <button 
              className="expand-btn"
              onClick={() => toggleExpandSon(son.id)}
            >
              {isExpanded ? '▲ Hide' : '▼ Show'} Wives & Children
            </button>
          )}
        </div>
        
        {isExpanded && son.wives && (
          <div className="son-wives-grid">
            {son.wives.map(wife => (
              <div key={wife.id} className="grand-wife-card">
                <div className="grand-wife-header">
                  <strong>{wife.name}</strong>
                  <span className="wife-subtitle"> - {wife.title}</span>
                </div>
                <div className="grand-wife-actions">
                  <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: wife.id }); setShowAddForm(true); }}>+ Child</button>
                  <button className="btn-sm btn-edit" onClick={() => openEditForm(wife)}>✎</button>
                  <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(wife)}>✕</button>
                </div>
                {wife.children && wife.children.length > 0 && (
                  <div className="grandchildren-grid">
                    {wife.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => renderPersonCard(child, false))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const exportData = () => {
    const dataStr = JSON.stringify(familyData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'arap_bett_family_tree.json');
    linkElement.click();
    showSaveNotification('Data exported!');
  };

  const importData = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setFamilyData(importedData);
        localStorage.setItem('familyTreeData', JSON.stringify(importedData));
        showSaveNotification('Data imported!');
      } catch (error) {
        alert('Error importing data.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const resetData = () => {
    if (window.confirm('Reset all data?')) {
      setFamilyData(initialFamilyData);
      localStorage.setItem('familyTreeData', JSON.stringify(initialFamilyData));
      setExpandedSons({});
      showSaveNotification('Data reset!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Family Tree of Arap Bett</h1>
        <p className="subtitle">Great Great Grandfather - 5 Wives</p>
        <div className="header-actions">
          <button onClick={exportData} className="btn-export">📥 Export</button>
          <label className="btn-import">
            📤 Import
            <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          </label>
          <button onClick={resetData} className="btn-reset">🔄 Reset</button>
        </div>
      </header>

      {saveMessage && <div className="save-notification">{saveMessage}</div>}

      <main className="family-tree">
        {familyData && (
          <>
            <div className="patriarch-section">
              <h3>👑 Patriarch</h3>
              <div className="children-grid">
                {renderPersonCard(familyData)}
              </div>
            </div>

            <div className="wives-section">
              <h3>👰 Wives of Arap Bett</h3>
              <div className="wives-grid">
                {familyData.wives && familyData.wives.map(wife => (
                  <div key={wife.id} className="wife-card">
                    <div className="wife-card-header">
                      <h4>{wife.name}</h4>
                      <div className="wife-title">{wife.title}</div>
                      {wife.location && <div className="wife-location">📍 {wife.location}</div>}
                    </div>
                    <div className="wife-card-body">
                      <div className="wife-actions">
                        <button className="btn-sm" onClick={() => { setFormData({ ...formData, type: 'child', parentId: wife.id }); setShowAddForm(true); }}>+ Child</button>
                        <button className="btn-sm btn-edit" onClick={() => openEditForm(wife)}>✎ Edit</button>
                        <button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(wife)}>✕ Delete</button>
                      </div>
                      
                      {wife.children && wife.children.length > 0 ? (
                        <div className="sons-container">
                          {wife.children.sort((a, b) => (a.order || 0) - (b.order || 0)).map(child => {
                            if (child.wives && child.wives.length > 0) {
                              return renderSonDetails(child);
                            }
                            return renderPersonCard(child, true);
                          })}
                        </div>
                      ) : (
                        <p className="no-children">No children added yet</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add {formData.type === 'wife' ? 'Wife' : 'Child'}</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter full name" />
              </div>
              {formData.type === 'wife' && (
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., 1st Wife" />
                </div>
              )}
              {formData.type === 'child' && (
                <>
                  <div className="form-group">
                    <label>Gender:</label>
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Birth Order:</label>
                    <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} min="1" />
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-submit">Add</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit: {editData.name}</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" value={editData.title || ''} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>📍 Location:</label>
                <input type="text" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} placeholder="e.g., Eldoret, Kenya" />
              </div>
              <div className="form-group">
                <label>📜 History:</label>
                <textarea value={editData.history} onChange={(e) => setEditData({ ...editData, history: e.target.value })} rows="4" placeholder="Add history, occupation, etc." />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit">Save</button>
                <button type="button" onClick={() => setShowEditForm(false)} className="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>⚠ Delete {deleteConfirm.name}?</h3>
            <p className="delete-warning">This will also delete all wives and children!</p>
            <div className="form-actions">
              <button onClick={() => deletePerson(deleteConfirm.id)} className="btn-delete-confirm">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedPerson && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedPerson.name}</h3>
            {selectedPerson.title && <p><strong>Title:</strong> {selectedPerson.title}</p>}
            {selectedPerson.location && <div className="detail-section"><h4>📍 Location</h4><p>{selectedPerson.location}</p></div>}
            {selectedPerson.history && <div className="detail-section"><h4>📜 History</h4><p className="history-text">{selectedPerson.history}</p></div>}
            {selectedPerson.wives && selectedPerson.wives.length > 0 && (
              <div className="detail-section">
                <h4>👰 Wives ({selectedPerson.wives.length})</h4>
                {selectedPerson.wives.map(w => <p key={w.id}>• {w.name} - {w.title}</p>)}
              </div>
            )}
            {selectedPerson.children && selectedPerson.children.length > 0 && (
              <div className="detail-section">
                <h4>👶 Children ({selectedPerson.children.length})</h4>
                {selectedPerson.children.map(c => <p key={c.id}>• {c.name}</p>)}
              </div>
            )}
            <div className="form-actions">
              <button onClick={() => openEditForm(selectedPerson)} className="btn-submit">✎ Edit</button>
              <button onClick={() => setSelectedPerson(null)} className="btn-cancel">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
