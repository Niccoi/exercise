todoList = [];
view = $(".add");
columnCounter = 0;
counter = 0;

 todoview = {

	render: function() {
   	
    console.log(todoList)
	
    var x = 0;
    while(x < todoList.length){
      
       var name = todoList[x].name;
       var list = $("#"+name);
      list.empty();
			for ( i = 0; i<todoList[x].task.length; i++) {

				item = $('<li>');
				span = $('<span>');
        checkBoxLabel = $('<label>');
				checkBox = $('<input>');
        checkBoxIcon = $('<i>')

				dltButton = $('<button>');
				dltIcon = $('<i>');
				
				item.attr("class", "item");
				span.attr("class", "item-text");
				checkBox.attr("class", "item-complete");
				dltButton.attr("class", "item-delete");

        newId = todoList[x].task[i].text;

				checkBoxLabel.attr("class", "item__checkbox item__checkbox--3")
				checkBox.attr("type", "checkbox")
        checkBox.attr("id", newId)
        checkBoxIcon.attr("id", newId);
        checkBoxIcon.attr("class", "fas fa-check");

				dltIcon.attr("class", "fas fa-trash-alt")
				dltIcon.attr("id", newId)
				span.attr("id", newId)
        
        
        span.text(newId)
				//Put a line through any items we've 'ticked' off
				if (todoList[x].task[i].completed == true ) {
					span.css("text-decoration", "line-through").css("color", "#bbb");
				} 

				// Add our onclick functions for complete/delete actions
				dltIcon.on("click", function(e){
					var id = e.target.getAttribute("id")
					controller.deleteItem(id)
				} );

				checkBox.on("click", function(e){
					var id = e.target.getAttribute("id")
					controller.completeItem(id)
				});
				span.on("click", function(e){
					var id = e.target.getAttribute("id")
					controller.editItem(id)
				});

				// Append all our elements and add to DOM
    selectList = $("<select>");
    selectList.attr("id",newId);
    selectList.append($("<option>").text(""));
    for(y=0;y<todoList.length;y++){
      optionList = $("<option>")
      optionList.attr("value",todoList[y].name);
      optionList.attr("id",newId)
      optionList.text(todoList[y].name);
      selectList.append(optionList);
      var id;
      selectList.click(function(e){
        id = e.target.getAttribute("id")
      })
      selectList.change(function(){
        selected = this.value;
        controller.transferToOther(selected,id);
      })
    }
    

                checkBox.append(checkBoxIcon);
                checkBoxLabel.append(checkBox);
                dltButton.append(dltIcon);

                item.append(checkBoxLabel);
              // item.appendChild(checkBoxIcon);
                item.append(span);
                item.append(dltButton);
                item.append(selectList);
                list.append(item);  
			}

        x++;
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
      $("#add-item").val("");
    alreadyListed = 0;
    }
    else{
    listItem = { text: item, completed: false }
    todoItems.todoList.push(listItem)
    
    $("#add-item").val("");
    todoview.render(todoItems.todoList) 
  }  
  },

	addItem: function(e) {
		if ((e.code == "Enter") || (e.code == "NumpadEnter")) {

      counter++;
      item = $("#add-item").val();
      controller.addItem(item);
      }
	     
	},
  
showListRadioTag: function(){
  listStatus = document.getElementById("itemListStatus")
      
    listAllButton = document.createElement('input')
    listAllButton.setAttribute("type","radio")
    listAllButton.setAttribute("checked","checked")
    listAllButton.setAttribute("data-id","All")
    listAllButton.setAttribute("name","statusLable")
    listAll = document.createElement('label')
    listAll.textContent = "All"
    
    listCompletedButton = document.createElement('input')
    listCompletedButton.setAttribute("type","radio")
    listCompletedButton.setAttribute("data-id","Completed")
    listCompletedButton.setAttribute("name","statusLable")
    listCompleted = document.createElement('label')
    listCompleted.textContent = "Completed"

    listPendingButton = document.createElement('input')
    listPendingButton.setAttribute("type","radio")
    listPendingButton.setAttribute("data-id","Pending")
    listPendingButton.setAttribute("name","statusLable")
    listPending = document.createElement('label')
    listPending.textContent = "Pending"

    listStatus.appendChild(listAllButton)
    listStatus.appendChild(listAll)
    listStatus.appendChild(listCompletedButton)
    listStatus.appendChild(listCompleted)
    listStatus.appendChild(listPendingButton)
    listStatus.appendChild(listPending)
    

listAllButton.onclick = function(e){
  showListOptions.showAll();
}
listCompletedButton.onclick = function(e){
  showListOptions.showCompleted();
}
listPendingButton.onclick = function(e){
  showListOptions.showPending();
} 
}, 

}
column = {
  addNewColumn: function(e){
    if ((e.code == "Enter") || (e.code == "NumpadEnter")) {
      
      newColumnName = $("#add-item").val();
      $("#add-item").val("");
    column.addObejctColumn(newColumnName);
    }
      
  },
  addObejctColumn: function(newObject){
    alreadyListed = 0;

     for(i=0;i<todoList.length; i++){
        if(todoList[i].name == newObject){
          alreadyListed = 1;
        }
   }
  if(alreadyListed==1){
    alert("Todo name is already listed!")
  }
  else{
    newlist = {
      name: newObject,
      task: []
      }
    todoList.push(newlist);
      column.renderColumn(newObject);
    }
  },
  renderColumn: function(newColumnName){
    todoview.render();

    
    wrapper = $("<div>");
    wrapper.attr("class","app");
  //  wrapper.attr("id",newColumnName);
    columnName = $("<p>");
    columnAddbutton =  $("<button>");
    columnAddbutton.text("+ Add new list to " +newColumnName);
    columnAddbutton.attr("id",columnCounter);
    columnName.text(newColumnName);
    columnList = $("<ul>");
    columnList.attr("id",newColumnName);
    
    view.append(columnName);
    wrapper.append(columnAddbutton);
    wrapper.append(columnList);
    view.append(wrapper);
    columnCounter++;

  
    columnAddbutton.on("click", function(e){
      newId = e.target.getAttribute("id");
      task = prompt("Enter new task");
      controller.addItem(newId,task);
      
    })
  }
}

controller = {
	init: function() {
    //todoview.showListRadioTag();
		todoview.render()
    
	},
	
	addItem: function(id,newtask) {
    var newId = id;
    
   /*
    if(todoList.length>0){
      todoview.checkItem(id, task)
    }
    else{ */
     
      listItem = { text: newtask, completed: false }
      todoList[newId].task.push(listItem); 
      todoview.render();
    
      $("#add-item").val("");
  //   }
	
	},
	
	completeItem: function(item) {
    var x=0;
    
    console.log(item)
		while(x<todoList.length){
      for(i=0; i<todoList[x].task.length; i++){
        if(todoList[x].task[i].text == item){
          todoList[x].task[i].completed = !todoList[x].task[i].completed;
        }
      }
      x++;
    }
		
		todoview.render()
	},
  transferToOther: function(selected,newId){
    todoview.render();
    console.log(selected) //name
    console.log(newId) //text
    var taskCompleted ;
    x=0;
    //delete from old list
    while(x<todoList.length){
      for(i=0; i<todoList[x].task.length; i++){
        if(todoList[x].task[i].text == newId){
          taskCompleted = todoList[x].task[i].completed
          todoList[x].task.splice(i,1);
        }
      }
      x++;
    }
    y=0;
    //add to new list
    while(y<todoList.length){
      listItem = { text: newId, completed: taskCompleted }
      if(todoList[y].name == selected){
        todoList[y].task.push(listItem);
      }
      
    y++;
}
    todoview.render();
  },

	deleteItem: function(item) {
    var x=0;
    var index;
    console.log(item)
		while(x<todoList.length){
      for(i=0; i<todoList[x].task.length; i++){
        if(todoList[x].task[i].text == item){
          todoList[x].task.splice(i,1);
        }
      }
   x++;
   }
	  todoview.render()
	},
	editItem: function(item){
    var x=0;
    var index;
    console.log(item)
		while(x<todoList.length){
      for(i=0; i<todoList[x].task.length; i++){
        if(todoList[x].task[i].text == item && todoList[x].task[i].completed == false){
          var updatedTodo = prompt("Update list");
		  	  todoList[x].task[i].text = updatedTodo;
			    todoview.render();
        }
      }
    x++;}

		
	}
}

showListOptions = {
  showAll: function(){
    todoview.render();
  },
  showCompleted: function(){
    completeTodo = []
    for (let i = 0; i < todoItems.todoList.length; i++) {
      if (todoItems.todoList[i].completed) {
        
          completeTodo.push(todoItems.todoList[i])
      }
  }
  todoview.render(completeTodo)
  },
  showPending: function(){
    pendingTodo = [];
    for (let i = 0; i < todoItems.todoList.length; i++) {
      if (!todoItems.todoList[i].completed) {
        
          pendingTodo.push(todoItems.todoList[i])
          
      }
  }
    todoview.render(pendingTodo)
  },
}
controller.init()
