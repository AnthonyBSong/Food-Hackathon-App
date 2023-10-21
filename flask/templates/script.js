function addRow(itemName,date) {
  //itemName is a string
  //date is a string representing a date
  // Get the table element
  const table = document.getElementById("fridgeList").getElementsByTagName("tbody")[0];

  // Create a new row element
  const newRow = table.insertRow();

  // Insert cells into the new row
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  cell1.outerHTML = "<th><span class='ms-2'>"+ itemName + "</span></th>";
  var diff = new Date(date) - new Date();
  console.log("Diff" + diff);
  var daysTillExpire = Math.ceil(diff / (1000 * 60 * 60 * 24));
  console.log("daysTillExpire" + daysTillExpire);
  cell2.innerHTML = "In " + daysTillExpire + " days";
  if(daysTillExpire <= 3)
    cell3.innerHTML = "<h6 class='mb-0'><span class='badge bg-danger text-white'>Use Soon</span></h6>"
  else if(daysTillExpire <= 7)
    cell3.innerHTML = "<h6 class='mb-0'><span class='badge bg-warning text-white'>Warning</span></h6>";
  else
    cell3.innerHTML = "<h6 class='mb-0'><span class='badge bg-success text-white'>Not Urgent</span></h6>";
  cell4.innerHTML = "<button type = 'submit' name = 'action' value = 'submit' href='#!' data-mdb-toggle='tooltip' title='Done' class='btn btn-primary bg-success border-success'><i class='bi bi-check2-square'></i></button>"
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
