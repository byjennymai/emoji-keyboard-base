# Emoji Keyboard

A modern emoji picker built with Next.js, featuring a beautiful and intuitive interface for selecting and using emojis.

## Features

- 🎨 Beautiful, modern UI with smooth animations
- 🔍 Search and filter emojis by category
- 📱 Responsive design that works on all devices
- ⚡ Fast and lightweight
- 🎯 Easy to integrate into any project
- 🎨 Customizable styling with Tailwind CSS

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/emoji-keyboard.git
cd emoji-keyboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

The emoji picker can be easily integrated into your projects. Simply import and use the `EmojiPicker` component:

```tsx
import { EmojiPicker } from './components/EmojiPicker'

function App() {
  return (
    <div>
      <EmojiPicker onEmojiSelect={(emoji) => console.log(emoji)} />
    </div>
  )
}
```

## Deployment

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/emoji-keyboard)

Or deploy to any other platform that supports Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
