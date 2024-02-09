import { CanvasTable } from "canvas-table";

export default {
  async drawTable(dataa){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const canvases = [...Array(10)].map(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 100;
      return canvas;
    });
    
    canvases.forEach(can => canvas.appendChild(can));

    
    return canvas.toDataURL("image/png");
  }
  
};