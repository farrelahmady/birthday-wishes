const imgAnim = (elm, src = [], distance, unit = 'px', interval = 10) => {
   elm.style.position = 'relative'
   let pos = distance
   let opc = 0
   let index = 0
   const changeImg = () => {
      if (index === src.length) {
         index = 0
      }
      elm.src = "../img/" + src[index]
   }

   elm.onload = () => {
      let anim = setInterval(() => {
         elm.style.left = pos + unit
         elm.style.opacity = opc
         if (opc >= 1) {
            elm.style.left = 0 + unit
            clearInterval(anim)
            setTimeout(() => {
               anim = setInterval(() => {
                  elm.style.left = pos + unit
                  elm.style.opacity = opc
                  if (opc <= 0) {
                     clearInterval(anim)
                     index++
                     pos = distance
                     changeImg()
                  }
                  
                  pos -= distance/(interval*10)
                  opc -= 1/(interval*10)
               }, interval);
            }, 2000);
         }

         pos -= distance/(interval*10)
         opc += 1/(interval*10)
      }, interval);
   }
   changeImg()
}

const slideDown = (elm, interval = 10) => {
   elm.style.display = 'block'
   elm.style.overflow = 'hidden'
   let elmHeight = elm.offsetHeight
   let height = 0
   elm.style.height = '0px'

   let anim = setInterval(() => {
      elm.style.height = height + 'px'
      if (height >= elmHeight) {
         elm.style.height = elmHeight + 'px'
         clearInterval(anim)
      }
      height += elmHeight/(interval*10)
   }, interval);

}

const typeWritting = (elm, text = [], interval = 20, delay = 50) => {
   elm.innerHTML = ''
   let arrIndex = 0
   let strIndex = 0
   const run = () =>{
      elm.style.opacity = 0
      fadeIn(elm, 10, 'block')
      let str = text[arrIndex]
      let anim = setInterval(() => {
         elm.innerHTML += str[strIndex]
         strIndex++
         if (strIndex >= str.length) {
            clearInterval(anim)
            arrIndex++
            if (arrIndex < text.length) {
               setTimeout(() => {
                  fadeOut(elm, 10, 'block')
                  strIndex = 0
                  elm.innerHTML = ''
                  run()
               }, delay);
            }
         }
      }, interval);
   }
   run()
}

const fadeIn = (elm, interval, targetDisplay) => {
   elm.style.display = 'none'
   elm.style.opacity = 0
   elm.style.display = '' + targetDisplay
   let opc = 0
   let anim = setInterval(() => {
      elm.style.opacity = opc
      if (opc >= 1) {
         clearInterval(anim)
         if (targetDisplay !== 'undefine') {
            elm.style.display = '' + targetDisplay
         }
      }
      opc += 1/(interval*10)
   }, interval);
}

const fadeOut = (elm, interval, targetDisplay) => {
   elm.style.opacity = 1
   let opc = 1
   let anim = setInterval(() => {
      elm.style.opacity = opc
      if (opc <= 0) {
         clearInterval(anim)
         if (targetDisplay !== 'undefine') {
            elm.style.display = '' + targetDisplay
         }
         
      }
      opc -= 1/(interval*10)
   }, interval);
}

export {imgAnim, slideDown, typeWritting, fadeIn, fadeOut}