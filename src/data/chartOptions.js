export let aspectRatio

const ratio = () => {
            const screenWidth=window.innerWidth
            if(screenWidth<768){
                aspectRatio=1
            }
            else if (screenWidth >= 768 && screenWidth < 1179) {
                aspectRatio=1.5
            }
            else if(screenWidth>=1179){
                aspectRatio=2
          }
  console.log(screenWidth)
  console.log(aspectRatio)
          }

window.addEventListener('resize', ratio);
        