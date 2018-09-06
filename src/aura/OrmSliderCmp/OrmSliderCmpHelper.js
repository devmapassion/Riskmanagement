({
	createSlider : function(component, event, helper, slider) {
	     var min = parseInt(component.get("v.min"), 10);
         var max = parseInt(component.get("v.max"), 10);
         var step = parseInt(component.get("v.step"), 10);
	
		 noUiSlider.create(slider, {
            start: [min, max],
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
	
	    //start first slider
        var slider = component.find('slider').getElement();
        slider = this.createSlider(component, event, helper, slider);
        
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        
<<<<<<< HEAD
        //start second slider
        var slider = component.find('slider2').getElement();
        slider = this.createSlider(component, event, helper, slider);        
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start second slider
        var slider = component.find('slider3').getElement();
        slider = this.createSlider(component, event, helper, slider);        
=======
    },
    
    jsLoaded2 : function(component, event, helper) {
	
        //start second slider
        var slider2 = component.find('slider2').getElement();
        slider2 = this.createSlider(component, event, helper, slider2);        
>>>>>>> a2aba4b7a708d749b290cde6ab15a948bf69a81b
        
        slider2.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start second slider
        var slider = component.find('slider4').getElement();
        slider = this.createSlider(component, event, helper, slider);        
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
    },
    
   
})