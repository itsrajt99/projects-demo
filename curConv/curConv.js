import { LightningElement } from 'lwc';

export default class CurConv extends LightningElement {
    showOutput=false;
    convertedValue=""
    toCurrency=''
    enteredamount='';
    fromCurrency=''
    currencyoptions=[];

    connectedCallback(){
      this.fetchSymbols();
    }

    //First Step To Take Input:-
    changeHandler(event){
      let {name,value}= event.target;
      if(name ==='amount'){
         this.enteredamount=value;
      }
      if(name ==='fromcurr'){
        this.fromCurrency=value;
      }
      if(name ==='tocurr'){
        this.toCurrency=value;
      }
    }
    clickHandler(){
      this.conversion();
    }

    //Second Step to fillthe drop down value by integeration:-
    async fetchSymbols(){
      let endpoint = 'https://api.frankfurter.app/currencies';
      try{
        let response = await fetch(endpoint);
        if(!response.ok){
         throw new Error('Network response was not okay....!')
        }
        const data = await response.json()
        //process the data
        let options = [];
        for(let symbol in data){
            options =[...options,{label:symbol,value:symbol}]
        }
        this.currencyoptions=options;
      }
      catch(error){
        console.log(error);
      }
    }
    async conversion(){
        /*
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
        .then(resp => resp.json())
         .then((data) => {
         alert(`10 GBP = ${data.rates.USD} USD`);
           });
        */

        let endpoint =`https://api.frankfurter.app/latest?amount=${this.enteredamount}from=${this.fromCurrency}&to=${this.toCurrency}`
      try{
        let response = await fetch(endpoint);
        if(!response.ok){
         throw new Error('Network response was not okay....!')
        }
        const data = await response.json()
        //process the data
        this.convertedValue = data.rates[this.toCurrency];
        this.showOutput = true;
      }
      catch(error){
        console.log(error);
      }
    }
}