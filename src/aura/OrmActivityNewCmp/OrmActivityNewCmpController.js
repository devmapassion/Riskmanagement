({
	doInit : function(component, event, helper) {
        var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.activity"), 'fld' : 'orm_activityStatus__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allStatus', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);        
	},
    openCurrentCmp : function(component, event){
        component.set("v.isOpen", true); 
        //alert(event.getParam('idAssessment') + 'laye');
        component.set('v.assessmentId', event.getParam('idAssessment'));
	},
    
    createItem : function(component, event, helper) {
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var status = component.find('status').get('v.value');
        var startDate = component.find('startDate').get('v.value');
        var endDate = component.find('endDate').get('v.value');
        
        /* ici on test la validité des données ajoutées */
        var isItemsValid = false;
        if(true){
            isItemsValid = true;
        } else (
            alert("les données ne sont pas valides")
        )
        
         if(isItemsValid){
            var newActivity = component.get('v.activity');
            newActivity.Name = name;
            newActivity.orm_description__c = description;
            newActivity.orm_activityStatus__c = status;
            newActivity.orm_startDate__c = startDate;
            newActivity.orm_endDate__c = endDate;
            //newActivity.orm_user__c = component.get('v.user').get('v.value');
            //newActivity.orm_assessment__c = component.get('v.assessment').get('v.value');
            
            var action = component.get('c.add');
            action.setParams({
                "item": newActivity
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                //alert(state);
                //console.log("resp ", response);
                if ( state == "SUCCESS") {
                   alert("ajout réussie");
                   var evt = $A.get("e.c:OrmActivityCreatedEvt");
				   evt.fire();
                   helper.closeModal(component);
                } else {
                    alert("ajout échouée");
                }
            });            
            $A.enqueueAction(action);
        }
    }    
})