// import { CanvasTable, CTData, CTColumn, CTOptions } from "canvas-table";

export default {
  async drawImage(data){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
    return canvas.toDataURL("image/png");
}
  
};