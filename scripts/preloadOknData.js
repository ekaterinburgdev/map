const fs = require('fs');
const groupBy = require('lodash/groupBy');
const oknObjects = require('../public/ekb-okn-objects.json');
const oknProtect = require('../public/ekb-okn-protect.json');
const oknSecurity = require('../public/ekb-okn-security.json');
const okn = require('../public/ekb-okn.json');

const file = {
    points: Object.entries(groupBy(okn.features, (o) => o.properties.category)).map(
        ([type, items]) => [type, items.length],
    ),
    zones: [
        ['Защитные зоны', oknObjects.features.length],
        ['Зоны охраны ОКН', oknProtect.features.length],
        ['Границы территорий ОКН', oknSecurity.features.length],
    ],
};

fs.writeFileSync('../public/okn-meta.json', JSON.stringify(file));
