({
	createSlider : function(component, event, helper, slider, start, end) {
	     var min = parseInt(component.get("v.min"), 10);
         var max = parseInt(component.get("v.max"), 10);
         var step = parseInt(component.get("v.step"), 10);
	
		 noUiSlider.create(slider, {
            start: [start, end],
            connect: true,
            tooltips: true,
            step: step,
            format: {
                to: function (value ) {
					return Math.round(value) + '%';
                },
                from: function ( value ) {
                    return value;
                }
            },
            range: {
                'min': min,
                'max': max
            }
        });
        return slider;
	},
	
	jsLoaded : function(component, event, helper) {
	
        //start sliderPossible
        var sliderPossible = component.find('sliderPossible').getElement();
        if(component.get("v.probabilities").length == 0){
            sliderPossible = this.createSlider(component, event, helper, sliderPossible, 25, 75);
        }else{
           sliderPossible = this.createSlider(component, event, helper, sliderPossible, parseInt(component.get("v.possibleData").orm_pourcentageMin__c, 10), parseInt(component.get("v.possibleData").orm_pourcentageMax__c, 10) );
          
        }
       
        sliderPossible.noUiSlider.on('change', $A.getCallback(function(range) {
        //update probableMin attribute
        component.set("v.showBtnUpdate", true);
	    component.set("v.possibleMin", parseInt(range[0].replace('%', ''), 10)) 
	    component.set("v.possibleMax", parseInt(range[1].replace('%', ''), 10))
	    component.set("v.probableMin", component.get("v.possibleMax"))
	    component.set("v.unlikelyMax", component.get("v.possibleMin"))
        }));
        
        
        var sliderProbable = component.find('sliderProbable').getElement();
        if(component.get("v.probabilities").length == 0){
            sliderProbable = this.createSlider(component, event, helper, sliderProbable, 75, 100);
        }else{
           sliderProbable = this.createSlider(component, event, helper, sliderProbable, parseInt(component.get("v.probableData").orm_pourcentageMin__c, 10), parseInt(component.get("v.probableData").orm_pourcentageMax__c, 10) );
          
        }
        
        
        var origins = sliderProbable.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
		sliderProbable.noUiSlider.on('change', $A.getCallback(function(range) {
	    //update probableMin attribute
	    component.set("v.showBtnUpdate", true);
		component.set("v.probableMin", parseInt(range[0].replace('%', ''), 10))
		component.set("v.possibleMax", parseInt(range[0].replace('%', ''), 10))
		    
        }));
        
        //Locking slider and slider2 together
        sliderProbable.noUiSlider.on('slide', $A.getCallback(function(range){
            if(Number(range[0].replace('%', '')) >= component.get("v.possibleMin")){
               sliderPossible.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderProbable.noUiSlider.set([component.get("v.possibleMin"), null]);
            }
						
		}));
		sliderPossible.noUiSlider.on('slide', $A.getCallback(function(range){
		
		    if(Number(range[0].replace('%', '')) >= component.get("v.unlikelyMin")){
               sliderProbable.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			   sliderUnlikely.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderPossible.noUiSlider.set([component.get("v.unlikelyMin"), null]);
            }
            
			
			
		}));
        //Locking slider and slider2 together
        
        //start sliderUnlikely
        var sliderUnlikely = component.find('sliderUnlikely').getElement();
        if(component.get("v.probabilities").length == 0){
             sliderUnlikely = this.createSlider(component, event, helper, sliderUnlikely, 5, 25); 
        }else{
           sliderUnlikely = this.createSlider(component, event, helper, sliderUnlikely, parseInt(component.get("v.unlikelyData").orm_pourcentageMin__c, 10), parseInt(component.get("v.unlikelyData").orm_pourcentageMax__c, 10) );
        }
        
        sliderUnlikely.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.unlikelyMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.unlikelyMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.possibleMin", component.get("v.unlikelyMax"));
	        component.set("v.rareMax", component.get("v.unlikelyMin"));
	        
        }));
        //end sliderUnlikely
        
		sliderUnlikely.noUiSlider.on('slide', $A.getCallback(function(range){
			//sliderPossible.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			//sliderRare.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		   if(Number(range[1].replace('%', '')) <= component.get("v.possibleMax") ){
		      sliderPossible.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		      sliderRare.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
		   }else{
		      sliderUnlikely.noUiSlider.set([null, component.get("v.possibleMax")]);
		   }
			
		}));
        
        //start sliderRare
        var sliderRare = component.find('sliderRare').getElement();
        if(component.get("v.probabilities").length == 0){
             sliderRare = this.createSlider(component, event, helper, sliderRare, 0, 5); 
        }else{
           sliderRare = this.createSlider(component, event, helper, sliderRare, parseInt(component.get("v.RareData").orm_pourcentageMin__c, 10), parseInt(component.get("v.RareData").orm_pourcentageMax__c, 10) );
        }
        
        var origins = sliderRare.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderRare.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.rareMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.rareMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.unlikelyMin", component.get("v.rareMax"));
        }));
        //end sliderRare  
        
		sliderRare.noUiSlider.on('slide', $A.getCallback(function(range){
		   if(Number(range[1].replace('%', '')) <= component.get("v.unlikelyMax") ){
		      sliderUnlikely.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		   }else{
		      sliderRare.noUiSlider.set([null, component.get("v.unlikelyMax")]);
		   }
			
		})); 
    },
    
    jsLoaded2 : function(component, event, helper) {
	
        var sliderCostProjectVeryHigh = component.find('sliderCostProjectVeryHigh').getElement();
        sliderCostProjectVeryHigh = this.createSlider(component, event, helper, sliderCostProjectVeryHigh, 60, 100);
		sliderCostProjectVeryHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        
        var sliderScheduleProjectVeryHigh = component.find('sliderScheduleProjectVeryHigh').getElement();
        sliderScheduleProjectVeryHigh = this.createSlider(component, event, helper, sliderScheduleProjectVeryHigh, 60, 100);        
        sliderScheduleProjectVeryHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderCostProjectHigh = component.find('sliderCostProjectHigh').getElement();
        sliderCostProjectHigh = this.createSlider(component, event, helper, sliderCostProjectHigh, 15, 60);  
        sliderCostProjectHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderScheduleProjectHigh = component.find('sliderScheduleProjectHigh').getElement();
        sliderScheduleProjectHigh = this.createSlider(component, event, helper, sliderScheduleProjectHigh, 15, 60);  
        sliderScheduleProjectHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderProductionHigh = component.find('sliderProductionHigh').getElement();
        sliderProductionHigh = this.createSlider(component, event, helper, sliderProductionHigh, 12, 26);  
        sliderProductionHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderCostProjectMedium = component.find('sliderCostProjectMedium').getElement();
        sliderCostProjectMedium = this.createSlider(component, event, helper, sliderCostProjectMedium, 5, 15);  
        sliderCostProjectMedium.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderScheduleProjectMedium = component.find('sliderScheduleProjectMedium').getElement();
        sliderScheduleProjectMedium = this.createSlider(component, event, helper, sliderScheduleProjectMedium, 5, 15);  
        sliderScheduleProjectMedium.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderProductionMedium = component.find('sliderProductionMedium').getElement();
        sliderProductionMedium = this.createSlider(component, event, helper, sliderProductionMedium, 4, 12);  
        sliderProductionMedium.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderCostProjectLow = component.find('sliderCostProjectLow').getElement();
        sliderCostProjectLow = this.createSlider(component, event, helper, sliderCostProjectLow, 0, 5);  
        sliderCostProjectLow.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderScheduleProjectLow = component.find('sliderScheduleProjectLow').getElement();
        sliderScheduleProjectLow = this.createSlider(component, event, helper, sliderScheduleProjectLow, 0, 5);  
        sliderScheduleProjectLow.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        var sliderProductionLow = component.find('sliderProductionLow').getElement();
        sliderProductionLow = this.createSlider(component, event, helper, sliderProductionLow, 0, 4);  
        sliderProductionLow.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        
        //----cost----------------------
        
        var origins = sliderCostProjectVeryHigh.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
        sliderCostProjectVeryHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderCostProjectHigh.noUiSlider.set([null, Number(range[0].replace('%', ''))]);			
			
		}));
		
		sliderCostProjectHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderCostProjectVeryHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			sliderCostProjectMedium.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		sliderCostProjectMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderCostProjectHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			sliderCostProjectLow.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		var origins = sliderCostProjectLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderCostProjectLow.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderCostProjectMedium.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		})); 
		//---------end cost----------
		//----------------------schedule--------------------
		
		var origins = sliderScheduleProjectVeryHigh.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
        sliderScheduleProjectVeryHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderScheduleProjectHigh.noUiSlider.set([null, Number(range[0].replace('%', ''))]);			
			
		}));
		
		sliderScheduleProjectHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderScheduleProjectVeryHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			sliderScheduleProjectMedium.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		sliderScheduleProjectMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderScheduleProjectHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			sliderScheduleProjectLow.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		var origins = sliderScheduleProjectLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderScheduleProjectLow.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderScheduleProjectMedium.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		})); 
		//----------------end schedule--------------------
		
		//----------------Production--------------------
		
		sliderProductionHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderProductionMedium.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		sliderProductionMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderProductionHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			sliderProductionLow.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		
		var origins = sliderProductionLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderProductionLow.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderProductionMedium.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		})); 
		//--------------end Production--------------------
        
    },
    
    cancelModifProbabiliy : function(component, event, helper){
            console.log('*********dans cancelMofProba***********');
        	console.log('Size: '+ component.get("v.probabilities").length);
        	
        	if(component.get("v.probabilities").length > 0){
    	   
               for (var i = 0; i < component.get("v.probabilities").length; i++) {
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Probable' ){
                         component.set("v.probableData", component.get("v.probabilities")[i]);
                         
                         var sliderProbable = component.find('sliderProbable').getElement();
                         sliderProbable.noUiSlider.set([component.get("v.probableData").orm_pourcentageMin__c, null]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Possible' ){
                         component.set("v.possibleData", component.get("v.probabilities")[i]);
                         
                         var sliderPossible = component.find('sliderPossible').getElement();
                         sliderPossible.noUiSlider.set([component.get("v.possibleData").orm_pourcentageMin__c, component.get("v.possibleData").orm_pourcentageMax__c]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Unlikely' ){
                         component.set("v.unlikelyData", component.get("v.probabilities")[i]);
                         
                         var sliderUnlikely  = component.find('sliderUnlikely').getElement();
                         sliderUnlikely.noUiSlider.set([component.get("v.unlikelyData").orm_pourcentageMin__c, component.get("v.unlikelyData").orm_pourcentageMax__c]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Rare' ){
                         component.set("v.RareData", component.get("v.probabilities")[i]);
                         
                         var sliderRare   = component.find('sliderRare').getElement();
                         sliderRare.noUiSlider.set([component.get("v.RareData").orm_pourcentageMin__c, component.get("v.RareData").orm_pourcentageMax__c]);
                      }
                   }
	        	}	
		        	
    },
    
    getHsseImpacts : function(component, event, helper) {
    	  var action = component.get('c.findHsseImpactsByAssessment');
	      action.setParams({ "assessment": component.get("v.idAssessment") });
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	            
	        	component.set("v.hsseImpacts", response.getReturnValue());	
	        	console.log('*****want to see the size******')
	            console.log(component.get("v.hsseImpacts").length) 
	        	if(component.get("v.hsseImpacts").length > 0){
	        	   
	                   for (var i = 0; i < component.get("v.hsseImpacts").length; i++) {
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'VeryHigh' ){
		                         component.set("v.hsseVeryHighData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'High' ){
		                         component.set("v.hsseHighData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Medium' ){
		                         component.set("v.hsseMediumData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Low' ){
		                         component.set("v.hsseLowData", component.get("v.hsseImpacts")[i]);
		                      }
	                    }
	                    
	        	  }else{
	        	  
	        	      var newItemHsseVeryHigh = component.get("v.hsseVeryHighData");
	        	      newItemHsseVeryHigh.orm_healthAndSafety__c = "Fatality";
	        	      newItemHsseVeryHigh.orm_security__c = "Security breach with major property damage and loss";
	        	      newItemHsseVeryHigh.orm_environmentAndCommunity__c = "Uncontained spill or event with severe environmental or community impact.  Mandatory obligation to Regulator";
	        	      component.set("v.hsseVeryHighData", newItemHsseVeryHigh);
	        	      
	        	      var newItemHsseHigh = component.get("v.hsseHighData");
	        	      newItemHsseHigh.orm_healthAndSafety__c = "Lost Time Incident";
	        	      newItemHsseHigh.orm_security__c = "Security breach with serious property damage and loss";
	        	      newItemHsseHigh.orm_environmentAndCommunity__c = "Uncontained spill or event with serious environmental or community impact. Necessary to obtain directive from Regulator";
	        	      component.set("v.hsseHighData", newItemHsseHigh);
	        	      
	        	      var newItemHsseMedium = component.get("v.hsseMediumData");
	        	      newItemHsseMedium.orm_healthAndSafety__c = "Medical Treatment Case";
	        	      newItemHsseMedium.orm_security__c = "Security breach with moderate property damage and loss";
	        	      newItemHsseMedium.orm_environmentAndCommunity__c = "Uncontained spill  or event with minor environmental or community impact. Recommended engagement with Regulator";
	        	      component.set("v.hsseMediumData", newItemHsseMedium);
	        	      
	        	      var newItemHsseLow = component.get("v.hsseLowData");
	        	      newItemHsseLow.orm_healthAndSafety__c = "First Aid Case";
	        	      newItemHsseLow.orm_security__c = "Security breach with minor property damage and/or loss";
	        	      newItemHsseLow.orm_environmentAndCommunity__c = "Local contained spill or event with no environmental or community impact. No need to engage Regulator";
	        	      component.set("v.hsseLowData", newItemHsseLow);
	        	  
	        	  }
	        	
	        } else {
	        	alert("ERROR getHsseImpacts")	
	        }
	     });
	     $A.enqueueAction(action);
    }
    
    
   
})