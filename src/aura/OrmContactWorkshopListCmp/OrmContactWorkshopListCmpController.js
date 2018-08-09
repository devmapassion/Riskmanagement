({
	doInit : function(component, event, helper) {
	      // Set the columns of the Table
       component.set('v.columns', [
           {label: 'Name', fieldName: 'Name', type: 'text'},
           {label: 'Notification', fieldName: 'association', type: 'boolean'} ]);
          
	 // call the apex class method and fetch contact list  
       /**  var action = component.get("c.findAllContact");
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                // console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              }
        });
        $A.enqueueAction(action);
         
		**/
	},
	
	openModalContacts : function(component, event, helper) {
	// call the apex class method and fetch contact list workshop
          var action1 = component.get("c.findAllContactWorkshop");
          action1.setParams({
          'item':event.getParam('Workshop')
          });
             action1.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ContactList list with return value from server.
                  //component.set("v.ContactList", storeResponse);
              }
        });
	 // call the apex class method and fetch contact list  
         var action = component.get("c.findAllContact");
         action.setParams({
         'item':event.getParam('Workshop')});
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                console.log(JSON.stringify(storeResponse));
               var listData=[];
               listDatat.push("name",sali);
               
            }
            
               // set ContactList list with return value from server.
                  component.set("v.ContactList", storeResponse);
              
        });
        $A.enqueueAction(action);
        $A.enqueueAction(action1);
	component.set("v.isOpenModalContactWorkshop", true);
	 component.set('v.workshop', event.getParam('Workshop'));
	},
	
	closeModalWorkshopContact: function(component, event, helper) {
	component.set("v.isOpenModalContactWorkshop", false);
	},
	   getselectedRows: function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var contactsWorkshop = [];
        selectedRows.forEach(function(selectedRow) {
        console.log('id='+selectedRow.Id);
        var newcontactworkshop={};
        newcontactworkshop.sobjectType='orm_ContactWorkshop__c';
	            newcontactworkshop.orm_contact__c = selectedRow.Id;
	           newcontactworkshop.orm_notification__c = false;
	            newcontactworkshop.orm_Workshop__c =  component.get("v.workshop").Id;
	        
	            contactsWorkshop.push(newcontactworkshop);
	            console.log('v.ContactWorkshopList  nbre' + component.get("v.ContactWorkshopList").length);
        });
       
        component.set("v.ContactWorkshopList", contactsWorkshop);
        
    },
	
	createContactWorkshop :function(component, event, helper) {
	
        var relatedcontactworkshop= component.get("v.ContactWorkshopList");
       
        var action = component.get('c.addWorkShopContact');
        action.setParams({
            "items": relatedcontactworkshop
        });
       alert(JSON.stringify(relatedcontactworkshop));
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state == "SUCCESS") {
                alert("successful association");
            } else {
                alert("failed association");
            }
        });
        $A.enqueueAction(action);
        	component.set("v.isOpenModalContactWorkshop", false);
	},
	/**
	refreshContactWorkshop  :function(component, event, helper) {
	component.set('v.workshop', event.getParam('Workshop'));
	
	 // call the apex class method and fetch contact workshop list  
         var action = component.get("c.findAllContactWorkshop");
          action.setParams({
                "item": component.get("v.workshop");
            });
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set Contact workshop list with return value from server.
                  component.set("v.ContactWorkshopList", storeResponse);
              }
        });
        $A.enqueueAction(action);
		
	},*/

	
})