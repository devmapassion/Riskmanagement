({
    getAssessmentRiskId: function(component, event, helper) {
        component.set('v.columns', [{
            label: 'Name',
            fieldName: 'Description',
            editable: 'true',
            type: 'text'
        }]);
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.refresh(component, event);
    },
    openPopupNewPhase: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEventNewPhaseAssessmentRiskClicked');
        evt.fire();
    },
    refreshList: function(component, event, helper) {
        helper.refresh(component, event);
    },

    sendDescriptionFieldCause: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_phase'),
            "descriptionField": $A.get('$Label.c.orm_phase_description')
        });
        evt.fire();
    },

    cancelDeletePhases: function(component, event, helper) {
        component.set('v.openModalConfirmDeletion', false);
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selected", selectedRows.length);
         component.set("v.SelectedAccount", []);
    },
    filter: function(component, event, helper) {

        //var causesTemp = component.get('v.causesTemp');
        var causesTemp = component.get('v.ListData');
        //var data = causes;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refresh(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");
                // filter checks each row, constructs new array where function returns true
                causesTemp = causesTemp.filter(cause => regex.test(cause.Description));
            } catch (e) {

            }
            //component.set("v.causes", causesTemp);
            component.set("v.filterPagination", causesTemp);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },
    selectCauses: function(component, event, helper) {
        //        var current = component.get("v.currentPage");
        //        var dTable = component.find("datatableList");
        //        var selectedRows = dTable.getSelectedRows();
        //        var pgName = "page" + current;
        //        component.get("v.SelectedAccount")[pgName] = selectedRows;
         var selectedRows = event.getParam('selectedRows'); 
         var current = component.get("v.currentPage");
         var selectedRows = event.getParam('selectedRows');   
         var setRows = [];
        selectedRows.forEach(function(selectedRow){
            setRows.push(selectedRow.Id);
        })
        console.log(JSON.stringify(component.get("v.ListData")));
        console.log(setRows);
        	var listDatas = component.get("v.ListData");
        		for (var i = 0; i < listDatas.length; i++) {
                    var row = listDatas[i].Id;
                    console.log(JSON.stringify(row));
                    var sels = setRows;
                    sels.forEach(function(sel) {
                   listDatas = listDatas.filter(row => row != sel);
                });
                }
                console.log(JSON.stringify(listDatas));
    },
    openModalDeletePhase: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selected", selectedRows.length);
        if (selectedRows.length != 0) {
            var pgName = "page" + current;
            component.get("v.SelectedAccount")[pgName] = selectedRows;
        }
        var myMap = component.get("v.SelectedAccount");
        console.log("selectedRows in delete", Object.keys(myMap).length);
        if (Object.keys(myMap).length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else {
            component.set("v.openModalConfirmDeletion", true);
        }
    },
    deletePhasesfunction: function(component, event, helper) {
        var myMap = component.get("v.SelectedAccount");
        var idCauses = [];
        var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
                idCauses.push(myMap[page][j].Id);
            }
        }
        console.log("id Cause", idCauses);

        //		call apex class method
        var action = component.get('c.deletePhases');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "phaseIds": idCauses
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.SelectedAccount", []);
                component.set('v.openModalConfirmDeletion', false);
                helper.refresh(component, event);
            }
        });
        $A.enqueueAction(action);
    },
    onSave: function(component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
})