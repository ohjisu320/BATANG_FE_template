import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPDF = async (elementId: string, filename: string): Promise<void> => {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  const canvas = await html2canvas(element, { scale: 2, useCORS: true })
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  const imgData = canvas.toDataURL('image/png')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(filename)
}

export const downloadDataUrl = (dataUrl: string, filename: string): void => {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
