# 🚀 Guia Rápido de Deploy

## Passos para Deploy no GitHub Pages

### 1. Criar Repositório no GitHub
```
Nome: casalblogwebsite
Público ou Privado (sua escolha)
```

### 2. Configurar GitHub Pages
1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione: **GitHub Actions**
3. Salve

### 3. Push do Código

```bash
# Se ainda não inicializou o git
git init
git add .
git commit -m "🎉 Site do casal pronto!"

# Adicionar remote (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/casalblogwebsite.git

# Push
git branch -M main
git push -u origin main
```

### 4. Aguardar Deploy
- Vá em **Actions** no GitHub
- Aguarde o workflow "Deploy to GitHub Pages" finalizar (≈2-3 min)
- ✅ Quando aparecer check verde, está pronto!

### 5. Acessar o Site
```
https://SEU-USUARIO.github.io/casalblogwebsite/
```

---

## ⚠️ IMPORTANTE: Ajustar basePath

Se você mudar o nome do repositório, edite `next.config.ts`:

```typescript
basePath: '/NOVO-NOME-DO-REPO',
assetPrefix: '/NOVO-NOME-DO-REPO/',
```

---

## 🔧 Troubleshooting

### Imagens não aparecem?
- Verifique se estão na pasta `public/`
- Confirme que os nomes estão corretos (img1.jpg, video1.mp4, etc)

### Site mostra 404?
- Confirme que GitHub Pages está ativado
- Verifique se o workflow executou com sucesso
- Aguarde 1-2 minutos após deploy

### CSS não carrega?
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se o `basePath` está correto no next.config.ts

---

## 🎉 Pronto!
Site está no ar com todas as funcionalidades:
- ✅ Animações GSAP
- ✅ Smooth scroll
- ✅ Contadores de Instagram
- ✅ Galeria interativa
- ✅ Quiz com confetti
- ✅ Tudo funcionando!
