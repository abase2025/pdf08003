import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, Upload, Download, Image, AlertCircle, CheckCircle, X } from 'lucide-react'
import { usePDFOperations } from '../hooks/usePDFOperations'

const JPGToPDFPage = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [result, setResult] = useState(null)
  const { convertImagesToPDF, isProcessing, error, setError } = usePDFOperations()

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'].includes(file.type)
    )
    
    if (imageFiles.length !== selectedFiles.length) {
      alert('Apenas arquivos de imagem (JPG, PNG, GIF, BMP, WebP) são aceitos.')
    }
    
    setFiles(prev => [...prev, ...imageFiles])
    setError(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const imageFiles = droppedFiles.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'].includes(file.type)
    )
    
    if (imageFiles.length !== droppedFiles.length) {
      alert('Apenas arquivos de imagem (JPG, PNG, GIF, BMP, WebP) são aceitos.')
    }
    
    setFiles(prev => [...prev, ...imageFiles])
    setError(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const clearFiles = () => {
    setFiles([])
    setResult(null)
    setError(null)
  }

  const moveFileUp = (index) => {
    if (index > 0) {
      const newFiles = [...files]
      const temp = newFiles[index]
      newFiles[index] = newFiles[index - 1]
      newFiles[index - 1] = temp
      setFiles(newFiles)
    }
  }

  const moveFileDown = (index) => {
    if (index < files.length - 1) {
      const newFiles = [...files]
      const temp = newFiles[index]
      newFiles[index] = newFiles[index + 1]
      newFiles[index + 1] = temp
      setFiles(newFiles)
    }
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Selecione pelo menos uma imagem para converter.')
      return
    }

    const convertResult = await convertImagesToPDF(files)
    setResult(convertResult)
  }

  const resetTool = () => {
    setFiles([])
    setResult(null)
    setError(null)
  }

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  const getFileTypeIcon = (type) => {
    return <Image className="h-5 w-5 text-yellow-600" />
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
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JPG para PDF</h1>
                <p className="text-sm text-gray-600">Converter imagens para PDF</p>
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
              Converter imagens para PDF
            </CardTitle>
            <p className="text-gray-600">
              Selecione uma ou mais imagens para criar um arquivo PDF. Suporta JPG, PNG, GIF, BMP e WebP.
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
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Arraste e solte suas imagens aqui
              </h3>
              <p className="text-gray-600 mb-6">
                ou clique para selecionar imagens do seu computador
              </p>
              <Button 
                onClick={() => document.getElementById('file-input').click()}
                className="bg-yellow-600 hover:bg-yellow-700"
                disabled={isProcessing}
              >
                Selecionar Imagens
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Formatos suportados: JPG, PNG, GIF, BMP, WebP
              </p>
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

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Imagens selecionadas ({files.length})</h3>
                  <Button variant="outline" onClick={clearFiles} disabled={isProcessing}>
                    Limpar todas
                  </Button>
                </div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileTypeIcon(file.type)}
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {file.type.split('/')[1].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFileUp(index)}
                          disabled={index === 0 || isProcessing}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveFileDown(index)}
                          disabled={index === files.length - 1 || isProcessing}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                          disabled={isProcessing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Ordem das páginas:</strong> As imagens serão adicionadas ao PDF na ordem mostrada acima. 
                  Use as setas ↑↓ para reordenar.
                </div>
              </div>
            )}

            {/* Convert Button */}
            {files.length > 0 && !result && (
              <div className="text-center">
                <Button
                  onClick={handleConvert}
                  className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Convertendo...' : `Converter ${files.length} ${files.length === 1 ? 'Imagem' : 'Imagens'} para PDF`}
                </Button>
              </div>
            )}

            {/* Processing Status */}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900">Convertendo imagens...</p>
                <p className="text-gray-600">Criando PDF com {files.length} {files.length === 1 ? 'página' : 'páginas'}...</p>
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
                    {result.success ? 'Conversão Realizada com Sucesso!' : 'Erro na Conversão'}
                  </h3>
                </div>
                <p className={`mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
                {result.success && (
                  <div className="space-y-3">
                    <div className="text-sm text-green-700">
                      <p><strong>Arquivo:</strong> {result.filename}</p>
                      <p><strong>Páginas:</strong> {files.length}</p>
                      <p><strong>Status:</strong> Download realizado automaticamente</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">✅ PDF Criado</h4>
                      <p className="text-sm text-blue-800">
                        Suas {files.length} imagens foram convertidas em um PDF com {files.length} páginas. 
                        O arquivo foi baixado automaticamente para sua pasta de Downloads.
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={resetTool}
                  className="mt-4"
                >
                  Converter Novas Imagens
                </Button>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Como usar esta ferramenta:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Selecione ou arraste uma ou mais imagens</li>
                <li>Reordene as imagens se necessário (usando as setas ↑↓)</li>
                <li>Clique em "Converter para PDF" para processar</li>
                <li>O PDF será baixado automaticamente</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Dicas:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Cada imagem será uma página no PDF</li>
                  <li>• Use as setas para reordenar as páginas</li>
                  <li>• Suporta JPG, PNG, GIF, BMP e WebP</li>
                  <li>• Qualidade original das imagens é mantida</li>
                  <li>• Processamento 100% local no seu navegador</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default JPGToPDFPage

