
export const imageDownloader = (): Promise<number> => {
    return new Promise((resolve) => {
      const startTime = window.performance.now();
      const imageUrl = "http://localhost:8000/image2.jpg";
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
    const numDownloads = 100000;
    const imageSize = 1534991  //bytes
    let sum = 0
    for (let i = 0; i < numDownloads; i++) {
        let time = await imageDownloader();
        sum += time
      }
    const avgSpeed = sum / numDownloads
    console.log(avgSpeed)
    return(imageSize/avgSpeed)
}
