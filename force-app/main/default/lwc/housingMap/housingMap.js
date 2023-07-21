import { LightningElement, wire } from 'lwc';
import getHouses from "@salesforce/apex/HouseService.getRecords";

export default class HousingMap extends LightningElement {
    mapMarkers;
    error;

    @wire(getHouses)
    wiredHouses({ error, data }){
        if(data){
            this.mapMarkers = data.map((e) => {
                return {
                    location: {
                        Street : e.Address__c,
                        City: e.City__c,
                        State: e.State__c
                    },
                    title: e.Name
                };
            });
            this.error = undefined;
        }
        else if (error){
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
}