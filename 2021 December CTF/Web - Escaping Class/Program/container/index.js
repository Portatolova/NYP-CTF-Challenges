
const fs = require('fs');
const vm = require('vm');

flag = "NYP{yay_i_can_sleep_now}"

const code = fs.readFileSync("./code");
vm.runInContext(code, vm.createContext({ console }));
