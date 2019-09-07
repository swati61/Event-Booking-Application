import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: any): any {
    if (searchText === undefined) return items;
    return items.filter(item =>{
       for (let key in item ) {
         if((""+JSON.stringify(item[key].eventname).toLowerCase()).includes(searchText.toLowerCase())){
            return true;
         }
       }
       return false;
    });
}

}
