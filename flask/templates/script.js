function addRow(text) {
    console.log("adding row")
    // create a new row with the inputted text
    var newRow = $("<tr>").append($("<td>").text(text));
    
    // append the new row to the table
    $("#fridgeList").append(newRow);
}
