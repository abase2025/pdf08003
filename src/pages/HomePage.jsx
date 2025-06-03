import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { 
  FileText, 
  Scissors, 
  Archive, 
  FileEdit, 
  FileImage, 
  Image,
  PenTool,
  Droplets,
  RotateCw,
  Globe,
  Unlock,
  Shield,
  ArrowUpDown,
  FileCheck,
  Wrench,
  Hash,
  Scan,
  Eye,
  GitCompare,
  EyeOff,
  Crop
} from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()

  const tools = [
    {
      id: 'merge',
      title: 'Juntar PDF',
      description: 'Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar. É tudo muito fácil e rápido!',
      icon: FileText,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      borderColor: 'border-red-500',
      path: '/merge-pdf',
      number: 7
    },
    {
      id: 'split',
      title: 'Dividir PDF',
      description: 'Selecione um intervalo de páginas, separe uma página, ou converta cada página do documento em arquivo PDF independente.',
      icon: Scissors,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      borderColor: 'border-orange-500',
      path: '/split-pdf',
      number: 8
    },
    {
      id: 'compress',
      title: 'Comprimir PDF',
      description: 'Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível. Otimize seus arquivos PDF.',
      icon: Archive,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      borderColor: 'border-green-500',
      path: '/compress-pdf',
      number: 9
    },
    {
      id: 'pdf-to-word',
      title: 'PDF para Word',
      description: 'Converta facilmente seus ficheiros PDF para documentos WORD DOCX simples de editar.',
      icon: FileEdit,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-500',
      path: '/pdf-to-word',
      number: 10
    },
    {
      id: 'pdf-to-powerpoint',
      title: 'PDF para PowerPoint',
      description: 'Converta seus ficheiros PDF para apresentações POWERPOINT PPTX fáceis de editar.',
      icon: FileText,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      borderColor: 'border-blue-600',
      path: '/pdf-to-powerpoint',
      number: 11
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF para Excel',
      description: 'Retire dados direto de PDFs para planilhas Excel em poucos segundos.',
      icon: FileText,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      borderColor: 'border-green-600',
      path: '/pdf-to-excel',
      number: 12
    },
    {
      id: 'word-to-pdf',
      title: 'Word para PDF',
      description: 'Converta seus documentos WORD para PDF com a máxima qualidade e exatamente igual que o arquivo DOC ou DOCX original.',
      icon: FileText,
      color: 'bg-green-700',
      hoverColor: 'hover:bg-green-800',
      borderColor: 'border-green-700',
      path: '/word-to-pdf',
      number: 13
    },
    {
      id: 'powerpoint-to-pdf',
      title: 'PowerPoint para PDF',
      description: 'Converta suas apresentações POWERPOINT para PDF com a máxima qualidade e exatamente igual que o arquivo PPT ou PPTX original.',
      icon: FileText,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      borderColor: 'border-red-600',
      path: '/powerpoint-to-pdf',
      number: 14
    },
    {
      id: 'excel-to-pdf',
      title: 'Excel para PDF',
      description: 'Converta suas tabelas EXCEL para PDF com as colunas ajustadas à largura da página. Vertical ou horizontal, você escolhe a orientação.',
      icon: FileText,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      borderColor: 'border-yellow-500',
      path: '/excel-to-pdf',
      number: 15
    },
    {
      id: 'edit-pdf',
      title: 'Editar PDF',
      description: 'Adicione texto, imagens, formas ou anotações livres a um documento PDF. Edite a dimensão, fonte e cor do conteúdo adicionado.',
      icon: PenTool,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      borderColor: 'border-purple-500',
      path: '/edit-pdf',
      number: 16,
      isNew: true
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF para JPG',
      description: 'Extraia todas as imagens contidas em um arquivo PDF ou converta cada página em um arquivo JPG.',
      icon: FileImage,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      borderColor: 'border-teal-500',
      path: '/pdf-to-jpg',
      number: 17
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG para PDF',
      description: 'Converta suas imagens JPG para PDF. Ajuste a orientação e as margens.',
      icon: Image,
      color: 'bg-yellow-600',
      hoverColor: 'hover:bg-yellow-700',
      borderColor: 'border-yellow-600',
      path: '/jpg-to-pdf',
      number: 18
    },
    {
      id: 'sign-pdf',
      title: 'Assinar PDF',
      description: 'Assine você mesmo ou solicite assinaturas eletrônicas de outros.',
      icon: PenTool,
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800',
      borderColor: 'border-blue-700',
      path: '/sign-pdf',
      number: 11
    },
    {
      id: 'watermark',
      title: 'Marca d\'água',
      description: 'Escolha uma imagem ou texto para inserir sobre o seu PDF. Selecione a posição, transparência e tipografia.',
      icon: Droplets,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      borderColor: 'border-pink-500',
      path: '/watermark-pdf',
      number: 12
    },
    {
      id: 'rotate',
      title: 'Rodar PDF',
      description: 'Gire o PDF que quiser. Gire vários arquivos PDF de uma só vez!',
      icon: RotateCw,
      color: 'bg-green-800',
      hoverColor: 'hover:bg-green-900',
      borderColor: 'border-green-800',
      path: '/rotate-pdf',
      number: 13
    },
    {
      id: 'html-to-pdf',
      title: 'HTML para PDF',
      description: 'Converta páginas Web em HTML para PDF. Copie e cole a URL da página que você quer e a converta em um PDF com um clique.',
      icon: Globe,
      color: 'bg-yellow-700',
      hoverColor: 'hover:bg-yellow-800',
      borderColor: 'border-yellow-700',
      path: '/html-to-pdf',
      number: 14
    },
    {
      id: 'unlock',
      title: 'Desbloquear PDF',
      description: 'Remova a senha de segurança dos PDF, assim você pode usá-los como quiser.',
      icon: Unlock,
      color: 'bg-blue-800',
      hoverColor: 'hover:bg-blue-900',
      borderColor: 'border-blue-800',
      path: '/unlock-pdf',
      number: 15
    },
    {
      id: 'protect',
      title: 'Proteger PDF',
      description: 'Protege arquivos PDF com uma senha. Encripte documentos PDF para impedir o acesso não autorizado.',
      icon: Shield,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      borderColor: 'border-purple-600',
      path: '/protect-pdf',
      number: 16
    },
    {
      id: 'organize',
      title: 'Organizar PDF',
      description: 'Ordene as páginas de seu arquivo PDF como você pretender. Exclua ou adicione páginas PDF ao seu documento como lhe for mais conveniente.',
      icon: ArrowUpDown,
      color: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700',
      borderColor: 'border-teal-600',
      path: '/organize-pdf',
      number: 17
    },
    {
      id: 'pdf-to-pdfa',
      title: 'PDF para PDF/A',
      description: 'Transforme seu PDF em PDF/A, a versão de PDF em conformidade com os standards ISO para arquivo de longa duração. Seu PDF será preservado o seu formato quando acessado no futuro.',
      icon: FileCheck,
      color: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      borderColor: 'border-gray-600',
      path: '/pdf-to-pdfa',
      number: 18
    },
    {
      id: 'repair',
      title: 'Reparar PDF',
      description: 'Reparar um PDF danificado e recuperar dados de PDF corrompido. Repare arquivos PDF com a nossa ferramenta de Reparo.',
      icon: Wrench,
      color: 'bg-green-900',
      hoverColor: 'hover:bg-green-950',
      borderColor: 'border-green-900',
      path: '/repair-pdf',
      number: 19
    },
    {
      id: 'page-numbers',
      title: 'Números de página',
      description: 'Adicione números de página em documentos PDF facilmente. Escolha posição, dimensões, formato e tipografia!',
      icon: Hash,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      borderColor: 'border-orange-600',
      path: '/page-numbers',
      number: 20
    },
    {
      id: 'scan-to-pdf',
      title: 'Digitalizar e transformar em PDF',
      description: 'Capture digitalizações de documentos a partir do seu dispositivo móvel e envie-os instantaneamente para o seu navegador.',
      icon: Scan,
      color: 'bg-teal-700',
      hoverColor: 'hover:bg-teal-800',
      borderColor: 'border-teal-700',
      path: '/scan-to-pdf',
      number: 21
    },
    {
      id: 'ocr',
      title: 'OCR PDF',
      description: 'Converta facilmente um PDF escaneado em documentos selecionáveis e pesquisáveis.',
      icon: Eye,
      color: 'bg-green-950',
      hoverColor: 'hover:bg-black',
      borderColor: 'border-green-950',
      path: '/ocr-pdf',
      number: 22
    },
    {
      id: 'compare',
      title: 'Comparar PDF',
      description: 'Mostre uma comparação de documentos lado a lado e identifique facilmente as alterações entre diferentes versões de arquivos.',
      icon: GitCompare,
      color: 'bg-blue-900',
      hoverColor: 'hover:bg-blue-950',
      borderColor: 'border-blue-900',
      path: '/compare-pdf',
      number: 23,
      isNew: true
    },
    {
      id: 'redact',
      title: 'Ocultar PDF',
      description: 'Oculte texto e gráficos para remover permanentemente informações sensíveis de um PDF.',
      icon: EyeOff,
      color: 'bg-orange-700',
      hoverColor: 'hover:bg-orange-800',
      borderColor: 'border-orange-700',
      path: '/redact-pdf',
      number: 24,
      isNew: true
    },
    {
      id: 'crop',
      title: 'Recortar PDF',
      description: 'Recorte as margens de documentos PDF ou selecione áreas específicas e depois aplique as alterações a uma página ou a todo o documento.',
      icon: Crop,
      color: 'bg-purple-700',
      hoverColor: 'hover:bg-purple-800',
      borderColor: 'border-purple-700',
      path: '/crop-pdf',
      number: 25
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ferramentas online para os amantes de PDF
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Ferramenta online e completamente gratuita para juntar PDF, dividir PDF, comprimir PDF, 
            converter documentos Office para PDF, conversão de PDF para JPG, e JPG para PDF. 
            Não requer instalação.
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg inline-block">
            <strong>100% GRATUITO</strong> - Sem limitações, sem cobrança, uso ilimitado!
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Card 
                  key={tool.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${tool.borderColor} group`}
                  onClick={() => navigate(tool.path)}
                >
                  {tool.isNew && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Novo!
                    </div>
                  )}
                  <div className="absolute top-4 right-4 text-xs text-gray-400 font-bold">
                    {tool.number}
                  </div>
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${tool.color} ${tool.hoverColor} rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors group-hover:scale-110 transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Solutions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Procurando outra solução?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-500 text-white p-4 rounded-lg inline-block mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">PDF0800 Desktop</h3>
              <p className="text-gray-600 mb-4">
                Baixe o aplicativo PDF0800 para trabalhar com suas ferramentas de PDF 
                favoritas no seu Mac ou Windows PC. Obtenha um aplicativo PDF leve que 
                ajuda você a processar tarefas pesadas em PDF em segundos.
              </p>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                PDF0800 Desktop
              </Button>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white p-4 rounded-lg inline-block mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">PDF0800 Móvel</h3>
              <p className="text-gray-600 mb-4">
                Obtenha a app PDF0800 Mobile para gerir documentos remotamente, onde 
                quer que esteja. Transforme o seu Android ou iPhone num Editor & 
                Digitalizador de PDFs para anotar, assinar e partilhar documentos com facilidade.
              </p>
              <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                PDF0800 Mobile
              </Button>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white p-4 rounded-lg inline-block mb-4">
                <Image className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">iLoveIMG</h3>
              <p className="text-gray-600 mb-4">
                O iLoveIMG é a web app que ajuda a modificar lotes de imagens 
                gratuitamente. Corte, ajuste o tamanho, comprima, converta, etc. 
                Todas as ferramentas de que precisa para melhor as suas imagens em apenas uns cliques.
              </p>
              <Button variant="outline" className="text-green-500 border-green-500 hover:bg-green-50">
                iLoveIMG
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            O software de PDF que tem a confiança de milhões de utilizadores
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
            PDF0800 é sua principal ferramenta on-line para editar PDF com facilidade. 
            Aproveite todas as ferramentas de que você precisa para trabalhar de maneira 
            eficiente com seus documentos digitais, mantendo seus dados seguros e protegidos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
              <p className="opacity-90">Seus arquivos são processados localmente no seu navegador e nunca enviados para servidores</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-lg font-semibold mb-2">Fácil de Usar</h3>
              <p className="opacity-90">Interface intuitiva e simples para todas as suas necessidades de PDF</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Processamento Rápido</h3>
              <p className="opacity-90">Conversões e edições ultrarrápidas para economizar seu tempo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">PDF0800</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Página Inicial</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ferramentas</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Produto</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">PDF0800 Desktop</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PDF0800 Móvel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desenvolvedores</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Soluções</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Empresarial</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ensino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Empresa</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Nossa História</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© PDF0800 2025 ® - Ferramentas PDF 100% Gratuitas | Criado por Harrison Costa</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

