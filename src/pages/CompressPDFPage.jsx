import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, Upload, Download, Archive, AlertCircle, CheckCircle } from 'lucide-react'
import { usePDFOperations } from '../hooks/usePDFOperations'

const CompressPDFPage = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [compressionLevel, setCompressionLevel] = useState('medium')
  const { compressPDF, isProcessing, error, setError } = usePDFOperations()

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

  const handleCompress = async () => {
    if (!file) {
      alert('Selecione um arquivo PDF para comprimir.')
      return
    }

    const compressResult = await compressPDF(file)
    setResult(compressResult)
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
      {/* Header */}
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
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Archive className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Comprimir PDF</h1>
                <p className="text-sm text-gray-600">Diminuir tamanho mantendo qualidade</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
              Comprimir arquivo PDF
            </CardTitle>
            <p className="text-gray-600">
              Reduza o tamanho do seu arquivo PDF mantendo a qualidade visual.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Arraste e solte seu arquivo PDF aqui
              </h3>
              <p className="text-gray-600 mb-6">
                ou clique para selecionar o arquivo PDF do seu computador
              </p>
              <Button 
                onClick={() => document.getElementById('file-input').click()}
                className="bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                Selecionar Arquivo PDF
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* File Info */}
            {file && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Arquivo selecionado:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Nome:</strong> {file.name}
                  </div>
                  <div>
                    <strong>Tamanho:</strong> {formatFileSize(file.size)}
                  </div>
                  <div>
                    <strong>Tipo:</strong> PDF
                  </div>
                </div>
              </div>
            )}

            {/* Compression Options */}
            {file && !result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Nível de compressão:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={`cursor-pointer border-2 ${compressionLevel === 'low' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setCompressionLevel('low')}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Baixa</h4>
                      <p className="text-sm text-gray-600 mt-2">Compressão mínima, máxima qualidade</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer border-2 ${compressionLevel === 'medium' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setCompressionLevel('medium')}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Média</h4>
                      <p className="text-sm text-gray-600 mt-2">Equilíbrio entre tamanho e qualidade</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer border-2 ${compressionLevel === 'high' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setCompressionLevel('high')}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Alta</h4>
                      <p className="text-sm text-gray-600 mt-2">Máxima compressão, menor tamanho</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={handleCompress}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Comprimindo...' : 'Comprimir PDF'}
                  </Button>
                </div>
              </div>
            )}

            {/* Processing Status */}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900">Comprimindo arquivo...</p>
                <p className="text-gray-600">Otimizando tamanho e qualidade...</p>
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
                    {result.success ? 'Arquivo Comprimido com Sucesso!' : 'Erro no Processamento'}
                  </h3>
                </div>
                <p className={`mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
                {result.success && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
                      <div>
                        <strong>Arquivo:</strong> {result.filename}
                      </div>
                      <div>
                        <strong>Tamanho original:</strong> {formatFileSize(result.originalSize)}
                      </div>
                      <div>
                        <strong>Tamanho comprimido:</strong> {formatFileSize(result.compressedSize)}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        📊 Redução de {result.compressionRatio}%
                      </h4>
                      <p className="text-sm text-blue-800">
                        O arquivo foi baixado automaticamente para sua pasta de Downloads. 
                        Economia de espaço: {formatFileSize(result.originalSize - result.compressedSize)}
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={resetTool}
                  className="mt-4"
                >
                  Comprimir Novo Arquivo
                </Button>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Como usar esta ferramenta:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Selecione ou arraste um arquivo PDF</li>
                <li>Escolha o nível de compressão desejado</li>
                <li>Clique em "Comprimir PDF" para processar</li>
                <li>O arquivo comprimido será baixado automaticamente</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Dicas:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Compressão baixa: ideal para documentos importantes</li>
                  <li>• Compressão média: melhor para uso geral</li>
                  <li>• Compressão alta: ideal para envio por email</li>
                  <li>• Todos os arquivos são processados localmente</li>
                  <li>• Seus arquivos nunca são enviados para servidores externos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default CompressPDFPage

