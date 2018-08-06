({
	doInit : function(component, event, helper) {
	 // call the apex class method and fetch contact list  
         var action = component.get("c.findAllContact");
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              }
        });
        $A.enqueueAction(action);
		
	}
})