import { defineConfig } from "@chakra-ui/react"
import { createSystem } from '@chakra-ui/react'

 const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
      //   "html, body": {
      //   background: {value:"white"}, 
      //   color: {value:"black"},     
      // },
      },
      
    },
  },
})
export const system = createSystem(theme)
