({

    createWorkshop: function(component, event, helper) {
 
        var name = component.find("idtitre");
        var datestart = component.find('datestart');
        var dateend = component.find('dateend');
        var message =  component.find('message');
        var dateinvitation =  component.find('dateinvitation');
       
        var isItemValid = true;
        if ($A.util.isEmpty(name.get('v.value')) || $A.util.isEmpty(datestart.get('v.value')) || $A.util.isEmpty(dateend.get('v.value'))) {
            isItemValid = false;
            
        } 
       
        if (isItemValid) {
      
        // new item workshop
       
            var newItem = component.get("v.item");
           
           //newItem.orm_assessment__c = component.get('v.assessmentData').Id;
         newItem.orm_assessment__c=  "a051H00000aQzDNQA0";
            newItem.Name=name.get('v.value');
            newItem.StartDate=datestart.get('v.value');
<<<<<<< HEAD
           newItem.Contract_End_Date__c=dateend.get('v.value');
           newItem.CompanySignedDate=dateinvitation.get('v.value');
           newItem.Description=message.get('v.value');
           newItem.AccountId="0011H00001RnBahQAF";
=======
           newItem.EndDate=dateend.get('v.value');
           newItem.CompanySignedDate=dateinvitation.get('v.value');
           newItem.Description=message.get('v.value');
>>>>>>> 2bb701fc4ae710edc8c11654a284149230663cae
           alert(JSON.stringify(newItem));
            var action = component.get('c.addWorkShop');
            action.setParams({
                "item": newItem
            });
               action
                .setCallback(
                    this,
                    function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS") {
                        alert('success');
                            var evt = $A.get("e.c:OrmNewWorkShopEvt");
                            evt.fire();

                            component.set("v.item", {
                                'sobjectType' : 'Contract',
                        'Name': '',
                        'StartDate':'',
<<<<<<< HEAD
                        'Contract_End_Date__c':'', 
                        'CompanySignedDate':'',
                        'Assessment__c':'',
                        'AccountId':'',                               
=======
                        'EndDate':'', 
                        'CompanySignedDate':'',
                        'orm_assessment__c':'',                               
>>>>>>> 2bb701fc4ae710edc8c11654a284149230663cae
						'Description':''
                            });
                        }else
                        {
                             alert('work');
                        }
                    });
            $A.enqueueAction(action);
           

        } else {
          //  alert("ajout échouée");
        }
       
    }
})