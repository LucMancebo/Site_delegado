# Design System - Site Delegado

## 📋 Visão Geral
Design system para o site institucional do delegado, com foco em transmitir profissionalismo, confiança e acessibilidade.

---

## 🎨 Paleta de Cores

### Cores Principais
| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Navy Dark** | `#1a1d2e` | `rgb(26, 29, 46)` | Fundo principal, headers, footers |
| **Gold Accent** | `#d4a854` | `rgb(212, 168, 84)` | Destaques, CTAs, elementos interativos |
| **White** | `#ffffff` | `rgb(255, 255, 255)` | Texto sobre fundos escuros, fundos claros |
| **Light Gray** | `#f5f5f5` | `rgb(245, 245, 245)` | Fundos de seções alternadas |

### Cores Secundárias
| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Dark Card** | `#252837` | `rgb(37, 40, 55)` | Cards, elementos elevados |
| **Medium Gray** | `#6b7280` | `rgb(107, 114, 128)` | Texto secundário |
| **Border Gray** | `#e5e7eb` | `rgb(229, 231, 235)` | Bordas, divisores |

### Cores de Estado
| Nome | Hex | Uso |
|------|-----|-----|
| **Success** | `#10b981` | Mensagens de sucesso |
| **Warning** | `#f59e0b` | Avisos |
| **Error** | `#ef4444` | Erros, validações |
| **Info** | `#3b82f6` | Informações |

---

## 🔤 Tipografia

### Fonte Principal
**Família:** Sistema de fontes modernas
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Hierarquia de Tamanhos

| Elemento | Tamanho | Peso | Line Height | Uso |
|----------|---------|------|-------------|-----|
| **H1 - Hero** | `3.5rem` (56px) | 700 | 1.1 | Título principal da hero section |
| **H2 - Section** | `2.5rem` (40px) | 700 | 1.2 | Títulos de seções |
| **H3 - Card** | `1.5rem` (24px) | 600 | 1.3 | Títulos de cards e sub-seções |
| **H4 - Small** | `1.25rem` (20px) | 600 | 1.4 | Títulos menores |
| **Body Large** | `1.125rem` (18px) | 400 | 1.6 | Texto introdutório |
| **Body** | `1rem` (16px) | 400 | 1.6 | Texto padrão |
| **Small** | `0.875rem` (14px) | 400 | 1.5 | Texto pequeno, legendas |
| **Tiny** | `0.75rem` (12px) | 400 | 1.4 | Texto muito pequeno |

---

## 📐 Espaçamento

### Sistema de Espaçamento (baseado em 8px)
```
xs:   4px   (0.25rem)
sm:   8px   (0.5rem)
md:   16px  (1rem)
lg:   24px  (1.5rem)
xl:   32px  (2rem)
2xl:  48px  (3rem)
3xl:  64px  (4rem)
4xl:  96px  (6rem)
5xl:  128px (8rem)
```

### Aplicação
- **Entre seções:** 4xl - 5xl (96-128px)
- **Padding de seção:** 3xl - 4xl (64-96px)
- **Entre cards:** xl - 2xl (32-48px)
- **Padding de cards:** lg - xl (24-32px)
- **Entre elementos:** md - lg (16-24px)

---

## 🎭 Componentes

### Botões

#### Botão Primário
- **Background:** Gold Accent (`#d4a854`)
- **Texto:** Navy Dark (`#1a1d2e`)
- **Padding:** `12px 32px`
- **Border Radius:** `4px`
- **Font Weight:** 600
- **Hover:** Escurecer 10%
- **Transition:** `all 0.3s ease`

#### Botão Secundário
- **Background:** Transparente
- **Border:** `2px solid #d4a854`
- **Texto:** Gold Accent (`#d4a854`)
- **Padding:** `12px 32px`
- **Border Radius:** `4px`
- **Font Weight:** 600
- **Hover:** Background Gold Accent, Texto Navy Dark
- **Transition:** `all 0.3s ease`

### Cards

#### Card Padrão
- **Background:** White (`#ffffff`)
- **Padding:** `32px`
- **Border Radius:** `8px`
- **Box Shadow:** `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Border:** `1px solid #e5e7eb`

#### Card Dark
- **Background:** Dark Card (`#252837`)
- **Padding:** `32px`
- **Border Radius:** `8px`
- **Texto:** White
- **Box Shadow:** `0 4px 6px rgba(0, 0, 0, 0.3)`

### Ícones
- **Tamanho padrão:** 24px
- **Tamanho grande:** 40px
- **Cor:** Gold Accent ou White (dependendo do fundo)

---

## 📱 Responsividade

### Breakpoints
```css
mobile:       0px - 640px
tablet:       641px - 1024px
desktop:      1025px - 1440px
desktop-xl:   1441px+
```

### Container
- **Max Width:** 1280px
- **Padding Lateral:** 
  - Mobile: 16px
  - Tablet: 24px
  - Desktop: 32px

---

## 🌊 Animações e Transições

### Durações Padrão
- **Fast:** 150ms - Hover de botões, pequenas interações
- **Normal:** 300ms - Transições gerais
- **Slow:** 500ms - Animações complexas

### Easing
```css
ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Animações Comuns
- **Fade In:** Opacidade 0 → 1
- **Slide Up:** Transform translateY(20px) → translateY(0)
- **Scale:** Transform scale(0.95) → scale(1)

---

## ♿ Acessibilidade

### Contraste
- Texto sobre Navy Dark: Usar White (ratio 21:1 ✓)
- Texto sobre Light Gray: Usar Navy Dark (ratio 15:1 ✓)
- Gold Accent sobre Navy Dark: (ratio 7.5:1 ✓)

### Tamanhos Mínimos
- **Texto:** Mínimo 16px para leitura
- **Áreas clicáveis:** Mínimo 44x44px
- **Espaçamento entre links:** Mínimo 8px

### ARIA
- Usar labels descritivos
- Implementar navegação por teclado
- Garantir ordem lógica de foco

---

## 🎯 Princípios de Design

1. **Profissionalismo**: Design sóbrio e confiável
2. **Hierarquia Clara**: Informação bem organizada
3. **Acessibilidade**: Todos podem navegar facilmente
4. **Performance**: Rápido e eficiente
5. **Consistência**: Padrões mantidos em todo o site

---

## 📝 Notas de Implementação

### CSS Variables
Todas as cores, tamanhos e espaçamentos devem ser definidos como variáveis CSS para fácil manutenção.

### Mobile First
Desenvolver primeiro para mobile e expandir para desktop.

### Imagens
- Usar formatos modernos (WebP, AVIF)
- Implementar lazy loading
- Fornecer versões responsivas

### Performance
- Minimizar CSS/JS
- Usar CDN para assets
- Otimizar fontes (font-display: swap)
