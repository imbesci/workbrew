
export const imageDownloader = (): Promise<number> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const imageUrl = "http://localhost:8000/image.jpeg";
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const endTime = Date.now();
        const downloadTime = endTime - startTime;
        resolve(downloadTime);
      };
    });
  };

// Loads image 10 times, calculates average speed
export const speedTest = async () => {
    const imageSize = 101.5
    let sum = 0
    for (let i = 0; i < 10; i++) {
        let time = await imageDownloader()
        sum += time}
    const avgSpeed = sum / 10
    return(imageSize/avgSpeed)
}
