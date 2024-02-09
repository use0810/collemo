import { CanvasTable } from "canvas-table";

export default {
  async drawTable(data){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const datas = [
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
    const ct = new CanvasTable(canvas ( columns, datas, options ));
    await ct.generateTable();
    return canvas.toDataURL("image/png");
  }
  
};