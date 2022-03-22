function bubbleSort(list){
    const listSize = list.length;

    for( let index1=0; index1 < listSize-1; index1++ ) {

         for( let index2 = 0; index2 < listSize - index1 - 1; index2++ ) {
               // check the elements
               if( list[index2] > list[index2 + 1] ) {
                    let temp = list[index2];
                    list[index2] = list[index2 + 1];
                    list[index2 + 1] = temp;
               }
         }

    }
}         

// function calling
const num_arr = [1,4,5,2,8,6,7,10.4,78];
bubbleSort(num_arr);

console.log(num_arr);