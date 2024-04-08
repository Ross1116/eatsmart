import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';

export default function Paragraph({paragraph}: {paragraph: string}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.35"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-medium w-1/2 flex flex-wrap max-w-full"
    >
    {
      words.map( (word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>
  )
}

const Word = ({children, progress, range}: {children: string, progress: any, range: any}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="relative mr-2">
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

const Char = ({children, progress, range} : {children: string, progress: any, range: any}) => {
  const opacity = useTransform(progress, range, [0,1])
  return (
    <span>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{opacity: opacity}}>{children}</motion.span>
    </span>
  )
}