let aspect
let screenWidth=window.innerWidth
if(screenWidth<768){
    aspect=0.5
}
else if (screenWidth >= 768 && screenWidth < 1178) {
    aspect=1.5
}
else if(screenWidth>=1178){
    aspect=2
}

export let aspectRatio = aspect


const ratio = () => {
            screenWidth=window.innerWidth
            if(screenWidth<768){
                aspectRatio=1
            }
            else if (screenWidth >= 768 && screenWidth < 1178) {
                aspectRatio=1.5
            }
            else if(screenWidth>=1178){
                aspectRatio=2
          }
          }

window.addEventListener('resize', ratio);
        