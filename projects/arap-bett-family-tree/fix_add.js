const fs = require('fs');
let content = fs.readFileSync('src/App.js', 'utf8');

// Fix addChild to also search through husbands
const oldAddChild = `  const addChild = (parentId, childData) => {
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
  };`;

const newAddChild = `  const addChild = (parentId, childData) => {
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
      if (obj.husbands) {
        for (let husband of obj.husbands) {
          if (findAndAddChild(husband)) return true;
          if (husband.children) {
            for (let child of husband.children) {
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
  };`;

if (content.includes(oldAddChild)) {
    content = content.replace(oldAddChild, newAddChild);
    console.log('✓ addChild fixed to search husbands');
} else {
    console.log('✗ Could not find addChild, trying line-based approach');
}

// Also fix addWife to search through husbands
const oldAddWife = `      if (obj.wives) {
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
      return false;`;

const newAddWife = `      if (obj.wives) {
        for (let wife of obj.wives) {
          if (findAndAddWife(wife)) return true;
          if (wife.children) {
            for (let child of wife.children) {
              if (findAndAddWife(child)) return true;
            }
          }
        }
      }
      if (obj.husbands) {
        for (let husband of obj.husbands) {
          if (findAndAddWife(husband)) return true;
          if (husband.children) {
            for (let child of husband.children) {
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
      return false;`;

if (content.includes(oldAddWife)) {
    content = content.replace(oldAddWife, newAddWife);
    console.log('✓ addWife fixed to search husbands');
} else {
    console.log('✗ Could not find addWife husbands section');
}

fs.writeFileSync('src/App.js', content, 'utf8');
console.log('✓ Done');
