import { CanvasTable } from "canvas-table";

export default {
  async drawTable(dataa){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const canvases = [...Array(10)].map(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const data = [
        ["Alfreds Futterkiste", "Maria Anders", "$400", "Germany"],
      ];
      const columns  = [
        { title: "Name" },
        { title: "Contact" },
        { title: "Expense", options: { textAlign: "right" } },
        { title: "Country" }
      ];
      const options = {
        borders: {
          table: { color: "#aaa", width: 1 }
        },
        fit: true,
        title: {
          text: "Expense Report"
        }
      };
      const conf = {data, options };
      // const conf = { columns, data, options };
      const ct = new CanvasTable(canvas, conf);
      await ct.generateTable();
      return canvas;
    });
    
    canvases.forEach(can => canvas.appendChild(can));

    
    return canvas.toDataURL("image/png");
  }
  
};