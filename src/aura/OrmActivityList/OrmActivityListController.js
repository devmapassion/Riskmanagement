({
	
    
     initRecords: function(component, event, helper) {
    
      // call the apex class method and fetch activity list  
         var action = component.get("c.findAllActivity");
       // var assmntDataId=component.get('v.assessmentData').Id;
        // alert('assesmment= '+assmntDataId);
        // var assmntDataId='a051H00000aQvq3QAC';
        // action.setParam('assessmt',assmntDataId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ActivityList list with return value from server.
                  component.set("v.ActivityList", storeResponse);
              }
        });
        $A.enqueueAction(action);
         // set deafult count and select all checkbox value to false on load 
    component.set("v.selectedCount", 0);
    component.find("box3").set("v.value", false);
    },  
   
    Save: function(component, event, helper) {
      // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
              // call the saveActivity apex method for update inline edit fields update 
               var action = component.get("c.saveActivity");
                  action.setParams({
                    'lstActivity': component.get("v.ActivityList")
                  });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set ActivityList list with return value from server.
                        console.log(JSON.stringify(storeResponse));
                    component.set("v.ActivityList", storeResponse);
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn",false);
                    alert('Updated...');
                }
            });
            $A.enqueueAction(action);
        } 
    },
    
    cancel : function(component,event,helper){
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire(); 
    },
    removeActivity:function(component,event,helper){
    //is checked delete activity show popup  message confirmation
    component.set("v.showConfirmRemoveActivity",true);
    
    },
    closeModalRemove:function(component,event,helper){
    component.set("v.showConfirmRemoveActivity",false);
    },
    
    removeActSelected: function(component,event,helper){
    component.set("v.showConfirmRemoveActivity",false);
    //fire event to childActivityList
  
		var evt = $A.get("e.c:OrmRemoveRecordActivityEvnt");
	
		evt.setParams({
			"countSelected" :component.get("v.selectedCount") 
		});
		evt.fire();
    }
 
})