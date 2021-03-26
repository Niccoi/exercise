todoItems = {todoList: []}
counter = 0
/*function baseTodo(name) {
  return {
    name: name,
    items: []
  }
}
// Array
// Object
// Manipulate object//array
var models = {
  todos: [baseTodo('Todo')]
} */

 todoview = {

	clearList: function() {
		var range = document.createRange();
		range.selectNodeContents(document.getElementById("list"));
		range.deleteContents();
	},

	render: function() {
		
		this.clearList();	
		
		if (todoItems.todoList.length != 0) {

			list = document.getElementById("list")

			for (var i = todoItems.todoList.length - 1; i >= 0; i--) {

				item = document.createElement('li');
				span = document.createElement('span');
                checkBoxLabel = document.createElement('label');
				checkBox = document.createElement('input');
                checkBoxIcon = document.createElement('i')

				dltButton = document.createElement('button');
				dltIcon = document.createElement('i');
				
				item.className = "item"
				span.className = "item-text"
				checkBox.className = "item-complete"
				dltButton.className = "item-delete"

                // Add our icons
				checkBoxLabel.setAttribute("class", "item__checkbox item__checkbox--3")
				checkBox.setAttribute("type", "checkbox")
                checkBox.setAttribute("data-id", i)
                checkBoxIcon.setAttribute("data-id", i);
                checkBoxIcon.setAttribute("class", "fas fa-check");

				dltIcon.setAttribute("class", "fas fa-trash-alt")
				dltIcon.setAttribute("data-id", i)
				span.setAttribute("data-id", i)
               
				
				span.textContent = todoItems.todoList[i].text
				
				// Put a line through any items we've 'ticked' off
				if (todoItems.todoList[i].completed) {
					span.setAttribute("style", "text-decoration: line-through; color: #bbb")
				}


				

				// Add our onclick functions for complete/delete actions
				dltIcon.onclick = function(e){
					var id = e.target.getAttribute("data-id")
					controller.deleteItem(id)
				} 

				checkBox.onclick = function(e){
					var id = e.target.getAttribute("data-id")
					controller.completeItem(id)
				}
				span.onclick = function(e){
					var id = e.target.getAttribute("data-id")
					controller.editItem(id)
				}
				//span.setAttribute("onclick","controller.editItem('" + i + "')")

				// Append all our elements and add to DOM
                
                
                checkBox.appendChild(checkBoxIcon);
                checkBoxLabel.appendChild(checkBox);
                dltButton.appendChild(dltIcon);

                item.appendChild(checkBoxLabel);
              // item.appendChild(checkBoxIcon);
                item.appendChild(span);
                item.appendChild(dltButton);
                list.appendChild(item);

			
                 
        
			}		
		} 
	},
  checkItem: function(item){
    alreadyListed = 0;
    for (var i = todoItems.todoList.length - 1; i >= 0; i--) {
      if(todoItems.todoList[i].text == item && !todoItems.todoList[i].completed) {
         alreadyListed = 1;        
      }
    }
    if(alreadyListed == 1){
      alert("Value already listed")
    document.getElementById("add-item").value = ""
    alreadyListed = 0;
    }
    else{
    listItem = { text: item, completed: false }
    todoItems.todoList.push(listItem)
    
    document.getElementById("add-item").value = ""
    todoview.render() 
  }  
  },

	addItem: function(e) {
		if ((e.code == "Enter") || (e.code == "NumpadEnter")) {
      item = document.getElementById("add-item").value
  
			if (item != "") {     
              controller.addItem(item);
          return false;	
            
			}
     

      }
	     
	},


}

controller = {
	init: function() {
		todoview.render()
	},
	
	addItem: function(item) {
   
    if(todoItems.todoList.length>0){
      todoview.checkItem(item)
    }
    else{

      listItem = { text: item, completed: false }
      todoItems.todoList.push(listItem)
      
      document.getElementById("add-item").value = ""
      todoview.render()   
      
     }
	
   
	},
	
	completeItem: function(item_index) {
		
		todoItems.todoList[item_index].completed = !todoItems.todoList[item_index].completed
		todoview.render()
	},

	deleteItem: function(item_index) {
		todoItems.todoList.splice(item_index, 1)
		todoview.render()
	},
	editItem: function(item_index){
		if(todoItems.todoList[item_index].completed !== true){
			var updatedTodo = prompt("Update todo");
			todoItems.todoList[item_index].text = updatedTodo;
			todoview.render();
		}
		
	}
}


controller.init()

/*
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


     */

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

      document.getElementById("list").innerHTML = listItems;
      } */
