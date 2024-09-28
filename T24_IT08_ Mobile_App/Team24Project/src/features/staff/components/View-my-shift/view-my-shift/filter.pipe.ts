import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, staffNameMap: { [key: number]: string }, shiftTypeNameMap: { [key: number]: string }): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((shift) => {
      // Get staff name and shift type name based on the shift data
      const staffName = staffNameMap[shift.staffId]?.toLowerCase() || '';
      const shiftTypeName = shiftTypeNameMap[shift.shift_Type_Id]?.toLowerCase() || '';

      // Convert start and end time to strings for comparison
      const startTime = new Date(shift.startTime).toLocaleString().toLowerCase();
      const endTime = new Date(shift.endTime).toLocaleString().toLowerCase();

      // Check if the search text matches any of the relevant fields
      return (
        staffName.includes(searchText) ||
        shiftTypeName.includes(searchText) ||
        startTime.includes(searchText) ||
        endTime.includes(searchText)
      );
    });
  }
}
