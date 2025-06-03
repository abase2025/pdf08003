// Páginas placeholder para resolver imports
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { ArrowLeft } from 'lucide-react'

const PlaceholderPage = ({ title, description, color, icon: Icon }) => {
  const navigate = useNavigate()
  
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
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className={`w-24 h-24 ${color} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Icon className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🚧 Em Desenvolvimento</h3>
            <p className="text-blue-800">
              Esta ferramenta será implementada na próxima fase do desenvolvimento. 
              Todas as funcionalidades serão 100% gratuitas e funcionais.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PlaceholderPage

