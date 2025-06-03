import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx'
import { ChevronDown, Heart, Menu, X } from 'lucide-react'
import './App.css'

// Importar páginas das ferramentas
import HomePage from './pages/HomePage'
import MergePDFPage from './pages/MergePDFPage'
import SplitPDFPage from './pages/SplitPDFPage'
import CompressPDFPage from './pages/CompressPDFPage'
import PDFToWordPage from './pages/PDFToWordPage'
import { WordToPDFPage, PDFToJPGPage, JPGToPDFPage, EditPDFPage } from './pages/ToolPages'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const converterTools = [
    { name: 'PDF para Word', path: '/pdf-to-word' },
    { name: 'PDF para PowerPoint', path: '/pdf-to-powerpoint' },
    { name: 'PDF para Excel', path: '/pdf-to-excel' },
    { name: 'Word para PDF', path: '/word-to-pdf' },
    { name: 'PowerPoint para PDF', path: '/powerpoint-to-pdf' },
    { name: 'Excel para PDF', path: '/excel-to-pdf' },
    { name: 'PDF para JPG', path: '/pdf-to-jpg' },
    { name: 'JPG para PDF', path: '/jpg-to-pdf' },
    { name: 'HTML para PDF', path: '/html-to-pdf' },
  ]

  const allTools = [
    { name: 'Juntar PDF', path: '/merge-pdf' },
    { name: 'Dividir PDF', path: '/split-pdf' },
    { name: 'Comprimir PDF', path: '/compress-pdf' },
    { name: 'Editar PDF', path: '/edit-pdf' },
    { name: 'Assinar PDF', path: '/sign-pdf' },
    { name: 'Marca d\'água', path: '/watermark-pdf' },
    { name: 'Rodar PDF', path: '/rotate-pdf' },
    { name: 'Desbloquear PDF', path: '/unlock-pdf' },
    { name: 'Proteger PDF', path: '/protect-pdf' },
    { name: 'Organizar PDF', path: '/organize-pdf' },
    { name: 'PDF para PDF/A', path: '/pdf-to-pdfa' },
    { name: 'Reparar PDF', path: '/repair-pdf' },
    { name: 'Números de página', path: '/page-numbers' },
    { name: 'Digitalizar para PDF', path: '/scan-to-pdf' },
    { name: 'OCR PDF', path: '/ocr-pdf' },
    { name: 'Comparar PDF', path: '/compare-pdf' },
    { name: 'Ocultar PDF', path: '/redact-pdf' },
    { name: 'Recortar PDF', path: '/crop-pdf' },
    ...converterTools
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              <span className="text-xl font-bold text-gray-900 ml-1">PDF0800</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              onClick={() => navigate('/merge-pdf')}
            >
              JUNTAR PDF
            </Button>
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
              onClick={() => navigate('/split-pdf')}
            >
              DIVIDIR PDF
            </Button>
            <Button 
              variant="ghost" 
              className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              onClick={() => navigate('/compress-pdf')}
            >
              COMPRIMIR PDF
            </Button>

            {/* Converter PDF Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  CONVERTER PDF
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {converterTools.map((tool) => (
                  <DropdownMenuItem key={tool.path} onClick={() => navigate(tool.path)}>
                    {tool.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Todas as Ferramentas Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  TODAS AS FERRAMENTAS PDF
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                {allTools.map((tool) => (
                  <DropdownMenuItem key={tool.path} onClick={() => navigate(tool.path)}>
                    {tool.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">
              Entrar
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Registre-se
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-blue-600"
                onClick={() => {
                  navigate('/merge-pdf')
                  setMobileMenuOpen(false)
                }}
              >
                Juntar PDF
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-orange-500"
                onClick={() => {
                  navigate('/split-pdf')
                  setMobileMenuOpen(false)
                }}
              >
                Dividir PDF
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-green-600"
                onClick={() => {
                  navigate('/compress-pdf')
                  setMobileMenuOpen(false)
                }}
              >
                Comprimir PDF
              </Button>
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full mb-2">
                  Entrar
                </Button>
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  Registre-se
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merge-pdf" element={<MergePDFPage />} />
          <Route path="/split-pdf" element={<SplitPDFPage />} />
          <Route path="/compress-pdf" element={<CompressPDFPage />} />
          <Route path="/pdf-to-word" element={<PDFToWordPage />} />
          <Route path="/word-to-pdf" element={<WordToPDFPage />} />
          <Route path="/pdf-to-jpg" element={<PDFToJPGPage />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDFPage />} />
          <Route path="/edit-pdf" element={<EditPDFPage />} />
          
          {/* Placeholder routes para ferramentas futuras */}
          <Route path="/pdf-to-powerpoint" element={<div className="p-8 text-center"><h1>PDF para PowerPoint - Em desenvolvimento</h1></div>} />
          <Route path="/pdf-to-excel" element={<div className="p-8 text-center"><h1>PDF para Excel - Em desenvolvimento</h1></div>} />
          <Route path="/powerpoint-to-pdf" element={<div className="p-8 text-center"><h1>PowerPoint para PDF - Em desenvolvimento</h1></div>} />
          <Route path="/excel-to-pdf" element={<div className="p-8 text-center"><h1>Excel para PDF - Em desenvolvimento</h1></div>} />
          <Route path="/html-to-pdf" element={<div className="p-8 text-center"><h1>HTML para PDF - Em desenvolvimento</h1></div>} />
          <Route path="/sign-pdf" element={<div className="p-8 text-center"><h1>Assinar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/watermark-pdf" element={<div className="p-8 text-center"><h1>Marca d'água - Em desenvolvimento</h1></div>} />
          <Route path="/rotate-pdf" element={<div className="p-8 text-center"><h1>Rodar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/unlock-pdf" element={<div className="p-8 text-center"><h1>Desbloquear PDF - Em desenvolvimento</h1></div>} />
          <Route path="/protect-pdf" element={<div className="p-8 text-center"><h1>Proteger PDF - Em desenvolvimento</h1></div>} />
          <Route path="/organize-pdf" element={<div className="p-8 text-center"><h1>Organizar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/pdf-to-pdfa" element={<div className="p-8 text-center"><h1>PDF para PDF/A - Em desenvolvimento</h1></div>} />
          <Route path="/repair-pdf" element={<div className="p-8 text-center"><h1>Reparar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/page-numbers" element={<div className="p-8 text-center"><h1>Números de página - Em desenvolvimento</h1></div>} />
          <Route path="/scan-to-pdf" element={<div className="p-8 text-center"><h1>Digitalizar para PDF - Em desenvolvimento</h1></div>} />
          <Route path="/ocr-pdf" element={<div className="p-8 text-center"><h1>OCR PDF - Em desenvolvimento</h1></div>} />
          <Route path="/compare-pdf" element={<div className="p-8 text-center"><h1>Comparar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/redact-pdf" element={<div className="p-8 text-center"><h1>Ocultar PDF - Em desenvolvimento</h1></div>} />
          <Route path="/crop-pdf" element={<div className="p-8 text-center"><h1>Recortar PDF - Em desenvolvimento</h1></div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

