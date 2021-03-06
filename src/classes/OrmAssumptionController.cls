/**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: Controller for managing Assumption
*/
public with sharing class OrmAssumptionController {
/**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: get recordType Cause
*/
    public static Id getAssumptionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Assumption').getRecordTypeId();
        return RecordTypeId;
    }
 /**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: add new Assumption
*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmAssumptionController.getAssumptionRecordTypeId();
		upsert item;
		return item;
	}
	
/**
* @author: Salimata NGOM
* @date: Creation: 30/08/2018
* @description: find all assumptions related to the assessmentRisk
*/
	@AuraEnabled
	public static List<Macro> findAllAssumptionByAssessmentRisk(String asssessment){
		return [SELECT Id, Name FROM Macro WHERE orm_assessment__c=: asssessment AND 
					RecordTypeId =:OrmAssumptionController.getAssumptionRecordTypeId()];
	
	}
	/**
 * save List workshop
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method for update records Assumption after inline editing
 * @history 
 * 2018-08-30 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
    public static List <Macro> saveAssumption(List<Macro> listAssumption) {
        update listAssumption;
        return listAssumption;
    }
    	 /**
 * remove activities selected
 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description  method for remove all assumptions checked
 * @history 
 * 2018-09-05 : Salimata NGOM - Implementation
 */
 
   @AuraEnabled
 public static List < String > deleteRecordAssumption(List < String > lstRecordId) {
  // for store Error Messages  
  List < String > oErrorMsg = new List < String > ();
  // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
  List <Macro> lstDeleteRec = [select Id from Macro where id IN: lstRecordId and RecordTypeId=:OrmAssumptionController.getAssumptionRecordTypeId()];
  
  // delte contact list with Database.DeleteResult[] database class.
  // It deletes some queried contacts using <samp class="codeph apex_code">Database.<span class="statement">delete</span></samp> 
  // with a false second parameter to allow partial processing of records on failure.
  // Next, it iterates through the results to determine whether the operation was successful or not
  // for each record. and check if delete contact successful so print msg on debug, 
  // else add error message to oErrorMsg List and return the list  
  Database.DeleteResult[] DR_Dels = Database.delete(lstDeleteRec, false);
  // Iterate through each returned result
  for (Database.DeleteResult dr: DR_Dels) {
   if (dr.isSuccess()) {
      system.debug('successful delete contact');
     // Operation was successful
   } else {
    // Operation failed, so get all errors   
    oErrorMsg.add('');
    for (Database.Error err: dr.getErrors()) {
     // add Error message to oErrorMsg list and return the list
     oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
    }
   }
  }
  return oErrorMsg;
 
 }
  
}