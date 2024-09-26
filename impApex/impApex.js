import { LightningElement } from 'lwc';
import fetchRecords from '@salesforce/apex/csvControl.fetchRecords';
export default class ImpApex extends LightningElement {
    data =[];
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Website', fieldName: 'Website', type: 'url' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry' }
       
    ];
    
    clickHandler(){
  
        fetchRecords().then(result=>{
            this.data = result;
        }).catch((error) =>{
            console.log("error",error)
        });
    }
    
}