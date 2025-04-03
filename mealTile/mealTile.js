import { LightningElement ,api} from 'lwc';

export default class MealTile extends LightningElement {
  @api meal;
  recepieHandler(event){
    let myCustomEvent = new CustomEvent('recepie',{
        detail: this.meal.idMeal
    });
    this.dispatchEvent(myCustomEvent);
  }
}