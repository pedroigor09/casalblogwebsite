# Site do Casal - Uma História Cinematográfica 🎬❤️

Um website com animações cinematográficas estilo Rockstar Games, criado com Next.js, GSAP e Lenis para contar a história de um casal de forma épica e romântica.

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

