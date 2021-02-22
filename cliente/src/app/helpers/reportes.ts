export function justificarParr(doc: any, txt: string, margen: number, margenTop: number, divhoja: number, swcol: number, position: string) {

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
    doc.text(lines[i], pageCenter, margenTop + lineTop, position);
  }
}
