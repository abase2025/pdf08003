# 🚀 GUIA COMPLETO - DEPLOY NO GITHUB

## 📋 **INSTRUÇÕES PASSO A PASSO**

### **Opção 1: Upload Direto (Mais Fácil)**

1. **Crie um repositório no GitHub**
   - Acesse [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `pdf0800` (ou qualquer nome)
   - Marque "Public" 
   - ✅ Marque "Add a README file"
   - Clique "Create repository"

2. **Faça upload dos arquivos**
   - Na página do repositório, clique "uploading an existing file"
   - Extraia o ZIP: `unzip PDF0800-GITHUB.zip`
   - Arraste TODOS os arquivos da pasta `pdf0800-clone/`
   - Commit message: "Initial commit - PDF0800"
   - Clique "Commit changes"

3. **Configure GitHub Pages**
   - Vá em `Settings` (aba do repositório)
   - Role até `Pages` (menu lateral)
   - Source: selecione `GitHub Actions`
   - Clique "Save"

4. **Aguarde o deploy**
   - Vá na aba `Actions`
   - Aguarde o workflow "Deploy PDF0800 to GitHub Pages" finalizar (2-3 minutos)
   - ✅ Site estará online em: `https://SEU-USUARIO.github.io/pdf0800/`

---

### **Opção 2: Git Command Line**

```bash
# 1. Clone o repositório vazio
git clone https://github.com/SEU-USUARIO/pdf0800.git
cd pdf0800

# 2. Copie os arquivos do projeto
# (extraia o ZIP e copie tudo para esta pasta)

# 3. Adicione e commit
git add .
git commit -m "Initial commit - PDF0800"
git push origin main

# 4. Configure GitHub Pages (via interface web)
```

---

## ⚙️ **CONFIGURAÇÕES INCLUÍDAS**

### **GitHub Actions (Deploy Automático)**
- ✅ Workflow configurado em `.github/workflows/deploy.yml`
- ✅ Build automático com pnpm
- ✅ Deploy automático no GitHub Pages
- ✅ Cache otimizado para builds rápidos

### **Vite Config (GitHub Pages)**
- ✅ Base URL configurada automaticamente
- ✅ Build otimizado para produção
- ✅ Chunks separados para melhor cache

### **Arquivos de Configuração**
- ✅ `.gitignore` - Ignora arquivos desnecessários
- ✅ `pnpm-lock.yaml` - Lock de dependências
- ✅ `README-GITHUB.md` - Documentação para GitHub

---

## 🔧 **PERSONALIZAÇÃO**

### **Alterar nome do repositório:**
1. Mude o nome no GitHub: `Settings` > `General` > `Repository name`
2. Atualize `vite.config.js`:
   ```js
   base: process.env.NODE_ENV === 'production' ? '/NOVO-NOME/' : '/',
   ```

### **Domínio customizado:**
1. Adicione arquivo `CNAME` na pasta `public/`:
   ```
   meusite.com
   ```
2. Configure DNS do seu domínio

---

## 📊 **MONITORAMENTO**

### **Verificar status do deploy:**
- Aba `Actions` - Histórico de builds
- Aba `Environments` - Status do GitHub Pages

### **Logs de erro:**
- Clique no workflow com erro
- Veja os logs detalhados de cada step

---

## 🛠️ **DESENVOLVIMENTO**

### **Fazer alterações:**
```bash
# 1. Clone localmente
git clone https://github.com/SEU-USUARIO/pdf0800.git
cd pdf0800

# 2. Instale dependências
pnpm install

# 3. Execute localmente
pnpm run dev

# 4. Faça suas alterações

# 5. Build e teste
pnpm run build
pnpm run preview

# 6. Commit e push
git add .
git commit -m "Suas alterações"
git push origin main

# 7. Deploy automático acontece!
```

---

## 🎯 **URLS IMPORTANTES**

### **Seu site:**
```
https://SEU-USUARIO.github.io/pdf0800/
```

### **Repositório:**
```
https://github.com/SEU-USUARIO/pdf0800
```

### **Actions (builds):**
```
https://github.com/SEU-USUARIO/pdf0800/actions
```

---

## 🆘 **SOLUÇÃO DE PROBLEMAS**

### **Build falha:**
- Verifique se todos os arquivos foram enviados
- Veja os logs na aba `Actions`
- Certifique-se que `pnpm-lock.yaml` existe

### **Site não carrega:**
- Aguarde 5-10 minutos após primeiro deploy
- Verifique se GitHub Pages está ativado
- Teste em modo incógnito

### **Rotas não funcionam:**
- Os arquivos de configuração já resolvem isso
- Certifique-se que `_redirects` está na pasta `dist/`

---

## 🏆 **VANTAGENS DO GITHUB PAGES**

- ✅ **Gratuito** - Hospedagem ilimitada
- ✅ **Automático** - Deploy a cada push
- ✅ **Rápido** - CDN global
- ✅ **Seguro** - HTTPS automático
- ✅ **Confiável** - 99.9% uptime

---

## 📞 **SUPORTE**

### **Problemas com GitHub:**
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)

### **Problemas com o projeto:**
- Abra uma Issue no repositório
- Verifique a documentação incluída

---

**🎯 RESULTADO: SITE FUNCIONANDO NO GITHUB PAGES!**

*Deploy automático configurado por Harrison Costa*

