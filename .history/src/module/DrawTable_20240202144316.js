
export default {
  async drawTable(collemo, name.){
    const item_names = ["ポス友", "羽", "お守り", "クローバー", "ブレス", "大会１", "大会２", "大会３"];
    const item_counts = collemo.list.map(item => item.count);
    let item_sum =[];
    let temp = 0;
    for (let i =0; i < item_counts.length; i++){
      temp += item_counts[i];
      if ((i+1) % 11 === 0) {
        item_sum.push(temp);
        temp = 0;
      }
    }
    
    const canvas_w = 3508;
    const canvas_y = 2480;
    const title = name.replace('.json', '');
    const title_x = 254;
    const title_line_x = 254;
    const title_line_y = 374;
    const title_line_l = 3000;
    const item_total = item_sum.reduce((a,b) => a+b, 0);
    const item_total_x = 3210;
    const item_total_line_x = 2710;
    const item_total_line_y = 2350;
    const item_total_line_l = 500;
    const cells_x = [250, 631, 1012, 1393, 1774, 2155, 2536, 2917];
    // セルの縦の配列ｙの並び：（上から順に）セル１、セル２.....小計、アイテム名
    const cells_y = [ 649, 774, 899, 1024, 1149, 1274, 1399, 1524, 1649, 1774, 1899, 2064, 524]
    const cell_w = 341;
    const cell_h = 125;
    const colors = ["#FFFFFF", "#FFFFE0", "#FFF0E0", "#FFE0E0", "#FFE0FF", "#F0E0FF", "#E0FFFF", "#E0F0FF", "#E0FFE0", "#CCCCCC", "#C2C2D6","#F0F0F0", "#F0F0F0"];

    const canvas = document.createElement("canvas");;
    canvas.width = canvas_w;
    canvas.height = canvas_y;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 60px serif";

    cells_y.forEach((y_point, y_index) => {
      cells_x.forEach((x_point, x_index) => {
        ctx.stroleStyle = "black";
        ctx.lineWidth = y_index < 11 ? 10 : 20;
        
        ctx.fillStyle = colors[y_index];
        ctx.strokeRect(x_point,y_point,cell_w,cell_h);
        ctx.fillRect(x_point,y_point,cell_w,cell_h);

        if(y_index == 12) {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.fillText(item_names[x_index], x_point+cell_w/2, y_point+cell_h/1.5);
        }
      })
    })
    ctx.fillStyle = "#000000";
    ctx.textAlign = "right";
    cells_x.forEach((x_point, x_index) => {
      cells_y.forEach((y_point, y_index) => {
        if(y_index < 11) {
          ctx.fillText(item_counts[temp], x_point+cell_w-10, y_point+cell_h/1.5);
          temp +=1;
        }
        if(y_index === 11) {
          ctx.fillText(item_sum.shift(), x_point+cell_w-10, y_point+cell_h/1.5);
        }
      })
    })
    ctx.font = "bold 120px serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(title, title_x, title_line_y-40);
    ctx.font = "bold 100px serif";
    ctx.textAlign = "right";
    ctx.fillText("合計:"+item_total, item_total_x, item_total_line_y-20);

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(title_line_x, title_line_y);
    ctx.lineTo(title_line_x+title_line_l, title_line_y);
    ctx.stroke();
    ctx.moveTo(item_total_line_x, item_total_line_y);
    ctx.lineTo(item_total_line_x+item_total_line_l, item_total_line_y);
    ctx.stroke()

    
    return canvas.toDataURL("image/jpeg");
  }
  
};