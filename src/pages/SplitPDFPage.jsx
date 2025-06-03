import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, Upload, Download, Scissors, AlertCircle, CheckCircle } from 'lucide-react'
import { usePDFOperations } from '../hooks/usePDFOperations'

const SplitPDFPage = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [splitMode, setSplitMode] = useState('pages') // 'pages' or 'ranges'
  const { splitPDF, isProcessing, error, setError } = usePDFOperations()

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    } else {
      alert('Apenas arquivos PDF são aceitos para esta ferramenta.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setResult(null)
      setError(null)
    } else {
      alert('Apenas arquivos PDF são aceitos para esta ferramenta.')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSplit = async () => {
    if (!file) {
      alert('Selecione um arquivo PDF para dividir.')
      return
    }

    const splitResult = await splitPDF(file, splitMode)
    setResult(splitResult)
  }

  const resetTool = () => {
    setFile(null)
    setResult(null)
    setError(null)
  }

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dividir PDF</h1>
                <p className="text-sm text-gray-600">Separar páginas ou criar intervalos personalizados</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
              Dividir arquivo PDF
            </CardTitle>
            <p className="text-gray-600">
              Selecione um arquivo PDF e escolha como deseja dividi-lo.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Selecione um arquivo PDF
              </h3>
              <p className="text-gray-600 mb-6">
                Clique para selecionar o arquivo PDF que deseja dividir
              </p>
              <Button 
                onClick={() => document.getElementById('file-input').click()}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Selecionar Arquivo PDF
              </Button>
            </div>

            {/* File Info */}
            {file && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Arquivo selecionado:</h3>
                <p className="text-sm"><strong>Nome:</strong> {file.name}</p>
                <p className="text-sm"><strong>Tamanho:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            {/* Split Options */}
            {file && !isProcessing && !result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opções de divisão:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={`cursor-pointer border-2 ${splitMode === 'pages' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                        onClick={() => setSplitMode('pages')}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Dividir em páginas individuais</h4>
                      <p className="text-sm text-gray-600 mt-2">Cada página será um arquivo PDF separado</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer border-2 ${splitMode === 'ranges' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                        onClick={() => setSplitMode('ranges')}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Dividir por intervalos</h4>
                      <p className="text-sm text-gray-600 mt-2">Especificar intervalos de páginas personalizados</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={handleSplit}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg"
                  >
                    Dividir PDF
                  </Button>
                </div>
              </div>
            )}

            {/* Processing */}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900">Dividindo arquivo...</p>
                <p className="text-gray-600">Isso pode levar alguns segundos</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className={`p-6 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center space-x-3 mb-4">
                  {result.success ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  )}
                  <h3 className={`text-lg font-semibold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                    {result.success ? 'Arquivo Dividido com Sucesso!' : 'Erro no Processamento'}
                  </h3>
                </div>
                <p className={`mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
                {result.success && (
                  <div className="space-y-3">
                    <p className="text-green-700">Arquivos gerados: {result.files.length}</p>
                    {result.files.map((filename, index) => (
                      <Button key={index} variant="outline" className="mr-2 mb-2">
                        <Download className="h-4 w-4 mr-2" />
                        {filename}
                      </Button>
                    ))}
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={resetTool}
                  className="mt-4"
                >
                  Processar Novo Arquivo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SplitPDFPage

