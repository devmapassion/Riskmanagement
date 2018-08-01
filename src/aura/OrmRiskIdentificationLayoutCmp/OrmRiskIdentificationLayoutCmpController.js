({
	initialiseAssessment : function(component, event, helper){
        alert('id Assessment ', event.getParam('idAssessment'));
    	component.set("v.idAssessment", event.getParam('idAssessment'));
        alert(component.get("v.idAssessment"));
    },
    
	/*
	 * CreatedBy @David Diop
	 *
	 */
	 openModalNewRisk : function(component, event, helper){
        var evt = $A.get("e.c:OrmOpenNewRiskCmpEvt");
		evt.fire();
    },
    /*
	 * CreatedBy @David Diop
	 *
	 */
     doInit : function(component, event, helper) {
      // Set the columns of the Table
      alert(component.get("v.idAssessment"));
    	
        component.set('v.columns', [
            {label: 'Risk Name', fieldName: 'Name', type: 'text'},
            {label: 'Description', fieldName: 'Description', type: 'text'},
            {label: 'Risk category', fieldName: 'orm_categorieRisk__c', type: 'text'}
        ]);
       helper.fetchPicklist(component, event);
	},
	/*
	 * CreatedBy @David Diop
	 *
	 */
	
	filterByPicklist:function(component,event,helper)
	{
	var nomfield=component.find("categorieRisk");
	var item = nomfield.get("v.value");
	var isItemValid = true;
        if ($A.util.isEmpty(item)) {
            isItemValid = false;
             helper.fetchPicklist(component, event);
        } 
        if (isItemValid) {
            var action = component.get('c.findAllResearchPicklist');
             action.setParams({
                "Research": item
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                 component.set('v.allRisk', response.getReturnValue());
                 component.find("categorieRisk").set("v.value", event.getSource().get("v.value"));
                     }
                  else {
                  helper.fetchPicklist(component, event);
                  }
            });
            $A.enqueueAction(action);
        }
	},
	/*
	 * CreatedBy @David Diop
	 *
	 */
	/*
	openFilterRisk:function(component,event,helper)
	{
       var nomfield=component.find("Name");
       var item =nomfield.get("v.value");
       var nomFieldCategorie= component.find("categorieRisk");
       var itemCategorie=nomFieldCategorie.get("v.value");
          var isItemValid = true;
        if ($A.util.isEmpty(item)) {
            isItemValid = false;
             helper.fetchPicklist(component, event);
        } 
        if (isItemValid) {
            var action = component.get('c.findAllResearch');
             action.setParams({
                "Research": item,
                "Research2":itemCategorie
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                 component.set('v.allRisk', response.getReturnValue());
                     }
                  else {
                  helper.fetchPicklist(component, event);
                  }
            });
            $A.enqueueAction(action);
        }
	},*/
	
	openPopupAssociation: function(component,event,helper)
	{
		alert(component.get("v.idAssessment"));
		var selectedRows = event.getParam('selectedRows');
		alert(JSON.stringify(selectedRows));
		// Display that fieldName of the selected rows
   
    	component.set("v.ids", selectedRows);
    	console.log(component.get("v.ids"));
    	//component.set("v.isOpen", true);
	},
	closeAlert:function(component,event,helper)
	{
		component.set("v.isOpen", false);
	},
	/*
	 * CreatedBy @David Diop
	 *
	 */
	filter: function (component, event, helper) {
    var data = component.get("v.allRisk");
        var term = component.get("v.filter");
        
       
        var  results = data;
        var regex;
        if ($A.util.isEmpty(term)) {
        var nomfield=component.find("categorieRisk");
	    var item = nomfield.get("v.value");
	    component.set("v.categorieRisk",item);
	   
             helper.fetchPicklist(component, event);
        } else{
          term="^"+term;
         }
    try {
        regex = new RegExp(term, "i");
        // filter checks each row, constructs new array where function returns true
        results = data.filter(row => regex.test(row.Name)|| regex.test(row.Description));
    } catch (e) {
        // invalid regex, use full list
      helper.fetchPicklist(component, event);
    }
    
    component.set("v.allRisk", results);
}
	
})