// import { CanvasTable, CTData, CTColumn, CTOptions } from "canvas-table";

export default {
  async drawTable(data){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const data: CTData = [
      ["Alfreds Futterkiste", "Maria Anders", "$400", "Germany"],
      ["Centro comercial Moctezuma", "Francisco Chang", "$200", "Mexico"],
      ["Ernst Handel", "Roland Mendel", "$1400", "Austria"],
      ["Island Trading", "Helen Bennett", "$600", "UK"],
      ["Laughing Bacchus Winecellars", "Yoshi Tannamuri", "$800", "Canada"],
      ["Magazzini Alimentari Riuniti", "Giovanni Rovelli", "$100", "Italy"]
    ];
    const columns  = [
      { title: "Name" },
      { title: "Contact" },
      { title: "Expense", options: { textAlign: "right" } },
      { title: "Country" }
    ];
    const options: CTOptions = {
      borders: {
        table: { color: "#aaa", width: 1 }
      },
      fit: true,
      title: {
        text: "Expense Report"
      }
    };
    return canvas.toDataURL("image/png");
  }
  
};