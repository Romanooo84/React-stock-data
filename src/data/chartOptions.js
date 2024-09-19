export let aspectRatio

const ratio = () => {
            const screenWidth=window.innerWidth
            if(screenWidth<768){
                aspectRatio=1.2
            }
            else if(screenWidth>=768 && screenWidth<1158){
                aspectRatio=1.5
            }
            else{
                aspectRatio=2
            }
        }

window.addEventListener('resize', ratio);
        
    
export const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio,
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
    
export  const barchartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio,
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
    
export const barVolumeChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio,
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