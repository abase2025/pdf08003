import PlaceholderPage from '../components/PlaceholderPage'
import JPGToPDFPage from './JPGToPDFPage'
import { FileText } from 'lucide-react'

export const WordToPDFPage = () => {
  return (
    <PlaceholderPage 
      title="Word para PDF"
      description="Converter DOCX para PDF"
      color="bg-green-700"
      icon={FileText}
    />
  )
}

export const PDFToJPGPage = () => {
  return (
    <PlaceholderPage 
      title="PDF para JPG"
      description="Extrair imagens ou converter páginas"
      color="bg-teal-500"
      icon={FileText}
    />
  )
}

export { JPGToPDFPage }

export const EditPDFPage = () => {
  return (
    <PlaceholderPage 
      title="Editar PDF"
      description="Adicionar texto, imagens e formas"
      color="bg-purple-500"
      icon={FileText}
    />
  )
}

export default WordToPDFPage

