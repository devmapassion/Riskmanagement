({
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description dissociate contacts selected to workshop
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
  deleteContactWorkshop : function(component,row) {
 // var contactListOld=component.get('v.ContactList');
	//get contact workshop
	var contactworkshop=component.get('c.getContactWorkshop');
	contactworkshop.setParams({
	"item":component.get('v.workshop').Id,
	"contact":row.Id
	});

	contactworkshop.setCallback(this, function(response) {
	 
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
        
            //getdeleteWorkShopContact
            var contactworkshopItem=response.getReturnValue();
            	        
            var action=component.get('c.deleteContactWorkshop');
            action.setParams({
	"item":contactworkshopItem});
	action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {

		              //refresh data ContactList 
		            this.refreshContactWorkshop(component);
		            //fire toast event
		            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message' : 'Contact dissociated with workshop',
                            'type' : 'warning',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
            
            } else if(state ==="ERROR") {
              let errors = response.getError();
              let message = 'Unknown error'; // Default error message
              // Retrieve the error message sent by the server
              if (errors && Array.isArray(errors) && errors.length > 0) {
                 message = errors[0].message;
                    }
                  // Display the message
                console.error(message);
            }
        });
        $A.enqueueAction(action);
            } else if(state ==="ERROR") {
              let errors = response.getError();
              let message = 'Unknown error'; // Default error message
              // Retrieve the error message sent by the server
              if (errors && Array.isArray(errors) && errors.length > 0) {
                 message = errors[0].message;
                    }
                  // Display the message
                console.error(message);
            }
        });
         $A.enqueueAction(contactworkshop);

	},
	
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description getRowActions label
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
	 getRowActions: function (cmp, row, doneCallback) {
	 if(row.invitation){
	  var actions = [{
            'label': 'Dissociation',
            'iconName': 'utility:delete',
            'name': 'dissociate_contact'
        },{
            'label': 'Send Mail',
            'iconName': 'utility:email',
            'name': 'send_email'
        }];
	 }else{
	 var actions = [{
            'label': 'Association',
            'iconName': 'utility:zoomin',
            'name': 'association_contact'
        }];
	 }
        // simulate a trip to the server
        setTimeout($A.getCallback(function () {
            doneCallback(actions);
        }), 200);
    },
    
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description add one row Contact in ContactWorkshop 
 * @history 
 * 2018-08-14 : Salimata NGOM - Implementation
 */
      addContactWorkshop: function(component,row) {
      var newcontactworkshop={};
        newcontactworkshop.sobjectType='orm_ContactWorkshop__c';
	            newcontactworkshop.orm_contact__c = row.Id;
	           newcontactworkshop.orm_notification__c = false;
	            newcontactworkshop.orm_Workshop__c =  component.get("v.workshop").Id;
	            component.set("v.ContactWorkshopList", newcontactworkshop);
      var action = component.get('c.addWorkShopContact');
        action.setParams({
            "items": component.get("v.ContactWorkshopList")
        });
    
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if ( state == "SUCCESS") {
                 //fire toast event
            	
              this.refreshContactWorkshop(component);
                var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message' : 'Contact associated with workshop',
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
            } else if(state ==="ERROR") {
              let errors = response.getError();
              let message = 'Unknown error'; // Default error message
              // Retrieve the error message sent by the server
              if (errors && Array.isArray(errors) && errors.length > 0) {
                 message = errors[0].message;
                    }
                  // Display the message
                console.error(message);
            }
        });
        $A.enqueueAction(action);
      },
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description refresh data ContactList
 * @history 
 * 2018-08-17 : Salimata NGOM - Implementation
 */  
      refreshContactWorkshop:function(component){
      // call the apex class
	  //method and fetch contact list in v.ContactList
       var action = component.get("c.findAllContact");
		action
				.setCallback(
						this,
						function(response) {
							var state = response.getState();
							if (state === "SUCCESS") {
							var storeResponse = response.getReturnValue();

								// set ContactListTemp list with return value
								// from server.
								component.set("v.ContactListTemp",
										storeResponse);
if (component.get("v.ContactListTemp").length > 0) {

      // call the apex class method and fetch
									// contact list workshop
									var action1 = component
											.get("c.findAllContactWorkshop");
									action1.setParams({
										'item' :component.get('v.workshop').Id
									});
									action1
											.setCallback(
													this,
													function(response) {
														var stateworkshop = response
																.getState();
														if (stateworkshop == "SUCCESS") {
															var storeResponseWorkshopcontact = response
																	.getReturnValue();
															component
																	.set(
																			"v.ContactWorkshopList",
																			storeResponseWorkshopcontact);
																			
															// iterate and check
															// if contact is
															// associated to
															// workshop
															//alert('contactList au refresh'+contactListOld);
															//component.set("v.ContactListTemp", contactListOld);
															component.get("v.ContactListTemp").forEach(
																			function(contact) {
																				component.get("v.ContactWorkshopList").forEach(
																								function(contactworkshop) {
																								
																									if (contactworkshop.orm_contact__c == contact.Id) {
																										contact.invitation = "Associated";
																									}
																								});

																			});

																			component.set("v.ContactList", component.get("v.ContactListTemp"));
														}
													});
									$A.enqueueAction(action1);
     
      }
      
							}
							});
				$A.enqueueAction(action);
	},
	   
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description send mail notification to contactWorkshop
 * @history 
 * 2018-08-24 : Salimata NGOM - Implementation
 */
      sendMailContactWorkshop: function(component,row) {
      
        // when user click on Send button 
        // First we get all 3 fields values 	
        var getEmail = row.Email;
        var getSubject = "invitation to "+component.get("v.workshop").Name;
       var getbody = component.get("v.workshop").Description;
        // check if Email field is Empty or not contains @ so display a alert message 
        // otherwise call call and pass the fields value to helper method    
        if ($A.util.isEmpty(getEmail) || !getEmail.includes("@")) {
            alert('Please Enter valid Email Address');
        } else {
             this.sendHelper(component, row,getEmail, getSubject, getbody);
   
        }
      },
      
	sendHelper: function(component,row, getEmail, getSubject, getbody) {
        // call the server side controller method 	
        var action = component.get("c.sendMailMethod");
        // set the 3 params to sendMailMethod method   
        action.setParams({
            'mMail': getEmail,
            'mSubject': getSubject,
            'mbody': getbody
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if state of server response is comes "SUCCESS",
                // display the success message box by set mailStatus attribute to true
                row.invitation="Invited";
                component.set("v.email",getEmail);
                component.set("v.mailStatus", true);
                
            }
 
        });
        $A.enqueueAction(action);
    },
})