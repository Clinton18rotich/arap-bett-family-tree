const fs = require('fs');

// Read current App.js
let lines = fs.readFileSync('src/App.js', 'utf8').split('\n');

// Find Kirongosi section start
let kirongosiStart = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("id: 'kirongosi'")) {
        kirongosiStart = i - 1; // Include the opening {
        break;
    }
}

// Find Paul Langok section start (end of Kirongosi)
let paulStart = -1;
for (let i = kirongosiStart; i < lines.length; i++) {
    if (lines[i].includes("id: 'paul_langok'")) {
        paulStart = i - 1; // Include the opening {
        break;
    }
}

if (kirongosiStart > 0 && paulStart > kirongosiStart) {
    const newKirongosi = `          {
            id: 'kirongosi',
            name: 'Kirongosi',
            title: '3rd Son',
            location: '',
            history: '',
            wives: [
              {
                id: 'obot_joel',
                name: 'Obot Joel',
                title: '1st Wife',
                location: '',
                history: '',
                children: [
                  {
                    id: 'joel_ki',
                    name: 'Joel',
                    title: '1st Son',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'joel_wife1',
                        name: '[Wife]',
                        title: '1st Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'wesley_j', name: 'Wesley', order: 1, location: '', history: '' },
                          { id: 'lucy_chelangat', name: "Lucy Chelang'at", order: 2, location: '', history: '' },
                          { id: 'benard_j', name: 'Benard', order: 3, location: '', history: '' },
                          { id: 'chepkoech_j', name: 'Chepkoech', order: 4, location: '', history: '' },
                          { id: 'chepkirui_j', name: 'Chepkirui', order: 5, location: '', history: '' },
                          { id: 'chepngeno_j', name: "Chepng'eno", order: 6, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'richard_ki',
                    name: 'Richard',
                    title: '2nd Son',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'philipina',
                        name: 'Philipina',
                        title: 'Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'cherono_r', name: 'Cherono', order: 1, location: '', history: '' },
                          { id: 'chepkoech_r', name: 'Chepkoech', order: 2, location: '', history: '' },
                          { id: 'cherotich_r', name: 'Cherotich', order: 3, location: '', history: '' },
                          { id: 'gilbert_r', name: 'Gilbert', order: 4, location: '', history: '' },
                          { id: 'kiprotich_r', name: 'Kiprotich', order: 5, location: '', history: '' },
                          { id: 'chebet_r', name: 'Chebet', order: 6, location: '', history: '' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 'rachael',
                name: 'Rachael',
                title: '2nd Wife',
                location: '',
                history: '',
                children: [
                  {
                    id: 'philip_ngeno',
                    name: "Philip Ng'eno",
                    title: '1st Son',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'selina',
                        name: 'Selina',
                        title: '1st Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'sheila_tonui', name: 'Sheila Tonui', order: 1, location: '', history: '' },
                          { id: 'robert_ngasura', name: "Robert Ng'asura", order: 2, location: '', history: '' },
                          { id: 'nickson_kebeney', name: 'Nickson Kebeney', order: 3, location: '', history: '' },
                          { id: 'patrick_byegon', name: 'Patrick Byegon', order: 4, location: '', history: '' },
                          { id: 'kiprono_kibet', name: 'Kiprono & Kibet (Twins)', order: 5, location: '', history: '' },
                          { id: 'brian_p', name: 'Brian', order: 6, location: '', history: '' }
                        ]
                      },
                      {
                        id: 'beatrice',
                        name: 'Beatrice',
                        title: '2nd Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'bismack_p', name: 'Bismack', order: 1, location: '', history: '' },
                          { id: 'anita_p', name: 'Anita', order: 2, location: '', history: '' },
                          { id: 'clinton_p', name: 'Clinton', order: 3, location: '', history: '' },
                          { id: 'emmanuel_p', name: 'Emmanuel', order: 4, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'david_ngeno',
                    name: "David Ng'eno",
                    title: '2nd Son',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'nancy',
                        name: 'Nancy',
                        title: 'Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'priscah_chepkirui', name: 'Priscah Chepkirui', order: 1, location: '', history: '' },
                          { id: 'shadrack_d', name: 'Shadrack', order: 2, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'decla_chekwony',
                    name: 'Decla Chekwony',
                    title: '3rd Child',
                    location: '',
                    history: '',
                    husbands: [
                      {
                        id: 'joseph_decla',
                        name: 'Joseph',
                        title: 'Husband',
                        location: '',
                        history: '',
                        children: [
                          { id: 'joyce_chepkoech', name: 'Joyce Chepkoech', order: 1, location: '', history: '' },
                          { id: 'betty_d', name: 'Betty', order: 2, location: '', history: '' },
                          { id: 'hillary_d', name: 'Hillary', order: 3, location: '', history: '' },
                          { id: 'geoffrey_d', name: 'Geoffrey', order: 4, location: '', history: '' },
                          { id: 'jackline_d', name: 'Jackline', order: 5, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'betty_cheruiyot',
                    name: 'Betty Cheruiyot',
                    title: '4th Child',
                    location: '',
                    history: '',
                    husbands: [
                      {
                        id: 'wesley_cheruiyot',
                        name: 'Wesley Cheruiyot',
                        title: 'Husband',
                        location: '',
                        history: '',
                        children: [
                          { id: 'chepkoech_b', name: 'Chepkoech', order: 1, location: '', history: '' },
                          { id: 'elijah_b', name: 'Elijah', order: 2, location: '', history: '' },
                          { id: 'chepkorir_b', name: 'Chepkorir', order: 3, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'christine_byegon',
                    name: 'Christine Byegon',
                    title: '5th Child',
                    location: '',
                    history: '',
                    husbands: [
                      {
                        id: 'david_byegon',
                        name: 'David Byegon',
                        title: 'Husband',
                        location: '',
                        history: '',
                        children: [
                          { id: 'brian_c', name: 'Brian', order: 1, location: '', history: '' },
                          { id: 'brandon_c', name: 'Brandon', order: 2, location: '', history: '' },
                          { id: 'brington_c', name: 'Brington', order: 3, location: '', history: '' },
                          { id: 'kiplangat_c', name: "Kiplang'at (Twin)", order: 4, location: '', history: '' },
                          { id: 'kiprop_c', name: 'Kiprop', order: 5, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'paul_ngeno',
                    name: "Paul Ng'eno",
                    title: '6th Child',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'agnes',
                        name: 'Agnes',
                        title: 'Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'kipchumba_p', name: 'Kipchumba', order: 1, location: '', history: '' },
                          { id: 'cherop_p', name: 'Cherop', order: 2, location: '', history: '' },
                          { id: 'blank_p', name: '[Blank]', order: 3, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'margaret_ki',
                    name: 'Margaret',
                    title: '7th Child',
                    location: '',
                    history: '',
                    husbands: [
                      {
                        id: 'margaret_husband',
                        name: '[Husband]',
                        title: 'Husband',
                        location: '',
                        history: '',
                        children: [
                          { id: 'okari_m', name: 'Okari', order: 1, location: '', history: '' },
                          { id: 'kerubo_m', name: 'Kerubo', order: 2, location: '', history: '' },
                          { id: 'blank_m', name: '[Blank]', order: 3, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'moses_ngeno',
                    name: 'Moses',
                    title: '8th Child',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'betty_moses',
                        name: 'Betty',
                        title: 'Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'carlos_kiprotich', name: 'Carlos Kiprotich', order: 1, location: '', history: '' },
                          { id: 'maurine_cheptoo', name: 'Maurine Cheptoo', order: 2, location: '', history: '' },
                          { id: 'abigail_cherono', name: 'Abigail Cherono', order: 3, location: '', history: '' },
                          { id: 'jayden_kiprop', name: 'Jayden Kiprop', order: 4, location: '', history: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'joyce_ngetich',
                    name: "Joyce Ng'etich",
                    title: '9th Child',
                    location: '',
                    history: '',
                    husbands: [
                      {
                        id: 'geoffrey_ngetich',
                        name: "Geoffrey Ng'etich",
                        title: 'Husband',
                        location: '',
                        history: '',
                        children: []
                      }
                    ]
                  },
                  {
                    id: 'charles_ngeno',
                    name: "Charles Ng'eno",
                    title: '10th Child',
                    location: '',
                    history: '',
                    wives: [
                      {
                        id: 'margaret_charles',
                        name: 'Margaret',
                        title: 'Wife',
                        location: '',
                        history: '',
                        children: [
                          { id: 'kipkoech_c', name: 'Kipkoech', order: 1, location: '', history: '' },
                          { id: 'kipngetich_c', name: "Kipng'etich", order: 2, location: '', history: '' },
                          { id: 'kiptoo_c', name: 'Kiptoo', order: 3, location: '', history: '' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 'alphina',
                name: 'Alphina',
                title: '3rd Wife',
                location: '',
                history: '',
                children: [
                  { id: 'ridah_a', name: 'Ridah', order: 1, location: '', history: '' },
                  { id: 'robert_a', name: 'Robert', order: 2, location: '', history: '' },
                  { id: 'catherine_a', name: 'Catherine', order: 3, location: '', history: '' },
                  { id: 'janeth_a', name: 'Janeth', order: 4, location: '', history: '' },
                  { id: 'vincent_a', name: 'Vincent', order: 5, location: '', history: '' },
                  { id: 'gilbert_a', name: 'Gilbert', order: 6, location: '', history: '' },
                  { id: 'walter_a', name: 'Walter', order: 7, location: '', history: '' },
                  { id: 'titus_a', name: 'Titus', order: 8, location: '', history: '' }
                ]
              }
            ]
          },`;

    // Splice: replace the old Kirongosi section with the new one
    lines.splice(kirongosiStart, paulStart - kirongosiStart, newKirongosi);
    
    // Write back
    fs.writeFileSync('src/App.js', lines.join('\n'), 'utf8');
    console.log('✓ Kirongosi updated with complete family tree!');
} else {
    console.log('✗ Could not find Kirongosi section');
    console.log('kirongosiStart:', kirongosiStart, 'paulStart:', paulStart);
}
