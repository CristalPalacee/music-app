import { Variants } from 'framer-motion'

export const cardItem = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -110 : 110,
  },
  visible: {
    opacity: 4,
    x: 0.2,
    transition: {
      type: 'spring',
      bounce: 0.5,
      duration: 1.5,
    },
  },
})
