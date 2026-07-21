/**
 * Excel utility — wraps exceljs for import/export operations.
 * Replaces the deprecated xlsx (SheetJS) package.
 */
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// ─── Workbook ────────────────────────────────────────────

export function createWorkbook() {
  return new ExcelJS.Workbook();
}

// ─── Writing sheets ──────────────────────────────────────

export function addJsonSheet(wb, data, sheetName, columns) {
  const ws = wb.addWorksheet(sheetName);
  if (!data || data.length === 0) return ws;
  const keys = Object.keys(data[0]);
  ws.columns = keys.map((k, i) => ({
    header: k,
    key: k,
    width: (columns && columns[i] && columns[i].wch) || 20,
  }));
  data.forEach((row) => ws.addRow(row));
  return ws;
}

export function addAoaSheet(wb, data, sheetName) {
  const ws = wb.addWorksheet(sheetName);
  if (!data || data.length === 0) return ws;
  data.forEach((row) => ws.addRow(row));
  return ws;
}

// ─── Download ────────────────────────────────────────────

export async function downloadWorkbook(wb, filename) {
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), filename);
}

export async function workbookToBuffer(wb) {
  return wb.xlsx.writeBuffer();
}

// ─── Reading ─────────────────────────────────────────────

export async function readWorkbook(buf) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  return wb;
}

export function sheetToJson(ws, opts = {}) {
  const defval = opts.defval !== undefined ? opts.defval : '';
  const rows = [];
  const headers = [];
  ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell({ includeEmpty: false }, (cell) => {
        headers.push(String(cell.value ?? ''));
      });
      return;
    }
    const obj = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const key = headers[colNumber - 1] || col_ + colNumber;
      obj[key] = cell.value !== null && cell.value !== undefined ? cell.value : defval;
    });
    rows.push(obj);
  });
  return rows;
}

// ─── Helpers ─────────────────────────────────────────────

const colToNum = (c) => c.split('').reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1;

const numToCol = (n) => {
  let s = '';
  let nn = n;
  do {
    s = String.fromCharCode(65 + (nn % 26)) + s;
    nn = Math.floor(nn / 26) - 1;
  } while (nn >= 0);
  return s;
};

// ─── Virtual sheet (mimics XLSX sheet for compatibility) ─

function makeVirtualSheet(type, data, keys) {
  const sheet = { _type: type, _data: data, _keys: keys || [], _cols: null, _cellStyles: {} };

  Object.defineProperty(sheet, '!cols', {
    get() { return sheet._cols; },
    set(v) { sheet._cols = v; },
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(sheet, '!ref', {
    get() {
      const rowCount = sheet._data.length;
      const colCount = sheet._keys.length || (sheet._data[0] ? Object.keys(sheet._data[0]).length : 0);
      if (rowCount === 0) return 'A1';
      return 'A1:' + numToCol(colCount - 1) + (rowCount + 1);
    },
    enumerable: true,
    configurable: true,
  });

  return new Proxy(sheet, {
    get(target, prop) {
      if (typeof prop === 'string' && /^[A-Z]+\d+$/.test(prop)) {
        if (!target._cellStyles[prop]) target._cellStyles[prop] = {};
        return target._cellStyles[prop];
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (typeof prop === 'string' && /^[A-Z]+\d+$/.test(prop)) {
        target._cellStyles[prop] = value;
        return true;
      }
      target[prop] = value;
      return true;
    },
  });
}

function materializeSheet(wb, vs, name) {
  if (vs._type === 'json') {
    const ws = wb.addWorksheet(name);
    const data = vs._data;
    if (!data || data.length === 0) return ws;
    const keys = vs._keys.length ? vs._keys : Object.keys(data[0]);
    const colWidths = vs._cols || [];
    ws.columns = keys.map((k, i) => ({
      header: k,
      key: k,
      width: (colWidths[i] && colWidths[i].wch) || 20,
    }));
    data.forEach((row) => ws.addRow(row));
    Object.entries(vs._cellStyles).forEach(([addr, style]) => {
      if (!style || !style.s) return;
      const match = addr.match(/^([A-Z]+)(\d+)$/);
      if (!match) return;
      const col = colToNum(match[1]) + 1;
      const row = parseInt(match[2]);
      const cell = ws.getCell(row, col);
      if (style.s.font) cell.font = style.s.font;
      if (style.s.fill) cell.fill = style.s.fill;
    });
    return ws;
  } else if (vs._type === 'aoa') {
    const ws = wb.addWorksheet(name);
    vs._data.forEach((row) => ws.addRow(row));
    return ws;
  }
}

// ─── XLSX-compatible API ─────────────────────────────────

export const XLSXCompat = {
  utils: {
    book_new: () => new ExcelJS.Workbook(),

    json_to_sheet(data) {
      if (!data || data.length === 0) return makeVirtualSheet('json', [], []);
      return makeVirtualSheet('json', data, Object.keys(data[0]));
    },

    aoa_to_sheet(data) {
      return makeVirtualSheet('aoa', data || [], []);
    },

    book_append_sheet(wb, vs, name) {
      if (!wb || !vs) return;
      materializeSheet(wb, vs, name);
    },

    sheet_to_json(ws, opts) {
      return sheetToJson(ws, opts);
    },

    decode_range(ref) {
      if (!ref) return { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
      const match = ref.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
      if (!match) return { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
      return {
        s: { r: parseInt(match[2]) - 1, c: colToNum(match[1]) },
        e: { r: parseInt(match[4]) - 1, c: colToNum(match[3]) },
      };
    },

    encode_cell({ r, c }) {
      return numToCol(c) + (r + 1);
    },
  },

  async writeFile(wb, filename) {
    await downloadWorkbook(wb, filename);
  },

  async write(wb, opts = {}) {
    const buf = await workbookToBuffer(wb);
    if (opts.type === 'array') return new Uint8Array(buf);
    return buf;
  },

  async read(buf, opts = {}) {
    const wb = await readWorkbook(buf);
    return {
      Sheets: wb.worksheets.reduce((acc, ws) => { acc[ws.name] = ws; return acc; }, {}),
      SheetNames: wb.worksheets.map((ws) => ws.name),
      _wb: wb,
    };
  },
};
