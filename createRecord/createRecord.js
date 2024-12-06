import { LightningElement,wire } from 'lwc';
import getAccountAon from "@salesforce/apex/AccountAon.AccountAon";
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
// import ACCOUNT_PARENT from '@salesforce/schema/Account.Parent';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLA_EXPIRY_DT from '@salesforce/schema/Account.SLAEXPIRATIONDATE__c';
// import ACCOUNT_NO_OF_LOCATION from '@salesforce/schema/Account.NumberOfLocations_c';
import ACCOUNT_DESCRIPTION from '@salesforce/schema/Account.Description';
import ACCOUNT_SLA_TYPE from '@salesforce/schema/Account.SLA__c';
import { createRecord } from 'lightning/uiRecordApi';
export default class CreateRecord extends LightningElement {
    parentoptions = [];
    selParentAccounts = '';
    selnooflocations ='1';
    selAccName = '';
    selSlaType='';
    selExpDate ='null';
    selDescription = '';
    @wire(getAccountAon) wiredAcount({data,error}){
        this.parentoptions =[];
        if(data){
            this.parentoptions = data.map((curritem) =>({
                label:curritem.Name,
                value:curritem.Id
            }))
        }
        if(error){
            this.parentoptions= error;
        }
       
    }
    @wire(getObjectInfo,{
        objectApiName : ACCOUNT_OBJECT
    }) accountobjectinfo;
    @wire(getPicklistValues,{
        recordTypeId: "$accountobjectinfo.data.defaultRecordTypeId",
        fieldApiName:  ACCOUNT_SLA_TYPE

    }) slapicklist;
    handleChange(event){
        let{name,value}=event.target;
        if(name==='parentacc'){
            this.selParentAccounts = value;
        }
        if(name==='accname'){
            this.selAccName = value;
        }
        if(name==='sleexpdt'){
            this.selExpDate = value;
        }
        if(name==='slatype'){
            this.selSlaType = value;
        }
        if(name==='nooflocation'){
            this.selnooflocations = value;
        }
        if(name==='description'){
            this.selDescription = value;
        }
    }
    saveRecord(){
       if( validateInput()){
        let inputfields={};
        inputfields[ACCOUNT_NAME.fieldApiName]=this.selAccName;
        inputfields[ACCOUNT_PARENT.fieldApiName]=this.selParentAccounts;
        inputfields[ACCOUNT_SLA_EXPIRY_DT.fieldApiName]=this.selExpDate;
        inputfields[ACCOUNT_SLA_TYPE.fieldApiName]=this.selSlaType;
        inputfields[ACCOUNT_DESCRIPTION.fieldApiName]=this.selDescription;
        inputfields[ACCOUNT_NO_OF_LOCATION.fieldApiName]=this.selnooflocations;
        let recordInput ={
          apiName:ACCOUNT_OBJECT.objectApiName,
          fields:inputfields
        }
         createRecord(recordInput).then((result)=>{
         console.log("Account created successfully",result);
         }).catch((error)=>{
            console.log("Error while creating account",error);
         })
       }
       else{
        console.log("inputs are not valid");
       }
    }
    validateInput(){
       let fields = Array.from(this.template.querySelectorAll(".validateme"));
       let isvalid = fields.every(curritem => curritem.checkValidity());
       return isvalid();
    }
}