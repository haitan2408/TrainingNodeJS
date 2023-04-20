let profile = {
    fname: 'Code',
    lname: 'Gym',
    bday: new Date('1979-01-02')
}

//destructuring array
let [newFName, newLName] = [profile.fname, profile.lname];

//destructuring object
let {fname, lname} = profile;

console.log(fname, lname);
console.log(newFName, newLName);
