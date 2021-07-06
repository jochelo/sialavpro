export function justificarParr(doc: any, txt: string, margen: number, top: number, divhoja: number, swcol: number, position: string): void {

  const lMargin = margen;
  const rMargin = margen;
  const pdfInMM = doc.internal.pageSize.width / divhoja;
  const pageCenter = (pdfInMM / 2) + swcol * pdfInMM;

  const lines = doc.splitTextToSize(txt, (pdfInMM - lMargin - rMargin));
  const dim = doc.getTextDimensions(txt);
  let lineTop;
  const lineHeight = dim.h;
  for (let i = 0; i < lines.length; i++) {
    lineTop = (lineHeight) * i;
    doc.text(lines[i], pageCenter, top + lineTop, position);
  }
}

export function firstCharUpper(txt: string): string {
  let ca = '';
  for (let i = 0; i < txt.length; i++) {
    if (i === 0) {
      ca += txt.charAt(i).toUpperCase();
    } else {
      if (txt.charAt(i) === ' ') {
        if (i + 1 < txt.length) {
          ca += ' ' + txt.charAt(i + 1).toUpperCase();
          i++;
        }
      } else {
        ca += txt.charAt(i);
      }
    }
  }
  return ca;
}
