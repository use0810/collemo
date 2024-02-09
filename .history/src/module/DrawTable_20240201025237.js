

export default {
  async drawImage(filePath){
    const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(50, 50, 100, 100);
  }
  
};