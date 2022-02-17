v_nubmber = 100;
v_bigint = 1n;
v_string = "aboba";
v_bool = true;
v_null = null;
v_undifinded = undefined;
v_object = {type: "Object"};
v_symb = Symbol('a');
v_function = () => {};

alert(`
    Number is ${typeof v_nubmber}
    BigInt is ${typeof v_bigint}
    String is ${typeof v_string}
    Boolean is ${typeof v_bool}
    Null is null
    Undefined is ${typeof v_undifinded}
    Symbol is ${typeof v_symb}
    Function is ${typeof v_function}
`)
