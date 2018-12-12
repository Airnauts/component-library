

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const svgDirectory = './lib/images';
const SVGSpriter = require('svg-sprite');

const files = fs.readdirSync(svgDirectory).map(file => `${svgDirectory}/${file}`);
const config = {
  dest: './.tmp/sprites',
  log: true,
  mode: {
    symbol: {
      inline: true,
    },
  },
  shape: {
    id: {
      separator: '--',
      generator: (name, file) => name.replace('.svg', ''),
      pseudo: '~',
      whitespace: '_',
    },
  },
  svg: {
    rootAttributes: {
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    },
  },
};

const spriter = new SVGSpriter(config);

files.forEach((file) => {
  file = path.resolve(file);
  const stat = fs.lstatSync(file);
  if (stat.isSymbolicLink()) {
    file = fs.readlinkSync(file);
  }

  spriter.add(file, path.basename(file), fs.readFileSync(file));
});

spriter.compile((error, result) => {
  for (const mode in result) {
    for (const resource in result[mode]) {
      mkdirp.sync(path.dirname(result[mode][resource].path));

      let targetFileName = result[mode][resource].path;
      const targetContent = result[mode][resource].contents;
      targetFileName = targetFileName.replace('sprite.symbol.svg', 'sprites.svg');

      fs.writeFileSync(targetFileName, targetContent);
    }
  }
});

fs.createReadStream(`${config.dest}/symbol/svg/sprites.svg`)
  .pipe(fs.createWriteStream('./lib/images/sprite.svg'));
