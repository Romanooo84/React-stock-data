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
                aspectRatio=0.5
            }
            else if (screenWidth >= 768 && screenWidth < 1178) {
                aspectRatio=1
            }
            else if(screenWidth>=1178){
                aspectRatio=2
          }
          chartOptions()
          }

window.addEventListener('resize', ratio);

export const chartOptions =()=>{ 
    return{
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio : 1.4,
    scales: {
        y: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 15, 
                family: 'Oswald',
              },
            },
            beginAtZero: false
          },
        x: {
          grid: {
            display: false, 
          },
          ticks: {
            font: {
              size: 15, 
              family: 'Oswald', 
            },
          },
        },
      },
      plugins: {
        legend: {
            labels: {
              font: {
                size: 15, 
                family: 'Oswald', 
              },
            },
          },
      },
};}

export const barchartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    scales: {
        y: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 15, 
                family: 'Oswald',
              },
            },
            beginAtZero: false
          },
        x: {
          grid: {
            display: false, 
          },
          ticks: {
            font: {
              size: 15, 
              family: 'Oswald', 
            },
          },
        },
      },
      plugins: {
        legend: {
            labels: {
              font: {
                size: 15, 
                family: 'Oswald', 
              },
            },
          },
      },
    }

export   const barVolumeChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    scales: {
        y: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 15, 
                family: 'Oswald',
              },
            },
            beginAtZero: false
          },
        x: {
          grid: {
            display: false, 
          },
          ticks: {
            font: {
              size: 15, 
              family: 'Oswald', 
            },
          },
        },
      },
      plugins: {
        legend: {
            labels: {
              font: {
                size: 15, 
                family: 'Oswald', 
              },
            },
          },
      },
};
        