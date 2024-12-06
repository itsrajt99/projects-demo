import { LightningElement } from 'lwc';

export default class CalculatorBM extends LightningElement {
    height ='';
    weight ='';
    result='';
    bmiValue='';

    inputHandler(event){
     const {name,value} = event.target;
     if(name ==="height"){
       this.height=value;
     }
     if(name ==="weight"){
         this.weight=value;
     }
    }

    submitHandler(event){
     event.preventDefault();
     this.calculate();
     this.recalculate();
    }

    calculate(){
        let height = Number(this.height)/100;
        let bmi = Number(this.weight)/(height*height)
        console.log("Bmi value is:", bmi);
        this.bmiValue = Number(bmi.toFixed(2));

        if(this.bmiValue <18.5){
            this.result="UnderWeight"
        }else if(bmiValue >=18.5 && bmiValue<25){
           this.result="Healthy"
        }else if(bmiValue>=25 && bmiValue<30){
            this.result="Over Weight"
        }else if(bmiValue>=30 ){
            this.result="Obses"
        }

        console.log("Bmi value is:",this.bmi);
        console.log("Result value is:",this.result);
        
    }

    recalculate(){
        this.height ='';
        this.weight ='';
        this.result='';
        this.bmiValue='';
    
    }
}