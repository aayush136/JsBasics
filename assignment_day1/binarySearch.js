function binarySearch( list, low, high, target ) {
     if( low <= high ) {
         const midIndex = low + (high-low)/2;
         if( list[midIndex] == target ) {
             return midIndex;
         }
         if( list[midIndex] < target ) {
             return binarySearch( list, midIndex+1, high, target );
         }
         return binarySearch( list, low, midIndex-1, target );
     }
     return -1;
}

// function calling
const numArr = [1,3,6,9,10,23];
const target = 9;
const result = binarySearch( numArr, 0, numArr.length-1, target );

if( result != -1 ) {
    console.log(`${target} is found at index ${result}`);
} else {
    console.log(`${target} is not found..`);
}
