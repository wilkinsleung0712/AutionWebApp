import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return list;
    }

    return list.filter(item => {
      // get field value from each item
      let fieldValue = item[filterField];
      // if the field value is include any keyword
      return fieldValue.indexOf(keyword.toLowerCase()) >= 0 || fieldValue.indexOf(keyword.toUpperCase()) >= 0 || fieldValue.indexOf(keyword)>=0;
    });
  }

}
