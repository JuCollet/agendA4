export const Month = {
    monthsNames : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    currentMonth : new Date().getMonth(),
    currentYear : new Date().getFullYear(),
    createList : function(){
        let months = [];        
        for(let i = 0; i < 12; i++){
            let year = i < this.currentMonth ? this.currentYear + 1 : this.currentYear;
            let isoYear = year;
            let month = i;
            if(i === 0){
              isoYear--;
              month = 12;
            }
            months.push({
              string : `${this.monthsNames[i]} ${year}`,
              timeMin : new Date(isoYear,month).toISOString(),
              timeMax : new Date(isoYear,month + 1).toISOString(),
              firstDay : new Date(isoYear, month, 1).getDay() === 0 ? new Date(isoYear, month, 1).getDay() + 6 : new Date(isoYear, month, 1).getDay() -1,
              nbrOfDays : new Date(isoYear, month+1, 0).getDate(),
              previousMonthNbrOfDays : new Date(isoYear, month, 0).getDate(),
            });
          }
          return months;
    },
  getCurrentMonth : function(){
    return {
      string : `${this.monthsNames[this.currentMonth]} ${this.currentYear}`,
      timeMin : new Date(this.currentYear,this.currentMonth).toISOString(),
      timeMax : new Date(this.currentYear,this.currentMonth + 1).toISOString(),
      firstDay : new Date(this.currentYear, this.currentMonth, 1).getDay() === 0 ? new Date(this.currentYear, this.currentMonth, 1).getDay() + 6 : new Date(this.currentYear, this.currentMonth, 1).getDay() -1,
      nbrOfDays : new Date(this.currentYear, this.currentMonth+1, 0).getDate(),
      previousMonthNbrOfDays : new Date(this.currentYear, this.currentMonth, 0).getDate(),
    }
  }
}