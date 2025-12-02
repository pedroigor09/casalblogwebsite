# 💕 Site do Casal - Jefferson & Bruno

Site romântico e interativo criado com Next.js, GSAP e Tailwind CSS.

## 🚀 Deploy no GitHub Pages

### Configuração Inicial

1. **Crie um repositório no GitHub** chamado `casalblogwebsite`

2. **Configure GitHub Pages:**
   - Vá em Settings → Pages
   - Source: GitHub Actions

3. **Push do código:**
```bash
git init
git add .
git commit -m "🎉 Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casalblogwebsite.git
git push -u origin main
```

### Deploy Automático

O deploy acontece automaticamente quando você faz push na branch `main`. O GitHub Actions vai:
- Instalar dependências
- Fazer build do Next.js
- Deploy na GitHub Pages

Após o deploy, o site estará disponível em:
```
https://SEU-USUARIO.github.io/casalblogwebsite/
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura de Pastas

```
├── app/                    # App Router do Next.js
├── components/
│   ├── sections/          # Seções da página
│   ├── ui/                # Componentes reutilizáveis
│   └── layout/            # Layout components
├── lib/
│   ├── constants/         # Constantes e conteúdo
│   └── utils/             # Funções utilitárias
├── public/                # Assets estáticos
│   ├── img1.jpg - img15.jpg
│   └── video1.mp4 - video7.mp4
└── types/                 # TypeScript types
```

## ✨ Funcionalidades

- 🎬 Hero com vídeo background
- 📊 Dashboard com contadores animados (incluindo seguidores do Instagram!)
- 📸 Galeria de polaroids
- 🎮 Quiz interativo
- 🎥 Dicionário do casal com vídeos
- 📈 Placar da discórdia (votação)
- 🚗 Barra de conquistas
- 🔄 Expectativa vs Realidade
- 🌓 Tema dual (versão dele/dele)

## 🎨 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Estilização
- **GSAP** - Animações cinematográficas
- **Lenis** - Smooth scroll
- **Canvas Confetti** - Efeitos de celebração

## 📝 Personalização

Para personalizar o conteúdo, edite os arquivos em `lib/constants/`:
- `content.ts` - Textos, imagens e timeline
- `stats.ts` - Estatísticas do dashboard
- `features.ts` - Quiz e outras features

## 🌐 Links

- **Instagram Jefferson:** [@jeffersonline_](https://www.instagram.com/jeffersonline_/) - 196K seguidores
- **Instagram Bruno:** [@brunocostav](https://www.instagram.com/brunocostav/) - 60.2K seguidores

---

Feito com 💕 e muito código

## 🎨 Características

- ✅ **Animações Cinematográficas** - Transições estilo Rockstar Games
- ✅ **Smooth Scroll** - Navegação suave com Lenis
- ✅ **GSAP ScrollTrigger** - Animações acionadas pelo scroll
- ✅ **Polaroids Interativos** - Fotos com física e hover effects
- ✅ **Custom Cursor** - Cursor romântico que reage a interações
- ✅ **Timeline Vertical** - História do casal com scroll reveal
- ✅ **Corações Flutuantes** - Partículas animadas no background
- ✅ **Totalmente Responsivo** - Funciona em todos os dispositivos

## 🚀 Como Rodar

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📸 Como Personalizar

### 1. Adicionar Suas Fotos
Coloque as fotos na pasta `public/images/`:
```
public/images/
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
└── ...
```

### 2. Editar Conteúdo
Abra `lib/constants/content.ts` e personalize:

```typescript
export const COUPLE_NAMES = {
  person1: 'Seu Nome',
  person2: 'Nome do Parceiro(a)',
};

export const HERO_CONTENT = {
  title: 'Nossa História',
  subtitle: 'Uma jornada de amor e aventuras',
  date: 'Desde Janeiro 2024',
};
```

### 3. Adicionar Eventos da Timeline

```typescript
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    date: 'Janeiro 2024',
    title: 'Primeiro Encontro',
    description: 'O dia em que tudo começou...',
    side: 'left',
  },
  // Adicione mais eventos aqui!
];
```

### 4. Configurar Galeria de Fotos

```typescript
export const GALLERY_IMAGES: PolaroidImage[] = [
  {
    id: '1',
    src: '/images/photo1.jpg',
    alt: 'Momento especial',
    caption: 'Praia paradisíaca',
    rotation: -5,
  },
  // Adicione mais fotos!
];
```

## 🏗️ Estrutura do Projeto

```
app/
├── page.tsx              # Página principal (apenas orquestração)
├── layout.tsx            # Layout com providers
└── globals.css           # Estilos globais e animações

components/
├── sections/             # Seções da página
│   ├── HeroSection.tsx          # Hero cinematográfico
│   ├── TimelineSection.tsx      # Linha do tempo
│   └── GallerySection.tsx       # Galeria de polaroids
├── ui/                   # Componentes reutilizáveis
│   ├── AnimatedText.tsx         # Texto com animações
│   ├── Polaroid.tsx             # Componente polaroid
│   ├── CustomCursor.tsx         # Cursor customizado
│   └── FloatingHearts.tsx       # Corações flutuantes
└── layout/
    └── SmoothScrollProvider.tsx # Smooth scroll wrapper

hooks/                    # Custom hooks
├── useSmoothScroll.ts           # Lenis smooth scroll
├── useScrollAnimation.ts        # GSAP scroll animations
└── useGSAPAnimation.ts          # GSAP animations

lib/
├── constants/           # Conteúdo e configurações
│   ├── content.ts              # Todo o conteúdo do site
│   └── animations.ts           # Configs de animação
└── utils/
    └── cn.ts                   # Utility para classes

types/                   # TypeScript types
└── index.ts            # Tipos centralizados
```

## 🎭 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **GSAP** - Animações de alta performance
- **Lenis** - Smooth scroll cinematográfico
- **React Hooks** - Gerenciamento de estado

## 💡 Boas Práticas Implementadas

- ✅ Zero código hardcoded na página principal
- ✅ Componentes totalmente reutilizáveis
- ✅ Hooks customizados para lógica complexa
- ✅ Constantes centralizadas
- ✅ TypeScript strict mode
- ✅ Estrutura escalável e organizada
- ✅ Separação de responsabilidades

## 🎬 Animações Especiais

### Hero Section
- Reveal cinematográfico com overlay
- Split character animation (estilo Rockstar)
- Parallax no scroll
- Polaroid com entrada épica

### Timeline
- Linha vertical animada com scroll
- Eventos aparecem dos lados
- Scroll trigger suave
- Cards com hover effects

### Galeria
- Polaroids com rotação
- Hover effects 3D
- Staggered layout
- Lightbox modal

## 🎨 Personalização Avançada

### Mudar Cores
Edite `app/globals.css` para alterar o esquema de cores.

### Ajustar Animações
Modifique velocidades em `lib/constants/animations.ts`:
```typescript
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  cinematic: 2,
};
```

### Adicionar Nova Seção
1. Crie um componente em `components/sections/`
2. Importe e use em `app/page.tsx`
3. Adicione conteúdo em `lib/constants/content.ts`

---

Feito com ❤️ e muito código cinematográfico!

