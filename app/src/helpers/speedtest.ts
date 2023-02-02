
export const imageDownloader = (): Promise<number> => {
    return new Promise((resolve) => {
      const startTime = window.performance.now();
      const imageUrl = "http://localhost:8000/image.jpeg";
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const endTime = window.performance.now();
        const downloadTime = endTime - startTime;
        console.log(downloadTime)
        resolve(downloadTime);
      };
    });
  };

// Loads image 10 times, calculates average speed
export const speedTest = async () => {
    const imageSize = 101.5
    let sum = 0
    for (let i = 0; i < 100000; i++) {
        let time = await imageDownloader()
        sum += time}
    const avgSpeed = sum / 100000
    return(imageSize/avgSpeed)
}
