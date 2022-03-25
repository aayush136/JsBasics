function Deep(obj)
{
    if( obj === null || typeOf(obj) !== 'object' ) return obj;
    switch (obj.constructor) {
        case Number:
            return new Number(obj);
        case Object: {
            let copy_elem = {};
            Object.keys(obj).forEach((key) => {
                if (obj.hasOwnProperty(key)) copy_elem[key] = Deep(obj[key]);
            });
            return copy_elem;
        }

    return obj;
}
}
const obj = {
          b: 10,
          c: {
              d: {
                  e: 20
              }
          }
      }
    
      const objCopy = Deep(obj)
      obj.c.d.e = 30;
      console.log(obj.c.d.e);
      console.log(objCopy.c.d.e);

