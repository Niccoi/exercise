
  var listArray =  new Array();
  var i = 1;
  var x = "";
  var input = document.getElementById("todo");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addTodo").click();
    }
});

    function myFunction(){
       x = "add";
      var newlist = document.getElementById("todo").value;
      if(newlist=="" || null){
        alert("Invalid input!");
      }
      else{
      var newlist = document.getElementById("todo").value;
      listArray.push(newlist);
      
      display_list(newlist);
    
      document.getElementById("todo").value ="";
     
    }
    }
 
    Array.prototype.deleteElem = function(val) {
    var index = this.indexOf(val); 
    if (index >= 0) this.splice(index, 1);
    return this;
};

   function delete_todo(selected_todo) {
     x = "delete";
  
    var arr2 = listArray.deleteElem(selected_todo);
      display_list(selected_todo);
      }

      
    function strike_todo(selected_todo){
   
      var selectedItem = listArray.indexOf(selected_todo);
      var toStrikeList = listArray[selectedItem];
      x = "strike";
      //var x = document.getElementById(selectedItem).style.textDecoration = "line-through";
      //console.log(x);
      display_list(selected_todo);
      
    }

    var updateInput;

    function edit_todo(toUpdateTodo){
      x = "edit"

           updateInput = prompt("Enter updated todo", "");
          const index = listArray.indexOf(toUpdateTodo);
          listArray[index] = updateInput;
          display_list(updateInput);
    }


      function display_list(selected_todo){
       
    
        var newList = document.createElement("li");
        newList.id = selected_todo;
        newList.className = "item";
        newList.innerHTML = `
        <label onclick="strike_todo('${selected_todo}')" class="item__checkbox item__checkbox--3">
                <input type="checkbox"><i class="fas fa-check"></i>
              </label>
              <span id="${i}" onclick="edit_todo('${selected_todo}')">${selected_todo}</span>
              <button onclick="delete_todo('${selected_todo}')" class="item__delete"><i class="fas fa-trash-alt"></i></button>
              `;
       
        if(x=="add"){
          
          document.getElementById("list").append(newList);
          console.log(i);
          i++;
        }
        else if(x=="delete"){
       
          document.getElementById(selected_todo).remove(newList);
          i--;
        }
        else if(x=="strike"){
        
          document.getElementById(selected_todo).style.textDecoration = "line-through";
        }
        else if(x=="edit"){
      var y = listArray.indexOf(updateInput) + 1;
     document.getElementById(y).innerHTML = updateInput;
      console.log(updateInput);
     
        }


       /*
        for(var i=0; i<listArray.length; i++){
          
          listItems += `
          <li class="item" id="${listArray[i]}">
              <label onclick="strike_todo('${i}')" class="item__checkbox item__checkbox--3">
                <input type="checkbox"><i class="fas fa-check"></i>
              </label>
              <span onclick="edit_todo('${listArray[i]}')">${listArray[i]}</span>
              <button onclick="delete_todo('${listArray[i]}')" class="item__delete"><i class="fas fa-trash-alt"></i></button>
          </li>
          `
        }

      document.getElementById("list").innerHTML = listItems;*/
      }