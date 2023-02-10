
export const imageDownloader = (): Promise<number> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const imageUrl = "http://localhost:8000/image2.jpg";
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const endTime = performance.now();
        const downloadTime = (endTime - startTime) / 1000 // seconds
        resolve(downloadTime);
      };
    });
  };

// Loads image x times, calculates average speed
export const speedTest = async () => {
    const numDownloads = 50000;
    const imageSize = 1534991 / 100000 // kilobytes
    let sum = 0
    for (let i = 0; i < numDownloads; i++) {
        let time = await imageDownloader();
        sum += time
      }
    const avgSpeed = sum / numDownloads
    return(imageSize/avgSpeed)
}

export const formatNumber = (num: number, digits: number=0) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: digits })
};