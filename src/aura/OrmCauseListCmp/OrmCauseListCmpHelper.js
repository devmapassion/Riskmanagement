({
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.causes");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length; i++) {
            if(allRecords[i].Description == null || allRecords[i].Description.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
    
    refresh : function(component, idAssessmentRisk) {	
		
        var action = component.get("c.findAllCausesByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	//component.set("v.causes ", response.getReturnValue());
            	//component.set("v.causesTemp", response.getReturnValue());
            	
            	component.set('v.initialData', response.getReturnValue());
                component.set('v.items', response.getReturnValue());
                   // start pagination
                    var pageSize = component.get("v.pageSizeBis");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                // set star as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.PaginationList', PaginationList);
                //end pagination
            }
        });
        $A.enqueueAction(action);
	}
})