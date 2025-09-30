// Global type declarations for the emoji keyboard

declare global {
  interface Window {
    macOSEmojiKeyboard?: {
      selectEmoji: (emoji: string) => void;
    };
  }
}

export {};
