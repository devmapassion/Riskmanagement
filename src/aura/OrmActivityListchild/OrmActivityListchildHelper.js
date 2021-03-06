({
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for fetch picklist values dynamic from apex
	 *              controller
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	fetchPickListVal : function(component, fieldName, picklistOptsAttributeName) {

		var action = component.get("c.getSelectOptions");
		action.setParams({
			"objObject" : component.get("v.objInfoForPicklistValues"),
			"fld" : fieldName
		});
		var opts = [];
		action.setCallback(this, function(response) {
			if (response.getState() == "SUCCESS") {
				var allValues = response.getReturnValue();

				if (allValues != undefined && allValues.length > 0) {
					opts.push({
						class : "optionClass",
						label : "--- None ---",
						value : ""
					});
				}
				for (var i = 0; i < allValues.length; i++) {
					opts.push({
						class : "optionClass",
						label : allValues[i],
						value : allValues[i]
					});
				}
				component.set("v." + picklistOptsAttributeName, opts);
			}
		});

		$A.enqueueAction(action);
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description call apex class method for remove records activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	deleteSelectedHelper : function(component, event, deleteRecordsIds) {
		var action = component.get('c.deleteRecordActivities');
		// pass the all selected record's Id's to apex method
		action.setParams({
			"lstRecordId" : deleteRecordsIds
		});
		action
				.setCallback(
						this,
						function(response) {
							// store state of response
							var state = response.getState();
							if (state === "SUCCESS") {
								console.log(state);
								if (response.getReturnValue() != '') {
									// if getting any error while delete the
									// records , then display a alert msg/
									alert('The following error has occurred. while Delete record-->'
											+ response.getReturnValue());
								} else {
									console
											.log('check it--> delete successful');
								}
								// fire the event function for refresh the List
								// view
								// this.onLoad(component, event);
								var evt = $A.get("e.c:OrmRefreshActivityEvnt");
								evt.fire();
							}
						});
		$A.enqueueAction(action);
	},
})