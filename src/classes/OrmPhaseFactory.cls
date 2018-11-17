public with sharing class OrmPhaseFactory {
      /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of phase
   */
    public static List<Macro> generatePhases(String  idAssessment )
    {
        List<Macro> phases = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            phases.add(new Macro( Name= 'cause'+i,orm_assessment__c = idAssessment,RecordTypeId = OrmPhaseController.getPhaseRecordTypeId()));
       } 
        insert phases;
        return phases;
    }
      /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of phaseAssessmentRisk
   */
    public static List<Macro> generatePhaseAssessmentRisk(String  idAssessmentRisk )
    {
        List<Macro> phases = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            phases.add(new Macro( Name= 'phase'+i,orm_assessmentRisk__c = idAssessmentRisk,RecordTypeId = OrmPhaseAssessmentRiskController.getPhaseRecordTypeId()));
       } 
        insert phases;
        return phases;
    }
}