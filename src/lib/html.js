function template(title, content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="../public/styles.css">
  </head>
  <body>${content}</body>
</html>`;
}

function statsKey(key) {
  switch (key) {
    case 'sum':
      return 'Summa';
    case 'min':
      return 'Lágmarksgildi';
    case 'max':
      return 'Hámarksgildi';
    case 'range':
      return 'Svið';
    case 'mean':
      return 'Lágmarksgildi';
    case 'variance':
      return 'Frávik';
    case 'median':
      return 'Miðgildi';
    case 'standardDeviation':
      return 'Staðalfrávik';
    default:
      return key;
  }
}

function formatNum(num) {
  if (num === undefined) {
    return 'óskilgreint';
  }

  if (typeof num !== 'number') {
    return '';
  }

  return parseFloat(num).toLocaleString('is');
}

export function stats(result) {
  const entries = Object.entries(result.stats);

  const resultHtml = entries
    .map(
      ([key, value]) => `<dt>${statsKey(key)}</dt><dd>${formatNum(value)}</dd>`
    )
    .join('\n');

  return `<article>
  <h2>Niðurstöður fyrir ${result.title}</h2>
  <section>
    <h3>Töluleg greining</h3>
    <dl>
      ${resultHtml}
    </dl>
  </section>
  <section>
    <h3>Allar tölur</h3>
    <div class="numbers">${result.numbers.map(formatNum).join('\n')}</div>
  </section>
  <p><a href="/">Til baka</a></p>
</article>`;
}

function index(results) {
  const list = results
    .map(
      (result) => `
<li>
  <a href="${result.filename}">${result.title}</a>
  <p>${result.numbers.length} tölur</p>
</li>`
    )
    .join('\n');

  return `<section>
  <h1>Deildir</h1>
  <ul>${list}</ul>
</section>`;
}

export function indexTemplate(results) {
  return template('Deildir', index(results));
}

export function statsTemplate(title, result) {
  return template(title, stats(result));
}
