"use client"

import { EmojiPicker, EmojiPickerSearch, EmojiPickerContent } from "@/components/ui/emoji-picker"
import { useRef, useEffect, useState } from "react"
import { 
  Smiley, 
  HandPeace, 
  Butterfly, 
  Onigiri, 
  SuitcaseRolling, 
  DribbbleLogo, 
  Lightbulb, 
  YinYang, 
  FlagCheckered,
  Check
} from "@phosphor-icons/react"

// Emoji category mapping
const EMOJI_CATEGORIES = [
  { name: 'smiley', icon: Smiley, label: 'Smiley & Emotion' },
  { name: 'people', icon: HandPeace, label: 'People & Body' },
  { name: 'nature', icon: Butterfly, label: 'Animals & Nature' },
  { name: 'food', icon: Onigiri, label: 'Food & Drinks' },
  { name: 'travel', icon: SuitcaseRolling, label: 'Travel & Places' },
  { name: 'activity', icon: DribbbleLogo, label: 'Activities' },
  { name: 'objects', icon: Lightbulb, label: 'Objects' },
  { name: 'symbols', icon: YinYang, label: 'Symbols' },
  { name: 'flags', icon: FlagCheckered, label: 'Flags' }
]

export default function EmojiPickerComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll indicator state
  const [currentCategory, setCurrentCategory] = useState(0)
  
  // Copy functionality state
  
  // Handle category navigation
  const handleCategoryClick = (categoryIndex: number) => {
    if (!containerRef.current) return
    
    // Map category index to actual category names (exact Frimousse category names)
    const categorySelectors = [
      'Smileys & emotion',
      'People & body',
      'Animals & nature',
      'Food & drink',
      'Travel & places',
      'Activities',
      'Objects',
      'Symbols',
      'Flags'
    ]
    
    const targetCategory = categorySelectors[categoryIndex]
    
    // Try to find the actual scrollable element within the emoji picker
    const actualScrollElement = containerRef.current.querySelector('[data-slot="emoji-picker-viewport"]') ||
                                containerRef.current.querySelector('.overflow-y-auto') ||
                                containerRef.current.querySelector('[data-radix-scroll-area-viewport]') ||
                                containerRef.current
    
     // Find the category heading element - try multiple approaches
     let categoryHeading = actualScrollElement.querySelector(`[data-category="${targetCategory}"]`) ||
                           Array.from(actualScrollElement.querySelectorAll('h3, h2, h1, [data-category]')).find(el => 
                             el.textContent?.includes(targetCategory)
                           )
     
     // Try to find by data-slot="emoji-picker-category-header"
     if (!categoryHeading) {
       categoryHeading = Array.from(actualScrollElement.querySelectorAll('[data-slot="emoji-picker-category-header"]')).find(el => 
         el.textContent?.includes(targetCategory)
       )
     }
     
     if (categoryHeading) {
       // Get all elements with the same category text to find the first occurrence
       const allCategoryElements = Array.from(actualScrollElement.querySelectorAll('*')).filter(el => 
         el.textContent?.trim() === targetCategory
       )
       
       // Find the first occurrence (lowest in the DOM)
       const firstCategoryElement = allCategoryElements.reduce((first, current) => {
         if (!first) return current
         const firstRect = first.getBoundingClientRect()
         const currentRect = current.getBoundingClientRect()
         return currentRect.top < firstRect.top ? current : first
       }, null as Element | null)
       
       const targetElement = firstCategoryElement || categoryHeading
       
       // Scroll to the very top of the category
       targetElement.scrollIntoView({
         behavior: 'smooth',
         block: 'start'
       })
     } else {
      // Try multiple search strategies
      let categoryElement: Element | null = null
      
      // Strategy 1: Exact match
      categoryElement = Array.from(actualScrollElement.querySelectorAll('*')).find(el => 
        el.textContent?.trim() === targetCategory
      ) || null
      
      // Strategy 2: Partial match
      if (!categoryElement) {
        categoryElement = Array.from(actualScrollElement.querySelectorAll('*')).find(el => 
          el.textContent?.trim().toLowerCase().includes(targetCategory.toLowerCase())
        ) || null
      }
      
      if (categoryElement) {
        categoryElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // Fallback to fixed scroll if category not found
        const scrollAmountPerCategory = 200
        const targetScrollTop = categoryIndex * scrollAmountPerCategory
        actualScrollElement.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        })
      }
    }
    
    setCurrentCategory(categoryIndex)
  }
  
  // Scroll detection for category indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      // Try to find the actual scrollable element within the emoji picker
      const actualScrollElement = containerRef.current.querySelector('[data-slot="emoji-picker-viewport"]') ||
                                  containerRef.current.querySelector('.overflow-y-auto') ||
                                  containerRef.current.querySelector('[data-radix-scroll-area-viewport]') ||
                                  containerRef.current
      
      const scrollTop = actualScrollElement.scrollTop
      const scrollHeight = actualScrollElement.scrollHeight
      const clientHeight = actualScrollElement.clientHeight
      
      // Category names to search for
      const categoryNames = [
        'Smileys & emotion',
        'People & body', 
        'Animals & nature',
        'Food & drink',
        'Travel & places',
        'Activities',
        'Objects',
        'Symbols',
        'Flags'
      ]
      
      // Find which category is currently most visible
      let bestCategoryIndex = 0
      let bestVisibility = 0
      
      categoryNames.forEach((categoryName, index) => {
        // Try to find the category heading
        let categoryElement = actualScrollElement.querySelector(`[data-category="${categoryName}"]`) ||
                             Array.from(actualScrollElement.querySelectorAll('h3, h2, h1, [data-category]')).find(el => 
                               el.textContent?.includes(categoryName)
                             )
        
        // Try to find by data-slot="emoji-picker-category-header"
        if (!categoryElement) {
          categoryElement = Array.from(actualScrollElement.querySelectorAll('[data-slot="emoji-picker-category-header"]')).find(el => 
            el.textContent?.includes(categoryName)
          )
        }
        
        // Try multiple search strategies
        if (!categoryElement) {
          categoryElement = Array.from(actualScrollElement.querySelectorAll('*')).find(el => 
            el.textContent?.trim() === categoryName
          ) || undefined
        }
        
        if (!categoryElement) {
          categoryElement = Array.from(actualScrollElement.querySelectorAll('*')).find(el => 
            el.textContent?.trim().toLowerCase().includes(categoryName.toLowerCase())
          ) || undefined
        }
        
        if (categoryElement) {
          const elementRect = categoryElement.getBoundingClientRect()
          const containerRect = actualScrollElement.getBoundingClientRect()
          
          // Calculate how much of the category is visible
          const elementTop = elementRect.top - containerRect.top
          const elementBottom = elementRect.bottom - containerRect.top
          const visibleTop = Math.max(0, elementTop)
          const visibleBottom = Math.min(clientHeight, elementBottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const visibility = visibleHeight / elementRect.height
          
          // If this category is more visible than the current best, update
          if (visibility > bestVisibility) {
            bestVisibility = visibility
            bestCategoryIndex = index
          }
        }
      })
      
      // Fallback to percentage-based calculation if no categories found
      if (bestVisibility === 0) {
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight)
        bestCategoryIndex = Math.min(
          Math.floor(scrollPercentage * EMOJI_CATEGORIES.length),
          EMOJI_CATEGORIES.length - 1
        )
      }
      
      setCurrentCategory(bestCategoryIndex)
    }
    
    const scrollContainer = containerRef.current
    if (scrollContainer) {
      // Try to find the actual scrollable element and listen to its scroll events
      const actualScrollElement = scrollContainer.querySelector('[data-slot="emoji-picker-viewport"]') ||
                                   scrollContainer.querySelector('.overflow-y-auto') ||
                                   scrollContainer.querySelector('[data-radix-scroll-area-viewport]') ||
                                   scrollContainer
      
      actualScrollElement.addEventListener('scroll', handleScroll, { passive: true })
      return () => actualScrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle emoji copy to clipboard
  // Handle emoji selection for macOS app
  const handleEmojiCopy = async (emoji: string) => {
    try {
      console.log('🎯 Selected emoji:', emoji)
      
      // Send to macOS app if bridge is available
      if (window.macOSEmojiKeyboard && window.macOSEmojiKeyboard.selectEmoji) {
        console.log('📤 Sending emoji to macOS app:', emoji)
        window.macOSEmojiKeyboard.selectEmoji(emoji)
        console.log('✅ Emoji sent to macOS app')
      } else {
        // Fallback to clipboard if macOS bridge not available
        console.log('⚠️ macOS bridge not available, using clipboard fallback')
        await navigator.clipboard.writeText(emoji)
      }
    } catch (err) {
      console.error('❌ Failed to handle emoji selection:', err)
    }
  }

  // Set initial scroll position with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        // Try multiple selectors to find the scrollable element
        const scrollableElement = containerRef.current.querySelector('[data-slot="emoji-picker-viewport"]') ||
                                 containerRef.current.querySelector('.overflow-y-auto') ||
                                 containerRef.current.querySelector('[data-radix-scroll-area-viewport]') ||
                                 containerRef.current
        if (scrollableElement) {
          scrollableElement.scrollTop = 30 // Start scrolled down by 30px
          console.log('Scrolled to position:', scrollableElement.scrollTop)
        } else {
          console.log('No scrollable element found')
        }
      }
    }, 500) // Increased delay to 500ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed top-4 left-4 pointer-events-auto z-30">
      <div className="pointer-events-auto" style={{ position: 'relative' }}>
         <div className="h-[252px] w-fit px-2 pt-1 border-t border-l border-r border-b border-gray-300/90" style={{ borderRadius: '48px 48px 40px 40px', paddingBottom: '5px', backgroundColor: '#FAFAF4', position: 'relative', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)' }}>
          {/* Overlay image with 17% opacity */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              backgroundImage: 'url(/images/emoji/overlay.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              opacity: '0.17',
             backgroundColor: '#FAFAF4'
            }}
          ></div>
          {/* Horizontal linear gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
             background: 'linear-gradient(to right, rgba(250, 250, 244, 0) 0%, rgba(250, 250, 244, 1) 24%, rgba(250, 250, 244, 0.24) 62%, rgba(250, 250, 244, 1) 100%)'
            }}
          ></div>
          {/* Inner shadow above gradient */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              boxShadow: 'inset 7px -2px 38px 0px rgba(0, 0, 0, 0.1)'
            }}
          ></div>
          {/* Additional inner shadow */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              boxShadow: 'inset -4px -2px 10px 0px rgba(0, 0, 0, 0.2)'
            }}
          ></div>
          {/* White inner shadow */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              boxShadow: 'inset -2px 2px 2px 1px rgba(255, 255, 255, 0.5)'
            }}
          ></div>
          {/* White inner shadow */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              boxShadow: 'inset 2px -1px 8px 0px rgba(255, 255, 255, 0.4)'
            }}
          ></div>
          {/* White inner shadow at bottom */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              borderRadius: '48px 48px 40px 40px',
              boxShadow: 'inset 0px -1px 4px 1px rgba(255, 255, 255, 0.7)'
            }}
          ></div>
          <EmojiPicker className="h-full flex flex-col">
            <EmojiPickerSearch 
              placeholder="*emoji-keyboard" 
            />
            <div className="flex-1 overflow-hidden px-3 relative border-t border-l border-r border-b border-gray-300/30" style={{ borderRadius: '34px', backgroundColor: '#F2F2ED' }}>
              {/* Radial gradient overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-5" 
                style={{ 
                  borderRadius: '34px',
                  background: 'radial-gradient(circle, rgba(242, 242, 237, 0.4) 0%, rgba(242, 242, 237, 0.4) 60%, rgba(202, 202, 180, 0.4) 100%)',
                  top: '-1px',
                  left: '-1px',
                  right: '-1px',
                  bottom: '-1px'
                }}
              ></div>
              {/* Inner shadow overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-10" 
                style={{ 
                  borderRadius: '34px',
                  boxShadow: 'inset 0 18px 18px 0px rgba(0, 0, 0, 0.05)',
              
                }}
              ></div>
              {/* Top-focused inner shadow */}
              <div 
                className="absolute inset-0 pointer-events-none z-11" 
                style={{ 
                  borderRadius: '34px',
                  boxShadow: 'inset 0 0px 11px 2px rgba(0, 0, 0, 0.15)',
                
                }}
              ></div>
              <div ref={containerRef} className="h-full overflow-y-auto relative z-5">
                <EmojiPickerContent 
                  className="h-full" 
                  onEmojiClick={handleEmojiCopy}
                />
              </div>
              {/* Always visible intense top shadow */}
              <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-[#E2E2DA]/80 via-[#E2E2DA]/40 to-transparent pointer-events-none z-10"></div>
              {/* Always visible intense bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-11 bg-gradient-to-t from-[#E2E2DA]/80 via-[#E2E2DA]/40 to-transparent pointer-events-none z-10"></div>
            </div>
          </EmojiPicker>
          
          {/* Scroll Category Indicator */}
          <div className="absolute -right-7 top-1/2 transform -translate-y-1/2 z-20">
            <div className="scroll-indicator bg-[#A3A3A3]/40 rounded-full px-1 py-1.5 relative">
              <div className="flex flex-col items-center gap-1 relative z-10">
                {EMOJI_CATEGORIES.map((category, index) => {
                  const IconComponent = category.icon
                  return (
                    <div
                      key={category.name}
                      className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        index === currentCategory
                          ? 'text-white scale-100'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      style={{
                        filter: index === currentCategory ? 'none' : 'color-burn'
                      }}
                      title={category.label}
                      onClick={() => handleCategoryClick(index)}
                    >
                      <IconComponent size={12} weight={index === currentCategory ? "fill" : "fill"} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
