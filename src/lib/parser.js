/**
 * Parse numbers from string of data. Numbers are \n seperated into lines.
 * @param {string} input String with data
 * @returns {number[]} Array of parsed numbers from the data, empty if no numbers
 */
export function parse(input) {
  if (typeof input !== 'string') {
    return [];
  }

  const split = input.split(',');

  const mapped = split
    .map((i) => {
      const formatted = i.replace(/\./g, '').replace(',', '.');
      const parsed = Number.parseFloat(formatted, 10);

      if (
        !Number.isNaN(parsed) &&
        // Make sure the string and the number are the same after parsing
        // parseFloat('1a') will return `1` but that's not valid
        formatted === parsed.toString()
      ) {
        return parsed;
      }

      // Is it in scientific notation? e and E are both valid
      if (i.toLowerCase().indexOf('e') >= 0) {
        const num = Number(i);

        if (!Number.isNaN(num)) {
          return num;
        }
      }

      // Is it BigInt? (The BigInt test set was missing from given data!)
      // TODO

      return null;
    })
    .filter(Boolean);

  return mapped;
}
