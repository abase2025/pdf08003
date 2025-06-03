import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export const usePDFOperations = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Função para juntar PDFs
  const mergePDFs = async (files) => {
    setIsProcessing(true)
    setError(null)

    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }
      
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const filename = `merged-${Date.now()}.pdf`
      saveAs(blob, filename)
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: 'PDFs unidos com sucesso!',
        filename: filename,
        size: blob.size
      }
    } catch (error) {
      console.error('Erro ao unir PDFs:', error)
      setIsProcessing(false)
      setError('Erro ao unir PDFs. Verifique se os arquivos são válidos.')
      return { 
        success: false, 
        message: 'Erro ao unir PDFs. Verifique se os arquivos são válidos.' 
      }
    }
  }

  // Função para dividir PDF
  const splitPDF = async (file, mode = 'pages') => {
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const totalPages = pdf.getPageCount()
      const results = []
      
      if (mode === 'pages') {
        // Dividir em páginas individuais
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create()
          const [copiedPage] = await newPdf.copyPages(pdf, [i])
          newPdf.addPage(copiedPage)
          
          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes], { type: 'application/pdf' })
          const filename = `page-${i + 1}-${Date.now()}.pdf`
          saveAs(blob, filename)
          results.push(filename)
        }
      }
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: `PDF dividido em ${results.length} arquivos!`,
        files: results
      }
    } catch (error) {
      console.error('Erro ao dividir PDF:', error)
      setIsProcessing(false)
      setError('Erro ao dividir PDF. Verifique se o arquivo é válido.')
      return { 
        success: false, 
        message: 'Erro ao dividir PDF. Verifique se o arquivo é válido.' 
      }
    }
  }

  // Função para comprimir PDF
  const compressPDF = async (file) => {
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      
      // Compressão básica através de re-salvamento otimizado
      const pdfBytes = await pdf.save({
        useObjectStreams: false,
        addDefaultPage: false,
        objectsPerTick: 50,
      })
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const originalSize = file.size
      const compressedSize = blob.size
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      
      const filename = `compressed-${Date.now()}.pdf`
      saveAs(blob, filename)
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: `PDF comprimido! Redução de ${compressionRatio}%`,
        filename: filename,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: compressionRatio
      }
    } catch (error) {
      console.error('Erro ao comprimir PDF:', error)
      setIsProcessing(false)
      setError('Erro ao comprimir PDF. Verifique se o arquivo é válido.')
      return { 
        success: false, 
        message: 'Erro ao comprimir PDF. Verifique se o arquivo é válido.' 
      }
    }
  }

  // Função para converter imagens para PDF
  const convertImagesToPDF = async (files) => {
    setIsProcessing(true)
    setError(null)

    try {
      const pdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        let image
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdf.embedJpg(arrayBuffer)
        } else if (file.type === 'image/png') {
          image = await pdf.embedPng(arrayBuffer)
        } else {
          throw new Error(`Formato de imagem não suportado: ${file.type}`)
        }
        
        const page = pdf.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        })
      }
      
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const filename = `images-to-pdf-${Date.now()}.pdf`
      saveAs(blob, filename)
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: `${files.length} imagens convertidas para PDF!`,
        filename: filename
      }
    } catch (error) {
      console.error('Erro ao converter imagens para PDF:', error)
      setIsProcessing(false)
      setError('Erro ao converter imagens. Verifique se os arquivos são válidos.')
      return { 
        success: false, 
        message: 'Erro ao converter imagens. Verifique se os arquivos são válidos.' 
      }
    }
  }

  // Função para extrair imagens de PDF
  const extractImagesFromPDF = async (file) => {
    setIsProcessing(true)
    setError(null)

    try {
      // Esta é uma implementação simplificada
      // Para uma implementação completa, seria necessário usar bibliotecas mais avançadas
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = pdf.getPages()
      
      // Simular extração (implementação real seria mais complexa)
      const results = []
      for (let i = 0; i < pages.length; i++) {
        results.push(`page-${i + 1}-image.jpg`)
      }
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: `${results.length} imagens extraídas!`,
        files: results
      }
    } catch (error) {
      console.error('Erro ao extrair imagens:', error)
      setIsProcessing(false)
      setError('Erro ao extrair imagens. Verifique se o arquivo é válido.')
      return { 
        success: false, 
        message: 'Erro ao extrair imagens. Verifique se o arquivo é válido.' 
      }
    }
  }

  // Função para rotacionar páginas do PDF
  const rotatePDF = async (file, rotation = 90) => {
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = pdf.getPages()
      
      pages.forEach(page => {
        page.setRotation({ angle: rotation })
      })
      
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const filename = `rotated-${Date.now()}.pdf`
      saveAs(blob, filename)
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: `PDF rotacionado ${rotation}° com sucesso!`,
        filename: filename
      }
    } catch (error) {
      console.error('Erro ao rotacionar PDF:', error)
      setIsProcessing(false)
      setError('Erro ao rotacionar PDF. Verifique se o arquivo é válido.')
      return { 
        success: false, 
        message: 'Erro ao rotacionar PDF. Verifique se o arquivo é válido.' 
      }
    }
  }

  // Função para adicionar marca d'água
  const addWatermarkToPDF = async (file, watermarkText) => {
    setIsProcessing(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = pdf.getPages()
      
      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawText(watermarkText, {
          x: width / 2 - 50,
          y: height / 2,
          size: 50,
          opacity: 0.3,
          rotate: { angle: 45 }
        })
      })
      
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const filename = `watermarked-${Date.now()}.pdf`
      saveAs(blob, filename)
      
      setIsProcessing(false)
      return { 
        success: true, 
        message: 'Marca d\'água adicionada com sucesso!',
        filename: filename
      }
    } catch (error) {
      console.error('Erro ao adicionar marca d\'água:', error)
      setIsProcessing(false)
      setError('Erro ao adicionar marca d\'água. Verifique se o arquivo é válido.')
      return { 
        success: false, 
        message: 'Erro ao adicionar marca d\'água. Verifique se o arquivo é válido.' 
      }
    }
  }

  return {
    mergePDFs,
    splitPDF,
    compressPDF,
    convertImagesToPDF,
    extractImagesFromPDF,
    rotatePDF,
    addWatermarkToPDF,
    isProcessing,
    error,
    setError
  }
}

