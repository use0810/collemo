import { CanvasTable } from "canvas-table";

export default {
  async drawTable(dataa){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const data = [
      ["Alfreds Futterkiste", "Maria Anders", "$400", "Germany"],
    ];
    // const columns  = [
    //   { title: undefined },
    //   { title: undefined },
    //   { title: undefined },
    //   { title: undefined }
    // ];
    const options = {
      borders: {
        table: { color: "#aaa", width: 1 }
      },
      fit: true,
      title: {
        text: "Expense Report"
      }
    };
    // const conf = { columns, data, options };
    const conf = {  data, options };
    const ct = new CanvasTable(canvas, conf);
    await ct.generateTable();
    return canvas.toDataURL("image/png");
  }
  
};