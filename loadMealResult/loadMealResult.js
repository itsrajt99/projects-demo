import { LightningElement ,api} from 'lwc';

export default class LoadMealResult extends LightningElement {
 @api mealResult=[];

 get checkMeals(){
    return this.mealResult.length>0;
 }
 recepieHandler(event){
    let selectedMealId = event.detail;
    console.log('selectedMealId',selectedMealId);
 }
}