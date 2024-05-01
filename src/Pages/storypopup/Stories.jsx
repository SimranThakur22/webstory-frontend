// import React, { useState, useEffect, useRef } from 'react'
// import './storystyle.css'

// const Stories = props => {
//   const { images } = props

//   /* define base variable */
//   const nextMsec = props.nextMsec || 5000
//   const barHeight = props.barHeight || 1.5
//   const backgroundSize = props.backgroundSize || 'cover'
//   const backgroundColor = props.backgroundColor || '#202322'

//   const [position, setPosition] = useState(0)
//   const [isTransition, setIsTransition] = useState(true)
//   const [isReset, setIsReset] = useState(true)
//   const timeout = useRef([])

//   useEffect(() => {
//     console.log({
//       position
//     })
//   }, [position])

//   /* common functions */
//   function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
//   }
//   function noneTransition(callback) {
//     return new Promise(async resolve => {
//       setIsTransition(false)
//       await sleep(20)
//       callback()
//       await sleep(20)
//       setIsTransition(true)
//       await sleep(20)
//       resolve()
//     })
//   }
//   async function startCarousel(p) {
//     if (timeout.current.length > 0) {
//       timeout.current.forEach(n => clearTimeout(n))
//       timeout.current = []
//     }

//     setIsReset(false)
//     setPosition(p)

//     timeout.current.push(
//       setTimeout(async () => {
//         if (p === images.length - 1) {
//           await sleep(2000)
//           await noneTransition(() => setIsReset(true))
//           startCarousel(0)
//         } else {
//           startCarousel(p + 1)
//         }
//       }, nextMsec)
//     )
//   }
//   async function skip(w) {
//     let afterPosition = position + 1
//     const beforePosition = position - 1
//     const isLast = position === images.length - 1
//     const isFirst = position === 0
//     if (w === 'next') {
//       afterPosition = isLast ? 0 : afterPosition
//     }

//     if (w === 'before') {
//       afterPosition = isFirst ? 0 : beforePosition
//     }

//     await noneTransition(async () => {
//       setIsReset(true)
//       await sleep(20)
//       startCarousel(afterPosition)
//     })
//   }

//   /* initialize */
//   useEffect(() => {
//     ;(async () => {
//       await noneTransition(() => setIsReset(true))
//       startCarousel(0)
//     })()
//   }, [props.images])

//   /* when flip */
//   const coordX = useRef(0)
//   function ontouchstart(e) {
//     const touches = e.changedTouches[0]
//     coordX.current = touches.pageX
//   }
//   function ontouchend(e) {
//     const touches = e.changedTouches[0]
//     const diff = touches.pageX - coordX.current
//     if (Math.abs(diff) > 100) {
//       skip(Math.sign(diff) > -1 ? 'before' : 'next')
//     }
//   }

//   if (images.length < 2) return null

//   return (
//     <div
//       className="reactInstagramCarousel"
//       onTouchStart={ontouchstart}
//       onTouchEnd={ontouchend}>
//       {images.map((src, index) => (
//         <div
//           className="reactInstagramCarousel__image"
//           style={{
//             backgroundImage: `url(${src})`,
//             backgroundSize,
//             backgroundColor,
//             opacity: isReset
//               ? index === 0
//                 ? 1
//                 : 0
//               : index === position
//               ? 1
//               : 0
//           }}
//           key={`${src}-${index}`}
//         />
//       ))}

//       <div
//         className="reactInstagramCarousel__skip--left"
//         onClick={() => skip('before')}
//       />
//       <div
//         className="reactInstagramCarousel__skip--right"
//         onClick={() => skip('next')}
//       />

//       <div className="reactInstagramCarousel__progressBarSpace">
//         {images.map((_, k) => (
//           <div
//             className="reactInstagramCarousel__progressBar"
//             style={{
//               width: `calc(100% / ${images.length} - 6%)`,
//               height: `${barHeight}px`
//             }}
//             key={k}>
//             <div
//               className="reactInstagramCarousel__progressBar--load"
//               style={{
//                 width: isReset ? '0' : k <= position ? '100%' : '0',
//                 transition: isTransition
//                   ? k === position
//                     ? `${nextMsec}ms linear`
//                     : '0s'
//                   : '0s'
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         <h1>Your Heading</h1>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias eveniet numquam delectus, amet ullam animi ut id! Iure praesentium, eveniet atque ea ab laudantium ad explicabo, quas, quis blanditiis commodi.</p>
//         </div>
//     </div>
//   )
// }

// export default Stories
