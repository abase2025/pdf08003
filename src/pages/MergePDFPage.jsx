import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { usePDFOperations } from '../hooks/usePDFOperations'

const MergePDFPage = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [result, setResult] = useState(null)
  const { mergePDFs, isProcessing, error, setError } = usePDFOperations()

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== selectedFiles.length) {
      alert('Apenas arquivos PDF são aceitos para esta ferramenta.')
    }
    
    setFiles(prev => [...prev, ...pdfFiles])
    setError(null)
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const clearFiles = () => {
    setFiles([])
    setResult(null)
    setError(null)
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Selecione pelo menos 2 arquivos PDF para unir.')
      return
    }

    const mergeResult = await mergePDFs(files)
    setResult(mergeResult)
  }

  const resetTool = () => {
    setFiles([])
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
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Juntar PDF</h1>
                <p className="text-sm text-gray-600">Mesclar múltiplos PDFs em um único arquivo</p>
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
              Unir arquivos PDF
            </CardTitle>
            <p className="text-gray-600">
              Selecione os arquivos PDF que deseja unir. Os arquivos serão unidos na ordem em que foram adicionados.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Arraste e solte seus arquivos PDF aqui
              </h3>
              <p className="text-gray-600 mb-6">
                ou clique para selecionar arquivos PDF do seu computador
              </p>
              <Button 
                onClick={() => document.getElementById('file-input').click()}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isProcessing}
              >
                Selecionar Arquivos PDF
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

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Arquivos selecionados ({files.length})</h3>
                  <Button variant="outline" onClick={clearFiles} disabled={isProcessing}>
                    Limpar todos
                  </Button>
                </div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isProcessing}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Merge Button */}
            {files.length >= 2 && !result && (
              <div className="text-center">
                <Button
                  onClick={handleMerge}
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processando...' : `Unir ${files.length} PDFs`}
                </Button>
              </div>
            )}

            {/* Processing Status */}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900">Processando arquivos...</p>
                <p className="text-gray-600">Unindo {files.length} arquivos PDF...</p>
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
                    {result.success ? 'Arquivo Convertido com Sucesso!' : 'Erro no Processamento'}
                  </h3>
                </div>
                <p className={`mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
                {result.success && (
                  <div className="space-y-3">
                    <div className="text-sm text-green-700">
                      <p><strong>Arquivo:</strong> {result.filename}</p>
                      <p><strong>Tamanho:</strong> {formatFileSize(result.size)}</p>
                      <p><strong>Status:</strong> Download realizado automaticamente</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">✅ Download Automático</h4>
                      <p className="text-sm text-blue-800">
                        O arquivo foi baixado automaticamente para sua pasta de Downloads. 
                        Se o download não iniciou, verifique as configurações do seu navegador.
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={resetTool}
                  className="mt-4"
                >
                  Processar Novos Arquivos
                </Button>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Como usar esta ferramenta:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Selecione ou arraste pelo menos 2 arquivos PDF</li>
                <li>Os arquivos serão unidos na ordem em que foram adicionados</li>
                <li>Clique em "Unir PDFs" para processar</li>
                <li>O arquivo unido será baixado automaticamente</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Dicas:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Você pode reordenar os arquivos removendo e adicionando novamente</li>
                  <li>• Arquivos grandes podem levar mais tempo para processar</li>
                  <li>• O arquivo final manterá a qualidade original dos PDFs</li>
                  <li>• Todos os arquivos são processados localmente no seu navegador</li>
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

export default MergePDFPage

